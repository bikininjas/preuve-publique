import { enumParam, first, pageParam, type SearchParamsRecord } from './params.ts';
import { EVIDENCE_KINDS, INSTITUTIONS, type EvidenceKind, type Institution, type RowStatus } from './types.ts';

export const REVIEW_STATUSES = ['draft', 'reviewed', 'published', 'all'] as const;

export interface ReviewFilters {
  status: RowStatus | 'all';
  kind?: EvidenceKind;
  institution?: Institution;
  terms: string;
  page: number;
}

export function reviewFilters(params: SearchParamsRecord): ReviewFilters {
  return {
    status: enumParam(params.status, REVIEW_STATUSES) ?? 'draft',
    kind: enumParam(params.kind, EVIDENCE_KINDS),
    institution: enumParam(params.institution, INSTITUTIONS),
    terms: (first(params.q) ?? '').trim().slice(0, 120),
    page: pageParam(params.page),
  };
}

/** One canonical URL for filters, pagination and the return from a piece. */
export function reviewQueueHref(filters: ReviewFilters, page = filters.page): string {
  const search = new URLSearchParams({ status: filters.status });
  if (filters.kind) search.set('kind', filters.kind);
  if (filters.institution) search.set('institution', filters.institution);
  if (filters.terms) search.set('q', filters.terms);
  if (page > 1) search.set('page', String(page));
  return `/admin/review?${search}`;
}

/** Accept only the two review queues, and rebuild their known parameters. */
export function reviewReturnPath(value: string | string[] | undefined): string {
  const fallback = '/admin/review?status=all';
  const path = first(value);
  if (!path?.startsWith('/') || path.startsWith('//') || /[\\\u0000-\u0020]/.test(path)) return fallback;
  try {
    const url = new URL(path, 'https://admin.invalid');
    if (url.origin !== 'https://admin.invalid') return fallback;
    const params = Object.fromEntries(url.searchParams);
    if (url.pathname === '/admin/review') return reviewQueueHref(reviewFilters(params));
    if (url.pathname === '/admin/links') {
      const { status, page } = reviewFilters(params);
      const search = new URLSearchParams({ status });
      if (page > 1) search.set('page', String(page));
      return `/admin/links?${search}`;
    }
  } catch {
    return fallback;
  }
  return fallback;
}

export function adminPieceHref(id: string, returnTo: string): string {
  return `/admin/pieces/${encodeURIComponent(id)}?${new URLSearchParams({ returnTo })}`;
}
