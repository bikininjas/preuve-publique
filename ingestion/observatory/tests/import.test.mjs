import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { PGlite } from '@electric-sql/pglite';
import { pgliteClient } from '../../tests/helpers/pglite-client.mjs';
import { validateDocument, prepareDocument, importDocument, parseOptions } from '../import.mjs';

const pilot = () => JSON.parse(readFileSync(new URL('../pilot.json', import.meta.url), 'utf8'));
const inequalities = () => JSON.parse(readFileSync(new URL('../inequalities.json', import.meta.url), 'utf8'));
const accessTax = () => JSON.parse(readFileSync(new URL('../inequalities-access-tax.json', import.meta.url), 'utf8'));
const inequalityFetch = async (url) => {
  const body = Buffer.from(url.endsWith('.pdf') ? '%PDF-1.7 source primaire' : [...inequalities().records, ...accessTax().records].filter((r) => r.source_url === url).flatMap((r) => r.detail.source_verification.markers).join(' '));
  return { body, bytes: body.length, finalUrl: url, fetchedAt: '2026-10-02T12:00:00Z', sha256: createHash('sha256').update(body).digest('hex') };
};
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

test('comparaisons : référence, dénominateur, groupes distincts et unités communes obligatoires', () => {
  validateDocument(inequalities());
  for (const mutate of [
    (p) => { delete p.comparison_note; },
    (p) => { p.comparisons[1].label = p.comparisons[0].label; },
    (p) => { p.value = 999; p.series[0].value = 999; },
    (p) => { p.comparisons[0].unit = 'euros'; },
    (p) => { p.comparisons[0].period = 'autre année'; },
    (p) => { p.domain = 'invente'; },
  ]) { const doc = inequalities(); mutate(doc.records[0].detail.indicator); assert.throws(() => validateDocument(doc)); }
  assert.equal(parseOptions([]).dryRun, true);
  assert.equal(parseOptions(['--file', 'ingestion/observatory/inequalities.json', '--yes']).dryRun, false);
  for (const args of [['--file'], ['--yes', '--dry-run'], ['--publish'], ['--file', 'a', '--file', 'b']]) assert.throws(() => parseOptions(args));
});

test('chaque édition HTML est vérifiée même si plusieurs indicateurs partagent une source', async () => {
  let calls = 0;
  const doc = inequalities();
  const result = await prepareDocument(doc, { fetchDocument: async (url) => { calls++; return inequalityFetch(url); } });
  assert.equal(calls, 9);
  assert.equal(result.records.length, 16);
  doc.records[2].detail.source_verification.markers.push('édition absente');
  await assert.rejects(prepareDocument(doc, { fetchDocument: inequalityFetch }), /édition officielle/);
  await assert.rejects(prepareDocument(inequalities(), { fetchDocument: async (url) => ({ ...await inequalityFetch(url), body: Buffer.from('Access denied') }) }), /édition officielle/);
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
    const expanded = await prepareDocument(inequalities(), { fetchDocument: inequalityFetch });
    await importDocument(db, expanded);
    assert.equal((await pg.query('select count(*)::int as n from public.evidence')).rows[0].n, 6);
    assert.equal((await importDocument(db, expanded, { dryRun: false })).inserted, 16);
    assert.equal((await importDocument(db, expanded, { dryRun: false })).unchanged, 16);
    const extension = await prepareDocument(accessTax(), { fetchDocument: inequalityFetch });
    await importDocument(db, extension);
    assert.equal((await pg.query('select count(*)::int as n from public.evidence')).rows[0].n, 22);
    assert.equal((await importDocument(db, extension, { dryRun: false })).inserted, 6);
    assert.equal((await importDocument(db, extension, { dryRun: false })).unchanged, 6);
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

test('publication connue au mois : aucun jour exact fabriqué, sources primaires et budget vérifiés', async () => {
  for (const mutate of [
    (r) => { r.detail.indicator.publication_month = '2026-13'; },
    (r) => { r.occurred_at = '2026-02-20'; },
    (r) => { r.source.published_at = '2026-02-01'; },
  ]) { const doc = accessTax(); mutate(doc.records[2]); assert.throws(() => validateDocument(doc), /Précision mensuelle/); }
  const result = await prepareDocument(accessTax(), { fetchDocument: inequalityFetch });
  assert.equal(result.sourceCount, 5);
  assert.equal(result.records.length, 6);
  assert.equal(result.records[2].source.published_at, null);
  await assert.rejects(prepareDocument(accessTax(), { fetchDocument: async (url) => ({ ...await inequalityFetch(url), bytes: 10_000_001 }) }), /Budget/);
});
