import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readerTitle, voteScope } from '../lib/reader.ts';

const vote = (title) => ({ kind: 'vote', title });

test('un article et un texte entier gardent leur périmètre et un sujet lisible', () => {
  const article = vote("Scrutin n° 4180 — l'article 2 de la proposition de loi visant à faire évoluer la formation de sage-femme (première lecture).");
  const entire = vote('Scrutin n° 738 — l’ensemble de la proposition de loi visant à renforcer les conditions d’accès à la nationalité française à Mayotte (première lecture).');
  assert.equal(readerTitle(article), 'Faire évoluer la formation de sage-femme');
  assert.equal(voteScope(article), 'Article 2');
  assert.equal(readerTitle(entire), 'Renforcer les conditions d’accès à la nationalité française à Mayotte');
  assert.equal(voteScope(entire), 'Texte entier');
});

test('un amendement ou une motion ne se présente pas comme un vote sur le texte entier', () => {
  const amendment = vote("Scrutin n° 65 — sur l'amendement n° 1393, présenté par le Gouvernement, à l'article 14 du projet de loi de financement de la sécurité sociale pour 2025");
  const motion = vote("Scrutin n° 82 — sur la motion n° 2, présentée par Mme X, tendant à opposer la question préalable à la proposition de loi visant à renforcer le droit à l'avortement");
  assert.equal(readerTitle(amendment), 'Financement de la sécurité sociale pour 2025');
  assert.equal(voteScope(amendment), 'Amendement n° 1393');
  assert.equal(readerTitle(motion), "Renforcer le droit à l'avortement");
  assert.equal(voteScope(motion), 'Motion n° 2');
});

test('sans sujet vérifiable, le titre reste un repère de scrutin précis', () => {
  const amendment = vote("Scrutin n° 120 — sur l'amendement n° 100, présenté par Mme X et plusieurs de ses collègues");
  assert.equal(readerTitle(amendment), 'Amendement n° 100');
  assert.equal(voteScope(amendment), 'Amendement n° 100');
});
