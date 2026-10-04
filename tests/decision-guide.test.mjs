import test from 'node:test';
import assert from 'node:assert/strict';
import { decisionNotebook, decisionParties, decisionRoutes } from '../lib/decision-guide.ts';

test('le parcours borne les sujets et personnes et conserve les mêmes sélections dans chaque comparaison', () => {
  const routes = decisionRoutes(['invalid', 'logement', 'logement', 'sante', 'justice', 'retraites'], ['b', 'invalid', 'b', 'a', 'c', 'd'], ['a', 'b', 'c', 'd']);
  assert.deepEqual(routes.map((route) => route.id), ['logement', 'sante', 'justice']);
  for (const route of routes) {
    const query = new URL(route.comparison, 'https://preuve-publique.fr').searchParams;
    assert.equal(query.get('subject'), route.id);
    assert.deepEqual(query.getAll('candidate'), ['b', 'a', 'c']);
    assert.equal(query.has('score'), false);
  }
});

test('les notes privées restent dans le carnet texte et les liens ne contiennent que les filtres contrôlés', () => {
  const routes = decisionRoutes(['retraites'], [], []);
  const notebook = decisionNotebook(routes, [], { retraites: 'Ma question privée\nUne pièce à retrouver.', sante: 'Note hors de la sélection' });
  assert.match(notebook, /Ma question privée\nUne pièce à retrouver\./);
  assert.doesNotMatch(notebook, /Note hors de la sélection/);
  assert.ok(notebook.includes('https://preuve-publique.fr/presidentielle-2027/comparer?subject=retraites'));
  assert.equal(new URL(routes[0].comparison, 'https://preuve-publique.fr').searchParams.size, 1);
  assert.match(notebook, /Une donnée manquante n’est pas une absence/);
});

test('le carnet conserve les deux identités exactes dans chaque sujet et dans le mémo privé', () => {
  const available = [{ id: 'ancien', name: 'Ancien nom' }, { id: 'actuel', name: 'Nom actuel' }];
  const parties = decisionParties(['ancien', 'actuel'], available);
  const routes = decisionRoutes(['police', 'logement'], [], [], parties);
  for (const route of routes) {
    const url = new URL(route.parties, 'https://preuve-publique.fr');
    assert.equal(url.searchParams.get('left'), 'ancien');
    assert.equal(url.searchParams.get('right'), 'actuel');
    assert.equal(url.searchParams.get('subject'), route.id);
    assert.equal(url.searchParams.size, 3);
  }
  const memo = decisionNotebook(routes, [], { police: 'Ma note privée' }, parties);
  assert.match(memo, /Partis à comparer : Ancien nom \/ Nom actuel/);
  assert.match(memo, /Ma note privée/);
  assert.ok(memo.includes(routes[0].parties));
});

test('une identité absente ou répétée ne remplace jamais un parti ni ne crée une fausse paire', () => {
  const available = [{ id: 'a', name: 'A' }, { id: 'b', name: 'B' }];
  for (const ids of [['a', 'a'], ['a', 'inconnu'], [undefined, 'b']]) assert.deepEqual(decisionParties(ids, available), []);
  assert.deepEqual(decisionParties(['a', 'b'], []), []);
});
