-- Espace de relecture web : liste d'administration, lectures d'ensemble et
-- transitions de statut depuis le site, portées par une session Google.
--
-- Modèle de sécurité : l'écriture ne passe jamais par une clé privilégiée. Le
-- web n'a que la clé publishable ; les transitions de statut passent par
-- l'API en rôle `authenticated`, et ne sont permises que si l'adresse de la
-- session figure dans `admin_users` (adresse vérifiée par le fournisseur
-- Google). Le reste — imports, rattachements, corrigenda de masse — reste sur
-- la connexion directe DB_PG_URL.
--
-- Limite assumée : les revendications du jeton ne sont relues qu'au
-- rafraîchissement (durée de vie du jeton d'accès, 1 h par défaut côté
-- Supabase). Désactiver une adresse ferme donc l'accès au plus tard une heure
-- plus tard ; supprimer la ligne n'invalide pas un jeton déjà émis.
--
-- Pour autoriser d'autres personnes plus tard : insérer une ligne dans
-- `admin_users` (email en minuscules). D'autres moyens d'accès (rôles,
-- fournisseurs) viendront ensuite.
--
-- Appliquée séparément du déploiement web, après lecture du schéma et de
-- `supabase_migrations`. Vérifiée après exécution par des requêtes ciblées.

-- 1. Liste d'administration. Contenu géré par un opérateur (SQL) ; l'API ne
--    peut ni la lire en entier, ni la modifier.
create table if not exists public.admin_users (
  email text primary key check (email = lower(email)),
  active boolean not null default true,
  note text,
  created_at timestamptz not null default now()
);

insert into public.admin_users (email, note)
values ('sebpicot@gmail.com', 'Propriétaire du projet — première adresse autorisée')
on conflict (email) do nothing;

alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon, authenticated;
-- Chaque personne connectée ne peut lire que sa propre ligne : c'est ce que
-- vérifie la fonction d'autorisation ci-dessous, sans jamais exposer la liste.
grant select on public.admin_users to authenticated;

drop policy if exists admin_users_self_read on public.admin_users;
create policy admin_users_self_read on public.admin_users
  for select to authenticated
  using (email = lower(auth.jwt() ->> 'email'));

-- 2. La session courante est-elle administratrice ? Fonction inverseuse
--    (security invoker, le défaut) : elle s'exécute avec les droits de
--    l'appelant, la politique de lecture ci-dessus s'applique donc aussi à
--    l'intérieur.
create or replace function public.is_admin() returns boolean
language sql stable
as $$
  select exists (
    select 1 from public.admin_users a
    where a.email = lower(auth.jwt() ->> 'email') and a.active
  )
$$;

--    Le projet Supabase accorde EXECUTE aux rôles `anon` et `authenticated`
--    par défaut de privilèges à la création d'une fonction : ce n'est pas un
--    oubli de `revoke ... from public`, il faut retirer `anon` explicitement.
--    (Vérifié après application : has_function_privilege('anon', ...) = false.)
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- 3. Lectures d'administration : tous les statuts, en plus des politiques
--    publiques (les politiques permissives se cumulent).
drop policy if exists evidence_admin_read on public.evidence;
create policy evidence_admin_read on public.evidence
  for select to authenticated using (public.is_admin());

drop policy if exists links_admin_read on public.evidence_links;
create policy links_admin_read on public.evidence_links
  for select to authenticated using (public.is_admin());

drop policy if exists sources_admin_read on public.sources;
create policy sources_admin_read on public.sources
  for select to authenticated using (public.is_admin());

drop policy if exists actors_admin_read on public.actors;
create policy actors_admin_read on public.actors
  for select to authenticated using (public.is_admin());

grant select on public.ingestion_runs to authenticated;
drop policy if exists runs_admin_read on public.ingestion_runs;
create policy runs_admin_read on public.ingestion_runs
  for select to authenticated using (public.is_admin());

-- 4. Transitions de revue : les seules colonnes inscriptibles par l'API sont
--    le statut et sa trace de relecture. Le contenu des pièces reste écrit
--    par les importeurs sur la connexion directe.
grant update (status, reviewed_by, reviewed_at) on public.evidence to authenticated;
grant update (status, reviewed_by, reviewed_at) on public.evidence_links to authenticated;

--    Un statut hors brouillon exige un relecteur identifié : la même règle
--    que la CLI, garantie ici par la base et pas seulement par l'interface.
drop policy if exists evidence_admin_update on public.evidence;
create policy evidence_admin_update on public.evidence
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin() and (status = 'draft' or reviewed_by is not null));

drop policy if exists links_admin_update on public.evidence_links;
create policy links_admin_update on public.evidence_links
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin() and (status = 'draft' or reviewed_by is not null));
