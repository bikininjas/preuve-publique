-- seed.sql — généré par `npm run seed:sql` (scripts/build-seed-sql.mts).
-- Ne pas modifier à la main : modifier src/db/seed-fallback.ts.
-- Rejouable : chaque insertion est précédée d'une suppression par slug.
-- Les empreintes archive_sha256 sont calculées sur les champs publiés
-- (voir src/server/services/crypto.service.ts) et contrôlées par le
-- validateur de triangulation avant écriture.

delete from public.dossiers where slug = 'hitler-et-les-nazis-etaient-de-gauche';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '7f1c9a54-2b1e-4c8a-9d3f-1a5e6b7c8d90',
  'hitler-et-les-nazis-etaient-de-gauche',
  'Hitler et les nazis étaient de gauche',
  'FAUX'::verdict_status,
  'Le mot « socialiste » du sigle NSDAP relève d''une stratégie de récupération électorale assumée.

Dès 1933, le régime détruit les syndicats, interne l''opposition de gauche, assassine sa propre aile anticapitaliste et privatise massivement au profit des grands cartels industriels.',
  'HISTOIRE'::dossier_category,
  '[{"name":"Adolf Hitler","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Adolf_Hitler","note":null},{"name":"Parti national-socialiste des travailleurs allemands","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Parti_national-socialiste_des_travailleurs_allemands","note":null},{"name":"Parti communiste d''Allemagne","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Parti_communiste_d''Allemagne","note":null},{"name":"Parti social-démocrate d''Allemagne","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Parti_social-d%C3%A9mocrate_d''Allemagne","note":null},{"name":"Parti national du peuple allemand","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Parti_populaire_national_allemand","note":null},{"name":"Franz von Papen","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Franz_von_Papen","note":null},{"name":"Gregor Strasser","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Gregor_Strasser","note":null},{"name":"Camp de concentration de Dachau","kind":"LIEU","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Camp_de_concentration_de_Dachau","note":null},{"name":"IG Farben","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/IG_Farben","note":null},{"name":"Krupp","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Krupp","note":null},{"name":"Deutsche Reichsbahn","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Deutsche_Reichsbahn","note":null},{"name":"Nuit des Longs Couteaux","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Nuit_des_longs_couteaux","note":null},{"name":"Loi des pleins pouvoirs","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Loi_allemande_des_pleins_pouvoirs_de_1933","note":null},{"name":"Incendie du Reichstag","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Incendie_du_Reichstag","note":null},{"name":"Commerzbank","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Commerzbank","note":null},{"name":"Deutsche Bank","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Deutsche_Bank","note":null},{"name":"Raymond Aron","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Raymond_Aron","note":null},{"name":"Johann Chapoutot","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Johann_Chapoutot","note":null},{"name":"Ludwig von Mises","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Ludwig_von_Mises","note":null},{"name":"Ian Kershaw","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Ian_Kershaw","note":null},{"name":"Richard J. Evans","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Richard_J._Evans","note":null},{"name":"George Sylvester Viereck","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/George_Sylvester_Viereck","note":null},{"name":"Germà Bel","kind":"PERSONNE","role":"AUTEUR","reference_url":null,"note":"Économiste, auteur de l''étude sur les privatisations nazies (Economic History Review)."}]'::jsonb,
  100,
  '[{"claim_part":"Le sigle NSDAP contient le mot « socialiste »","status":"VRAI_DETOURNE","detail":"Terme retenu en 1920 pour capter l''électorat ouvrier, mais redéfini par Hitler hors de la lutte des classes et contre le marxisme, avec garantie explicite de la propriété privée."},{"claim_part":"L''État nazi intervenait dans l''économie, donc il était de gauche","status":"CONFUSION_CONCEPTUELLE","detail":"Économie de guerre dirigiste appuyée sur des cartels privés (Krupp, IG Farben, Siemens) et sur des privatisations massives entre 1934 et 1937 : l''inverse d''une collectivisation ou d''une abolition de la propriété privée."},{"claim_part":"Le NSDAP avait des alliances et une politique de gauche","status":"FAUX","detail":"Accession à la chancellerie par une coalition avec la droite conservatrice (von Papen, DNVP), ouverture de Dachau en mars 1933 pour interner communistes et sociaux-démocrates, dissolution des syndicats le 2 mai 1933, assassinat de l''aile strasseriste en juin 1934."}]'::jsonb,
  '[{"date":"1920","title":"Le mot « socialiste » entre dans le sigle","description":"Le terme est retenu en 1920 pour capter l''électorat ouvrier — puis redéfini par Hitler hors de la lutte des classes et contre le marxisme, garantie explicite de la propriété privée à l''appui.","evidence_ref":null},{"date":"1932-01-27","title":"Hitler devant le Club de l''Industrie de Düsseldorf","description":"Devant les grands patrons, Hitler défend la propriété privée, attaque le marxisme et les syndicats, et sollicite leur soutien financier : le parti nazi se présente au patronat comme le rempart contre la gauche.","evidence_ref":"Pièce #02"},{"date":"1932-07-09","title":"« Le socialisme national-socialiste ne répudie pas la propriété privée »","description":"Dans Liberty Magazine, Hitler oppose son « socialisme » au marxisme : propriété privée, patriotisme, rejet de la négation de la personnalité et de la lutte des classes — sa propre définition du mot, un an avant le pouvoir.","evidence_ref":"Pièce #01"},{"date":"1933-01-30","title":"Accession à la chancellerie avec la droite conservatrice","description":"Hitler devient chancelier par une coalition avec la droite nationaliste (von Papen, DNVP), destinée à barrer la route aux partis de gauche : ses alliés du jour sont conservateurs, pas socialistes.","evidence_ref":"Pièce #07"},{"date":"1933-03","title":"Répression de masse et ouverture de Dachau","description":"Dès février-mars 1933, les organisations ouvrières documentent les arrestations en masse, l''interdiction de leurs journaux et l''internement des députés communistes ; Dachau ouvre pour interner communistes et sociaux-démocrates.","evidence_ref":"Pièce #08"},{"date":"1933-03-23","title":"Loi des pleins pouvoirs (Ermächtigungsgesetz)","description":"Le Reichstag vote les pleins pouvoirs : le SPD est le seul parti encore représenté à voter contre, les députés communistes sont déjà arrêtés ou contraints à la clandestinité, la droite et le centre votent pour.","evidence_ref":"Pièce #03"},{"date":"1933-05-02","title":"Destruction des syndicats libres","description":"Les maisons des syndicats sont occupées, leurs dirigeants arrêtés, leurs fonds saisis ; les organisations ouvrières sont dissoutes et remplacées par le Front allemand du travail. Un régime de gauche ne détruit pas ses propres syndicats.","evidence_ref":"Pièce #04"},{"date":"1934-06","title":"Nuit des Longs Couteaux","description":"L''aile anticapitaliste du parti — les strasseristes — est assassinée sur ordre d''Hitler, et le régime se dote de son propre pouvoir militaire : la gauche interne du NSDAP est éliminée par le régime lui-même.","evidence_ref":null},{"date":"1934-1937","title":"Privatisations massives au profit des cartels","description":"Acier, mines, banque, transports maritimes, chemins de fer : le régime transfère massivement des entreprises publiques au secteur privé — l''inverse d''une collectivisation, documenté par l''Economic History Review.","evidence_ref":"Pièce #05"}]'::jsonb,
  true,
  '2026-10-14T00:00:00.000Z'::timestamptz,
  '/illustrations/hitler-et-les-nazis-etaient-de-gauche.jpg',
  'Photo : Bundesarchiv (Bild 183-1987-0410-501), Wikimedia Commons, CC BY-SA 3.0 de'
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
  'https://archive.org/details/LibertyV09N2819320709',
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
  'https://web.archive.org/web/20250425234738/https://onlinelibrary.wiley.com/doi/10.1111/j.1468-0289.2009.00473.x',
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
  'https://encyclopedia.ushmm.org/content/en/article/victims-of-the-nazi-era-nazi-racial-ideology',
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
  'https://encyclopedia.ushmm.org/content/en/article/adolf-hitler',
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
  'https://encyclopedia.ushmm.org/content/en/article/the-reichstag-fire',
  null,
  'e72d7917086c2a8e1dacea36ee42b44f8b9f28ea1d6fb0cfcab6aa63acc59d3e',
  null,
  null,
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '891d3e67-eafb-4c20-a5ae-15fc76cec8fc',
  '7f1c9a54-2b1e-4c8a-9d3f-1a5e6b7c8d90',
  'CENTRE'::political_spectrum,
  '« The Nazi Party » — Holocaust Encyclopedia, United States Holocaust Memorial Museum',
  'United States Holocaust Memorial Museum (USHMM)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'The Nazi Party was the radical far-right movement and political party led by Adolf Hitler. Its formal name was the National Socialist German Workers'' Party (Nationalsozialistische deutsche Arbeiterpartei or NSDAP). Nazi ideology was racist, nationalist, and anti-democratic. It was violently antisemitic and anti-Marxist.',
  'Musée mémorial fédéral américain (Washington) : sa notice de référence qualifie le NSDAP d''« extrême droite radicale », idéologiquement raciste, nationaliste, antidémocratique, violemment antisémite et antimarxiste. Le mot « socialiste » du sigle ne fait pas de ce parti une formation de gauche : l''idéologie nazie s''est construite contre le marxisme. Citation en anglais, langue de la notice.',
  'https://encyclopedia.ushmm.org/content/en/article/the-nazi-party-1',
  null,
  '35852877abac2b44a997191ad70498804759408995bb558461d15dcd74d8a9ae',
  null,
  'https://fr.wikipedia.org/wiki/United_States_Holocaust_Memorial_Museum',
  9
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '8e7dfbb9-e0c3-4232-b55b-00f402dafdab',
  '7f1c9a54-2b1e-4c8a-9d3f-1a5e6b7c8d90',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« Benutzung und Auskunft aus der digitalisierten NSDAP-Mitgliederkartei » — registre des membres du NSDAP, Bundesarchiv',
  'Bundesarchiv (Archives fédérales d''Allemagne)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Die NSDAP-Mitgliederkartei liegt mittlerweile in vollständig digitalisierter Form vor. Aufgrund der enormen Masse von über 12,7 Millionen Digitalisaten ist allerdings keine einfache Volltextrecherche in der Datenbank möglich.',
  'Registre administratif : les Archives fédérales conservent la carte des membres du NSDAP — plus de 12,7 millions de fiches numérisées. Ce fichier de masse documente l''encadrement d''un parti d''État, l''adhésion y étant un instrument de carrière sous le régime, et non une organisation ouvrière de gauche. Les délais de protection (Schutzfristen) courent jusqu''en 2027. Citation en allemand, langue du document.',
  'https://www.bundesarchiv.de/im-archiv-recherchieren/archivgut-recherchieren/nach-themen/benutzung-und-auskunft-aus-der-digitalisierten-nsdap-mitgliederkartei/',
  null,
  'cd9bf449acca1d746c697998fc55bb826d456d9f530bc78076c396eaf411e5af',
  null,
  'https://fr.wikipedia.org/wiki/Archives_f%C3%A9d%C3%A9rales_(Allemagne)',
  10
);

delete from public.dossiers where slug = 'aide-medicale-detat-securite-sociale-soins-de-confort';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  'ec66bd00-fb41-4eaf-b5aa-47600ef03889',
  'aide-medicale-detat-securite-sociale-soins-de-confort',
  'L''Aide Médicale d''État (AME) ruine la Sécurité sociale et finance des soins de confort gratuits',
  'FAUX'::verdict_status,
  'L''aide médicale de l''État coûte environ 1,4 milliard d''euros en 2024 — un peu plus de 0,5 % des dépenses de santé — et c''est le budget de l''État qui la finance, pas les cotisations sociales.

Les cures thermales, l''aide médicale à la procréation et les médicaments à faible service médical rendu sont exclus du panier de soins, et les nouveaux bénéficiaires passent par un accord médical préalable pour les soins non urgents.

Le rapport Évin-Stefanini comme l''Académie nationale de médecine concluent à un dispositif utile et maîtrisé.',
  'SANTE'::dossier_category,
  '[{"name":"Aide médicale d''État","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Aide_m%C3%A9dicale_d%27%C3%89tat","note":"Dispositif d''accès aux soins des personnes étrangères en situation irrégulière."},{"name":"Sécurité sociale (France)","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/S%C3%A9curit%C3%A9_sociale_(France)","note":null},{"name":"Académie nationale de médecine","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Acad%C3%A9mie_nationale_de_m%C3%A9decine","note":"Autrice de l''avis (2026) et du communiqué (2023) cités."},{"name":"Claude Évin","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Claude_%C3%89vin","note":"Co-rapporteur de la mission d''évaluation de l''AME (2023)."},{"name":"Patrick Stefanini","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Patrick_Stefanini","note":"Co-rapporteur de la mission d''évaluation de l''AME (2023)."}]'::jsonb,
  100,
  '[{"claim_part":"« L''AME ruine la Sécurité sociale »","status":"CONFUSION_CONCEPTUELLE","detail":"En 2024, le coût total réel s''élève à 1 386,8 millions d''euros, soit environ 0,5 % des dépenses de santé ; la dépense moyenne par bénéficiaire (2 396,4 € en 2023) est inférieure à celle de l''ensemble de la population. Le dispositif est porté par le budget de l''État (mission Santé), pas par les cotisations sociales."},{"claim_part":"« Elle finance des soins de confort gratuits (cures, esthétique) »","status":"FAUX","detail":"Les cures thermales, l''aide médicale à la procréation et les médicaments à faible service médical rendu sont explicitement exclus de l''AME (article R. 251-1 du code de l''action sociale et des familles) ; le Gouvernement écrit que « l''AME ne finance pas de soins non essentiels » (réponse ministérielle du 12 décembre 2023)."},{"claim_part":"« À l''arrivée, la prise en charge est immédiate et sans contrôle »","status":"FAUX","detail":"La résidence stable en France de plus de trois mois est exigée, la première demande se dépose physiquement en CPAM, et depuis le 1er janvier 2021 les bénéficiaires de moins de neuf mois ne reçoivent certains soins qu''après accord préalable du médecin-conseil : un délai de carence sur les soins non urgents, pas un accès immédiat à tout."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/aide-medicale-detat-securite-sociale-soins-de-confort.jpg',
  'Photo : MHM55, Wikimedia Commons, CC BY-SA 4.0'
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
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '0fa4f772-df1e-4c20-bf04-b0023a6b2234',
  'sans-papiers-et-rsa-des-leur-arrivee',
  'Les étrangers sans-papiers touchent le RSA dès leur arrivée en France',
  'FAUX'::verdict_status,
  'Aucune personne sans titre de séjour ne peut percevoir le RSA : la loi exige un titre de séjour autorisant à travailler depuis au moins cinq ans (article L. 262-4 du code de l''action sociale et des familles), un délai supprimé seulement pour les réfugiés, les apatrides et les titulaires d''une carte de résident.

Le volet CAF, APL et aides liées à l''enfance est traité dans le dossier « Les étrangers sans-papiers touchent le RSA, la CAF et les APL, y compris pour leurs enfants ».

Au 30 juin 2022, 15,6 % des foyers allocataires du RSA avaient un responsable de dossier né hors UE/EEE — tous en situation régulière.',
  'SOCIETE'::dossier_category,
  '[{"name":"Revenu de solidarité active","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Revenu_de_solidarit%C3%A9_active","note":"Prestation de solidarité : pour les étrangers non européens, un titre de séjour autorisant à travailler depuis cinq ans est exigé."},{"name":"Cour des comptes (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)","note":null},{"name":"Caisse nationale des allocations familiales","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Caisse_nationale_des_allocations_familiales","note":"Source des données sur les allocataires citées par la réponse ministérielle."}]'::jsonb,
  100,
  '[{"claim_part":"« Les sans-papiers touchent le RSA »","status":"FAUX","detail":"La condition légale est un titre de séjour autorisant à travailler depuis au moins cinq ans ; « les immigrés irréguliers (« sans-papiers ») ne peuvent y prétendre en aucun cas » (Le Figaro, 2023). Les exceptions prévues (réfugiés, protection subsidiaire, apatrides, carte de résident) ne couvrent jamais l''irrégularité du séjour."},{"claim_part":"« … dès leur arrivée en France »","status":"FAUX","detail":"Il faut un titre autorisant à travailler depuis cinq ans, une résidence stable (moins de trois mois d''absence par an, article L. 262-2) et une demande examinée par la CAF : rien de tout cela n''est ouvert à une personne sans papiers. Le délai de cinq ans est levé pour quelques statuts protégés, pas pour l''absence de titre."},{"claim_part":"« Les étrangers pèsent lourd dans les bénéficiaires »","status":"VRAI_DETOURNE","detail":"Chiffre réel mais déformé : 15,6 % des foyers allocataires au 30 juin 2022 (moins de 300 000 foyers) avaient un responsable de dossier hors UE/EEE, tous titulaires du titre de séjour requis depuis cinq ans. La condition de nationalité protège précisément contre une attribution « dès l''arrivée »."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/sans-papiers-et-rsa-des-leur-arrivee.jpg',
  'Affiche de la préfecture de police (musée Carnavalet, Paris Musées), CC0, Wikimedia Commons'
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
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  'f185a0ee-094c-42bb-b75d-ef1517393fd4',
  'petain-vichy-ont-ils-protege-les-juifs-francais',
  'Le maréchal Pétain et le régime de Vichy ont protégé les Juifs français',
  'FAUX'::verdict_status,
  'Le premier statut des Juifs est adopté par l''État français « de sa propre initiative, et sans pression nazie », et Pétain l''a personnellement annoté et durci — jusqu''à rayer l''exception qui épargnait les descendants de Juifs nés français avant 1860.

Environ 25 000 des 80 000 victimes de la Shoah en France étaient de nationalité française, et la rafle du Vél'' d''Hiv'' a été exécutée par 450 policiers et gendarmes français.

La thèse d''un Pétain protecteur est contredite par les archives, les historiens et le discours de Jacques Chirac du 16 juillet 1995.',
  'HISTOIRE'::dossier_category,
  '[{"name":"Philippe Pétain","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Philippe_P%C3%A9tain","note":"Chef de l''État français : il a annoté et durci le projet de statut des Juifs d''octobre 1940."},{"name":"Régime de Vichy","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/R%C3%A9gime_de_Vichy","note":null},{"name":"Loi portant statut des Juifs","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Loi_portant_statut_des_Juifs","note":"Premier statut des Juifs, promulgué le 3 octobre 1940 par le régime de Vichy."},{"name":"Rafle du Vélodrome d''Hiver","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Rafle_du_V%C3%A9lodrome_d%27Hiver","note":"Rafle des 16 et 17 juillet 1942, exécutée par la police française."},{"name":"Serge Klarsfeld","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Serge_Klarsfeld","note":"A révélé en 2010 le projet de statut annoté par Pétain."},{"name":"Laurent Joly","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Laurent_Joly","note":"Directeur de recherche au CNRS, historien de l''antisémitisme sous l''Occupation."},{"name":"Jacques Chirac","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Jacques_Chirac","note":"A reconnu en 1995 la responsabilité de l''État français dans la déportation."}]'::jsonb,
  100,
  '[{"claim_part":"« Le statut des Juifs a été imposé par les Allemands »","status":"FAUX","detail":"Le statut du 3 octobre 1940 est adopté par l''État français « de sa propre initiative, et sans pression nazie » (Mémorial de la Shoah) ; il s''applique aux deux zones, y compris la zone libre où aucun occupant n''est présent."},{"claim_part":"« Vichy a protégé les Juifs français »","status":"FAUX","detail":"Pétain a annoté et durci le projet : suppression de l''exception des descendants de Juifs nés ou naturalisés avant 1860, extension des exclusions professionnelles — « tous les juifs sont stigmatisés » (INA). Environ 25 000 Juifs de nationalité française figurent parmi les victimes de la Shoah en France."},{"claim_part":"« Vichy a sacrifié les étrangers pour sauver les Français »","status":"FAUX","detail":"La collaboration policière de l''État français « a grandement aggravé le sort des Juifs » (Laurent Joly, CNRS) : la rafle du Vél'' d''Hiv'' (16-17 juillet 1942) est exécutée par la police française et la déportation frappe les Juifs français comme étrangers, dans les mêmes convois."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/petain-vichy-ont-ils-protege-les-juifs-francais.jpg',
  'Portrait : Marcel Baschet, mai 1940 — domaine public, Wikimedia Commons'
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
  'https://web.archive.org/web/20210227022110/https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000869361/',
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
  'https://web.archive.org/web/20251206175247/https://www.sup.org/books/history/vichy-france-and-jews/excerpt/preface',
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
  'https://web.archive.org/web/20211026063359/https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000571814',
  null,
  'd316cfd261634b8dfe0895ee9b6e70be5e4afd20602ed08396f4029fcac4f7b2',
  null,
  null,
  9
);

delete from public.dossiers where slug = 'cout-immigration-budget-france';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  'bf081aa5-d711-4510-bb25-b426ae7ffa46',
  'cout-immigration-budget-france',
  'L''immigration coûte des dizaines de milliards d''euros par an à la France',
  'FAUX'::verdict_status,
  'Les évaluations convergent vers un solde faible ou quasi nul : sur 1979-2011, la contribution nette des immigrés aux finances publiques françaises est restée bornée entre - 0,5 % et + 0,05 % du PIB et n''a jamais déterminé le solde budgétaire primaire (CEPII) ;

dans les 25 pays de l''OCDE pour lesquels des données existent, les impôts et cotisations des immigrés ont en moyenne dépassé les dépenses publiques qui leur sont consacrées en 2006-2018 (OCDE, rapport 2021).

La structure par âge — population surreprésentée dans les classes actives — compense une contribution plus faible à âge donné.

Les chiffres de « 35 à 40 milliards » — parfois « 54 milliards » — qui circulent reposent sur une extrapolation invalide : des moyennes pluriannuelles appliquées au PIB d''une seule année, un périmètre incluant des Français nés à l''étranger et des dépenses non imputables ; les économistes auteurs des études citées (OCDE, CEPII) qualifient eux-mêmes cette lecture d''« interprétation fallacieuse » (AFP Factuel, avril 2024).',
  'ECONOMIE'::dossier_category,
  '[{"name":"Immigration en France","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Immigration_en_France","note":"Le débat budgétaire porte sur la contribution nette des immigrés aux finances publiques françaises."},{"name":"Organisation de coopération et de développement économiques","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Organisation_de_coop%C3%A9ration_et_de_d%C3%A9veloppement_%C3%A9conomiques","note":null},{"name":"Centre d''études prospectives et d''informations internationales","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Centre_d%27%C3%A9tudes_prospectives_et_d%27informations_internationales","note":"Auteurs de l''évaluation comptable de la contribution des immigrés aux finances publiques (1979-2011)."},{"name":"Insee","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Institut_national_de_la_statistique_et_des_%C3%A9tudes_%C3%A9conomiques","note":"Source des statistiques d''activité et d''emploi de la population immigrée."},{"name":"Terra Nova","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Terra_Nova_(think_tank)","note":"Think tank progressiste ; note sur la place des étrangers non européens dans les métiers en tension."}]'::jsonb,
  95,
  '[{"claim_part":"« Les immigrés coûtent plus cher en aides qu''ils ne rapportent »","status":"FAUX","detail":"Les évaluations convergent vers un solde faible : contribution nette bornée entre - 0,5 % et + 0,05 % du PIB sur 1979-2011 (CEPII) ; impôts et cotisations supérieurs aux dépenses consacrées aux immigrés (protection sociale, santé, éducation) en moyenne 2006-2018 dans les 25 pays OCDE étudiés. La population immigrée est surreprésentée dans les classes d''âge actives, où les cotisations versées dépassent les prestations reçues."},{"claim_part":"« Le déficit de l''État est causé par l''immigration »","status":"CONFUSION_CONCEPTUELLE","detail":"Le CEPII conclut qu''« à aucun moment l''immigration n''a déterminé l''ampleur et l''évolution du solde budgétaire primaire » (1979-2011). Le déficit public s''explique d''abord par le vieillissement démographique (retraites, santé) et les cycles économiques : l''effet migratoire est marginal en comparaison."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/cout-immigration-budget-france.jpg',
  'Photo : DXR, domaine public, Wikimedia Commons'
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
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '81a2c1d5-97f2-448d-8f06-48d743172dbc',
  'bf081aa5-d711-4510-bb25-b426ae7ffa46',
  'CENTRE'::political_spectrum,
  '« Coût » de l''immigration : attentions aux chiffres trompeurs de « 35 à 40 milliards » d''euros annuels — AFP Factuel (5 avril 2024)',
  'AFP Factuel (Guillaume Gérard, AFP France)',
  '2024-04-05',
  'CITATION_EXACTE'::quote_kind,
  'Or, ce n''est pas ce que disent ces travaux et les économistes qui les ont publiés dénoncent auprès de l''AFP l''« interprétation fallacieuse » qui en est faite.',
  'Dépêche de vérification du chiffre « 40 milliards » avancé par Jordan Bardella et relayé par l''Observatoire de l''immigration et de la démographie : celui-ci applique des moyennes pluriannuelles (OCDE 2006-2018, CEPII 1979-2011) au PIB d''une seule année, inclut les « personnes nées à l''étranger » — dont 1,7 million de Français — et des biens publics purs non imputables (dette, défense). Jean-Christophe Dumont (OCDE) : « Je ne sais pas d''où sortent ces 40 milliards […] Cela vient d''une interprétation fallacieuse de nos travaux » ; Xavier Chojnicki (CEPII) : « Ce chiffre n''est pas issu de mes travaux » (estimation 2011 : -0,49 % du PIB, soit 8,8 milliards d''euros).',
  'https://web.archive.org/web/20240405132448/https://factuel.afp.com/doc.afp.com.34NN2GT',
  null,
  'b156a3a574abdc9ff1d5f88f99a9df0a710f74bcd9762e16316c30c963be0cb9',
  null,
  'https://fr.wikipedia.org/wiki/Agence_France-Presse',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'd7e0a9c9-a5d0-4346-9e7f-7ffe9d6a27b7',
  'bf081aa5-d711-4510-bb25-b426ae7ffa46',
  'GAUCHE'::political_spectrum,
  'Le coût de l''immigration en France : une « fake news » à l''épreuve de la vérité — Fondation Jean-Jaurès (18 septembre 2024)',
  'Fondation Jean-Jaurès (think tank progressiste)',
  '2024-09-18',
  'CITATION_EXACTE'::quote_kind,
  'En effet, l''étude menée par l''OCDE démontre que la contribution budgétaire nette totale des immigrés oscille entre -1% et + 1% du PIB. Le constat est sans appel : à peu de chose près, l''impact de l''immigration est neutre.',
  'Note qui décortique la méthode des « 40 milliards » puis des « 54 milliards » (Contribuables associés) : pourcentages moyens appliqués à un PIB annuel, périmètre élargi aux nés à l''étranger, dépenses collectives imputées, bénéfices de l''éducation non calculés. Elle rappelle que l''OCDE borne la contribution nette entre -1 % et +1 % du PIB, que les immigrés perçoivent en moyenne moins d''argent public que les Français (0,94 € pour 1 € perçu) et que le CEPII conclut à un impact proche de zéro : « les immigrés ne sont ni un fardeau ni une aubaine pour les finances publiques ».',
  'https://www.jean-jaures.org/publication/le-cout-de-limmigration-en-france-une-fake-news-a-lepreuve-de-la-verite/',
  null,
  '7b733ba2bb8248eb5f9a52f5b965f23b0a77b25810faa598a4303f79db2191f9',
  null,
  'https://fr.wikipedia.org/wiki/Fondation_Jean-Jaur%C3%A8s',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '08865761-a821-449f-adb3-4af7292aa20a',
  'bf081aa5-d711-4510-bb25-b426ae7ffa46',
  'CENTRE'::political_spectrum,
  'VRAI OU FAUX. L''immigration coûte-t-elle 54 milliards d''euros à la France chaque année, comme l''affirme la députée RN Gisèle Lelouis ? — franceinfo (28 août 2023)',
  'franceinfo / Radio France (Armêl Balogog)',
  '2023-08-28',
  'CITATION_EXACTE'::quote_kind,
  'Celle-ci conclut aussi que le solde est négatif en moyenne : selon les années, soit l''immigration ne coûte rien, soit elle coûte 10 milliards d''euros maximum. Loin des 54 milliards d''euros cités par Jean-Paul Gourévitch.',
  'Vérification de l''affirmation « 53,9 milliards par an » de la députée RN Gisèle Lelouis, tirée d''une étude de Jean-Paul Gourévitch pour Contribuables associés : auteur ni économiste ni statisticien, dépenses estimées faute d''accès aux chiffres officiels, bénéfices non calculés, dépenses non imputables (sécurité, lutte contre l''immigration illégale) incluses. Le rappel des travaux universitaires borne le solde à 10 milliards d''euros maximum, quand l''OCDE trouve au contraire un solde positif d''au moins 10 milliards par an sur 2006-2018.',
  'https://www.franceinfo.fr/replay-radio/le-vrai-du-faux/le-vrai-ou-faux-l-immigration-coute-t-elle-54-milliards-d-euros-a-la-france-chaque-annee-comme-l-affirme-la-deputee-rn-gisele-lelouis_6021698.html',
  null,
  '6007ed16f45184ba188a9d77f1e20b92b702416f9b59898f034b7a75acba4a39',
  null,
  'https://fr.wikipedia.org/wiki/France_Info',
  6
);

delete from public.dossiers where slug = 'immigration-insecurite-criminalite-france';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'immigration-insecurite-criminalite-france',
  'L''immigration est la cause principale de la hausse des crimes et délits en France',
  'FAUX'::verdict_status,
  'Aucune donnée ne soutient un rôle causal de l''immigration : en 2025 comme en 2024, la très large majorité des personnes mises en cause sont de nationalité française — 84 % et 85 % pour les violences physiques (intrafamiliales et hors cadre familial), 88 % pour l''usage de stupéfiants, 91 % pour les vols de véhicule (SSMSI, bilan 2025, publié le 9 juillet 2026). La délinquance enregistrée ne suit pas non plus la courbe migratoire : au 30 juin 2026, sur douze mois glissants, les homicides et tentatives reculent de 3 % et la plupart des atteintes aux biens sont stables ou en baisse (vols avec arme −10 %, vols de véhicule −9 %), quand les violences physiques (+7 %) et sexuelles (+15 %, avec une part d''effet d''enregistrement) progressent.

La surreprésentation observée dans certaines statistiques — 15 à 16 % des mis en cause pour violences physiques, pour 9 % de la population résidant en France — ne dit pas une causalité ethnique : elle varie fortement selon l''infraction (9 % pour les vols de véhicule, 22 % pour le trafic de stupéfiants, 33 % pour les vols violents sans arme), elle inclut des délits que seuls des étrangers peuvent commettre (séjour irrégulier, emploi d''étranger sans titre), et elle est travaillée par la structure d''âge et l''exposition policière.

Les travaux académiques convergent : « les études réalisées dans différents pays concluent sans ambiguïté que les immigrés ne sont pas à l''origine d''une augmentation des taux d''infraction » (Philippe et Valette, Lettre du CEPII n° 436, via l''Institut Convergences Migrations). Le Défenseur des droits documente le biais d''exposition : les « jeunes hommes perçus comme noir ou arabe » ont vingt fois plus de probabilités d''être contrôlés que l''ensemble de la population — un mécanisme qui pèse sur les statistiques de mis en cause, sans rien démontrer d''une délinquance de nationalité.',
  'SOCIETE'::dossier_category,
  '[{"name":"Immigration en France","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Immigration_en_France","note":"Le débat porte sur le lien allégué entre immigration et délinquance enregistrée."},{"name":"Service statistique ministériel de la sécurité intérieure","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Service_statistique_minist%C3%A9riel_de_la_s%C3%A9curit%C3%A9_int%C3%A9rieure","note":"Source des statistiques officielles de la délinquance enregistrée (données des mis en cause)."},{"name":"Laurent Mucchielli","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Laurent_Mucchielli","note":"Sociologue (CNRS), ancien directeur du CESDIP (2004-2009)."},{"name":"Défenseur des droits","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/D%C3%A9fenseur_des_droits","note":"Autorité administrative indépendante ; documentation des contrôles d''identité et du biais d''exposition policière."},{"name":"Ministère de la Justice (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_la_Justice_(France)","note":"Publications statistiques sur la détention et la récidive (SDSE, administration pénitentiaire)."}]'::jsonb,
  95,
  '[{"claim_part":"« Les étrangers commettent la majorité des crimes et délits »","status":"FAUX","detail":"En 2025, les auteurs de violences physiques sont de nationalité française dans 84 % (intrafamiliales) et 85 % (hors cadre familial) des cas résolus ; 88 % des mis en cause pour usage de stupéfiants sont français, 91 % pour les vols de véhicule, 88 % pour les destructions et dégradations délictuelles (SSMSI, bilan 2025, juillet 2026). Les mis en cause étrangers représentent 15 à 16 % des violences physiques, pour 9 % de la population résidant en France."},{"claim_part":"« La nationalité explique la délinquance »","status":"BIAIS_ESSENTIALISTE","detail":"La délinquance de rue est d''abord le fait d''hommes jeunes et précaires, surreprésentés dans les statistiques des mis en cause : pour les destructions et dégradations délictuelles de 2025, les 18-29 ans représentent 35 % des mis en cause quand ils sont 14 % de la population résidant en France (SSMSI). « L''examen rigoureux des statistiques policières ne permet pas de mesurer la délinquance des étrangers » (Mucchielli, CNRS-CESDIP). Le ministère de la Justice mesure même une récidive plus faible des sortants étrangers (- 3,9 points) et un effet du faible niveau d''étude (+ 3,3 points) : ce sont le décrochage scolaire et la précarité qui pèsent, pas la nationalité."},{"claim_part":"« La surreprésentation dans les statistiques de mis en cause prouve une délinquance plus élevée »","status":"BIAIS_METHODOLOGIQUE","detail":"Les « mis en cause » mesurent l''activité d''enquête, pas la délinquance réelle : seuls les faits élucidés y entrent, et l''exposition aux contrôles varie massivement selon le profil. L''enquête relations police-population du Défenseur des droits (2017, plus de 5 000 personnes) l''établit : 80 % des jeunes hommes « perçus comme noir ou arabe » déclarent avoir été contrôlés dans les cinq dernières années, contre 16 % des autres enquêtés — et le Défenseur des droits en conclut « vingt fois plus de probabilités d''être contrôlés, par rapport à l''ensemble de la population ». À quoi s''ajoutent des délits propres au statut de séjour (entrée et séjour irréguliers, aide au séjour, emploi d''étranger sans titre), qui n''existent pas pour les nationaux. La part des étrangers parmi les mis en cause a augmenté depuis 2016 pour 13 des 18 indicateurs du bilan SSMSI — une évolution à rapporter aux flux migratoires et aux pratiques de contrôle, pas une preuve de surdélinquance."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/immigration-insecurite-criminalite-france.jpg',
  'Photo : Eryand, Wikimedia Commons, CC BY-SA 4.0'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '05c12af9-831a-47e4-9391-946eb5c9ba05',
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Insécurité et délinquance en 2025 : bilan statistique (édition 2026, fiches violences physiques et stupéfiants)',
  'SSMSI — Service statistique ministériel de la sécurité intérieure (ministère de l''Intérieur)',
  '2026-07-09',
  'CITATION_EXACTE'::quote_kind,
  'Les auteurs sont pour la plupart de nationalité française (respectivement 84 % et 85 %). La part des mis en cause de nationalités étrangères est de l''ordre de 15 à 16 % alors que les nationalités étrangères représentent 9 % de la population française.',
  'Bilan statistique annuel du SSMSI (10e édition, année 2025, publiée le 9 juillet 2026) : sur les violences physiques, 84 % des mis en cause (intrafamiliales) et 85 % (hors cadre familial) sont de nationalité française ; 88 % des mis en cause pour usage de stupéfiants le sont également, 91 % pour les vols de véhicule et 88 % pour les destructions et dégradations délictuelles. Les étrangers représentent 9 % de la population résidant en France (estimations Insee 2025) — la part de 8 % citée par l''édition précédente a été actualisée.',
  'https://statistiques.interieur.gouv.fr/ssmsi/files/ssmsi/2026-07/Ins%C3%A9curit%C3%A9%20et%20d%C3%A9linquance%20en%202025%20-%20Bilan%20statistique%20-%20%C3%A9dition%202026%20-%20SSMSI.pdf',
  null,
  'edb8baa9d72a087e9cae135f4d0bc1bbd5dc084ed5192d7c77322366707166c6',
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
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '44c30f8e-b706-498c-b8c4-47f169eb20ca',
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'IR68 — La délinquance enregistrée par la police et la gendarmerie nationales : un point à mi-année 2026',
  'SSMSI — Service statistique ministériel de la sécurité intérieure (Dounia Tir)',
  '2026-09-30',
  'CITATION_EXACTE'::quote_kind,
  'Au 30 juin 2026, en France, les homicides, tout comme les tentatives d''homicide, sont en baisse de 3 % au cours des douze derniers mois.',
  'Analyse sur douze mois glissants publiée le 30 septembre 2026 (Interstats Infos rapides n° 68), qui intègre les requalifications au-delà du mois observé : les violences physiques progressent de 7 % (intrafamiliales et hors cadre familial : +7 % chacune), les violences sexuelles de 15 % — hausse à laquelle la consolidation des procédures engagée après l''affaire Lyhanna contribue pour 56 % —, et les mis en cause pour usage comme pour trafic de stupéfiants de 10 % ; à l''inverse, la majorité des atteintes aux biens reculent ou sont stables (vols avec arme −10 %, vols de véhicule −9 %, vols dans et sur véhicules −7 %, destructions et dégradations −2 %).',
  'https://statistiques.interieur.gouv.fr/ssmsi/publications/la-delinquance-enregistree-par-la-police-et-la-gendarmerie-nationales-un-point-mi',
  null,
  'eef5d0c04b170a98984d45eab4c76286a074adc52927c3ceb7d5fb4714c6bc70',
  null,
  'https://fr.wikipedia.org/wiki/Service_statistique_minist%C3%A9riel_de_la_s%C3%A9curit%C3%A9_int%C3%A9rieure',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '7a8cff75-3cce-4ca1-ac08-d839b1fbf42c',
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'CENTRE'::political_spectrum,
  'Contrôles d''identité : que dit le droit et comment mettre fin aux contrôles discriminatoires ?',
  'Défenseur des droits',
  '2024-02-15',
  'CITATION_EXACTE'::quote_kind,
  'Les « jeunes hommes perçus comme noir ou arabe » ont donc vingt fois plus de probabilités d''être contrôlés, par rapport à l''ensemble de la population.',
  'Dossier thématique du Défenseur des droits (15 février 2024, sept recommandations) : un contrôle discriminatoire, défini par des critères liés à des caractéristiques physiques associées à une origine réelle ou supposée, « constitue une faute lourde engageant la responsabilité de l''État ». Le biais d''exposition est documenté par l''enquête relations police-population de janvier 2017 (plus de 5 000 personnes) : 80 % des jeunes hommes « perçus comme noir ou arabe » déclarent avoir été contrôlés dans les cinq dernières années, contre 16 % des autres enquêtés ; la Cour des comptes évalue à 47 millions le nombre de contrôles en 2021.',
  'https://www.defenseurdesdroits.fr/controles-didentite-que-dit-le-droit-et-comment-mettre-fin-aux-controles-discriminatoires-565',
  null,
  'bff5cb82b294742779a535c4afc0c75390cc6dfc5fa6787a67c13552fd8654f9',
  null,
  'https://fr.wikipedia.org/wiki/D%C3%A9fenseur_des_droits',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '9b98f743-912b-437d-ac57-ff20d2e7c189',
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'La Lettre du CEPII n° 436 — Immigration et délinquance : réalités et perceptions (reprise par l''Institut Convergences Migrations)',
  'Arnaud Philippe (université de Bristol) et Jérôme Valette (CEPII, ICM) — Institut Convergences Migrations (CNRS)',
  '2023-04-20',
  'CITATION_EXACTE'::quote_kind,
  'Pourtant, les études réalisées dans différents pays concluent sans ambiguïté que les immigrés ne sont pas à l''origine d''une augmentation des taux d''infraction dans les pays d''accueil. Et si les étrangers en situation irrégulière ont une probabilité plus forte de commettre des vols, un meilleur accès au marché du travail peut résorber cet écart.',
  'Note de recherche relayée par l''Institut Convergences Migrations (CNRS) — Jérôme Valette en dirige le département DYNAMICS : les travaux internationaux ne trouvent pas d''effet de l''immigration sur les taux d''infraction des pays d''accueil, et la surreprésentation dans les statistiques comme le traitement médiatique expliquent l''écart entre perceptions et réalité — l''expérience allemande montre qu''un traitement neutre de l''origine des auteurs présumés réduit les inquiétudes.',
  'https://www.icmigrations.cnrs.fr/2023/04/20/publi-arnaud-philippe-et-jerome-valette-la-lettre-du-cepii-n-436/',
  null,
  '225d3bea833fcad5b6bd8f3a84139ae4f17663173757876c64da1c5350a5d66d',
  null,
  null,
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '71a9ece0-f9e7-493b-9073-61ab14d848fb',
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« Insécurité et délinquance en 2025 : bilan statistique — édition 2026 » — SSMSI, ministère de l''Intérieur',
  'SSMSI — Service statistique ministériel de la sécurité intérieure (sous la direction de Mickaël Portela)',
  '2026-07-09',
  'CITATION_EXACTE'::quote_kind,
  'Les auteurs sont pour la plupart de nationalité française (respectivement 84 % et 85 %). La part des mis en cause de nationalités étrangères est de l''ordre de 15 à 16 % alors que les nationalités étrangères représentent 9 % de la population française. Parmi les étrangers, il s''agit majoritairement de personnes originaires d''un pays d''Afrique (9 % à 10 % des mis en cause, contre 4 % d''étrangers en France originaires d''Afrique).',
  'Bilan statistique 2025 (fiche « Violences physiques », p. 101) : 84 à 85 % des mis en cause sont français ; les étrangers, 9 % de la population (8 % dans l''édition précédente), représentent 15 à 16 % des mis en cause. Une surreprésentation réelle, mais qui n''établit aucune causalité : le SSMSI prévient lui-même que ces caractéristiques « rendent les analyses sommaires pour la compréhension des phénomènes de délinquance », et les indicateurs de délinquance dépendent aussi des plaintes et des politiques de contrôle.',
  'https://statistiques.interieur.gouv.fr/ssmsi/files/ssmsi/2026-07/Ins%C3%A9curit%C3%A9%20et%20d%C3%A9linquance%20en%202025%20-%20Bilan%20statistique%20-%20%C3%A9dition%202026%20-%20SSMSI.pdf',
  null,
  'dc8ba988c32ca8703f228ef5709ac3e76bcdec7931d8ce1b1067d2a5d4580c28',
  null,
  'https://fr.wikipedia.org/wiki/Service_statistique_minist%C3%A9riel_de_la_s%C3%A9curit%C3%A9_int%C3%A9rieure',
  9
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '54cb1a56-a4cf-4506-bca2-5b648de3ecc3',
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'CENTRE'::political_spectrum,
  '« Immigration et délinquance : attention aux interprétations trompeuses des chiffres du ministère de l''Intérieur » — AFP Factuel (3 mai 2024)',
  'AFP France — Factuel (Agence France-Presse)',
  '2024-05-03',
  'CITATION_EXACTE'::quote_kind,
  'Sans compter que la mesure de la délinquance est notoirement complexe. Autant de biais, rappellent-ils, qui entretiennent les stéréotypes présentant l''immigration comme synonyme d''insécurité. En outre, des études menées dans d''autres pays n''ont pas relevé de lien causal entre arrivée d''étrangers et hausse générale et massive de la délinquance.',
  'Fact-check de l''AFP confrontant les chiffres du SSMSI aux affirmations de Bardella et Maréchal : six chercheurs interrogés démontent les amalgames (« étrangers » / « immigrés », « mis en cause » / « condamnés ») et les biais — âge, sexe, contrôles au faciès, non-plainte. L''AFP écrit qu''aucune étude menée à l''étranger n''a relevé de lien causal entre arrivée d''étrangers et hausse générale de la délinquance.',
  'https://web.archive.org/web/20241009170820/https://factuel.afp.com/doc.afp.com.34QB9EL',
  null,
  '6f7d8a7e22c336a4a7caae5fd56671f067176029ac88667ac2cb8dab8cb34ec7',
  null,
  'https://fr.wikipedia.org/wiki/Agence_France-Presse',
  10
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'd798669e-9aa3-48d0-ae91-bc5134cd0e6b',
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Immigration et criminalité : quels résultats empiriques et quels mécanismes théoriques à l''œuvre ? » — DIALOGUE n° 71, mars 2024 (DIAL, CNRS/IRD/Paris-Dauphine)',
  'Fabio Mariani (IRES/LIDAM, UCLouvain) et Marion Mercier (DIAL, LEDa, CNRS, IRD, Université Paris-Dauphine-PSL)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'La littérature empirique ne pointe donc pas vers l''idée d''un effet de l''immigration sur l''augmentation du crime. Les données individuelles indiquent que les migrants ne commettent pas plus de crime que les natifs, et les résultats agrégés sur l''impact causal de l''immigration sont mixtes, avec un effet nul dans la majorité des travaux, et non-nul pour certaines catégories de crimes et/ou de migrants.',
  'Revue de littérature francophone (lettre d''un laboratoire d''économie, non évaluée par les pairs, signée par deux économistes académiques) : les travaux individuels ne montrent pas plus d''infractions chez les migrants que chez les natifs ; les résultats agrégés sont mixtes, avec un effet nul dans la majorité des travaux — l''effet n''est non-nul que pour certaines catégories de crimes ou de migrants, ce qui interdit toute imputation générale.',
  'https://web.archive.org/web/20240716035745/https://dial.ird.fr/wp-content/uploads/2024/03/DIALogue71_FR.pdf',
  null,
  'fd77788f2db670dfdaba555e949bd3619627a5d7d82bd1103cfd37204b00e248',
  null,
  null,
  11
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '15724a67-cad5-4298-bc23-fd1221363f20',
  '0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Immigration and Crime: Assessing a Contentious Issue » — Annual Review of Criminology, vol. 1, p. 63-84 (2018)',
  'Graham C. Ousey (College of William & Mary) et Charis E. Kubrin (University of California, Irvine)',
  '2018-01-13',
  'CITATION_EXACTE'::quote_kind,
  'Findings indicate that, overall, the immigration-crime association is negative—but very weak. At the same time, there is significant variation in findings across studies.',
  'Méta-analyse internationale de 51 études (1994-2014) portant sur des unités géographiques : l''association moyenne immigration-criminalité est négative mais très faible (de l''ordre de -0,031), donc pratiquement nulle. Les études sont majoritairement américaines : c''est un repère comparatif, pas une preuve directe sur la France. Citation en anglais, langue de l''article.',
  'https://doi.org/10.1146/annurev-criminol-032317-092026',
  null,
  '8ce5c50a87717d141a2bf413c3cea1f219213e6d60fc6e94b798a316f8b62101',
  null,
  null,
  12
);

delete from public.dossiers where slug = 'expulsion-etrangers-delinquants-juges-et-droit';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '054e7ed1-684a-4161-8092-55af18bf6613',
  'expulsion-etrangers-delinquants-juges-et-droit',
  'Les juges et l''État de droit empêchent l''expulsion des étrangers délinquants',
  'FAUX'::verdict_status,
  'Le droit français et européen prévoient explicitement l''éloignement pour menace à l''ordre public : l''expulsion est ouverte sur ce fondement (CESEDA, art. L. 631-1) et l''article 8 de la Convention européenne des droits de l''homme autorise les ingérences « nécessaires à la sûreté publique… à la défense de l''ordre et à la prévention des infractions pénales ».

L''échec de l''exécution tient à d''autres causes : la Cour des comptes relève qu''« autour de 10 % » des OQTF sont exécutées, du fait de l''identification incertaine des personnes, du manque de places en rétention et de la réticence des pays d''origine à délivrer les laissez-passer consulaires (57,5 % de délivrance dans les délais en 2024, selon la commission des lois du Sénat).

Le contentieux n''annule qu''une minorité des mesures (18 % des OQTF en 2022).',
  'POLITIQUE'::dossier_category,
  '[{"name":"Obligation de quitter le territoire français","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Obligation_de_quitter_le_territoire_fran%C3%A7ais","note":"Mesure d''éloignement administrative au cœur du débat (prononcé, exécution, contentieux)."},{"name":"Cour des comptes (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)","note":null},{"name":"Sénat (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)","note":"Avis budgétaire de la commission des lois, tome « Immigration, asile et intégration » (2024)."},{"name":"Conseil d''État (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)","note":null}]'::jsonb,
  95,
  '[{"claim_part":"« Les traités internationaux interdisent d''expulser un étranger dangereux »","status":"FAUX","detail":"L''article 8 § 2 de la CEDH admet expressément les ingérences « nécessaires à la sécurité nationale, à la sûreté publique… à la défense de l''ordre et à la prévention des infractions pénales ». Le CESEDA permet à l''autorité administrative d''expulser un étranger dont la présence constitue une menace grave pour l''ordre public (art. L. 631-1), l''article L. 631-3 écartant même les protections de certaines catégories en cas de condamnation définitive à cinq ans ou plus d''emprisonnement."},{"claim_part":"« L''échec des expulsions résulte d''annulations systématiques par les juges »","status":"CONFUSION_CONCEPTUELLE","detail":"En 2022, les tribunaux administratifs ont annulé 18 % des OQTF qui leur étaient présentées (Cour des comptes) : une minorité, pas une annulation systématique. La Cour identifie d''autres causes premières : identification incertaine (20 à 30 % des personnes non identifiées avec certitude), capacité de rétention limitée (1 717 places pour 447 257 OQTF prononcées entre 2019 et 2022) et surtout réticence des pays d''origine à délivrer les laissez-passer consulaires, indispensables en l''absence de passeport."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/expulsion-etrangers-delinquants-juges-et-droit.jpg',
  'Photo : Sukkoria, Wikimedia Commons, CC BY-SA 4.0'
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
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '0e1b8f44-c24c-4dc2-a3b2-e80883a674a8',
  '054e7ed1-684a-4161-8092-55af18bf6613',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« Les chiffres clés de l''immigration — 2024 », fiche 031 « Les éloignements et départs » — Ministère de l''Intérieur',
  'Ministère de l''Intérieur — DGEF, Département des statistiques, des études et de la documentation',
  null,
  'CITATION_EXACTE'::quote_kind,
  'L''absence de documents de voyage constitue un obstacle important pour l''exécution de l''éloignement des étrangers en situation irrégulière. En effet, lorsqu''un étranger en instance d''éloignement ne présente aucun passeport ou aucun autre document l''autorisant à regagner le pays dont il possède la nationalité, la préfecture en charge de l''exécution de la mesure d''éloignement ou d''expulsion doit solliciter un laissez-passer auprès des autorités du pays dont il est supposé être le ressortissant.',
  'Données officielles du ministère : 145 107 mesures d''éloignement prononcées en 2024 (-7,3 %) pour 21 601 éloignements mis en œuvre (+26,7 %). Le document désigne comme premier obstacle l''absence de documents de voyage — les laissez-passer consulaires, dont le taux de délivrance dans les délais atteint 56,3 % (+8,7 points) — et non une décision de justice.',
  'https://www.immigration.interieur.gouv.fr/sites/dgef/files/medias/documents/2026-03/Chiffres_Cles_IMMIG_2024_WEB.pdf',
  null,
  '9a5c278b752d8aadd7ea5b9ad3862421300f6cb1aa1b7bcdd76227e3ba2f6c0a',
  null,
  'https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_l%27Int%C3%A9rieur_(France)',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'dd6cbee9-5a5c-4d85-be4b-ca3d447a4416',
  '054e7ed1-684a-4161-8092-55af18bf6613',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Projet de loi de finances pour 2026 — Note de présentation — Mission « Immigration, asile et intégration » (5 novembre 2025)',
  'Sénat, commission des finances — rapporteur spécial Marie-Carole Ciuntu (groupe Les Républicains)',
  '2025-11-05',
  'CITATION_EXACTE'::quote_kind,
  'Le faible taux d''exécution des OQTF contraste avec celui des expulsions, prononcées pour des raisons de menaces graves à l''ordre public. En 2025, 42 % des expulsions ont été exécutées (sur 539 arrêtés d''expulsions prononcés au 30 juin 2025, 228 ont été pour l''heure exécutés).',
  'Note sénatoriale de droite : quand la mesure est un arrêté d''expulsion pour menace grave à l''ordre public, 42 % sont exécutés au premier semestre 2025 (228 sur 539) et les expulsions forcées augmentent de 47 % entre 2024 et 2025 sous l''effet de la loi du 26 janvier 2024. Le droit ne bloque pas l''éloignement, il l''accélère ; la sous-exécution des OQTF (10,6 % au S1 2025) tient à des causes opérationnelles et consulaires.',
  'https://www.senat.fr/fileadmin/Commissions/Finances/2025-2026/PLF_2026/NP/Immigration_PLF_26_NP.pdf',
  null,
  '7811201c5691e98135fd4da030c61a01146f1e08fb69a7234f28cf9653e10949',
  null,
  'https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '9a587bd8-0161-44fc-94d9-e1ef11e59ac5',
  '054e7ed1-684a-4161-8092-55af18bf6613',
  'CENTRE'::political_spectrum,
  'Séance thématique de contrôle : « Les résultats de la politique d''éloignement des personnes sous obligation de quitter le territoire français (OQTF) » — Assemblée nationale, juin 2025',
  'Assemblée nationale, commission des lois — Anne Bergantz, Éric Pauget, Sophie Ricourt Vaginay',
  '2025-06-10',
  'CITATION_EXACTE'::quote_kind,
  'En France, environ une OQTF sur dix est exécutée, soit de l''ordre de 15 000 sur les 130 000 prononcées en 2024.',
  'Rapport parlementaire de contrôle : le taux d''exécution est d''environ un sur dix, et la note énumère les obstacles réels — « contentieux multiples, manque de moyens et de places en rétention, difficultés d''identification, fuites, obtention de laisser-passer consulaires » — en soulignant que « la politique de l''éloignement est de longue date déficiente, malgré l''assiduité du législateur et les efforts de l''administration ». Le contentieux ne pèse que minoritairement : 18 % des OQTF ont été annulées en première instance en 2023.',
  'https://web.archive.org/web/20250716220919/https://www.assemblee-nationale.fr/dyn/17/documents/cion_lois/l17n813203444_document.pdf',
  null,
  '8d0f42a22a7e927469df965ca487d03b3d8e992e4599df5c619936e4e745cbcd',
  null,
  'https://fr.wikipedia.org/wiki/Assembl%C3%A9e_nationale_(France)',
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '20d6dcbc-d476-4d52-bea2-968898ddb190',
  '054e7ed1-684a-4161-8092-55af18bf6613',
  'GAUCHE'::political_spectrum,
  '« Le taux d''exécution des OQTF est-il de 7 % ou de 20 % comme l''affirme Gérald Darmanin ? » — CheckNews, Libération (4 octobre 2024)',
  'Elsa de La Roche Saint-André (CheckNews / Libération)',
  '2024-10-04',
  'CITATION_EXACTE'::quote_kind,
  'En schématisant, la masse des OQTF prononcées est globalement gonflée et celle des OQTF exécutées plutôt sous-estimée. D''où un taux tiré vers le bas.',
  'Vérification de gauche : le « 7 % » est un artefact de calcul — OQTF comptées plusieurs fois, mesures non exécutables incluses, seuls les éloignements forcés retenus — tandis que les sorties réelles sont plus élevées (137 730 OQTF prononcées en 2023 pour 22 704 sorties de territoire, soit 16,4 %). Aucun veto judiciaire : une sous-exécution d''origine administrative et consulaire.',
  'https://web.archive.org/web/20241006010350/https://www.liberation.fr/checknews/le-taux-dexecution-des-oqtf-est-il-de-7-ou-de-20-comme-laffirme-gerald-darmanin-20241004_PMBTTRISTNDN3P3ANDECQKSEDE/',
  null,
  '252442ba98cb960ffe216a8fd916ff7cd1822f725044422f078a436e06f65063',
  null,
  'https://fr.wikipedia.org/wiki/Lib%C3%A9ration_(journal)',
  9
);

delete from public.dossiers where slug = 'allocation-demandeur-asile-carte-bancaire-montant';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '15c8d34e-83ed-494c-9cbb-637f41b4d056',
  'allocation-demandeur-asile-carte-bancaire-montant',
  'Un demandeur d''asile touche entre 1 200 € et 2 000 € par mois avec une carte bancaire de l''État',
  'FAUX'::verdict_status,
  'Le barème réglementaire est sans rapport avec les montants allégués : 6,80 € par jour pour une personne seule hébergée (206,83 € par mois) et 14,20 € par jour si aucun hébergement ne lui est proposé (431,92 €), soit, selon la recherche, « la plus faible des prestations sociales en France, très largement inférieure au RSA ».

La carte délivrée par l''OFII n''est pas une carte de crédit : elle est alimentée par le seul versement mensuel de l''ADA, sans possibilité de retrait d''espèces ni de virements, sans paiement en ligne ni sans contact (Défenseur des droits).

Le versement est temporaire et conditionnel : il cesse à la fin du mois suivant la notification de la décision pour les personnes qui obtiennent une protection, et 61 000 cessations ou retraits ont été opérés en 2025 (Sénat, commission des finances). Dépense totale d''ADA en 2025 : 353,4 M€ (Cour des comptes).',
  'SOCIETE'::dossier_category,
  '[{"name":"Allocation pour demandeur d''asile","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Allocation_pour_demandeur_d%27asile","note":"Prestation créée en 2015, versée pendant l''instruction de la demande d''asile."},{"name":"Office français de l''immigration et de l''intégration","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Office_fran%C3%A7ais_de_l%27immigration_et_de_l%27int%C3%A9gration","note":"Gère l''ADA et délivre la carte de paiement sur laquelle elle est versée."},{"name":"Défenseur des droits","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/D%C3%A9fenseur_des_droits","note":null},{"name":"Cour des comptes (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)","note":null},{"name":"Sénat (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)","note":"Commission des finances — rapport de contrôle sur les coûts de l''asile (2026)."}]'::jsonb,
  100,
  '[{"claim_part":"« L''État donne une carte de crédit créditée de 1 500 € par mois aux migrants »","status":"FAUX","detail":"Le montant légal est un forfait journalier modique, indexé sur la composition du foyer : 6,80 €/jour pour une personne seule hébergée (206,83 €/mois) ; aucun hébergement proposé : + 7,40 €/jour, soit 431,92 €/mois au total ; + 3,40 € par personne supplémentaire. Aucun dispositif ne verse 1 200 à 2 000 € par mois à un demandeur d''asile isolé. La carte de l''OFII n''est pas une carte de crédit : elle est alimentée par le seul montant de l''allocation versée, sans possibilité de retrait d''espèces ni de virements depuis 2019 (fonctionnalités réduites documentées par le Défenseur des droits : pas de paiement en ligne, sans contact inactif)."},{"claim_part":"« Cette aide financière est accordée à vie et sans conditions »","status":"FAUX","detail":"Versement temporaire : dû à compter de l''acceptation des conditions matérielles d''accueil et pendant la durée d''instruction de la demande ; il cesse à la fin du mois qui suit celui de la notification de la décision pour les personnes qui obtiennent la qualité de réfugié ou la protection subsidiaire, et il est suspendu en cas de défaut de validité de l''attestation de demande d''asile. Les fins de versement sont massives : 61 000 cessations ou retraits de l''ADA ont été opérés en 2025, contre 46 000 en 2022 (Sénat)."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/allocation-demandeur-asile-carte-bancaire-montant.jpg',
  'Photo : NicolasPamart2610, Wikimedia Commons, CC BY-SA 4.0'
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
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '98f17905-d0f3-40e4-b240-140d4462f89a',
  'sans-papiers-rsa-caf-apl-aides-sociales',
  'Les étrangers sans-papiers touchent le RSA, la CAF et les APL, y compris pour leurs enfants',
  'FAUX'::verdict_status,
  'Les personnes en situation irrégulière sont exclues des prestations sociales de droit commun : « les étrangers dont le séjour est irrégulier ne peuvent prétendre à aucune aide ou prestation sociale de droit commun » et ne bénéficient que de l''AME, de l''hébergement d''urgence et de l''aide au retour (Sénat).

Les prestations familiales sont réservées aux étrangers titulaires d''un titre de séjour régulier (CSS, art. L. 512-2) et l''APL suppose « un titre de séjour en cours de validité » (service-public.fr) ; la CNAF rappelle que « le droit aux prestations servies par les CAF est conditionné à la régularité du séjour », contrôlée via le portail AGDREF.

L''enfance ne crée pas d''exception : les prestations sont versées à l''allocataire, dont le titre conditionne le droit ; l''AME — qui couvre aussi les mineurs —, l''hébergement d''urgence et l''aide au retour restent les seules portes ouvertes sans titre. Le détail légal du RSA est traité dans le dossier « Les étrangers sans-papiers touchent le RSA dès leur arrivée en France ».',
  'SOCIETE'::dossier_category,
  '[{"name":"Revenu de solidarité active","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Revenu_de_solidarit%C3%A9_active","note":"Prestation dont les conditions d''accès aux étrangers sont fixées par le CASF."},{"name":"Caisse nationale des allocations familiales","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Caisse_nationale_des_allocations_familiales","note":"Verse les prestations familiales et contrôle la régularité du séjour des allocataires."},{"name":"Aide médicale d''État","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Aide_m%C3%A9dicale_d%27%C3%89tat","note":"Dispositif spécifique — avec l''hébergement d''urgence — accessible aux personnes en situation irrégulière."},{"name":"Conseil constitutionnel (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)","note":null},{"name":"Sénat (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)","note":"Commission des affaires sociales — rapport sur la condition de durée de résidence (2025)."}]'::jsonb,
  100,
  '[{"claim_part":"« Un clandestin peut s''inscrire à la CAF et toucher des allocations »","status":"FAUX","detail":"Le droit aux prestations de la branche Famille est conditionné à la régularité du séjour (instruction CNAF IT-2024-232) ; l''article L. 512-2 du code de la sécurité sociale réserve les prestations familiales aux étrangers « titulaires d''un titre exigé d''eux... pour résider régulièrement en France » ; l''APL suppose un titre de séjour en cours de validité. Au titre de l''article L. 111-1 du code de la sécurité sociale, les étrangers en séjour irrégulier ne peuvent prétendre à aucune aide ou prestation sociale de droit commun : hors AME, hébergement d''urgence et aide au retour, il n''y a ni RSA, ni allocations familiales, ni APL."},{"claim_part":"« Les enfants suffisent à ouvrir la CAF et les APL aux sans-papiers »","status":"FAUX","detail":"Les prestations familiales sont versées à l''allocataire, pas aux enfants : le droit dépend du titre de séjour de l''adulte qui en a la charge (CSS, art. L. 512-2), et l''APL suppose un titre en cours de validité. L''enfance n''ouvre donc pas, à elle seule, un droit à ces prestations ; les seules portes sans titre restent l''AME — qui couvre aussi les mineurs —, l''hébergement d''urgence et l''aide au retour (Sénat)."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/sans-papiers-rsa-caf-apl-aides-sociales.jpg',
  'Photo : Fabio Gargano, Wikimedia Commons, CC BY-SA 4.0'
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

delete from public.dossiers where slug = 'agression-bordeaux-clandestin-oqtf';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  'eb0118fd-17bb-49d6-b8f4-faa6eb3333fe',
  'agression-bordeaux-clandestin-oqtf',
  'L''agression de Bordeaux a été commise par un clandestin sous OQTF',
  'FAUX'::verdict_status,
  'L''auteur de l''agression du 19 juin 2023 — un homme de 29 ans — est de nationalité française, né le 12 juillet 1993 à Bordeaux : il ne peut donc être ni un « clandestin », ni visé par une obligation de quitter le territoire français, mesure que le CESEDA réserve à « un étranger » (art. L. 611-1).

Les expertises ont établi « des troubles du comportement majeurs en lien avec une pathologie psychotique et schizophrène », en rupture de traitement : sa garde à vue a été levée et il a été admis en soins psychiatriques sans consentement à l''hôpital Charles-Perrens, sur décision du représentant de l''État.

Aucune procédure d''éloignement n''a jamais été en cause dans ce dossier.',
  'FAITS_DIVERS'::dossier_category,
  '[{"name":"Obligation de quitter le territoire français","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Obligation_de_quitter_le_territoire_fran%C3%A7ais","note":"Mesure d''éloignement qui ne peut viser qu''un étranger — inapplicable à un citoyen français."},{"name":"Schizophrénie","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Schizophr%C3%A9nie","note":"Pathologie retenue par les expertises pour l''auteur des faits."},{"name":"Contrôleur général des lieux de privation de liberté","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Contr%C3%B4leur_g%C3%A9n%C3%A9ral_des_lieux_de_privation_de_libert%C3%A9","note":null},{"name":"Bordeaux","kind":"LIEU","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Bordeaux","note":"Lieu des faits (cours de la Martinique, quartier des Chartrons) et lieu de naissance de l''auteur."}]'::jsonb,
  100,
  '[{"claim_part":"« L''agresseur est un étranger sans-papiers »","status":"FAUX","detail":"Le parquet de Bordeaux a communiqué l''identité et la situation précises du suspect : « un homme de 29 ans, né le 12 juillet 1993 à Bordeaux, de nationalité française, SDF » (communiqué relayé par France 3 Nouvelle-Aquitaine). Le Figaro rapporte de même : « Le mis en cause est de nationalité française. Né en 1993 à Bordeaux ». L''intéressé est défavorablement connu de la police et de la justice (quinze condamnations pour délits routiers et stupéfiants) — mais né et citoyen français."},{"claim_part":"« L''acte illustre une OQTF non exécutée »","status":"FAUX","detail":"L''obligation de quitter le territoire français est « un acte administratif par lequel les autorités préfectorales imposent à une personne étrangère de quitter le territoire français » (Revue Alyoda) ; l''article L. 611-1 du CESEDA dispose que « l''autorité administrative peut obliger un étranger à quitter le territoire français ». Une mesure d''éloignement était donc juridiquement impossible à l''encontre d''un citoyen français né à Bordeaux : aucune OQTF, exécutée ou non, n''est en cause dans cette affaire."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/agression-bordeaux-clandestin-oqtf.jpg',
  'Photo : Javier Perez Montes, Wikimedia Commons, CC BY-SA 4.0'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'a29a9afc-0391-443b-beec-03c19eb5d505',
  'eb0118fd-17bb-49d6-b8f4-faa6eb3333fe',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Agression violente d''une grand-mère et sa petite-fille à Bordeaux : le suspect transféré dans un hôpital psychiatrique',
  'France 3 Nouvelle-Aquitaine (franceinfo) — d''après les communiqués du parquet de Bordeaux',
  '2023-06-20',
  'CITATION_EXACTE'::quote_kind,
  'un homme de 29 ans, né le 12 juillet 1993 à Bordeaux, de nationalité française, SDF',
  'Article reprenant les communiqués du parquet de Bordeaux : interpellation une heure après les faits, « L''homme était très agité et résistant à son interpellation », puis transfert à l''hôpital psychiatrique Charles-Perrens, la garde à vue ayant été levée « suite à expertise ayant préconisé des soins psychiatriques sur décision du représentant de l''État ». Selon le vice-procureur, « L''intéressé présente des troubles du comportement majeurs en lien avec une pathologie psychotique et schizophrène. »',
  'https://france3-regions.franceinfo.fr/nouvelle-aquitaine/gironde/bordeaux/agression-violente-filmee-a-bordeaux-ce-que-l-on-sait-2799218.html',
  null,
  'c8e0e6fa3a7d8a890d87fe0057535bf2c166ae02baf9b9b000e068a9d5eb82a4',
  null,
  null,
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '25ccb728-8b56-4787-97e4-e00671277565',
  'eb0118fd-17bb-49d6-b8f4-faa6eb3333fe',
  'CENTRE'::political_spectrum,
  'Ce que l''on sait de la violente agression d''une femme âgée et de sa petite-fille à Bordeaux',
  'franceinfo (avec AFP)',
  '2023-06-20',
  'CITATION_EXACTE'::quote_kind,
  'Plusieurs responsables d''extrême droite ont au contraire mis en cause la politique gouvernementale et l''immigration, bien que le suspect soit français.',
  'Article de synthèse : « L''homme, né en 1993, de nationalité française, est défavorablement connu des services de police et de justice pour des délits routiers et liés aux stupéfiants. » La famille des victimes s''est dite « indignée par la récupération politique qui est faite de ce fait divers », estimant qu''« il est parfaitement indécent de se servir de ce fait divers pour évoquer une origine ethnique ou de justifier des réformes pénales ou migratoires ».',
  'https://www.franceinfo.fr/faits-divers/bordeaux-une-femme-agee-et-sa-petite-fille-violemment-agressees-a-bordeaux_5899490.html',
  null,
  '589e9559b7fe05755d3f08e922bdf18a8aa1c8bd92e529db8d1c6084ef415502',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '65b40adf-f284-4c63-9dcc-d6e72435cb99',
  'eb0118fd-17bb-49d6-b8f4-faa6eb3333fe',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Bordeaux : une retraitée et sa petite-fille violemment agressées, le suspect placé en soins psychiatriques',
  'Le Figaro (Marie-Hélène Hérouart, Jean Cittone)',
  '2023-06-20',
  'CITATION_EXACTE'::quote_kind,
  'Le mis en cause est de nationalité française. Né en 1993 à Bordeaux',
  'Le Figaro rapporte les communiqués du parquet : l''auteur « présente des troubles du comportement majeurs en lien avec une pathologie psychotique et schizophrène. Au moment des faits, il était selon des proches en rupture de soins » ; « Il sera pris en charge par l''hôpital Charles Perrens. » Le quotidien précise que le mis en cause (« Ce Français sous tutelle ») avait été condamné quinze fois pour des délits routiers et des infractions à la législation sur les stupéfiants.',
  'https://www.lefigaro.fr/actualite-france/une-femme-agee-et-sa-petite-fille-violemment-agressees-a-bordeaux-20230620',
  null,
  '2e9a1d71f8a4ada5772705c188b06f07f4e9b23b86a4d232a8c1ec535118408e',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '4b082365-9e4d-44d8-9310-c95b64590176',
  'eb0118fd-17bb-49d6-b8f4-faa6eb3333fe',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de l''entrée et du séjour des étrangers et du droit d''asile — article L. 611-1 (obligation de quitter le territoire français)',
  'Légifrance (République française)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'L''autorité administrative peut obliger un étranger à quitter le territoire français lorsqu''il se trouve dans les cas suivants :',
  'Texte en vigueur : l''OQTF ne peut être prononcée qu''à l''encontre d''« un étranger » (séjour irrégulier, expiration de visa, rejet d''une demande d''asile, menace à l''ordre public, etc.). Un citoyen français — a fortiori né à Bordeaux — ne peut faire l''objet d''une telle mesure, quel que soit son casier judiciaire. Citation vérifiée sur le texte reproduit par des miroirs institutionnels (Justicelibre, Pappers Justice), Légifrance bloquant les robots.',
  'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042775578',
  null,
  '29cc27208c6589bae78e29d7da1c27a85b3b8498939fe194de114decea88abe7',
  null,
  null,
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '57d407c8-784f-4145-bc8e-b91a55cc24c7',
  'eb0118fd-17bb-49d6-b8f4-faa6eb3333fe',
  'CENTRE'::political_spectrum,
  'Soins sans consentement et droits fondamentaux (rapport thématique)',
  'Contrôleur général des lieux de privation de liberté (CGLPL)',
  '2020-03-16',
  'CITATION_EXACTE'::quote_kind,
  'La loi maintient les pouvoirs du préfet pour prendre une décision d''admission en soins sans consentement d''une personne dont les troubles « compromettent la sûreté des personnes ou portent atteinte, de façon grave, à l''ordre public »',
  'Le rapport de l''autorité indépendante décrit le cadre légal (loi du 5 juillet 2011) des soins psychiatriques sans consentement sur décision du représentant de l''État : c''est ce dispositif — et non une procédure d''éloignement — qui a conduit à l''hospitalisation sous contrainte du suspect de Bordeaux, la garde à vue ayant été levée pour permettre les soins.',
  'https://www.cglpl.fr/app/uploads/2020/06/Rapport-soins-sans-consentement-et-droits-fondamentaux_web.pdf',
  null,
  'a52e77d8bdbbd39d4a530fbf04d407fc91179c53715168d1a6c2e09c18eef0d8',
  null,
  'https://fr.wikipedia.org/wiki/Contr%C3%B4leur_g%C3%A9n%C3%A9ral_des_lieux_de_privation_de_libert%C3%A9',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'c713ee8f-e572-4e18-866d-c8c10f6f3e20',
  'eb0118fd-17bb-49d6-b8f4-faa6eb3333fe',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Sur les fondements des mesures d''éloignement — note de jurisprudence (CAA Lyon, 13 octobre 2022, n° 21LY03282)',
  'Louanne Vendittelli (Revue Alyoda, 2023/1)',
  '2023-05-03',
  'CITATION_EXACTE'::quote_kind,
  'La mesure d''éloignement en question est une obligation de quitter le territoire français, c''est-à-dire un acte administratif par lequel les autorités préfectorales imposent à une personne étrangère de quitter le territoire français.',
  'Note de jurisprudence publiée par la revue académique Alyoda (Pôle de Lyon) : créée par la loi n° 2006-911 du 24 juillet 2006, l''OQTF « vise à simplifier la procédure d''éloignement des étrangers en situation irrégulière » et son régime est codifié à l''article L. 611-1 du CESEDA (ex-L. 511-1). Elle ne vise donc par construction que des personnes étrangères.',
  'https://alyoda.eu/index.php?id=8693',
  null,
  'ab2359463bca1f8995f01f27e0a17d4b9b9a293ef030b056bbe0dbc0e1463da9',
  null,
  null,
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '2cd73366-adc9-4c70-bc0b-0fbf4c83a379',
  'eb0118fd-17bb-49d6-b8f4-faa6eb3333fe',
  'CENTRE'::political_spectrum,
  '« Violente agression d''une grand-mère et de sa petite-fille à Bordeaux : l''auteur condamné et écroué » — Sud Ouest (27 janvier 2024)',
  'Jean-Michel Desplos (Sud Ouest)',
  '2024-01-27',
  'CITATION_EXACTE'::quote_kind,
  'L''auteur de l''agression d''une grand-mère et de sa petite-fille dont la vidéo avait été partagée sur les réseaux sociaux a été condamné, ce vendredi 26 janvier, à deux ans de prison dont un an de sursis probatoire',
  'Compte rendu judiciaire régional : condamnation le 26 janvier 2024 par le tribunal correctionnel de Bordeaux (violation de domicile et violences) à deux ans de prison dont un an avec sursis probatoire assorti d''une obligation de soins, mandat de dépôt et écrou au centre pénitentiaire de Gradignan. Une peine de droit commun ; aucune mesure d''éloignement n''apparaît dans la procédure. Citation sans point final, absent de la source (chapô).',
  'https://www.sudouest.fr/justice/violente-agression-d-une-grand-mere-et-de-sa-petite-fille-a-bordeaux-l-auteur-condamne-et-ecroue-18315354.php',
  null,
  '46baa2a670b4c6d479f8c3dc43d1d71c0156a218f24c46ac92cd3a553dc8ab0f',
  null,
  'https://fr.wikipedia.org/wiki/Sud_Ouest',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '2565382f-22f5-4543-87d8-2f1ff747a9c3',
  'eb0118fd-17bb-49d6-b8f4-faa6eb3333fe',
  'CENTRE'::political_spectrum,
  '« Bordeaux : l''agresseur de la grand-mère et de sa petite fille condamné à deux ans de prison dont un an ferme » — Le Parisien (27 janvier 2024)',
  'Le Parisien (rédaction)',
  '2024-01-27',
  'CITATION_EXACTE'::quote_kind,
  'L''auteur de l''agression a été condamné ce vendredi par le tribunal de Bordeaux à une peine de deux ans de prison dont un an de sursis probatoire. L''homme de 30 ans, sous tutelle, avait déjà été condamné de multiples fois pour des délits routiers et d''autres délits liés aux stupéfiants.',
  'Presse nationale : comparution immédiate, prévenu sous tutelle aux quinze condamnations antérieures, condamnation à deux ans dont un an ferme. Le même article documente le cheminement médico-judiciaire — une première expertise concluant à l''abolition du discernement, une contre-expertise retenant une simple altération — qui a permis le procès. Aucune dimension migratoire dans la procédure.',
  'https://www.leparisien.fr/faits-divers/bordeaux-lagresseur-de-la-grand-mere-et-de-sa-petite-fille-condamne-a-deux-ans-de-prison-dont-un-an-ferme-27-01-2024-O6JJ4AEJLNEXVP7KWCZ6IWM4YA.php',
  null,
  '7f9e245e2f330f2455587b266c79488512c85c9cb4528104ee0199d86d19d7b9',
  null,
  'https://fr.wikipedia.org/wiki/Le_Parisien',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'dc444c98-2173-4758-8326-0684e01d85c4',
  'eb0118fd-17bb-49d6-b8f4-faa6eb3333fe',
  'GAUCHE'::political_spectrum,
  '« Entre garde à vue et soins psychiatriques pour l''agresseur d''une septuagénaire et de sa petite-fille à Bordeaux » — Rue89Bordeaux (20 juin 2023)',
  'Simon Barthélémy (Rue89Bordeaux)',
  '2023-06-20',
  'CITATION_EXACTE'::quote_kind,
  'Précisons cependant que l''agresseur est né en France, de parents français.',
  'Média local de gauche : le lendemain des faits, il établit que l''agresseur est né à Bordeaux, le 12 juillet 1993, « de parents français » — ce qui réfute le mot « clandestin ». L''article relève que l''affaire a été « abondamment relayée, notamment par des élus et sympathisants d''extrême droite pour associer délinquance et immigration ».',
  'https://rue89bordeaux.com/2023/06/lagresseur-dune-septuagenaire-et-de-sa-petite-fille-en-garde-a-vue-a-bordeaux/',
  null,
  '700e8a1988be448cd3d4015edfeafd4f13c71510663c0771144a0aaeca887638',
  null,
  'https://fr.wikipedia.org/wiki/Rue89_Bordeaux',
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '34bcf998-836a-41eb-acef-7405cf2effa8',
  'eb0118fd-17bb-49d6-b8f4-faa6eb3333fe',
  'CENTRE'::political_spectrum,
  '« Violente agression à Bordeaux : ce que l''on sait du profil du principal suspect » — Europe 1 (20 juin 2023)',
  'Stéphane Place (Europe 1)',
  '2023-06-20',
  'CITATION_EXACTE'::quote_kind,
  'Mardi soir, le suspect, de nationalité française et qui a nié les faits devant les enquêteurs, a été pris en charge par l''hôpital psychiatrique Charles Perrens de Bordeaux.',
  'Média national, dès le 20 juin 2023 : le suspect est de nationalité française, né à Bordeaux, trentenaire placé sous tutelle, avec quinze condamnations, et hospitalisé en psychiatrie. Un « clandestin sous OQTF » est donc factuellement exclu dès les premières vérifications de presse.',
  'https://www.europe1.fr/faits-divers/violente-agression-a-bordeaux-ce-que-lon-sait-du-principal-suspect-4189921',
  null,
  '6e7f943a9bb544fbc73ab23c52078ad75783a30eec1f0561518bae4b5f2e17fa',
  null,
  'https://fr.wikipedia.org/wiki/Europe_1',
  9
);

delete from public.dossiers where slug = 'incendie-eglise-saint-omer-attentat-islamiste';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '24704ff5-d2a1-4f35-a5e6-1edfa50ba493',
  'incendie-eglise-saint-omer-attentat-islamiste',
  'L''incendie de l''église de Saint-Omer est un attentat islamiste',
  'FAUX'::verdict_status,
  'L''auteur de l''incendie de la nuit du 1er au 2 septembre 2024 à Saint-Omer est un homme né en 1985, de nationalité française, sans domicile fixe, tout juste sorti de prison : il a reconnu être entré par effraction dans l''église de l''Immaculée-Conception pour voler l''argent des troncs, avant d''y mettre le feu.

Son casier porte 26 condamnations, dont deux pour destruction de biens par un moyen dangereux et une pour dégradation d''un lieu de culte (incendie volontaire de quatre églises du Boulonnais en 2021).

Le dossier a été instruit au pôle criminel de Boulogne-sur-Mer sur les chefs de destruction par moyen dangereux et de vol : aucune qualification antiterroriste n''est apparue, aucune revendication n''a été relevée, et le Parquet national antiterroriste n''a jamais été saisi. Un incendie criminel de droit commun (art. 322-6 du code pénal), non un attentat.',
  'FAITS_DIVERS'::dossier_category,
  '[{"name":"Saint-Omer (Pas-de-Calais)","kind":"LIEU","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Saint-Omer_(Pas-de-Calais)","note":"Église de l''Immaculée-Conception, détruite par un incendie volontaire dans la nuit du 1er au 2 septembre 2024."},{"name":"Pyromanie","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Pyromanie","note":"Profil de l''auteur : incendiaire récidiviste, suivi psychiatrique, sans revendication religieuse."},{"name":"Parquet national antiterroriste","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Parquet_national_antiterroriste","note":"Jamais saisi : aucune qualification antiterroriste n''a été retenue dans ce dossier."},{"name":"Observatoire du patrimoine religieux","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://www.patrimoine-religieux.fr/","note":"Tient le décompte de référence des sinistres d''églises (source citée par le Sénat)."}]'::jsonb,
  100,
  '[{"claim_part":"« L''incendie est une attaque terroriste antichrétienne »","status":"FAUX","detail":"L''enquête établit un mobile crapuleux (vol de l''argent des troncs) suivi d''un incendie volontaire allumé par un récidiviste (« avant de quitter les lieux, il avait décidé d''y mettre le feu »), sans aucune entreprise terroriste au sens de l''article 421-1 du code pénal. Les sinistres d''églises relèvent de causes multiples : selon l''Observatoire du patrimoine religieux, sur les 27 départs de feu de 2023, 19 étaient accidentels et 8 criminels ; en 2024 (janvier-septembre), 14 sur 26. Aucune campagne terroriste antichrétienne n''est documentée dans l''Hexagone."},{"claim_part":"« L''auteur est un étranger islamiste »","status":"FAUX","detail":"Le parquet a précisé qu''il s''agit d''un homme « né en 1985 et de nationalité française », sans domicile fixe, hébergé en foyer, suivi sur le plan psychiatrique, défavorablement connu des services de police pour des vols et des dégradations depuis des années (26 condamnations de droit commun). Aucun élément de radicalisation ou d''attache étrangère n''apparaît dans la procédure, dont les chefs sont la destruction par moyen dangereux et le vol."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/incendie-eglise-saint-omer-attentat-islamiste.jpg',
  'Photo : Jean Marc Gfp, Wikimedia Commons, CC BY 3.0'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '4f8443a3-7409-45e9-9a9c-8aa38605091b',
  '24704ff5-d2a1-4f35-a5e6-1edfa50ba493',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Incendie de l''église de l''Immaculée-Conception de Saint-Omer : le suspect a reconnu les faits',
  'Parquets de Saint-Omer et de Boulogne-sur-Mer — déclarations des procureurs Mehdi Benbouzid et Guirec Le Bras, relayées par CNEWS',
  '2024-09-04',
  'CITATION_EXACTE'::quote_kind,
  'Cet homme, né en 1985 et de nationalité française, s''était ainsi introduit dans l''église vers 00h20, d''après le procureur de la République de Boulogne-sur-Mer Guirec Le Bras.',
  'Déclarations officielles du parquet : le suspect « a avoué être entré par effraction dans l''église le 2 septembre, pour voler l''argent des troncs », puis « a mis le feu à la bâtisse » (procureur de Saint-Omer, Mehdi Benbouzid). Sorti de détention le 27 août 2024 après une peine de trois ans et six mois pour vols et dégradations, il était sans domicile fixe et sans profession, hébergé en foyer.',
  'https://www.cnews.fr/faits-divers/2024-09-04/incendie-de-leglise-de-limmaculee-conception-de-saint-omer-le-suspect',
  null,
  'e649bee77e549ff4c570576f9e673d1256b6759866507b1fd0d54b4fe661a080',
  null,
  null,
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'c4589c7e-668b-4b1e-8f42-2d6c3a95e6ed',
  '24704ff5-d2a1-4f35-a5e6-1edfa50ba493',
  'CENTRE'::political_spectrum,
  'Incendie dans une église à Saint-Omer : le suspect, récidiviste, a été mis en examen',
  'franceinfo (avec AFP)',
  '2024-09-04',
  'CITATION_EXACTE'::quote_kind,
  'Le casier judiciaire du suspect, qui résidait dans un foyer au moment des faits, porte 26 condamnations, dont deux pour "destruction de biens par un moyen dangereux" et une pour "dégradation ou détérioration d''un lieu de culte", consécutive à l''incendie volontaire de quatre églises du Boulonnais en 2021.',
  'Mise en examen le 4 septembre 2024 pour « destruction de bien par un moyen dangereux pour les personnes, commise en raison de la race, l''ethnie, la nation ou la religion en récidive légale et tentative de vol avec effraction en récidive » — une qualification criminelle de droit commun, aucune infraction terroriste. Le parquet annonce des « expertises psychiatriques et psychologiques » ; lors de son procès de 2022, le psychiatre avait relevé une « réelle souffrance psychique » et un homme qui « cherchait à être en prison car il s''y sent plus en sécurité qu''à l''extérieur ».',
  'https://www.franceinfo.fr/faits-divers/justice-proces/incendie-dans-une-eglise-a-saint-omer-le-suspect-recidiviste-a-ete-mis-en-examen_6763111.html',
  null,
  '04a6ecbfce3ed1473e96fb023cf4fb5e839f2888d078e032a60c9c403bb98192',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '257bb185-0620-4ad0-bf64-7c54fbb77753',
  '24704ff5-d2a1-4f35-a5e6-1edfa50ba493',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Incendie de l''église à Saint-Omer : le suspect mis en examen et écroué',
  'Le Figaro',
  '2024-09-05',
  'CITATION_EXACTE'::quote_kind,
  'Lors de sa garde à vue, l''individu de 39 ans, déjà condamné à 26 reprises, a reconnu les faits.',
  'Le Figaro détaille le casier : 26 condamnations, dont deux pour destruction de biens par un moyen dangereux et une pour dégradation ou détérioration d''un lieu de culte (l''incendie volontaire de quatre églises du Boulonnais, en 2021) ; « ses autres condamnations portaient sur des vols par effraction, par ruse ou avec dégradation ». Le suspect, né en 1985, SDF, sortait de prison (27 août) et a été écroué le 4 septembre 2024.',
  'https://www.lefigaro.fr/faits-divers/incendie-de-l-eglise-a-saint-omer-le-suspect-mis-en-examen-et-ecroue-20240905',
  null,
  '6b9d16c932814675db684bb6ad9cac4bea4a5bf45cecc305a8e30be5f4ce908b',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '23738d7b-0d36-460f-bdd1-809da51d2a09',
  '24704ff5-d2a1-4f35-a5e6-1edfa50ba493',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  '« Sanctionner les auteurs d''incendies volontaires du patrimoine » — exposé des motifs de la proposition de loi n° 161 (2024-2025)',
  'Valérie Boyer (Sénat)',
  '2024-11-22',
  'CITATION_EXACTE'::quote_kind,
  'Selon l''Observatoire du patrimoine religieux (OPR), 27 églises ont été incendiées en 2023 et 12 sur les six premiers mois de 2024. Sur ces 27 départs de feu dans des églises, 8 étaient d''origine criminelle, 19 accidentelle. Et pour les neuf premiers mois de 2024, sur les 26 incendies déclarés, 14 étaient d''origine criminelle.',
  'Texte déposé au Sénat le 22 novembre 2024 : les chiffres parlementaires (d''origine OPR) montrent des sinistres de causes diverses — majoritairement accidentels en 2023 (19 sur 27) — et jamais l''existence d''une campagne terroriste ; les incendies criminels recensés relèvent d''actes isolés ou de malveillance, comme celui de Saint-Omer, le plus retentissant de 2024.',
  'https://www.senat.fr/leg/exposes-des-motifs/ppl24-161-expose.html',
  null,
  '1072627176e3095235769123ecebdec983a75b53062c0f24e8e33d01ac220eec',
  null,
  'https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '65c98be3-d12a-429d-a025-685a957f9d76',
  '24704ff5-d2a1-4f35-a5e6-1edfa50ba493',
  'CENTRE'::political_spectrum,
  '« Ces églises malmenées en 2024 » — incendies, profanations, vandalisme (note de l''Observatoire du patrimoine religieux)',
  'Observatoire du patrimoine religieux (OPR, association)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'L''origine criminelle de l''incendie a été officiellement établie. Déjà connu des services de police, l''auteur des faits avait été condamné à de nombreuses reprises pour des faits de destruction par incendie dans six églises du Boulonnais.',
  'La note de l''OPR — association qui tient le décompte de référence des sinistres d''églises, citée par le Sénat — souligne que « les incendies sont la plupart du temps accidentels » et que, en 2024, « 14 incendies d''églises étaient volontaires sur 26 départs de feu » (janvier-septembre). Le cas de Saint-Omer y est celui d''un incendiaire récidiviste, non d''un attentat.',
  'https://www.patrimoine-religieux.fr/wp-content/uploads/2025/06/Incendies.pdf',
  null,
  '600a2dd32220ce8224dc392c264ea3cd70b38f67155f655780b0af0abd4fe962',
  null,
  'https://www.patrimoine-religieux.fr/',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'd3d93e12-40ea-4923-aabd-56be443a41fb',
  '24704ff5-d2a1-4f35-a5e6-1edfa50ba493',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code pénal — article 421-1 (définition des actes de terrorisme)',
  'République française — Code pénal (texte reproduit par Justicelibre, Légifrance bloquant les robots)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Constituent des actes de terrorisme, lorsqu''elles sont intentionnellement en relation avec une entreprise individuelle ou collective ayant pour but de troubler gravement l''ordre public par l''intimidation ou la terreur, les infractions suivantes :',
  'Texte de référence : un attentat suppose une « entreprise individuelle ou collective » et une intention de « troubler gravement l''ordre public par l''intimidation ou la terreur ». Dans le dossier de Saint-Omer, aucune qualification antiterroriste n''est apparue : l''affaire a été instruite au pôle criminel de Boulogne-sur-Mer, sur les seuls chefs de « destruction de bien par un moyen dangereux » (aggravée) et de « tentative de vol avec effraction ».',
  'https://justicelibre.org/loi/CP/421-1',
  null,
  '5a40238a9d326f5d1663ef514f0af834dfb6f43e02e83fe0a3acc24ffe7f5061',
  null,
  null,
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '76864ffa-b81f-485f-9705-b06cf7f6f87e',
  '24704ff5-d2a1-4f35-a5e6-1edfa50ba493',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code pénal — article 322-6 (destructions, dégradations et détériorations dangereuses pour les personnes)',
  'République française — Code pénal (texte reproduit par Justicelibre, Légifrance bloquant les robots)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'La destruction, la dégradation ou la détérioration d''un bien appartenant à autrui par l''effet d''une substance explosive, d''un incendie ou de tout autre moyen de nature à créer un danger pour les personnes est punie de dix ans d''emprisonnement et de 150 000 euros d''amende.',
  'C''est l''incrimination de droit commun réellement applicable à l''incendie de Saint-Omer — un crime puni de dix ans d''emprisonnement (peines portées jusqu''à la réclusion en cas de dommages corporels). La procédure est celle de la criminalité ordinaire, y compris pour l''aggravation liée au caractère religieux de l''édifice incendié.',
  'https://justicelibre.org/loi/CP/322-6',
  null,
  '1dac7a3ddbebd5d981310bb57ba39ed4b1801b5d36a01067560cf7a10dbbee74',
  null,
  null,
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'd83db0b3-2767-40d4-9a25-d774220423c7',
  '24704ff5-d2a1-4f35-a5e6-1edfa50ba493',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Firesetting, Arson, Pyromania, and the Forensic Mental Health Expert',
  'Burton, McNiel et Binder — Journal of the American Academy of Psychiatry and the Law, 2012, vol. 40, n° 3',
  null,
  'CITATION_EXACTE'::quote_kind,
  'firesetting is a behavior, arson is a crime, and pyromania is a psychiatric diagnosis. Despite these distinctions, courts have erroneously applied these terms interchangeably.',
  'Article de psychiatrie médico-légale de référence : il distingue le comportement d''allumage de feu, le crime (l''incendie volontaire) et le diagnostic (la pyromanie), et rappelle que l''incendiaire type est fréquemment atteint de troubles psychiatriques et de conduites addictives — un profil de criminalité ordinaire ou pathologique, sans lien avec une entreprise terroriste. Dans le dossier de Saint-Omer, les expertises psychiatriques et psychologiques ordonnées par la justice s''inscrivent dans ce cadre.',
  'https://jaapl.org/content/40/3/355',
  null,
  'a384d0fe6724b04c852055165e7787d22f89227c09b9df1725f2987fdbee3dd5',
  null,
  null,
  7
);

delete from public.dossiers where slug = 'aides-rsa-vs-smic-revenu-disponible';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '3b38eeea-669e-4a45-8904-60084454bbd7',
  'aides-rsa-vs-smic-revenu-disponible',
  'Un couple au RSA gagne plus qu''un couple au SMIC en cumulant les aides',
  'FAUX'::verdict_status,
  'Le RSA est une allocation différentielle : il « porte les ressources du foyer au niveau du montant forfaitaire » — 977,54 € pour un couple au 1er avril 2026 — et il est amputé d''un forfait logement (156,41 € pour deux en cas d''aide au logement), soit environ 821 € de RSA net pour un couple avec APL.

À l''inverse, un couple dont un membre travaille au SMIC cumule son salaire complet, la prime d''activité (montant forfaitaire porté à 638,28 €, revalorisé de 0,8 % en avril 2026), les APL et, le cas échéant, les allocations familiales.

Les études convergent : l''OFCE (20 cas-types) montre que « l''emploi est toujours plus rémunérateur que l''inactivité » (gain de 252 à 533 € par mois pour un mi-temps) et la Cour des comptes (2026) que la prime d''activité « a largement contribué à faire disparaître les situations de pauvreté pour les personnes qui travaillent à temps plein ». Le travail rapporte plus que le RSA, pas l''inverse.',
  'ECONOMIE'::dossier_category,
  '[{"name":"Revenu de solidarité active","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Revenu_de_solidarit%C3%A9_active","note":"Allocation différentielle : elle porte les ressources du foyer au niveau d''un montant forfaitaire, sans s''y cumuler."},{"name":"Prime d''activité","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Prime_d%27activit%C3%A9","note":"Complément de revenu versé aux travailleurs modestes, revalorisé au 1er avril 2026."},{"name":"Salaire minimum interprofessionnel de croissance","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Salaire_minimum_interprofessionnel_de_croissance","note":"Salarié au SMIC : revenu d''activité complet + prime d''activité + aides au logement."},{"name":"Caisse nationale des allocations familiales","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Caisse_nationale_des_allocations_familiales","note":"Publie les barèmes du RSA et de la prime d''activité (montants et forfait logement)."},{"name":"Cour des comptes (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)","note":"Communication sur la prime d''activité à la commission des finances du Sénat (juin 2026)."}]'::jsonb,
  100,
  '[{"claim_part":"« Le cumul des aides permet de dépasser 2 000 € au RSA sans travailler »","status":"FAUX","detail":"Le RSA est plafonné par construction : « une allocation qui porte les ressources du foyer au niveau du montant forfaitaire » (CASF, art. L. 262-2), et le forfait logement — 12 à 16,5 % du forfait selon la taille du foyer (art. R. 262-9 du CASF), soit 156,41 € pour deux — est déduit lorsque le foyer perçoit une aide au logement. Un couple inactif perçoit au plus 977,54 € de RSA, réduits à environ 821 € avec APL : aucun cumul passif n''atteint 1 500 €, a fortiori 2 000 €."},{"claim_part":"« Travailler au SMIC rapporte moins que l''inactivité complète »","status":"FAUX","detail":"Dès la reprise d''emploi, le salaire s''ajoute aux aides qui subsistent : prime d''activité pour les revenus modestes (forfait maximal 638,28 €, revalorisé au 1er avril 2026), APL, allocations familiales. Les rapporteurs du Sénat relèvent que « la reprise d''une activité garantit un gain financier immédiat, et ce dès le premier euro gagné » ; l''étude OFCE sur 20 cas-types conclut que l''emploi est toujours plus rémunérateur que l''inactivité (gain mensuel de 252 à 533 € pour un mi-temps au SMIC)."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/aides-rsa-vs-smic-revenu-disponible.jpg',
  'Photo : Avij, domaine public, Wikimedia Commons'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'b2b5047e-3939-4de9-accd-a6ea7cdc8d70',
  '3b38eeea-669e-4a45-8904-60084454bbd7',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de l''action sociale et des familles — article L. 262-2 (définition du RSA)',
  'République française — Code de l''action sociale et des familles (texte reproduit par Justicelibre, Légifrance bloquant les robots)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Toute personne résidant en France de manière stable et effective, dont le foyer dispose de ressources inférieures à un montant forfaitaire, a droit au revenu de solidarité active dans les conditions définies au présent chapitre.',
  'Le même article précise : « Le revenu de solidarité active est une allocation qui porte les ressources du foyer au niveau du montant forfaitaire. » C''est le principe de l''allocation différentielle : le RSA complète les ressources jusqu''au forfait — il ne s''y ajoute jamais intégralement, ce qui interdit par construction les cumuls à quatre chiffres allégués.',
  'https://justicelibre.org/loi/CASF/L262-2',
  null,
  'a31dbc6098cc60810c47867f01f209fca35a584794fd26f199cf10fd59906055',
  null,
  null,
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '60258a81-8328-431e-af90-a78bc8a0a45d',
  '3b38eeea-669e-4a45-8904-60084454bbd7',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de l''action sociale et des familles — article R. 262-9 (évaluation forfaitaire des avantages de logement)',
  'République française — Code de l''action sociale et des familles (texte reproduit par Justicelibre, Légifrance bloquant les robots)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Sauf lorsqu''ils constituent un élément des revenus professionnels mentionnés à l''article R. 262-12, les avantages en nature procurés par un logement occupé soit par son propriétaire ne bénéficiant pas d''aide personnelle au logement, soit, à titre gratuit, par les membres du foyer, sont évalués mensuellement et de manière forfaitaire :',
  'Le texte fixe l''évaluation forfaitaire à « 12 % du montant forfaitaire » pour une personne, 16 % pour deux, 16,5 % pour trois et plus : c''est le « forfait logement » déduit du RSA (et des ressources prises en compte). Au 1er avril 2026, cela correspond à 78,20 € pour une personne, 156,41 € pour deux et 193,55 € pour trois et plus — les montants publiés par la CNAF et service-public.fr.',
  'https://justicelibre.org/loi/CASF/R262-9',
  null,
  'a83e2f762dfee7557d4529b794b1e83386aec9f2ca6ebff66af8706048adfa73',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '05feb5e6-1c45-4fc6-a720-6a5f5ec5f1fc',
  '3b38eeea-669e-4a45-8904-60084454bbd7',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Barème du revenu de solidarité active (au 1er avril 2026)',
  'CNAF (Caisse nationale des allocations familiales)',
  '2026-04-01',
  'CITATION_EXACTE'::quote_kind,
  'Couple ou isolé 1 enfant 977.54 € 156.41 €',
  'Barème officiel de la branche Famille : « 1 personne : 651.69 €, forfait logement 78.20 € ; Couple ou isolé 1 enfant : 977.54 €, forfait logement 156.41 € ; Couple 2 enfants : 1 368.56 €… ». Le tableau fixe à la fois le montant forfaitaire du RSA et le forfait logement déduit en cas d''aide au logement : pour un couple sans enfant, le RSA ne peut donc pas dépasser 977,54 €, et tombe à 821,13 € avec APL.',
  'https://www.caf.fr/professionnels/offres-et-services/accompagnement-des-allocataires/bareme-revenu-de-solidarite-active',
  null,
  'c479ce5b9d990336f46762df8b177453cccd8506ab8bfc3024fbdcc1e92ecf78',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '311c50f8-52e8-4af3-8372-1b2c3c633ef7',
  '3b38eeea-669e-4a45-8904-60084454bbd7',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'RSA : demandeur de 25 ans et plus — montants et forfait logement (fiche F19778)',
  'DILA — service-public.fr (Premier ministre)',
  '2026-07-01',
  'CITATION_EXACTE'::quote_kind,
  'Si vous percevez une aide au logement ou si vous êtes hébergé gratuitement ou propriétaire de votre logement, un montant forfaitaire est ajouté à vos ressources. Ce forfait dépend du nombre de personnes au foyer.',
  'La fiche officielle fixe le RSA d''un couple à 977,54 € (0 enfant) et détaille le forfait logement (78,20 € pour 1 personne, 156,41 € pour 2). Exemple officiel : « Pour un couple avec 2 enfants à charge bénéficiaire d''une aide au logement et des allocations familiales, le montant du RSA est égal à 1 022,75 € (1 368,55 € - 152,25 € - 193,55 €) » — très loin de « plus de 2 000 € ».',
  'https://www.service-public.gouv.fr/particuliers/vosdroits/F19778',
  null,
  '54a0a6147dedd9fedb4a120fea5204ef507532d08a7bbbff214a93d641cccc48',
  null,
  null,
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'e36ffeef-01c6-4c53-a26e-ad8bb545623b',
  '3b38eeea-669e-4a45-8904-60084454bbd7',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'La prime d''activité revalorisée en 2026',
  'DILA — service-public.fr (Premier ministre)',
  '2026-03-05',
  'CITATION_EXACTE'::quote_kind,
  'Son montant forfaitaire est passé à 638,28 € (auparavant 633,21 €) pour une personne seule sans enfant à charge. Sa revalorisation annuelle s''élève à 0,8 %.',
  'Au 1er avril 2026, la loi de finances pour 2026 a revalorisé la prime d''activité — complément de revenu pour les actifs modestes, créé en 2015 en remplacement du RSA activité et de la prime pour l''emploi. C''est ce dispositif qui assure « un gain financier immédiat » au salarié modeste : il n''existe aucun équivalent cumulable pour un foyer entièrement inactif.',
  'https://www.service-public.gouv.fr/particuliers/actualites/A18815',
  null,
  'b7aa14bebcf0310e5a85aa249c659fdfbdbee73ad83a387d2884090b1dec477b',
  null,
  null,
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'a64152ee-1688-4e21-b2d0-27c186f8d285',
  '3b38eeea-669e-4a45-8904-60084454bbd7',
  'CENTRE'::political_spectrum,
  'La prime d''activité — « un soutien efficace au revenu des travailleurs, une trop faible incitation à l''activité » (communication à la commission des finances du Sénat)',
  'Cour des comptes (France)',
  '2026-06-10',
  'CITATION_EXACTE'::quote_kind,
  'la prime d''activité a largement contribué à faire disparaître les situations de pauvreté pour les personnes qui travaillent à temps plein, quelle que soit la configuration familiale, y compris pour les familles monoparentales.',
  'L''enquête de la Cour (juin 2026, 10,6 Md€ de dépense en 2024) confirme le soutien au revenu : « il existe bien un gain au travail dans la grande majorité des situations individuelles ». Elle critique en revanche la lisibilité du dispositif (près de 80 % des bénéficiaires sondés disent ne pas en tenir compte dans leurs choix d''emploi) et cite les travaux de l''Institut des politiques publiques : la réforme de 2019 n''a pas eu d''effet observable sur l''emploi — sans contester le gain financier lui-même.',
  'https://program-evaluation.ccomptes.fr/sites/default/files/2026-06/20260610-communique-Prime-d-activite.pdf',
  null,
  '7b4e80e2823ff1c2ae8e3b4239dc3c1b15ddcff49c07b68ec41bdd5e5d8283af',
  null,
  'https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '4e0a27d6-6361-4504-941c-028c7582f40a',
  '3b38eeea-669e-4a45-8904-60084454bbd7',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Pour suite à donner à l''enquête de la Cour des comptes sur la prime d''activité — rapport des rapporteurs spéciaux',
  'Arnaud Bazin et Pierre Barros, rapporteurs spéciaux (Sénat, commission des finances)',
  '2026-06-10',
  'CITATION_EXACTE'::quote_kind,
  'Les rapporteurs spéciaux s''associent au constat d''un dispositif peinant à transmettre un message clair selon lequel la reprise d''une activité garantit un gain financier immédiat, et ce dès le premier euro gagné.',
  'Le rapport sénatorial (juin 2026) prolonge l''enquête de la Cour : la reprise d''activité « garantit un gain financier immédiat », le problème étant la lisibilité du dispositif — et non l''inverse. Il documente aussi le complément réel à la rémunération des bénéficiaires et les options d''amélioration des incitations (seuil de bonus, solidarité à la source).',
  'https://www.senat.fr/rap/r25-728/r25-7281.pdf',
  null,
  '7c33e14ae9d73dd2173099ed568dcf15fc0f7be646aafdd73912c1f5b7110763',
  null,
  'https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '21557703-25fe-495c-8f9f-7b70ca5c041b',
  '3b38eeea-669e-4a45-8904-60084454bbd7',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'La reprise d''emploi est-elle toujours rémunératrice ?',
  'Guillaume Allègre et Muriel Pucci (OFCE, Sciences Po Paris) — blog OFCE, document de travail 2025-24',
  '2025-12-19',
  'CITATION_EXACTE'::quote_kind,
  'nous montrons que l''emploi est toujours plus rémunérateur que l''inactivité. Les graphiques ci-dessous décrivent la variation de revenu disponible à la suite du passage de l''inactivité à un emploi à temps complet au smic pour 20 cas-types différenciés par le nombre d''enfants, la présence ou non d''un conjoint et les revenus du conjoint.',
  'Étude OFCE sur 20 cas-types : à temps plein au SMIC, le revenu disponible augmente dans tous les cas ; à mi-temps, le gain reste de « 252 à 533 euros selon les cas types ». Les revenus d''assistance, eux, « assurent un niveau de vie inférieur à 40 % du niveau de vie médian » pour une personne isolée ou un couple. Conclusion des auteurs, reprenant la formule de Jean-Pierre Farandou : « un foyer qui travaille gagne nettement plus qu''un foyer qui ne vit que d''aides sociales ».',
  'https://www.ofce.fr/blog2024/fr/2025/20251219_GAMP/index.html',
  null,
  'c270b1dc562e8c4b8bc98cb1e7bcae7a407d5b4291ded5c2a4ac809b3b590781',
  null,
  null,
  7
);

delete from public.dossiers where slug = 'discriminations-embauche-origine-mythe';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  'e2640e72-740e-4e52-bdcb-3ac633453a08',
  'discriminations-embauche-origine-mythe',
  'Les discriminations à l''embauche liées à l''origine sont un mythe victimaire',
  'FAUX'::verdict_status,
  'Des campagnes nationales de testing sur CV — candidatures strictement identiques ne variant que sur le prénom et le nom — documentent une pénalité persistante.

La grande étude de l''Institut des politiques publiques et d''ISM Corum, menée sous l''égide de la Dares, conclut qu''« à qualité comparable, les candidatures dont l''identité suggère une origine maghrébine ont 31,5 % de chances de moins d''être contactées par les recruteurs que celles portant un prénom et nom d''origine française ».

Le programme DESPERADO de l''université Gustave Eiffel (TEPP-CNRS) mesure des pénalités relatives de 26,7 % à 30,8 % selon les métiers — et la DGAFP confirme que le résultat « se maintient sur toute la période, dans le secteur privé comme dans la fonction publique ».

Le Défenseur des droits constate que ces discriminations « restent vivaces », et l''Institut Montaigne rappelle qu''un testing en comptabilité avait déjà révélé « quatre fois moins de chances » pour un patronyme marocain. Le « mythe victimaire » est démenti par les données.',
  'SOCIETE'::dossier_category,
  '[{"name":"Institut Montaigne","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Institut_Montaigne","note":"Think tank libéral ; testing sur CV de 2019 sur les discriminations religieuses à l''embauche."},{"name":"Défenseur des droits","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/D%C3%A9fenseur_des_droits","note":"Autorité indépendante ; baromètre et rapport annuel sur les discriminations dans l''emploi."},{"name":"Direction de l''animation de la recherche, des études et des statistiques","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Direction_de_l%27Animation_de_la_recherche,_des_%C3%89tudes_et_des_Statistiques","note":"Service statistique du ministère du Travail, commanditaire des grandes campagnes de testing."},{"name":"Institut des politiques publiques","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Institut_des_politiques_publiques","note":"Centre de recherche (PSE/GENES) ; note n° 76 sur la grande étude par testing."},{"name":"Université Gustave-Eiffel","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Universit%C3%A9_Gustave-Eiffel","note":"Laboratoire ERUDITE/TEPP-CNRS ; programme DESPERADO de testing répété depuis 2015."}]'::jsonb,
  100,
  '[{"claim_part":"« Le marché du travail ne juge que les compétences individuelles »","status":"FAUX","detail":"Le testing scientifique isole l''effet du seul patronyme à profil strictement identique : l''IPP mesure ainsi un écart de rappel de 31,5 % en défaveur des candidatures à consonance maghrébine, à CV égal. Le programme DESPERADO V (Université Gustave Eiffel/TEPP-CNRS) mesure des pénalités de 3 à 12,1 points de pourcentage selon les profils, soit 30,8 % en relatif — le même ordre de grandeur que la pénalité liée à l''âge. Un effet net, toutes choses égales par ailleurs, apparaît donc indépendamment des compétences affichées."},{"claim_part":"« Les écarts d''accès à l''emploi résultent uniquement de différences de formation »","status":"CONFUSION_CONCEPTUELLE","detail":"La disparité persiste aux niveaux de diplôme les plus élevés : dans l''enseignement supérieur et la recherche — secteur où « les principes d''égalité et d''intégrité structurent largement l''activité » — le testing TEPP-CNRS (2 748 candidatures, 2021-2022) met en évidence une exposition à la discrimination selon l''origine « d''une ampleur comparable à celle qui existe dans l''ensemble de la fonction publique ». L''IPP confirme que la discrimination, si elle est « plus faible, sans s''effacer, parmi les salariés les plus qualifiés », reste significative à tous les niveaux de formation."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/discriminations-embauche-origine-mythe.jpg',
  'Photo : HeatherKatz001, Wikimedia Commons, CC BY-SA 4.0'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '5a00776c-20c7-489c-add2-352a99ce3a42',
  'e2640e72-740e-4e52-bdcb-3ac633453a08',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Discrimination à l''embauche : les caractéristiques du poste à pourvoir importent-elles ? (revue Travail et Emploi n° 180)',
  'Émilie Arnoult et Véronique Rémy (DARES, ministère du Travail) — texte intégral reproduit par la CFDT, le portail OpenEdition de la revue bloquant les robots',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Les résultats des testings mesurant les discriminations à l''embauche selon l''origine ethnique sont consensuels, en France comme ailleurs : les personnes issues des minorités ethniques sont moins souvent recontactées par les recruteurs que celles issues de la population majoritaire',
  'Article de la DARES publié dans Travail et Emploi n° 180 (2026, DOI 10.4000/1692l), à partir des données du testing couvrant « douze métiers dans l''ensemble de la France métropolitaine » (2 400 offres, 9 600 candidatures). Les autrices y établissent que « les écarts de traitement lors de l''embauche entre les candidatures d''origine supposée maghrébine et française varient selon les caractéristiques du poste à pourvoir » — le traitement préférentiel des candidatures à consonance française est plus fréquent en CDD court qu''en CDI, moindre en CDD long. La littérature citée (Neumark, 2018 ; Quillian et al., 2019) situe ce constat parmi les plus consensuels de l''économie du travail.',
  'https://f3c.cfdt.fr/upload/docs/application/pdf/2026-05/cfdt_f3c_discri_origine_discrimination_a_l_embauche.pdf',
  null,
  '85638d0ae73268700d5a458f5cb2d73ba05478097fc4741c56982e27d3103792',
  null,
  'https://fr.wikipedia.org/wiki/Direction_de_l%27Animation_de_la_recherche,_des_%C3%89tudes_et_des_Statistiques',
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '3b67e8f6-feae-44ef-8f21-38c52a688d38',
  'e2640e72-740e-4e52-bdcb-3ac633453a08',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Le « testing » montre que des discriminations persistent dans l''accès à l''entretien d''embauche, y compris dans la fonction publique (Rapport annuel sur l''état de la fonction publique)',
  'DGAFP — Direction générale de l''administration et de la fonction publique (Premier ministre)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Les candidats dont le nom et le prénom indiquent qu''ils sont d''origine maghrébine ont moins de chances d''avoir une réponse positive à leur candidature. Ce résultat se maintient sur toute la période, dans le secteur privé comme dans la fonction publique.',
  'Synthèse du programme DESPERADO dans l''édition 2022 du rapport annuel : « Ce sont 2 594 offres d''emploi de cadre administratif ou d''aide-soignante publiées en Île-de-France qui ont été testées sur quatre périodes allant de 2015 à 2021. » Pour l''origine, les écarts sont « statistiquement significatifs à chacune des vagues de tests pour les aides-soignantes » et pour les cadres administratifs lors de plusieurs périodes — signe que la discrimination s''inscrit dans la durée, y compris dans les recrutements publics.',
  'https://www.fonction-publique.gouv.fr/files/files/publications/dossier-rapport-annuel/dossier_testing_discriminations.pdf',
  null,
  '53d8b5493c8b366589c88fc432c9bfa58816f70007c3b7d33e3329bcdaca6757',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '5078d971-ebf4-41d9-9f8a-2165b9b74854',
  'e2640e72-740e-4e52-bdcb-3ac633453a08',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Discrimination à l''embauche des personnes d''origine supposée maghrébine : quels enseignements d''une grande étude par testing ? (note n° 76)',
  'Institut des politiques publiques (IPP, PSE/GENES) — étude ISM Corum-IPP menée sous l''égide de la Dares',
  null,
  'CITATION_EXACTE'::quote_kind,
  'En moyenne, à qualité comparable, les candidatures dont l''identité suggère une origine maghrébine ont 31,5 % de chances de moins d''être contactées par les recruteurs que celles portant un prénom et nom d''origine française.',
  'Grande étude par testing : 9 600 candidatures envoyées en réponse à 2 400 offres d''emploi publiées, sur 11 catégories de métiers, sexe et identité attribués aléatoirement. Les auteurs ajoutent : « Pour recevoir le même nombre de réponses positives, une personne dont le prénom et le nom sont à consonance maghrébine doit envoyer en moyenne 1,5 fois plus de candidatures qu''une personne ayant le même profil mais dont le prénom et le nom sont à consonance française. » La discrimination « reste élevée et un élément majeur du marché du travail en France », plus faible « sans s''effacer » chez les salariés les plus qualifiés, et sans variation notable entre femmes et hommes.',
  'https://www.ipp.eu/wp-content/uploads/2025/05/76_Note_IPP_n76_Discrimination-a-l_embauche-selon-l_origine.pdf',
  null,
  'fad627fa4c9711cd21cc4e50b2b0f124b757dd78a65f81f9bc3bfd3997ddaf7d',
  null,
  'https://fr.wikipedia.org/wiki/Institut_des_politiques_publiques',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '37d43393-8cfb-4b3a-a947-0b97833a1ced',
  'e2640e72-740e-4e52-bdcb-3ac633453a08',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Discriminations à l''embauche, âge et origine : une évaluation à l''aide d''un test multi-critères (programme DESPERADO V)',
  'Laetitia Challe, Yannick L''Horty, Pascale Petit et François-Charles Wolff (Université Gustave Eiffel, ERUDITE, TEPP-CNRS ; Université de Nantes) — convention avec la DGAFP',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Pour un candidat dont l''origine maghrébine est suggérée par la consonance du nom et du prénom, la pénalité varie de 3 à 12,1 points selon les profils des candidats et les secteurs d''activité.',
  'Testing multi-critères de l''université Gustave Eiffel (TEPP-CNRS) : 3 375 candidatures fictives envoyées en réponse à 675 offres d''emploi d''Île-de-France entre novembre 2023 et mars 2024. « En termes relatifs, rapportés au taux de succès des candidats de références, les écarts sont respectivement de 30,8 % et de 26,7 % » pour les cadres administratifs et les aides-soignantes. La pénalité de l''origine maghrébine est « plus généralisée » que celle de l''âge (qui atteint 22,3 % en relatif pour les séniors cadres) et persiste dans le privé comme dans le public.',
  'https://www.tepp.eu/images/pdf/2025/discriminationembaucheageorigine.pdf',
  null,
  '95f5578a18bca153cf8adddc5a2cc24480def229be2cb31c8862f2e99bb30018',
  null,
  'https://fr.wikipedia.org/wiki/Universit%C3%A9_Gustave-Eiffel',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'd7560e60-3539-4d32-a472-4d702bf65aab',
  'e2640e72-740e-4e52-bdcb-3ac633453a08',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Les discriminations à l''embauche dans l''enseignement supérieur et la recherche (revue Économie et Statistique n° 548)',
  'Laetitia Challe, Yannick L''Horty, Pascale Petit et François-Charles Wolff (Université Gustave Eiffel, ERUDITE, TEPP-CNRS ; Université de Nantes), TEPP-CNRS',
  null,
  'CITATION_EXACTE'::quote_kind,
  'l''étude met en évidence une exposition aux discriminations selon l''origine Nord-Africaine d''une ampleur comparable à celle qui existe dans l''ensemble de la fonction publique',
  'Test par correspondance portant sur 2 748 candidatures envoyées en 2021 et 2022 à des établissements d''enseignement supérieur et de recherche, en réponse à des offres publiées et sous forme de candidatures spontanées. Le secteur est pourtant celui où « les principes d''égalité et d''intégrité structurent largement l''activité » : la pénalité liée à l''origine signalée par le patronyme y demeure du même ordre que dans l''ensemble du secteur public — la discrimination ne s''efface donc pas avec l''élévation du niveau de diplôme.',
  'https://www.tepp.eu/images/pdf/2024/discriminationembaucheenseignementsuperieur.pdf',
  null,
  'ef73366ddfd31299b7f68e22bc69d89ca97af5a6b3661313aeeec28f730a5db5',
  null,
  'https://fr.wikipedia.org/wiki/Universit%C3%A9_Gustave-Eiffel',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'e5cec67d-e0bb-4a64-81f9-c5316ee64d69',
  'e2640e72-740e-4e52-bdcb-3ac633453a08',
  'CENTRE'::political_spectrum,
  'Rapport annuel d''activité 2024',
  'Défenseur des droits',
  '2025-03-05',
  'CITATION_EXACTE'::quote_kind,
  'Les discriminations fondées sur l''origine réelle ou supposée demeurent, en particulier, un sujet tabou, alors qu''elles restent vivaces selon les enquêtes, que certaines mesures expérimentées comme l''index diversité dans les entreprises n''ont pas été pérennisées et que la lutte contre les discriminations est éclipsée par les débats portant sur l''immigration et l''intégration.',
  'Bilan institutionnel annuel de l''autorité indépendante. Son baromètre sur la perception des discriminations dans l''emploi « montre, pour la première fois, l''entrecroisement des critères origine et religion, alors que le premier devance traditionnellement le second : 15 % de l''ensemble de la population active déclare avoir vécu une discrimination dans l''emploi en raison d''une pratique religieuse (contre 7 % en 2023), 15 % également le déclare sur le fondement de l''origine (contre 19 % en 2023) ». L''origine demeure donc l''un des tout premiers motifs de discrimination déclarée et de saisine.',
  'https://www.defenseurdesdroits.fr/sites/default/files/2025-03/ddd_rapport-annuel-2024_20250305.pdf',
  null,
  '77a706f804285d0e5bde6bb3985576fbfc9c4c23fd0779b07eaf35f59159757d',
  null,
  'https://fr.wikipedia.org/wiki/D%C3%A9fenseur_des_droits',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '59c55ae7-314d-4998-938c-2820566485c9',
  'e2640e72-740e-4e52-bdcb-3ac633453a08',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Discriminations religieuses à l''embauche : une réalité (testing Valfort-Institut Montaigne)',
  'Institut Montaigne — Marie-Anne Valfort (rapport de novembre 2019, page servie par l''instantané Wayback du 8 octobre 2026, le site étant protégé par un anti-robots)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'En 2006, un testing sur CV mené dans le secteur de la comptabilité a permis de comparer les taux de convocation à un entretien d''embauche de deux Français dotés des mêmes CV à l''exception de leur origine nationale, signalée par le prénom et le nom. « Clément Meunier » suggérait une origine française, « Yassine Mokraoui » une origine marocaine. Ce testing a permis de révéler que le Français d''origine marocaine a quatre fois moins de chances que le Français d''origine française d''être contacté par le recruteur en vue d''un entretien d''embauche.',
  'Le think tank libéral documente lui-même la discrimination par le patronyme, puis prolonge l''analyse : son testing de 2019 (6 231 offres d''emploi en comptabilité, France métropolitaine) montre une forte discrimination religieuse — « la probabilité des catholiques d''être contactés par le recruteur pour un entretien d''embauche est supérieure de 30 % à celle des juifs ; elle est deux fois plus forte que celle des musulmans » — et pointe l''« amalgame entre Maghrébins et musulmans » relevé chez les recruteurs. Un instrument de mesure porté par des acteurs de tous bords, y compris les plus libéraux.',
  'https://web.archive.org/web/20261008000723/https://www.institutmontaigne.org/publications/discriminations-religieuses-lembauche-une-realite',
  null,
  '632164d550ddb832cf47010990ef30621c02c225ac8f8c542c15a79e41fa127d',
  null,
  'https://fr.wikipedia.org/wiki/Institut_Montaigne',
  6
);

delete from public.dossiers where slug = 'homoparentalite-developpement-troubles-enfants';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  'd50b5c99-ee02-49cf-b690-950efc6e2b2d',
  'homoparentalite-developpement-troubles-enfants',
  'Les enfants élevés par des couples homosexuels développent des troubles psychologiques',
  'FAUX'::verdict_status,
  'Plus de trente ans de littérature scientifique convergent : la méta-revue du What We Know Project (université Cornell) recense 79 études, dont 75 concluent que les enfants de parents gays ou lesbiens « ne s''en sortent pas moins bien » que les autres — et les quatre études minoritaires portaient sur des enfants de familles brisées, un biais documenté.

L''American Psychological Association (résolution de février 2020) constate qu''il existe « un consensus » dans la littérature : la qualité des relations familiales pèse davantage sur le devenir de l''enfant que la structure du foyer.

L''Académie américaine de pédiatrie affirme que le bien-être d''un enfant dépend « bien plus » de ses relations avec ses parents et du soutien social « que du genre ou de l''orientation sexuelle de ses parents ».

Les études de terrain les plus solides convergent. Le NLLFS — étude longitudinale américaine qui suit, depuis 1986 et dès avant leur naissance, les enfants de familles de mères lesbiennes — ne relève à 25 ans aucune différence de santé mentale avec un échantillon national apparié : ni dans l''adaptation, ni dans les troubles émotionnels et comportementaux, ni sur les échelles diagnostiques. Sur le recensement des États-Unis (environ 3 500 enfants de couples de même sexe), la progression scolaire ne se distingue pas, à niveau socio-économique comparable, de celle des enfants de couples mariés hétérosexuels — « children of same-sex couples appear to have no inherent developmental disadvantage » (Rosenfeld, 2010). En France, le rapport parlementaire de 2013 relevait qu''« aucune étude ne jette de suspicion sérieuse sur les familles homoparentales » ; la synthèse de trois universitaires en psychologie publiée par The Conversation rappelle que la piste de « possibles troubles du comportement » est « ce qui n''a jamais été démontré » ; et la CEDH a jugé en 2013 que le gouvernement autrichien n''avait pas établi de préjudice pour l''enfant dans le refus opposé à un couple homosexuel. Même la presse libérale le constate : The Economist, en 2012, juge « badly flawed » l''étude qui prétendait établir des différences — sa méthodologie « stacked the deck against gay parents ».',
  'SOCIETE'::dossier_category,
  '[{"name":"Association américaine de psychologie","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Association_am%C3%A9ricaine_de_psychologie","note":"APA ; résolution de 2020 sur les parents et leurs enfants (après celle de 2004)."},{"name":"Académie américaine de pédiatrie","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Acad%C3%A9mie_am%C3%A9ricaine_de_p%C3%A9diatrie","note":"AAP ; prise de position de 2013 pour le bien-être des enfants de parents gays ou lesbiens."},{"name":"Cour européenne des droits de l''homme","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Cour_europ%C3%A9enne_des_droits_de_l%27homme","note":"CEDH ; arrêt de Grande Chambre X et autres c. Autriche (19 février 2013)."},{"name":"National Longitudinal Lesbian Family Study","kind":"TEXTE","role":"AUTEUR","reference_url":"https://www.nllfs.org/","note":"Étude longitudinale américaine lancée en 1986 : elle suit les enfants de familles de mères lesbiennes de leur conception à l''âge adulte ; à 25 ans, aucune différence de santé mentale avec l''échantillon national apparié."},{"name":"Michael J. Rosenfeld","kind":"PERSONNE","role":"AUTEUR","reference_url":null,"note":"Sociologue à l''université Stanford : son exploitation du recensement américain (2010) a fourni le premier test à grande échelle de la progression scolaire des enfants de couples de même sexe."},{"name":"The Economist","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/The_Economist","note":"Hebdomadaire libéral britannique : son billet du 13 juin 2012 juge « badly flawed » l''étude Regnerus, utilisée par les opposants à l''homoparentalité."}]'::jsonb,
  98,
  '[{"claim_part":"« L''absence d''un parent de chaque sexe perturbe la construction psychologique »","status":"FAUX","detail":"Les méta-analyses et revues systématiques ne relèvent aucune justification empirique à cette crainte : l''American Psychological Association note que « la recherche a constamment échoué à mettre au jour une justification empirique à ces préoccupations » (résolution de 2020, citant les revues de 2015-2019) et que « les enfants de parents sexuels minoritaires semblent se développer de manière saine et typique » à tous les âges et domaines. Le rapport parlementaire français de 2013 : « Sur aucun de ces points, il n''est apparu de différence significative entre les enfants étudiés et les groupes témoins. » L''étude longitudinale NLLFS ne mesure, à 25 ans, aucune différence de santé mentale avec un échantillon national apparié."},{"claim_part":"« Les enfants de couples homosexuels sont fragilisés socialement et scolairement »","status":"FAUX","detail":"Les études sur données représentatives (recensement américain : 3 500 enfants de couples de même sexe, aucune différence de progression scolaire ; plus de 20 000 enfants des enquêtes nationales) ne mesurent pas de décrochage corrélé à la structure parentale. La fragilité observée, quand elle existe, relève du stigmate social : le rapport de l''Assemblée nationale le résume — « La seule fragilité particulière, lorsqu''il y en a une, relève du regard négatif que la société peut porter sur cette situation particulière. »"}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/homoparentalite-developpement-troubles-enfants.jpg',
  'Photo : Claude Truong-Ngoc, Wikimedia Commons, CC BY-SA 3.0'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'db6702ee-8253-489e-b369-4849ada6b224',
  'd50b5c99-ee02-49cf-b690-950efc6e2b2d',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'What does the scholarly research say about the well-being of children with gay or lesbian parents? (revue de littérature en ligne)',
  'What We Know Project, université Cornell',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Taken together, this research forms an overwhelming scholarly consensus, based on over three decades of peer-reviewed research, that having a gay or lesbian parent does not harm children.',
  'Revue publiée en 2015 : « We identified 79 scholarly studies... Of those studies, 75 concluded that children of gay or lesbian parents fare no worse than other children. » Les quatre études minoritaires échantillonnaient des enfants issus de ruptures familiales (« a cohort known to face added risks ») et sont « criticized by many scholars as unreliable assessments of the well-being of LGB-headed households ». La page documente aussi les études sur données représentatives (Rosenfeld : 3 500 enfants, aucune différence scolaire ; enquête nationale sur plus de 20 000 enfants). En français : « cette recherche forme un consensus savant écrasant [...] que le fait d''avoir un parent gay ou lesbien ne nuit pas aux enfants ».',
  'https://whatweknow.inequality.cornell.edu/topics/lgbt-equality/what-does-the-scholarly-research-say-about-the-wellbeing-of-children-with-gay-or-lesbian-parents/',
  null,
  '083c58b4f4ae5b779c6e84858d890f72ca49747497f040934fc739b8d18d91d8',
  null,
  null,
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '851428be-7c25-4b86-bc00-598573a5f922',
  'd50b5c99-ee02-49cf-b690-950efc6e2b2d',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'APA Resolution on Sexual Orientation, Gender Identity (SOGI), Parents and their Children',
  'American Psychological Association — résolution adoptée en février 2020, remplaçant celle de 2004 ; PDF servi par l''instantané Wayback, apa.org bloquant les robots',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Overall, there is consensus in the existing literature that family processes, such as the quality of parenting and family relationships, are more important to child and family outcomes than is the specific structure of the family as related to parental sexual orientation',
  'Résolution officielle de la principale association de psychologues américaine (février 2020), qui conclut aussi : « research consistently shows that LGBQ adults are just as capable and efficient at parenting children as their cisgender heterosexual counterparts. » La résolution reconnaît en revanche l''effet documenté des « minority stressors » (préjugés, harcèlement, discrimination) sur les familles, et des climats sociaux et juridiques. En français : « il existe un consensus dans la littérature existante : les processus familiaux [...] comptent davantage que la structure spécifique de la famille liée à l''orientation sexuelle des parents ».',
  'http://web.archive.org/web/20260708214831id_/https://www.apa.org/about/policy/resolution-sexual-orientation-parents-children.pdf',
  null,
  'b42c194e4fe7a5e44d24f7eb2ab2ddeee17d058a9e2e5a941592d4ecc48fe8de',
  null,
  'https://fr.wikipedia.org/wiki/Association_am%C3%A9ricaine_de_psychologie',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'bcfc269f-4fa7-447a-be54-ec9af246a49b',
  'd50b5c99-ee02-49cf-b690-950efc6e2b2d',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Promoting the Well-Being of Children Whose Parents Are Gay or Lesbian (Pediatrics, 20 mars 2013)',
  'American Academy of Pediatrics — Committee on Psychosocial Aspects of Child and Family Health ; texte reproduit par Youth Today (publications.aap.org bloquant les robots)',
  '2013-03-20',
  'CITATION_EXACTE'::quote_kind,
  'children''s well-being is affected much more by their relationships with their parents, their parents'' sense of competence and security, and the presence of social and economic support for the family than by the gender or the sexual orientation of their parents',
  'Prise de position officielle de l''Académie américaine de pédiatrie, fondée sur « a review of extensive scientific literature » : elle soutient l''accès de tous les enfants aux droits du mariage civil pour leurs parents et à des parents adoptifs ou d''accueil « regardless of the parents'' sexual orientation », et se déclare « opposed to any discrimination ». Le document indique une réaffirmation en septembre 2022 sur le site de l''AAP. En français : « le bien-être des enfants est bien plus affecté par leurs relations avec leurs parents [...] que par le genre ou l''orientation sexuelle de leurs parents ».',
  'http://youthtoday.org/wp-content/uploads/sites/13/hotdocs/Pediatrics-2013--peds.2013-03763.pdf',
  null,
  'a8cb8a7b6a33ab94419a975f8a02693655d7b11d85601859c90c6bf1c8332fe5',
  null,
  'https://fr.wikipedia.org/wiki/Acad%C3%A9mie_am%C3%A9ricaine_de_p%C3%A9diatrie',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '83b1b559-3756-4627-aa0c-043d77353ee1',
  'd50b5c99-ee02-49cf-b690-950efc6e2b2d',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« National Longitudinal Lesbian Family Study — Mental Health of Adult Offspring » — New England Journal of Medicine, vol. 379, n° 3, p. 297-299 (19 juillet 2018)',
  'Nanette Gartrell, Henny Bos et Audrey Koh — étude longitudinale NLLFS (États-Unis), texte servi par le site officiel de l''étude',
  '2018-07-19',
  'CITATION_EXACTE'::quote_kind,
  'A comparison of the NLLFS offspring sample and the matched Achenbach normative sample showed no significant between-group differences with respect to adaptive functioning (family, friends, spouse or partner relationships, and educational or job performance), behavioral or emotional problems, scores on mental health diagnostic scales, or the percentage of participants with a score in the borderline or clinical range (Table 1, and Table S2 in the Supplementary Appendix, available with the full text of this letter at NEJM.org).',
  'L''étude suit depuis 1986 — dès avant leur naissance — les enfants nés dans 84 familles de mères lesbiennes (insémination artificielle), avec un taux de rétention de 92 %. À 25 ans, les 77 participants passés au questionnaire standardisé (Achenbach Adult Self-Report) ne se distinguent pas de l''échantillon national apparié (âge, sexe, origine, diplôme) : adaptation, troubles émotionnels et comportementaux, échelles diagnostiques — « in a large, prospective study involving 25-year-olds with sexual-minority parents, there were no significant differences in measures of mental health ». Les auteurs signalent honnêtement les limites : puissance statistique faible de certaines analyses post hoc et échantillon non aléatoire. Citation en anglais, langue de l''article.',
  'https://www.nllfs.org/images/uploads/pdf/2018-nllfs-mental-health-adult-offspring-nejm.pdf',
  null,
  'd16f5590f2bfe22927beabce8e8c00a2e42c4c370236218cae473472fb7719af',
  null,
  'https://www.nllfs.org/',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'db265c02-a99d-461a-85b2-5834e89c6a63',
  'd50b5c99-ee02-49cf-b690-950efc6e2b2d',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Nontraditional Families and Childhood Progress Through School » — Demography, vol. 47, n° 3, p. 755-775 (août 2010)',
  'Michael J. Rosenfeld — université Stanford',
  '2010-08-01',
  'CITATION_EXACTE'::quote_kind,
  'The results show that children of same-sex couples are as likely to make normal progress through school as the children of most other family structures.',
  'Premier test à grande échelle sur données représentatives : le recensement américain de 2000 fournit environ 3 500 enfants élevés par des couples de même sexe, contre des centaines de milliers dans les autres configurations familiales. Après contrôle du niveau socio-économique, « the differences between children of same-sex couples and children of heterosexual married couples are small enough to be indistinguishable from zero » — y compris après appariement par scores de propension — et « children of same-sex couples appear to have no inherent developmental disadvantage ». L''auteur souligne en revanche que la structure familiale reste un prédicteur du parcours scolaire en général. Citation en anglais, langue de l''article.',
  'https://pmc.ncbi.nlm.nih.gov/articles/PMC3000058/',
  null,
  '9028d9bbd12283e7cbbc65ea77d8053be9bdb471c12479e7ae3159765f1f52d9',
  null,
  'https://fr.wikipedia.org/wiki/Universit%C3%A9_Stanford',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '9e22c6af-6343-49d6-ab23-d28ba5654d0f',
  'd50b5c99-ee02-49cf-b690-950efc6e2b2d',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'X et autres c. Autriche — arrêt de Grande Chambre du 19 février 2013 (texte français)',
  'Cour européenne des droits de l''homme (texte français reproduit par Juricaf, association des cours suprêmes judiciaires francophones ; hudoc bloquant les robots)',
  '2013-02-19',
  'CITATION_EXACTE'::quote_kind,
  'la Cour estime que le Gouvernement n''a pas fourni de raisons particulièrement solides et convaincantes propres à établir que l''exclusion des couples homosexuels du champ de l''adoption coparentale ouverte aux couples hétérosexuels non mariés était nécessaire à la préservation de la famille traditionnelle ou à la protection des intérêts de l''enfant. Partant, la distinction opérée par le droit autrichien est incompatible avec la Convention.',
  'La Cour relève notamment « l''incapacité du Gouvernement à établir qu''il serait préjudiciable pour un enfant d''être élevé par un couple homosexuel ou d''avoir légalement deux mères ou deux pères » (§ 146) : aucun argument ni « études scientifiques » ne démontrent un tel préjudice (§ 142). Violation de l''article 14 combiné à l''article 8 prononcée « par onze voix contre six » (§ par ces motifs). L''arrêt s''inscrit dans une jurisprudence constante : dès lors qu''un État ouvre l''adoption coparentale aux couples hétérosexuels non mariés, il ne peut la refuser aux couples homosexuels sans justification « particulièrement solide ».',
  'https://juricaf.org/arret/CONSEILDELEUROPE-COUREUROPEENNEDESDROITSDELHOMME-20130219-001116998',
  null,
  'f3d87bde20ef4b0b5d5ebc6336654a01795b6da7a36b5b82db25beae80005432',
  null,
  'https://fr.wikipedia.org/wiki/Cour_europ%C3%A9enne_des_droits_de_l%27homme',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '3f09428a-0c47-47ae-9a3c-745daeb8dfad',
  'd50b5c99-ee02-49cf-b690-950efc6e2b2d',
  'GAUCHE'::political_spectrum,
  'Rapport n° 628 tome I (commission spéciale, projet de loi ouvrant le mariage aux couples de même sexe) — section IV « Les enjeux de la reconnaissance légale de l''homoparentalité »',
  'Assemblée nationale — Erwann Binet, rapporteur (commission spéciale de la majorité de gauche), rapport enregistré le 17 janvier 2013',
  '2013-01-17',
  'CITATION_EXACTE'::quote_kind,
  'Sur aucun de ces points, il n''est apparu de différence significative entre les enfants étudiés et les groupes témoins. Aucune étude ne jette ainsi de suspicion sérieuse sur les familles homoparentales',
  'Le rapport, qui a organisé une table ronde de spécialistes, conclut au « faisceau de conclusions concordantes » de « plusieurs centaines » d''études : « les enfants issus des familles homoparentales sont des enfants comme les autres ; ils ne se portent ni mieux, ni moins bien que ceux élevés dans des familles hétérosexuelles. » Il note aussi les biais méthodologiques (petits échantillons, surreprésentation des couples de femmes) et l''audition du Pr Marie-Christine Mouren (hôpital Robert-Debré) : des résultats « rassurants, mais pondérés par le jeune âge des populations étudiées » — la fragilité venant de « l''hostilité ou l''incompréhension de leur environnement social ».',
  'https://www.assemblee-nationale.fr/14/rapports/r0628-tI.asp',
  null,
  '3e03979fccb257b1cdabe6c6f27eda06050ba764c66722a778652f5b4ce5f4bd',
  null,
  'https://fr.wikipedia.org/wiki/Assembl%C3%A9e_nationale_(France)',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'f3476dcb-ea4f-4a15-9ec0-e6e848e842d3',
  'd50b5c99-ee02-49cf-b690-950efc6e2b2d',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« PMA et homoparentalité : que sait-on vraiment du développement des enfants de mères lesbiennes ? » — The Conversation France (29 septembre 2019)',
  'Benoît Schneider (université de Lorraine), Chantal Zaouche Gaudron (université Toulouse - Jean Jaurès) et Olivier Vecho (université Paris Nanterre) — psychologues, professeurs d''université',
  '2019-09-29',
  'CITATION_EXACTE'::quote_kind,
  'Alors que les premières études mettaient par exemple fortement l''accent sur la question de possibles troubles du comportement ou sur celle de la « transmission » de l''homosexualité des parents homosexuels à leurs enfants (ce qui n''a jamais été démontré), les recherches plus récentes concernent davantage la qualité des relations au sein de la famille',
  'Synthèse des décennies de recherche sur le développement des enfants de familles homoparentales, signée par trois spécialistes français du champ : la piste des « troubles du comportement » — jamais démontrée — a laissé place à l''analyse de la qualité des relations familiales, mieux corrélée au développement. Le texte passe en revue les études sur les enfants adoptés ou conçus par AMP au sein de couples de même sexe et les résultats publiés sur plusieurs générations de recherches.',
  'https://theconversation.com/pma-et-homoparentalite-que-sait-on-vraiment-du-developpement-des-enfants-de-meres-lesbiennes-124397',
  null,
  'e6821d9d1de56d861e9e01b4520d4931c1c0c73affe9686512be015582bcefe2',
  null,
  'https://fr.wikipedia.org/wiki/The_Conversation',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'ab9d370d-fab7-4876-81bb-d9f4efab9a3c',
  'd50b5c99-ee02-49cf-b690-950efc6e2b2d',
  'CENTRE'::political_spectrum,
  '« Homoparentalité : prenons les faits au sérieux » — Le Monde (17 février 2011), réponse à la tribune de Xavier Lacroix du 10 février',
  'Olivier Morin — chercheur en sciences cognitives (Max-Planck-Institut à l''époque), tribune au Monde ; texte déposé en accès ouvert par l''institut',
  '2011-02-17',
  'CITATION_EXACTE'::quote_kind,
  'Sans dire qu''il n''existe aucune différence entre les familles homoparentales et les autres, ces travaux placent le fardeau de la preuve sur les épaules des adversaires de l''homoparentalité. Ceux qui croient que grandir dans un couple homosexuel mène à des troubles graves doivent désormais expliquer pourquoi ces conséquences sont si difficiles à détecter.',
  'Réponse à la tribune « Homoparentalité : les statistiques ne disent pas tout » (Xavier Lacroix, Le Monde, 10 février 2011) : le chercheur rappelle l''état des études — « ces articles ont convaincu les associations américaines de médecine, de psychiatrie, de psychologie et de psychanalyse d''émettre des avis favorables à l''homoparentalité » — et renverse la charge de la preuve. Texte vérifié sur la version déposée en accès ouvert sur pure.mpg.de ; tribune parue au Monde le 17 février 2011 (instantané Wayback en URL de pièce).',
  'https://web.archive.org/web/20230326051325/https://www.lemonde.fr/idees/article/2011/02/17/homoparentalite-prenons-les-faits-au-serieux_1480866_3232.html',
  null,
  '83c5dca1a94f223a26e1cf1ec078a0dc2e57a9830645db7deb3cb9a3900cfb8d',
  null,
  null,
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'fed220ee-74a8-4969-b35e-17fef893babd',
  'd50b5c99-ee02-49cf-b690-950efc6e2b2d',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  '« Not thinking about the children » — The Economist, blog Democracy in America (13 juin 2012) : « A new study on the children of gay parents is badly flawed »',
  'The Economist — hebdomadaire libéral britannique (billet signé E.G., Austin) ; texte servi par l''instantané Wayback',
  '2012-06-13',
  'CITATION_EXACTE'::quote_kind,
  'The study has been greeted with fierce criticism, and for good reason. Mr Regnerus''s methodology stacked the deck against gay parents.',
  'Le journal libéral britannique démonte l''étude de 2012 (New Family Structures Study de Mark Regnerus) que ses adversaires brandissaient contre l''homoparentalité : sa méthode « stacked the deck against gay parents » — toute personne déclarant qu''un parent avait eu une relation homosexuelle était classée « famille homosexuelle », foyers brisés et rencontres ponctuelles compris. Il rappelle aussi que les rares données existantes « tend to undermine » la thèse du préjudice, et cite William Saletan : « Or does it reflect poorly on the era of fake heterosexual marriages? » La critique vient ici d''un journal libéral, pas d''une organisation militante. Citation en anglais, langue de l''article.',
  'https://web.archive.org/web/20190915015459/https://www.economist.com/democracy-in-america/2012/06/13/not-thinking-about-the-children',
  null,
  'dd15d95e671e0b5098ba7ab8e6e5e709a98fd50e2fc74006b90bb49a88261b0d',
  null,
  'https://fr.wikipedia.org/wiki/The_Economist',
  9
);

delete from public.dossiers where slug = 'theorie-du-genre-ecole-education-nationale';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '9b8ed5b4-c813-4673-a368-7597e536b9fd',
  'theorie-du-genre-ecole-education-nationale',
  'L''Éducation nationale enseigne une « théorie du genre » pour endoctriner les élèves',
  'FAUX'::verdict_status,
  'La « théorie du genre » n''existe dans aucun texte réglementaire. Les textes officiels encadrent trois objets précis : l''égalité filles-garçons — « l''éducation contre les représentations stéréotypées », la mixité des parcours et « la prévention et la lutte contre les violences sexistes et sexuelles » (éduscol) —, une information sur la vie affective et relationnelle, et une éducation à la sexualité dont l''arrêté du 3 février 2025 a fixé le programme (EVARS, applicable depuis la rentrée 2025-2026).

Le Conseil d''État, saisi par des associations opposées au texte, a jugé le 27 juin 2025 que ce programme « repose sur des notions résultant de l''état de la science ou de l''état du droit, qui doivent être enseignées de manière neutre et objective, sans inciter les élèves à adopter un comportement donné », et a rejeté les recours.

Les programmes de SVT restent, eux, strictement biologiques : le programme du cycle 4 enseigne « l''explication des mécanismes de la reproduction, du fonctionnement des organes aux phénomènes régulateurs, de l''échelle de l''organisme à l''échelle moléculaire ».

Quant aux institutions de tous bords (IGÉSR, CESE, Sénat), elles ne discutent pas l''existence d''une idéologie à l''école : elles regrettent que l''éducation à l''égalité soit trop peu mise en œuvre — un quart des établissements n''ayant jamais organisé les séances prévues par la loi de 2001.',
  'SOCIETE'::dossier_category,
  '[{"name":"Ministère de l''Éducation nationale (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_l%27%C3%89ducation_nationale_(France)","note":"Éduscol, programmes scolaires et programme EVARS (arrêté du 3 février 2025)."},{"name":"Conseil d''État (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)","note":"Contentieux : rejet des recours contre le programme EVARS (27 juin 2025)."},{"name":"Inspection générale de l''éducation, du sport et de la recherche","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Inspection_g%C3%A9n%C3%A9rale_de_l%27%C3%A9ducation,_du_sport_et_de_la_recherche","note":"Rapport n° 2021-149 sur la mise en œuvre de l''éducation à la sexualité."},{"name":"Conseil économique, social et environnemental","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Conseil_%C3%A9conomique,_social_et_environnemental","note":"Avis du 10 septembre 2024 sur l''éducation à la vie affective, relationnelle et sexuelle."},{"name":"Sénat (France)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)","note":"Rapport d''information n° 814 (2024-2025) sur le financement de la lutte contre les violences faites aux femmes."}]'::jsonb,
  100,
  '[{"claim_part":"« L''école apprend aux enfants que le sexe biologique n''existe pas »","status":"FAUX","detail":"Le programme de sciences de la vie et de la Terre du cycle 4 (BO n° 31 du 30 juillet 2020) enseigne « l''explication des mécanismes de la reproduction [...] du fonctionnement des organes aux phénomènes régulateurs, de l''échelle de l''organisme à l''échelle moléculaire » et la « reproduction sexuée et asexuée des êtres vivants ». Le programme EVARS lui-même est structuré, selon le Conseil d''État, en trois champs dont un « champ biologique ». Aucun texte officiel ne présente le sexe biologique comme inexistant."},{"claim_part":"« Les modules égalité visent à nier les identités sexuées dès la maternelle »","status":"FAUX","detail":"L''objectif réglementaire est explicite : « l''éducation contre les représentations stéréotypées », la mixité des filières et la prévention des violences sexistes et sexuelles (éduscol, référents égalité dans chaque collège et lycée, label Égalité filles-garçons). Le rapport de l''IGÉSR n° 2021-149 (juillet 2021) évalue une politique publique de mise en œuvre, pas une doctrine : il « note les efforts de cadrage effectués » et formule trente-cinq recommandations pratiques. Le CESE (avis du 10 septembre 2024, 119 voix pour) et le rapport sénatorial n° 814 (juillet 2025) traitent le sujet comme une obligation légale de prévention insuffisamment appliquée — constat confirmé par le juge administratif."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/theorie-du-genre-ecole-education-nationale.jpg',
  'Photo : Benoît Prieur, CC0, Wikimedia Commons'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '1ea4711a-dbf9-4181-88d1-615e8f6f113b',
  '9b8ed5b4-c813-4673-a368-7597e536b9fd',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Égalité filles-garçons et prévention des violences sexistes et sexuelles (page de cadrage Éduscol)',
  'Ministère de l''Éducation nationale — Éduscol (page servie par l''instantané Wayback, le site répondant 403 aux robots)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Enjeu démocratique majeur, l''égalité entre les filles et les garçons à l''École se fonde sur l''éducation contre les représentations stéréotypées, l''accompagnement de parcours de réussite pour les filles et les garçons et de choix d''orientation favorisant la mixité, et enfin la prévention et la lutte contre les violences sexistes et sexuelles.',
  'Page officielle de référence du ministère : chaque collège et lycée dispose depuis 2018 de « référentes et référents égalité filles-garçons », un label « Égalité filles-garçons » valorise les établissements engagés, et la page rappelle le cadre légal (articles L. 121-1 et L. 312-17-1 du code de l''éducation : « favoriser la mixité et l''égalité entre les hommes et les femmes [...] la prévention des préjugés sexistes et des violences faites aux femmes »). Aucune mention d''une « théorie du genre » ni d''un enseignement visant à nier le sexe biologique : l''objet est la lutte contre les stéréotypes et les violences.',
  'http://web.archive.org/web/20260905124710/https://eduscol.education.gouv.fr/6141/egalite-filles-garcons-et-prevention-des-violences-sexistes-et-sexuelles',
  null,
  '2de31123f6d9d3c9ee7ecac8bf14dce280a7446d3b0b69a7a2fedf29bb9571c1',
  null,
  'https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_l%27%C3%89ducation_nationale_(France)',
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '773b79f1-3299-477e-9e0d-97b1e332ade3',
  '9b8ed5b4-c813-4673-a368-7597e536b9fd',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Arrêté du 3 février 2025 fixant le programme d''éducation à la sexualité — éduquer à la vie affective et relationnelle, et à la sexualité (BO n° 6 du 6 février 2025)',
  'Ministère de l''Éducation nationale (page du Bulletin officiel servie par l''instantané Wayback, le site répondant 403 aux robots)',
  '2025-02-03',
  'CITATION_EXACTE'::quote_kind,
  'Le programme d''éducation à la sexualité – éduquer à la vie affective et relationnelle à l''école maternelle et à l''école élémentaire, éduquer à la vie affective et relationnelle, et à la sexualité au collège et au lycée – est fixé conformément à l''annexe du présent arrêté.',
  'Texte réglementaire intégral du programme dit EVARS, applicable « à la rentrée de l''année scolaire 2025-2026 » dans tous les établissements. Son annexe s''intitule « Un programme ambitieux : éduquer à la vie affective et relationnelle, et à la sexualité ». Selon le Conseil d''État, le programme comporte trois axes — « se connaître, vivre et grandir avec son corps » ; « rencontrer les autres et construire des relations, s''y épanouir » ; « trouver sa place dans la société, être libre et responsable » — « déclinés dans le champ biologique, le champ psycho-émotionnel et les champs juridique et social ». C''est cet objet — éducation, non endoctrinement — que les recours ont attaqué, et que le juge a validé.',
  'http://web.archive.org/web/20261008131533/https://www.education.gouv.fr/bo/2025/Hebdo6/MENE2503064A',
  null,
  '7483761e5949907d042f4a6b5a325c69cc61a8bdc0ad6e4772989e7bdaaffe2f',
  null,
  'https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_l%27%C3%89ducation_nationale_(France)',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '26a4a676-c64d-4429-900d-048ccd43bc16',
  '9b8ed5b4-c813-4673-a368-7597e536b9fd',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Programme du cycle 4 — sciences de la vie et de la Terre, partie « Le corps humain et la santé » (annexe 3 du BO n° 31 du 30 juillet 2020)',
  'Ministère de l''Éducation nationale — programme d''enseignement du cycle des approfondissements (PDF servi par l''instantané Wayback)',
  '2020-07-30',
  'CITATION_EXACTE'::quote_kind,
  'L''explication des mécanismes de la reproduction se construit au cours du cycle 4, du fonctionnement des organes aux phénomènes régulateurs, de l''échelle de l''organisme à l''échelle moléculaire. On veille à ce que les techniques de maîtrise de la procréation s''intègrent en cohérence avec les connaissances acquises.',
  'Le programme officiel de SVT fixe les attendus : « Expliquer quelques processus biologiques impliqués dans le fonctionnement de l''organisme humain, jusqu''au niveau moléculaire : activités musculaire, nerveuse, cardio-vasculaire et respiratoire, activité cérébrale, alimentation et digestion, relations avec le monde microbien, reproduction et sexualité. » S''y ajoutent « la reproduction sexuée et asexuée des êtres vivants », la « rencontre des gamètes » et la puberté. L''enseignement de la biologie de la reproduction (organes, gamètes, hormones, maîtrise de la procréation) n''a donc pas été remplacé : il reste le socle du programme de sciences.',
  'http://web.archive.org/web/20260611061152if_/https://cache.media.education.gouv.fr/file/31/89/1/ensel714_annexe3_1312891.pdf',
  null,
  'df582f30ac0e16ce56d9b91215b965abb207625cd32c75ed86c148868dd5f37d',
  null,
  'https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_l%27%C3%89ducation_nationale_(France)',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '9acacebf-43ac-4c6a-8fd6-bca2a74d10db',
  '9b8ed5b4-c813-4673-a368-7597e536b9fd',
  'CENTRE'::political_spectrum,
  'Le programme scolaire d''éducation à la vie affective et relationnelle et à la sexualité est conforme à la loi (communiqué, décisions du 27 juin 2025)',
  'Conseil d''État (France) — section du contentieux',
  '2025-06-27',
  'CITATION_EXACTE'::quote_kind,
  'Le Conseil d''État relève également que ce programme est décliné pour chaque niveau scolaire et qu''il repose sur des notions résultant de l''état de la science ou de l''état du droit, qui doivent être enseignées de manière neutre et objective, sans inciter les élèves à adopter un comportement donné.',
  'Saisi par des associations et des particuliers — dont le Syndicat de la famille et Juristes pour l''enfance, qui dénonçaient la diffusion d''une « idéologie du genre » —, le Conseil d''État rejette l''ensemble des recours contre l''arrêté du 3 février 2025 et la circulaire du 4 février 2025. Il relève aussi que les interventions d''associations ont lieu « en présence d''un personnel de l''éducation nationale », que les parents sont informés des objectifs et que « les élèves ne seront pas évalués sur ces enseignements ». La plus haute juridiction administrative valide donc le texte au fond : neutralité, objectivité, absence de tout dressage idéologique.',
  'https://www.conseil-etat.fr/content/download/229720/document/Communiqu%C3%A9+de+presse+-+programme+EVARS+-+web.pdf',
  null,
  '3cfbec22e264eac2ce380a91ebe3174197fba3037ed7c8eb55f5c7a00056acdb',
  null,
  'https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'bf6dea52-1b1e-4e9c-aaef-b6df0f890663',
  '9b8ed5b4-c813-4673-a368-7597e536b9fd',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Éducation à la sexualité en milieu scolaire — rapport n° 2021-149 (juillet 2021)',
  'IGÉSR — Inspection générale de l''éducation, du sport et de la recherche (page servie par l''instantané Wayback, le site répondant 403 aux robots)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'La mission note les efforts de cadrage effectués, le souci de mieux former les personnels de l''éducation nationale, et l''accompagnement important des académies et des établissements scolaires.',
  'Rapport d''évaluation de l''inspection générale (juillet 2021) sur la mise en œuvre de l''éducation à la sexualité : la mission relève des difficultés « liées certes aux difficultés concrètes, mais surtout peut-être aux interrogations sur le sens même de l''éducation à la sexualité », dégage des « idées-forces » et propose trente-cinq recommandations articulées autour de huit domaines. Son diagnostic porte sur l''effectivité (moins de 15 % des élèves bénéficient des trois séances annuelles prévues par la loi) — jamais sur la diffusion d''une idéologie : c''est une politique publique d''éducation à évaluer, pas une doctrine à combattre.',
  'http://web.archive.org/web/20261008183242/https://www.education.gouv.fr/igesr/education-la-sexualite-en-milieu-scolaire-465339',
  null,
  '46c35d04a4fb99abcd0e0c03255be808ca9556427aa94da37d345340f40e665e',
  null,
  'https://fr.wikipedia.org/wiki/Inspection_g%C3%A9n%C3%A9rale_de_l%27%C3%A9ducation,_du_sport_et_de_la_recherche',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '796fa45a-b249-4e83-8dff-efecea2ac248',
  '9b8ed5b4-c813-4673-a368-7597e536b9fd',
  'CENTRE'::political_spectrum,
  'Le CESE lance l''alerte sur l''importance de rendre réellement effectif le droit à l''éducation à la vie affective, relationnelle et sexuelle des jeunes (avis du 10 septembre 2024)',
  'Conseil économique, social et environnemental (CESE)',
  '2024-09-10',
  'CITATION_EXACTE'::quote_kind,
  'Malgré une loi de 2001 imposant trois séances annuelles d''éducation sexuelle tout au long de la scolarité, on estime que moins de 15 % des élèves en bénéficient, et 25 % des établissements scolaires n''ont jamais mis en place ces cours.',
  'Avis adopté en séance plénière par 119 voix pour, rapporté par Cécile Gondard-Lalann, qui « lance l''alerte sur l''importance du droit à l''éducation à la vie affective, relationnelle et sexuelle face à un manquement criant du respect de cette obligation ». Le CESE formule une vingtaine de préconisations pour une stratégie nationale. La troisième assemblée de la République traite donc le sujet comme un droit des enfants insuffisamment appliqué — et recommande d''aller plus loin, à rebours de la thèse d''un endoctrinement voulu par l''État.',
  'https://www.lecese.fr/presse/communiques/le-cese-lance-lalerte-sur-limportance-de-rendre-reellement-effectif-le-droit-leducation-la-vie-affective',
  null,
  '2efa271197fb041d452ec7d70aefc2dce5e3260f765fc91b3acfffb1a40d3192',
  null,
  'https://fr.wikipedia.org/wiki/Conseil_%C3%A9conomique,_social_et_environnemental',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '7a751f58-a86f-4cfd-ac45-ee0d9c708e95',
  '9b8ed5b4-c813-4673-a368-7597e536b9fd',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Évolution du financement de la lutte contre les violences faites aux femmes — rapport d''information n° 814 (2024-2025), synthèse',
  'Sénat — rapporteurs spéciaux de la mission « Solidarité, insertion et égalité des chances » (rapport déposé le 2 juillet 2025)',
  '2025-07-02',
  'CITATION_EXACTE'::quote_kind,
  'Il en va de même pour les actions de prévention : la mise en œuvre des actions en faveur de la culture de l''égalité dans l''Éducation nationale laisse à désirer selon la Cour des comptes, et l''impact des politiques d''égalité professionnelle n''est guère évalué.',
  'Le rapport sénatorial (juillet 2025) comporte une partie « La prévention : éduquer, former, émanciper » et une sous-section sur « l''éducation et les formations visant à promouvoir la culture de l''égalité ». La critique du Sénat — chambre à majorité de droite — ne porte pas sur l''existence supposée d''une idéologie scolaire : elle constate que l''éducation à l''égalité est mal mise en œuvre et propose de développer la prévention. Les recommandations visent le financement et l''organisation de cette politique publique, pas son contenu doctrinal.',
  'https://www.senat.fr/rap/r24-814/r24-814-syn.pdf',
  null,
  '236fa6c257aa0ec5a9e39038ef622fd92d8fc55ebab6900a2159b24331d86455',
  null,
  'https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'ad7351c6-a305-40d3-af7e-137842c076af',
  '9b8ed5b4-c813-4673-a368-7597e536b9fd',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Conseil d''État, décision n° 508643 du 8 octobre 2026 (CNAFC) — pas de droit d''accord préalable des parents sur les séances',
  'Conseil d''État — Confédération nationale des associations familiales catholiques (CNAFC)',
  '2026-10-08',
  'CITATION_EXACTE'::quote_kind,
  'ni les dispositions citées au point 8, ni aucune autre n''ont pour portée d''imposer que les parents d''élèves soient informés à l''avance sur les séances d''éducation à la sexualité ni qu''ils participent à la définition des modalités de mise en œuvre de ces séances ou donnent leur accord sur ces modalités ni qu''ils soient associés au choix des intervenants extérieurs',
  'Deuxième vague de contentieux, seize mois après le rejet du 27 juin 2025 : la CNAFC demandait des mesures complémentaires pour garantir le rôle des parents. Le Conseil d''État rejette : le programme « n''a ni pour objet ni pour effet de porter atteinte à l''exercice de l''autorité parentale ou à l''action éducative des familles », et la circulaire du 4 février 2025 prévoit l''information des familles et un dialogue ouvert dans chaque établissement. La jurisprudence confirme que l''enseignement est obligatoire et que le cadre du programme est stable.',
  'https://www.conseil-etat.fr/fr/arianeweb/CE/decision/2026-10-08/508643',
  null,
  'eb250af5b973df6f27e3587e940d6fb2f15ca767160982ef951e07d77072d0d3',
  null,
  'https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '2f177ddc-92c0-4fbe-b280-453f48a2bb55',
  '9b8ed5b4-c813-4673-a368-7597e536b9fd',
  'GAUCHE'::political_spectrum,
  '« Education sexuelle à l''école : la notion de transphobie disparaît du programme officiel » — Libération',
  'Cécile Bourgneuf, Libération',
  '2025-02-06',
  'CITATION_EXACTE'::quote_kind,
  'Si le programme d''éducation à la vie affective, relationnelle et sexuelle (Evars), publié au Bulletin officiel ce jeudi 6 février, est une réelle avancée malgré les oppositions réactionnaires, la disparition de la notion de « transphobie » pose question.',
  'Le décryptage documente le processus réel d''élaboration du programme — « voté à l''unanimité le 29 janvier au Conseil supérieur de l''éducation (CSE) et accepté par le cabinet de la ministre de l''Education Elisabeth Borne » — après de longs mois de débats publics et une polémique à laquelle le texte final a répondu. La gauche y exprime aussi ses propres critiques, signe d''un débat nourri, à mille lieues d''un dogme imposé sans contradiction.',
  'https://www.liberation.fr/societe/education/education-sexuelle-a-lecole-la-notion-de-transphobie-disparait-du-programme-officiel-20250206_AY2YRFKXYJCBHAYYXWXCDK5FRA/',
  null,
  '4c05283bd0ea82bdba0afcac8f7d56ad2016cccf4b34b734edfe62d242193e0c',
  null,
  null,
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'd3a5f978-1344-479b-afc5-c87a273ebf9d',
  '9b8ed5b4-c813-4673-a368-7597e536b9fd',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  '« Ce que contient le très contesté programme d''éducation à la vie affective et sexuelle, publié ce jeudi » — Le Figaro',
  'Le Figaro (avec AFP)',
  '2025-01-23',
  'CITATION_EXACTE'::quote_kind,
  'En maternelle, il prévoit la prise en considération du corps, des sentiments, des émotions, du respect de l''intimité et de l''égalité entre filles et garçons.',
  'Même un quotidien classé à droite, qui parle d''un programme « très contesté », décrit un contenu de maternelle centré sur le corps, les émotions, l''intimité et l''égalité — sans négation des identités sexuées. Le Figaro détaille le reste du programme : changements du corps, violences, stéréotypes et numérique à l''élémentaire ; adolescence et appréhension de la sexualité au collège ; connaissances plus complètes et questionnement au lycée.',
  'https://www.lefigaro.fr/actualite-france/ce-que-contient-le-tres-conteste-programme-d-education-a-la-vie-affective-et-sexuelle-20250123',
  null,
  'caabac80ae9d9ba820f020353eb7986a170ad13671011be9f2868b196c94e463',
  null,
  null,
  9
);

delete from public.dossiers where slug = 'pourvoi-cassation-culpabilite-ineligibilite-elus';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  'a12eabe7-0adf-4320-8c3a-82f1c0da1a62',
  'pourvoi-cassation-culpabilite-ineligibilite-elus',
  'Un pourvoi en cassation annule la culpabilité et empêche l''inéligibilité d''un élu',
  'FAUX'::verdict_status,
  'La Cour de cassation n''est pas un troisième degré de juridiction : elle ne rejuge ni les faits ni la culpabilité matérielle, souverainement fixés par les juges du fond.

De plus, si l''exécution provisoire est ordonnée, l''inéligibilité s''applique immédiatement malgré le pourvoi.',
  'POLITIQUE'::dossier_category,
  '[{"name":"Cour de cassation","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Cour_de_cassation_(France)","note":"Juridiction suprême de l''ordre judiciaire : elle contrôle la conformité au droit des décisions, sans rejuger le fond des affaires."},{"name":"Conseil constitutionnel","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)","note":"A validé le 28 mars 2025 la démission d''office immédiate des élus locaux condamnés à une inéligibilité exécutoire par provision, sous réserve d''un contrôle de proportionnalité."},{"name":"Conseil d''État","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)","note":"A rendu le 19 juin 2025 l''avis sur les effets d''une peine d''inéligibilité exécutoire par provision ; confirme la démission d''office des élus locaux."},{"name":"Code de procédure pénale","kind":"TEXTE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Code_de_proc%C3%A9dure_p%C3%A9nale_(France)","note":"Fixe l''effet suspensif du pourvoi (article 569) et le régime de l''exécution provisoire des peines (article 471)."},{"name":"Marine Le Pen","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Marine_Le_Pen","note":"Élue condamnée en 2025 puis en appel en 2026 dans l''affaire des assistants parlementaires du FN ; le débat sur la portée du pourvoi porte sur sa situation."}]'::jsonb,
  100,
  '[{"claim_part":"« La Cour de cassation peut déclarer un prévenu innocent des faits reprochés »","status":"FAUX","detail":"Elle contrôle la conformité au droit et la régularité de la procédure et « ne connaît pas du fond des affaires » (article L. 411-2 du code de l''organisation judiciaire) : les moyens qui remettent en cause l''appréciation souveraine des faits par les juges du fond sont écartés. Une cassation annule une décision, elle ne constate pas l''innocence."},{"claim_part":"« Le pourvoi suspend automatiquement toute peine d''inéligibilité »","status":"CONFUSION_CONCEPTUELLE","detail":"L''effet suspensif de l''article 569 du code de procédure pénale cède lorsque le juge a ordonné l''exécution provisoire : « le caractère non suspensif du recours, lorsque l''exécution provisoire a été ordonnée, assure une juste conciliation » (chambre criminelle, 21 septembre 2022). Les élus locaux condamnés sont démis d''office avant même que la condamnation soit définitive (Conseil constitutionnel, 28 mars 2025)."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/pourvoi-cassation-culpabilite-ineligibilite-elus.jpg',
  'Photo : DXR, Wikimedia Commons, CC BY-SA 4.0'
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
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '628dd9b6-1c47-4d51-b798-5337e43e3b92',
  'assistants-rn-pourvoi-cassation-ineligibilite',
  'Affaire des assistants RN : le pourvoi en cassation annule la culpabilité et suspend l''inéligibilité',
  'FAUX'::verdict_status,
  'La Cour de cassation n''est pas un troisième degré de juridiction : elle ne rejuge ni la matérialité des emplois fictifs ni la culpabilité, fixées souverainement par les juges du fond.

De plus, si l''exécution provisoire est ordonnée (art. 471 du code de procédure pénale ; loi n° 2017-1339 du 15 septembre 2017), la peine d''inéligibilité s''applique immédiatement sans être suspendue par le pourvoi — comme au jugement du 31 mars 2025, où l''exécution provisoire a entraîné la démission d''office du mandat départemental.

La suspension d''exécution qui court depuis le pourvoi tient seulement à l''absence d''exécution provisoire sur l''arrêt d''appel : elle n''efface rien, et la condamnation redeviendra exécutoire si le pourvoi est rejeté.',
  'POLITIQUE'::dossier_category,
  '[{"name":"Marine Le Pen","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Marine_Le_Pen","note":"Condamnée pour détournement de fonds publics dans l''affaire des assistants parlementaires du FN ; son pourvoi en cassation est en cours d''examen (arrêt attendu au plus tard début avril 2027)."},{"name":"Rassemblement national","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Rassemblement_national","note":"Condamné comme personne morale pour recel habituel de détournements de fonds publics, également redevable de l''indemnisation du Parlement européen."},{"name":"Cour de cassation","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Cour_de_cassation_(France)","note":"Juge du droit, saisie des pourvois de l''affaire : elle ne réexamine pas les faits et sa chambre criminelle rendra son arrêt au plus tard début avril 2027."},{"name":"Cour d''appel de Paris","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Cour_d%27appel_de_Paris","note":"A rendu le 7 juillet 2026 l''arrêt confirmant la culpabilité et réduisant les peines, sans assortir son arrêt d''exécution provisoire."},{"name":"Parlement européen","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Parlement_europ%C3%A9en","note":"Partie civile de l''affaire, née de sa saisine de l''OLAF en 2015 ; la cour a évalué à 2,8 millions d''euros les détournements commis à son détriment."},{"name":"Office européen de lutte antifraude","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Office_europ%C3%A9en_de_lutte_antifraude","note":"Saisi en mars 2015 par le Parlement européen ; son enquête a conduit aux poursuites en France."}]'::jsonb,
  100,
  '[{"claim_part":"« La Cour de cassation peut innocenter les cadres du RN sur les faits reprochés »","status":"FAUX","detail":"Elle est « le juge du droit » : elle ne réexamine pas les faits à l''origine de la poursuite, mais vérifie que la loi a été correctement appliquée (communiqué de la Cour de cassation du 8 juillet 2026) ; les constatations de fait — l''organisation mise en place, les emplois fictifs — ont été fixées souverainement par les juges du fond. Une cassation, si elle était prononcée, annulerait l''arrêt et renverrait l''affaire devant une autre cour d''appel : elle n''innocente personne."},{"claim_part":"« Former un pourvoi suspend automatiquement toute interdiction de se présenter à une élection »","status":"CONFUSION_CONCEPTUELLE","detail":"L''effet suspensif ordinaire de l''article 569 du code de procédure pénale est expressément écarté lorsque la juridiction ordonne l''exécution provisoire prévue par la loi (article 471) : c''est alors l''exécution immédiate qui prime. Dans cette affaire, le jugement du 31 mars 2025 était assorti de l''exécution provisoire et a été exécuté (arrêté préfectoral de démission d''office du 10 avril 2025, confirmé par le Conseil d''État) ; l''arrêt d''appel du 7 juillet 2026 n''est assorti d''aucune exécution provisoire, d''où la suspension d''exécution — temporaire — depuis le pourvoi."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/assistants-rn-pourvoi-cassation-ineligibilite.jpg',
  'Photo : NonOmnisMoriar, Wikimedia Commons, CC BY-SA 3.0'
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
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  'fc1805d9-9070-4553-a055-d5e9e8d0da82',
  'laxisme-judiciaire-peines-prison-france',
  'Les juges sont laxistes et les peines de prison diminuent en France',
  'FAUX'::verdict_status,
  'Loin de se vider, les prisons françaises n''ont jamais été aussi pleines : au 1er septembre 2026, 90 020 personnes étaient détenues pour 63 348 places opérationnelles, soit une densité carcérale de 142,1 % (jusqu''à plus de 176 % en maison d''arrêt), un record en hausse de 6,8 % sur un an, avec 8 347 matelas posés au sol.

Les peines d''emprisonnement ferme se sont allongées : le quantum moyen est passé de 9,5 mois en 2020 à 10,2 mois en 2023, et à 11,0 mois pour les condamnations de 2024 ; les années de prison ferme prononcées ont augmenté de près de 70 % entre 2000 et 2019.

Cette surpopulation structurelle a valu à la France une condamnation de la Cour européenne des droits de l''homme (arrêt J.M.B. et autres c. France, 30 janvier 2020), qui juge ces conditions de détention contraires à l''article 3 et enjoint à l''État de prendre des mesures générales de résorption.',
  'SOCIETE'::dossier_category,
  '[{"name":"Administration pénitentiaire","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Administration_p%C3%A9nitentiaire_en_France","note":"Ses décomptes mensuels (direction de l''administration pénitentiaire) établissent les records successifs de population détenue depuis 2023."},{"name":"Cour européenne des droits de l''homme","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Cour_europ%C3%A9enne_des_droits_de_l%27homme","note":"A condamné la France le 30 janvier 2020 (J.M.B. et autres c. France) pour des conditions de détention contraires à l''article 3 de la Convention."},{"name":"Sénat","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)","note":"Rapport d''information n° 2 (2025-2026) de la commission des lois : la surpopulation « hors de contrôle » atteste d''une « sévérité croissante » des juridictions."},{"name":"Cour des comptes","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)","note":"Rapport public thématique d''octobre 2023 : la réponse pénale « s''est durcie », + près de 70 % d''années de prison ferme prononcées en vingt ans."},{"name":"Libération","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Lib%C3%A9ration_(journal)","note":"A documenté le record de 90 020 détenus au 1er septembre 2026 d''après les statistiques officielles du ministère de la Justice."}]'::jsonb,
  95,
  '[{"claim_part":"« Les magistrats refusent d''incarcérer et vident les prisons »","status":"BIAIS_DE_SELECTION","detail":"Jamais autant de personnes n''ont été détenues en France : 90 020 au 1er septembre 2026 pour 63 348 places opérationnelles — une densité carcérale de 142,1 % (176,1 % dans les maisons d''arrêt selon Libération), en hausse de 6,8 % sur un an, avec 8 347 matelas au sol faute de lits. Les prisons ne se vident pas : elles débordent."},{"claim_part":"« Les peines prononcées sont de plus en plus courtes »","status":"FAUX","detail":"Le quantum moyen des peines d''emprisonnement ferme prononcées est passé de 9,5 mois en 2020 à 10,2 mois en 2023 (Cahiers d''études pénitentiaires n° 65) puis 11,0 mois pour les condamnations de 2024 (chiffres clés de la Justice) ; le nombre d''années de prison ferme prononcées a augmenté de près de 70 % entre 2000 et 2019 (Cour des comptes). Les peines s''allongent, elles ne raccourcissent pas."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/laxisme-judiciaire-peines-prison-france.jpg',
  'Photo : Thomon, Wikimedia Commons, CC BY-SA 4.0'
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

delete from public.dossiers where slug = 'aspa-minimum-vieillesse-etrangers-conditions-cotisation';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '92fb6d88-053d-4435-8506-0f9e92a7db51',
  'aspa-minimum-vieillesse-etrangers-conditions-cotisation',
  'Le minimum vieillesse (ASPA) de 1 000 € est versé à des étrangers arrivés en France sans cotiser',
  'FAUX'::verdict_status,
  'L''ASPA n''est versée à aucun étranger « sans condition » : le code de la sécurité sociale impose une condition de résidence stable de plus de 9 mois par an et, pour les ressortissants non couverts par une convention, un titre de séjour autorisant à travailler détenu sans interruption depuis au moins 10 ans — sauf statut de réfugié, d''apatride, de bénéficiaire de la protection subsidiaire ou ressortissant de l''Espace économique européen.

Le montant maximum est de 1 043,59 € par mois pour une personne seule en 2026 (1 620,18 € pour un couple) et l''allocation est différentielle : elle complète les revenus jusqu''à ce plafond, sans lien avec une quelconque cotisation.

Elle est supprimée si le bénéficiaire établit sa résidence hors de France et récupérable, au décès, sur la part de succession dépassant 108 586,14 €.

Loin d''être un chèque automatique, la prestation souffre d''un non-recours massif : environ 300 000 retraités éligibles ne la demandent pas, en partie par crainte de la récupération sur succession — une proposition de loi créant un « forfait logement » a été adoptée à l''unanimité par l''Assemblée nationale le 11 juin 2026 et doit encore être examinée par le Sénat.',
  'SOCIETE'::dossier_category,
  '[{"name":"Allocation de solidarité aux personnes âgées","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Allocation_de_solidarit%C3%A9_aux_personnes_%C3%A2g%C3%A9es","note":"Appelée « minimum vieillesse », elle a remplacé en 2006-2007 les allocations constitutives de l''ancien dispositif ; versée sous conditions de résidence, d''âge et de ressources."},{"name":"Caisse nationale d''assurance vieillesse","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Caisse_nationale_d%27assurance_vieillesse","note":"Sert environ 80 % des allocations du minimum vieillesse au régime général et pilote les campagnes de lutte contre le non-recours à l''ASPA."},{"name":"Émeline K/Bidi","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/%C3%89meline_K/Bidi","note":"Députée de La Réunion (GDR), autrice de la proposition de loi « visant à renforcer la solidarité envers les retraités pauvres » adoptée par l''Assemblée nationale le 11 juin 2026."},{"name":"Cour des comptes","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)","note":"Dans son rapport « Le minimum vieillesse et l''allocation de rentrée scolaire » (octobre 2021), elle documente le coût de la prestation (3,95 Md€ pour 750 000 allocataires en 2020) et le poids du minimum vieillesse dans les fraudes de la branche vieillesse."},{"name":"Sénat","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)","note":"Doit examiner en première lecture le texte adopté par l''Assemblée nationale sur le « forfait logement » (dossier législatif ppl25-734)."}]'::jsonb,
  98,
  '[{"claim_part":"« N''importe quel étranger âgé peut venir en France toucher 1 000 € par mois sans condition »","status":"FAUX","detail":"Pour en bénéficier, un ressortissant étranger doit détenir « depuis au moins dix ans un titre de séjour autorisant à travailler » (article L. 816-1 du code de la sécurité sociale, repris par la fiche service-public), sauf s''il est réfugié, apatride, bénéficiaire de la protection subsidiaire, ancien combattant, ressortissant d''un État de l''Espace économique européen ou de Suisse, ou ressortissant d''un pays lié par une convention bilatérale (service-public.gouv.fr). S''y ajoutent la résidence stable en France (plus de 9 mois l''année de versement), la condition de subsidiarité (avoir fait valoir tous ses droits à pension), l''âge minimum (65 ans, abaissé dans certains cas) et un plafond de ressources. Le montant n''est pas un forfait : l''allocation est différentielle et le maximum est de 1 043,59 € par mois pour une personne seule en 2026 — soit à peine plus que les « 1 000 € » évoqués."},{"claim_part":"« L''ASPA est un droit gratuit conservé même si l''on repart vivre à l''étranger »","status":"FAUX","detail":"Le service de l''allocation « est supprimé aux personnes qui établissent leur résidence en dehors du territoire métropolitain » (article L. 815-12 du code de la sécurité sociale), et la condition de résidence — désormais portée à 9 mois par an pour le minimum vieillesse comme pour les prestations familiales par le décret du 19 avril 2024, applicable au 1er janvier 2025 — est contrôlée annuellement. Surtout, la prestation n''est pas « gratuite » : récupérable sur la succession au-delà d''un actif net de 108 586,14 € pour un décès en 2026 (art. L. 815-13), elle est au cœur d''un non-recours massif — environ 300 000 retraités éligibles y renoncent, et l''Assemblée nationale a voté le 11 juin 2026 un « forfait logement » qui supprime cette récupération pour les propriétaires, précisément pour y remédier."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/aspa-minimum-vieillesse-etrangers-conditions-cotisation.jpg',
  'Photo : Moreau.henri, Wikimedia Commons, CC BY-SA 3.0'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '2063e9ae-3799-4e20-9846-4642b40ef280',
  '92fb6d88-053d-4435-8506-0f9e92a7db51',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Allocation de solidarité aux personnes âgées (Aspa) — fiche d''information officielle F16871',
  'Service-public.gouv.fr — Direction de l''information légale et administrative (Premier ministre)',
  '2026-10-15',
  'CITATION_EXACTE'::quote_kind,
  'Vous devez également être dans l''une des situations suivantes : Avoir de façon continue depuis au moins 10 ans un titre de séjour autorisant à travailler',
  'La fiche officielle oppose la condition des dix ans de titre de séjour — posée par l''article L. 816-1 du code de la sécurité sociale — à une liste limitative d''exceptions : être réfugié, apatride, bénéficiaire de la protection subsidiaire, avoir combattu pour la France, être ressortissant d''un État de l''Espace économique européen ou de Suisse, ou ressortissant d''un pays conventionné (Algérie, Andorre, Bénin, Cap-Vert, Congo, etc.). Elle fixe aussi la condition de résidence — « C''est le cas si vous séjournez en France pendant plus de 9 mois l''année de versement de l''Aspa » — et les montants 2026 : revenus du couple plafonnés à 1 620,18 € brut par mois, montant maximum de 1 043,59 € pour la personne seule. La récupération sur succession y est détaillée : pour un décès en 2026, elle ne s''applique que si l''actif net dépasse 108 586,14 €, dans la limite de 8 463,42 € par année de versement.',
  'https://www.service-public.gouv.fr/particuliers/vosdroits/F16871',
  null,
  '52a12eadf099322e4c2ba7b4dfb45d770fc23d14a9ab0097ff8da2fbbf3af534',
  null,
  null,
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'f990791d-b475-408b-8f2e-027afbe0c791',
  '92fb6d88-053d-4435-8506-0f9e92a7db51',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Prestations : 9 mois de résidence en France désormais exigés (actualité A17353)',
  'Service-public.gouv.fr — Direction de l''information légale et administrative (Premier ministre)',
  '2025-01-01',
  'CITATION_EXACTE'::quote_kind,
  'Il faut désormais résider 9 mois par an en France, au lieu de 6 mois, pour percevoir des prestations familiales et bénéficier du minimum vieillesse et ce, depuis le 1er janvier 2025.',
  'L''actualité officielle documente le durcissement de la condition de résidence appliqué au minimum vieillesse : un décret du 19 avril 2024, publié au Journal officiel du 21 avril 2024, a porté de 6 à 9 mois par an la durée de résidence exigée, « le décret concerne les prestations familiales et le minimum vieillesse ». La prémisse selon laquelle l''allocation serait conservée en cas de départ à l''étranger se heurte à ce contrôle annuel de présence effective.',
  'https://www.service-public.gouv.fr/particuliers/actualites/A17353',
  null,
  'd6147c98bba2e6f7bdc6a4d92d2fa961ba18d15771623caeb99763027e3dc1df',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '8bf87088-d02b-460d-8429-a873f1d27982',
  '92fb6d88-053d-4435-8506-0f9e92a7db51',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de la sécurité sociale — article L. 815-1 (conditions d''attribution de l''allocation de solidarité aux personnes âgées)',
  'République française — code de la sécurité sociale',
  '2026-01-01',
  'CITATION_EXACTE'::quote_kind,
  'Un décret en Conseil d''Etat précise la condition de résidence mentionnée au présent article, sa durée ne pouvant être inférieure à neuf mois par année civile.',
  'Le texte fondateur de l''ASPA pose une condition de « résidence stable et régulière sur le territoire métropolitain ou dans une collectivité mentionnée à l''article L. 111-2 » et inscrit le seuil plancher de neuf mois de présence par année civile ; l''article L. 815-1 prévoit aussi l''abaissement de l''âge minimum en cas d''inaptitude au travail. Le texte à jour est servi par le service public de diffusion du droit (Légifrance) ; il est reproduit ici depuis le miroir justiweb.fr, vérifié mot à mot.',
  'https://www.justiweb.fr/articles/code-de-la-securite-sociale/L815-1',
  null,
  'c1306307d9c2b8281623a2936f0576c1ed769a915e516238d11b0cc8af641052',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'adc0a243-1cae-447e-a6f6-6230894d5b60',
  '92fb6d88-053d-4435-8506-0f9e92a7db51',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de la sécurité sociale — article L. 815-12 (suppression du service en cas de résidence hors de France)',
  'République française — code de la sécurité sociale',
  '2026-01-01',
  'CITATION_EXACTE'::quote_kind,
  'Le service de l''allocation de solidarité aux personnes âgées est supprimé aux personnes qui établissent leur résidence en dehors du territoire métropolitain et des collectivités mentionnées à l''article L. 111-2.',
  'Cet article dément directement la prémisse d''un droit « conservé » en cas de départ à l''étranger : l''ASPA n''est pas portable, son service est supprimé dès que la résidence est établie hors du territoire (la circulation dans l''Espace économique européen ne la maintient pas non plus, contrairement à d''autres prestations). Texte à jour servi par Légifrance, reproduit depuis le miroir justiweb.fr, vérifié mot à mot.',
  'https://www.justiweb.fr/articles/code-de-la-securite-sociale/L815-12',
  null,
  '540441527bb9c12bd330ceff80cb6d9224af90684d1bc43e84c2746f059507fa',
  null,
  null,
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '5c899db2-fe91-4d75-90e3-c9a17db61e87',
  '92fb6d88-053d-4435-8506-0f9e92a7db51',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de la sécurité sociale — article L. 815-13 (récupération sur succession et seuil de 100 000 euros)',
  'République française — code de la sécurité sociale',
  '2026-01-01',
  'CITATION_EXACTE'::quote_kind,
  'Toutefois, la récupération n''est opérée que sur la fraction de l''actif net qui excède un seuil dont le montant est fixé à 100 000 euros au 1er septembre 2023 et revalorisé dans les mêmes conditions que celles prévues au même article L. 816-2. Dans les collectivités mentionnées à l''article L. 751-1, ce seuil est de 150 000 euros jusqu''au 31 décembre 2029.',
  'La loi elle-même fixe le seuil de récupération « d''environ 100 000 € » évoqué dans la prémisse : 100 000 € au 1er septembre 2023 pour la métropole, porté à 108 586,14 € par la revalorisation annuelle pour un décès survenu en 2026, et 150 000 € dans les collectivités d''outre-mer visées. La récupération s''exerce « après le décès du bénéficiaire », sur la fraction de succession excédant le seuil, et les sommes recouvrables sont garanties par une hypothèque légale ; sont exclus notamment les capitaux d''exploitation agricole. Texte à jour servi par Légifrance, reproduit depuis le miroir justiweb.fr, vérifié mot à mot.',
  'https://www.justiweb.fr/articles/code-de-la-securite-sociale/L815-13',
  null,
  '67db7505e7566a43c03aeebe8658541dfb8fb14370d58aac9ceae5594115ee6f',
  null,
  null,
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '6b0775f6-1afb-4048-8b68-87862e9e026b',
  '92fb6d88-053d-4435-8506-0f9e92a7db51',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Augmentation des effectifs de l''Aspa au régime général : le rôle prépondérant de la démographie',
  'Robin Demé — Direction statistique, prospective et recherche, Caisse nationale d''assurance vieillesse (Assurance retraite)',
  '2025-10-01',
  'CITATION_EXACTE'::quote_kind,
  'Entre 2012 et 2022, le nombre d''allocataires du minimum vieillesse au régime général est passé de 415 000 à 570 000, soit une hausse de 155 000 allocataires.',
  'Les données de la CNAV montrent un dispositif en forte croissance démographique (+ 37 % d''allocataires en dix ans au régime général), alimenté par l''arrivée à l''âge d''éligibilité de générations nombreuses et non par un assouplissement des conditions : le nombre d''allocataires par tranche d''âge a lui aussi augmenté. L''étude de la CNAV documente donc un flux de bénéficiaires soumis aux conditions légales, pas un « chèque automatique » ouvert à n''importe quel arrivant.',
  'https://www.statistiques-recherche.lassuranceretraite.fr/aspa-effet-demographique/',
  null,
  '4b8bdf2630a7bf742f4cfa6581a221ae69e92675f24cb783ea93d1e115073c90',
  null,
  'https://fr.wikipedia.org/wiki/Caisse_nationale_d%27assurance_vieillesse',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'ae5d116f-7d1e-4c67-95be-ba0637e8b2c5',
  '92fb6d88-053d-4435-8506-0f9e92a7db51',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Bilan de la campagne de lutte contre le non-recours à l''Aspa en 2024',
  'François Baris, Marie Ménard — Direction statistique, prospective et recherche, Caisse nationale d''assurance vieillesse (Assurance retraite)',
  '2025-06-01',
  'CITATION_EXACTE'::quote_kind,
  'Au cours de l''année 2024, près de 11 500 assurés ont été contactés par les caisses régionales de l''Assurance retraite pour un potentiel non-recours à l''Allocation de solidarité aux personnes âgées (Aspa). En comptabilisant les relances, plus de 15 000 contacts ont été réalisés.',
  'Le problème réel du dispositif est inverse de celui dénoncé par la prémisse : la CNAV doit traquer les retraités éligibles qui ne demandent pas l''allocation (855 nouvelles pensions de minimum vieillesse servies au 28 février 2025 grâce à ces contacts ; près de 80 % des assurés joints par téléphone seraient effectivement éligibles). Les campagnes de courriers postaux ont permis d''attribuer l''ASPA à 10 % des assurés contactés, celles de mailing à 8 %.',
  'https://www.statistiques-recherche.lassuranceretraite.fr/non-recours-aspa-2024/',
  null,
  'ee80a18938e0cb34dcb6416cd4ad3bdecde6d72d47ab618b56decda93441aff4',
  null,
  'https://fr.wikipedia.org/wiki/Caisse_nationale_d%27assurance_vieillesse',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '80de041c-6760-41da-9977-222d28d9e214',
  '92fb6d88-053d-4435-8506-0f9e92a7db51',
  'CENTRE'::political_spectrum,
  'Le minimum vieillesse et l''allocation de rentrée scolaire — contribution au rapport « Sécurité sociale 2021 »',
  'Cour des comptes (France)',
  '2021-10-05',
  'CITATION_EXACTE'::quote_kind,
  'L''Aspa est l''une des allocations sur lesquelles se concentrent les risques d''erreurs et de fraude les plus élevés.',
  'La juridiction financière décrit le dispositif : en 2020, 3,95 Md€ ont été consacrés au minimum vieillesse au bénéfice de près de 750 000 allocataires ; l''ASPA (créée en 2006-2007) est soumise à une condition de résidence en France, à une condition de régularité du séjour pour les étrangers et à la subsidiarité. Elle pointe des « taux d''erreurs et des risques de fraude élevés », « près des trois quarts des fraudes détectées dans la branche vieillesse » concernant le minimum vieillesse, « principalement pour non-respect des conditions de résidence ou de ressources » — un contrôle renforcé qui confirme que les conditions sont sérieusement vérifiées, tout en soulignant la difficulté de ce contrôle.',
  'https://www.ccomptes.fr/sites/default/files/2021-10/20211005-Ralfss-2021-10-Minimum-vieillesse-allocation-rentree-scolaire.pdf',
  null,
  'e45196386e16fe4381087be62e01a5e3dba9839c6236702b86eef1f63f43de33',
  null,
  'https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'aba31769-96b0-43ff-b319-3aa3f9a7102e',
  '92fb6d88-053d-4435-8506-0f9e92a7db51',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Dossier législatif — proposition de loi visant à renforcer la solidarité envers les retraités pauvres (texte n° 734, 2025-2026)',
  'Sénat (France)',
  '2026-06-11',
  'CITATION_EXACTE'::quote_kind,
  'Première lecture - Sénat 11 juin 2026',
  'Le dossier législatif du Sénat retrace le parcours du texte adopté par l''Assemblée nationale le 11 juin 2026 (texte n° 308) puis « Texte n° 734 (2025-2026) transmis au Sénat le 11 juin 2026 », en première lecture. Au 15 octobre 2026, la réforme du « forfait logement » — qui supprimerait la récupération sur succession pour les retraités propriétaires — est donc toujours en navette : les règles actuelles de récupération sur succession s''appliquent jusqu''à la promulgation éventuelle. Le Sénat, chambre à majorité de droite, doit encore se prononcer sur ce texte d''origine parlementaire.',
  'https://www.senat.fr/dossier-legislatif/ppl25-734.html',
  null,
  '70e0ed554ff4e3d2fcf6ec5d5fcdb9b9c17415d412db610fd947728c09f5af10',
  null,
  'https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)',
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '44f39f73-e8e0-4917-b8ec-549587448521',
  '92fb6d88-053d-4435-8506-0f9e92a7db51',
  'GAUCHE'::political_spectrum,
  'Retraités pauvres : les députés adoptent un texte pour favoriser le recours aux aides',
  'LCP — Assemblée nationale (Maxence Kagni)',
  '2026-06-11',
  'CITATION_EXACTE'::quote_kind,
  'L''Assemblée nationale a adopté, ce jeudi 11 juin, une proposition de loi du groupe Gauche démocrate et républicaine qui vise à améliorer le taux de recours à l''allocation de solidarité aux personnes âgées (Aspa). Aujourd''hui, cette aide est peu demandée, car elle peut entraîner le remboursement de sommes importantes au décès du bénéficiaire.',
  'La chaîne parlementaire détaille la proposition de loi « visant à renforcer la solidarité envers les retraités pauvres » de la députée Émeline K/Bidi (GDR) : un « forfait logement » d''environ 40 euros pour une personne seule, en échange de la suppression de la récupération sur succession pour les propriétaires, et un non-recours « dû à 70 % au mécanisme de récupération de l''Aspa sur les successions » selon les enquêtes citées. Le texte a été transmis au Sénat.',
  'https://lcp.fr/actualites/retraites-pauvres-les-deputes-adoptent-un-texte-pour-favoriser-le-recours-aux-aides',
  null,
  'be1088a6527cdc06b3a6febddd661ac43c9db913464fbd126dbbe3a4da86265e',
  null,
  null,
  9
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'dc6e2d8e-aebb-4995-8fb4-fdf904d931d6',
  '92fb6d88-053d-4435-8506-0f9e92a7db51',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Actions de lutte contre le non-recours à l''Aspa : ciblage par datamining — revue Retraite et société n° 87',
  'Macline Niyomwungere, Frédéric Broutin (CNAV), revue scientifique Retraite et société, n° 87, dossier « Le non-recours des personnes âgées aux droits et aux services »',
  '2021-12-01',
  'CITATION_EXACTE'::quote_kind,
  'L''allocation de solidarité aux personnes âgées (Aspa), qui permet d''assurer un niveau minimum de ressources aux retraités, fait l''objet d''un taux de non-recours important.',
  'La littérature scientifique (revue à comité de lecture éditée par la CNAV, coordination Arnaud Campéon, Mélina Ramos-Gorand et Philippe Warin, cofondateur de l''Observatoire des non-recours) documente que le principal dysfonctionnement de l''ASPA est le non-recours, et non une attribution laxiste : les freins identifiés sont la méconnaissance du dispositif, la complexité des démarches et la crainte de la récupération sur succession. Les modèles statistiques de ciblage développés depuis 2018 en découlent directement.',
  'https://www.statistiques-recherche.lassuranceretraite.fr/actions-de-lutte-contre-le-non-recours-a-l-aspa-ciblage-par-datamining/',
  null,
  '70895ad5405b191cf0c48a01781aef6f0cdf72173cb62f5366920da615ccc040',
  null,
  'https://fr.wikipedia.org/wiki/Caisse_nationale_d%27assurance_vieillesse',
  10
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '69e53375-4d9a-4e45-9ec1-0b18c20f818a',
  '92fb6d88-053d-4435-8506-0f9e92a7db51',
  'CENTRE'::political_spectrum,
  'Aspa, successions et « forfait logement » : l''Assemblée revoit l''Allocation de solidarité aux personnes âgées',
  'Boursorama avec Media Services (dépêche AFP)',
  '2026-06-11',
  'CITATION_EXACTE'::quote_kind,
  'Les députés ont approuvé à l''unanimité en première lecture jeudi 11 juin une proposition de loi du groupe GDR (communistes et ultramarins) visant à diminuer le non-recours à l''Allocation de solidarité aux personnes âgées (Aspa).',
  'La dépêche rapporte les éléments chiffrés du débat : l''ASPA « bénéficie aujourd''hui à près de 750.000 personnes » selon le ministre du Travail Jean-Pierre Farandou, dans la limite de 1 043 euros pour une personne seule et 1 620 euros pour un couple ; l''État récupère « environ 120 millions d''euros par an sur les allocations versées » au titre des successions. Le « forfait logement » résulte d''un amendement du gouvernement qui a réécrit la proposition de loi, avec un coût jugé « neutre » pour les finances publiques.',
  'https://www.boursorama.com/actualite-economique/actualites/aspa-successions-et-forfait-logement-l-assemblee-revoit-l-allocation-de-solidarite-aux-personnes-agees-647fde1e1fc5dd9e50868d2ba8eedacf',
  null,
  '66bb4b876a0535f67d938cacb01b88a34d94cd5f34b7f74b3ebd8b0a3112335a',
  null,
  null,
  11
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'bb94d2f9-c119-4f08-82f5-a9479e308e1a',
  '92fb6d88-053d-4435-8506-0f9e92a7db51',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Code de la sécurité sociale — article L. 816-1 (conditions applicables aux personnes de nationalité étrangère)',
  'République française — code de la sécurité sociale',
  '2026-01-01',
  'CITATION_EXACTE'::quote_kind,
  'Le présent titre est applicable aux personnes de nationalité étrangère qui répondent à l''une des conditions suivantes : 1° Etre titulaire depuis au moins dix ans d''un titre de séjour autorisant à travailler. Le respect de cette condition peut être attesté par les périodes d''assurance mentionnées à l''article L. 351-2 ;',
  'L''article qui fonde le « verrou des dix ans » : les 2° et 3° exemptent de cette durée les réfugiés, les apatrides, les personnes ayant combattu pour la France et celles bénéficiant de la protection subsidiaire, ainsi que les ressortissants d''un État membre de l''Union européenne, de l''Espace économique européen ou de la Confédération suisse. La condition est cumulative avec la résidence stable de l''article L. 815-1 et avec l''âge de 65 ans fixé à l''article R. 815-1 ; la fiche service-public F16871 en reprend le détail, y compris les pays liés à la France par une convention bilatérale. Texte à jour servi par Légifrance, reproduit depuis le miroir justiweb.fr, vérifié mot à mot.',
  'https://www.justiweb.fr/articles/code-de-la-securite-sociale/L816-1',
  null,
  'a4d131dde3d755bae4ee010ac300026c1a9da2869ca30412693bb2b0c80b24ba',
  null,
  null,
  12
);

delete from public.dossiers where slug = 'fraude-sociale-vs-fraude-fiscale-cout-france';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  'cf93d598-da1f-40b1-bf82-4eccbfa4cba1',
  'fraude-sociale-vs-fraude-fiscale-cout-france',
  'La fraude sociale coûte plus cher à la France que la fraude fiscale',
  'FAUX'::verdict_status,
  'L''ordre de grandeur est inverse : le HCFiPS évalue la fraude sociale (prestations et cotisations confondues) à 14 Md€ en 2025, quand la fraude fiscale est estimée entre 80 et 120 Md€ par an par les travaux disponibles — soit environ six à neuf fois plus.

Le clivage « allocataires contre fraudeurs en col blanc » ne résiste pas aux chiffres : « l''essentiel de la fraude demeure concentré sur le recouvrement des cotisations (plus de 52 % de la fraude évaluée) », la fraude des assurés représentant 36 % et celle des professionnels de santé 12 %. Sur les 14 Md€ évalués, seuls 680 M€ ont été recouvrés en 2024.

Il faut toutefois noter que la fraude fiscale n''a jamais fait l''objet d''une estimation publique officielle en France : la Cour des comptes la juge « mal cernée et non chiffrée », la DGFiP n''ayant engagé ses premiers travaux de chiffrage de l''écart fiscal qu''en 2022, sur la seule TVA.',
  'ECONOMIE'::dossier_category,
  '[{"name":"Fraude fiscale","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Fraude_fiscale","note":"Déclaration ou manœuvre intentionnelle visant à échapper à l''impôt ; la Cour des comptes souligne qu''elle reste « mal cernée et non chiffrée » en France."},{"name":"Haut Conseil du financement de la protection sociale","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Haut_Conseil_du_financement_de_la_protection_sociale","note":"Observatoire du travail dissimulé depuis 2017 ; produit chaque année l''évaluation officielle de la fraude sociale (14 Md€ en 2025, 13 Md€ en 2024)."},{"name":"Urssaf","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Union_de_recouvrement_des_cotisations_de_s%C3%A9curit%C3%A9_sociale_et_d%27allocations_familiales","note":"Branche recouvrement du régime général : près de 1,6 Md€ de redressements au titre du travail dissimulé en 2024 (+ 34 % en un an)."},{"name":"Cour des comptes","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)","note":"Rapport public thématique « La lutte contre la fraude fiscale » (16 décembre 2025) : 20 Md€ de droits rappelés et pénalités en 2024, absence d''estimation de l''écart fiscal."},{"name":"Sénat","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)","note":"Rapport d''information n° 72 (2022-2023) de la commission des finances : fraude à la TVA estimée par l''Insee entre 20 et 25 Md€ par an, recommandation de produire une estimation de la fraude fiscale."}]'::jsonb,
  98,
  '[{"claim_part":"« Les allocataires sociaux causent l''essentiel du déficit public »","status":"CONFUSION_CONCEPTUELLE","detail":"La fraude sociale totale — prestations et cotisations confondues — est évaluée à 14 Md€ en 2025 par le HCFiPS (contre 13 Md€ en 2024), quand la fraude fiscale est estimée entre 80 et 120 Md€ par an ; la fraude des assurés (RSA, allocations, indemnités) ne représente que 36 % de l''ensemble, soit environ 5 Md€. Sur les 14 Md€ évalués, 2 Md€ ont été détectés et 680 M€ recouvrés en 2024. Les montants ne sont donc absolument pas de même échelle, et l''essentiel des sommes évaluées n''est pas imputable aux allocataires. La brique confond trois ordres de grandeur distincts : la fraude sociale, la fraude fiscale et le déficit public."},{"claim_part":"« La fraude sociale est surtout le fait des ménages »","status":"BIAIS_DE_SELECTION","detail":"La fraude sociale ne se confond pas avec la fraude aux prestations : « l''essentiel de la fraude demeure concentré sur le recouvrement des cotisations (plus de 52 % de la fraude évaluée) », c''est-à-dire des employeurs et des travailleurs indépendants — la fraude des assurés arrive en seconde position (36 %) et celle des professionnels s''élève à 12 % (HCFiPS). Les redressements de l''Urssaf au titre du travail dissimulé atteignent 1,6 Md€ en 2024 (+ 34 %), dont 69 % de cotisations non déclarées : le principal gisement de fraude sociale est bien patronal, et non ménager."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/fraude-sociale-vs-fraude-fiscale-cout-france.jpg',
  'Photo : TouN, Wikimedia Commons, CC BY-SA 3.0'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'ed439aeb-1382-488a-855b-f4abc23101bc',
  'cf93d598-da1f-40b1-bf82-4eccbfa4cba1',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Note annuelle de suivi et d''évaluation des fraudes sociales — 14 Md€ de fraudes évaluées',
  'Haut Conseil du financement de la protection sociale (HCFiPS) — Secrétariat général, Direction de la sécurité sociale',
  '2026-01-13',
  'CITATION_EXACTE'::quote_kind,
  'L''évaluation financière correspondante est de 14 Md€ (contre 13 Md€ dans le rapport du HCFiPS de 2024).',
  'L''évaluation officielle de la fraude sociale : 14 Md€ en 2025, dont « plus de 52 % » concentrés sur le recouvrement des cotisations, 36 % sur la fraude des assurés et 12 % sur les professionnels. La note précise que l''accroissement (de 13 à 14 Md€) s''explique « pour l''essentiel par des effets de base et de périmètre » et que « le taux de fraude est globalement stable ». Elle rappelle aussi le décalage entre évaluation et recouvrement : 2 Md€ détectés, 680 M€ recouvrés en 2024, et que la fraude n''est pas « la cagnotte » budgétaire imaginée dans le débat public.',
  'https://www.strategie-plan.gouv.fr/files/files/Publications/2026/2026-01-13%20-%20HCFiPS%20-%20note%20annuelle%20fraude%20sociale/Note%20annuelle%20de%20suivi%20et%20d%27%C3%A9valuation%20des%20fraudes%20sociales%20VF.pdf',
  null,
  'abcaf1b421b78a2a0e7dfd8bd1c1a67437aa5dc6e21b827c1e6c5bed334d89b1',
  null,
  'https://fr.wikipedia.org/wiki/Haut_Conseil_du_financement_de_la_protection_sociale',
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'b6d3b1ce-0c91-4a82-b402-f06ef0992c75',
  'cf93d598-da1f-40b1-bf82-4eccbfa4cba1',
  'CENTRE'::political_spectrum,
  'La lutte contre la fraude aux prestations sociales à l''ère de son industrialisation — rapport 2026',
  'Défenseur des droits',
  '2026-04-10',
  'CITATION_EXACTE'::quote_kind,
  'Le HCFiPS estime la fraude sociale (incluant la fraude aux prestations sociales et la fraude aux cotisations sociales) à 14 milliards d''euros en 2025. À titre de comparaison, la fraude fiscale est évaluée quant à elle entre 80 et 120 milliards d''euros.',
  'Le rapport de l''autorité constitutionnelle indépendante pose la comparaison et la ventilation : en 2024, la répartition par organisme était « Urssaf : 6,91 Mds €, Cnaf : 3,87 Mds €, Cnam : 1,71 Mds, France Travail : 0,11 Mds €, CCMSA : 0,34 Mds €, Cnav : 0,04 Mds € » — soit une majorité de fraude patronale (Urssaf, cotisations) et non ménagère. Il donne aussi les définitions officielles : la fraude aux cotisations est « une irrégularité commise intentionnellement par l''employeur », distincte de la fraude fiscale (manœuvre contre l''impôt).',
  'https://www.defenseurdesdroits.fr/sites/default/files/2026-04/ddd_rapport_fraude-prestations-sociales-2026_20260410.pdf',
  null,
  '4dce6688ef0e52664ec0b8732c792537f4b34ca1544853b8dcba720b4b6f3e89',
  null,
  'https://fr.wikipedia.org/wiki/D%C3%A9fenseur_des_droits',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '731c8bf9-ed8b-4973-9bb9-f5c104b94ca1',
  'cf93d598-da1f-40b1-bf82-4eccbfa4cba1',
  'CENTRE'::political_spectrum,
  'La lutte contre la fraude fiscale — rapport public thématique, décembre 2025 (synthèse)',
  'Cour des comptes (France)',
  '2025-12-16',
  'CITATION_EXACTE'::quote_kind,
  'Très présente dans le débat public, la fraude fiscale demeure pourtant mal cernée et non chiffrée.',
  'La juridiction financière établit le cadre de la comparaison : les résultats du contrôle fiscal « en droits rappelés et pénalités, à hauteur de 20 Md€ en 2024, peinent à retrouver leur niveau du milieu des années 2010 », et la France est « l''un des pays les plus en retard » de l''OCDE en matière d''estimation de la fraude : « les premiers travaux de chiffrage de l''écart fiscal n''ont été engagés par la DGFiP qu''en 2022 sur la TVA ». Autrement dit, les fourchettes de 80 à 120 Md€ sont des estimations de chercheurs et d''organisations, pas un chiffrage public officiel — la Cour appelant à « achever le chiffrage de l''écart fiscal ».',
  'https://www.ccomptes.fr/sites/default/files/2025-12/20251216-synthese-Lutte-contre-la-fraude-fiscale.pdf',
  null,
  '1ea66ddb2bbc167efaa0abe8b4d06968dc6ae015ab1b7c9c8b167c298829e04e',
  null,
  'https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '37aae187-bf76-4149-ada5-fec666a48636',
  'cf93d598-da1f-40b1-bf82-4eccbfa4cba1',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Bilan 2024 de la lutte contre le travail dissimulé — dossier de presse',
  'Urssaf — réseau des Urssaf (branche recouvrement)',
  '2025-03-06',
  'CITATION_EXACTE'::quote_kind,
  'Le montant de ses redressements opérés au titre de la lutte contre le travail dissimulé a atteint près de 1,6 milliard d''euros (+ 34 % en un an). Ces résultats ont été multipliés par quatre en 10 ans.',
  'Le bilan des contrôles patronaux : 34 287 actions de lutte contre le travail dissimulé en 2024 (dont 4 121 ciblant des employeurs et 2 635 des travailleurs indépendants), un redressement moyen de 245 399 euros et 1 096 M€ de cotisations et contributions non déclarées, soit 69 % du montant global redressé. L''Urssaf vise 5,5 Md€ de redressements sur 2023-2027 : la fraude sociale « constatée » est d''abord le fait d''employeurs.',
  'https://www.urssaf.org/files/Espace+media/Dossier+de+presse/NAT-DP-Bilan+LCTI+2024_2025+03+06.pdf',
  null,
  'b750b5e81c7a7528ce48b3e36fc7ad9e1c8966f7bd150a416a88b2916da6a35b',
  null,
  'https://fr.wikipedia.org/wiki/Union_de_recouvrement_des_cotisations_de_s%C3%A9curit%C3%A9_sociale_et_d%27allocations_familiales',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'd540fce1-fe96-49a2-8d02-57c25f948ea7',
  'cf93d598-da1f-40b1-bf82-4eccbfa4cba1',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Fraude et évasion fiscales : faire les comptes et intensifier la lutte — rapport d''information n° 72 (2022-2023) de la commission des finances (synthèse)',
  'Sénat (France) — commission des finances (Jean-François Husson, rapporteur)',
  '2022-10-25',
  'CITATION_EXACTE'::quote_kind,
  'les estimations de la fraude à la TVA qui, selon l''Insee, serait comprise entre 20 et 25 milliards d''euros par an',
  'Le rapport de la commission des finances chiffre le premier poste connu de la fraude fiscale — la TVA, 20 à 25 Md€ par an selon l''Insee — et constate que les montants recouvrés (904 M€ pour le contrôle TVA en 2021) « peuvent sembler modestes » en regard. Sa première recommandation est de « produire et publier, d''ici le projet de loi de finances initiale pour 2024, des estimations de la fraude fiscale, en détaillant la méthodologie utilisée » : preuve que la fourchette de 80 à 120 Md€ n''était, encore en 2022, adossée à aucune estimation publique.',
  'https://www.senat.fr/rap/r22-072/r22-072-syn.pdf',
  null,
  '8a3de9535a8efec1d164673b8677bbba23f6eb47a9dce1a9b75cce81eef5fd64',
  null,
  'https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '5be1ea3e-a0df-4c2f-8775-b5e51b569fc5',
  'cf93d598-da1f-40b1-bf82-4eccbfa4cba1',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Évasion fiscale des ultrariches : le rôle des filiales offshore',
  'Carmela D''Avino, professeure de finance, IÉSEG School of Management (The Conversation)',
  '2025-09-29',
  'CITATION_EXACTE'::quote_kind,
  'En France, on estime que 30 à 40 % des biens détenus par les 0,01 % les plus riches se trouvent à l''étranger, causant une perte fiscale de 80 milliards à 100 milliards d''euros.',
  'Travaux académiques sur l''évasion des ménages les plus fortunés : la perte fiscale liée aux avoirs détenus à l''étranger est estimée entre 80 et 100 Md€, un ordre de grandeur cohérent avec la fourchette de 80 à 120 Md€ reprise pour la fraude fiscale globale — à comparer aux 14 Md€ de la fraude sociale évaluée.',
  'https://theconversation.com/evasion-fiscale-des-ultrariches-le-role-des-filiales-offshore-258090',
  null,
  '55ab345e5ab0998973d082d31dd4c0632c704146e2a6f35ea67a71160f48a5b2',
  null,
  null,
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '1ccdee37-4410-4203-a831-c15b16551d59',
  'cf93d598-da1f-40b1-bf82-4eccbfa4cba1',
  'GAUCHE'::political_spectrum,
  'Fraude fiscale : ces dizaines de milliards (toujours) perdus…',
  'Observatoire de la justice fiscale — Attac France',
  '2025-11-12',
  'CITATION_EXACTE'::quote_kind,
  'tous confortent l''estimation selon laquelle la fraude fiscale représente un manque à gagner compris entre 80 et 100 milliards d''euros',
  'La synthèse militante de l''Observatoire de la justice fiscale recense les estimations disponibles : étude sur l''impôt sur les sociétés (27,3 Md€), fraude à la TVA « estimée entre 20 et 25 milliards d''euros par l''Insee », et conclut à un manque à gagner compris entre 80 et 100 Md€ pour la fraude fiscale — l''estimation la plus couramment reprise, à laquelle répondent les 14 Md€ de la fraude sociale évaluée par le HCFiPS.',
  'https://obs-justice-fiscale.attac.org/actualites/article/fraude-fiscale-ces-dizaines-de-milliards-toujours-perdus',
  null,
  '5e65b2a029e2c20e8f2fdf1e557fe5a7b936c237a79873c7a6623a283a7bdaff',
  null,
  null,
  6
);

delete from public.dossiers where slug = 'genetique-races-biologiques-humaines';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '8ddf3e0f-fb27-4188-808f-eae19b64ed2a',
  'genetique-races-biologiques-humaines',
  'La génétique moderne prouve l''existence de races biologiques distinctes chez l''humain',
  'FAUX'::verdict_status,
  'La génétique des populations établit exactement l''inverse : tous les êtres humains partagent environ 99,9 % de leur ADN, et l''immense majorité de la diversité génétique restante se trouve à l''intérieur des populations, non entre elles.

Dès 1972, l''analyse de Richard Lewontin puis les travaux de Guido Barbujani et Luca Cavalli-Sforza (PNAS, 1997) établissent que 85 % de la diversité génétique humaine est portée par les individus d''une même population et que les différences entre continents n''en représentent qu''environ 10 % ; entre un Papou et un Breton, seuls environ 5 % des 6 millions de lettres d''ADN qui diffèrent s''expliquent par l''origine géographique.

La variation humaine est continue et clinale, sans frontières biologiques : l''espèce Homo sapiens ne se divise pas en sous-espèces.

L''UNESCO l''a proclamé dès la Déclaration sur la race et les préjugés raciaux de 1978 — « tous les êtres humains appartiennent à une même espèce et descendent d''une même souche » — et la science a abandonné le concept de race biologique, qui reste en revanche un construit social dont le racisme se nourrit.',
  'SOCIETE'::dossier_category,
  '[{"name":"Homo sapiens","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Homo_sapiens","note":"Espèce humaine, dont l''homogénéité génétique est exceptionnellement forte pour un mammifère à répartition mondiale."},{"name":"UNESCO","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Organisation_des_Nations_unies_pour_l%27%C3%A9ducation,_la_science_et_la_culture","note":"A adopté le 27 novembre 1978 la Déclaration sur la race et les préjugés raciaux, qui proclame l''unité de l''espèce humaine."},{"name":"Évelyne Heyer","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/%C3%89velyne_Heyer","note":"Professeure de génétique des populations, Muséum national d''histoire naturelle ; commissaire scientifique du Musée de l''Homme."},{"name":"Centre national de la recherche scientifique","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Centre_national_de_la_recherche_scientifique","note":"Définit la race comme une catégorie sans aucune base scientifique, au fondement des racismes."},{"name":"National Human Genome Research Institute","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/National_Human_Genome_Research_Institute","note":"Institut américain pionnier du Projet Génome Humain ; ses fiches documentent la variation génétique humaine (99,9 % d''identité)."}]'::jsonb,
  100,
  '[{"claim_part":"« Les groupes humains constituent des sous-espèces biologiques discontinues »","status":"BIAIS_ESSENTIALISTE","detail":"La variation génétique humaine est graduelle et clinale : les travaux fondateurs (Lewontin 1972, puis Barbujani et al., PNAS 1997) montrent que 85 % de la diversité génétique se trouve à l''intérieur des populations et que la partition en groupes raciaux ne recouvre aucune discontinuité du génome — « l''existence de ces grands groupes n''est pas soutenue par la présente analyse de l''ADN ». Sur les quelque 6 millions de lettres d''ADN qui différencient deux individus, seules environ 5 % s''expliquent par une origine géographique différente ; le reste distingue les individus d''une même origine. Il n''existe donc pas de sous-espèces discrètes chez Homo sapiens."},{"claim_part":"« Les traits morphologiques extérieurs définissent des lignées génétiques distinctes »","status":"BIAIS_DE_SELECTION","detail":"Les traits visibles (pigmentation de la peau, forme des cheveux) dépendent d''une poignée de gènes d''adaptation au climat et n''indexent pas le reste du génome : deux individus d''apparence très différente peuvent être génétiquement plus proches que deux individus de même apparence, et la diversité génétique est plus grande entre certaines populations africaines qu''entre un Européen et un Asiatique (marqueur de l''origine africaine de l''espèce). L''apparence extérieure ne définit aucune lignée génétique distincte — c''est le biais de sélection dénoncé par les généticiens des populations : quelques gènes d''apparence sont lus comme s''ils indexaient tout le génome."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/genetique-races-biologiques-humaines.jpg',
  'Illustration : National Human Genome Research Institute, domaine public, Wikimedia Commons'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '9a54cecc-09b2-4063-b97a-65b82994cba4',
  '8ddf3e0f-fb27-4188-808f-eae19b64ed2a',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Déclaration sur la race et les préjugés raciaux — adoptée par la Conférence générale de l''UNESCO le 27 novembre 1978',
  'UNESCO (Organisation des Nations unies pour l''éducation, la science et la culture)',
  '1978-11-27',
  'CITATION_EXACTE'::quote_kind,
  'All human beings belong to a single species and are descended from a common stock. They are born equal in dignity and rights and all form an integral part of humanity.',
  'L''article premier de la déclaration adoptée à Paris le 27 novembre 1978 répond mot pour mot à la thèse des races biologiques : l''humanité forme une seule espèce issue d''une souche commune. Le préambule réaffirme « l''unité essentielle de la race humaine » et la déclaration condamne toute doctrine de supériorité fondée sur la différenciation raciale. Le texte intégral est publié par l''UNESCO (les déclarations d''experts de 1950 et 1964 en constituent les étapes préparatoires, celle de 1978 reste le texte de référence). En français : « Tous les êtres humains appartiennent à une seule espèce et descendent d''une souche commune. Ils naissent égaux en dignité et en droits et forment tous une partie intégrante de l''humanité. ».',
  'https://www.unesco.org/en/legal-affairs/declaration-race-and-racial-prejudice',
  null,
  'faf4fa484036d5adee96872fffc34786cf8a65698c388553216e1063df52ed01',
  null,
  'https://fr.wikipedia.org/wiki/Organisation_des_Nations_unies_pour_l%27%C3%A9ducation,_la_science_et_la_culture',
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'e879506b-0b3f-4ada-884e-18191a6c5c4b',
  '8ddf3e0f-fb27-4188-808f-eae19b64ed2a',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Human Genomic Variation — fiche du National Human Genome Research Institute',
  'National Human Genome Research Institute (NHGRI), National Institutes of Health — « 15 Ways Genomics Influences Our World »',
  '2019-03-13',
  'CITATION_EXACTE'::quote_kind,
  'Did you know that at the base-pair level your genome is 99.9 percent the same as all of the humans around you - but in that 0.1 percent difference are many of the things that make you unique?',
  'L''institut qui a porté le Projet Génome Humain résume la donnée fondatrice : au niveau des paires de bases, le génome de tout être humain est identique à 99,9 % à celui de tous les autres ; le reliquat de 0,1 % porte aussi bien les traits physiques que les risques de maladies, ce qui prive l''idée de « races » de tout support génomique. La fiche complète : « les génomes humains diffèrent les uns des autres de toutes sortes de façons », sans regroupements discrets. En français : « Saviez-vous qu''au niveau des paires de bases votre génome est identique à 99,9 % à celui de tous les humains qui vous entourent — mais que dans cette différence de 0,1 % se trouvent beaucoup des choses qui vous rendent unique ? ».',
  'https://www.genome.gov/dna-day/15-ways/human-genomic-variation',
  null,
  '21e6b04551686c5b9ef78aebf613b011e867260695c6d49dd10adde01b7c349c',
  null,
  'https://fr.wikipedia.org/wiki/National_Human_Genome_Research_Institute',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'fc844436-d3d1-4817-8303-9afe32041ae3',
  '8ddf3e0f-fb27-4188-808f-eae19b64ed2a',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'An apportionment of human DNA diversity (PNAS, 29 avril 1997) — Guido Barbujani, Arianna Magagni, Eric Minch et L. Luca Cavalli-Sforza',
  'Guido Barbujani (université de Ferrare), Arianna Magagni (université de Bologne), Eric Minch et L. Luca Cavalli-Sforza (université Stanford), Proceedings of the National Academy of Sciences',
  '1997-04-29',
  'CITATION_EXACTE'::quote_kind,
  'In 1972, Richard Lewontin analyzed allele frequencies at 15 protein loci and concluded that 85% of the overall human genetic diversity is represented by individual diversity within populations. Differences among seven racial groups accounted for less than 7% of the total.',
  'L''étude de référence sur la répartition de la diversité humaine : ses propres mesures sur 109 locus d''ADN confirment Lewontin, avec 84,4 % de la variance à l''intérieur des populations, 4,7 % entre populations d''un même continent et 10,8 % entre continents (Lewontin : 85,4 / 8,3 / 6,3). La conclusion : « l''existence de ces grands groupes — raciaux ou continentaux — n''est pas soutenue par la présente analyse de l''ADN ». Les auteurs y répondent aux objections de ceux pour qui l''espèce serait « profondément subdivisée en races ». En français : « En 1972, Richard Lewontin a analysé les fréquences alléliques de 15 locus protéiques et conclu que 85 % de la diversité génétique humaine totale est représentée par la diversité individuelle au sein des populations. Les différences entre sept groupes raciaux comptaient pour moins de 7 % du total. ».',
  'https://pmc.ncbi.nlm.nih.gov/articles/PMC20754/',
  null,
  '2b72deb3555f6f49eadca6382c797cd3fb164ad94305e10810d5c75e340d4389',
  null,
  'https://fr.wikipedia.org/wiki/Centre_national_de_la_recherche_scientifique',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'f9b3d73a-bbda-49f9-85f1-09432c4fc211',
  '8ddf3e0f-fb27-4188-808f-eae19b64ed2a',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Race et génétique : comment la science a déconstruit le concept — Le Fil sciences',
  'Évelyne Heyer (professeure de génétique des populations, Muséum national d''histoire naturelle), France Culture',
  '2026-05-27',
  'CITATION_EXACTE'::quote_kind,
  'Si l''idée de race a été forgée par les scientifiques entre les 17e et 19e siècle, les recherches génétiques prouvent que les humains sont semblables à 99,9 % et que les catégorisations raciales n''ont aucun fondement scientifique et ce depuis les années 1960-70.',
  'La généticienne des populations du Muséum national d''histoire naturelle, commissaire scientifique du Musée de l''Homme, résume le consensus : « les races biologiques n''existent pas », la diversité biologique humaine « ne justifie aucune hiérarchie entre les groupes ni les stéréotypes racistes », et les différences d''apparence « ne correspondent à aucun » fondement génétique. Elle rappelle que la diversité génétique est plus grande entre certaines populations africaines qu''entre un Européen et un Asiatique — indice de l''origine africaine d''Homo sapiens.',
  'https://www.radiofrance.fr/franceculture/podcasts/le-fil-sciences/races-et-genetique-ce-que-la-science-a-tranche-1655393',
  null,
  '0021ceb33d244585d2c75dd30cbe8122989f457b1da76d1ce58400dd659eff1f',
  null,
  'https://fr.wikipedia.org/wiki/%C3%89velyne_Heyer',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '7a26563e-453f-40e7-8599-f2f9f24e09f9',
  '8ddf3e0f-fb27-4188-808f-eae19b64ed2a',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Quand la biologie parlait de races humaines — CNRS Le journal n° 263',
  'Charline Zeitoun, CNRS Le journal (Centre national de la recherche scientifique)',
  '2011-12-01',
  'CITATION_EXACTE'::quote_kind,
  'Catégorie de classement de l''espèce humaine selon des critères morphologiques ou culturels, sans aucune base scientifique et dont l''emploi est au fondement des divers racismes et de leurs pratiques.',
  'La définition officielle que le CNRS donne du mot « race » : une catégorie sans aucune base scientifique, au fondement des racismes. L''article retrace comment la biologie a fabriqué le concept aux XVIIIe et XIXe siècles (théories de la dégénération, polygénisme) avant que la génétique du XXe siècle ne le démente : la vision monogéniste « exclut tout concept racial biologique », et le racisme scientifique est aujourd''hui une impasse historique.',
  'https://lejournal.cnrs.fr/articles/quand-la-biologie-parlait-de-races-humaines',
  null,
  '925f07e269c5cdc94d5e67be32f5c1f3a61f76b626ba5252f4f07802ee9e14d9',
  null,
  'https://fr.wikipedia.org/wiki/Centre_national_de_la_recherche_scientifique',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '89b43961-c0f5-47c6-ad4d-84101f59f9f7',
  '8ddf3e0f-fb27-4188-808f-eae19b64ed2a',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Pourquoi parler de « races humaines » est un non-sens biologique',
  'Joseph Le Corre, Le Point',
  '2025-03-26',
  'CITATION_EXACTE'::quote_kind,
  'D''un point de vue scientifique, l''idée de « races humaines » est une aberration, car l''humanité partage un code génétique d''une homogénéité saisissante.',
  'Même dans un hebdomadaire classé à droite, le constat est sans ambiguïté : « leur ADN est rigoureusement identique à 99,9 %, ce qui fait de Homo sapiens l''espèce de mammifère la plus homogène génétiquement à l''échelle du monde entier ». L''article cite le généticien Paul Verdu (Laboratoire d''éco-anthropologie, Muséum national d''histoire naturelle) : entre un Papou et un Breton, ~0,1 % des 6 milliards de lettres diffèrent, et « seules environ 5 % sont liées à leur origine géographique différente, tout le reste s''explique par des différences entre individus de la même origine géographique ».',
  'https://www.lepoint.fr/eureka/pourquoi-parler-de-races-humaines-est-un-non-sens-biologique-26-03-2025-2585739_4706.php',
  null,
  'cfd562321ab2b40dd0a68ab5998f33587b0a693a3c49a3abadb6c2298321de1f',
  null,
  null,
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '08aee1cd-7acb-4357-8907-012afe61e0b3',
  '8ddf3e0f-fb27-4188-808f-eae19b64ed2a',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Pourquoi les actuels travaux en génétique ne marquent pas le retour des « races »',
  'Thomas Mahler, L''Express',
  '2023-04-12',
  'CITATION_EXACTE'::quote_kind,
  'Contrairement à ce qu''affirme l''extrême droite, les nouvelles études en génomique et sur les populations ne réhabilitent pas les catégories raciales, bien au contraire.',
  'Le décryptage répond à la crainte — nourrie aussi par les manifestes suprémacistes, comme celui de l''assaillant de Buffalo en 2022 qui citait des études génomiques — que la génomique rouvre la porte aux races : les travaux actuels la referment au contraire. La génétique des populations des années 2000-2020 confirme l''unité de l''espèce et la répartition majoritairement intrapopulationnelle de la diversité.',
  'https://www.lexpress.fr/sciences-sante/pourquoi-les-actuels-travaux-en-genetique-ne-marquent-pas-le-retour-des-races-HPB333WZCFHTFFZETAECYZYHQY/',
  null,
  '059e666d8bfe2cfcdb35ba30d80f98c11c24aaf2e0b207e9534c87265cc17933',
  null,
  null,
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '894c0bc8-0724-4cbd-b964-845380132eca',
  '8ddf3e0f-fb27-4188-808f-eae19b64ed2a',
  'CENTRE'::political_spectrum,
  'Michel Agier, anthropologue : « La race biologique n''existe pas, mais la race produite par le racisme, elle, existe socialement »',
  'Séverine Kodjo-Grandvaux (entretien), Le Monde',
  '2025-02-10',
  'CITATION_EXACTE'::quote_kind,
  'La race biologique n''existe pas, mais la race produite par le racisme, elle, existe socialement',
  'L''anthropologue Michel Agier (EHESS, IRD) rappelle la double vérité du dossier : la démonstration scientifique de l''inexistence des races biologiques n''empêche pas le racisme, qui produit socialement la « race » comme catégorie d''assignation — un héritage de l''histoire coloniale et impériale de l''Europe qu''il appelle l''« infrapensée » raciste. La distinction entre fait biologique et construit social est le point d''atterrissage du consensus scientifique.',
  'https://www.lemonde.fr/idees/article/2025/02/10/michel-agier-anthropologue-la-race-biologique-n-existe-pas-mais-la-race-produite-par-le-racisme-elle-existe-socialement_6539488_3232.html',
  null,
  'e3c2e41f7bded05b44441b379e91a2e847f7852012e71ed0796426f7c09514b8',
  null,
  null,
  7
);

delete from public.dossiers where slug = 'union-prophete-aicha-anachronisme-pedophilie';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '5c139b2a-e7a7-4992-89ce-7f82253d8cc3',
  'union-prophete-aicha-anachronisme-pedophilie',
  'L''union du prophète de l''islam avec Aïcha constitue un acte de pédophilie',
  'ANACHRONISME_HISTORIQUE'::verdict_status,
  'Qualifier de « pédophilie » l''union du prophète de l''islam avec ʿĀʾiša applique à l''Arabie du VIIe siècle une catégorie nosologique forgée à la fin du XIXe siècle. Le diagnostic clinique moderne — la paraphilie envers les prépubères, décrite par le DSM-5 (APA, 2013) et par la CIM-11 (OMS, 2019, code 6D32) — prolonge une nomenclature savante dont les termes datent de la sexologie viennoise : « paedophilia erotica » est forgé par Richard von Krafft-Ebing dans un article de 1896, après sa Psychopathia Sexualis de 1886, et n''entre dans l''ouvrage qu''à sa dixième édition allemande (1898).

Dans l''Antiquité et au Moyen Âge, les alliances nouées autour de la puberté constituaient la règle juridique et sociale — le droit romain fixait la nubilité des filles à douze ans — et l''Europe des cours chrétiennes pratiquait les mêmes mariages précoces d''alliance (Isabelle de Hainaut, épousée à dix ans par Philippe Auguste en 1180) : rien d''une singularité arabe.

Quant au récit des « neuf ans », la critique historico-critique appliquée aux traditions musulmanes — la méthode isnad-cum-matn, qui confronte les chaînes de transmission (isnād) et le contenu (matn) — établit (Joshua J. Little, Oxford, 2022) que toutes les versions du hadith remontent à un archétype unique, créé et diffusé par le transmetteur médinois Hišām b. ʿUrwa après son installation en Irak à la fin de sa vie, probablement en réponse à des polémiques irakiennes contre sa grand-tante : une mémoire de la fin du VIIIe siècle, deux siècles après les faits, non une donnée biographique contemporaine. Le dossier démontre un vice de méthode — l''usage rétroactif d''un concept clinique moderne adossé à une tradition textuelle tardive ; il ne prétend pas trancher l''âge exact de ʿĀʾiša.',
  'RELIGION'::dossier_category,
  '[{"name":"Mahomet","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Mahomet","note":null},{"name":"Aïcha","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/A%C3%AFcha","note":"La tradition sunnite lui attribue le récit de son âge au mariage ; la chaîne de transmission passe par Hišām b. ʿUrwa."},{"name":"Richard von Krafft-Ebing","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Richard_von_Krafft-Ebing","note":"Psychiatre viennois ; le terme « paedophilia erotica » entre dans une édition tardive de sa Psychopathia Sexualis."},{"name":"Joshua J. Little","kind":"PERSONNE","role":"AUTEUR","reference_url":null,"note":"Historien, auteur d''une thèse de doctorat (Oxford, 2022) sur l''évolution du hadith de l''âge d''Aïcha."},{"name":"Jacqueline Chabbi","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Jacqueline_Chabbi","note":"Professeure honoraire, spécialiste de l''islam classique, interrogée par Le Monde sur les sources de la biographie de Mahomet."}]'::jsonb,
  100,
  '[{"claim_part":"« La notion clinique de pédophilie s''applique au VIIe siècle »","status":"ANACHRONISME_CONCEPTUEL","detail":"La « pédophilie » n''est pas une catégorie transhistorique : c''est un diagnostic clinique construit par la psychiatrie et la sexologie de la fin du XIXe siècle, codifié aujourd''hui par le DSM-5 (APA, 2013) et la CIM-11 (OMS, 2019, code 6D32), qui décrivent une attirance sexuelle envers des enfants prépubères. Le terme « paedophilia erotica » est forgé par Richard von Krafft-Ebing dans un article de 1896 — après sa Psychopathia Sexualis de 1886 — et n''entre dans l''ouvrage qu''à sa dixième édition allemande (1898 ; traduction anglaise 1899, française 1900, D. F. Janssen, Medical History, 2015). Appliquer rétroactivement ce diagnostic à une union du VIIe siècle revient à projeter une nosographie moderne sur des structures matrimoniales prémodernes obéissant à d''autres logiques — nubilité légale, alliances dynastiques, stratégies familiales — que le droit romain comme l''Europe chrétienne organisaient autour de la puberté."},{"claim_part":"« Le récit des 9 ans est un fait biographique certifié »","status":"BIAIS_METHODOLOGIQUE","detail":"Les recueils de hadiths ont été compilés au IXe siècle, deux siècles après la mort du prophète (632). La version la plus connue (Sahih al-Bukhari, n° 5133) porte elle-même sa chaîne de transmission — Hišām, d''après son père, d''après ʿĀʾiša — et l''analyse isnad-cum-matn (J. J. Little, Oxford, 2022), qui confronte toutes les chaînes et tous les contenus, identifie un archétype unique créé et diffusé par Hišām b. ʿUrwa après son départ de Médine pour l''Irak, à la fin de sa vie : une élaboration de la fin du VIIIe siècle, et non un enregistrement contemporain des faits. Traiter ce récit comme une « archive » biographique sans appliquer les précautions de la critique historique — celles-là mêmes que la philologie du texte coranique met en œuvre à partir des manuscrits des VIIe-VIIIe siècles (F. Déroche, Collège de France) — relève d''un biais de méthode."},{"claim_part":"« Ces mariages précoces étaient propres à l''Arabie »","status":"DOUBLE_STANDARD","detail":"Le mariage précoce d''alliance n''était ni arabe ni islamique : toute la norme matrimoniale prémoderne l''organisait. La compilation justinienne fixe la nubilité des filles à douze ans et la tradition canonique médiévale conserve cette borne ; les cours chrétiennes descendaient souvent en dessous : Isabelle de Hainaut, âgée de dix ans, épouse le futur Philippe Auguste en 1180, et les fiançailles d''enfants scandent l''histoire dynastique européenne. Juger la seule Arabie du VIIe siècle à l''aune d''une catégorie moderne, en épargnant Rome, Byzance et les royautés chrétiennes — qui pratiquaient les mêmes unions précoces pour des raisons de succession et d''alliance — applique deux mesures à un même fait."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/union-prophete-aicha-anachronisme-pedophilie.jpg',
  'Manuscrit du Coran (BnF, Gallica), domaine public, Wikimedia Commons'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '5f7c7279-75b8-48e1-a381-909558e5885d',
  '5c139b2a-e7a7-4992-89ce-7f82253d8cc3',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Sahih al-Bukhari, hadith n° 5133 — « Giving one''s young children in marriage » (Livre 67, hadith 69 ; Vol. 7, Livre 62, hadith 64)',
  'Muhammad al-Bukhari (IXe siècle) — texte arabe et traduction anglaise servis par sunnah.com (instantané Wayback)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Narrated `Aisha: that the Prophet (ﷺ) married her when she was six years old and he consummated his marriage when she was nine years old, and then she remained with him for nine years (i.e., till his death).',
  'Le recueil de référence de la tradition sunnite porte lui-même la chaîne de transmission (isnād) du récit : « d''après Hišām, d''après son père, d''après ʿĀʾiša » — le transmetteur médinois Hišām b. ʿUrwa rapportant de son père ʿUrwa b. al-Zubayr. Le texte a été fixé des décennies après la mort du prophète (632) : Sahih al-Bukhari est compilé au IXe siècle. Rien dans ce document n''est un enregistrement contemporain des faits ; il constitue le point de départ d''un récit transmis oralement pendant deux siècles.',
  'https://web.archive.org/web/20240102181707/https://sunnah.com/bukhari:5133',
  null,
  '435972c40148a43f920cb3d2f80f693ec4d6f9cb30d345b33ca6b73e14802419',
  null,
  null,
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '59a7a449-57cc-40b7-8c54-1d2a7584bf53',
  '5c139b2a-e7a7-4992-89ce-7f82253d8cc3',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'The Hadith of ʿĀʾišah''s Marital Age: A Study in the Evolution of Early Islamic Historical Memory — thèse de doctorat (DPhil)',
  'Joshua J. Little, Pembroke College, université d''Oxford (sous la direction de Christopher Melchert), 2022',
  null,
  'CITATION_EXACTE'::quote_kind,
  'This ur-hadith appears to have been created and disseminated by the Madinan tradent Hišām b. ʿUrwah b. al-Zubayr (d. 146-147/763-765) after he moved to Iraq towards the end of his life, probably as a reaction to local proto-Šīʿī polemics against his great-aunt, ʿĀʾišah.',
  'Résumé de la thèse, déposée dans l''Oxford University Research Archive. Après avoir collationné toutes les versions connues du hadith et reconstitué leurs « urtextes » par une analyse des chaînes et des textes, l''auteur conclut que toutes dérivent d''un archétype unique, diffusé par Hišām b. ʿUrwa après son installation en Irak vers la fin de sa vie — une mémoire de la seconde moitié du VIIIe siècle, non un témoignage contemporain des faits.',
  'https://ora.ox.ac.uk/objects/uuid:1bdb0eea-3610-498b-9dfd-cffdb54b8b9b',
  null,
  '3447fb0066b835149c2ad62ecd84ad5cac2a758517f0297dce2485abe1918e85',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '6ab3c587-8084-409f-b633-346d6c785664',
  '5c139b2a-e7a7-4992-89ce-7f82253d8cc3',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« ''Chronophilia'': Entries of Erotic Age Preference into Descriptive Psychopathology » — Medical History (Cambridge University Press)',
  'Diederik F. Janssen — Medical History, vol. 59 (2015)',
  '2015-09-09',
  'CITATION_EXACTE'::quote_kind,
  'A scientific nomenclature of erotic age preferences informed the mid- through late nineteenth century joint appearance of homosexuality and sexual abuse of minors on the medico-legal scene.',
  'Article d''histoire de la médecine : la nomenclature savante des préférences d''âge érotique est un produit du milieu et de la fin du XIXe siècle, élaborée en même temps que le classement psychiatrique de l''homosexualité et des abus sexuels. Le terme « paedophilia erotica » est introduit par Richard von Krafft-Ebing dans une édition tardive de sa Psychopathia Sexualis, à la fin du XIXe siècle : la « pédophilie » clinique n''existe pas comme catégorie à l''époque du VIIe siècle.',
  'https://www.cambridge.org/core/journals/medical-history/article/chronophilia-entries-of-erotic-age-preference-into-descriptive-psychopathology/1896C08F07CB5F1A428CEEF3E1104586',
  null,
  'a2d26d2850f8ec76d2e2b688ec049d21e02b306e3025160de486c8bf79bc7c86',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '6814e7c2-e4f1-4e1d-a644-e54948a18f18',
  '5c139b2a-e7a7-4992-89ce-7f82253d8cc3',
  'GAUCHE'::political_spectrum,
  '« The truth about Muhammad and Aisha »',
  'Myriam Francois-Cerrah — The Guardian (quotidien britannique de centre gauche)',
  '2012-09-17',
  'CITATION_EXACTE'::quote_kind,
  'They point out that, in seventh-century Arabia, adulthood was defined as the onset of puberty. (This much is true, and was also the case in Europe: five centuries after Muhammad''s marriage to Aisha, 33-year-old King John of England married 12-year-old Isabella of Angoulême.)',
  'Chronique publiée lors de la polémique du film Innocence of Muslims, qui dépeignait le prophète de l''islam en pédophile. Le texte rappelle que, dans l''Arabie du VIIe siècle, l''entrée dans l''âge adulte était définie par la puberté — et que l''Europe médiévale nouait les mêmes alliances précoces, comme le mariage du roi Jean d''Angleterre (33 ans) avec Isabelle d''Angoulême (12 ans). L''accusation de « pédophilie » circule dans un contexte polémique, non dans une littérature historique.',
  'https://www.theguardian.com/commentisfree/belief/2012/sep/17/muhammad-aisha-truth',
  null,
  'b88cb0ee93f636ff507d2be0e74ad4c2b1a46b055f16985c075dddddc673ba0a',
  null,
  null,
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '38177e0c-3695-4688-90a3-345713653fab',
  '5c139b2a-e7a7-4992-89ce-7f82253d8cc3',
  'CENTRE'::political_spectrum,
  '« A la recherche du Mahomet de l''histoire » (entretien avec Jacqueline Chabbi)',
  'Propos recueillis par Virginie Larousse — Le Monde (Le Monde des religions), instantané Wayback',
  '2020-06-07',
  'CITATION_EXACTE'::quote_kind,
  'Les sources concernant Mahomet ont été écrites des décennies après sa mort, et peuvent donc donner une image biaisée du prophète de l''islam.',
  'Entretien avec Jacqueline Chabbi, professeure honoraire, spécialiste de l''islam classique, qui replace Mahomet dans son contexte tribal. Le chapeau de l''article pose le principe méthodologique du dossier : les sources biographiques sont postérieures de plusieurs décennies aux faits et donnent une image biaisée du prophète.',
  'https://web.archive.org/web/20221025224552/https://www.lemonde.fr/le-monde-des-religions/article/2020/06/07/a-la-recherche-du-mahomet-de-l-histoire_6042044_6038514.html',
  null,
  '014023ecda940127ffe1aa0fb0b1cc18c6c9b25813c257bb45f01afe76a4f3c8',
  null,
  null,
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '3ffff39f-ac61-4319-b97b-3c954a45181f',
  '5c139b2a-e7a7-4992-89ce-7f82253d8cc3',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  '« Yémen : les ultras s''opposent à l''augmentation de l''âge du mariage »',
  'Delphine Minoui — Le Figaro (blog Iran)',
  '2010-03-21',
  'CITATION_EXACTE'::quote_kind,
  'Mais pour les ultras - qui rappellent que le prophète épousa Aïcha lorsqu''elle avait neuf ans - on ne badine pas avec l''âge des noces.',
  'Reportage du Figaro, quotidien classé à droite, sur le débat yéménite relatif à l''âge du mariage. Le journal constate que les milieux les plus conservateurs invoquent le récit des neuf ans pour s''opposer à une loi fixant un âge minimum. Le récit apparaît ici pour ce qu''il est dans le débat public contemporain : un argument d''autorité mobilisé contre une protection des mineures, non une donnée biographique neutre.',
  'https://www.lefigaro.fr/blogs/iran/2010/03/yemen-les-ultras-sopposent-a-l.html',
  null,
  '118c16ac03c2f7fae38559f7fc8528367ef3abc6a63d0f3ed647248dbb81296d',
  null,
  null,
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '4f039731-ad46-4dd5-b0bc-08165178f4ad',
  '5c139b2a-e7a7-4992-89ce-7f82253d8cc3',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Institutes de Justinien, livre I — « De nuptiis » et la nubilité des filles fixée à douze ans (texte latin)',
  'Justinien Ier (compilation du droit romain, 533 apr. J.-C.) — texte latin servi par The Latin Library',
  null,
  'CITATION_EXACTE'::quote_kind,
  'pubertatem in masculis post quartum decimum annum completum illico initium accipere disposuimus, antiquitatis normam in femininis personis bene positam suo ordine relinquentes, ut post duodecimum annum completum viripotentes esse credantur.',
  'Le droit romain, matrice juridique de l''Europe, fixe la nubilité : quatorze ans révolus pour les garçons, douze ans révolus pour les filles, « la norme ancienne bien établie pour les personnes féminines » étant expressément conservée par Justinien. La tradition canonique médiévale reprend ces bornes, et les cours chrétiennes les franchissent souvent vers le bas : Isabelle de Hainaut, née en 1170, est mariée en 1180, à dix ans, au futur Philippe Auguste. Le mariage précoce d''alliance est donc la norme structurelle de tout l''Occident prémoderne — Rome, Byzance, royautés chrétiennes — et nullement une singularité arabe.',
  'https://www.thelatinlibrary.com/justinian/institutes1.shtml',
  null,
  'f2337d4e943d908aa314852eb2bdb1b3129608d744470d66962bd4cc0db9cce0',
  null,
  null,
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'c5a5f738-17b6-4e32-b0e1-2325e71fbea2',
  '5c139b2a-e7a7-4992-89ce-7f82253d8cc3',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'DSM-5 (APA) et CIM-11 (OMS) — la pédophilie comme trouble clinique moderne ; les précédents nosologiques de Krafft-Ebing (Psychopathia Sexualis, 1886)',
  'American Psychiatric Association — notice « Paraphilic Disorders » du DSM-5 (2013) ; Organisation mondiale de la santé, CIM-11 (code 6D32, 2019) ; Richard von Krafft-Ebing (1886/1896)',
  '2013-05-18',
  'CITATION_EXACTE'::quote_kind,
  'To be diagnosed with a paraphilic disorder, DSM-5 requires that people with these interests: feel personal distress about their interest, not merely distress resulting from society''s disapproval; or have a sexual desire or behavior that involves another person''s psychological distress, injury, or death, or a desire for sexual behaviors involving unwilling persons or persons unable to give legal consent.',
  'Le « trouble pédophilique » (pedophilic disorder) est une catégorie clinique contemporaine : le DSM-5 (APA, 2013) le définit comme un trouble paraphilique impliquant une attirance sexuelle envers des enfants prépubères, et la CIM-11 (OMS, 2019, code 6D32) décrit « un schéma soutenu, focalisé et intense d''excitation sexuelle » envers des enfants prépubères. Ces catégories prolongent une nomenclature forgée par la sexologie du XIXe siècle : Psychopathia Sexualis de Krafft-Ebing en 1886, terme « paedophilia erotica » forgé dans un article de 1896, entrée dans l''ouvrage seulement à sa dixième édition allemande (1898). Le concept clinique est daté — il n''existait ni au VIIe siècle ni dans aucune société prémoderne.',
  'https://www.psychiatry.org/File%20Library/Psychiatrists/Practice/DSM/APA_DSM-5-Paraphilic-Disorders.pdf',
  null,
  '32bcdb495e769b86bc04891f5c9c71d5f3f1d1d4d8c88051dee313c354ce2e27',
  null,
  null,
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'cc36c372-2671-46b6-a453-33acb65e198f',
  '5c139b2a-e7a7-4992-89ce-7f82253d8cc3',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Collège de France — chaire « Histoire du Coran. Texte et transmission » (François Déroche) : l''approche historienne et philologique',
  'François Déroche, professeur du Collège de France (chaire créée en 2015), membre de l''Institut',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Comme l''indique l''intitulé de la chaire, l''enseignement de François Déroche se place dans une approche historienne du texte coranique. Celle-ci envisage aussi bien des questions relatives à la constitution du Coran dans l''environnement de l''Antiquité tardive que d''autres qui sont liées à la façon dont s''est déroulée sa transmission et qui font appel aux témoins privilégiés que sont les manuscrits qui nous permettent de suivre cette transmission dès le milieu du VIIe siècle, quelques décennies à peine après la mort de Muḥammad.',
  'La plus haute institution scientifique française pour l''étude du texte coranique revendique une approche historienne et philologique fondée sur les témoins matériels — les manuscrits contemporains des faits — et « le point sur les débats en cours ». C''est cette même exigence méthodologique que la critique historique applique aux récits biographiques tardifs : le hadith des neuf ans, compilé au IXe siècle, est très éloigné des manuscrits du VIIe siècle dont l''histoire du texte peut être retracée. Confondre les deux registres de sources est précisément le biais de méthode que le dossier documente.',
  'https://www.college-de-france.fr/fr/chaire/francois-deroche-histoire-du-coran-texte-et-transmission-chaire-statutaire',
  null,
  '7495329c8f076fd3ab97984a93186de24aef435d648e8a0f3fea3ae148477eea',
  null,
  'https://fr.wikipedia.org/wiki/Fran%C3%A7ois_D%C3%A9roche',
  8
);

delete from public.dossiers where slug = 'islam-homosexualite-transidentite-droit-compare';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '0be0aa6c-3c4e-4724-b4cc-36ab16252fa8',
  'islam-homosexualite-transidentite-droit-compare',
  'L''islam est par essence la seule religion scripturairement homophobe et transphobe',
  'GENERALISATION_ABUSIVE'::verdict_status,
  'Trois confusions portent cette affirmation. D''abord, la réprobation scripturaire des rapports entre personnes de même sexe n''est pas propre à l''islam : elle est partagée par les corpus abrahamiques — le Lévitique (18,22) qualifie l''acte d''« abomination », l''Épître aux Romains (1,26-27) parle de « passions infâmes » et de ce qui est « contre nature », et le Coran fait de l''acte du peuple de Loth une « turpitude » sans précédent (7,80-84 ; 26,165-166).

Ensuite, le droit islamique classique ne confond pas la transition de genre avec l''orientation sexuelle : il distingue le mukhannath (l''homme efféminé) et le khuntha (la personne au sexe ambigu), ce dernier traité jusque dans les règles d''héritage, et plusieurs États musulmans encadrent légalement la réassignation — l''Iran l''autorise et la subventionne partiellement depuis le milieu des années 1980, sur le fondement d''une fatwa attribuée à Khomeini, tandis que la fatwa égyptienne de 1988 (Tantawi) l''ouvre aux personnes intersexes tout en la restreignant pour les motifs identitaires.

Enfin, la répression pénale actuelle des rapports homosexuels doit moins au dogme qu''au legs des codes européens du XIXe siècle : la « section 377 » du code pénal indien de 1860 — premier modèle de loi anti-sodomie intégré à un code — a essaimé dans l''Empire britannique, et plus de la moitié des États qui criminalisent encore ces rapports sont d''anciennes possessions britanniques ; quant à l''Empire ottoman, sa réforme pénale de 1858, souvent réduite à une « dépénalisation », a surtout substitué au régime antérieur un code calqué sur le français de 1810 — une lecture rétrospective que la recherche récente conteste.

« Par essence la seule religion scripturairement homophobe et transphobe » : la généralisation abusive est donc triple — elle ignore les interdits bibliques, confond le texte sacré, l''histoire du droit et les politiques étatiques, et passe sous silence les autorisations médicales de transition délivrées dans plusieurs pays musulmans.',
  'RELIGION'::dossier_category,
  '[{"name":"Afsaneh Najmabadi","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Afsaneh_Najmabadi","note":"Historienne, professeure à l''université Harvard, autrice de Professing Selves (Duke University Press, 2013)."},{"name":"Rouhollah Khomeini","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Rouhollah_Khomeini","note":"Sa fatwa sur le changement de sexe des personnes intersexes (1967), étendue en 1985 aux personnes trans selon la recherche (F. Jafari), fonde la politique iranienne d''autorisation des chirurgies."},{"name":"Mohamed Sayed Tantawi","kind":"PERSONNE","role":"AUTEUR","reference_url":null,"note":"Mufti de la République arabe d''Égypte (1986-1996) ; sa fatwa de 1988 limite la chirurgie aux personnes intersexes."},{"name":"Lévitique","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/L%C3%A9vitique","note":"Livre de la Torah hébraïque qui range l''acte entre hommes parmi les « abominations » (18,22 ; 20,13)."},{"name":"Coran","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Coran","note":"Le récit de Loth (7,80-84 ; 26,165-166) y condamne l''acte des hommes de son peuple comme une « turpitude »."}]'::jsonb,
  95,
  '[{"claim_part":"« Le rejet scripturaire de l''homosexualité est propre à l''islam »","status":"BIAIS_DE_SELECTION","detail":"L''interdit textuel est partagé : « Tu ne coucheras point avec un homme comme on couche avec une femme. C''est une abomination » (Lévitique 18,22) ; « leurs femmes ont changé l''usage naturel en celui qui est contre nature » (Épître aux Romains 1,26-27) ; le Coran reprend le motif de Loth (7,80-84 ; 26,165-166). Ne citer que le texte musulman en passant sous silence les interdits bibliques — antérieurs et fondateurs pour les deux autres monothéismes — est un biais de sélection : la spécificité alléguée ne survit pas à l''inventaire complet des textes."},{"claim_part":"« La tradition islamique interdit formellement toute transition de genre »","status":"CONFUSION_CONCEPTUELLE","detail":"Le droit islamique classique distingue le mukhannath (l''homme efféminé) et le khuntha (la personne au sexe ambigu), ce dernier traité jusque dans les règles d''héritage (Saqer Almarri, Arcade, Stanford ; E. K. Rowson, 1991) : l''affirmation confond l''interdit de l''homosexualité — une question d''orientation — avec un encadrement normé de la transition — une question d''identité et de médecine. L''Iran autorise et subventionne partiellement la chirurgie de réassignation depuis le milieu des années 1980, sur le fondement d''une fatwa attribuée à Khomeini (1967, étendue en 1985 selon la recherche) ; l''Égypte ouvre la chirurgie aux personnes intersexes (fatwa Tantawi, 1988) tout en interdisant la transition motivée par une identité de genre. Un encadrement, donc, non un interdit général de principe."},{"claim_part":"« La répression pénale actuelle découle uniquement du dogme »","status":"ANACHRONISME_CONCEPTUEL","detail":"Les codes qui répriment aujourd''hui les rapports entre personnes de même sexe doivent plus à l''histoire coloniale qu''au seul dogme : la « section 377 » du code pénal indien de 1860 — copiée du Buggery Act anglais — a été exportée dans l''Empire britannique, et plus de la moitié des États qui criminalisent encore ces rapports sont d''anciennes possessions britanniques (Human Rights Watch, 2008). L''exemple ottoman souvent avancé montre l''inverse d''une causalité religieuse simple : le code de 1858, calqué sur le français de 1810, ne punissait plus la conduite privée mais aggravait le traitement pénal de l''acte public (Özsoy, 2020, Journal of Homosexuality) — la « dépénalisation » de 1858 est une lecture rétrospective contestée, pas un acquis. Attribuer la répression contemporaine au seul dogme islamique projette sur l''histoire juridique une causalité unique et anachronique."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-15T00:00:00.000Z'::timestamptz,
  '/illustrations/islam-homosexualite-transidentite-droit-compare.jpg',
  'Photo : Groov3, CC0, Wikimedia Commons'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '80ced67f-e7b4-450d-b06d-7d6bc17693a0',
  '0be0aa6c-3c4e-4724-b4cc-36ab16252fa8',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Bible — Lévitique 18,22 (traduction Louis Segond)',
  'Ancien Testament, Lévitique — traduction Louis Segond (domaine public), servie par BibleGateway',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Tu ne coucheras point avec un homme comme on couche avec une femme. C''est une abomination.',
  'Le code de sainteté du Lévitique range l''acte entre hommes parmi les « abominations » et, au verset 20,13, le punit de mort. L''interdit scripturaire des relations entre personnes de même sexe n''est donc pas propre au Coran : il figure d''abord dans la Torah hébraïque.',
  'https://www.biblegateway.com/passage/?search=L%C3%A9vitique%2018%3A22&version=LSG',
  null,
  '18490289b5469eb3be55803842ada162f31a85a0470d1fcb42ac08df093351dd',
  null,
  null,
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '6b210b00-2dfc-40eb-a6c0-5335095090e9',
  '0be0aa6c-3c4e-4724-b4cc-36ab16252fa8',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Bible — Épître aux Romains 1,26-27 (traduction Louis Segond)',
  'Nouveau Testament, Épître aux Romains (apôtre Paul) — traduction Louis Segond (domaine public), servie par BibleGateway',
  null,
  'CITATION_EXACTE'::quote_kind,
  'C''est pourquoi Dieu les a livrés à des passions infâmes: car leurs femmes ont changé l''usage naturel en celui qui est contre nature; et de même les hommes, abandonnant l''usage naturel de la femme, se sont enflammés dans leurs désirs les uns pour les autres, commettant homme avec homme des choses infâmes, et recevant en eux-mêmes le salaire que méritait leur égarement.',
  'Le Nouveau Testament reprend l''interdit : les rapports entre personnes de même sexe y sont dits « contre nature » et qualifiés de « passions infâmes ». La réprobation morale n''est donc pas l''apanage d''un seul monothéisme ; elle traverse l''Ancien et le Nouveau Testament comme le Coran.',
  'https://www.biblegateway.com/passage/?search=Romains%201%3A26-27&version=LSG',
  null,
  '1b3dcfc4a2ccaf8eab88975a25b5b59600bdcde9cfafc7b801f8415af79a5404',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'fd0731e2-9e70-4cdc-87e3-1ad7ec0813a5',
  '0be0aa6c-3c4e-4724-b4cc-36ab16252fa8',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Coran — sourate 7 (Al-A''raf), versets 80-84, et sourate 26 (Ach-Chu''ara''), versets 165-166 (traduction Muhammad Hamidullah)',
  'Le Coran — traduction française de Muhammad Hamidullah, servie par Quran.com',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Et Lot, quand il dit à son peuple : "Vous livrez vous à cette turpitude que nul, parmi les mondes, n''a commise avant vous ?"',
  'Le Coran condamne l''acte du peuple de Loth comme une « turpitude » ; la sourate 26 (v. 165) interpelle les hommes : « Accomplissez-vous l''acte charnel avec les mâles de ce monde ? ». La réprobation est celle d''un texte sacré, comme dans les corpus bibliques : c''est une constante monothéiste, non un trait inventé par l''islam.',
  'https://quran.com/fr/7/80-84',
  null,
  '3a7dd6c2f95edc871ae1b6ddb05b742c5801309b89017be3cd9716c195761880',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '49415e80-95b8-4d9d-b8f0-e6da9f7ad821',
  '0be0aa6c-3c4e-4724-b4cc-36ab16252fa8',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Fatwa de Mohamed Sayed Al Tantawi sur la chirurgie de réassignation (8 juin 1988) — base Cairo 52 (MENA Trans Archives)',
  'Mohamed Sayed Al Tantawi, mufti de la République arabe d''Égypte — base Cairo 52 Legal Research Institute',
  '1988-06-08',
  'CITATION_EXACTE'::quote_kind,
  'Surgeries are permitted for those with ambiguous sex (intersex) and its an obligation in this case, once confirmed by a trusted doctor. It is forbidden for just a desire to change sex from female to male or from male to female (gender identity disorder- transgender).',
  'Cette fatwa, souvent citée comme une « autorisation » islamique de la transition, dit l''inverse d''une permission générale : elle ouvre la chirurgie aux personnes intersexes et interdit explicitement le changement motivé par une identité de genre. Elle illustre la distinction que le droit islamique opère entre intersexuation et identité : un encadrement, non une reconnaissance.',
  'https://cairo52.com/map-posts/shiekh-mohamed-sayed-al-tantawi-egypt/',
  null,
  'c62a3fc87767e3c648de38a53e3a1b140fb691fc31fe98fa7c081e9836e88292',
  null,
  null,
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'ead81ded-9d43-46bc-bba2-d921cea1d85f',
  '0be0aa6c-3c4e-4724-b4cc-36ab16252fa8',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Professing Selves: Transsexuality and Same-Sex Desire in Contemporary Iran — notice de l''éditeur',
  'Afsaneh Najmabadi (université Harvard) — Duke University Press, notice de l''ouvrage',
  '2013-12-01',
  'CITATION_EXACTE'::quote_kind,
  'Since the mid-1980s, the Islamic Republic of Iran has permitted, and partially subsidized, sex reassignment surgery.',
  'Ouvrage de l''historienne Afsaneh Najmabadi (Harvard) sur la transsexualité en Iran : la République islamique autorise et subventionne en partie la chirurgie de réassignation depuis le milieu des années 1980. La politique iranienne s''appuie sur une position attribuée à Khomeini ; l''ouvrage montre comment droit, psychiatrie et jurisprudence islamique ont produit une catégorie « trans » juridiquement tolérée — distincte de l''homosexualité, réprouvée.',
  'https://www.dukeupress.edu/professing-selves',
  null,
  'bdb63f2ef7c10cd13b0692af77105c28a0681ac2250ef302406b64e924440e3b',
  null,
  null,
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '4d8795b2-a577-4751-ac27-e0ee9720a573',
  '0be0aa6c-3c4e-4724-b4cc-36ab16252fa8',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Identities of a Single Root: The Triad of The Khuntha, Mukhannath, and Khanith » — Arcade (Stanford Humanities Center)',
  'Saqer Almarri — Arcade, article évalué par les pairs',
  null,
  'CITATION_EXACTE'::quote_kind,
  'The mukhannath is the term most often invoked when scholars of Islamic studies discuss male homosexuality and male effeminacy. Another identity described in classical Arabic literature is the khuntha (plural: khunatha). This identity often arises in legal treatises addressing inheritance rules, because the question of the sex of the khuntha arises in order to calculate each heir''s inheritance.',
  'Le droit islamique classique distingue des figures que le vocabulaire contemporain confond : le mukhannath (l''homme efféminé, associé dans les traités à l''homosexualité passive) et le khuntha (la personne au sexe ambigu), ce dernier traité jusque dans les règles de calcul des héritages. La tradition savante n''assimile donc pas l''orientation sexuelle à l''identité de genre.',
  'https://shc.stanford.edu/arcade/interventions/identities-single-root-triad-khuntha-mukhannath-and-khanith-0',
  null,
  '7c6ebf0b249fb50e07ddaeee82eb15b589242b302b05330424e4097fd3a00493',
  null,
  null,
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '6a47188d-5db5-4dd1-8529-0c2c668d62f3',
  '0be0aa6c-3c4e-4724-b4cc-36ab16252fa8',
  'CENTRE'::political_spectrum,
  '« Iran : changer de sexe ou mourir »',
  'D. Bel. — Le Monde, instantané Wayback',
  '2006-05-12',
  'CITATION_EXACTE'::quote_kind,
  'En Iran, les transsexuels sont considérés comme des "malades". Depuis 1979, ils bénéficient néanmoins d''une certaine forme de tolérance de la part du régime islamique. Ils ont ainsi le droit de changer de sexe pour trouver leur place dans la société.',
  'Article du Monde accompagnant un reportage d''Envoyé spécial : il rappelle que, sous contrôle médical et religieux, la République islamique autorise le changement de sexe — tout en punissant l''homosexualité. Le traitement institutionnel de la transition y est donc distinct de celui de l''orientation, ce qui contredit l''idée d''un interdit islamique uniforme.',
  'https://web.archive.org/web/20240619192404/https://www.lemonde.fr/vous/article/2006/05/12/iran-changer-de-sexe-ou-mourir_770938_3238.html',
  null,
  '36a5fef4bfa7c06fc5e4188e6b74ed521f6af6ccc8a6a97ede22346789ad4664',
  null,
  null,
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '56e2ec11-93d8-4100-b93c-112728b91030',
  '0be0aa6c-3c4e-4724-b4cc-36ab16252fa8',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  '« Avenir de l''Église : le rapport du Synode rejette la bénédiction des couples homosexuels et reporte la question du célibat des prêtres »',
  'Jean-Marie Guénois — Le Figaro',
  '2023-10-29',
  'CITATION_EXACTE'::quote_kind,
  'Rejet de la bénédiction de couples homosexuels, report à long terme d''une éventuelle abolition du célibat sacerdotal, remise en cause du pouvoir exclusif de l''évêque au profit d''une «coresponsabilité» du gouvernement ecclésial avec les laïcs, large ouverture pour donner des responsabilités aux femmes, mais dont le statut reste à définir, sont les quatre propositions majeures du «rapport de synthèse» de la première étape du synode sur l''avenir de l''Église, présentées samedi 28 octobre dans la soirée à Rome.',
  'Le Figaro, quotidien classé à droite, rapporte que le synode catholique rejette la bénédiction des couples de même sexe. La réprobation morale des relations homosexuelles est donc portée aussi par l''institution catholique contemporaine, ce qui contredit la thèse d''une spécificité musulmane.',
  'https://www.lefigaro.fr/actualite-france/avenir-de-l-eglise-le-rapport-du-synode-rejette-la-benediction-des-couples-homosexuels-et-reporte-une-abolition-du-celibat-des-pretres-20231029',
  null,
  'ef93fe870a0e3f6b293b851e5fe08c6abab3089946dac54942e4f9a940fb6fcc',
  null,
  null,
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '9aa1c62d-4dce-41fa-84cf-0bb0cd1ea238',
  '0be0aa6c-3c4e-4724-b4cc-36ab16252fa8',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Transsexuality under Surveillance in Iran: Clerical Control of Khomeini''s Fatwas » — Journal of Middle East Women''s Studies, vol. 10, n° 2, p. 31-51',
  'Farrah Jafari — Duke University Press',
  '2014-07-01',
  'CITATION_EXACTE'::quote_kind,
  'In 1967, the exiled Ayatollah Ruhollah Khomeini published a fatwa declaring that there is no religious restriction on sex reassignment surgery for hermaphrodites. In 1985, he issued an appendage to this fatwa to include transsexuals suffering from gender dysphoria.',
  'Résumé officiel de l''article (reconstruit depuis les métadonnées d''édition, OpenAlex et Crossref concordants — l''éditeur vend le texte intégral) : la fatwa de Khomeini, d''abord émise en 1967 pour les personnes hermaphrodites puis étendue en 1985 aux personnes trans, est le fondement textuel du dispositif iranien d''autorisation des chirurgies — que l''article décrit comme ensuite instrumenté par le clergé comme outil de police des sexualités. La date de 1986 parfois citée n''est pas celle des textes documentés.',
  'https://read.dukeupress.edu/jmews/article/10/2/31/15524/Transsexuality-under-Surveillance-in-IranClerical',
  null,
  '5982366a587532790d84c142852b4cece8373b4fbf1f6da54f3fda8f44a0b676',
  null,
  null,
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '17e1951b-755b-48e8-a11e-fbc8bd1929bf',
  '0be0aa6c-3c4e-4724-b4cc-36ab16252fa8',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Decolonizing Decriminalization Analyses: Did the Ottomans Decriminalize Homosexuality in 1858? » — Journal of Homosexuality, vol. 68, n° 12, p. 1979-2002',
  'Elif Ceylan Özsoy (School of Law, University of Exeter)',
  '2020-02-18',
  'CITATION_EXACTE'::quote_kind,
  'The contentious article of the 1858 Ottoman Penal Code is as follows: Art. 202—The person who dares to commit the abominable act publicly contrary to modesty and sense of shame is to be imprisoned for from three months to one year and a fine of from one Mejidieh gold piece to ten Mejidieh gold pieces is to be levied (Penal Code of the Ottoman Empire, 1858).',
  'Étude de référence (revue à comité de lecture) sur la « dépénalisation » ottomane de 1858 : le code, copie de l''article 330 du code pénal français de 1810, ne punissait plus que l''acte public — la sphère privée échappant aux peines — mais l''article démontre que la lecture rétrospective en « décriminalisation de l''homosexualité » procède d''une grille occidentale anachronique : l''auteure conclut que le code de 1858 a en réalité aggravé le statut pénal de la conduite visée. Texte intégral servi par un instantané (l''éditeur vend l''article).',
  'https://web.archive.org/web/20230814130646id_/https://teyit.fra1.cdn.digitaloceanspaces.com/wp-content/uploads/2020/07/Decolonizing-Decriminalization-Analyses-Did-the-Ottomans-Decriminalize-Homosexuality-in-1858.pdf',
  null,
  '09191236f19134f6051826050d3a069a7111719ab1af64b471493193d89ae8fe',
  null,
  null,
  9
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '0bf41e0d-732c-4f27-b361-23f0d93a631a',
  '0be0aa6c-3c4e-4724-b4cc-36ab16252fa8',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« The Effeminates of Early Medina » — Journal of the American Oriental Society, vol. 111, n° 4, p. 671-693',
  'Everett K. Rowson (université de Pennsylvanie à la publication ; New York University depuis)',
  '1991-10-01',
  'CITATION_EXACTE'::quote_kind,
  'There is considerable evidence for the existence of a form of publicly recognized and institutionalized effeminacy or transvestism among males in pre-Islamic and early Islamic Arabian society.',
  'Article fondateur sur les mukhannathūn de Médine : l''efféminence masculine y était une catégorie socialement reconnue et institutionnalisée dans l''Arabie pré-islamique et des premiers siècles de l''islam — les mukhannathūn circulaient librement auprès des femmes et tenaient un rôle de premier plan dans la musique à La Mecque et Médine — et les persécutions dont ils furent l''objet visaient leurs activités, non un statut sexuel : ils n''étaient pas considérés comme homosexuels. C''est sur ces travaux que s''appuient les lectures historiennes des identités de genre en terre d''islam. Texte servi par un instantané (JSTOR bloque les robots).',
  'https://web.archive.org/web/20201112000740id_/http://www.williamapercy.com/wiki/images/The_effeminates_of_early_medina.pdf',
  null,
  'f8bff0cefe607638cd9130fb5990eb1e8a9ed70dc39f0d28235fe1e633ba43ac',
  null,
  null,
  10
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '3b1a9376-6646-4b11-84d2-e558ab1f6617',
  '0be0aa6c-3c4e-4724-b4cc-36ab16252fa8',
  'GAUCHE'::political_spectrum,
  'This Alien Legacy: The Origins of « Sodomy » Laws in British Colonialism — rapport de recherche',
  'Human Rights Watch — rapport rédigé par Alok Gupta',
  '2008-12-17',
  'CITATION_EXACTE'::quote_kind,
  'Section 377 was, and is, a model law in more ways than one. It was a colonial attempt to set standards of behavior, both to reform the colonized and to protect the colonizers against moral lapses. It was also the first colonial « sodomy law » integrated into a penal code—and it became a model anti-sodomy law for countries far beyond India, Malaysia, and Uganda.',
  'Rapport de référence sur l''exportation du modèle britannique : la « section 377 » du code pénal indien de 1860 — copiée du Buggery Act anglais de 1533 — s''est répandue dans l''Empire britannique, en Asie, dans le Pacifique et en Afrique, et sert encore de matrice à de nombreuses lois anti-sodomie ; le rapport établit que plus de la moitié des États qui criminalisent les rapports entre personnes de même sexe sont d''anciens territoires britanniques. La répression pénale contemporaine doit donc à l''héritage colonial plus qu''aux seuls textes religieux. Classé à gauche : rapport d''une organisation internationale de défense des droits humains.',
  'https://www.hrw.org/report/2008/12/17/alien-legacy/origins-sodomy-laws-british-colonialism',
  null,
  '1e072f583a00c06fc90374d234dd8fba36f4dfc836e934d103baa0669cb06d92',
  null,
  null,
  11
);

delete from public.dossiers where slug = 'rechauffement-climatique-cycle-solaire-activite-humaine';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  'f8586520-d679-4a41-a9c0-09ed93cd94b5',
  'rechauffement-climatique-cycle-solaire-activite-humaine',
  'Le réchauffement climatique actuel n''est qu''un cycle naturel lié au Soleil',
  'FAUX'::verdict_status,
  'L''idée d''un réchauffement « cycle naturel du Soleil » se heurte à trois faits établis. D''abord, les radiomètres satellitaires mesurent l''irradiance solaire totale (TSI) sans interruption depuis 1978 : le cycle solaire de onze ans fait osciller l''énergie reçue d''environ 1 W/m² autour d''une moyenne qui n''a pas augmenté — elle a même légèrement baissé après le maximum des années 1980 — pendant que la température du globe a gagné environ 0,2 °C par décennie. La NASA conclut : « l''évidence montre que le réchauffement actuel ne peut pas être expliqué par le Soleil ».

Ensuite, la structure verticale du réchauffement signe le mécanisme : la troposphère se réchauffe pendant que la stratosphère se refroidit (1,8 à 2,2 °C de refroidissement dans la moyenne et haute stratosphère entre 1986 et 2022, douze à quinze fois ce que les variations naturelles peuvent produire) — signature exclusive du piégeage infrarouge par les gaz à effet de serre, car un Soleil plus actif réchaufferait toutes les couches de l''atmosphère.

Le GIEC (AR6, 2021) quantifie : sur 1850-1900 → 2010-2019, l''influence humaine explique +0,8 à +1,3 °C (meilleure estimation +1,07 °C), quand les facteurs naturels, solaire et volcanique, contribuent entre −0,1 et +0,1 °C ; l''Académie des sciences juge l''augmentation du CO2 « incontestablement due à l''activité humaine ».

Enfin, ce réchauffement était anticipé — y compris par les industriels eux-mêmes : les projections internes d''ExxonMobil (1977-2003), analysées dans Science en 2023, prévoyaient +0,20 ± 0,04 °C par décennie (63 à 83 % exactes) et des « effets environnementaux spectaculaires avant 2050 » dès les années 1970. Les réassureurs mondiaux chiffrent la facture : US$ 320 milliards de pertes liées aux catastrophes naturelles en 2024 selon Munich Re, dont 93 % d''origine météorologique.',
  'ENVIRONNEMENT'::dossier_category,
  '[{"name":"NASA","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/National_Aeronautics_and_Space_Administration","note":"Agence spatiale américaine ; ses mesures satellitaires de l''irradiance solaire totale (TSI) et ses synthèses climatiques documentent la divergence avec la courbe thermique."},{"name":"National Oceanic and Atmospheric Administration","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/National_Oceanic_and_Atmospheric_Administration","note":"Agence américaine d''observation océanique et atmosphérique ; tient le relevé mondial des températures (1850-2024) et les rapports climatiques annuels."},{"name":"Groupe d''experts intergouvernemental sur l''évolution du climat","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Groupe_d%27experts_intergouvernemental_sur_l%27%C3%A9volution_du_climat","note":"Organisme intergouvernemental ; son sixième rapport d''évaluation (AR6, 2021) quantifie la part humaine du réchauffement et l''apport négligeable des facteurs naturels."},{"name":"Académie des sciences","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Acad%C3%A9mie_des_sciences_(France)","note":"Académie scientifique française ; son rapport sur le changement climatique (2010) juge l''augmentation du CO2 « incontestablement due à l''activité humaine »."},{"name":"ExxonMobil","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/ExxonMobil","note":"Compagnie pétrolière ; ses propres scientifiques avaient modélisé dès 1977-1982 le réchauffement d''origine fossile, comme l''établit l''analyse publiée dans Science en 2023."},{"name":"Swiss Re","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Swiss_Re","note":"Réassureur mondial ; ses rapports sigma chiffrent chaque année la hausse des sinistres liés aux catastrophes naturelles et climatiques."}]'::jsonb,
  100,
  '[{"claim_part":"« L''activité solaire explique la hausse actuelle des températures »","status":"FAUX","detail":"Les mesures satellitaires de l''irradiance solaire totale (TSI), continues depuis 1978, montrent un cycle de onze ans d''une amplitude d''environ 1 W/m² sans aucune tendance à la hausse : la moyenne a même légèrement décliné après le maximum des années 1980. Pendant la même période, la température moyenne du globe a gagné environ 0,2 °C par décennie. Le GIEC (AR6, 2021) chiffre : sur 1850-1900 → 2010-2019, les facteurs naturels — solaire et volcanique — ont changé la température de −0,1 °C à +0,1 °C seulement, quand le total d''origine humaine est de +0,8 à +1,3 °C (meilleure estimation +1,07 °C). La NASA le formule sans détour : « l''évidence montre que le réchauffement actuel ne peut pas être expliqué par le Soleil » ; elle rappelle que les modèles qui n''incluent pas la hausse des gaz à effet de serre ne parviennent pas à reproduire la trajectoire observée."},{"claim_part":"« Le réchauffement est uniforme comme lors d''un pic solaire »","status":"FAUX","detail":"Un Soleil plus actif — dont le rayonnement ultraviolet est absorbé en altitude — réchaufferait toutes les couches de l''atmosphère. Or les observations montrent le contraire : entre 1986 et 2022, la moyenne et la haute stratosphère se sont refroidies de 1,8 à 2,2 °C, un refroidissement douze à quinze fois supérieur à ce que les variations naturelles peuvent produire (au plus 0,15 °C), pendant que la troposphère se réchauffait. Cette combinaison — troposphère chaude, stratosphère froide — est, selon Santer et al. (PNAS, 2023), « l''empreinte unique du forçage par les gaz à effet de serre » : « si le réchauffement de la troposphère était dû uniquement à l''activité solaire, on s''attendrait à un réchauffement — et non à un refroidissement — de la stratosphère supérieure ». C''est le piégeage infrarouge par les gaz à effet de serre, et non le Soleil, qui refroidit la haute atmosphère en réchauffant la basse."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-16T00:00:00.000Z'::timestamptz,
  '/illustrations/rechauffement-climatique-cycle-solaire-activite-humaine.jpg',
  'Photo : NASA — équipage d''Apollo 17 (« The Blue Marble », 1972), domaine public, Wikimedia Commons'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '3a9dbcac-0f5e-446e-848b-d6b0403f849f',
  'f8586520-d679-4a41-a9c0-09ed93cd94b5',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« The Causes of Climate Change » — NASA Science (agence spatiale américaine)',
  'NASA — Earth Science / Climate Change (relevés TSI satellitaires, séries GISTEMP de l''institut Goddard)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'While the Sun has played a role in past climate changes, the evidence shows the current warming cannot be explained by the Sun.',
  'La synthèse de référence de la NASA établit la divergence : « Scientists use a metric called Total Solar Irradiance (TSI) to measure the changes in energy the Earth receives from the Sun. TSI incorporates the 11-year solar cycle and solar flares/storms », or les études montrent que la variabilité solaire a joué un rôle dans les changements passés mais que la hausse actuelle ne vient pas d''elle. La NASA décrit aussi la signature verticale : les modèles solaires « would expect warmer temperatures in all layers of the atmosphere. Instead, they have observed a cooling in the upper atmosphere and a warming at the surface and lower parts of the atmosphere. That''s because greenhouse gases are slowing heat loss from the lower atmosphere ».',
  'https://science.nasa.gov/climate-change/causes/',
  null,
  '2759495ca1e77cc2013fbfa0c03f3f8aa9fff42c52efb451adcd1773d037fdab',
  null,
  'https://fr.wikipedia.org/wiki/National_Aeronautics_and_Space_Administration',
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'd6b07045-0312-462b-bdcb-1de22dcc788d',
  'f8586520-d679-4a41-a9c0-09ed93cd94b5',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« 2024 was the world''s warmest year on record » — NOAA (National Centers for Environmental Information)',
  'National Oceanic and Atmospheric Administration (NOAA) — rapport climatique annuel mondial, 10 janvier 2025',
  '2025-01-10',
  'CITATION_EXACTE'::quote_kind,
  'Earth''s average land and ocean surface temperature in 2024 was 2.32 degrees F (1.29 degrees C) above the 20th-century average — the highest global temperature among all years in NOAA''s 1850-2024 climate record.',
  'Le relevé de l''agence américaine pour 2024 : année la plus chaude depuis 1850, +1,29 °C au-dessus de la moyenne du XXe siècle, 0,10 °C de plus que 2023 qui était déjà record. La tendance de fond — environ +0,2 °C par décennie depuis 1970 — est incompatible avec le cycle solaire de onze ans, dont la contribution mesurée est plate depuis 1978, et confirme l''accumulation de chaleur par les gaz à effet de serre.',
  'https://www.noaa.gov/news/2024-was-worlds-warmest-year-on-record',
  null,
  'e56091bd76852347a93bd1a324eca2e6b0be78cec8770428283e2294f5efc8be',
  null,
  'https://fr.wikipedia.org/wiki/National_Oceanic_and_Atmospheric_Administration',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'f75f3345-3de6-4865-86e1-b0f9f82b0228',
  'f8586520-d679-4a41-a9c0-09ed93cd94b5',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'GIEC — sixième rapport d''évaluation (AR6), groupe de travail I, résumé pour décideurs',
  'Groupe d''experts intergouvernemental sur l''évolution du climat (GIEC/IPCC), contribution du groupe I « Les bases scientifiques physiques », 9 août 2021',
  '2021-08-09',
  'CITATION_EXACTE'::quote_kind,
  'It is likely that well-mixed GHGs contributed a warming of 1.0°C to 2.0°C, other human drivers (principally aerosols) contributed a cooling of 0.0°C to 0.8°C, natural drivers changed global surface temperature by –0.1°C to +0.1°C, and internal variability changed it by –0.2°C to +0.2°C.',
  'Le chiffrage de référence : sur 1850-1900 → 2010-2019, le réchauffement total attribué à l''humain est de +0,8 à +1,3 °C (meilleure estimation +1,07 °C), dont 1,0 à 2,0 °C dus aux gaz à effet de serre, partiellement compensés par les aérosols. Les facteurs naturels — Soleil et volcans — n''expliquent que −0,1 à +0,1 °C. Le SPM ouvre sur « It is unequivocal that human influence has warmed the atmosphere, ocean and land. » ; les simulations ne reproduisant pas la trajectoire observée sans l''influence humaine (figure SPM.1) sont au cœur de ce constat.',
  'https://www.ipcc.ch/report/ar6/wg1/chapter/summary-for-policymakers/',
  null,
  '19c50000028878be4cd3a252010af630e5aaec76ec986647f18bde4628588355',
  null,
  'https://fr.wikipedia.org/wiki/Groupe_d%27experts_intergouvernemental_sur_l%27%C3%A9volution_du_climat',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'e2908d9e-f907-4829-abe5-3b4ac93675b1',
  'f8586520-d679-4a41-a9c0-09ed93cd94b5',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Académie des sciences — rapport « Le changement climatique » (synthèse du débat de septembre 2010)',
  'Académie des sciences (France) — comité Sciences de l''environnement, rapport du 26 octobre 2010',
  '2010-10-26',
  'CITATION_EXACTE'::quote_kind,
  'L''augmentation de CO2 et, à un moindre degré, des autres gaz à effet de serre, est incontestablement due à l''activité humaine.',
  'L''académie scientifique française écrit noir sur blanc l''attribution anthropique : « Plusieurs indicateurs indépendants montrent une augmentation du réchauffement climatique de 1975 à 2003. Cette augmentation est principalement due à l''augmentation de la concentration du CO2 dans l''atmosphère. [...] Elle constitue une menace pour le climat et, de surcroît, pour les océans en raison du processus d''acidification qu''elle provoque. » Le rapport traite explicitement des mécanismes du forçage solaire — qu''il distingue des forçages actuels — et fait le point sur les incertitudes scientifiques sans en tirer une relativisation de l''attribution.',
  'https://www.academie-sciences.fr/pdf/rapport/rapport261010.pdf',
  null,
  '50b7de8677984ffc1ebd34d608208c9d0beba8380255e6772f909bd82f5848e1',
  null,
  'https://fr.wikipedia.org/wiki/Acad%C3%A9mie_des_sciences_(France)',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'e2066986-dc50-4d0c-aaf0-101b9bbcaa66',
  'f8586520-d679-4a41-a9c0-09ed93cd94b5',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Exceptional stratospheric contribution to human fingerprints on atmospheric temperature » — PNAS (Santer et al., 2023)',
  'Benjamin D. Santer, Stephen Po-Chedley, Lilong Zhao, Cheng-Zhi Zou, Qiang Fu, Susan Solomon, David W. J. Thompson, Carl Mears, Karl E. Taylor — Proceedings of the National Academy of Sciences (PNAS), vol. 120 n° 20',
  '2023-05-08',
  'CITATION_EXACTE'::quote_kind,
  'In summary, the warming of the troposphere and cooling of the stratosphere across all latitudes is a unique fingerprint of greenhouse gas forcing. If tropospheric warming were solely due to solar activity, warming rather than cooling of the upper stratosphere would be expected.',
  'L''étude de référence sur l''empreinte verticale : les mesures satellitaires de 1986 à 2022 montrent que la moyenne et la haute stratosphère se sont refroidies de 1,8 à 2,2 °C, alors que les variations naturelles ne peuvent produire que 0,15 °C au maximum — « douze à quinze fois moins », résume l''université UCLA, pour qui c''est « la preuve la plus claire d''une empreinte humaine sur le système climatique » selon le climatologue Benjamin Santer. L''étude établit aussi que ce refroidissement ne peut s''expliquer par la variabilité interne seule : il n''apparaît jamais dans les simulations longue durée. C''est la réfutation directe de la thèse solaire.',
  'https://www.pnas.org/doi/10.1073/pnas.2300758120',
  null,
  '420da212fa9ce320c4af000e5a32af527a2c40ec342a281981272bbf87b2b632',
  null,
  'https://fr.wikipedia.org/wiki/Acad%C3%A9mie_nationale_des_sciences_(%C3%89tats-Unis)',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '982dfa34-da75-4378-baaa-5784ce36f4fc',
  'f8586520-d679-4a41-a9c0-09ed93cd94b5',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  '« Assessing ExxonMobil''s global warming projections » — Science (Supran, Rahmstorf, Oreskes, 2023)',
  'G. Supran, S. Rahmstorf et N. Oreskes — revue Science, vol. 379, n° 6628 (analyse des mémos et modélisations internes d''Exxon/ExxonMobil, 1977-2003)',
  '2023-01-13',
  'CITATION_EXACTE'::quote_kind,
  'ExxonMobil''s average projected warming was 0.20° ± 0.04°C per decade, which is, within uncertainty, the same as that of independent academic and government projections published between 1970 and 2007.',
  'L''analyse systématique — et non la polémique — de seize projections documentées par les scientifiques d''Exxon : 63 à 83 % d''entre elles se sont révélées exactes, avec une précision comparable aux modèles académiques et étatiques ; dix sur seize collent aux observations. Les documents internes des années 1970-1980 décrivaient déjà les effets d''un doublement du CO2, et un mémo de la fin des années 1970 évoque des « effets environnementaux spectaculaires avant 2050 ». La conclusion des auteurs : ExxonMobil « prévoyait correctement le réchauffement » tout en semant publiquement le doute. La connaissance du lien fossiles-climat est donc contemporaine du début du réchauffement mesuré.',
  'https://www.science.org/doi/10.1126/science.abk0063',
  null,
  '6ccfb5b905bfcf5a78e2a3c3050de50f65d35de972264d67495734554c8b9047',
  null,
  'https://fr.wikipedia.org/wiki/Naomi_Oreskes',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'b80e23ff-b33d-47f0-8762-af29ac0a719e',
  'f8586520-d679-4a41-a9c0-09ed93cd94b5',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Swiss Re Institute — sigma 1/2024 : « Natural catastrophes in 2023 » (le coût assureur du climat)',
  'Swiss Re Institute — rapport sigma (réassurance mondiale), 26 mars 2024',
  '2024-03-26',
  'CITATION_EXACTE'::quote_kind,
  'Global annual insured losses from natural catastrophes of more than USD 100 billion have become the norm. Such was the case too in 2023, the hottest year on record.',
  'Le premier réassureur mondial — acteur du marché, non militant — constate la nouvelle norme : plus de 100 milliards de dollars de sinistres assurés par an, cinq années consécutives au-dessus du seuil. En 2023, année la plus chaude jamais mesurée, les catastrophes naturelles ont causé 280 milliards de dollars de pertes économiques (38 % assurées), avec un record de 142 événements générateurs de sinistres, porté par des périls climatiques (orages convectifs sévères notamment). Le signal actuariel converge avec la physique : la tendance des sinistres suit la trajectoire thermique, pas les cycles solaires.',
  'https://www.swissre.com/institute/research/sigma-research/sigma-2024-01/in-short.html',
  null,
  '6fd38e1a921e2b1f32ca5210f83db8e4070f0b9f85f860d3d58819c3b6aef5c3',
  null,
  'https://fr.wikipedia.org/wiki/Swiss_Re',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'e3a9037f-9de5-422b-acf8-ec019945cab0',
  'f8586520-d679-4a41-a9c0-09ed93cd94b5',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Munich Re — « Natural disasters 2024 : Climate change is showing its claws »',
  'Munich Re — communiqué sur les catastrophes naturelles 2024 (Munich Reinsurance Company), 9 janvier 2025',
  '2025-01-09',
  'CITATION_EXACTE'::quote_kind,
  'Worldwide, natural disasters caused losses of US$ 320bn in 2024 (2023, adjusted for inflation: US$ 268bn), of which around US$ 140bn were insured.',
  'Le second grand réassureur mondial chiffre l''année : 320 milliards de dollars de pertes totales en 2024 — bien au-dessus des moyennes décennales (236) et trentenaires (181) — dont 140 milliards assurés. « Les catastrophes météorologiques ont été responsables de 93 % des pertes totales et 97 % des pertes assurées. » Munich Re conjugue le constat : « Climate change is showing its claws: the world is getting hotter, resulting in severe hurricanes, thunderstorms and floods » et note que « 2024 remplacera 2023 comme année la plus chaude », à environ 1,5 °C au-dessus de l''ère préindustrielle. Des acteurs à la clientèle conservatrice classent donc la tendance comme structurelle, pas cyclique.',
  'https://www.munichre.com/en/company/media-relations/media-information-and-corporate-news/media-information/2025/natural-disaster-figures-2024.html',
  null,
  'c631a99d3ff355a451a324af9a5d8eaa3b57da2079f95956b248b45f2a4ad0da',
  null,
  'https://fr.wikipedia.org/wiki/Munich_Re',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '5cef3a88-d94e-4099-90c3-61be6bf416d3',
  'f8586520-d679-4a41-a9c0-09ed93cd94b5',
  'GAUCHE'::political_spectrum,
  '« Réchauffement climatique : les températures de 2024 vont encore battre les records, passant la barre des + 1,5 °C » — L''Humanité',
  'Théo Bourrieau, L''Humanité (rubrique Environnement), 7 novembre 2024',
  '2024-11-07',
  'CITATION_EXACTE'::quote_kind,
  'L''année 2024 sera l''année la plus chaude jamais enregistrée, battant, encore une fois, tous les records. Selon les données du service européen Copernicus, la barre des + 1,5 °C va être dépassée pour la première fois, accentuant encore plus les phénomènes climatiques extrêmes.',
  'La presse de gauche relaie les mesures : « l''observatoire européen [...] prévoit que 2024 sera quasi certainement l''année la plus chaude jamais enregistrée, mais aussi la première avec une hausse de la température moyenne du globe d''1,5°C au-dessus de la période préindustrielle ». L''article inscrit le record dans le contexte politique de la COP 29 et de l''élection américaine. Aucune trace, dans ce cadrage, d''une explication solaire : la communauté qui documente le climat attribue la série de records à l''accumulation de gaz à effet de serre.',
  'https://www.humanite.fr/environnement/accord-de-paris/rechauffement-climatique-les-temperatures-de-2024-vont-encore-battre-les-records-passant-la-barre-des-15-c',
  null,
  'add8c98df10d0285202d0c2f7ea3412fbf7c55cd821b48d7ceb01500e5a69879',
  null,
  null,
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'a86996f9-6b6b-4bcc-bfa0-7ac130b82dca',
  'f8586520-d679-4a41-a9c0-09ed93cd94b5',
  'CENTRE'::political_spectrum,
  '« Ce que le Soleil nous cache encore » — CNRS Le journal (avril 2014)',
  'CNRS (Centre national de la recherche scientifique)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Elle s''élève à 1 362 watts par m² et varie de 0,1 % au cours du cycle solaire qui dure onze ans. C''est trop peu pour expliquer de grands bouleversements climatiques',
  'Article de vulgarisation du CNRS sur la mission Picard : l''énergie solaire reçue varie de 0,1 % sur le cycle de onze ans, « trop peu pour expliquer de grands bouleversements climatiques » ; le responsable scientifique de la mission conclut : « Il est clair que la hausse récente des températures est due au rejet de gaz à effet de serre, pas au Soleil. » Les instruments du satellite montrent que les paramètres solaires ne sont pas liés à l''intensité de l''activité solaire.',
  'https://lejournal.cnrs.fr/articles/ce-que-le-soleil-nous-cache-encore',
  null,
  'db85360ba473a067d37e90364fdce8b3d75a77ad157b16f6bdc6e9a65f1682fd',
  null,
  'https://fr.wikipedia.org/wiki/Centre_national_de_la_recherche_scientifique',
  9
);

delete from public.dossiers where slug = 'voiture-electrique-vs-thermique-bilan-carbone-acv';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '7db67bc7-943f-460c-961e-f03736020958',
  'voiture-electrique-vs-thermique-bilan-carbone-acv',
  'Une voiture électrique pollue autant ou plus qu''une thermique à cause de sa batterie',
  'FAUX'::verdict_status,
  'La « dette carbone » de la batterie existe, mais elle ne renverse jamais le bilan : selon l''avis de l''ADEME publié le 7 octobre 2026, sur son cycle de vie complet, une voiture électrique rechargée en France a un bilan carbone « au moins divisé par deux » par rapport à son équivalente thermique ou hybride.

La fabrication d''une électrique émet environ deux fois plus que celle d''une thermique — la batterie en représente environ la moitié — mais cet écart est amorti après environ 70 000 km pour une compacte (60 kWh) comparée à une hybride essence non rechargeable ; ensuite, chaque kilomètre consolide l''avantage.

Le carburant d''une thermique, lui, est intégralement brûlé et ses émissions ne se compensent jamais, quand les métaux des batteries sont collectés et recyclés sous obligation légale (règlement (UE) 2023/1542 : dès 2027, 50 % du lithium et 90 % du cobalt et du nickel valorisés).

Le constat traverse les institutions : GIEC (haute confiance pour une recharge décarbonée), ICCT (66 à 69 % d''émissions en moins en Europe sur le cycle de vie), Agence internationale de l''énergie (environ la moitié des émissions au niveau mondial).',
  'ENVIRONNEMENT'::dossier_category,
  '[{"name":"ADEME","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Agence_de_l%27environnement_et_de_la_ma%C3%AEtrise_de_l%27%C3%A9nergie","note":"Agence de la transition écologique ; son avis du 7 octobre 2026 et son rapport sur l''empreinte carbone des batteries documentent le cycle de vie complet des véhicules."},{"name":"Groupe d''experts intergouvernemental sur l''évolution du climat","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Groupe_d%27experts_intergouvernemental_sur_l%27%C3%A9volution_du_climat","note":"Organisme intergouvernemental ; son sixième rapport d''évaluation (AR6, groupe III) établit en haute confiance l''avantage des véhicules électriques sur le cycle de vie, à recharge bas-carbone."},{"name":"Conseil international pour des transports propres (ICCT)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://en.wikipedia.org/wiki/International_Council_on_Clean_Transportation","note":"Organisation de recherche indépendante ; son étude mondiale de 2021 chiffre l''écart d''émissions sur le cycle de vie entre électriques et thermiques sur les quatre grands marchés."},{"name":"Agence internationale de l''énergie","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Agence_internationale_de_l%27%C3%A9nergie","note":"Agence intergouvernementale ; son rapport annuel Global EV Outlook chiffre les émissions cycle de vie des voitures électriques au niveau mondial."},{"name":"Le Figaro","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Le_Figaro","note":"Quotidien national français ; il relaie sans réserve, dès 2022, le résultat de l''ADEME sur le bilan carbone de l''électrique."}]'::jsonb,
  98,
  '[{"claim_part":"« La fabrication de la batterie annule le gain écologique »","status":"FAUX","detail":"L''empreinte de fabrication est réelle et documentée — environ le double d''une thermique équivalente, la batterie en représentant environ la moitié, avec de l''ordre de 140 kg CO2eq/kWh pour une production en Asie — mais elle est amortie : la « dette carbone » est remboursée après environ 70 000 km pour une compacte (exemple de l''avis ADEME : type 308/Mégane, batterie 60 kWh, comparée à une hybride essence non rechargeable), et « le reste de sa durée de vie consolide l''avantage de l''électrique ». À l''échelle des marchés, l''ICCT mesure 66 à 69 % d''émissions en moins en Europe sur le cycle de vie complet ; le GIEC en fait une conclusion de haute confiance dès lors que la recharge est bas-carbone, ce qui est le cas en France. La prémisse ne vaudrait que pour un véhicule qui ne roule pratiquement jamais, ou une batterie démesurée dans un réseau très carboné — des cas particuliers, pas la règle."},{"claim_part":"« Les batteries finissent à la décharge en fin de vie »","status":"FAUX","detail":"Le droit européen organise précisément l''inverse : le règlement (UE) 2023/1542 fixe des objectifs contraignants de contenu recyclé pour le cobalt, le plomb, le lithium et le nickel, et des objectifs de valorisation des matières (annexe XII : dès 2027, 50 % du lithium et 90 % du cobalt et du nickel ; 80 % et 95 % en 2031), avec les obligations de collecte associées. Le rapport ADEME de juin 2026 modélise la filière : les procédés de recyclage existent, la France et l''Europe disposent de capacités industrielles, et l''ADEME rappelle que les matières premières des batteries « ne sont pas perdues à l''usage, contrairement aux carburants fossiles lors de leur combustion ». Une batterie usagée est une mine urbaine ; un plein d''essence, un volume de CO2 définitivement dans l''atmosphère."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-16T00:00:00.000Z'::timestamptz,
  '/illustrations/voiture-electrique-vs-thermique-bilan-carbone-acv.jpg',
  'Photo : Raphael Desrosiers (dérivé : Mariordo), Wikimedia Commons, CC BY 2.0'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '181de36a-fa8c-4ee0-b3eb-8706e68b4741',
  '7db67bc7-943f-460c-961e-f03736020958',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« Avis : Le véhicule électrique et sa recharge » — ADEME (avis du 7 octobre 2026, 18 pages)',
  'ADEME — Agence de la transition écologique, avis publié le 7 octobre 2026',
  '2026-10-07',
  'CITATION_EXACTE'::quote_kind,
  'La « dette carbone » à 0 km du modèle électrique, due à sa fabrication, est amortie après environ 70 000 km.',
  'Le cœur de l''avis : la fabrication d''une voiture électrique pèse environ le double de celle d''une thermique — la batterie en représentant environ la moitié — mais la « dette carbone » du modèle électrique est amortie après environ 70 000 km dans l''exemple représentatif (une compacte type 308/Mégane, batterie 60 kWh, comparée à une hybride essence non rechargeable) ; ensuite « le reste de sa durée de vie consolide l''avantage de l''électrique ». Le « à retenir » de l''avis conclut : « Sur son cycle de vie complet, le bilan carbone d''une voiture électrique se rechargeant en France est au moins divisé par deux par rapport à son alternative thermique ou hybride », et rappelle que les matières premières des batteries « ne sont pas perdues à l''usage, contrairement aux carburants fossiles lors de leur combustion ».',
  'https://librairie.ademe.fr/mobilite-et-transports/9581-avis-de-l-ademe-sur-la-voiture-electrique-et-sa-recharge.html',
  null,
  'dc68a85987b1045cb60e68f49da57f74af82aa7a38d014f92fe30634f73d34c0',
  null,
  'https://fr.wikipedia.org/wiki/Agence_de_l%27environnement_et_de_la_ma%C3%AEtrise_de_l%27%C3%A9nergie',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '7ba15842-07d2-4301-bdba-ae82892ae025',
  '7db67bc7-943f-460c-961e-f03736020958',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« Empreinte carbone des batteries de véhicules électriques » — ADEME (rapport final, juin 2026)',
  'Caroline Mir et Hamza El Jebbari, ADEME — rapport final, juin 2026 (62 pages), dans le cadre de l''article 7 du règlement (UE) 2023/1542',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Les résultats montrent que les principaux contributeurs à l''empreinte carbone sont la production des matériaux actifs (plus de 50 % de l''impact total), la fabrication des cellules — incluant la consommation d''énergie et les rebuts de production — ainsi que l''aluminium utilisé dans les cellules, modules et packs.',
  'L''étude réalisée pour l''application du règlement européen (article 7 : déclaration d''empreinte carbone des batteries) modélise, sur plus de trente-cinq paramètres, ce qui pèse réellement : les matériaux actifs (lithium, cobalt, nickel…) comptent pour plus de la moitié de l''empreinte totale. Elle documente aussi les leviers : la relocalisation des cellules en France ne réduit l''empreinte que d''environ 15 % tant que les matières actives restent importées, mais une production française des matières actives apporte environ 35 % de baisse — et les procédés de recyclage existent, ce qui alimente la boucle des métaux.',
  'https://librairie.ademe.fr/mobilite-et-transports/9583-empreinte-carbone-des-batteries-de-vehicules-electriques.html',
  null,
  '69946af9b8708f3b94526126c4e09d46d9aa45537b9ade5ddab61386d0c2c095',
  null,
  'https://fr.wikipedia.org/wiki/Agence_de_l%27environnement_et_de_la_ma%C3%AEtrise_de_l%27%C3%A9nergie',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'f87d65cf-02ba-4908-a003-cb30a17933b2',
  '7db67bc7-943f-460c-961e-f03736020958',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Sixième rapport d''évaluation (AR6) — groupe III « Mitigation of Climate Change », chapitre 10 « Transport » : les véhicules électriques sur le cycle de vie',
  'GIEC — Groupe d''experts intergouvernemental sur l''évolution du climat, contribution du groupe III publiée le 4 avril 2022',
  '2022-04-04',
  'CITATION_EXACTE'::quote_kind,
  'Battery electric vehicles (BEVs) have lower lifecycle greenhouse gas emissions than internal combustion engine vehicles (ICEVs) when BEVs are charged with low-carbon electricity (high confidence).',
  'Le constat du groupe III du GIEC, en haute confiance : à recharge décarbonée, l''électrique bat la thermique sur l''ensemble du cycle de vie, fabrication comprise. La France, avec son mix électrique, remplit la condition ; le rapport projette que la décarbonation des transports passe par l''électrification. C''est le niveau de preuve le plus élevé de la littérature mondiale : la thèse « pollue autant » contredit la synthèse intergouvernementale elle-même.',
  'https://www.ipcc.ch/report/ar6/wg3/downloads/report/IPCC_AR6_WGIII_Chapter10.pdf',
  null,
  '83b7a958c7d2aadf4c8ee6ced98a2ad1b561934421c331f38ea7cf58de232c8c',
  null,
  'https://fr.wikipedia.org/wiki/Groupe_d%27experts_intergouvernemental_sur_l%27%C3%A9volution_du_climat',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '0e62c471-ba11-40d2-b17f-c9861e3181eb',
  '7db67bc7-943f-460c-961e-f03736020958',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« A global comparison of the life-cycle greenhouse gas emissions of combustion engine and electric passenger cars » — ICCT (juillet 2021)',
  'Conseil international pour des transports propres (ICCT), étude publiée en juillet 2021',
  '2021-07-20',
  'CITATION_EXACTE'::quote_kind,
  'As shown for average new medium-size cars in Figure ES.1, the assessment finds that the life-cycle emissions over the lifetime of BEVs registered today in Europe, the United States, China, and India are already lower than a comparable gasoline car by 66%–69% in Europe, 60%–68% in the United States, 37%–45% in China, and 19%–34% in India.',
  'L''étude de référence compare, sur le cycle de vie complet, l''électrique et la thermique essence sur les quatre grands marchés : partout, l''électrique l''emporte déjà — y compris en Chine (−37 à −45 %) et en Inde (−19 à −34 %), où les réseaux restent très carbonés. En Europe, l''écart atteint 66 à 69 %, et il s''élargira mécaniquement avec la décarbonation (74 à 77 % pour des voitures immatriculées en 2030, selon la même étude). Le « autant ou plus » ne tient sur aucun des marchés étudiés.',
  'https://theicct.org/sites/default/files/publications/Global-LCA-passenger-cars-jul2021_0.pdf',
  null,
  '6d16459274f6d1d631e8a9459039d873af4043ad69329670a5aaf2546b7867d4',
  null,
  'https://en.wikipedia.org/wiki/International_Council_on_Clean_Transportation',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'b94e5c48-33d2-499b-84ad-d0671fdb40d9',
  '7db67bc7-943f-460c-961e-f03736020958',
  'CENTRE'::political_spectrum,
  '« Global EV Outlook 2024 », section « Outlook for emissions reductions » — Agence internationale de l''énergie',
  'Agence internationale de l''énergie (AIE), rapport annuel Global EV Outlook, publié le 23 avril 2024',
  '2024-04-23',
  'CITATION_EXACTE'::quote_kind,
  'Globally, in the STEPS, the lifecycle emissions of a medium-size battery electric car are about half of those of an equivalent ICEV that is running on oil-based fuels, more than 40% lower than for an equivalent HEV, and about 30% lower than for a PHEV over 15 years of operation, or around 200 000 km.',
  'Le chiffrage mondial de l''agence intergouvernementale : environ la moitié des émissions d''une thermique sur environ 200 000 km — en moyenne mondiale, donc réseaux compris. La comparaison est aussi défavorable aux hybrides, rechargeables ou non, souvent présentés comme le compromis raisonnable. L''avantage se renforce à mesure que les réseaux se décarbonent.',
  'https://www.iea.org/reports/global-ev-outlook-2024/outlook-for-emissions-reductions',
  null,
  'be6a0a7aa58a171742e7f7e24a648c7fd0f91a2eccc138a646e95301a3492f1b',
  null,
  'https://fr.wikipedia.org/wiki/Agence_internationale_de_l%27%C3%A9nergie',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '7e4e1f65-e181-4d2e-b9e3-c4f1664e144a',
  '7db67bc7-943f-460c-961e-f03736020958',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Règlement (UE) 2023/1542 relatif aux batteries et aux déchets de batteries — objectifs contraignants de valorisation des matériaux critiques',
  'Parlement européen et Conseil de l''Union européenne, règlement du 12 juillet 2023 (JO L 191 du 28 juillet 2023)',
  '2023-07-12',
  'CITATION_EXACTE'::quote_kind,
  'Dans le cas des batteries, cela revêt une importance particulière pour le cobalt, le plomb, le lithium et le nickel. Il est donc nécessaire de promouvoir la valorisation de ces matières présentes dans les déchets, en établissant une exigence concernant le taux de contenu recyclé dans les batteries utilisant du cobalt, du plomb, du lithium et du nickel dans les matières actives. Le présent règlement devrait donc fixer des objectifs contraignants en ce qui concerne le contenu recyclé pour le cobalt, le plomb, le lithium et le nickel, qui devraient être atteints d''ici à 2031.',
  'L''obligation de droit communautaire : contenu recyclé contraignant à horizon 2031 et, à l''annexe XII, objectifs de valorisation des matières — dès 2027, 50 % du lithium et 90 % du cobalt et du nickel ; 80 % et 95 % en 2031 — avec les obligations de collecte qui les accompagnent. Là où le pétrole brûlé disparaît une fois pour toutes, le cadre légal organise la récupération des métaux stratégiques : le scénario « les batteries finissent à la décharge » est précisément ce que ce texte vise à éliminer.',
  'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32023R1542',
  null,
  '74b3185f168ed63f778b4295123fb7d8bff50e3098a2fd1676ab17d35cc823d8',
  null,
  null,
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'f40e2d8e-cc39-41cd-9403-9627c6c1c9f2',
  '7db67bc7-943f-460c-961e-f03736020958',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  '« La voiture électrique est écologique si elle reste légère, souligne l''Ademe » — Le Figaro (flash éco)',
  'Le Figaro, 12 octobre 2022',
  '2022-10-12',
  'CITATION_EXACTE'::quote_kind,
  'Sur l''ensemble de sa durée de vie, une voiture électrique roulant en France a un impact carbone 2 à 3 fois inférieur à celui d''un modèle similaire thermique, à condition que sa batterie fasse moins de 60 kWh, soit l''équivalent d''une Peugeot e208 ou une Renault Mégane au maximum, avec des autonomies de 400 kilomètres environ.',
  'Le résultat de l''ADEME relayé tel quel par un quotidien de droite, peu suspect de militantisme électrique : « 2 à 3 fois inférieur » dès l''édition 2022 de l''avis — l''édition 2026 resserre encore la formulation (« au moins divisé par deux »). La prémisse « pollue autant » n''a de relais, dans la presse, que du côté du doute intéressé : les constructeurs qui veulent réhabiliter le thermique.',
  'https://www.lefigaro.fr/flash-eco/la-voiture-electrique-est-ecologique-si-elle-reste-legere-souligne-l-ademe-20221012',
  null,
  'e68a9f7f7042525d5c8d840208a10aa813fa02561314537fc12d1687cc968ba8',
  null,
  'https://fr.wikipedia.org/wiki/Le_Figaro',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '5799a9f6-2205-4b43-bf52-7483629c101e',
  '7db67bc7-943f-460c-961e-f03736020958',
  'GAUCHE'::political_spectrum,
  '« Répondre aux idées reçues sur le climat » — Réseau Action Climat',
  'Réseau Action Climat (fédération d''associations environnementales)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'En France, de la construction à la fin d''utilisation, les émissions de gaz à effet de serre de la voiture électrique sont 2 à 5 fois plus faibles que celles de la voiture thermique',
  'Fédération d''associations climatiques (France Nature Environnement, WWF, Fondation Nicolas Hulot, CLER…) : sur le cycle de vie complet et pour un usage en France, les émissions de la voiture électrique sont 2 à 5 fois plus faibles que celles de la thermique ; la production de la batterie émet bien du CO2 — « ce n''est donc pas un véhicule propre » — mais le bilan global reste meilleur, et la réduction de la taille des batteries l''améliore encore.',
  'https://reseauactionclimat.org/repondre-aux-idees-recues-sur-les-solutions/',
  null,
  '325f530916fa43f9d86c8639d98d7b0af3d78c54a06f0661c21de5cfab1519f2',
  null,
  'https://fr.wikipedia.org/wiki/R%C3%A9seau_Action_Climat',
  8
);

delete from public.dossiers where slug = 'otan-russie-traite-1990-non-elargissement-est';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '21397f5d-d6a1-440b-9b93-abe534b239d6',
  'otan-russie-traite-1990-non-elargissement-est',
  'L''OTAN a violé un traité signé en 1990 promettant à la Russie de ne jamais s''élargir à l''Est',
  'FAUX'::verdict_status,
  'Le « traité de 1990 » invoqué n''existe pas : les négociations dites « 2+4 » réglaient la réunification allemande, alors que le pacte de Varsovie existait encore, et le traité signé à Moscou le 12 septembre 1990 ne dit rien de l''Europe de l''Est — son article 5 limite le stationnement des forces étrangères à « cette partie de l''Allemagne » qu''est l''ex-RDA, et son article 6 réaffirme le droit de l''Allemagne unie d''appartenir à des alliances.

Des assurances orales ont circulé en 1990, dont la formule de James Baker « pas un pouce vers l''Est » ; le National Security Archive, qui a publié les archives déclassifiées, établit qu''elles sont consignées « non dans des traités, mais dans des mémorandums de conversation » : rien n''a jamais été signé.

Mikhaïl Gorbatchev l''a confirmé en 2014 : « le sujet de l''expansion de l''OTAN n''a pas du tout été discuté », et pour l''historienne M. E. Sarotte (Johns Hopkins), Vladimir Poutine se réfère à cette conversation « comme si c''était un engagement écrit dans un traité, alors que ça n''en était pas un ».

La Russie a elle-même signé le Mémorandum de Budapest (1994), qui engage Moscou à « respecter l''indépendance et la souveraineté ainsi que les frontières existantes » de l''Ukraine : aucun texte ne lui donne un veto sur l''OTAN.',
  'INTERNATIONAL'::dossier_category,
  '[{"name":"Mikhaïl Gorbatchev","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Mikha%C3%AFl_Gorbatchev","note":"Dernier dirigeant de l''URSS, signataire côté soviétique ; son entretien de 2014 avec Russia Beyond affirme que le sujet de l''expansion de l''OTAN n''a pas été discuté en 1990."},{"name":"Organisation du traité de l''Atlantique nord","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Organisation_du_trait%C3%A9_de_l%27Atlantique_nord","note":"Alliance atlantique, accusée d''avoir « violé » un engagement de non-élargissement qu''aucun texte ne formalise."},{"name":"Traité sur le règlement définitif concernant l''Allemagne","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Trait%C3%A9_sur_le_r%C3%A8glement_d%C3%A9finitif_concernant_l%27Allemagne","note":"Le traité « 2+4 » signé à Moscou le 12 septembre 1990 : son article 5 limite le stationnement des forces étrangères à l''ex-RDA et son article 6 réaffirme le droit d''alliance."},{"name":"National Security Archive","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://en.wikipedia.org/wiki/National_Security_Archive","note":"Centre de recherche de l''université George Washington ; sa publication de 2017 a déclassifié et analysé les mémorandums des conversations Baker-Gorbatchev de 1990."},{"name":"Mary Elise Sarotte","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Mary_Elise_Sarotte","note":"Historienne, professeure à la Johns Hopkins School of Advanced International Studies, autrice de « Not One Inch : America, Russia, and the Making of Post-Cold War Stalemate » (Yale, 2021)."}]'::jsonb,
  100,
  '[{"claim_part":"« Les Occidentaux ont signé en 1990 un engagement écrit de non-extension »","status":"FAUX","detail":"Le traité sur le règlement définitif concernant l''Allemagne (« 2+4 », signé à Moscou le 12 septembre 1990 et ratifié par l''URSS) ne contient aucune clause sur l''élargissement de l''OTAN : son article 5 limite le stationnement de forces étrangères à « cette partie de l''Allemagne » qu''étaient la RDA et Berlin, et son article 6 affirme au contraire que « le droit de l''Allemagne unie d''appartenir à des alliances, avec tous les droits et obligations qui en découlent, n''est pas affecté par le présent Traité ». Les assurances du début 1990 — la formule que Baker répète le 9 février 1990, « pas un pouce vers l''Est » — sont documentées par le National Security Archive non dans un traité mais dans des comptes rendus de conversations entre dirigeants ; Baker les présentait comme une hypothèse de négociation, et l''historienne M. E. Sarotte montre que Washington les a écartées dès le retour de Baker auprès de George H. W. Bush. Aucun texte signé puis ratifié n''a jamais formalisé de non-élargissement."},{"claim_part":"« L''Ukraine avait interdiction juridique de se rapprocher de l''OTAN »","status":"FAUX","detail":"Aucun accord signé par la Russie n''interdit à un État de choisir ses alliances. Le Mémorandum de Budapest (5 décembre 1994), signé par la Fédération de Russie, le Royaume-Uni et les États-Unis, réaffirme « leur engagement envers l''Ukraine [...] de respecter son indépendance et sa souveraineté ainsi que ses frontières existantes » : c''est la Russie qui s''y engage sur les frontières ukrainiennes, pas l''inverse. En 1990, la question d''un élargissement aux pays de l''Est ne se posait même pas — l''URSS et le pacte de Varsovie (dissous en juillet 1991) existaient encore ; la candidature d''un État relève de l''article 10 du traité de Washington et d''une décision souveraine, et les négociations de 1997 (Acte fondateur OTAN-Russie) n''ont donné à Moscou aucun veto sur les adhésions."}]'::jsonb,
  '[{"date":"1990-02-09","title":"« Pas un pouce vers l''Est » — l''assurance orale de Baker","description":"À Moscou, James Baker répète trois fois la formule « not one inch eastward » : une assurance politique sur le statut de l''Allemagne réunifiée, présentée comme une hypothèse de négociation — consignée dans des comptes rendus de conversation, pas dans un texte signé.","evidence_ref":"Pièce #04"},{"date":"1990-09-12","title":"Signature du traité « 2+4 » à Moscou","description":"Le traité sur le règlement définitif concernant l''Allemagne est signé à Moscou : l''article 5 limite le stationnement des forces étrangères à l''ex-RDA, l''article 6 réaffirme le droit d''alliance de l''Allemagne unie. Aucune clause sur l''élargissement de l''OTAN ; le texte sera ratifié par l''URSS.","evidence_ref":"Pièce #01"},{"date":"1991-07","title":"Dissolution du pacte de Varsovie","description":"L''alliance militaire de l''Est se dissout : l''élargissement de l''OTAN, censé avoir été promis en 1990, ne pouvait donc pas figurer dans un accord de réunification négocié tandis que le pacte existait encore.","evidence_ref":"Pièce #06"},{"date":"1994-12-05","title":"Mémorandum de Budapest","description":"La Russie signe avec le Royaume-Uni et les États-Unis un mémorandum qui l''engage à « respecter l''indépendance et la souveraineté ainsi que les frontières existantes » de l''Ukraine, en échange de la renonciation ukrainienne à l''arme nucléaire. Aucune restriction au droit de l''Ukraine de choisir ses alliances.","evidence_ref":"Pièce #02"},{"date":"2014-10-16","title":"Gorbatchev : « le sujet de l''expansion de l''OTAN n''a pas du tout été discuté »","description":"Le signataire soviétique du traité, interrogé par Russia Beyond, affirme en pleine responsabilité que l''expansion de l''OTAN n''a pas été discutée en 1990 — coupant court à l''idée d''un engagement de non-élargissement discuté puis trahi.","evidence_ref":"Pièce #03"},{"date":"2017-12-12","title":"National Security Archive : « non dans des traités, mais dans des mémorandums »","description":"La publication des documents déclassifiés (« NATO Expansion: What Gorbachev Heard ») établit où vivent les assurances de 1990 : des comptes rendus de conversations entre dirigeants, tout au long de 1990 et 1991 — jamais un texte signé de non-élargissement.","evidence_ref":"Pièce #04"},{"date":"2022-03","title":"Trois vérifications, une même conclusion","description":"CheckNews (2 mars), Le Figaro (7 mars) et l''historienne M. E. Sarotte sur NPR (17 mars) confrontent l''argument au dossier documentaire : « il n''y a pas eu de traité formel », « une telle promesse n''a jamais été faite » — l''OTAN elle-même le dément.","evidence_ref":"Pièces #05-07"}]'::jsonb,
  true,
  '2026-10-16T00:00:00.000Z'::timestamptz,
  '/illustrations/otan-russie-traite-1990-non-elargissement-est.jpg',
  'Signatures des Alliés sur le traité « 2+4 » (Roland Dumas, Edouard Chevardnadze, Douglas Hurd, James Baker) — document officiel publié par le ministère allemand des Affaires étrangères, domaine public, Wikimedia Commons'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'ae9c5951-e704-40f9-86c6-4111fa5c8bf2',
  '21397f5d-d6a1-440b-9b93-abe534b239d6',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  '« Traité sur le règlement définitif concernant l''Allemagne » (traité « 2+4 », signé à Moscou le 12 septembre 1990) — article 5 et article 6',
  'République fédérale d''Allemagne, République démocratique allemande, États-Unis, France, Royaume-Uni et URSS — texte publié par le CVCE (Centre virtuel de la connaissance sur l''Europe)',
  '1990-09-12',
  'CITATION_EXACTE'::quote_kind,
  'Des forces armées et des armes nucléaires ou des vecteurs d''armes nucléaires étrangers ne seront pas stationnés dans cette partie de l''Allemagne et n''y seront pas déployés.',
  'L''article 5 du traité signé à Moscou : « cette partie de l''Allemagne » désigne le territoire de la RDA et de Berlin — la seule zone où les forces étrangères ne stationneront pas après le retrait soviétique — et le paragraphe 3 y autorise le stationnement d''unités allemandes « bien que sans vecteurs d''armes nucléaires ». Aucune clause ne concerne l''Europe de l''Est ni un futur élargissement ; l''article 6 ajoute même que « le droit de l''Allemagne unie d''appartenir à des alliances, avec tous les droits et obligations qui en découlent, n''est pas affecté par le présent Traité ». C''est ce texte, ratifié par l''URSS, que le récit de la « promesse violée » présente comme un engagement de non-élargissement : il ne contient rien de tel.',
  'https://www.cvce.eu/content/publication/1999/1/1/5db0b251-c5bf-4f5a-b5d0-2047f829c19a/publishable_fr.pdf',
  null,
  'cedf6811421e70e98876715031b70c0980e1cda6b6967eb1a2ec362d30743ccf',
  null,
  'https://fr.wikipedia.org/wiki/Trait%C3%A9_sur_le_r%C3%A8glement_d%C3%A9finitif_concernant_l%27Allemagne',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '3281ad49-e3d4-4de0-9983-f010195a3640',
  '21397f5d-d6a1-440b-9b93-abe534b239d6',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  '« Mémorandum de Budapest » (5 décembre 1994) — garanties de sécurité liées à l''adhésion de l''Ukraine au Traité sur la non-prolifération (ONU, Recueil des traités, vol. 3007, n° 52241)',
  'Ukraine, Fédération de Russie, Royaume-Uni et États-Unis — enregistré au Secrétariat de l''Organisation des Nations Unies',
  '1994-12-05',
  'CITATION_EXACTE'::quote_kind,
  'La Fédération de Russie, le Royaume-Uni de Grande-Bretagne et d''Irlande du Nord et les États-Unis d''Amérique réaffirment leur engagement envers l''Ukraine, conformément aux principes énoncés dans l''Acte final de la Conférence sur la sécurité et la coopération en Europe, de respecter son indépendance et sa souveraineté ainsi que ses frontières existantes.',
  'Le paragraphe 1 du Mémorandum, dans la traduction française publiée par l''ONU : en échange de la renonciation ukrainienne à l''arme nucléaire, Moscou — signataire — s''engage sur les frontières de l''Ukraine. Le texte ne comporte aucune restriction au droit de l''Ukraine de choisir ses alliances : l''« interdiction juridique » de se rapprocher de l''OTAN ne figure dans aucun accord signé par la Russie. L''enregistrement auprès de l''ONU date de 2014, à la demande de l''Ukraine ; trente ans après, ces engagements sont au cœur des débats sur la sécurité européenne.',
  'https://treaties.un.org/doc/Publication/UNTS/Volume%203007/Part/volume-3007-I-52241.pdf',
  null,
  '8142b31d4503ec22900181a9f292c54a7caefe73fceaba23f36dacf85d6078e1',
  null,
  'https://fr.wikipedia.org/wiki/M%C3%A9morandums_de_Budapest',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'c317deae-6d4d-4fc7-92e6-35b0b9c1cc1b',
  '21397f5d-d6a1-440b-9b93-abe534b239d6',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  '« Mikhail Gorbachev: I am against all walls » — entretien avec Russia Beyond the Headlines (16 octobre 2014)',
  'Mikhaïl Gorbatchev, dernier dirigeant de l''URSS — entretien publié par Russia Beyond the Headlines',
  '2014-10-16',
  'CITATION_EXACTE'::quote_kind,
  'The topic of « NATO expansion » was not discussed at all, and it wasn''t brought up in those years. I say this with full responsibility.',
  'La réponse du signataire soviétique au journaliste qui lui demandait pourquoi il n''avait pas exigé que les « promesses » de 1990 — dont la formule de Baker citée en question — soient inscrites dans un texte juridique. Gorbatchev précise dans la suite de l''entretien ce qui, selon lui, a été discuté : l''engagement que les structures militaires de l''OTAN ne progresseraient pas sur le territoire de l''ex-RDA après la réunification. Gorbatchev a par ailleurs critiqué, à d''autres moments, l''élargissement de l''OTAN — mais sa déclaration de 2014 coupe court à l''idée d''un engagement de non-élargissement discuté puis trahi en 1990. En français : « Le sujet de l''expansion de l''OTAN n''a pas du tout été discuté, et il n''a pas été soulevé pendant ces années. Je l''affirme en pleine responsabilité. »',
  'https://www.rbth.com/international/2014/10/16/mikhail_gorbachev_i_am_against_all_walls_40673.html',
  null,
  'c4594e8c159c5aedb7a39c4365582a0698ef1996238d12fd7a330a2983def2e3',
  null,
  'https://fr.wikipedia.org/wiki/Mikha%C3%AFl_Gorbatchev',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '8f1690ee-a855-4f49-a453-01c198768ab3',
  '21397f5d-d6a1-440b-9b93-abe534b239d6',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« NATO Expansion: What Gorbachev Heard » — National Security Archive, université George Washington (12 décembre 2017)',
  'Svetlana Savranskaya et Tom Blanton, National Security Archive — documents déclassifiés américains, soviétiques, allemands, britanniques et français',
  '2017-12-12',
  'CITATION_EXACTE'::quote_kind,
  'The former idea about « closer to the Soviet borders » is written down not in treaties but in multiple memoranda of conversation between the Soviets and the highest-level Western interlocutors (Genscher, Kohl, Baker, Gates, Bush, Mitterrand, Thatcher, Major, Woerner, and others) offering assurances throughout 1990 and into 1991 about protecting Soviet security interests and including the USSR in new European security structures.',
  'L''analyse de référence des archives déclassifiées : les assurances occidentales de 1990 — dont le « not one inch eastward » de Baker, répété trois fois lors de la rencontre du 9 février 1990 — existent bien, mais dans des comptes rendus de conversations, « non dans des traités » ; le statut spécial du territoire est-allemand, lui, a été codifié dans le traité du 12 septembre 1990. Ce dossier documentaire, qui reproduit les mémorandums soviétiques et américains, nourrit le débat d''historiens sur l''ampleur des propos tenus — il ne conclut pas à l''existence d''un engagement juridique : c''est précisément la distinction entre assurances politiques et traité que le claim confond. En français : « L''idée initiale (ne pas rapprocher l''OTAN des frontières soviétiques) est consignée non dans des traités, mais dans de nombreux mémorandums de conversation. »',
  'https://nsarchive.gwu.edu/briefing-book/russia-programs/2017-12-12/nato-expansion-what-gorbachev-heard-western-leaders-early',
  null,
  'a161068ccc29310a585e373dcfb7c33f76b2065ebdc3b6b142c10cd864e2d2cd',
  null,
  'https://en.wikipedia.org/wiki/National_Security_Archive',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '6b624bf9-f96e-4980-a44c-2884f945eaf6',
  '21397f5d-d6a1-440b-9b93-abe534b239d6',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Russia''s war in Ukraine has NATO on alert. Here''s how we got to this point » — entretien avec M. E. Sarotte, NPR (17 mars 2022)',
  'Mary Elise Sarotte, professeure d''histoire à la Johns Hopkins School of Advanced International Studies — entretien NPR',
  '2022-03-17',
  'CITATION_EXACTE'::quote_kind,
  'What Putin does is he keeps referring back to that moment as if that were a formal written treaty pledge, which it was not.',
  'L''historienne dont le livre « Not One Inch » (Yale University Press, 2021) a reconstitué les négociations à partir d''archives déclassifiées — dont des mémorandums soviétiques et américains qu''elle a fait déclassifier. Sa lecture : la conversation Baker-Gorbatchev de février 1990 était « hypothétique », portait sur le sort de l''Allemagne, et le traité finalement signé « permet explicitement à l''Article 5 de traverser la ligne de la guerre froide » — Moscou l''a signé. Sa conclusion situe exactement le claim : Poutine se réfère au début des négociations comme à un engagement écrit « alors que ça n''en était pas un ». En français : « Ce que fait Poutine, c''est qu''il ne cesse de se référer à ce moment comme s''il s''agissait d''un engagement écrit dans un traité, alors que ça n''en était pas un. »',
  'https://www.npr.org/2022/03/17/1086986950/russias-war-in-ukraine-has-nato-on-alert-heres-how-we-got-to-this-point',
  null,
  'c6ff89e77b94275f933e0b7fe4b62995ba316c57f40c2e78dd6a7401b961ebfd',
  null,
  'https://fr.wikipedia.org/wiki/Mary_Elise_Sarotte',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'c63861f5-19d4-40ab-914b-abb1a2a3475f',
  '21397f5d-d6a1-440b-9b93-abe534b239d6',
  'GAUCHE'::political_spectrum,
  '« L''Otan avait-elle promis à la Russie de ne pas s''étendre aux anciens pays du pacte de Varsovie ? » — Libération, CheckNews (2 mars 2022)',
  'Libération, rubrique CheckNews — avec Amélie Zima, chercheuse spécialiste de l''OTAN (université Paris 2 Panthéon-Assas), et Johanna Möhring (CASSIS, université de Bonn)',
  '2022-03-02',
  'CITATION_EXACTE'::quote_kind,
  'Il n''y a pas eu de traité formel garantissant à l''URSS que l''OTAN ne s''élargira pas',
  'La vérification de Libération conclut comme les historiens : « il semble avéré qu''aucun engagement formel de la part ni de l''Otan, ni des Etats-Unis, ni du Royaume-Uni, ni de la France n''ait été formulé ». Amélie Zima rappelle que l''élargissement « est inconcevable dans le contexte de l''époque » — l''URSS existe encore et le pacte de Varsovie ne sera dissous qu''en juillet 1991 — et situe la citation de Baker (« pas d''un pouce ») dans son contexte : la question du statut de l''Allemagne réunifiée. L''article reproduit aussi la position officielle de l''OTAN : « un tel accord n''a jamais été conclu ».',
  'https://web.archive.org/web/20230101000923id_/https://www.liberation.fr/checknews/lotan-avait-elle-promis-a-la-russie-de-ne-pas-setendre-aux-anciens-pays-du-pacte-de-varsovie-20220302_IBKOWYOWCNB5LFKH7PV6T5PWME/',
  null,
  '6867850cd14a127ded58903f1d51e1156fefc9566f929ef2e1243de74292ff4c',
  null,
  'https://fr.wikipedia.org/wiki/Lib%C3%A9ration_(journal)',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '2c496937-ae69-4a32-a325-59d65d20e59a',
  '21397f5d-d6a1-440b-9b93-abe534b239d6',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  '« L''Otan a-t-elle promis à la Russie de ne pas s''étendre à l''Est ? » — Le Figaro, rubrique « La vérification » (7 mars 2022)',
  'Le Figaro, rubrique La vérification, 7 mars 2022',
  '2022-03-07',
  'CITATION_EXACTE'::quote_kind,
  'Ce n''est tout simplement pas vrai, une telle promesse n''a jamais été faite, il n''y a jamais eu un tel accord en coulisse',
  'Le Figaro confronte le récit de Vladimir Poutine — « « Pas un pouce vers l''Est », nous ont-ils dit dans les années 90. Et alors ? Ils ont triché, ils nous ont effrontément trompés ! » — à la position de l''Alliance : le secrétaire général de l''OTAN, Jens Stoltenberg, dément (« une telle promesse n''a jamais été faite, il n''y a jamais eu un tel accord en coulisse »), et l''OTAN « dément fermement l''existence d''une telle promesse ». Le quotidien relève que l''argument est repris en France, pendant la campagne présidentielle de 2022, par plusieurs candidats — signe qu''il circule bien au-delà de Moscou.',
  'https://www.lefigaro.fr/international/l-otan-a-t-elle-promis-a-la-russie-de-ne-pas-s-etendre-a-l-est-20220307',
  null,
  'cb4f4d0a71c1cadcafc9bdf7e99effb13d9eb495262a806443a899e0e9aaec42',
  null,
  'https://fr.wikipedia.org/wiki/Le_Figaro',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'efe84967-4bd2-4f6d-9b3f-a4f9600755e1',
  '21397f5d-d6a1-440b-9b93-abe534b239d6',
  'CENTRE'::political_spectrum,
  '« L''OTAN a-t-elle promis à Moscou de ne jamais s''ouvrir à l''Ukraine ? Ou le contraire ? » — RTBF (12 janvier 2022)',
  'RTBF Actus (service public belge)',
  '2022-01-12',
  'CITATION_EXACTE'::quote_kind,
  'Selon les témoignages recueillis auprès des dirigeants de l''époque impliqués dans les négociations entre l''Allemagne de l''Ouest, la France, la Grande-Bretagne, les États-Unis et l''URSS au sujet de la réunification de l''Allemagne, personne n''a jamais promis quoi que ce soit par écrit.',
  'Décryptage du service public belge : aucune promesse écrite de non-élargissement n''a été faite en 1990 — le traité signé en septembre 1990 « est le seul document écrit et il ne reprend aucune promesse ». Les mémorandums compilés par le National Security Archive restituent des discussions orales (« not one inch eastward »), pas un engagement contractuel.',
  'https://www.rtbf.be/article/l-otan-a-t-elle-promis-a-moscou-de-ne-jamais-s-ouvrir-a-l-ukraine-ou-le-contraire-10913127',
  null,
  '77d599cee9a5b90c82f46a652c5e73f6ffae26e55508c5853a45a48266e93703',
  null,
  'https://fr.wikipedia.org/wiki/Radio-t%C3%A9l%C3%A9vision_belge_de_la_Communaut%C3%A9_fran%C3%A7aise',
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '8c1789f5-5ca9-4caa-a4e3-daa3ccbc0718',
  '21397f5d-d6a1-440b-9b93-abe534b239d6',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« NATO member countries » — registre officiel des membres et des dates d''adhésion',
  'Organisation du traité de l''Atlantique nord (OTAN)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'At present, NATO has 32 member countries. These countries, called NATO Allies, are sovereign states that come together through NATO to discuss political and security issues and make collective decisions by consensus.',
  'Registre officiel de l''Alliance : 32 membres, créée par 12 pays le 4 avril 1949, avec les dates d''adhésion de chaque État (vagues de 1999, 2004, 2009, 2017, 2020, 2023, 2024). Aucune clause de non-élargissement n''y figure : le registre atteste au contraire que l''élargissement postérieur à 1990 s''est poursuivi, sans traité de 1990 l''interdisant. Citation en anglais, langue du registre.',
  'https://www.nato.int/cps/en/natohq/nato_countries.htm',
  null,
  '133f4bf625ec622e06c8ed4a95ba8974576d675e970191ccd4f8a51492d17ccd',
  null,
  'https://fr.wikipedia.org/wiki/Organisation_du_trait%C3%A9_de_l%27Atlantique_nord',
  9
);

delete from public.dossiers where slug = 'carte-mondiale-qi-pays-afrique-fraude-lynn';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  'd8aeedb1-4a5d-4d98-87ca-00d3f07aab2c',
  'carte-mondiale-qi-pays-afrique-fraude-lynn',
  'Les cartes mondiales du QI prouvent une infériorité cognitive biologique des populations africaines',
  'FAUX'::verdict_status,
  'Aucune institution statistique ne mesure de « QI moyen par pays » : la carte virale sort de la base de « QI national » constituée par Richard Lynn et Tatu Vanhanen (2002-2019). Dès la première version, 104 des 185 pays n''avaient aucun score mesuré — seulement des valeurs extrapolées — et les échantillons réellement testés étaient largement biaisés : le score de la Guinée équatoriale venait de 48 enfants testés en Espagne, pas en Guinée équatoriale, et deux audits systématiques de l''université d''Amsterdam ont montré que les échantillons africains les plus performants étaient écartés de la base.

L''université d''Ulster a retiré en 2018 à Richard Lynn son titre de professeur émérite ; en 2020, la société savante EHBEA a déclaré le jeu de données « scientifically unsound, systematically biased, and ethically problematic » ; en 2024, une revue de la Royal Society a rétracté un article bâti sur lui.

Rien, dans tout cela, ne mesure une « infériorité biologique » : selon le rapport de référence de l''American Psychological Association, les rares données directes n''étayent pas l''hypothèse génétique, et les scores se déplacent avec l''école, la nutrition et la santé — environ 20 points de QI gagnés en une génération aux Pays-Bas (1952-1982).

Le tout adossé à un financement documenté : le Pioneer Fund, fonds eugéniste que Lynn a présidé à partir de 2012. La carte est une reconstruction statistique, pas une mesure.',
  'SOCIETE'::dossier_category,
  '[{"name":"Richard Lynn","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Richard_Lynn","note":"Psychologue britannique (1930-2023), auteur de la base de « QI nationaux » (2002-2019) et coauteur de « IQ and the Wealth of Nations » ; son titre de professeur émérite lui a été retiré par l''université d''Ulster en 2018."},{"name":"Tatu Vanhanen","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Tatu_Vanhanen","note":"Politologue finlandais, coauteur de « IQ and the Wealth of Nations » (2002) et « IQ and Global Inequality » (2006), les ouvrages dont la carte tire ses données."},{"name":"Pioneer Fund","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Pioneer_Fund","note":"Fonds américain créé en 1937 pour financer la recherche eugéniste ; il a subventionné Richard Lynn, qui en a pris la présidence en 2012."},{"name":"IQ and the Wealth of Nations","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/IQ_and_the_Wealth_of_Nations","note":"Essai de Richard Lynn et Tatu Vanhanen (2002) dont la carte virale reprend les données, prolongé par « IQ and Global Inequality » (2006)."},{"name":"Université d''Ulster","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Universit%C3%A9_d%27Ulster","note":"Université nord-irlandaise qui a retiré en 2018 le titre de professeur émérite de Richard Lynn, après une motion de son syndicat étudiant."}]'::jsonb,
  100,
  '[{"claim_part":"« Cette carte repose sur des mesures scientifiques mondiales »","status":"FAUX","detail":"La base ne tient pas sur des mesures : sur 185 pays couverts, 104 n''ont que des scores extrapolés d''après les pays voisins — un procédé que le coauteur du jeu de données reconnaît lui-même (« estimés à partir des QI de pays proches et comparables sur le plan ethnique »). Les échantillons mesurés sont hors normes : le QI de l''Angola vient de 19 personnes, celui de l''Érythrée entièrement d''enfants vivant en orphelinat, celui de la Guinée équatoriale de 48 enfants testés en Espagne — pas en Guinée équatoriale — et les échantillons africains dépassant 75 de moyenne étaient écartés (« unsystematic methods... results untrustworthy »). L''université d''Ulster a retiré son titre à Lynn en 2018, l''EHBEA a déclaré le jeu de données infondé en 2020 et une revue de la Royal Society a rétracté en 2024 un article qui l''utilisait : aucune institution scientifique ne tient cette carte pour une mesure."},{"claim_part":"« Un score national bas mesure une limite génétique »","status":"CONFUSION_CONCEPTUELLE","detail":"Un score moyen autour de 70 ne décrit pas un patrimoine héréditaire : il confond la performance à des tests construits dans les pays riches avec les capacités d''une population entière — au risque d''un contresens clinique, 70 étant le seuil de la déficience intellectuelle, et les scores « faibles » mesurés au Mali ou chez les Tsimane s''évanouissant devant des tâches adaptées (EHBEA). Le rapport de référence de l''American Psychological Association établit qu''une forte héritabilité au sein d''un groupe n''implique rien sur l''origine d''un écart entre groupes, et que les rares données directes ne soutiennent pas l''hypothèse génétique. Pour le chercheur du CNRS Franck Ramus, « aucune preuve n''a été apportée que les différences génétiques entre les peuples soient la cause des différences entre nations », quand la scolarisation, la nutrition et les maladies sont « des explications bien mieux étayées »."},{"claim_part":"« Le QI moyen d''une population est fixe et héréditaire »","status":"FAUX","detail":"Les scores ne sont pas fixés : entre 1952 et 1982, les conscrits néerlandais passés aux mêmes épreuves de Raven ont gagné environ 20 points de QI — « a gain of about 20 IQ points over a single generation » — et l''effet Flynn documente des gains de 5 à 25 points par génération selon les pays. Chaque année de scolarité supplémentaire fait progresser l''intelligence mesurée d''environ 3 points (méta-analyse sur 600 000 personnes), et la nutrition, les maladies infectieuses ou les toxines environnementales pèsent sur le développement cognitif. Lire un « QI national » comme une constante biologique revient à prendre une photo des conditions de vie pour un trait de nature."}]'::jsonb,
  '[{"date":"2002","title":"« IQ and the Wealth of Nations »","description":"Richard Lynn et Tatu Vanhanen publient les ouvrages dont la carte virale reprendra les données : dès l''origine, 104 des 185 pays couverts n''ont aucun score mesuré, seulement des valeurs extrapolées.","evidence_ref":null},{"date":"2009-12","title":"Les audits de l''université d''Amsterdam","description":"Deux revues systématiques examinent les échantillons africains de la base : moyenne d''environ 82 face aux normes britanniques, 48 enfants de Guinée équatoriale en réalité testés en Espagne, et les échantillons dépassant 75 écartés parce que jugés non représentatifs — « méthodes douteuses, résultats non fiables ».","evidence_ref":"Pièces #04-05"},{"date":"2012","title":"Lynn prend la présidence du Pioneer Fund","description":"Après des centaines de milliers de dollars de subventions reçues directement et via l''Ulster Institute, Richard Lynn prend la tête du Pioneer Fund, fonds créé en 1937 pour financer la recherche eugéniste.","evidence_ref":"Pièce #12"},{"date":"2018-04-14","title":"L''université d''Ulster retire son titre de professeur émérite","description":"Première sanction institutionnelle visant Lynn, rapportée par la BBC : le titre d''emeritus, normalement accordé à vie, lui est retiré après une motion du syndicat étudiant dénonçant des prises de position « racistes et sexistes ».","evidence_ref":"Pièce #01"},{"date":"2019-11-14","title":"La carte devient virale — et passée au crible","description":"Après un raid de comptes d''extrême droite, la carte explose sur Twitter ; le jour même, CheckNews et Franck Ramus (CNRS) en documentent la fabrique : tests non comparables, péréquations discutables, extrapolations à partir des pays voisins.","evidence_ref":"Pièces #09-10"},{"date":"2020-07-27","title":"EHBEA : « scientifically unsound, systematically biased, and ethically problematic »","description":"La société savante européenne de biologie et d''écologie évolutives humaines examine le jeu de données et demande aux chercheurs de ne plus l''utiliser : seuls les échantillons aux scores les plus bas étaient retenus, « introduisant un biais racial à la base même du jeu de données ».","evidence_ref":"Pièce #02"},{"date":"2022","title":"Le jeu de données cité dans le manifeste de Buffalo","description":"La base de « QI nationaux » est citée dans le manifeste de l''auteur de l''attentat raciste de Buffalo : la chercheuse qui documente ces usages rappelle « the potential harms created by using a dataset » qui dépeint des populations entières comme inférieures à la normale.","evidence_ref":"Pièce #06"},{"date":"2023-11-24","title":"« Bad science » : vingt ans de critiques documentées","description":"Rebecca Sear (LSE) montre la fabrique du « 70 » africain : Érythrée « entièrement estimée à partir d''enfants vivant en orphelinat », Angola « à partir de 19 personnes » — un jeu de données toujours utilisé malgré vingt ans de critiques.","evidence_ref":"Pièce #06"},{"date":"2024-03-06","title":"Rétractation par la Royal Society","description":"Le Proceedings B rétracte un article de 2010 bâti sur ces données : les problèmes manifestes du jeu de données et les dommages de son usage justifient la rétractation, pour maintenir les standards de la revue.","evidence_ref":"Pièce #03"},{"date":"2024-09-20","title":"Les Surligneurs : 104 pays sans mesure, la carte refait surface","description":"La version 2024 de la carte est remise en circulation jusqu''à un député : le coauteur du jeu de données reconnaît que la majorité des pays n''ont jamais eu de score mesuré, tandis que les scientifiques rappellent qu''un QI « dépendant du contexte culturel n''est pas transportable d''un endroit à l''autre de la planète ».","evidence_ref":"Pièce #11"}]'::jsonb,
  true,
  '2026-10-16T00:00:00.000Z'::timestamptz,
  '/illustrations/carte-mondiale-qi-pays-afrique-fraude-lynn.jpg',
  'Portrait : Gothick, 2008 — CC BY-SA 3.0, Wikimedia Commons'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'efa9a88d-5b04-415c-9357-c78798d43c89',
  'd8aeedb1-4a5d-4d98-87ca-00d3f07aab2c',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  '« Ulster University withdraws status from Prof Richard Lynn » — BBC News NI (14 avril 2018)',
  'Université d''Ulster — décision rapportée par BBC News NI',
  '2018-04-14',
  'CITATION_EXACTE'::quote_kind,
  'Ulster University has withdrawn the emeritus title from Professor Richard Lynn and notified the individual accordingly',
  'Le retrait du titre de professeur émérite, première sanction institutionnelle visant Richard Lynn, rapporté par la BBC : la décision a été prise « following due process and considering all relevant information » (selon les formes et au vu de tous les éléments pertinents), après une motion du syndicat étudiant dénonçant des prises de position « racistes et sexistes ». L''université précise que Lynn « does not work for Ulster University nor does he contribute to our research and teaching ». Le titre d''emeritus, normalement accordé à vie aux universitaires éminents, ne lui est plus rattaché. En français : « L''université d''Ulster a retiré à Richard Lynn son titre de professeur émérite et en a informé l''intéressé. ».',
  'https://www.bbc.com/news/uk-northern-ireland-43768132',
  null,
  'a5cb40c7439cc23a419a4229b450185e202e2a034eb755226f81857c21b5edde',
  null,
  'https://fr.wikipedia.org/wiki/Universit%C3%A9_d%27Ulster',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'da1ad92e-5b00-48b2-8a1c-034bad255183',
  'd8aeedb1-4a5d-4d98-87ca-00d3f07aab2c',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Statement on ''National IQ'' Datasets » — European Human Behaviour and Evolution Association (27 juillet 2020)',
  'EHBEA — European Human Behaviour and Evolution Association',
  '2020-07-27',
  'CITATION_EXACTE'::quote_kind,
  'In short, these datasets are scientifically unsound, systematically biased, and ethically problematic.',
  'La société savante européenne de biologie et d''écologie évolutives humaines examine les jeux de données de « QI national » et conclut à des biais de sélection (« only the lowest-scoring samples were retained », seuls les échantillons aux scores les plus bas étant retenus — « introducing racial bias into the dataset''s very foundation »), à des échantillons inadéquats, à des tests occidentaux non transposables et à des scores « faibles » qui disparaissent avec des tâches culturellement adaptées (travaux au Mali, chez les Tsimane). Elle « urges all researchers to refrain from using these datasets in future work ». Sa page maintenue souligne que les critiques valent encore pour les versions les plus récentes du jeu de données. En français : « En bref, ces jeux de données sont scientifiquement infondés, systématiquement biaisés et éthiquement problématiques. ».',
  'https://www.ehbea.org/pages/national-iq-datasets',
  null,
  '298e0d5b173aefe17ff7bcc03306a17228082b6694af153f703cc55eae34e1e7',
  null,
  'https://www.ehbea.org/',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'dd0e5062-30d9-493c-9571-227d9a761b72',
  'd8aeedb1-4a5d-4d98-87ca-00d3f07aab2c',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  '« Retraction: ''Parasite prevalence and the worldwide distribution of cognitive ability'' (2010), by Eppig, Fincher and Thornhill » — Proceedings of the Royal Society B (6 mars 2024)',
  'Royal Society — Proceedings B (revue scientifique)',
  '2024-03-06',
  'CITATION_EXACTE'::quote_kind,
  'After carefully considering the dataset, the critiques, the authors'' response and the potential harms created by using a dataset that appears to portray human populations in some geographical regions as of below normal intelligence on average, the editors concluded that the manifest problems in the data warranted retraction in order to uphold these standards.',
  'La revue de la Royal Society rétracte un article de 2010 qui reliait la prévalence des parasites aux « QI nationaux » et s''appuyait sur les données de Lynn : après examen, les critiques sur le jeu de données — incohérences et biais substantiels — ont été jugées convaincantes, les auteurs eux-mêmes en reconnaissant une partie. La notice évoque « the potential harms created by using a dataset that appears to portray human populations in some geographical regions as of below normal intelligence on average » : les dommages d''un jeu de données qui dépeint des populations entières comme inférieures à la normale. La rétractation est prononcée pour maintenir les standards de la revue. En français : « Après avoir examiné attentivement le jeu de données, les critiques, la réponse des auteurs et les préjudices potentiels créés par l''utilisation d''un jeu de données qui semble présenter les populations de certaines régions géographiques comme d''intelligence moyenne inférieure à la normale, les rédacteurs ont conclu que les problèmes manifestes des données justifiaient un retrait, afin de préserver ces normes. ».',
  'https://royalsocietypublishing.org/doi/10.1098/rspb.2024.0463',
  null,
  '0d79bfe5b3e5e9c5d533d256b02f926850eabbdb20b91633a9e6a7ee8f1efd33',
  null,
  'https://en.wikipedia.org/wiki/Proceedings_of_the_Royal_Society',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '614decb0-824c-4bf8-b38c-f510111ad266',
  'd8aeedb1-4a5d-4d98-87ca-00d3f07aab2c',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« A systematic literature review of the average IQ of sub-Saharan Africans » — Intelligence, vol. 38, n° 1 (2010), p. 1-20',
  'Jelte M. Wicherts, Conor V. Dolan et Han L.J. van der Maas — université d''Amsterdam',
  '2009-06-07',
  'CITATION_EXACTE'::quote_kind,
  'Results show that average IQ of Africans on these tests is approximately 82 when compared to UK norms.',
  'Face à la base de Lynn (« the average IQ of the Black population of sub-Saharan Africa lies below 70 »), cette revue systématique de la littérature — critères d''inclusion et d''exclusion explicites — aboutit à environ 82 par rapport aux normes britanniques, chiffre convergent avec les enquêtes internationales de niveau scolaire (« around 82 »). La même étude démonte l''échantillon de Guinée équatoriale : « The forty-eight children, to whom the WISC (not the WISC-R) was administered, were from Spain, not from Equatorial Guinea » — les quarante-huit enfants testés venaient d''Espagne, pas de Guinée équatoriale, et Lynn « made a mistake in using this sample ». Publié en ligne le 7 juin 2009, dans le numéro de janvier-février 2010. En français : « Les résultats montrent que le QI moyen des Africains à ces tests est d''environ 82 par rapport aux normes britanniques. ».',
  'http://www.iapsych.com/iqmr/fe/LinkedDocuments/wicherts2010b.pdf',
  null,
  'b403adbf65a342593fa54e0684f13ac473171c5822adcb2cded78fd6097c9d85',
  null,
  'https://fr.wikipedia.org/wiki/Universit%C3%A9_d%27Amsterdam',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'ff0d49d7-f478-407a-9768-1fcfccd2b4a4',
  'd8aeedb1-4a5d-4d98-87ca-00d3f07aab2c',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« The dangers of unsystematic selection methods and the representativeness of 46 samples of African test-takers » — Intelligence, vol. 38, n° 1 (2010), p. 30-37',
  'Jelte M. Wicherts, Conor V. Dolan et Han L.J. van der Maas — université d''Amsterdam',
  '2009-12-03',
  'CITATION_EXACTE'::quote_kind,
  'This suggests that Lynn and Meisenberg excluded samples of Africans who average IQs above 75 because they deemed these samples unrepresentative on the basis of the samples'' relatively high IQs.',
  'La réponse méthodologique décisive : en testant les 46 échantillons africains au crible de critères objectifs (échantillon jugé représentatif par les auteurs d''origine, tirage aléatoire, stratification explicite, sujets en bonne santé, niveau socio-économique normal), les chercheurs montrent que la représentativité retenue par Lynn et Meisenberg ne dépend d''aucune de ces caractéristiques — sinon du QI mesuré. Les échantillons forts sont écartés, les faibles conservés. Conclusion des auteurs : « We conclude that Lynn and Meisenberg''s unsystematic methods are questionable and their results untrustworthy » — des méthodes douteuses, des résultats non fiables. Publié en ligne le 3 décembre 2009. En français : « Cela suggère que Lynn et Meisenberg ont exclu les échantillons d''Africains dont le QI moyen dépassait 75, parce qu''ils les jugeaient non représentatifs en raison de leurs QI relativement élevés. ».',
  'http://www.iapsych.com/iqmr/fe/LinkedDocuments/wicherts2010c.pdf',
  null,
  'ae5afc3c6d9d360e34b71ed9aea439f2b8211740f7a29565bb6d832f416a553e',
  null,
  'https://fr.wikipedia.org/wiki/Universit%C3%A9_d%27Amsterdam',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '29ac3bda-85c5-4ca2-82e5-0b092555b02a',
  'd8aeedb1-4a5d-4d98-87ca-00d3f07aab2c',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« The persistence of eugenics in mainstream journals highlights major gaps in research integrity » — LSE Impact Blog, London School of Economics (24 novembre 2023)',
  'Rebecca Sear (London School of Hygiene and Tropical Medicine) — LSE Impact Blog',
  '2023-11-24',
  'CITATION_EXACTE'::quote_kind,
  'An inspection of Lynn''s dataset reveals why it comes up with such an implausible IQ for sub-Saharan Africa: it is bad science.',
  'La chercheuse qui documente depuis des années la fabrique du « 70 » africain : échantillons de commodité (le QI de l''Érythrée « is estimated entirely from children living in orphanages », l''Angola « from just 19 people »), sélection biaisée, aucune méthodologie de sélection publiée. Un score si bas qu''il impliquerait que « large proportions of people in Africa have trouble leading ordinary lives without help » — et ce jeu de données a nourri des usages violents : il est cité dans le manifeste de l''auteur de l''attentat raciste de Buffalo (2022). Elle souligne qu''il continue d''être utilisé malgré vingt ans de critiques documentées. En français : « L''examen du jeu de données de Lynn révèle pourquoi il aboutit à un QI aussi invraisemblable pour l''Afrique subsaharienne : c''est de la mauvaise science. ».',
  'https://blogs.lse.ac.uk/impactofsocialsciences/2023/11/24/the-persistence-of-eugenics-in-mainstream-journals-highlights-major-gaps-in-research-integrity/',
  null,
  'bcc8498862c3e09d84404f094149415995afca6a440d870eeb3e96a3d9132e8a',
  null,
  'https://en.wikipedia.org/wiki/Rebecca_Sear',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'c6ed230c-6c6a-483c-aa97-a0f7c7252ac4',
  'd8aeedb1-4a5d-4d98-87ca-00d3f07aab2c',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Intelligence: Knowns and Unknowns » — rapport de la task force de l''American Psychological Association (American Psychologist, vol. 51, n° 2, 1996)',
  'American Psychological Association — task force présidée par Ulric Neisser',
  null,
  'CITATION_EXACTE'::quote_kind,
  'There is not much direct evidence on this point, but what little there is fails to support the genetic hypothesis.',
  'Le rapport de référence commandé par l''APA pour trancher le débat sur l''intelligence : sur l''hypothèse que des écarts entre groupes soient partiellement génétiques, ses auteurs (Neisser, Bouchard, Sternberg et al.) concluent que les rares données directes ne la soutiennent pas, et rappellent qu''une forte héritabilité « within a given group has no necessary implications for the source of a difference between groups » — une héritabilité interne ne dit rien de l''origine d''un écart entre groupes. Le même rapport documente l''effet Flynn : « The average gain is about 3 IQ points per decade », plus d''un écart-type depuis 1940. En français : les données directes sont rares et ce peu qui existe ne soutient pas l''hypothèse génétique.',
  'https://pdf.stafforini.com/neisser-1996-intelligence-knowns-unknowns.pdf',
  null,
  'e20cd8beda7118e912c65dfe7fa9e06554a1810fc359851b2929ac28b6a4163c',
  null,
  'https://fr.wikipedia.org/wiki/Association_am%C3%A9ricaine_de_psychologie',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '4f68d6df-d8be-4c65-a458-e5e1efde7fe7',
  'd8aeedb1-4a5d-4d98-87ca-00d3f07aab2c',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Massive IQ gains in 14 nations: What IQ tests really measure » — Psychological Bulletin, vol. 101, n° 2 (mars 1987), p. 171-191',
  'James R. Flynn (université d''Otago) — Psychological Bulletin',
  null,
  'CITATION_EXACTE'::quote_kind,
  'The second estimate evidences a gain of about 20 IQ points over a single generation, the 30 years between 1952 and 1982.',
  'L''étude fondatrice de l''« effet Flynn » : sur les mêmes épreuves de Raven, les conscrits néerlandais de 1982 réussissent tellement mieux que ceux de 1952 que l''écart équivaut à environ 20 points de QI en trente ans — un gain « taken as verified » par l''auteur — et quatorze pays montrent des gains de 5 à 25 points par génération. La vitesse de ces déplacements interdit de lire un « QI national » comme une constante : les mêmes populations donnent des scores très différents selon l''époque et l''environnement. En français : « La seconde estimation met en évidence un gain d''environ 20 points de QI sur une seule génération, les 30 années entre 1952 et 1982. ».',
  'http://www.iapsych.com/iqmr/fe/LinkedDocuments/flynn1987.pdf',
  null,
  '1b6b2dc90d01482affd497595b2be019de0f23845149649d4fef4e21b9bca49e',
  null,
  'https://en.wikipedia.org/wiki/James_R._Flynn',
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'befa44b1-2f02-4bd3-b3c8-b309b81a5712',
  'd8aeedb1-4a5d-4d98-87ca-00d3f07aab2c',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« La carte mondiale des QI – explications complètes » — Ramus Méninges (14 novembre 2019)',
  'Franck Ramus — directeur de recherche au CNRS (blog Ramus Méninges)',
  '2019-11-14',
  'CITATION_EXACTE'::quote_kind,
  'Cette carte est à prendre avec des pincettes car les scores représentés n''ont pas été obtenus avec des tests comparables sur des échantillons représentatifs de la population dans chaque pays.',
  'Le développement de ses réponses à CheckNews : péréquations discutables, extrapolations, « Bref, cette carte peut donner une illusion de précision mais en fait elle est très approximative ». Et la synthèse de l''état de la science : « aucune preuve n''a été apportée que les différences génétiques entre les peuples soient la cause des différences entre nations », tandis que scolarisation, nutrition et maladies sont « des explications bien mieux étayées » — chaque année de scolarité compte pour environ 3 points de QI (méta-analyse de 600 000 personnes). « Il y a consensus scientifique pour dire que des facteurs environnementaux expliquent au moins une large part des différences de QI nationaux. »',
  'https://ramus-meninges.fr/2019/11/14/la-carte-mondiale-des-qi-explications-completes-2/',
  null,
  '27400031344de105657c7416f7c8939bac7184a69ffcec7b53f808b87ee036f7',
  null,
  'https://fr.wikipedia.org/wiki/Franck_Ramus',
  9
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'e39a772b-18c2-4e1c-b364-d6e566d9f2cc',
  'd8aeedb1-4a5d-4d98-87ca-00d3f07aab2c',
  'GAUCHE'::political_spectrum,
  '« La carte mondiale des QI, relayée par des comptes d''extrême droite, a-t-elle une valeur scientifique ? » — Libération, CheckNews (14 novembre 2019)',
  'Libération, rubrique CheckNews — enquête de Pauline Moullot, avec Franck Ramus (CNRS)',
  '2019-11-14',
  'CITATION_EXACTE'::quote_kind,
  'Les scores des différents pays n''ont pas tous été obtenus avec les mêmes tests, et ils ont donc fait des péréquations qu''on peut trouver discutables. Par ailleurs, des données n''existent pas pour tous les pays, donc ils ont fait des extrapolations à partir de pays voisins',
  'La vérification de la carte virale, sa genèse et ses usages : issue d''une page Wikipédia dérivée des ouvrages de Lynn, devenue en novembre 2019 une tendance Twitter après un raid de comptes d''extrême droite ; Lynn y est rappelé « destitué de sa chaire de professeur émérite de l''université d''Ulster ». Le généticien Kevin Mitchell (Trinity College Dublin), cité par le journal : les écarts suivent « les soins maternels et infantiles, la nutrition à l''enfance, l''exposition à des toxines de neurodéveloppement comme le plomb, l''accès et la qualité de l''éducation » — « Les scores de QI permettent de mesurer la capacité intellectuelle d''une personne, pas la limite de leur potentiel intellectuel. »',
  'https://web.archive.org/web/20191116053434id_/https://www.liberation.fr/checknews/2019/11/14/la-carte-mondiale-des-qi-relayee-par-des-comptes-d-extreme-droite-a-t-elle-une-valeur-scientifique_1754773/',
  null,
  '90e84f098fb29dd2d33bbcc2c1705c42bf7b4ecf5fdb63cd03e1bcee75f8ef48',
  null,
  'https://fr.wikipedia.org/wiki/Lib%C3%A9ration_(journal)',
  10
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '20cef4a9-ba09-4997-b679-fb9201aeecfd',
  'd8aeedb1-4a5d-4d98-87ca-00d3f07aab2c',
  'CENTRE'::political_spectrum,
  '« Que vaut cette carte censée montrer l''intelligence des habitants de chaque pays ? » — Les Surligneurs (20 septembre 2024)',
  'Les Surligneurs — vérification de Nicolas Kirilowits',
  '2024-09-20',
  'CITATION_EXACTE'::quote_kind,
  'pour 104 des 185 pays étudiés par son mentor Richard Lynn et son comparse de l''époque, Tatu Vanhanen, la moyenne des QI nationaux ont été « estimés à partir des QI de pays proches et comparables sur le plan ethnique. »',
  'La vérification de la version 2024 de la carte, remise en circulation sur Threads et relayée jusqu''à un député : d''après le coauteur du jeu de données lui-même, David Becker, la majorité des pays n''ont jamais eu de score mesuré. L''article sollicite plusieurs scientifiques : le QI « est une mesure très dépendante du contexte culturel et n''est donc pas transportable d''un endroit à l''autre de la planète », rappelle Evelyne Heyer (Muséum national d''histoire naturelle), tandis que le choix d''une palette « arc-en-ciel » « vise à manipuler l''information et le public » (Françoise Bahoken, géographe). Rappel de Franck Ramus : « Aucune preuve n''a été apportée que les différences génétiques entre les peuples soient la cause des différences entre nations ».',
  'https://lessurligneurs.eu/que-vaut-cette-carte-censee-montrer-lintelligence-des-habitants-de-chaque-pays/',
  null,
  '279915bbad76253530c5c4f48fce9d4ee467db67f80868b4fe715e698062a7d9',
  null,
  'https://fr.wikipedia.org/wiki/Les_Surligneurs',
  11
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '11a88710-01e2-4417-89f9-b5d030898f22',
  'd8aeedb1-4a5d-4d98-87ca-00d3f07aab2c',
  'GAUCHE'::political_spectrum,
  '« Richard Lynn » — fiche « Extremist Files », Southern Poverty Law Center',
  'Southern Poverty Law Center (organisation américaine de défense des droits civiques)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Lynn is the current president of the notoriously racist Pioneer Fund. Prior to becoming president in 2012, he received hundreds of thousands of dollars in Pioneer Fund grants, both directly, and through the Ulster Institute for Social Research.',
  'Le financement, documenté par l''organisation qui suit les mouvements extrémistes américains : Richard Lynn a reçu des centaines de milliers de dollars de subventions du Pioneer Fund — fonds créé en 1937 pour soutenir la recherche eugéniste — directement et via l''Ulster Institute for Social Research, avant d''en prendre la présidence en 2012. La fiche, non mise à jour depuis sa mort en 2023, rappelle qu''il a aussi publié dans des revues suprémacistes : c''est cet écosystème qui a produit la base de données devenue une carte virale. En français : « Lynn est l''actuel président du Pioneer Fund, notoirement raciste. Avant d''en devenir président en 2012, il a reçu des centaines de milliers de dollars de subventions du Pioneer Fund, directement et par l''intermédiaire de l''Ulster Institute for Social Research. ».',
  'https://www.splcenter.org/resources/extremist-files/richard-lynn/',
  null,
  '12ce0cca0055db788fc65ae951ba2a500ddcda6d50a98bed4566082bdac1697c',
  null,
  'https://fr.wikipedia.org/wiki/Southern_Poverty_Law_Center',
  12
);

delete from public.dossiers where slug = 'grand-remplacement-theorie-complot-demographie';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  'de732433-25fc-487c-8c42-1838d8c0e110',
  'grand-remplacement-theorie-complot-demographie',
  'La théorie du « Grand Remplacement » démontre un plan ourdi par des élites',
  'CONSPIRATIONNISTE'::verdict_status,
  'La thèse du « Grand Remplacement » postule un projet concerté d''élites visant à substituer la population européenne — un « plan » dont aucun document n''atteste l''existence. Popularisée en 2011 par l''écrivain Renaud Camus et portée au premier plan de la campagne présidentielle de 2022 par Eric Zemmour, elle réactive la peur de l''envahisseur et s''appuie sur des chiffres approximatifs : « elle s''est fabriquée comme un slogan », résume le démographe Hervé Le Bras.

Rien, dans les données officielles, ne correspond à une submersion : le solde migratoire de la France est estimé provisoirement à +176 000 personnes pour 2025, année où le solde naturel devient négatif pour la première fois depuis la fin de la Seconde Guerre mondiale (-6 000), et les projections de François Héran situent à l''horizon 2050 la part de la population d''origine subsaharienne autour de 3 % — même en doublant — et celle d''origine nord-africaine à 5,3 %.

Le rapport onusien sur la « migration de remplacement », parfois brandi comme la « preuve » d''un programme, est un exercice de projection sur le vieillissement démographique, jamais un plan appliqué.

Démographes de l''Ined et du Collège de France, politologues, économistes du CAE : les spécialistes convergent — des flux ordinaires (travail, famille, études, exil), des facteurs structurels, aucune machination. Une théorie fausse, documentée comme dangereuse : elle a inspiré des actes terroristes.',
  'SOCIETE'::dossier_category,
  '[{"name":"Renaud Camus","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Renaud_Camus","note":"Écrivain, figure des milieux identitaires : il popularise l''expression « grand remplacement » dans l''essai éponyme de 2011, réédité en 2012."},{"name":"Grand remplacement","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Grand_remplacement","note":"Théorie conspirationniste d''un remplacement de la population française par une immigration extra-européenne — la peur d''un envahisseur « qui n''a pas d''âge », documentée et réfutée par les démographes."},{"name":"Éric Zemmour","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/%C3%89ric_Zemmour","note":"Polémiste et candidat à l''élection présidentielle de 2022 : principal relais de la théorie dans le débat électoral, dont il fait un argument de campagne."},{"name":"Institut national d''études démographiques","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Institut_national_d%27%C3%A9tudes_d%C3%A9mographiques","note":"Institut de recherche dont les démographes (Héran, Pison, Le Bras) documentent les flux réels — et l''écart avec la fiction du « remplacement »."}]'::jsonb,
  100,
  '[{"claim_part":"« Les flux migratoires obéissent à un plan secret d''élites »","status":"COMPLOTISME","detail":"Attribution de dynamiques macro-sociales à une volonté cachée : aucun document, aucune archive ne documente un « plan » de substitution. Le texte que les milieux complotistes citent comme preuve — le rapport de l''ONU sur la « migration de remplacement » — définit celle-ci comme « la migration internationale qu''il faudrait » pour compenser un déclin de population : un exercice de projection en six scénarios sur huit pays, qui conclut au contraire qu''un « niveau d''immigration bien plus élevé que celui connu dans un passé récent » serait nécessaire pour l''enrayer. Les entrées que l''Insee mesure (+176 000 personnes en 2025) relèvent de motifs documentés — travail, famille, études, asile — et de facteurs structurels : vieillissement, besoins de main-d''œuvre, conflits. Attribuer ces flux à une volonté d''élites est la définition même du complotisme."},{"claim_part":"« La démographie subit une substitution biologique programmée »","status":"BIAIS_ESSENTIALISTE","detail":"Des mobilités mises en récit comme une substitution : en 2025, la population française n''augmente que par le solde migratoire (+176 000) puisque le solde naturel est négatif (-6 000) — sans aucune « substitution » : les personnes immigrées ou descendantes d''immigrés représentent près de 22 % de la population, une naissance sur six naît d''un couple mixte, et la fécondité converge dès la deuxième génération (apport des femmes immigrées au taux de fécondité national : +0,1 enfant). D''ici 2050, la part de la population d''origine subsaharienne atteindrait environ 3 % — même en doublant, selon les projections de François Héran — et celle d''origine nord-africaine 5,3 %. La « substitution biologique » convertit ces mobilités en destin racial : un biais essentialiste, pas une mesure."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-16T00:00:00.000Z'::timestamptz,
  '/illustrations/grand-remplacement-theorie-complot-demographie.jpg',
  'Portrait : Renaud Camus, 2013 — CC BY 2.0, Wikimedia Commons'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '29049c7f-977f-4613-9469-93e24145dd9b',
  'de732433-25fc-487c-8c42-1838d8c0e110',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  '« Replacement Migration: Is It a Solution to Declining and Ageing Populations? » — rapport ST/ESA/SER.A/206, Nations unies, Division de la population (2000)',
  'Organisation des Nations unies — Division de la population (Département des affaires économiques et sociales)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Replacement migration refers to the international migration that would be needed to offset declines in the size of population and declines in the population of working age, as well as to offset the overall ageing of a population.',
  'La définition officielle qui ouvre le rapport : la « migration de remplacement » est « la migration internationale qu''il faudrait » pour compenser des déclins de population — un conditionnel, jamais un plan. Le document, publié par la Division de la population, calcule six scénarios prospectifs pour huit pays (France, Allemagne, Italie, Japon, Corée du Sud, Russie, Royaume-Uni, États-Unis) et conclut que, pour l''Italie, le Japon, la Corée du Sud et l''Europe, « a level of immigration much higher than that experienced in the recent past would be needed to offset population decline » — un niveau d''immigration bien plus élevé que celui connu récemment serait nécessaire pour enrayer le déclin, preuve que rien de tel n''est en cours. En français : la migration de remplacement désigne la migration internationale qui serait nécessaire pour compenser les déclins de la taille de la population et de la population en âge de travailler, ainsi que le vieillissement global d''une population.',
  'https://www.un.org/development/desa/pd/content/replacement-migration',
  null,
  '556f9d88d98ab2d28ac1d45423ee44b904cb02a032da6c80e154f75c3f56b272',
  null,
  'https://fr.wikipedia.org/wiki/Organisation_des_Nations_unies',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'ee604881-be97-4460-b0bd-8c47020c3570',
  'de732433-25fc-487c-8c42-1838d8c0e110',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Le mythe du « grand remplacement » » — fiche Désinfox n° 2 de l''Institut Convergences Migrations (CNRS, 2022)',
  'Désinfox-Migrations — Institut Convergences Migrations (CNRS)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'La théorie du « grand remplacement » est fausse car il n''y a pas de submersion migratoire, ni en Europe, ni en France.',
  'La fiche de décryptage co-signée par des spécialistes — parmi lesquels François Héran (Collège de France), Jean-Yves Camus (IRIS), Patrick Simon (Ined), Karen Akoka, Ségolène Barbou des Places et Catherine Wihtol de Wenden (CNRS) — tranche : « ni en Europe, ni en France ». Elle documente qu''en 2021 la population a augmenté de 0,3 % grâce à un solde naturel estimé à +81 000 et un solde migratoire estimé à +140 000 (Insee) ; que l''apport des femmes immigrées au taux de fécondité national est de +0,1 enfant seulement (1,8 à 1,9 en 2017), les filles d''immigrés alignant leur fécondité sur celle des natives dès la deuxième génération ; que près de 22 % des personnes en France sont immigrées ou descendantes d''immigrés et qu''une naissance sur six vient d''un couple mixte — ce n''est pas un remplacement parce que cette diversité incorpore de nombreux mélanges d''une génération à l''autre. Elle rappelle enfin qu''en inspirant des actes terroristes « contre les populations perçues comme étrangères », cette théorie « s''est révélée extrêmement dangereuse à travers le monde ».',
  'https://www.icmigrations.cnrs.fr/wp-content/uploads/2025/01/DM-Fiche-2-Mythe-grand-remplacement.pdf',
  null,
  'c63b42a8b82b55330fa13d46e67e2185c1b871dde25d0987b10fb56c3095cec5',
  null,
  'https://www.icmigrations.cnrs.fr/',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '1197e5e9-ff75-4b39-9b5e-6157d5f44a87',
  'de732433-25fc-487c-8c42-1838d8c0e110',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« « Grand remplacement ? » D''ici 2050, la part des immigrés d''origine subsaharienne dans la population française pourrait doubler et s''établir à… 3%, et celle des immigrés d''Afrique du Nord à 5,3% » — Institut Convergences Migrations (5 avril 2022)',
  'Institut Convergences Migrations (CNRS) — projections de François Héran (d''après Le Monde)',
  '2022-04-05',
  'CITATION_EXACTE'::quote_kind,
  'D''ici 2050, la part des immigrés d''origine subsaharienne dans la population française pourrait doubler et s''établir à… 3%, et celle des immigrés d''Afrique du Nord à 5,3%',
  'Les projections du démographe François Héran (professeur au Collège de France, directeur de l''Institut Convergences Migrations) relayées par l''institut : même en doublant d''ici 2050, la part de la population d''origine subsaharienne atteindrait environ 3 %, et celle d''origine nord-africaine 5,3 %. Le post renvoie à la vidéo du Monde « Immigration : y a-t-il de plus en plus d''immigrés en France ? » et à l''étude de Héran sur les migrations subsahariennes en Europe — des ordres de grandeur sans rapport avec la « submersion » annoncée.',
  'https://www.icmigrations.cnrs.fr/2022/04/05/grand-remplacement-dici-2050-la-part-des-immigres-dorigine-subsaharienne-dans-la-population-francaise-pourrait-doubler-et-setablir-a-3-et-celle-des-immigres-dafrique-du-nord-a-53/',
  null,
  'fa37a5060c590fe5350164c38e2779240ed13b1fa03f601cc5259d19d45d4c9a',
  null,
  'https://fr.wikipedia.org/wiki/Fran%C3%A7ois_H%C3%A9ran',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'ce72edc7-f606-4d3e-821e-357452a2cedf',
  'de732433-25fc-487c-8c42-1838d8c0e110',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« Bilan démographique 2025 » — Insee Première n° 2087 (13 janvier 2026)',
  'Insee — Institut national de la statistique et des études économiques',
  '2026-01-13',
  'CITATION_EXACTE'::quote_kind,
  'Le solde migratoire est quant à lui estimé provisoirement à +176 000 personnes pour 2025.',
  'Le bilan annuel officiel : au 1er janvier 2026, la population en France est estimée à 69,1 millions d''habitants, soit 0,25 % de plus qu''un an auparavant, et le solde naturel devient négatif pour la première fois depuis la fin de la Seconde Guerre mondiale (-6 000) — la croissance ne tient qu''à la migration. Le document explicite sa méthode : jusqu''au dernier recensement disponible, le solde migratoire est mesuré par différence ; au-delà, il est « conventionnellement fixé à la moyenne des trois derniers soldes migratoires connus », le choc ukrainien de 2022 étant exclu du calcul. Des entrées et des sorties comptabilisées, +0,25 % de population par an : aucune trace d''un « plan ».',
  'https://www.insee.fr/fr/statistiques/8719824',
  null,
  '391e76f0511550f5b663afe599cf97ecad54f9466c99b93846cea0fb6f2fec34',
  null,
  'https://fr.wikipedia.org/wiki/Institut_national_de_la_statistique_et_des_%C3%A9tudes_%C3%A9conomiques',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '03b5c398-ae73-4460-9a50-14a89a59056e',
  'de732433-25fc-487c-8c42-1838d8c0e110',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« EU population diversity by citizenship and country of birth » — Eurostat, Statistics Explained (données extraites le 2 février 2026)',
  'Eurostat — office statistique de l''Union européenne',
  null,
  'CITATION_EXACTE'::quote_kind,
  'On 1 January 2025, an estimated 46.7 million people born outside the EU were residing in an EU country, accounting for 10.4% of the EU population.',
  'La photographie officielle de l''Union : au 1er janvier 2025, environ 450,6 millions de personnes vivaient dans l''UE, dont 46,7 millions nées hors de l''UE (10,4 %) et 30,6 millions de citoyens de pays tiers (6,8 %), « une augmentation de 1,9 million » sur un an — des ordres de grandeur progressifs, sans submersion. S''y ajoutent 18,0 millions de personnes nées dans un autre État membre et 14,1 millions de citoyens d''un autre pays de l''UE. En français : au 1er janvier 2025, environ 46,7 millions de personnes nées hors de l''UE résidaient dans un pays de l''UE, soit 10,4 % de la population de l''Union.',
  'https://ec.europa.eu/eurostat/statistics-explained/index.php?title=EU_population_diversity_by_citizenship_and_country_of_birth',
  null,
  '457e51be16cb397ad78c32620cc8c5c946d44cddd0b83ae23d71f0159d618a55',
  null,
  'https://fr.wikipedia.org/wiki/Eurostat',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '182333ae-48d3-4ffb-8925-4d03d333d5d0',
  'de732433-25fc-487c-8c42-1838d8c0e110',
  'CENTRE'::political_spectrum,
  '« L''immigration qualifiée : un visa pour la croissance » — Note du Conseil d''analyse économique n° 67 (9 novembre 2021)',
  'Emmanuelle Auriol et Hillel Rapoport — Conseil d''analyse économique (CAE)',
  '2021-11-09',
  'CITATION_EXACTE'::quote_kind,
  'Au total, les études sur les effets de l''immigration sur le marché du travail, notamment français, concluent à des effets faibles, tantôt positifs, tantôt négatifs, mais très localisés et de court terme.',
  'La note institutionnelle sur le rôle macroéconomique du travail immigré : les effets sur le marché du travail « sont généralement modestes à court terme, en France y compris » — entre 1990 et 2010, « l''immigration n''a eu aucun effet sur les salaires des natifs français » — et la contribution nette des immigrés aux finances publiques « se situe dans une fourchette comprise entre + 0,5 % et - 0,5 % du PIB », suivant les pays et les années. Les auteurs notent que les immigrés sont « auto-sélectionnés positivement » et recommandent, pour la croissance, une immigration de travail plus qualifiée — à rebours de tout « plan » de substitution, qu''aucun modèle économique n''étaye.',
  'https://cae-eco.fr/static/pdf/cae-note067.pdf',
  null,
  '1d604be3e11655698892b194a32dd5a3f3160b624a4ce1c8ae8fd7374b4913c1',
  null,
  'https://fr.wikipedia.org/wiki/Conseil_d%27analyse_%C3%A9conomique',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'c94f655f-8b45-4ba6-a4fc-c4acd6a2d14c',
  'de732433-25fc-487c-8c42-1838d8c0e110',
  'CENTRE'::political_spectrum,
  '« Le « grand remplacement », généalogie d''un complotisme caméléon » — Le Monde (28 janvier 2022)',
  'Marc-Olivier Bherer — Le Monde',
  '2022-01-28',
  'CITATION_EXACTE'::quote_kind,
  'La pensée du « grand remplacement », propagée principalement par l''écrivain Renaud Camus, figure des milieux identitaires, et le candidat d''extrême droite à l''élection présidentielle Eric Zemmour, ne repose pas simplement sur un délire démographique.',
  'L''enquête sur la généalogie de la théorie : trouvant ses racines dans la chrétienté médiévale, la peur de l''envahisseur se réinvente à chaque époque — chez Camus, dont l''essai de 2021 (La Nouvelle Librairie) décrit « le remplacement d''un peuple, le peuple français indigène, par un ou plusieurs autres », comme chez Zemmour, dont les chiffres approximatifs sont démontés : « les démographes ont démontré que l''actuelle progression de l''immigration est loin de représenter une explosion démographique ». L''historien Reza Zia-Ebrahimi (King''s College) rappelle que juifs et musulmans étaient déjà dépeints au Moyen Âge comme « une menace existentielle » ; sans tangible, la théorie en appelle à la « guerre ethnique » et au « génocide ».',
  'https://web.archive.org/web/20220131212741/https://www.lemonde.fr/idees/article/2022/01/28/le-grand-remplacement-genealogie-d-un-complotisme-cameleon_6111330_3232.html',
  null,
  '0df1b025bb8abf06a4db48cdbcae055dd9c0d126f29bdced0e1b3d7f8d36cc40',
  null,
  'https://www.lemonde.fr/signataires/marc-olivier-bherer/',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'f86cdc9e-0832-4ade-90b8-b0df982e18f2',
  'de732433-25fc-487c-8c42-1838d8c0e110',
  'CENTRE'::political_spectrum,
  '« Le « grand remplacement » : la trajectoire politique d''une thèse complotiste » — Public Sénat (14 février 2022)',
  'Romain David — Public Sénat, entretien avec Jean-Yves Camus',
  '2022-02-14',
  'CITATION_EXACTE'::quote_kind,
  'L''expression vient effectivement de l''écrivain Renaud Camus, qui l''utilise pour la première fois dans un ouvrage publié en 2011, précisément intitulé Le Grand Remplacement, et qui a été réédité en 2012.',
  'Le politologue Jean-Yves Camus (spécialiste de l''extrême droite) déroule l''histoire de la formule : une « thèse xénophobe, progressivement apparue au tournant des XIXe et XXe siècle » — les romans L''Invasion noire et L''Invasion jaune d''Émile Driant (1894 et 1905) —, reprise par Renaud Camus, dont l''ouvrage « est davantage une collection de textes qu''un essai », puis convertie en arme électorale. « L''utilisation de la thèse complotiste et xénophobe d''un prétendu « grand remplacement » » fait réagir toute la classe politique au lendemain du meeting de Valérie Pécresse.',
  'https://www.publicsenat.fr/actualites/politique/le-grand-remplacement-la-trajectoire-politique-d-une-these-complotiste-192676',
  null,
  '085b23e1611ac67a2717e1b1f41b6626943374904564038e7b95f32a282a6b57',
  null,
  'https://fr.wikipedia.org/wiki/Jean-Yves_Camus',
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'eb72e3cf-cf90-4027-96cc-7a1fe2f68c73',
  'de732433-25fc-487c-8c42-1838d8c0e110',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  '« Le mythe falsificateur du grand remplacement » — Les Échos (25 février 2022)',
  'Pierre de Gasquet — Les Échos',
  '2022-02-25',
  'CITATION_EXACTE'::quote_kind,
  'Non, la théorie du grand remplacement ne résiste pas à l''épreuve de la réalité de l''évolution démographique.',
  'Le quotidien économique de droite rend compte de « Il n''y a pas de grand remplacement », d''Hervé Le Bras (Grasset, 140 pages) : « chiffres à l''appui », le démographe démontre que la « fable » ne résiste pas à l''analyse concrète des données — une « fable basée sur un fatras idéologique dont les leaders populistes font toujours leur miel, quarante ans plus tard… ». La recension souligne l''originalité du travail : il fallait « la voix de l''un de nos meilleurs démographes et historiens pour débusquer le mythe ».',
  'https://web.archive.org/web/20220225072426/https://www.lesechos.fr/idees-debats/livres/le-mythe-falsificateur-du-grand-remplacement-1389607',
  null,
  'ccff80dd92fa7eedccf03a142e7bc46474a6b686f6fba295f71701eefe90a2e4',
  null,
  'https://fr.wikipedia.org/wiki/Les_%C3%89chos',
  9
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '6c534485-c4c8-4e1f-9e23-a95fa14495fc',
  'de732433-25fc-487c-8c42-1838d8c0e110',
  'GAUCHE'::political_spectrum,
  '« Aux origines du mythe du « grand remplacement » — entretien avec Hervé Le Bras » — Le Vent Se Lève (30 mai 2022)',
  'Guillemette Magnin — Le Vent Se Lève, entretien avec Hervé Le Bras',
  '2022-05-30',
  'CITATION_EXACTE'::quote_kind,
  'Entre les entrées, les sorties et les décès, la moyenne annuelle est de 120 000 migrants entre 2006 et 2020.',
  'Le démographe (directeur d''études à l''EHESS) démonte la fabrique du slogan : « Pour moi, elle s''est fabriquée comme un slogan » — une « contagion de l''évidence » qui rend les chiffres inutiles. Il rétablit les ordres de grandeur : « Nous sommes bien loin des 400 000 annoncés ». Et rappelle que le rapport onusien sur la « migration de remplacement » — un exercice prospectif sur le vieillissement — a été détourné par le Front national en 2015. Le vrai juge de paix, dit-il, c''est le bilan des entrées, des sorties et des décès : 120 000 par an en moyenne, pas une submersion.',
  'https://lvsl.fr/aux-origines-du-mythe-du-grand-remplacement-entretien-avec-herve-le-bras/',
  null,
  'ef29e8a97108cbcb4f5aa475d5f31da9ec99ccf7903f7bb8cbf98bdf675323aa',
  null,
  'https://fr.wikipedia.org/wiki/Herv%C3%A9_Le_Bras',
  10
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '5ce7f04f-148a-4aa9-95a7-184b9c1dac67',
  'de732433-25fc-487c-8c42-1838d8c0e110',
  'GAUCHE'::political_spectrum,
  '« François Héran : « Le grand remplacement est une chimère » » — L''Obs, n° 3000 (23 avril 2022)',
  'Natacha Tatu — L''Obs, propos recueillis auprès de François Héran',
  '2022-04-23',
  'CITATION_EXACTE'::quote_kind,
  'Le grand remplacement est une chimère',
  'À l''occasion du dossier immigration de son numéro 3000, l''hebdomadaire interroge François Héran, professeur au Collège de France : « Il n''y a pas eu d''explosion récente », et la migration, « régulière depuis plus d''un siècle, participe au dynamisme de la société ». Le démographe rappelle aussi que « le niveau d''éducation des populations immigrées ne cesse de monter » — loin du « remplacement » fantasmé par ses promoteurs.',
  'https://www.nouvelobs.com/idees/20220423.OBS57545/francois-heran-le-grand-remplacement-est-une-chimere.html',
  null,
  '2dca8dba4a19f7ac28f79ada6822c97f50fb3898fc77230934c462ab844a7d6c',
  null,
  'https://fr.wikipedia.org/wiki/Fran%C3%A7ois_H%C3%A9ran',
  11
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '7e79bbdf-be60-4eb4-b909-4d207696e489',
  'de732433-25fc-487c-8c42-1838d8c0e110',
  'CENTRE'::political_spectrum,
  '« Attention à ces affirmations trompeuses sur la fécondité des immigrés en France » — AFP Factuel (19 janvier 2024)',
  'AFP Factuel — Agence France-Presse',
  '2024-01-19',
  'CITATION_EXACTE'::quote_kind,
  'il faut regarder la descendance finale des femmes, c''est la mesure qui a le plus de sens car elle prend en compte l''ensemble de leur vie féconde, avant et après la migration, pour une génération de femmes qui ont atteint 50 ans.',
  'La vérification, au lendemain du bilan démographique 2023, des chiffres brandis sur la fécondité des immigrées : l''indice conjoncturel des femmes nées à l''étranger est stable (autour de 2,3 enfants par femme entre 2006 et 2013, puis de 2,4 de 2014 à 2020) et la descendance finale des immigrées de 45 à 60 ans s''établit à 2,3 enfants, en baisse continue selon les générations (2,9 pour celles nées entre 1950 et 1954, 2,3 pour 1970-1974). Gilles Pison (Ined) indique la bonne mesure ; Sylvie Le Minez (Insee) rappelle que « le vrai juge de paix c''est ce qu''on appelle la descendance finale » ; et l''idée que « 50 % des naissances en 2050 » seraient d''origine immigrée est « très peu probable vu les tendances ».',
  'https://web.archive.org/web/20240128185515/https://factuel.afp.com/doc.afp.com.34FN3D6',
  null,
  'a036eacd26195597f0bb239d6e72f4706d6f0c387aa4b3160f785c67460b86ec',
  null,
  'https://fr.wikipedia.org/wiki/Agence_France-Presse',
  12
);

delete from public.dossiers where slug = 'politique-macron-socialiste-mythe-fiscalite-capital';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '208d6d44-b378-4309-b166-c5c401638d34',
  'politique-macron-socialiste-mythe-fiscalite-capital',
  'La politique d''Emmanuel Macron et de ses gouvernements est socialiste depuis 2017',
  'ABSURDE'::verdict_status,
  'Qualifier de « socialiste » la politique menée depuis 2017 contredit l''ensemble des réformes fiscales et structurelles du double quinquennat : suppression de l''ISF remplacé par l''impôt sur la fortune immobilière (2018), prélèvement forfaitaire unique de 30 % sur les revenus du capital — la « flat tax » —, baisse du taux de l''impôt sur les sociétés de 33,3 % à 25 %, réformes de l''assurance chômage et flexibilisation du marché du travail. Le gouvernement revendique lui-même cette architecture devant la Commission européenne : une « réforme fiscale d''ampleur », avec des mesures « toutes votées dans les textes financiers de l''automne 2017 ».

Les données officielles documentent le sens de ces choix : le rendement de l''impôt sur la fortune tombe de 5 067 millions d''euros en 2017 à 1 291 millions en 2018 — un différentiel de 2 935 millions — et le coût du remplacement de l''ISF par l''IFI s''élève, selon la commission des finances du Sénat, à 2,9 milliards d''euros pour le seul exercice 2018. Le taux global de prélèvements obligatoires recule de 45,3 % du PIB en 2017 à 43,2 % en 2023 — « une longue séquence de baisse », relève la Cour des comptes. Le niveau élevé des dépenses publiques reste, lui, le trait structurel de la France — retraites, santé, protection sociale —, pas une orientation collectiviste.

Les évaluations convergent sur la nature de la politique, plus que sur son efficacité : l''IPP mesure une hausse de 15 % des dividendes distribués dès la mise en place du PFU ; France Stratégie conclut, après cinq ans d''évaluation, que « les travaux de recherche n''ont pas détecté d''impact du PFU sur l''investissement et les salaires » ; et l''OFCE, qui en fait le bilan de gauche, discute la répartition des gains d''un quinquennat d''allègements, pas une bascule doctrinale.

Le contresens est total : une politique qui supprime son impôt sur la fortune, fixe un taux unique de 30 % sur les revenus du capital et ramène l''impôt sur les sociétés au niveau de ses voisins fait l''inverse d''un programme socialiste. Jusqu''aux libéraux qui la trouvent insuffisamment libérale, le débat porte sur l''efficacité d''une politique de l''offre : « socialiste » n''est pas un verdict documenté, c''est une étiquette polémique.',
  'POLITIQUE'::dossier_category,
  '[{"name":"Emmanuel Macron","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Emmanuel_Macron","note":"Président de la République depuis 2017 : les réformes fiscales de ses mandats — ISF transformé en IFI, PFU à 30 %, impôt sur les sociétés ramené à 25 % — sont précisément l''objet du dossier."},{"name":"Bruno Le Maire","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Bruno_Le_Maire","note":"Ministre de l''Économie et des Finances de 2017 à 2024, visage assumé de la « politique de l''offre » revendiquée par l''exécutif."},{"name":"Prélèvement forfaitaire unique","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Pr%C3%A9l%C3%A8vement_forfaitaire_unique","note":"La « flat tax » de 30 % sur les revenus du capital (12,8 % d''impôt sur le revenu et 17,2 % de prélèvements sociaux), créée par la loi de finances pour 2018 — la mesure emblématique invoquée des deux côtés du débat."},{"name":"Institut des politiques publiques","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://www.ipp.eu/","note":"Centre de recherche en économie (PSE, GENES) : ses évaluations d''impact des réformes de la fiscalité du capital nourrissent le dossier (note n° 46, rapport n° 47)."}]'::jsonb,
  100,
  '[{"claim_part":"« Le maintien d''un taux élevé de dépenses publiques prouve la nature socialiste du pouvoir »","status":"CONFUSION_CONCEPTUELLE","detail":"Un stock n''est pas une intention : le niveau élevé de la dépense publique — 56,6 % du PIB en 2025, parmi les plus élevés d''Europe — est l''héritage de décennies de construction du modèle social (retraites, santé, éducation, protection sociale), pas l''effet d''une bascule récente. Le taux de prélèvements obligatoires, lui, recule de 45,3 % du PIB en 2017 à 43,2 % en 2023 : si « dépenses publiques élevées » voulait dire « pouvoir socialiste », la France serait socialiste depuis les années 1980, quelles qu''aient été les majorités. Confondre la structure héritée avec l''orientation active des réformes est une confusion conceptuelle, pas un désaccord politique."},{"claim_part":"« La fiscalité du capital et des entreprises s''est alourdie »","status":"FAUX","detail":"Le contraire est documenté : le rendement de l''impôt sur la fortune passe de 5 067 M€ (2017) à 1 291 M€ (2018) avec l''IFI — différentiel de 2 935 M€ ; le taux d''impôt sur les sociétés descend de 33,3 % à 25 % (loi de finances pour 2018, trajectoire achevée en 2022) ; le PFU fixe à 30 % l''imposition des revenus du capital là où la France affichait l''un des taux les plus lourds d''Europe ; et la baisse nette se lit dans les comptes — 2,1 points de PIB de prélèvements obligatoires en moins entre 2017 et 2023. La prémisse est fausse au sens strict : c''est la fiscalité du capital et des entreprises qui a été allégée."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-16T00:00:00.000Z'::timestamptz,
  '/illustrations/politique-macron-socialiste-mythe-fiscalite-capital.jpg',
  'Portrait : Emmanuel Macron, 2025 — Nebojša Tejić / STA, Wikimedia Commons (domaine public)'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '522269b0-66bd-433c-8555-aa02ebbdfebf',
  '208d6d44-b378-4309-b166-c5c401638d34',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  '« Programme national de réforme de la France — 2018 » — gouvernement français, Commission européenne (avril 2018)',
  'Gouvernement français — Programme national de réforme présenté à la Commission européenne',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Nous avons engagé une réforme fiscale d''ampleur pour y remédier : réduction du taux de l''impôt sur les sociétés jusqu''à 25 %, transformation de l''Impôt sur la Fortune en Impôt sur la Fortune Immobilière, Prélèvement Forfaitaire Unique de 30 % sur les revenus du capital, transformation en 2019 du crédit d''impôt compétitivité emploi (CICE) en allègement pérenne de cotisations employeurs. Ces mesures ont toutes été votées dans les textes financiers de l''automne 2017 afin de donner la visibilité nécessaire aux acteurs économiques.',
  'Le document officiel par lequel le gouvernement présente sa stratégie à la Commission européenne expose lui-même l''architecture des réformes : impôt sur les sociétés ramené « jusqu''à 25 % », ISF transformé en impôt sur la fortune immobilière, prélèvement forfaitaire unique de 30 % sur les revenus du capital, CICE converti en allègement pérenne de cotisations — le tout « voté dans les textes financiers de l''automne 2017 ». Le programme revendique aussi « stimuler l''investissement et la montée en gamme en allégeant la fiscalité » et une réforme du marché du travail. L''orientation favorable au capital est documentée par son auteur même : ce n''est pas une étiquette plaquée par ses adversaires.',
  'https://commission.europa.eu/system/files/2018-04/2018-european-semester-national-reform-programme-france-fr.pdf',
  null,
  '6a83d5cdb80800f557e0e3588f9a1c5691b532155bcacc8bc76e789d1988b0ca',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'a0fb2356-46d2-4b26-8c71-dd0019a0ec60',
  '208d6d44-b378-4309-b166-c5c401638d34',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« Relation entre ISF et IFI » — question écrite n° 15255, réponse du ministère de l''Action et des comptes publics publiée au Journal officiel le 2 avril 2019 (Assemblée nationale)',
  'Ministère de l''Action et des comptes publics — question de M. Jean-Pierre Pont, Assemblée nationale',
  '2019-04-02',
  'CITATION_EXACTE'::quote_kind,
  'Le produit de l''impôt de solidarité sur la fortune (ISF) comptabilisé en 2017 s''est élèvé à 5 067 M€ (4 226 M€ au titre des déclarations déposées spontanément et 841 M€ issus du contrôle fiscal et de l''action du service de traitement des déclarations rectificatives).',
  'La réponse du ministère établit les ordres de grandeur officiels du remplacement de l''ISF par l''IFI : « le différentiel de rendement, calculé sur les seules recettes déclarées spontanément, s''élève donc à 2 935 M€, ce qui représente 1 % des recettes fiscales nettes ». Une politique qui divise par quatre le rendement de son impôt sur la fortune — 5 067 M€ en 2017 contre 1 291 M€ en 2018 — n''est pas une politique de prélèvement sur le capital : c''est l''inverse exact.',
  'http://questions.assemblee-nationale.fr/q15/15-15255QE.htm',
  null,
  '7e934a5d92d78db51a7c6b98e587760799bc45034396403e535cdfeeb9baafda',
  null,
  'https://fr.wikipedia.org/wiki/Assembl%C3%A9e_nationale_(France)',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '70c796cd-308d-4d34-b765-1b7f490c14da',
  '208d6d44-b378-4309-b166-c5c401638d34',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« Taux de prélèvements obligatoires rapportés au produit intérieur brut » — Insee, comptes nationaux annuels (base 2020), série 1959-2025',
  'Insee — comptes nationaux annuels',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Lecture : en 2025, le taux de prélèvements obligatoires s''établit à 43,6 % du produit intérieur brut (PIB)',
  'La série longue des comptes nationaux permet de juger les faits, pas les étiquettes : le taux de prélèvements obligatoires — 45,3 % du PIB en 2017 — recule à 43,2 % en 2023, avant de remonter à 43,6 % en 2025 sous l''effet des hausses d''impôts de sortie de crise (contribution exceptionnelle des grandes entreprises, taxe sur les rachats d''actions). Le niveau français reste élevé — autour de 44 % du PIB depuis le début des années 2010, quelles que soient les majorités : un trait structurel (périmètre des administrations publiques, assurances maladie et retraite), pas une doctrine « socialiste » installée en 2017.',
  'https://www.insee.fr/fr/statistiques/2381412',
  null,
  '77d312907b644418ef19e31b749de9719c0595218a3660d6daf3fc26187391fe',
  null,
  'https://www.insee.fr/',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '19f6391b-e142-4923-a40e-b098168765bd',
  '208d6d44-b378-4309-b166-c5c401638d34',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« Impacts of the 2018 Household Capital Tax Reforms on Inequalities in France: A Microsimulation Evaluation » — Félix Paquier et Michaël Sicsic, Insee, Économie et Statistique (prépublication, 2021)',
  'Félix Paquier et Michaël Sicsic — Insee (modèle Ines)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Concernant l''IFI en 2018, la masse totale issue des simulations d''Ines est de 1.1 milliard d''euros, soit une très légère sous-estimation (de l''ordre de 2 %) par rapport aux données de la DGFiP sur le même champ.',
  'La microsimulation Ines de l''Insee chiffre les effets redistributifs des réformes de 2018 : la transformation de l''ISF en IFI a apporté +3 440 millions d''euros de revenu disponible aux ménages — 340 000 foyers gagnants, 10 000 perdants, soit un gain moyen de 9 770 euros par foyer concerné — et la mise en place du PFU +1 760 millions d''euros au titre de l''impôt sur le revenu. Un « socialisme » qui organise un transfert net de plusieurs milliards vers les détenteurs de patrimoine et de capitaux serait une première historique.',
  'https://www.insee.fr/fr/statistiques/fichier/5426454/ESpreprint_Paquier-Sicsic_FR.pdf',
  null,
  'dfcd7f6307ac59fd34276fbc23723328831842f96519752e5fb7db2baa8f2604',
  null,
  'https://www.insee.fr/',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'b21903f0-d3f6-42ff-9495-a8f743407139',
  '208d6d44-b378-4309-b166-c5c401638d34',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Quelles leçons tirer des réformes de la fiscalité des revenus du capital ? » — Note IPP n° 46 (octobre 2019)',
  'Laurent Bach, Antoine Bozio, Brice Fabre, Arthur Guillouzouic, Claire Leroy, Clément Malgouyres — Institut des politiques publiques',
  null,
  'CITATION_EXACTE'::quote_kind,
  'L''introduction du PFU en 2018 a conduit à une hausse de 15 % des dividendes versés.',
  'L''évaluation d''impact — menée sur données fiscales de la DGFiP, dans le cadre d''une étude commanditée par la commission des finances du Sénat — mesure la réaction à la « flat tax » : une hausse de 15 % des dividendes distribués dès 2018, un coût contenu pour les finances publiques (400 millions d''euros après effets comportementaux, contre 900 en estimation statique) et une conclusion nette : « la réforme du PFU est peu susceptible de conduire à une hausse de l''investissement privé ». Un allègement d''impôt assumé sur les revenus du capital, dont les économistes discutent l''efficacité — la négation exacte d''un tournant socialiste.',
  'https://www.ipp.eu/wp-content/uploads/2019/10/n46-notesIPP-octobre2019.pdf',
  null,
  '3dae867db055e58538c06b80cfd0f3be8e59c2caf7faf59d76fb28fa39d1e2ea',
  null,
  'https://www.ipp.eu/',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '1aef133b-8fa2-4140-b92e-e9da29cf0e6c',
  '208d6d44-b378-4309-b166-c5c401638d34',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Évaluation des réformes de la fiscalité du capital — Effets sur la création d''entreprises, l''expatriation et la circulation de l''épargne » — Rapport IPP n° 47 (octobre 2023)',
  'Laurent Bach, Antoine Bozio, Étienne Fize, Arthur Guillouzouic, Clément Malgouyres — Institut des politiques publiques',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Pour un point de baisse de taux d''imposition, la réforme du PFU conduit à une hausse de 1,25 point du taux de création d''entreprises entre 2016 et 2022, la réforme IS de 1,0 point, et la réforme de l''IFI de 0,3 point.',
  'Dernier volet de l''évaluation du comité logé à France Stratégie : les réformes de la fiscalité du capital (PFU, IFI, IS) ont modifié les incitations — la création d''entreprises progresse dans les secteurs les plus exposés, « l''effet positif de la réforme est visible dès 2019 » — même si les auteurs documentent des effets réels limités (expatriations marginales, impacts agrégés faibles). Que l''on juge ces réformes efficaces ou non, leur nature est documentée : des baisses d''impôt sur le capital, décidées et assumées, loin de toute « socialisation ».',
  'https://www.ipp.eu/wp-content/uploads/2025/06/47_Rapport_IPP_47_ISFcrea_compressed.pdf',
  null,
  'acb0402ddfb7cd6f658847fa205616cf668e2bb5ece913af30d8fe1bd5fd060a',
  null,
  'https://www.ipp.eu/',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'a244396c-1b81-42b7-bb17-261fa180f70e',
  '208d6d44-b378-4309-b166-c5c401638d34',
  'CENTRE'::political_spectrum,
  '« La situation et les perspectives des finances publiques » — Cour des comptes (juin 2026)',
  'Cour des comptes — rapport annuel destiné au débat public',
  '2026-06-25',
  'CITATION_EXACTE'::quote_kind,
  'Après une longue séquence de baisse des prélèvements obligatoires entre 2015 et 2023, le retournement engagé en 2024 s''accentue donc nettement en 2025.',
  'La juridiction financière établit la chronologie nue des prélèvements : « une longue séquence de baisse […] entre 2015 et 2023 », puis un « retournement » en 2024-2025 dû à des hausses d''impôts (23,0 Md€ de mesures nouvelles en 2025, portées surtout par les grandes entreprises). La France se distingue par le niveau de ses dépenses publiques — 56,6 % du PIB en 2025 —, un trait structurel ancien, pas une bascule récente. Si « socialisme » signifie hausse de la pression fiscale au service d''un projet collectiviste, la chronologie officielle dit l''inverse pour la période 2017-2023.',
  'https://www.ccomptes.fr/sites/default/files/2026-06/20260625-synthese-RSPFP-2026.pdf',
  null,
  'f019d1a672d7212d3c94acf82d3edf0d2bf74ba33b77c11a10fa91c46adff219',
  null,
  'https://www.ccomptes.fr/',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'd8276c5d-ae65-4ee3-b7e0-f7d0f36b65af',
  '208d6d44-b378-4309-b166-c5c401638d34',
  'CENTRE'::political_spectrum,
  '« Transformation de l''ISF en IFI et création du PFU : un premier bilan » — Sénat, commission des finances (rapport d''information n° 42, déposé le 9 octobre 2019)',
  'Vincent Éblé et Albéric de Montgolfier, rapporteurs — commission des finances du Sénat',
  '2019-10-09',
  'CITATION_EXACTE'::quote_kind,
  'En retenant la même méthode, le coût de la réforme pour les finances publiques atteint finalement 2,9 milliards d''euros à l''issue de l''exercice 2018',
  'Le premier bilan parlementaire chiffre le coût du remplacement de l''ISF par l''IFI et de la création du PFU : « 2,9 milliards d''euros à l''issue de l''exercice 2018 », le coût du seul volet « impôt sur le revenu » du PFU étant estimé « à 1,3 milliard d''euros en 2018 et à 1,9 milliard d''euros à compter de 2019 ». Les rapporteurs documentent aussi le caractère « anti-redistributif » de la réforme, dont le gain fiscal profite d''abord aux patrimoines les plus élevés. Une politique « socialiste » qui allège l''impôt sur la fortune et celui du capital, avec un bilan parlementaire soulignant son effet anti-redistributif, relève de la contradiction dans les termes.',
  'https://www.senat.fr/rap/r19-042-1/r19-042-1.html',
  null,
  '6d516bd499c8e72240aaed60d5fb0ae28fe8605a58cc35519d0bc2382e25ef90',
  null,
  'https://www.senat.fr/',
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '57bacf2d-d470-4184-b0e1-a782023a4aec',
  '208d6d44-b378-4309-b166-c5c401638d34',
  'CENTRE'::political_spectrum,
  '« Évaluation des réformes de la fiscalité du capital — Rapport final » — Comité d''évaluation des réformes de la fiscalité du capital, France Stratégie (16 octobre 2023)',
  'Comité d''évaluation des réformes de la fiscalité du capital — France Stratégie',
  '2023-10-16',
  'CITATION_EXACTE'::quote_kind,
  'Les travaux de recherche n''ont pas détecté d''impact du PFU sur l''investissement et les salaires, dans les entreprises les plus exposées au PFU',
  'Le rapport final du comité (cinq ans de travaux, universitaires et administrations réunis) est la synthèse la plus récente : créations d''entreprises stimulées dans les secteurs exposés, effets réels limités par ailleurs — et ce constat central : « les travaux de recherche n''ont pas détecté d''impact du PFU sur l''investissement et les salaires ». Le débat public qui s''en saisit oppose alors « politique de l''offre » et efficacité — jamais « socialisme » : le champ même de la dispute suppose l''existence d''allègements fiscaux massifs sur le capital.',
  'https://www.vie-publique.fr/files/rapport/pdf/292639.pdf',
  null,
  '3fbcbb8e5191c2b12547870473d24e099d67bee4396711a1c96832127b35d4c3',
  null,
  'https://www.strategie-plan.gouv.fr/',
  9
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '238ca0f6-32d3-4a02-ab57-3f342aaefc19',
  '208d6d44-b378-4309-b166-c5c401638d34',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  '« Le prétendu échec de l''économie de l''offre » — Contrepoints, opinion de Jean-Yves Naudet (3 février 2025)',
  'Jean-Yves Naudet — Contrepoints',
  '2025-02-03',
  'CITATION_EXACTE'::quote_kind,
  'C''est une petite musique qui monte : la politique économique des gouvernements successifs d''Emmanuel Macron est un échec (c''est vrai), car c''est une politique de l''offre (c''est faux).',
  'Un point de vue libéral sur le même objet : pour Jean-Yves Naudet (professeur émérite d''économie, chroniqueur à Contrepoints), le procès instruit contre les gouvernements Macron est doublement à côté — la critique standard (« l''échec d''une politique de l''offre ») ne résiste pas, car ces gouvernements auraient « tous continué la tradition interventionniste et keynésienne française », pas mené la politique libérale qu''on leur prête. De la gauche anti-libérale à la droite libérale, les lectures opposées s''accordent sur ce point minimal : ni les réformes ni le bilan ne sont « socialistes ».',
  'https://www.contrepoints.org/economie-offre-echec/',
  null,
  '4af4dd896a50324c19a4ed242f54d2a2c565394bfed72723ae6cf975529c6ef2',
  null,
  'https://fr.wikipedia.org/wiki/Contrepoints',
  10
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '2d75d1e9-29f8-426d-bd1c-e47107bd12a6',
  '208d6d44-b378-4309-b166-c5c401638d34',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  '« ISF, « flat tax » : les réformes d''Emmanuel Macron ont dynamisé les créations d''entreprises » — Les Échos (17 octobre 2023)',
  'Sébastien Dumoulin — Les Échos',
  '2023-10-17',
  'CITATION_EXACTE'::quote_kind,
  'Réforme de l''ISF, mise en place de la « flat tax », baisse du taux d''impôt sur les sociétés : les réformes polémiques du premier quinquennat du chef de l''Etat ont eu un effet sur les créations d''entreprises dans les secteurs les plus exposés, selon un rapport de France Stratégie publié ce mardi.',
  'Le quotidien économique de droite rend compte du bilan France Stratégie — les réformes du capital « ont eu un effet sur les créations d''entreprises dans les secteurs les plus exposés » — et rappelle, légende à l''appui, que « la transformation de l''ISF en IFI a généré un manque à gagner de plus de 4 milliards d''euros à l''Etat ». Un allègement fiscal durable de la fiscalité du capital, célébré comme tel dans la presse économique : lecture libérale et lecture critique du quinquennat partagent le constat, pas la conclusion.',
  'https://web.archive.org/web/20240110071126/https://www.lesechos.fr/economie-france/budget-fiscalite/impots-les-reformes-demmanuel-macron-ont-dynamise-les-creations-dentreprises-1987657',
  null,
  'e2df3af3901ca4c09ac2da6d17144b6ac4e82cfbf5a90394ef364f356e235b21',
  null,
  'https://fr.wikipedia.org/wiki/Les_%C3%89chos',
  11
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'cc3350a4-0dec-4646-be49-9becc55a8bef',
  '208d6d44-b378-4309-b166-c5c401638d34',
  'GAUCHE'::political_spectrum,
  '« Une analyse macro et microéconomique du pouvoir d''achat des ménages en France — Bilan du quinquennat mis en perspective » — OFCE Policy brief n° 104 (17 mars 2022)',
  'Pierre Madec, Mathieu Plane, Raul Sampognaro — OFCE (Sciences Po)',
  '2022-03-17',
  'CITATION_EXACTE'::quote_kind,
  'La période du quinquennat d''E. Macron se caractérise par des gains positifs (+ 0,9 % par an en moyenne), un rythme comparable à celui observé au cours des trente dernières années.',
  'Le bilan de gauche du quinquennat, par les économistes de l''OFCE : des gains de pouvoir d''achat « + 0,9 % par an en moyenne », comparables à ceux des trois décennies précédentes, et une discussion méticuleuse de leur répartition — hausse de la CSG, réformes socio-fiscales, parts respectives des ménages. Critiquer la répartition d''une politique fiscale, c''est acter sa nature : l''OFCE n''analyse pas une rupture socialiste mais une politique d''allègements dont il discute les gagnants — précisément le débat qu''un prétendu tournant collectiviste aurait rendu impossible.',
  'https://www.ofce.fr/pdf/pbrief/2022/OFCEpbrief104.pdf',
  null,
  'a86f069c71932ff1452b2ce64f107492eb8dc54c4b17cd71134ea9c40e983a37',
  null,
  'https://fr.wikipedia.org/wiki/Observatoire_fran%C3%A7ais_des_conjonctures_%C3%A9conomiques',
  12
);

delete from public.dossiers where slug = 'racisme-anti-blanc-systemique-confusion-conceptuelle';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  'cb5d613d-7885-48a4-8d55-c127cd795d61',
  'racisme-anti-blanc-systemique-confusion-conceptuelle',
  'Il existe un racisme anti-blanc systémique en France',
  'CONFUSION_CONCEPTUELLE'::verdict_status,
  'Qualifier de « systémique » un racisme anti-blancs confond deux ordres de faits. Le racisme « systémique » — forgé par les militants des droits civiques américains, précisé par la sociologie — désigne des structures historiques d''inégalité et d''exclusion institutionnelle pesant sur des minorités : ce que les tests de discrimination documentent en France (embauche, logement). Des actes de racisme interpersonnel visant des personnes blanches existent, et le droit français les réprime sans distinction de couleur — la protection de l''article 225-1 du code pénal ne dépend pas de la victime. Mais d''actes individuels on ne déduit pas un système.

Les données pointent dans un seul sens. Sur 2 594 offres d''emploi testées entre 2015 et 2022, « les candidats dont le nom et le prénom indiquent qu''ils sont d''origine maghrébine ont moins de chances d''avoir une réponse positive à leur candidature » — résultat stable dans le temps, dans le privé comme dans le public (DGAFP). Le Défenseur des droits classe l''origine au deuxième rang de ses saisines en discrimination (18 %, derrière le handicap à 27 %) et relaie des pénalités de « 30 à 40 % » liées à l''origine maghrébine dans les testings récents. Aucune série, aucune campagne ne mesure de pénalité systémique visant la population majoritaire.

Les chercheurs eux-mêmes butent sur l''extension du concept. Pour Daniel Sabbagh (CNRS-CERI), « avoir recours à l''idée très large de système reflète surtout un aveu d''échec analytique » ; même en adoptant une définition pluraliste du racisme, l''existence d''un racisme anti-Blancs — « vraisemblablement marginal » — n''est qu''une question empirique, pas une structure. Pour Éric Fassin, « le racisme anti-Blancs n''existe pas pour les sciences sociales ». De la droite critique à la gauche universitaire, les lectures s''opposent sur tout sauf sur un point : le « système » n''a pas basculé contre la majorité.

Reste le débat public, où la formule sert d''abord d''argument politique : « une vision réductrice et idéologique » pour la critique conservatrice, une inversion des faits pour l''analyse universitaire. La thèse d''un racisme anti-blancs « systémique » ne résiste pas à l''examen — non parce que des actes racistes visant des Blancs n''existent pas (ils existent, et sont punis), mais parce qu''ils ne constituent pas un système d''inégalité : c''est une confusion conceptuelle, pas un constat.',
  'SOCIETE'::dossier_category,
  '[{"name":"Racisme systémique","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Racisme_syst%C3%A9mique","note":"Concept sociologique décrivant les mécanismes institutionnalisés et structurels produisant des inégalités entre groupes racisés — l''objet du dossier, détourné pour qualifier des actes isolés."},{"name":"Racisme anti-Blancs","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Racisme_antiblanc","note":"Expression désignant des actes d''hostilité raciste visant des personnes blanches — réalité jugée marginale par la recherche, devenue argument politique identifié."},{"name":"Daniel Sabbagh","kind":"PERSONNE","role":"AUTEUR","reference_url":null,"note":"Directeur de recherche au CNRS (CERI, Sciences Po) : l''un des rares chercheurs à contester le monopole de la conception « systémique » du racisme."},{"name":"Défenseur des droits","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/D%C3%A9fenseur_des_droits","note":"Institution indépendante chargée de défendre les droits : ses rapports annuels documentent la répartition des discriminations par critère."}]'::jsonb,
  95,
  '[{"claim_part":"« Tout acte de racisme individuel constitue par définition un racisme systémique »","status":"CONFUSION_CONCEPTUELLE","detail":"Les deux notions ne sont pas de même nature. Le racisme interpersonnel est un fait que le code pénal réprime comme infraction — y compris quand la victime est blanche : la protection ne dépend pas de la couleur. Le racisme « systémique » est un concept sociologique décrivant un ordre institutionnel qui produit et reproduit des inégalités durables entre groupes racisés, constatable par des séries statistiques et des tests de discrimination. Additionner des incidents individuels ne produit pas une structure : passer de l''un à l''autre est exactement la confusion que la recherche identifie — pour Daniel Sabbagh, « avoir recours à l''idée très large de système reflète surtout un aveu d''échec analytique » ; pour Éric Fassin, il y a « un écart entre ce que racontent les disciplines scientifiques et ce dont on parle dans le débat public »."},{"claim_part":"« Les populations blanches subissent des discriminations systémiques comparables dans l''accès à l''emploi ou au logement »","status":"FAUX","detail":"Les tests de discrimination documentent l''inverse d''une pénalité anti-majoritaire : sur 2 594 offres d''emploi testées entre 2015 et 2022, les candidatures à consonance maghrébine reçoivent systématiquement moins de réponses positives que le profil de référence, un résultat qui « se maintient sur toute la période, dans le secteur privé comme dans la fonction publique » (DGAFP). Les inégalités de logement analysées par l''enquête Trajectoires et origines (Ined/Insee) frappent les immigrés et leurs descendants, surexposés aux zones les plus tendues. Aucun testing national, aucune série institutionnelle ne mesure une pénalité structurelle liée à l''appartenance blanche : la prémisse est fausse, et dans le sens exactement contraire."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-16T00:00:00.000Z'::timestamptz,
  '/illustrations/racisme-anti-blanc-systemique-confusion-conceptuelle.jpg',
  'Portrait : Éric Fassin, 2019 — JacLavi, Wikimedia Commons (CC BY-SA 4.0)'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '70c181f7-ae25-4291-9bc8-4aa54ef919ef',
  'cb5d613d-7885-48a4-8d55-c127cd795d61',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« Article 225-1 du code pénal » — Légifrance, texte en vigueur (version du 1er septembre 2022)',
  'République française — Code pénal (partie législative)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Constitue une discrimination toute distinction opérée entre les personnes physiques sur le fondement de leur origine, de leur sexe, de leur situation de famille, de leur grossesse, de leur apparence physique, de la particulière vulnérabilité résultant de leur situation économique, apparente ou connue de son auteur, de leur patronyme, de leur lieu de résidence, de leur état de santé, de leur perte d''autonomie, de leur handicap, de leurs caractéristiques génétiques, de leurs mœurs, de leur orientation sexuelle, de leur identité de genre, de leur âge, de leurs opinions politiques, de leurs activités syndicales, de leur capacité à s''exprimer dans une langue autre que le français, de leur appartenance ou de leur non-appartenance, vraie ou supposée, à une ethnie, une nation, une prétendue race ou une religion déterminée.',
  'Le droit français ne connaît pas de distinction selon la couleur de la victime : l''article 225-1 proscrit « toute distinction » fondée sur l''un des nombreux critères qu''il énumère, dont « l''appartenance ou la non-appartenance, vraie ou supposée, à une ethnie, une nation, une prétendue race ou une religion déterminée ». Les injures et violences visant des personnes blanches sont donc réprimées comme toute autre infraction raciste — c''est le droit commun de l''universalité de la répression (vérification faite sur la reproduction intégrale du texte publiée dans le dossier de la DGAFP ci-après). Aucune « pénalité de couleur » n''existe dans la loi.',
  'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045391831',
  null,
  'f40f60c5fab0092f96a0b5f479a04bb7c4aaca37b0f9221ababbb68b444897f7',
  null,
  'https://fr.wikipedia.org/wiki/Code_p%C3%A9nal_(France)',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'a29af640-94d3-47b0-b9f4-3f9ce3ef7e17',
  'cb5d613d-7885-48a4-8d55-c127cd795d61',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« Le « testing » montre que des discriminations persistent dans l''accès à l''entretien d''embauche, y compris dans la fonction publique » — Dossier « Faits et chiffres », Rapport annuel sur l''état de la fonction publique, édition 2022 (DGAFP)',
  'Laetitia Challe, Yannick L''Horty, Pascale Petit (université Gustave-Eiffel, TEPP-CNRS) — Direction générale de l''administration et de la fonction publique',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Les candidats dont le nom et le prénom indiquent qu''ils sont d''origine maghrébine ont moins de chances d''avoir une réponse positive à leur candidature. Ce résultat se maintient sur toute la période, dans le secteur privé comme dans la fonction publique.',
  'Le « testing » soumet des candidatures fictives comparables, une variable exceptée. Sur les 2 594 offres de cadre administratif et d''aide-soignante testées en Île-de-France entre 2015 et 2022, la conclusion est univoque : les candidatures à consonance maghrébine reçoivent moins de réponses positives — et l''écart ne se referme ni dans le temps ni entre privé et public. C''est cette direction — contre les minorités visibles — que documentent les campagnes nationales de testings, jamais l''inverse. La discrimination mesurée est un désavantage pour les personnes perçues comme non-blanches ; aucune pénalité envers la population majoritaire n''y apparaît.',
  'https://www.fonction-publique.gouv.fr/files/files/publications/dossier-rapport-annuel/dossier_testing_discriminations.pdf',
  null,
  'ae93d053a3d5f75530297a971eae987b4d59e2364d15cc31a93456506c8f1f75',
  null,
  'https://fr.wikipedia.org/wiki/Direction_g%C3%A9n%C3%A9rale_de_l%27administration_et_de_la_fonction_publique',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '0a5c3581-c76b-4a22-a35c-659d5106d8fd',
  'cb5d613d-7885-48a4-8d55-c127cd795d61',
  'CENTRE'::political_spectrum,
  '« Rapport annuel d''activité 2025 » — Défenseur des droits (7 avril 2026)',
  'Défenseur des droits — institution indépendante',
  '2026-04-07',
  'CITATION_EXACTE'::quote_kind,
  'Une discrimination significative et forte en fonction de l''origine maghrébine : de l''ordre de 30 à 40 % de pénalités relatives.',
  'Le rapport annuel classe les réclamations reçues en matière de discrimination par critère : en 2025, le handicap (27 %) précède l''origine (18 %), loin devant les autres motifs — et l''institution relaie les résultats des testings récents, dont cette pénalité de « 30 à 40 % » liée à l''origine maghrébine. L''organisme qui recueille les réclamations de toute la population documente un paysage où le poids des discriminations retombe sur les minorités racisées ; nulle part n''apparaît de pénalité systémique subie par la population majoritaire.',
  'https://www.defenseurdesdroits.fr/sites/default/files/2026-04/ddd_rapport-annuel-2025_20260407.pdf',
  null,
  'cdb347ab099b79efd8b6acd5badc751f780525972a646e651cdb12547e89455e',
  null,
  'https://fr.wikipedia.org/wiki/D%C3%A9fenseur_des_droits',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '282919c2-ff1b-43a7-a6ff-8515d10fef9c',
  'cb5d613d-7885-48a4-8d55-c127cd795d61',
  'CENTRE'::political_spectrum,
  '« « Racisme systémique » : mais de quel « système » parle-t-on ? » — Philosophie Magazine (16 avril 2021)',
  'Ariane Nicolas — Philosophie Magazine',
  '2021-04-16',
  'CITATION_EXACTE'::quote_kind,
  'Parler de racisme systémique de façon globale noie le poisson.',
  'L''enquête retrace l''histoire du syntagme (des Black Panthers à Bonilla-Silva) et donne la parole au scepticisme académique : pour Daniel Sabbagh (CERI), « avoir recours à l''idée très large de système reflète surtout un aveu d''échec analytique » et les différentes manifestations du racisme « sont pourtant identifiables isolément les unes des autres ». La définition « systémique » suppose une structure d''inégalité durable entre groupes : elle ne se transpose pas à des actes individuels, quelle que soit la couleur de leur victime — et les chercheurs qui la défendent en conviennent aussi.',
  'https://www.philomag.com/articles/racisme-systemique-mais-de-quel-systeme-parle-t',
  null,
  '41fa917a7990747a9f21f9d9b5d12fcf71c4b70754b3236c43aef450c50aa836',
  null,
  'https://fr.wikipedia.org/wiki/Philosophie_magazine',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '02e78970-422f-4ed0-b45d-030c21462e37',
  'cb5d613d-7885-48a4-8d55-c127cd795d61',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Un racisme anti-Blancs ? » — Pouvoirs, revue française d''études constitutionnelles et politiques, n° 181 (2022)',
  'Daniel Sabbagh — CNRS, Centre de recherches internationales (CERI, Sciences Po)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Mieux vaudrait, sur la base d''une conception pluraliste du racisme, considérer l''existence d''un « racisme anti-Blancs » – vraisemblablement marginal – comme une question empirique, y compris afin de contrecarrer l''instrumentalisation de ce thème par des forces hostiles à l''antiracisme.',
  'L''article assume l''hérésie : sur la base d''une conception pluraliste du racisme, le racisme anti-Blancs — « vraisemblablement marginal » — serait à traiter comme une question empirique, pas comme un oxymore a priori. C''est précisément l''argument qui interdit de le qualifier de « systémique » sans données : en admettant même la notion, l''auteur documente qu''aux États-Unis « la proportion d''infractions de ce type visant des individus noirs est trois fois supérieure (48 %) » à celle visant des Blancs (16 %). Aucune symétrie structurelle ; une marge, au mieux.',
  'https://revue-pouvoirs.fr/wp-content/uploads/pdfs_articles/pouvoirs181_p97-108_antiblancs_rac.pdf',
  null,
  '3db5e7e770839810b9ce089b4bf9cb80d9f3e38c2b9bd302334a501a06fc69c8',
  null,
  null,
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '43a9de97-9d1c-48bf-9d26-4a434f25f404',
  'cb5d613d-7885-48a4-8d55-c127cd795d61',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« La loi condamne-t-elle le racisme systémique en France ? » — The Conversation (28 juin 2020)',
  'Lionel Zevounou — Université Paris Nanterre',
  '2020-06-28',
  'CITATION_EXACTE'::quote_kind,
  'Le racisme systémique ne constitue pas, en droit français, une catégorie juridique.',
  'Analyse juridique : le racisme « systémique » n''est pas une catégorie du droit français. Ce que le droit réprime, ce sont des discriminations et des actes identifiables — que l''auteur retrouve jusque dans des formes collectives (traitement des chibanis à la SNCF, pensions des tirailleurs dits sénégalais). Loin de soutenir la thèse « anti-blancs », ce texte pose la borne lexicographique : parler de « système », c''est quitter le terrain du droit pour celui de la sociologie — et aucun des deux champs n''établit de pénalité structurelle contre la population majoritaire.',
  'https://theconversation.com/la-loi-condamne-t-elle-le-racisme-systemique-en-france-141237',
  null,
  '9d0c2264fab8a0b698bc66a7109f6b8e1245b2376ecd83ccbffaa1cd58fc5008',
  null,
  'https://fr.wikipedia.org/wiki/The_Conversation',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'db688f63-2638-4ba4-9a35-79a93206edfa',
  'cb5d613d-7885-48a4-8d55-c127cd795d61',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Où se logent les inégalités de logement liées à l''origine ? » — Ined, document de travail issu de l''enquête Trajectoires et origines (TeO2)',
  'Ined — enquête Trajectoires et origines (Ined/Insee)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Les immigrés et leurs descendants habitent les zones géographiques les plus tendues et sont de ce fait surexposées à la crise du logement.',
  'L''enquête Trajectoires et origines (Ined/Insee) documente les inégalités de logement : les immigrés et leurs descendants « habitent les zones géographiques les plus tendues », subissent la sélection des quartiers disqualifiés, la suroccupation et des conditions dégradées. La littérature officielle sur les inégalités liées à l''origine décrit un désavantage des minorités visibles ; la population majoritaire n''y figure jamais côté perdant, faute de matière statistique.',
  'https://www.ined.fr/fr/publications/editions/document-travail/ou-se-logent-les-inegalites-de-logement-liees-a-origine',
  null,
  'ef91e18b7a3712d36396cb94ba67800f4e9e27946bfff17ae316030860577dd6',
  null,
  'https://www.ined.fr/',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'b911580d-862d-46a1-8d25-ac45e42eca74',
  'cb5d613d-7885-48a4-8d55-c127cd795d61',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  '« Le mythe de la France raciste (2). De l''échec du racialisme à la naissance du mythe » — Fondapol, note n° 254 (avril 2025)',
  'Vincent Tournier — Fondation pour l''innovation politique (Fondapol)',
  '2025-04-22',
  'CITATION_EXACTE'::quote_kind,
  'Situer le racisme systémique sur le terrain du mythe permet d''en comprendre les ressors intellectuels et de saisir les risques que recèle cette théorie en cette période de tensions autour de l''immigration et de la place des minorités.',
  'Le think tank libéral fait du « racisme systémique » un mythe contemporain et documente un pays « à l''hostilité structurelle envers le racisme » : selon les séries de la CNCDH, « la part de la population qui se déclare raciste est faible » — même en incluant les « un peu » racistes — et la part des Français croyant à des « races supérieures » se limite à 10 %. Le second volume compare les trajectoires françaises et américaines : difficile d''y lire, comme le voudrait la thèse « anti-blancs », un système anti-majoritaire.',
  'https://www.fondapol.org/app/uploads/2025/04/254_tournier_fr_tome-2_2025-04-22_w.pdf',
  null,
  '511b646b873f4b289516723d17d5d198f5d8cbd9d67bb75122613b3f99ea4b4c',
  null,
  'https://fr.wikipedia.org/wiki/Fondation_pour_l%27innovation_politique',
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '70f1a470-0aa4-469a-b80c-ed89066277f1',
  'cb5d613d-7885-48a4-8d55-c127cd795d61',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  '« L''accusation de racisme systémique, un outil de domination au service d''émanations politiques du Sud global en Occident » — Causeur (13 avril 2026)',
  'David Duquesne — Causeur',
  '2026-04-13',
  'CITATION_EXACTE'::quote_kind,
  'Les lectures actuelles du racisme en France imposent une vision réductrice et idéologique, qui remplace l''universalisme républicain et la responsabilité individuelle par une logique de groupes, de culpabilité collective et de confrontations identitaires.',
  'Tribune conservatrice sur le moment politique : l''accusation de racisme systémique « ne vient pas éclairer le réel : elle le reconfigure, elle le redéfinit, elle l''enferme dans une interprétation unique » — jusqu''à présenter la société française comme « fondamentalement structurée par le racisme », non par des tensions ou des injustices mais « une essence ». La critique porte sur l''usage politique du concept et son instrumentalisation réciproque ; elle rejoint, depuis l''autre bord, le constat universitaire : la catégorie ne décrit pas un système objectivable.',
  'https://www.causeur.fr/l-accusation-de-racisme-systemique-un-outil-de-domination-au-service-demanations-politiques-du-sud-global-en-occident-325398',
  null,
  'd5746c3e3c0a31d91143f8dd386a43c4acd424865463a8df755fc658b37a4c24',
  null,
  'https://fr.wikipedia.org/wiki/Causeur',
  9
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '8c978a5e-4ec2-49a8-a52f-61d36cd55f27',
  'cb5d613d-7885-48a4-8d55-c127cd795d61',
  'GAUCHE'::political_spectrum,
  '« Le « racisme anti-Blancs » n''existe pas » — Presse-toi à gauche (15 avril 2025)',
  'Pierre Jacquemain — Presse-toi à gauche',
  '2025-04-15',
  'CITATION_EXACTE'::quote_kind,
  'Le racisme anti-Blancs n''existe pas pour les sciences sociales, ça n''a pas de sens. En revanche, c''est très présent dans le discours public, on en parle beaucoup : il y a un écart entre ce que racontent les disciplines scientifiques et ce dont on parle dans le débat public.',
  'Le sociologue Éric Fassin, cité par la tribune de gauche : le racisme anti-Blancs « n''existe pas pour les sciences sociales, ça n''a pas de sens » — tout en constatant l''écart entre les disciplines scientifiques et le débat public, où l''expression prospère. Le texte rappelle les asymétries concrètes (contrôles, emploi, discriminations) qui expliquent ce refus. De la droite critique à la gauche universitaire, les lectures s''opposent sur presque tout, mais convergent : la prémisse « anti-blancs systémique » ne décrit rien de structurel.',
  'https://www.pressegauche.org/Le-racisme-anti-Blancs-n-existe-pas',
  null,
  '83fbe254a3fe6f3674f745648f3b1cdff2c100640f257fa13d69063ec8978cb1',
  null,
  null,
  10
);

delete from public.dossiers where slug = 'colonies-israeliennes-illegales-droit-international-icj';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  'a1929cca-6f05-4428-9111-a111c0b004fc',
  'colonies-israeliennes-illegales-droit-international-icj',
  'Les colonies israéliennes en Cisjordanie et à Jérusalem-Est ne sont pas illégales au regard du droit international',
  'CONTRAIRE_AU_DROIT_INTERNATIONAL'::verdict_status,
  'Présentées parfois comme de simples faits accomplis ou des litiges négociables, les colonies israéliennes implantées dans les territoires occupés depuis 1967 relèvent d''une interdiction explicite du droit international humanitaire — et aucune autorité compétente ne soutient la thèse de leur licéité.

Le texte de base est sans ambiguïté : « La Puissance occupante ne pourra procéder à la déportation ou au transfert d''une partie de sa propre population civile dans le territoire occupé par elle » (quatrième convention de Genève, article 49, sixième alinéa, 1949). Le Conseil de sécurité l''a réaffirmé le 23 décembre 2016 : « Réaffirme que la création par Israël de colonies de peuplement dans le Territoire palestinien occupé depuis 1967, y compris Jérusalem-Est, n''a aucun fondement en droit et constitue une violation flagrante du droit international » (résolution 2334) — et « Souligne qu''il ne reconnaîtra aucune modification aux frontières du 4 juin 1967 ».

Le 19 juillet 2024, la Cour internationale de justice a scellé l''analyse : « À la lumière de ce qui précède, la Cour réaffirme que les colonies israéliennes en Cisjordanie et à Jérusalem-Est, et le régime qui leur est associé ont été établis et sont maintenus en violation du droit international » (par. 155). Son dispositif « Est d''avis que la présence continue de l''État d''Israël dans le Territoire palestinien occupé est illicite » (onze voix contre quatre) et que « l''État d''Israël est dans l''obligation de cesser immédiatement toute nouvelle activité de colonisation, et d''évacuer tous les colons du Territoire palestinien occupé ».

Aucune autorité ne soutient la thèse inverse. Le CICR rattache la colonisation à la violation de « l''article 49, paragraphe 6, de la quatrième Convention de Genève » ; le Haut-Commissariat de l''ONU aux droits de l''homme qualifie ces transferts de « war crime that may engage the individual criminal responsibility of those involved » ; l''Union européenne exige « to cease immediately all new settlement activities, and to evacuate all settlers » et réaffirme son « unwavering commitment to all ICJ decisions » ; la France, qui a voté la résolution endossant l''avis, parle d''une colonisation « en violation totale du droit international ». Le gouvernement israélien conteste — « Aucune décision mensongère à La Haye ne peut déformer la vérité historique » — mais politiquement : sur le terrain du droit, la controverse n''existe pas.',
  'INTERNATIONAL'::dossier_category,
  '[{"name":"Cour internationale de justice","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Cour_internationale_de_justice","note":"Principal organe judiciaire de l''ONU, siégeant à La Haye : son avis consultatif du 19 juillet 2024 constate l''illicéité de la présence israélienne et l''obligation d''évacuer les colons."},{"name":"Quatrième convention de Genève","kind":"TEXTE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Quatri%C3%A8me_convention_de_Gen%C3%A8ve","note":"Signée le 12 août 1949 : son article 49, sixième alinéa, interdit à la puissance occupante de transférer sa propre population civile dans le territoire occupé."},{"name":"Résolution 2334 du Conseil de sécurité","kind":"TEXTE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/R%C3%A9solution_2334_du_Conseil_de_s%C3%A9curit%C3%A9_des_Nations_unies","note":"Adoptée le 23 décembre 2016 : elle déclare les colonies sans fondement en droit et sert de base à la « différenciation » appliquée par l''Union européenne."},{"name":"Benyamin Netanyahou","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Benyamin_Netanyahou","note":"Premier ministre israélien : il conteste publiquement l''avis — « Les Juifs ne sont pas des occupants sur leur propre terre » — sans produire d''analyse juridique contraire."},{"name":"Colonies israéliennes","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Colonies_isra%C3%A9liennes","note":"Implantations civiles établies en Cisjordanie et à Jérusalem-Est depuis 1967 : environ 300 colonies et avant-postes, près de 500 000 résidents selon Peace Now."}]'::jsonb,
  100,
  '[{"claim_part":"« Le statut de ces territoires n''est pas celui de zones occupées »","status":"FAUX","detail":"Cisjordanie et Jérusalem-Est sont des territoires occupés au sens du droit : la résolution 2334 s''ouvre sur un « Réaffirmant qu''Israël, Puissance occupante, est tenu de respecter scrupuleusement ses obligations et responsabilités juridiques découlant de la quatrième Convention de Genève », et l''avis de 2024 constate que « la présence continue de l''État d''Israël dans le Territoire palestinien occupé est illicite » — un constat qui présuppose l''occupation. Le déni de statut contredit soixante ans de résolutions et deux avis consultatifs de la CIJ."},{"claim_part":"« Le transfert de population civile est autorisé par le droit des conflits »","status":"VIOLATION_FORMELLE","detail":"Le sixième alinéa de l''article 49 de la quatrième convention de Genève est la disposition exacte qui interdit à l''occupant d''installer sa propre population dans le territoire occupé ; la Cour y voit la norme violée par la colonisation, en 2004 comme en 2024. Le CICR — gardien des conventions — constate que « l''établissement par Israël de colonies civiles en Cisjordanie occupée et leur expansion sont incompatibles avec l''obligation faite à Israël par l''article 49, paragraphe 6 ». Présenter ce transfert comme autorisé, c''est contredire le texte exprès du droit des conflits : une violation formelle."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-16T00:00:00.000Z'::timestamptz,
  '/illustrations/colonies-israeliennes-illegales-droit-international-icj.jpg',
  'Photo : Palais de la Paix, siège de la Cour internationale de justice (La Haye) — Cour internationale de justice, Wikimedia Commons (domaine public)'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'f1b5dfa3-696e-4eda-a129-8f7e3e808d6b',
  'a1929cca-6f05-4428-9111-a111c0b004fc',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  '« Quatrième convention de Genève — article 49, sixième alinéa » — base de données des traités de DIH du CICR (12 août 1949)',
  'Comité international de la Croix-Rouge — base IHL/DIH',
  '1949-08-12',
  'CITATION_EXACTE'::quote_kind,
  'La Puissance occupante ne pourra procéder à la déportation ou au transfert d''une partie de sa propre population civile dans le territoire occupé par elle.',
  'Le sixième alinéa de l''article 49 est la disposition sur laquelle repose tout le dossier : elle interdit à la puissance occupante d''installer sa propre population dans le territoire qu''elle occupe — distincte du premier alinéa, qui prohibe les transferts forcés de personnes protégées. La Cour internationale de justice l''a citée mot pour mot en 2004 puis en 2024 (par. 115). La base IHL du CICR bloquant les accès automatisés, la citation a été vérifiée sur la reproduction intégrale du texte dans l''avis consultatif de la CIJ du 19 juillet 2024.',
  'https://ihl-databases.icrc.org/fr/ihl-treaties/gciv-1949/article-49',
  null,
  '769058cdee6b8b91c4b3c7c62d6f38bd5b08ab5eee56d4317994fb230d9d092a',
  null,
  'https://fr.wikipedia.org/wiki/Comit%C3%A9_international_de_la_Croix-Rouge',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'faebfc3b-5b7e-43e5-844c-2dd91301e582',
  'a1929cca-6f05-4428-9111-a111c0b004fc',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  '« Résolution 2334 (2016) » — Conseil de sécurité des Nations unies (23 décembre 2016)',
  'Conseil de sécurité des Nations unies',
  '2016-12-23',
  'CITATION_EXACTE'::quote_kind,
  'Réaffirme que la création par Israël de colonies de peuplement dans le Territoire palestinien occupé depuis 1967, y compris Jérusalem-Est, n''a aucun fondement en droit et constitue une violation flagrante du droit international et un obstacle majeur à la réalisation de la solution des deux États et à l''instauration d''une paix globale, juste et durable.',
  'Adoptée le 23 décembre 2016 — les États-Unis s''abstenant, sans veto — la résolution réaffirme le statut illicite du peuplement ; son paragraphe 3 souligne qu''aucune « modification aux frontières du 4 juin 1967 » ne sera reconnue. Sa version anglaise (« has no legal validity and constitutes a flagrant violation under international law ») fonde la politique de « différenciation » appliquée par l''Union européenne et la France. Citation vérifiée sur les reproductions du texte officiel.',
  'https://www.un.org/unispal/document/unsc-resolution-2334-illegality-israeli-settlements/',
  null,
  'a6c6c9eb8784e08558f0f6e08132e03deeeaa789423bbf4d6f3241fb6e8e8095',
  null,
  'https://fr.wikipedia.org/wiki/Conseil_de_s%C3%A9curit%C3%A9_des_Nations_unies',
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '349810a9-96c5-430b-9e04-d02da04359c7',
  'a1929cca-6f05-4428-9111-a111c0b004fc',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Conséquences juridiques découlant des politiques et pratiques d''Israël dans le Territoire palestinien occupé, y compris Jérusalem-Est » — avis consultatif du 19 juillet 2024, Cour internationale de justice',
  'Cour internationale de justice (Nations unies)',
  '2024-07-19',
  'CITATION_EXACTE'::quote_kind,
  'À la lumière de ce qui précède, la Cour réaffirme que les colonies israéliennes en Cisjordanie et à Jérusalem-Est, et le régime qui leur est associé ont été établis et sont maintenus en violation du droit international.',
  'Paragraphe 155 de l''avis, dont le dispositif est sans équivoque : « Est d''avis que la présence continue de l''État d''Israël dans le Territoire palestinien occupé est illicite » (onze voix contre quatre), obligation « de cesser immédiatement toute nouvelle activité de colonisation, et d''évacuer tous les colons », et « de mettre fin à sa présence illicite [...] dans les plus brefs délais ». La Cour y voit la violation du sixième alinéa de l''article 49 de la quatrième convention de Genève et écarte les objections de procédure. Vérifié sur le texte intégral français de l''avis (reproduction officielle).',
  'https://www.icj-cij.org/case/186',
  null,
  'dd49828dadc973b1104ce6b1933b6a7668043cab7154708a2053258326eee5fe',
  null,
  'https://fr.wikipedia.org/wiki/Cour_internationale_de_justice',
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'ddba180e-38e5-4e42-872e-8ea6da051bfd',
  'a1929cca-6f05-4428-9111-a111c0b004fc',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  '« Conséquences juridiques découlant des politiques et pratiques d''Israël dans le Territoire palestinien occupé — résumé de l''avis consultatif du 19 juillet 2024 » — Recueil des résumés, Nations unies (bureau des affaires juridiques)',
  'Organisation des Nations unies — bureau des affaires juridiques (codification)',
  '2024-07-19',
  'CITATION_EXACTE'::quote_kind,
  'Par onze voix contre quatre, Est d''avis que la présence continue de l''État d''Israël dans le Territoire palestinien occupé est illicite.',
  'Le résumé officiel des Nations unies reprend le dispositif : présence illicite, obligation de « mettre fin [...] dans les plus brefs délais », évacuation des colons, réparation intégrale des dommages (par. 269). C''est la lecture consolidée de l''avis publiée sous l''autorité du bureau des affaires juridiques de l''ONU.',
  'https://legal.un.org/icjsummaries/documents/french/271.pdf',
  null,
  '7dac81258e5146022ceb95a156f1f15cfa9fbf16b3895d58b8f694924c443073',
  null,
  'https://fr.wikipedia.org/wiki/Organisation_des_Nations_unies',
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '1e27841c-c2bf-44b0-aff2-5cad3d0cbfa8',
  'a1929cca-6f05-4428-9111-a111c0b004fc',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« Israeli settlements in the Occupied Palestinian Territory, including East Jerusalem, and in the occupied Syrian Golan » — rapport du Haut-Commissaire aux droits de l''homme (mars 2024)',
  'Volker Türk, Haut-Commissariat des Nations unies aux droits de l''homme',
  null,
  'CITATION_EXACTE'::quote_kind,
  'The establishment and continuing expansion of settlements in the Occupied Palestinian Territory and the occupied Syrian Golan amount to the transfer by Israel of its own civilian population into the territories that it occupies, which is strictly prohibited under international humanitarian law. Such transfers amount to a war crime that may engage the individual criminal responsibility of those involved.',
  'Le rapport présenté au Conseil des droits de l''homme documente environ 700 000 colons et 300 implantations et rappelle que le transfert de population civile est « strictly prohibited » par le droit international humanitaire — au point d''engager la responsabilité pénale individuelle. Citation en anglais, langue du document.',
  'https://www.ohchr.org/sites/default/files/2024-03/Palestine-March2024.pdf',
  null,
  '505c79ea2fe2023f45c1e2275101d66e4a88b18ee0e09681829d3adbd47c5299',
  null,
  'https://fr.wikipedia.org/wiki/Haut-Commissariat_des_Nations_unies_aux_droits_de_l%27homme',
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'dafe9ac4-22c1-4153-92b6-4071c8fbff72',
  'a1929cca-6f05-4428-9111-a111c0b004fc',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« Israël et le territoire palestinien occupé : le droit de l''occupation doit être respecté » — déclaration du CICR (19 juillet 2024)',
  'Comité international de la Croix-Rouge',
  '2024-07-19',
  'CITATION_EXACTE'::quote_kind,
  'Selon la position juridique définie de longue date par le CICR, l''établissement par Israël de colonies civiles en Cisjordanie occupée et leur expansion sont incompatibles avec l''obligation faite à Israël par l''article 49, paragraphe 6, de la quatrième Convention de Genève de 1949, lequel interdit le transfert d''une partie de la population civile de la Puissance occupante dans le territoire qu''elle occupe.',
  'Gardien des conventions de Genève, le CICR rappelle sa position de longue date sur la colonisation et les conséquences humanitaires documentées : expropriation et destruction de biens, déplacement de Palestiniens, violences de colons. C''est l''une des rares institutions dont l''autorité en droit international humanitaire n''est contestée par personne.',
  'https://www.icrc.org/fr/statement/Israel-et-territoire-palestinien-occupe-droit-occupation-doit-etre-respecte',
  null,
  '1788f85c13266709570f169164e8be8e2cec9ed10aa52c1c683efce2fdaf57b1',
  null,
  'https://fr.wikipedia.org/wiki/Comit%C3%A9_international_de_la_Croix-Rouge',
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '7c01ded8-5544-42b8-9498-36578c57616a',
  'a1929cca-6f05-4428-9111-a111c0b004fc',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  '« La CIJ déclare que l''occupation des territoires palestiniens par Israël est illégale » — ONU Info (19 juillet 2024)',
  'ONU Info — Nations unies',
  '2024-07-19',
  'CITATION_EXACTE'::quote_kind,
  'La Cour internationale de Justice (CIJ), le principal organe judiciaire des Nations Unies, a déclaré vendredi que l''occupation par Israël de la Cisjordanie, de Gaza, et de Jérusalem-Est, ainsi que ses colonies, violaient le droit international.',
  'Le service d''information de l''ONU résume l''avis qui, « bien que non contraignant, a une haute valeur juridique ainsi qu''une grande autorité morale », et rappelle la saisine de la Cour par l''Assemblée générale (résolution 77/247).',
  'https://news.un.org/fr/story/2024/07/1147211',
  null,
  'a51527f1eb0ec6bb815574e3c9d5aa755b845cc2f77e6f59c14410a1be505d85',
  null,
  'https://fr.wikipedia.org/wiki/Organisation_des_Nations_unies',
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '0ac038f9-1617-4690-8e59-8d2e8e241e83',
  'a1929cca-6f05-4428-9111-a111c0b004fc',
  'CENTRE'::political_spectrum,
  '« Israel/Palestine: Statement by the High Representative on the Advisory Opinion of the International Court of Justice » — Service européen pour l''action extérieure (20 juillet 2024)',
  'Josep Borrell, haut représentant — Service européen pour l''action extérieure',
  '2024-07-20',
  'CITATION_EXACTE'::quote_kind,
  'the State of Israel is under an obligation to cease immediately all new settlement activities, and to evacuate all settlers from the Occupied Palestinian Territory',
  'L''Union européenne « takes good note » de l''avis, en retient les trois conclusions — présence illicite, fin de la colonisation, non-reconnaissance par les États — et réaffirme « our unwavering commitment to all ICJ decisions » : « These conclusions are largely consistent with EU positions. » Citation en anglais, langue du communiqué.',
  'https://www.eeas.europa.eu/eeas/israelpalestine-statement-high-representative-advisory-opinion-international-court-justice_en',
  null,
  '43a2331e5abd8bb700285618bf8d95dc2eb33a52104351822aa5ca5611fac7d6',
  null,
  'https://fr.wikipedia.org/wiki/Service_europ%C3%A9en_pour_l%27action_ext%C3%A9rieure',
  8
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'ec536bee-d0d4-421f-a755-1a091d87799c',
  'a1929cca-6f05-4428-9111-a111c0b004fc',
  'CENTRE'::political_spectrum,
  '« Foreign Affairs Council: press remarks by High Representative Josep Borrell upon arrival » — Service européen pour l''action extérieure (22 juillet 2024)',
  'Josep Borrell, haut représentant — Service européen pour l''action extérieure',
  '2024-07-22',
  'CITATION_EXACTE'::quote_kind,
  'the occupation of the West Bank - the Palestinian territories in the West Bank - is fully illegal, and it has to stop',
  'À son arrivée au Conseil des affaires étrangères, le haut représentant durcit le ton — « This is illegal, it has to stop. Israel has to withdraw its settlements » — et constate que « The difference between what the law says [...] and what is happening in the ground, has never been as big as today ». Citation en anglais, langue du point presse.',
  'https://www.eeas.europa.eu/eeas/foreign-affairs-council-press-remarks-high-representative-josep-borrell-upon-arrival-20_en',
  null,
  'be4314455ab64eb749e8f1c21cc853f44a45c2a64b82923d0bd3ee7e3c2498ee',
  null,
  'https://fr.wikipedia.org/wiki/Service_europ%C3%A9en_pour_l%27action_ext%C3%A9rieure',
  9
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'd46547b6-5a89-4965-8040-57ae627384e4',
  'a1929cca-6f05-4428-9111-a111c0b004fc',
  'CENTRE'::political_spectrum,
  '« Q&R — Point de presse live (19 février 2026) » — ministère de l''Europe et des Affaires étrangères',
  'Ministère de l''Europe et des Affaires étrangères (France)',
  '2026-02-19',
  'CITATION_EXACTE'::quote_kind,
  'la colonisation israélienne se poursuit en Cisjordanie, en violation totale du droit international',
  'Paris rappelle qu''il a « par conséquent voté la résolution [...] du 18 septembre 2024, endossant l''avis consultatif de la CIJ du 19 juillet 2024 » et qu''il met en œuvre la « politique de différenciation » prévue par la résolution 2334 — dont l''étiquetage des denrées issues des colonies. La position officielle française ne ménage aucune ambiguïté sur la qualification.',
  'https://www.diplomatie.gouv.fr/fr/presse-et-ressources/decouvrir-et-informer/actualites/qr-point-de-presse-live-19-fevrier-2026',
  null,
  '76d215b73e2041ff164e11bff6bf47981c15d073580b38981932f57e4f7e4867',
  null,
  'https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_l%27Europe_et_des_Affaires_%C3%A9trang%C3%A8res',
  10
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'd284ed2f-b95f-471d-b59f-17b3ed433703',
  'a1929cca-6f05-4428-9111-a111c0b004fc',
  'CENTRE'::political_spectrum,
  '« L''occupation de territoires palestiniens par Israël est « illégale », tranche la Cour internationale de Justice » — franceinfo (19 juillet 2024)',
  'franceinfo — France Télévisions',
  '2024-07-19',
  'CITATION_EXACTE'::quote_kind,
  'L''occupation de territoires palestiniens par Israël depuis 1967 est « illégale », a estimé la Cour internationale de Justice (CIJ), vendredi 19 juillet.',
  'Le média public rappelle le décompte de terrain — « Près de 500 000 personnes vivent aujourd''hui en Cisjordanie [...] et se répartissent sur 300 colonies, selon l''ONG israélienne Peace Now » — et relaie la réaction de Benyamin Nétanyahou : « Les Juifs ne sont pas des occupants sur leur propre terre », « la légalité des colonies israéliennes » ne pouvant être « contestée ».',
  'https://www.franceinfo.fr/monde/israel/l-occupation-de-territoires-palestiniens-par-israel-est-illegale-tranche-la-cour-internationale-de-justice_6675540.html',
  null,
  'f92260000d765d75b0c0e8eae20c860ee328e1bbc2e70316c2c8cc5f40208090',
  null,
  'https://fr.wikipedia.org/wiki/France_Info',
  11
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'cd848c78-71f6-4636-8398-a7f48e6757c5',
  'a1929cca-6f05-4428-9111-a111c0b004fc',
  'GAUCHE'::political_spectrum,
  '« L''occupation des territoires palestiniens jugée « illégale » par la Cour internationale de justice » — L''Humanité (19 juillet 2024)',
  'L''Humanité',
  '2024-07-19',
  'CITATION_EXACTE'::quote_kind,
  'Cette décision représente « une victoire », s''est félicitée la présidence palestinienne, demandant à Israël de « mettre fin à l''occupation » et aux « colonies ».',
  'La presse de gauche relaie les réactions des deux camps — du Hadash, qui y voit « un tournant », aux responsables israéliens qui contestent la décision — sans qu''aucune partie ne discute l''analyse juridique sur le fond : la controverse qui s''affiche est politique.',
  'https://www.humanite.fr/monde/cour-internationale-de-justice/loccupation-des-territoires-palestiniens-jugee-illegale-par-la-cour-internationale-de-justice',
  null,
  '23ec542007ebdacce4f01d5d58e0938c4da913a79b0d40f2bd17d2eb5b2c415b',
  null,
  'https://fr.wikipedia.org/wiki/L%27Humanit%C3%A9',
  12
);

delete from public.dossiers where slug = 'notes-frais-parlementaires-transparence-cadre-juridique';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '31df5da4-9ae0-401d-9a83-aad71d7b1ad0',
  'notes-frais-parlementaires-transparence-cadre-juridique',
  'Les citoyens ont un droit légal absolu de publier le détail nominatif de toutes les notes de frais des parlementaires',
  'CADRE_REGLEMENTAIRE_RESTREINT'::verdict_status,
  'La transparence des frais de mandat est réelle, mais canalisée : depuis la loi n° 2017-1339 du 15 septembre 2017, l''IRFM forfaitaire a cédé la place à une avance de frais de mandat et à des remboursements sur justificatifs, contrôlés par les organes de déontologie des deux assemblées — compte bancaire dédié, transmission annuelle des relevés, contrôles par tirage au sort et contrôle du solde de fin de mandat.

En revanche, aucun droit ne donne accès au détail nominatif de ces dépenses : les documents des assemblées parlementaires ne sont pas des documents administratifs (avis de la CADA du 21 septembre 2017 ; Conseil d''État, 7 mars 2025) et leur communication relève de l''ordonnance n° 58-1100 du 17 novembre 1958 — donc des chambres elles-mêmes, qui refusent, invoquant des contrôles déjà effectués et la protection de la vie privée.

L''accès citoyen reste donc fermé par le régime spécial : la CADA acte que « l''accès à ces documents restera régi par le régime spécial de communication des actes des assemblées parlementaires », quand le déontologue de l''Assemblée, lui, exige « l''ensemble des relevés bancaires » annuels des députés.',
  'POLITIQUE'::dossier_category,
  '[{"name":"Assemblée nationale","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Assembl%C3%A9e_nationale_(France)","note":"Les frais de mandat de ses membres sont contrôlés par un déontologue indépendant ; les documents qu''elle produit restent hors du champ du droit d''accès aux documents administratifs (avis de la CADA du 21 septembre 2017)."},{"name":"Sénat","kind":"ORGANISATION","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)","note":"Le contrôle des frais de mandat y est assuré par un comité de déontologie composé de sénateurs ; septième campagne de contrôle des dépenses menée en 2025."},{"name":"Commission d''accès aux documents administratifs","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Commission_d%27acc%C3%A8s_aux_documents_administratifs","note":"Saisie en 2017 par l''association Regards Citoyens, elle s''est déclarée incompétente pour connaître des relevés du compte de frais de mandat d''un député."},{"name":"Conseil d''État","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)","note":"A jugé le 7 mars 2025 que les demandes de communication adressées aux assemblées sont exclusivement régies par l''ordonnance du 17 novembre 1958, tout en confirmant le 23 juillet 2025 la communicabilité des notes de frais d''un élu local."},{"name":"Yaël Braun-Pivet","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Ya%C3%ABl_Braun-Pivet","note":"Présidente de l''Assemblée nationale : elle revendique des contrôles internes déjà effectués et invoque la protection de la vie privée face aux demandes de communication des justificatifs."},{"name":"Gérard Larcher","kind":"PERSONNE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/G%C3%A9rard_Larcher","note":"Président du Sénat : refuse, comme l''Assemblée nationale, la communication des notes de frais des parlementaires."},{"name":"Lois pour la confiance dans la vie politique","kind":"TEXTE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Lois_pour_la_confiance_dans_la_vie_politique","note":"La loi n° 2017-1339 du 15 septembre 2017 supprime l''IRFM et organise le nouveau régime de prise en charge des frais de mandat (article 20)."}]'::jsonb,
  95,
  '[{"claim_part":"« N''importe quel citoyen peut exiger et diffuser publiquement chaque facture nominative de député »","status":"CONFUSION_CONCEPTUELLE","detail":"La transparence des frais de mandat passe par des contrôles institutionnels internes, pas par un droit d''accès du public : la CADA s''est déclarée incompétente (avis du 21 septembre 2017) et le Conseil d''État juge que « les demandes de communication de documents adressées aux assemblées parlementaires sont exclusivement régies par l''ordonnance du 17 novembre 1958 » (décision n° 493051 du 7 mars 2025). Les notes de frais d''un élu local, elles, sont bien communicables (Conseil d''État, 23 juillet 2025) — d''où la confusion, mais les deux régimes ne se confondent pas."},{"claim_part":"« Les notes de frais des parlementaires échappent totalement à tout contrôle externe »","status":"FAUX","detail":"Le régime issu de 2017 a doté les assemblées d''organes de contrôle : le déontologue de l''Assemblée impose un compte bancaire dédié, la transmission annuelle des relevés et des contrôles par échantillon — « moins de 1 % » des avances de la précédente législature a donné lieu à remboursement ; au Sénat, le Comité de déontologie a enregistré en 2024 149 685 justificatifs pour 29,9 millions d''euros de frais déclarés. C''est la publicité des pièces, non leur contrôle, qui est restreinte."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-16T00:00:00.000Z'::timestamptz,
  '/illustrations/notes-frais-parlementaires-transparence-cadre-juridique.jpg',
  'Photo : DXR, Wikimedia Commons, domaine public'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'acfab903-fd1f-44f2-8753-ac54dd80f1fd',
  '31df5da4-9ae0-401d-9a83-aad71d7b1ad0',
  'ARCHIVE_PRIMAIRE'::political_spectrum,
  'Ordonnance n° 58-1100 du 17 novembre 1958 — article 4 sexies',
  'Légifrance (République française)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Le bureau de chaque assemblée, après consultation de l''organe chargé de la déontologie parlementaire, définit le régime de prise en charge des frais de mandat et arrête la liste des frais éligibles. Les députés et sénateurs sont défrayés sous la forme d''une prise en charge directe, d''un remboursement sur présentation de justificatifs ou du versement d''une avance par l''assemblée dont ils sont membres, dans la limite des plafonds déterminés par le bureau.',
  'Texte en vigueur de l''ordonnance relative au fonctionnement des assemblées parlementaires, dans sa rédaction issue de la loi n° 2017-1339 du 15 septembre 2017 (modifiée en dernier lieu par la loi n° 2020-1721 du 29 décembre 2020) : le régime des frais de mandat est défini par le bureau de chaque assemblée, sous le contrôle de son organe de déontologie. Aucun droit d''accès ni publication d''office pour les tiers : c''est la base légale du cadre restreint. Légifrance bloque les accès automatisés ; texte vérifié sur la version consolidée archivée.',
  'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000705067/',
  null,
  '849fcc2e2cb955ceb7065e45e7427d20b9d1456312da078e4db23b8ca453d8ee',
  null,
  null,
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '5946ece4-dc6f-4ed3-a9eb-4ad6bb13a689',
  '31df5da4-9ae0-401d-9a83-aad71d7b1ad0',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Avis n° 20173715 — frais de mandat d''un député (IRFM)',
  'Commission d''accès aux documents administratifs (CADA)',
  '2017-09-21',
  'CITATION_EXACTE'::quote_kind,
  'La commission ne peut donc que se déclarer incompétente pour se prononcer sur la demande.',
  'Avis rendu le 21 septembre 2017, saisi par l''association Regards Citoyens après le refus d''un député de communiquer les relevés de son compte IRFM et sa déclaration sur l''honneur : la commission rappelle que « la communication des actes et des documents produits ou reçus par les assemblées parlementaires est régie par l''ordonnance n° 58-1100 », pour l''interprétation de laquelle elle n''est pas compétente, et juge que l''exercice d''un mandat parlementaire, s''il est une mission d''intérêt général, n''est pas une mission de service public au sens de l''article L. 300-2 du code des relations entre le public et l''administration.',
  'https://cada.data.gouv.fr/20173715/',
  null,
  'b57f8c05a9e85eaf419bfc56abba4cb1eb4a480d4d26d583988934b53b054d17',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '52ab243d-e45f-495e-82e2-475983856b52',
  '31df5da4-9ae0-401d-9a83-aad71d7b1ad0',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Décision n° 493051 du 7 mars 2025 — documents des assemblées',
  'Conseil d''État (France)',
  '2025-03-07',
  'CITATION_EXACTE'::quote_kind,
  'Il résulte de l''ensemble de ces dispositions, en premier lieu, que les demandes de communication de documents adressées aux assemblées parlementaires sont exclusivement régies par l''ordonnance du 17 novembre 1958 relative au fonctionnement des assemblées parlementaires.',
  'Rendue sur pourvoi de l''association CAP pour la liberté de conscience, à propos de documents des Renseignements généraux transmis à une commission d''enquête parlementaire : le Conseil d''État pose la règle générale — les demandes adressées aux assemblées relèvent exclusivement de l''ordonnance de 1958, et les documents qu''elles produisent ou reçoivent sont des documents parlementaires, non des documents administratifs communicables au titre du CRPA. C''est la jurisprudence de référence du débat sur la communication des frais de mandat.',
  'https://www.conseil-etat.fr/fr/arianeweb/CE/decision/2025-03-07/493051',
  null,
  '09bb055f0cfa1952ac70618e06458dccb59f5116384f1f34022c789c32476782',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '03bd0f09-fbc0-44d2-b442-8f73c35d7ed9',
  '31df5da4-9ae0-401d-9a83-aad71d7b1ad0',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Décision n° 495393 du 23 juillet 2025 — notes de frais d''un élu local',
  'Conseil d''État (France)',
  '2025-07-23',
  'CITATION_EXACTE'::quote_kind,
  'Des notes de frais et reçus de déplacements ainsi que des notes de frais de restauration et reçus de frais de représentation d''élus locaux ou d''agents publics constituent des documents administratifs, communicables à toute personne qui en fait la demande dans les conditions et sous les réserves prévues par les dispositions du code des relations entre le public et l''administration citées au point précédent.',
  'Affaire des notes de frais du président de la région Auvergne-Rhône-Alpes : le Conseil d''État confirme que les justificatifs d''un élu local sont communicables à toute personne qui en fait la demande, sous les seules réserves du CRPA (vie privée, secret des affaires, occultation des mentions non communicables). Le contraste avec les assemblées parlementaires tient au régime spécial de l''ordonnance de 1958, pas à la nature des dépenses — c''est le point de comparaison qui nourrit la confusion chez les demandeurs.',
  'https://www.conseil-etat.fr/fr/arianeweb/CE/decision/2025-07-23/495393',
  null,
  'b8e2dea80d183ff090831f581ef47cfeb6b27e5a181c4f87e870692b5e98efba',
  null,
  null,
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '4913e604-c227-4a75-ad1f-631c34118750',
  '31df5da4-9ae0-401d-9a83-aad71d7b1ad0',
  'CENTRE'::political_spectrum,
  'Rapport public annuel — la déontologie en 2025',
  'Rémi Schenberg, Déontologue de l''Assemblée nationale',
  '2026-05-13',
  'CITATION_EXACTE'::quote_kind,
  'Tout député doit ouvrir un compte bancaire spécifique affecté à la gestion de son AFM (désormais DFP). Il doit transmettre au Déontologue, avant le 31 janvier, l''ensemble des relevés bancaires de l''année précédente (en application de l''article 3 de l''arrêté du Bureau n° 12/XV du 29 novembre 2017 relatif aux frais de mandat des députés).',
  'Rapport remis à la Présidente et au Bureau de l''Assemblée nationale le 13 mai 2026, en application de l''article 80-3 du Règlement : le contrôle de l''usage des fonds repose sur trois modalités complémentaires — tirage au sort en cours de mandat, contrôle du solde de fin de mandat et contrôle annuel des relevés bancaires. Le rapport relève que « moins de 1 % du montant » des avances contrôlées au titre de la précédente législature a fait l''objet de demandes de remboursement, et que 882 des 1 059 sollicitations écrites de députés en 2025 portaient sur l''utilisation des frais de mandat.',
  'https://www.assemblee-nationale.fr/dyn/dyn/contenu/visualisation/1110434/file/Rapport_Deontologue_2025.pdf',
  null,
  'e38aaf5d7f7c43185b3a4f12bb37871904c0a60a60ae1f5e512ae7d8b5e84285',
  null,
  null,
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'ba9ab485-5996-49be-b9b8-8efb20aaa661',
  '31df5da4-9ae0-401d-9a83-aad71d7b1ad0',
  'CENTRE'::political_spectrum,
  'Rapport d''activité 2024-2025 — Comité de déontologie du Sénat',
  'Comité de déontologie du Sénat',
  null,
  'CITATION_EXACTE'::quote_kind,
  'La campagne de contrôle a porté sur les dépenses engagées en 2024 par 362 sénateurs, contre 423 l''an dernier, soit une baisse de 14 %, l''année 2023 ayant été marquée par le renouvellement sénatorial.',
  'Rapport d''activité 2024-2025 du Comité de déontologie (session parlementaire) : septième campagne de contrôle des frais de mandat, menée de février à septembre 2025 — 149 685 justificatifs enregistrés sur l''application Julia (413 par parlementaire en moyenne) et 29,9 millions d''euros de frais déclarés pour 2024, nets des recettes. Le taux moyen de contrôle s''établit à 52,1 % des frais engagés, jusqu''à 86,4 % pour le dossier le plus difficile ; le Comité s''appuie sur une vingtaine d''experts-comptables indépendants.',
  'https://www.senat.fr/fileadmin/cru-1783325159/Organisation_interne/Comite_de_deontologie/Rapports_d_activite/RapportActivite2024-2025.pdf',
  null,
  '74dc7490811cf8f5462329500f773042e602a6f2cbf4d6bda560feecb7a3ca82',
  null,
  null,
  5
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '413937d3-3f88-4576-b66b-754b6e056d2c',
  '31df5da4-9ae0-401d-9a83-aad71d7b1ad0',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'La déontologie parlementaire — thèse de doctorat en droit public',
  'Baptiste Javary, Université Paris Nanterre (CRDP)',
  '2019-11-29',
  'CITATION_EXACTE'::quote_kind,
  'Dans le même temps, les députés sont soumis à un devoir plus contemporain de responsabilité à l''égard des citoyens qu''ils représentent. Ce devoir se traduit par la soumission à de nouvelles exigences d''exemplarité et de transparence dont la méconnaissance peut désormais être sanctionnée.',
  'Thèse de doctorat en droit public soutenue le 29 novembre 2019 à l''Université Paris Nanterre (centre de recherches en droit public), étude comparative de la déontologie parlementaire : le résumé officiel situe la transparence comme une obligation de conduite des élus — une exigence sanctionnable portée par les organes de déontologie des assemblées, distincte d''un droit d''accès du public aux pièces.',
  'https://theses.hal.science/tel-02505723',
  null,
  'be7e5944c5c7f08f9f9f8f98be3480a5c14ae643e4df97e52bcf13a26bf2693c',
  null,
  null,
  6
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'feee8aef-37e7-41f3-a2b6-11aa5fd66176',
  '31df5da4-9ae0-401d-9a83-aad71d7b1ad0',
  'GAUCHE'::political_spectrum,
  'Contrôle des frais de mandat : l''Assemblée s''arrête au milieu du gué',
  'Mathilde Mathieu — Mediapart',
  '2017-11-30',
  'CITATION_EXACTE'::quote_kind,
  'L''Assemblée nationale instaure enfin un contrôle sur les frais des députés. Mais le dispositif dévoilé mercredi 29 novembre reste loin du compte.',
  'Au lendemain de l''arrêté du Bureau du 29 novembre 2017 qui fixe les règles du nouveau régime, Mediapart décrit un contrôle encore incomplet : l''Assemblée a récupéré 3,1 millions d''euros d''IRFM non utilisées par les députés sortants — 313 déclarants, contre 47 en 2012 — selon des chiffres de la questure. La critique de la presse de gauche porte sur la portée du dispositif : un contrôle interne, sans publication ni communication des pièces aux citoyens.',
  'https://www.mediapart.fr/journal/france/301117/controle-des-frais-de-mandat-l-assemblee-s-arrete-au-milieu-du-gue',
  null,
  '63f39b7408042306c1a95f97af8453fefcd696ac2af77c700ac6dd4f12ac65be',
  null,
  null,
  7
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '71b500f9-1134-461d-aac5-be405fc1175f',
  '31df5da4-9ae0-401d-9a83-aad71d7b1ad0',
  'DROITE_LIBERALE_CONSERVATRICE'::political_spectrum,
  'Frais de mandat : les députés restituent plus de 10 millions d''euros aux contribuables — Contribuables Associés (1er juin 2023)',
  'Jean-Baptiste Leon (Contribuables Associés)',
  '2023-06-01',
  'CITATION_EXACTE'::quote_kind,
  'En 2018, après avoir dénoncé plusieurs abus, Contribuables Associés est parvenu à faire supprimer l''Indemnité représentative de frais de mandat (IRFM), dont l''usage n''était pas contrôlé. Elle a été remplacée par une avance sur frais de mandat (AFM), mieux cadrée, et dont l''usage doit être justifié (factures).',
  'Association de contribuables de droite libérale, à l''origine de la suppression de l''IRFM : elle décrit le régime actuel — AFM justifiée sur factures, tolérance de 600 € par mois sans justificatif, contrôles du déontologue, restitution de 10 M€ en 2022 et manquements limités à 1,84 % des dépenses contrôlées. La transparence est réelle mais canalisée : les justificatifs restent contrôlés par les organes de déontologie, sans publication nominative.',
  'https://contribuablesassocies.org/2023/06/01/frais-de-mandat-les-deputes-restituent-plus-de-10-millions-d-euros-aux-contribuables/',
  null,
  '996ad9367b848b55829ec98358454e21873847b05ef24f98aa15cf7260f28d71',
  null,
  'https://fr.wikipedia.org/wiki/Contribuables_associ%C3%A9s',
  8
);

delete from public.dossiers where slug = 'racisme-antiblanc-systemique-afrique-du-sud-mythe';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  'bbfd1745-ddfe-423c-ad08-ce72a8bd9367',
  'racisme-antiblanc-systemique-afrique-du-sud-mythe',
  'Il existe un racisme anti-blanc prédominant et systémique en Afrique du Sud post-Apartheid',
  'FAUX'::verdict_status,
  'La thèse d''un racisme anti-blanc « prédominant et systémique » suppose que les institutions sud-africaines produisent l''inégalité au détriment des Blancs. Les données officielles disent l''inverse : dans l''audit foncier de 2017, les Blancs détiennent 26,7 millions d''hectares, soit 72 % des terres agricoles détenues par des personnes physiques, contre 4 % pour les Africains ; en 2019, le revenu réel moyen des Blancs (R24 646 par mois sur 2011-2015) était « plus de trois fois » celui des Africains noirs (Stats SA) ; et la Commission sud-africaine des droits de l''homme constatait déjà que « 87 % des terres » restaient « entre les mains de 13 % de la population ». Trente ans après l''apartheid, le capital et le revenu restent concentrés dans la minorité blanche — l''inverse d''un racisme d''État anti-blanc.

La criminalité ne choisit pas sa couleur. Au dernier trimestre 2024, la police sud-africaine a enregistré 12 meurtres dans des fermes — y compris des petites exploitations noires — sur près de 7 000 meurtres dans le pays ; les tueurs interrogés en prison par le professeur Rudolph Zinn disent avoir visé toutes les races pour de l''argent. L''Institut d''études de sécurité, qui documente ces crimes depuis 1994, est catégorique : « il n''y a pas de génocide blanc en Afrique du Sud », et « le meurtre et le vol à main armée touchent tous ceux qui vivent en Afrique du Sud » — soutenir le contraire relève d''un « agenda idéologique ».

Ce que les faits documentent, c''est une autre violence : les attaques xénophobes de groupes vigilants (Operation Dudula, March and March) contre les étrangers africains et asiatiques, avec « peu ou pas de réponse » apparente des autorités (Human Rights Watch, mai 2026) — des violences qui visent d''autres Africains, pas les Blancs. Le « génocide blanc » est un récit construit par des organisations identitaires et exporté dans le débat politique américain ; il ne résiste ni aux statistiques foncières, ni aux données criminelles, ni aux travaux des chercheurs sud-africains.',
  'INTERNATIONAL'::dossier_category,
  '[{"name":"Afrique du Sud","kind":"LIEU","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Afrique_du_Sud","note":"Le débat porte sur la persistance des inégalités raciales trente ans après la fin de l''apartheid."},{"name":"AfriForum","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/AfriForum","note":"Groupe de pression afrikaner qui porte la thèse d''un « génocide blanc » dans les arènes internationales."},{"name":"Statistique Afrique du Sud","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Statistique_Afrique_du_Sud","note":"Office national de statistique : propriété foncière et revenus par groupe de population."},{"name":"Institut d''études de sécurité","kind":"ORGANISATION","role":"AUTEUR","reference_url":null,"note":"Centre de recherche sud-africain (Pretoria) spécialisé sur la criminalité et la violence."}]'::jsonb,
  95,
  '[{"claim_part":"« L''État sud-africain orchestre une politique de persécution raciale anti-blanche »","status":"FAUX","detail":"La Constitution de 1996 interdit la discrimination raciale, et les politiques correctrices (restitution foncière, B-BBEE) visent les groupes désavantagés par l''apartheid : aucune loi ni aucun programme ne cible les Blancs en tant que tels. Loin d''une persécution d''État, les indicateurs restent à l''avantage de la minorité blanche — 72 % des terres agricoles détenues par des personnes physiques (Land Audit 2017), un revenu moyen plus de trois fois supérieur à celui des Africains noirs (Stats SA 2019), « 87 % des terres entre les mains de 13 % de la population » selon la Commission sud-africaine des droits de l''homme. Les organisations qui portent la thèse du « génocide blanc » s''appuient sur des chiffres de criminalité rurale sortis de leur contexte, pas sur un dispositif institutionnel."},{"claim_part":"« Les crimes ruraux (« farm attacks ») ciblent unilatéralement les fermiers blancs pour des motifs raciaux »","status":"BIAIS_DE_SELECTION","detail":"Les attaques de fermes sont une réalité meurtrière, mais elles relèvent d''une criminalité de prédation, pas d''une entreprise raciale : au dernier trimestre 2024, 12 meurtres en ferme — petites exploitations noires incluses — sur près de 7 000 meurtres dans le pays (The Guardian, d''après la police sud-africaine) ; les condamnés interrogés par Rudolph Zinn (université de Limpopo) disent avoir visé des victimes de toutes les races pour de l''argent et des objets de valeur. L''Institut d''études de sécurité conclut qu''« il n''y a pas de génocide blanc en Afrique du Sud » et que le meurtre et le vol à main armée « touchent tous ceux qui vivent en Afrique du Sud ». Retenir uniquement les victimes blanches pour en déduire un mobile racial, c''est un biais de sélection : les victimes noires des mêmes attaques disparaissent de l''échantillon."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-17T00:00:00.000Z'::timestamptz,
  '/illustrations/racisme-antiblanc-systemique-afrique-du-sud-mythe.jpg',
  'Photo : Matt-80, CC BY 2.0, Wikimedia Commons'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '8f3f26c1-ed6d-4775-b7b3-d7eadfb6c32d',
  'bbfd1745-ddfe-423c-ad08-ce72a8bd9367',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Land Audit Report — Phase II : propriété foncière privée par race, genre et nationalité (novembre 2017)',
  'Department of Rural Development and Land Reform (République d''Afrique du Sud), à partir du Deeds Office et des données de Statistics South Africa',
  null,
  'CITATION_EXACTE'::quote_kind,
  'The Land Audit reveals that Whites own 26 663 144 ha or 72% of the total 37 031 283 ha farms and agricultural holdings by individual landowners; followed by Coloured at 5 371 383 ha or 15%, Indians at 2 031 790 ha or 5%, Africans at 1 314 873 ha or 4%, other at 1 271 562 ha or 3%, and co-owners at 425 537 ha or 1%.',
  'Audit foncier officiel publié par le ministère du Développement rural et de la Réforme agraire (version 2, novembre 2017 ; mis en ligne sur gov.za en février 2018). Périmètre à ne pas extrapoler : il ne couvre que les terres agricoles et exploitations détenues par des personnes physiques (37,0 millions d''hectares), soit environ un tiers des terres enregistrées — le reste appartient à des sociétés, trusts et organismes. En français : les Blancs détiennent 72 % de ces terres agricoles individuelles, contre 4 % pour les Africains.',
  'https://www.gov.za/sites/default/files/gcis_document/201802/landauditreport13feb2018.pdf',
  null,
  'f19b95e798b1e7cd01289136a552bb7d612b5349c0174065f2b1ba1182be25ca',
  null,
  null,
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '63e0ab76-c8b0-4904-acd8-e847b5c84eb1',
  'bbfd1745-ddfe-423c-ad08-ce72a8bd9367',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Inequality Trends in South Africa : A Multidimensional Diagnostic of Inequality (rapport 03-10-19)',
  'Statistics South Africa (avec SALDRU/Université du Cap et l''Agence française de développement)',
  '2019-11-14',
  'CITATION_EXACTE'::quote_kind,
  'Amongst whites, it was R24 646 per month, or more than three times as high as it was amongst black Africans.',
  'Rapport officiel sur les inégalités publié le 14 novembre 2019. Le passage mesure les revenus réels moyens des salariés entre 2011 et 2015 (données PALMS) : 6 899 rands par mois pour les Africains noirs, 9 339 pour les Coloured, 14 235 pour les Indiens/Asiatiques et 24 646 pour les Blancs. Les auteurs y décrivent « l''inégalité fortement racialisée du marché du travail sud-africain ».',
  'https://www.statssa.gov.za/publications/Report-03-10-19/Report-03-10-192017.pdf',
  null,
  '92cfcf724c9d3e4264500d66e53aee344b81750af64ca0aa2593c1b913863835',
  null,
  'https://fr.wikipedia.org/wiki/Statistique_Afrique_du_Sud',
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '46ce85d0-98e6-4123-9fcd-24d9f8e857ff',
  'bbfd1745-ddfe-423c-ad08-ce72a8bd9367',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Violent crime and the myth of South Africa''s ''white genocide'' (ISS Today)',
  'Gareth Newham, Institute for Security Studies (ISS Pretoria) — chef du programme Justice and Violence Prevention',
  '2025-05-26',
  'CITATION_EXACTE'::quote_kind,
  'The fact is that there is no ''white genocide'' in South Africa, so it was shocking to hear the claim made at a formal diplomatic meeting in the White House.',
  'Analyse publiée le 26 mai 2025, après la rencontre entre Cyril Ramaphosa et Donald Trump (21 mai). L''auteur ajoute : « Murder and armed robbery affect everyone living in South Africa – to say otherwise suggests a worrying ideological agenda. » En français : « Il n''y a pas de génocide blanc en Afrique du Sud » ; le meurtre et le vol à main armée touchent tous ceux qui y vivent.',
  'https://issafrica.org/iss-today/violent-crime-and-the-myth-of-south-africa-s-white-genocide',
  null,
  'df67a24bd7b0b47d044cd7a46d0dd2dec63d646e0f4199513689cd5527e7f582',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '252e18cf-57f5-4641-8869-414211f43a6b',
  'bbfd1745-ddfe-423c-ad08-ce72a8bd9367',
  'GAUCHE'::political_spectrum,
  'Trump''s ''white genocide'' claims ignore the reality of life and crime in South Africa (The Guardian)',
  'The Guardian (édition américaine)',
  '2025-05-21',
  'CITATION_EXACTE'::quote_kind,
  'In the last quarter of 2024, South African police recorded 12 murders on farms, including Black-owned smallholder plots, out of almost 7,000 murders across the country.',
  'Article publié le 21 mai 2025, au moment de la visite de Cyril Ramaphosa à Washington. Il rapporte aussi les entretiens du professeur Rudolph Zinn (université de Limpopo) avec des condamnés : ceux-ci déclarent avoir visé des victimes de toutes les races pour de l''argent et des objets de valeur. En français : 12 meurtres en ferme au dernier trimestre 2024, y compris dans des petites exploitations noires, sur près de 7 000 meurtres dans le pays.',
  'https://www.theguardian.com/us-news/2025/may/21/trump-south-african-president-meeting',
  null,
  'd7d91f3593ae59ee531a562eca77070d996527427c22e97c72b3c6bc4f150d3d',
  null,
  null,
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '24c058b8-0716-424e-bc10-dd5cfb5309bf',
  'bbfd1745-ddfe-423c-ad08-ce72a8bd9367',
  'GAUCHE'::political_spectrum,
  'South Africa : New Waves of Xenophobic Attacks (Human Rights Watch)',
  'Human Rights Watch',
  '2026-05-20',
  'CITATION_EXACTE'::quote_kind,
  'Vigilantes in South Africa have carried out violent xenophobic attacks targeting African and Asian foreign nationals in recent weeks, with little or insufficient apparent response from the police and other authorities, Human Rights Watch said today.',
  'Communiqué du 20 mai 2026 sur les attaques xénophobes d''avril-mai 2026 (mouvement « March and March », Operation Dudula) à Pretoria, Johannesburg et Durban. HRW rappelle les vagues de 2008, 2015, 2019 et 2021-2022, et que ces violences visent les étrangers africains et asiatiques — pas la population blanche.',
  'https://www.hrw.org/news/2026/05/20/south-africa-new-waves-of-xenophobic-attacks',
  null,
  '335da3d4970c431ef8212bd5cd4d60de4d8cfac3fd32ee10c71f3feeb2531e21',
  null,
  null,
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'd3115a9a-e9c8-47b6-a57e-a38184708628',
  'bbfd1745-ddfe-423c-ad08-ce72a8bd9367',
  'CENTRE'::political_spectrum,
  'Inquiry into Human Rights in Farming Communities — rapport de la Commission sud-africaine des droits de l''homme (auditions 2002-2003)',
  'South African Human Rights Commission (SAHRC)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'The property imbalances that exist have resulted in 87% of land remaining in the hands of 13% of the population and 13% of the land being in the hands of 78% of the population.',
  'Rapport de l''enquête nationale de la SAHRC sur les droits humains dans les communautés agricoles (auditions publiques de 2002-2003). La Commission y constate la persistance des déséquilibres fonciers hérités de l''apartheid : « White farmers own the land whilst poor Black people obtain tenure on the land as farm workers. » En français : 87 % des terres restent entre les mains de 13 % de la population.',
  'https://www.gov.za/sites/default/files/gcis_document/201409/farmingcomplete0.pdf',
  null,
  'eff5bd603704096d51d36c46dbf34b235f8c3039d7979528a6485d6a7872fada',
  null,
  'https://fr.wikipedia.org/wiki/South_African_Human_Rights_Commission',
  5
);

delete from public.dossiers where slug = 'massacre-17-octobre-1961-paris-bilan-victimes';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
) values (
  '119150b2-e689-4f9d-b4aa-effb37ff7bdc',
  'massacre-17-octobre-1961-paris-bilan-victimes',
  'Le 17 octobre 1961, 300 Algériens ont été tués à Paris lors de la répression de la manifestation du FLN',
  'TROMPEUR'::verdict_status,
  'Non : le massacre est réel, mais rien n''établit que 300 Algériens aient été tués ce jour-là. Le bilan officiel de 1961 était de sept morts et 136 blessés hospitalisés ; les registres du parquet des Archives de Paris ont livré « au moins soixante-dix victimes de la répression policière ordonnée par le préfet de police Maurice Papon » (L''Humanité, 1997) ; et le rapport Mandelkern conclut qu''en ajoutant les cas incertains au bilan officiel « on reste au niveau des dizaines », « très inférieur aux quelques centaines de victimes dont il a parfois été question ».

Le massacre, lui, est établi : la manifestation du 17 octobre 1961 contre le couvre-feu imposé par le préfet Papon a été réprimée avec une extrême violence — 14 094 interpellations en trois jours, une cinquantaine de cadavres de Français musulmans d''Algérie retrouvés dans la Seine, la Marne ou les canaux, et une reconnaissance officielle en 2012 : « des Algériens qui manifestaient pour le droit à l''indépendance ont été tués lors d''une sanglante répression ».

Le « 300 morts », avancé comme un décompte certain, est une estimation militante : les historiens Jim House et Neil MacMaster parlent d''un nombre considérable et toujours disputé de morts (H-Net, 2007), et les archives ne permettent pas de trancher — le rapport Mandelkern le dit explicitement. La formulation est donc trompeuse : elle dit vrai sur le crime, faux sur le chiffre qu''elle présente comme établi.',
  'HISTOIRE'::dossier_category,
  '[{"name":"Massacre du 17 octobre 1961","kind":"TEXTE","role":"SUJET","reference_url":"https://fr.wikipedia.org/wiki/Massacre_du_17_octobre_1961","note":"La répression policière de la manifestation du FLN, à Paris, et le débat sur son bilan."},{"name":"Maurice Papon","kind":"PERSONNE","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Maurice_Papon","note":"Préfet de police de Paris en octobre 1961, responsable du dispositif de répression."},{"name":"Préfecture de police (Paris)","kind":"ORGANISATION","role":"AUTEUR","reference_url":"https://fr.wikipedia.org/wiki/Pr%C3%A9fecture_de_police_(Paris)","note":"Service dont les archives ont été inventoriées par la mission Mandelkern en 1998."}]'::jsonb,
  95,
  '[{"claim_part":"« Des Algériens ont été tués lors de la répression du 17 octobre 1961 à Paris »","status":"VRAI","detail":"Le massacre est documenté et reconnu : 14 094 interpellations en trois jours, une cinquantaine de cadavres de Français musulmans d''Algérie retrouvés dans la Seine, la Marne ou les canaux en septembre-octobre 1961, et un bilan officiel de sept morts déjà admis par le ministre de l''intérieur au Sénat le 31 octobre 1961 (rapport Mandelkern). La consultation des registres du parquet des Archives de Paris a livré « au moins soixante-dix victimes de la répression policière ordonnée par le préfet de police Maurice Papon » (L''Humanité, 23 octobre 1997) ; les notes du conseiller du général de Gaulle, révélées en 2022, montrent que le chef de l''État « a su très vite que des dizaines d''Algériens avaient été tués » (France Inter, 7 juin 2022) ; le 17 octobre 2012, la République reconnaît « une sanglante répression »."},{"claim_part":"« Le chiffre de 300 morts est établi par les archives »","status":"FAUX","detail":"Aucune archive ne permet d''établir 300 morts. Le rapport Mandelkern (1998) relève que « celui des morts serait le plus significatif s''il pouvait être donné avec assurance. Tel n''est pas le cas » ; en ajoutant au bilan officiel de sept morts la totalité des vingt-cinq cas incertains de son annexe III, il conclut qu''« on reste au niveau des dizaines », « très inférieur aux quelques centaines de victimes dont il a parfois été question ». Les registres du parquet livrent au moins soixante-dix victimes (L''Humanité, 1997) ; les historiens Jim House et Neil MacMaster parlent d''un nombre considérable et toujours disputé de morts (H-Net, 2007). Le « 300 » est une estimation militante, pas un décompte établi."}]'::jsonb,
  '[]'::jsonb,
  true,
  '2026-10-17T00:00:00.000Z'::timestamptz,
  '/illustrations/massacre-17-octobre-1961-paris-bilan-victimes.jpg',
  'Photo : FSouici, CC BY-SA 4.0, Wikimedia Commons'
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'befce0af-d232-4184-b683-c206a6a9c015',
  '119150b2-e689-4f9d-b4aa-effb37ff7bdc',
  'DONNEES_BRUTES_OFFICIELLES'::political_spectrum,
  'Rapport sur les archives de la Préfecture de police relatives à la manifestation organisée par le FLN le 17 octobre 1961 (rapport Mandelkern)',
  'Dieudonné Mandelkern, André Wiehn et Mireille Jean — mission chargée par le ministre de l''Intérieur (La Documentation française)',
  '1998-01-08',
  'CITATION_EXACTE'::quote_kind,
  'il est clair que cette manifestation a donné lieu à une répression très dure : les chiffres et les relations de certains responsables de terrain le démontrent amplement. Parmi ces chiffres, celui des morts serait le plus significatif s''il pouvait être donné avec assurance. Tel n''est pas le cas.',
  'Rapport remis le 8 janvier 1998 au ministre de l''Intérieur, inventaire critique des archives de la préfecture de police et de l''Institut médico-légal. Il relève aussi la « très forte augmentation du nombre de cadavres de FMA découverts dans la Seine, dans la Marne ou dans les canaux (une cinquantaine pour la période septembre-octobre) » et 14 094 interpellations pour les 17-20 octobre 1961 (chiffre communiqué par le préfet puis par le ministre de l''Intérieur au Sénat). Sur le bilan : en ajoutant au bilan officiel de sept morts les vingt-cinq cas incertains de l''annexe III, « on reste au niveau des dizaines, ce qui est considérable, mais très inférieur aux quelques centaines de victimes dont il a parfois été question ».',
  'https://exode1962.fr/exode1962/en-savoir-plus/metropole/17-octobre/rapport-mandelkern.pdf',
  null,
  '34e515aa2132e06d0e263ae934171dac4e200f4d4dba38672f5b8d3186666aff',
  null,
  null,
  0
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '37701553-0718-4f9f-8602-ce75563d3db5',
  '119150b2-e689-4f9d-b4aa-effb37ff7bdc',
  'CENTRE'::political_spectrum,
  'Déclaration de M. François Hollande, Président de la République, en hommage aux Algériens tués lors de la manifestation du 17 octobre 1961',
  'Présidence de la République française',
  '2012-10-17',
  'CITATION_EXACTE'::quote_kind,
  'Le 17 octobre 1961, des Algériens qui manifestaient pour le droit à l''indépendance ont été tués lors d''une sanglante répression. La République reconnaît avec lucidité ces faits.',
  'Déclaration publiée le 17 octobre 2012 sur le site de l''Élysée, première reconnaissance officielle par un président de la République du massacre : elle ajoute « Cinquante et un ans après cette tragédie, je rends hommage à la mémoire des victimes. »',
  'https://www.elysee.fr/francois-hollande/2012/10/17/declaration-de-m-francois-hollande-president-de-la-republique-en-hommage-aux-algeriens-tues-lors-de-la-manifestation-pour-le-droit-a-lindependance-du-17-octobre-1961-a-paris-le-17-octobre-2012',
  null,
  '1ddc084ed60e6ab146665e8bc79c9ee70f1e1a537d222d8aa79aa5cbbaff4f6a',
  null,
  null,
  1
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '5d17857b-f2ac-4e3f-92e0-9175fdd72516',
  '119150b2-e689-4f9d-b4aa-effb37ff7bdc',
  'GAUCHE'::political_spectrum,
  '17 octobre 1961 : la longue liste de morts des archives de Paris (L''Humanité)',
  'L''Humanité',
  '1997-10-23',
  'CITATION_EXACTE'::quote_kind,
  'Ils révèlent les noms d''au moins soixante-dix victimes de la répression policière ordonnée par le préfet de police Maurice Papon contre la manifestation des Algériens.',
  'Article du 23 octobre 1997 consacré à la consultation, par l''historien David Assouline, des registres du parquet conservés aux Archives de Paris : « on dénombrait déjà soixante-dix morts », victimes de la répression du 17 octobre 1961. Le chiffre porte sur une première consultation non exhaustive.',
  'https://www.humanite.fr/-/-/17-octobre-1961-la-longue-liste-de-morts-des-archives-de-paris',
  null,
  '13010468b04baab7eafc99e880bc3b803a6eaaccd22c4be2ad8747b284a99fc6',
  null,
  null,
  2
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'af7f02a6-4c51-4a42-8446-5f06516de579',
  '119150b2-e689-4f9d-b4aa-effb37ff7bdc',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Compte rendu de Jim House et Neil MacMaster, « Paris 1961: Algerians, State Terror, and Memory » (H-Soz-u-Kult, juillet 2007)',
  'Holger Nehring — H-Net / H-Soz-u-Kult',
  null,
  'CITATION_EXACTE'::quote_kind,
  'the demonstration of tens of thousands of Algerians in the streets of downtown Paris on 17 October 1961 that was countered with an extreme level of violence by the police forces and resulted in a considerable (and still disputed) number of deaths',
  'Compte rendu académique (H-Soz-u-Kult, juillet 2007) de l''ouvrage de référence de Jim House et Neil MacMaster, Paris 1961 (Oxford University Press, 2006). En français : une manifestation de dizaines de milliers d''Algériens réprimée par « un niveau extrême de violence » des forces de police, avec un nombre « considérable (et toujours disputé) » de morts.',
  'https://www.h-net.org/reviews/showrev.php?id=21569',
  null,
  '70681b327dd5cc475663dbece2b785fc424c05ba61576060c4274b48db5d9106',
  null,
  null,
  3
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  'c9f845e1-5f76-491d-ae33-724f0193d476',
  '119150b2-e689-4f9d-b4aa-effb37ff7bdc',
  'CONSENSUS_ACADEMIQUE'::political_spectrum,
  'Compte rendu de « Paris 1961 » dans H-France Review (vol. 8, 2008, n° 30)',
  'H-France Review (Society for French Historical Studies)',
  null,
  'CITATION_EXACTE'::quote_kind,
  'Jim House and Neil MacMaster are the first British historians to produce a major work on the contested events surrounding the brutal suppression of an Algerian demonstration in Paris on the night of 17 October 1961.',
  'Compte rendu universitaire (H-France Review, 2008) de l''ouvrage de House et MacMaster, qui rappelle que les événements du 17 octobre 1961 restent « contestés » dans leur interprétation et leur bilan. En français : la « brutale répression » d''une manifestation algérienne à Paris, dans la nuit du 17 octobre 1961.',
  'https://h-france.net/vol8reviews/vol8no30howard.pdf',
  null,
  '4e6f6587c45203c2b9c5c66e48942c372e6a806ceb572e5da4af618c46a69c40',
  null,
  null,
  4
);
insert into public.dossier_sources (id, dossier_id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, author_reference_url, display_order) values (
  '9ee70bc7-a62c-48a7-917a-9fd01fb13b69',
  '119150b2-e689-4f9d-b4aa-effb37ff7bdc',
  'CENTRE'::political_spectrum,
  'Massacre du 17 octobre 1961 : que révèlent les archives publiées par Mediapart ? (France Inter)',
  'Juliette Geay — France Inter',
  '2022-06-07',
  'CITATION_EXACTE'::quote_kind,
  'Deux notes du conseiller du général de Gaulle pour les affaires algériennes révèlent que le président de la République a su très vite que des dizaines d''Algériens avaient été tués lors de la manifestation. Aucune sanction n''a pourtant été prise contre le préfet Papon et les ministres impliqués.',
  'Article du 7 juin 2022 revenant sur les deux notes du conseiller du général de Gaulle pour les affaires algériennes, publiées par Mediapart : le chef de l''État est informé très tôt du nombre de victimes, mais aucune sanction n''est prise contre le préfet de police ni contre les ministres. Le même article rappelle que la manifestation visait un couvre-feu discriminatoire et que des Algériens furent arrêtés, frappés et tués.',
  'https://www.radiofrance.fr/franceinter/massacre-du-17-octobre-1961-que-revelent-les-archives-publiees-par-mediapart-2938306',
  null,
  'b181d1a76b8d4754b1de2209ea98a9bb71bedb3052ce5685b79c9e2771b32c48',
  null,
  null,
  5
);

delete from public.dossiers where slug = 'brouillon-de-controle-rls';
insert into public.dossiers (
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score,
  premises, timeline, is_published, published_at, illustration_url, illustration_credit
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
  '[]'::jsonb,
  false,
  null,
  null,
  null
);
