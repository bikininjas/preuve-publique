-- seed.sql — généré par `npm run seed:sql` (scripts/build-seed-sql.mts).
-- Ne pas modifier à la main : modifier src/db/seed-fallback.ts.
-- Rejouable : chaque insertion est précédée d'une suppression par slug.
-- Les empreintes archive_sha256 sont calculées sur les champs publiés
-- (voir src/server/services/crypto.service.ts) et contrôlées par le
-- validateur de triangulation avant écriture.

delete from public.dossiers where slug = 'hitler-et-les-nazis-etaient-de-gauche';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, is_published, published_at
) values (
  '7f1c9a54-2b1e-4c8a-9d3f-1a5e6b7c8d90',
  'hitler-et-les-nazis-etaient-de-gauche',
  'Hitler et les nazis étaient de gauche',
  'FAUX'::verdict_status,
  'Le mot « socialiste » du sigle NSDAP relève d''une stratégie de récupération électorale assumée. Dès 1933, le régime détruit les syndicats, interne l''opposition de gauche, assassine sa propre aile anticapitaliste et privatise massivement au profit des grands cartels industriels.',
  'HISTOIRE'::dossier_category,
  '[{"name":"Adolf Hitler","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Adolf_Hitler","note":null},{"name":"Parti national-socialiste des travailleurs allemands","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Parti_national-socialiste_des_travailleurs_allemands","note":null},{"name":"Parti communiste d''Allemagne","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Parti_communiste_d''Allemagne","note":null},{"name":"Parti social-démocrate d''Allemagne","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Parti_social-d%C3%A9mocrate_d''Allemagne","note":null},{"name":"Parti national du peuple allemand","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Parti_populaire_national_allemand","note":null},{"name":"Franz von Papen","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Franz_von_Papen","note":null},{"name":"Gregor Strasser","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Gregor_Strasser","note":null},{"name":"Camp de concentration de Dachau","kind":"LIEU","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Camp_de_concentration_de_Dachau","note":null},{"name":"IG Farben","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/IG_Farben","note":null},{"name":"Krupp","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Krupp","note":null},{"name":"Deutsche Reichsbahn","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Deutsche_Reichsbahn","note":null},{"name":"Nuit des Longs Couteaux","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Nuit_des_longs_couteaux","note":null},{"name":"Loi des pleins pouvoirs","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Loi_allemande_des_pleins_pouvoirs_de_1933","note":null},{"name":"Incendie du Reichstag","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Incendie_du_Reichstag","note":null},{"name":"Commerzbank","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Commerzbank","note":null},{"name":"Deutsche Bank","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Deutsche_Bank","note":null},{"name":"Raymond Aron","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Raymond_Aron","note":null},{"name":"Johann Chapoutot","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Johann_Chapoutot","note":null},{"name":"Ludwig von Mises","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Ludwig_von_Mises","note":null},{"name":"Ian Kershaw","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Ian_Kershaw","note":null},{"name":"Richard J. Evans","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Richard_J._Evans","note":null},{"name":"George Sylvester Viereck","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/George_Sylvester_Viereck","note":null},{"name":"Germà Bel","kind":"PERSONNE","role":"AUTEUR","reference_url":null,"note":"Économiste, auteur de l''étude sur les privatisations nazies (Economic History Review)."}]'::jsonb,
  100,
  '[{"claim_part":"Le sigle NSDAP contient le mot « socialiste »","status":"VRAI_DETOURNE","detail":"Terme retenu en 1920 pour capter l''électorat ouvrier, mais redéfini par Hitler hors de la lutte des classes et contre le marxisme, avec garantie explicite de la propriété privée."},{"claim_part":"L''État nazi intervenait dans l''économie, donc il était de gauche","status":"CONFUSION_CONCEPTUELLE","detail":"Économie de guerre dirigiste appuyée sur des cartels privés (Krupp, IG Farben, Siemens) et sur des privatisations massives entre 1934 et 1937 : l''inverse d''une collectivisation ou d''une abolition de la propriété privée."},{"claim_part":"Le NSDAP avait des alliances et une politique de gauche","status":"FAUX","detail":"Accession à la chancellerie par une coalition avec la droite conservatrice (von Papen, DNVP), ouverture de Dachau en mars 1933 pour interner communistes et sociaux-démocrates, dissolution des syndicats le 2 mai 1933, assassinat de l''aile strasseriste en juin 1934."}]'::jsonb,
  true,
  '2026-10-14T00:00:00.000Z'::timestamptz
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '0f2f4a11-6c5b-4c6e-8f24-9c0f1a2b3c41',
  '7f1c9a54-2b1e-4c8a-9d3f-1a5e6b7c8d90',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Liberty Magazine, vol. 9 n° 28',
  'Adolf Hitler, interviewé par George Sylvester Viereck',
  '1932-07-09',
  'CITATION_EXACTE'::quote_kind,
  'Contrairement au marxisme, le socialisme [national-socialiste] ne répudie pas la propriété privée. Contrairement au marxisme, il n''implique aucune négation de la personnalité.',
  'L''article paraît sous le titre « When I Take Charge of Germany — Hitler Shows His Hand » (Liberty, vol. 9 n° 28, 9 juillet 1932). Hitler y revendique explicitement une redéfinition du mot « socialisme » contre la gauche marxiste, en garantissant la propriété privée ; la citation française traduit l''anglais publié.',
  null,
  null,
  '8a3322902363d2d1a1e1c593b12496b8f6e78262fa3d747c5b5c15b13b642756',
  null,
  'https://fr.wikipedia.org/wiki/George_Sylvester_Viereck',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '1a7e5b62-7d6c-4d7f-9a35-0d1e2f3a4b52',
  '7f1c9a54-2b1e-4c8a-9d3f-1a5e6b7c8d90',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Discours au Club de l''Industrie de Düsseldorf',
  'Adolf Hitler, devant les industriels allemands',
  '1932-01-27',
  'FAIT_DOCUMENTE'::quote_kind,
  'Devant les grands patrons réunis à Düsseldorf, Hitler défend la propriété privée comme corollaire de l''inégalité des individus, attaque le marxisme et les syndicats, et sollicite leur soutien financier.',
  'Le discours est le moment public où le parti nazi se présente au grand patronat comme le rempart contre la gauche : la contrepartie attendue est le financement de l''appareil de parti.',
  null,
  null,
  'c69fd5823aeeab17aa16a0e20c6aace4f2e25575be0e4a182f2273006684e7d3',
  null,
  'https://fr.wikipedia.org/wiki/Adolf_Hitler',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '2b8f6c73-8e7d-4e80-ab46-1e2f3a4b5c63',
  '7f1c9a54-2b1e-4c8a-9d3f-1a5e6b7c8d90',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Reichstag — vote de la loi des pleins pouvoirs (Ermächtigungsgesetz)',
  'Reichstag, procès-verbal du 23 mars 1933',
  '1933-03-23',
  'FAIT_DOCUMENTE'::quote_kind,
  'Le SPD est le seul parti encore représenté à voter contre les pleins pouvoirs ; les députés du KPD sont déjà arrêtés ou contraints à la clandestinité, et les partis de droite comme du centre votent pour.',
  'Le vote sépare nettement le régime naissant de la gauche parlementaire : ce sont les conservateurs et le centre qui donnent à Hitler les pouvoirs qu''il utilise ensuite pour interdire la gauche.',
  null,
  null,
  'd7255ffb396b2338dc3b776bfd6f6578116220c86f73eec2f744e1c7b79b86f5',
  null,
  null,
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '3c9a7d84-9f8e-4f91-bc57-2f3a4b5c6d74',
  '7f1c9a54-2b1e-4c8a-9d3f-1a5e6b7c8d90',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Offensive du 2 mai 1933 contre les syndicats libres',
  'Régime national-socialiste — décret et occupation des maisons syndicales',
  '1933-05-02',
  'FAIT_DOCUMENTE'::quote_kind,
  'Les maisons des syndicats libres sont occupées, leurs dirigeants arrêtés et leurs fonds saisis ; les organisations ouvrières sont dissoutes et remplacées par le Front allemand du travail.',
  'L''acte vise précisément le mouvement ouvrier organisé : un régime de gauche ne détruit pas en une journée ses propres syndicats.',
  null,
  null,
  '81ac07db347f3393b7bcd0979051a87ac852e88eb0d0c90af893f7a58c2a9e07',
  null,
  null,
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '4da8e895-a09f-40a2-cd68-3a4b5c6d7e85',
  '7f1c9a54-2b1e-4c8a-9d3f-1a5e6b7c8d90',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'The Economic History Review, vol. 63, n° 1, p. 34-55',
  'Germà Bel, Universitat de Barcelona',
  '2009-12-14',
  'FAIT_DOCUMENTE'::quote_kind,
  'Entre 1934 et 1937, le gouvernement nazi transfère massivement des entreprises publiques au secteur privé (acier, mines, banque, transports maritimes, chemins de fer), à rebours des nationalisations menées ailleurs après 1929.',
  'Étude évaluée par les pairs qui documente le sens du transfert de propriété sous le IIIe Reich : de l''État vers les grands groupes privés, et non l''inverse.',
  'https://doi.org/10.1111/j.1468-0289.2009.00473.x',
  null,
  '50d35ffd0e620dabadb5b9e7cb15f01268127d1a1ee0d313ae5145d9e99fd6bd',
  null,
  null,
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '5eb9f9a6-b1a0-41b3-de79-4b5c6d7e8f96',
  '7f1c9a54-2b1e-4c8a-9d3f-1a5e6b7c8d90',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Travaux sur l''idéologie völkisch et le darwinisme social',
  'Ian Kershaw (Oxford), Richard J. Evans (Cambridge), Johann Chapoutot (Sorbonne)',
  null,
  'FAIT_DOCUMENTE'::quote_kind,
  'Le nazisme est classé par ces historiens à l''extrême droite contre-révolutionnaire : doctrine völkisch fondée sur l''inégalité biologique et le darwinisme social, antithèse de l''universalisme de gauche.',
  'Littérature académique de référence, convergente sur la place du nazisme dans l''espace politique, indépendamment des positions politiques de ses auteurs.',
  null,
  null,
  'f33c303c522e2d3c11d6b4616148e6e7b716f8dea6413e71de8bf354e3c5b67a',
  null,
  'https://fr.wikipedia.org/wiki/Johann_Chapoutot',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '6fca0ab7-c2b1-42c4-ef8a-5c6d7e8f9a07',
  '7f1c9a54-2b1e-4c8a-9d3f-1a5e6b7c8d90',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Démocratie et totalitarisme ; dossiers du Figaro Histoire',
  'Raymond Aron et historiens du politique',
  '1965-01-01',
  'FAIT_DOCUMENTE'::quote_kind,
  'L''arrivée de Hitler à la chancellerie, le 30 janvier 1933, résulte d''une coalition avec la droite nationaliste conservatrice visant à barrer la route aux partis de gauche.',
  'Lecture issue de la droite libérale et conservatrice : elle rappelle que le parti nazi siégeait à l''extrême droite du Reichstag et a gouverné avec l''appui des élites conservatrices.',
  null,
  null,
  '864e75499757f587dccf4764922adfb92cc3b6fd4dae5303b9ee227519736587',
  null,
  'https://fr.wikipedia.org/wiki/Raymond_Aron',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '70db1bc8-d3c2-43d5-f09b-6d7e8f9a0b18',
  '7f1c9a54-2b1e-4c8a-9d3f-1a5e6b7c8d90',
  'GAUCHE'::political_spectrum,
  'Archives du SPD et du KPD',
  'Parti social-démocrate et parti communiste allemands',
  '1933-03-01',
  'FAIT_DOCUMENTE'::quote_kind,
  'Les organisations ouvrières documentent, dès février-mars 1933, l''arrestation en masse de leurs militants, l''interdiction de leurs journaux et l''internement des députés communistes.',
  'Sources produites par la gauche allemande elle-même : elles décrivent la répression subie par les organisations que le régime est censé représenter s''il était « de gauche ».',
  null,
  null,
  'e72d7917086c2a8e1dacea36ee42b44f8b9f28ea1d6fb0cfcab6aa63acc59d3e',
  null,
  null,
  8
);

delete from public.dossiers where slug = 'aide-medicale-detat-securite-sociale-soins-de-confort';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, is_published, published_at
) values (
  'ec66bd00-fb41-4eaf-b5aa-47600ef03889',
  'aide-medicale-detat-securite-sociale-soins-de-confort',
  'L''Aide Médicale d''État (AME) ruine la Sécurité sociale et finance des soins de confort gratuits',
  'FAUX'::verdict_status,
  'L''aide médicale de l''État coûte environ 1,4 milliard d''euros en 2024 — un peu plus de 0,5 % des dépenses de santé — et c''est le budget de l''État qui la finance, pas les cotisations sociales. Les cures thermales, l''aide médicale à la procréation et les médicaments à faible service médical rendu sont exclus du panier de soins, et les nouveaux bénéficiaires passent par un accord médical préalable pour les soins non urgents. Le rapport Évin-Stefanini comme l''Académie nationale de médecine concluent à un dispositif utile et maîtrisé.',
  'SANTE'::dossier_category,
  '[{"name":"Aide médicale d''État","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Aide_m%C3%A9dicale_d%27%C3%89tat","note":"Dispositif d''accès aux soins des personnes étrangères en situation irrégulière."},{"name":"Sécurité sociale (France)","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/S%C3%A9curit%C3%A9_sociale_(France)","note":null},{"name":"Académie nationale de médecine","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Acad%C3%A9mie_nationale_de_m%C3%A9decine","note":"Autrice de l''avis (2026) et du communiqué (2023) cités."},{"name":"Claude Évin","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Claude_%C3%89vin","note":"Co-rapporteur de la mission d''évaluation de l''AME (2023)."},{"name":"Patrick Stefanini","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Patrick_Stefanini","note":"Co-rapporteur de la mission d''évaluation de l''AME (2023)."}]'::jsonb,
  100,
  '[{"claim_part":"« L''AME ruine la Sécurité sociale »","status":"FAUX","detail":"En 2024, le coût total réel s''élève à 1 386,8 millions d''euros, soit environ 0,5 % des dépenses de santé ; la dépense moyenne par bénéficiaire (2 396,4 € en 2023) est inférieure à celle de l''ensemble de la population. Le dispositif est porté par le budget de l''État (mission Santé), pas par les cotisations sociales."},{"claim_part":"« Elle finance des soins de confort gratuits (cures, esthétique) »","status":"FAUX","detail":"Les cures thermales, l''aide médicale à la procréation et les médicaments à faible service médical rendu sont explicitement exclus de l''AME (article R. 251-1 du code de l''action sociale et des familles) ; le Gouvernement écrit que « l''AME ne finance pas de soins non essentiels » (réponse ministérielle du 12 décembre 2023)."},{"claim_part":"« À l''arrivée, la prise en charge est immédiate et sans contrôle »","status":"FAUX","detail":"La résidence stable en France de plus de trois mois est exigée, la première demande se dépose physiquement en CPAM, et depuis le 1er janvier 2021 les bénéficiaires de moins de neuf mois ne reçoivent certains soins qu''après accord préalable du médecin-conseil : un délai de carence sur les soins non urgents, pas un accès immédiat à tout."}]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '80a4a44a-9ee4-4f26-9aae-d841728333cd',
  'ec66bd00-fb41-4eaf-b5aa-47600ef03889',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Rapport n° 468 (PLF 2025), annexe n° 40 « Santé » — commission des finances',
  'Assemblée nationale — Véronique Louwagie, rapporteure spéciale',
  '2024-10-19',
  'CITATION_EXACTE'::quote_kind,
  'L''aide médicale de l''État (AME) représente 80 % des crédits de la mission Santé, soit 1 319 millions d''euros pour 2025, ce qui correspond à un accroissement de 9,15 % par rapport à la LFI 2024.',
  'Le budget de l''AME est inscrit dans la mission Santé de l''État (programme 183), pas dans les comptes de la Sécurité sociale : la rumeur confond les deux. Le rapport de la commission des finances détaille cette ligne de crédits avant son examen par le Parlement.',
  'https://www.assemblee-nationale.fr/dyn/17/rapports/cion_fin/l17b0468-tiii-a40_rapport-fond.pdf',
  null,
  'ff679d5499d7be18c958de830352f559b35605711497aa9ea5721b98666e588e',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'b07bfd71-4ab3-4b68-9648-065f2ff6d71b',
  'ec66bd00-fb41-4eaf-b5aa-47600ef03889',
  'CENTRE'::political_spectrum,
  'Rapport d''information n° 841 (2024-2025) — « L''aide médicale de l''État : une réforme nécessaire »',
  'Sénat — commission des finances',
  '2025-07-09',
  'CITATION_EXACTE'::quote_kind,
  'Pour l''année 2024, le coût total réel de l''AME, toutes AME incluses, est de 1 386,8 millions d''euros, soit une hausse de 15,5 % par rapport à 2023, et de 67,6 % en 10 ans.',
  'Le rapport plaide pour une réforme mais documente surtout les chiffres : dépense moyenne de 2 396,4 € par bénéficiaire en 2023 (inférieure à celle de l''ensemble de la population), sous-budgétisation par l''État (dette de 185,1 M€ envers l''Assurance maladie en 2024) et exclusions explicites (cures thermales, PMA, médicaments à faible service médical rendu).',
  'https://www.senat.fr/rap/r24-841/r24-841_mono.html',
  null,
  'b2ccd133b86c6987a174a9a674cf9d89e8dd2226a72c7eafb3b148d5dede4034',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '0359e031-ac11-4ae7-a26e-c161397fb9eb',
  'ec66bd00-fb41-4eaf-b5aa-47600ef03889',
  'CENTRE'::political_spectrum,
  'Réponse ministérielle à la question écrite n° 9389 — panier de soins de l''AME',
  'Ministère de la Santé et de la Prévention (Assemblée nationale)',
  '2023-12-12',
  'CITATION_EXACTE'::quote_kind,
  'Depuis le 1er janvier 2021, le panier de soins a été réduit pour les bénéficiaires de moins de 9 mois. Les soins remboursés après ce délai ne sont pas des soins esthétiques ou de confort. L''AME ne finance pas de soins non essentiels.',
  'La réponse rappelle les conditions d''ouverture (résidence stable de plus de trois mois, ressources faibles) et chiffre les dépenses : « Les dépenses de l''Etat au titre de l''AME représentent moins de 0,5 % des dépenses totales de santé ». Les principaux postes sont les accouchements, les cancers et les affections cardiovasculaires.',
  'https://questions.assemblee-nationale.fr/q16/16-9389QE.htm',
  null,
  'a6bc2760810fc9630fe38027d04d7973c5358353d70f540872dc8d84f95bd7d7',
  null,
  null,
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '30bd05eb-daec-4c75-8940-7e2f6795a54d',
  'ec66bd00-fb41-4eaf-b5aa-47600ef03889',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Rapport sur l''aide médicale de l''État',
  'Mission Claude Évin – Patrick Stefanini',
  '2023-12-04',
  'CITATION_EXACTE'::quote_kind,
  'Il se dégage le constat d''un dispositif sanitaire utile, maîtrisé pour l''essentiel mais exposé à l''augmentation récente du nombre de ses bénéficiaires.',
  'Mission commandée par le gouvernement et confiée à Claude Évin (ancien ministre) et Patrick Stefanini (conseiller d''État) : elle conclut à l''utilité sanitaire du dispositif et propose un resserrement (vérifications renforcées, accord préalable étendu), jamais sa suppression. Ses conclusions sont invoquées dans le débat par les deux bords.',
  'https://www.vie-publique.fr/files/rapport/pdf/292122.pdf',
  null,
  '0f0bda51612104fd0f9be0494cce5fc214d1de0f2aa382756fa121e649643d50',
  null,
  null,
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'ce712886-527f-4bac-82d6-e0d030821ae0',
  'ec66bd00-fb41-4eaf-b5aa-47600ef03889',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Avis — « Aide médicale de l''État : maintenir l''accès aux soins mais mieux encadrer les soins différables »',
  'Académie nationale de médecine',
  '2026-10-07',
  'CITATION_EXACTE'::quote_kind,
  'Son coût atteint près de 1,5 milliard d''euros représente un peu plus de 0,5 % des dépenses de l''Assurance maladie. L''Académie nationale de médecine (ANM) réaffirme que le maintien de l''AME répond à une exigence éthique et à des impératifs de santé publique : prévenir l''aggravation des maladies, éviter les pertes de chance, limiter la transmission des infections et prévenir le recours tardif à des soins plus lourds et plus coûteux.',
  'L''Académie (environ 460 000 bénéficiaires) s''oppose au remplacement de l''AME par une aide limitée aux seules urgences : l''absence d''urgence immédiate ne signifie pas qu''un soin puisse être différé sans risque. Elle propose un encadrement médical des soins différables, pas une restriction du panier.',
  'https://www.academie-medecine.fr/wp-content/uploads/2026/10/26.10.7-Avis-ANM-AME.pdf',
  null,
  '9664d824e1dcbdc91ba56227526a8b4bfd70db9b903f7afbfe88caac71c589dc',
  null,
  null,
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '6ab964d5-cd3f-4c24-b10c-17bfe38ccf8f',
  'ec66bd00-fb41-4eaf-b5aa-47600ef03889',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Communiqué — « Assurer l''accès aux soins et l''égalité de traitement pour tous »',
  'Académie nationale de médecine (séance du 28 novembre 2023)',
  '2023-11-28',
  'CITATION_EXACTE'::quote_kind,
  'Ce dispositif répond à une logique de soins pour prévenir le recours à une hospitalisation en cas d''aggravation de maladies qui peuvent être prises en charge en ambulatoire et prévenir le risque de transmission de maladies contagieuses.',
  'Adopté par 70 voix pour, 7 contre et 8 abstentions. L''Académie y réaffirme son opposition à toute restriction fondée sur une distinction « artificielle » entre soins urgents et non urgents : la prise en charge précoce évite les hospitalisations tardives, plus coûteuses.',
  'https://www.academie-medecine.fr/wp-content/uploads/2023/11/Communique-ANM-et-AME-2.pdf',
  null,
  'f0db8faa2853bea5f9e7ac60c812b4bf9f37ab233c26823ab686cc42c84264c2',
  null,
  null,
  6
);

delete from public.dossiers where slug = 'sans-papiers-et-rsa-des-leur-arrivee';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, is_published, published_at
) values (
  '0fa4f772-df1e-4c20-bf04-b0023a6b2234',
  'sans-papiers-et-rsa-des-leur-arrivee',
  'Les étrangers sans-papiers touchent le RSA dès leur arrivée en France',
  'FAUX'::verdict_status,
  'Aucune personne sans titre de séjour ne peut percevoir le RSA : la loi exige un titre de séjour autorisant à travailler depuis au moins cinq ans (article L. 262-4 du code de l''action sociale et des familles), un délai supprimé seulement pour les réfugiés, les apatrides et les titulaires d''une carte de résident. Les allocations familiales et les aides au logement supposent elles aussi la régularité du séjour. Au 30 juin 2022, 15,6 % des foyers allocataires du RSA avaient un responsable de dossier né hors UE/EEE — tous en situation régulière.',
  'SOCIETE'::dossier_category,
  '[{"name":"Revenu de solidarité active","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Revenu_de_solidarit%C3%A9_active","note":"Prestation de solidarité : pour les étrangers non européens, un titre de séjour autorisant à travailler depuis cinq ans est exigé."},{"name":"Cour des comptes (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)","note":null},{"name":"Caisse nationale des allocations familiales","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Caisse_nationale_des_allocations_familiales","note":"Source des données sur les allocataires citées par la réponse ministérielle."}]'::jsonb,
  100,
  '[{"claim_part":"« Les sans-papiers touchent le RSA »","status":"FAUX","detail":"La condition légale est un titre de séjour autorisant à travailler depuis au moins cinq ans ; « les immigrés irréguliers (« sans-papiers ») ne peuvent y prétendre en aucun cas » (Le Figaro, 2023). Les exceptions prévues (réfugiés, protection subsidiaire, apatrides, carte de résident) ne couvrent jamais l''irrégularité du séjour."},{"claim_part":"« … dès leur arrivée en France »","status":"FAUX","detail":"Il faut un titre autorisant à travailler depuis cinq ans, une résidence stable (moins de trois mois d''absence par an, article L. 262-2) et une demande examinée par la CAF : rien de tout cela n''est ouvert à une personne sans papiers. Le délai de cinq ans est levé pour quelques statuts protégés, pas pour l''absence de titre."},{"claim_part":"« Les étrangers pèsent lourd dans les bénéficiaires »","status":"VRAI_DETOURNE","detail":"Chiffre réel mais déformé : 15,6 % des foyers allocataires au 30 juin 2022 (moins de 300 000 foyers) avaient un responsable de dossier hors UE/EEE, tous titulaires du titre de séjour requis depuis cinq ans. La condition de nationalité protège précisément contre une attribution « dès l''arrivée »."}]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '7afdc994-b104-403c-93b9-068f1ba97063',
  '0fa4f772-df1e-4c20-bf04-b0023a6b2234',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de l''action sociale et des familles — article L. 262-4',
  'Légifrance (République française)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Etre français ou titulaire, depuis au moins cinq ans, d''un titre de séjour autorisant à travailler.',
  'Texte de loi en vigueur : pour le RSA, la condition de nationalité exige des étrangers non européens un titre de séjour autorisant à travailler depuis au moins cinq ans — avec des exceptions limitées (réfugiés, bénéficiaires de la protection subsidiaire, apatrides, titulaires de la carte de résident ou d''un titre équivalent).',
  'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031087751',
  null,
  '1bec9c6422554479022203c88ea72bccc4624292c161ee2e32c44547dee5806d',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'a28bb420-43a8-4bc3-9389-2f6e26e4f3c3',
  '0fa4f772-df1e-4c20-bf04-b0023a6b2234',
  'CENTRE'::political_spectrum,
  'Le revenu de solidarité active — évaluation de politique publique',
  'Cour des comptes',
  '2022-01-13',
  'CITATION_EXACTE'::quote_kind,
  'Outre la condition de nationalité, qui exige des non-européens qu''ils possèdent un titre de séjour régulier depuis au moins cinq ans, la principale restriction légale concerne l''âge minimum, fixé à 25 ans.',
  'L''évaluation (Cour des comptes et dix chambres régionales) confirme la condition des cinq ans comme restriction légale structurante et conclut que « la fraude n''a que peu d''impact sur le nombre de bénéficiaires légitimes » : l''attribution suppose d''être en séjour régulier.',
  'https://www.vie-publique.fr/files/rapport/pdf/283258.pdf',
  null,
  '8c032e9db1811f68366abbed9fdbda09784c789fc25d53255aaeacfc8d1e4e11',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '0eb3ff3e-a1a3-404a-94ca-641db4bdb84d',
  '0fa4f772-df1e-4c20-bf04-b0023a6b2234',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Réponse à la question écrite n° 5157 — bénéficiaires étrangers du RSA (données CNAF et CCMSA)',
  'Ministère des Solidarités, de l''Autonomie et des Personnes handicapées / Assemblée nationale',
  '2023-06-20',
  'CITATION_EXACTE'::quote_kind,
  'Au 30 juin 2022, selon les Caisses (Caisse nationale des allocations familiales et Caisse centrale de la mutualité sociale agricole), moins de 300 000 foyers bénéficiaires du RSA sont représentés par un responsable de dossier issu d''un pays hors Union européenne / Espace économique européen. Ils représentent 15,6 % des foyers bénéficiaires du RSA et 88,4 % des foyers dont le responsable de dossier n''a pas la nationalité française.',
  'Données officielles des caisses, citées par la réponse ministérielle : ces foyers comptent pour 15,6 % des allocataires du RSA et tous relèvent de la condition de titre de séjour (cinq ans). La réponse confirme aussi la condition de nationalité et l''exigence de résidence stable.',
  'https://questions.assemblee-nationale.fr/q16/16-5157QE.htm',
  null,
  'de5e9b2b1675870040b6f0ca0b8d7ebd807bf309cef9d4f57e69a86a3605b27e',
  null,
  null,
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '74e5bcd4-46bd-40a7-87f6-884818cf5d1c',
  '0fa4f772-df1e-4c20-bf04-b0023a6b2234',
  'CENTRE'::political_spectrum,
  'Rapport n° 426 (2024-2025) — proposition de loi créant une condition de durée de résidence pour certaines prestations sociales',
  'Sénat — commission des affaires sociales (Florence Lassarade, rapporteure)',
  '2025-03-12',
  'CITATION_EXACTE'::quote_kind,
  'Concernant le RSA, la loi impose d''être titulaire d''un titre de séjour autorisant à travailler depuis cinq ans.',
  'Le rapport rappelle l''état du droit avant de discuter un durcissement : la condition des cinq ans existe déjà pour le RSA, et le Conseil constitutionnel en a confirmé la constitutionnalité. Les cinq ans prolongent une logique de séjour régulier, pas l''inverse.',
  'https://www.senat.fr/rap/l24-426/l24-426_mono.html',
  null,
  'ff08f0ec92aade362ca06752423be86b98fe0b85d3e9ab7e34f0bd733cbde514',
  null,
  null,
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'f31eedfd-19d4-43fc-926d-a80e87fa05e3',
  '0fa4f772-df1e-4c20-bf04-b0023a6b2234',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'RSA, APL, allocations familiales… Qui peut vraiment bénéficier des prestations sociales en France ?',
  'Le Figaro',
  '2023-12-21',
  'CITATION_EXACTE'::quote_kind,
  'À noter que les immigrés irréguliers (« sans-papiers ») ne peuvent y prétendre en aucun cas. Ainsi, contrairement aux idées reçues, tous les étrangers ne bénéficient donc pas du « sésame » dès leur arrivée en France.',
  'Le quotidien détaille prestation par prestation : cinq ans de titre autorisant à travailler pour le RSA, régularité du séjour pour les prestations familiales et les aides au logement. Il note aussi que les demandeurs d''asile et les sans-papiers demeurent exclus des aides familiales spécifiques.',
  'https://www.lefigaro.fr/social/rsa-apl-allocations-familiales-qui-peut-vraiment-beneficier-des-prestations-sociales-en-france-20231221',
  null,
  '55962547383e42a8417ee4c4a6fb464f03502431596435a8b3cb3f87009a9e22',
  null,
  null,
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '9be08e3a-acfa-4ba1-bd25-21240e9b4887',
  '0fa4f772-df1e-4c20-bf04-b0023a6b2234',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Les systèmes de protection sociale européens sont-ils accessibles aux étrangers ?',
  'Jean-Michel Lafleur et Daniela Vintila (CEDEM, Université de Liège) — projet MiTSoPro, Horizon 2020',
  '2023-01-02',
  'CITATION_EXACTE'::quote_kind,
  'Dans l''ensemble, nous avons constaté que les États-providence des pays de résidence et d''origine traitent encore les immigrants et les émigrants différemment de leurs propres citoyens. Malgré les bonnes intentions de nombreuses administrations, le statut juridique, la nationalité et les ressources financières et éducatives des individus déterminent encore l''accès aux prestations.',
  'Recherche comparative (40 pays) : l''accès aux prestations est conditionné par le statut juridique, selon le principe de résidence habituelle. Autrement dit, l''irrégularité du séjour ferme l''accès aux prestations non contributives — l''inverse d''un guichet ouvert à l''arrivée.',
  'https://theconversation.com/les-systemes-de-protection-sociale-europeens-sont-ils-accessibles-aux-etrangers-196539',
  null,
  '3c269cd8b395c2d8cb557e85a629d8af289ee591c78a72a62d628b2354da6a69',
  null,
  'https://fr.wikipedia.org/wiki/Jean-Michel_Lafleur',
  6
);

delete from public.dossiers where slug = 'petain-vichy-ont-ils-protege-les-juifs-francais';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, is_published, published_at
) values (
  'f185a0ee-094c-42bb-b75d-ef1517393fd4',
  'petain-vichy-ont-ils-protege-les-juifs-francais',
  'Le maréchal Pétain et le régime de Vichy ont protégé les Juifs français',
  'FAUX'::verdict_status,
  'Le premier statut des Juifs est adopté par l''État français « de sa propre initiative, et sans pression nazie », et Pétain l''a personnellement annoté et durci — jusqu''à rayer l''exception qui épargnait les descendants de Juifs nés français avant 1860. Environ 25 000 des 80 000 victimes de la Shoah en France étaient de nationalité française, et la rafle du Vél'' d''Hiv'' a été exécutée par 450 policiers et gendarmes français. La thèse d''un Pétain protecteur est contredite par les archives, les historiens et le discours de Jacques Chirac du 16 juillet 1995.',
  'HISTOIRE'::dossier_category,
  '[{"name":"Philippe Pétain","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Philippe_P%C3%A9tain","note":"Chef de l''État français : il a annoté et durci le projet de statut des Juifs d''octobre 1940."},{"name":"Régime de Vichy","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/R%C3%A9gime_de_Vichy","note":null},{"name":"Loi portant statut des Juifs","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Loi_portant_statut_des_Juifs","note":"Premier statut des Juifs, promulgué le 3 octobre 1940 par le régime de Vichy."},{"name":"Rafle du Vélodrome d''Hiver","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Rafle_du_V%C3%A9lodrome_d%27Hiver","note":"Rafle des 16 et 17 juillet 1942, exécutée par la police française."},{"name":"Serge Klarsfeld","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Serge_Klarsfeld","note":"A révélé en 2010 le projet de statut annoté par Pétain."},{"name":"Laurent Joly","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Laurent_Joly","note":"Directeur de recherche au CNRS, historien de l''antisémitisme sous l''Occupation."},{"name":"Jacques Chirac","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Jacques_Chirac","note":"A reconnu en 1995 la responsabilité de l''État français dans la déportation."}]'::jsonb,
  100,
  '[{"claim_part":"« Le statut des Juifs a été imposé par les Allemands »","status":"FAUX","detail":"Le statut du 3 octobre 1940 est adopté par l''État français « de sa propre initiative, et sans pression nazie » (Mémorial de la Shoah) ; il s''applique aux deux zones, y compris la zone libre où aucun occupant n''est présent."},{"claim_part":"« Vichy a protégé les Juifs français »","status":"FAUX","detail":"Pétain a annoté et durci le projet : suppression de l''exception des descendants de Juifs nés ou naturalisés avant 1860, extension des exclusions professionnelles — « tous les juifs sont stigmatisés » (INA). Environ 25 000 Juifs de nationalité française figurent parmi les victimes de la Shoah en France."},{"claim_part":"« Vichy a sacrifié les étrangers pour sauver les Français »","status":"FAUX","detail":"La collaboration policière de l''État français « a grandement aggravé le sort des Juifs » (Laurent Joly, CNRS) : la rafle du Vél'' d''Hiv'' (16-17 juillet 1942) est exécutée par la police française et la déportation frappe les Juifs français comme étrangers, dans les mêmes convois."}]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '616b0cfe-595d-4a5f-af69-03518d8520c4',
  'f185a0ee-094c-42bb-b75d-ef1517393fd4',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Loi du 3 octobre 1940 portant statut des Juifs (publiée au Journal officiel du 18 octobre 1940)',
  'État français (régime de Vichy)',
  '1940-10-03',
  'CITATION_EXACTE'::quote_kind,
  'Est regardé comme juif, pour l''application de la présente loi, toute personne issue de trois grands-parents de race juive ou de deux grands-parents de la même race, si son conjoint lui-même est juif.',
  'Le texte définit qui est « juif » et ferme aux Juifs la fonction publique, l''armée, l''enseignement, la presse, etc. L''exemplaire de travail annoté de la main de Pétain a été révélé par Serge Klarsfeld en 2010 et remis au Mémorial de la Shoah.',
  'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000869361',
  null,
  '03c6d2a1a3b8d80c53e41d974ead9153252757fe01f75eed7ffe8ceeb4b2a680',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'b9da4f25-e144-41a1-a6fd-efd71b8bd435',
  'f185a0ee-094c-42bb-b75d-ef1517393fd4',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Allocution au 53e anniversaire de la rafle du Vél'' d''Hiv''',
  'Jacques Chirac, président de la République',
  '1995-07-16',
  'CITATION_EXACTE'::quote_kind,
  'Oui, la folie criminelle de l''occupant a été secondée par des Français, par l''Etat français. Il y a cinquante-trois ans, le 16 juillet 1942, 450 policiers et gendarmes français, sous l''autorité de leurs chefs, répondaient aux exigences des nazis.',
  'Première reconnaissance officielle, par un chef de l''État, de la responsabilité de l''État français dans la déportation des Juifs : rupture avec la thèse du « moindre mal » défendue par les partisans de Vichy.',
  'https://www.elysee.fr/jacques-chirac/1995/07/16/allocution-de-m-jacques-chirac-president-de-la-republique-sur-la-responsabilite-de-letat-francais-dans-la-deportation-des-juifs-durant-la-deuxieme-guerre-mondiale-et-sur-les-valeurs-de-liberte-de-justice-et-de-tolerance-qui-fondent-lidentite-franca',
  null,
  'f5c09b4cdaf2973245122bc1c109380258ed0fd8e4da471458fc0e61304ce544',
  null,
  'https://fr.wikipedia.org/wiki/Jacques_Chirac',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '42ac6d4f-63c6-4d2c-8d83-862d0155c06c',
  'f185a0ee-094c-42bb-b75d-ef1517393fd4',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Entretien avec Laurent Joly — la genèse du statut des Juifs',
  'Laurent Joly (CNRS), entretien avec Nathalie Peeters — Mémoire d''Auschwitz ASBL',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Ce que les archives prouvent indubitablement c''est que cette spécificité française qu''a été la collaboration d''État en matière d''arrestations a grandement aggravé le sort des Juifs.',
  'Entretien de novembre 2021. Joly répond directement à la thèse d''un Vichy protecteur : rien dans les archives ne l''étaye, et il relève « l''absence totale d''Allemands dans l''exécution de la grande rafle des 16 et 17 juillet 1942 à Paris et en banlieue ».',
  'https://www.auschwitz.be/images/_expertises/2021-peeters-joly_entretien.pdf',
  null,
  '9453ea1292f6700a9bec467d16f550f26dd453ad813898062a76543dd3e10ee2',
  null,
  'https://fr.wikipedia.org/wiki/Laurent_Joly',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '7369a48f-e531-488b-8122-e362e21b0243',
  'f185a0ee-094c-42bb-b75d-ef1517393fd4',
  'CENTRE'::political_spectrum,
  '3 octobre 1940, Pétain durcit la loi sur le statut des Juifs',
  'INA (Institut national de l''audiovisuel) — dossier « éclair''actu »',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Ce brouillon annoté est un élément à charge à l''encontre du maréchal. Il montre clairement la responsabilité du chef de l''Etat dans l''élaboration de ce texte et sa volonté de durcir le caractère antisémite du statut de la communauté juive.',
  'Le dossier de l''INA rappelle le détail des annotations (professions interdites élargies, exception des Juifs présents en France depuis longtemps supprimée) et résume le reportage de 2010 : « à chaque fois que l''écriture du maréchal Pétain intervient dans le document, c''est pour aggraver le statut des juifs ».',
  'https://www.ina.fr/ina-eclaire-actu/3-octobre-1940-petain-durcit-la-loi-sur-le-statut-des-juifs',
  null,
  '76dd52fcd53cdfcd3b8de040ba0203a8786cf6ab0996ab6057b1f7936ced95fa',
  null,
  null,
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '1e77286b-a57f-46b8-bac9-424415cf1aeb',
  'f185a0ee-094c-42bb-b75d-ef1517393fd4',
  'CENTRE'::political_spectrum,
  'La Shoah en France — l''initiative du statut des Juifs',
  'Mémorial de la Shoah',
  null,
  'CITATION_EXACTE'::quote_kind,
  'De sa propre initiative, et sans pression nazie, l''État français adopte le 3 octobre une loi définissant le « statut des Juifs ».',
  'La page retrace la séquence : révision des naturalisations de 1927 (juillet 1940, environ 8 000 Juifs dénaturalisés), puis le statut applicable en zone occupée comme en zone libre. Vichy l''a présenté comme un projet souverain.',
  'https://1942.memorialdelashoah.org/la-shoah-en-france.html',
  null,
  'd39dca35dc905b4a0ced6c4c23d5e94534ccdeecc3afd729459b7fd37afd42e2',
  null,
  null,
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'dbb02b95-fc8b-49e3-8140-efdeb5a67735',
  'f185a0ee-094c-42bb-b75d-ef1517393fd4',
  'CENTRE'::political_spectrum,
  'La Shoah en France — le bilan des victimes',
  'Mémorial de la Shoah',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Sur les 80 000 victimes de la Shoah en France, 55 000 sont des Juifs étrangers et 25 000 des Juifs de nationalité française.',
  '76 000 personnes ont été déportées de France, dont environ 11 400 enfants ; les Juifs de nationalité française — que Pétain était censé « protéger » — comptent pour près d''un tiers des victimes.',
  'https://1942.memorialdelashoah.org/la-shoah-en-france.html',
  null,
  'aba5ade5f7b3624a1b908b7bd78556b012692110905aea44556481315eb9ef2d',
  null,
  null,
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '75cfdd0b-89ea-4802-8570-bfef2154760f',
  'f185a0ee-094c-42bb-b75d-ef1517393fd4',
  'GAUCHE'::political_spectrum,
  'Un document réduit en miettes le mythe de Pétain protecteur des Juifs',
  'L''Humanité (d''après Reuters et AFP)',
  '2010-10-03',
  'CITATION_EXACTE'::quote_kind,
  '« On ne savait pas jusque-là que Philippe Pétain avait annoté ce texte du 3 octobre 1940 et qu''il l''avait aggravé », dit-il.',
  'Réaction de Serge Klarsfeld à la publication du projet annoté, authentifié puis remis au Mémorial de la Shoah par un donateur anonyme. L''article détaille les annotations : exclusion de « tous les membres du corps enseignant », interdiction des sièges dans toute assemblée issue de l''élection, suppression de l''exception des descendants de Juifs nés français ou naturalisés avant 1860.',
  'https://www.humanite.fr/societe/-/un-document-reduit-en-miettes-le-mythe-de-petain-protecteur-des-juifs',
  null,
  'c57eaadbd0acc355fe40602f5fa70bc4780ab689f3406555f89a01aa35374793',
  null,
  null,
  7
);

delete from public.dossiers where slug = 'cout-immigration-budget-france';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, is_published, published_at
) values (
  'bf081aa5-d711-4510-bb25-b426ae7ffa46',
  'cout-immigration-budget-france',
  'L''immigration coûte des dizaines de milliards d''euros par an à la France',
  'FAUX'::verdict_status,
  'Les évaluations convergent vers un solde faible ou quasi nul : sur 1979-2011, la contribution nette des immigrés aux finances publiques françaises est restée bornée entre - 0,5 % et + 0,05 % du PIB et n''a jamais déterminé le solde budgétaire primaire (CEPII) ; dans les 25 pays de l''OCDE pour lesquels des données existent, les impôts et cotisations des immigrés ont en moyenne dépassé les dépenses publiques qui leur sont consacrées en 2006-2018 (OCDE, rapport 2021). La structure par âge — population surreprésentée dans les classes actives — compense une contribution plus faible à âge donné.',
  'ECONOMIE'::dossier_category,
  '[{"name":"Immigration en France","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Immigration_en_France","note":"Le débat budgétaire porte sur la contribution nette des immigrés aux finances publiques françaises."},{"name":"Organisation de coopération et de développement économiques","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Organisation_de_coop%C3%A9ration_et_de_d%C3%A9veloppement_%C3%A9conomiques","note":null},{"name":"Centre d''études prospectives et d''informations internationales","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Centre_d%27%C3%A9tudes_prospectives_et_d%27informations_internationales","note":"Auteurs de l''évaluation comptable de la contribution des immigrés aux finances publiques (1979-2011)."},{"name":"Insee","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Institut_national_de_la_statistique_et_des_%C3%A9tudes_%C3%A9conomiques","note":"Source des statistiques d''activité et d''emploi de la population immigrée."},{"name":"Terra Nova","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Terra_Nova_(think_tank)","note":"Think tank progressiste ; note sur la place des étrangers non européens dans les métiers en tension."}]'::jsonb,
  95,
  '[{"claim_part":"« Les immigrés coûtent plus cher en aides qu''ils ne rapportent »","status":"FAUX","detail":"Les évaluations convergent vers un solde faible : contribution nette bornée entre - 0,5 % et + 0,05 % du PIB sur 1979-2011 (CEPII) ; impôts et cotisations supérieurs aux dépenses consacrées aux immigrés (protection sociale, santé, éducation) en moyenne 2006-2018 dans les 25 pays OCDE étudiés. La population immigrée est surreprésentée dans les classes d''âge actives, où les cotisations versées dépassent les prestations reçues."},{"claim_part":"« Le déficit de l''État est causé par l''immigration »","status":"CONFUSION_CONCEPTUELLE","detail":"Le CEPII conclut qu''« à aucun moment l''immigration n''a déterminé l''ampleur et l''évolution du solde budgétaire primaire » (1979-2011). Le déficit public s''explique d''abord par le vieillissement démographique (retraites, santé) et les cycles économiques : l''effet migratoire est marginal en comparaison."}]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'a16671de-0ef0-4a69-a745-2d285453a60a',
  'bf081aa5-d711-4510-bb25-b426ae7ffa46',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'L''essentiel sur… les immigrés et les étrangers — situation face à l''emploi',
  'Insee (France)',
  null,
  'FAIT_DOCUMENTE'::quote_kind,
  'En 2025, parmi les personnes de 15 à 64 ans, 80 % des hommes immigrés sont actifs, une proportion proche des 78 % des hommes non-immigrés ; les immigrés occupent plus fréquemment que l''ensemble de la population des postes d''ouvriers (26 % contre 18 %).',
  'Chiffres de l''Insee sur l''insertion professionnelle : taux d''activité et d''emploi masculins proches de ceux des non-immigrés et forte part d''ouvriers. Cette population insérée cotise aux régimes sociaux ; l''évaluation de la contribution nette relève des travaux du CEPII et de l''OCDE cités dans ce dossier.',
  'https://www.insee.fr/fr/statistiques/3633212',
  null,
  '46cbf22961b09c0306bcfbc1d3c0ba9ec58b096c8b21341ed2b1c783737d3fee',
  null,
  'https://fr.wikipedia.org/wiki/Institut_national_de_la_statistique_et_des_%C3%A9tudes_%C3%A9conomiques',
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '0eb42382-12e6-4e63-a38d-e03106f5e1ee',
  'bf081aa5-d711-4510-bb25-b426ae7ffa46',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'La Lettre du CEPII n° 394 — L''impact sur les finances publiques de 30 ans d''immigration en France',
  'Xavier Chojnicki, Lionel Ragot et Ndeye-Penda Sokhna (CEPII)',
  '2018-12-01',
  'CITATION_EXACTE'::quote_kind,
  'Les estimations réalisées montrent que, sur l''ensemble de la période étudiée, la contribution des immigrés en pourcentage du PIB est relativement faible (entre - 0,5 % et + 0,05 %). À aucun moment l''immigration n''a déterminé l''ampleur et l''évolution du solde budgétaire primaire.',
  'Méthode comptable désagrégeant le solde budgétaire primaire français entre la population immigrée et les natifs, sur 1979-2011 ; la contribution nette reste faible et ne détermine jamais le solde.',
  'https://www.cepii.fr/CEPII/fr/publications/lettre/abstract.asp?NoDoc=11997',
  null,
  '5afb64fa31559bc36ffbdea04733d9b8044eae50701a6c971adebfde34f54704',
  null,
  'https://fr.wikipedia.org/wiki/Centre_d%27%C3%A9tudes_prospectives_et_d%27informations_internationales',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'b8433f78-185c-40d5-aa73-57a2b5ab789d',
  'bf081aa5-d711-4510-bb25-b426ae7ffa46',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Perspectives des migrations internationales 2021 — incidence budgétaire de l''immigration',
  'OCDE',
  '2021-10-28',
  'CITATION_EXACTE'::quote_kind,
  'Dans les 25 pays de l''OCDE pour lesquels des données sont disponibles, en moyenne au cours de la période 2006-18, la contribution des immigrés sous la forme d''impôts et de cotisations a été supérieure aux dépenses publiques consacrées à leur protection sociale, leur santé et leur éducation.',
  'Chapitre spécial de l''édition 2021 : contribution budgétaire nette des immigrés calculée pays par pays et année par année depuis le milieu des années 2000. Passage de synthèse relevé sur la page officielle de la publication.',
  'https://www.oecd.org/fr/publications/perspectives-des-migrations-internationales-2021_da2bbd99-fr.html',
  null,
  '853aeba50c5e4269613b9e7d6c3794f8bb53cf0d4046e98aca61ab48fe51d6e4',
  null,
  'https://fr.wikipedia.org/wiki/Organisation_de_coop%C3%A9ration_et_de_d%C3%A9veloppement_%C3%A9conomiques',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'be25739e-eea9-43e3-92ea-92e06745b4da',
  'bf081aa5-d711-4510-bb25-b426ae7ffa46',
  'GAUCHE'::political_spectrum,
  'Immigration et emploi en France : décodage d''une radiographie manipulée',
  'Paul-André Romain (Terra Nova)',
  '2026-10-15',
  'CITATION_EXACTE'::quote_kind,
  'Si l''on tient compte de ces poids démographiques, les étrangers non européens apparaissent généralement surreprésentés dans de nombreux métiers en tension, tant en Île-de-France qu''en province (restauration, hôtellerie, bâtiment, agroalimentaire, etc.).',
  'Note du think tank progressiste Terra Nova répondant à une étude de l''Observatoire de l''immigration et de la démographie : rapportés aux poids démographiques, les étrangers non européens apparaissent surreprésentés dans de nombreux métiers en tension, en Île-de-France comme en province.',
  'https://tnova.fr/societe/immigration-integration-non-discrimination/immigration-et-emploi-en-france-decodage-dune-radiographie-manipulee/',
  null,
  '2389fb8abe6efdc3efbca117f29a4c0441119249214bcff9212b9ba17a904181',
  null,
  'https://fr.wikipedia.org/wiki/Terra_Nova_(think_tank)',
  3
);

delete from public.dossiers where slug = 'brouillon-de-controle-rls';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, is_published, published_at
) values (
  '8adc1cd9-e4d3-44e6-01ac-7e8f9a0b1c29',
  'brouillon-de-controle-rls',
  'Brouillon de contrôle RLS (jamais publié)',
  'TROMPEUR'::verdict_status,
  'Ce brouillon existe pour vérifier que la lecture publique ne rend que les dossiers publiés. Il ne doit apparaître sur aucune page.',
  'SOCIETE'::dossier_category,
  '[]'::jsonb,
  0,
  '[]'::jsonb,
  false,
  null
);
