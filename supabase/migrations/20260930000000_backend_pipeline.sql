-- Backend pipeline migration: structured source facts, editorial review trace,
-- full-text search and ingestion run log.
--
-- Applied separately from the web build, after reading the current schema and
-- supabase_migrations history. Tested against PostgreSQL before any remote push.

-- 1. Structured facts copied from the source document (vote counts, outcome
--    codes, documentary references). Never editorial interpretation: each key
--    must be traceable to the source locator stored on the same row.
alter table public.evidence
  add column if not exists detail jsonb;

-- 2. Editorial review trace: who validated a piece and when. Publication
--    requires a human reviewer, so the name is stored for every transition.
alter table public.evidence
  add column if not exists reviewed_by text,
  add column if not exists reviewed_at timestamptz;

alter table public.evidence_links
  add column if not exists reviewed_by text,
  add column if not exists reviewed_at timestamptz;

-- 3. French full-text search over title and excerpt, for the browsing and
--    comparison interface. Generated, so it can never drift from the content.
alter table public.evidence
  add column if not exists search tsvector
  generated always as (
    to_tsvector('french'::regconfig, coalesce(title, '') || ' ' || coalesce(excerpt, ''))
  ) stored;

create index if not exists evidence_search_idx on public.evidence using gin (search);
create index if not exists evidence_kind_status_idx on public.evidence (kind, status, occurred_at desc);
create index if not exists evidence_institution_status_idx on public.evidence (institution, status, occurred_at desc);
create index if not exists evidence_source_idx on public.evidence (source_id);
create index if not exists evidence_links_to_idx on public.evidence_links (to_id);
create index if not exists actors_name_idx on public.actors (name);

-- 4. Ingestion run log: provenance for every import, volume and outcome stats,
--    resumability after an error. Private: no read or write policy for the
--    published API roles, only the trusted ingestion connection touches it.
create table if not exists public.ingestion_runs (
  id uuid primary key default gen_random_uuid(),
  importer text not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status text not null default 'running' check (status in ('running', 'ok', 'partial', 'error')),
  options jsonb not null default '{}'::jsonb,
  stats jsonb not null default '{}'::jsonb,
  error text
);

alter table public.ingestion_runs enable row level security;
revoke all on public.ingestion_runs from anon, authenticated;

create index if not exists ingestion_runs_importer_idx on public.ingestion_runs (importer, started_at desc);
