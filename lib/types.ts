// Types mirroring supabase/migrations/20260929000000_initial.sql and
// 20260930000000_backend_pipeline.sql. Keep in sync with the SQL checks.

export type EvidenceKind = 'program' | 'statement' | 'amendment' | 'vote' | 'adopted_text' | 'indicator';
export type Institution = 'assemblee' | 'senat' | 'parlement_europeen' | 'legifrance';
export type RowStatus = 'draft' | 'reviewed' | 'published';
export type LinkRelation = 'related' | 'same_proposal' | 'legislative_outcome';
export type LinkMethod = 'deterministic' | 'llm' | 'human';

export const EVIDENCE_KINDS: readonly EvidenceKind[] = [
  'program', 'statement', 'amendment', 'vote', 'adopted_text', 'indicator',
];
export const INSTITUTIONS: readonly Institution[] = [
  'assemblee', 'senat', 'parlement_europeen', 'legifrance',
];
export const ROW_STATUSES: readonly RowStatus[] = ['draft', 'reviewed', 'published'];

/** A source document (one row per retrieved document or dataset snapshot). */
export interface Source {
  id: string;
  url: string;
  publisher: string;
  document_title: string;
  published_at: string | null;
  retrieved_at: string;
  sha256: string | null;
}

/** An actor: person, party, or parliamentary group. */
export interface Actor {
  id: string;
  name: string;
  kind: 'person' | 'party' | 'group';
  external_id: string | null;
}

/** One traceable piece: program, statement, amendment, vote, text, indicator. */
export interface Evidence {
  id: string;
  source_id: string;
  actor_id: string | null;
  title: string;
  excerpt: string | null;
  kind: EvidenceKind;
  institution: Institution | null;
  occurred_at: string;
  source_url: string;
  source_locator: string | null;
  external_id: string | null;
  status: RowStatus;
  detail: EvidenceDetail | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
}

/**
 * Structured facts copied from the source (vote counts, outcome codes,
 * documentary references). Never editorial interpretation.
 */
export interface EvidenceDetail {
  refs?: Array<{ type: string; value: string }>;
  [key: string]: unknown;
}

/** A documented link between two pieces. `related` states a documentary link only. */
export interface EvidenceLink {
  id: string;
  from_id: string;
  to_id: string;
  relation: LinkRelation;
  confidence: number;
  method: LinkMethod;
  rationale: string;
  status: RowStatus;
}

export interface EvidencePage {
  items: Evidence[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
}

/** One ingestion pass recorded in `ingestion_runs` (admin-only read). */
export interface IngestionRun {
  id: string;
  importer: string;
  started_at: string;
  finished_at: string | null;
  status: 'running' | 'ok' | 'partial' | 'error';
  options: Record<string, unknown>;
  stats: Record<string, unknown>;
  error: string | null;
}

export interface EvidenceItem {
  evidence: Evidence;
  source: Source | null;
  actor: Actor | null;
  links: Array<EvidenceLink & { related: Evidence }>;
}
