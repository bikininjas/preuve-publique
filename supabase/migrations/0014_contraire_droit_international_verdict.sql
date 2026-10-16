-- 0014 : un verdict « contraire au droit international ».
--
-- Extension d'énumération purement additive : aucune valeur existante n'est
-- réécrite, aucun dossier n'est touché. Le verdict vit en capitales côté base
-- (`CONTRAIRE_AU_DROIT_INTERNATIONAL`) ; le libellé affiché — « Contraire au
-- droit international » — vit côté site (VERDICT_LABELS).
--
-- `IF NOT EXISTS` rend la migration rejouable sans erreur. La nouvelle valeur
-- ne peut pas être utilisée dans la transaction qui l'ajoute : ce fichier se
-- limite à l'extension, les seeds viennent après.

alter type public.verdict_status add value if not exists 'CONTRAIRE_AU_DROIT_INTERNATIONAL';
