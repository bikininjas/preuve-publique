-- Étapes judiciaires documentées, dans la même file de relecture que les pièces.
-- Aucun verdict généré, aucune attribution automatique à un parti.
alter table public.evidence drop constraint evidence_kind_check;
alter table public.evidence add constraint evidence_kind_check check
  (kind in ('program','statement','amendment','vote','adopted_text','indicator','judicial_event'));

alter table public.evidence add constraint evidence_judicial_context_check check (
  kind <> 'judicial_event' or (
    detail is not null
    and jsonb_typeof(detail->'judicial') = 'object'
    and coalesce(detail->'judicial'->>'case_id', '') <> ''
    and coalesce(detail->'judicial'->>'court', '') <> ''
    and coalesce(detail->'judicial'->>'stage', '') <> ''
    and coalesce(detail->'judicial'->>'status_at_event', '') <> ''
    and coalesce(detail->'judicial'->>'current_status_note', '') <> ''
  )
);

-- Les nouveaux contenus éditoriaux ne peuvent se réclamer de la publication
-- automatique réservée aux archives de scrutins. Relecteur effectif obligatoire.
alter table public.evidence add constraint evidence_editorial_review_check check (
  kind not in ('program','statement','indicator','judicial_event') or (
    publication_method is null
    and (status = 'draft' or (reviewed_by is not null and reviewed_at is not null))
  )
);
-- RLS, droits et politiques sources/acteurs/revue restent ceux déjà contrôlés.
