-- Feuilleter les scrutins exacts derrière une barre du graphique. Les lignes
-- demeurent filtrées par les politiques RLS des votes et des comptages.
create function public.vote_party_details(
  _party_id uuid, _keywords text[], _limit integer default 15, _offset integer default 0
)
returns table (
  vote_id uuid, party_name text, title text, occurred_at date, source_url text,
  pour integer, contre integer, abstention integer, non_votant integer,
  total_count bigint
)
language sql stable
as $$
  select e.id, party.name, e.title, e.occurred_at, e.source_url,
         t.pour, t.contre, t.abstention, t.non_votant,
         count(*) over()::bigint
  from public.vote_party_tallies t
  join public.evidence e on e.id = t.vote_id
  join public.actors party on party.id = t.party_id and party.kind = 'party'
  where t.party_id = _party_id
    and cardinality(_keywords) between 0 and 80
    and (cardinality(_keywords) = 0 or exists (
      select 1 from unnest(_keywords) as word(value)
      where e.title ilike '%' || word.value || '%'
    ))
    and e.status = 'published' and e.kind = 'vote' and e.institution = 'assemblee'
  order by e.occurred_at desc, e.id desc
  limit least(greatest(_limit, 1), 50)
  offset greatest(_offset, 0)
$$;

revoke execute on function public.vote_party_details(uuid,text[],integer,integer) from public;
grant execute on function public.vote_party_details(uuid,text[],integer,integer) to anon, authenticated;
