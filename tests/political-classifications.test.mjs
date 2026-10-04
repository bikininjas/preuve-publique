import { test } from 'node:test';
import assert from 'node:assert/strict';
import { politicalClassification, politicalClassifications } from '../lib/political-classifications.ts';

test('une nuance de parti ne se transfère ni à son groupe ni à une autre chambre', () => {
  assert.equal(politicalClassification({ name: 'Rassemblement national', kind: 'party' }).label, 'Extrême droite');
  assert.equal(politicalClassification({ name: 'Rassemblement national', kind: 'group', chamber: 'Assemblée nationale' }), null);
  assert.equal(politicalClassification({ name: 'Les Républicains', kind: 'group', chamber: 'Sénat' }).basis, 'self_description');
  assert.equal(politicalClassification({ name: 'Les Républicains', kind: 'group', chamber: 'Assemblée nationale' }), null);
});

test('les identités proches et les anciens noms restent distincts', () => {
  assert.equal(politicalClassification({ name: 'Les Écologistes-mouvement écologiste independant', kind: 'party' }), null);
  assert.equal(politicalClassification({ name: 'La République en Marche', kind: 'party' }), null);
  assert.equal(politicalClassification({ name: 'Union des démocrates européens, centristes et indépendants', kind: 'party' }), null);
  assert.equal(politicalClassification({ name: 'Socialistes et apparentés', kind: 'group', chamber: 'Assemblée nationale', externalId: 'an-organe:PO758835' }), null);
  assert.equal(politicalClassification({ name: 'Horizons', kind: 'group', chamber: 'Assemblée nationale', officialNames: ['Horizons & Indépendants', 'Horizons et apparentés'] }).label, 'Droite et centre');
});

test('les changements électoraux gardent leur contexte et ne réécrivent pas le passé', () => {
  const entries = politicalClassifications({ name: 'La France Insoumise', kind: 'party' });
  assert.deepEqual(entries.map(e => [e.label, e.context]), [['Extrême gauche', 'Municipales 2026'], ['Gauche', 'Sénatoriales 2023']]);
  assert.equal(politicalClassification({ name: 'Droite Républicaine', kind: 'group', chamber: 'Assemblée nationale', asOf: '2024-07-01' }), null);
  assert.equal(politicalClassification({ name: 'Droite Républicaine', kind: 'group', chamber: 'Assemblée nationale', asOf: '2024-07-20' }).label, 'Droite et centre droit');
});
