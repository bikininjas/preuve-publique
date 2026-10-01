-- Comptages de bulletins individuels publiés par l'Assemblée, rattachés à un
-- parti par une et une seule affiliation officielle active le jour du vote.
-- Aucun vote n'est déduit du groupe. Les archives sont contrôlées avant import.
-- Les quatre scrutins dont la liste nominative ne rejoint pas le décompte
-- officiel sont exclus. L'éventuel programme reste une pièce distincte.

create table public.vote_party_coverage (
  vote_id uuid primary key references public.evidence(id) on delete cascade,
  recorded_individuals integer not null check (recorded_individuals >= 0),
  unattributed_individuals integer not null check (unattributed_individuals >= 0),
  official_individuals integer not null check (official_individuals = recorded_individuals),
  archive_sha256 text not null check (archive_sha256 ~ '^[0-9a-f]{64}$'),
  method text not null default 'nominal_vote_and_dated_party_affiliation'
    check (method = 'nominal_vote_and_dated_party_affiliation'),
  processed_at timestamptz not null default now(),
  check (unattributed_individuals <= recorded_individuals)
);

create table public.vote_party_tallies (
  vote_id uuid not null references public.vote_party_coverage(vote_id) on delete cascade,
  party_id uuid not null references public.actors(id),
  pour integer not null default 0 check (pour >= 0),
  contre integer not null default 0 check (contre >= 0),
  abstention integer not null default 0 check (abstention >= 0),
  non_votant integer not null default 0 check (non_votant >= 0),
  primary key (vote_id, party_id),
  check (pour + contre + abstention + non_votant > 0)
);
create index vote_party_tallies_party_idx on public.vote_party_tallies (party_id, vote_id);

alter table public.vote_party_coverage enable row level security;
alter table public.vote_party_tallies enable row level security;
revoke all on public.vote_party_coverage, public.vote_party_tallies from anon, authenticated;
grant select on public.vote_party_coverage, public.vote_party_tallies to anon, authenticated;

create policy vote_party_coverage_read on public.vote_party_coverage
  for select to anon, authenticated using (
    exists (select 1 from public.evidence e
      where e.id = vote_id and e.status = 'published' and e.kind = 'vote')
  );
create policy vote_party_tallies_read on public.vote_party_tallies
  for select to anon, authenticated using (
    exists (select 1 from public.evidence e
      where e.id = vote_id and e.status = 'published' and e.kind = 'vote')
  );

-- Un parti est public lorsqu'un scrutin publié contient des bulletins
-- individuels qui lui sont rattachés par le référentiel daté.
create policy actors_read_named_in_published_party_vote on public.actors
  for select to anon, authenticated using (
    kind = 'party' and exists (
      select 1 from public.vote_party_tallies tally
      where tally.party_id = public.actors.id
    )
  );

-- Mots contrôlés fournis par l'interface : recherche dans le titre officiel,
-- pas classification du sens des mesures. Le RLS de toutes les tables s'applique
-- car les fonctions ne sont pas SECURITY DEFINER.
create function public.vote_party_summary(_keywords text[])
returns table (
  party_id uuid, party_name text, pour bigint, contre bigint,
  abstention bigint, non_votant bigint, scrutins bigint
)
language sql stable
as $$
  select party.id, party.name,
         sum(t.pour)::bigint, sum(t.contre)::bigint,
         sum(t.abstention)::bigint, sum(t.non_votant)::bigint,
         count(*)::bigint
  from public.evidence e
  join public.vote_party_tallies t on t.vote_id = e.id
  join public.actors party on party.id = t.party_id and party.kind = 'party'
  where cardinality(_keywords) between 1 and 80
    and e.status = 'published' and e.kind = 'vote' and e.institution = 'assemblee'
    and exists (select 1 from unnest(_keywords) as word(value)
                where e.title ilike '%' || word.value || '%')
  group by party.id, party.name
  order by party.name
$$;

create function public.vote_party_scope(_keywords text[])
returns table (
  total_scrutins bigint, documented_scrutins bigint,
  recorded_individuals bigint, unattributed_individuals bigint,
  first_date date, last_date date
)
language sql stable
as $$
  with scope as (
    select e.id, e.occurred_at from public.evidence e
    where cardinality(_keywords) between 1 and 80
      and e.status = 'published' and e.kind = 'vote' and e.institution = 'assemblee'
      and exists (select 1 from unnest(_keywords) as word(value)
                  where e.title ilike '%' || word.value || '%')
  )
  select count(*)::bigint, count(c.vote_id)::bigint,
         coalesce(sum(c.recorded_individuals), 0)::bigint,
         coalesce(sum(c.unattributed_individuals), 0)::bigint,
         min(s.occurred_at), max(s.occurred_at)
  from scope s left join public.vote_party_coverage c on c.vote_id = s.id
$$;

create function public.vote_party_for_scrutin(_vote_id uuid)
returns table (
  party_id uuid, party_name text, pour integer, contre integer,
  abstention integer, non_votant integer
)
language sql stable
as $$
  select party.id, party.name, t.pour, t.contre, t.abstention, t.non_votant
  from public.vote_party_tallies t
  join public.evidence e on e.id = t.vote_id
  join public.actors party on party.id = t.party_id and party.kind = 'party'
  where t.vote_id = _vote_id and e.status = 'published' and e.kind = 'vote'
  order by party.name
$$;

revoke execute on function public.vote_party_summary(text[]) from public;
revoke execute on function public.vote_party_scope(text[]) from public;
revoke execute on function public.vote_party_for_scrutin(uuid) from public;
grant execute on function public.vote_party_summary(text[]) to anon, authenticated;
grant execute on function public.vote_party_scope(text[]) to anon, authenticated;
grant execute on function public.vote_party_for_scrutin(uuid) to anon, authenticated;
