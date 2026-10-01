-- Plusieurs organes officiels de l'Assemblée portent le même libellé au fil des
-- législatures. Les réunir pour la navigation ne fusionne pas leurs identités :
-- chaque scrutin garde son identifiant d'organe et son décompte d'origine.

create function public.an_group_vote_scope(_actor_id uuid)
returns table (
  group_ref text, first_vote date, last_vote date, scrutins bigint,
  pour bigint, contre bigint, abstention bigint
)
language sql stable security invoker
as $$
  with family as (
    select member.external_id
    from public.actors seed
    join public.actors member on member.name = seed.name and member.kind = 'group'
    where seed.id = _actor_id and seed.kind = 'group'
      and member.external_id like 'an-organe:%'
  )
  select position.value ->> 'organe_ref', min(e.occurred_at), max(e.occurred_at),
    count(*)::bigint,
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
  group by position.value ->> 'organe_ref'
  order by min(e.occurred_at), position.value ->> 'organe_ref'
$$;

create function public.an_group_vote_page(
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
    join public.actors member on member.name = seed.name and member.kind = 'group'
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

revoke execute on function public.an_group_vote_scope(uuid) from public;
revoke execute on function public.an_group_vote_page(uuid,integer,integer) from public;
grant execute on function public.an_group_vote_scope(uuid) to anon, authenticated;
grant execute on function public.an_group_vote_page(uuid,integer,integer) to anon, authenticated;
