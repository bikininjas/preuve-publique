import { test } from 'node:test';
import assert from 'node:assert/strict';
import { voteTopicsForTitle, findVoteSubject, categoryKeywords, findVoteCategory } from '../lib/vote-subjects.ts';
import { ballotTotal, ballotShare, formatBallotShare } from '../lib/vote-profile.ts';

test('a social security funding title belongs to both subjects without duplicating the category', () => {
  const result = voteTopicsForTitle('l’ensemble du projet de loi de financement de la sécurité sociale et de protection sociale');
  const daily = result.filter(({ category }) => category.id === 'vie-quotidienne');
  assert.equal(daily.length, 1);
  assert.deepEqual(daily[0].subjects.map(({ id }) => id), ['securite-sociale', 'solidarite']);
  const keywords = categoryKeywords(findVoteCategory('vie-quotidienne'));
  assert.equal(new Set(keywords).size, keywords.length);
});

test('the full official amendment title finds subjects without asserting the direction of a measure', () => {
  const result = voteTopicsForTitle('l’amendement de suppression de l’article 1 du projet de loi relatif à la POLICE et à la nationalité');
  assert.deepEqual(result.flatMap(({ subjects }) => subjects.map(({ id }) => id)), ['immigration', 'police']);
  assert.deepEqual(voteTopicsForTitle('l’amendement n° 15'), []);
  assert.equal(findVoteSubject('liberal'), null);
});

test('ordinary investment allocations are not classified as social benefits', () => {
  assert.equal(voteTopicsForTitle('allocation des capitaux pour les entreprises').flatMap(({ subjects }) => subjects.map(({ id }) => id)).includes('solidarite'), false);
});

test('shares include abstentions and recorded non-voters and never invent a zero for missing positions', () => {
  const row = { party_id: 'test', party_name: 'Test', scrutins: 2, pour: 40, contre: 10, abstention: 25, non_votant: 25 };
  assert.equal(ballotTotal(row), 100);
  assert.equal(ballotShare(row), 40);
  const empty = { ...row, pour: 0, contre: 0, abstention: 0, non_votant: 0 };
  assert.equal(ballotShare(empty), null);
  assert.equal(formatBallotShare(empty), 'Non disponible');
  assert.equal(ballotShare({ ...row, pour: 0 }), 0);
});
