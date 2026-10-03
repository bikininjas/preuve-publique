import test from 'node:test';
import assert from 'node:assert/strict';
import { comparisonPeriod, comparisonHref, comparisonCoverage } from '../lib/candidates/comparison.ts';

test('la période commune accepte les jours réels et refuse les bornes ambiguës sans élargir le corpus', () => {
  assert.deepEqual(comparisonPeriod({ from: '2024-02-29', to: '2024-02-29' }), { from: '2024-02-29', to: '2024-02-29' });
  assert.deepEqual(comparisonPeriod({ from: '', to: '2026-10-03' }), { from: undefined, to: '2026-10-03' });
  for (const params of [{ from: '2026-02-29' }, { from: '2016-12-31' }, { to: '2026-13-01' }, { from: '2026-10-03', to: '2026-10-02' }, { from: '2026-10-03T00:00:00Z' }]) {
    const period = comparisonPeriod(params);
    assert.ok(period.error);
    assert.equal(period.from, undefined);
    assert.equal(period.to, undefined);
  }
});

test('la pagination conserve personnes, sous-thème et dates communes sans paramètres privés', () => {
  const url = new URL(comparisonHref('logement', ['personne-a', 'personne-b'], comparisonPeriod({ from: '2024-01-01', to: '2025-12-31', notes: 'privé' }), 3), 'https://preuve-publique.fr');
  assert.deepEqual(url.searchParams.getAll('candidate'), ['personne-a', 'personne-b']);
  assert.equal(url.searchParams.get('from'), '2024-01-01');
  assert.equal(url.searchParams.get('to'), '2025-12-31');
  assert.equal(url.searchParams.get('page'), '3');
  assert.equal(url.searchParams.has('notes'), false);
});

test('la couverture distingue non-votant documenté, bulletin manquant, programme ancien et panne', () => {
  const identities = [{ slug: 'a', name: 'Personne A', actor_id: 'acteur-a' }, { slug: 'b', name: 'Personne B', actor_id: null }];
  const votes = [{ positions: [{ candidate: 'a', position: 'non_votant' }, { candidate: 'b', position: null }] }, { positions: [{ candidate: 'a', position: 'contre' }] }];
  const links = [{ evidence_id: 'ancien', actor_id: 'acteur-a', role: 'program', program_election: 'Présidentielle 2022' }, { evidence_id: 'actuel', actor_id: 'acteur-a', role: 'program', program_election: 'Présidentielle 2027' }, { evidence_id: 'actuel', actor_id: 'acteur-a', role: 'program', program_election: 'Présidentielle 2027' }, { evidence_id: 'autre', actor_id: 'autre', role: 'statement' }];
  const [a, b] = comparisonCoverage(identities, votes, links);
  assert.equal(a.documented, 2);
  assert.equal(a.missing, 0);
  assert.equal(a.programs2027, 1);
  assert.equal(a.statements, 0);
  assert.equal(b.documented, 0);
  assert.equal(b.missing, 2);
  assert.equal(b.programs2027, 0);
  const [failed] = comparisonCoverage(identities, null, null);
  assert.equal(failed.documented, null);
  assert.equal(failed.programs2027, null);
});
