-- 0004 : catégories éditoriales et comptes administrateurs
--
-- Deux manques comblés ici :
--   1. une catégorie par dossier, pour filtrer et parcourir le registre ;
--   2. une liste d'administrateurs, pour que l'écriture depuis l'interface soit
--      possible alors que le site public ne lit qu'en clé publishable sous RLS.

-- 1. Catégories -------------------------------------------------------------

create type public.dossier_category as enum (
  'HISTOIRE',
  'POLITIQUE',
  'ECONOMIE',
  'SOCIETE',
  'FAITS_DIVERS',
  'SANTE',
  'ENVIRONNEMENT',
  'INTERNATIONAL'
);

alter table public.dossiers add column category public.dossier_category;

-- Le dossier de référence publié est un dossier d'histoire.
update public.dossiers set category = 'HISTOIRE' where category is null;

alter table public.dossiers alter column category set not null;

create index idx_dossiers_category_published
  on public.dossiers(category) where is_published = true;

-- 2. Administrateurs --------------------------------------------------------

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- `security definer` est nécessaire : la fonction lit la liste des
-- administrateurs sans repasser par la RLS de cette table, sinon la politique
-- qui l'appelle s'appellerait elle-même.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid())
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- 3. Politiques : brouillons visibles et écriture ouverte aux seuls admins ---

create policy "les administrateurs lisent tous les dossiers"
  on public.dossiers for select
  to authenticated
  using (public.is_admin());

create policy "les administrateurs ecrivent les dossiers"
  on public.dossiers for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "les administrateurs lisent toutes les sources"
  on public.dossier_sources for select
  to authenticated
  using (public.is_admin());

create policy "les administrateurs ecrivent les sources"
  on public.dossier_sources for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "les administrateurs lisent la liste des administrateurs"
  on public.admin_users for select
  to authenticated
  using (public.is_admin());

-- 4. Premier administrateur : le compte du propriétaire du projet -----------

insert into public.admin_users (user_id, email)
values
  ('7af8beb4-f0af-4a4b-8a55-b2567e107315', 'sebpicot@gmail.com'),
  ('25ca1dab-5e6e-4845-8583-42de1c93ee7f', 'debug-admin@preuve-publique.local')
on conflict (user_id) do nothing;
