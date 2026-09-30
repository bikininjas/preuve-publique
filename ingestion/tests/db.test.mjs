// Integration tests against a real PostgreSQL engine (PGlite: PostgreSQL
// compiled to WebAssembly) running the exact migration files, exercised
// through the same code paths the CLI uses. They verify the guarantees the
// project depends on: idempotent pushes, reviewed pieces never overwritten,
// dry runs that roll back, and the real effect of the RLS policies for the
// `anon` role the website uses.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { pgliteClient } from './helpers/pglite-client.mjs';
import * as db from '../lib/db.mjs';
import { buildEvidence } from '../lib/normalize.mjs';
import { writeJson, writeJsonl } from '../lib/staging.mjs';

const ROOT = resolve(import.meta.dirname, '..', '..');
const MIGRATIONS = [
  '20260929000000_initial.sql',
  '20260930000000_backend_pipeline.sql',
  '20261001000000_fix_reference_policies.sql',
];

async function freshDb() {
  const pglite = new PGlite();
  // Supabase provides these roles; a bare PostgreSQL does not.
  await pglite.exec('create role anon; create role authenticated;');
  for (const file of MIGRATIONS) {
    await pglite.exec(readFileSync(join(ROOT, 'supabase', 'migrations', file), 'utf8'));
  }
  // Supabase grants schema usage to the API roles by default; replicate that.
  await pglite.exec('grant usage on schema public to anon, authenticated;');
  return pgliteClient(pglite);
}

function draft(overrides = {}) {
  return buildEvidence({
    external_id: 'VTANR5L15V2944',
    kind: 'vote',
    institution: 'assemblee',
    title: 'Scrutin n° 2944 — article 24 bis',
    excerpt: null,
    occurred_at: '2020-10-07',
    source_url: 'https://www.assemblee-nationale.fr/dyn/15/scrutins/2944',
    source_locator: 'json/VTANR5L15V2944.json dans Scrutins_XV.json.zip',
    detail: { refs: [{ type: 'an:seance', value: 'SEANCE-1' }] },
    source: {
      url: 'https://data.assemblee-nationale.fr/static/openData/repository/15/loi/scrutins/Scrutins_XV.json.zip',
      publisher: 'Assemblée nationale',
      document_title: 'Scrutins publics — législature 15 (archive JSON officielle)',
      sha256: 'b'.repeat(64),
      retrieved_at: '2026-01-02T03:04:05.000Z',
    },
    ...overrides,
  });
}

function writeStaging(records) {
  const dir = mkdtempSync(join(tmpdir(), 'pp-staging-'));
  writeJsonl(join(dir, 'evidence.jsonl'), records);
  writeJsonl(join(dir, 'sources.jsonl'), []);
  writeJsonl(join(dir, 'actors.jsonl'), []);
  writeJson(join(dir, 'manifest.json'), {
    importer: 'test',
    created_at: new Date().toISOString(),
    options: {},
    counts: {},
    raw: [],
    notes: [],
  });
  return dir;
}

const cleanup = (dir) => rmSync(dir, { recursive: true, force: true });

test('both migrations apply cleanly and add the pipeline columns', async () => {
  const client = await freshDb();
  const { rows } = await client.query(
    'select column_name from information_schema.columns where table_schema = $1 and table_name = $2 order by column_name',
    ['public', 'evidence'],
  );
  const names = rows.map((row) => row.column_name);
  for (const expected of ['detail', 'reviewed_by', 'reviewed_at', 'search']) {
    assert.ok(names.includes(expected), `colonne ${expected} attendue`);
  }
  const runs = await client.query('select count(*)::int as n from public.ingestion_runs');
  assert.equal(runs.rows[0].n, 0);
});

test('push is idempotent and a reviewed piece is never overwritten', async () => {
  const client = await freshDb();
  const dir = writeStaging([draft()]);

  const first = await db.pushStaging(client, dir, {});
  assert.equal(first.stats.evidence.inserted, 1);
  assert.equal(first.stats.sources, 1);

  const again = await db.pushStaging(client, dir, {});
  assert.equal(again.stats.evidence.unchanged, 1);
  assert.equal(again.stats.evidence.inserted, 0);

  writeJsonl(join(dir, 'evidence.jsonl'), [draft({ title: 'Scrutin n° 2944 — corrigé' })]);
  const updated = await db.pushStaging(client, dir, {});
  assert.equal(updated.stats.evidence.updated, 1);

  const { rows: [row] } = await client.query(
    'select id, status, title from public.evidence where external_id = $1',
    ['VTANR5L15V2944'],
  );
  assert.equal(row.status, 'draft');
  assert.equal(row.title, 'Scrutin n° 2944 — corrigé');

  await db.setReviewStatus(client, { table: 'evidence', id: row.id, status: 'reviewed', reviewer: 'relecture de test' });
  await db.setReviewStatus(client, { table: 'evidence', id: row.id, status: 'published', reviewer: 'relecture de test' });

  writeJsonl(join(dir, 'evidence.jsonl'), [draft({ title: 'Scrutin n° 2944 — corrigé encore' })]);
  const locked = await db.pushStaging(client, dir, {});
  assert.equal(locked.stats.evidence.locked_changed, 1);
  assert.equal(locked.stats.locked.length, 1);

  const { rows: [after] } = await client.query(
    'select title, status, reviewed_by from public.evidence where id = $1',
    [row.id],
  );
  assert.equal(after.title, 'Scrutin n° 2944 — corrigé');
  assert.equal(after.status, 'published');
  assert.equal(after.reviewed_by, 'relecture de test');
  cleanup(dir);
});

test('a dry run exercises the SQL and rolls everything back', async () => {
  const client = await freshDb();
  const dir = writeStaging([draft()]);
  const result = await db.pushStaging(client, dir, { dryRun: true });
  assert.equal(result.stats.evidence.inserted, 1);
  const { rows } = await client.query('select count(*)::int as n from public.evidence');
  assert.equal(rows[0].n, 0);
  const sources = await client.query('select count(*)::int as n from public.sources');
  assert.equal(sources.rows[0].n, 0);
  cleanup(dir);
});

test('anon sees published rows only and cannot touch ingestion_runs', async () => {
  const client = await freshDb();
  const dir = writeStaging([
    draft(),
    draft({ external_id: 'VTANR5L15V2945', title: 'Scrutin n° 2945 — autre' }),
  ]);
  await db.pushStaging(client, dir, {});
  const { rows: [row] } = await client.query(
    'select id from public.evidence where external_id = $1',
    ['VTANR5L15V2944'],
  );
  await db.setReviewStatus(client, { table: 'evidence', id: row.id, status: 'reviewed', reviewer: 'test' });
  await db.setReviewStatus(client, { table: 'evidence', id: row.id, status: 'published', reviewer: 'test' });

  await client.query('set role anon');
  const visible = await client.query('select external_id from public.evidence');
  assert.equal(visible.rows.length, 1);
  assert.equal(visible.rows[0].external_id, 'VTANR5L15V2944');
  // Régression : la politique `sources_read` de la migration initiale rendait
  // les sources invisibles (id non qualifié résolu vers evidence.id) ; la
  // migration de correction doit rendre la source de la pièce publiée lisible.
  const sources = await client.query('select document_title from public.sources');
  assert.equal(sources.rows.length, 1, 'la source d’une pièce publiée doit être lisible');
  await assert.rejects(() => client.query('select * from public.ingestion_runs'));
  await assert.rejects(() => client.query(
    `insert into public.evidence (source_id, title, kind, occurred_at, source_url)
     values (gen_random_uuid(), 'x', 'vote', '2020-01-01', 'https://exemple.test/x')`,
  ));
  await client.query('reset role');
  cleanup(dir);
});

test('deterministic links are drafts, deduplicated, and visible only once published', async () => {
  const client = await freshDb();
  const dir = writeStaging([
    draft({ external_id: 'A1', detail: { refs: [{ type: 'senat:dossier', value: 'ppl23-555' }] } }),
    draft({
      external_id: 'B1',
      kind: 'adopted_text',
      institution: 'senat',
      source_url: 'https://www.senat.fr/dossier-legislatif/ppl23-555.html',
      detail: { refs: [{ type: 'senat:dossier', value: 'ppl23-555' }] },
    }),
  ]);
  await db.pushStaging(client, dir, {});

  const stats = await db.generateLinks(client, {});
  assert.equal(stats.links.inserted, 1);
  const second = await db.generateLinks(client, {});
  assert.equal(second.links.unchanged, 1);

  const { rows: [link] } = await client.query(
    'select id, relation, status, confidence, method from public.evidence_links',
  );
  assert.equal(link.relation, 'same_proposal');
  assert.equal(link.status, 'draft');
  assert.equal(link.method, 'deterministic');
  assert.equal(Number(link.confidence), 1);

  await client.query('set role anon');
  const hidden = await client.query('select count(*)::int as n from public.evidence_links');
  assert.equal(hidden.rows[0].n, 0);
  await client.query('reset role');

  await db.setReviewStatus(client, { table: 'evidence_links', id: link.id, status: 'reviewed', reviewer: 'test' });
  await db.setReviewStatus(client, { table: 'evidence_links', id: link.id, status: 'published', reviewer: 'test' });
  // Both pieces are still drafts: the published link must stay invisible.
  await client.query('set role anon');
  const stillHidden = await client.query('select count(*)::int as n from public.evidence_links');
  assert.equal(stillHidden.rows[0].n, 0);
  await client.query('reset role');
  cleanup(dir);
});

test('review transitions are gated and reviewer identity is recorded', async () => {
  const client = await freshDb();
  const dir = writeStaging([draft()]);
  await db.pushStaging(client, dir, {});
  const { rows: [row] } = await client.query('select id from public.evidence');

  await assert.rejects(
    () => db.setReviewStatus(client, { table: 'evidence', id: row.id, status: 'published', reviewer: 'x' }),
    /Transition/,
  );
  await assert.rejects(
    () => db.setReviewStatus(client, { table: 'evidence', id: row.id, status: 'reviewed' }),
    /relecteur/,
  );
  const reviewed = await db.setReviewStatus(client, { table: 'evidence', id: row.id, status: 'reviewed', reviewer: 'x' });
  assert.equal(reviewed.from, 'draft');
  assert.equal(reviewed.to, 'reviewed');
  const { rows: [after] } = await client.query('select status, reviewed_by, reviewed_at from public.evidence where id = $1', [row.id]);
  assert.equal(after.status, 'reviewed');
  assert.equal(after.reviewed_by, 'x');
  assert.ok(after.reviewed_at);
  cleanup(dir);
});

test('les rattachements de référence s’ajoutent aux brouillons et jamais aux pièces publiées', async () => {
  const client = await freshDb();
  const dir = writeStaging([
    draft(),
    draft({ external_id: 'VTANR5L15V2945', title: 'Scrutin n° 2945 — autre' }),
  ]);
  const refsFile = (value) => writeJsonl(join(dir, 'refs.jsonl'), [
    { institution: 'assemblee', kind: 'vote', external_id: 'VTANR5L15V2944', add_ref: { type: 'an:dossier', value } },
    { institution: 'assemblee', kind: 'vote', external_id: 'VTANR5L15V2945', add_ref: { type: 'an:dossier', value } },
    { institution: 'assemblee', kind: 'vote', external_id: 'INEXISTANT', add_ref: { type: 'an:dossier', value } },
  ]);

  refsFile('DLR5L15N38768');
  const first = await db.pushStaging(client, dir, {});
  assert.equal(first.stats.refs.added, 2);
  assert.equal(first.stats.refs.missing, 1);

  const { rows: [row] } = await client.query(
    "select detail from public.evidence where external_id = 'VTANR5L15V2944'",
  );
  assert.deepEqual(row.detail.refs, [
    { type: 'an:seance', value: 'SEANCE-1' },
    { type: 'an:dossier', value: 'DLR5L15N38768' },
  ]);

  const again = await db.pushStaging(client, dir, {});
  assert.equal(again.stats.refs.already, 2);

  const { rows: [published] } = await client.query(
    "select id from public.evidence where external_id = 'VTANR5L15V2945'",
  );
  await db.setReviewStatus(client, { table: 'evidence', id: published.id, status: 'reviewed', reviewer: 'test' });
  await db.setReviewStatus(client, { table: 'evidence', id: published.id, status: 'published', reviewer: 'test' });

  writeJsonl(join(dir, 'refs.jsonl'), [
    { institution: 'assemblee', kind: 'vote', external_id: 'VTANR5L15V2945', add_ref: { type: 'an:dossier', value: 'DLR5L15N99999' } },
  ]);
  const third = await db.pushStaging(client, dir, {});
  assert.equal(third.stats.refs.locked_changed, 1);
  const { rows: [after] } = await client.query(
    "select detail, status from public.evidence where external_id = 'VTANR5L15V2945'",
  );
  assert.equal(after.status, 'published');
  assert.deepEqual(after.detail.refs, [
    { type: 'an:seance', value: 'SEANCE-1' },
    { type: 'an:dossier', value: 'DLR5L15N38768' },
  ]);
  cleanup(dir);
});

test('ingestion runs keep their stats and outcome', async () => {
  const client = await freshDb();
  const runId = await db.startRun(client, { importer: 'an-scrutins', options: { legislatures: '15' } });
  await db.finishRun(client, runId, { status: 'ok', stats: { evidence: { inserted: 3 } } });
  const runs = await db.recentRuns(client, 5);
  assert.equal(runs.length, 1);
  assert.equal(runs[0].importer, 'an-scrutins');
  assert.equal(runs[0].status, 'ok');
  assert.equal(runs[0].stats.evidence.inserted, 3);
  assert.ok(runs[0].finished_at);
});
