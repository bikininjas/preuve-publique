-- 0006 : protagonistes des dossiers et références d'auteur
--
-- « Protagoniste » = ce que l'affirmation met en cause (personnes,
-- organisations, lieux, textes) ou ce qui porte les preuves (auteurs et
-- institutions). Chaque entrée peut pointer vers une référence publique
-- vérifiable ; le champ reste nul quand aucune n'a été confirmée, parce qu'un
-- lien inventé serait pire que pas de lien.

alter table public.dossiers
  add column protagonists jsonb not null default '[]'::jsonb;

comment on column public.dossiers.protagonists is
  'Liste de {name, kind, role, reference_url, note} : SUJET (mis en cause) ou AUTEUR (porte la preuve).';

alter table public.dossier_sources
  add column author_reference_url text;

comment on column public.dossier_sources.author_reference_url is
  'Référence publique de l''auteur ou de l''institution de la pièce, si elle a été vérifiée.';
