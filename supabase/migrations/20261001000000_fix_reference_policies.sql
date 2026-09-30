-- Fix des politiques de lecture publiques de `sources` et `actors`.
--
-- La migration initiale écrivait `e.source_id = id` : dans la sous-requête,
-- PostgreSQL résolvait `id` vers la table interne (`evidence e`), produisant
-- `e.source_id = e.id` — vraie pour presque aucune ligne. Résultat : les
-- sources et les acteurs d'une pièce publiée restaient invisibles pour les
-- rôles `anon` et `authenticated`. La colonne externe est désormais qualifiée
-- explicitement. Vérifié par pg_get_expr(polqual) et par une lecture réelle
-- en rôle `anon` après application.

drop policy sources_read on public.sources;
create policy sources_read on public.sources for select to anon, authenticated
  using (exists (
    select 1 from public.evidence e
    where e.source_id = public.sources.id and e.status = 'published'
  ));

drop policy actors_read on public.actors;
create policy actors_read on public.actors for select to anon, authenticated
  using (exists (
    select 1 from public.evidence e
    where e.actor_id = public.actors.id and e.status = 'published'
  ));
