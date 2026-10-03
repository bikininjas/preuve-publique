import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyticsMeasurementId, analyticsPage, CONSENT_MAX_AGE_MS, createConsent, parseConsent } from '../lib/consent.ts';

test('accord et refus ont la même durée et expirent sans autoriser la mesure', () => {
  const now = 1_000_000;
  for (const accepted of [true, false]) {
    const raw = JSON.stringify(createConsent(accepted, now));
    assert.equal(parseConsent(raw, now).analytics, accepted);
    assert.equal(parseConsent(raw, now + CONSENT_MAX_AGE_MS - 1).analytics, accepted);
    assert.equal(parseConsent(raw, now + CONSENT_MAX_AGE_MS), null);
  }
});

test('une préférence corrompue, future ou de version différente bloque la mesure', () => {
  const now = 1_000_000;
  const base = createConsent(true, now);
  for (const value of [null, '{', 'null', '{}', JSON.stringify({ ...base, version: 0 }), JSON.stringify({ ...base, analytics: 'yes' }), JSON.stringify({ ...base, recordedAt: now + 1 }), JSON.stringify({ ...base, expiresAt: base.expiresAt + 1 })]) {
    assert.equal(parseConsent(value, now), null);
  }
});

test('les pages privées et les destinations inconnues ne sont jamais mesurées', () => {
  for (const path of ['/admin', '/admin/review', '/admin/pieces/123', '/auth/callback', '/api/analytics/config', '/confidentialite', '/inconnu']) assert.equal(analyticsPage(path), null);
});

test('une fiche est mesurée sans le nom politique ou le document sélectionné', () => {
  const page = analyticsPage('/presidentielle-2027/candidats/personne-testee');
  assert.equal(page.path, '/presidentielle-2027/candidats/[candidate]');
  assert.equal(page.title.includes('personne-testee'), false);
  assert.equal(analyticsPage('/partis/parti-test').path, '/partis/[id]');
  assert.equal(analyticsPage('/scrutins').path, '/scrutins');
});

test('seul un identifiant de mesure GA4 valide peut activer la configuration', () => {
  assert.equal(analyticsMeasurementId(' G-ABC1234567 '), 'G-ABC1234567');
  for (const id of [undefined, '', 'UA-123-1', 'G-123', 'G-ABC123<script>', 'https://example.org']) assert.equal(analyticsMeasurementId(id), null);
});
