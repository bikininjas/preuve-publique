import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatEvidenceDate, formatDate } from '../lib/labels.ts';

test('une publication connue au mois n’affiche aucun jour dans les vues publiques et de relecture', () => {
  const evidence = { kind: 'indicator', occurred_at: '2026-02-01', detail: { indicator: { publication_month: '2026-02' } } };
  assert.equal(formatEvidenceDate(evidence), 'février 2026');
  assert.equal(formatEvidenceDate({ ...evidence, detail: null }), formatDate(evidence.occurred_at));
  assert.equal(formatEvidenceDate({ ...evidence, kind: 'vote' }), formatDate(evidence.occurred_at));
  assert.equal(formatEvidenceDate({ ...evidence, occurred_at: '2026-02-20' }), formatDate('2026-02-20'));
});
