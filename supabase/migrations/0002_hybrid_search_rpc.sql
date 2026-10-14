-- 0002_hybrid_search_rpc.sql
-- Recherche hybride : plein texte française (tsvector) + similarité cosinus
-- vectorielle (pgvector), fusionnées par Reciprocal Rank Fusion (RRF, k = 60).
--
-- La fonction est `security invoker` : elle s'exécute avec les droits de
-- l'appelant, donc sous RLS, et filtre de toute façon sur `is_published`. La
-- branche vectorielle ne ramène rien tant qu'aucun embedding n'est écrit — elle
-- ne fabrique aucune proximité : sans vecteur, seul le classement lexical
-- compte.

create or replace function public.search_dossiers_hybrid(
  query_text text,
  query_embedding extensions.vector(1536) default null,
  match_count int default 10
)
returns setof public.dossiers
language sql
stable
security invoker
as $$
  with full_text as (
    select
      id,
      row_number() over (
        order by ts_rank_cd(search_tsv, websearch_to_tsquery('french', query_text)) desc
      ) as rank_ix
    from public.dossiers
    where is_published = true
      and (
        search_tsv @@ websearch_to_tsquery('french', query_text)
        or claim_title ilike '%' || query_text || '%'
      )
    limit match_count * 2
  ),
  semantic as (
    select
      id,
      row_number() over (order by embedding <=> query_embedding) as rank_ix
    from public.dossiers
    where is_published = true
      and query_embedding is not null
      and embedding is not null
    limit match_count * 2
  )
  select d.*
  from full_text
  full outer join semantic on full_text.id = semantic.id
  join public.dossiers d on d.id = coalesce(full_text.id, semantic.id)
  order by
    coalesce(1.0 / (60 + full_text.rank_ix), 0.0) +
    coalesce(1.0 / (60 + semantic.rank_ix), 0.0) desc
  limit match_count;
$$;

comment on function public.search_dossiers_hybrid(text, extensions.vector, int) is
  'Recherche publique hybride (plein texte français + RRF vectoriel) sur les dossiers publiés. RLS appliqué (security invoker).';
