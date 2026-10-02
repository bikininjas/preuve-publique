-- Identités recoupées avec le référentiel officiel, sans déduire une candidature.
create table public.candidate_profiles (
  slug text primary key check (slug ~ '^[a-z0-9][a-z0-9-]*$'),
  provider text not null,
  candidate_external_id text not null,
  actor_id uuid not null references public.actors(id),
  name text not null check (length(btrim(name)) > 0),
  actor_external_id text not null,
  source_url text not null check (source_url ~ '^https://'),
  source_locator text not null,
  retrieved_at timestamptz not null,
  source_sha256 text not null check (source_sha256 ~ '^[a-f0-9]{64}$'),
  status text not null default 'draft' check (status in ('draft','reviewed','published')),
  unique(provider, candidate_external_id)
);
create index candidate_profiles_actor on public.candidate_profiles(actor_id);

-- Instantanés sourcés : PARPOL est un rattachement de financement, pas une adhésion.
create table public.candidate_connections (
  id uuid primary key default gen_random_uuid(),
  candidate_slug text not null references public.candidate_profiles(slug),
  actor_id uuid not null references public.actors(id),
  actor_name text not null,
  relation text not null check (relation in ('financial_attachment','parliamentary_group','party_member','electoral_support','coalition')),
  started_at date not null,
  ended_at date check (ended_at is null or ended_at >= started_at),
  source_url text not null check (source_url ~ '^https://'),
  source_locator text not null,
  retrieved_at timestamptz not null,
  source_sha256 text check (source_sha256 ~ '^[a-f0-9]{64}$'),
  status text not null default 'draft' check (status in ('draft','reviewed','published')),
  reviewed_by text,
  reviewed_at timestamptz,
  check (relation in ('financial_attachment','parliamentary_group') or status = 'draft' or (reviewed_by is not null and reviewed_at is not null)),
  unique(candidate_slug,actor_id,relation,started_at)
);
create index candidate_connections_period on public.candidate_connections(candidate_slug,started_at desc);

create table public.candidate_ballots (
  candidate_slug text not null references public.candidate_profiles(slug),
  vote_id uuid not null references public.evidence(id),
  position text not null check (position in ('pour','contre','abstention','non_votant')),
  archive_sha256 text not null check (archive_sha256 ~ '^[a-f0-9]{64}$'),
  retrieved_at timestamptz not null,
  primary key(candidate_slug,vote_id)
);
create index candidate_ballots_vote on public.candidate_ballots(vote_id);

-- Questions et descriptions du dispositif : publication exclusivement après revue.
create table public.policy_measures (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]*$'),
  subject text not null check (subject in ('sante','ecole','logement','retraites','securite-sociale','solidarite','enfance','budget','fiscalite','travail','entreprises','environnement','energie','transports','agriculture','immigration','police','justice','elections')),
  question text not null check (length(btrim(question)) > 0),
  description text not null check (length(btrim(description)) > 0),
  status text not null default 'draft' check (status in ('draft','reviewed','published')),
  reviewed_by text,
  reviewed_at timestamptz,
  check (status = 'draft' or (nullif(btrim(reviewed_by),'') is not null and reviewed_at is not null))
);
create index policy_measures_subject on public.policy_measures(subject,status);

create table public.policy_measure_evidence (
  id uuid primary key default gen_random_uuid(),
  measure_id uuid not null references public.policy_measures(id),
  evidence_id uuid not null references public.evidence(id),
  actor_id uuid references public.actors(id),
  role text not null check (role in ('program','statement','vote','context')),
  rationale text not null check (length(btrim(rationale)) > 0),
  confidence numeric check (confidence between 0 and 1),
  method text not null default 'human' check (method='human'),
  program_edition text,
  program_election text,
  program_published_at date,
  status text not null default 'draft' check (status in ('draft','reviewed','published')),
  reviewed_by text,
  reviewed_at timestamptz,
  check (role <> 'program' or (program_edition is not null and program_election is not null and program_published_at is not null)),
  check (status = 'draft' or (nullif(btrim(reviewed_by),'') is not null and reviewed_at is not null)),
  check (status = 'draft' or confidence is not null),
  unique(measure_id,evidence_id,role)
);
create index policy_measure_evidence_actor on public.policy_measure_evidence(actor_id,measure_id);

alter table public.candidate_profiles enable row level security;
alter table public.candidate_connections enable row level security;
alter table public.candidate_ballots enable row level security;
alter table public.policy_measures enable row level security;
alter table public.policy_measure_evidence enable row level security;
revoke all on public.candidate_profiles,public.candidate_connections,public.candidate_ballots,public.policy_measures,public.policy_measure_evidence from public,anon,authenticated;
grant select on public.candidate_profiles,public.candidate_connections,public.candidate_ballots,public.policy_measures,public.policy_measure_evidence to anon,authenticated;

create policy candidate_profiles_read on public.candidate_profiles for select to anon,authenticated using (status='published');
create policy candidate_connections_read on public.candidate_connections for select to anon,authenticated using (
  status='published' and exists(select 1 from public.candidate_profiles c where c.slug=candidate_connections.candidate_slug and c.status='published'));
create policy candidate_ballots_read on public.candidate_ballots for select to anon,authenticated using (
  exists(select 1 from public.candidate_profiles c where c.slug=candidate_ballots.candidate_slug and c.status='published')
  and exists(select 1 from public.evidence e where e.id=candidate_ballots.vote_id and e.status='published' and e.kind='vote')
  and exists(select 1 from public.vote_party_coverage v where v.vote_id=candidate_ballots.vote_id and v.archive_sha256=candidate_ballots.archive_sha256));
create policy policy_measures_read on public.policy_measures for select to anon,authenticated using (status='published');
create policy policy_measure_evidence_read on public.policy_measure_evidence for select to anon,authenticated using (
  status='published' and exists(select 1 from public.policy_measures m where m.id=policy_measure_evidence.measure_id and m.status='published')
  and exists(select 1 from public.evidence e where e.id=policy_measure_evidence.evidence_id and e.status='published'));

-- Revue limitée aux colonnes de statut, comme la revue documentaire existante.
grant update(status,reviewed_by,reviewed_at) on public.policy_measures,public.policy_measure_evidence,public.candidate_connections to authenticated;
create policy measures_admin_read on public.policy_measures for select to authenticated using ((select public.is_admin()));
create policy measure_evidence_admin_read on public.policy_measure_evidence for select to authenticated using ((select public.is_admin()));
create policy connections_admin_read on public.candidate_connections for select to authenticated using ((select public.is_admin()));
create policy measures_admin_update on public.policy_measures for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()) and (status='draft' or reviewed_by=lower(auth.jwt()->>'email')));
create policy measure_evidence_admin_update on public.policy_measure_evidence for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()) and (status='draft' or reviewed_by=lower(auth.jwt()->>'email')));
create policy connections_admin_update on public.candidate_connections for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()) and (status='draft' or reviewed_by=lower(auth.jwt()->>'email')));

create function public.check_policy_review() returns trigger language plpgsql security invoker set search_path=public,pg_temp as $$
begin
  if new.status <> old.status and not (
    (old.status='draft' and new.status='reviewed') or
    (old.status='reviewed' and new.status in ('draft','published')) or
    (old.status='published' and new.status='reviewed')) then
    raise exception 'Transition de revue interdite';
  end if;
  return new;
end $$;
revoke execute on function public.check_policy_review() from public,anon,authenticated;
create trigger measures_review before update on public.policy_measures for each row execute function public.check_policy_review();
create trigger measure_evidence_review before update on public.policy_measure_evidence for each row execute function public.check_policy_review();
create trigger connections_review before update on public.candidate_connections for each row execute function public.check_policy_review();

create function public.check_measure_source() returns trigger language plpgsql security invoker set search_path=public,pg_temp as $$
declare piece public.evidence;
begin
  select * into piece from public.evidence where id=new.evidence_id;
  if not found then raise exception 'Pièce inaccessible'; end if;
  if new.role in ('program','statement','vote') and piece.kind <> new.role then
    raise exception 'Le rôle ne correspond pas à la pièce';
  end if;
  if new.role in ('program','statement') and (new.actor_id is null or new.actor_id is distinct from piece.actor_id) then
    raise exception 'Auteur de la pièce non conforme';
  end if;
  if new.role='vote' and new.actor_id is not null then raise exception 'Le scrutin ne constitue pas une position individuelle'; end if;
  if new.status <> 'draft' and nullif(btrim(piece.source_locator),'') is null then raise exception 'Repère précis requis'; end if;
  return new;
end $$;
revoke execute on function public.check_measure_source() from public,anon,authenticated;
create trigger measure_source before insert or update on public.policy_measure_evidence for each row execute function public.check_measure_source();

-- La pagination choisit les mêmes scrutins pour tous les candidats comparés.
-- Une ligne absente n'est jamais transformée en abstention ou absence.
create function public.candidate_vote_comparison(_candidates text[],_keywords text[] default '{}',_limit int default 15,_offset int default 0)
returns jsonb language sql stable security invoker set search_path=public,pg_temp as $$
with selected as (select slug from public.candidate_profiles where status='published' and slug=any(_candidates) order by slug limit 3),
matching as (
  select e.id,e.title,e.occurred_at,e.source_url,e.source_locator,e.detail
  from public.evidence e where e.status='published' and e.kind='vote' and e.institution='assemblee'
  and exists(select 1 from public.candidate_ballots b where b.vote_id=e.id and b.candidate_slug in (select slug from selected))
  and (coalesce(cardinality(_keywords),0)=0 or exists(select 1 from unnest(_keywords) k where e.title ilike '%'||k||'%'))
), paged as (select * from matching order by occurred_at desc,id limit least(greatest(_limit,1),30) offset least(greatest(_offset,0),100000))
select jsonb_build_object('total',(select count(*) from matching),'votes',coalesce((select jsonb_agg(jsonb_build_object(
  'id',e.id,'title',e.title,'occurred_at',e.occurred_at,'source_url',e.source_url,'source_locator',e.source_locator,'detail',e.detail,
  'positions',(select jsonb_agg(jsonb_build_object('candidate',s.slug,'position',b.position,'archive_sha256',b.archive_sha256))
    from selected s left join public.candidate_ballots b on b.candidate_slug=s.slug and b.vote_id=e.id)
) order by e.occurred_at desc,e.id) from paged e),'[]'::jsonb))
$$;
revoke execute on function public.candidate_vote_comparison(text[],text[],int,int) from public,anon,authenticated;
grant execute on function public.candidate_vote_comparison(text[],text[],int,int) to anon,authenticated;
