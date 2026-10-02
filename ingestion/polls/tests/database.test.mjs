import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
import { pgliteClient } from '../../tests/helpers/pglite-client.mjs';
import { parseSondax, PollImportError } from '../sondax.ts';
import { syncSondax } from '../sync.ts';

const fixture = readFileSync(new URL('./fixtures/sondax.csv', import.meta.url), 'utf8');
const download = (csv = fixture, provider) => async () => ({ documents: parseSondax(csv).map((p) => ({ ...p, source_provider: provider ?? p.source_provider })),
  datasetUrl: 'https://sondax.fr/donnees/sondages-presidentielle-2027.csv', finalUrl: 'https://sondax.fr/donnees/sondages-presidentielle-2027.csv',
  datasetHash: 'a'.repeat(64), retrievedAt: '2026-06-01T01:02:03Z', bytes: 1000, fallback: false });

async function freshDb(t) {
  const pg = new PGlite();
  t.after(() => pg.close());
  await pg.exec(`create role anon; create role authenticated; create schema auth;
    create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb $$;
    grant usage on schema public, auth to anon, authenticated; grant execute on function auth.jwt() to anon, authenticated;`);
  for (const name of ['20260929000000_initial', '20260930000000_backend_pipeline', '20261002000000_admin_review', '20261002061929_presidential_polls']) {
    await pg.exec(readFileSync(new URL(`../../../supabase/migrations/${name}.sql`, import.meta.url), 'utf8'));
  }
  return pgliteClient(pg);
}

const count = async (db, table) => Number((await db.query(`select count(*) as n from public.${table}`)).rows[0].n);
const list = async (db, params = []) => (await db.query('select public.poll_list($1,$2,$3,$4,$5,$6,$7,$8,$9) as value',
  [...params, ...Array(9).fill(null)].slice(0, 9))).rows[0].value;

test('migration, import idempotent, publication explicite, mises à jour minimales et révisions', async (t) => {
  const db = await freshDb(t);
  const first = await syncSondax(db, { download: download() });
  assert.equal(first.added, 2); assert.equal(first.scenarios, 4); assert.equal(first.results, 8);
  assert.equal((await list(db)).total, 0);
  const unchanged = await syncSondax(db, { download: download() });
  assert.equal(unchanged.unchanged, 2); assert.equal(unchanged.results, 0);
  assert.equal(await count(db, 'poll_revisions'), 2);
  const pub = await syncSondax(db, { download: download(), publish: true });
  assert.equal(pub.published, 2); assert.equal(pub.modified, 0); assert.equal(pub.results, 0);
  const ids = (await db.query('select id, imported_at from public.polls order by external_id')).rows;
  const update = await syncSondax(db, { download: download(fixture.replace('40.5,wikipedia', '41.5,wikipedia').replace('59.5,wikipedia', '58.5,wikipedia')), publish: true });
  assert.equal(update.modified, 1); assert.equal(update.unchanged, 1); assert.equal(update.results, 2); assert.equal(update.scenarios, 0);
  assert.deepEqual((await db.query('select id, imported_at from public.polls order by external_id')).rows, ids);
  assert.equal(await count(db, 'poll_revisions'), 3);
  assert.equal((await db.query("select count(*) as n from public.ingestion_runs where status='ok' and finished_at is not null")).rows[0].n, 4);
  assert.ok((await db.query('select last_success_at from public.poll_sync_state')).rows[0].last_success_at);
});

test('disparition temporaire de sondage, configuration ou ligne : aucune suppression ni corruption', async (t) => {
  const db = await freshDb(t);
  await syncSondax(db, { download: download(), publish: true });
  const shortened = fixture.split('\n').filter((line) => !line.startsWith('autre-')).join('\n');
  await syncSondax(db, { download: download(shortened), publish: true });
  assert.equal(await count(db, 'polls'), 2);
  const missingScenario = fixture.split('\n').filter((line) => !line.includes(',1,2,0,')).join('\n');
  const retained = await syncSondax(db, { download: download(missingScenario), publish: true });
  assert.equal(retained.retained, 1); assert.equal(retained.warnings.length, 1);
  assert.equal(await count(db, 'poll_results'), 8);
  const missingLine = fixture.split('\n').filter((line) => !line.includes('40.5,wikipedia')).join('\n');
  await assert.rejects(syncSondax(db, { download: download(missingLine) }), /incomplets/);
  assert.equal(await count(db, 'poll_results'), 8);
});

test('sources distinctes, changement de liste de candidats signalé pour contrôle', async (t) => {
  const db = await freshDb(t);
  await syncSondax(db, { download: download(), publish: true });
  await syncSondax(db, { download: download(fixture, 'future-provider') });
  assert.equal(await count(db, 'polls'), 4);
  const result = await syncSondax(db, { download: download(fixture.replaceAll(',alice,', ',nouvelle,')), publish: true });
  assert.equal(result.retained, 2);
  assert.equal((await list(db)).total, 2);
});

test('échec réseau ou SQL : rollback atomique, erreur privée, dernier succès préservé', async (t) => {
  const db = await freshDb(t);
  await syncSondax(db, { download: download(), publish: true });
  const state = (await db.query('select * from public.poll_sync_state')).rows;
  await assert.rejects(syncSondax(db, { download: async () => { throw new PollImportError('Sondax indisponible.'); } }), /indisponible/);
  const faulty = { query: (sql, params) => sql.startsWith('insert into public.poll_results')
    ? Promise.reject(new Error('secret-driver-error')) : db.query(sql, params) };
  await assert.rejects(syncSondax(faulty, { download: download(fixture.replace('40.5,wikipedia', '41,wikipedia')), publish: true }), /transaction annulée/);
  assert.deepEqual((await db.query('select * from public.poll_sync_state')).rows, state);
  assert.equal(await count(db, 'poll_revisions'), 2);
  assert.equal((await db.query("select count(*) as n from public.ingestion_runs where status='error'")).rows[0].n, 2);
  assert.ok(!(await db.query('select error from public.ingestion_runs')).rows.some((r) => String(r.error).includes('secret-driver-error')));
  assert.equal((await syncSondax(db, { download: download() })).unchanged, 2);
});

test('RLS : seuls les sondages publiés et leurs enfants, aucune écriture publique, révisions privées', async (t) => {
  const db = await freshDb(t);
  await syncSondax(db, { download: download(), publish: true });
  await syncSondax(db, { download: download(fixture, 'draft-provider') });
  await db.query('set role anon');
  assert.equal(await count(db, 'polls'), 2); assert.equal(await count(db, 'poll_scenarios'), 4); assert.equal(await count(db, 'poll_results'), 8);
  assert.equal((await list(db)).total, 2);
  await assert.rejects(db.query('select * from public.poll_revisions'), /permission denied/);
  await assert.rejects(db.query("update public.polls set status='published'"), /permission denied/);
  await assert.rejects(db.query("insert into public.poll_sync_state values ('x',now(),'x','x')"), /permission denied/);
  await db.query('reset role');
  await db.query("select set_config('request.jwt.claims', '{\"email\":\"visitor@example.org\"}', false)");
  await db.query('set role authenticated');
  assert.equal(await count(db, 'poll_revisions'), 0);
  await assert.rejects(db.query("update public.poll_results set score=0"), /permission denied/);
  await db.query('reset role');
  await db.query("select set_config('request.jwt.claims', '{\"email\":\"sebpicot@gmail.com\"}', false)");
  await db.query('set role authenticated');
  assert.equal(await count(db, 'poll_revisions'), 4);
});

test('API SQL : filtres sur configurations, candidats complets, tri, pagination et options', async (t) => {
  const db = await freshDb(t);
  await syncSondax(db, { download: download(), publish: true });
  await db.query('set role anon');
  const byCandidate = await list(db, [null, 'alice']);
  assert.equal(byCandidate.total, 2);
  assert.equal(byCandidate.polls[0].external_id, 'autre-2026-05-03');
  assert.equal(byCandidate.polls[1].scenarios.length, 2);
  assert.ok(byCandidate.polls.every((poll) => poll.scenarios.every((scenario) => scenario.results.length === 2)));
  const hypothesis = await list(db, [null, null, null, 1, null, null, '1:alice|bruno']);
  assert.equal(hypothesis.total, 2); assert.equal(hypothesis.polls[1].scenarios.length, 1);
  assert.equal((await list(db, ['Institut Exemple', null, 'CX'])).polls[0].scenarios[0].scenario_number, 2);
  assert.equal((await list(db, [null, null, null, 2])).total, 1);
  assert.equal((await list(db, [null, null, null, null, '2026-05-01'])).total, 1);
  assert.equal((await list(db, [null, null, null, null, null, '2026-04-30'])).total, 1);
  assert.equal((await list(db, [null, null, null, null, null, null, null, 1, 1])).polls[0].external_id, 'exemple-2026-04-02');
  const beyond = await list(db, [null, null, null, null, null, null, null, 1, 9]);
  assert.equal(beyond.total, 2); assert.deepEqual(beyond.polls, []);
  const options = (await db.query('select public.poll_options() as value')).rows[0].value;
  assert.equal(options.institutes.length, 2); assert.equal(options.configurations.length, 3);
  assert.equal(options.configurations[0].key, '1:alice|bruno');
  assert.equal(options.configurations[0].measurements, 2);
});
