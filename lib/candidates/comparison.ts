import { first, type SearchParamsRecord } from '../params.ts';
import type { CandidateIdentity, CandidateVote, MeasureEvidence } from './types.ts';

export type ComparisonPeriod = { from?: string; to?: string; error?: string };

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < '2017-01-01') return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

/** Invalid bounds never silently widen the comparison. Both dates are inclusive. */
export function comparisonPeriod(params: SearchParamsRecord): ComparisonPeriod {
  const from = first(params.from)?.trim() || undefined;
  const to = first(params.to)?.trim() || undefined;
  if ((from && !validDate(from)) || (to && !validDate(to))) return { error: 'Indiquez des dates valides à partir du 1er janvier 2017.' };
  if (from && to && from > to) return { error: 'La date de début doit précéder ou égaler la date de fin.' };
  return { from, to };
}

export function comparisonHref(subject: string, candidates: string[], period: ComparisonPeriod, page = 1) {
  const params = new URLSearchParams({ subject });
  candidates.forEach((candidate) => params.append('candidate', candidate));
  if (period.from) params.set('from', period.from);
  if (period.to) params.set('to', period.to);
  if (page > 1) params.set('page', String(page));
  return `/presidentielle-2027/comparer?${params}`;
}

/** Coverage of the displayed page, never attendance or a political score. */
export function comparisonCoverage(identities: CandidateIdentity[], votes: CandidateVote[] | null, links: MeasureEvidence[] | null) {
  return identities.map((identity) => {
    const documented = votes?.filter((vote) => vote.positions.some((position) => position.candidate === identity.slug && position.position !== null)).length ?? null;
    const personal = links?.filter((link) => identity.actor_id && link.actor_id === identity.actor_id) ?? null;
    return {
      ...identity, documented,
      missing: votes && documented !== null ? votes.length - documented : null,
      programs2027: personal === null ? null : new Set(personal.filter((link) => link.role === 'program' && /\b2027\b/.test(link.program_election ?? '')).map((link) => link.evidence_id)).size,
      statements: personal === null ? null : new Set(personal.filter((link) => link.role === 'statement').map((link) => link.evidence_id)).size,
    };
  });
}
