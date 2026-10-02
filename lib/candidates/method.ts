import type { CandidateConnection } from './types';

export const CONNECTION_LABELS = {
  financial_attachment: 'Rattachement pour le financement public',
  parliamentary_group: 'Groupe parlementaire', party_member: 'Adhésion documentée',
  electoral_support: 'Soutien électoral documenté', coalition: 'Coalition documentée',
};
export const POSITION_LABELS = { pour:'Pour',contre:'Contre',abstention:'Abstention',non_votant:'Non-votant enregistré' };
export function connectionActive(connection: Pick<CandidateConnection,'started_at'|'ended_at'>,day: string) {
  return connection.started_at <= day && (!connection.ended_at || connection.ended_at >= day);
}
/** A missing ballot is not an absence. A financial attachment is not membership. */
export function positionLabel(position: keyof typeof POSITION_LABELS|null) {
  return position === null ? 'Vote individuel non disponible dans ce corpus' : POSITION_LABELS[position];
}
export function comparisonCandidates(values: string[],known: string[]) {
  return [...new Set(values)].filter((value)=>known.includes(value)).slice(0,3);
}
