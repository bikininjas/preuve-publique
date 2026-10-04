import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {PGlite} from '@electric-sql/pglite';
import {pgliteClient} from './helpers/pglite-client.mjs';
import {ARCHIVE_TABLES,pruneArchivedVotes,restoreArchivedVotes} from '../backfill/retention.mjs';
test('archived cleanup rolls back by default, protects edits and restores IDs, provenance and dependent tallies',async t=>{
 const pg=new PGlite();t.after(()=>pg.close());const db=pgliteClient(pg);
 await pg.exec("create role anon;create role authenticated;create schema auth;create function auth.jwt() returns jsonb language sql stable as $$ select '{}'::jsonb $$;");
 const dir=new URL('../../supabase/migrations/',import.meta.url);
 const deferred=['20261002061929_presidential_polls.sql','20261002092834_candidate_evidence_path.sql','20261002121123_observatory_editorial_evidence.sql','20261002175844_official_indicators_without_review.sql','20261004075119_judicial_source_verified.sql'];
 // The historical names predate their dependencies; use the actual installation order.
 const files=[...readdirSync(dir).filter(f=>f.endsWith('.sql')&&!deferred.includes(f)).sort(),...deferred];
 for(const file of files)await pg.exec(readFileSync(new URL(file,dir),'utf8'));
 const source=(await db.query("insert into public.sources(url,publisher,document_title) values('https://example.test/archive','Fixture','Fixture') returning id")).rows[0].id;
 const party=(await db.query("insert into public.actors(name,kind) values('Fixture','party') returning id")).rows[0].id;
 const ids=[];
 for(const title of ["Scrutin n° 1 — l'ensemble du projet de loi test (lecture définitive)","Scrutin n° 2 — l'amendement n° 1 au projet de loi test"]){ids.push((await db.query("insert into public.evidence(source_id,title,kind,institution,occurred_at,source_url,status) values($1,$2,'vote','assemblee','2026-01-01','https://example.test/vote','draft') returning id",[source,title])).rows[0].id);}
 await db.query("insert into public.vote_party_coverage(vote_id,recorded_individuals,unattributed_individuals,official_individuals,archive_sha256) values($1,1,0,1,$2)",[ids[1],'a'.repeat(64)]);
 await db.query('insert into public.vote_party_tallies(vote_id,party_id,pour) values($1,$2,1)',[ids[1],party]);
 await db.query("update evidence set detail='{\"sort\":{\"code\":\"adopté\"}}'::jsonb where id=$1",[ids[0]]);
 const archive={version:1,tables:{}};
 for(const table of ARCHIVE_TABLES)archive.tables[table]=JSON.parse(JSON.stringify((await db.query(`select * from public.${table}`)).rows));
 assert.equal((await pruneArchivedVotes(db,archive)).removed.evidence,1);
 assert.equal((await db.query('select count(*)::int n from evidence')).rows[0].n,2);
 await db.query("update evidence set title='Source modifiée' where id=$1",[ids[1]]);
 await assert.rejects(pruneArchivedVotes(db,archive,{dryRun:false}),/changé/);
 await db.query('update evidence set title=$2 where id=$1',[ids[1],archive.tables.evidence.find(row=>row.id===ids[1]).title]);
 assert.equal((await pruneArchivedVotes(db,archive,{dryRun:false})).removed.vote_party_tallies,1);
 assert.equal((await db.query('select count(*)::int n from vote_party_tallies')).rows[0].n,0);
 assert.equal((await restoreArchivedVotes(db,archive,{dryRun:false})).restored.evidence,1);
 assert.equal((await db.query('select vote_id from vote_party_tallies')).rows[0].vote_id,ids[1]);
 assert.equal((await db.query('select title from evidence where id=$1',[ids[1]])).rows[0].title,archive.tables.evidence.find(row=>row.id===ids[1]).title);
});
