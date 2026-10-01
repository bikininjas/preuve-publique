import type { Evidence } from '@/lib/types';

/** Remove only the prefix added by our importers; the institutional wording stays intact. */
export function readerTitle(item: Pick<Evidence, 'kind' | 'title'>): string {
  if (item.kind !== 'vote') return item.title;
  const withoutPrefix = item.title.replace(/^Scrutin n°\s*\d+\s*[—–-]\s*/i, '').trim();
  if (!withoutPrefix) return item.title;
  const reduced = withoutPrefix.replace(/^(?:sur )?l'ensemble (?:du|de la|d'un|d'une)\s+/i, '');
  return reduced.charAt(0).toLocaleUpperCase('fr-FR') + reduced.slice(1);
}

/** A reading aid derived from explicit words in the institutional title. */
export function voteScope(item: Pick<Evidence, 'kind' | 'title'>): string | null {
  if (item.kind !== 'vote') return null;
  const subject = item.title.replace(/^Scrutin n°\s*\d+\s*[—–-]\s*/i, '').trim();
  if (/^(?:sur )?l'ensemble\b/i.test(subject)) return 'Texte entier';
  if (/^(?:sur )?l['’]article\b/i.test(subject)) return 'Article';
  if (/^(?:sur )?l['’]amendement\b/i.test(subject)) return 'Amendement';
  return null;
}

export function scrutinNumber(item: Pick<Evidence, 'kind' | 'title'>): string | null {
  if (item.kind !== 'vote') return null;
  return item.title.match(/^Scrutin n°\s*(\d+)/i)?.[1] ?? null;
}

export interface VoteTally {
  pour: number | null;
  contre: number | null;
  abstentions: number | null;
  votants: number | null;
}

const count = (value: unknown) => typeof value === 'number' && Number.isFinite(value) ? value : null;

/** The count comes from the source's structured vote record, never from an estimate. */
export function voteTally(item: Pick<Evidence, 'detail'>): VoteTally | null {
  const raw = item.detail?.decompte;
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const row = raw as Record<string, unknown>;
  return {
    pour: count(row.pour),
    contre: count(row.contre),
    abstentions: count(row.abstentions),
    votants: count(row.votants),
  };
}
