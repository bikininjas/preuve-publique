import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type {
  Actor, Evidence, EvidenceItem, EvidenceKind, EvidenceLink, EvidencePage,
  Institution, Source,
} from '@/lib/types';

/**
 * Server-side read access to published rows only. The publishable key is
 * subject to row level security, so every query here returns at most
 * `status = 'published'` rows and their admissible references.
 */

export class DataUnavailableError extends Error {
  constructor(message = 'Impossible de charger les données publiées.') {
    super(message);
    this.name = 'DataUnavailableError';
  }
}

const EVIDENCE_COLUMNS =
  'id,source_id,actor_id,title,excerpt,kind,institution,occurred_at,source_url,source_locator,external_id,status,detail,reviewed_by,reviewed_at';

function client(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export function isConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY);
}

export interface EvidenceQuery {
  kind?: EvidenceKind;
  institution?: Institution;
  actorId?: string;
  limit?: number;
  offset?: number;
}

/** Latest published pieces, newest first. Empty list when unconfigured. */
export async function getEvidence(query: EvidenceQuery = {}): Promise<Evidence[]> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  const db = createClient(url, key, { auth: { persistSession: false } });
  let request = db
    .from('evidence')
    .select(EVIDENCE_COLUMNS)
    .eq('status', 'published')
    .order('occurred_at', { ascending: false })
    .order('id', { ascending: true })
    .limit(Math.min(Math.max(query.limit ?? 12, 1), 100));
  if (query.kind) request = request.eq('kind', query.kind);
  if (query.institution) request = request.eq('institution', query.institution);
  if (query.actorId) request = request.eq('actor_id', query.actorId);
  if (query.offset) request = request.range(query.offset, query.offset + Math.min(Math.max(query.limit ?? 12, 1), 100) - 1);
  const { data, error } = await request;
  if (error) throw new DataUnavailableError();
  return (data ?? []) as unknown as Evidence[];
}

/** One page of published pieces plus the total count, for paginated browsing. */
export async function getEvidencePage(query: EvidenceQuery = {}): Promise<EvidencePage> {
  const limit = Math.min(Math.max(query.limit ?? 20, 1), 100);
  const offset = Math.max(query.offset ?? 0, 0);
  const db = client();
  if (!db) return { items: [], total: 0, offset, limit, hasMore: false };
  let request = db
    .from('evidence')
    .select(EVIDENCE_COLUMNS, { count: 'exact' })
    .eq('status', 'published')
    .order('occurred_at', { ascending: false })
    .order('id', { ascending: true })
    .range(offset, offset + limit - 1);
  if (query.kind) request = request.eq('kind', query.kind);
  if (query.institution) request = request.eq('institution', query.institution);
  if (query.actorId) request = request.eq('actor_id', query.actorId);
  const { data, error, count } = await request;
  if (error) throw new DataUnavailableError();
  const total = count ?? 0;
  return {
    items: (data ?? []) as unknown as Evidence[],
    total,
    offset,
    limit,
    hasMore: offset + limit < total,
  };
}

/** French full-text search over published titles and excerpts. */
export async function searchEvidence(terms: string, limit = 20): Promise<Evidence[]> {
  const clean = terms.trim();
  if (!clean) return [];
  const db = client();
  if (!db) return [];
  const { data, error } = await db
    .from('evidence')
    .select(EVIDENCE_COLUMNS)
    .eq('status', 'published')
    .textSearch('search', clean, { config: 'french', type: 'websearch' })
    .order('occurred_at', { ascending: false })
    .limit(Math.min(Math.max(limit, 1), 100));
  if (error) throw new DataUnavailableError();
  return (data ?? []) as unknown as Evidence[];
}

/** One published piece with its source, actor, and documented links. */
export async function getEvidenceItem(id: string): Promise<EvidenceItem | null> {
  const db = client();
  if (!db) return null;
  const { data, error } = await db
    .from('evidence')
    .select(EVIDENCE_COLUMNS)
    .eq('status', 'published')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new DataUnavailableError();
  if (!data) return null;
  const evidence = data as unknown as Evidence;
  const [source, actor, links] = await Promise.all([
    getSource(evidence.source_id),
    evidence.actor_id ? getActor(evidence.actor_id) : Promise.resolve(null),
    getLinksFor(evidence.id),
  ]);
  return { evidence, source, actor, links };
}

export async function getSource(id: string): Promise<Source | null> {
  const db = client();
  if (!db) return null;
  const { data, error } = await db
    .from('sources')
    .select('id,url,publisher,document_title,published_at,retrieved_at,sha256')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new DataUnavailableError();
  return (data as unknown as Source) ?? null;
}

export async function getActor(id: string): Promise<Actor | null> {
  const db = client();
  if (!db) return null;
  const { data, error } = await db
    .from('actors')
    .select('id,name,kind,external_id')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new DataUnavailableError();
  return (data as unknown as Actor) ?? null;
}

/**
 * Published links touching one piece, with the related piece on the other
 * side. Direction is preserved: the caller can tell which piece is `from`.
 */
export async function getLinksFor(id: string): Promise<EvidenceItem['links']> {
  const db = client();
  if (!db) return [];
  const { data, error } = await db
    .from('evidence_links')
    .select('id,from_id,to_id,relation,confidence,method,rationale,status')
    .eq('status', 'published')
    .or(`from_id.eq.${id},to_id.eq.${id}`);
  if (error) throw new DataUnavailableError();
  const links = (data ?? []) as unknown as EvidenceLink[];
  if (!links.length) return [];
  const otherIds = [...new Set(links.map((l) => (l.from_id === id ? l.to_id : l.from_id)))];
  const { data: others, error: othersError } = await db
    .from('evidence')
    .select(EVIDENCE_COLUMNS)
    .eq('status', 'published')
    .in('id', otherIds);
  if (othersError) throw new DataUnavailableError();
  const byId = new Map(((others ?? []) as unknown as Evidence[]).map((e) => [e.id, e]));
  return links
    .map((l) => ({ ...l, related: byId.get(l.from_id === id ? l.to_id : l.from_id) }))
    .filter((l): l is EvidenceLink & { related: Evidence } => Boolean(l.related));
}

/** Declared actors, for actor-centred browsing. Published context only. */
export async function getActors(kind?: Actor['kind']): Promise<Actor[]> {
  const db = client();
  if (!db) return [];
  let request = db.from('actors').select('id,name,kind,external_id').order('name', { ascending: true }).limit(200);
  if (kind) request = request.eq('kind', kind);
  const { data, error } = await request;
  if (error) throw new DataUnavailableError();
  return (data ?? []) as unknown as Actor[];
}
