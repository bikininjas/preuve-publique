-- 0012 : un verdict « confusion conceptuelle ».
--
-- Extension d'énumération purement additive : aucune valeur existante n'est
-- réécrite, aucun dossier n'est touché. Le verdict vit en capitales côté base
-- (`CONFUSION_CONCEPTUELLE`) ; le libellé affiché — « Confusion conceptuelle » —
-- vit côté site (VERDICT_LABELS).
--
-- `IF NOT EXISTS` rend la migration rejouable sans erreur. La nouvelle valeur
-- ne peut pas être utilisée dans la transaction qui l'ajoute : ce fichier se
-- limite à l'extension, les seeds viennent après.
--
-- À noter : `CONFUSION_CONCEPTUELLE` existait déjà comme **statut de brique**
-- (« prémisse ») côté application — les deux échelles sont des types distincts,
-- aucun conflit en base (le champ `premises` est un JSONB validé côté site).

alter type public.verdict_status add value if not exists 'CONFUSION_CONCEPTUELLE';
