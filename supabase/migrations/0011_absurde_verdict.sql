-- 0011 : un verdict « absurde ».
--
-- Extension d'énumération purement additive : aucune valeur existante n'est
-- réécrite, aucun dossier n'est touché. Le verdict vit en capitales côté base
-- (`ABSURDE`) ; le libellé affiché — « Absurde » — vit côté site (VERDICT_LABELS).
--
-- `IF NOT EXISTS` rend la migration rejouable sans erreur. La nouvelle valeur
-- ne peut pas être utilisée dans la transaction qui l'ajoute : ce fichier se
-- limite à l'extension, les seeds viennent après.
--
-- Les deux statuts de brique du dossier (« Confusion conceptuelle », « Faux »)
-- existent déjà côté application : le champ `premises` est un JSONB validé
-- côté application, pas un type énuméré en base.

alter type public.verdict_status add value if not exists 'ABSURDE';
