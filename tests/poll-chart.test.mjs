import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pollChartSeries } from '../lib/polls/chart-model.ts';

const poll = (id, scenarios) => ({ id, fieldwork_end: '2026-09-29', institute: 'Institut de test', scenarios });
const scenario = (round, number, score, id = 'personne') => ({ round, scenario_number: number, results: [{ candidate_external_id: id, candidate_name: 'Personne de test', score }] });

test('les mesures aux mêmes coordonnées gardent leurs sources, tours et configurations', () => {
  const a = poll('notice-a', [scenario(1, 1, 12), scenario(1, 2, 12), scenario(2, 1, 12)]);
  const b = poll('notice-b', [scenario(1, 1, 12)]);
  const [series] = pollChartSeries([a, b], ['personne']);
  assert.equal(series.points.length, 4);
  assert.equal(series.clusters.length, 1);
  assert.deepEqual(series.clusters[0].points.map(p => [p.poll.id, p.scenario.round, p.scenario.scenario_number]), [['notice-a', 1, 1], ['notice-a', 1, 2], ['notice-a', 2, 1], ['notice-b', 1, 1]]);
});

test('séparer les personnes conserve les valeurs faibles et le zéro sans inventer les absences', () => {
  const a = poll('notice-a', [scenario(1, 1, 0), scenario(1, 2, 1.5), scenario(1, 3, 35, 'autre')]);
  const series = pollChartSeries([a], ['personne', 'autre', 'absente']);
  assert.equal(series.length, 2);
  assert.deepEqual(series[0].clusters.map(c => c.score), [0, 1.5]);
  assert.equal(series[0].ceiling, 5);
  assert.equal(series[1].ceiling, 35);
  assert.equal(series.reduce((sum, s) => sum + s.points.length, 0), 3);
});

test('masquer une personne ne fusionne aucune autre mesure ni ne change sa provenance', () => {
  const a = poll('notice-a', [scenario(1, 1, 10), scenario(1, 2, 11), scenario(1, 3, 20, 'autre')]);
  const both = pollChartSeries([a], ['personne', 'autre']);
  const single = pollChartSeries([a], ['personne']);
  assert.deepEqual(single[0], both[0]);
  assert.deepEqual(pollChartSeries([a], []), []);
});
