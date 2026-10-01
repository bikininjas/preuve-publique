-- Analyse de groupes publiée sur chaque page officielle de scrutin du Sénat.
-- Un groupe parlementaire n'est pas un parti et ses effectifs ne sont pas
-- attribués à un parti sans affiliation individuelle datée et sourcée.
create table public.vote_group_coverage (
  vote_id uuid primary key references public.evidence(id) on delete cascade,
  official_pour integer not null check (official_pour >= 0),
  official_contre integer not null check (official_contre >= 0),
  official_abstention integer not null check (official_abstention >= 0),
  official_non_votant integer not null check (official_non_votant >= 0),
  page_sha256 text not null check (page_sha256 ~ '^[0-9a-f]{64}$'),
  processed_at timestamptz not null default now()
);

create table public.vote_group_tallies (
  vote_id uuid not null references public.vote_group_coverage(vote_id) on delete cascade,
  group_ref text not null check (group_ref ~ '^[A-Za-z0-9_-]{1,32}$'),
  group_name text not null check (length(group_name) between 1 and 200),
  members integer not null check (members >= 0),
  pour integer not null check (pour >= 0),
  contre integer not null check (contre >= 0),
  abstention integer not null check (abstention >= 0),
  non_votant integer not null check (non_votant >= 0),
  primary key (vote_id, group_ref),
  check (members = pour + contre + abstention + non_votant)
);
create index vote_group_tallies_group_idx on public.vote_group_tallies (group_ref, vote_id);

alter table public.vote_group_coverage enable row level security;
alter table public.vote_group_tallies enable row level security;
revoke all on public.vote_group_coverage, public.vote_group_tallies from anon, authenticated;
grant select on public.vote_group_coverage, public.vote_group_tallies to anon, authenticated;

create policy vote_group_coverage_read on public.vote_group_coverage
  for select to anon, authenticated using (
    exists (select 1 from public.evidence e where e.id = vote_id
      and e.status = 'published' and e.kind = 'vote' and e.institution = 'senat')
  );
create policy vote_group_tallies_read on public.vote_group_tallies
  for select to anon, authenticated using (
    exists (select 1 from public.evidence e where e.id = vote_id
      and e.status = 'published' and e.kind = 'vote' and e.institution = 'senat')
  );

create function public.vote_group_summary(_keywords text[])
returns table (group_ref text, group_name text, pour bigint, contre bigint,
  abstention bigint, non_votant bigint, scrutins bigint)
language sql stable security invoker
as $$
  select t.group_ref, t.group_name, sum(t.pour)::bigint, sum(t.contre)::bigint,
         sum(t.abstention)::bigint, sum(t.non_votant)::bigint, count(*)::bigint
  from public.evidence e join public.vote_group_tallies t on t.vote_id = e.id
  where cardinality(_keywords) between 1 and 80
    and e.status = 'published' and e.kind = 'vote' and e.institution = 'senat'
    and exists (select 1 from unnest(_keywords) as word(value)
      where e.title ilike '%' || word.value || '%')
  group by t.group_ref, t.group_name order by t.group_name
$$;

create function public.vote_group_scope(_keywords text[])
returns table (total_scrutins bigint, documented_scrutins bigint,
  recorded_positions bigint, first_date date, last_date date)
language sql stable security invoker
as $$
  with scope as (
    select e.id, e.occurred_at from public.evidence e
    where cardinality(_keywords) between 1 and 80
      and e.status = 'published' and e.kind = 'vote' and e.institution = 'senat'
      and exists (select 1 from unnest(_keywords) as word(value)
        where e.title ilike '%' || word.value || '%')
  )
  select count(*)::bigint, count(c.vote_id)::bigint,
    coalesce(sum(c.official_pour+c.official_contre+c.official_abstention+c.official_non_votant),0)::bigint,
    min(s.occurred_at), max(s.occurred_at)
  from scope s left join public.vote_group_coverage c on c.vote_id=s.id
$$;

create function public.vote_group_details(_group_ref text, _keywords text[],
  _limit integer default 15, _offset integer default 0)
returns table (vote_id uuid, group_name text, title text, occurred_at date,
  source_url text, pour integer, contre integer, abstention integer,
  non_votant integer, total_count bigint)
language sql stable security invoker
as $$
  select e.id, t.group_name, e.title, e.occurred_at, e.source_url,
    t.pour, t.contre, t.abstention, t.non_votant, count(*) over()::bigint
  from public.vote_group_tallies t join public.evidence e on e.id=t.vote_id
  where t.group_ref=_group_ref and cardinality(_keywords) between 0 and 80
    and (cardinality(_keywords)=0 or exists (
      select 1 from unnest(_keywords) as word(value)
      where e.title ilike '%' || word.value || '%'))
    and e.status='published' and e.kind='vote' and e.institution='senat'
  order by e.occurred_at desc, e.id desc
  limit least(greatest(_limit,1),50) offset greatest(_offset,0)
$$;

revoke execute on function public.vote_group_summary(text[]) from public;
revoke execute on function public.vote_group_scope(text[]) from public;
revoke execute on function public.vote_group_details(text,text[],integer,integer) from public;
grant execute on function public.vote_group_summary(text[]) to anon, authenticated;
grant execute on function public.vote_group_scope(text[]) to anon, authenticated;
grant execute on function public.vote_group_details(text,text[],integer,integer) to anon, authenticated;
