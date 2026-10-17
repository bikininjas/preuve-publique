-- 0015_triangulation_guard_trigger.sql
--
-- Le Triangulation Guard était jusqu'ici appliqué par l'application (validateur
-- Zod à la publication, script d'application du seed). Cette migration le pose
-- aussi **dans la base** : un dossier ne peut plus être publié si ses pièces ne
-- satisfont pas les quatre règles de preuve, quel que soit le chemin d'écriture
-- (script, console SQL, futur import).
--
-- Règles vérifiées (miroir de `triangulationIssues`) :
--   1. TRIANGULATION_PRIMARY_REQUIRED  : au moins une pièce ARCHIVE_PRIMAIRE ou
--      DONNEES_BRUTES_OFFICIELLES ;
--   2. TRIANGULATION_ACADEMIC_REQUIRED : au moins une pièce CONSENSUS_ACADEMIQUE ;
--   3. TRIANGULATION_PLURALISM_REQUIRED: au moins deux spectres politiques
--      distincts parmi GAUCHE, CENTRE et DROITE_LIBERALE_CONSERVATRICE ;
--   4. TRIANGULATION_PROOF_HASH_REQUIRED / TRIANGULATION_QUOTE_REQUIRED :
--      chaque pièce porte une citation non vide et une empreinte SHA-256 valide.
--
-- Le trigger est BEFORE INSERT OR UPDATE, limité aux lignes publiées. Un dossier
-- neuf s'insère donc en brouillon, reçoit ses pièces, puis se publie : c'est
-- l'ordre que suit `scripts/apply-seed.mts` et que suit déjà l'admin (création
-- en brouillon, publication par mise à jour).

create or replace function public.enforce_triangulation_guard()
returns trigger
language plpgsql
as $$
declare
  v_primary boolean;
  v_academic boolean;
  v_political integer;
  v_bad_hash integer;
  v_blank_quote integer;
begin
  if new.is_published is not true then
    return new;
  end if;

  select exists (
    select 1
    from public.dossier_sources s
    where s.dossier_id = new.id
      and s.spectrum in ('ARCHIVE_PRIMAIRE', 'DONNEES_BRUTES_OFFICIELLES')
  ) into v_primary;

  if not v_primary then
    raise exception
      'TRIANGULATION_PRIMARY_REQUIRED — aucune preuve primaire : il faut au moins une source ARCHIVE_PRIMAIRE ou DONNEES_BRUTES_OFFICIELLES.'
      using errcode = '23514';
  end if;

  select exists (
    select 1
    from public.dossier_sources s
    where s.dossier_id = new.id
      and s.spectrum = 'CONSENSUS_ACADEMIQUE'
  ) into v_academic;

  if not v_academic then
    raise exception
      'TRIANGULATION_ACADEMIC_REQUIRED — aucune validation académique : il faut au moins une source CONSENSUS_ACADEMIQUE.'
      using errcode = '23514';
  end if;

  select count(distinct s.spectrum)
  from public.dossier_sources s
  where s.dossier_id = new.id
    and s.spectrum in ('GAUCHE', 'CENTRE', 'DROITE_LIBERALE_CONSERVATRICE')
  into v_political;

  if v_political < 2 then
    raise exception
      'TRIANGULATION_PLURALISM_REQUIRED — pluralisme insuffisant : au moins deux spectres distincts parmi GAUCHE, CENTRE et DROITE_LIBERALE_CONSERVATRICE sont requis.'
      using errcode = '23514';
  end if;

  select count(*)
  from public.dossier_sources s
  where s.dossier_id = new.id
    and (s.archive_sha256 is null or s.archive_sha256 !~ '^[0-9a-f]{64}$')
  into v_bad_hash;

  if v_bad_hash > 0 then
    raise exception
      'TRIANGULATION_PROOF_HASH_REQUIRED — % pièce(s) sans empreinte SHA-256 valide : la publication est refusée.',
      v_bad_hash
      using errcode = '23514';
  end if;

  select count(*)
  from public.dossier_sources s
  where s.dossier_id = new.id
    and btrim(s.exact_quote) = ''
  into v_blank_quote;

  if v_blank_quote > 0 then
    raise exception
      'TRIANGULATION_QUOTE_REQUIRED — % pièce(s) sans citation : la publication est refusée.',
      v_blank_quote
      using errcode = '23514';
  end if;

  return new;
end;
$$;

drop trigger if exists dossiers_triangulation_guard on public.dossiers;

create trigger dossiers_triangulation_guard
before insert or update on public.dossiers
for each row
when (new.is_published = true)
execute function public.enforce_triangulation_guard();
