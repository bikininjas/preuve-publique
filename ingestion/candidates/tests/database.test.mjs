import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync,mkdtempSync,writeFileSync,mkdirSync,rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { zipSync,strToU8 } from 'fflate';
import { PGlite } from '@electric-sql/pglite';
import { pgliteClient } from '../../tests/helpers/pglite-client.mjs';
import { checkedBallots,syncCandidates } from '../sync.mjs';
import { importMeasures } from '../editorial.mjs';
import { comparisonCandidates,connectionActive,positionLabel } from '../../../lib/candidates/method.ts';

const hash='a'.repeat(64);
const ids={actor:'11111111-1111-4111-8111-111111111111',source:'22222222-2222-4222-8222-222222222222',vote:'33333333-3333-4333-8333-333333333333'};
async function fresh(t) {
  const pg=new PGlite();t.after(()=>pg.close());
  await pg.exec(`create role anon;create role authenticated;create schema auth;
    create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb $$;
    grant usage on schema public,auth to anon,authenticated;grant execute on function auth.jwt() to anon,authenticated;`);
  for(const file of ['20260929000000_initial','20260930000000_backend_pipeline','20261002000000_admin_review','20261003000000_actor_relations','20261005000000_party_vote_tallies','20261002061929_presidential_polls','20261002092834_candidate_evidence_path']) {
    await pg.exec(readFileSync(new URL(`../../../supabase/migrations/${file}.sql`,import.meta.url),'utf8'));
  }
  await pg.exec(`insert into public.actors(id,name,kind,external_id) values('${ids.actor}','Alice Exemple','person','an-acteur:PA123');
    insert into public.sources(id,url,publisher,document_title) values('${ids.source}','https://example.test/archive','Institution fictive','Fixture');
    insert into public.evidence(id,source_id,title,kind,institution,occurred_at,source_url,source_locator,external_id,status)
      values('${ids.vote}','${ids.source}','Scrutin n° 1 — retraites','vote','assemblee','2026-01-01','https://example.test/vote','scrutin n°1','vote-1','published');
    insert into public.vote_party_coverage(vote_id,recorded_individuals,unattributed_individuals,official_individuals,archive_sha256)
      values('${ids.vote}',1,0,1,'${hash}');`);
  return {pg,db:pgliteClient(pg)};
}
const profileSQL=(slug,status='published')=>`insert into public.candidate_profiles(slug,provider,candidate_external_id,actor_id,name,actor_external_id,source_url,source_locator,retrieved_at,source_sha256,status)
  values('${slug}','fixture','${slug}','${ids.actor}','Alice Exemple','an-acteur:PA123','https://example.test/archive','acteur PA123',now(),'${hash}','${status}');`;

test('comparaison : même scrutin, bulletin manquant distinct du non-vote et RLS sur toutes les pièces',async(t)=>{
  const {pg}=await fresh(t);
  await pg.exec(profileSQL('alice')+profileSQL('bruno')+profileSQL('draft','draft'));
  await pg.exec(`insert into public.candidate_ballots values('alice','${ids.vote}','non_votant','${hash}',now());`);
  await pg.exec('set role anon');
  assert.equal((await pg.query('select * from public.candidate_profiles')).rows.length,2);
  const result=(await pg.query("select public.candidate_vote_comparison(array['alice','bruno'],array['retraite'],15,0) as result")).rows[0].result;
  assert.equal(result.total,1);
  assert.deepEqual(result.votes[0].positions.map((p)=>[p.candidate,p.position]),[['alice','non_votant'],['bruno',null]]);
  await assert.rejects(pg.query("update public.candidate_profiles set name='faux'"));
  await pg.exec('reset role');
  await pg.exec(`update public.evidence set status='draft' where id='${ids.vote}'`);
  await pg.exec('set role anon');
  assert.equal((await pg.query('select * from public.candidate_ballots')).rows.length,0);
});

test('revue : pas de publication directe, pas de contenu modifiable, auteur et repère contrôlés',async(t)=>{
  const {pg,db}=await fresh(t);
  await pg.exec(profileSQL('alice')+"insert into actors(id,name,kind) values('44444444-4444-4444-8444-444444444444','Parti fictif','party');");
  const document={measures:[{slug:'age',subject:'retraites',question:'Question fictive',description:'Dispositif fictif',links:[{evidence_external_id:'vote-1',role:'vote',rationale:'Lien documentaire fictif',confidence:0.9}]}],
    connections:[{candidate_slug:'alice',actor_id:'44444444-4444-4444-8444-444444444444',relation:'electoral_support',started_at:'2026-01-01',source_url:'https://example.test/support',source_locator:'communiqué fictif, page 1',retrieved_at:'2026-01-02T00:00:00Z'}]};
  await importMeasures(db,document,{dryRun:false});
  await assert.rejects(pg.query("update policy_measures set status='published',reviewed_by='test',reviewed_at=now()"),/Transition/);
  await assert.rejects(pg.query(`insert into policy_measure_evidence(measure_id,evidence_id,actor_id,role,rationale,program_edition,program_election,program_published_at)
    select id,'${ids.vote}','${ids.actor}','program','fictif','2022','2022','2022-01-01' from policy_measures`),/rôle/);
  await pg.exec("insert into admin_users(email) values('reviewer@example.test');set role authenticated;select set_config('request.jwt.claims','{\"email\":\"reviewer@example.test\"}',false)");
  await assert.rejects(pg.query("update policy_measures set question='faux'"));
  await assert.rejects(pg.query("update policy_measures set status='reviewed',reviewed_by='autre@example.test',reviewed_at=now()"));
  await pg.exec(`update policy_measures set status='reviewed',reviewed_by='reviewer@example.test',reviewed_at=now();update policy_measures set status='published';
    update policy_measure_evidence set status='reviewed',reviewed_by='reviewer@example.test',reviewed_at=now();update policy_measure_evidence set status='published';
    update candidate_connections set status='reviewed',reviewed_by='reviewer@example.test',reviewed_at=now();update candidate_connections set status='published';reset role;set role anon;`);
  assert.equal((await pg.query('select * from policy_measure_evidence')).rows.length,1);
  assert.equal((await pg.query('select relation from candidate_connections')).rows[0].relation,'electoral_support');
  await pg.exec('reset role');
  await assert.rejects(importMeasures(db,document,{dryRun:false}),/relue/);
  await pg.exec(`update evidence set status='draft' where id='${ids.vote}';set role anon`);
  assert.equal((await pg.query('select * from policy_measure_evidence')).rows.length,0);
});

test('import nominatif : empreintes vérifiées, simulation, idempotence et changement de bulletin refusé',async(t)=>{
  const {pg,db}=await fresh(t);
  const dir=mkdtempSync(join(tmpdir(),'candidate-fixture-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));
  const referential=join(dir,'ref'),votes=join(dir,'votes');mkdirSync(referential);mkdirSync(votes);
  const actor=zipSync({'acteur.json':strToU8(JSON.stringify({acteur:{uid:'PA123',etatCivil:{ident:{prenom:'Alice',nom:'Exemple'}}}}))});
  const scrutin={uid:'vote-1',syntheseVote:{decompte:{pour:1}},ventilationVotes:{organe:{groupes:{groupe:[{vote:{decompteNominatif:{pours:{votant:{acteurRef:'PA123'}}}}}]}}}};
  const vote=zipSync({'vote.json':strToU8(JSON.stringify({scrutin}))});
  const write=(root,bytes,importer)=>{writeFileSync(join(root,'archive.zip'),bytes);const raw={file:'archive.zip',url:'https://example.test/archive',sha256:createHash('sha256').update(bytes).digest('hex'),fetched_at:'2026-01-02T00:00:00Z'};writeFileSync(join(root,'manifest.json'),JSON.stringify({importer,raw:[raw]}));return raw;};
  write(referential,actor,'an-referentiel');const raw=write(votes,vote,'an-scrutins');
  await pg.query('update vote_party_coverage set archive_sha256=$1',[raw.sha256]);
  await pg.exec(`insert into public.polls(source_provider,external_id,institute,fieldwork_start,fieldwork_end,source_url,source_origin,dataset_url,dataset_sha256,content_sha256,retrieved_at)
    values('fixture','p1','Fictif','2026-01-01','2026-01-01','https://example.test/p','fixture','https://example.test/csv','${hash}','${hash}',now());
    insert into poll_scenarios(poll_id,round,scenario_number,is_primary,configuration_key) select id,1,1,true,'1:alice' from polls;
    insert into poll_results(scenario_id,candidate_external_id,candidate_name,score) select id,'alice','Alice Exemple',50 from poll_scenarios;`);
  const options={referential,votes,publish:true,identities:[{slug:'alice',name:'Alice Exemple',reference:'PA123'}]};
  assert.equal((await syncCandidates(db,options)).ballots,1);
  assert.equal((await pg.query('select * from candidate_profiles')).rows.length,0);
  assert.equal((await syncCandidates(db,{...options,dryRun:false})).ballots,1);
  assert.equal((await syncCandidates(db,{...options,dryRun:false})).ballots,0);
  await pg.exec("update candidate_ballots set position='contre'");
  await assert.rejects(syncCandidates(db,{...options,dryRun:false}),/différent/);
  writeFileSync(join(referential,'archive.zip'),'broken');
  await assert.rejects(syncCandidates(db,options),/Empreinte/);
});

test('méthode : rattachement daté, absence non inférée et sélection bornée',()=>{
  assert.equal(connectionActive({started_at:'2025-01-01',ended_at:'2025-12-31'},'2026-01-01'),false);
  assert.match(positionLabel(null),/non disponible/);
  assert.notEqual(positionLabel(null),positionLabel('non_votant'));
  assert.deepEqual(comparisonCandidates(['a','a','unknown','b','c','d'],['a','b','c','d']),['a','b','c']);
  assert.throws(()=>checkedBallots({syntheseVote:{decompte:{pour:1}},ventilationVotes:{}}),/non conforme/);
});
