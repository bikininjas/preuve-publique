import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { filterSeatBuckets, hemicyclePoints } from '../lib/hemicycle.ts';
import { active, uniqueMembership, countSeats, assemblyEntries, senateEntries, europeanPartyEntries } from '../ingestion/composition/normalize.mjs';

test('un siège par point, sans superposition, pour les formats des trois assemblées', () => {
  for (const total of [1, 81, 348, 577, 720]) {
    const seats = [{ id: 'a', name: 'Formation A', seats: Math.floor(total / 3), status: 'known' }, { id: 'b', name: 'Formation B', seats: total - Math.floor(total / 3), status: 'unknown' }];
    const points = hemicyclePoints(seats);
    assert.equal(points.length, total);
    assert.equal(points.filter(p => p.bucketId === 'a').length, seats[0].seats);
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      assert.ok(p.x - p.radius > 0 && p.x + p.radius < 640 && p.y - p.radius > 0 && p.y + p.radius < 350);
      for (const other of points.slice(i + 1)) assert.ok(Math.hypot(p.x - other.x, p.y - other.y) > p.radius + other.radius);
    }
  }
});

test('les effectifs invalides et les identités répétées sont rejetés', () => {
  assert.throws(() => hemicyclePoints([{ id: 'a', seats: -1 }]));
  assert.throws(() => hemicyclePoints([{ id: 'a', seats: 2.5 }]));
  assert.throws(() => countSeats([{ person: 'p' }, { person: 'p' }], 3));
  assert.throws(() => countSeats([{ person: 'a' }, { person: 'b' }], 1));
});

test('une absence de ligne reste inconnue, sans devenir un siège vacant ou un non-inscrit', () => {
  const counts = countSeats([{ person: 'p', id: 'NI', name: 'Non-inscrits', status: 'unaffiliated' }], 3);
  assert.equal(counts.find(b => b.id === 'NI').seats, 1);
  assert.equal(counts.find(b => b.id === 'not-listed').seats, 2);
  assert.equal(counts.find(b => b.id === 'not-listed').status, 'unknown');
});

test('une affiliation future, ancienne ou ambiguë ne vaut pas appartenance actuelle', () => {
  assert.equal(active({ start: '2026-10-05' }, '2026-10-04'), false);
  assert.equal(uniqueMembership([{ id: 'a', start: '2026-01-01', end: '2026-09-30' }], '2026-10-04'), null);
  assert.equal(uniqueMembership([{ id: 'a', start: '2026-01-01' }, { id: 'b', start: '2026-02-01' }], '2026-10-04'), null);
  assert.equal(uniqueMembership([{ id: 'a', start: '2026-01-01' }, { id: 'a', start: '2026-02-01' }], '2026-10-04'), 'a');
});

test('un groupe ne remplace pas un rattachement à un parti et un nouveau sénateur reste distinct des NI', () => {
  const actors = [{ uid: 'p', mandats: { mandat: [{ typeOrgane: 'ASSEMBLEE', dateDebut: '2024-07-01' }, { typeOrgane: 'GP', dateDebut: '2024-07-01', organes: { organeRef: 'g' } }] } }];
  const organs = [{ uid: 'g', codeType: 'GP', libelle: 'Groupe A' }];
  assert.equal(assemblyEntries(actors, organs, 'PARPOL', '2026-10-04')[0].id, null);
  const entries = senateEntries([{ matricule: 'p', groupe: { code: 'AUCUN', libelle: 'Nouveaux Sénateurs' } }, { matricule: 'q', groupe: { code: 'NI', libelle: 'Réunion administrative des Sénateurs ne figurant sur la liste d’aucun groupe' } }]);
  assert.equal(entries[0].status, 'unknown');
  assert.equal(entries[1].status, 'unaffiliated');
});

test('les formations nationales européennes restent distinguées par pays', () => {
  const entries = europeanPartyEntries([{ id: 'a', country: 'FR', party: ['org/1'] }, { id: 'b', country: 'DE', party: ['org/1'] }, { id: 'c', country: 'FR', party: ['org/1', 'org/2'] }], [{ id: 'org/1', label: 'Indépendant' }]);
  const buckets = countSeats(entries, 3);
  assert.equal(buckets.length, 3);
  assert.equal(buckets.find(b => b.id === 'org/1:FR').status, 'unaffiliated');
  assert.equal(buckets.find(b => b.id === 'unknown').seats, 1);
  const party = europeanPartyEntries([{ id: 'd', country: 'FR', party: ['org/2'] }], [{ id: 'org/2', label: 'Union des démocrates et indépendants' }]);
  assert.equal(party[0].status, 'known');
});

test('chaque instantané conserve ses totaux, sa date et ses sources officielles', () => {
  const snapshot = JSON.parse(readFileSync(new URL('../data/parliament-composition.json', import.meta.url), 'utf8'));
  assert.equal(snapshot.compositions.length, 8);
  for (const c of snapshot.compositions) {
    assert.equal(c.buckets.reduce((n, b) => n + b.seats, 0), c.total);
    assert.equal(new Set(c.buckets.map(b => b.id)).size, c.buckets.length);
    assert.ok(c.listed <= c.total);
    assert.match(c.asOf, /^\d{4}-\d{2}-\d{2}$/);
    for (const source of c.sources) {
      assert.ok(['data.assemblee-nationale.fr', 'www.senat.fr', 'data.europarl.europa.eu'].includes(new URL(source.url).hostname));
      assert.match(source.sha256, /^[0-9a-f]{64}$/);
    }
  }
  const finance = snapshot.compositions.find(c => c.institution === 'senat' && c.mode === 'parties');
  assert.equal(finance.asOf, '2025-11-30');
  assert.equal(finance.total, 348);
  for (const mode of ['groups', 'parties']) assert.equal(snapshot.compositions.find(c => c.institution === 'parlement_europeen' && c.scope === 'france' && c.mode === mode).total, 81);
});

test('un code pays ou un sigle ne se confond pas avec une partie du nom d’un parti étranger', () => {
  const buckets = [{ id: 'rn', name: 'Rassemblement national (FR)', seats: 29, status: 'known' }, { id: 'fdi', name: "FRATELLI D'ITALIA (IT)", seats: 24, status: 'known' }, { id: 'udi', name: 'Union des démocrates et indépendants (FR)', seats: 1, status: 'known' }];
  buckets.push({ id: 'afd', name: 'Alternative für Deutschland (DE)', seats: 15, status: 'known' }, { id: 'm', name: 'Moderaterna (SE)', seats: 4, status: 'known' });
  assert.deepEqual(filterSeatBuckets(buckets, 'fr').map(b => b.id), ['rn', 'udi']);
  assert.deepEqual(filterSeatBuckets(buckets, 'RN').map(b => b.id), ['rn']);
  assert.deepEqual(filterSeatBuckets(buckets, 'UDI').map(b => b.id), ['udi']);
  assert.deepEqual(filterSeatBuckets(buckets, 'moder').map(b => b.id), ['m']);
});
