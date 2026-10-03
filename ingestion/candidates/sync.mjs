import { readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { parseZip } from '../importers/an-scrutins.mjs';
import { individualVotes } from '../lib/individual-votes.mjs';
import { IDENTITIES } from './identities.mjs';

export class CandidateImportError extends Error {}
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');

/** Verify every nominee, not only the candidate being extracted. */
export function checkedBallots(scrutin) {
  const result = individualVotes(scrutin);
  const total = scrutin.syntheseVote?.decompte ?? {};
  const official = ['pour','contre','abstentions','nonVotants'].reduce((sum,key) => sum + Number(total[key] ?? 0),0);
  if (result.conflicts || result.votes.size !== official) throw new CandidateImportError('Décompte nominatif non conforme.');
  return result.votes;
}

function archive(root, raw) {
  const path = resolve(root, raw.file);
  if (!path.startsWith(resolve(root) + '\\') && !path.startsWith(resolve(root) + '/')) throw new CandidateImportError('Chemin de staging invalide.');
  const bytes = readFileSync(path);
  if (hash(bytes) !== raw.sha256) throw new CandidateImportError('Empreinte du staging invalide.');
  return bytes;
}

export async function syncCandidates(db, { referential, votes, publish = false, dryRun = true, identities = IDENTITIES, currentSnapshotsOnly = false }) {
  const manifest = JSON.parse(readFileSync(join(referential,'manifest.json'),'utf8'));
  const voteManifest = JSON.parse(readFileSync(join(votes,'manifest.json'),'utf8'));
  if (manifest.importer !== 'an-referentiel' || voteManifest.importer !== 'an-scrutins') throw new CandidateImportError('Importeurs de staging invalides.');
  const verified = new Map();
  for (const raw of manifest.raw) {
    const result = await parseZip(archive(referential,raw), (file, content) => {
      const actor = JSON.parse(content).acteur;
      const uid = typeof actor?.uid === 'string' ? actor.uid : actor?.uid?.['#text'];
      const identity = identities.find((entry) => entry.reference === uid);
      if (!identity) return;
      const value = actor.etatCivil?.ident;
      if (`${value?.prenom} ${value?.nom}`.normalize('NFC') !== identity.name) throw new CandidateImportError(`Identité officielle différente : ${identity.slug}.`);
      if (verified.has(uid)) throw new CandidateImportError('Identité dupliquée dans les archives.');
      verified.set(uid,{ ...identity, raw, locator: file });
    });
    if (result.errors.length) throw new CandidateImportError('Référentiel illisible.');
  }
  if (verified.size !== identities.length) throw new CandidateImportError('Le référentiel ne contient pas toutes les identités attendues.');
  const stats = { identities: 0, connections: 0, ballots: 0, eligibleVotes: 0, matchedVotes: 0, dryRun };
  await db.query('begin');
  try {
    await db.query("select pg_advisory_xact_lock(hashtext('candidate-evidence-sync'))");
    for (const identity of verified.values()) {
      const { rows: actors } = await db.query('select id,name from public.actors where external_id=$1 and kind=\'person\'', [`an-acteur:${identity.reference}`]);
      if (actors.length !== 1 || actors[0].name !== identity.name) throw new CandidateImportError('Acteur en base non conforme au référentiel.');
      const { rows: nominees } = await db.query('select distinct candidate_name from public.poll_results where candidate_external_id=$1',[identity.slug]);
      if (nominees.length !== 1 || nominees[0].candidate_name !== identity.name) throw new CandidateImportError('Identité Sondax non conforme.');
      const { rows: previous } = await db.query('select * from public.candidate_profiles where slug=$1',[identity.slug]);
      if (previous.length && (previous[0].actor_id !== actors[0].id || previous[0].source_sha256 !== identity.raw.sha256 || previous[0].name !== identity.name)) throw new CandidateImportError('Correspondance existante modifiée : revue nécessaire.');
      const saved = await db.query(`insert into public.candidate_profiles
        (slug,provider,candidate_external_id,actor_id,name,actor_external_id,source_url,source_locator,retrieved_at,source_sha256,status)
        values ($1,'sondax',$1,$2,$3,$4,$5,$6,$7,$8,$9) on conflict(slug) do nothing`,
      [identity.slug,actors[0].id,identity.name,`an-acteur:${identity.reference}`,identity.raw.url,identity.locator,identity.raw.fetched_at,identity.raw.sha256,publish?'published':'draft']);
      stats.identities += saved.rowCount;
      const { rows: links } = await db.query(`select r.*, a.name, a.kind, s.url,s.sha256,s.retrieved_at
        from public.actor_relations r join public.actors a on a.id=r.to_actor_id join public.sources s on s.id=r.source_id
        where r.from_actor_id=$1 and r.relation in ('affiliated_to','member_of')`,[actors[0].id]);
      for (const link of links) {
        if (['Non déclaré(s)','Non rattaché(s)'].includes(link.name)) continue;
        if (link.sha256 !== identity.raw.sha256) throw new CandidateImportError('Source de rattachement différente du référentiel vérifié.');
        const savedLink = await db.query(`insert into public.candidate_connections
          (candidate_slug,actor_id,actor_name,relation,started_at,ended_at,source_url,source_locator,retrieved_at,source_sha256,status)
          values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) on conflict(candidate_slug,actor_id,relation,started_at) do nothing`,
        [identity.slug,link.to_actor_id,link.name,link.relation==='affiliated_to'?'financial_attachment':'parliamentary_group',link.started_at,link.ended_at,link.url,
          `${identity.locator} · mandat ${link.detail?.mandat_uid ?? link.id}`,link.retrieved_at,link.sha256,publish?'published':'draft']);
        stats.connections += savedLink.rowCount;
      }
    }
    const { rows: eligible } = await db.query(`select e.id,e.external_id,c.archive_sha256
      from public.evidence e join public.vote_party_coverage c on c.vote_id=e.id
      join public.sources s on s.id=e.source_id
      where e.kind='vote' and e.institution='assemblee' and e.status='published'
        and (not $1::boolean or c.archive_sha256=s.sha256)`, [currentSnapshotsOnly]);
    const eligibleById = new Map(eligible.map((row) => [row.external_id,row]));
    stats.eligibleVotes=eligible.length;
    const found = new Set();
    const ballots = [];
    for (const raw of voteManifest.raw) {
      const result = await parseZip(archive(votes,raw), (_file,content) => {
        const scrutin = JSON.parse(content).scrutin;
        const vote = eligibleById.get(scrutin?.uid);
        if (!vote) return;
        if (vote.archive_sha256 !== raw.sha256 || found.has(vote.id)) throw new CandidateImportError('Archive de scrutin différente ou doublon.');
        found.add(vote.id);
        const positions = checkedBallots(scrutin);
        for (const identity of identities) {
          const position = positions.get(identity.reference);
          if (position) ballots.push({candidate_slug:identity.slug,vote_id:vote.id,position,archive_sha256:raw.sha256,retrieved_at:raw.fetched_at});
        }
      });
      if (result.errors.length) throw new CandidateImportError('Archive de scrutins illisible.');
    }
    if (found.size !== eligible.length) throw new CandidateImportError('Des scrutins vérifiés manquent au staging.');
    stats.matchedVotes=found.size;
    for (let offset=0;offset<ballots.length;offset+=300) {
      const slice=ballots.slice(offset,offset+300);
      const { rows: conflicts }=await db.query(`select b.vote_id from public.candidate_ballots b join jsonb_to_recordset($1::jsonb)
        x(candidate_slug text,vote_id uuid,position text,archive_sha256 text) using(candidate_slug,vote_id)
        where b.position<>x.position or b.archive_sha256<>x.archive_sha256`,[JSON.stringify(slice)]);
      if (conflicts.length) throw new CandidateImportError('Bulletin déjà importé différent : revue nécessaire.');
      const saved=await db.query(`insert into public.candidate_ballots select * from jsonb_to_recordset($1::jsonb)
        x(candidate_slug text,vote_id uuid,position text,archive_sha256 text,retrieved_at timestamptz)
        on conflict(candidate_slug,vote_id) do nothing`,[JSON.stringify(slice)]);
      stats.ballots+=saved.rowCount;
    }
    await db.query(dryRun?'rollback':'commit');
    return stats;
  } catch(error) { await db.query('rollback'); throw error; }
}
