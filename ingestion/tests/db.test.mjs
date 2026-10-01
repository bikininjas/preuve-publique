// Integration tests against a real PostgreSQL engine (PGlite: PostgreSQL
// compiled to WebAssembly) running the exact migration files, exercised
// through the same code paths the CLI uses. They verify the guarantees the
// project depends on: idempotent pushes, reviewed pieces never overwritten,
// dry runs that roll back, and the real effect of the RLS policies for the
// `anon` role the website uses.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { pgliteClient } from './helpers/pglite-client.mjs';
import * as db from '../lib/db.mjs';
import { buildEvidence } from '../lib/normalize.mjs';
import { writeJson, writeJsonl } from '../lib/staging.mjs';
import { saveRaw } from '../lib/staging.mjs';
import { zipSync } from 'fflate';
import { scrutinToRecord } from '../importers/an-scrutins.mjs';
import { publishVerified, verifyArchive } from '../lib/auto-publish.mjs';

const ROOT = resolve(import.meta.dirname, '..', '..');
const MIGRATIONS = [
  '20260929000000_initial.sql',
  '20260930000000_backend_pipeline.sql',
  '20261001000000_fix_reference_policies.sql',
  '20261001052438_publication_confidence.sql',
  '20261002000000_admin_review.sql',
  '20261003000000_actor_relations.sql',
  '20261004000000_evidence_topics.sql',
  '20261005000000_party_vote_tallies.sql',
  '20261006000000_party_vote_details.sql',
  '20261007000000_senat_group_votes.sql',
  '20261008000000_group_name_navigation.sql',
];

async function freshDb() {
  const pglite = new PGlite();
  // Supabase provides these roles; a bare PostgreSQL does not.
  await pglite.exec('create role anon; create role authenticated;');
  // Supabase also provides the `auth` schema and `auth.jwt()`; stub them on
  // the same GUC PostgREST fills, so the admin policies can be exercised.
  await pglite.exec(`
    create schema auth;
    create function auth.jwt() returns jsonb language sql stable
    as $$ select coalesce(
      nullif(current_setting('request.jwt.claim', true), ''),
      nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb $$;
    grant usage on schema auth to anon, authenticated;
    grant execute on function auth.jwt() to anon, authenticated;
  `);
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

test('une archive AN intacte publie le brouillon, une divergence bloque la publication', async () => {
  const client = await freshDb();
  const dir = mkdtempSync(join(tmpdir(), 'pp-auto-publish-'));
  try {
    mkdirSync(join(dir, 'raw'));
    const archiveUrl = 'https://data.assemblee-nationale.fr/static/openData/repository/15/loi/scrutins/Scrutins_XV.json.zip';
    const fixture = readFileSync(join(ROOT, 'ingestion/tests/fixtures/an-scrutin.sample.json'), 'utf8');
    const scrutin = JSON.parse(fixture).scrutin;
    const raw = saveRaw(dir, 'Scrutins_XV.json.zip', zipSync({ 'scrutin.json': Buffer.from(fixture) }));
    const source = {
      url: archiveUrl, publisher: 'Assemblée nationale',
      document_title: 'Scrutins publics — législature 15 (archive JSON officielle)',
      published_at: null, retrieved_at: '2026-09-30T07:00:00.000Z', sha256: raw.sha256,
    };
    const record = scrutinToRecord(scrutin, {
      legislature: 15, zipFile: 'Scrutins_XV.json.zip', zipUrl: archiveUrl,
      retrievedAt: source.retrieved_at,
    });
    writeJsonl(join(dir, 'sources.jsonl'), [source]);
    writeJsonl(join(dir, 'evidence.jsonl'), [record]);
    writeJson(join(dir, 'manifest.json'), { importer: 'an-scrutins', raw: [{ url: archiveUrl, ...raw }] });
    await db.pushStaging(client, dir);
    const verified = await verifyArchive(dir);
    const simulation = await publishVerified(client, verified, { limit: 1, dryRun: true });
    assert.equal(simulation.published, 1);
    assert.equal((await client.query("select count(*)::int as n from public.evidence where status='published'")).rows[0].n, 0);
    const published = await publishVerified(client, verified, { limit: 1, dryRun: false });
    assert.equal(published.published, 1);
    const { rows } = await client.query('select status, publication_confidence, publication_checks from public.evidence');
    assert.equal(rows[0].status, 'published');
    assert.equal(Number(rows[0].publication_confidence), 0.99);
    assert.equal(rows[0].publication_checks.interpretation, false);
    writeJsonl(join(dir, 'evidence.jsonl'), [{ ...record, title: 'Titre modifié' }]);
    await assert.rejects(verifyArchive(dir), /divergent/);
  } finally { cleanup(dir); }
});

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

test('les liens d’acteurs sont idempotents et suivent la visibilité des deux acteurs', async () => {
  const client = await freshDb();
  const dir = mkdtempSync(join(tmpdir(), 'pp-relations-'));
  const SOURCE_URL = 'https://data.assemblee-nationale.fr/static/openData/repository/17/amo/tous_acteurs_mandats_organes_xi_legislature/AMO30_tous_acteurs_tous_mandats_tous_organes_historique.json.zip';
  const source = {
    url: SOURCE_URL,
    publisher: 'Assemblée nationale',
    document_title: 'Référentiel des acteurs, mandats et organes — législature 17 (archive JSON officielle)',
    sha256: 'c'.repeat(64),
    retrieved_at: '2026-01-02T03:04:05.000Z',
  };
  const group = { external_id: 'an-organe:PO845413', name: 'Groupe de test', kind: 'group' };
  const party = { external_id: 'an-organe:PO833003', name: 'Parti de test', kind: 'party' };
  const person = { external_id: 'an-acteur:PA1', name: 'Personne de test', kind: 'person' };
  const relation = (to, extra = {}) => ({
    from_external_id: person.external_id,
    to_external_id: to,
    relation: 'member_of',
    started_at: '2024-07-18',
    ended_at: null,
    source_url: SOURCE_URL,
    detail: { mandat_uid: 'PM1' },
    ...extra,
  });

  writeJsonl(join(dir, 'sources.jsonl'), [source]);
  writeJsonl(join(dir, 'actors.jsonl'), [group, party, person]);
  writeJsonl(join(dir, 'evidence.jsonl'), [
    draft({ external_id: 'AN-PERSONNE-1', title: 'Déclaration de test — personne', actor: person, source }),
    draft({ external_id: 'AN-GROUPE-1', title: 'Déclaration de test — groupe', actor: group, source }),
  ]);
  writeJsonl(join(dir, 'actor-relations.jsonl'), [
    relation(group.external_id),
    relation(party.external_id, { relation: 'affiliated_to', detail: { mandat_uid: 'PM2' } }),
    relation('an-organe:ABSENT'),
  ]);
  writeJson(join(dir, 'manifest.json'), {
    importer: 'an-referentiel',
    created_at: new Date().toISOString(),
    options: {},
    counts: {},
    raw: [],
    notes: [],
  });

  const first = await db.pushStaging(client, dir, {});
  assert.equal(first.stats.relations.total, 3);
  assert.equal(first.stats.relations.inserted, 2);
  assert.equal(first.stats.relations.missing_actor, 1, 'un lien dont l’extrémité est absente est compté, jamais inventé');

  const again = await db.pushStaging(client, dir, {});
  assert.equal(again.stats.relations.unchanged, 2);
  assert.equal(again.stats.relations.inserted, 0);

  await client.query('set role anon');
  const hidden = await client.query('select count(*)::int as n from public.actor_relations');
  assert.equal(hidden.rows[0].n, 0, 'aucun lien visible tant qu’aucune pièce n’est publiée');
  await assert.rejects(() => client.query(
    `insert into public.actor_relations (from_actor_id, to_actor_id, relation, started_at, source_id)
     values (gen_random_uuid(), gen_random_uuid(), 'member_of', '2024-07-18', gen_random_uuid())`,
  ));
  await client.query('reset role');

  const { rows: pieces } = await client.query('select id, external_id from public.evidence order by external_id');
  const personPiece = pieces.find((row) => row.external_id === 'AN-PERSONNE-1');
  const groupPiece = pieces.find((row) => row.external_id === 'AN-GROUPE-1');
  await db.setReviewStatus(client, { table: 'evidence', id: personPiece.id, status: 'reviewed', reviewer: 'test' });
  await db.setReviewStatus(client, { table: 'evidence', id: personPiece.id, status: 'published', reviewer: 'test' });

  // Une seule extrémité est publique : les liens restent invisibles.
  await client.query('set role anon');
  const oneEnd = await client.query('select count(*)::int as n from public.actor_relations');
  assert.equal(oneEnd.rows[0].n, 0, 'un lien dont un seul acteur est public reste invisible');
  await client.query('reset role');

  await db.setReviewStatus(client, { table: 'evidence', id: groupPiece.id, status: 'reviewed', reviewer: 'test' });
  await db.setReviewStatus(client, { table: 'evidence', id: groupPiece.id, status: 'published', reviewer: 'test' });

  await client.query('set role anon');
  const visible = await client.query('select relation, to_actor_id from public.actor_relations');
  assert.equal(visible.rows.length, 1, 'seul le lien dont les deux acteurs sont publics est visible');
  assert.equal(visible.rows[0].relation, 'member_of');
  await client.query('reset role');
  cleanup(dir);
});

test('les rubriques viennent de la source, se propagent par dossier, et comptent en public', async () => {
  const client = await freshDb();
  const dir = mkdtempSync(join(tmpdir(), 'pp-topics-'));
  const source = {
    url: 'https://data.senat.fr/data/dosleg/promulguees.csv',
    publisher: 'Sénat',
    document_title: 'Dossiers législatifs — lois promulguées (CSV officiel)',
    sha256: 'd'.repeat(64),
    retrieved_at: '2026-01-02T03:04:05.000Z',
  };
  writeJsonl(join(dir, 'sources.jsonl'), [source]);
  writeJsonl(join(dir, 'actors.jsonl'), [
    { external_id: 'an-organe:PO1', name: 'Groupe de test', kind: 'group' },
  ]);
  writeJsonl(join(dir, 'evidence.jsonl'), [
    draft({
      external_id: 'SENAT-LOI-1', kind: 'adopted_text', institution: 'senat',
      title: 'Loi n° 1 — test', topics: ['Police et sécurité'],
      detail: { refs: [{ type: 'senat:dossier', value: 'pjl1' }] },
      source,
    }),
    draft({
      external_id: 'SENAT-VOTE-1', kind: 'vote', institution: 'senat',
      title: 'Scrutin n° 1 — test', detail: { refs: [{ type: 'senat:dossier', value: 'pjl1' }] },
      source,
    }),
    draft({
      external_id: 'AN-VOTE-1', kind: 'vote', institution: 'assemblee',
      title: 'Scrutin n° 2 — test',
      detail: {
        groupes: [{ organe_ref: 'PO1', membres: 10, position_majoritaire: 'contre', pour: 1, contre: 9, abstentions: 0, non_votants: 0 }],
      },
      source,
    }),
  ]);
  writeJson(join(dir, 'manifest.json'), {
    importer: 'test', created_at: new Date().toISOString(), options: {}, counts: {}, raw: [], notes: [],
  });

  await db.pushStaging(client, dir, {});
  const { rows: [law] } = await client.query("select topics from public.evidence where external_id = 'SENAT-LOI-1'");
  assert.deepEqual(law.topics, ['Police et sécurité']);

  // Propagation par référence de dossier : le scrutin hérite, une seconde
  // exécution ne change plus rien.
  const first = await db.propagateTopics(client, {});
  assert.equal(first.examined, 1, 'seuls les scrutins du Sénat sont examinés');
  assert.equal(first.updated, 1);
  assert.equal(first.no_dossier, 0);
  const second = await db.propagateTopics(client, {});
  assert.equal(second.unchanged, 1);
  const { rows: [vote] } = await client.query("select topics, detail from public.evidence where external_id = 'SENAT-VOTE-1'");
  assert.deepEqual(vote.topics, ['Police et sécurité']);
  assert.deepEqual(vote.detail.topics_source.values, ['pjl1']);

  const publish = async (externalId) => {
    const { rows: [row] } = await client.query('select id from public.evidence where external_id = $1', [externalId]);
    await db.setReviewStatus(client, { table: 'evidence', id: row.id, status: 'reviewed', reviewer: 'test' });
    await db.setReviewStatus(client, { table: 'evidence', id: row.id, status: 'published', reviewer: 'test' });
  };

  // Rien n'est publié : ni comptage, ni pièce, ni groupe.
  await client.query('set role anon');
  const emptyCounts = await client.query('select * from public.published_topic_counts()');
  assert.equal(emptyCounts.rows.length, 0);
  assert.equal((await client.query('select count(*)::int as n from public.actors')).rows[0].n, 0);
  await client.query('reset role');

  // Un vote publié rend lisible le seul groupe qu'il nomme.
  await publish('AN-VOTE-1');
  await client.query('set role anon');
  const groups = await client.query('select external_id, name from public.actors');
  assert.equal(groups.rows.length, 1);
  assert.equal(groups.rows[0].external_id, 'an-organe:PO1');
  assert.equal((await client.query('select * from public.published_topic_counts()')).rows.length, 0);
  await client.query('reset role');

  // La loi publiée apporte sa rubrique au comptage ; le scrutin resté brouillon
  // ne compte pas, et sa rubrique héritée n'est pas visible non plus.
  await publish('SENAT-LOI-1');
  await client.query('set role anon');
  const counts = await client.query('select topic, pieces from public.published_topic_counts()');
  assert.deepEqual(counts.rows, [{ topic: 'Police et sécurité', pieces: 1 }]);
  await client.query('reset role');
  cleanup(dir);
});

test('les votes nominatifs par parti restent invisibles avant publication, et ne sont jamais modifiables anonymement', async () => {
  const client = await freshDb();
  const { rows: [source] } = await client.query(`
    insert into public.sources (url, publisher, document_title, sha256)
    values ('https://data.assemblee-nationale.fr/test.zip', 'Assemblée nationale', 'Archive de test', $1)
    returning id`, ['a'.repeat(64)]);
  const { rows: [party] } = await client.query(`
    insert into public.actors (name, kind, external_id)
    values ('Parti de test', 'party', 'an-organe:PO999') returning id`);
  const { rows: [vote] } = await client.query(`
    insert into public.evidence (source_id, title, kind, institution, occurred_at, source_url, status)
    values ($1, 'Scrutin n° 1 — le logement', 'vote', 'assemblee', '2024-07-10',
            'https://www.assemblee-nationale.fr/dyn/17/scrutins/1', 'draft') returning id`, [source.id]);
  await client.query(`
    insert into public.vote_party_coverage
      (vote_id, recorded_individuals, unattributed_individuals, official_individuals, archive_sha256)
    values ($1, 3, 1, 3, $2)`, [vote.id, 'a'.repeat(64)]);
  await client.query(`
    insert into public.vote_party_tallies (vote_id, party_id, pour, contre)
    values ($1, $2, 1, 1)`, [vote.id, party.id]);

  await client.query('set role anon');
  assert.equal((await client.query('select count(*)::int n from public.vote_party_tallies')).rows[0].n, 0);
  assert.equal((await client.query('select count(*)::int n from public.actors')).rows[0].n, 0);
  assert.equal((await client.query("select * from public.vote_party_summary(array['logement'])")).rows.length, 0);
  await assert.rejects(() => client.query(`
    update public.vote_party_tallies set pour = 2 where vote_id = $1`, [vote.id]));
  await client.query('reset role');

  await client.query("update public.evidence set status = 'published' where id = $1", [vote.id]);
  await client.query('set role anon');
  const summary = await client.query("select * from public.vote_party_summary(array['logement'])");
  assert.equal(summary.rows.length, 1);
  assert.equal(summary.rows[0].party_name, 'Parti de test');
  assert.equal(Number(summary.rows[0].pour), 1);
  const scope = await client.query("select * from public.vote_party_scope(array['logement'])");
  assert.equal(Number(scope.rows[0].documented_scrutins), 1);
  assert.equal(Number(scope.rows[0].unattributed_individuals), 1);
  const details = await client.query("select * from public.vote_party_details($1,array['logement'],15,0)", [party.id]);
  assert.equal(details.rows.length, 1);
  assert.equal(Number(details.rows[0].total_count), 1);
  await client.query('reset role');
});

test('les décomptes de groupe du Sénat suivent la publication et refusent les écritures anonymes', async () => {
  const client = await freshDb();
  const { rows: [source] } = await client.query(`insert into public.sources
    (url,publisher,document_title,sha256) values
    ('https://www.senat.fr/scrutin-public/2024/scr2024-347.html','Sénat','Scrutin officiel',$1)
    returning id`, ['b'.repeat(64)]);
  const { rows: [vote] } = await client.query(`insert into public.evidence
    (source_id,title,kind,institution,occurred_at,source_url,status) values
    ($1,'Scrutin sur le logement','vote','senat','2024-07-10',
    'https://www.senat.fr/scrutin-public/2024/scr2024-347.html','draft') returning id`, [source.id]);
  await client.query(`insert into public.vote_group_coverage
    (vote_id,official_pour,official_contre,official_abstention,official_non_votant,page_sha256)
    values ($1,2,1,1,0,$2)`, [vote.id, 'c'.repeat(64)]);
  await client.query(`insert into public.vote_group_tallies
    (vote_id,group_ref,group_name,members,pour,contre,abstention,non_votant)
    values ($1,'TEST','Groupe de test',4,2,1,1,0)`, [vote.id]);
  await client.query('set role anon');
  assert.equal((await client.query('select count(*)::int n from public.vote_group_tallies')).rows[0].n, 0);
  assert.equal((await client.query("select * from public.vote_group_summary(array['logement'])")).rows.length, 0);
  await assert.rejects(() => client.query('update public.vote_group_tallies set pour=3 where vote_id=$1', [vote.id]));
  await client.query('reset role');
  await client.query("update public.evidence set status='published' where id=$1", [vote.id]);
  await client.query('set role anon');
  const summary = await client.query("select * from public.vote_group_summary(array['logement'])");
  assert.equal(summary.rows[0].group_name, 'Groupe de test');
  assert.equal(Number(summary.rows[0].pour), 2);
  const scope = await client.query("select * from public.vote_group_scope(array['logement'])");
  assert.equal(Number(scope.rows[0].documented_scrutins), 1);
  assert.equal(Number(scope.rows[0].recorded_positions), 4);
  const details = await client.query("select * from public.vote_group_details('TEST',array['logement'],15,0)");
  assert.equal(details.rows.length, 1);
  assert.equal(Number(details.rows[0].total_count), 1);
  await client.query('reset role');
});

test('les organes homonymes sont réunis pour la navigation sans confondre leurs identifiants ni révéler les brouillons', async () => {
  const client = await freshDb();
  const { rows: [source] } = await client.query(`insert into public.sources
    (url,publisher,document_title,sha256) values
    ('https://data.assemblee-nationale.fr/groupes-test.zip','Assemblée nationale','Groupes de test',$1)
    returning id`, ['d'.repeat(64)]);
  const { rows: actors } = await client.query(`insert into public.actors (name,kind,external_id)
    values ('Même nom','group','an-organe:PO1'),
           ('Même nom','group','an-organe:PO2'),
           ('Autre nom','group','an-organe:PO3')
    returning id,name,external_id`);
  for (const [date, ref, status, position] of [
    ['2018-01-01', 'PO1', 'published', 'pour'],
    ['2024-01-01', 'PO2', 'published', 'contre'],
    ['2025-01-01', 'PO2', 'draft', 'pour'],
    ['2023-01-01', 'PO3', 'published', 'abstention'],
  ]) {
    await client.query(`insert into public.evidence
      (source_id,title,kind,institution,occurred_at,source_url,status,detail)
      values ($1,$2,'vote','assemblee',$3,$4,$5,$6::jsonb)`, [
      source.id, `Scrutin n° 1 — ${date}`, date,
      `https://www.assemblee-nationale.fr/dyn/17/scrutins/${date.slice(0, 4)}`,
      status, JSON.stringify({ groupes: [{ organe_ref: ref, position_majoritaire: position,
        pour: Number(position === 'pour'), contre: Number(position === 'contre'),
        abstentions: Number(position === 'abstention') }] }),
    ]);
  }
  await client.query('set role anon');
  const scope = await client.query('select * from public.an_group_vote_scope($1)', [actors[0].id]);
  assert.deepEqual(scope.rows.map((row) => row.group_ref), ['PO1', 'PO2']);
  assert.deepEqual(scope.rows.map((row) => Number(row.scrutins)), [1, 1]);
  const first = await client.query('select * from public.an_group_vote_page($1,1,0)', [actors[0].id]);
  const second = await client.query('select * from public.an_group_vote_page($1,1,1)', [actors[1].id]);
  assert.equal(first.rows[0].group_ref, 'PO2');
  assert.equal(first.rows[0].position_majoritaire, 'contre');
  assert.equal(Number(first.rows[0].total_count), 2);
  assert.equal(second.rows[0].group_ref, 'PO1');
  assert.equal(second.rows[0].position_majoritaire, 'pour');
  assert.equal(Number(second.rows[0].total_count), 2);
  const other = await client.query('select * from public.an_group_vote_page($1,16,0)', [actors[2].id]);
  assert.equal(other.rows.length, 1);
  assert.equal(other.rows[0].group_ref, 'PO3');
  await client.query('reset role');
});
