import type { PartyVoteRow } from './data';

/** Reading caution, not a statistical confidence threshold. Ballots are not independent laws. */
export function smallVoteSample(scrutins: number): boolean {
  return scrutins > 0 && scrutins < 5;
}

export function ballotTotal(row: Pick<PartyVoteRow, 'pour' | 'contre' | 'abstention' | 'non_votant'>): number {
  return row.pour + row.contre + row.abstention + row.non_votant;
}

export function ballotShare(row: PartyVoteRow): number | null {
  const total = ballotTotal(row);
  return total ? row.pour * 100 / total : null;
}

export function formatBallotShare(row: PartyVoteRow): string {
  const value = ballotShare(row);
  if (value !== null && smallVoteSample(row.scrutins)) return `${row.pour.toLocaleString('fr-FR')} pour / ${ballotTotal(row).toLocaleString('fr-FR')}`;
  return value === null ? 'Non disponible' : `${value.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} % pour`;
}
