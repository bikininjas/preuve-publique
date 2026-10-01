import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { isRangeNotSatisfiable } from '@/lib/data';
import type {
  Actor,
  Evidence,
  EvidenceKind,
  EvidenceLink,
  EvidencePage,
  IngestionRun,
  RowStatus,
  Source,
} from '@/lib/types';

/**
 * Server-side helpers for the review space. Every read runs with the
 * administrator's session and the publishable key; row level security decides
 * what comes back (see `supabase/migrations/20261002000000_admin_review.sql`).
 * The web service never holds a privileged key.
 */

/** Same transition graph as the CLI (`ingestion/lib/db.mjs`). */
export const ALLOWED_TRANSITIONS: Record<RowStatus, readonly RowStatus[]> = {
  draft: ['reviewed'],
  reviewed: ['published', 'draft'],
  published: ['reviewed'],
};

export class AdminDataError extends Error {
  constructor(message = 'Les données d’administration sont indisponibles pour le moment.') {
    super(message);
    this.name = 'AdminDataError';
  }
}

/**
 * Who is asking. `not_allowed` is returned when a signed-in address is not in
 * `admin_users`; failures deny access rather than open it.
 */
export type AdminSession =
  | { status: 'unconfigured' }
  | { status: 'signed_out' }
  | { status: 'not_allowed'; email: string | null }
  | { status: 'admin'; email: string };

export async function getAdminSession(): Promise<AdminSession> {
  if (!isSupabaseConfigured()) return { status: 'unconfigured' };
  try {
    const db = await createClient();
    const { data } = await db.auth.getClaims();
    const claims = data?.claims as Record<string, unknown> | undefined;
    const email = typeof claims?.email === 'string' ? claims.email.toLowerCase() : null;
    if (!claims || !email) return { status: 'signed_out' };
    // The row is only visible to its own address (RLS), so this doubles as
    // the allowlist check without ever exposing the full list.
    const { data: allowed } = await db
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .eq('active', true)
      .maybeSingle();
    if (!allowed) return { status: 'not_allowed', email };
    return { status: 'admin', email };
  } catch {
    return { status: 'signed_out' };
  }
}

const ADMIN_EVIDENCE_COLUMNS =
  'id,source_id,actor_id,title,excerpt,kind,institution,occurred_at,source_url,source_locator,external_id,status,detail,reviewed_by,reviewed_at';

const LINK_COLUMNS =
  'id,from_id,to_id,relation,confidence,method,rationale,status,reviewed_by,reviewed_at';

export interface ReviewQuery {
  status?: RowStatus | 'all';
  kind?: EvidenceKind;
  terms?: string;
  offset?: number;
  limit?: number;
}

export interface LinkedEvidenceRef {
  id: string;
  title: string;
  kind: EvidenceKind;
  institution: string | null;
  occurred_at: string;
  status: RowStatus;
  external_id: string | null;
}

export interface AdminLinkRow extends EvidenceLink {
  reviewed_by: string | null;
  reviewed_at: string | null;
  from: LinkedEvidenceRef | null;
  to: LinkedEvidenceRef | null;
}

/** Pieces of every status, newest first, for the review queue. */
export async function listEvidenceForReview(query: ReviewQuery = {}): Promise<EvidencePage> {
  const db = await createClient();
  const limit = Math.min(Math.max(query.limit ?? 50, 1), 100);
  const offset = Math.max(query.offset ?? 0, 0);
  let request = db
    .from('evidence')
    .select(ADMIN_EVIDENCE_COLUMNS, { count: 'exact' })
    .order('occurred_at', { ascending: false })
    .order('id', { ascending: false })
    .range(offset, offset + limit - 1);
  if (query.status && query.status !== 'all') request = request.eq('status', query.status);
  if (query.kind) request = request.eq('kind', query.kind);
  if (query.terms?.trim()) {
    request = request.textSearch('search', query.terms.trim(), { config: 'french', type: 'websearch' });
  }
  const { data, error, count } = await request;
  if (error) {
    if (isRangeNotSatisfiable(error)) {
      const total = await countEvidenceForReview(query);
      return { items: [], total, offset, limit, hasMore: false };
    }
    throw new AdminDataError();
  }
  const total = count ?? 0;
  return {
    items: (data ?? []) as unknown as Evidence[],
    total,
    offset,
    limit,
    hasMore: offset + limit < total,
  };
}

/** Count-only query with the same filters, used when a page is past the end. */
async function countEvidenceForReview(query: ReviewQuery): Promise<number> {
  const db = await createClient();
  let request = db.from('evidence').select('id', { count: 'exact', head: true });
  if (query.status && query.status !== 'all') request = request.eq('status', query.status);
  if (query.kind) request = request.eq('kind', query.kind);
  if (query.terms?.trim()) {
    request = request.textSearch('search', query.terms.trim(), { config: 'french', type: 'websearch' });
  }
  const { count, error } = await request;
  if (error) throw new AdminDataError();
  return count ?? 0;
}

/** One piece of any status with its source, actor and documented links. */
export async function getEvidenceForAdmin(id: string): Promise<{
  evidence: Evidence;
  source: Source | null;
  actor: Actor | null;
  links: AdminLinkRow[];
} | null> {
  const db = await createClient();
  const { data, error } = await db
    .from('evidence')
    .select(
      `${ADMIN_EVIDENCE_COLUMNS},source:sources(id,url,publisher,document_title,published_at,retrieved_at,sha256),actor:actors(id,name,kind,external_id)`,
    )
    .eq('id', id)
    .maybeSingle();
  if (error) throw new AdminDataError();
  if (!data) return null;
  const row = data as unknown as Evidence & { source: Source | null; actor: Actor | null };
  const { data: links, error: linksError } = await db
    .from('evidence_links')
    .select(
      `${LINK_COLUMNS},from:evidence!from_id(id,title,kind,institution,occurred_at,status,external_id),to:evidence!to_id(id,title,kind,institution,occurred_at,status,external_id)`,
    )
    .or(`from_id.eq.${id},to_id.eq.${id}`)
    .order('id', { ascending: true })
    .limit(200);
  if (linksError) throw new AdminDataError();
  const { source, actor, ...evidence } = row;
  return {
    evidence: evidence as Evidence,
    source,
    actor,
    links: (links ?? []) as unknown as AdminLinkRow[],
  };
}

/** Links of every status, newest pieces first, for the review queue. */
export async function listLinksForReview(
  query: { status?: RowStatus | 'all'; offset?: number; limit?: number } = {},
): Promise<{ items: AdminLinkRow[]; total: number; offset: number; limit: number; hasMore: boolean }> {
  const db = await createClient();
  const limit = Math.min(Math.max(query.limit ?? 50, 1), 100);
  const offset = Math.max(query.offset ?? 0, 0);
  let request = db
    .from('evidence_links')
    .select(
      `${LINK_COLUMNS},from:evidence!from_id(id,title,kind,institution,occurred_at,status,external_id),to:evidence!to_id(id,title,kind,institution,occurred_at,status,external_id)`,
      { count: 'exact' },
    )
    .order('id', { ascending: true })
    .range(offset, offset + limit - 1);
  if (query.status && query.status !== 'all') request = request.eq('status', query.status);
  const { data, error, count } = await request;
  if (error) {
    if (isRangeNotSatisfiable(error)) {
      const total = await countLinksForReview(query);
      return { items: [], total, offset, limit, hasMore: false };
    }
    throw new AdminDataError();
  }
  const total = count ?? 0;
  return {
    items: (data ?? []) as unknown as AdminLinkRow[],
    total,
    offset,
    limit,
    hasMore: offset + limit < total,
  };
}

/** Count-only query with the same filters, used when a page is past the end. */
async function countLinksForReview(query: { status?: RowStatus | 'all' }): Promise<number> {
  const db = await createClient();
  let request = db.from('evidence_links').select('id', { count: 'exact', head: true });
  if (query.status && query.status !== 'all') request = request.eq('status', query.status);
  const { count, error } = await request;
  if (error) throw new AdminDataError();
  return count ?? 0;
}

export type StatusCounts = Record<RowStatus, number>;

export async function getStatusCounts(): Promise<{ evidence: StatusCounts; links: StatusCounts }> {
  const db = await createClient();
  const countByStatus = async (table: 'evidence' | 'evidence_links', status: RowStatus) => {
    const { count, error } = await db
      .from(table)
      .select('id', { count: 'exact', head: true })
      .eq('status', status);
    if (error) throw new AdminDataError();
    return count ?? 0;
  };
  const [draft, reviewed, published, linkDraft, linkReviewed, linkPublished] = await Promise.all([
    countByStatus('evidence', 'draft'),
    countByStatus('evidence', 'reviewed'),
    countByStatus('evidence', 'published'),
    countByStatus('evidence_links', 'draft'),
    countByStatus('evidence_links', 'reviewed'),
    countByStatus('evidence_links', 'published'),
  ]);
  return {
    evidence: { draft, reviewed, published },
    links: { draft: linkDraft, reviewed: linkReviewed, published: linkPublished },
  };
}

/** Latest ingestion passes recorded by the CLI. */
export async function listRuns(limit = 20): Promise<IngestionRun[]> {
  const db = await createClient();
  const { data, error } = await db
    .from('ingestion_runs')
    .select('id,importer,started_at,finished_at,status,options,stats,error')
    .order('started_at', { ascending: false })
    .limit(Math.min(Math.max(limit, 1), 100));
  if (error) throw new AdminDataError();
  return (data ?? []) as unknown as IngestionRun[];
}
