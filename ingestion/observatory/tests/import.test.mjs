import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { PGlite } from '@electric-sql/pglite';
import { pgliteClient } from '../../tests/helpers/pglite-client.mjs';
import { validateDocument, prepareDocument, importDocument } from '../import.mjs';

const pilot = () => JSON.parse(readFileSync(new URL('../pilot.json', import.meta.url), 'utf8'));
const fakeFetch = async (url) => {
  const body = Buffer.from(url.includes('insee.fr') ? '2063 15,4 0,297 07/07/2025' : '%PDF-1.7 source primaire');
  return { body, bytes: body.length, finalUrl: url, fetchedAt: '2026-10-02T12:00:00Z', sha256: createHash('sha256').update(body).digest('hex') };
};

test('le lot exige champ, méthode, édition et limite judiciaire ; aucune publication par import', () => {
  for (const mutate of [
    (d) => { delete d.records[3].detail.indicator.population; },
    (d) => { d.records[3].detail.indicator.series.at(-1).value = 99; },
    (d) => { delete d.records[0].detail.program.publication_date; },
    (d) => { delete d.records[5].detail.judicial.current_status_note; },
    (d) => { d.records[0].status = 'published'; },
    (d) => { d.records[1].external_id = d.records[0].external_id; },
  ]) {
    const document = pilot(); mutate(document); assert.throws(() => validateDocument(document));
  }
});

test('les empreintes sont calculées sur les documents ; une page de protection ne vaut pas PDF', async () => {
  let calls = 0;
  const prepared = await prepareDocument(pilot(), { fetchDocument: async (url) => { calls++; return fakeFetch(url); } });
  assert.equal(calls, 5);
  assert.equal(prepared.records.length, 6);
  assert.match(prepared.records[0].source.sha256, /^[a-f0-9]{64}$/);
  await assert.rejects(prepareDocument(pilot(), { fetchDocument: async (url) => ({ ...await fakeFetch(url), body: Buffer.from('<html>enable JS</html>') }) }), /pas un PDF/);
  await assert.rejects(prepareDocument(pilot(), { fetchDocument: async (url) => ({ ...await fakeFetch(url), finalUrl: 'https://example.org/login' }) }), /Redirection/);
});

test('Postgres : rollback, idempotence, verrouillage des pièces relues et RLS publique', async () => {
  const pg = new PGlite();
  try {
    await pg.exec(`create role anon; create role authenticated; create schema auth;
      create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb $$;
      grant usage on schema auth to anon,authenticated; grant execute on function auth.jwt() to anon,authenticated;`);
    const migrations = new URL('../../../supabase/migrations/', import.meta.url);
    const base = ['20260929000000_initial.sql', '20260930000000_backend_pipeline.sql', '20261001000000_fix_reference_policies.sql', '20261001052438_publication_confidence.sql', '20261002000000_admin_review.sql', '20261004000000_evidence_topics.sql'];
    const editorial = readdirSync(migrations).find((file) => file.endsWith('_observatory_editorial_evidence.sql'));
    for (const file of [...base, editorial]) await pg.exec(readFileSync(new URL(file, migrations), 'utf8'));
    await pg.exec('grant usage on schema public to anon,authenticated');
    const db = pgliteClient(pg);
    const prepared = await prepareDocument(pilot(), { fetchDocument: fakeFetch });
    await importDocument(db, prepared);
    assert.equal((await pg.query('select count(*)::int as n from public.evidence')).rows[0].n, 0);
    const first = await importDocument(db, prepared, { dryRun: false });
    assert.equal(first.inserted, 6);
    assert.equal((await importDocument(db, prepared, { dryRun: false })).unchanged, 6);
    await pg.exec('set role anon');
    assert.equal((await pg.query('select count(*)::int as n from public.evidence')).rows[0].n, 0);
    assert.equal((await pg.query('select count(*)::int as n from public.sources')).rows[0].n, 0);
    await assert.rejects(pg.query("insert into public.sources(url,publisher,document_title) values('https://example.org','x','x')"), /permission denied/);
    await pg.exec('reset role');
    const id = first.pieces[3].id;
    await assert.rejects(pg.query("update public.evidence set status='published' where id=$1", [id]), /evidence_editorial_review_check/);
    await pg.query("update public.evidence set status='reviewed',reviewed_by='human@example.org',reviewed_at=now() where id=$1", [id]);
    const changed = structuredClone(prepared);
    changed.records[3].title = 'Modification à vérifier';
    changed.records[3].source.sha256 = 'f'.repeat(64);
    const repeat = await importDocument(db, changed, { dryRun: false });
    assert.equal(repeat.locked_changed, 1);
    assert.equal((await pg.query('select title from public.evidence where id=$1', [id])).rows[0].title, prepared.records[3].title);
    assert.equal((await pg.query('select s.sha256 from public.sources s join public.evidence e on e.source_id=s.id where e.id=$1', [id])).rows[0].sha256, prepared.records[3].source.sha256);
    const changedSharedSource = structuredClone(prepared);
    changedSharedSource.records[4].source.sha256 = 'e'.repeat(64);
    assert.equal((await importDocument(db, changedSharedSource, { dryRun: false })).locked_changed, 1);
    assert.equal((await pg.query('select s.sha256 from public.sources s join public.evidence e on e.source_id=s.id where e.id=$1', [id])).rows[0].sha256, prepared.records[3].source.sha256);
    await pg.query("update public.evidence set status='published' where id=$1", [id]);
    await pg.exec('set role anon');
    assert.equal((await pg.query('select count(*)::int as n from public.evidence')).rows[0].n, 1);
    assert.equal((await pg.query('select count(*)::int as n from public.sources')).rows[0].n, 1);
    await pg.exec('reset role');
    await assert.rejects(pg.query("update public.evidence set detail='{}'::jsonb where kind='judicial_event'"), /evidence_judicial_context_check/);
  } finally { await pg.close(); }
});
