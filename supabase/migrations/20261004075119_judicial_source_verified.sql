-- Publication factuelle automatique autorisée par l'utilisateur le 04/10/2026.
-- Aucun relecteur humain ni score de culpabilité n'est inventé. RLS inchangée.
alter table public.evidence drop constraint evidence_publication_method_check;
alter table public.evidence add constraint evidence_publication_method_check
  check (publication_method in ('official_archive_replay','official_source_unreviewed','judicial_source_verified'));
alter table public.evidence drop constraint evidence_editorial_review_check;
alter table public.evidence add constraint evidence_editorial_review_check check (
  kind not in ('program','statement','indicator','judicial_event')
  or (publication_method is null and (status='draft' or (reviewed_by is not null and reviewed_at is not null)))
  or (kind='indicator' and publication_method='official_source_unreviewed')
  or (kind='judicial_event' and publication_method='judicial_source_verified')
);
alter table public.evidence add constraint evidence_direct_judicial_publication_check check (
  publication_method is distinct from 'judicial_source_verified'
  or (
    kind='judicial_event' and status in ('draft','published')
    and reviewed_by is null and reviewed_at is null and publication_confidence is null
    and source_url ~ '^https://(www\.)?(tribunal-de-paris\.justice\.fr|courdecassation\.fr|cours-appel\.justice\.fr|justice\.gouv\.fr|legifrance\.gouv\.fr)/'
    and coalesce(source_locator,'')<>''
    and coalesce(jsonb_typeof(detail->'judicial'->'snapshot')='object',false)
    and coalesce(detail->'judicial'->'snapshot'->>'version','')='1'
    and coalesce(publication_checks->'primary_source_verified'='true'::jsonb,false)
    and coalesce(publication_checks->'roles_motifs_finality_checked'='true'::jsonb,false)
    and coalesce(publication_checks->'dated_affiliations_only'='true'::jsonb,false)
    and coalesce(publication_checks->'user_requested_without_review'='true'::jsonb,false)
    and coalesce(publication_checks->'human_review'='false'::jsonb,false)
    and coalesce(detail->'publication'->>'published_at','')<>''
  )
);
comment on column public.evidence.publication_method is
  'official_archive_replay : archive parlementaire ; official_source_unreviewed : indicateur officiel ; judicial_source_verified : faits judiciaires sourcés publiés automatiquement sans relecture humaine.';
