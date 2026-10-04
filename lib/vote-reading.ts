import type { Evidence } from './types';
import { voteScope, voteTally } from './reader.ts';

type Vote = Pick<Evidence, 'kind' | 'title' | 'institution' | 'detail'>;
const plain = (value: unknown) => typeof value === 'string' ? value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim() : '';

/** A procedural explanation, never an effect or a motive inferred from a theme. */
export function voteReading(item: Vote) {
  if (item.kind !== 'vote') return null;
  const sort = item.detail?.sort as { code?: unknown } | undefined;
  const outcome = plain(item.institution === 'assemblee' ? sort?.code : item.detail?.resultat);
  const adopted = ['adopte', 'adoptee', 'adoption'].includes(outcome);
  const rejected = ['rejete', 'rejetee', 'rejet'].includes(outcome);
  const proof = item.detail?.final_adoption as { verified?: unknown } | undefined;
  const scope = voteScope(item);
  const final = adopted && scope === 'Texte entier' && ['assemblee', 'senat'].includes(item.institution ?? '')
    && (proof?.verified === true || /lecture définitive/i.test(item.title));
  const target = scope === 'Texte entier' ? 'le texte entier'
    : scope?.startsWith('Amendement') ? 'l’amendement soumis au vote'
    : scope?.startsWith('Article') ? 'cet article'
    : scope?.startsWith('Motion') ? 'cette motion' : 'la proposition soumise au vote';
  return {
    final,
    summary: final ? 'Ce vote achevait l’adoption parlementaire de la loi. La promulgation est une étape distincte.'
      : `Ce scrutin portait sur ${target}.`,
    pour: `Accepter ${target}, dans la version soumise à ce scrutin.`,
    contre: `Refuser ${target}, dans cette version. Le motif du refus n’est pas indiqué par le bulletin.`,
    result: adopted ? 'Texte adopté' : rejected ? 'Proposition rejetée' : 'Résultat à consulter dans la source',
  };
}

/** Abstentions are outside expressed suffrages. No claim about all groups or motives. */
export function voteBalance(item: Pick<Evidence, 'detail'>): string | null {
  const tally = voteTally(item);
  if (tally?.pour == null || tally.contre == null || tally.pour < 0 || tally.contre < 0) return null;
  const expressed = tally.pour + tally.contre;
  if (!expressed) return null;
  const share = tally.pour * 100 / expressed;
  const figure = `${share.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} % des suffrages exprimés pour`;
  return tally.contre === 0 ? `Aucun vote contre · ${figure}` : figure;
}
