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
  'Contrairement au marxisme, le socialisme [national-socialiste] ne répudie pas la propriété privée ; contrairement au marxisme, il n''implique aucune négation de la personnalité et, contrairement au marxisme, il est patriotique.',
  'L''article paraît sous le titre « When I Take Charge of Germany — Hitler Shows His Hand » (Liberty, vol. 9 n° 28, 9 juillet 1932). Hitler y revendique explicitement une redéfinition du mot « socialisme » contre la gauche marxiste, en garantissant la propriété privée ; la citation française traduit l''anglais publié.',
  'https://alphahistory.com/nazigermany/hitler-nazi-form-of-socialism-1932/',
  null,
  '9927a610cdc82b1265473a253c87125d2d93aa02a6bbbca5b32d04e221f1553a',
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
  'https://archive.org/details/HitlerAdolfAddressToTheIndustryClubInDuesseldorfOn27thJanuary1932EN24S.Text',
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
  'https://www.bundestag.de/dokumente/textarchiv/1933-03-23-ermaechtigungsgesetz-938540',
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
  'https://www.dhm.de/lemo/kapitel/ns-regime/etablierung-der-ns-herrschaft/zerschlagung-der-gewerkschaften.html',
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
  'Entre 1934 et 1937, le gouvernement nazi transfère massivement des entreprises publiques au secteur privé (acier, mines, banque, transports maritimes, chemins de fer) — à rebours des tendances dominantes des pays capitalistes occidentaux, dont aucun ne reprivatise systématiquement d''entreprises dans les années 1930.',
  'Étude évaluée par les pairs qui documente le sens du transfert de propriété sous le IIIe Reich : de l''État vers les grands groupes privés, et non l''inverse.',
  'https://doi.org/10.1111/j.1468-0289.2009.00473.x',
  null,
  '104321c1ab5d12aa2d4f86276093013dd2064472a5d6bd204aa850fb84b7367e',
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
  'Pour l''année 2024, le coût total réel de l''AME, toutes AME incluses, est de 1 386,8 millions d''euros, soit une hausse de 15,5 % par rapport à 2023, et de 67,6 % en 10 ans, représentant 543 millions d''euros.',
  'Le rapport plaide pour une réforme mais documente surtout les chiffres : dépense moyenne de 2 396,4 € par bénéficiaire en 2023 (inférieure à celle de l''ensemble de la population), sous-budgétisation par l''État (dette de 185,1 M€ envers l''Assurance maladie en 2024) et exclusions explicites (cures thermales, PMA, médicaments à faible service médical rendu).',
  'https://www.senat.fr/rap/r24-841/r24-841_mono.html',
  null,
  '122f7088dc93b17e9ae1b79a3a2f5a2e60fdb4533f535241faed2cecc82150d7',
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
  'Il se dégage le constat d''un dispositif sanitaire utile, maîtrisé pour l''essentiel mais exposé à l''augmentation récente du nombre de ses bénéficiaires, en conséquence du nombre de personnes en situation irrégulière présentes sur le territoire, et qui mérite d''être adapté.',
  'Mission commandée par le gouvernement et confiée à Claude Évin (ancien ministre) et Patrick Stefanini (conseiller d''État) : elle conclut à l''utilité sanitaire du dispositif et propose un resserrement (vérifications renforcées, accord préalable étendu), jamais sa suppression. Ses conclusions sont invoquées dans le débat par les deux bords.',
  'https://www.vie-publique.fr/files/rapport/pdf/292122.pdf',
  null,
  '042c935c2e38151a04f3e8c9e5bb4768254bb669cd725dea9b5e9d2e148ad20c',
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
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'e32d9172-3510-40b6-8e88-f793fe95623b',
  'ec66bd00-fb41-4eaf-b5aa-47600ef03889',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Questions d''économie de la santé n° 280 — Accès aux soins et lieux de soins usuels des personnes sans titre de séjour couvertes par l''AME',
  'Antoine Marsaudon, Florence Jusot, Jérôme Wittwer et Paul Dourgnon (Irdes)',
  '2023-07-01',
  'CITATION_EXACTE'::quote_kind,
  'Quand la durée de la couverture par l''AME augmente, la probabilité de consulter en cabinet médical ou en centre de santé s''accroît, alors que celle de recourir aux urgences ou dans une association diminue.',
  'Étude sur données de l''enquête Premiers pas (Paris et agglomération de Bordeaux, 2019) : la couverture par l''AME est associée à un non-recours aux soins moins fréquent et à une réorientation du recours, des urgences et des associations vers la médecine de ville — l''effet direct sur les soins tardifs évités.',
  'https://www.irdes.fr/recherche/questions-d-economie-de-la-sante/280-acces-aux-soins-et-lieux-de-soins-usuels-des-personnes-sans-titre-de-sejour-couvertes-par-l-ame.pdf',
  null,
  '60ef37f837ac103e9e889290b3eeb22b66ea07a9b6a2c827a4b5c10f7cddee70',
  null,
  'https://fr.wikipedia.org/wiki/Institut_de_recherche_et_documentation_en_%C3%A9conomie_de_la_sant%C3%A9',
  7
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
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '82f0e4ee-6912-4a74-9457-d62ea683922f',
  '0fa4f772-df1e-4c20-bf04-b0023a6b2234',
  'CENTRE'::political_spectrum,
  'Décision n° 2011-137 QPC du 17 juin 2011 — M. Zeljko S. (attribution du revenu de solidarité active aux étrangers)',
  'Conseil constitutionnel (République française)',
  '2011-06-17',
  'CITATION_EXACTE'::quote_kind,
  'qu''en réservant le bénéfice du revenu de solidarité active à ceux qui, parmi les étrangers, sont titulaires depuis au moins cinq ans d''un titre de séjour les autorisant à travailler, le législateur a institué entre les Français et les étrangers, d''une part, et entre les étrangers, d''autre part, selon qu''ils ont ou non une résidence stable en France, une différence de traitement en rapport direct avec l''objet de la loi ; qu''il a fixé un critère qui n''est pas manifestement inapproprié au but poursuivi',
  'Saisi d''une question prioritaire de constitutionnalité, le Conseil constitutionnel valide l''article L. 262-4 : « Article 1er. — L''article L. 262-4 du code de l''action sociale et des familles est conforme à la Constitution. » La condition des cinq ans de titre de séjour pour les étrangers non couverts par un statut protégé est donc un choix légal assumé, contrôlé et confirmé.',
  'https://www.conseil-constitutionnel.fr/decision/2011/2011137QPC.htm',
  null,
  '06d5ce64469c282b91e30df0765cd643ce618d078a140c9b791485cadae205f3',
  null,
  'https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)',
  7
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
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '9dca84cd-d84c-49c2-a503-212d535bf6a8',
  'f185a0ee-094c-42bb-b75d-ef1517393fd4',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Vichy France and the Jews — préface de la deuxième édition',
  'Michael R. Marrus et Robert O. Paxton (Stanford University Press)',
  '2019-08-01',
  'CITATION_EXACTE'::quote_kind,
  'Without prompting from the German occupation authorities (who wanted at first only to expel German Jews into the unoccupied parts of France), Vichy France launched its own anti-Jewish program.',
  'Préface de la deuxième édition (août 2019) de l''ouvrage de référence sur la France de Vichy et les Juifs. Traduction : « Sans y avoir été poussée par les autorités d''occupation allemandes (qui ne voulaient d''abord qu''expulser les Juifs allemands vers la zone non occupée), la France de Vichy lança son propre programme antijuif. » Les auteurs y confirment, archives françaises et allemandes à l''appui, leurs conclusions de 1981.',
  'https://www.sup.org/books/history/vichy-france-and-jews/excerpt/preface',
  null,
  '96ae8b52c067d54eeffe9ff806f43cd00a9cfb1d0ac53711745a74440eef81db',
  null,
  'https://fr.wikipedia.org/wiki/Robert_Paxton',
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '702297ab-2061-4e66-962a-97cb84710050',
  'f185a0ee-094c-42bb-b75d-ef1517393fd4',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Loi du 4 octobre 1940 relative aux ressortissants étrangers de race juive (internement dans des camps spéciaux)',
  'Journal officiel de l''État français (régime de Vichy) — texte sur Légifrance',
  '1940-10-04',
  'CITATION_EXACTE'::quote_kind,
  'Les ressortissants étrangers de race juive pourront, à dater de la promulgation de la présente loi, être internés dans des camps spéciaux par décision du préfet du département de leur résidence.',
  'Votée le lendemain de la promulgation du premier statut des Juifs, cette loi autorise l''internement administratif des Juifs étrangers par simple décision préfectorale — dans les camps du sud de la France (Gurs, Rivesaltes, les Milles…). Loin de « protéger », le régime organisait lui-même l''enfermement.',
  'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000571814',
  null,
  'd316cfd261634b8dfe0895ee9b6e70be5e4afd20602ed08396f4029fcac4f7b2',
  null,
  null,
  9
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
  'En 2025, parmi les personnes de 15 à 64 ans, 80 % des hommes immigrés sont actifs, c''est-à-dire qu''ils occupent un emploi ou en cherchent un. Cette proportion est proche de celle observée parmi les hommes non-immigrés (78 %). (...) Les immigrés occupent plus fréquemment que l''ensemble de la population des postes d''ouvriers (26 % contre 18 %) et moins souvent ceux de professions intermédiaires (17 % contre 26 %).',
  'Chiffres de l''Insee sur l''insertion professionnelle : taux d''activité et d''emploi masculins proches de ceux des non-immigrés et forte part d''ouvriers. Cette population insérée cotise aux régimes sociaux ; l''évaluation de la contribution nette relève des travaux du CEPII et de l''OCDE cités dans ce dossier.',
  'https://www.insee.fr/fr/statistiques/3633212',
  null,
  '10fb1001fed09d2bf3f5b4cdff88df2c0dd0cabf2150bb98fa7b855c46df5876',
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

delete from public.dossiers where slug = 'immigration-insecurite-criminalite-france';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, is_published, published_at
) values (
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'immigration-insecurite-criminalite-france',
  'L''immigration est la cause principale de la hausse des crimes et délits en France',
  'FAUX'::verdict_status,
  'Aucune donnée ne soutient un rôle causal de l''immigration : en 2024, la très large majorité des personnes mises en cause sont de nationalité française (84 à 85 % pour les violences physiques, 88 % pour l''usage de stupéfiants — SSMSI). La surreprésentation observée dans certaines statistiques s''explique par des mécanismes quasi mécaniques (délits spécifiques au séjour) et des facteurs sociologiques (âge, sexe, précarité) : à situation comparable, la nationalité n''est pas un facteur explicatif, et les sortants de prison étrangers récidivent moins que les Français.',
  'SOCIETE'::dossier_category,
  '[{"name":"Immigration en France","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Immigration_en_France","note":"Le débat porte sur le lien allégué entre immigration et délinquance enregistrée."},{"name":"Service statistique ministériel de la sécurité intérieure","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Service_statistique_minist%C3%A9riel_de_la_s%C3%A9curit%C3%A9_int%C3%A9rieure","note":"Source des statistiques officielles de la délinquance enregistrée (données des mis en cause)."},{"name":"Laurent Mucchielli","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Laurent_Mucchielli","note":"Sociologue (CNRS), ancien directeur du CESDIP (2004-2009)."},{"name":"Ministère de la Justice (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_la_Justice_(France)","note":"Publications statistiques sur la détention et la récidive (SDSE, administration pénitentiaire)."}]'::jsonb,
  95,
  '[{"claim_part":"« Les étrangers commettent la majorité des crimes et délits »","status":"FAUX","detail":"En 2024, les auteurs de violences physiques sont de nationalité française dans 84 % (intrafamiliales) et 85 % (hors cadre familial) des cas résolus ; 88 % des mis en cause pour usage de stupéfiants sont français (SSMSI, « Insécurité et délinquance en 2024 », fiches violences physiques et stupéfiants). Les mis en cause étrangers représentent 15 à 16 % des violences physiques, pour environ 8 % de la population."},{"claim_part":"« La nationalité explique la délinquance »","status":"CONFUSION_CONCEPTUELLE","detail":"La délinquance de rue est d''abord le fait d''hommes jeunes et précaires, surreprésentés dans les statistiques des mis en cause : « l''examen rigoureux des statistiques policières ne permet pas de mesurer la délinquance des étrangers » (Mucchielli, CNRS-CESDIP). Le ministère de la Justice mesure même une récidive plus faible des sortants étrangers (- 3,9 points) et un effet du faible niveau d''étude (+ 3,3 points) : ce sont le décrochage scolaire et la précarité qui pèsent, pas la nationalité."}]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '05c12af9-831a-47e4-9391-946eb5c9ba05',
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Insécurité et délinquance en 2024 : bilan statistique (fiches violences physiques et stupéfiants)',
  'SSMSI — Service statistique ministériel de la sécurité intérieure (ministère de l''Intérieur)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Les auteurs sont pour la plupart de nationalité française (respectivement 84 % et 85 %). La part des mis en cause de nationalités étrangères est de l''ordre de 15 à 16 % alors que les nationalités étrangères représentent 8 % de la population française.',
  'Bilan statistique annuel du SSMSI (9e édition, année 2024) : sur les violences physiques, 84 % des mis en cause (intrafamiliales) et 85 % (hors cadre familial) sont de nationalité française ; 88 % des mis en cause pour usage de stupéfiants le sont également. Les étrangers représentent environ 8 % de la population résidant en France.',
  'https://www.interieur.gouv.fr/fr/content/download/138329/1093108/file/SSMSI-BA2024.pdf',
  null,
  '595f4d4531593f8df398cd86421cb9bc86eb75674fac7483fd9f54e3ea493fcd',
  null,
  'https://fr.wikipedia.org/wiki/Service_statistique_minist%C3%A9riel_de_la_s%C3%A9curit%C3%A9_int%C3%A9rieure',
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'cbb05fa7-4845-4448-b027-1e2a29ed0825',
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Délinquance et immigration en France : un regard sociologique — résumé de l''article (Criminologie, vol. 36, n° 2)',
  'Laurent Mucchielli (CNRS, CESDIP)',
  '2003-01-01',
  'CITATION_EXACTE'::quote_kind,
  'L''examen rigoureux des statistiques policières ne permet pas de mesurer la délinquance des étrangers. Il invite toutefois à distinguer une délinquance professionnelle des étrangers non résidents d''une délinquance d''étrangers résidents qui s''apparente aux vols et aux violences physiques classiquement observés dans les couches les plus pauvres de la population.',
  'Synthèse critique des connaissances (données administratives et travaux sociologiques quantitatifs et qualitatifs). Le résumé de l''article précise aussi que la sur-représentation locale des jeunes issus de l''immigration africaine n''est « pas uniforme sur le territoire national » et renvoie à des contextes locaux.',
  'https://www.erudit.org/fr/revues/crimino/2003-v36-n2-crimino701/007865ar/',
  null,
  'a89ca26a0db6297c8dd88984b80ebdd096f335ecfaae7a6a32bdaee78fb6854d',
  null,
  'https://fr.wikipedia.org/wiki/Laurent_Mucchielli',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '24db7b87-e9fb-4a81-a30d-596c8daf2517',
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Pourquoi le lien entre immigration et délinquance est une illusion',
  'Arnaud Philippe (University of Bristol) et Jérôme Valette (CEPII), The Conversation',
  '2023-05-21',
  'CITATION_EXACTE'::quote_kind,
  'Immigration et délinquance ne sont donc pas liées, une fois les raisonnements simplificateurs écartés. Au contraire, si la surreprésentation quasi mécanique des immigrés dans les statistiques peut créer l''illusion d''une relation entre immigration et délinquance, les études rigoureuses montrent qu''il n''en est rien.',
  'Analyse des mécanismes de la surreprésentation : délits que seuls des étrangers peuvent commettre (séjour irrégulier, travail sans titre), élucidations immédiates, effets de ciblage statistique. Repères : 7,4 % d''étrangers dans la population en 2019, mais 14 % des auteurs d''affaires traitées par la justice.',
  'https://theconversation.com/pourquoi-le-lien-entre-immigration-et-delinquance-est-une-illusion-205603',
  null,
  'd4c569fef2229aae2723bc024ac825fb22435e4d4e57ce372cb495be45aab26e',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '2fa64508-d93d-44f6-975e-9e344fb9237f',
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Infostat Justice n° 183 — Mesurer et comprendre les déterminants de la récidive des sortants de prison',
  'Frédérique Cornuau et Marianne Juillard (SDSE, ministère de la Justice)',
  '2021-07-01',
  'CITATION_EXACTE'::quote_kind,
  'Par ailleurs, le risque de récidive des sortants de prison étrangers est réduit de 3,9 points. La situation matrimoniale joue un rôle significatif : être marié réduit de 4,9 points le risque de récidive par rapport au fait d''être célibataire. Un faible niveau d''étude semble augmenter le risque (+ 3,3 points pour un niveau élémentaire ou pré-élémentaire par rapport à un niveau lycée).',
  'Étude statistique du service statistique ministériel de la justice sur une cohorte de sortants de prison : ce sont le niveau d''études, la situation familiale et l''âge qui pèsent sur la récidive ; la nationalité étrangère est associée à un risque plus faible (- 3,9 points).',
  'https://www.justice.gouv.fr/sites/default/files/migrations/portail/art_pix/stat_Infostat_183.pdf',
  null,
  '3ba7dad8e9ba25750d603cc11743b647c1a1b54c68c0452414845971a1f5968b',
  null,
  'https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_la_Justice_(France)',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '07220d69-5c22-4986-8f83-b6c219bf1f43',
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Cahiers d''études pénitentiaires et criminologiques n° 25 — Étrangers incarcérés',
  'Angélique Hazard (direction de l''administration pénitentiaire, ministère de la Justice)',
  '2008-10-01',
  'CITATION_EXACTE'::quote_kind,
  'En 2007, les ILE restent toutefois le premier poste d''incarcération des étrangers originaires d''Afrique (Maghreb 17 %, Afrique hors Maghreb 22 %) et des pays hors Union européenne (22 %).',
  'Les « infractions à la législation sur les étrangers » (ILE : entrée et séjour irréguliers, mesures d''expulsion, aide à l''entrée) sont des délits spécifiques au statut de séjour, concentrés sur les personnes étrangères : en 2007, 57 % concernaient l''entrée et le séjour et 33 % une mesure d''expulsion. Leur poids dans les statistiques ne dit rien d''une délinquance de droit commun.',
  'https://www.justice.gouv.fr/sites/default/files/2023-05/CahEtudesPenitCrim25.pdf',
  null,
  '7775ee406e623f300e7e4c1d308f353c5dbe93445ddbb911dce627477646f49b',
  null,
  'https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_la_Justice_(France)',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '16746a6a-a473-41a9-aec1-85e7dc7f2e17',
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'GAUCHE'::political_spectrum,
  'Immigration : la voix des sciences sociales (dossier)',
  'La Vie des idées (La rédaction)',
  '2023-12-21',
  'CITATION_EXACTE'::quote_kind,
  'La focalisation médiatique sur quelques faits divers fait écran : l''ordre public n''est pas menacé par l''immigration.',
  'Dossier publié au lendemain de l''adoption de la loi immigration du 19 décembre 2023 : il recense les travaux des sciences sociales sur les questions instrumentalisées, dont celle du lien entre immigration et délinquance — la section correspondante renvoie aux recherches sur les statistiques pénales et leur construction.',
  'https://laviedesidees.fr/Immigration-la-voix-des-sciences-sociales',
  null,
  '40a8556b27dae7405a2e8a42f5d62f4a7c4cd988fb0faccd7bdca28944d27738',
  null,
  'https://fr.wikipedia.org/wiki/La_Vie_des_id%C3%A9es',
  5
);

delete from public.dossiers where slug = 'expulsion-etrangers-delinquants-juges-et-droit';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, is_published, published_at
) values (
  '054e7ed1-684a-4161-8092-55af18bf6613',
  'expulsion-etrangers-delinquants-juges-et-droit',
  'Les juges et l''État de droit empêchent l''expulsion des étrangers délinquants',
  'FAUX'::verdict_status,
  'Le droit français et européen prévoient explicitement l''éloignement pour menace à l''ordre public : l''expulsion est ouverte sur ce fondement (CESEDA, art. L. 631-1) et l''article 8 de la Convention européenne des droits de l''homme autorise les ingérences « nécessaires à la sûreté publique… à la défense de l''ordre et à la prévention des infractions pénales ». L''échec de l''exécution tient à d''autres causes : la Cour des comptes relève qu''« autour de 10 % » des OQTF sont exécutées, du fait de l''identification incertaine des personnes, du manque de places en rétention et de la réticence des pays d''origine à délivrer les laissez-passer consulaires (57,5 % de délivrance dans les délais en 2024, selon la commission des lois du Sénat). Le contentieux n''annule qu''une minorité des mesures (18 % des OQTF en 2022).',
  'POLITIQUE'::dossier_category,
  '[{"name":"Obligation de quitter le territoire français","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Obligation_de_quitter_le_territoire_fran%C3%A7ais","note":"Mesure d''éloignement administrative au cœur du débat (prononcé, exécution, contentieux)."},{"name":"Cour des comptes (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)","note":null},{"name":"Sénat (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)","note":"Avis budgétaire de la commission des lois, tome « Immigration, asile et intégration » (2024)."},{"name":"Conseil d''État (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)","note":null}]'::jsonb,
  95,
  '[{"claim_part":"« Les traités internationaux interdisent d''expulser un étranger dangereux »","status":"FAUX","detail":"L''article 8 § 2 de la CEDH admet expressément les ingérences « nécessaires à la sécurité nationale, à la sûreté publique… à la défense de l''ordre et à la prévention des infractions pénales ». Le CESEDA permet à l''autorité administrative d''expulser un étranger dont la présence constitue une menace grave pour l''ordre public (art. L. 631-1), l''article L. 631-3 écartant même les protections de certaines catégories en cas de condamnation définitive à cinq ans ou plus d''emprisonnement."},{"claim_part":"« L''échec des expulsions résulte d''annulations systématiques par les juges »","status":"CONFUSION_CONCEPTUELLE","detail":"En 2022, les tribunaux administratifs ont annulé 18 % des OQTF qui leur étaient présentées (Cour des comptes) : une minorité, pas une annulation systématique. La Cour identifie d''autres causes premières : identification incertaine (20 à 30 % des personnes non identifiées avec certitude), capacité de rétention limitée (1 717 places pour 447 257 OQTF prononcées entre 2019 et 2022) et surtout réticence des pays d''origine à délivrer les laissez-passer consulaires, indispensables en l''absence de passeport."}]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '77f00ed8-6c03-44a4-b60b-a6264b92bd84',
  '054e7ed1-684a-4161-8092-55af18bf6613',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de l''entrée et du séjour des étrangers et du droit d''asile — articles L. 631-1 et L. 631-3',
  'Légifrance (République française)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'L''autorité administrative peut décider d''expulser un étranger lorsque sa présence en France constitue une menace grave pour l''ordre public, sous réserve des conditions propres aux étrangers mentionnés aux articles L. 631-2 et L. 631-3.',
  'Article L. 631-1 du CESEDA en vigueur : l''expulsion pour menace grave à l''ordre public est une faculté expresse de l''administration. L''article L. 631-3 énumère les protections résiduelles (résidence depuis l''âge de treize ans, vingt ans, dix ans avec mariage ou enfant français, état de santé) et les écarte notamment en cas de condamnation définitive pour des crimes ou délits punis de cinq ans ou plus d''emprisonnement, ou de trois ans en réitération.',
  'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042775403',
  null,
  'd0b7a8fd5803ebc72a8cf41d364239f02ec10fd65ba652236e49c1495363a4f9',
  null,
  null,
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'aaa8418c-e58e-4976-a7ca-4009715309c7',
  '054e7ed1-684a-4161-8092-55af18bf6613',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Convention de sauvegarde des droits de l''homme et des libertés fondamentales — article 8, § 2',
  'Conseil de l''Europe (texte reproduit par la CNCDH)',
  '1950-11-04',
  'CITATION_EXACTE'::quote_kind,
  'Il ne peut y avoir ingérence d''une autorité publique dans l''exercice de ce droit que pour autant que cette ingérence est prévue par la loi et qu''elle constitue une mesure qui, dans une société démocratique, est nécessaire à la sécurité nationale, à la sûreté publique, au bien-être économique du pays, à la défense de l''ordre et à la prévention des infractions pénales, à la protection de la santé ou de la morale, ou à la protection des droits et libertés d''autrui.',
  'L''article 8 protège la vie privée et familiale ; son § 2 énonce les motifs d''ingérence licite, dont la sûreté publique et la prévention des infractions pénales. Les traités n''interdisent donc pas l''éloignement d''un étranger dangereux : ils l''encadrent (licéité, nécessité, proportionnalité).',
  'https://www.cncdh.fr/sites/default/files/2022-02/cedh_0_1.pdf',
  null,
  '95433d2cc3ee2752ae8615fe15c9e32608bd6c8c5b0de09b7ba055a9d2b02980',
  null,
  'https://fr.wikipedia.org/wiki/Convention_europ%C3%A9enne_des_droits_de_l%27homme',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '647aff80-48e8-4fa5-bed6-511eccf0745a',
  '054e7ed1-684a-4161-8092-55af18bf6613',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Rapport public thématique — La politique de lutte contre l''immigration irrégulière (janvier 2024)',
  'Cour des comptes (France)',
  '2024-01-04',
  'CITATION_EXACTE'::quote_kind,
  'De nombreux pays d''origine sont réticents à délivrer un laissez-passer consulaire à leurs ressortissants, pourtant indispensable à leur éloignement en l''absence de passeport.',
  'Diagnostic de la Cour : malgré 447 257 OQTF prononcées entre 2019 et 2022, « seule une petite minorité — autour de 10 % — des obligations de quitter le territoire français sont exécutées ». Obstacles identifiés : identification incertaine (20 à 30 %), surveillance des CRA limitée par le manque de policiers (1 717 places) et réticence des pays d''origine — la Cour recommande de centraliser les demandes de laissez-passer consulaires. Autre volet : 18 % des OQTF ont été annulées par les tribunaux administratifs en 2022.',
  'https://www.ccomptes.fr/sites/default/files/2024-01/20240104-Politique-lutte-contre-immigration-irreguliere.pdf',
  null,
  '74998d92a628b62102e73eb37d1ee61da3b4e64da3d3ad5ea7c7bebf0062015c',
  null,
  'https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '1ddb54d6-f791-4011-8157-1ed281d33112',
  '054e7ed1-684a-4161-8092-55af18bf6613',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Sénat — Avis n° 150 (2024-2025), commission des lois, tome II « Immigration, asile et intégration » (PLF 2025)',
  'Muriel Jourda et Olivier Bitz, rapporteurs (Sénat)',
  '2024-11-21',
  'CITATION_EXACTE'::quote_kind,
  'Les explications avancées à cette stagnation des éloignements dans les documents budgétaires mentionnent notamment le manque de coopération de certains États d''origine, au premier rang desquels les trois États du Maghreb. Pour rappel, le taux de délivrance global des laissez-passer consulaires dans les délais s''établit à 57,5 % en 2024.',
  'Les rapporteurs de la commission des lois constatent la stagnation des éloignements forcés (11 722 en 2023, contre 18 906 en 2019) : le goulot d''étranglement est diplomatique — la coopération des pays d''origine, dont la délivrance des laissez-passer consulaires (57,5 % dans les délais en 2024) —, l''obstacle n''étant ni la loi ni les juges.',
  'https://www.senat.fr/rap/a24-150-2/a24-150-21.pdf',
  null,
  'f3f241482736849578d18a021dbe1b147b7688f91285d7eb802d494e982cb917',
  null,
  'https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '218cc6b4-e430-4383-91fb-c78f89b44416',
  '054e7ed1-684a-4161-8092-55af18bf6613',
  'CENTRE'::political_spectrum,
  'Étude — Simplifier le contentieux des étrangers dans l''intérêt de tous (20 propositions)',
  'Conseil d''État (France)',
  '2020-10-09',
  'CITATION_EXACTE'::quote_kind,
  'Après des réformes successives ces vingt dernières années, le droit des étrangers est devenu d''une complexité excessive, avec une multiplicité de règles particulières, de procédures et de délais. Devenu peu lisible ou compréhensible pour l''ensemble des acteurs, il suscite de plus en plus de contentieux devant la justice administrative, allant jusqu''à représenter 40 % de l''activité des tribunaux administratifs et 50 % de l''activité des cours administratives d''appel.',
  'Étude demandée par le Premier ministre : le Conseil d''État décrit un contentieux de masse né de l''empilement des textes et écarte l''idée de transformer le juge en « juge de plein contentieux » de l''éloignement. La difficulté est organisationnelle et normative — dans un cadre où 24 000 mesures d''éloignement ont été exécutées en 2019, dont 19 000 éloignements forcés.',
  'https://conseil-etat.fr/actualites/simplifier-le-contentieux-des-etrangers-dans-l-interet-de-tous',
  null,
  'e2dad14e5b1c3bc374001cb70ff631933f5f30dfbffa0b50336cf92bb79178fa',
  null,
  'https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '0b7a5fda-7a68-4d81-904e-82aa7ca4c98d',
  '054e7ed1-684a-4161-8092-55af18bf6613',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'L''éloignement des fauteurs de troubles : le retrait du droit de séjour (note de jurisprudence, Revue trimestrielle de droit européen)',
  'Vincent Réveillère (Revue trimestrielle de droit européen, Dalloz)',
  '2021-10-28',
  'CITATION_EXACTE'::quote_kind,
  'la Cour estime que les mesures d''exécution d''une décision d''éloignement d''un citoyen de l''Union prises pour des motifs d''ordre ou de sécurité publics peuvent être similaires à celle réservées aux étrangers mais qu''elles doivent respecter le principe de proportionnalité.',
  'Analyse de la jurisprudence de la Cour de justice de l''Union (22 juin 2021, Ordre des barreaux francophones et germanophone e.a.) : le droit européen admet l''éloignement pour des motifs d''ordre ou de sécurité publics, selon des modalités comparables à celles réservées aux étrangers, sous contrôle de proportionnalité. Le droit encadre l''éloignement, il ne l''empêche pas.',
  'https://shs.hal.science/halshs-03369320',
  null,
  '5af88aa71ae6927002df6dc3ab52ccd1c6ca9527515c758565f7b02179d42b76',
  null,
  'https://fr.wikipedia.org/wiki/Vincent_R%C3%A9veill%C3%A8re',
  5
);

delete from public.dossiers where slug = 'allocation-demandeur-asile-carte-bancaire-montant';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, is_published, published_at
) values (
  '15c8d34e-83ed-494c-9cbb-637f41b4d056',
  'allocation-demandeur-asile-carte-bancaire-montant',
  'Un demandeur d''asile touche entre 1 200 € et 2 000 € par mois avec une carte bancaire de l''État',
  'FAUX'::verdict_status,
  'Le barème réglementaire est sans rapport avec les montants allégués : 6,80 € par jour pour une personne seule hébergée (206,83 € par mois) et 14,20 € par jour si aucun hébergement ne lui est proposé (431,92 €), soit, selon la recherche, « la plus faible des prestations sociales en France, très largement inférieure au RSA ». La carte délivrée par l''OFII n''est pas une carte de crédit : elle est alimentée par le seul versement mensuel de l''ADA, sans possibilité de retrait d''espèces ni de virements, sans paiement en ligne ni sans contact (Défenseur des droits). Le versement est temporaire et conditionnel : il cesse à la fin du mois suivant la notification de la décision pour les personnes qui obtiennent une protection, et 61 000 cessations ou retraits ont été opérés en 2025 (Sénat, commission des finances). Dépense totale d''ADA en 2025 : 353,4 M€ (Cour des comptes).',
  'SOCIETE'::dossier_category,
  '[{"name":"Allocation pour demandeur d''asile","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Allocation_pour_demandeur_d%27asile","note":"Prestation créée en 2015, versée pendant l''instruction de la demande d''asile."},{"name":"Office français de l''immigration et de l''intégration","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Office_fran%C3%A7ais_de_l%27immigration_et_de_l%27int%C3%A9gration","note":"Gère l''ADA et délivre la carte de paiement sur laquelle elle est versée."},{"name":"Défenseur des droits","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/D%C3%A9fenseur_des_droits","note":null},{"name":"Cour des comptes (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)","note":null},{"name":"Sénat (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)","note":"Commission des finances — rapport de contrôle sur les coûts de l''asile (2026)."}]'::jsonb,
  100,
  '[{"claim_part":"« L''État donne une carte de crédit créditée de 1 500 € par mois aux migrants »","status":"FAUX","detail":"Le montant légal est un forfait journalier modique, indexé sur la composition du foyer : 6,80 €/jour pour une personne seule hébergée (206,83 €/mois) ; aucun hébergement proposé : + 7,40 €/jour, soit 431,92 €/mois au total ; + 3,40 € par personne supplémentaire. Aucun dispositif ne verse 1 200 à 2 000 € par mois à un demandeur d''asile isolé. La carte de l''OFII n''est pas une carte de crédit : elle est alimentée par le seul montant de l''allocation versée, sans possibilité de retrait d''espèces ni de virements depuis 2019 (fonctionnalités réduites documentées par le Défenseur des droits : pas de paiement en ligne, sans contact inactif)."},{"claim_part":"« Cette aide financière est accordée à vie et sans conditions »","status":"FAUX","detail":"Versement temporaire : dû à compter de l''acceptation des conditions matérielles d''accueil et pendant la durée d''instruction de la demande ; il cesse à la fin du mois qui suit celui de la notification de la décision pour les personnes qui obtiennent la qualité de réfugié ou la protection subsidiaire, et il est suspendu en cas de défaut de validité de l''attestation de demande d''asile. Les fins de versement sont massives : 61 000 cessations ou retraits de l''ADA ont été opérés en 2025, contre 46 000 en 2022 (Sénat)."}]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'b6a9e2f8-a4c1-4a13-971d-0ff1589dcec4',
  '15c8d34e-83ed-494c-9cbb-637f41b4d056',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de l''entrée et du séjour des étrangers et du droit d''asile — article L. 553-1 (allocation pour demandeur d''asile)',
  'Légifrance (République française)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Le demandeur d''asile qui a accepté les conditions matérielles d''accueil proposées en application de l''article L. 551-9 bénéficie d''une allocation pour demandeur d''asile s''il satisfait à des conditions d''âge et de ressources. Le versement de cette allocation est ordonné par l''Office français de l''immigration et de l''intégration.',
  'Texte en vigueur du chapitre III du titre V. L''article D. 553-8 décompose l''allocation en « un montant forfaitaire, dont le niveau varie en fonction du nombre de personnes composant le foyer, et, le cas échéant, un montant additionnel destiné à couvrir les frais d''hébergement » ; l''article D. 553-10 renvoie au barème de l''annexe 8 ; l''article D. 553-24 énumère les cas de fin de versement. Citation vérifiée sur le texte reproduit dans deux jugements du tribunal administratif de Nice (9 et 30 juillet 2025), Légifrance bloquant les robots d''indexation.',
  'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042802110/',
  null,
  '0b27165a634f2ebc283050e257b7a3cfa337cd2e636f07368e485f91ab65dc2c',
  null,
  null,
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '4de27bb4-2ce7-4cdf-b53c-89adb7ce6580',
  '15c8d34e-83ed-494c-9cbb-637f41b4d056',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'L''allocation pour demandeur d''asile (ADA) — fiche 25 de « Minima sociaux et prestations sociales, édition 2024 »',
  'DREES (Direction de la recherche, des études, de l''évaluation et des statistiques)',
  '2024-10-22',
  'CITATION_EXACTE'::quote_kind,
  'Le montant forfaitaire varie selon la composition familiale et s''élève à un forfait de 6,80 euros par jour pour une personne seule sans enfant, soit 206,83 euros par mois (+3,40 euros par jour par personne supplémentaire dans la famille). Il est accru de 7,40 euros par jour par adulte (soit 431,92 euros par mois au total pour une personne seule sans enfant) lorsque le demandeur de l''ADA a accepté l''offre de prise en charge et exprimé un besoin d''hébergement mais n''a pas accès gratuitement à un hébergement ou à un logement à quelque titre que ce soit.',
  'Chiffrage officiel : 206,83 € par mois (6,80 €/jour) pour une personne seule hébergée, 431,92 € (14,20 €/jour) sans accès gratuit à un hébergement — sans rapport avec des versements de 1 200 à 2 000 €. La même fiche documente la fin du versement : « L''ADA est ainsi versée jusqu''à la fin du mois qui suit celui de la notification de la décision pour les personnes qui obtiennent la qualité de réfugié ou le bénéfice de la protection subsidiaire. Elles peuvent ensuite immédiatement demander à bénéficier du revenu de solidarité active (RSA). »',
  'https://drees.solidarites-sante.gouv.fr/sites/default/files/2024-10/MS24%20-%20Fiche%2025%20-%20L%E2%80%99allocation%20pour%20demandeur%20d%E2%80%99asile%20%28ADA%29.pdf',
  null,
  '86412612f430b4a1cdcfba8a15b0894f630cb9834f960f676d6f50901a39dcf4',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '773864bb-21a8-43bb-a072-9a2b53d00b1f',
  '15c8d34e-83ed-494c-9cbb-637f41b4d056',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Réponse ministérielle à la question écrite n° 27196 — « Carte de paiement des demandeurs d''asile » (Assemblée nationale)',
  'Ministère de l''Intérieur (Journal officiel, réponse publiée le 15 septembre 2020)',
  '2020-09-15',
  'CITATION_EXACTE'::quote_kind,
  'La mise en place d''une carte de paiement, sans possibilité de retrait, permet, en limitant la circulation d''argent liquide, d''éviter que l''allocation pour demandeur d''asile serve à d''autres fins que celles d''assurer la subsistance du demandeur d''asile, au moyen de dépenses courantes sur le territoire national.',
  'Le Gouvernement y décrit le dispositif géré par l''OFII : allocation versée par alimentation de la carte de paiement, sans possibilité de retrait d''espèces ; le nombre de transactions a été « déplafonné » et « 44 % des transactions ayant porté sur un montant inférieur à 10 € en novembre 2019 ». La question rappelait que « le montant de l''ADA est déjà très faible (6,80 euros par jour pour une personne seule) ». Site de l''OFII inaccessible aux robots (403) : la réponse ministérielle documente ce dispositif officiel.',
  'https://questions.assemblee-nationale.fr/q15/15-27196QE.htm',
  null,
  'b2a3a351eab4084cba0f745bfcc0de91dbf3c3b427398787a2c33212fde48553',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'e0f3d664-eb7c-40f6-9ddf-7692b2e906c4',
  '15c8d34e-83ed-494c-9cbb-637f41b4d056',
  'CENTRE'::political_spectrum,
  'Le budget de l''État en 2025 — résultats et gestion : mission « Immigration, asile et intégration » (note d''exécution budgétaire)',
  'Cour des comptes (France)',
  '2026-04-21',
  'CITATION_EXACTE'::quote_kind,
  'Les dépenses associées à l''allocation pour demandeur d''asile (ADA) représentent 353,4 M€, en complément desquels sont prévus 6,2 M€ de frais de gestion destinés à l''OFII, dans le cadre de la loi de finances initiale pour 2025. Elles représentent 25 % des AE et 21 % des CP associés au programme.',
  'Chiffrage officiel de la dépense : 353,4 M€ d''ADA en 2025 (+20 % par rapport à 2024) et 6,2 M€ de frais de gestion pour l''OFII, pour « 94 271 demandeurs d''asile et 54 880 bénéficiaires de la protection temporaire » allocataires en moyenne en 2024 — un ordre de grandeur de quelques centaines d''euros par personne et par mois, incomparable avec les versements à quatre chiffres allégués. Le versement de l''ADA relève d''une « logique de guichet » (77 % des CP du programme 303 en janvier).',
  'https://program-evaluation.ccomptes.fr/sites/default/files/2026-04/NEB-2026-Immigration.pdf',
  null,
  '9c738aef868c096f236fca6c467d6460c63f62e8b587e18f7dce526d70235ff5',
  null,
  'https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'b1a4162d-4a05-456a-bd9f-f5375c9fbe31',
  '15c8d34e-83ed-494c-9cbb-637f41b4d056',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  '« Asile : faire la lumière sur les coûts, redéfinir les protections » — rapport de contrôle de la commission des finances (l''Essentiel)',
  'Marie-Carole Ciuntu, rapporteure spéciale (Sénat, commission des finances)',
  '2026-07-08',
  'CITATION_EXACTE'::quote_kind,
  'Le montant mensuel versé à un demandeur d''asile seul est de 206 euros s''il est hébergé et de 432 euros s''il ne l''est pas.',
  'Rapport de contrôle présenté le 8 juillet 2026 à la commission des finances du Sénat (près de 2 milliards d''euros de coûts identifiés en 2025). Il confirme les montants réglementés — 206 € / 432 € par mois, très loin de 1 200 à 2 000 € — et documente les fins de versement : « 61 000 cessations ou retraits de l''ADA ont été opérés en 2025, contre 46 000 en 2022 », pour un nombre d''allocataires « resté plutôt stable entre 2019 et 2024, de l''ordre de 150 000 personnes ».',
  'https://www.senat.fr/fileadmin/cru-1787580710/Commissions/Finances/2025-2026/Controles/Essentiel_post-commission_couts_de_l_asile.pdf',
  null,
  '9fe9e6164aa6545c90473ac9ab5505c90eec938f2e6d2537e7c47e2be051c5e0',
  null,
  'https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '952d79a4-e7db-4232-bdca-c25bf0ef6c03',
  '15c8d34e-83ed-494c-9cbb-637f41b4d056',
  'CENTRE'::political_spectrum,
  'Décision n° 2020-147 du 10 juillet 2020 relative à la réforme de la carte sur laquelle est versée l''allocation pour demandeur d''asile',
  'Défenseur des droits',
  '2020-07-10',
  'CITATION_EXACTE'::quote_kind,
  'S''agissant des fonctionnalités de la carte de paiement, les courriers accompagnant sa remise indiquent expressément aux utilisateurs qu''elle « ne permet pas le paiement sur internet », que « l''option de paiement sans contact est inactive » et que « la demande de remboursement d''un achat sur cette carte est strictement interdite ».',
  'Le Défenseur des droits documente une carte aux fonctionnalités très réduites — « pas de retrait ni de virements » — et juge la réforme « très préjudiciable » aux demandeurs d''asile, dont la carte n''était plus, depuis novembre 2019, qu''une carte de paiement (la carte précédente autorisait « 3 puis 5 retraits d''espèces par mois »). Il recommande une carte mixte ou le versement sur compte bancaire.',
  'https://juridique.defenseurdesdroits.fr/doc_num.php?explnum_id=19919',
  null,
  '640d4953fab044cc4e35f073acc7a1e9d935adb04705d16566d860da14049f2e',
  null,
  'https://fr.wikipedia.org/wiki/D%C3%A9fenseur_des_droits',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'd75b58b0-4117-4a6a-87d9-00eae251522a',
  '15c8d34e-83ed-494c-9cbb-637f41b4d056',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Vivre sans cash aujourd''hui — l''expérience des demandeur·es d''asile en France : une enquête sur la carte ADA',
  'Hélène Ducourant (Université Gustave Eiffel — Latts)',
  '2026-01-05',
  'CITATION_EXACTE'::quote_kind,
  'Concernant l''Ada, beaucoup estiment que la principale difficulté réside dans le montant de l''allocation — la plus faible des prestations sociales en France, très largement inférieure au RSA (voir encadré ci-dessous) — et dans l''absence de revalorisation depuis 2018, malgré une inflation soutenue.',
  'Enquête qualitative (26 entretiens auprès de 35 titulaires de la carte ADA) : « ces personnes disposent, pour 97,3 % d''entre elles, de cette prestation sociale comme unique ressource ». Elle chiffre 204 € par mois pour un adulte hébergé en centre (base 30 jours) et 426 € sans hébergement, « des montants si déconnectés du coût de la vie en France qu''ils semblent destinés à couvrir strictement les besoins essentiels ».',
  'https://www.gisti.org/IMG/pdf/carte_ada_etude_ducourant.pdf',
  null,
  '1f13551cb5c90c94b2768d3e20924d1d56050f3bb126cb2dca267f62e30460e9',
  null,
  'https://hal.science/hal-05444401',
  6
);

delete from public.dossiers where slug = 'sans-papiers-rsa-caf-apl-aides-sociales';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, is_published, published_at
) values (
  '98f17905-d0f3-40e4-b240-140d4462f89a',
  'sans-papiers-rsa-caf-apl-aides-sociales',
  'Les étrangers sans-papiers touchent le RSA, la CAF et les aides au logement (APL)',
  'FAUX'::verdict_status,
  'Les personnes en situation irrégulière sont exclues des prestations sociales de droit commun : « les étrangers dont le séjour est irrégulier ne peuvent prétendre à aucune aide ou prestation sociale de droit commun » et ne bénéficient que de l''AME, de l''hébergement d''urgence et de l''aide au retour (Sénat). Le RSA exige un titre de séjour autorisant à travailler depuis cinq ans (CASF, art. L. 262-4 — critère validé par le Conseil constitutionnel en 2011) ; les prestations familiales sont réservées aux étrangers titulaires d''un titre exigé pour résider régulièrement en France (CSS, art. L. 512-2) et l''APL suppose « un titre de séjour en cours de validité » (service-public.fr) ; la CNAF rappelle que « le droit aux prestations servies par les CAF est conditionné à la régularité du séjour », contrôlée via le portail AGDREF.',
  'SOCIETE'::dossier_category,
  '[{"name":"Revenu de solidarité active","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Revenu_de_solidarit%C3%A9_active","note":"Prestation dont les conditions d''accès aux étrangers sont fixées par le CASF."},{"name":"Caisse nationale des allocations familiales","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Caisse_nationale_des_allocations_familiales","note":"Verse les prestations familiales et contrôle la régularité du séjour des allocataires."},{"name":"Aide médicale d''État","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Aide_m%C3%A9dicale_d%27%C3%89tat","note":"Dispositif spécifique — avec l''hébergement d''urgence — accessible aux personnes en situation irrégulière."},{"name":"Conseil constitutionnel (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)","note":null},{"name":"Sénat (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)","note":"Commission des affaires sociales — rapport sur la condition de durée de résidence (2025)."}]'::jsonb,
  100,
  '[{"claim_part":"« Un clandestin peut s''inscrire à la CAF et toucher des allocations »","status":"FAUX","detail":"Le droit aux prestations de la branche Famille est conditionné à la régularité du séjour (instruction CNAF IT-2024-232) ; l''article L. 512-2 du code de la sécurité sociale réserve les prestations familiales aux étrangers « titulaires d''un titre exigé d''eux... pour résider régulièrement en France » ; l''APL suppose un titre de séjour en cours de validité. Au titre de l''article L. 111-1 du code de la sécurité sociale, les étrangers en séjour irrégulier ne peuvent prétendre à aucune aide ou prestation sociale de droit commun : hors AME, hébergement d''urgence et aide au retour, il n''y a ni RSA, ni allocations familiales, ni APL."},{"claim_part":"« Le RSA est accessible dès l''arrivée en France »","status":"FAUX","detail":"L''article L. 262-4 du code de l''action sociale et des familles impose d''« être français ou titulaire, depuis au moins cinq ans, d''un titre de séjour autorisant à travailler » — avec des exceptions limitées (réfugiés, bénéficiaires de la protection subsidiaire, apatrides, titulaires de la carte de résident). Le Conseil constitutionnel a jugé ce critère conforme (décision n° 2011-137 QPC du 17 juin 2011) ; un étranger régularisé depuis moins de cinq ans n''y a pas droit."}]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '807f214f-6834-4aaf-9fdd-97c99de1622e',
  '98f17905-d0f3-40e4-b240-140d4462f89a',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de l''action sociale et des familles — article L. 262-4',
  'Légifrance (République française)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Etre français ou titulaire, depuis au moins cinq ans, d''un titre de séjour autorisant à travailler.',
  'Condition d''ouverture du RSA pour les étrangers non communautaires (2° de l''article L. 262-4), assortie d''exceptions limitées (réfugiés, protection subsidiaire, apatrides, carte de résident). Un étranger en situation irrégulière — ou régularisé depuis moins de cinq ans — ne peut donc pas bénéficier du RSA, contrairement à ce que suppose la rumeur.',
  'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031087751',
  null,
  '1bec9c6422554479022203c88ea72bccc4624292c161ee2e32c44547dee5806d',
  null,
  null,
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '19297b7c-63b6-49eb-b853-85b791d2feb0',
  '98f17905-d0f3-40e4-b240-140d4462f89a',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de la sécurité sociale — article L. 512-2 (prestations familiales)',
  'Légifrance (République française)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Bénéficient également de plein droit des prestations familiales dans les conditions fixées par le présent livre les étrangers non ressortissants d''un Etat membre de la Communauté européenne, d''un autre Etat partie à l''accord sur l''Espace économique européen ou de la Confédération suisse, titulaires d''un titre exigé d''eux en vertu soit de dispositions législatives ou réglementaires, soit de traités ou accords internationaux pour résider régulièrement en France.',
  'Texte en vigueur : l''ouverture des prestations familiales (allocations familiales, etc.) est subordonnée à un titre de séjour régulier. Les alinéas suivants ajoutent des conditions pour les enfants à charge (naissance en France, entrée dans le cadre du regroupement familial, qualité de membre de famille de réfugié, etc.) et renvoient à un décret fixant « la liste des titres et justifications attestant de la régularité de l''entrée et du séjour ».',
  'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042920150',
  null,
  '4e356da953a0a9cbdc4d76282f060a5cc0cb06e92cc46f1d8d03c97da325e21a',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '9bd4ef6f-7ed4-4658-8528-523240359eb2',
  '98f17905-d0f3-40e4-b240-140d4462f89a',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Instruction CNAF IT-2024-232 — « Prise en compte des décisions de retrait ou de refus de titres de séjour et d''obligation de quitter le territoire français »',
  'CNAF (Caisse nationale des allocations familiales), direction des politiques familiale et sociale',
  '2024-11-28',
  'CITATION_EXACTE'::quote_kind,
  'Le droit aux prestations servies par les CAF est conditionné à la régularité du séjour.',
  'Instruction officielle de la CNAF à son réseau (28/11/2024) : le retrait ou le refus de titre de séjour entraîne la fin du droit aux prestations, et « en cas de décision préfectorale de retrait, de refus de délivrance ou de renouvellement d''un titre de séjour..., le portail Agdref doit en tenir compte via une mise à jour rapide ». Le document annonce la généralisation des échanges automatisés : « le développement des échanges entre le système d''information des Caf et AGDREF est en instruction pour prendre en compte les informations relatives aux titres de séjour dès la première demande et de façon sécurisée et automatisée ».',
  'https://www.caf.fr/sites/default/files/medias/cnaf/Nous_connaitre/qui%20sommes%20nous/Textes%20de%20r%C3%A9f%C3%A9rence/Circulaires/2024/IT%202024-232.pdf',
  null,
  'd604aa640da00e489cad0eb342a2bdd98fad52e05d650445b6ed74b0945699a1',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '82d36063-b20e-4f7f-9d34-434bd88894ee',
  '98f17905-d0f3-40e4-b240-140d4462f89a',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Aide personnalisée au logement (APL) — conditions pour les personnes étrangères (fiche F12006)',
  'DILA — service-public.fr (Premier ministre)',
  '2026-07-01',
  'CITATION_EXACTE'::quote_kind,
  'Vous pouvez bénéficier de l''APL si vous êtes étranger, à condition d''avoir un titre de séjour en cours de validité.',
  'La fiche officielle conditionne l''APL — comme le maintien des droits — à un titre de séjour en cours de validité : le défaut de « titre de séjour valide justifiant la régularité de votre séjour en France » figure parmi les motifs de suspension. Depuis le 1er juillet 2026, les étudiants ressortissants d''un pays hors UE/EEE/Suisse ne peuvent bénéficier de l''APL que dans trois cas limitativement énumérés.',
  'https://www.service-public.gouv.fr/particuliers/vosdroits/F12006',
  null,
  '9d57133c22e88abf99233b9b3fc690c342ee266d283ca5d3cbc5a627b6f0affe',
  null,
  null,
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '24640875-0882-48e6-9769-300e2da5d7e1',
  '98f17905-d0f3-40e4-b240-140d4462f89a',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Rapport n° 426 (2024-2025) — proposition de loi créant une condition de durée de résidence pour le versement de certaines prestations sociales',
  'Florence Lassarade, rapporteure (Sénat, commission des affaires sociales)',
  '2025-03-12',
  'CITATION_EXACTE'::quote_kind,
  'Au titre de l''article L.111-1 du code de sécurité sociale, les étrangers dont le séjour est irrégulier ne peuvent prétendre à aucune aide ou prestation sociale de droit commun. Ils ne bénéficient donc que des aides spécifiques qui leur sont dédiées : l''aide médicale d''État, l''hébergement d''urgence et l''aide au retour et à la réinsertion.',
  'Le rapport parlementaire rappelle le droit en vigueur : exclusion des prestations de droit commun pour les personnes en séjour irrégulier, condition de cinq ans de titre de séjour autorisant à travailler pour le RSA (quinze ans à Mayotte) et de dix ans pour l''Aspa. Il retrace aussi la jurisprudence : le Conseil constitutionnel a validé la condition RSA en 2011 (n° 2011-137 QPC) mais censuré en 2024 (n° 2024-6 RIP) une extension de cinq ans aux prestations familiales, APL et APA.',
  'https://www.senat.fr/rap/l24-426/l24-4265.html',
  null,
  '99e103e90e9893effa0c011466367cc6107aae336770b808f772150546e3822c',
  null,
  'https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '9ca52d5a-5ee5-4ecc-aac1-cc8c2371af8a',
  '98f17905-d0f3-40e4-b240-140d4462f89a',
  'CENTRE'::political_spectrum,
  'Décision n° 2011-137 QPC du 17 juin 2011 — M. Oussmane T.',
  'Conseil constitutionnel (République française)',
  '2011-06-17',
  'CITATION_EXACTE'::quote_kind,
  'le législateur a pu estimer que la stabilité de la présence sur le territoire national était une des conditions essentielles à l''insertion professionnelle ; qu''en réservant le bénéfice du revenu de solidarité active à ceux qui, parmi les étrangers, sont titulaires depuis au moins cinq ans d''un titre de séjour les autorisant à travailler, le législateur a institué entre les Français et les étrangers, d''une part, et entre les étrangers, d''autre part, selon qu''ils ont ou non une résidence stable en France, une différence de traitement en rapport direct avec l''objet de la loi',
  'Saisi par une question prioritaire de constitutionnalité, le Conseil constitutionnel valide la condition de cinq ans de titre de séjour pour le RSA : différence de traitement « en rapport direct avec l''objet de la loi », critère « pas manifestement inapproprié au but poursuivi ». C''est cette décision que cite le Sénat en 2025 pour rappeler que le verrou légal est conforme à la Constitution.',
  'https://www.conseil-constitutionnel.fr/decision/2011/2011137QPC.htm',
  null,
  'dac3bb4eeaf581dcd82d9a15608d8eb5ffa5104590d745466db6499978b713c0',
  null,
  'https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '75bfa467-7eb5-4a89-8024-add25b693b95',
  '98f17905-d0f3-40e4-b240-140d4462f89a',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'La régularité du séjour des étrangers en France : frontière du projet d''universalisation de la protection sociale ?',
  'Caroline Izambert (Revue française des affaires sociales, 2018, n° 4, pp. 19-37)',
  '2018-12-21',
  'CITATION_EXACTE'::quote_kind,
  'Ces restrictions, d''abord fondées sur la nationalité renvoient désormais à la régularité du séjour des personnes étrangères, condition généralisée par la loi de 1993, soumettant partiellement les objectifs des politiques de protection sociale à celles de contrôle des flux migratoires.',
  'Article de référence (résumé officiel consulté sur la base Prisme) : la chercheuse montre que la condition de régularité du séjour, généralisée en 1993, « exclut quasiment toutes les prestations de sécurité sociale » pour les personnes irrégulières, l''AME de 1999 constituant l''exception sanitaire — « l''impossible accès au droit commun pour les personnes étrangères résidentes en situation irrégulière ».',
  'https://shs.cairn.info/revue-francaise-des-affaires-sociales-2018-4-page-17?lang=fr',
  null,
  '598ae85b716819efd0183c2b4d4bb16291a58e39dc0fe6f484567b499d9221f5',
  null,
  'https://www.documentation-sociale.org/base-prisme/85384/',
  6
);

delete from public.dossiers where slug = 'pourvoi-cassation-culpabilite-ineligibilite-elus';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, is_published, published_at
) values (
  'a12eabe7-0adf-4320-8c3a-82f1c0da1a62',
  'pourvoi-cassation-culpabilite-ineligibilite-elus',
  'Un pourvoi en cassation annule la culpabilité et empêche l''inéligibilité d''un élu',
  'FAUX'::verdict_status,
  'La Cour de cassation n''est pas un troisième degré de juridiction : elle ne rejuge ni les faits ni la culpabilité matérielle, souverainement fixés par les juges du fond. De plus, si l''exécution provisoire est ordonnée, l''inéligibilité s''applique immédiatement malgré le pourvoi.',
  'POLITIQUE'::dossier_category,
  '[{"name":"Cour de cassation","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Cour_de_cassation_(France)","note":"Juridiction suprême de l''ordre judiciaire : elle contrôle la conformité au droit des décisions, sans rejuger le fond des affaires."},{"name":"Conseil constitutionnel","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)","note":"A validé le 28 mars 2025 la démission d''office immédiate des élus locaux condamnés à une inéligibilité exécutoire par provision, sous réserve d''un contrôle de proportionnalité."},{"name":"Conseil d''État","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)","note":"A rendu le 19 juin 2025 l''avis sur les effets d''une peine d''inéligibilité exécutoire par provision ; confirme la démission d''office des élus locaux."},{"name":"Code de procédure pénale","kind":"TEXTE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Code_de_proc%C3%A9dure_p%C3%A9nale_(France)","note":"Fixe l''effet suspensif du pourvoi (article 569) et le régime de l''exécution provisoire des peines (article 471)."},{"name":"Marine Le Pen","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Marine_Le_Pen","note":"Élue condamnée en 2025 puis en appel en 2026 dans l''affaire des assistants parlementaires du FN ; le débat sur la portée du pourvoi porte sur sa situation."}]'::jsonb,
  100,
  '[{"claim_part":"« La Cour de cassation peut déclarer un prévenu innocent des faits reprochés »","status":"FAUX","detail":"Elle contrôle la conformité au droit et la régularité de la procédure et « ne connaît pas du fond des affaires » (article L. 411-2 du code de l''organisation judiciaire) : les moyens qui remettent en cause l''appréciation souveraine des faits par les juges du fond sont écartés. Une cassation annule une décision, elle ne constate pas l''innocence."},{"claim_part":"« Le pourvoi suspend automatiquement toute peine d''inéligibilité »","status":"CONFUSION_CONCEPTUELLE","detail":"L''effet suspensif de l''article 569 du code de procédure pénale cède lorsque le juge a ordonné l''exécution provisoire : « le caractère non suspensif du recours, lorsque l''exécution provisoire a été ordonnée, assure une juste conciliation » (chambre criminelle, 21 septembre 2022). Les élus locaux condamnés sont démis d''office avant même que la condamnation soit définitive (Conseil constitutionnel, 28 mars 2025)."}]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '66c272b9-bd35-47c2-872a-db5cc604e489',
  'a12eabe7-0adf-4320-8c3a-82f1c0da1a62',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de procédure pénale — article 569',
  'Légifrance (République française)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Pendant les délais du recours en cassation et, s''il y a eu recours, jusqu''au prononcé de l''arrêt de la Cour de cassation, il est sursis à l''exécution de l''arrêt de la cour d''appel, sauf en ce qui concerne les condamnations civiles, et à moins que la cour d''appel ne confirme le mandat décerné par le tribunal en application de l''article 464-1 ou de l''article 465, premier alinéa, ou ne décerne elle-même mandat sous les mêmes conditions et selon les mêmes règles.',
  'Texte en vigueur (rédaction issue de la loi n° 2019-222 du 23 mars 2019) : le pourvoi suspend par principe l''exécution de l''arrêt de la cour d''appel, sauf exceptions limitées (condamnations civiles, mandats maintenus ou décernés). Ce sursis n''est pas absolu : les dispositions légales d''exécution provisoire, comme celles de l''article 471 du même code, y dérogent.',
  'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038313666',
  null,
  '112254f7f22b8f4f63cb51646d3f66aaf4e41f0911409550e7df2f3301f31f23',
  null,
  null,
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '4b0d65e8-a253-4ae8-8da4-df6a97bbd75d',
  'a12eabe7-0adf-4320-8c3a-82f1c0da1a62',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de procédure pénale — article 471, alinéa 4',
  'Légifrance (République française)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Les sanctions pénales prononcées en application des articles 131-4-1 à 131-11 et 132-25 à 132-70 du code pénal peuvent être déclarées exécutoires par provision.',
  'Cet alinéa permet au juge de déclarer la sanction exécutoire par provision, sans attendre une condamnation définitive : c''est la base légale de l''exécution immédiate malgré appel ou pourvoi. La peine complémentaire d''inéligibilité relève de ces sanctions ; le Conseil constitutionnel a déclaré l''alinéa conforme le 5 décembre 2025, en imposant une motivation spéciale sur la proportionnalité.',
  'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000041402532',
  null,
  'aa4847c5921b399ec2c63f3be9f191344a0f790a17a004a25daf964be124ceb4',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '737a9b8a-7cde-4527-9d9f-705374967c65',
  'a12eabe7-0adf-4320-8c3a-82f1c0da1a62',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code pénal — article 131-26-2',
  'Légifrance (République française)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Le prononcé de la peine complémentaire d''inéligibilité mentionnée au 2° de l''article 131-26 et à l''article 131-26-1 est obligatoire à l''encontre de toute personne coupable d''un délit mentionné au II du présent article ou d''un crime.',
  'Introduit par la loi n° 2017-1339 du 15 septembre 2017 pour la confiance dans la vie politique : pour les atteintes à la probité — dont le détournement de fonds publics — l''inéligibilité n''est plus une simple faculté mais la règle, la juridiction ne pouvant l''écarter que par une décision spécialement motivée (III du même article).',
  'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037526934',
  null,
  '7284201c235081ba0599016b5d707797b5a5f6f60b5b5d27d98598c0e8ba26dd',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '13429964-fded-4c04-a58a-eb308a4aa4f9',
  'a12eabe7-0adf-4320-8c3a-82f1c0da1a62',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de l''organisation judiciaire — article L. 411-2',
  'Légifrance (République française)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'La Cour de cassation statue sur les pourvois en cassation formés contre les arrêts et jugements rendus en dernier ressort par les juridictions de l''ordre judiciaire. La Cour de cassation ne connaît pas du fond des affaires, sauf disposition législative contraire.',
  'Définition légale de la mission de la Cour de cassation : statuer sur les pourvois formés contre les décisions rendues en dernier ressort, en contrôlant la conformité au droit — sans réexaminer le fond. La jurisprudence en tire que les moyens de fait, qui inviteraient la Cour à revenir sur l''appréciation souveraine des juges du fond, sont écartés.',
  'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006572199',
  null,
  'c14d19c1a93ba27d65ea06170c5461b67fc39744cbb3724fc78c41b86c7a9ac3',
  null,
  null,
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '089ffd37-0b74-4fda-a67e-4fb811abfe23',
  'a12eabe7-0adf-4320-8c3a-82f1c0da1a62',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Arrêt n° 22-82.377 du 21 septembre 2022, chambre criminelle — non-renvoi d''une QPC sur l''exécution provisoire d''une peine complémentaire',
  'Cour de cassation, chambre criminelle (France)',
  '2022-09-21',
  'CITATION_EXACTE'::quote_kind,
  'Enfin, le caractère non suspensif du recours, lorsque l''exécution provisoire a été ordonnée, assure une juste conciliation entre, d''une part, les principes et droits invoqués par le demandeur, d''autre part, les objectifs à valeur constitutionnelle de sauvegarde de l''ordre public et de bonne administration de la justice.',
  'Condamné notamment pour fraude fiscale, le demandeur soutenait qu''aucune voie n''était ouverte pour suspendre l''exécution provisoire d''une peine complémentaire. La chambre criminelle refuse de renvoyer sa question au Conseil constitutionnel : le recours n''est pas suspensif lorsque l''exécution provisoire a été ordonnée, et cette conciliation avec les objectifs de valeur constitutionnelle est conforme.',
  'https://qpc360.conseil-constitutionnel.fr/2022-09-21/arret-21-septembre-2022-22-82377',
  null,
  '89efdc2adea40f8b6196ef42be11bc3011fb9030a9717ab6002e4e2f262ccff6',
  null,
  'https://fr.wikipedia.org/wiki/Cour_de_cassation_(France)',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '8c56cf78-3832-4846-8c70-21f25adfaa6f',
  'a12eabe7-0adf-4320-8c3a-82f1c0da1a62',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Arrêt n° 24-83.556 du 18 décembre 2024, chambre criminelle — non-renvoi d''une QPC sur l''exécution provisoire d''une peine d''inéligibilité',
  'Cour de cassation, chambre criminelle (France)',
  '2024-12-18',
  'CITATION_EXACTE'::quote_kind,
  'En premier lieu, d''une part, la faculté pour la juridiction d''ordonner l''exécution provisoire d''une peine d''inéligibilité répond à l''objectif d''intérêt général visant à favoriser, en cas de recours, l''exécution de la peine et à prévenir la récidive.',
  'Condamné à cinq ans d''inéligibilité avec exécution provisoire « emportant cessation des mandats en cours », le demandeur reprochait à ce régime de faire exécuter la peine à une personne encore présumée innocente. La chambre criminelle juge que les dispositions ne méconnaissent ni la présomption d''innocence, ni le droit au recours effectif, ni le droit d''éligibilité — l''exécution provisoire n''étant ordonnée qu''après un débat contradictoire.',
  'https://qpc360.conseil-constitutionnel.fr/2024-12-18/arret-18-decembre-2024-24-83556',
  null,
  '81072f943443ff0adb326ed495112c3ab4c202ae1baf4e8ac9d212b9efe0a9d9',
  null,
  'https://fr.wikipedia.org/wiki/Cour_de_cassation_(France)',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'b74dc216-c299-499f-acd0-512b4692e686',
  'a12eabe7-0adf-4320-8c3a-82f1c0da1a62',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Justice : Marine Le Pen et le spectre de l''inéligibilité à la présidentielle',
  'Camille Aynès, maître de conférences en droit public, Université Paris Nanterre (The Conversation France)',
  '2025-03-28',
  'CITATION_EXACTE'::quote_kind,
  'Mais cela était sans compter sur l''exception qui offre la possibilité aux juges de décider d''assortir le prononcé de certaines sanctions pénales de l''« exécution provisoire », ce qui a pour effet de rendre leur application immédiate.',
  'Analyse publiée la veille du jugement du tribunal correctionnel de Paris. L''autrice rappelle que, par principe, une condamnation ne s''applique qu''une fois définitive — après épuisement des recours — et que c''est l''exécution provisoire qui rend la sanction immédiate ; elle note aussi que l''inéligibilité est devenue obligatoire pour les atteintes à la probité.',
  'https://theconversation.com/justice-marine-le-pen-et-le-spectre-de-lineligibilite-a-la-presidentielle-252893',
  null,
  '8180172c51e40d15ddaf5055a40b75dc575698c290980aae4449b18b49c6ac6f',
  null,
  'https://fr.wikipedia.org/wiki/The_Conversation_(m%C3%A9dia)',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'aa31113d-8513-430e-a6d1-c068d5e365fc',
  'a12eabe7-0adf-4320-8c3a-82f1c0da1a62',
  'CENTRE'::political_spectrum,
  'Décision n° 2025-1129 QPC du 28 mars 2025 — M. Rachadi S. [démission d''office d''un conseiller municipal condamné à une peine d''inéligibilité avec exécution provisoire]',
  'Conseil constitutionnel (France)',
  '2025-03-28',
  'CITATION_EXACTE'::quote_kind,
  'Il résulte de la jurisprudence constante du Conseil d''État, telle qu''elle ressort notamment de la décision de renvoi de la question prioritaire de constitutionnalité, que le préfet est tenu de déclarer immédiatement démissionnaire d''office le conseiller municipal non seulement en cas de condamnation à une peine d''inéligibilité devenue définitive, mais aussi lorsque la condamnation est assortie de l''exécution provisoire.',
  'Le Conseil constitutionnel valide, sous réserve de proportionnalité, la démission d''office immédiate d''un élu local condamné à une inéligibilité assortie de l''exécution provisoire : la mesure met en œuvre l''objectif de valeur constitutionnelle de sauvegarde de l''ordre public et l''exigence de probité des élus. La démission n''exige donc pas une condamnation définitive ; seul le juge pénal doit motiver la proportionnalité de l''atteinte au mandat et à la liberté de l''électeur.',
  'https://www.conseil-constitutionnel.fr/decision/2025/20251129QPC.htm',
  null,
  '48fc05085c63fb09f63adf467b674e551d831189af510c281a67266b4a389566',
  null,
  'https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'ba4d1d53-eef0-4513-bc01-a06e3412e814',
  'a12eabe7-0adf-4320-8c3a-82f1c0da1a62',
  'CENTRE'::political_spectrum,
  'Avis du 19 juin 2025 — conséquences d''une peine d''inéligibilité assortie de l''exécution provisoire sur le mandat d''un représentant au Parlement européen',
  'Conseil d''État (France)',
  '2025-06-19',
  'CITATION_EXACTE'::quote_kind,
  'En cas de prononcé d''une peine assortie de l''exécution provisoire, celle-ci conduit à déroger à l''effet suspensif de l''appel (article 506 du code de procédure pénale) ou du pourvoi en cassation (articles 512 et 569 du même code).',
  'Avis rendu à la demande du Gouvernement après la condamnation du 31 mars 2025. Le Conseil d''État énonce que l''exécution provisoire écarte l''effet suspensif de l''appel comme du pourvoi, puis distingue le régime des mandats : la déchéance d''un mandat de parlementaire — national ou européen — suppose une condamnation définitive, tandis que les élus locaux sont, eux, déclarés démissionnaires d''office dès l''exécution provisoire.',
  'https://www.conseil-etat.fr/avis-consultatifs/derniers-avis-rendus/au-gouvernement/avis-relatif-aux-consequences-d-une-peine-d-ineligibilite-assortie-de-l-execution-provisoire-sur-le-mandat-d-un-representant-au-parlement-europeen',
  null,
  '978bde8e2699132efeb80e22ed28258c99f4f05d34d8853b19cccf1c863f3a46',
  null,
  'https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)',
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '29676e11-d633-4e37-88f6-713c29f02e8b',
  'a12eabe7-0adf-4320-8c3a-82f1c0da1a62',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Procès du FN : Marine Le Pen condamnée à cinq ans d''inéligibilité et quatre ans de prison',
  'Le Figaro (avec AFP)',
  '2025-03-31',
  'CITATION_EXACTE'::quote_kind,
  'Au terme de deux mois de procès (30 septembre-27 novembre) et à la surprise générale, l''accusation avait requis à l''encontre de la cheffe de file de l''extrême droite une peine de cinq ans d''inéligibilité avec exécution provisoire (s''appliquant immédiatement, même en cas d''appel) en plus de cinq ans de prison dont deux ferme (une peine aménageable), ainsi que 300.000 euros d''amende.',
  'Récit du jugement : le Figaro y explicite le sens de l''exécution provisoire — la peine s''applique immédiatement, y compris en cas d''appel. C''est cette mécanique qui a nourri le débat public et les confusions sur la portée des recours, au cœur du dossier des assistants parlementaires du FN.',
  'https://www.lefigaro.fr/actualite-france/proces-du-fn-marine-le-pen-condamnee-a-une-peine-d-ineligibilite-avec-execution-immediate-20250331',
  null,
  'b061d44d27029b4de23311b97b203ac65a814b89bd9174c54eaa91b1e1daa84d',
  null,
  'https://fr.wikipedia.org/wiki/Le_Figaro',
  9
);

delete from public.dossiers where slug = 'assistants-rn-pourvoi-cassation-ineligibilite';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, is_published, published_at
) values (
  '628dd9b6-1c47-4d51-b798-5337e43e3b92',
  'assistants-rn-pourvoi-cassation-ineligibilite',
  'Affaire des assistants RN : le pourvoi en cassation annule la culpabilité et suspend l''inéligibilité',
  'FAUX'::verdict_status,
  'La Cour de cassation n''est pas un troisième degré de juridiction : elle ne rejuge ni la matérialité des emplois fictifs ni la culpabilité, fixées souverainement par les juges du fond. De plus, si l''exécution provisoire est ordonnée (art. 471 du code de procédure pénale ; loi n° 2017-1339 du 15 septembre 2017), la peine d''inéligibilité s''applique immédiatement sans être suspendue par le pourvoi — comme au jugement du 31 mars 2025, où l''exécution provisoire a entraîné la démission d''office du mandat départemental. La suspension d''exécution qui court depuis le pourvoi tient seulement à l''absence d''exécution provisoire sur l''arrêt d''appel : elle n''efface rien, et la condamnation redeviendra exécutoire si le pourvoi est rejeté.',
  'POLITIQUE'::dossier_category,
  '[{"name":"Marine Le Pen","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Marine_Le_Pen","note":"Condamnée pour détournement de fonds publics dans l''affaire des assistants parlementaires du FN ; son pourvoi en cassation est en cours d''examen (arrêt attendu au plus tard début avril 2027)."},{"name":"Rassemblement national","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Rassemblement_national","note":"Condamné comme personne morale pour recel habituel de détournements de fonds publics, également redevable de l''indemnisation du Parlement européen."},{"name":"Cour de cassation","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Cour_de_cassation_(France)","note":"Juge du droit, saisie des pourvois de l''affaire : elle ne réexamine pas les faits et sa chambre criminelle rendra son arrêt au plus tard début avril 2027."},{"name":"Cour d''appel de Paris","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Cour_d%27appel_de_Paris","note":"A rendu le 7 juillet 2026 l''arrêt confirmant la culpabilité et réduisant les peines, sans assortir son arrêt d''exécution provisoire."},{"name":"Parlement européen","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Parlement_europ%C3%A9en","note":"Partie civile de l''affaire, née de sa saisine de l''OLAF en 2015 ; la cour a évalué à 2,8 millions d''euros les détournements commis à son détriment."},{"name":"Office européen de lutte antifraude","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Office_europ%C3%A9en_de_lutte_antifraude","note":"Saisi en mars 2015 par le Parlement européen ; son enquête a conduit aux poursuites en France."}]'::jsonb,
  100,
  '[{"claim_part":"« La Cour de cassation peut innocenter les cadres du RN sur les faits reprochés »","status":"FAUX","detail":"Elle est « le juge du droit » : elle ne réexamine pas les faits à l''origine de la poursuite, mais vérifie que la loi a été correctement appliquée (communiqué de la Cour de cassation du 8 juillet 2026) ; les constatations de fait — l''organisation mise en place, les emplois fictifs — ont été fixées souverainement par les juges du fond. Une cassation, si elle était prononcée, annulerait l''arrêt et renverrait l''affaire devant une autre cour d''appel : elle n''innocente personne."},{"claim_part":"« Former un pourvoi suspend automatiquement toute interdiction de se présenter à une élection »","status":"CONFUSION_CONCEPTUELLE","detail":"L''effet suspensif ordinaire de l''article 569 du code de procédure pénale est expressément écarté lorsque la juridiction ordonne l''exécution provisoire prévue par la loi (article 471) : c''est alors l''exécution immédiate qui prime. Dans cette affaire, le jugement du 31 mars 2025 était assorti de l''exécution provisoire et a été exécuté (arrêté préfectoral de démission d''office du 10 avril 2025, confirmé par le Conseil d''État) ; l''arrêt d''appel du 7 juillet 2026 n''est assorti d''aucune exécution provisoire, d''où la suspension d''exécution — temporaire — depuis le pourvoi."}]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '8f6420ad-c725-49a7-ab0f-d92a42144ce6',
  '628dd9b6-1c47-4d51-b798-5337e43e3b92',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de procédure pénale — article 569',
  'Légifrance (République française)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Pendant les délais du recours en cassation et, s''il y a eu recours, jusqu''au prononcé de l''arrêt de la Cour de cassation, il est sursis à l''exécution de l''arrêt de la cour d''appel, sauf en ce qui concerne les condamnations civiles, et à moins que la cour d''appel ne confirme le mandat décerné par le tribunal en application de l''article 464-1 ou de l''article 465, premier alinéa, ou ne décerne elle-même mandat sous les mêmes conditions et selon les mêmes règles.',
  'Règle effectivement appliquée dans l''affaire : la cour d''appel de Paris n''ayant ordonné aucune exécution provisoire, l''exécution de son arrêt est suspendue pendant le pourvoi (communiqué de la Cour de cassation du 8 juillet 2026). Deux nuances souvent oubliées : ce sursis ne couvre pas les condamnations civiles — l''indemnisation du Parlement européen reste due — et il ne suspend que l''exécution, jamais la culpabilité, qui demeure établie tant que la Cour de cassation n''a pas statué.',
  'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038313666',
  null,
  '112254f7f22b8f4f63cb51646d3f66aaf4e41f0911409550e7df2f3301f31f23',
  null,
  null,
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '54253637-7112-4a0c-a662-18b34e0fc64c',
  '628dd9b6-1c47-4d51-b798-5337e43e3b92',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de procédure pénale — article 471, alinéa 4',
  'Légifrance (République française)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Les sanctions pénales prononcées en application des articles 131-4-1 à 131-11 et 132-25 à 132-70 du code pénal peuvent être déclarées exécutoires par provision.',
  'La dérogation qui dément le récit d''un pourvoi « suspendant » par nature : le juge peut déclarer la sanction exécutoire par provision, appel et pourvoi compris — l''inéligibilité en relève. Le tribunal correctionnel de Paris a usé de cette faculté le 31 mars 2025, et l''inéligibilité de cinq ans s''est appliquée immédiatement. Le Conseil constitutionnel a déclaré cet alinéa conforme le 5 décembre 2025, sous réserve d''une motivation spéciale sur la proportionnalité.',
  'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000041402532',
  null,
  'aa4847c5921b399ec2c63f3be9f191344a0f790a17a004a25daf964be124ceb4',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '486332ef-7f9e-46ee-a44c-a92b2683fa2a',
  '628dd9b6-1c47-4d51-b798-5337e43e3b92',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code pénal — article 131-26-2',
  'Légifrance (République française)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Le prononcé de la peine complémentaire d''inéligibilité mentionnée au 2° de l''article 131-26 et à l''article 131-26-1 est obligatoire à l''encontre de toute personne coupable d''un délit mentionné au II du présent article ou d''un crime.',
  'Créé par la loi n° 2017-1339 du 15 septembre 2017 pour la confiance dans la vie politique : pour les atteintes à la probité — dont le détournement de fonds publics, visé au 5° du II — l''inéligibilité est en principe obligatoire, la juridiction ne pouvant l''écarter que par une décision spécialement motivée (III du même article). C''est le fondement des peines d''inéligibilité prononcées dans l''affaire.',
  'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037526934',
  null,
  '7284201c235081ba0599016b5d707797b5a5f6f60b5b5d27d98598c0e8ba26dd',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'a613636b-5491-4078-960f-6a80d6491381',
  '628dd9b6-1c47-4d51-b798-5337e43e3b92',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Le PE saisit l''OLAF d''éventuelles irrégularités financières de la part du FN',
  'Parlement européen',
  '2015-03-09',
  'CITATION_EXACTE'::quote_kind,
  'Agissant à la requête de l''administration du Parlement européen et conformément au règlement de l''institution, le Président Martin Schulz a saisi lundi l''Office européen de lutte antifraude (OLAF) d''éventuelles irrégularités financières commises par le parti français Front National. Les éventuelles irrégularités concernent des salaires issus du budget européen versés à des assistants de parlementaires européens.',
  'Point de départ de l''affaire, le 9 mars 2015 : la saisine de l''OLAF par le Parlement européen, après la constatation que vingt assistants d''eurodéputés FN figuraient à des postes officiels du parti. Les montants évoqués à l''époque par la presse n''ont jamais eu valeur de rapport public ; la justice a finalement chiffré le préjudice du Parlement européen à 2,8 millions d''euros (communiqué de la cour d''appel du 7 juillet 2026).',
  'https://www.europarl.europa.eu/news/fr/press-room/20150309IPR32603/le-pe-saisit-l-olaf-d-eventuelles-irregularites-financieres-de-la-part-du-fn',
  null,
  'da695c489eb758403dc9c2f08955e9b82b624b916b3a991548b18add9c337863',
  null,
  'https://fr.wikipedia.org/wiki/Parlement_europ%C3%A9en',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'f9a75393-24b4-4a77-b94b-95b9d30628c0',
  '628dd9b6-1c47-4d51-b798-5337e43e3b92',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Arrêt du 7 juillet 2026 — communiqué de la cour d''appel de Paris (affaire dite « des assistants parlementaires du Front National »)',
  'Cour d''appel de Paris (première présidence, porte-parole)',
  '2026-07-07',
  'CITATION_EXACTE'::quote_kind,
  'La cour a retenu qu''une organisation avait été mise en place pour permettre la prise en charge par le Parlement européen de la rémunération des assistants parlementaires de députés européens du Front National, devenu Rassemblement National, alors que leurs activités étaient sans lien avec le mandat de leur député européen et qu''ils travaillaient en réalité pour le parti politique national.',
  'L''arrêt confirme la culpabilité des douze prévenus (détournement de fonds publics, complicité, recel) et chiffre le préjudice du Parlement européen à 2,8 millions d''euros. C''est cette matérialité — l''organisation, les emplois fictifs — que le pourvoi ne remet pas en cause devant la Cour de cassation, juge du droit.',
  'https://www.cours-appel.justice.fr/sites/default/files/2026-07/20260707%20-%20CA%20Paris%20-%20CP.pdf',
  null,
  '74ea0c9662a47f3c871451ff4e7d5d1e7434cecd205041879b11b33a80cf9d54',
  null,
  'https://fr.wikipedia.org/wiki/Cour_d%27appel_de_Paris',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '18351747-2c10-4c76-a57d-9fcb5b535096',
  '628dd9b6-1c47-4d51-b798-5337e43e3b92',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Communiqué du 8 juillet 2026 — affaire dite « des assistants parlementaires du Front National »',
  'Cour de cassation (France)',
  '2026-07-08',
  'CITATION_EXACTE'::quote_kind,
  'La Cour de cassation est le juge du droit. Elle ne réexamine pas les faits à l''origine de la poursuite, mais vérifie que la loi a été correctement appliquée.',
  'La Cour rappelle son office en précisant l''effet du pourvoi : « Sauf exécution provisoire, le pourvoi a un effet suspensif » et, la cour d''appel n''ayant prononcé l''exécution provisoire sur aucune partie de sa décision, « les dispositions pénales de cet arrêt (...) ne peuvent pas être mises à exécution ». Arrêt attendu au plus tard début avril 2027.',
  'https://www.courdecassation.fr/toutes-les-actualites/2026/07/08/affaire-dite-des-assistants-parlementaires-du-front-national',
  null,
  'd2b7714bf51ca2ea04cec9044889cfc5f81423172e6fbf35566bc7961f35d005',
  null,
  'https://fr.wikipedia.org/wiki/Cour_de_cassation_(France)',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'dbc87b93-8c0e-48b7-8834-ab361ee54856',
  '628dd9b6-1c47-4d51-b798-5337e43e3b92',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Que peut encore changer le pourvoi en cassation de Marine Le Pen ?',
  'Anne Ponseille, maître de conférences en droit privé, Université de Montpellier (Le Club des juristes)',
  '2026-07-09',
  'CITATION_EXACTE'::quote_kind,
  'Pendant les délais du recours en cassation et, si recours il y a, jusqu''à ce que la chambre criminelle de la Cour de cassation rende sa décision, il est sursis à l''exécution de l''arrêt de la cour d''appel. Cet effet suspensif concerne les peines prononcées qui n''ont donc pas à être exécutées immédiatement (art. 569 C. proc. pén.). On soulignera cependant que ce sursis à exécution ne concerne pas les condamnations civiles et, en l''espèce, Marine Le Pen a été condamnée solidairement avec d''autres prévenus, dont le Rassemblement national, au paiement de dommages et intérêts au Parlement européen.',
  'Analyse universitaire du pourvoi : le sursis à exécution et son périmètre (les peines, pas les condamnations civiles), puis les issues possibles — rejet ou cassation avec renvoi devant une autre cour d''appel. L''autrice rappelle que la Cour contrôle la qualification, la légalité des peines et la motivation, sans réexaminer les faits.',
  'https://www.leclubdesjuristes.com/justice/que-peut-encore-changer-le-pourvoi-en-cassation-de-marine-le-pen-16881/',
  null,
  'd430d97ba21fdbe19f698f3a432693d2c77c8f50fd22471884e9afebe7729f86',
  null,
  'https://fr.wikipedia.org/wiki/Club_des_juristes',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '01d8d3d3-daff-4665-913d-c60e5e1fe3b7',
  '628dd9b6-1c47-4d51-b798-5337e43e3b92',
  'CENTRE'::political_spectrum,
  'Décision n° 2025-1175 QPC du 5 décembre 2025 — M. Bernard P. [exécution provisoire des peines alternatives, des peines complémentaires et des mesures de personnalisation de la peine en matière correctionnelle]',
  'Conseil constitutionnel (France)',
  '2025-12-05',
  'CITATION_EXACTE'::quote_kind,
  'Dès lors que l''exécution provisoire prévue par ces dispositions s''attache à une sanction pénale prononcée par la juridiction répressive après que celle-ci a décidé que la culpabilité du prévenu est légalement établie, elle n''est pas incompatible avec le principe de la présomption d''innocence garanti par l''article 9 de la Déclaration de 1789.',
  'Réponse à l''argument « on exécute une peine avant toute condamnation définitive » : l''exécution provisoire s''attache à une culpabilité déjà établie par le juge, et elle est conforme à la Constitution. Le Conseil l''assortit d''une réserve : le juge doit motiver spécialement la proportionnalité — exigence déjà posée pour l''inéligibilité par la décision n° 2025-1129 QPC du 28 mars 2025.',
  'https://www.conseil-constitutionnel.fr/decision/2025/20251175QPC.htm',
  null,
  'de0ed69b241cc5e9d58c5f1ed1b9c6bd75752dfb5dfaf2fcf1a42f12aa4d4ea7',
  null,
  'https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '61f9096f-13cb-4d13-b609-c6fabcd9869a',
  '628dd9b6-1c47-4d51-b798-5337e43e3b92',
  'CENTRE'::political_spectrum,
  'Exécution provisoire d''une peine d''inéligibilité : le Conseil d''État confirme la démission d''office de Mme Marine Le Pen de son mandat de conseillère départementale (actualité du 10 novembre 2025)',
  'Conseil d''État (France)',
  '2025-11-10',
  'CITATION_EXACTE'::quote_kind,
  'Le 31 mars 2025, Mme Marine Le Pen, députée et conseillère départementale du Pas-de-Calais, a été condamnée par le tribunal judiciaire de Paris à une peine d''inéligibilité de cinq ans avec exécution provisoire, c''est-à-dire avec application immédiate. Conformément au code électoral, le préfet du Pas-de-Calais a, par un arrêté du 10 avril 2025, déclaré Mme Le Pen démissionnaire d''office de son mandat de conseillère départementale.',
  'L''exécution provisoire n''est pas un mot théorique : elle a été appliquée dans cette affaire dès le printemps 2025, pendant la procédure. Le Conseil d''État rejette la QPC de Marine Le Pen et confirme la démission d''office, en rappelant que les élus locaux (démis d''office dès l''exécution provisoire) ne sont pas dans la même situation que les parlementaires (déchéance subordonnée à une condamnation définitive).',
  'https://www.conseil-etat.fr/actualites/execution-provisoire-d-une-peine-d-ineligibilite-le-conseil-d-etat-confirme-la-demission-d-office-de-mme-marine-le-pen-de-son-mandat-de-conseille',
  null,
  '81b2d6a49c62c6a35d70d154673846eee2fcd36d3640d255b165f829567b13c7',
  null,
  'https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)',
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '70f12651-a9b5-48ad-8202-a3339a4b245b',
  '628dd9b6-1c47-4d51-b798-5337e43e3b92',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Marine Le Pen, condamnée à 15 mois ferme d''inéligibilité, pourrait a priori se présenter à la présidentielle',
  'Le Figaro',
  '2026-07-07',
  'CITATION_EXACTE'::quote_kind,
  'La cour a considéré qu''elle a déjà purgé une peine de quinze mois d''inéligibilité depuis le 31 mars 2025, date de sa condamnation en première instance.',
  'L''arrêt d''appel a ramené l''inéligibilité à 45 mois, dont 30 avec sursis, en imputant les quinze mois déjà courus sous l''exécution provisoire du jugement : illustration concrète de ce que produit l''exécution provisoire avant même que la condamnation ne soit définitive. La fraction ferme étant purgée, Marine Le Pen peut « a priori » se présenter.',
  'https://www.lefigaro.fr/politique/marine-le-pen-condamnee-a-15-mois-ferme-d-ineligibilite-pourrait-a-priori-se-presenter-a-la-presidentielle-20260707',
  null,
  '8b4be31675f9cc5e3c7334d95474918b7e102dc266d96d520dc6621989238eaf',
  null,
  'https://fr.wikipedia.org/wiki/Le_Figaro',
  9
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '66f89e3f-fa06-4631-836f-8538ddd10139',
  '628dd9b6-1c47-4d51-b798-5337e43e3b92',
  'GAUCHE'::political_spectrum,
  'Marine Le Pen condamnée… Mais pas complètement écartée de la présidentielle de 2027',
  'L''Humanité (Florent Le Du)',
  '2026-07-07',
  'CITATION_EXACTE'::quote_kind,
  'La cour considère que Marine Le Pen a déjà purgé 15 mois de peine d''inéligibilité depuis le 31 mars 2025. Elle est donc éligible et peut juridiquement choisir de se présenter à l''élection présidentielle.',
  'Récit de gauche de la décision : la réduction de peine et l''imputation du temps déjà purgé rendent l''élue de nouveau éligible, ce qui place la présidentielle 2027 et le pourvoi au centre du jeu — sans que cela change quoi que ce soit à la culpabilité établie ni au caractère non définitif de la condamnation.',
  'https://www.humanite.fr/politique/extreme-droite/marine-le-pen-condamnee-mais-pas-completement-ecartee-de-la-presidentielle-de-2027',
  null,
  '4f3de096aea78b4a76e350aed582c838c89720c082b72b550325b1322fb4a071',
  null,
  'https://fr.wikipedia.org/wiki/L%27Humanit%C3%A9',
  10
);

delete from public.dossiers where slug = 'laxisme-judiciaire-peines-prison-france';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, is_published, published_at
) values (
  'fc1805d9-9070-4553-a055-d5e9e8d0da82',
  'laxisme-judiciaire-peines-prison-france',
  'Les juges sont laxistes et les peines de prison diminuent en France',
  'FAUX'::verdict_status,
  'Loin de se vider, les prisons françaises n''ont jamais été aussi pleines : au 1er septembre 2026, 90 020 personnes étaient détenues pour 63 348 places opérationnelles, soit une densité carcérale de 142,1 % (jusqu''à plus de 176 % en maison d''arrêt), un record en hausse de 6,8 % sur un an, avec 8 347 matelas posés au sol. Les peines d''emprisonnement ferme se sont allongées : le quantum moyen est passé de 9,5 mois en 2020 à 10,2 mois en 2023, et à 11,0 mois pour les condamnations de 2024 ; les années de prison ferme prononcées ont augmenté de près de 70 % entre 2000 et 2019. Cette surpopulation structurelle a valu à la France une condamnation de la Cour européenne des droits de l''homme (arrêt J.M.B. et autres c. France, 30 janvier 2020), qui juge ces conditions de détention contraires à l''article 3 et enjoint à l''État de prendre des mesures générales de résorption.',
  'SOCIETE'::dossier_category,
  '[{"name":"Administration pénitentiaire","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Administration_p%C3%A9nitentiaire_en_France","note":"Ses décomptes mensuels (direction de l''administration pénitentiaire) établissent les records successifs de population détenue depuis 2023."},{"name":"Cour européenne des droits de l''homme","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Cour_europ%C3%A9enne_des_droits_de_l%27homme","note":"A condamné la France le 30 janvier 2020 (J.M.B. et autres c. France) pour des conditions de détention contraires à l''article 3 de la Convention."},{"name":"Sénat","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)","note":"Rapport d''information n° 2 (2025-2026) de la commission des lois : la surpopulation « hors de contrôle » atteste d''une « sévérité croissante » des juridictions."},{"name":"Cour des comptes","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)","note":"Rapport public thématique d''octobre 2023 : la réponse pénale « s''est durcie », + près de 70 % d''années de prison ferme prononcées en vingt ans."},{"name":"Libération","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Lib%C3%A9ration_(journal)","note":"A documenté le record de 90 020 détenus au 1er septembre 2026 d''après les statistiques officielles du ministère de la Justice."}]'::jsonb,
  95,
  '[{"claim_part":"« Les magistrats refusent d''incarcérer et vident les prisons »","status":"FAUX","detail":"Jamais autant de personnes n''ont été détenues en France : 90 020 au 1er septembre 2026 pour 63 348 places opérationnelles — une densité carcérale de 142,1 % (176,1 % dans les maisons d''arrêt selon Libération), en hausse de 6,8 % sur un an, avec 8 347 matelas au sol faute de lits. Les prisons ne se vident pas : elles débordent."},{"claim_part":"« Les peines prononcées sont de plus en plus courtes »","status":"FAUX","detail":"Le quantum moyen des peines d''emprisonnement ferme prononcées est passé de 9,5 mois en 2020 à 10,2 mois en 2023 (Cahiers d''études pénitentiaires n° 65) puis 11,0 mois pour les condamnations de 2024 (chiffres clés de la Justice) ; le nombre d''années de prison ferme prononcées a augmenté de près de 70 % entre 2000 et 2019 (Cour des comptes). Les peines s''allongent, elles ne raccourcissent pas."}]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'f88be2af-ffa6-4d4a-af6f-ef2fb866dede',
  'fc1805d9-9070-4553-a055-d5e9e8d0da82',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Statistique mensuelle de la population écrouée et détenue — situation au 1er septembre 2026',
  'Ministère de la Justice — direction de l''administration pénitentiaire (données GENESIS / DGAP-SSER)',
  '2026-09-01',
  'FAIT_DOCUMENTE'::quote_kind,
  'Au 1er septembre 2026 : 90 020 personnes écrouées détenues pour 63 348 places opérationnelles, soit une densité carcérale de 142,1 % (141,5 % en métropole, 150,2 % en outre-mer) et 8 347 matelas au sol ; 107 700 personnes écrouées au total, en hausse de 6,2 % sur un an.',
  'Le décompte officiel qui dément directement la thèse d''une justice vidant les prisons : les effectifs détenus battent un record historique et progressent de 6,8 % sur un an. Cette statistique mensuelle est publiée par la direction de l''administration pénitentiaire et diffusée sur data.gouv.fr (fichier « statistique des établissements et des personnes écrouées »).',
  'https://static.data.gouv.fr/resources/statistique-mensuelle-de-la-population-ecrouee-et-detenue-en-france/20261013-162028/statistique-etablissements-01092026.xlsx',
  null,
  '554af399c3f42d73a0e3907b6309068b9fa8f2595a07c52ce9b9953e1993d49e',
  null,
  'https://fr.wikipedia.org/wiki/Administration_p%C3%A9nitentiaire_en_France',
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '6405fc55-5d33-4751-a5ec-266b7ee04ba0',
  'fc1805d9-9070-4553-a055-d5e9e8d0da82',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Les chiffres clés de la Justice — édition 2025 (peines et mesures principales prononcées)',
  'Ministère de la Justice (sous-direction de la statistique et des études)',
  '2025-10-28',
  'CITATION_EXACTE'::quote_kind,
  'dont 121 057 en tout ou partie ferme et pour lesquelles le quantum moyen ferme est de 11,0 mois.',
  'Données provisoires 2024 : les condamnations à de l''emprisonnement en tout ou partie ferme portent un quantum moyen de 11,0 mois, contre 9,5 mois en 2020 et 10,2 mois en 2023 — la sanction ferme s''allonge bien, à rebours de la prémisse d''un relâchement. Dans la même édition, le quantum moyen des réclusions criminelles atteint 15 ans.',
  'https://www.justice.gouv.fr/sites/default/files/2025-10/Chiffres_Cl%C3%A9s_2025.pdf',
  null,
  'cf17d2c53f5dd951b009a8af2ed22424e43b36dd79efa4f0ab6ef11fe869cf1a',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'c7c00180-d775-4165-9b16-fc5223c27b9e',
  'fc1805d9-9070-4553-a055-d5e9e8d0da82',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Cahiers d''études pénitentiaires et criminologiques n° 65 — Inflation carcérale, durcir les peines, remplir les prisons',
  'Florence de Bruyn (bureau de la donnée, de la recherche et de l''évaluation, direction de l''administration pénitentiaire) — Ministère de la Justice',
  '2024-08-01',
  'CITATION_EXACTE'::quote_kind,
  'En 2023, non seulement, les condamnations à de l''emprisonnement ferme sont plus nombreuses qu''en 2022 (+3 %), mais les quantums de peines fermes sont également plus longs (+6 %). On s''attend donc à une augmentation des entrées et à un allongement de la durée de détention moyenne.',
  'L''étude retrace l''inflation carcérale depuis 1946 et la documente par les flux : dans le tableau 3, le quantum moyen ferme prononcé passe de 9,5 mois (2020) à 9,6 (2021), 9,9 (2022) puis 10,2 mois (2023) ; elle conclut que la croissance de la population détenue résulte du durcissement des peines plus que de la démographie ou de la délinquance.',
  'https://www.justice.gouv.fr/sites/default/files/2024-08/Cahiers_etudes_penitentiaires_et_criminologiques_n65.pdf',
  null,
  '174a2721633075a7374f472aeb1bfecd145aef6da45b8d2c1cde894680c1df5c',
  null,
  'https://fr.wikipedia.org/wiki/Administration_p%C3%A9nitentiaire_en_France',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'b17666a2-26f6-40a4-a851-93802fbfd41d',
  'fc1805d9-9070-4553-a055-d5e9e8d0da82',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Arrêt J.M.B. et autres c. France (requête n° 9671/15 et 31 autres) — Cour européenne des droits de l''homme, 30 janvier 2020',
  'Cour européenne des droits de l''homme (cinquième section)',
  '2020-01-30',
  'CITATION_EXACTE'::quote_kind,
  'Dit qu''il y a eu violation de l''article 3 de la Convention du fait des conditions de détention des requérants et des requérantes et rejette l''objection du Gouvernement de non-épuisement des voies de recours internes',
  'Arrêt pilote sur la surpopulation carcérale française : parmi les établissements concernés, Fresnes, Nîmes, Nice, Ducos, Faa''a-Nuutania ou Baie-Mahault. Au sommaire, la Cour retient aussi la violation de l''article 13 (« recours préventif inefficace ») et précise, au titre de l''article 46, que l''État défendeur est « tenu de prendre des mesures générales pour résorber définitivement la surpopulation carcérale et établir un recours préventif effectif en pratique ».',
  'https://hudoc.echr.coe.int/fre?i=001-200446',
  null,
  '584fff32f3539da7b9fd963b558bdf3bc3f0046e9339b95a2c65d1e2749135bf',
  null,
  'https://fr.wikipedia.org/wiki/Cour_europ%C3%A9enne_des_droits_de_l%27homme',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '01120ba5-8226-4706-8404-2c344747a22d',
  'fc1805d9-9070-4553-a055-d5e9e8d0da82',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Surpopulation carcérale : souhaite-t-on encore réinsérer nos condamnés ?',
  'Alexis Maitre-Millat, doctorant en droit privé et sciences criminelles, Université de Bordeaux (The Conversation)',
  '2023-05-11',
  'CITATION_EXACTE'::quote_kind,
  'Il n''y a jamais eu autant de détenus écroués en France. 73 080 : il s''agit d''un record. Ce nombre comprend les détenus en attente de jugement et les condamnés.',
  'Analyse académique du système pénal : l''auteur montre que les aménagements de peine, conçus pour la réinsertion, sont « de plus en plus utilisés comme des outils de gestion de la surpopulation carcérale » — signe que le problème est un flux d''entrées qu''on cherche à réguler, non un refus d''incarcérer. Le record cité (73 080 détenus en mai 2023) a depuis été largement dépassé.',
  'https://theconversation.com/surpopulation-carcerale-souhaite-t-on-encore-reinserer-nos-condamnes-204650',
  null,
  '7a060a42329632c42a5c5f4082fd7dae0049d6173c98f85c5b978d5f05c8eb66',
  null,
  null,
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '3c59adf6-5ca1-4e23-b05f-f4f582d44051',
  'fc1805d9-9070-4553-a055-d5e9e8d0da82',
  'CENTRE'::political_spectrum,
  'Une surpopulation carcérale persistante, une politique d''exécution des peines en question — rapport public thématique, octobre 2023',
  'Cour des comptes (France)',
  '2023-10-05',
  'CITATION_EXACTE'::quote_kind,
  'Plusieurs facteurs y contribuent : tout d''abord, la réponse pénale à la délinquance s''est durcie ces dernières années. Les incarcérations et leurs durées ont ainsi augmenté de façon significative - le nombre d''années de prison ferme prononcées a augmenté de près de 70 % en vingt ans.',
  'La juridiction financière, peu suspecte d''indulgence, documente le durcissement : fin 2022, 73 000 détenus (un « niveau inégalé », + 2 800 en un an), taux d''occupation des maisons d''arrêt de près de 143 %, coût global de l''incarcération évalué à environ 4 Md€. La synthèse précise : près de 90 000 années de prison ferme prononcées en 2019 contre 54 000 environ en 2000.',
  'https://www.ccomptes.fr/fr/publications/une-surpopulation-carcerale-persistante-une-politique-dexecution-des-peines-en',
  null,
  'e76e76f4c9cd84f51fb32d4e8cf76fca9cf2b4e935d0a78665e4847e49ccd2b8',
  null,
  'https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'eaa7547c-b1aa-4e67-88f7-f2771da11776',
  'fc1805d9-9070-4553-a055-d5e9e8d0da82',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'L''exécution des peines — rapport d''information n° 2 (2025-2026) de la commission des lois (mission d''information sur l''exécution des peines)',
  'Sénat (commission des lois)',
  '2025-10-01',
  'CITATION_EXACTE'::quote_kind,
  'Alors que la part des citoyens qui estiment que la justice est « laxiste » atteint des niveaux préoccupants, la surpopulation carcérale est désormais hors de contrôle et atteste à l''inverse d''une sévérité croissante des lois pénales comme des juridictions chargées de les appliquer.',
  'Le rapport donne les chiffres : « Au 5 juin 2025, les prisons françaises comptaient 84 363 détenus, en augmentation de plus de 6 000 détenus en une année, pour une capacité opérationnelle de seulement 62 566 places ; plus de 5 000 détenus dorment sur des matelas placés à même le sol. » Il constate aussi que les juges prononcent des peines fermes plus longues pour échapper aux aménagements automatiques des peines de moins d''un an.',
  'https://www.senat.fr/rap/r25-002/r25-002-syn.pdf',
  null,
  '52ea1a2052eabf03c7ab6f7fb94f646f9eaf917d5490e790e152346410fe029b',
  null,
  'https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'c5708783-1981-4a3d-99db-0eed32dcfc62',
  'fc1805d9-9070-4553-a055-d5e9e8d0da82',
  'GAUCHE'::political_spectrum,
  'Surpopulation carcérale : 90 020 détenus en France au 1er septembre, un nouveau record',
  'Libération (avec AFP)',
  '2026-10-03',
  'CITATION_EXACTE'::quote_kind,
  'Au 1er septembre, les prisons françaises comptaient 90 020 détenus selon les statistiques officielles du ministère de la Justice dévoilées ce samedi 3 octobre. Le nombre de détenus augmente de 6,8 % sur un an, alors que le nombre de places opérationnelles s''élève au 1er septembre de 63 348 (+ 1,2 % sur un an) et celui de matelas posés au sol, faute de lits, s''établit à 8 347, en hausse de 51,8 % par rapport au 1er septembre 2025.',
  'L''article rapporte aussi une densité de 176,1 % dans les maisons d''arrêt et le rang européen de la France, ex-aequo avec la Turquie (131 détenus pour 100 places) selon les chiffres 2025 du Conseil de l''Europe, devant la Croatie et l''Italie. C''est la confirmation journalistique des données officielles, un an après la publication de l''arrêt J.M.B.',
  'https://www.liberation.fr/societe/police-justice/surpopulation-carcerale-90-020-detenus-en-france-au-1er-septembre-un-nouveau-record-20261003_Z3OR4PFVRFG5BKLPRKJPP7BDBI/',
  null,
  '3eca3df2b8e25e254d958a9754af1c201c93dd6b5bebfa02e5326e8eba1907d4',
  null,
  'https://fr.wikipedia.org/wiki/Lib%C3%A9ration_(journal)',
  7
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
