-- La note porte sur la conformité documentaire d'une pièce, jamais sur la
-- véracité d'une prise de position ou sur l'effet d'un vote.
alter table public.evidence
  add column publication_confidence numeric(4,3)
    check (publication_confidence between 0 and 1),
  add column publication_method text
    check (publication_method in ('official_archive_replay')),
  add column publication_checks jsonb;

comment on column public.evidence.publication_confidence is
  'Confiance dans la conformité à l’archive source, sans interprétation politique.';
comment on column public.evidence.publication_checks is
  'Contrôles techniques vérifiés avant publication automatique.';

-- Aucun privilège UPDATE sur ces colonnes n'est accordé à authenticated.
-- La politique SELECT existante continue de cacher les brouillons à anon.
