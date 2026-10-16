-- Nouveau verdict : un cadre juridique restreint (la transparence existe mais
-- canalisée ; ni vrai ni faux plein).
alter type public.verdict_status add value if not exists 'CADRE_REGLEMENTAIRE_RESTREINT';
