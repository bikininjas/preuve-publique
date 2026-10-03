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

/**
 * PostgREST answers 416 (code PGRST103) when a page starts past the last row.
 * That is not a failure: the requested page is simply empty, and the caller
 * recovers the real total with a count-only query.
 */
export function isRangeNotSatisfiable(error: unknown): boolean {
  return typeof error === 'object' && error !== null && (error as { code?: string }).code === 'PGRST103';
}

const EVIDENCE_COLUMNS =
  'id,source_id,actor_id,title,excerpt,kind,institution,occurred_at,source_url,source_locator,external_id,status,detail,topics,reviewed_by,reviewed_at,publication_confidence,publication_method,publication_checks';

function client(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export function isConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY);
}

export interface PartyVoteRow {
  party_id: string;
  party_name: string;
  pour: number;
  contre: number;
  abstention: number;
  non_votant: number;
  scrutins: number;
}

export interface PartyVoteScope {
  total_scrutins: number;
  documented_scrutins: number;
  recorded_individuals: number;
  unattributed_individuals: number;
  first_date: string | null;
  last_date: string | null;
}

export interface PartyVoteDashboard {
  scope: PartyVoteScope;
  parties: PartyVoteRow[];
}

export interface PartyVoteCoverage {
  recorded_individuals: number;
  unattributed_individuals: number;
}

export interface GroupVoteRow {
  group_ref: string;
  group_name: string;
  pour: number;
  contre: number;
  abstention: number;
  non_votant: number;
  scrutins: number;
}

export interface GroupVoteScope {
  total_scrutins: number;
  documented_scrutins: number;
  recorded_positions: number;
  first_date: string | null;
  last_date: string | null;
}

export interface GroupVoteDashboard {
  scope: GroupVoteScope;
  groups: GroupVoteRow[];
}

export interface GroupVoteCoverage {
  page_sha256: string;
  processed_at: string;
}

export async function getGroupVoteCoverageForScrutin(id: string): Promise<GroupVoteCoverage | null> {
  const db = client();
  if (!db) throw new DataUnavailableError();
  const { data, error } = await db.from('vote_group_coverage')
    .select('page_sha256,processed_at').eq('vote_id', id).maybeSingle();
  if (error) throw new DataUnavailableError();
  return data as GroupVoteCoverage | null;
}

/** Counts copied from the Sénat's official analysis by parliamentary group. */
export async function getGroupVoteDashboard(keywords: string[]): Promise<GroupVoteDashboard> {
  const db = client();
  if (!db) throw new DataUnavailableError();
  const [summary, coverage] = await Promise.all([
    db.rpc('vote_group_summary', { _keywords: keywords }),
    db.rpc('vote_group_scope', { _keywords: keywords }),
  ]);
  if (summary.error || coverage.error || !coverage.data?.[0]) throw new DataUnavailableError();
  const scope = coverage.data[0] as GroupVoteScope;
  return {
    scope: {
      ...scope,
      total_scrutins: Number(scope.total_scrutins),
      documented_scrutins: Number(scope.documented_scrutins),
      recorded_positions: Number(scope.recorded_positions),
    },
    groups: ((summary.data ?? []) as GroupVoteRow[]).map((row) => ({
      ...row, pour: Number(row.pour), contre: Number(row.contre),
      abstention: Number(row.abstention), non_votant: Number(row.non_votant),
      scrutins: Number(row.scrutins),
    })),
  };
}

export async function getGroupVotesForScrutin(id: string): Promise<GroupVoteRow[]> {
  const db = client();
  if (!db) throw new DataUnavailableError();
  const { data, error } = await db.from('vote_group_tallies')
    .select('group_ref,group_name,pour,contre,abstention,non_votant')
    .eq('vote_id', id);
  if (error) throw new DataUnavailableError();
  return ((data ?? []) as GroupVoteRow[]).map((row) => ({
    ...row, pour: Number(row.pour), contre: Number(row.contre),
    abstention: Number(row.abstention), non_votant: Number(row.non_votant), scrutins: 1,
  }));
}

export interface GroupVoteDetail {
  vote_id: string;
  group_name: string;
  title: string;
  occurred_at: string;
  source_url: string;
  pour: number;
  contre: number;
  abstention: number;
  non_votant: number;
  total_count: number;
}

export async function getGroupVoteDetails(groupRef: string, keywords: string[], page: number, limit = 15): Promise<GroupVoteDetail[]> {
  const db = client();
  if (!db) throw new DataUnavailableError();
  const { data, error } = await db.rpc('vote_group_details', {
    _group_ref: groupRef, _keywords: keywords, _limit: limit, _offset: (page - 1) * limit,
  });
  if (error) throw new DataUnavailableError();
  return ((data ?? []) as GroupVoteDetail[]).map((row) => ({
    ...row, pour: Number(row.pour), contre: Number(row.contre),
    abstention: Number(row.abstention), non_votant: Number(row.non_votant),
    total_count: Number(row.total_count),
  }));
}

/** Vote counts from individual AN ballots with one dated, sourced party link. */
export async function getPartyVoteDashboard(keywords: string[]): Promise<PartyVoteDashboard> {
  const db = client();
  if (!db) throw new DataUnavailableError();
  const [summary, coverage] = await Promise.all([
    db.rpc('vote_party_summary', { _keywords: keywords }),
    db.rpc('vote_party_scope', { _keywords: keywords }),
  ]);
  if (summary.error || coverage.error || !coverage.data?.[0]) throw new DataUnavailableError();
  const scope = coverage.data[0] as PartyVoteScope;
  return {
    scope: {
      ...scope,
      total_scrutins: Number(scope.total_scrutins),
      documented_scrutins: Number(scope.documented_scrutins),
      recorded_individuals: Number(scope.recorded_individuals),
      unattributed_individuals: Number(scope.unattributed_individuals),
    },
    parties: ((summary.data ?? []) as PartyVoteRow[]).map((row) => ({
      ...row,
      pour: Number(row.pour), contre: Number(row.contre),
      abstention: Number(row.abstention), non_votant: Number(row.non_votant),
      scrutins: Number(row.scrutins),
    })),
  };
}

export async function getPartyVotesForScrutin(id: string): Promise<PartyVoteRow[]> {
  const db = client();
  if (!db) throw new DataUnavailableError();
  const { data, error } = await db.rpc('vote_party_for_scrutin', { _vote_id: id });
  if (error) throw new DataUnavailableError();
  return ((data ?? []) as PartyVoteRow[]).map((row) => ({
    ...row,
    pour: Number(row.pour), contre: Number(row.contre),
    abstention: Number(row.abstention), non_votant: Number(row.non_votant),
    scrutins: 1,
  }));
}

export async function getPartyVoteCoverageForScrutin(id: string): Promise<PartyVoteCoverage | null> {
  const db = client();
  if (!db) throw new DataUnavailableError();
  const { data, error } = await db.from('vote_party_coverage')
    .select('recorded_individuals,unattributed_individuals')
    .eq('vote_id', id).maybeSingle();
  if (error) throw new DataUnavailableError();
  return data as PartyVoteCoverage | null;
}

export interface PartyVoteDetail {
  vote_id: string;
  party_name: string;
  title: string;
  occurred_at: string;
  source_url: string;
  pour: number;
  contre: number;
  abstention: number;
  non_votant: number;
  total_count: number;
}

export async function getPartyVoteDetails(partyId: string, keywords: string[], page: number, limit = 15): Promise<PartyVoteDetail[]> {
  const db = client();
  if (!db) throw new DataUnavailableError();
  const { data, error } = await db.rpc('vote_party_details', {
    _party_id: partyId, _keywords: keywords, _limit: limit, _offset: (page - 1) * limit,
  });
  if (error) throw new DataUnavailableError();
  return ((data ?? []) as PartyVoteDetail[]).map((row) => ({
    ...row,
    pour: Number(row.pour), contre: Number(row.contre),
    abstention: Number(row.abstention), non_votant: Number(row.non_votant),
    total_count: Number(row.total_count),
  }));
}

export interface EvidenceQuery {
  kind?: EvidenceKind;
  institution?: Institution;
  actorId?: string;
  /** Rubrique publiée par la source (Sénat aujourd'hui) : filtre exact. */
  topic?: string;
  /** French full-text terms, matched against title and excerpt. */
  terms?: string;
  /** Controlled lexical navigation on the institutional title only. */
  titleFilter?: string;
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
    .order('id', { ascending: false })
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
    .order('id', { ascending: false })
    .range(offset, offset + limit - 1);
  if (query.kind) request = request.eq('kind', query.kind);
  if (query.institution) request = request.eq('institution', query.institution);
  if (query.actorId) request = request.eq('actor_id', query.actorId);
  if (query.topic) request = request.contains('topics', [query.topic]);
  if (query.titleFilter) request = request.or(query.titleFilter);
  if (query.terms?.trim()) {
    request = request.textSearch('search', query.terms.trim(), { config: 'french', type: 'websearch' });
  }
  const { data, error, count } = await request;
  if (error) {
    if (isRangeNotSatisfiable(error)) {
      const total = await countPublished(query);
      return { items: [], total, offset, limit, hasMore: false };
    }
    throw new DataUnavailableError();
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
async function countPublished(query: EvidenceQuery): Promise<number> {
  const db = client();
  if (!db) return 0;
  let request = db.from('evidence').select('id', { count: 'exact', head: true }).eq('status', 'published');
  if (query.kind) request = request.eq('kind', query.kind);
  if (query.institution) request = request.eq('institution', query.institution);
  if (query.actorId) request = request.eq('actor_id', query.actorId);
  if (query.topic) request = request.contains('topics', [query.topic]);
  if (query.titleFilter) request = request.or(query.titleFilter);
  if (query.terms?.trim()) {
    request = request.textSearch('search', query.terms.trim(), { config: 'french', type: 'websearch' });
  }
  const { count, error } = await request;
  if (error) throw new DataUnavailableError();
  return count ?? 0;
}

/**
 * Index léger des pièces publiées (identifiant et date du document), destiné
 * au sitemap. Deux colonnes suffisent : un plan de site n'a pas besoin du
 * contenu. L'avancement se fait par plages successives, en suivant le total
 * annoncé par PostgREST, même si la réponse est plafonnée en nombre de lignes.
 */
export async function getPublishedPieceIndex(): Promise<Array<{ id: string; occurred_at: string }>> {
  const db = client();
  if (!db) return [];
  const rows: Array<{ id: string; occurred_at: string }> = [];
  const PAGE = 1000;
  let expected: number | null = null;
  let batch: Array<{ id: string; occurred_at: string }> = [];
  do {
    const { data, error, count } = await db
      .from('evidence')
      .select('id,occurred_at', { count: 'exact' })
      .eq('status', 'published')
      .order('occurred_at', { ascending: false })
      .order('id', { ascending: false })
      .range(rows.length, rows.length + PAGE - 1);
    if (error) {
      if (isRangeNotSatisfiable(error)) break;
      throw new DataUnavailableError();
    }
    if (typeof count === 'number') expected = count;
    batch = (data ?? []) as unknown as Array<{ id: string; occurred_at: string }>;
    rows.push(...batch);
  } while (batch.length > 0 && (expected === null || rows.length < expected));
  return rows;
}

/**
 * Comptage public par rubrique, calculé par la base en rôle appelant : seul ce
 * qui est publié est compté, et une rubrique n'apparaît que si elle est portée
 * par au moins une pièce publiée.
 */
export async function getTopicCounts(): Promise<Array<{ topic: string; pieces: number }>> {
  const db = client();
  if (!db) return [];
  const { data, error } = await db.rpc('published_topic_counts');
  if (error) throw new DataUnavailableError();
  return ((data ?? []) as Array<{ topic: string; pieces: number }>).map((row) => ({
    topic: row.topic,
    pieces: Number(row.pieces),
  }));
}

/**
 * Noms des acteurs référencés par le détail d'une pièce (les groupes d'un
 * scrutin, par exemple). La politique de lecture limite ces lignes à ce que le
 * public peut déjà voir.
 */
export async function getActorNames(externalIds: string[]): Promise<Map<string, string>> {
  const names = new Map<string, string>();
  const db = client();
  const ids = [...new Set(externalIds.filter(Boolean))];
  if (!db || !ids.length) return names;
  const { data, error } = await db.from('actors').select('external_id,name').in('external_id', ids);
  if (error) throw new DataUnavailableError();
  for (const row of (data ?? []) as Array<{ external_id: string | null; name: string }>) {
    if (row.external_id) names.set(row.external_id, row.name);
  }
  return names;
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

/** One official AN group identifier behind a shared display name. */
export interface GroupActorScope {
  group_ref: string;
  group_name: string;
  display_name: string;
  first_vote: string;
  last_vote: string;
  scrutins: number;
  pour: number;
  contre: number;
  abstention: number;
}

/** Navigation families over published AN votes. Official labels stay separate. */
export interface GroupDirectoryEntry {
  display_name: string;
  actor_id: string;
  official_names: string[];
  identity_count: number;
  vote_count: number;
  pour: number;
  contre: number;
  abstention: number;
  first_vote: string;
  last_vote: string;
}

export async function getGroupDirectory(): Promise<GroupDirectoryEntry[]> {
  const db = client();
  if (!db) return [];
  const { data, error } = await db.rpc('an_group_directory');
  if (error) throw new DataUnavailableError();
  return ((data ?? []) as GroupDirectoryEntry[]).map((row) => ({
    ...row, identity_count: Number(row.identity_count), vote_count: Number(row.vote_count),
    pour: Number(row.pour), contre: Number(row.contre), abstention: Number(row.abstention),
  }));
}

/** One published scrutin; its group reference is preserved when names repeat. */
export interface GroupActorVote {
  vote_id: string;
  title: string;
  occurred_at: string;
  source_url: string;
  group_ref: string;
  position_majoritaire: string | null;
  pour: number;
  contre: number;
  abstentions: number;
  total_count: number;
}

export async function getGroupActorScope(actorId: string): Promise<GroupActorScope[]> {
  const db = client();
  if (!db) throw new DataUnavailableError();
  const { data, error } = await db.rpc('an_group_vote_scope', { _actor_id: actorId });
  if (error) throw new DataUnavailableError();
  return ((data ?? []) as GroupActorScope[]).map((row) => ({
    ...row, scrutins: Number(row.scrutins), pour: Number(row.pour),
    contre: Number(row.contre), abstention: Number(row.abstention),
  }));
}

export async function getGroupActorVotes(actorId: string, page: number, limit = 16): Promise<GroupActorVote[]> {
  const db = client();
  if (!db) throw new DataUnavailableError();
  const { data, error } = await db.rpc('an_group_vote_page', {
    _actor_id: actorId, _limit: limit, _offset: (page - 1) * limit,
  });
  if (error) throw new DataUnavailableError();
  return ((data ?? []) as GroupActorVote[]).map((row) => ({
    ...row, pour: Number(row.pour), contre: Number(row.contre),
    abstentions: Number(row.abstentions), total_count: Number(row.total_count),
  }));
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
