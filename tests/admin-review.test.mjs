import { test } from 'node:test';
import assert from 'node:assert/strict';
import { adminPieceHref, reviewFilters, reviewQueueHref, reviewReturnPath, reviewWindow } from '../lib/admin-review.ts';

test('la consultation et le retour conservent institution, statut, recherche et page', () => {
  const filters = reviewFilters({ status: 'reviewed', institution: 'senat', kind: 'vote', q: 'santé & droits', page: '3' });
  const queue = reviewQueueHref(filters);
  const piece = new URL(adminPieceHref('00000000-0000-0000-0000-000000000001', queue), 'https://admin.invalid');
  const back = reviewReturnPath(piece.searchParams.get('returnTo'));
  assert.equal(back, queue);
  assert.deepEqual(reviewFilters(Object.fromEntries(new URL(back, 'https://admin.invalid').searchParams)), filters);
  assert.equal(new URL(reviewQueueHref({ ...filters, status: 'published' }, 1), 'https://admin.invalid').searchParams.has('page'), false);
});

test('le retour aux rapprochements garde la page et retire les paramètres étrangers', () => {
  assert.equal(reviewReturnPath('/admin/links?status=reviewed&page=4&ok=published&returnTo=https://example.org'), '/admin/links?status=reviewed&page=4');
});

test('une destination de retour étrangère ou ambiguë ne quitte jamais les files', () => {
  for (const path of [undefined, 'https://example.org/admin/review', '//example.org/admin/review', '/\\example.org/admin/review', '/admin/review/../../auth/login', '/admin/review%3f', '/administrator', '/admin/runs', '/admin/review\n']) {
    assert.equal(reviewReturnPath(path), '/admin/review?status=all', String(path));
  }
});

test('les paramètres invalides et répétés ne deviennent pas des filtres arbitraires', () => {
  const filters = reviewFilters({ status: 'inconnu', institution: 'inconnue', kind: 'inconnu', page: '-2', q: ['  santé  ', 'autre'] });
  assert.deepEqual(filters, { status: 'draft', institution: undefined, kind: undefined, page: 1, terms: 'santé', scope: undefined });
  assert.equal(reviewFilters({ q: 'a'.repeat(150) }).terms.length, 120);
});

test('les files récentes et historiques restent dans le retour de lecture et ignorent un scope arbitraire', () => {
  const filters = reviewFilters({ status: 'draft', scope: 'historical-votes', page: '2' });
  assert.equal(reviewReturnPath(reviewQueueHref(filters)), '/admin/review?status=draft&scope=historical-votes&page=2');
  assert.equal(reviewFilters({ scope: 'publication-automatique' }).scope, undefined);
});

test('la fenêtre de revue utilise le jour français et la même borne de trente jours que la synchronisation', () => {
  assert.deepEqual(reviewWindow(new Date('2026-10-02T22:05:00Z')), { today: '2026-10-03', since: '2026-09-03' });
  assert.deepEqual(reviewWindow(new Date('2026-03-31T08:00:00Z')), { today: '2026-03-31', since: '2026-03-01' });
});
