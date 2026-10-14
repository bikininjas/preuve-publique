-- 0003_proof_integrity.sql
-- Intégrité des preuves : distinguer l'empreinte de la citation (dérivable par
-- un tiers à partir des champs publiés) de l'empreinte du fichier de capture
-- archivée (qui n'existe que si une capture a été déposée).
--
-- `archive_sha256` était présenté comme l'empreinte d'une capture : c'était faux
-- tant qu'aucun archivage n'existait. Il porte désormais l'empreinte canonique
-- de la citation — celle que `/api/verify/<sha256>` invite à recalculer.

alter table public.dossier_sources
  add column if not exists archive_binary_sha256 text
  check (archive_binary_sha256 is null or archive_binary_sha256 ~ '^[0-9a-f]{64}$');

create index if not exists idx_dossier_sources_archive_sha256
  on public.dossier_sources(archive_sha256)
  where archive_sha256 is not null;

create index if not exists idx_dossier_sources_archive_binary_sha256
  on public.dossier_sources(archive_binary_sha256)
  where archive_binary_sha256 is not null;

comment on column public.dossier_sources.archive_sha256 is
  'Empreinte SHA-256 de la citation publiée : sha256(source_name|author_or_institution|publication_date|exact_quote), chaînes en NFC et espaces retirés. Recalculable par n''importe qui ; identité publique de la preuve.';

comment on column public.dossier_sources.archive_binary_sha256 is
  'Empreinte SHA-256 du fichier de capture archivée (bucket immutable-archives), quand une capture a été déposée.';

comment on column public.dossier_sources.archive_storage_path is
  'Chemin de la capture dans le bucket immutable-archives. NULL signifie « pas de capture », jamais « capture perdue ».';
