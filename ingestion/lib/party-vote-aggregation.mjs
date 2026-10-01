import { individualVotes, partyOnDate } from './individual-votes.mjs';

const POSITION_COLUMNS = {
  pour: 'pour',
  contre: 'contre',
  abstention: 'abstention',
  non_votant: 'non_votant',
};

/** Count only recorded individual ballots with one dated party affiliation. */
export function aggregatePartyVotes(scrutin, affiliationsByPerson, day) {
  const { votes, conflicts } = individualVotes(scrutin);
  const parties = new Map();
  let unattributed = 0;
  for (const [personRef, position] of votes) {
    const partyId = partyOnDate(affiliationsByPerson.get(personRef) ?? [], day);
    if (!partyId) { unattributed += 1; continue; }
    const counts = parties.get(partyId) ?? {
      pour: 0, contre: 0, abstention: 0, non_votant: 0,
    };
    counts[POSITION_COLUMNS[position]] += 1;
    parties.set(partyId, counts);
  }
  return { parties, recorded: votes.size, unattributed, conflicts };
}
