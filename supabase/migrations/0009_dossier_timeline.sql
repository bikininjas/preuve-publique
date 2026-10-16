-- 0009 : chaîne de custode — la chronologie éditoriale d'un dossier.
--
-- Un tableau JSONB optionnel : des étapes datées, titrées et décrites,
-- rattachables à une pièce (« Pièce #04 »). Purement additif : aucun dossier
-- existant n'est touché, la colonne arrive vide.
--
-- `if not exists` rend la migration rejouable ; `default '[]'::jsonb` donne un
-- tableau vide aux lignes existantes plutôt qu'un NULL — la lecture publique
-- ne traite alors qu'un seul cas.

alter table public.dossiers
  add column if not exists timeline jsonb not null default '[]'::jsonb;
