// Normalization rules: these tests encode the contract with the SQL schema
// and the conventions of the French institutional sources.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildEvidence, cleanText, clampExcerpt, dedupeByKey, evidenceKey,
  requireHttpsUrl, toIsoDate, toIsoDateFromFrench, ValidationError,
} from '../lib/normalize.mjs';

test('toIsoDate accepts the three source formats and rejects the rest', () => {
  assert.equal(toIsoDate('2020-10-07'), '2020-10-07');
  assert.equal(toIsoDate('2020-10-07T12:30:00+02:00'), '2020-10-07');
  assert.equal(toIsoDate('07/10/2020'), '2020-10-07');
  assert.throws(() => toIsoDate('10/11/1998x'), ValidationError);
  assert.throws(() => toIsoDate('2020-02-31'), ValidationError);
  assert.throws(() => toIsoDate(''), ValidationError);
});

test('toIsoDateFromFrench reads the Sénat date wording', () => {
  assert.equal(toIsoDateFromFrench('21 juillet 2026'), '2026-07-21');
  assert.equal(toIsoDateFromFrench('1er février 2017'), '2017-02-01');
  assert.throws(() => toIsoDateFromFrench('juillet 2026'), ValidationError);
});

test('requireHttpsUrl upgrades institutional hosts and rejects other schemes', () => {
  assert.equal(
    requireHttpsUrl('http://www.senat.fr/dossier-legislatif/ppl23-555.html'),
    'https://www.senat.fr/dossier-legislatif/ppl23-555.html',
  );
  assert.equal(
    requireHttpsUrl('https://www.assemblee-nationale.fr/dyn/15/scrutins/2944'),
    'https://www.assemblee-nationale.fr/dyn/15/scrutins/2944',
  );
  assert.throws(() => requireHttpsUrl('ftp://example.org/doc'), ValidationError);
  assert.throws(() => requireHttpsUrl('http://example.org/doc'), ValidationError);
});

test('clampExcerpt keeps short excerpts and shortens long ones', () => {
  assert.equal(clampExcerpt('  deux   mots '), 'deux mots');
  assert.equal(clampExcerpt(null), null);
  const long = 'a'.repeat(1000);
  const shortened = clampExcerpt(long, 600);
  assert.equal(shortened.length, 600);
  assert.ok(shortened.endsWith('…'));
});

test('cleanText collapses whitespace and enforces the column limit', () => {
  assert.equal(cleanText('  Scrutin\n  n° 12 '), 'Scrutin n° 12');
  assert.equal(cleanText('   '), null);
  assert.throws(() => cleanText('x'.repeat(501), { max: 500 }), ValidationError);
});

function validDraft(overrides = {}) {
  return {
    external_id: 'VTANR5L15V2944',
    kind: 'vote',
    institution: 'assemblee',
    title: 'Scrutin n° 2944 — article 24 bis',
    excerpt: 'l’Assemblée nationale a adopté',
    occurred_at: '2020-10-07',
    source_url: 'https://www.assemblee-nationale.fr/dyn/15/scrutins/2944',
    source_locator: 'json/VTANR5L15V2944.json dans Scrutins_XV.json.zip',
    detail: { refs: [{ type: 'an:seance', value: 'SEANCE-1' }] },
    source: {
      url: 'https://data.assemblee-nationale.fr/static/openData/repository/15/loi/scrutins/Scrutins_XV.json.zip',
      publisher: 'Assemblée nationale',
      document_title: 'Scrutins publics — législature 15 (archive JSON officielle)',
    },
    ...overrides,
  };
}

test('buildEvidence validates every SQL constraint and returns a clean record', () => {
  const record = buildEvidence(validDraft());
  assert.equal(record.institution, 'assemblee');
  assert.equal(record.detail.refs.length, 1);
  assert.ok(record.source.sha256 === null);
  assert.equal(record.source.published_at, null);

  assert.throws(() => buildEvidence(validDraft({ kind: 'discours' })), ValidationError);
  assert.throws(() => buildEvidence(validDraft({ institution: 'matignon' })), ValidationError);
  assert.throws(() => buildEvidence(validDraft({ title: '  ' })), ValidationError);
  assert.throws(() => buildEvidence(validDraft({ source_url: 'http://exemple.test/x' })), ValidationError);
  assert.equal(
    buildEvidence(validDraft({ source_url: 'http://www.assemblee-nationale.fr/dyn/15/scrutins/2944' })).source_url,
    'https://www.assemblee-nationale.fr/dyn/15/scrutins/2944',
  );
  assert.throws(() => buildEvidence(validDraft({ external_id: '' })), ValidationError);
  assert.throws(() => buildEvidence(validDraft({ detail: { refs: [{ type: 'An:Seance', value: 'x' }] } })), ValidationError);
  assert.equal(buildEvidence(validDraft({ excerpt: 'y'.repeat(601) })).excerpt.length, 600);
});

test('evidenceKey and dedupeByKey keep the freshest record per source identity', () => {
  const first = buildEvidence(validDraft());
  const second = buildEvidence(validDraft({ title: 'Scrutin n° 2944 — version corrigée' }));
  assert.equal(evidenceKey(first), 'assemblee|vote|VTANR5L15V2944');
  const deduped = dedupeByKey([first, second]);
  assert.equal(deduped.length, 1);
  assert.equal(deduped[0].title, 'Scrutin n° 2944 — version corrigée');
});
