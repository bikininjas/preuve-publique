-- Regroupements de navigation éditoriaux, limités à des variantes de libellés
-- explicites du référentiel AN. Ils ne fusionnent ni les organes, ni les partis.
-- Chaque scrutin conserve sa référence d'organe et son décompte d'origine.

create function public.an_group_navigation_name(_name text)
returns text language sql immutable security invoker
as $$
  select case _name
    when 'Gauche Démocrate et Républicaine' then 'Gauche démocrate et républicaine'
    when 'Gauche démocrate et républicaine - NUPES' then 'Gauche démocrate et républicaine'
    when 'La France insoumise - Nouveau Front Populaire' then 'La France insoumise'
    when 'La France insoumise - Nouvelle Union Populaire écologique et sociale' then 'La France insoumise'
    when 'Socialistes et apparentés (membre de l’intergroupe NUPES)' then 'Socialistes et apparentés'
    when 'Mouvement Démocrate et apparentés' then 'Démocrates / MoDem'
    when 'Mouvement Démocrate (MoDem) et Démocrates apparentés' then 'Démocrates / MoDem'
    when 'Démocrate (MoDem et Indépendants)' then 'Démocrates / MoDem'
    when 'Les Démocrates' then 'Démocrates / MoDem'
    when 'Horizons et apparentés' then 'Horizons'
    when 'Horizons & Indépendants' then 'Horizons'
    when 'Écologiste - NUPES' then 'Écologistes (2022–2026)'
    when 'Écologiste et Social' then 'Écologistes (2022–2026)'
    when 'UDI et Indépendants' then 'UDI et alliés'
    when 'UDI, Agir et Indépendants' then 'UDI et alliés'
    when 'UDR' then 'Union des droites pour la République (UDR)'
    when 'Union des droites pour la République' then 'Union des droites pour la République (UDR)'
    else _name
  end
$$;

-- La liste agrège uniquement les groupes qui figurent dans un vote publié.
-- L'accès aux deux tables traversées reste soumis à leurs politiques RLS.
create function public.an_group_directory()
returns table (
  display_name text, actor_id uuid, official_names text[], identity_count bigint,
  vote_count bigint, pour bigint, contre bigint, abstention bigint,
  first_vote date, last_vote date
)
language sql stable security invoker
as $$
  with positions as (
    select e.id as vote_id, e.occurred_at,
      position.value ->> 'organe_ref' as group_ref,
      position.value ->> 'position_majoritaire' as majority
    from public.evidence e
    cross join lateral jsonb_array_elements(
      case when jsonb_typeof(e.detail -> 'groupes') = 'array'
        then e.detail -> 'groupes' else '[]'::jsonb end
    ) as position(value)
    where e.status = 'published' and e.kind = 'vote' and e.institution = 'assemblee'
  )
  select public.an_group_navigation_name(a.name), min(a.id::text)::uuid,
    array_agg(distinct a.name order by a.name), count(distinct a.id)::bigint,
    count(distinct p.vote_id)::bigint,
    count(distinct p.vote_id) filter (where p.majority = 'pour')::bigint,
    count(distinct p.vote_id) filter (where p.majority = 'contre')::bigint,
    count(distinct p.vote_id) filter (where p.majority = 'abstention')::bigint,
    min(p.occurred_at), max(p.occurred_at)
  from positions p
  join public.actors a on a.external_id = 'an-organe:' || p.group_ref
    and a.kind = 'group'
  group by public.an_group_navigation_name(a.name)
  order by max(p.occurred_at) desc, public.an_group_navigation_name(a.name)
$$;

-- La signature change pour exposer aussi l'intitulé officiel par identifiant.
drop function public.an_group_vote_scope(uuid);
create function public.an_group_vote_scope(_actor_id uuid)
returns table (
  group_ref text, group_name text, display_name text, first_vote date, last_vote date,
  scrutins bigint, pour bigint, contre bigint, abstention bigint
)
language sql stable security invoker
as $$
  with family as (
    select member.external_id, member.name
    from public.actors seed
    join public.actors member
      on public.an_group_navigation_name(member.name) = public.an_group_navigation_name(seed.name)
      and member.kind = 'group'
    where seed.id = _actor_id and seed.kind = 'group'
      and member.external_id like 'an-organe:%'
  )
  select position.value ->> 'organe_ref', family.name,
    public.an_group_navigation_name(family.name),
    min(e.occurred_at), max(e.occurred_at), count(*)::bigint,
    count(*) filter (where position.value ->> 'position_majoritaire' = 'pour')::bigint,
    count(*) filter (where position.value ->> 'position_majoritaire' = 'contre')::bigint,
    count(*) filter (where position.value ->> 'position_majoritaire' = 'abstention')::bigint
  from public.evidence e
  cross join lateral jsonb_array_elements(
    case when jsonb_typeof(e.detail -> 'groupes') = 'array'
      then e.detail -> 'groupes' else '[]'::jsonb end
  ) as position(value)
  join family on family.external_id = 'an-organe:' || (position.value ->> 'organe_ref')
  where e.status = 'published' and e.kind = 'vote' and e.institution = 'assemblee'
  group by position.value ->> 'organe_ref', family.name
  order by max(e.occurred_at) desc, position.value ->> 'organe_ref'
$$;

create or replace function public.an_group_vote_page(
  _actor_id uuid, _limit integer default 16, _offset integer default 0
)
returns table (
  vote_id uuid, title text, occurred_at date, source_url text, group_ref text,
  position_majoritaire text, pour integer, contre integer, abstentions integer,
  total_count bigint
)
language sql stable security invoker
as $$
  with family as (
    select member.external_id
    from public.actors seed
    join public.actors member
      on public.an_group_navigation_name(member.name) = public.an_group_navigation_name(seed.name)
      and member.kind = 'group'
    where seed.id = _actor_id and seed.kind = 'group'
      and member.external_id like 'an-organe:%'
  )
  select e.id, e.title, e.occurred_at, e.source_url,
    position.value ->> 'organe_ref', position.value ->> 'position_majoritaire',
    coalesce((position.value ->> 'pour')::integer, 0),
    coalesce((position.value ->> 'contre')::integer, 0),
    coalesce((position.value ->> 'abstentions')::integer, 0),
    count(*) over()::bigint
  from public.evidence e
  cross join lateral jsonb_array_elements(
    case when jsonb_typeof(e.detail -> 'groupes') = 'array'
      then e.detail -> 'groupes' else '[]'::jsonb end
  ) as position(value)
  join family on family.external_id = 'an-organe:' || (position.value ->> 'organe_ref')
  where e.status = 'published' and e.kind = 'vote' and e.institution = 'assemblee'
  order by e.occurred_at desc, e.id desc
  limit least(greatest(_limit, 1), 50) offset greatest(_offset, 0)
$$;

revoke execute on function public.an_group_navigation_name(text) from public;
revoke execute on function public.an_group_directory() from public;
revoke execute on function public.an_group_vote_scope(uuid) from public;
revoke execute on function public.an_group_vote_page(uuid,integer,integer) from public;
grant execute on function public.an_group_navigation_name(text) to anon, authenticated;
grant execute on function public.an_group_directory() to anon, authenticated;
grant execute on function public.an_group_vote_scope(uuid) to anon, authenticated;
grant execute on function public.an_group_vote_page(uuid,integer,integer) to anon, authenticated;
