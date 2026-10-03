import type { Evidence } from '@/lib/types';

const voteWording = (title: string) => title.replace(/^Scrutin n°\s*\d+\s*[—–-]\s*/i, '').trim();

const capitalize = (value: string) => value.charAt(0).toLocaleUpperCase('fr-FR') + value.slice(1);

/** A short reading label; the exact institutional title remains on the fiche. */
function shortLabel(value: string): string {
  const clean = value
    .replace(/\s*\((?:première|deuxième|nouvelle|lecture définitive|texte de la commission mixte paritaire)[^)]*\)\.?$/i, '')
    .replace(/[\s.]+$/, '').trim();
  if (clean.length <= 125) return capitalize(clean);
  const cut = clean.lastIndexOf(' ', 122);
  return `${capitalize(clean.slice(0, cut > 65 ? cut : 122).trim())}…`;
}

/**
 * Keep only wording that identifies the text under discussion. In particular,
 * an amendment receives its parent text's subject, while its own scope stays
 * visible in a separate badge. No position or effect is inferred here.
 */
export function readerTitle(item: Pick<Evidence, 'kind' | 'title'>): string {
  if (item.kind !== 'vote') return item.title;
  // European decision labels often give a document identifier rather than its
  // subject. Preserve it so different resolutions never acquire identical titles.
  if (/^Vote du \d{4}-\d{2}-\d{2}\s*[-–—]/i.test(item.title)) {
    return shortLabel(item.title.replace(/^Vote du \d{4}-\d{2}-\d{2}\s*[-–—]\s*/i, ''));
  }
  const wording = voteWording(item.title);
  if (!wording) return item.title;
  const parents = [...wording.matchAll(/\b(?:projet|proposition) de (?:loi|résolution)\b/gi)];
  const parent = parents.at(-1);
  if (parent?.index !== undefined) {
    const text = wording.slice(parent.index);
    // The annual finance bills must retain their subject and year.
    if (/^(?:projet|proposition) de loi (?:de finances|de financement de la sécurité sociale)\b/i.test(text)) {
      return shortLabel(text.replace(/^(?:projet|proposition) de loi de\s+/i, ''));
    }
    const marker = /\b(?:visant à|tendant à|relatif à|relative à|relatif au|relative au|relatifs aux|relatives aux|portant|pour)\s+/i.exec(text);
    if (marker?.index !== undefined) {
      const subject = text.slice(marker.index + marker[0].length);
      if (subject.length > 8) return shortLabel(subject);
    }
    const noun = text.match(/^(?:projet|proposition) de loi d(?:e\s+|['’])(.+)/i);
    if (noun) return shortLabel(noun[1]);
    return shortLabel(text);
  }
  const mission = wording.match(/\bcrédits de la mission\s+[«"][^»"]+[»"]/i);
  if (mission) return shortLabel(mission[0]);
  const scope = voteScope(item);
  if (scope?.startsWith('Amendement') || scope?.startsWith('Motion')) return scope;
  return shortLabel(wording.replace(/^sur\s+/i, '').replace(/^l['’]ensemble (?:du|de la|d'un|d'une)\s+/i, ''));
}

/** Exact scope cues copied from explicit words in the institutional title. */
export function voteScope(item: Pick<Evidence, 'kind' | 'title'>): string | null {
  if (item.kind !== 'vote') return null;
  const subject = voteWording(item.title);
  if (/(?:\(ensemble du texte\)|\bvote (?:unique|final))\.?$/i.test(subject)) return 'Texte entier';
  if (/^(?:sur )?l['’]article (?:unique|\d+(?: bis| ter)?) constituant l['’]ensemble\b/i.test(subject)) return 'Texte entier';
  if (/^(?:sur )?l['’]ensemble\b/i.test(subject)) return 'Texte entier';
  if (/^(?:sur )?les amendements identiques\b/i.test(subject)) return 'Amendements identiques';
  const amendment = subject.match(/^(?:sur )?l['’]amendement n°\s*([\w-]+)/i);
  if (amendment) return `Amendement n° ${amendment[1]}`;
  const motion = subject.match(/^(?:sur )?la motion n°\s*([\w-]+)/i);
  if (motion) return `Motion n° ${motion[1]}`;
  const article = subject.match(/^(?:sur )?l['’]article\s+([\w-]+(?:\s+(?:bis|ter|quater|quinquies|sexies|septies))?)/i);
  if (article) return `Article ${article[1]}`;
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
  if (!raw && item.detail && ('favor' in item.detail || 'against' in item.detail)) {
    return { pour: count(item.detail.favor), contre: count(item.detail.against), abstentions: count(item.detail.abstentions), votants: count(item.detail.attendees) };
  }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const row = raw as Record<string, unknown>;
  return {
    pour: count(row.pour),
    contre: count(row.contre),
    abstentions: count(row.abstentions),
    votants: count(row.votants),
  };
}
