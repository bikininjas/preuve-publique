import type { PartyVoteRow } from './data';

export function ballotTotal(row: Pick<PartyVoteRow, 'pour' | 'contre' | 'abstention' | 'non_votant'>): number {
  return row.pour + row.contre + row.abstention + row.non_votant;
}

export function ballotShare(row: PartyVoteRow): number | null {
  const total = ballotTotal(row);
  return total ? row.pour * 100 / total : null;
}

export function formatBallotShare(row: PartyVoteRow): string {
  const value = ballotShare(row);
  return value === null ? 'Non disponible' : `${value.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} % pour`;
}
