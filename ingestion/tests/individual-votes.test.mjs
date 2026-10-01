import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { individualVotes, partyOnDate } from '../lib/individual-votes.mjs';
import { aggregatePartyVotes } from '../lib/party-vote-aggregation.mjs';

test('une majorité de groupe ne remplace pas les bulletins nominatifs et une affiliation ambiguë reste non attribuée', () => {
  const fixture = JSON.parse(readFileSync(resolve(import.meta.dirname, 'fixtures/an-scrutin.sample.json'), 'utf8')).scrutin;
  const { votes } = individualVotes(fixture);
  assert.deepEqual([...votes], [['PA719952', 'pour']]);
  const affiliations = new Map([['PA719952', [
    { party_id: 'party-a', started_at: '2019-01-01', ended_at: null },
    { party_id: 'party-b', started_at: '2020-01-01', ended_at: null },
  ]]]);
  assert.equal(partyOnDate(affiliations.get('PA719952'), '2020-10-07'), null);
  const summary = aggregatePartyVotes(fixture, affiliations, '2020-10-07');
  assert.equal(summary.recorded, 1);
  assert.equal(summary.unattributed, 1);
  assert.equal(summary.parties.size, 0);
});
