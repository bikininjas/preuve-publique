-- Rubriques par pièce, comptage public par rubrique, et lecture publique des
-- groupes nommés par un vote publié.
--
-- 1. `topics` ne contient que des rubriques **publiées par la source**
--    (aujourd'hui : la colonne « Thèmes » des lois promulguées du Sénat, reprise
--    telle quelle) ou des rubriques héritées d'un dossier, l'origine étant alors
--    écrite dans `detail.topics_source`. Aucune rubrique n'est inventée par le
--    site, et aucune position politique n'en est déduite.
--
-- 2. Visibilité : la colonne suit la ligne (RLS inchangée) — une rubrique n'est
--    jamais lisible sur une pièce qui ne l'est pas. La fonction de comptage est
--    `security invoker` : les politiques s'appliquent à l'intérieur, un visiteur
--    anonyme ne compte donc que les pièces publiées.
--
-- 3. Un groupe parlementaire n'a de pièce à lui : ce qui le rend public, c'est
--    le vote publié qui publie sa position. La seconde politique rend donc
--    lisibles les seuls acteurs de nature `group` **nommés dans le détail d'une
--    pièce publiée** (`detail.groupes[].organe_ref`), sans quoi la fiche d'un
--    scrutin ne pourrait pas afficher « Rassemblement National » à côté de la
--    position que l'institution publie. Aucune autre donnée d'acteur n'est
--    ouverte par cette politique.

alter table public.evidence add column if not exists topics text[] not null default '{}';

create index if not exists evidence_topics_idx on public.evidence using gin (topics);

-- Index de l'appartenance d'un groupe à un scrutin publié (politique n° 3) :
-- le détail est cherché par contenance (`@>`), jamais par expression calculée.
create index if not exists evidence_groupes_idx on public.evidence using gin ((detail -> 'groupes'));

create or replace function public.published_topic_counts()
returns table (topic text, pieces bigint)
language sql
stable
as $$
  select t.topic, count(*)::bigint as pieces
  from public.evidence e
  cross join lateral unnest(e.topics) as t(topic)
  where e.status = 'published'
  group by t.topic
  order by count(*) desc, t.topic asc
$$;

-- Le projet Supabase accorde EXECUTE aux rôles `anon` et `authenticated` par
-- défaut : ici c'est voulu (comptage public), l'important est de le rendre
-- explicite et de le vérifier après application.
revoke execute on function public.published_topic_counts() from public;
grant execute on function public.published_topic_counts() to anon, authenticated;

drop policy if exists actors_read_named_in_published_vote on public.actors;
create policy actors_read_named_in_published_vote on public.actors
  for select to anon, authenticated
  using (
    kind = 'group'
    and exists (
      select 1
      from public.evidence e
      where e.status = 'published'
        and e.kind = 'vote'
        and e.institution = 'assemblee'
        and e.detail -> 'groupes' @> jsonb_build_array(
          jsonb_build_object('organe_ref', replace(public.actors.external_id, 'an-organe:', ''))
        )
    )
  );
