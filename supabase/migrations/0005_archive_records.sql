-- 0005 : fiches d'archive content-addressed + dépôt Storage pour les admins
--
-- Pourquoi une table en plus du bucket : le dépôt dans Supabase Storage exige
-- une clé de service ou une session authentifiée. La connexion privilégiée
-- (DB_PG_URL) dont dispose l'exploitation, elle, peut écrire des lignes. Une
-- fiche d'archive est un petit JSON (environ 2 Ko) : la conserver en base la
-- rend disponible immédiatement et vérifiable par n'importe qui, sans
-- dépendre d'un secret supplémentaire. Le bucket reste la cible du miroir,
-- et ses politiques sont posées ici pour que les administrateurs puissent y
-- déposer avec leur propre session.

create table public.dossier_source_archives (
  -- L'adresse d'une fiche est son empreinte : deux contenus différents ne
  -- peuvent pas se disputer la même ligne, et le contenu ne peut pas changer
  -- sans changer d'adresse.
  sha256 text primary key check (sha256 ~ '^[0-9a-f]{64}$'),
  source_id uuid not null references public.dossier_sources(id) on delete cascade,
  dossier_id uuid not null references public.dossiers(id) on delete cascade,
  schema text not null,
  content text not null,
  bytes integer not null check (bytes > 0),
  captured_at timestamptz not null,
  capture_kind text not null,
  created_at timestamptz not null default now(),
  -- Contrôle que la base elle-même peut refaire : le contenu déposé doit
  -- redonner l'empreinte annoncée.
  constraint dossier_source_archives_content_hashes
    check (encode(digest(content, 'sha256'), 'hex') = sha256)
);

create index idx_dossier_source_archives_source on public.dossier_source_archives(source_id);
create index idx_dossier_source_archives_dossier on public.dossier_source_archives(dossier_id);

alter table public.dossier_source_archives enable row level security;

-- Une fiche d'archive est une pièce publique : elle atteste ce que le site
-- publiait à une date donnée. Tout le monde peut la lire, personne ne peut la
-- modifier, et l'écriture passe par la connexion privilégiée hors du site.
create policy "lecture publique des fiches d archive"
  on public.dossier_source_archives for select
  using (true);

-- Miroir Storage : les administrateurs déposent et lisent avec leur session.
-- Aucune politique de mise à jour ni de suppression : une capture déposée ne
-- se réécrit pas.
create policy "les administrateurs deposent dans immutable-archives"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'immutable-archives' and public.is_admin());

create policy "les administrateurs lisent immutable-archives"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'immutable-archives' and public.is_admin());
