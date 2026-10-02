-- Source measurements, separate from parliamentary evidence and interpretations.
-- Applied independently of the web build. No privileged web credentials.
-- Filename aligned to the actual Supabase migration version after application.
create table public.polls (
  id uuid primary key default gen_random_uuid(),
  source_provider text not null check (length(btrim(source_provider)) > 0),
  external_id text not null check (length(btrim(external_id)) > 0),
  institute text not null check (length(btrim(institute)) > 0),
  fieldwork_start date not null,
  fieldwork_end date not null check (fieldwork_start <= fieldwork_end),
  sample_size integer check (sample_size > 0),
  election text not null default 'fr-presidential-2027' check (election = 'fr-presidential-2027'),
  source_url text not null check (source_url ~ '^https?://[^[:space:]]+$'),
  source_origin text not null,
  wikipedia_revision text check (wikipedia_revision ~ '^[0-9]+$'),
  dataset_url text not null,
  dataset_sha256 text not null check (dataset_sha256 ~ '^[a-f0-9]{64}$'),
  content_sha256 text not null check (content_sha256 ~ '^[a-f0-9]{64}$'),
  retrieved_at timestamptz not null,
  imported_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'draft' check (status in ('draft', 'published')),
  unique (source_provider, external_id)
);
create index polls_public_date on public.polls (fieldwork_end desc, id) where status = 'published';
create index polls_institute_date on public.polls (institute, fieldwork_end desc);

create table public.poll_scenarios (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls(id),
  round smallint not null check (round in (1, 2)),
  scenario_number integer not null check (scenario_number > 0),
  is_primary boolean,
  scenario_sample_size integer check (scenario_sample_size > 0),
  configuration_key text not null check (length(configuration_key) > 0),
  check ((round = 1 and is_primary is not null) or (round = 2 and is_primary is null)),
  unique (poll_id, round, scenario_number)
);
create index poll_scenarios_configuration on public.poll_scenarios (round, configuration_key);

create table public.poll_results (
  id uuid primary key default gen_random_uuid(),
  scenario_id uuid not null references public.poll_scenarios(id),
  candidate_external_id text not null check (length(btrim(candidate_external_id)) > 0),
  candidate_name text not null check (length(btrim(candidate_name)) > 0),
  party text,
  score numeric not null check (score >= 0 and score <= 100),
  unique (scenario_id, candidate_external_id)
);
create index poll_results_candidate on public.poll_results (candidate_external_id, scenario_id);
create index poll_results_party on public.poll_results (party, scenario_id);

-- Small, public health summary. Failures and detailed history use ingestion_runs.
create table public.poll_sync_state (
  source_provider text primary key,
  last_success_at timestamptz not null,
  dataset_url text not null,
  dataset_sha256 text not null check (dataset_sha256 ~ '^[a-f0-9]{64}$')
);
-- Exact normalized versions and dataset hashes; no full CSV/PDF in Postgres.
create table public.poll_revisions (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls(id),
  run_id uuid references public.ingestion_runs(id),
  content_sha256 text not null,
  content jsonb not null,
  dataset_url text not null,
  dataset_sha256 text not null,
  retrieved_at timestamptz not null,
  unique (poll_id, content_sha256)
);
create index poll_revisions_run on public.poll_revisions (run_id);

alter table public.polls enable row level security;
alter table public.poll_scenarios enable row level security;
alter table public.poll_results enable row level security;
alter table public.poll_sync_state enable row level security;
alter table public.poll_revisions enable row level security;
revoke all on public.polls, public.poll_scenarios, public.poll_results, public.poll_sync_state, public.poll_revisions from public, anon, authenticated;
grant select on public.polls, public.poll_scenarios, public.poll_results, public.poll_sync_state to anon, authenticated;
grant select on public.poll_revisions to authenticated;
create policy polls_public_read on public.polls for select to anon, authenticated using (status = 'published');
create policy scenarios_public_read on public.poll_scenarios for select to anon, authenticated
  using (exists (select 1 from public.polls p where p.id = poll_scenarios.poll_id and p.status = 'published'));
create policy results_public_read on public.poll_results for select to anon, authenticated
  using (exists (select 1 from public.poll_scenarios s join public.polls p on p.id = s.poll_id
    where s.id = poll_results.scenario_id and p.status = 'published'));
create policy sync_public_read on public.poll_sync_state for select to anon, authenticated
  using (exists (select 1 from public.polls p where p.source_provider = poll_sync_state.source_provider and p.status = 'published'));
create policy revisions_admin_read on public.poll_revisions for select to authenticated using (public.is_admin());

-- Candidate/party filters select configurations, but every returned configuration
-- contains its complete roster. Never make a filtered subset look like a poll.
create function public.poll_list(
  _institute text default null, _candidate text default null, _party text default null,
  _round integer default null, _start date default null, _end date default null,
  _configuration text default null, _limit integer default 20, _offset integer default 0
) returns jsonb language sql stable security invoker set search_path = '' as $$
  with matching_scenarios as (
    select s.* from public.poll_scenarios s join public.polls p on p.id = s.poll_id
    where p.status = 'published' and (_institute is null or p.institute = _institute)
      and (_start is null or p.fieldwork_end >= _start) and (_end is null or p.fieldwork_end <= _end)
      and (_round is null or s.round = _round)
      and (_configuration is null or s.configuration_key = _configuration)
      and ((_candidate is null and _party is null) or exists (
        select 1 from public.poll_results r where r.scenario_id = s.id
          and (_candidate is null or r.candidate_external_id = _candidate)
          and (_party is null or r.party = _party)))
  ), matching_polls as (
    select p.* from public.polls p where p.status = 'published' and exists (select 1 from matching_scenarios s where s.poll_id = p.id)
  ), paged as (
    select * from matching_polls order by fieldwork_end desc, id
    limit greatest(1, least(coalesce(_limit, 20), 100)) offset greatest(0, least(coalesce(_offset, 0), 1000000))
  )
  select jsonb_build_object('total', (select count(*) from matching_polls),
    'lastSuccess', (select max(last_success_at) from public.poll_sync_state),
    'polls', coalesce((select jsonb_agg(to_jsonb(p) || jsonb_build_object('scenarios', (
      select jsonb_agg(jsonb_build_object('round', s.round, 'scenario_number', s.scenario_number,
        'is_primary', s.is_primary, 'scenario_sample_size', s.scenario_sample_size, 'configuration_key', s.configuration_key,
        'results', (select jsonb_agg(jsonb_build_object('candidate_external_id', r.candidate_external_id,
          'candidate_name', r.candidate_name, 'party', r.party, 'score', r.score) order by r.candidate_external_id)
          from public.poll_results r where r.scenario_id = s.id)) order by s.round, s.scenario_number)
      from matching_scenarios s where s.poll_id = p.id)) order by p.fieldwork_end desc, p.id) from paged p), '[]'::jsonb))
$$;

create function public.poll_options() returns jsonb language sql stable security invoker set search_path = '' as $$
  select jsonb_build_object(
    'institutes', coalesce((select jsonb_agg(institute order by institute) from (select distinct institute from public.polls where status = 'published') i), '[]'::jsonb),
    'parties', coalesce((select jsonb_agg(party order by party) from (select distinct party from public.poll_results where party is not null) p), '[]'::jsonb),
    'candidates', coalesce((select jsonb_agg(jsonb_build_object('id', candidate_external_id, 'name', candidate_name) order by candidate_name)
      from (select candidate_external_id, max(candidate_name) as candidate_name from public.poll_results group by candidate_external_id) c), '[]'::jsonb),
    'configurations', coalesce((select jsonb_agg(jsonb_build_object('key', configuration_key, 'round', round, 'candidates', candidates, 'measurements', measurements) order by measurements desc, configuration_key)
      from (select s.configuration_key, s.round, count(*) as measurements,
        (select jsonb_agg(r.candidate_name order by r.candidate_external_id) from public.poll_results r where r.scenario_id = min(s.id::text)::uuid) as candidates
        from public.poll_scenarios s group by s.configuration_key, s.round) cfg), '[]'::jsonb),
    'firstDate', (select min(fieldwork_end) from public.polls where status = 'published'),
    'lastDate', (select max(fieldwork_end) from public.polls where status = 'published'),
    'lastSuccess', (select max(last_success_at) from public.poll_sync_state))
$$;
revoke execute on function public.poll_list(text,text,text,integer,date,date,text,integer,integer), public.poll_options() from public, anon, authenticated;
grant execute on function public.poll_list(text,text,text,integer,date,date,text,integer,integer), public.poll_options() to anon, authenticated;
