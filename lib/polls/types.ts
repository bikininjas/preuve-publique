export interface PollResult {
  candidate_external_id: string;
  candidate_name: string;
  party: string | null;
  score: number;
}

export interface PollScenario {
  round: 1 | 2;
  scenario_number: number;
  is_primary: boolean | null;
  scenario_sample_size: number | null;
  /** Stable roster, independent of the provider's local configuration number. */
  configuration_key: string;
  results: PollResult[];
}

export interface PollDocument {
  external_id: string;
  institute: string;
  fieldwork_start: string;
  fieldwork_end: string;
  sample_size: number | null;
  source_provider: string;
  source_url: string;
  source_origin: string;
  wikipedia_revision: string | null;
  scenarios: PollScenario[];
}

export interface PublishedPoll extends PollDocument {
  id: string;
  imported_at: string;
  updated_at: string;
  content_sha256: string;
  dataset_url: string;
  dataset_sha256: string;
  retrieved_at: string;
}

export interface PollQuery {
  institute: string | null;
  candidate: string | null;
  party: string | null;
  round: 1 | 2 | null;
  startDate: string | null;
  endDate: string | null;
  configuration: string | null;
  page: number;
  limit: number;
}

export interface PollPage {
  polls: PublishedPoll[];
  total: number;
  page: number;
  limit: number;
  lastSuccess: string | null;
}

export interface PollOptions {
  institutes: string[];
  parties: string[];
  candidates: { id: string; name: string }[];
  configurations: { key: string; round: 1 | 2; candidates: string[]; measurements: number }[];
  firstDate: string | null;
  lastDate: string | null;
  lastSuccess: string | null;
}
