-- 0008 : illustrations de dossier — deux colonnes, un bucket public, écriture admin
--
-- Une enquête se lit mieux avec une image d'illustration. Le fichier est déposé
-- depuis /admin dans le bucket public `illustrations` (lecture publique ; dépôt,
-- remplacement et suppression réservés aux comptes de `admin_users` via
-- `public.is_admin()`), et le dossier porte l'URL publique + la ligne de crédit
-- (auteur, licence, source). Les deux colonnes sont nullables : les dossiers
-- sans image gardent exactement l'état actuel.
--
-- Rejouable : `if not exists` / `drop policy if exists` avant chaque création.

alter table public.dossiers add column if not exists illustration_url text;
alter table public.dossiers add column if not exists illustration_credit text;

insert into storage.buckets (id, name, public)
values ('illustrations', 'illustrations', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "lecture publique des illustrations" on storage.objects;
create policy "lecture publique des illustrations"
  on storage.objects for select
  using (bucket_id = 'illustrations');

drop policy if exists "les administrateurs deposent les illustrations" on storage.objects;
create policy "les administrateurs deposent les illustrations"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'illustrations' and public.is_admin());

drop policy if exists "les administrateurs remplacent les illustrations" on storage.objects;
create policy "les administrateurs remplacent les illustrations"
  on storage.objects for update to authenticated
  using (bucket_id = 'illustrations' and public.is_admin())
  with check (bucket_id = 'illustrations' and public.is_admin());

drop policy if exists "les administrateurs suppriment les illustrations" on storage.objects;
create policy "les administrateurs suppriment les illustrations"
  on storage.objects for delete to authenticated
  using (bucket_id = 'illustrations' and public.is_admin());
