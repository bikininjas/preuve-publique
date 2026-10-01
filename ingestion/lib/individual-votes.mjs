/**
 * Positions nominatives publiées dans une archive de scrutins de l'Assemblée.
 * Une position individuelle ne se déduit jamais de la majorité de son groupe.
 */
const POSITION_KEYS = {
  pours: 'pour',
  contres: 'contre',
  abstentions: 'abstention',
  nonVotants: 'non_votant',
};

export function individualVotes(scrutin) {
  const raw = scrutin.ventilationVotes?.organe?.groupes?.groupe ?? [];
  const groups = Array.isArray(raw) ? raw : [raw];
  const votes = new Map();
  const conflicts = new Set();
  for (const group of groups) {
    const nominal = group?.vote?.decompteNominatif ?? {};
    for (const [key, position] of Object.entries(POSITION_KEYS)) {
      const rawVoters = nominal[key]?.votant ?? [];
      const voters = Array.isArray(rawVoters) ? rawVoters : [rawVoters];
      for (const voter of voters) {
        const ref = voter?.acteurRef;
        if (typeof ref !== 'string' || !/^PA\d+$/.test(ref)) continue;
        if (votes.has(ref) && votes.get(ref) !== position) conflicts.add(ref);
        else votes.set(ref, position);
      }
    }
  }
  for (const ref of conflicts) votes.delete(ref);
  return { votes, conflicts: conflicts.size };
}

/** Exactly one active, sourced party affiliation on the date of the ballot. */
export function partyOnDate(affiliations, day) {
  const active = new Set(affiliations
    .filter((row) => row.started_at <= day && (!row.ended_at || row.ended_at >= day))
    .map((row) => row.party_id));
  return active.size === 1 ? [...active][0] : null;
}
