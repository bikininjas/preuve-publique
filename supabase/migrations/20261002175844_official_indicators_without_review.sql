-- Publication directe des chiffres institutionnels demandée par l'utilisateur.
-- Ne renseigne ni relecteur, ni confiance, ni validation humaine fictive.
alter table public.evidence drop constraint evidence_publication_method_check;
alter table public.evidence add constraint evidence_publication_method_check
  check (publication_method in ('official_archive_replay', 'official_source_unreviewed'));

alter table public.evidence drop constraint evidence_editorial_review_check;
alter table public.evidence add constraint evidence_editorial_review_check check (
  kind not in ('program','statement','indicator','judicial_event')
  or (publication_method is null and (status = 'draft' or (reviewed_by is not null and reviewed_at is not null)))
  or (kind = 'indicator' and publication_method = 'official_source_unreviewed')
);

alter table public.evidence add constraint evidence_direct_indicator_publication_check check (
  publication_method is distinct from 'official_source_unreviewed'
  or (
    kind = 'indicator' and status in ('draft','published')
    and reviewed_by is null and reviewed_at is null and publication_confidence is null
    and source_url ~ '^https://(www\.)?(insee\.fr|cereq\.fr|enseignementsup-recherche\.gouv\.fr|drees\.solidarites-sante\.gouv\.fr|defenseurdesdroits\.fr|ipp\.eu)/'
    and coalesce(source_locator, '') <> ''
    and coalesce(jsonb_typeof(detail->'indicator') = 'object', false)
    and coalesce(publication_checks->'official_source' = 'true'::jsonb, false)
    and coalesce(publication_checks->'user_requested_without_review' = 'true'::jsonb, false)
    and coalesce(publication_checks->'human_review' = 'false'::jsonb, false)
    and coalesce(detail->'publication'->>'published_at', '') <> ''
  )
);

-- Les droits et politiques RLS sont conservés : anon lit seulement published.
-- Les colonnes de publication restent non modifiables par authenticated.
comment on column public.evidence.publication_method is
  'official_archive_replay : conformité technique aux archives ; official_source_unreviewed : chiffres institutionnels publiés sur demande sans relecture.';
