import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseSondax, documentHash, downloadSondax, SONDAX_URL, MIRROR_URL } from '../sondax.ts';
import { parsePollQuery, configurationKey } from '../../../lib/polls/query.ts';

const fixture = readFileSync(new URL('./fixtures/sondax.csv', import.meta.url), 'utf8');
const lines = fixture.trimEnd().split(/\r?\n/);
const response = (body = fixture, contentType = 'text/csv') => ({ body: Buffer.from(body),
  bytes: Buffer.byteLength(body), contentType, finalUrl: SONDAX_URL, sha256: 'a'.repeat(64), fetchedAt: '2026-06-01T01:02:03Z' });

test('UTF-8, BOM, CRLF, champs cités : regroupement sondage → tour → configuration', () => {
  const polls = parseSondax(Buffer.from('\uFEFF' + fixture.replaceAll('\n', '\r\n')));
  assert.equal(polls.length, 2);
  const first = polls.find((p) => p.external_id === 'exemple-2026-04-02');
  assert.equal(first.scenarios.length, 3);
  assert.equal(first.scenarios[0].results[0].candidate_name, 'Alice, "Exemple"');
  assert.equal(first.scenarios[0].results[1].candidate_name, 'Bruno Échantillon');
  assert.equal(first.scenarios[0].results[0].score, 40.5);
  assert.equal(first.scenarios[2].is_primary, null);
  assert.equal(first.source_url, 'https://example.org/notice.pdf?version=1&ref=%C3%A9');
  assert.equal(polls[0].sample_size, null);
  assert.equal(first.scenarios[0].configuration_key, '1:alice|bruno');
  assert.equal(documentHash(first), documentHash(parseSondax([lines[0], ...lines.slice(1).reverse()].join('\n')).find((p) => p.external_id === first.external_id)));
});

test('en-tête réordonné accepté ; ajout, retrait et doublon de colonne refusés', () => {
  const reordered = lines.map((line) => line.replace(/^([^,]+),([^,]+),/, '$2,$1,')).join('\n');
  assert.deepEqual(parseSondax(reordered), parseSondax(fixture));
  for (const header of [lines[0] + ',nouvelle_colonne', lines[0].replace('institut,', ''), lines[0].replace('institut', 'sondage_id')]) {
    assert.throws(() => parseSondax([header, ...lines.slice(1)].join('\n')), /Schéma CSV/);
  }
});

test('lignes dupliquées, guillemets malformés et UTF-8 invalide refusés', () => {
  assert.throws(() => parseSondax(fixture + lines[1] + '\n'), /doublon/);
  assert.throws(() => parseSondax(lines[0] + '\n"champ non terminé'), /non terminé/);
  assert.throws(() => parseSondax(fixture.replace('Bruno Échantillon', '"Bruno"x')), /après un champ/);
  assert.throws(() => parseSondax(new Uint8Array([0xc3, 0x28])), /UTF-8/);
  assert.throws(() => parseSondax(lines[0]), /CSV vide/);
});

test('invariants : scores, dates, institut, candidat, URL, tour, échantillons et configuration', () => {
  const invalids = [
    ['40.5,wikipedia', '-1,wikipedia'], ['40.5,wikipedia', '101,wikipedia'],
    ['40.5,wikipedia', 'NaN,wikipedia'], ['2026-04-01,2026-04-02', '2026-04-03,2026-04-02'],
    ['2026-04-01', '2026-02-30'], ['Institut Exemple', ''],
    [',alice,"Alice', ',,"Alice'], ['https://example.org/notice.pdf?version=1&ref=%C3%A9', 'javascript:alert(1)'],
    [',1000,1,1,1,800,', ',1000,3,1,1,800,'], [',1,1,1,800,', ',1,0,1,800,'],
    [',1,1,1,800,', ',1,1,1,1200,'], ['123456', 'not-a-revision'],
    ['40.5,wikipedia', '1,wikipedia'], ['1000,1,1,1,800,bruno', '1000,1,1,0,800,bruno'],
    [',Institut Exemple,2026-04-01', ',Autre Institut,2026-04-01'],
  ];
  for (const [from, to] of invalids) assert.throws(() => parseSondax(fixture.replace(from, to)), undefined, `${from} -> ${to}`);
  assert.throws(() => parseSondax(fixture.replace(',800,alice', ',800,alice,extra')), /nombre de colonnes/);
});

test('fallback uniquement pour indisponibilité ou réponse non CSV, sans changer le fournisseur', async () => {
  const calls = [];
  const result = await downloadSondax(async (url) => { calls.push(url); if (url === SONDAX_URL) throw new Error('503'); return response(); });
  assert.deepEqual(calls, [SONDAX_URL, MIRROR_URL]);
  assert.equal(result.fallback, true);
  assert.equal(result.datasetUrl, MIRROR_URL);
  assert.ok(result.documents.every((p) => p.source_provider === 'sondax'));
  const html = await downloadSondax(async (url) => url === SONDAX_URL ? response('<html>indisponible</html>', 'text/html') : response());
  assert.equal(html.fallback, true);
  assert.equal((await downloadSondax(async () => response(fixture, 'application/octet-stream'))).fallback, false);
});

test('changement de schéma ne se cache pas derrière un miroir plus ancien', async () => {
  let calls = 0;
  await assert.rejects(downloadSondax(async () => { calls++; return response(fixture.replace('institut,', '')); }), /Schéma CSV/);
  assert.equal(calls, 1);
  await assert.rejects(downloadSondax(async () => { throw new Error('network'); }), /indisponibles/);
  await assert.rejects(downloadSondax(async () => response('html', 'text/html')), /miroir/);
});

test('API : filtres exacts, dates et pagination contrôlés, clé de configuration indépendante des numéros locaux', () => {
  assert.equal(configurationKey(1, ['bruno', 'alice']), '1:alice|bruno');
  assert.equal(parsePollQuery(new URLSearchParams('round=2&candidate=alice&startDate=2026-01-01&page=2&limit=100')).round, 2);
  for (const query of ['round=3', 'startDate=2026-02-30', 'startDate=2026-06-01&endDate=2026-01-01',
    'limit=101', 'page=0', 'page=1.5', 'round=1&round=2', 'unknown=1']) {
    assert.throws(() => parsePollQuery(new URLSearchParams(query)));
  }
});
