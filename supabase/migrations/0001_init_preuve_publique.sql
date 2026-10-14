-- 0001_init_preuve_publique.sql
-- Modèle initial du site de fact-checking par triangulation.
--
-- Deux écarts assumés par rapport au schéma d'origine, tous deux imposés par la
-- règle de provenance du projet :
--   1. `archive_sha256` est NULLABLE. Une empreinte n'existe que si une capture
--      a réellement été archivée et hachée. Mettre une empreinte inventée sur
--      une imitation d'archive serait le pire mensonge possible ici.
--   2. `quote_kind` distingue une citation exacte d'un fait documenté, pour que
--      le site n'affiche jamais un résumé sous la forme d'une citation.
--
-- La lecture publique passe par PostgREST avec la clé publishable, donc en rôle
-- `anon` : le RLS est la seule barrière qui décide de ce qui sort. L'écriture
-- n'est ouverte à aucun rôle public (`anon`, `authenticated`) — les imports
-- passent par une connexion privilégiée.

create extension if not exists "vector" with schema extensions;

create type verdict_status as enum (
  'VRAI',
  'FAUX',
  'TROMPEUR',
  'INSTRUMENTALISATION_SEMANTIQUE',
  'HORS_CONTEXTE'
);

create type political_spectrum as enum (
  'ARCHIVE_PRIMAIRE',
  'CONSENSUS_ACADEMIQUE',
  'GAUCHE',
  'CENTRE',
  'DROITE_LIBERALE_CONSERVATRICE',
  'DONNEES_BRUTES_OFFICIELLES'
);

create type quote_kind as enum (
  'CITATION_EXACTE',
  'FAIT_DOCUMENTE'
);

create table public.dossiers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  claim_title text not null,
  verdict verdict_status not null,
  verdict_summary text not null,
  consensus_score smallint not null check (consensus_score between 0 and 100),
  premises jsonb not null default '[]'::jsonb,
  search_tsv tsvector generated always as (
    setweight(to_tsvector('french', coalesce(claim_title, '')), 'A') ||
    setweight(to_tsvector('french', coalesce(verdict_summary, '')), 'B')
  ) stored,
  embedding extensions.vector(1536),
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.dossier_sources (
  id uuid primary key default gen_random_uuid(),
  dossier_id uuid not null references public.dossiers(id) on delete cascade,
  spectrum political_spectrum not null,
  source_name text not null,
  author_or_institution text not null,
  publication_date date,
  quote_kind quote_kind not null default 'FAIT_DOCUMENTE',
  exact_quote text not null,
  context_explanation text not null,
  original_url text,
  archive_storage_path text,
  archive_sha256 text check (archive_sha256 is null or archive_sha256 ~ '^[0-9a-f]{64}$'),
  display_order smallint not null default 1,
  created_at timestamptz not null default now()
);

create index idx_dossiers_slug on public.dossiers(slug) where is_published = true;
create index idx_dossiers_search_tsv on public.dossiers using gin(search_tsv);
create index idx_dossier_sources_dossier_id on public.dossier_sources(dossier_id);

alter table public.dossiers enable row level security;
alter table public.dossier_sources enable row level security;

create policy "Public read published dossiers" on public.dossiers
  for select using (is_published = true);

create policy "Public read published dossier_sources" on public.dossier_sources
  for select using (
    exists (
      select 1 from public.dossiers d
      where d.id = dossier_sources.dossier_id and d.is_published = true
    )
  );

comment on table public.dossiers is
  'Dossiers de vérification. Seuls les dossiers publiés sont lisibles par le public (RLS).';
comment on column public.dossiers.consensus_score is
  'Score éditorial de convergence (0-100), renseigné lors de la constitution du dossier. La couverture documentaire, elle, se calcule sur les sources.';
comment on column public.dossier_sources.archive_sha256 is
  'Empreinte SHA-256 de la capture archivée, ou NULL tant qu''aucune capture n''existe.';
