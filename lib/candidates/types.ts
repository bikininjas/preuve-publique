import type { Evidence,RowStatus } from '../types';

export interface CandidateIdentity { slug:string; name:string; actor_id:string|null }
export interface CandidateProfile extends CandidateIdentity {
  slug: string; provider: string; candidate_external_id: string; actor_id: string; name: string;
  actor_external_id: string; source_url: string; source_locator: string; retrieved_at: string; source_sha256: string;
}
export interface CandidateConnection {
  id: string; candidate_slug: string; actor_id: string; actor_name: string;
  relation: 'financial_attachment'|'parliamentary_group'|'party_member'|'electoral_support'|'coalition';
  started_at: string; ended_at: string|null; source_url: string; source_locator: string; retrieved_at: string;
}
export interface CandidateVote extends Pick<Evidence,'id'|'title'|'occurred_at'|'source_url'|'source_locator'|'detail'> {
  positions: { candidate: string; position: 'pour'|'contre'|'abstention'|'non_votant'|null; archive_sha256: string|null }[];
}
export interface PolicyMeasure {
  id: string; slug: string; subject: string; question: string; description: string;
  status: RowStatus; reviewed_by: string|null; reviewed_at: string|null;
}
export interface MeasureEvidence {
  id: string; measure_id: string; evidence_id: string; actor_id: string|null;
  role: 'program'|'statement'|'vote'|'context'; rationale: string;
  confidence:number|null; method:'human';
  program_edition: string|null; program_election: string|null; program_published_at: string|null;
  status: RowStatus; evidence: Evidence;
}
