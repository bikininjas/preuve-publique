-- 0016_droit_fondamental_libre_verdict.sql
--
-- Nouveau verdict : l'affirmation est fausse et la pratique décrite relève d'un
-- droit fondamental librement exercé (ici : journalisme et accès aux
-- manifestations). Additif et rejouable.

alter type public.verdict_status add value if not exists 'DROIT_FONDAMENTAL_LIBRE';
