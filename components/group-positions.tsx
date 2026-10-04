import { DataTable } from '@/components/ui';
import { PoliticalBadge } from '@/components/political-classification';
import { positionLabel } from '@/lib/labels';

export interface GroupPosition {
  organe_ref?: string | null;
  membres?: number | null;
  position_majoritaire?: string | null;
  pour?: number | null;
  contre?: number | null;
  abstentions?: number | null;
  non_votants?: number | null;
}

const asCount = (value: number | null | undefined) =>
  typeof value === 'number' ? value.toLocaleString('fr-FR') : '—';

/**
 * Positions que l'institution publie pour chaque groupe sur un scrutin.
 * Le site ne les calcule pas : il affiche ce que la source écrit, et rappelle
 * qu'un groupe n'est pas une personne.
 */
export function GroupPositions({
  groups,
  names,
  occurredAt,
}: {
  groups: GroupPosition[];
  names: Map<string, string>;
  occurredAt: string;
}) {
  const sorted = [...groups].sort((a, b) => (b.membres ?? 0) - (a.membres ?? 0));
  return (
    <>
      <DataTable
        head={['Groupe', 'Position publiée', 'Pour', 'Contre', 'Abstentions', 'Non-votants', 'Membres']}
      >
        {sorted.map((group) => {
          const ref = group.organe_ref ?? '';
          const name = names.get(`an-organe:${ref}`) ?? (ref || 'Groupe non identifié');
          return (
            <tr key={ref || name}>
              <td>{name}<PoliticalBadge name={name} kind="group" chamber="Assemblée nationale" externalId={`an-organe:${ref}`} asOf={occurredAt} /></td>
              <td>{positionLabel(group.position_majoritaire)}</td>
              <td>{asCount(group.pour)}</td>
              <td>{asCount(group.contre)}</td>
              <td>{asCount(group.abstentions)}</td>
              <td>{asCount(group.non_votants)}</td>
              <td>{asCount(group.membres)}</td>
            </tr>
          );
        })}
      </DataTable>
      <p className="hint">
        Positions publiées par l’Assemblée nationale pour chaque groupe. Un groupe n’est pas une personne : la position
        d’un groupe ne dit pas celle de chacun de ses membres, et cette base ne contient aucune position individuelle.
      </p>
    </>
  );
}
