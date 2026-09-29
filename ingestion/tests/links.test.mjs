// Deterministic links: only explicit, shared documentary references create a
// link; the link is a draft and carries its justification.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { candidateLinks, relationForRefType } from '../lib/links.mjs';

const item = (id, kind, refs, institution = 'senat') => ({
  id,
  kind,
  institution,
  title: id,
  detail: refs ? { refs } : null,
});

test('a shared dossier reference becomes one same_proposal draft link', () => {
  const { links, notes } = candidateLinks([
    item('aaa', 'vote', [{ type: 'senat:dossier', value: 'ppl23-555' }]),
    item('bbb', 'adopted_text', [{ type: 'senat:dossier', value: 'ppl23-555' }]),
    item('ccc', 'vote', [{ type: 'senat:seance', value: 'SEANCE-1' }]),
  ]);
  assert.equal(links.length, 1);
  assert.deepEqual([links[0].from_id, links[0].to_id], ['aaa', 'bbb']);
  assert.equal(links[0].relation, 'same_proposal');
  assert.equal(links[0].method, 'deterministic');
  assert.equal(links[0].status, 'draft');
  assert.equal(links[0].confidence, 1);
  assert.match(links[0].rationale, /senat:dossier = ppl23-555/);
  assert.match(links[0].rationale, /sans jugement de position/);
  assert.deepEqual(notes, []);
});

test('a heavily shared reference is capped and reported in the notes', () => {
  const many = Array.from({ length: 20 }, (_, i) => item(`piece-${String(i).padStart(2, '0')}`, 'vote', [{ type: 'an:dossier', value: 'DLR5L15N1' }]));
  const { links, notes } = candidateLinks(many, { maxPairsPerRef: 5 });
  assert.equal(links.length, 5);
  assert.equal(notes.length, 1);
  assert.match(notes[0], /20 pièces partagent cette référence/);
});

test('non-proposal references produce documentary related links only', () => {
  assert.equal(relationForRefType('pe:doc'), 'related');
  assert.equal(relationForRefType('pe:procedure'), 'same_proposal');
  assert.equal(relationForRefType('legifrance:jorf'), 'related');
  const { links } = candidateLinks([
    item('x1', 'vote', [{ type: 'pe:doc', value: 'PV-1' }], 'parlement_europeen'),
    item('x2', 'adopted_text', [{ type: 'pe:doc', value: 'PV-1' }], 'parlement_europeen'),
  ]);
  assert.equal(links.length, 1);
  assert.equal(links[0].relation, 'related');
});

test('identical references on the same piece are never self-linked, and duplicates collapse', () => {
  const shared = { type: 'senat:dossier', value: 'ppl23-555' };
  const { links } = candidateLinks([
    item('aaa', 'vote', [shared, shared]),
    item('bbb', 'adopted_text', [shared]),
  ]);
  assert.equal(links.length, 1);
});

test('pieces without explicit references are never linked', () => {
  assert.equal(candidateLinks([item('a', 'vote', null), item('b', 'vote', [])]).links.length, 0);
  assert.equal(candidateLinks([item('a', 'vote', [{ type: 'an:seance', value: 'S1' }])]).links.length, 0);
});
