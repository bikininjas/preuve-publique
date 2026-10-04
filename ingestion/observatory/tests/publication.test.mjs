import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {PGlite} from '@electric-sql/pglite';
import {pgliteClient} from '../../tests/helpers/pglite-client.mjs';
import {importDocument} from '../import.mjs';
import {judicialPublicationEligible,publishJudicial} from '../publish-judicial.mjs';
import {judicialRecord} from '../../../tests/fixtures/judicial.mjs';
function fixture(){const r=judicialRecord();const s=r.detail.judicial.snapshot.sources.find(s=>s.url===r.source_url);s.sha256='a'.repeat(64);s.retrieved_at='2026-10-04T12:00:00Z';r.source={...r.source,url:r.source_url,sha256:s.sha256,retrieved_at:s.retrieved_at};return r;}
test('publication rejects unstructured cases, press-only claims and unsupported finality',()=>{
 const r=fixture();assert.equal(judicialPublicationEligible(r),true);
 const missing=structuredClone(r);delete missing.detail.judicial.snapshot;assert.equal(judicialPublicationEligible(missing),false);
 const press=structuredClone(r);press.source_url='https://www.publicsenat.fr/fixture';assert.equal(judicialPublicationEligible(press),false);
 const noCapture=structuredClone(r);noCapture.detail.judicial.snapshot.sources.forEach(s=>{delete s.sha256;delete s.capture_sha256;});assert.equal(judicialPublicationEligible(noCapture),false);
 const unproved=structuredClone(r);const p=unproved.detail.judicial.snapshot.participants.find(p=>p.role==='implicated');if(p){p.outcome='convicted';p.finality='final';p.finality_scope='guilt_and_sentence';delete p.finality_source;assert.equal(judicialPublicationEligible(unproved),false);}
});
test('SQL publication: rollback, direct factual publication, idempotence and public RLS',async t=>{
 const pg=new PGlite();t.after(()=>pg.close());const db=pgliteClient(pg);
 await pg.exec("create role anon;create role authenticated;create schema auth;create function auth.jwt() returns jsonb language sql stable as $$select '{}'::jsonb$$;grant usage on schema auth to anon,authenticated;grant execute on function auth.jwt() to anon,authenticated;");
 const dir=new URL('../../../supabase/migrations/',import.meta.url);
 const names=['20260929000000_initial.sql','20260930000000_backend_pipeline.sql','20261001000000_fix_reference_policies.sql','20261001052438_publication_confidence.sql','20261002000000_admin_review.sql','20261004000000_evidence_topics.sql'];
 for(const suffix of ['observatory_editorial_evidence.sql','official_indicators_without_review.sql','judicial_source_verified.sql'])names.push(readdirSync(dir).find(f=>f.endsWith('_'+suffix)));
 for(const file of names)await pg.exec(readFileSync(new URL(file,dir),'utf8'));
 await pg.exec('grant usage on schema public to anon,authenticated');
 const r=fixture(),prepared={edition:'test-judicial',records:[r],sourceCount:1,bytes:0};
 const dry=await importDocument(db,prepared);assert.equal(dry.publication.published,1);assert.equal((await db.query('select count(*)::int n from evidence')).rows[0].n,0);
 const actual=await importDocument(db,prepared,{dryRun:false});assert.equal(actual.publication.published,1);
 const row=(await db.query('select * from evidence')).rows[0];assert.equal(row.publication_method,'judicial_source_verified');assert.equal(row.reviewed_by,null);assert.equal(row.publication_confidence,null);assert.equal(row.publication_checks.human_review,false);
 assert.equal((await publishJudicial(db,{dryRun:false})).published,0);
 await pg.exec('set role anon');assert.equal((await db.query('select count(*)::int n from evidence')).rows[0].n,1);
 await assert.rejects(db.query("update evidence set status='draft'"));await pg.exec('reset role');
 await assert.rejects(db.query("update evidence set reviewed_by='fake human'"),/evidence_direct_judicial_publication_check/);
});
