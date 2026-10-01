-- Liens entre acteurs : « telle personne est membre de tel groupe », « telle
-- personne est affiliée à tel parti », « tel parti est membre de telle
-- coalition ». Faits institutionnels recopiés du référentiel de l'Assemblée
-- nationale (mandats datés), jamais une interprétation : un groupe n'« est »
-- pas un parti, et aucune position de vote n'est déduite d'une appartenance.
--
-- Visibilité : comme `sources` et `actors`, cette table n'a pas de statut de
-- relecture — elle suit celle de ses deux extrémités. Un acteur n'est public
-- qu'à travers une pièce publiée ; un lien n'est donc visible que si **les
-- deux** acteurs qu'il relie le sont. La règle est la même que pour
-- `evidence_links` (les deux bouts publiés), mais lue ici sur les acteurs.
--
-- Index : les deux sens de lecture (les membres d'un groupe, les groupes d'une
-- personne) et la chronologie sont les seules requêtes prévues.
--
-- Appliquée séparément du déploiement web, après lecture du schéma et de
-- `supabase_migrations`, puis vérifiée par requêtes ciblées.

create table if not exists public.actor_relations (
  id uuid primary key default gen_random_uuid(),
  from_actor_id uuid not null references public.actors(id),
  to_actor_id uuid not null references public.actors(id),
  relation text not null check (relation in ('member_of', 'affiliated_to', 'coalition_of')),
  started_at date not null,
  ended_at date,
  source_id uuid not null references public.sources(id),
  detail jsonb,
  check (from_actor_id <> to_actor_id),
  check (ended_at is null or ended_at >= started_at),
  -- Clé d'idempotence d'un import : un mandat rejoué ne crée pas de doublon.
  unique (from_actor_id, to_actor_id, relation, started_at)
);

create index if not exists actor_relations_from_idx on public.actor_relations (from_actor_id, started_at desc);
create index if not exists actor_relations_to_idx on public.actor_relations (to_actor_id, started_at desc);

alter table public.actor_relations enable row level security;
revoke all on public.actor_relations from anon, authenticated;
grant select on public.actor_relations to anon, authenticated;

-- Lecture publique : les deux acteurs reliés sont eux-mêmes publics (chacun
-- n'est lisible que par une pièce publiée qui le porte). Les colonnes sont
-- qualifiées explicitement : la migration de correction
-- `fix_reference_policies` a montré qu'un `id` non qualifié se résout vers la
-- table interne de la sous-requête et rend la table invisible.
drop policy if exists actor_relations_read on public.actor_relations;
create policy actor_relations_read on public.actor_relations
  for select to anon, authenticated
  using (
    exists (
      select 1 from public.evidence e
      where e.actor_id = public.actor_relations.from_actor_id and e.status = 'published'
    )
    and exists (
      select 1 from public.evidence e
      where e.actor_id = public.actor_relations.to_actor_id and e.status = 'published'
    )
  );
