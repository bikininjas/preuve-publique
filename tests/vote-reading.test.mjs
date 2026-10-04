import test from 'node:test';
import assert from 'node:assert/strict';
import { voteBalance, voteReading } from '../lib/vote-reading.ts';
import { formatBallotShare, smallVoteSample } from '../lib/vote-profile.ts';

const vote = (title, detail, institution = 'assemblee') => ({ kind: 'vote', title, detail, institution });
test('une adoption définitive exige un résultat adopté et une preuve de procédure', () => {
  const title = 'l’ensemble du projet de loi sur le logement (première lecture)';
  const adopted = { sort: { code: 'adopté' } };
  assert.equal(voteReading(vote(title, adopted)).final, false);
  assert.equal(voteReading(vote(title, { ...adopted, final_adoption: { verified: false } })).final, false);
  assert.equal(voteReading(vote(title, { ...adopted, final_adoption: { verified: true } })).final, true);
  assert.equal(voteReading(vote('l’amendement n° 1 au projet de loi (lecture définitive)', { ...adopted, final_adoption: { verified: true } })).final, false);
  assert.equal(voteReading(vote(title.replace('première lecture', 'lecture définitive'), { sort: { code: 'rejeté' } })).final, false);
  assert.equal(voteReading(vote(title, { resultat: 'Adoption', final_adoption: { verified: true } }, 'parlement_europeen')).final, false);
});
test('un amendement de suppression reste un vote sur cet amendement sans inférer une politique', () => {
  const reading = voteReading(vote('l’amendement n° 1 de suppression de la taxe du projet de loi relatif au climat', {}));
  assert.match(reading.pour, /Accepter l’amendement/);
  assert.match(reading.contre, /motif du refus n’est pas indiqué/);
  assert.doesNotMatch(reading.summary, /créer|financer|protection|adoption parlementaire/);
});
test('la répartition exclut les abstentions et ne prétend pas établir un consensus des groupes', () => {
  assert.match(voteBalance({ detail: { decompte: { pour: 95, contre: 5, abstentions: 100 } } }), /^95 % des suffrages exprimés pour$/);
  assert.match(voteBalance({ detail: { decompte: { pour: 10, contre: 0, abstentions: 20 } } }), /^Aucun vote contre/);
  assert.equal(voteBalance({ detail: { decompte: { pour: 0, contre: 0 } } }), null);
  assert.equal(voteBalance({ detail: { decompte: { pour: 10 } } }), null);
});
test('un seul texte et de nombreux bulletins restent un petit corpus, sans grand pourcentage', () => {
  const row = { party_id: 'test', party_name: 'Test', scrutins: 1, pour: 100, contre: 0, abstention: 0, non_votant: 0 };
  assert.equal(formatBallotShare(row), '100 pour / 100');
  assert.equal(smallVoteSample(1), true);
  assert.equal(smallVoteSample(4), true);
  assert.equal(smallVoteSample(0), false);
  assert.equal(smallVoteSample(5), false);
  assert.equal(formatBallotShare({ ...row, scrutins: 5 }), '100 % pour');
});
