-- 0007 : catégorie « Religion » et deux verdicts supplémentaires
--
-- Deux extensions d'énumération, purement additives : aucune valeur existante
-- n'est réécrite, aucun dossier n'est touché.
--   1. `dossier_category` accueille « Religion » — les valeurs restent en
--      capitales, comme les huit catégories d'origine (le libellé affiché,
--      « Religion », vit côté site : CATEGORY_LABELS) ;
--   2. `verdict_status` accueille deux verdicts déjà employés par la
--      rédaction : l'anachronisme historique et la généralisation abusive.
--
-- `IF NOT EXISTS` rend la migration rejouable sans erreur. Les nouvelles
-- valeurs ne peuvent pas être *utilisées* dans la transaction qui les ajoute :
-- ce fichier se limite donc aux extensions, les seeds viennent après.

alter type public.dossier_category add value if not exists 'RELIGION';

alter type public.verdict_status add value if not exists 'ANACHRONISME_HISTORIQUE';
alter type public.verdict_status add value if not exists 'GENERALISATION_ABUSIVE';
