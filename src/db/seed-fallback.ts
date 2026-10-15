import type { Dossier } from "../lib/types.ts";

/**
 * Repli local : dossiers de référence servis quand Supabase n'est pas
 * configuré, et source unique de `supabase/seed.sql` (`npm run seed:sql`).
 *
 * Les empreintes ne sont pas écrites ici : elles sont **dérivées** des champs
 * publiés (cf. `src/server/services/crypto.service.ts`) à l'écriture et à la
 * lecture, pour ne jamais diverger de la citation affichée. `archive_sha256`
 * nul signifie donc « pas encore enregistrée en base », pas « pas vérifiable ».
 * Une capture binaire archivée (chemin + empreinte du fichier) reste à écrire.
 */

export const REFERENCE_DOSSIER: Dossier = {
  id: "7f1c9a54-2b1e-4c8a-9d3f-1a5e6b7c8d90",
  slug: "hitler-et-les-nazis-etaient-de-gauche",
  claim_title: "Hitler et les nazis étaient de gauche",
  verdict: "FAUX",
  category: "HISTOIRE",
  // Rempli par `npm run protagonists:check` : seules les références
  // confirmées par l'API y entrent, jamais une URL devinée.
  protagonists: [
    {
      name: "Adolf Hitler",
      kind: "PERSONNE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Adolf_Hitler",
      note: null,
    },
    {
      name: "Parti national-socialiste des travailleurs allemands",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Parti_national-socialiste_des_travailleurs_allemands",
      note: null,
    },
    {
      name: "Parti communiste d'Allemagne",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Parti_communiste_d'Allemagne",
      note: null,
    },
    {
      name: "Parti social-démocrate d'Allemagne",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Parti_social-d%C3%A9mocrate_d'Allemagne",
      note: null,
    },
    {
      name: "Parti national du peuple allemand",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Parti_populaire_national_allemand",
      note: null,
    },
    {
      name: "Franz von Papen",
      kind: "PERSONNE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Franz_von_Papen",
      note: null,
    },
    {
      name: "Gregor Strasser",
      kind: "PERSONNE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Gregor_Strasser",
      note: null,
    },
    {
      name: "Camp de concentration de Dachau",
      kind: "LIEU",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Camp_de_concentration_de_Dachau",
      note: null,
    },
    {
      name: "IG Farben",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/IG_Farben",
      note: null,
    },
    {
      name: "Krupp",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Krupp",
      note: null,
    },
    {
      name: "Deutsche Reichsbahn",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Deutsche_Reichsbahn",
      note: null,
    },
    {
      name: "Nuit des Longs Couteaux",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Nuit_des_longs_couteaux",
      note: null,
    },
    {
      name: "Loi des pleins pouvoirs",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Loi_allemande_des_pleins_pouvoirs_de_1933",
      note: null,
    },
    {
      name: "Incendie du Reichstag",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Incendie_du_Reichstag",
      note: null,
    },
    {
      name: "Commerzbank",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Commerzbank",
      note: null,
    },
    {
      name: "Deutsche Bank",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Deutsche_Bank",
      note: null,
    },
    {
      name: "Raymond Aron",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Raymond_Aron",
      note: null,
    },
    {
      name: "Johann Chapoutot",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Johann_Chapoutot",
      note: null,
    },
    {
      name: "Ludwig von Mises",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Ludwig_von_Mises",
      note: null,
    },
    {
      name: "Ian Kershaw",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Ian_Kershaw",
      note: null,
    },
    {
      name: "Richard J. Evans",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Richard_J._Evans",
      note: null,
    },
    {
      name: "George Sylvester Viereck",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/George_Sylvester_Viereck",
      note: null,
    },
    {
      name: "Germà Bel",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: null,
      note: "Économiste, auteur de l'étude sur les privatisations nazies (Economic History Review).",
    },
  ],
  verdict_summary:
    "Le mot « socialiste » du sigle NSDAP relève d'une stratégie de récupération électorale assumée. Dès 1933, le régime détruit les syndicats, interne l'opposition de gauche, assassine sa propre aile anticapitaliste et privatise massivement au profit des grands cartels industriels.",
  consensus_score: 100,
  premises: [
    {
      claim_part: "Le sigle NSDAP contient le mot « socialiste »",
      status: "VRAI_DETOURNE",
      detail:
        "Terme retenu en 1920 pour capter l'électorat ouvrier, mais redéfini par Hitler hors de la lutte des classes et contre le marxisme, avec garantie explicite de la propriété privée.",
    },
    {
      claim_part: "L'État nazi intervenait dans l'économie, donc il était de gauche",
      status: "CONFUSION_CONCEPTUELLE",
      detail:
        "Économie de guerre dirigiste appuyée sur des cartels privés (Krupp, IG Farben, Siemens) et sur des privatisations massives entre 1934 et 1937 : l'inverse d'une collectivisation ou d'une abolition de la propriété privée.",
    },
    {
      claim_part: "Le NSDAP avait des alliances et une politique de gauche",
      status: "FAUX",
      detail:
        "Accession à la chancellerie par une coalition avec la droite conservatrice (von Papen, DNVP), ouverture de Dachau en mars 1933 pour interner communistes et sociaux-démocrates, dissolution des syndicats le 2 mai 1933, assassinat de l'aile strasseriste en juin 1934.",
    },
  ],
  is_published: true,
  published_at: "2026-10-14T00:00:00.000Z",
  sources: [
    {
      id: "0f2f4a11-6c5b-4c6e-8f24-9c0f1a2b3c41",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Liberty Magazine, vol. 9 n° 28",
      author_or_institution: "Adolf Hitler, interviewé par George Sylvester Viereck",
      publication_date: "1932-07-09",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Contrairement au marxisme, le socialisme [national-socialiste] ne répudie pas la propriété privée ; contrairement au marxisme, il n'implique aucune négation de la personnalité et, contrairement au marxisme, il est patriotique.",
      context_explanation:
        "L'article paraît sous le titre « When I Take Charge of Germany — Hitler Shows His Hand » (Liberty, vol. 9 n° 28, 9 juillet 1932). Hitler y revendique explicitement une redéfinition du mot « socialisme » contre la gauche marxiste, en garantissant la propriété privée ; la citation française traduit l'anglais publié.",
      author_reference_url: "https://fr.wikipedia.org/wiki/George_Sylvester_Viereck",
      original_url: "https://alphahistory.com/nazigermany/hitler-nazi-form-of-socialism-1932/",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "1a7e5b62-7d6c-4d7f-9a35-0d1e2f3a4b52",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Discours au Club de l'Industrie de Düsseldorf",
      author_or_institution: "Adolf Hitler, devant les industriels allemands",
      publication_date: "1932-01-27",
      quote_kind: "FAIT_DOCUMENTE",
      exact_quote:
        "Devant les grands patrons réunis à Düsseldorf, Hitler défend la propriété privée comme corollaire de l'inégalité des individus, attaque le marxisme et les syndicats, et sollicite leur soutien financier.",
      context_explanation:
        "Le discours est le moment public où le parti nazi se présente au grand patronat comme le rempart contre la gauche : la contrepartie attendue est le financement de l'appareil de parti.",
      author_reference_url: "https://fr.wikipedia.org/wiki/Adolf_Hitler",
      original_url:
        "https://archive.org/details/HitlerAdolfAddressToTheIndustryClubInDuesseldorfOn27thJanuary1932EN24S.Text",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "2b8f6c73-8e7d-4e80-ab46-1e2f3a4b5c63",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Reichstag — vote de la loi des pleins pouvoirs (Ermächtigungsgesetz)",
      author_or_institution: "Reichstag, procès-verbal du 23 mars 1933",
      publication_date: "1933-03-23",
      quote_kind: "FAIT_DOCUMENTE",
      exact_quote:
        "Le SPD est le seul parti encore représenté à voter contre les pleins pouvoirs ; les députés du KPD sont déjà arrêtés ou contraints à la clandestinité, et les partis de droite comme du centre votent pour.",
      context_explanation:
        "Le vote sépare nettement le régime naissant de la gauche parlementaire : ce sont les conservateurs et le centre qui donnent à Hitler les pouvoirs qu'il utilise ensuite pour interdire la gauche.",
      author_reference_url: null,
      original_url:
        "https://www.bundestag.de/dokumente/textarchiv/1933-03-23-ermaechtigungsgesetz-938540",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "3c9a7d84-9f8e-4f91-bc57-2f3a4b5c6d74",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Offensive du 2 mai 1933 contre les syndicats libres",
      author_or_institution: "Régime national-socialiste — décret et occupation des maisons syndicales",
      publication_date: "1933-05-02",
      quote_kind: "FAIT_DOCUMENTE",
      exact_quote:
        "Les maisons des syndicats libres sont occupées, leurs dirigeants arrêtés et leurs fonds saisis ; les organisations ouvrières sont dissoutes et remplacées par le Front allemand du travail.",
      context_explanation:
        "L'acte vise précisément le mouvement ouvrier organisé : un régime de gauche ne détruit pas en une journée ses propres syndicats.",
      author_reference_url: null,
      original_url:
        "https://www.dhm.de/lemo/kapitel/ns-regime/etablierung-der-ns-herrschaft/zerschlagung-der-gewerkschaften.html",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "4da8e895-a09f-40a2-cd68-3a4b5c6d7e85",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name: "The Economic History Review, vol. 63, n° 1, p. 34-55",
      author_or_institution: "Germà Bel, Universitat de Barcelona",
      publication_date: "2009-12-14",
      quote_kind: "FAIT_DOCUMENTE",
      exact_quote:
        "Entre 1934 et 1937, le gouvernement nazi transfère massivement des entreprises publiques au secteur privé (acier, mines, banque, transports maritimes, chemins de fer) — à rebours des tendances dominantes des pays capitalistes occidentaux, dont aucun ne reprivatise systématiquement d'entreprises dans les années 1930.",
      context_explanation:
        "Étude évaluée par les pairs qui documente le sens du transfert de propriété sous le IIIe Reich : de l'État vers les grands groupes privés, et non l'inverse.",
      author_reference_url: null,
      original_url: "https://doi.org/10.1111/j.1468-0289.2009.00473.x",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "5eb9f9a6-b1a0-41b3-de79-4b5c6d7e8f96",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name: "Travaux sur l'idéologie völkisch et le darwinisme social",
      author_or_institution: "Ian Kershaw (Oxford), Richard J. Evans (Cambridge), Johann Chapoutot (Sorbonne)",
      publication_date: null,
      quote_kind: "FAIT_DOCUMENTE",
      exact_quote:
        "Le nazisme est classé par ces historiens à l'extrême droite contre-révolutionnaire : doctrine völkisch fondée sur l'inégalité biologique et le darwinisme social, antithèse de l'universalisme de gauche.",
      context_explanation:
        "Littérature académique de référence, convergente sur la place du nazisme dans l'espace politique, indépendamment des positions politiques de ses auteurs.",
      author_reference_url: "https://fr.wikipedia.org/wiki/Johann_Chapoutot",
      original_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
    {
      id: "6fca0ab7-c2b1-42c4-ef8a-5c6d7e8f9a07",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name: "Démocratie et totalitarisme ; dossiers du Figaro Histoire",
      author_or_institution: "Raymond Aron et historiens du politique",
      publication_date: "1965-01-01",
      quote_kind: "FAIT_DOCUMENTE",
      exact_quote:
        "L'arrivée de Hitler à la chancellerie, le 30 janvier 1933, résulte d'une coalition avec la droite nationaliste conservatrice visant à barrer la route aux partis de gauche.",
      context_explanation:
        "Lecture issue de la droite libérale et conservatrice : elle rappelle que le parti nazi siégeait à l'extrême droite du Reichstag et a gouverné avec l'appui des élites conservatrices.",
      author_reference_url: "https://fr.wikipedia.org/wiki/Raymond_Aron",
      original_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 7,
    },
    {
      id: "70db1bc8-d3c2-43d5-f09b-6d7e8f9a0b18",
      spectrum: "GAUCHE",
      source_name: "Archives du SPD et du KPD",
      author_or_institution: "Parti social-démocrate et parti communiste allemands",
      publication_date: "1933-03-01",
      quote_kind: "FAIT_DOCUMENTE",
      exact_quote:
        "Les organisations ouvrières documentent, dès février-mars 1933, l'arrestation en masse de leurs militants, l'interdiction de leurs journaux et l'internement des députés communistes.",
      context_explanation:
        "Sources produites par la gauche allemande elle-même : elles décrivent la répression subie par les organisations que le régime est censé représenter s'il était « de gauche ».",
      author_reference_url: null,
      original_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 8,
    },
  ],
};

/**
 * Dossier AME : le coût réel du dispositif, son financement par l'État et le
 * panier de soins effectivement couvert — sources vérifiées à la source :
 * rapport de la commission des finances de l'Assemblée nationale (PLF 2025),
 * rapport d'information de la commission des finances du Sénat (2025),
 * réponse ministérielle (2023), rapport Évin-Stefanini (2023), avis et
 * communiqué de l'Académie nationale de médecine, étude de l'Irdes (2023)
 * sur le recours aux soins des bénéficiaires.
 */
export const AME_DOSSIER: Dossier = {
  id: "ec66bd00-fb41-4eaf-b5aa-47600ef03889",
  slug: "aide-medicale-detat-securite-sociale-soins-de-confort",
  claim_title:
    "L'Aide Médicale d'État (AME) ruine la Sécurité sociale et finance des soins de confort gratuits",
  verdict: "FAUX",
  category: "SANTE",
  protagonists: [
    {
      name: "Aide médicale d'État",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Aide_m%C3%A9dicale_d%27%C3%89tat",
      note: "Dispositif d'accès aux soins des personnes étrangères en situation irrégulière.",
    },
    {
      name: "Sécurité sociale (France)",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9curit%C3%A9_sociale_(France)",
      note: null,
    },
    {
      name: "Académie nationale de médecine",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Acad%C3%A9mie_nationale_de_m%C3%A9decine",
      note: "Autrice de l'avis (2026) et du communiqué (2023) cités.",
    },
    {
      name: "Claude Évin",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Claude_%C3%89vin",
      note: "Co-rapporteur de la mission d'évaluation de l'AME (2023).",
    },
    {
      name: "Patrick Stefanini",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Patrick_Stefanini",
      note: "Co-rapporteur de la mission d'évaluation de l'AME (2023).",
    },
  ],
  verdict_summary:
    "L'aide médicale de l'État coûte environ 1,4 milliard d'euros en 2024 — un peu plus de 0,5 % des dépenses de santé — et c'est le budget de l'État qui la finance, pas les cotisations sociales. Les cures thermales, l'aide médicale à la procréation et les médicaments à faible service médical rendu sont exclus du panier de soins, et les nouveaux bénéficiaires passent par un accord médical préalable pour les soins non urgents. Le rapport Évin-Stefanini comme l'Académie nationale de médecine concluent à un dispositif utile et maîtrisé.",
  consensus_score: 100,
  premises: [
    {
      claim_part: "« L'AME ruine la Sécurité sociale »",
      status: "FAUX",
      detail:
        "En 2024, le coût total réel s'élève à 1 386,8 millions d'euros, soit environ 0,5 % des dépenses de santé ; la dépense moyenne par bénéficiaire (2 396,4 € en 2023) est inférieure à celle de l'ensemble de la population. Le dispositif est porté par le budget de l'État (mission Santé), pas par les cotisations sociales.",
    },
    {
      claim_part: "« Elle finance des soins de confort gratuits (cures, esthétique) »",
      status: "FAUX",
      detail:
        "Les cures thermales, l'aide médicale à la procréation et les médicaments à faible service médical rendu sont explicitement exclus de l'AME (article R. 251-1 du code de l'action sociale et des familles) ; le Gouvernement écrit que « l'AME ne finance pas de soins non essentiels » (réponse ministérielle du 12 décembre 2023).",
    },
    {
      claim_part: "« À l'arrivée, la prise en charge est immédiate et sans contrôle »",
      status: "FAUX",
      detail:
        "La résidence stable en France de plus de trois mois est exigée, la première demande se dépose physiquement en CPAM, et depuis le 1er janvier 2021 les bénéficiaires de moins de neuf mois ne reçoivent certains soins qu'après accord préalable du médecin-conseil : un délai de carence sur les soins non urgents, pas un accès immédiat à tout.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "80a4a44a-9ee4-4f26-9aae-d841728333cd",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name: "Rapport n° 468 (PLF 2025), annexe n° 40 « Santé » — commission des finances",
      author_or_institution: "Assemblée nationale — Véronique Louwagie, rapporteure spéciale",
      publication_date: "2024-10-19",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "L'aide médicale de l'État (AME) représente 80 % des crédits de la mission Santé, soit 1 319 millions d'euros pour 2025, ce qui correspond à un accroissement de 9,15 % par rapport à la LFI 2024.",
      context_explanation:
        "Le budget de l'AME est inscrit dans la mission Santé de l'État (programme 183), pas dans les comptes de la Sécurité sociale : la rumeur confond les deux. Le rapport de la commission des finances détaille cette ligne de crédits avant son examen par le Parlement.",
      original_url:
        "https://www.assemblee-nationale.fr/dyn/17/rapports/cion_fin/l17b0468-tiii-a40_rapport-fond.pdf",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "b07bfd71-4ab3-4b68-9648-065f2ff6d71b",
      spectrum: "CENTRE",
      source_name:
        "Rapport d'information n° 841 (2024-2025) — « L'aide médicale de l'État : une réforme nécessaire »",
      author_or_institution: "Sénat — commission des finances",
      publication_date: "2025-07-09",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Pour l'année 2024, le coût total réel de l'AME, toutes AME incluses, est de 1 386,8 millions d'euros, soit une hausse de 15,5 % par rapport à 2023, et de 67,6 % en 10 ans, représentant 543 millions d'euros.",
      context_explanation:
        "Le rapport plaide pour une réforme mais documente surtout les chiffres : dépense moyenne de 2 396,4 € par bénéficiaire en 2023 (inférieure à celle de l'ensemble de la population), sous-budgétisation par l'État (dette de 185,1 M€ envers l'Assurance maladie en 2024) et exclusions explicites (cures thermales, PMA, médicaments à faible service médical rendu).",
      original_url: "https://www.senat.fr/rap/r24-841/r24-841_mono.html",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "0359e031-ac11-4ae7-a26e-c161397fb9eb",
      spectrum: "CENTRE",
      source_name: "Réponse ministérielle à la question écrite n° 9389 — panier de soins de l'AME",
      author_or_institution: "Ministère de la Santé et de la Prévention (Assemblée nationale)",
      publication_date: "2023-12-12",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Depuis le 1er janvier 2021, le panier de soins a été réduit pour les bénéficiaires de moins de 9 mois. Les soins remboursés après ce délai ne sont pas des soins esthétiques ou de confort. L'AME ne finance pas de soins non essentiels.",
      context_explanation:
        "La réponse rappelle les conditions d'ouverture (résidence stable de plus de trois mois, ressources faibles) et chiffre les dépenses : « Les dépenses de l'Etat au titre de l'AME représentent moins de 0,5 % des dépenses totales de santé ». Les principaux postes sont les accouchements, les cancers et les affections cardiovasculaires.",
      original_url: "https://questions.assemblee-nationale.fr/q16/16-9389QE.htm",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "30bd05eb-daec-4c75-8940-7e2f6795a54d",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name: "Rapport sur l'aide médicale de l'État",
      author_or_institution: "Mission Claude Évin – Patrick Stefanini",
      publication_date: "2023-12-04",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Il se dégage le constat d'un dispositif sanitaire utile, maîtrisé pour l'essentiel mais exposé à l'augmentation récente du nombre de ses bénéficiaires, en conséquence du nombre de personnes en situation irrégulière présentes sur le territoire, et qui mérite d'être adapté.",
      context_explanation:
        "Mission commandée par le gouvernement et confiée à Claude Évin (ancien ministre) et Patrick Stefanini (conseiller d'État) : elle conclut à l'utilité sanitaire du dispositif et propose un resserrement (vérifications renforcées, accord préalable étendu), jamais sa suppression. Ses conclusions sont invoquées dans le débat par les deux bords.",
      original_url: "https://www.vie-publique.fr/files/rapport/pdf/292122.pdf",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "ce712886-527f-4bac-82d6-e0d030821ae0",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Avis — « Aide médicale de l'État : maintenir l'accès aux soins mais mieux encadrer les soins différables »",
      author_or_institution: "Académie nationale de médecine",
      publication_date: "2026-10-07",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Son coût atteint près de 1,5 milliard d'euros représente un peu plus de 0,5 % des dépenses de l'Assurance maladie. L'Académie nationale de médecine (ANM) réaffirme que le maintien de l'AME répond à une exigence éthique et à des impératifs de santé publique : prévenir l'aggravation des maladies, éviter les pertes de chance, limiter la transmission des infections et prévenir le recours tardif à des soins plus lourds et plus coûteux.",
      context_explanation:
        "L'Académie (environ 460 000 bénéficiaires) s'oppose au remplacement de l'AME par une aide limitée aux seules urgences : l'absence d'urgence immédiate ne signifie pas qu'un soin puisse être différé sans risque. Elle propose un encadrement médical des soins différables, pas une restriction du panier.",
      original_url: "https://www.academie-medecine.fr/wp-content/uploads/2026/10/26.10.7-Avis-ANM-AME.pdf",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "6ab964d5-cd3f-4c24-b10c-17bfe38ccf8f",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name: "Communiqué — « Assurer l'accès aux soins et l'égalité de traitement pour tous »",
      author_or_institution: "Académie nationale de médecine (séance du 28 novembre 2023)",
      publication_date: "2023-11-28",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Ce dispositif répond à une logique de soins pour prévenir le recours à une hospitalisation en cas d'aggravation de maladies qui peuvent être prises en charge en ambulatoire et prévenir le risque de transmission de maladies contagieuses.",
      context_explanation:
        "Adopté par 70 voix pour, 7 contre et 8 abstentions. L'Académie y réaffirme son opposition à toute restriction fondée sur une distinction « artificielle » entre soins urgents et non urgents : la prise en charge précoce évite les hospitalisations tardives, plus coûteuses.",
      original_url: "https://www.academie-medecine.fr/wp-content/uploads/2023/11/Communique-ANM-et-AME-2.pdf",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
    {
      id: "e32d9172-3510-40b6-8e88-f793fe95623b",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Questions d'économie de la santé n° 280 — Accès aux soins et lieux de soins usuels des personnes sans titre de séjour couvertes par l'AME",
      author_or_institution:
        "Antoine Marsaudon, Florence Jusot, Jérôme Wittwer et Paul Dourgnon (Irdes)",
      publication_date: "2023-07-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Quand la durée de la couverture par l'AME augmente, la probabilité de consulter en cabinet médical ou en centre de santé s'accroît, alors que celle de recourir aux urgences ou dans une association diminue.",
      context_explanation:
        "Étude sur données de l'enquête Premiers pas (Paris et agglomération de Bordeaux, 2019) : la couverture par l'AME est associée à un non-recours aux soins moins fréquent et à une réorientation du recours, des urgences et des associations vers la médecine de ville — l'effet direct sur les soins tardifs évités.",
      original_url:
        "https://www.irdes.fr/recherche/questions-d-economie-de-la-sante/280-acces-aux-soins-et-lieux-de-soins-usuels-des-personnes-sans-titre-de-sejour-couvertes-par-l-ame.pdf",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Institut_de_recherche_et_documentation_en_%C3%A9conomie_de_la_sant%C3%A9",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 7,
    },
  ],
};

/**
 * Dossier RSA : la condition de nationalité et de séjour du revenu de
 * solidarité active — sources vérifiées : article L. 262-4 du code de
 * l'action sociale et des familles, évaluation de la Cour des comptes (2022),
 * réponse ministérielle avec données CNAF/CCMSA (2023), rapport du Sénat
 * (2025), article du Figaro (2023), recherche sur l'accès des étrangers aux
 * prestations (The Conversation, projet MiTSoPro, Université de Liège),
 * décision du Conseil constitutionnel n° 2011-137 QPC (2011).
 */
export const RSA_DOSSIER: Dossier = {
  id: "0fa4f772-df1e-4c20-bf04-b0023a6b2234",
  slug: "sans-papiers-et-rsa-des-leur-arrivee",
  claim_title: "Les étrangers sans-papiers touchent le RSA dès leur arrivée en France",
  verdict: "FAUX",
  category: "SOCIETE",
  protagonists: [
    {
      name: "Revenu de solidarité active",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Revenu_de_solidarit%C3%A9_active",
      note: "Prestation de solidarité : pour les étrangers non européens, un titre de séjour autorisant à travailler depuis cinq ans est exigé.",
    },
    {
      name: "Cour des comptes (France)",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)",
      note: null,
    },
    {
      name: "Caisse nationale des allocations familiales",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Caisse_nationale_des_allocations_familiales",
      note: "Source des données sur les allocataires citées par la réponse ministérielle.",
    },
  ],
  verdict_summary:
    "Aucune personne sans titre de séjour ne peut percevoir le RSA : la loi exige un titre de séjour autorisant à travailler depuis au moins cinq ans (article L. 262-4 du code de l'action sociale et des familles), un délai supprimé seulement pour les réfugiés, les apatrides et les titulaires d'une carte de résident. Les allocations familiales et les aides au logement supposent elles aussi la régularité du séjour. Au 30 juin 2022, 15,6 % des foyers allocataires du RSA avaient un responsable de dossier né hors UE/EEE — tous en situation régulière.",
  consensus_score: 100,
  premises: [
    {
      claim_part: "« Les sans-papiers touchent le RSA »",
      status: "FAUX",
      detail:
        "La condition légale est un titre de séjour autorisant à travailler depuis au moins cinq ans ; « les immigrés irréguliers (« sans-papiers ») ne peuvent y prétendre en aucun cas » (Le Figaro, 2023). Les exceptions prévues (réfugiés, protection subsidiaire, apatrides, carte de résident) ne couvrent jamais l'irrégularité du séjour.",
    },
    {
      claim_part: "« … dès leur arrivée en France »",
      status: "FAUX",
      detail:
        "Il faut un titre autorisant à travailler depuis cinq ans, une résidence stable (moins de trois mois d'absence par an, article L. 262-2) et une demande examinée par la CAF : rien de tout cela n'est ouvert à une personne sans papiers. Le délai de cinq ans est levé pour quelques statuts protégés, pas pour l'absence de titre.",
    },
    {
      claim_part: "« Les étrangers pèsent lourd dans les bénéficiaires »",
      status: "VRAI_DETOURNE",
      detail:
        "Chiffre réel mais déformé : 15,6 % des foyers allocataires au 30 juin 2022 (moins de 300 000 foyers) avaient un responsable de dossier hors UE/EEE, tous titulaires du titre de séjour requis depuis cinq ans. La condition de nationalité protège précisément contre une attribution « dès l'arrivée ».",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "7afdc994-b104-403c-93b9-068f1ba97063",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Code de l'action sociale et des familles — article L. 262-4",
      author_or_institution: "Légifrance (République française)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Etre français ou titulaire, depuis au moins cinq ans, d'un titre de séjour autorisant à travailler.",
      context_explanation:
        "Texte de loi en vigueur : pour le RSA, la condition de nationalité exige des étrangers non européens un titre de séjour autorisant à travailler depuis au moins cinq ans — avec des exceptions limitées (réfugiés, bénéficiaires de la protection subsidiaire, apatrides, titulaires de la carte de résident ou d'un titre équivalent).",
      original_url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031087751",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "a28bb420-43a8-4bc3-9389-2f6e26e4f3c3",
      spectrum: "CENTRE",
      source_name: "Le revenu de solidarité active — évaluation de politique publique",
      author_or_institution: "Cour des comptes",
      publication_date: "2022-01-13",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Outre la condition de nationalité, qui exige des non-européens qu'ils possèdent un titre de séjour régulier depuis au moins cinq ans, la principale restriction légale concerne l'âge minimum, fixé à 25 ans.",
      context_explanation:
        "L'évaluation (Cour des comptes et dix chambres régionales) confirme la condition des cinq ans comme restriction légale structurante et conclut que « la fraude n'a que peu d'impact sur le nombre de bénéficiaires légitimes » : l'attribution suppose d'être en séjour régulier.",
      original_url: "https://www.vie-publique.fr/files/rapport/pdf/283258.pdf",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "0eb3ff3e-a1a3-404a-94ca-641db4bdb84d",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name: "Réponse à la question écrite n° 5157 — bénéficiaires étrangers du RSA (données CNAF et CCMSA)",
      author_or_institution: "Ministère des Solidarités, de l'Autonomie et des Personnes handicapées / Assemblée nationale",
      publication_date: "2023-06-20",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Au 30 juin 2022, selon les Caisses (Caisse nationale des allocations familiales et Caisse centrale de la mutualité sociale agricole), moins de 300 000 foyers bénéficiaires du RSA sont représentés par un responsable de dossier issu d'un pays hors Union européenne / Espace économique européen. Ils représentent 15,6 % des foyers bénéficiaires du RSA et 88,4 % des foyers dont le responsable de dossier n'a pas la nationalité française.",
      context_explanation:
        "Données officielles des caisses, citées par la réponse ministérielle : ces foyers comptent pour 15,6 % des allocataires du RSA et tous relèvent de la condition de titre de séjour (cinq ans). La réponse confirme aussi la condition de nationalité et l'exigence de résidence stable.",
      original_url: "https://questions.assemblee-nationale.fr/q16/16-5157QE.htm",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "74e5bcd4-46bd-40a7-87f6-884818cf5d1c",
      spectrum: "CENTRE",
      source_name:
        "Rapport n° 426 (2024-2025) — proposition de loi créant une condition de durée de résidence pour certaines prestations sociales",
      author_or_institution: "Sénat — commission des affaires sociales (Florence Lassarade, rapporteure)",
      publication_date: "2025-03-12",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Concernant le RSA, la loi impose d'être titulaire d'un titre de séjour autorisant à travailler depuis cinq ans.",
      context_explanation:
        "Le rapport rappelle l'état du droit avant de discuter un durcissement : la condition des cinq ans existe déjà pour le RSA, et le Conseil constitutionnel en a confirmé la constitutionnalité. Les cinq ans prolongent une logique de séjour régulier, pas l'inverse.",
      original_url: "https://www.senat.fr/rap/l24-426/l24-426_mono.html",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "f31eedfd-19d4-43fc-926d-a80e87fa05e3",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "RSA, APL, allocations familiales… Qui peut vraiment bénéficier des prestations sociales en France ?",
      author_or_institution: "Le Figaro",
      publication_date: "2023-12-21",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "À noter que les immigrés irréguliers (« sans-papiers ») ne peuvent y prétendre en aucun cas. Ainsi, contrairement aux idées reçues, tous les étrangers ne bénéficient donc pas du « sésame » dès leur arrivée en France.",
      context_explanation:
        "Le quotidien détaille prestation par prestation : cinq ans de titre autorisant à travailler pour le RSA, régularité du séjour pour les prestations familiales et les aides au logement. Il note aussi que les demandeurs d'asile et les sans-papiers demeurent exclus des aides familiales spécifiques.",
      original_url:
        "https://www.lefigaro.fr/social/rsa-apl-allocations-familiales-qui-peut-vraiment-beneficier-des-prestations-sociales-en-france-20231221",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "9be08e3a-acfa-4ba1-bd25-21240e9b4887",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name: "Les systèmes de protection sociale européens sont-ils accessibles aux étrangers ?",
      author_or_institution:
        "Jean-Michel Lafleur et Daniela Vintila (CEDEM, Université de Liège) — projet MiTSoPro, Horizon 2020",
      publication_date: "2023-01-02",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Dans l'ensemble, nous avons constaté que les États-providence des pays de résidence et d'origine traitent encore les immigrants et les émigrants différemment de leurs propres citoyens. Malgré les bonnes intentions de nombreuses administrations, le statut juridique, la nationalité et les ressources financières et éducatives des individus déterminent encore l'accès aux prestations.",
      context_explanation:
        "Recherche comparative (40 pays) : l'accès aux prestations est conditionné par le statut juridique, selon le principe de résidence habituelle. Autrement dit, l'irrégularité du séjour ferme l'accès aux prestations non contributives — l'inverse d'un guichet ouvert à l'arrivée.",
      original_url:
        "https://theconversation.com/les-systemes-de-protection-sociale-europeens-sont-ils-accessibles-aux-etrangers-196539",
      author_reference_url: "https://fr.wikipedia.org/wiki/Jean-Michel_Lafleur",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
    {
      id: "82f0e4ee-6912-4a74-9457-d62ea683922f",
      spectrum: "CENTRE",
      source_name:
        "Décision n° 2011-137 QPC du 17 juin 2011 — M. Zeljko S. (attribution du revenu de solidarité active aux étrangers)",
      author_or_institution: "Conseil constitutionnel (République française)",
      publication_date: "2011-06-17",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "qu'en réservant le bénéfice du revenu de solidarité active à ceux qui, parmi les étrangers, sont titulaires depuis au moins cinq ans d'un titre de séjour les autorisant à travailler, le législateur a institué entre les Français et les étrangers, d'une part, et entre les étrangers, d'autre part, selon qu'ils ont ou non une résidence stable en France, une différence de traitement en rapport direct avec l'objet de la loi ; qu'il a fixé un critère qui n'est pas manifestement inapproprié au but poursuivi",
      context_explanation:
        "Saisi d'une question prioritaire de constitutionnalité, le Conseil constitutionnel valide l'article L. 262-4 : « Article 1er. — L'article L. 262-4 du code de l'action sociale et des familles est conforme à la Constitution. » La condition des cinq ans de titre de séjour pour les étrangers non couverts par un statut protégé est donc un choix légal assumé, contrôlé et confirmé.",
      original_url: "https://www.conseil-constitutionnel.fr/decision/2011/2011137QPC.htm",
      author_reference_url: "https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 7,
    },
  ],
};

/**
 * Dossier Vichy : l'initiative du statut des Juifs et la prétendue protection
 * des Juifs français — sources vérifiées : loi du 3 octobre 1940 (Journal
 * officiel), discours de Jacques Chirac (1995), entretien avec Laurent Joly
 * (CNRS), page pédagogique du Mémorial de la Shoah, dossier de l'INA sur le
 * projet annoté par Pétain, article de L'Humanité sur la découverte de 2010,
 * préface de la 2e édition de « Vichy France and the Jews » (Marrus & Paxton,
 * 2019), loi du 4 octobre 1940 sur l'internement des Juifs étrangers.
 */
export const VICHY_DOSSIER: Dossier = {
  id: "f185a0ee-094c-42bb-b75d-ef1517393fd4",
  slug: "petain-vichy-ont-ils-protege-les-juifs-francais",
  claim_title: "Le maréchal Pétain et le régime de Vichy ont protégé les Juifs français",
  verdict: "FAUX",
  category: "HISTOIRE",
  protagonists: [
    {
      name: "Philippe Pétain",
      kind: "PERSONNE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Philippe_P%C3%A9tain",
      note: "Chef de l'État français : il a annoté et durci le projet de statut des Juifs d'octobre 1940.",
    },
    {
      name: "Régime de Vichy",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/R%C3%A9gime_de_Vichy",
      note: null,
    },
    {
      name: "Loi portant statut des Juifs",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Loi_portant_statut_des_Juifs",
      note: "Premier statut des Juifs, promulgué le 3 octobre 1940 par le régime de Vichy.",
    },
    {
      name: "Rafle du Vélodrome d'Hiver",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Rafle_du_V%C3%A9lodrome_d%27Hiver",
      note: "Rafle des 16 et 17 juillet 1942, exécutée par la police française.",
    },
    {
      name: "Serge Klarsfeld",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Serge_Klarsfeld",
      note: "A révélé en 2010 le projet de statut annoté par Pétain.",
    },
    {
      name: "Laurent Joly",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Laurent_Joly",
      note: "Directeur de recherche au CNRS, historien de l'antisémitisme sous l'Occupation.",
    },
    {
      name: "Jacques Chirac",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Jacques_Chirac",
      note: "A reconnu en 1995 la responsabilité de l'État français dans la déportation.",
    },
  ],
  verdict_summary:
    "Le premier statut des Juifs est adopté par l'État français « de sa propre initiative, et sans pression nazie », et Pétain l'a personnellement annoté et durci — jusqu'à rayer l'exception qui épargnait les descendants de Juifs nés français avant 1860. Environ 25 000 des 80 000 victimes de la Shoah en France étaient de nationalité française, et la rafle du Vél' d'Hiv' a été exécutée par 450 policiers et gendarmes français. La thèse d'un Pétain protecteur est contredite par les archives, les historiens et le discours de Jacques Chirac du 16 juillet 1995.",
  consensus_score: 100,
  premises: [
    {
      claim_part: "« Le statut des Juifs a été imposé par les Allemands »",
      status: "FAUX",
      detail:
        "Le statut du 3 octobre 1940 est adopté par l'État français « de sa propre initiative, et sans pression nazie » (Mémorial de la Shoah) ; il s'applique aux deux zones, y compris la zone libre où aucun occupant n'est présent.",
    },
    {
      claim_part: "« Vichy a protégé les Juifs français »",
      status: "FAUX",
      detail:
        "Pétain a annoté et durci le projet : suppression de l'exception des descendants de Juifs nés ou naturalisés avant 1860, extension des exclusions professionnelles — « tous les juifs sont stigmatisés » (INA). Environ 25 000 Juifs de nationalité française figurent parmi les victimes de la Shoah en France.",
    },
    {
      claim_part: "« Vichy a sacrifié les étrangers pour sauver les Français »",
      status: "FAUX",
      detail:
        "La collaboration policière de l'État français « a grandement aggravé le sort des Juifs » (Laurent Joly, CNRS) : la rafle du Vél' d'Hiv' (16-17 juillet 1942) est exécutée par la police française et la déportation frappe les Juifs français comme étrangers, dans les mêmes convois.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "616b0cfe-595d-4a5f-af69-03518d8520c4",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Loi du 3 octobre 1940 portant statut des Juifs (publiée au Journal officiel du 18 octobre 1940)",
      author_or_institution: "État français (régime de Vichy)",
      publication_date: "1940-10-03",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Est regardé comme juif, pour l'application de la présente loi, toute personne issue de trois grands-parents de race juive ou de deux grands-parents de la même race, si son conjoint lui-même est juif.",
      context_explanation:
        "Le texte définit qui est « juif » et ferme aux Juifs la fonction publique, l'armée, l'enseignement, la presse, etc. L'exemplaire de travail annoté de la main de Pétain a été révélé par Serge Klarsfeld en 2010 et remis au Mémorial de la Shoah.",
      original_url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000869361",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "b9da4f25-e144-41a1-a6fd-efd71b8bd435",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Allocution au 53e anniversaire de la rafle du Vél' d'Hiv'",
      author_or_institution: "Jacques Chirac, président de la République",
      publication_date: "1995-07-16",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Oui, la folie criminelle de l'occupant a été secondée par des Français, par l'Etat français. Il y a cinquante-trois ans, le 16 juillet 1942, 450 policiers et gendarmes français, sous l'autorité de leurs chefs, répondaient aux exigences des nazis.",
      context_explanation:
        "Première reconnaissance officielle, par un chef de l'État, de la responsabilité de l'État français dans la déportation des Juifs : rupture avec la thèse du « moindre mal » défendue par les partisans de Vichy.",
      original_url:
        "https://www.elysee.fr/jacques-chirac/1995/07/16/allocution-de-m-jacques-chirac-president-de-la-republique-sur-la-responsabilite-de-letat-francais-dans-la-deportation-des-juifs-durant-la-deuxieme-guerre-mondiale-et-sur-les-valeurs-de-liberte-de-justice-et-de-tolerance-qui-fondent-lidentite-franca",
      author_reference_url: "https://fr.wikipedia.org/wiki/Jacques_Chirac",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "42ac6d4f-63c6-4d2c-8d83-862d0155c06c",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name: "Entretien avec Laurent Joly — la genèse du statut des Juifs",
      author_or_institution: "Laurent Joly (CNRS), entretien avec Nathalie Peeters — Mémoire d'Auschwitz ASBL",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Ce que les archives prouvent indubitablement c'est que cette spécificité française qu'a été la collaboration d'État en matière d'arrestations a grandement aggravé le sort des Juifs.",
      context_explanation:
        "Entretien de novembre 2021. Joly répond directement à la thèse d'un Vichy protecteur : rien dans les archives ne l'étaye, et il relève « l'absence totale d'Allemands dans l'exécution de la grande rafle des 16 et 17 juillet 1942 à Paris et en banlieue ».",
      original_url: "https://www.auschwitz.be/images/_expertises/2021-peeters-joly_entretien.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Laurent_Joly",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "7369a48f-e531-488b-8122-e362e21b0243",
      spectrum: "CENTRE",
      source_name: "3 octobre 1940, Pétain durcit la loi sur le statut des Juifs",
      author_or_institution: "INA (Institut national de l'audiovisuel) — dossier « éclair'actu »",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Ce brouillon annoté est un élément à charge à l'encontre du maréchal. Il montre clairement la responsabilité du chef de l'Etat dans l'élaboration de ce texte et sa volonté de durcir le caractère antisémite du statut de la communauté juive.",
      context_explanation:
        "Le dossier de l'INA rappelle le détail des annotations (professions interdites élargies, exception des Juifs présents en France depuis longtemps supprimée) et résume le reportage de 2010 : « à chaque fois que l'écriture du maréchal Pétain intervient dans le document, c'est pour aggraver le statut des juifs ».",
      original_url: "https://www.ina.fr/ina-eclaire-actu/3-octobre-1940-petain-durcit-la-loi-sur-le-statut-des-juifs",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "1e77286b-a57f-46b8-bac9-424415cf1aeb",
      spectrum: "CENTRE",
      source_name: "La Shoah en France — l'initiative du statut des Juifs",
      author_or_institution: "Mémorial de la Shoah",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "De sa propre initiative, et sans pression nazie, l'État français adopte le 3 octobre une loi définissant le « statut des Juifs ».",
      context_explanation:
        "La page retrace la séquence : révision des naturalisations de 1927 (juillet 1940, environ 8 000 Juifs dénaturalisés), puis le statut applicable en zone occupée comme en zone libre. Vichy l'a présenté comme un projet souverain.",
      original_url: "https://1942.memorialdelashoah.org/la-shoah-en-france.html",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "dbb02b95-fc8b-49e3-8140-efdeb5a67735",
      spectrum: "CENTRE",
      source_name: "La Shoah en France — le bilan des victimes",
      author_or_institution: "Mémorial de la Shoah",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Sur les 80 000 victimes de la Shoah en France, 55 000 sont des Juifs étrangers et 25 000 des Juifs de nationalité française.",
      context_explanation:
        "76 000 personnes ont été déportées de France, dont environ 11 400 enfants ; les Juifs de nationalité française — que Pétain était censé « protéger » — comptent pour près d'un tiers des victimes.",
      original_url: "https://1942.memorialdelashoah.org/la-shoah-en-france.html",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
    {
      id: "75cfdd0b-89ea-4802-8570-bfef2154760f",
      spectrum: "GAUCHE",
      source_name: "Un document réduit en miettes le mythe de Pétain protecteur des Juifs",
      author_or_institution: "L'Humanité (d'après Reuters et AFP)",
      publication_date: "2010-10-03",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "« On ne savait pas jusque-là que Philippe Pétain avait annoté ce texte du 3 octobre 1940 et qu'il l'avait aggravé », dit-il.",
      context_explanation:
        "Réaction de Serge Klarsfeld à la publication du projet annoté, authentifié puis remis au Mémorial de la Shoah par un donateur anonyme. L'article détaille les annotations : exclusion de « tous les membres du corps enseignant », interdiction des sièges dans toute assemblée issue de l'élection, suppression de l'exception des descendants de Juifs nés français ou naturalisés avant 1860.",
      original_url: "https://www.humanite.fr/societe/-/un-document-reduit-en-miettes-le-mythe-de-petain-protecteur-des-juifs",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 7,
    },
    {
      id: "9dca84cd-d84c-49c2-a503-212d535bf6a8",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name: "Vichy France and the Jews — préface de la deuxième édition",
      author_or_institution:
        "Michael R. Marrus et Robert O. Paxton (Stanford University Press)",
      publication_date: "2019-08-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Without prompting from the German occupation authorities (who wanted at first only to expel German Jews into the unoccupied parts of France), Vichy France launched its own anti-Jewish program.",
      context_explanation:
        "Préface de la deuxième édition (août 2019) de l'ouvrage de référence sur la France de Vichy et les Juifs. Traduction : « Sans y avoir été poussée par les autorités d'occupation allemandes (qui ne voulaient d'abord qu'expulser les Juifs allemands vers la zone non occupée), la France de Vichy lança son propre programme antijuif. » Les auteurs y confirment, archives françaises et allemandes à l'appui, leurs conclusions de 1981.",
      original_url: "https://www.sup.org/books/history/vichy-france-and-jews/excerpt/preface",
      author_reference_url: "https://fr.wikipedia.org/wiki/Robert_Paxton",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 8,
    },
    {
      id: "702297ab-2061-4e66-962a-97cb84710050",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Loi du 4 octobre 1940 relative aux ressortissants étrangers de race juive (internement dans des camps spéciaux)",
      author_or_institution:
        "Journal officiel de l'État français (régime de Vichy) — texte sur Légifrance",
      publication_date: "1940-10-04",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Les ressortissants étrangers de race juive pourront, à dater de la promulgation de la présente loi, être internés dans des camps spéciaux par décision du préfet du département de leur résidence.",
      context_explanation:
        "Votée le lendemain de la promulgation du premier statut des Juifs, cette loi autorise l'internement administratif des Juifs étrangers par simple décision préfectorale — dans les camps du sud de la France (Gurs, Rivesaltes, les Milles…). Loin de « protéger », le régime organisait lui-même l'enfermement.",
      original_url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000571814",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 9,
    },
  ],
};

export const IMMIGRATION_BUDGET_DOSSIER: Dossier = {
  id: "bf081aa5-d711-4510-bb25-b426ae7ffa46",
  slug: "cout-immigration-budget-france",
  claim_title: "L'immigration coûte des dizaines de milliards d'euros par an à la France",
  verdict: "FAUX",
  category: "ECONOMIE",
  protagonists: [
    {
      name: "Immigration en France",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Immigration_en_France",
      note: "Le débat budgétaire porte sur la contribution nette des immigrés aux finances publiques françaises.",
    },
    {
      name: "Organisation de coopération et de développement économiques",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url:
        "https://fr.wikipedia.org/wiki/Organisation_de_coop%C3%A9ration_et_de_d%C3%A9veloppement_%C3%A9conomiques",
      note: null,
    },
    {
      name: "Centre d'études prospectives et d'informations internationales",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url:
        "https://fr.wikipedia.org/wiki/Centre_d%27%C3%A9tudes_prospectives_et_d%27informations_internationales",
      note: "Auteurs de l'évaluation comptable de la contribution des immigrés aux finances publiques (1979-2011).",
    },
    {
      name: "Insee",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url:
        "https://fr.wikipedia.org/wiki/Institut_national_de_la_statistique_et_des_%C3%A9tudes_%C3%A9conomiques",
      note: "Source des statistiques d'activité et d'emploi de la population immigrée.",
    },
    {
      name: "Terra Nova",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Terra_Nova_(think_tank)",
      note: "Think tank progressiste ; note sur la place des étrangers non européens dans les métiers en tension.",
    },
  ],
  verdict_summary:
    "Les évaluations convergent vers un solde faible ou quasi nul : sur 1979-2011, la contribution nette des immigrés aux finances publiques françaises est restée bornée entre - 0,5 % et + 0,05 % du PIB et n'a jamais déterminé le solde budgétaire primaire (CEPII) ; dans les 25 pays de l'OCDE pour lesquels des données existent, les impôts et cotisations des immigrés ont en moyenne dépassé les dépenses publiques qui leur sont consacrées en 2006-2018 (OCDE, rapport 2021). La structure par âge — population surreprésentée dans les classes actives — compense une contribution plus faible à âge donné.",
  consensus_score: 95,
  premises: [
    {
      claim_part: "« Les immigrés coûtent plus cher en aides qu'ils ne rapportent »",
      status: "FAUX",
      detail:
        "Les évaluations convergent vers un solde faible : contribution nette bornée entre - 0,5 % et + 0,05 % du PIB sur 1979-2011 (CEPII) ; impôts et cotisations supérieurs aux dépenses consacrées aux immigrés (protection sociale, santé, éducation) en moyenne 2006-2018 dans les 25 pays OCDE étudiés. La population immigrée est surreprésentée dans les classes d'âge actives, où les cotisations versées dépassent les prestations reçues.",
    },
    {
      claim_part: "« Le déficit de l'État est causé par l'immigration »",
      status: "CONFUSION_CONCEPTUELLE",
      detail:
        "Le CEPII conclut qu'« à aucun moment l'immigration n'a déterminé l'ampleur et l'évolution du solde budgétaire primaire » (1979-2011). Le déficit public s'explique d'abord par le vieillissement démographique (retraites, santé) et les cycles économiques : l'effet migratoire est marginal en comparaison.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "a16671de-0ef0-4a69-a745-2d285453a60a",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name: "L'essentiel sur… les immigrés et les étrangers — situation face à l'emploi",
      author_or_institution: "Insee (France)",
      publication_date: null,
      quote_kind: "FAIT_DOCUMENTE",
      exact_quote:
        "En 2025, parmi les personnes de 15 à 64 ans, 80 % des hommes immigrés sont actifs, c'est-à-dire qu'ils occupent un emploi ou en cherchent un. Cette proportion est proche de celle observée parmi les hommes non-immigrés (78 %). (...) Les immigrés occupent plus fréquemment que l'ensemble de la population des postes d'ouvriers (26 % contre 18 %) et moins souvent ceux de professions intermédiaires (17 % contre 26 %).",
      context_explanation:
        "Chiffres de l'Insee sur l'insertion professionnelle : taux d'activité et d'emploi masculins proches de ceux des non-immigrés et forte part d'ouvriers. Cette population insérée cotise aux régimes sociaux ; l'évaluation de la contribution nette relève des travaux du CEPII et de l'OCDE cités dans ce dossier.",
      original_url: "https://www.insee.fr/fr/statistiques/3633212",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Institut_national_de_la_statistique_et_des_%C3%A9tudes_%C3%A9conomiques",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "0eb42382-12e6-4e63-a38d-e03106f5e1ee",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "La Lettre du CEPII n° 394 — L'impact sur les finances publiques de 30 ans d'immigration en France",
      author_or_institution: "Xavier Chojnicki, Lionel Ragot et Ndeye-Penda Sokhna (CEPII)",
      publication_date: "2018-12-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Les estimations réalisées montrent que, sur l'ensemble de la période étudiée, la contribution des immigrés en pourcentage du PIB est relativement faible (entre - 0,5 % et + 0,05 %). À aucun moment l'immigration n'a déterminé l'ampleur et l'évolution du solde budgétaire primaire.",
      context_explanation:
        "Méthode comptable désagrégeant le solde budgétaire primaire français entre la population immigrée et les natifs, sur 1979-2011 ; la contribution nette reste faible et ne détermine jamais le solde.",
      original_url: "https://www.cepii.fr/CEPII/fr/publications/lettre/abstract.asp?NoDoc=11997",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Centre_d%27%C3%A9tudes_prospectives_et_d%27informations_internationales",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "b8433f78-185c-40d5-aa73-57a2b5ab789d",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "Perspectives des migrations internationales 2021 — incidence budgétaire de l'immigration",
      author_or_institution: "OCDE",
      publication_date: "2021-10-28",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Dans les 25 pays de l'OCDE pour lesquels des données sont disponibles, en moyenne au cours de la période 2006-18, la contribution des immigrés sous la forme d'impôts et de cotisations a été supérieure aux dépenses publiques consacrées à leur protection sociale, leur santé et leur éducation.",
      context_explanation:
        "Chapitre spécial de l'édition 2021 : contribution budgétaire nette des immigrés calculée pays par pays et année par année depuis le milieu des années 2000. Passage de synthèse relevé sur la page officielle de la publication.",
      original_url:
        "https://www.oecd.org/fr/publications/perspectives-des-migrations-internationales-2021_da2bbd99-fr.html",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Organisation_de_coop%C3%A9ration_et_de_d%C3%A9veloppement_%C3%A9conomiques",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "be25739e-eea9-43e3-92ea-92e06745b4da",
      spectrum: "GAUCHE",
      source_name: "Immigration et emploi en France : décodage d'une radiographie manipulée",
      author_or_institution: "Paul-André Romain (Terra Nova)",
      publication_date: "2026-10-15",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Si l'on tient compte de ces poids démographiques, les étrangers non européens apparaissent généralement surreprésentés dans de nombreux métiers en tension, tant en Île-de-France qu'en province (restauration, hôtellerie, bâtiment, agroalimentaire, etc.).",
      context_explanation:
        "Note du think tank progressiste Terra Nova répondant à une étude de l'Observatoire de l'immigration et de la démographie : rapportés aux poids démographiques, les étrangers non européens apparaissent surreprésentés dans de nombreux métiers en tension, en Île-de-France comme en province.",
      original_url:
        "https://tnova.fr/societe/immigration-integration-non-discrimination/immigration-et-emploi-en-france-decodage-dune-radiographie-manipulee/",
      author_reference_url: "https://fr.wikipedia.org/wiki/Terra_Nova_(think_tank)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
  ],
};

export const CRIME_IMMIGRATION_DOSSIER: Dossier = {
  id: "0a8c7aad-73bd-4373-a8ed-66eb1c4b25d1",
  slug: "immigration-insecurite-criminalite-france",
  claim_title: "L'immigration est la cause principale de la hausse des crimes et délits en France",
  verdict: "FAUX",
  category: "SOCIETE",
  protagonists: [
    {
      name: "Immigration en France",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Immigration_en_France",
      note: "Le débat porte sur le lien allégué entre immigration et délinquance enregistrée.",
    },
    {
      name: "Service statistique ministériel de la sécurité intérieure",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url:
        "https://fr.wikipedia.org/wiki/Service_statistique_minist%C3%A9riel_de_la_s%C3%A9curit%C3%A9_int%C3%A9rieure",
      note: "Source des statistiques officielles de la délinquance enregistrée (données des mis en cause).",
    },
    {
      name: "Laurent Mucchielli",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Laurent_Mucchielli",
      note: "Sociologue (CNRS), ancien directeur du CESDIP (2004-2009).",
    },
    {
      name: "Ministère de la Justice (France)",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_la_Justice_(France)",
      note: "Publications statistiques sur la détention et la récidive (SDSE, administration pénitentiaire).",
    },
  ],
  verdict_summary:
    "Aucune donnée ne soutient un rôle causal de l'immigration : en 2024, la très large majorité des personnes mises en cause sont de nationalité française (84 à 85 % pour les violences physiques, 88 % pour l'usage de stupéfiants — SSMSI). La surreprésentation observée dans certaines statistiques s'explique par des mécanismes quasi mécaniques (délits spécifiques au séjour) et des facteurs sociologiques (âge, sexe, précarité) : à situation comparable, la nationalité n'est pas un facteur explicatif, et les sortants de prison étrangers récidivent moins que les Français.",
  consensus_score: 95,
  premises: [
    {
      claim_part: "« Les étrangers commettent la majorité des crimes et délits »",
      status: "FAUX",
      detail:
        "En 2024, les auteurs de violences physiques sont de nationalité française dans 84 % (intrafamiliales) et 85 % (hors cadre familial) des cas résolus ; 88 % des mis en cause pour usage de stupéfiants sont français (SSMSI, « Insécurité et délinquance en 2024 », fiches violences physiques et stupéfiants). Les mis en cause étrangers représentent 15 à 16 % des violences physiques, pour environ 8 % de la population.",
    },
    {
      claim_part: "« La nationalité explique la délinquance »",
      status: "CONFUSION_CONCEPTUELLE",
      detail:
        "La délinquance de rue est d'abord le fait d'hommes jeunes et précaires, surreprésentés dans les statistiques des mis en cause : « l'examen rigoureux des statistiques policières ne permet pas de mesurer la délinquance des étrangers » (Mucchielli, CNRS-CESDIP). Le ministère de la Justice mesure même une récidive plus faible des sortants étrangers (- 3,9 points) et un effet du faible niveau d'étude (+ 3,3 points) : ce sont le décrochage scolaire et la précarité qui pèsent, pas la nationalité.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "05c12af9-831a-47e4-9391-946eb5c9ba05",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Insécurité et délinquance en 2024 : bilan statistique (fiches violences physiques et stupéfiants)",
      author_or_institution:
        "SSMSI — Service statistique ministériel de la sécurité intérieure (ministère de l'Intérieur)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Les auteurs sont pour la plupart de nationalité française (respectivement 84 % et 85 %). La part des mis en cause de nationalités étrangères est de l'ordre de 15 à 16 % alors que les nationalités étrangères représentent 8 % de la population française.",
      context_explanation:
        "Bilan statistique annuel du SSMSI (9e édition, année 2024) : sur les violences physiques, 84 % des mis en cause (intrafamiliales) et 85 % (hors cadre familial) sont de nationalité française ; 88 % des mis en cause pour usage de stupéfiants le sont également. Les étrangers représentent environ 8 % de la population résidant en France.",
      original_url:
        "https://www.interieur.gouv.fr/fr/content/download/138329/1093108/file/SSMSI-BA2024.pdf",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Service_statistique_minist%C3%A9riel_de_la_s%C3%A9curit%C3%A9_int%C3%A9rieure",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "cbb05fa7-4845-4448-b027-1e2a29ed0825",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Délinquance et immigration en France : un regard sociologique — résumé de l'article (Criminologie, vol. 36, n° 2)",
      author_or_institution: "Laurent Mucchielli (CNRS, CESDIP)",
      publication_date: "2003-01-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "L'examen rigoureux des statistiques policières ne permet pas de mesurer la délinquance des étrangers. Il invite toutefois à distinguer une délinquance professionnelle des étrangers non résidents d'une délinquance d'étrangers résidents qui s'apparente aux vols et aux violences physiques classiquement observés dans les couches les plus pauvres de la population.",
      context_explanation:
        "Synthèse critique des connaissances (données administratives et travaux sociologiques quantitatifs et qualitatifs). Le résumé de l'article précise aussi que la sur-représentation locale des jeunes issus de l'immigration africaine n'est « pas uniforme sur le territoire national » et renvoie à des contextes locaux.",
      original_url: "https://www.erudit.org/fr/revues/crimino/2003-v36-n2-crimino701/007865ar/",
      author_reference_url: "https://fr.wikipedia.org/wiki/Laurent_Mucchielli",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "24db7b87-e9fb-4a81-a30d-596c8daf2517",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name: "Pourquoi le lien entre immigration et délinquance est une illusion",
      author_or_institution:
        "Arnaud Philippe (University of Bristol) et Jérôme Valette (CEPII), The Conversation",
      publication_date: "2023-05-21",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Immigration et délinquance ne sont donc pas liées, une fois les raisonnements simplificateurs écartés. Au contraire, si la surreprésentation quasi mécanique des immigrés dans les statistiques peut créer l'illusion d'une relation entre immigration et délinquance, les études rigoureuses montrent qu'il n'en est rien.",
      context_explanation:
        "Analyse des mécanismes de la surreprésentation : délits que seuls des étrangers peuvent commettre (séjour irrégulier, travail sans titre), élucidations immédiates, effets de ciblage statistique. Repères : 7,4 % d'étrangers dans la population en 2019, mais 14 % des auteurs d'affaires traitées par la justice.",
      original_url:
        "https://theconversation.com/pourquoi-le-lien-entre-immigration-et-delinquance-est-une-illusion-205603",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "2fa64508-d93d-44f6-975e-9e344fb9237f",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "Infostat Justice n° 183 — Mesurer et comprendre les déterminants de la récidive des sortants de prison",
      author_or_institution: "Frédérique Cornuau et Marianne Juillard (SDSE, ministère de la Justice)",
      publication_date: "2021-07-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Par ailleurs, le risque de récidive des sortants de prison étrangers est réduit de 3,9 points. La situation matrimoniale joue un rôle significatif : être marié réduit de 4,9 points le risque de récidive par rapport au fait d'être célibataire. Un faible niveau d'étude semble augmenter le risque (+ 3,3 points pour un niveau élémentaire ou pré-élémentaire par rapport à un niveau lycée).",
      context_explanation:
        "Étude statistique du service statistique ministériel de la justice sur une cohorte de sortants de prison : ce sont le niveau d'études, la situation familiale et l'âge qui pèsent sur la récidive ; la nationalité étrangère est associée à un risque plus faible (- 3,9 points).",
      original_url:
        "https://www.justice.gouv.fr/sites/default/files/migrations/portail/art_pix/stat_Infostat_183.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_la_Justice_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "07220d69-5c22-4986-8f83-b6c219bf1f43",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Cahiers d'études pénitentiaires et criminologiques n° 25 — Étrangers incarcérés",
      author_or_institution:
        "Angélique Hazard (direction de l'administration pénitentiaire, ministère de la Justice)",
      publication_date: "2008-10-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "En 2007, les ILE restent toutefois le premier poste d'incarcération des étrangers originaires d'Afrique (Maghreb 17 %, Afrique hors Maghreb 22 %) et des pays hors Union européenne (22 %).",
      context_explanation:
        "Les « infractions à la législation sur les étrangers » (ILE : entrée et séjour irréguliers, mesures d'expulsion, aide à l'entrée) sont des délits spécifiques au statut de séjour, concentrés sur les personnes étrangères : en 2007, 57 % concernaient l'entrée et le séjour et 33 % une mesure d'expulsion. Leur poids dans les statistiques ne dit rien d'une délinquance de droit commun.",
      original_url: "https://www.justice.gouv.fr/sites/default/files/2023-05/CahEtudesPenitCrim25.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_la_Justice_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "16746a6a-a473-41a9-aec1-85e7dc7f2e17",
      spectrum: "GAUCHE",
      source_name: "Immigration : la voix des sciences sociales (dossier)",
      author_or_institution: "La Vie des idées (La rédaction)",
      publication_date: "2023-12-21",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "La focalisation médiatique sur quelques faits divers fait écran : l'ordre public n'est pas menacé par l'immigration.",
      context_explanation:
        "Dossier publié au lendemain de l'adoption de la loi immigration du 19 décembre 2023 : il recense les travaux des sciences sociales sur les questions instrumentalisées, dont celle du lien entre immigration et délinquance — la section correspondante renvoie aux recherches sur les statistiques pénales et leur construction.",
      original_url: "https://laviedesidees.fr/Immigration-la-voix-des-sciences-sociales",
      author_reference_url: "https://fr.wikipedia.org/wiki/La_Vie_des_id%C3%A9es",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
  ],
};

/**
 * Dossier politique : « Un pourvoi en cassation annule la culpabilité et
 * empêche l'inéligibilité d'un élu » — démenti par les textes (office de la
 * Cour de cassation, effet suspensif du pourvoi et exécution provisoire), la
 * jurisprudence de la chambre criminelle et les décisions des juridictions
 * suprêmes. Sources : codes de l'organisation judiciaire (L. 411-2), de
 * procédure pénale (569 et 471) et pénal (131-26-2) ; arrêts des 21 septembre
 * 2022 et 18 décembre 2024 ; analyse de Camille Aynès (The Conversation,
 * 2025) ; décision n° 2025-1129 QPC du Conseil constitutionnel ; avis du
 * Conseil d'État du 19 juin 2025 ; Le Figaro (31 mars 2025).
 */
export const POURVOI_CASSATION_DOSSIER: Dossier = {
  id: "a12eabe7-0adf-4320-8c3a-82f1c0da1a62",
  slug: "pourvoi-cassation-culpabilite-ineligibilite-elus",
  claim_title:
    "Un pourvoi en cassation annule la culpabilité et empêche l'inéligibilité d'un élu",
  verdict: "FAUX",
  verdict_summary:
    "La Cour de cassation n'est pas un troisième degré de juridiction : elle ne rejuge ni les faits ni la culpabilité matérielle, souverainement fixés par les juges du fond. De plus, si l'exécution provisoire est ordonnée, l'inéligibilité s'applique immédiatement malgré le pourvoi.",
  category: "POLITIQUE",
  protagonists: [
    {
      name: "Cour de cassation",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Cour_de_cassation_(France)",
      note: "Juridiction suprême de l'ordre judiciaire : elle contrôle la conformité au droit des décisions, sans rejuger le fond des affaires.",
    },
    {
      name: "Conseil constitutionnel",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url:
        "https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)",
      note: "A validé le 28 mars 2025 la démission d'office immédiate des élus locaux condamnés à une inéligibilité exécutoire par provision, sous réserve d'un contrôle de proportionnalité.",
    },
    {
      name: "Conseil d'État",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)",
      note: "A rendu le 19 juin 2025 l'avis sur les effets d'une peine d'inéligibilité exécutoire par provision ; confirme la démission d'office des élus locaux.",
    },
    {
      name: "Code de procédure pénale",
      kind: "TEXTE",
      role: "AUTEUR",
      reference_url:
        "https://fr.wikipedia.org/wiki/Code_de_proc%C3%A9dure_p%C3%A9nale_(France)",
      note: "Fixe l'effet suspensif du pourvoi (article 569) et le régime de l'exécution provisoire des peines (article 471).",
    },
    {
      name: "Marine Le Pen",
      kind: "PERSONNE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Marine_Le_Pen",
      note: "Élue condamnée en 2025 puis en appel en 2026 dans l'affaire des assistants parlementaires du FN ; le débat sur la portée du pourvoi porte sur sa situation.",
    },
  ],
  consensus_score: 100,
  premises: [
    {
      claim_part:
        "« La Cour de cassation peut déclarer un prévenu innocent des faits reprochés »",
      status: "FAUX",
      detail:
        "Elle contrôle la conformité au droit et la régularité de la procédure et « ne connaît pas du fond des affaires » (article L. 411-2 du code de l'organisation judiciaire) : les moyens qui remettent en cause l'appréciation souveraine des faits par les juges du fond sont écartés. Une cassation annule une décision, elle ne constate pas l'innocence.",
    },
    {
      claim_part:
        "« Le pourvoi suspend automatiquement toute peine d'inéligibilité »",
      status: "CONFUSION_CONCEPTUELLE",
      detail:
        "L'effet suspensif de l'article 569 du code de procédure pénale cède lorsque le juge a ordonné l'exécution provisoire : « le caractère non suspensif du recours, lorsque l'exécution provisoire a été ordonnée, assure une juste conciliation » (chambre criminelle, 21 septembre 2022). Les élus locaux condamnés sont démis d'office avant même que la condamnation soit définitive (Conseil constitutionnel, 28 mars 2025).",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "66c272b9-bd35-47c2-872a-db5cc604e489",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Code de procédure pénale — article 569",
      author_or_institution: "Légifrance (République française)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Pendant les délais du recours en cassation et, s'il y a eu recours, jusqu'au prononcé de l'arrêt de la Cour de cassation, il est sursis à l'exécution de l'arrêt de la cour d'appel, sauf en ce qui concerne les condamnations civiles, et à moins que la cour d'appel ne confirme le mandat décerné par le tribunal en application de l'article 464-1 ou de l'article 465, premier alinéa, ou ne décerne elle-même mandat sous les mêmes conditions et selon les mêmes règles.",
      context_explanation:
        "Texte en vigueur (rédaction issue de la loi n° 2019-222 du 23 mars 2019) : le pourvoi suspend par principe l'exécution de l'arrêt de la cour d'appel, sauf exceptions limitées (condamnations civiles, mandats maintenus ou décernés). Ce sursis n'est pas absolu : les dispositions légales d'exécution provisoire, comme celles de l'article 471 du même code, y dérogent.",
      original_url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038313666",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "4b0d65e8-a253-4ae8-8da4-df6a97bbd75d",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Code de procédure pénale — article 471, alinéa 4",
      author_or_institution: "Légifrance (République française)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Les sanctions pénales prononcées en application des articles 131-4-1 à 131-11 et 132-25 à 132-70 du code pénal peuvent être déclarées exécutoires par provision.",
      context_explanation:
        "Cet alinéa permet au juge de déclarer la sanction exécutoire par provision, sans attendre une condamnation définitive : c'est la base légale de l'exécution immédiate malgré appel ou pourvoi. La peine complémentaire d'inéligibilité relève de ces sanctions ; le Conseil constitutionnel a déclaré l'alinéa conforme le 5 décembre 2025, en imposant une motivation spéciale sur la proportionnalité.",
      original_url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000041402532",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "737a9b8a-7cde-4527-9d9f-705374967c65",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Code pénal — article 131-26-2",
      author_or_institution: "Légifrance (République française)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Le prononcé de la peine complémentaire d'inéligibilité mentionnée au 2° de l'article 131-26 et à l'article 131-26-1 est obligatoire à l'encontre de toute personne coupable d'un délit mentionné au II du présent article ou d'un crime.",
      context_explanation:
        "Introduit par la loi n° 2017-1339 du 15 septembre 2017 pour la confiance dans la vie politique : pour les atteintes à la probité — dont le détournement de fonds publics — l'inéligibilité n'est plus une simple faculté mais la règle, la juridiction ne pouvant l'écarter que par une décision spécialement motivée (III du même article).",
      original_url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037526934",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "13429964-fded-4c04-a58a-eb308a4aa4f9",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Code de l'organisation judiciaire — article L. 411-2",
      author_or_institution: "Légifrance (République française)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "La Cour de cassation statue sur les pourvois en cassation formés contre les arrêts et jugements rendus en dernier ressort par les juridictions de l'ordre judiciaire. La Cour de cassation ne connaît pas du fond des affaires, sauf disposition législative contraire.",
      context_explanation:
        "Définition légale de la mission de la Cour de cassation : statuer sur les pourvois formés contre les décisions rendues en dernier ressort, en contrôlant la conformité au droit — sans réexaminer le fond. La jurisprudence en tire que les moyens de fait, qui inviteraient la Cour à revenir sur l'appréciation souveraine des juges du fond, sont écartés.",
      original_url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006572199",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "089ffd37-0b74-4fda-a67e-4fb811abfe23",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Arrêt n° 22-82.377 du 21 septembre 2022, chambre criminelle — non-renvoi d'une QPC sur l'exécution provisoire d'une peine complémentaire",
      author_or_institution: "Cour de cassation, chambre criminelle (France)",
      publication_date: "2022-09-21",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Enfin, le caractère non suspensif du recours, lorsque l'exécution provisoire a été ordonnée, assure une juste conciliation entre, d'une part, les principes et droits invoqués par le demandeur, d'autre part, les objectifs à valeur constitutionnelle de sauvegarde de l'ordre public et de bonne administration de la justice.",
      context_explanation:
        "Condamné notamment pour fraude fiscale, le demandeur soutenait qu'aucune voie n'était ouverte pour suspendre l'exécution provisoire d'une peine complémentaire. La chambre criminelle refuse de renvoyer sa question au Conseil constitutionnel : le recours n'est pas suspensif lorsque l'exécution provisoire a été ordonnée, et cette conciliation avec les objectifs de valeur constitutionnelle est conforme.",
      original_url:
        "https://qpc360.conseil-constitutionnel.fr/2022-09-21/arret-21-septembre-2022-22-82377",
      author_reference_url: "https://fr.wikipedia.org/wiki/Cour_de_cassation_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "8c56cf78-3832-4846-8c70-21f25adfaa6f",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Arrêt n° 24-83.556 du 18 décembre 2024, chambre criminelle — non-renvoi d'une QPC sur l'exécution provisoire d'une peine d'inéligibilité",
      author_or_institution: "Cour de cassation, chambre criminelle (France)",
      publication_date: "2024-12-18",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "En premier lieu, d'une part, la faculté pour la juridiction d'ordonner l'exécution provisoire d'une peine d'inéligibilité répond à l'objectif d'intérêt général visant à favoriser, en cas de recours, l'exécution de la peine et à prévenir la récidive.",
      context_explanation:
        "Condamné à cinq ans d'inéligibilité avec exécution provisoire « emportant cessation des mandats en cours », le demandeur reprochait à ce régime de faire exécuter la peine à une personne encore présumée innocente. La chambre criminelle juge que les dispositions ne méconnaissent ni la présomption d'innocence, ni le droit au recours effectif, ni le droit d'éligibilité — l'exécution provisoire n'étant ordonnée qu'après un débat contradictoire.",
      original_url:
        "https://qpc360.conseil-constitutionnel.fr/2024-12-18/arret-18-decembre-2024-24-83556",
      author_reference_url: "https://fr.wikipedia.org/wiki/Cour_de_cassation_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "b74dc216-c299-499f-acd0-512b4692e686",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Justice : Marine Le Pen et le spectre de l'inéligibilité à la présidentielle",
      author_or_institution:
        "Camille Aynès, maître de conférences en droit public, Université Paris Nanterre (The Conversation France)",
      publication_date: "2025-03-28",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Mais cela était sans compter sur l'exception qui offre la possibilité aux juges de décider d'assortir le prononcé de certaines sanctions pénales de l'« exécution provisoire », ce qui a pour effet de rendre leur application immédiate.",
      context_explanation:
        "Analyse publiée la veille du jugement du tribunal correctionnel de Paris. L'autrice rappelle que, par principe, une condamnation ne s'applique qu'une fois définitive — après épuisement des recours — et que c'est l'exécution provisoire qui rend la sanction immédiate ; elle note aussi que l'inéligibilité est devenue obligatoire pour les atteintes à la probité.",
      original_url:
        "https://theconversation.com/justice-marine-le-pen-et-le-spectre-de-lineligibilite-a-la-presidentielle-252893",
      author_reference_url: "https://fr.wikipedia.org/wiki/The_Conversation_(m%C3%A9dia)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
    {
      id: "aa31113d-8513-430e-a6d1-c068d5e365fc",
      spectrum: "CENTRE",
      source_name:
        "Décision n° 2025-1129 QPC du 28 mars 2025 — M. Rachadi S. [démission d'office d'un conseiller municipal condamné à une peine d'inéligibilité avec exécution provisoire]",
      author_or_institution: "Conseil constitutionnel (France)",
      publication_date: "2025-03-28",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Il résulte de la jurisprudence constante du Conseil d'État, telle qu'elle ressort notamment de la décision de renvoi de la question prioritaire de constitutionnalité, que le préfet est tenu de déclarer immédiatement démissionnaire d'office le conseiller municipal non seulement en cas de condamnation à une peine d'inéligibilité devenue définitive, mais aussi lorsque la condamnation est assortie de l'exécution provisoire.",
      context_explanation:
        "Le Conseil constitutionnel valide, sous réserve de proportionnalité, la démission d'office immédiate d'un élu local condamné à une inéligibilité assortie de l'exécution provisoire : la mesure met en œuvre l'objectif de valeur constitutionnelle de sauvegarde de l'ordre public et l'exigence de probité des élus. La démission n'exige donc pas une condamnation définitive ; seul le juge pénal doit motiver la proportionnalité de l'atteinte au mandat et à la liberté de l'électeur.",
      original_url: "https://www.conseil-constitutionnel.fr/decision/2025/20251129QPC.htm",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 7,
    },
    {
      id: "ba4d1d53-eef0-4513-bc01-a06e3412e814",
      spectrum: "CENTRE",
      source_name:
        "Avis du 19 juin 2025 — conséquences d'une peine d'inéligibilité assortie de l'exécution provisoire sur le mandat d'un représentant au Parlement européen",
      author_or_institution: "Conseil d'État (France)",
      publication_date: "2025-06-19",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "En cas de prononcé d'une peine assortie de l'exécution provisoire, celle-ci conduit à déroger à l'effet suspensif de l'appel (article 506 du code de procédure pénale) ou du pourvoi en cassation (articles 512 et 569 du même code).",
      context_explanation:
        "Avis rendu à la demande du Gouvernement après la condamnation du 31 mars 2025. Le Conseil d'État énonce que l'exécution provisoire écarte l'effet suspensif de l'appel comme du pourvoi, puis distingue le régime des mandats : la déchéance d'un mandat de parlementaire — national ou européen — suppose une condamnation définitive, tandis que les élus locaux sont, eux, déclarés démissionnaires d'office dès l'exécution provisoire.",
      original_url:
        "https://www.conseil-etat.fr/avis-consultatifs/derniers-avis-rendus/au-gouvernement/avis-relatif-aux-consequences-d-une-peine-d-ineligibilite-assortie-de-l-execution-provisoire-sur-le-mandat-d-un-representant-au-parlement-europeen",
      author_reference_url: "https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 8,
    },
    {
      id: "29676e11-d633-4e37-88f6-713c29f02e8b",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "Procès du FN : Marine Le Pen condamnée à cinq ans d'inéligibilité et quatre ans de prison",
      author_or_institution: "Le Figaro (avec AFP)",
      publication_date: "2025-03-31",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Au terme de deux mois de procès (30 septembre-27 novembre) et à la surprise générale, l'accusation avait requis à l'encontre de la cheffe de file de l'extrême droite une peine de cinq ans d'inéligibilité avec exécution provisoire (s'appliquant immédiatement, même en cas d'appel) en plus de cinq ans de prison dont deux ferme (une peine aménageable), ainsi que 300.000 euros d'amende.",
      context_explanation:
        "Récit du jugement : le Figaro y explicite le sens de l'exécution provisoire — la peine s'applique immédiatement, y compris en cas d'appel. C'est cette mécanique qui a nourri le débat public et les confusions sur la portée des recours, au cœur du dossier des assistants parlementaires du FN.",
      original_url:
        "https://www.lefigaro.fr/actualite-france/proces-du-fn-marine-le-pen-condamnee-a-une-peine-d-ineligibilite-avec-execution-immediate-20250331",
      author_reference_url: "https://fr.wikipedia.org/wiki/Le_Figaro",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 9,
    },
  ],
};

/**
 * Dossier politique : l'affaire des assistants parlementaires du FN/RN et son
 * pourvoi en cassation — « annule la culpabilité et suspend l'inéligibilité »
 * est faux : la Cour juge le droit sans réexaminer les faits, et l'effet
 * suspensif du pourvoi cède devant l'exécution provisoire, appliquée dès le
 * 31 mars 2025 dans cette affaire. Sources : codes de procédure pénale (569,
 * 471) et pénal (131-26-2) ; saisine de l'OLAF par le Parlement européen
 * (2015) ; communiqués de la cour d'appel de Paris (7 juillet 2026) et de la
 * Cour de cassation (8 juillet 2026) ; Conseil d'État (10 novembre 2025) ;
 * Conseil constitutionnel (2025-1175 QPC) ; analyse d'Anne Ponseille (Club
 * des juristes, 2026) ; Le Figaro et L'Humanité (7 juillet 2026).
 */
export const ASSISTANTS_RN_DOSSIER: Dossier = {
  id: "628dd9b6-1c47-4d51-b798-5337e43e3b92",
  slug: "assistants-rn-pourvoi-cassation-ineligibilite",
  claim_title:
    "Affaire des assistants RN : le pourvoi en cassation annule la culpabilité et suspend l'inéligibilité",
  verdict: "FAUX",
  verdict_summary:
    "La Cour de cassation n'est pas un troisième degré de juridiction : elle ne rejuge ni la matérialité des emplois fictifs ni la culpabilité, fixées souverainement par les juges du fond. De plus, si l'exécution provisoire est ordonnée (art. 471 du code de procédure pénale ; loi n° 2017-1339 du 15 septembre 2017), la peine d'inéligibilité s'applique immédiatement sans être suspendue par le pourvoi — comme au jugement du 31 mars 2025, où l'exécution provisoire a entraîné la démission d'office du mandat départemental. La suspension d'exécution qui court depuis le pourvoi tient seulement à l'absence d'exécution provisoire sur l'arrêt d'appel : elle n'efface rien, et la condamnation redeviendra exécutoire si le pourvoi est rejeté.",
  category: "POLITIQUE",
  protagonists: [
    {
      name: "Marine Le Pen",
      kind: "PERSONNE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Marine_Le_Pen",
      note: "Condamnée pour détournement de fonds publics dans l'affaire des assistants parlementaires du FN ; son pourvoi en cassation est en cours d'examen (arrêt attendu au plus tard début avril 2027).",
    },
    {
      name: "Rassemblement national",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Rassemblement_national",
      note: "Condamné comme personne morale pour recel habituel de détournements de fonds publics, également redevable de l'indemnisation du Parlement européen.",
    },
    {
      name: "Cour de cassation",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Cour_de_cassation_(France)",
      note: "Juge du droit, saisie des pourvois de l'affaire : elle ne réexamine pas les faits et sa chambre criminelle rendra son arrêt au plus tard début avril 2027.",
    },
    {
      name: "Cour d'appel de Paris",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Cour_d%27appel_de_Paris",
      note: "A rendu le 7 juillet 2026 l'arrêt confirmant la culpabilité et réduisant les peines, sans assortir son arrêt d'exécution provisoire.",
    },
    {
      name: "Parlement européen",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Parlement_europ%C3%A9en",
      note: "Partie civile de l'affaire, née de sa saisine de l'OLAF en 2015 ; la cour a évalué à 2,8 millions d'euros les détournements commis à son détriment.",
    },
    {
      name: "Office européen de lutte antifraude",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url:
        "https://fr.wikipedia.org/wiki/Office_europ%C3%A9en_de_lutte_antifraude",
      note: "Saisi en mars 2015 par le Parlement européen ; son enquête a conduit aux poursuites en France.",
    },
  ],
  consensus_score: 100,
  premises: [
    {
      claim_part:
        "« La Cour de cassation peut innocenter les cadres du RN sur les faits reprochés »",
      status: "FAUX",
      detail:
        "Elle est « le juge du droit » : elle ne réexamine pas les faits à l'origine de la poursuite, mais vérifie que la loi a été correctement appliquée (communiqué de la Cour de cassation du 8 juillet 2026) ; les constatations de fait — l'organisation mise en place, les emplois fictifs — ont été fixées souverainement par les juges du fond. Une cassation, si elle était prononcée, annulerait l'arrêt et renverrait l'affaire devant une autre cour d'appel : elle n'innocente personne.",
    },
    {
      claim_part:
        "« Former un pourvoi suspend automatiquement toute interdiction de se présenter à une élection »",
      status: "CONFUSION_CONCEPTUELLE",
      detail:
        "L'effet suspensif ordinaire de l'article 569 du code de procédure pénale est expressément écarté lorsque la juridiction ordonne l'exécution provisoire prévue par la loi (article 471) : c'est alors l'exécution immédiate qui prime. Dans cette affaire, le jugement du 31 mars 2025 était assorti de l'exécution provisoire et a été exécuté (arrêté préfectoral de démission d'office du 10 avril 2025, confirmé par le Conseil d'État) ; l'arrêt d'appel du 7 juillet 2026 n'est assorti d'aucune exécution provisoire, d'où la suspension d'exécution — temporaire — depuis le pourvoi.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "8f6420ad-c725-49a7-ab0f-d92a42144ce6",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Code de procédure pénale — article 569",
      author_or_institution: "Légifrance (République française)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Pendant les délais du recours en cassation et, s'il y a eu recours, jusqu'au prononcé de l'arrêt de la Cour de cassation, il est sursis à l'exécution de l'arrêt de la cour d'appel, sauf en ce qui concerne les condamnations civiles, et à moins que la cour d'appel ne confirme le mandat décerné par le tribunal en application de l'article 464-1 ou de l'article 465, premier alinéa, ou ne décerne elle-même mandat sous les mêmes conditions et selon les mêmes règles.",
      context_explanation:
        "Règle effectivement appliquée dans l'affaire : la cour d'appel de Paris n'ayant ordonné aucune exécution provisoire, l'exécution de son arrêt est suspendue pendant le pourvoi (communiqué de la Cour de cassation du 8 juillet 2026). Deux nuances souvent oubliées : ce sursis ne couvre pas les condamnations civiles — l'indemnisation du Parlement européen reste due — et il ne suspend que l'exécution, jamais la culpabilité, qui demeure établie tant que la Cour de cassation n'a pas statué.",
      original_url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038313666",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "54253637-7112-4a0c-a662-18b34e0fc64c",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Code de procédure pénale — article 471, alinéa 4",
      author_or_institution: "Légifrance (République française)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Les sanctions pénales prononcées en application des articles 131-4-1 à 131-11 et 132-25 à 132-70 du code pénal peuvent être déclarées exécutoires par provision.",
      context_explanation:
        "La dérogation qui dément le récit d'un pourvoi « suspendant » par nature : le juge peut déclarer la sanction exécutoire par provision, appel et pourvoi compris — l'inéligibilité en relève. Le tribunal correctionnel de Paris a usé de cette faculté le 31 mars 2025, et l'inéligibilité de cinq ans s'est appliquée immédiatement. Le Conseil constitutionnel a déclaré cet alinéa conforme le 5 décembre 2025, sous réserve d'une motivation spéciale sur la proportionnalité.",
      original_url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000041402532",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "486332ef-7f9e-46ee-a44c-a92b2683fa2a",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Code pénal — article 131-26-2",
      author_or_institution: "Légifrance (République française)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Le prononcé de la peine complémentaire d'inéligibilité mentionnée au 2° de l'article 131-26 et à l'article 131-26-1 est obligatoire à l'encontre de toute personne coupable d'un délit mentionné au II du présent article ou d'un crime.",
      context_explanation:
        "Créé par la loi n° 2017-1339 du 15 septembre 2017 pour la confiance dans la vie politique : pour les atteintes à la probité — dont le détournement de fonds publics, visé au 5° du II — l'inéligibilité est en principe obligatoire, la juridiction ne pouvant l'écarter que par une décision spécialement motivée (III du même article). C'est le fondement des peines d'inéligibilité prononcées dans l'affaire.",
      original_url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037526934",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "a613636b-5491-4078-960f-6a80d6491381",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Le PE saisit l'OLAF d'éventuelles irrégularités financières de la part du FN",
      author_or_institution: "Parlement européen",
      publication_date: "2015-03-09",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Agissant à la requête de l'administration du Parlement européen et conformément au règlement de l'institution, le Président Martin Schulz a saisi lundi l'Office européen de lutte antifraude (OLAF) d'éventuelles irrégularités financières commises par le parti français Front National. Les éventuelles irrégularités concernent des salaires issus du budget européen versés à des assistants de parlementaires européens.",
      context_explanation:
        "Point de départ de l'affaire, le 9 mars 2015 : la saisine de l'OLAF par le Parlement européen, après la constatation que vingt assistants d'eurodéputés FN figuraient à des postes officiels du parti. Les montants évoqués à l'époque par la presse n'ont jamais eu valeur de rapport public ; la justice a finalement chiffré le préjudice du Parlement européen à 2,8 millions d'euros (communiqué de la cour d'appel du 7 juillet 2026).",
      original_url:
        "https://www.europarl.europa.eu/news/fr/press-room/20150309IPR32603/le-pe-saisit-l-olaf-d-eventuelles-irregularites-financieres-de-la-part-du-fn",
      author_reference_url: "https://fr.wikipedia.org/wiki/Parlement_europ%C3%A9en",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "f9a75393-24b4-4a77-b94b-95b9d30628c0",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Arrêt du 7 juillet 2026 — communiqué de la cour d'appel de Paris (affaire dite « des assistants parlementaires du Front National »)",
      author_or_institution: "Cour d'appel de Paris (première présidence, porte-parole)",
      publication_date: "2026-07-07",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "La cour a retenu qu'une organisation avait été mise en place pour permettre la prise en charge par le Parlement européen de la rémunération des assistants parlementaires de députés européens du Front National, devenu Rassemblement National, alors que leurs activités étaient sans lien avec le mandat de leur député européen et qu'ils travaillaient en réalité pour le parti politique national.",
      context_explanation:
        "L'arrêt confirme la culpabilité des douze prévenus (détournement de fonds publics, complicité, recel) et chiffre le préjudice du Parlement européen à 2,8 millions d'euros. C'est cette matérialité — l'organisation, les emplois fictifs — que le pourvoi ne remet pas en cause devant la Cour de cassation, juge du droit.",
      original_url:
        "https://www.cours-appel.justice.fr/sites/default/files/2026-07/20260707%20-%20CA%20Paris%20-%20CP.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Cour_d%27appel_de_Paris",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "18351747-2c10-4c76-a57d-9fcb5b535096",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Communiqué du 8 juillet 2026 — affaire dite « des assistants parlementaires du Front National »",
      author_or_institution: "Cour de cassation (France)",
      publication_date: "2026-07-08",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "La Cour de cassation est le juge du droit. Elle ne réexamine pas les faits à l'origine de la poursuite, mais vérifie que la loi a été correctement appliquée.",
      context_explanation:
        "La Cour rappelle son office en précisant l'effet du pourvoi : « Sauf exécution provisoire, le pourvoi a un effet suspensif » et, la cour d'appel n'ayant prononcé l'exécution provisoire sur aucune partie de sa décision, « les dispositions pénales de cet arrêt (...) ne peuvent pas être mises à exécution ». Arrêt attendu au plus tard début avril 2027.",
      original_url:
        "https://www.courdecassation.fr/toutes-les-actualites/2026/07/08/affaire-dite-des-assistants-parlementaires-du-front-national",
      author_reference_url: "https://fr.wikipedia.org/wiki/Cour_de_cassation_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "dbc87b93-8c0e-48b7-8834-ab361ee54856",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Que peut encore changer le pourvoi en cassation de Marine Le Pen ?",
      author_or_institution:
        "Anne Ponseille, maître de conférences en droit privé, Université de Montpellier (Le Club des juristes)",
      publication_date: "2026-07-09",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Pendant les délais du recours en cassation et, si recours il y a, jusqu'à ce que la chambre criminelle de la Cour de cassation rende sa décision, il est sursis à l'exécution de l'arrêt de la cour d'appel. Cet effet suspensif concerne les peines prononcées qui n'ont donc pas à être exécutées immédiatement (art. 569 C. proc. pén.). On soulignera cependant que ce sursis à exécution ne concerne pas les condamnations civiles et, en l'espèce, Marine Le Pen a été condamnée solidairement avec d'autres prévenus, dont le Rassemblement national, au paiement de dommages et intérêts au Parlement européen.",
      context_explanation:
        "Analyse universitaire du pourvoi : le sursis à exécution et son périmètre (les peines, pas les condamnations civiles), puis les issues possibles — rejet ou cassation avec renvoi devant une autre cour d'appel. L'autrice rappelle que la Cour contrôle la qualification, la légalité des peines et la motivation, sans réexaminer les faits.",
      original_url:
        "https://www.leclubdesjuristes.com/justice/que-peut-encore-changer-le-pourvoi-en-cassation-de-marine-le-pen-16881/",
      author_reference_url: "https://fr.wikipedia.org/wiki/Club_des_juristes",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
    {
      id: "01d8d3d3-daff-4665-913d-c60e5e1fe3b7",
      spectrum: "CENTRE",
      source_name:
        "Décision n° 2025-1175 QPC du 5 décembre 2025 — M. Bernard P. [exécution provisoire des peines alternatives, des peines complémentaires et des mesures de personnalisation de la peine en matière correctionnelle]",
      author_or_institution: "Conseil constitutionnel (France)",
      publication_date: "2025-12-05",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Dès lors que l'exécution provisoire prévue par ces dispositions s'attache à une sanction pénale prononcée par la juridiction répressive après que celle-ci a décidé que la culpabilité du prévenu est légalement établie, elle n'est pas incompatible avec le principe de la présomption d'innocence garanti par l'article 9 de la Déclaration de 1789.",
      context_explanation:
        "Réponse à l'argument « on exécute une peine avant toute condamnation définitive » : l'exécution provisoire s'attache à une culpabilité déjà établie par le juge, et elle est conforme à la Constitution. Le Conseil l'assortit d'une réserve : le juge doit motiver spécialement la proportionnalité — exigence déjà posée pour l'inéligibilité par la décision n° 2025-1129 QPC du 28 mars 2025.",
      original_url: "https://www.conseil-constitutionnel.fr/decision/2025/20251175QPC.htm",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 7,
    },
    {
      id: "61f9096f-13cb-4d13-b609-c6fabcd9869a",
      spectrum: "CENTRE",
      source_name:
        "Exécution provisoire d'une peine d'inéligibilité : le Conseil d'État confirme la démission d'office de Mme Marine Le Pen de son mandat de conseillère départementale (actualité du 10 novembre 2025)",
      author_or_institution: "Conseil d'État (France)",
      publication_date: "2025-11-10",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Le 31 mars 2025, Mme Marine Le Pen, députée et conseillère départementale du Pas-de-Calais, a été condamnée par le tribunal judiciaire de Paris à une peine d'inéligibilité de cinq ans avec exécution provisoire, c'est-à-dire avec application immédiate. Conformément au code électoral, le préfet du Pas-de-Calais a, par un arrêté du 10 avril 2025, déclaré Mme Le Pen démissionnaire d'office de son mandat de conseillère départementale.",
      context_explanation:
        "L'exécution provisoire n'est pas un mot théorique : elle a été appliquée dans cette affaire dès le printemps 2025, pendant la procédure. Le Conseil d'État rejette la QPC de Marine Le Pen et confirme la démission d'office, en rappelant que les élus locaux (démis d'office dès l'exécution provisoire) ne sont pas dans la même situation que les parlementaires (déchéance subordonnée à une condamnation définitive).",
      original_url:
        "https://www.conseil-etat.fr/actualites/execution-provisoire-d-une-peine-d-ineligibilite-le-conseil-d-etat-confirme-la-demission-d-office-de-mme-marine-le-pen-de-son-mandat-de-conseille",
      author_reference_url: "https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 8,
    },
    {
      id: "70f12651-a9b5-48ad-8202-a3339a4b245b",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "Marine Le Pen, condamnée à 15 mois ferme d'inéligibilité, pourrait a priori se présenter à la présidentielle",
      author_or_institution: "Le Figaro",
      publication_date: "2026-07-07",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "La cour a considéré qu'elle a déjà purgé une peine de quinze mois d'inéligibilité depuis le 31 mars 2025, date de sa condamnation en première instance.",
      context_explanation:
        "L'arrêt d'appel a ramené l'inéligibilité à 45 mois, dont 30 avec sursis, en imputant les quinze mois déjà courus sous l'exécution provisoire du jugement : illustration concrète de ce que produit l'exécution provisoire avant même que la condamnation ne soit définitive. La fraction ferme étant purgée, Marine Le Pen peut « a priori » se présenter.",
      original_url:
        "https://www.lefigaro.fr/politique/marine-le-pen-condamnee-a-15-mois-ferme-d-ineligibilite-pourrait-a-priori-se-presenter-a-la-presidentielle-20260707",
      author_reference_url: "https://fr.wikipedia.org/wiki/Le_Figaro",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 9,
    },
    {
      id: "66f89e3f-fa06-4631-836f-8538ddd10139",
      spectrum: "GAUCHE",
      source_name:
        "Marine Le Pen condamnée… Mais pas complètement écartée de la présidentielle de 2027",
      author_or_institution: "L'Humanité (Florent Le Du)",
      publication_date: "2026-07-07",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "La cour considère que Marine Le Pen a déjà purgé 15 mois de peine d'inéligibilité depuis le 31 mars 2025. Elle est donc éligible et peut juridiquement choisir de se présenter à l'élection présidentielle.",
      context_explanation:
        "Récit de gauche de la décision : la réduction de peine et l'imputation du temps déjà purgé rendent l'élue de nouveau éligible, ce qui place la présidentielle 2027 et le pourvoi au centre du jeu — sans que cela change quoi que ce soit à la culpabilité établie ni au caractère non définitif de la condamnation.",
      original_url:
        "https://www.humanite.fr/politique/extreme-droite/marine-le-pen-condamnee-mais-pas-completement-ecartee-de-la-presidentielle-de-2027",
      author_reference_url: "https://fr.wikipedia.org/wiki/L%27Humanit%C3%A9",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 10,
    },
  ],
};

export const EXPULSION_JUGES_DOSSIER: Dossier = {
  id: "054e7ed1-684a-4161-8092-55af18bf6613",
  slug: "expulsion-etrangers-delinquants-juges-et-droit",
  claim_title: "Les juges et l'État de droit empêchent l'expulsion des étrangers délinquants",
  verdict: "FAUX",
  category: "POLITIQUE",
  protagonists: [
    {
      name: "Obligation de quitter le territoire français",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Obligation_de_quitter_le_territoire_fran%C3%A7ais",
      note: "Mesure d'éloignement administrative au cœur du débat (prononcé, exécution, contentieux).",
    },
    {
      name: "Cour des comptes (France)",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)",
      note: null,
    },
    {
      name: "Sénat (France)",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      note: "Avis budgétaire de la commission des lois, tome « Immigration, asile et intégration » (2024).",
    },
    {
      name: "Conseil d'État (France)",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)",
      note: null,
    },
  ],
  verdict_summary:
    "Le droit français et européen prévoient explicitement l'éloignement pour menace à l'ordre public : l'expulsion est ouverte sur ce fondement (CESEDA, art. L. 631-1) et l'article 8 de la Convention européenne des droits de l'homme autorise les ingérences « nécessaires à la sûreté publique… à la défense de l'ordre et à la prévention des infractions pénales ». L'échec de l'exécution tient à d'autres causes : la Cour des comptes relève qu'« autour de 10 % » des OQTF sont exécutées, du fait de l'identification incertaine des personnes, du manque de places en rétention et de la réticence des pays d'origine à délivrer les laissez-passer consulaires (57,5 % de délivrance dans les délais en 2024, selon la commission des lois du Sénat). Le contentieux n'annule qu'une minorité des mesures (18 % des OQTF en 2022).",
  consensus_score: 95,
  premises: [
    {
      claim_part: "« Les traités internationaux interdisent d'expulser un étranger dangereux »",
      status: "FAUX",
      detail:
        "L'article 8 § 2 de la CEDH admet expressément les ingérences « nécessaires à la sécurité nationale, à la sûreté publique… à la défense de l'ordre et à la prévention des infractions pénales ». Le CESEDA permet à l'autorité administrative d'expulser un étranger dont la présence constitue une menace grave pour l'ordre public (art. L. 631-1), l'article L. 631-3 écartant même les protections de certaines catégories en cas de condamnation définitive à cinq ans ou plus d'emprisonnement.",
    },
    {
      claim_part: "« L'échec des expulsions résulte d'annulations systématiques par les juges »",
      status: "CONFUSION_CONCEPTUELLE",
      detail:
        "En 2022, les tribunaux administratifs ont annulé 18 % des OQTF qui leur étaient présentées (Cour des comptes) : une minorité, pas une annulation systématique. La Cour identifie d'autres causes premières : identification incertaine (20 à 30 % des personnes non identifiées avec certitude), capacité de rétention limitée (1 717 places pour 447 257 OQTF prononcées entre 2019 et 2022) et surtout réticence des pays d'origine à délivrer les laissez-passer consulaires, indispensables en l'absence de passeport.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "77f00ed8-6c03-44a4-b60b-a6264b92bd84",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Code de l'entrée et du séjour des étrangers et du droit d'asile — articles L. 631-1 et L. 631-3",
      author_or_institution: "Légifrance (République française)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "L'autorité administrative peut décider d'expulser un étranger lorsque sa présence en France constitue une menace grave pour l'ordre public, sous réserve des conditions propres aux étrangers mentionnés aux articles L. 631-2 et L. 631-3.",
      context_explanation:
        "Article L. 631-1 du CESEDA en vigueur : l'expulsion pour menace grave à l'ordre public est une faculté expresse de l'administration. L'article L. 631-3 énumère les protections résiduelles (résidence depuis l'âge de treize ans, vingt ans, dix ans avec mariage ou enfant français, état de santé) et les écarte notamment en cas de condamnation définitive pour des crimes ou délits punis de cinq ans ou plus d'emprisonnement, ou de trois ans en réitération.",
      original_url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042775403",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "aaa8418c-e58e-4976-a7ca-4009715309c7",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Convention de sauvegarde des droits de l'homme et des libertés fondamentales — article 8, § 2",
      author_or_institution: "Conseil de l'Europe (texte reproduit par la CNCDH)",
      publication_date: "1950-11-04",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Il ne peut y avoir ingérence d'une autorité publique dans l'exercice de ce droit que pour autant que cette ingérence est prévue par la loi et qu'elle constitue une mesure qui, dans une société démocratique, est nécessaire à la sécurité nationale, à la sûreté publique, au bien-être économique du pays, à la défense de l'ordre et à la prévention des infractions pénales, à la protection de la santé ou de la morale, ou à la protection des droits et libertés d'autrui.",
      context_explanation:
        "L'article 8 protège la vie privée et familiale ; son § 2 énonce les motifs d'ingérence licite, dont la sûreté publique et la prévention des infractions pénales. Les traités n'interdisent donc pas l'éloignement d'un étranger dangereux : ils l'encadrent (licéité, nécessité, proportionnalité).",
      original_url: "https://www.cncdh.fr/sites/default/files/2022-02/cedh_0_1.pdf",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Convention_europ%C3%A9enne_des_droits_de_l%27homme",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "647aff80-48e8-4fa5-bed6-511eccf0745a",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Rapport public thématique — La politique de lutte contre l'immigration irrégulière (janvier 2024)",
      author_or_institution: "Cour des comptes (France)",
      publication_date: "2024-01-04",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "De nombreux pays d'origine sont réticents à délivrer un laissez-passer consulaire à leurs ressortissants, pourtant indispensable à leur éloignement en l'absence de passeport.",
      context_explanation:
        "Diagnostic de la Cour : malgré 447 257 OQTF prononcées entre 2019 et 2022, « seule une petite minorité — autour de 10 % — des obligations de quitter le territoire français sont exécutées ». Obstacles identifiés : identification incertaine (20 à 30 %), surveillance des CRA limitée par le manque de policiers (1 717 places) et réticence des pays d'origine — la Cour recommande de centraliser les demandes de laissez-passer consulaires. Autre volet : 18 % des OQTF ont été annulées par les tribunaux administratifs en 2022.",
      original_url:
        "https://www.ccomptes.fr/sites/default/files/2024-01/20240104-Politique-lutte-contre-immigration-irreguliere.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "1ddb54d6-f791-4011-8157-1ed281d33112",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "Sénat — Avis n° 150 (2024-2025), commission des lois, tome II « Immigration, asile et intégration » (PLF 2025)",
      author_or_institution: "Muriel Jourda et Olivier Bitz, rapporteurs (Sénat)",
      publication_date: "2024-11-21",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Les explications avancées à cette stagnation des éloignements dans les documents budgétaires mentionnent notamment le manque de coopération de certains États d'origine, au premier rang desquels les trois États du Maghreb. Pour rappel, le taux de délivrance global des laissez-passer consulaires dans les délais s'établit à 57,5 % en 2024.",
      context_explanation:
        "Les rapporteurs de la commission des lois constatent la stagnation des éloignements forcés (11 722 en 2023, contre 18 906 en 2019) : le goulot d'étranglement est diplomatique — la coopération des pays d'origine, dont la délivrance des laissez-passer consulaires (57,5 % dans les délais en 2024) —, l'obstacle n'étant ni la loi ni les juges.",
      original_url: "https://www.senat.fr/rap/a24-150-2/a24-150-21.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "218cc6b4-e430-4383-91fb-c78f89b44416",
      spectrum: "CENTRE",
      source_name:
        "Étude — Simplifier le contentieux des étrangers dans l'intérêt de tous (20 propositions)",
      author_or_institution: "Conseil d'État (France)",
      publication_date: "2020-10-09",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Après des réformes successives ces vingt dernières années, le droit des étrangers est devenu d'une complexité excessive, avec une multiplicité de règles particulières, de procédures et de délais. Devenu peu lisible ou compréhensible pour l'ensemble des acteurs, il suscite de plus en plus de contentieux devant la justice administrative, allant jusqu'à représenter 40 % de l'activité des tribunaux administratifs et 50 % de l'activité des cours administratives d'appel.",
      context_explanation:
        "Étude demandée par le Premier ministre : le Conseil d'État décrit un contentieux de masse né de l'empilement des textes et écarte l'idée de transformer le juge en « juge de plein contentieux » de l'éloignement. La difficulté est organisationnelle et normative — dans un cadre où 24 000 mesures d'éloignement ont été exécutées en 2019, dont 19 000 éloignements forcés.",
      original_url:
        "https://conseil-etat.fr/actualites/simplifier-le-contentieux-des-etrangers-dans-l-interet-de-tous",
      author_reference_url: "https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "0b7a5fda-7a68-4d81-904e-82aa7ca4c98d",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "L'éloignement des fauteurs de troubles : le retrait du droit de séjour (note de jurisprudence, Revue trimestrielle de droit européen)",
      author_or_institution: "Vincent Réveillère (Revue trimestrielle de droit européen, Dalloz)",
      publication_date: "2021-10-28",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "la Cour estime que les mesures d'exécution d'une décision d'éloignement d'un citoyen de l'Union prises pour des motifs d'ordre ou de sécurité publics peuvent être similaires à celle réservées aux étrangers mais qu'elles doivent respecter le principe de proportionnalité.",
      context_explanation:
        "Analyse de la jurisprudence de la Cour de justice de l'Union (22 juin 2021, Ordre des barreaux francophones et germanophone e.a.) : le droit européen admet l'éloignement pour des motifs d'ordre ou de sécurité publics, selon des modalités comparables à celles réservées aux étrangers, sous contrôle de proportionnalité. Le droit encadre l'éloignement, il ne l'empêche pas.",
      original_url: "https://shs.hal.science/halshs-03369320",
      author_reference_url: "https://fr.wikipedia.org/wiki/Vincent_R%C3%A9veill%C3%A8re",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
  ],
};

/**
 * Dossier société : le « laxisme » prêté aux juges et la prétendue baisse des
 * peines de prison — démentis par les décomptes officiels : jamais autant de
 * détenus (90 020 au 1er septembre 2026 pour 63 348 places, densité 142,1 %),
 * quantums moyens des peines fermes en hausse continue (9,5 mois en 2020,
 * 11,0 mois pour les condamnations de 2024), années de prison ferme
 * prononcées + près de 70 % entre 2000 et 2019, et condamnation de la France
 * par la CEDH (J.M.B. et autres c. France, 2020) pour conditions de détention
 * contraires à l'article 3. Sources : statistique mensuelle de la DAP
 * (data.gouv.fr), chiffres clés de la Justice 2025, Cahiers d'études
 * pénitentiaires et criminologiques n° 65, arrêt J.M.B., Cour des comptes
 * (2023), Sénat (rapport n° 2, 2025-2026) et Libération (2026) ; analyse
 * académique d'Alexis Maitre-Millat (Université de Bordeaux).
 */
export const LAXISME_PEINES_PRISON_DOSSIER: Dossier = {
  id: "fc1805d9-9070-4553-a055-d5e9e8d0da82",
  slug: "laxisme-judiciaire-peines-prison-france",
  claim_title:
    "Les juges sont laxistes et les peines de prison diminuent en France",
  verdict: "FAUX",
  verdict_summary:
    "Loin de se vider, les prisons françaises n'ont jamais été aussi pleines : au 1er septembre 2026, 90 020 personnes étaient détenues pour 63 348 places opérationnelles, soit une densité carcérale de 142,1 % (jusqu'à plus de 176 % en maison d'arrêt), un record en hausse de 6,8 % sur un an, avec 8 347 matelas posés au sol. Les peines d'emprisonnement ferme se sont allongées : le quantum moyen est passé de 9,5 mois en 2020 à 10,2 mois en 2023, et à 11,0 mois pour les condamnations de 2024 ; les années de prison ferme prononcées ont augmenté de près de 70 % entre 2000 et 2019. Cette surpopulation structurelle a valu à la France une condamnation de la Cour européenne des droits de l'homme (arrêt J.M.B. et autres c. France, 30 janvier 2020), qui juge ces conditions de détention contraires à l'article 3 et enjoint à l'État de prendre des mesures générales de résorption.",
  category: "SOCIETE",
  protagonists: [
    {
      name: "Administration pénitentiaire",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Administration_p%C3%A9nitentiaire_en_France",
      note: "Ses décomptes mensuels (direction de l'administration pénitentiaire) établissent les records successifs de population détenue depuis 2023.",
    },
    {
      name: "Cour européenne des droits de l'homme",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url:
        "https://fr.wikipedia.org/wiki/Cour_europ%C3%A9enne_des_droits_de_l%27homme",
      note: "A condamné la France le 30 janvier 2020 (J.M.B. et autres c. France) pour des conditions de détention contraires à l'article 3 de la Convention.",
    },
    {
      name: "Sénat",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      note: "Rapport d'information n° 2 (2025-2026) de la commission des lois : la surpopulation « hors de contrôle » atteste d'une « sévérité croissante » des juridictions.",
    },
    {
      name: "Cour des comptes",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)",
      note: "Rapport public thématique d'octobre 2023 : la réponse pénale « s'est durcie », + près de 70 % d'années de prison ferme prononcées en vingt ans.",
    },
    {
      name: "Libération",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Lib%C3%A9ration_(journal)",
      note: "A documenté le record de 90 020 détenus au 1er septembre 2026 d'après les statistiques officielles du ministère de la Justice.",
    },
  ],
  consensus_score: 95,
  premises: [
    {
      claim_part:
        "« Les magistrats refusent d'incarcérer et vident les prisons »",
      status: "FAUX",
      detail:
        "Jamais autant de personnes n'ont été détenues en France : 90 020 au 1er septembre 2026 pour 63 348 places opérationnelles — une densité carcérale de 142,1 % (176,1 % dans les maisons d'arrêt selon Libération), en hausse de 6,8 % sur un an, avec 8 347 matelas au sol faute de lits. Les prisons ne se vident pas : elles débordent.",
    },
    {
      claim_part: "« Les peines prononcées sont de plus en plus courtes »",
      status: "FAUX",
      detail:
        "Le quantum moyen des peines d'emprisonnement ferme prononcées est passé de 9,5 mois en 2020 à 10,2 mois en 2023 (Cahiers d'études pénitentiaires n° 65) puis 11,0 mois pour les condamnations de 2024 (chiffres clés de la Justice) ; le nombre d'années de prison ferme prononcées a augmenté de près de 70 % entre 2000 et 2019 (Cour des comptes). Les peines s'allongent, elles ne raccourcissent pas.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "f88be2af-ffa6-4d4a-af6f-ef2fb866dede",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Statistique mensuelle de la population écrouée et détenue — situation au 1er septembre 2026",
      author_or_institution:
        "Ministère de la Justice — direction de l'administration pénitentiaire (données GENESIS / DGAP-SSER)",
      publication_date: "2026-09-01",
      quote_kind: "FAIT_DOCUMENTE",
      exact_quote:
        "Au 1er septembre 2026 : 90 020 personnes écrouées détenues pour 63 348 places opérationnelles, soit une densité carcérale de 142,1 % (141,5 % en métropole, 150,2 % en outre-mer) et 8 347 matelas au sol ; 107 700 personnes écrouées au total, en hausse de 6,2 % sur un an.",
      context_explanation:
        "Le décompte officiel qui dément directement la thèse d'une justice vidant les prisons : les effectifs détenus battent un record historique et progressent de 6,8 % sur un an. Cette statistique mensuelle est publiée par la direction de l'administration pénitentiaire et diffusée sur data.gouv.fr (fichier « statistique des établissements et des personnes écrouées »).",
      original_url:
        "https://static.data.gouv.fr/resources/statistique-mensuelle-de-la-population-ecrouee-et-detenue-en-france/20261013-162028/statistique-etablissements-01092026.xlsx",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Administration_p%C3%A9nitentiaire_en_France",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "6405fc55-5d33-4751-a5ec-266b7ee04ba0",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Les chiffres clés de la Justice — édition 2025 (peines et mesures principales prononcées)",
      author_or_institution:
        "Ministère de la Justice (sous-direction de la statistique et des études)",
      publication_date: "2025-10-28",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "dont 121 057 en tout ou partie ferme et pour lesquelles le quantum moyen ferme est de 11,0 mois.",
      context_explanation:
        "Données provisoires 2024 : les condamnations à de l'emprisonnement en tout ou partie ferme portent un quantum moyen de 11,0 mois, contre 9,5 mois en 2020 et 10,2 mois en 2023 — la sanction ferme s'allonge bien, à rebours de la prémisse d'un relâchement. Dans la même édition, le quantum moyen des réclusions criminelles atteint 15 ans.",
      original_url:
        "https://www.justice.gouv.fr/sites/default/files/2025-10/Chiffres_Cl%C3%A9s_2025.pdf",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "c7c00180-d775-4165-9b16-fc5223c27b9e",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Cahiers d'études pénitentiaires et criminologiques n° 65 — Inflation carcérale, durcir les peines, remplir les prisons",
      author_or_institution:
        "Florence de Bruyn (bureau de la donnée, de la recherche et de l'évaluation, direction de l'administration pénitentiaire) — Ministère de la Justice",
      publication_date: "2024-08-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "En 2023, non seulement, les condamnations à de l'emprisonnement ferme sont plus nombreuses qu'en 2022 (+3 %), mais les quantums de peines fermes sont également plus longs (+6 %). On s'attend donc à une augmentation des entrées et à un allongement de la durée de détention moyenne.",
      context_explanation:
        "L'étude retrace l'inflation carcérale depuis 1946 et la documente par les flux : dans le tableau 3, le quantum moyen ferme prononcé passe de 9,5 mois (2020) à 9,6 (2021), 9,9 (2022) puis 10,2 mois (2023) ; elle conclut que la croissance de la population détenue résulte du durcissement des peines plus que de la démographie ou de la délinquance.",
      original_url:
        "https://www.justice.gouv.fr/sites/default/files/2024-08/Cahiers_etudes_penitentiaires_et_criminologiques_n65.pdf",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Administration_p%C3%A9nitentiaire_en_France",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "b17666a2-26f6-40a4-a851-93802fbfd41d",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Arrêt J.M.B. et autres c. France (requête n° 9671/15 et 31 autres) — Cour européenne des droits de l'homme, 30 janvier 2020",
      author_or_institution:
        "Cour européenne des droits de l'homme (cinquième section)",
      publication_date: "2020-01-30",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Dit qu'il y a eu violation de l'article 3 de la Convention du fait des conditions de détention des requérants et des requérantes et rejette l'objection du Gouvernement de non-épuisement des voies de recours internes",
      context_explanation:
        "Arrêt pilote sur la surpopulation carcérale française : parmi les établissements concernés, Fresnes, Nîmes, Nice, Ducos, Faa'a-Nuutania ou Baie-Mahault. Au sommaire, la Cour retient aussi la violation de l'article 13 (« recours préventif inefficace ») et précise, au titre de l'article 46, que l'État défendeur est « tenu de prendre des mesures générales pour résorber définitivement la surpopulation carcérale et établir un recours préventif effectif en pratique ».",
      original_url: "https://hudoc.echr.coe.int/fre?i=001-200446",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Cour_europ%C3%A9enne_des_droits_de_l%27homme",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "01120ba5-8226-4706-8404-2c344747a22d",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Surpopulation carcérale : souhaite-t-on encore réinsérer nos condamnés ?",
      author_or_institution:
        "Alexis Maitre-Millat, doctorant en droit privé et sciences criminelles, Université de Bordeaux (The Conversation)",
      publication_date: "2023-05-11",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Il n'y a jamais eu autant de détenus écroués en France. 73 080 : il s'agit d'un record. Ce nombre comprend les détenus en attente de jugement et les condamnés.",
      context_explanation:
        "Analyse académique du système pénal : l'auteur montre que les aménagements de peine, conçus pour la réinsertion, sont « de plus en plus utilisés comme des outils de gestion de la surpopulation carcérale » — signe que le problème est un flux d'entrées qu'on cherche à réguler, non un refus d'incarcérer. Le record cité (73 080 détenus en mai 2023) a depuis été largement dépassé.",
      original_url:
        "https://theconversation.com/surpopulation-carcerale-souhaite-t-on-encore-reinserer-nos-condamnes-204650",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "3c59adf6-5ca1-4e23-b05f-f4f582d44051",
      spectrum: "CENTRE",
      source_name:
        "Une surpopulation carcérale persistante, une politique d'exécution des peines en question — rapport public thématique, octobre 2023",
      author_or_institution: "Cour des comptes (France)",
      publication_date: "2023-10-05",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Plusieurs facteurs y contribuent : tout d'abord, la réponse pénale à la délinquance s'est durcie ces dernières années. Les incarcérations et leurs durées ont ainsi augmenté de façon significative - le nombre d'années de prison ferme prononcées a augmenté de près de 70 % en vingt ans.",
      context_explanation:
        "La juridiction financière, peu suspecte d'indulgence, documente le durcissement : fin 2022, 73 000 détenus (un « niveau inégalé », + 2 800 en un an), taux d'occupation des maisons d'arrêt de près de 143 %, coût global de l'incarcération évalué à environ 4 Md€. La synthèse précise : près de 90 000 années de prison ferme prononcées en 2019 contre 54 000 environ en 2000.",
      original_url:
        "https://www.ccomptes.fr/fr/publications/une-surpopulation-carcerale-persistante-une-politique-dexecution-des-peines-en",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "eaa7547c-b1aa-4e67-88f7-f2771da11776",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "L'exécution des peines — rapport d'information n° 2 (2025-2026) de la commission des lois (mission d'information sur l'exécution des peines)",
      author_or_institution: "Sénat (commission des lois)",
      publication_date: "2025-10-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Alors que la part des citoyens qui estiment que la justice est « laxiste » atteint des niveaux préoccupants, la surpopulation carcérale est désormais hors de contrôle et atteste à l'inverse d'une sévérité croissante des lois pénales comme des juridictions chargées de les appliquer.",
      context_explanation:
        "Le rapport donne les chiffres : « Au 5 juin 2025, les prisons françaises comptaient 84 363 détenus, en augmentation de plus de 6 000 détenus en une année, pour une capacité opérationnelle de seulement 62 566 places ; plus de 5 000 détenus dorment sur des matelas placés à même le sol. » Il constate aussi que les juges prononcent des peines fermes plus longues pour échapper aux aménagements automatiques des peines de moins d'un an.",
      original_url: "https://www.senat.fr/rap/r25-002/r25-002-syn.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
    {
      id: "c5708783-1981-4a3d-99db-0eed32dcfc62",
      spectrum: "GAUCHE",
      source_name:
        "Surpopulation carcérale : 90 020 détenus en France au 1er septembre, un nouveau record",
      author_or_institution: "Libération (avec AFP)",
      publication_date: "2026-10-03",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Au 1er septembre, les prisons françaises comptaient 90 020 détenus selon les statistiques officielles du ministère de la Justice dévoilées ce samedi 3 octobre. Le nombre de détenus augmente de 6,8 % sur un an, alors que le nombre de places opérationnelles s'élève au 1er septembre de 63 348 (+ 1,2 % sur un an) et celui de matelas posés au sol, faute de lits, s'établit à 8 347, en hausse de 51,8 % par rapport au 1er septembre 2025.",
      context_explanation:
        "L'article rapporte aussi une densité de 176,1 % dans les maisons d'arrêt et le rang européen de la France, ex-aequo avec la Turquie (131 détenus pour 100 places) selon les chiffres 2025 du Conseil de l'Europe, devant la Croatie et l'Italie. C'est la confirmation journalistique des données officielles, un an après la publication de l'arrêt J.M.B.",
      original_url:
        "https://www.liberation.fr/societe/police-justice/surpopulation-carcerale-90-020-detenus-en-france-au-1er-septembre-un-nouveau-record-20261003_Z3OR4PFVRFG5BKLPRKJPP7BDBI/",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Lib%C3%A9ration_(journal)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 7,
    },
  ],
};

export const ADA_DOSSIER: Dossier = {
  id: "15c8d34e-83ed-494c-9cbb-637f41b4d056",
  slug: "allocation-demandeur-asile-carte-bancaire-montant",
  claim_title:
    "Un demandeur d'asile touche entre 1 200 € et 2 000 € par mois avec une carte bancaire de l'État",
  verdict: "FAUX",
  category: "SOCIETE",
  protagonists: [
    {
      name: "Allocation pour demandeur d'asile",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Allocation_pour_demandeur_d%27asile",
      note: "Prestation créée en 2015, versée pendant l'instruction de la demande d'asile.",
    },
    {
      name: "Office français de l'immigration et de l'intégration",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url:
        "https://fr.wikipedia.org/wiki/Office_fran%C3%A7ais_de_l%27immigration_et_de_l%27int%C3%A9gration",
      note: "Gère l'ADA et délivre la carte de paiement sur laquelle elle est versée.",
    },
    {
      name: "Défenseur des droits",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/D%C3%A9fenseur_des_droits",
      note: null,
    },
    {
      name: "Cour des comptes (France)",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)",
      note: null,
    },
    {
      name: "Sénat (France)",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      note: "Commission des finances — rapport de contrôle sur les coûts de l'asile (2026).",
    },
  ],
  verdict_summary:
    "Le barème réglementaire est sans rapport avec les montants allégués : 6,80 € par jour pour une personne seule hébergée (206,83 € par mois) et 14,20 € par jour si aucun hébergement ne lui est proposé (431,92 €), soit, selon la recherche, « la plus faible des prestations sociales en France, très largement inférieure au RSA ». La carte délivrée par l'OFII n'est pas une carte de crédit : elle est alimentée par le seul versement mensuel de l'ADA, sans possibilité de retrait d'espèces ni de virements, sans paiement en ligne ni sans contact (Défenseur des droits). Le versement est temporaire et conditionnel : il cesse à la fin du mois suivant la notification de la décision pour les personnes qui obtiennent une protection, et 61 000 cessations ou retraits ont été opérés en 2025 (Sénat, commission des finances). Dépense totale d'ADA en 2025 : 353,4 M€ (Cour des comptes).",
  consensus_score: 100,
  premises: [
    {
      claim_part: "« L'État donne une carte de crédit créditée de 1 500 € par mois aux migrants »",
      status: "FAUX",
      detail:
        "Le montant légal est un forfait journalier modique, indexé sur la composition du foyer : 6,80 €/jour pour une personne seule hébergée (206,83 €/mois) ; aucun hébergement proposé : + 7,40 €/jour, soit 431,92 €/mois au total ; + 3,40 € par personne supplémentaire. Aucun dispositif ne verse 1 200 à 2 000 € par mois à un demandeur d'asile isolé. La carte de l'OFII n'est pas une carte de crédit : elle est alimentée par le seul montant de l'allocation versée, sans possibilité de retrait d'espèces ni de virements depuis 2019 (fonctionnalités réduites documentées par le Défenseur des droits : pas de paiement en ligne, sans contact inactif).",
    },
    {
      claim_part: "« Cette aide financière est accordée à vie et sans conditions »",
      status: "FAUX",
      detail:
        "Versement temporaire : dû à compter de l'acceptation des conditions matérielles d'accueil et pendant la durée d'instruction de la demande ; il cesse à la fin du mois qui suit celui de la notification de la décision pour les personnes qui obtiennent la qualité de réfugié ou la protection subsidiaire, et il est suspendu en cas de défaut de validité de l'attestation de demande d'asile. Les fins de versement sont massives : 61 000 cessations ou retraits de l'ADA ont été opérés en 2025, contre 46 000 en 2022 (Sénat).",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "b6a9e2f8-a4c1-4a13-971d-0ff1589dcec4",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Code de l'entrée et du séjour des étrangers et du droit d'asile — article L. 553-1 (allocation pour demandeur d'asile)",
      author_or_institution: "Légifrance (République française)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Le demandeur d'asile qui a accepté les conditions matérielles d'accueil proposées en application de l'article L. 551-9 bénéficie d'une allocation pour demandeur d'asile s'il satisfait à des conditions d'âge et de ressources. Le versement de cette allocation est ordonné par l'Office français de l'immigration et de l'intégration.",
      context_explanation:
        "Texte en vigueur du chapitre III du titre V. L'article D. 553-8 décompose l'allocation en « un montant forfaitaire, dont le niveau varie en fonction du nombre de personnes composant le foyer, et, le cas échéant, un montant additionnel destiné à couvrir les frais d'hébergement » ; l'article D. 553-10 renvoie au barème de l'annexe 8 ; l'article D. 553-24 énumère les cas de fin de versement. Citation vérifiée sur le texte reproduit dans deux jugements du tribunal administratif de Nice (9 et 30 juillet 2025), Légifrance bloquant les robots d'indexation.",
      original_url:
        "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042802110/",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "4de27bb4-2ce7-4cdf-b53c-89adb7ce6580",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "L'allocation pour demandeur d'asile (ADA) — fiche 25 de « Minima sociaux et prestations sociales, édition 2024 »",
      author_or_institution: "DREES (Direction de la recherche, des études, de l'évaluation et des statistiques)",
      publication_date: "2024-10-22",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Le montant forfaitaire varie selon la composition familiale et s'élève à un forfait de 6,80 euros par jour pour une personne seule sans enfant, soit 206,83 euros par mois (+3,40 euros par jour par personne supplémentaire dans la famille). Il est accru de 7,40 euros par jour par adulte (soit 431,92 euros par mois au total pour une personne seule sans enfant) lorsque le demandeur de l'ADA a accepté l'offre de prise en charge et exprimé un besoin d'hébergement mais n'a pas accès gratuitement à un hébergement ou à un logement à quelque titre que ce soit.",
      context_explanation:
        "Chiffrage officiel : 206,83 € par mois (6,80 €/jour) pour une personne seule hébergée, 431,92 € (14,20 €/jour) sans accès gratuit à un hébergement — sans rapport avec des versements de 1 200 à 2 000 €. La même fiche documente la fin du versement : « L'ADA est ainsi versée jusqu'à la fin du mois qui suit celui de la notification de la décision pour les personnes qui obtiennent la qualité de réfugié ou le bénéfice de la protection subsidiaire. Elles peuvent ensuite immédiatement demander à bénéficier du revenu de solidarité active (RSA). »",
      original_url:
        "https://drees.solidarites-sante.gouv.fr/sites/default/files/2024-10/MS24%20-%20Fiche%2025%20-%20L%E2%80%99allocation%20pour%20demandeur%20d%E2%80%99asile%20%28ADA%29.pdf",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "773864bb-21a8-43bb-a072-9a2b53d00b1f",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Réponse ministérielle à la question écrite n° 27196 — « Carte de paiement des demandeurs d'asile » (Assemblée nationale)",
      author_or_institution: "Ministère de l'Intérieur (Journal officiel, réponse publiée le 15 septembre 2020)",
      publication_date: "2020-09-15",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "La mise en place d'une carte de paiement, sans possibilité de retrait, permet, en limitant la circulation d'argent liquide, d'éviter que l'allocation pour demandeur d'asile serve à d'autres fins que celles d'assurer la subsistance du demandeur d'asile, au moyen de dépenses courantes sur le territoire national.",
      context_explanation:
        "Le Gouvernement y décrit le dispositif géré par l'OFII : allocation versée par alimentation de la carte de paiement, sans possibilité de retrait d'espèces ; le nombre de transactions a été « déplafonné » et « 44 % des transactions ayant porté sur un montant inférieur à 10 € en novembre 2019 ». La question rappelait que « le montant de l'ADA est déjà très faible (6,80 euros par jour pour une personne seule) ». Site de l'OFII inaccessible aux robots (403) : la réponse ministérielle documente ce dispositif officiel.",
      original_url: "https://questions.assemblee-nationale.fr/q15/15-27196QE.htm",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "e0f3d664-eb7c-40f6-9ddf-7692b2e906c4",
      spectrum: "CENTRE",
      source_name:
        "Le budget de l'État en 2025 — résultats et gestion : mission « Immigration, asile et intégration » (note d'exécution budgétaire)",
      author_or_institution: "Cour des comptes (France)",
      publication_date: "2026-04-21",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Les dépenses associées à l'allocation pour demandeur d'asile (ADA) représentent 353,4 M€, en complément desquels sont prévus 6,2 M€ de frais de gestion destinés à l'OFII, dans le cadre de la loi de finances initiale pour 2025. Elles représentent 25 % des AE et 21 % des CP associés au programme.",
      context_explanation:
        "Chiffrage officiel de la dépense : 353,4 M€ d'ADA en 2025 (+20 % par rapport à 2024) et 6,2 M€ de frais de gestion pour l'OFII, pour « 94 271 demandeurs d'asile et 54 880 bénéficiaires de la protection temporaire » allocataires en moyenne en 2024 — un ordre de grandeur de quelques centaines d'euros par personne et par mois, incomparable avec les versements à quatre chiffres allégués. Le versement de l'ADA relève d'une « logique de guichet » (77 % des CP du programme 303 en janvier).",
      original_url:
        "https://program-evaluation.ccomptes.fr/sites/default/files/2026-04/NEB-2026-Immigration.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "b1a4162d-4a05-456a-bd9f-f5375c9fbe31",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "« Asile : faire la lumière sur les coûts, redéfinir les protections » — rapport de contrôle de la commission des finances (l'Essentiel)",
      author_or_institution: "Marie-Carole Ciuntu, rapporteure spéciale (Sénat, commission des finances)",
      publication_date: "2026-07-08",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Le montant mensuel versé à un demandeur d'asile seul est de 206 euros s'il est hébergé et de 432 euros s'il ne l'est pas.",
      context_explanation:
        "Rapport de contrôle présenté le 8 juillet 2026 à la commission des finances du Sénat (près de 2 milliards d'euros de coûts identifiés en 2025). Il confirme les montants réglementés — 206 € / 432 € par mois, très loin de 1 200 à 2 000 € — et documente les fins de versement : « 61 000 cessations ou retraits de l'ADA ont été opérés en 2025, contre 46 000 en 2022 », pour un nombre d'allocataires « resté plutôt stable entre 2019 et 2024, de l'ordre de 150 000 personnes ».",
      original_url:
        "https://www.senat.fr/fileadmin/cru-1787580710/Commissions/Finances/2025-2026/Controles/Essentiel_post-commission_couts_de_l_asile.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "952d79a4-e7db-4232-bdca-c25bf0ef6c03",
      spectrum: "CENTRE",
      source_name:
        "Décision n° 2020-147 du 10 juillet 2020 relative à la réforme de la carte sur laquelle est versée l'allocation pour demandeur d'asile",
      author_or_institution: "Défenseur des droits",
      publication_date: "2020-07-10",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "S'agissant des fonctionnalités de la carte de paiement, les courriers accompagnant sa remise indiquent expressément aux utilisateurs qu'elle « ne permet pas le paiement sur internet », que « l'option de paiement sans contact est inactive » et que « la demande de remboursement d'un achat sur cette carte est strictement interdite ».",
      context_explanation:
        "Le Défenseur des droits documente une carte aux fonctionnalités très réduites — « pas de retrait ni de virements » — et juge la réforme « très préjudiciable » aux demandeurs d'asile, dont la carte n'était plus, depuis novembre 2019, qu'une carte de paiement (la carte précédente autorisait « 3 puis 5 retraits d'espèces par mois »). Il recommande une carte mixte ou le versement sur compte bancaire.",
      original_url: "https://juridique.defenseurdesdroits.fr/doc_num.php?explnum_id=19919",
      author_reference_url: "https://fr.wikipedia.org/wiki/D%C3%A9fenseur_des_droits",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "d75b58b0-4117-4a6a-87d9-00eae251522a",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Vivre sans cash aujourd'hui — l'expérience des demandeur·es d'asile en France : une enquête sur la carte ADA",
      author_or_institution: "Hélène Ducourant (Université Gustave Eiffel — Latts)",
      publication_date: "2026-01-05",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Concernant l'Ada, beaucoup estiment que la principale difficulté réside dans le montant de l'allocation — la plus faible des prestations sociales en France, très largement inférieure au RSA (voir encadré ci-dessous) — et dans l'absence de revalorisation depuis 2018, malgré une inflation soutenue.",
      context_explanation:
        "Enquête qualitative (26 entretiens auprès de 35 titulaires de la carte ADA) : « ces personnes disposent, pour 97,3 % d'entre elles, de cette prestation sociale comme unique ressource ». Elle chiffre 204 € par mois pour un adulte hébergé en centre (base 30 jours) et 426 € sans hébergement, « des montants si déconnectés du coût de la vie en France qu'ils semblent destinés à couvrir strictement les besoins essentiels ».",
      original_url: "https://www.gisti.org/IMG/pdf/carte_ada_etude_ducourant.pdf",
      author_reference_url: "https://hal.science/hal-05444401",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
  ],
};

export const SANS_PAPIERS_AIDES_DOSSIER: Dossier = {
  id: "98f17905-d0f3-40e4-b240-140d4462f89a",
  slug: "sans-papiers-rsa-caf-apl-aides-sociales",
  claim_title:
    "Les étrangers sans-papiers touchent le RSA, la CAF et les aides au logement (APL)",
  verdict: "FAUX",
  category: "SOCIETE",
  protagonists: [
    {
      name: "Revenu de solidarité active",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Revenu_de_solidarit%C3%A9_active",
      note: "Prestation dont les conditions d'accès aux étrangers sont fixées par le CASF.",
    },
    {
      name: "Caisse nationale des allocations familiales",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Caisse_nationale_des_allocations_familiales",
      note: "Verse les prestations familiales et contrôle la régularité du séjour des allocataires.",
    },
    {
      name: "Aide médicale d'État",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Aide_m%C3%A9dicale_d%27%C3%89tat",
      note: "Dispositif spécifique — avec l'hébergement d'urgence — accessible aux personnes en situation irrégulière.",
    },
    {
      name: "Conseil constitutionnel (France)",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)",
      note: null,
    },
    {
      name: "Sénat (France)",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      note: "Commission des affaires sociales — rapport sur la condition de durée de résidence (2025).",
    },
  ],
  verdict_summary:
    "Les personnes en situation irrégulière sont exclues des prestations sociales de droit commun : « les étrangers dont le séjour est irrégulier ne peuvent prétendre à aucune aide ou prestation sociale de droit commun » et ne bénéficient que de l'AME, de l'hébergement d'urgence et de l'aide au retour (Sénat). Le RSA exige un titre de séjour autorisant à travailler depuis cinq ans (CASF, art. L. 262-4 — critère validé par le Conseil constitutionnel en 2011) ; les prestations familiales sont réservées aux étrangers titulaires d'un titre exigé pour résider régulièrement en France (CSS, art. L. 512-2) et l'APL suppose « un titre de séjour en cours de validité » (service-public.fr) ; la CNAF rappelle que « le droit aux prestations servies par les CAF est conditionné à la régularité du séjour », contrôlée via le portail AGDREF.",
  consensus_score: 100,
  premises: [
    {
      claim_part: "« Un clandestin peut s'inscrire à la CAF et toucher des allocations »",
      status: "FAUX",
      detail:
        "Le droit aux prestations de la branche Famille est conditionné à la régularité du séjour (instruction CNAF IT-2024-232) ; l'article L. 512-2 du code de la sécurité sociale réserve les prestations familiales aux étrangers « titulaires d'un titre exigé d'eux... pour résider régulièrement en France » ; l'APL suppose un titre de séjour en cours de validité. Au titre de l'article L. 111-1 du code de la sécurité sociale, les étrangers en séjour irrégulier ne peuvent prétendre à aucune aide ou prestation sociale de droit commun : hors AME, hébergement d'urgence et aide au retour, il n'y a ni RSA, ni allocations familiales, ni APL.",
    },
    {
      claim_part: "« Le RSA est accessible dès l'arrivée en France »",
      status: "FAUX",
      detail:
        "L'article L. 262-4 du code de l'action sociale et des familles impose d'« être français ou titulaire, depuis au moins cinq ans, d'un titre de séjour autorisant à travailler » — avec des exceptions limitées (réfugiés, bénéficiaires de la protection subsidiaire, apatrides, titulaires de la carte de résident). Le Conseil constitutionnel a jugé ce critère conforme (décision n° 2011-137 QPC du 17 juin 2011) ; un étranger régularisé depuis moins de cinq ans n'y a pas droit.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "807f214f-6834-4aaf-9fdd-97c99de1622e",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Code de l'action sociale et des familles — article L. 262-4",
      author_or_institution: "Légifrance (République française)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Etre français ou titulaire, depuis au moins cinq ans, d'un titre de séjour autorisant à travailler.",
      context_explanation:
        "Condition d'ouverture du RSA pour les étrangers non communautaires (2° de l'article L. 262-4), assortie d'exceptions limitées (réfugiés, protection subsidiaire, apatrides, carte de résident). Un étranger en situation irrégulière — ou régularisé depuis moins de cinq ans — ne peut donc pas bénéficier du RSA, contrairement à ce que suppose la rumeur.",
      original_url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031087751",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "19297b7c-63b6-49eb-b853-85b791d2feb0",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Code de la sécurité sociale — article L. 512-2 (prestations familiales)",
      author_or_institution: "Légifrance (République française)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Bénéficient également de plein droit des prestations familiales dans les conditions fixées par le présent livre les étrangers non ressortissants d'un Etat membre de la Communauté européenne, d'un autre Etat partie à l'accord sur l'Espace économique européen ou de la Confédération suisse, titulaires d'un titre exigé d'eux en vertu soit de dispositions législatives ou réglementaires, soit de traités ou accords internationaux pour résider régulièrement en France.",
      context_explanation:
        "Texte en vigueur : l'ouverture des prestations familiales (allocations familiales, etc.) est subordonnée à un titre de séjour régulier. Les alinéas suivants ajoutent des conditions pour les enfants à charge (naissance en France, entrée dans le cadre du regroupement familial, qualité de membre de famille de réfugié, etc.) et renvoient à un décret fixant « la liste des titres et justifications attestant de la régularité de l'entrée et du séjour ».",
      original_url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042920150",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "9bd4ef6f-7ed4-4658-8528-523240359eb2",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Instruction CNAF IT-2024-232 — « Prise en compte des décisions de retrait ou de refus de titres de séjour et d'obligation de quitter le territoire français »",
      author_or_institution: "CNAF (Caisse nationale des allocations familiales), direction des politiques familiale et sociale",
      publication_date: "2024-11-28",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Le droit aux prestations servies par les CAF est conditionné à la régularité du séjour.",
      context_explanation:
        "Instruction officielle de la CNAF à son réseau (28/11/2024) : le retrait ou le refus de titre de séjour entraîne la fin du droit aux prestations, et « en cas de décision préfectorale de retrait, de refus de délivrance ou de renouvellement d'un titre de séjour..., le portail Agdref doit en tenir compte via une mise à jour rapide ». Le document annonce la généralisation des échanges automatisés : « le développement des échanges entre le système d'information des Caf et AGDREF est en instruction pour prendre en compte les informations relatives aux titres de séjour dès la première demande et de façon sécurisée et automatisée ».",
      original_url:
        "https://www.caf.fr/sites/default/files/medias/cnaf/Nous_connaitre/qui%20sommes%20nous/Textes%20de%20r%C3%A9f%C3%A9rence/Circulaires/2024/IT%202024-232.pdf",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "82d36063-b20e-4f7f-9d34-434bd88894ee",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Aide personnalisée au logement (APL) — conditions pour les personnes étrangères (fiche F12006)",
      author_or_institution: "DILA — service-public.fr (Premier ministre)",
      publication_date: "2026-07-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Vous pouvez bénéficier de l'APL si vous êtes étranger, à condition d'avoir un titre de séjour en cours de validité.",
      context_explanation:
        "La fiche officielle conditionne l'APL — comme le maintien des droits — à un titre de séjour en cours de validité : le défaut de « titre de séjour valide justifiant la régularité de votre séjour en France » figure parmi les motifs de suspension. Depuis le 1er juillet 2026, les étudiants ressortissants d'un pays hors UE/EEE/Suisse ne peuvent bénéficier de l'APL que dans trois cas limitativement énumérés.",
      original_url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F12006",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "24640875-0882-48e6-9769-300e2da5d7e1",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "Rapport n° 426 (2024-2025) — proposition de loi créant une condition de durée de résidence pour le versement de certaines prestations sociales",
      author_or_institution: "Florence Lassarade, rapporteure (Sénat, commission des affaires sociales)",
      publication_date: "2025-03-12",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Au titre de l'article L.111-1 du code de sécurité sociale, les étrangers dont le séjour est irrégulier ne peuvent prétendre à aucune aide ou prestation sociale de droit commun. Ils ne bénéficient donc que des aides spécifiques qui leur sont dédiées : l'aide médicale d'État, l'hébergement d'urgence et l'aide au retour et à la réinsertion.",
      context_explanation:
        "Le rapport parlementaire rappelle le droit en vigueur : exclusion des prestations de droit commun pour les personnes en séjour irrégulier, condition de cinq ans de titre de séjour autorisant à travailler pour le RSA (quinze ans à Mayotte) et de dix ans pour l'Aspa. Il retrace aussi la jurisprudence : le Conseil constitutionnel a validé la condition RSA en 2011 (n° 2011-137 QPC) mais censuré en 2024 (n° 2024-6 RIP) une extension de cinq ans aux prestations familiales, APL et APA.",
      original_url: "https://www.senat.fr/rap/l24-426/l24-4265.html",
      author_reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "9ca52d5a-5ee5-4ecc-aac1-cc8c2371af8a",
      spectrum: "CENTRE",
      source_name: "Décision n° 2011-137 QPC du 17 juin 2011 — M. Oussmane T.",
      author_or_institution: "Conseil constitutionnel (République française)",
      publication_date: "2011-06-17",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "le législateur a pu estimer que la stabilité de la présence sur le territoire national était une des conditions essentielles à l'insertion professionnelle ; qu'en réservant le bénéfice du revenu de solidarité active à ceux qui, parmi les étrangers, sont titulaires depuis au moins cinq ans d'un titre de séjour les autorisant à travailler, le législateur a institué entre les Français et les étrangers, d'une part, et entre les étrangers, d'autre part, selon qu'ils ont ou non une résidence stable en France, une différence de traitement en rapport direct avec l'objet de la loi",
      context_explanation:
        "Saisi par une question prioritaire de constitutionnalité, le Conseil constitutionnel valide la condition de cinq ans de titre de séjour pour le RSA : différence de traitement « en rapport direct avec l'objet de la loi », critère « pas manifestement inapproprié au but poursuivi ». C'est cette décision que cite le Sénat en 2025 pour rappeler que le verrou légal est conforme à la Constitution.",
      original_url: "https://www.conseil-constitutionnel.fr/decision/2011/2011137QPC.htm",
      author_reference_url: "https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "75bfa467-7eb5-4a89-8024-add25b693b95",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "La régularité du séjour des étrangers en France : frontière du projet d'universalisation de la protection sociale ?",
      author_or_institution: "Caroline Izambert (Revue française des affaires sociales, 2018, n° 4, pp. 19-37)",
      publication_date: "2018-12-21",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Ces restrictions, d'abord fondées sur la nationalité renvoient désormais à la régularité du séjour des personnes étrangères, condition généralisée par la loi de 1993, soumettant partiellement les objectifs des politiques de protection sociale à celles de contrôle des flux migratoires.",
      context_explanation:
        "Article de référence (résumé officiel consulté sur la base Prisme) : la chercheuse montre que la condition de régularité du séjour, généralisée en 1993, « exclut quasiment toutes les prestations de sécurité sociale » pour les personnes irrégulières, l'AME de 1999 constituant l'exception sanitaire — « l'impossible accès au droit commun pour les personnes étrangères résidentes en situation irrégulière ».",
      original_url: "https://shs.cairn.info/revue-francaise-des-affaires-sociales-2018-4-page-17?lang=fr",
      author_reference_url: "https://www.documentation-sociale.org/base-prisme/85384/",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
  ],
};

export const AGRESSION_BORDEAUX_DOSSIER: Dossier = {
  id: "eb0118fd-17bb-49d6-b8f4-faa6eb3333fe",
  slug: "agression-bordeaux-clandestin-oqtf",
  claim_title: "L'agression de Bordeaux a été commise par un clandestin sous OQTF",
  verdict: "FAUX",
  category: "FAITS_DIVERS",
  protagonists: [
    {
      name: "Obligation de quitter le territoire français",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Obligation_de_quitter_le_territoire_fran%C3%A7ais",
      note: "Mesure d'éloignement qui ne peut viser qu'un étranger — inapplicable à un citoyen français.",
    },
    {
      name: "Schizophrénie",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Schizophr%C3%A9nie",
      note: "Pathologie retenue par les expertises pour l'auteur des faits.",
    },
    {
      name: "Contrôleur général des lieux de privation de liberté",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Contr%C3%B4leur_g%C3%A9n%C3%A9ral_des_lieux_de_privation_de_libert%C3%A9",
      note: null,
    },
    {
      name: "Bordeaux",
      kind: "LIEU",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Bordeaux",
      note: "Lieu des faits (cours de la Martinique, quartier des Chartrons) et lieu de naissance de l'auteur.",
    },
  ],
  verdict_summary:
    "L'auteur de l'agression du 19 juin 2023 — un homme de 29 ans — est de nationalité française, né le 12 juillet 1993 à Bordeaux : il ne peut donc être ni un « clandestin », ni visé par une obligation de quitter le territoire français, mesure que le CESEDA réserve à « un étranger » (art. L. 611-1). Les expertises ont établi « des troubles du comportement majeurs en lien avec une pathologie psychotique et schizophrène », en rupture de traitement : sa garde à vue a été levée et il a été admis en soins psychiatriques sans consentement à l'hôpital Charles-Perrens, sur décision du représentant de l'État. Aucune procédure d'éloignement n'a jamais été en cause dans ce dossier.",
  consensus_score: 100,
  premises: [
    {
      claim_part: "« L'agresseur est un étranger sans-papiers »",
      status: "FAUX",
      detail:
        "Le parquet de Bordeaux a communiqué l'identité et la situation précises du suspect : « un homme de 29 ans, né le 12 juillet 1993 à Bordeaux, de nationalité française, SDF » (communiqué relayé par France 3 Nouvelle-Aquitaine). Le Figaro rapporte de même : « Le mis en cause est de nationalité française. Né en 1993 à Bordeaux ». L'intéressé est défavorablement connu de la police et de la justice (quinze condamnations pour délits routiers et stupéfiants) — mais né et citoyen français.",
    },
    {
      claim_part: "« L'acte illustre une OQTF non exécutée »",
      status: "FAUX",
      detail:
        "L'obligation de quitter le territoire français est « un acte administratif par lequel les autorités préfectorales imposent à une personne étrangère de quitter le territoire français » (Revue Alyoda) ; l'article L. 611-1 du CESEDA dispose que « l'autorité administrative peut obliger un étranger à quitter le territoire français ». Une mesure d'éloignement était donc juridiquement impossible à l'encontre d'un citoyen français né à Bordeaux : aucune OQTF, exécutée ou non, n'est en cause dans cette affaire.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "a29a9afc-0391-443b-beec-03c19eb5d505",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Agression violente d'une grand-mère et sa petite-fille à Bordeaux : le suspect transféré dans un hôpital psychiatrique",
      author_or_institution: "France 3 Nouvelle-Aquitaine (franceinfo) — d'après les communiqués du parquet de Bordeaux",
      publication_date: "2023-06-20",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "un homme de 29 ans, né le 12 juillet 1993 à Bordeaux, de nationalité française, SDF",
      context_explanation:
        "Article reprenant les communiqués du parquet de Bordeaux : interpellation une heure après les faits, « L'homme était très agité et résistant à son interpellation », puis transfert à l'hôpital psychiatrique Charles-Perrens, la garde à vue ayant été levée « suite à expertise ayant préconisé des soins psychiatriques sur décision du représentant de l'État ». Selon le vice-procureur, « L'intéressé présente des troubles du comportement majeurs en lien avec une pathologie psychotique et schizophrène. »",
      original_url:
        "https://france3-regions.franceinfo.fr/nouvelle-aquitaine/gironde/bordeaux/agression-violente-filmee-a-bordeaux-ce-que-l-on-sait-2799218.html",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "25ccb728-8b56-4787-97e4-e00671277565",
      spectrum: "CENTRE",
      source_name:
        "Ce que l'on sait de la violente agression d'une femme âgée et de sa petite-fille à Bordeaux",
      author_or_institution: "franceinfo (avec AFP)",
      publication_date: "2023-06-20",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Plusieurs responsables d'extrême droite ont au contraire mis en cause la politique gouvernementale et l'immigration, bien que le suspect soit français.",
      context_explanation:
        "Article de synthèse : « L'homme, né en 1993, de nationalité française, est défavorablement connu des services de police et de justice pour des délits routiers et liés aux stupéfiants. » La famille des victimes s'est dite « indignée par la récupération politique qui est faite de ce fait divers », estimant qu'« il est parfaitement indécent de se servir de ce fait divers pour évoquer une origine ethnique ou de justifier des réformes pénales ou migratoires ».",
      original_url:
        "https://www.franceinfo.fr/faits-divers/bordeaux-une-femme-agee-et-sa-petite-fille-violemment-agressees-a-bordeaux_5899490.html",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "65b40adf-f284-4c63-9dcc-d6e72435cb99",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "Bordeaux : une retraitée et sa petite-fille violemment agressées, le suspect placé en soins psychiatriques",
      author_or_institution: "Le Figaro (Marie-Hélène Hérouart, Jean Cittone)",
      publication_date: "2023-06-20",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Le mis en cause est de nationalité française. Né en 1993 à Bordeaux",
      context_explanation:
        "Le Figaro rapporte les communiqués du parquet : l'auteur « présente des troubles du comportement majeurs en lien avec une pathologie psychotique et schizophrène. Au moment des faits, il était selon des proches en rupture de soins » ; « Il sera pris en charge par l'hôpital Charles Perrens. » Le quotidien précise que le mis en cause (« Ce Français sous tutelle ») avait été condamné quinze fois pour des délits routiers et des infractions à la législation sur les stupéfiants.",
      original_url:
        "https://www.lefigaro.fr/actualite-france/une-femme-agee-et-sa-petite-fille-violemment-agressees-a-bordeaux-20230620",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "4b082365-9e4d-44d8-9310-c95b64590176",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Code de l'entrée et du séjour des étrangers et du droit d'asile — article L. 611-1 (obligation de quitter le territoire français)",
      author_or_institution: "Légifrance (République française)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "L'autorité administrative peut obliger un étranger à quitter le territoire français lorsqu'il se trouve dans les cas suivants :",
      context_explanation:
        "Texte en vigueur : l'OQTF ne peut être prononcée qu'à l'encontre d'« un étranger » (séjour irrégulier, expiration de visa, rejet d'une demande d'asile, menace à l'ordre public, etc.). Un citoyen français — a fortiori né à Bordeaux — ne peut faire l'objet d'une telle mesure, quel que soit son casier judiciaire. Citation vérifiée sur le texte reproduit par des miroirs institutionnels (Justicelibre, Pappers Justice), Légifrance bloquant les robots.",
      original_url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042775578",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "57d407c8-784f-4145-bc8e-b91a55cc24c7",
      spectrum: "CENTRE",
      source_name: "Soins sans consentement et droits fondamentaux (rapport thématique)",
      author_or_institution: "Contrôleur général des lieux de privation de liberté (CGLPL)",
      publication_date: "2020-03-16",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "La loi maintient les pouvoirs du préfet pour prendre une décision d'admission en soins sans consentement d'une personne dont les troubles « compromettent la sûreté des personnes ou portent atteinte, de façon grave, à l'ordre public »",
      context_explanation:
        "Le rapport de l'autorité indépendante décrit le cadre légal (loi du 5 juillet 2011) des soins psychiatriques sans consentement sur décision du représentant de l'État : c'est ce dispositif — et non une procédure d'éloignement — qui a conduit à l'hospitalisation sous contrainte du suspect de Bordeaux, la garde à vue ayant été levée pour permettre les soins.",
      original_url:
        "https://www.cglpl.fr/app/uploads/2020/06/Rapport-soins-sans-consentement-et-droits-fondamentaux_web.pdf",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Contr%C3%B4leur_g%C3%A9n%C3%A9ral_des_lieux_de_privation_de_libert%C3%A9",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "c713ee8f-e572-4e18-866d-c8c10f6f3e20",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Sur les fondements des mesures d'éloignement — note de jurisprudence (CAA Lyon, 13 octobre 2022, n° 21LY03282)",
      author_or_institution: "Louanne Vendittelli (Revue Alyoda, 2023/1)",
      publication_date: "2023-05-03",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "La mesure d'éloignement en question est une obligation de quitter le territoire français, c'est-à-dire un acte administratif par lequel les autorités préfectorales imposent à une personne étrangère de quitter le territoire français.",
      context_explanation:
        "Note de jurisprudence publiée par la revue académique Alyoda (Pôle de Lyon) : créée par la loi n° 2006-911 du 24 juillet 2006, l'OQTF « vise à simplifier la procédure d'éloignement des étrangers en situation irrégulière » et son régime est codifié à l'article L. 611-1 du CESEDA (ex-L. 511-1). Elle ne vise donc par construction que des personnes étrangères.",
      original_url: "https://alyoda.eu/index.php?id=8693",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
  ],
};

export const SAINT_OMER_DOSSIER: Dossier = {
  id: "24704ff5-d2a1-4f35-a5e6-1edfa50ba493",
  slug: "incendie-eglise-saint-omer-attentat-islamiste",
  claim_title: "L'incendie de l'église de Saint-Omer est un attentat islamiste",
  verdict: "FAUX",
  category: "FAITS_DIVERS",
  protagonists: [
    {
      name: "Saint-Omer (Pas-de-Calais)",
      kind: "LIEU",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Saint-Omer_(Pas-de-Calais)",
      note: "Église de l'Immaculée-Conception, détruite par un incendie volontaire dans la nuit du 1er au 2 septembre 2024.",
    },
    {
      name: "Pyromanie",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Pyromanie",
      note: "Profil de l'auteur : incendiaire récidiviste, suivi psychiatrique, sans revendication religieuse.",
    },
    {
      name: "Parquet national antiterroriste",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Parquet_national_antiterroriste",
      note: "Jamais saisi : aucune qualification antiterroriste n'a été retenue dans ce dossier.",
    },
    {
      name: "Observatoire du patrimoine religieux",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://www.patrimoine-religieux.fr/",
      note: "Tient le décompte de référence des sinistres d'églises (source citée par le Sénat).",
    },
  ],
  verdict_summary:
    "L'auteur de l'incendie de la nuit du 1er au 2 septembre 2024 à Saint-Omer est un homme né en 1985, de nationalité française, sans domicile fixe, tout juste sorti de prison : il a reconnu être entré par effraction dans l'église de l'Immaculée-Conception pour voler l'argent des troncs, avant d'y mettre le feu. Son casier porte 26 condamnations, dont deux pour destruction de biens par un moyen dangereux et une pour dégradation d'un lieu de culte (incendie volontaire de quatre églises du Boulonnais en 2021). Le dossier a été instruit au pôle criminel de Boulogne-sur-Mer sur les chefs de destruction par moyen dangereux et de vol : aucune qualification antiterroriste n'est apparue, aucune revendication n'a été relevée, et le Parquet national antiterroriste n'a jamais été saisi. Un incendie criminel de droit commun (art. 322-6 du code pénal), non un attentat.",
  consensus_score: 100,
  premises: [
    {
      claim_part: "« L'incendie est une attaque terroriste antichrétienne »",
      status: "FAUX",
      detail:
        "L'enquête établit un mobile crapuleux (vol de l'argent des troncs) suivi d'un incendie volontaire allumé par un récidiviste (« avant de quitter les lieux, il avait décidé d'y mettre le feu »), sans aucune entreprise terroriste au sens de l'article 421-1 du code pénal. Les sinistres d'églises relèvent de causes multiples : selon l'Observatoire du patrimoine religieux, sur les 27 départs de feu de 2023, 19 étaient accidentels et 8 criminels ; en 2024 (janvier-septembre), 14 sur 26. Aucune campagne terroriste antichrétienne n'est documentée dans l'Hexagone.",
    },
    {
      claim_part: "« L'auteur est un étranger islamiste »",
      status: "FAUX",
      detail:
        "Le parquet a précisé qu'il s'agit d'un homme « né en 1985 et de nationalité française », sans domicile fixe, hébergé en foyer, suivi sur le plan psychiatrique, défavorablement connu des services de police pour des vols et des dégradations depuis des années (26 condamnations de droit commun). Aucun élément de radicalisation ou d'attache étrangère n'apparaît dans la procédure, dont les chefs sont la destruction par moyen dangereux et le vol.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "4f8443a3-7409-45e9-9a9c-8aa38605091b",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Incendie de l'église de l'Immaculée-Conception de Saint-Omer : le suspect a reconnu les faits",
      author_or_institution:
        "Parquets de Saint-Omer et de Boulogne-sur-Mer — déclarations des procureurs Mehdi Benbouzid et Guirec Le Bras, relayées par CNEWS",
      publication_date: "2024-09-04",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Cet homme, né en 1985 et de nationalité française, s'était ainsi introduit dans l'église vers 00h20, d'après le procureur de la République de Boulogne-sur-Mer Guirec Le Bras.",
      context_explanation:
        "Déclarations officielles du parquet : le suspect « a avoué être entré par effraction dans l'église le 2 septembre, pour voler l'argent des troncs », puis « a mis le feu à la bâtisse » (procureur de Saint-Omer, Mehdi Benbouzid). Sorti de détention le 27 août 2024 après une peine de trois ans et six mois pour vols et dégradations, il était sans domicile fixe et sans profession, hébergé en foyer.",
      original_url:
        "https://www.cnews.fr/faits-divers/2024-09-04/incendie-de-leglise-de-limmaculee-conception-de-saint-omer-le-suspect",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "c4589c7e-668b-4b1e-8f42-2d6c3a95e6ed",
      spectrum: "CENTRE",
      source_name: "Incendie dans une église à Saint-Omer : le suspect, récidiviste, a été mis en examen",
      author_or_institution: "franceinfo (avec AFP)",
      publication_date: "2024-09-04",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Le casier judiciaire du suspect, qui résidait dans un foyer au moment des faits, porte 26 condamnations, dont deux pour \"destruction de biens par un moyen dangereux\" et une pour \"dégradation ou détérioration d'un lieu de culte\", consécutive à l'incendie volontaire de quatre églises du Boulonnais en 2021.",
      context_explanation:
        "Mise en examen le 4 septembre 2024 pour « destruction de bien par un moyen dangereux pour les personnes, commise en raison de la race, l'ethnie, la nation ou la religion en récidive légale et tentative de vol avec effraction en récidive » — une qualification criminelle de droit commun, aucune infraction terroriste. Le parquet annonce des « expertises psychiatriques et psychologiques » ; lors de son procès de 2022, le psychiatre avait relevé une « réelle souffrance psychique » et un homme qui « cherchait à être en prison car il s'y sent plus en sécurité qu'à l'extérieur ».",
      original_url:
        "https://www.franceinfo.fr/faits-divers/justice-proces/incendie-dans-une-eglise-a-saint-omer-le-suspect-recidiviste-a-ete-mis-en-examen_6763111.html",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "257bb185-0620-4ad0-bf64-7c54fbb77753",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name: "Incendie de l'église à Saint-Omer : le suspect mis en examen et écroué",
      author_or_institution: "Le Figaro",
      publication_date: "2024-09-05",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Lors de sa garde à vue, l'individu de 39 ans, déjà condamné à 26 reprises, a reconnu les faits.",
      context_explanation:
        "Le Figaro détaille le casier : 26 condamnations, dont deux pour destruction de biens par un moyen dangereux et une pour dégradation ou détérioration d'un lieu de culte (l'incendie volontaire de quatre églises du Boulonnais, en 2021) ; « ses autres condamnations portaient sur des vols par effraction, par ruse ou avec dégradation ». Le suspect, né en 1985, SDF, sortait de prison (27 août) et a été écroué le 4 septembre 2024.",
      original_url:
        "https://www.lefigaro.fr/faits-divers/incendie-de-l-eglise-a-saint-omer-le-suspect-mis-en-examen-et-ecroue-20240905",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "23738d7b-0d36-460f-bdd1-809da51d2a09",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "« Sanctionner les auteurs d'incendies volontaires du patrimoine » — exposé des motifs de la proposition de loi n° 161 (2024-2025)",
      author_or_institution: "Valérie Boyer (Sénat)",
      publication_date: "2024-11-22",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Selon l'Observatoire du patrimoine religieux (OPR), 27 églises ont été incendiées en 2023 et 12 sur les six premiers mois de 2024. Sur ces 27 départs de feu dans des églises, 8 étaient d'origine criminelle, 19 accidentelle. Et pour les neuf premiers mois de 2024, sur les 26 incendies déclarés, 14 étaient d'origine criminelle.",
      context_explanation:
        "Texte déposé au Sénat le 22 novembre 2024 : les chiffres parlementaires (d'origine OPR) montrent des sinistres de causes diverses — majoritairement accidentels en 2023 (19 sur 27) — et jamais l'existence d'une campagne terroriste ; les incendies criminels recensés relèvent d'actes isolés ou de malveillance, comme celui de Saint-Omer, le plus retentissant de 2024.",
      original_url: "https://www.senat.fr/leg/exposes-des-motifs/ppl24-161-expose.html",
      author_reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "65c98be3-d12a-429d-a025-685a957f9d76",
      spectrum: "CENTRE",
      source_name:
        "« Ces églises malmenées en 2024 » — incendies, profanations, vandalisme (note de l'Observatoire du patrimoine religieux)",
      author_or_institution: "Observatoire du patrimoine religieux (OPR, association)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "L'origine criminelle de l'incendie a été officiellement établie. Déjà connu des services de police, l'auteur des faits avait été condamné à de nombreuses reprises pour des faits de destruction par incendie dans six églises du Boulonnais.",
      context_explanation:
        "La note de l'OPR — association qui tient le décompte de référence des sinistres d'églises, citée par le Sénat — souligne que « les incendies sont la plupart du temps accidentels » et que, en 2024, « 14 incendies d'églises étaient volontaires sur 26 départs de feu » (janvier-septembre). Le cas de Saint-Omer y est celui d'un incendiaire récidiviste, non d'un attentat.",
      original_url: "https://www.patrimoine-religieux.fr/wp-content/uploads/2025/06/Incendies.pdf",
      author_reference_url: "https://www.patrimoine-religieux.fr/",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "d3d93e12-40ea-4923-aabd-56be443a41fb",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Code pénal — article 421-1 (définition des actes de terrorisme)",
      author_or_institution:
        "République française — Code pénal (texte reproduit par Justicelibre, Légifrance bloquant les robots)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Constituent des actes de terrorisme, lorsqu'elles sont intentionnellement en relation avec une entreprise individuelle ou collective ayant pour but de troubler gravement l'ordre public par l'intimidation ou la terreur, les infractions suivantes :",
      context_explanation:
        "Texte de référence : un attentat suppose une « entreprise individuelle ou collective » et une intention de « troubler gravement l'ordre public par l'intimidation ou la terreur ». Dans le dossier de Saint-Omer, aucune qualification antiterroriste n'est apparue : l'affaire a été instruite au pôle criminel de Boulogne-sur-Mer, sur les seuls chefs de « destruction de bien par un moyen dangereux » (aggravée) et de « tentative de vol avec effraction ».",
      original_url: "https://justicelibre.org/loi/CP/421-1",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "76864ffa-b81f-485f-9705-b06cf7f6f87e",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Code pénal — article 322-6 (destructions, dégradations et détériorations dangereuses pour les personnes)",
      author_or_institution:
        "République française — Code pénal (texte reproduit par Justicelibre, Légifrance bloquant les robots)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "La destruction, la dégradation ou la détérioration d'un bien appartenant à autrui par l'effet d'une substance explosive, d'un incendie ou de tout autre moyen de nature à créer un danger pour les personnes est punie de dix ans d'emprisonnement et de 150 000 euros d'amende.",
      context_explanation:
        "C'est l'incrimination de droit commun réellement applicable à l'incendie de Saint-Omer — un crime puni de dix ans d'emprisonnement (peines portées jusqu'à la réclusion en cas de dommages corporels). La procédure est celle de la criminalité ordinaire, y compris pour l'aggravation liée au caractère religieux de l'édifice incendié.",
      original_url: "https://justicelibre.org/loi/CP/322-6",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
    {
      id: "d83db0b3-2767-40d4-9a25-d774220423c7",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name: "Firesetting, Arson, Pyromania, and the Forensic Mental Health Expert",
      author_or_institution:
        "Burton, McNiel et Binder — Journal of the American Academy of Psychiatry and the Law, 2012, vol. 40, n° 3",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "firesetting is a behavior, arson is a crime, and pyromania is a psychiatric diagnosis. Despite these distinctions, courts have erroneously applied these terms interchangeably.",
      context_explanation:
        "Article de psychiatrie médico-légale de référence : il distingue le comportement d'allumage de feu, le crime (l'incendie volontaire) et le diagnostic (la pyromanie), et rappelle que l'incendiaire type est fréquemment atteint de troubles psychiatriques et de conduites addictives — un profil de criminalité ordinaire ou pathologique, sans lien avec une entreprise terroriste. Dans le dossier de Saint-Omer, les expertises psychiatriques et psychologiques ordonnées par la justice s'inscrivent dans ce cadre.",
      original_url: "https://jaapl.org/content/40/3/355",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 7,
    },
  ],
};

export const RSA_SMIC_DOSSIER: Dossier = {
  id: "3b38eeea-669e-4a45-8904-60084454bbd7",
  slug: "aides-rsa-vs-smic-revenu-disponible",
  claim_title: "Un couple au RSA gagne plus qu'un couple au SMIC en cumulant les aides",
  verdict: "FAUX",
  category: "ECONOMIE",
  protagonists: [
    {
      name: "Revenu de solidarité active",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Revenu_de_solidarit%C3%A9_active",
      note: "Allocation différentielle : elle porte les ressources du foyer au niveau d'un montant forfaitaire, sans s'y cumuler.",
    },
    {
      name: "Prime d'activité",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Prime_d%27activit%C3%A9",
      note: "Complément de revenu versé aux travailleurs modestes, revalorisé au 1er avril 2026.",
    },
    {
      name: "Salaire minimum interprofessionnel de croissance",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Salaire_minimum_interprofessionnel_de_croissance",
      note: "Salarié au SMIC : revenu d'activité complet + prime d'activité + aides au logement.",
    },
    {
      name: "Caisse nationale des allocations familiales",
      kind: "ORGANISATION",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Caisse_nationale_des_allocations_familiales",
      note: "Publie les barèmes du RSA et de la prime d'activité (montants et forfait logement).",
    },
    {
      name: "Cour des comptes (France)",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)",
      note: "Communication sur la prime d'activité à la commission des finances du Sénat (juin 2026).",
    },
  ],
  verdict_summary:
    "Le RSA est une allocation différentielle : il « porte les ressources du foyer au niveau du montant forfaitaire » — 977,54 € pour un couple au 1er avril 2026 — et il est amputé d'un forfait logement (156,41 € pour deux en cas d'aide au logement), soit environ 821 € de RSA net pour un couple avec APL. À l'inverse, un couple dont un membre travaille au SMIC cumule son salaire complet, la prime d'activité (montant forfaitaire porté à 638,28 €, revalorisé de 0,8 % en avril 2026), les APL et, le cas échéant, les allocations familiales. Les études convergent : l'OFCE (20 cas-types) montre que « l'emploi est toujours plus rémunérateur que l'inactivité » (gain de 252 à 533 € par mois pour un mi-temps) et la Cour des comptes (2026) que la prime d'activité « a largement contribué à faire disparaître les situations de pauvreté pour les personnes qui travaillent à temps plein ». Le travail rapporte plus que le RSA, pas l'inverse.",
  consensus_score: 100,
  premises: [
    {
      claim_part: "« Le cumul des aides permet de dépasser 2 000 € au RSA sans travailler »",
      status: "FAUX",
      detail:
        "Le RSA est plafonné par construction : « une allocation qui porte les ressources du foyer au niveau du montant forfaitaire » (CASF, art. L. 262-2), et le forfait logement — 12 à 16,5 % du forfait selon la taille du foyer (art. R. 262-9 du CASF), soit 156,41 € pour deux — est déduit lorsque le foyer perçoit une aide au logement. Un couple inactif perçoit au plus 977,54 € de RSA, réduits à environ 821 € avec APL : aucun cumul passif n'atteint 1 500 €, a fortiori 2 000 €.",
    },
    {
      claim_part: "« Travailler au SMIC rapporte moins que l'inactivité complète »",
      status: "FAUX",
      detail:
        "Dès la reprise d'emploi, le salaire s'ajoute aux aides qui subsistent : prime d'activité pour les revenus modestes (forfait maximal 638,28 €, revalorisé au 1er avril 2026), APL, allocations familiales. Les rapporteurs du Sénat relèvent que « la reprise d'une activité garantit un gain financier immédiat, et ce dès le premier euro gagné » ; l'étude OFCE sur 20 cas-types conclut que l'emploi est toujours plus rémunérateur que l'inactivité (gain mensuel de 252 à 533 € pour un mi-temps au SMIC).",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "b2b5047e-3939-4de9-accd-a6ea7cdc8d70",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Code de l'action sociale et des familles — article L. 262-2 (définition du RSA)",
      author_or_institution:
        "République française — Code de l'action sociale et des familles (texte reproduit par Justicelibre, Légifrance bloquant les robots)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Toute personne résidant en France de manière stable et effective, dont le foyer dispose de ressources inférieures à un montant forfaitaire, a droit au revenu de solidarité active dans les conditions définies au présent chapitre.",
      context_explanation:
        "Le même article précise : « Le revenu de solidarité active est une allocation qui porte les ressources du foyer au niveau du montant forfaitaire. » C'est le principe de l'allocation différentielle : le RSA complète les ressources jusqu'au forfait — il ne s'y ajoute jamais intégralement, ce qui interdit par construction les cumuls à quatre chiffres allégués.",
      original_url: "https://justicelibre.org/loi/CASF/L262-2",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "60258a81-8328-431e-af90-a78bc8a0a45d",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Code de l'action sociale et des familles — article R. 262-9 (évaluation forfaitaire des avantages de logement)",
      author_or_institution:
        "République française — Code de l'action sociale et des familles (texte reproduit par Justicelibre, Légifrance bloquant les robots)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Sauf lorsqu'ils constituent un élément des revenus professionnels mentionnés à l'article R. 262-12, les avantages en nature procurés par un logement occupé soit par son propriétaire ne bénéficiant pas d'aide personnelle au logement, soit, à titre gratuit, par les membres du foyer, sont évalués mensuellement et de manière forfaitaire :",
      context_explanation:
        "Le texte fixe l'évaluation forfaitaire à « 12 % du montant forfaitaire » pour une personne, 16 % pour deux, 16,5 % pour trois et plus : c'est le « forfait logement » déduit du RSA (et des ressources prises en compte). Au 1er avril 2026, cela correspond à 78,20 € pour une personne, 156,41 € pour deux et 193,55 € pour trois et plus — les montants publiés par la CNAF et service-public.fr.",
      original_url: "https://justicelibre.org/loi/CASF/R262-9",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "05feb5e6-1c45-4fc6-a720-6a5f5ec5f1fc",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name: "Barème du revenu de solidarité active (au 1er avril 2026)",
      author_or_institution: "CNAF (Caisse nationale des allocations familiales)",
      publication_date: "2026-04-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote: "Couple ou isolé 1 enfant 977.54 € 156.41 €",
      context_explanation:
        "Barème officiel de la branche Famille : « 1 personne : 651.69 €, forfait logement 78.20 € ; Couple ou isolé 1 enfant : 977.54 €, forfait logement 156.41 € ; Couple 2 enfants : 1 368.56 €… ». Le tableau fixe à la fois le montant forfaitaire du RSA et le forfait logement déduit en cas d'aide au logement : pour un couple sans enfant, le RSA ne peut donc pas dépasser 977,54 €, et tombe à 821,13 € avec APL.",
      original_url:
        "https://www.caf.fr/professionnels/offres-et-services/accompagnement-des-allocataires/bareme-revenu-de-solidarite-active",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "311c50f8-52e8-4af3-8372-1b2c3c633ef7",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name: "RSA : demandeur de 25 ans et plus — montants et forfait logement (fiche F19778)",
      author_or_institution: "DILA — service-public.fr (Premier ministre)",
      publication_date: "2026-07-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Si vous percevez une aide au logement ou si vous êtes hébergé gratuitement ou propriétaire de votre logement, un montant forfaitaire est ajouté à vos ressources. Ce forfait dépend du nombre de personnes au foyer.",
      context_explanation:
        "La fiche officielle fixe le RSA d'un couple à 977,54 € (0 enfant) et détaille le forfait logement (78,20 € pour 1 personne, 156,41 € pour 2). Exemple officiel : « Pour un couple avec 2 enfants à charge bénéficiaire d'une aide au logement et des allocations familiales, le montant du RSA est égal à 1 022,75 € (1 368,55 € - 152,25 € - 193,55 €) » — très loin de « plus de 2 000 € ».",
      original_url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F19778",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "e36ffeef-01c6-4c53-a26e-ad8bb545623b",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name: "La prime d'activité revalorisée en 2026",
      author_or_institution: "DILA — service-public.fr (Premier ministre)",
      publication_date: "2026-03-05",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Son montant forfaitaire est passé à 638,28 € (auparavant 633,21 €) pour une personne seule sans enfant à charge. Sa revalorisation annuelle s'élève à 0,8 %.",
      context_explanation:
        "Au 1er avril 2026, la loi de finances pour 2026 a revalorisé la prime d'activité — complément de revenu pour les actifs modestes, créé en 2015 en remplacement du RSA activité et de la prime pour l'emploi. C'est ce dispositif qui assure « un gain financier immédiat » au salarié modeste : il n'existe aucun équivalent cumulable pour un foyer entièrement inactif.",
      original_url: "https://www.service-public.gouv.fr/particuliers/actualites/A18815",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "a64152ee-1688-4e21-b2d0-27c186f8d285",
      spectrum: "CENTRE",
      source_name:
        "La prime d'activité — « un soutien efficace au revenu des travailleurs, une trop faible incitation à l'activité » (communication à la commission des finances du Sénat)",
      author_or_institution: "Cour des comptes (France)",
      publication_date: "2026-06-10",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "la prime d'activité a largement contribué à faire disparaître les situations de pauvreté pour les personnes qui travaillent à temps plein, quelle que soit la configuration familiale, y compris pour les familles monoparentales.",
      context_explanation:
        "L'enquête de la Cour (juin 2026, 10,6 Md€ de dépense en 2024) confirme le soutien au revenu : « il existe bien un gain au travail dans la grande majorité des situations individuelles ». Elle critique en revanche la lisibilité du dispositif (près de 80 % des bénéficiaires sondés disent ne pas en tenir compte dans leurs choix d'emploi) et cite les travaux de l'Institut des politiques publiques : la réforme de 2019 n'a pas eu d'effet observable sur l'emploi — sans contester le gain financier lui-même.",
      original_url:
        "https://program-evaluation.ccomptes.fr/sites/default/files/2026-06/20260610-communique-Prime-d-activite.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "4e0a27d6-6361-4504-941c-028c7582f40a",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "Pour suite à donner à l'enquête de la Cour des comptes sur la prime d'activité — rapport des rapporteurs spéciaux",
      author_or_institution: "Arnaud Bazin et Pierre Barros, rapporteurs spéciaux (Sénat, commission des finances)",
      publication_date: "2026-06-10",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Les rapporteurs spéciaux s'associent au constat d'un dispositif peinant à transmettre un message clair selon lequel la reprise d'une activité garantit un gain financier immédiat, et ce dès le premier euro gagné.",
      context_explanation:
        "Le rapport sénatorial (juin 2026) prolonge l'enquête de la Cour : la reprise d'activité « garantit un gain financier immédiat », le problème étant la lisibilité du dispositif — et non l'inverse. Il documente aussi le complément réel à la rémunération des bénéficiaires et les options d'amélioration des incitations (seuil de bonus, solidarité à la source).",
      original_url: "https://www.senat.fr/rap/r25-728/r25-7281.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
    {
      id: "21557703-25fe-495c-8f9f-7b70ca5c041b",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name: "La reprise d'emploi est-elle toujours rémunératrice ?",
      author_or_institution:
        "Guillaume Allègre et Muriel Pucci (OFCE, Sciences Po Paris) — blog OFCE, document de travail 2025-24",
      publication_date: "2025-12-19",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "nous montrons que l'emploi est toujours plus rémunérateur que l'inactivité. Les graphiques ci-dessous décrivent la variation de revenu disponible à la suite du passage de l'inactivité à un emploi à temps complet au smic pour 20 cas-types différenciés par le nombre d'enfants, la présence ou non d'un conjoint et les revenus du conjoint.",
      context_explanation:
        "Étude OFCE sur 20 cas-types : à temps plein au SMIC, le revenu disponible augmente dans tous les cas ; à mi-temps, le gain reste de « 252 à 533 euros selon les cas types ». Les revenus d'assistance, eux, « assurent un niveau de vie inférieur à 40 % du niveau de vie médian » pour une personne isolée ou un couple. Conclusion des auteurs, reprenant la formule de Jean-Pierre Farandou : « un foyer qui travaille gagne nettement plus qu'un foyer qui ne vit que d'aides sociales ».",
      original_url: "https://www.ofce.fr/blog2024/fr/2025/20251219_GAMP/index.html",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 7,
    },
  ],
};

export const DISCRIMINATIONS_EMBAUCHE_DOSSIER: Dossier = {
  id: "e2640e72-740e-4e52-bdcb-3ac633453a08",
  slug: "discriminations-embauche-origine-mythe",
  claim_title: "Les discriminations à l'embauche liées à l'origine sont un mythe victimaire",
  verdict: "FAUX",
  category: "SOCIETE",
  protagonists: [
    {
      name: "Institut Montaigne",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Institut_Montaigne",
      note: "Think tank libéral ; testing sur CV de 2019 sur les discriminations religieuses à l'embauche.",
    },
    {
      name: "Défenseur des droits",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/D%C3%A9fenseur_des_droits",
      note: "Autorité indépendante ; baromètre et rapport annuel sur les discriminations dans l'emploi.",
    },
    {
      name: "Direction de l'animation de la recherche, des études et des statistiques",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url:
        "https://fr.wikipedia.org/wiki/Direction_de_l%27Animation_de_la_recherche,_des_%C3%89tudes_et_des_Statistiques",
      note: "Service statistique du ministère du Travail, commanditaire des grandes campagnes de testing.",
    },
    {
      name: "Institut des politiques publiques",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Institut_des_politiques_publiques",
      note: "Centre de recherche (PSE/GENES) ; note n° 76 sur la grande étude par testing.",
    },
    {
      name: "Université Gustave-Eiffel",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Universit%C3%A9_Gustave-Eiffel",
      note: "Laboratoire ERUDITE/TEPP-CNRS ; programme DESPERADO de testing répété depuis 2015.",
    },
  ],
  verdict_summary:
    "Des campagnes nationales de testing sur CV — candidatures strictement identiques ne variant que sur le prénom et le nom — documentent une pénalité persistante. La grande étude de l'Institut des politiques publiques et d'ISM Corum, menée sous l'égide de la Dares, conclut qu'« à qualité comparable, les candidatures dont l'identité suggère une origine maghrébine ont 31,5 % de chances de moins d'être contactées par les recruteurs que celles portant un prénom et nom d'origine française ». Le programme DESPERADO de l'université Gustave Eiffel (TEPP-CNRS) mesure des pénalités relatives de 26,7 % à 30,8 % selon les métiers — et la DGAFP confirme que le résultat « se maintient sur toute la période, dans le secteur privé comme dans la fonction publique ». Le Défenseur des droits constate que ces discriminations « restent vivaces », et l'Institut Montaigne rappelle qu'un testing en comptabilité avait déjà révélé « quatre fois moins de chances » pour un patronyme marocain. Le « mythe victimaire » est démenti par les données.",
  consensus_score: 100,
  premises: [
    {
      claim_part: "« Le marché du travail ne juge que les compétences individuelles »",
      status: "FAUX",
      detail:
        "Le testing scientifique isole l'effet du seul patronyme à profil strictement identique : l'IPP mesure ainsi un écart de rappel de 31,5 % en défaveur des candidatures à consonance maghrébine, à CV égal. Le programme DESPERADO V (Université Gustave Eiffel/TEPP-CNRS) mesure des pénalités de 3 à 12,1 points de pourcentage selon les profils, soit 30,8 % en relatif — le même ordre de grandeur que la pénalité liée à l'âge. Un effet net, toutes choses égales par ailleurs, apparaît donc indépendamment des compétences affichées.",
    },
    {
      claim_part:
        "« Les écarts d'accès à l'emploi résultent uniquement de différences de formation »",
      status: "CONFUSION_CONCEPTUELLE",
      detail:
        "La disparité persiste aux niveaux de diplôme les plus élevés : dans l'enseignement supérieur et la recherche — secteur où « les principes d'égalité et d'intégrité structurent largement l'activité » — le testing TEPP-CNRS (2 748 candidatures, 2021-2022) met en évidence une exposition à la discrimination selon l'origine « d'une ampleur comparable à celle qui existe dans l'ensemble de la fonction publique ». L'IPP confirme que la discrimination, si elle est « plus faible, sans s'effacer, parmi les salariés les plus qualifiés », reste significative à tous les niveaux de formation.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "5a00776c-20c7-489c-add2-352a99ce3a42",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Discrimination à l'embauche : les caractéristiques du poste à pourvoir importent-elles ? (revue Travail et Emploi n° 180)",
      author_or_institution:
        "Émilie Arnoult et Véronique Rémy (DARES, ministère du Travail) — texte intégral reproduit par la CFDT, le portail OpenEdition de la revue bloquant les robots",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Les résultats des testings mesurant les discriminations à l'embauche selon l'origine ethnique sont consensuels, en France comme ailleurs : les personnes issues des minorités ethniques sont moins souvent recontactées par les recruteurs que celles issues de la population majoritaire",
      context_explanation:
        "Article de la DARES publié dans Travail et Emploi n° 180 (2026, DOI 10.4000/1692l), à partir des données du testing couvrant « douze métiers dans l'ensemble de la France métropolitaine » (2 400 offres, 9 600 candidatures). Les autrices y établissent que « les écarts de traitement lors de l'embauche entre les candidatures d'origine supposée maghrébine et française varient selon les caractéristiques du poste à pourvoir » — le traitement préférentiel des candidatures à consonance française est plus fréquent en CDD court qu'en CDI, moindre en CDD long. La littérature citée (Neumark, 2018 ; Quillian et al., 2019) situe ce constat parmi les plus consensuels de l'économie du travail.",
      original_url:
        "https://f3c.cfdt.fr/upload/docs/application/pdf/2026-05/cfdt_f3c_discri_origine_discrimination_a_l_embauche.pdf",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Direction_de_l%27Animation_de_la_recherche,_des_%C3%89tudes_et_des_Statistiques",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "3b67e8f6-feae-44ef-8f21-38c52a688d38",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Le « testing » montre que des discriminations persistent dans l'accès à l'entretien d'embauche, y compris dans la fonction publique (Rapport annuel sur l'état de la fonction publique)",
      author_or_institution:
        "DGAFP — Direction générale de l'administration et de la fonction publique (Premier ministre)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Les candidats dont le nom et le prénom indiquent qu'ils sont d'origine maghrébine ont moins de chances d'avoir une réponse positive à leur candidature. Ce résultat se maintient sur toute la période, dans le secteur privé comme dans la fonction publique.",
      context_explanation:
        "Synthèse du programme DESPERADO dans l'édition 2022 du rapport annuel : « Ce sont 2 594 offres d'emploi de cadre administratif ou d'aide-soignante publiées en Île-de-France qui ont été testées sur quatre périodes allant de 2015 à 2021. » Pour l'origine, les écarts sont « statistiquement significatifs à chacune des vagues de tests pour les aides-soignantes » et pour les cadres administratifs lors de plusieurs périodes — signe que la discrimination s'inscrit dans la durée, y compris dans les recrutements publics.",
      original_url:
        "https://www.fonction-publique.gouv.fr/files/files/publications/dossier-rapport-annuel/dossier_testing_discriminations.pdf",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "5078d971-ebf4-41d9-9f8a-2165b9b74854",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Discrimination à l'embauche des personnes d'origine supposée maghrébine : quels enseignements d'une grande étude par testing ? (note n° 76)",
      author_or_institution:
        "Institut des politiques publiques (IPP, PSE/GENES) — étude ISM Corum-IPP menée sous l'égide de la Dares",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "En moyenne, à qualité comparable, les candidatures dont l'identité suggère une origine maghrébine ont 31,5 % de chances de moins d'être contactées par les recruteurs que celles portant un prénom et nom d'origine française.",
      context_explanation:
        "Grande étude par testing : 9 600 candidatures envoyées en réponse à 2 400 offres d'emploi publiées, sur 11 catégories de métiers, sexe et identité attribués aléatoirement. Les auteurs ajoutent : « Pour recevoir le même nombre de réponses positives, une personne dont le prénom et le nom sont à consonance maghrébine doit envoyer en moyenne 1,5 fois plus de candidatures qu'une personne ayant le même profil mais dont le prénom et le nom sont à consonance française. » La discrimination « reste élevée et un élément majeur du marché du travail en France », plus faible « sans s'effacer » chez les salariés les plus qualifiés, et sans variation notable entre femmes et hommes.",
      original_url:
        "https://www.ipp.eu/wp-content/uploads/2025/05/76_Note_IPP_n76_Discrimination-a-l_embauche-selon-l_origine.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Institut_des_politiques_publiques",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "37d43393-8cfb-4b3a-a947-0b97833a1ced",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Discriminations à l'embauche, âge et origine : une évaluation à l'aide d'un test multi-critères (programme DESPERADO V)",
      author_or_institution:
        "Laetitia Challe, Yannick L'Horty, Pascale Petit et François-Charles Wolff (Université Gustave Eiffel, ERUDITE, TEPP-CNRS ; Université de Nantes) — convention avec la DGAFP",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Pour un candidat dont l'origine maghrébine est suggérée par la consonance du nom et du prénom, la pénalité varie de 3 à 12,1 points selon les profils des candidats et les secteurs d'activité.",
      context_explanation:
        "Testing multi-critères de l'université Gustave Eiffel (TEPP-CNRS) : 3 375 candidatures fictives envoyées en réponse à 675 offres d'emploi d'Île-de-France entre novembre 2023 et mars 2024. « En termes relatifs, rapportés au taux de succès des candidats de références, les écarts sont respectivement de 30,8 % et de 26,7 % » pour les cadres administratifs et les aides-soignantes. La pénalité de l'origine maghrébine est « plus généralisée » que celle de l'âge (qui atteint 22,3 % en relatif pour les séniors cadres) et persiste dans le privé comme dans le public.",
      original_url:
        "https://www.tepp.eu/images/pdf/2025/discriminationembaucheageorigine.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Universit%C3%A9_Gustave-Eiffel",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "d7560e60-3539-4d32-a472-4d702bf65aab",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Les discriminations à l'embauche dans l'enseignement supérieur et la recherche (revue Économie et Statistique n° 548)",
      author_or_institution:
        "Laetitia Challe, Yannick L'Horty, Pascale Petit et François-Charles Wolff (Université Gustave Eiffel, ERUDITE, TEPP-CNRS ; Université de Nantes), TEPP-CNRS",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "l'étude met en évidence une exposition aux discriminations selon l'origine Nord-Africaine d'une ampleur comparable à celle qui existe dans l'ensemble de la fonction publique",
      context_explanation:
        "Test par correspondance portant sur 2 748 candidatures envoyées en 2021 et 2022 à des établissements d'enseignement supérieur et de recherche, en réponse à des offres publiées et sous forme de candidatures spontanées. Le secteur est pourtant celui où « les principes d'égalité et d'intégrité structurent largement l'activité » : la pénalité liée à l'origine signalée par le patronyme y demeure du même ordre que dans l'ensemble du secteur public — la discrimination ne s'efface donc pas avec l'élévation du niveau de diplôme.",
      original_url:
        "https://www.tepp.eu/images/pdf/2024/discriminationembaucheenseignementsuperieur.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Universit%C3%A9_Gustave-Eiffel",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "e5cec67d-e0bb-4a64-81f9-c5316ee64d69",
      spectrum: "CENTRE",
      source_name: "Rapport annuel d'activité 2024",
      author_or_institution: "Défenseur des droits",
      publication_date: "2025-03-05",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Les discriminations fondées sur l'origine réelle ou supposée demeurent, en particulier, un sujet tabou, alors qu'elles restent vivaces selon les enquêtes, que certaines mesures expérimentées comme l'index diversité dans les entreprises n'ont pas été pérennisées et que la lutte contre les discriminations est éclipsée par les débats portant sur l'immigration et l'intégration.",
      context_explanation:
        "Bilan institutionnel annuel de l'autorité indépendante. Son baromètre sur la perception des discriminations dans l'emploi « montre, pour la première fois, l'entrecroisement des critères origine et religion, alors que le premier devance traditionnellement le second : 15 % de l'ensemble de la population active déclare avoir vécu une discrimination dans l'emploi en raison d'une pratique religieuse (contre 7 % en 2023), 15 % également le déclare sur le fondement de l'origine (contre 19 % en 2023) ». L'origine demeure donc l'un des tout premiers motifs de discrimination déclarée et de saisine.",
      original_url:
        "https://www.defenseurdesdroits.fr/sites/default/files/2025-03/ddd_rapport-annuel-2024_20250305.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/D%C3%A9fenseur_des_droits",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "59c55ae7-314d-4998-938c-2820566485c9",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name: "Discriminations religieuses à l'embauche : une réalité (testing Valfort-Institut Montaigne)",
      author_or_institution:
        "Institut Montaigne — Marie-Anne Valfort (rapport de novembre 2019, page servie par l'instantané Wayback du 8 octobre 2026, le site étant protégé par un anti-robots)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "En 2006, un testing sur CV mené dans le secteur de la comptabilité a permis de comparer les taux de convocation à un entretien d'embauche de deux Français dotés des mêmes CV à l'exception de leur origine nationale, signalée par le prénom et le nom. « Clément Meunier » suggérait une origine française, « Yassine Mokraoui » une origine marocaine. Ce testing a permis de révéler que le Français d'origine marocaine a quatre fois moins de chances que le Français d'origine française d'être contacté par le recruteur en vue d'un entretien d'embauche.",
      context_explanation:
        "Le think tank libéral documente lui-même la discrimination par le patronyme, puis prolonge l'analyse : son testing de 2019 (6 231 offres d'emploi en comptabilité, France métropolitaine) montre une forte discrimination religieuse — « la probabilité des catholiques d'être contactés par le recruteur pour un entretien d'embauche est supérieure de 30 % à celle des juifs ; elle est deux fois plus forte que celle des musulmans » — et pointe l'« amalgame entre Maghrébins et musulmans » relevé chez les recruteurs. Un instrument de mesure porté par des acteurs de tous bords, y compris les plus libéraux.",
      original_url:
        "https://web.archive.org/web/20261008000723/https://www.institutmontaigne.org/publications/discriminations-religieuses-lembauche-une-realite",
      author_reference_url: "https://fr.wikipedia.org/wiki/Institut_Montaigne",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
  ],
};

export const HOMOPARENTALITE_DOSSIER: Dossier = {
  id: "d50b5c99-ee02-49cf-b690-950efc6e2b2d",
  slug: "homoparentalite-developpement-troubles-enfants",
  claim_title:
    "Les enfants élevés par des couples homosexuels développent des troubles psychologiques",
  verdict: "FAUX",
  category: "SOCIETE",
  protagonists: [
    {
      name: "Association américaine de psychologie",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Association_am%C3%A9ricaine_de_psychologie",
      note: "APA ; résolution de 2020 sur les parents et leurs enfants (après celle de 2004).",
    },
    {
      name: "Académie américaine de pédiatrie",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Acad%C3%A9mie_am%C3%A9ricaine_de_p%C3%A9diatrie",
      note: "AAP ; prise de position de 2013 pour le bien-être des enfants de parents gays ou lesbiens.",
    },
    {
      name: "Institut national d'études démographiques",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Institut_national_d%27%C3%A9tudes_d%C3%A9mographiques",
      note: "INED ; enquête Erfi 2 sur les configurations familiales, dont les familles homoparentales.",
    },
    {
      name: "Conseil constitutionnel (France)",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)",
      note: "Décision n° 2013-669 DC du 17 mai 2013 sur le mariage et l'adoption pour les couples de même sexe.",
    },
    {
      name: "Cour européenne des droits de l'homme",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Cour_europ%C3%A9enne_des_droits_de_l%27homme",
      note: "CEDH ; arrêt de Grande Chambre X et autres c. Autriche (19 février 2013).",
    },
  ],
  verdict_summary:
    "Plus de trente ans de littérature scientifique convergent : la méta-revue du What We Know Project (université Cornell) recense 79 études, dont 75 concluent que les enfants de parents gays ou lesbiens « ne s'en sortent pas moins bien » que les autres — et les quatre études minoritaires portaient sur des enfants de familles brisées, un biais documenté. L'American Psychological Association (résolution de février 2020) constate qu'il existe « un consensus » dans la littérature : la qualité des relations familiales pèse davantage sur le devenir de l'enfant que la structure du foyer. L'Académie américaine de pédiatrie affirme que le bien-être d'un enfant dépend « bien plus » de ses relations avec ses parents et du soutien social « que du genre ou de l'orientation sexuelle de ses parents ». En France, l'INED dénombre 107 000 enfants de moins de 18 ans vivant dans un couple de même sexe (enquête Erfi 2), le rapport parlementaire de 2013 relevait qu'« aucune étude ne jette de suspicion sérieuse sur les familles homoparentales », le Conseil constitutionnel a jugé que « l'identité de sexe des adoptants » n'est pas en soi un obstacle à la filiation adoptive, et la CEDH a jugé incompatible avec la Convention le refus d'adoption coparentale opposé à un couple homosexuel.",
  consensus_score: 98,
  premises: [
    {
      claim_part: "« L'absence d'un parent de chaque sexe perturbe la construction psychologique »",
      status: "FAUX",
      detail:
        "Les méta-analyses et revues systématiques ne relèvent aucune justification empirique à cette crainte : l'American Psychological Association note que « la recherche a constamment échoué à mettre au jour une justification empirique à ces préoccupations » (résolution de 2020, citant les revues de 2015-2019) et que « les enfants de parents sexuels minoritaires semblent se développer de manière saine et typique » à tous les âges et domaines. Le rapport parlementaire français de 2013 : « Sur aucun de ces points, il n'est apparu de différence significative entre les enfants étudiés et les groupes témoins. »",
    },
    {
      claim_part: "« Les enfants de couples homosexuels sont fragilisés socialement et scolairement »",
      status: "FAUX",
      detail:
        "Les études sur données représentatives (recensement américain : 3 500 enfants de couples de même sexe, aucune différence de progression scolaire ; plus de 20 000 enfants des enquêtes nationales) ne mesurent pas de décrochage corrélé à la structure parentale. La fragilité observée, quand elle existe, relève du stigmate social : le rapport de l'Assemblée nationale le résume — « La seule fragilité particulière, lorsqu'il y en a une, relève du regard négatif que la société peut porter sur cette situation particulière. »",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "db6702ee-8253-489e-b369-4849ada6b224",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "What does the scholarly research say about the well-being of children with gay or lesbian parents? (revue de littérature en ligne)",
      author_or_institution: "What We Know Project, université Cornell",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Taken together, this research forms an overwhelming scholarly consensus, based on over three decades of peer-reviewed research, that having a gay or lesbian parent does not harm children.",
      context_explanation:
        "Revue publiée en 2015 : « We identified 79 scholarly studies... Of those studies, 75 concluded that children of gay or lesbian parents fare no worse than other children. » Les quatre études minoritaires échantillonnaient des enfants issus de ruptures familiales (« a cohort known to face added risks ») et sont « criticized by many scholars as unreliable assessments of the well-being of LGB-headed households ». La page documente aussi les études sur données représentatives (Rosenfeld : 3 500 enfants, aucune différence scolaire ; enquête nationale sur plus de 20 000 enfants). En français : « cette recherche forme un consensus savant écrasant [...] que le fait d'avoir un parent gay ou lesbien ne nuit pas aux enfants ».",
      original_url:
        "https://whatweknow.inequality.cornell.edu/topics/lgbt-equality/what-does-the-scholarly-research-say-about-the-wellbeing-of-children-with-gay-or-lesbian-parents/",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "851428be-7c25-4b86-bc00-598573a5f922",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "APA Resolution on Sexual Orientation, Gender Identity (SOGI), Parents and their Children",
      author_or_institution:
        "American Psychological Association — résolution adoptée en février 2020, remplaçant celle de 2004 ; PDF servi par l'instantané Wayback, apa.org bloquant les robots",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Overall, there is consensus in the existing literature that family processes, such as the quality of parenting and family relationships, are more important to child and family outcomes than is the specific structure of the family as related to parental sexual orientation",
      context_explanation:
        "Résolution officielle de la principale association de psychologues américaine (février 2020), qui conclut aussi : « research consistently shows that LGBQ adults are just as capable and efficient at parenting children as their cisgender heterosexual counterparts. » La résolution reconnaît en revanche l'effet documenté des « minority stressors » (préjugés, harcèlement, discrimination) sur les familles, et des climats sociaux et juridiques. En français : « il existe un consensus dans la littérature existante : les processus familiaux [...] comptent davantage que la structure spécifique de la famille liée à l'orientation sexuelle des parents ».",
      original_url:
        "http://web.archive.org/web/20260708214831id_/https://www.apa.org/about/policy/resolution-sexual-orientation-parents-children.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Association_am%C3%A9ricaine_de_psychologie",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "bcfc269f-4fa7-447a-be54-ec9af246a49b",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Promoting the Well-Being of Children Whose Parents Are Gay or Lesbian (Pediatrics, 20 mars 2013)",
      author_or_institution:
        "American Academy of Pediatrics — Committee on Psychosocial Aspects of Child and Family Health ; texte reproduit par Youth Today (publications.aap.org bloquant les robots)",
      publication_date: "2013-03-20",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "children's well-being is affected much more by their relationships with their parents, their parents' sense of competence and security, and the presence of social and economic support for the family than by the gender or the sexual orientation of their parents",
      context_explanation:
        "Prise de position officielle de l'Académie américaine de pédiatrie, fondée sur « a review of extensive scientific literature » : elle soutient l'accès de tous les enfants aux droits du mariage civil pour leurs parents et à des parents adoptifs ou d'accueil « regardless of the parents' sexual orientation », et se déclare « opposed to any discrimination ». Le document indique une réaffirmation en septembre 2022 sur le site de l'AAP. En français : « le bien-être des enfants est bien plus affecté par leurs relations avec leurs parents [...] que par le genre ou l'orientation sexuelle de leurs parents ».",
      original_url:
        "http://youthtoday.org/wp-content/uploads/sites/13/hotdocs/Pediatrics-2013--peds.2013-03763.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Acad%C3%A9mie_am%C3%A9ricaine_de_p%C3%A9diatrie",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "bdcf7ba5-7ee4-4c6d-a673-43a7c424401f",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "De plus en plus d'enfants dans les couples de même sexe (Premiers résultats d'enquêtes n° 2-2026, enquête Erfi 2)",
      author_or_institution: "INED — Institut national d'études démographiques",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "17 % des hommes et 45 % des femmes vivant en couple cohabitant de même sexe (CMS) ont, au moins, un enfant ou bel-enfant, cohabitant avec le couple ou non (Tab. 1). Cela correspond à 111 000 parents en CMS et à 107 000 enfants.",
      context_explanation:
        "Données françaises de l'enquête Erfi 2 (2024), publiées par l'INED en 2026 (DOI 10.48756/ined-1res-2.26). Elles distinguent l'« homoparentalité simple » — l'enfant est né dans ou adopté par le couple et grandit avec ses deux parents de même sexe — de l'« homoparentalité recomposée ». Cette population a plus que triplé depuis 2011, portée par les couples de femmes ; les projets d'enfant y sont « nombreux » et soutenus par l'entourage. La question de la « trajectoire » des enfants ne se pose donc plus comme une hypothèse théorique, mais sur une population réelle et documentée.",
      original_url: "https://www.ined.fr/sites/default/files/inline-files/-ined-2602-fiche-15.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Institut_national_d%27%C3%A9tudes_d%C3%A9mographiques",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "12c3d019-bca6-4d39-9b77-fd1c59a79c30",
      spectrum: "CENTRE",
      source_name:
        "Décision n° 2013-669 DC du 17 mai 2013 — Loi ouvrant le mariage aux couples de personnes de même sexe",
      author_or_institution: "Conseil constitutionnel (France)",
      publication_date: "2013-05-17",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "en permettant l'adoption par deux personnes de même sexe ou au sein d'un couple de personnes de même sexe, le législateur, compétent pour fixer les règles relatives à l'état et à la capacité des personnes en application de l'article 34 de la Constitution, a estimé que l'identité de sexe des adoptants ne constituait pas, en elle-même, un obstacle à l'établissement d'un lien de filiation adoptive",
      context_explanation:
        "Saisi par les parlementaires opposés à la loi, le Conseil constitutionnel valide l'ensemble du dispositif : la filiation adoptive n'exige pas que « les liens de parenté [...] imitent ceux de la filiation biologique » et les couples de même sexe « seront soumis, comme ceux qui sont formés d'un homme et d'une femme, à une procédure destinée à constater leur capacité à accueillir un enfant ». Aucun principe constitutionnel — ni « filiation bilinéaire » ni « altérité sexuelle » — ne fait obstacle à l'adoption par deux parents de même sexe.",
      original_url: "https://www.conseil-constitutionnel.fr/decision/2013/2013669DC.htm",
      author_reference_url: "https://fr.wikipedia.org/wiki/Conseil_constitutionnel_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "9e22c6af-6343-49d6-ab23-d28ba5654d0f",
      spectrum: "CENTRE",
      source_name:
        "X et autres c. Autriche — arrêt de Grande Chambre du 19 février 2013 (texte français)",
      author_or_institution:
        "Cour européenne des droits de l'homme (texte français reproduit par Juricaf, association des cours suprêmes judiciaires francophones ; hudoc bloquant les robots)",
      publication_date: "2013-02-19",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "la Cour estime que le Gouvernement n'a pas fourni de raisons particulièrement solides et convaincantes propres à établir que l'exclusion des couples homosexuels du champ de l'adoption coparentale ouverte aux couples hétérosexuels non mariés était nécessaire à la préservation de la famille traditionnelle ou à la protection des intérêts de l'enfant. Partant, la distinction opérée par le droit autrichien est incompatible avec la Convention.",
      context_explanation:
        "La Cour relève notamment « l'incapacité du Gouvernement à établir qu'il serait préjudiciable pour un enfant d'être élevé par un couple homosexuel ou d'avoir légalement deux mères ou deux pères » (§ 146) : aucun argument ni « études scientifiques » ne démontrent un tel préjudice (§ 142). Violation de l'article 14 combiné à l'article 8 prononcée « par onze voix contre six » (§ par ces motifs). L'arrêt s'inscrit dans une jurisprudence constante : dès lors qu'un État ouvre l'adoption coparentale aux couples hétérosexuels non mariés, il ne peut la refuser aux couples homosexuels sans justification « particulièrement solide ».",
      original_url:
        "https://juricaf.org/arret/CONSEILDELEUROPE-COUREUROPEENNEDESDROITSDELHOMME-20130219-001116998",
      author_reference_url: "https://fr.wikipedia.org/wiki/Cour_europ%C3%A9enne_des_droits_de_l%27homme",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "3f09428a-0c47-47ae-9a3c-745daeb8dfad",
      spectrum: "GAUCHE",
      source_name:
        "Rapport n° 628 tome I (commission spéciale, projet de loi ouvrant le mariage aux couples de même sexe) — section IV « Les enjeux de la reconnaissance légale de l'homoparentalité »",
      author_or_institution:
        "Assemblée nationale — Erwann Binet, rapporteur (commission spéciale de la majorité de gauche), rapport enregistré le 17 janvier 2013",
      publication_date: "2013-01-17",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Sur aucun de ces points, il n'est apparu de différence significative entre les enfants étudiés et les groupes témoins. Aucune étude ne jette ainsi de suspicion sérieuse sur les familles homoparentales",
      context_explanation:
        "Le rapport, qui a organisé une table ronde de spécialistes, conclut au « faisceau de conclusions concordantes » de « plusieurs centaines » d'études : « les enfants issus des familles homoparentales sont des enfants comme les autres ; ils ne se portent ni mieux, ni moins bien que ceux élevés dans des familles hétérosexuelles. » Il note aussi les biais méthodologiques (petits échantillons, surreprésentation des couples de femmes) et l'audition du Pr Marie-Christine Mouren (hôpital Robert-Debré) : des résultats « rassurants, mais pondérés par le jeune âge des populations étudiées » — la fragilité venant de « l'hostilité ou l'incompréhension de leur environnement social ».",
      original_url: "https://www.assemblee-nationale.fr/14/rapports/r0628-tI.asp",
      author_reference_url: "https://fr.wikipedia.org/wiki/Assembl%C3%A9e_nationale_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
  ],
};

export const THEORIE_DU_GENRE_ECOLE_DOSSIER: Dossier = {
  id: "9b8ed5b4-c813-4673-a368-7597e536b9fd",
  slug: "theorie-du-genre-ecole-education-nationale",
  claim_title:
    "L'Éducation nationale enseigne une « théorie du genre » pour endoctriner les élèves",
  verdict: "FAUX",
  category: "SOCIETE",
  protagonists: [
    {
      name: "Ministère de l'Éducation nationale (France)",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_l%27%C3%89ducation_nationale_(France)",
      note: "Éduscol, programmes scolaires et programme EVARS (arrêté du 3 février 2025).",
    },
    {
      name: "Conseil d'État (France)",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)",
      note: "Contentieux : rejet des recours contre le programme EVARS (27 juin 2025).",
    },
    {
      name: "Inspection générale de l'éducation, du sport et de la recherche",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url:
        "https://fr.wikipedia.org/wiki/Inspection_g%C3%A9n%C3%A9rale_de_l%27%C3%A9ducation,_du_sport_et_de_la_recherche",
      note: "Rapport n° 2021-149 sur la mise en œuvre de l'éducation à la sexualité.",
    },
    {
      name: "Conseil économique, social et environnemental",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Conseil_%C3%A9conomique,_social_et_environnemental",
      note: "Avis du 10 septembre 2024 sur l'éducation à la vie affective, relationnelle et sexuelle.",
    },
    {
      name: "Sénat (France)",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      note: "Rapport d'information n° 814 (2024-2025) sur le financement de la lutte contre les violences faites aux femmes.",
    },
  ],
  verdict_summary:
    "La « théorie du genre » n'existe dans aucun texte réglementaire. Les textes officiels encadrent trois objets précis : l'égalité filles-garçons — « l'éducation contre les représentations stéréotypées », la mixité des parcours et « la prévention et la lutte contre les violences sexistes et sexuelles » (éduscol) —, une information sur la vie affective et relationnelle, et une éducation à la sexualité dont l'arrêté du 3 février 2025 a fixé le programme (EVARS, applicable depuis la rentrée 2025-2026). Le Conseil d'État, saisi par des associations opposées au texte, a jugé le 27 juin 2025 que ce programme « repose sur des notions résultant de l'état de la science ou de l'état du droit, qui doivent être enseignées de manière neutre et objective, sans inciter les élèves à adopter un comportement donné », et a rejeté les recours. Les programmes de SVT restent, eux, strictement biologiques : le programme du cycle 4 enseigne « l'explication des mécanismes de la reproduction, du fonctionnement des organes aux phénomènes régulateurs, de l'échelle de l'organisme à l'échelle moléculaire ». Quant aux institutions de tous bords (IGÉSR, CESE, Sénat), elles ne discutent pas l'existence d'une idéologie à l'école : elles regrettent que l'éducation à l'égalité soit trop peu mise en œuvre — un quart des établissements n'ayant jamais organisé les séances prévues par la loi de 2001.",
  consensus_score: 100,
  premises: [
    {
      claim_part: "« L'école apprend aux enfants que le sexe biologique n'existe pas »",
      status: "FAUX",
      detail:
        "Le programme de sciences de la vie et de la Terre du cycle 4 (BO n° 31 du 30 juillet 2020) enseigne « l'explication des mécanismes de la reproduction [...] du fonctionnement des organes aux phénomènes régulateurs, de l'échelle de l'organisme à l'échelle moléculaire » et la « reproduction sexuée et asexuée des êtres vivants ». Le programme EVARS lui-même est structuré, selon le Conseil d'État, en trois champs dont un « champ biologique ». Aucun texte officiel ne présente le sexe biologique comme inexistant.",
    },
    {
      claim_part: "« Les modules égalité visent à nier les identités sexuées dès la maternelle »",
      status: "FAUX",
      detail:
        "L'objectif réglementaire est explicite : « l'éducation contre les représentations stéréotypées », la mixité des filières et la prévention des violences sexistes et sexuelles (éduscol, référents égalité dans chaque collège et lycée, label Égalité filles-garçons). Le rapport de l'IGÉSR n° 2021-149 (juillet 2021) évalue une politique publique de mise en œuvre, pas une doctrine : il « note les efforts de cadrage effectués » et formule trente-cinq recommandations pratiques. Le CESE (avis du 10 septembre 2024, 119 voix pour) et le rapport sénatorial n° 814 (juillet 2025) traitent le sujet comme une obligation légale de prévention insuffisamment appliquée — constat confirmé par le juge administratif.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "1ea4711a-dbf9-4181-88d1-615e8f6f113b",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Égalité filles-garçons et prévention des violences sexistes et sexuelles (page de cadrage Éduscol)",
      author_or_institution:
        "Ministère de l'Éducation nationale — Éduscol (page servie par l'instantané Wayback, le site répondant 403 aux robots)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Enjeu démocratique majeur, l'égalité entre les filles et les garçons à l'École se fonde sur l'éducation contre les représentations stéréotypées, l'accompagnement de parcours de réussite pour les filles et les garçons et de choix d'orientation favorisant la mixité, et enfin la prévention et la lutte contre les violences sexistes et sexuelles.",
      context_explanation:
        "Page officielle de référence du ministère : chaque collège et lycée dispose depuis 2018 de « référentes et référents égalité filles-garçons », un label « Égalité filles-garçons » valorise les établissements engagés, et la page rappelle le cadre légal (articles L. 121-1 et L. 312-17-1 du code de l'éducation : « favoriser la mixité et l'égalité entre les hommes et les femmes [...] la prévention des préjugés sexistes et des violences faites aux femmes »). Aucune mention d'une « théorie du genre » ni d'un enseignement visant à nier le sexe biologique : l'objet est la lutte contre les stéréotypes et les violences.",
      original_url:
        "http://web.archive.org/web/20260905124710/https://eduscol.education.gouv.fr/6141/egalite-filles-garcons-et-prevention-des-violences-sexistes-et-sexuelles",
      author_reference_url: "https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_l%27%C3%89ducation_nationale_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "773b79f1-3299-477e-9e0d-97b1e332ade3",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Arrêté du 3 février 2025 fixant le programme d'éducation à la sexualité — éduquer à la vie affective et relationnelle, et à la sexualité (BO n° 6 du 6 février 2025)",
      author_or_institution:
        "Ministère de l'Éducation nationale (page du Bulletin officiel servie par l'instantané Wayback, le site répondant 403 aux robots)",
      publication_date: "2025-02-03",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Le programme d'éducation à la sexualité – éduquer à la vie affective et relationnelle à l'école maternelle et à l'école élémentaire, éduquer à la vie affective et relationnelle, et à la sexualité au collège et au lycée – est fixé conformément à l'annexe du présent arrêté.",
      context_explanation:
        "Texte réglementaire intégral du programme dit EVARS, applicable « à la rentrée de l'année scolaire 2025-2026 » dans tous les établissements. Son annexe s'intitule « Un programme ambitieux : éduquer à la vie affective et relationnelle, et à la sexualité ». Selon le Conseil d'État, le programme comporte trois axes — « se connaître, vivre et grandir avec son corps » ; « rencontrer les autres et construire des relations, s'y épanouir » ; « trouver sa place dans la société, être libre et responsable » — « déclinés dans le champ biologique, le champ psycho-émotionnel et les champs juridique et social ». C'est cet objet — éducation, non endoctrinement — que les recours ont attaqué, et que le juge a validé.",
      original_url:
        "http://web.archive.org/web/20261008131533/https://www.education.gouv.fr/bo/2025/Hebdo6/MENE2503064A",
      author_reference_url: "https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_l%27%C3%89ducation_nationale_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "26a4a676-c64d-4429-900d-048ccd43bc16",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Programme du cycle 4 — sciences de la vie et de la Terre, partie « Le corps humain et la santé » (annexe 3 du BO n° 31 du 30 juillet 2020)",
      author_or_institution:
        "Ministère de l'Éducation nationale — programme d'enseignement du cycle des approfondissements (PDF servi par l'instantané Wayback)",
      publication_date: "2020-07-30",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "L'explication des mécanismes de la reproduction se construit au cours du cycle 4, du fonctionnement des organes aux phénomènes régulateurs, de l'échelle de l'organisme à l'échelle moléculaire. On veille à ce que les techniques de maîtrise de la procréation s'intègrent en cohérence avec les connaissances acquises.",
      context_explanation:
        "Le programme officiel de SVT fixe les attendus : « Expliquer quelques processus biologiques impliqués dans le fonctionnement de l'organisme humain, jusqu'au niveau moléculaire : activités musculaire, nerveuse, cardio-vasculaire et respiratoire, activité cérébrale, alimentation et digestion, relations avec le monde microbien, reproduction et sexualité. » S'y ajoutent « la reproduction sexuée et asexuée des êtres vivants », la « rencontre des gamètes » et la puberté. L'enseignement de la biologie de la reproduction (organes, gamètes, hormones, maîtrise de la procréation) n'a donc pas été remplacé : il reste le socle du programme de sciences.",
      original_url:
        "http://web.archive.org/web/20260611061152if_/https://cache.media.education.gouv.fr/file/31/89/1/ensel714_annexe3_1312891.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_l%27%C3%89ducation_nationale_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "9acacebf-43ac-4c6a-8fd6-bca2a74d10db",
      spectrum: "CENTRE",
      source_name:
        "Le programme scolaire d'éducation à la vie affective et relationnelle et à la sexualité est conforme à la loi (communiqué, décisions du 27 juin 2025)",
      author_or_institution: "Conseil d'État (France) — section du contentieux",
      publication_date: "2025-06-27",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Le Conseil d'État relève également que ce programme est décliné pour chaque niveau scolaire et qu'il repose sur des notions résultant de l'état de la science ou de l'état du droit, qui doivent être enseignées de manière neutre et objective, sans inciter les élèves à adopter un comportement donné.",
      context_explanation:
        "Saisi par des associations et des particuliers — dont le Syndicat de la famille et Juristes pour l'enfance, qui dénonçaient la diffusion d'une « idéologie du genre » —, le Conseil d'État rejette l'ensemble des recours contre l'arrêté du 3 février 2025 et la circulaire du 4 février 2025. Il relève aussi que les interventions d'associations ont lieu « en présence d'un personnel de l'éducation nationale », que les parents sont informés des objectifs et que « les élèves ne seront pas évalués sur ces enseignements ». La plus haute juridiction administrative valide donc le texte au fond : neutralité, objectivité, absence de tout dressage idéologique.",
      original_url:
        "https://www.conseil-etat.fr/content/download/229720/document/Communiqu%C3%A9+de+presse+-+programme+EVARS+-+web.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "bf6dea52-1b1e-4e9c-aaef-b6df0f890663",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name: "Éducation à la sexualité en milieu scolaire — rapport n° 2021-149 (juillet 2021)",
      author_or_institution:
        "IGÉSR — Inspection générale de l'éducation, du sport et de la recherche (page servie par l'instantané Wayback, le site répondant 403 aux robots)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "La mission note les efforts de cadrage effectués, le souci de mieux former les personnels de l'éducation nationale, et l'accompagnement important des académies et des établissements scolaires.",
      context_explanation:
        "Rapport d'évaluation de l'inspection générale (juillet 2021) sur la mise en œuvre de l'éducation à la sexualité : la mission relève des difficultés « liées certes aux difficultés concrètes, mais surtout peut-être aux interrogations sur le sens même de l'éducation à la sexualité », dégage des « idées-forces » et propose trente-cinq recommandations articulées autour de huit domaines. Son diagnostic porte sur l'effectivité (moins de 15 % des élèves bénéficient des trois séances annuelles prévues par la loi) — jamais sur la diffusion d'une idéologie : c'est une politique publique d'éducation à évaluer, pas une doctrine à combattre.",
      original_url:
        "http://web.archive.org/web/20261008183242/https://www.education.gouv.fr/igesr/education-la-sexualite-en-milieu-scolaire-465339",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Inspection_g%C3%A9n%C3%A9rale_de_l%27%C3%A9ducation,_du_sport_et_de_la_recherche",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "796fa45a-b249-4e83-8dff-efecea2ac248",
      spectrum: "CENTRE",
      source_name:
        "Le CESE lance l'alerte sur l'importance de rendre réellement effectif le droit à l'éducation à la vie affective, relationnelle et sexuelle des jeunes (avis du 10 septembre 2024)",
      author_or_institution: "Conseil économique, social et environnemental (CESE)",
      publication_date: "2024-09-10",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Malgré une loi de 2001 imposant trois séances annuelles d'éducation sexuelle tout au long de la scolarité, on estime que moins de 15 % des élèves en bénéficient, et 25 % des établissements scolaires n'ont jamais mis en place ces cours.",
      context_explanation:
        "Avis adopté en séance plénière par 119 voix pour, rapporté par Cécile Gondard-Lalann, qui « lance l'alerte sur l'importance du droit à l'éducation à la vie affective, relationnelle et sexuelle face à un manquement criant du respect de cette obligation ». Le CESE formule une vingtaine de préconisations pour une stratégie nationale. La troisième assemblée de la République traite donc le sujet comme un droit des enfants insuffisamment appliqué — et recommande d'aller plus loin, à rebours de la thèse d'un endoctrinement voulu par l'État.",
      original_url:
        "https://www.lecese.fr/presse/communiques/le-cese-lance-lalerte-sur-limportance-de-rendre-reellement-effectif-le-droit-leducation-la-vie-affective",
      author_reference_url: "https://fr.wikipedia.org/wiki/Conseil_%C3%A9conomique,_social_et_environnemental",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "7a751f58-a86f-4cfd-ac45-ee0d9c708e95",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "Évolution du financement de la lutte contre les violences faites aux femmes — rapport d'information n° 814 (2024-2025), synthèse",
      author_or_institution:
        "Sénat — rapporteurs spéciaux de la mission « Solidarité, insertion et égalité des chances » (rapport déposé le 2 juillet 2025)",
      publication_date: "2025-07-02",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Il en va de même pour les actions de prévention : la mise en œuvre des actions en faveur de la culture de l'égalité dans l'Éducation nationale laisse à désirer selon la Cour des comptes, et l'impact des politiques d'égalité professionnelle n'est guère évalué.",
      context_explanation:
        "Le rapport sénatorial (juillet 2025) comporte une partie « La prévention : éduquer, former, émanciper » et une sous-section sur « l'éducation et les formations visant à promouvoir la culture de l'égalité ». La critique du Sénat — chambre à majorité de droite — ne porte pas sur l'existence supposée d'une idéologie scolaire : elle constate que l'éducation à l'égalité est mal mise en œuvre et propose de développer la prévention. Les recommandations visent le financement et l'organisation de cette politique publique, pas son contenu doctrinal.",
      original_url: "https://www.senat.fr/rap/r24-814/r24-814-syn.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
    {
      id: "ad7351c6-a305-40d3-af7e-137842c076af",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Conseil d'État, décision n° 508643 du 8 octobre 2026 (CNAFC) — pas de droit d'accord préalable des parents sur les séances",
      author_or_institution:
        "Conseil d'État — Confédération nationale des associations familiales catholiques (CNAFC)",
      publication_date: "2026-10-08",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "ni les dispositions citées au point 8, ni aucune autre n'ont pour portée d'imposer que les parents d'élèves soient informés à l'avance sur les séances d'éducation à la sexualité ni qu'ils participent à la définition des modalités de mise en œuvre de ces séances ou donnent leur accord sur ces modalités ni qu'ils soient associés au choix des intervenants extérieurs",
      context_explanation:
        "Deuxième vague de contentieux, seize mois après le rejet du 27 juin 2025 : la CNAFC demandait des mesures complémentaires pour garantir le rôle des parents. Le Conseil d'État rejette : le programme « n'a ni pour objet ni pour effet de porter atteinte à l'exercice de l'autorité parentale ou à l'action éducative des familles », et la circulaire du 4 février 2025 prévoit l'information des familles et un dialogue ouvert dans chaque établissement. La jurisprudence confirme que l'enseignement est obligatoire et que le cadre du programme est stable.",
      original_url:
        "https://www.conseil-etat.fr/fr/arianeweb/CE/decision/2026-10-08/508643",
      author_reference_url: "https://fr.wikipedia.org/wiki/Conseil_d%27%C3%89tat_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 7,
    },
    {
      id: "2f177ddc-92c0-4fbe-b280-453f48a2bb55",
      spectrum: "GAUCHE",
      source_name:
        "« Education sexuelle à l'école : la notion de transphobie disparaît du programme officiel » — Libération",
      author_or_institution: "Cécile Bourgneuf, Libération",
      publication_date: "2025-02-06",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Si le programme d'éducation à la vie affective, relationnelle et sexuelle (Evars), publié au Bulletin officiel ce jeudi 6 février, est une réelle avancée malgré les oppositions réactionnaires, la disparition de la notion de « transphobie » pose question.",
      context_explanation:
        "Le décryptage documente le processus réel d'élaboration du programme — « voté à l'unanimité le 29 janvier au Conseil supérieur de l'éducation (CSE) et accepté par le cabinet de la ministre de l'Education Elisabeth Borne » — après de longs mois de débats publics et une polémique à laquelle le texte final a répondu. La gauche y exprime aussi ses propres critiques, signe d'un débat nourri, à mille lieues d'un dogme imposé sans contradiction.",
      original_url:
        "https://www.liberation.fr/societe/education/education-sexuelle-a-lecole-la-notion-de-transphobie-disparait-du-programme-officiel-20250206_AY2YRFKXYJCBHAYYXWXCDK5FRA/",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 8,
    },
    {
      id: "d3a5f978-1344-479b-afc5-c87a273ebf9d",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "« Ce que contient le très contesté programme d'éducation à la vie affective et sexuelle, publié ce jeudi » — Le Figaro",
      author_or_institution: "Le Figaro (avec AFP)",
      publication_date: "2025-01-23",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "En maternelle, il prévoit la prise en considération du corps, des sentiments, des émotions, du respect de l'intimité et de l'égalité entre filles et garçons.",
      context_explanation:
        "Même un quotidien classé à droite, qui parle d'un programme « très contesté », décrit un contenu de maternelle centré sur le corps, les émotions, l'intimité et l'égalité — sans négation des identités sexuées. Le Figaro détaille le reste du programme : changements du corps, violences, stéréotypes et numérique à l'élémentaire ; adolescence et appréhension de la sexualité au collège ; connaissances plus complètes et questionnement au lycée.",
      original_url:
        "https://www.lefigaro.fr/actualite-france/ce-que-contient-le-tres-conteste-programme-d-education-a-la-vie-affective-et-sexuelle-20250123",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 9,
    },
  ],
};

export const AICHA_ANACHRONISME_DOSSIER: Dossier = {
  id: "5c139b2a-e7a7-4992-89ce-7f82253d8cc3",
  slug: "union-prophete-aicha-anachronisme-pedophilie",
  claim_title:
    "L'union du prophète de l'islam avec Aïcha constitue un acte de pédophilie",
  verdict: "ANACHRONISME_HISTORIQUE",
  category: "RELIGION",
  protagonists: [
    {
      name: "Mahomet",
      kind: "PERSONNE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Mahomet",
      note: null,
    },
    {
      name: "Aïcha",
      kind: "PERSONNE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/A%C3%AFcha",
      note: "La tradition sunnite lui attribue le récit de son âge au mariage ; la chaîne de transmission passe par Hišām b. ʿUrwa.",
    },
    {
      name: "Richard von Krafft-Ebing",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Richard_von_Krafft-Ebing",
      note: "Psychiatre viennois ; le terme « paedophilia erotica » entre dans une édition tardive de sa Psychopathia Sexualis.",
    },
    {
      name: "Joshua J. Little",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: null,
      note: "Historien, auteur d'une thèse de doctorat (Oxford, 2022) sur l'évolution du hadith de l'âge d'Aïcha.",
    },
    {
      name: "Jacqueline Chabbi",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Jacqueline_Chabbi",
      note: "Professeure honoraire, spécialiste de l'islam classique, interrogée par Le Monde sur les sources de la biographie de Mahomet.",
    },
  ],
  verdict_summary:
    "Qualifier de « pédophilie » l'union du prophète de l'islam avec ʿĀʾiša applique à l'Arabie du VIIe siècle une catégorie nosologique forgée à la fin du XIXe siècle : le terme « paedophilia erotica » n'apparaît dans la Psychopathia Sexualis de Richard von Krafft-Ebing que dans une édition tardive, avec la nomenclature psychiatrique des préférences d'âge qui se met alors en place. Dans l'Antiquité et au Moyen Âge, les alliances nouées autour de la puberté constituaient la règle juridique et sociale — le droit romain fixait l'âge légal du mariage des filles à douze ans — et l'Europe médiévale pratiquait les mêmes mariages précoces d'alliance. Quant au récit des « neuf ans », la critique historico-critique des chaînes de transmission (thèse de Joshua J. Little, Oxford, 2022) établit que toutes les versions du hadith remontent à un archétype unique, diffusé par le transmetteur médinois Hišām b. ʿUrwa après son départ pour l'Irak à la fin de sa vie, probablement en réponse à des polémiques proto-chiites contre sa grand-tante : une mémoire de la fin du VIIIe siècle, non une donnée biographique contemporaine des faits. Le dossier démontre un vice de méthode — l'usage rétroactif d'un concept clinique moderne adossé à une tradition textuelle tardive ; il ne prétend pas trancher l'âge exact de ʿĀʾiša.",
  consensus_score: 100,
  premises: [
    {
      claim_part: "« La notion clinique de pédophilie s'applique aux sociétés du VIIe siècle »",
      status: "CONFUSION_CONCEPTUELLE",
      detail:
        "La « pédophilie » n'est pas une catégorie transhistorique : elle naît de la psychiatrie et de la sexologie du XIXe siècle, quand la médecine légale classe les préférences d'âge comme perversion (D. F. Janssen, Medical History, 2015). Le terme « paedophilia erotica » est introduit par Richard von Krafft-Ebing dans une édition tardive de sa Psychopathia Sexualis, à la fin du XIXe siècle. Appliquer telle quelle cette nosographie à une union du VIIe siècle confond une classification clinique moderne avec des coutumes matrimoniales prémodernes.",
    },
    {
      claim_part: "« Le récit des 9 ans est une archive biométrique incontestable »",
      status: "FAUX",
      detail:
        "Les recueils de hadiths ont été compilés au IXe siècle, deux siècles après les faits. La version la plus connue (Sahih al-Bukhari, n° 5133) porte elle-même la chaîne de transmission — Hišām, d'après son père, d'après ʿĀʾiša — que l'analyse historico-critique (J. J. Little, Oxford, 2022) identifie comme l'archétype unique dont dérivent toutes les variantes, diffusé en Irak à la fin du VIIIe siècle. Rien là d'un enregistrement contemporain : c'est une reconstruction tardive, et l'âge de neuf ans ne peut donc pas être tenu pour un fait établi.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "5f7c7279-75b8-48e1-a381-909558e5885d",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Sahih al-Bukhari, hadith n° 5133 — « Giving one's young children in marriage » (Livre 67, hadith 69 ; Vol. 7, Livre 62, hadith 64)",
      author_or_institution:
        "Muhammad al-Bukhari (IXe siècle) — texte arabe et traduction anglaise servis par sunnah.com (instantané Wayback)",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Narrated `Aisha: that the Prophet (ﷺ) married her when she was six years old and he consummated his marriage when she was nine years old, and then she remained with him for nine years (i.e., till his death).",
      context_explanation:
        "Le recueil de référence de la tradition sunnite porte lui-même la chaîne de transmission (isnād) du récit : « d'après Hišām, d'après son père, d'après ʿĀʾiša » — le transmetteur médinois Hišām b. ʿUrwa rapportant de son père ʿUrwa b. al-Zubayr. Le texte a été fixé des décennies après la mort du prophète (632) : Sahih al-Bukhari est compilé au IXe siècle. Rien dans ce document n'est un enregistrement contemporain des faits ; il constitue le point de départ d'un récit transmis oralement pendant deux siècles.",
      original_url:
        "https://web.archive.org/web/20240102181707/https://sunnah.com/bukhari:5133",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "59a7a449-57cc-40b7-8c54-1d2a7584bf53",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "The Hadith of ʿĀʾišah's Marital Age: A Study in the Evolution of Early Islamic Historical Memory — thèse de doctorat (DPhil)",
      author_or_institution:
        "Joshua J. Little, Pembroke College, université d'Oxford (sous la direction de Christopher Melchert), 2022",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "This ur-hadith appears to have been created and disseminated by the Madinan tradent Hišām b. ʿUrwah b. al-Zubayr (d. 146-147/763-765) after he moved to Iraq towards the end of his life, probably as a reaction to local proto-Šīʿī polemics against his great-aunt, ʿĀʾišah.",
      context_explanation:
        "Résumé de la thèse, déposée dans l'Oxford University Research Archive. Après avoir collationné toutes les versions connues du hadith et reconstitué leurs « urtextes » par une analyse des chaînes et des textes, l'auteur conclut que toutes dérivent d'un archétype unique, diffusé par Hišām b. ʿUrwa après son installation en Irak vers la fin de sa vie — une mémoire de la seconde moitié du VIIIe siècle, non un témoignage contemporain des faits.",
      original_url: "https://ora.ox.ac.uk/objects/uuid:1bdb0eea-3610-498b-9dfd-cffdb54b8b9b",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "6ab3c587-8084-409f-b633-346d6c785664",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "« 'Chronophilia': Entries of Erotic Age Preference into Descriptive Psychopathology » — Medical History (Cambridge University Press)",
      author_or_institution: "Diederik F. Janssen — Medical History, vol. 59 (2015)",
      publication_date: "2015-09-09",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "A scientific nomenclature of erotic age preferences informed the mid- through late nineteenth century joint appearance of homosexuality and sexual abuse of minors on the medico-legal scene.",
      context_explanation:
        "Article d'histoire de la médecine : la nomenclature savante des préférences d'âge érotique est un produit du milieu et de la fin du XIXe siècle, élaborée en même temps que le classement psychiatrique de l'homosexualité et des abus sexuels. Le terme « paedophilia erotica » est introduit par Richard von Krafft-Ebing dans une édition tardive de sa Psychopathia Sexualis, à la fin du XIXe siècle : la « pédophilie » clinique n'existe pas comme catégorie à l'époque du VIIe siècle.",
      original_url:
        "https://www.cambridge.org/core/journals/medical-history/article/chronophilia-entries-of-erotic-age-preference-into-descriptive-psychopathology/1896C08F07CB5F1A428CEEF3E1104586",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "6814e7c2-e4f1-4e1d-a644-e54948a18f18",
      spectrum: "GAUCHE",
      source_name: "« The truth about Muhammad and Aisha »",
      author_or_institution:
        "Myriam Francois-Cerrah — The Guardian (quotidien britannique de centre gauche)",
      publication_date: "2012-09-17",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "They point out that, in seventh-century Arabia, adulthood was defined as the onset of puberty. (This much is true, and was also the case in Europe: five centuries after Muhammad's marriage to Aisha, 33-year-old King John of England married 12-year-old Isabella of Angoulême.)",
      context_explanation:
        "Chronique publiée lors de la polémique du film Innocence of Muslims, qui dépeignait le prophète de l'islam en pédophile. Le texte rappelle que, dans l'Arabie du VIIe siècle, l'entrée dans l'âge adulte était définie par la puberté — et que l'Europe médiévale nouait les mêmes alliances précoces, comme le mariage du roi Jean d'Angleterre (33 ans) avec Isabelle d'Angoulême (12 ans). L'accusation de « pédophilie » circule dans un contexte polémique, non dans une littérature historique.",
      original_url:
        "https://www.theguardian.com/commentisfree/belief/2012/sep/17/muhammad-aisha-truth",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "38177e0c-3695-4688-90a3-345713653fab",
      spectrum: "CENTRE",
      source_name:
        "« A la recherche du Mahomet de l'histoire » (entretien avec Jacqueline Chabbi)",
      author_or_institution:
        "Propos recueillis par Virginie Larousse — Le Monde (Le Monde des religions), instantané Wayback",
      publication_date: "2020-06-07",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Les sources concernant Mahomet ont été écrites des décennies après sa mort, et peuvent donc donner une image biaisée du prophète de l'islam.",
      context_explanation:
        "Entretien avec Jacqueline Chabbi, professeure honoraire, spécialiste de l'islam classique, qui replace Mahomet dans son contexte tribal. Le chapeau de l'article pose le principe méthodologique du dossier : les sources biographiques sont postérieures de plusieurs décennies aux faits et donnent une image biaisée du prophète.",
      original_url:
        "https://web.archive.org/web/20221025224552/https://www.lemonde.fr/le-monde-des-religions/article/2020/06/07/a-la-recherche-du-mahomet-de-l-histoire_6042044_6038514.html",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "3ffff39f-ac61-4319-b97b-3c954a45181f",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "« Yémen : les ultras s'opposent à l'augmentation de l'âge du mariage »",
      author_or_institution: "Delphine Minoui — Le Figaro (blog Iran)",
      publication_date: "2010-03-21",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Mais pour les ultras - qui rappellent que le prophète épousa Aïcha lorsqu'elle avait neuf ans - on ne badine pas avec l'âge des noces.",
      context_explanation:
        "Reportage du Figaro, quotidien classé à droite, sur le débat yéménite relatif à l'âge du mariage. Le journal constate que les milieux les plus conservateurs invoquent le récit des neuf ans pour s'opposer à une loi fixant un âge minimum. Le récit apparaît ici pour ce qu'il est dans le débat public contemporain : un argument d'autorité mobilisé contre une protection des mineures, non une donnée biographique neutre.",
      original_url:
        "https://www.lefigaro.fr/blogs/iran/2010/03/yemen-les-ultras-sopposent-a-l.html",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
  ],
};

export const ISLAM_HOMOPHOBIE_TRANS_DOSSIER: Dossier = {
  id: "0be0aa6c-3c4e-4724-b4cc-36ab16252fa8",
  slug: "islam-homosexualite-transidentite-droit-compare",
  claim_title:
    "L'islam est par essence la seule religion scripturairement homophobe et transphobe",
  verdict: "GENERALISATION_ABUSIVE",
  category: "RELIGION",
  protagonists: [
    {
      name: "Afsaneh Najmabadi",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Afsaneh_Najmabadi",
      note: "Historienne, professeure à l'université Harvard, autrice de Professing Selves (Duke University Press, 2013).",
    },
    {
      name: "Rouhollah Khomeini",
      kind: "PERSONNE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Rouhollah_Khomeini",
      note: "Une fatwa qui lui est attribuée sur le changement de sexe des personnes intersexes fonde la politique iranienne d'autorisation des chirurgies.",
    },
    {
      name: "Mohamed Sayed Tantawi",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: null,
      note: "Mufti de la République arabe d'Égypte (1986-1996) ; sa fatwa de 1988 limite la chirurgie aux personnes intersexes.",
    },
    {
      name: "Lévitique",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/L%C3%A9vitique",
      note: "Livre de la Torah hébraïque qui range l'acte entre hommes parmi les « abominations » (18,22 ; 20,13).",
    },
    {
      name: "Coran",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Coran",
      note: "Le récit de Loth (7,80-84 ; 26,165-166) y condamne l'acte des hommes de son peuple comme une « turpitude ».",
    },
  ],
  verdict_summary:
    "La réprobation scripturaire des rapports entre personnes de même sexe n'est pas propre à l'islam : elle est partagée par les corpus abrahamiques. Le Lévitique (18,22) qualifie l'acte d'« abomination », l'Épître aux Romains (1,26-27) parle de « passions infâmes » et de ce qui est « contre nature », et le Coran fait de l'acte du peuple de Loth une « turpitude » sans précédent (7,80-84 ; 26,165-166). Sur la transition de genre, le droit islamique classique ne la confond pas avec l'orientation sexuelle : il distingue le mukhannath (l'homme efféminé) et le khuntha (la personne au sexe ambigu), ce dernier traité jusque dans les règles d'héritage. L'Iran autorise et subventionne partiellement les chirurgies de réassignation depuis le milieu des années 1980, sur le fondement d'une position attribuée à Khomeini ; en Égypte, la fatwa du mufti Sayed Tantawi (1988) n'ouvre la chirurgie qu'aux personnes intersexes et interdit explicitement le changement de sexe motivé par une identité de genre. L'affirmation selon laquelle l'islam serait « par essence la seule religion scripturairement homophobe et transphobe » est donc une généralisation abusive : elle ignore les interdits bibliques, confond le texte sacré, l'histoire du droit et les politiques étatiques répressives, et passe sous silence les autorisations médicales de transition délivrées dans plusieurs pays musulmans.",
  consensus_score: 95,
  premises: [
    {
      claim_part: "« Le rejet scripturaire de l'homosexualité est propre à l'islam »",
      status: "FAUX",
      detail:
        "L'interdit textuel est partagé : « Tu ne coucheras point avec un homme comme on couche avec une femme. C'est une abomination » (Lévitique 18,22) ; « leurs femmes ont changé l'usage naturel en celui qui est contre nature » (Épître aux Romains 1,26-27) ; le Coran reprend le motif de Loth (7,80-84 ; 26,165-166). La condamnation religieuse des actes entre hommes est une constante monothéiste classique, non une spécificité musulmane.",
    },
    {
      claim_part: "« La tradition islamique interdit formellement toute transition de genre »",
      status: "FAUX",
      detail:
        "Le droit islamique classique distingue le mukhannath et le khuntha, ce dernier traité dans les traités juridiques (Saqer Almarri, Arcade, Stanford), et l'Iran autorise et subventionne partiellement la chirurgie de réassignation depuis le milieu des années 1980 (A. Najmabadi). La restriction est réelle mais autre : la fatwa égyptienne de 1988 n'ouvre la chirurgie qu'aux personnes intersexes et interdit la transition motivée par une identité de genre — un encadrement, non un interdit général de principe.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "80ced67f-e7b4-450d-b06d-7d6bc17693a0",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Bible — Lévitique 18,22 (traduction Louis Segond)",
      author_or_institution:
        "Ancien Testament, Lévitique — traduction Louis Segond (domaine public), servie par BibleGateway",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Tu ne coucheras point avec un homme comme on couche avec une femme. C'est une abomination.",
      context_explanation:
        "Le code de sainteté du Lévitique range l'acte entre hommes parmi les « abominations » et, au verset 20,13, le punit de mort. L'interdit scripturaire des relations entre personnes de même sexe n'est donc pas propre au Coran : il figure d'abord dans la Torah hébraïque.",
      original_url:
        "https://www.biblegateway.com/passage/?search=L%C3%A9vitique%2018%3A22&version=LSG",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "6b210b00-2dfc-40eb-a6c0-5335095090e9",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name: "Bible — Épître aux Romains 1,26-27 (traduction Louis Segond)",
      author_or_institution:
        "Nouveau Testament, Épître aux Romains (apôtre Paul) — traduction Louis Segond (domaine public), servie par BibleGateway",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "C'est pourquoi Dieu les a livrés à des passions infâmes: car leurs femmes ont changé l'usage naturel en celui qui est contre nature; et de même les hommes, abandonnant l'usage naturel de la femme, se sont enflammés dans leurs désirs les uns pour les autres, commettant homme avec homme des choses infâmes, et recevant en eux-mêmes le salaire que méritait leur égarement.",
      context_explanation:
        "Le Nouveau Testament reprend l'interdit : les rapports entre personnes de même sexe y sont dits « contre nature » et qualifiés de « passions infâmes ». La réprobation morale n'est donc pas l'apanage d'un seul monothéisme ; elle traverse l'Ancien et le Nouveau Testament comme le Coran.",
      original_url:
        "https://www.biblegateway.com/passage/?search=Romains%201%3A26-27&version=LSG",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "fd0731e2-9e70-4cdc-87e3-1ad7ec0813a5",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Coran — sourate 7 (Al-A'raf), versets 80-84, et sourate 26 (Ach-Chu'ara'), versets 165-166 (traduction Muhammad Hamidullah)",
      author_or_institution:
        "Le Coran — traduction française de Muhammad Hamidullah, servie par Quran.com",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Et Lot, quand il dit à son peuple : \"Vous livrez vous à cette turpitude que nul, parmi les mondes, n'a commise avant vous ?\"",
      context_explanation:
        "Le Coran condamne l'acte du peuple de Loth comme une « turpitude » ; la sourate 26 (v. 165) interpelle les hommes : « Accomplissez-vous l'acte charnel avec les mâles de ce monde ? ». La réprobation est celle d'un texte sacré, comme dans les corpus bibliques : c'est une constante monothéiste, non un trait inventé par l'islam.",
      original_url: "https://quran.com/fr/7/80-84",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "49415e80-95b8-4d9d-b8f0-e6da9f7ad821",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Fatwa de Mohamed Sayed Al Tantawi sur la chirurgie de réassignation (8 juin 1988) — base Cairo 52 (MENA Trans Archives)",
      author_or_institution:
        "Mohamed Sayed Al Tantawi, mufti de la République arabe d'Égypte — base Cairo 52 Legal Research Institute",
      publication_date: "1988-06-08",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Surgeries are permitted for those with ambiguous sex (intersex) and its an obligation in this case, once confirmed by a trusted doctor. It is forbidden for just a desire to change sex from female to male or from male to female (gender identity disorder- transgender).",
      context_explanation:
        "Cette fatwa, souvent citée comme une « autorisation » islamique de la transition, dit l'inverse d'une permission générale : elle ouvre la chirurgie aux personnes intersexes et interdit explicitement le changement motivé par une identité de genre. Elle illustre la distinction que le droit islamique opère entre intersexuation et identité : un encadrement, non une reconnaissance.",
      original_url:
        "https://cairo52.com/map-posts/shiekh-mohamed-sayed-al-tantawi-egypt/",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "ead81ded-9d43-46bc-bba2-d921cea1d85f",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Professing Selves: Transsexuality and Same-Sex Desire in Contemporary Iran — notice de l'éditeur",
      author_or_institution:
        "Afsaneh Najmabadi (université Harvard) — Duke University Press, notice de l'ouvrage",
      publication_date: "2013-12-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Since the mid-1980s, the Islamic Republic of Iran has permitted, and partially subsidized, sex reassignment surgery.",
      context_explanation:
        "Ouvrage de l'historienne Afsaneh Najmabadi (Harvard) sur la transsexualité en Iran : la République islamique autorise et subventionne en partie la chirurgie de réassignation depuis le milieu des années 1980. La politique iranienne s'appuie sur une position attribuée à Khomeini ; l'ouvrage montre comment droit, psychiatrie et jurisprudence islamique ont produit une catégorie « trans » juridiquement tolérée — distincte de l'homosexualité, réprouvée.",
      original_url: "https://www.dukeupress.edu/professing-selves",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "4d8795b2-a577-4751-ac27-e0ee9720a573",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "« Identities of a Single Root: The Triad of The Khuntha, Mukhannath, and Khanith » — Arcade (Stanford Humanities Center)",
      author_or_institution: "Saqer Almarri — Arcade, article évalué par les pairs",
      publication_date: null,
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "The mukhannath is the term most often invoked when scholars of Islamic studies discuss male homosexuality and male effeminacy. Another identity described in classical Arabic literature is the khuntha (plural: khunatha). This identity often arises in legal treatises addressing inheritance rules, because the question of the sex of the khuntha arises in order to calculate each heir's inheritance.",
      context_explanation:
        "Le droit islamique classique distingue des figures que le vocabulaire contemporain confond : le mukhannath (l'homme efféminé, associé dans les traités à l'homosexualité passive) et le khuntha (la personne au sexe ambigu), ce dernier traité jusque dans les règles de calcul des héritages. La tradition savante n'assimile donc pas l'orientation sexuelle à l'identité de genre.",
      original_url:
        "https://shc.stanford.edu/arcade/interventions/identities-single-root-triad-khuntha-mukhannath-and-khanith-0",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "6a47188d-5db5-4dd1-8529-0c2c668d62f3",
      spectrum: "CENTRE",
      source_name: "« Iran : changer de sexe ou mourir »",
      author_or_institution: "D. Bel. — Le Monde, instantané Wayback",
      publication_date: "2006-05-12",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "En Iran, les transsexuels sont considérés comme des \"malades\". Depuis 1979, ils bénéficient néanmoins d'une certaine forme de tolérance de la part du régime islamique. Ils ont ainsi le droit de changer de sexe pour trouver leur place dans la société.",
      context_explanation:
        "Article du Monde accompagnant un reportage d'Envoyé spécial : il rappelle que, sous contrôle médical et religieux, la République islamique autorise le changement de sexe — tout en punissant l'homosexualité. Le traitement institutionnel de la transition y est donc distinct de celui de l'orientation, ce qui contredit l'idée d'un interdit islamique uniforme.",
      original_url:
        "https://web.archive.org/web/20240619192404/https://www.lemonde.fr/vous/article/2006/05/12/iran-changer-de-sexe-ou-mourir_770938_3238.html",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
    {
      id: "56e2ec11-93d8-4100-b93c-112728b91030",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "« Avenir de l'Église : le rapport du Synode rejette la bénédiction des couples homosexuels et reporte la question du célibat des prêtres »",
      author_or_institution: "Jean-Marie Guénois — Le Figaro",
      publication_date: "2023-10-29",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Rejet de la bénédiction de couples homosexuels, report à long terme d'une éventuelle abolition du célibat sacerdotal, remise en cause du pouvoir exclusif de l'évêque au profit d'une «coresponsabilité» du gouvernement ecclésial avec les laïcs, large ouverture pour donner des responsabilités aux femmes, mais dont le statut reste à définir, sont les quatre propositions majeures du «rapport de synthèse» de la première étape du synode sur l'avenir de l'Église, présentées samedi 28 octobre dans la soirée à Rome.",
      context_explanation:
        "Le Figaro, quotidien classé à droite, rapporte que le synode catholique rejette la bénédiction des couples de même sexe. La réprobation morale des relations homosexuelles est donc portée aussi par l'institution catholique contemporaine, ce qui contredit la thèse d'une spécificité musulmane.",
      original_url:
        "https://www.lefigaro.fr/actualite-france/avenir-de-l-eglise-le-rapport-du-synode-rejette-la-benediction-des-couples-homosexuels-et-reporte-une-abolition-du-celibat-des-pretres-20231029",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 7,
    },
  ],
};

/**
 * Brouillon de contrôle : jamais publié, jamais rendu par le site. Il sert à
 * prouver que la lecture publique est bien filtrée par les politiques RLS
 * (`is_published = true`) et non par le code de l'interface.
 */
export const DRAFT_CONTROL_DOSSIER: Dossier = {
  id: "8adc1cd9-e4d3-44e6-01ac-7e8f9a0b1c29",
  slug: "brouillon-de-controle-rls",
  claim_title: "Brouillon de contrôle RLS (jamais publié)",
  verdict: "TROMPEUR",
  category: "SOCIETE",
  protagonists: [],
  verdict_summary:
    "Ce brouillon existe pour vérifier que la lecture publique ne rend que les dossiers publiés. Il ne doit apparaître sur aucune page.",
  consensus_score: 0,
  premises: [],
  is_published: false,
  published_at: null,
  sources: [],
};

export const ASPA_MINIMUM_VIEILLESSE_DOSSIER: Dossier = {
  id: "92fb6d88-053d-4435-8506-0f9e92a7db51",
  slug: "aspa-minimum-vieillesse-etrangers-conditions-cotisation",
  claim_title:
    "Le minimum vieillesse (ASPA) de 1 000 € est versé à des étrangers arrivés en France sans cotiser",
  verdict: "FAUX",
  verdict_summary:
    "L'ASPA n'est versée à aucun étranger « sans condition » : le code de la sécurité sociale impose une condition de résidence stable de plus de 9 mois par an et, pour les ressortissants non couverts par une convention, un titre de séjour autorisant à travailler détenu sans interruption depuis au moins 10 ans — sauf statut de réfugié, d'apatride, de bénéficiaire de la protection subsidiaire ou ressortissant de l'Espace économique européen. Le montant maximum est de 1 043,59 € par mois pour une personne seule en 2026 (1 620,18 € pour un couple) et l'allocation est différentielle : elle complète les revenus jusqu'à ce plafond, sans lien avec une quelconque cotisation. Elle est supprimée si le bénéficiaire établit sa résidence hors de France et récupérable, au décès, sur la part de succession dépassant 108 586,14 €. Loin d'être un chèque automatique, la prestation souffre d'un non-recours massif : environ 300 000 retraités éligibles ne la demandent pas, en partie par crainte de la récupération sur succession — une proposition de loi créant un « forfait logement » a été adoptée à l'unanimité par l'Assemblée nationale le 11 juin 2026 et doit encore être examinée par le Sénat.",
  category: "SOCIETE",
  protagonists: [
    {
      name: "Allocation de solidarité aux personnes âgées",
      kind: "TEXTE",
      role: "SUJET",
      reference_url:
        "https://fr.wikipedia.org/wiki/Allocation_de_solidarit%C3%A9_aux_personnes_%C3%A2g%C3%A9es",
      note: "Appelée « minimum vieillesse », elle a remplacé en 2006-2007 les allocations constitutives de l'ancien dispositif ; versée sous conditions de résidence, d'âge et de ressources.",
    },
    {
      name: "Caisse nationale d'assurance vieillesse",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url:
        "https://fr.wikipedia.org/wiki/Caisse_nationale_d%27assurance_vieillesse",
      note: "Sert environ 80 % des allocations du minimum vieillesse au régime général et pilote les campagnes de lutte contre le non-recours à l'ASPA.",
    },
    {
      name: "Émeline K/Bidi",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/%C3%89meline_K/Bidi",
      note: "Députée de La Réunion (GDR), autrice de la proposition de loi « visant à renforcer la solidarité envers les retraités pauvres » adoptée par l'Assemblée nationale le 11 juin 2026.",
    },
    {
      name: "Cour des comptes",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)",
      note: "Dans son rapport « Le minimum vieillesse et l'allocation de rentrée scolaire » (octobre 2021), elle documente le coût de la prestation (3,95 Md€ pour 750 000 allocataires en 2020) et le poids du minimum vieillesse dans les fraudes de la branche vieillesse.",
    },
    {
      name: "Sénat",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      note: "Doit examiner en première lecture le texte adopté par l'Assemblée nationale sur le « forfait logement » (dossier législatif ppl25-734).",
    },
  ],
  consensus_score: 98,
  premises: [
    {
      claim_part:
        "« N'importe quel étranger âgé peut venir en France toucher 1 000 € par mois sans condition »",
      status: "FAUX",
      detail:
        "Pour en bénéficier, un ressortissant étranger doit détenir « depuis au moins dix ans un titre de séjour autorisant à travailler » (article L. 816-1 du code de la sécurité sociale, repris par la fiche service-public), sauf s'il est réfugié, apatride, bénéficiaire de la protection subsidiaire, ancien combattant, ressortissant d'un État de l'Espace économique européen ou de Suisse, ou ressortissant d'un pays lié par une convention bilatérale (service-public.gouv.fr). S'y ajoutent la résidence stable en France (plus de 9 mois l'année de versement), la condition de subsidiarité (avoir fait valoir tous ses droits à pension), l'âge minimum (65 ans, abaissé dans certains cas) et un plafond de ressources. Le montant n'est pas un forfait : l'allocation est différentielle et le maximum est de 1 043,59 € par mois pour une personne seule en 2026 — soit à peine plus que les « 1 000 € » évoqués.",
    },
    {
      claim_part:
        "« L'ASPA est un droit gratuit conservé même si l'on repart vivre à l'étranger »",
      status: "FAUX",
      detail:
        "Le service de l'allocation « est supprimé aux personnes qui établissent leur résidence en dehors du territoire métropolitain » (article L. 815-12 du code de la sécurité sociale), et la condition de résidence — désormais portée à 9 mois par an pour le minimum vieillesse comme pour les prestations familiales par le décret du 19 avril 2024, applicable au 1er janvier 2025 — est contrôlée annuellement. Surtout, la prestation n'est pas « gratuite » : récupérable sur la succession au-delà d'un actif net de 108 586,14 € pour un décès en 2026 (art. L. 815-13), elle est au cœur d'un non-recours massif — environ 300 000 retraités éligibles y renoncent, et l'Assemblée nationale a voté le 11 juin 2026 un « forfait logement » qui supprime cette récupération pour les propriétaires, précisément pour y remédier.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "2063e9ae-3799-4e20-9846-4642b40ef280",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Allocation de solidarité aux personnes âgées (Aspa) — fiche d'information officielle F16871",
      author_or_institution:
        "Service-public.gouv.fr — Direction de l'information légale et administrative (Premier ministre)",
      publication_date: "2026-10-15",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Vous devez également être dans l'une des situations suivantes : Avoir de façon continue depuis au moins 10 ans un titre de séjour autorisant à travailler",
      context_explanation:
        "La fiche officielle oppose la condition des dix ans de titre de séjour — posée par l'article L. 816-1 du code de la sécurité sociale — à une liste limitative d'exceptions : être réfugié, apatride, bénéficiaire de la protection subsidiaire, avoir combattu pour la France, être ressortissant d'un État de l'Espace économique européen ou de Suisse, ou ressortissant d'un pays conventionné (Algérie, Andorre, Bénin, Cap-Vert, Congo, etc.). Elle fixe aussi la condition de résidence — « C'est le cas si vous séjournez en France pendant plus de 9 mois l'année de versement de l'Aspa » — et les montants 2026 : revenus du couple plafonnés à 1 620,18 € brut par mois, montant maximum de 1 043,59 € pour la personne seule. La récupération sur succession y est détaillée : pour un décès en 2026, elle ne s'applique que si l'actif net dépasse 108 586,14 €, dans la limite de 8 463,42 € par année de versement.",
      original_url:
        "https://www.service-public.gouv.fr/particuliers/vosdroits/F16871",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "f990791d-b475-408b-8f2e-027afbe0c791",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Prestations : 9 mois de résidence en France désormais exigés (actualité A17353)",
      author_or_institution:
        "Service-public.gouv.fr — Direction de l'information légale et administrative (Premier ministre)",
      publication_date: "2025-01-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Il faut désormais résider 9 mois par an en France, au lieu de 6 mois, pour percevoir des prestations familiales et bénéficier du minimum vieillesse et ce, depuis le 1er janvier 2025.",
      context_explanation:
        "L'actualité officielle documente le durcissement de la condition de résidence appliqué au minimum vieillesse : un décret du 19 avril 2024, publié au Journal officiel du 21 avril 2024, a porté de 6 à 9 mois par an la durée de résidence exigée, « le décret concerne les prestations familiales et le minimum vieillesse ». La prémisse selon laquelle l'allocation serait conservée en cas de départ à l'étranger se heurte à ce contrôle annuel de présence effective.",
      original_url:
        "https://www.service-public.gouv.fr/particuliers/actualites/A17353",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "8bf87088-d02b-460d-8429-a873f1d27982",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Code de la sécurité sociale — article L. 815-1 (conditions d'attribution de l'allocation de solidarité aux personnes âgées)",
      author_or_institution: "République française — code de la sécurité sociale",
      publication_date: "2026-01-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Un décret en Conseil d'Etat précise la condition de résidence mentionnée au présent article, sa durée ne pouvant être inférieure à neuf mois par année civile.",
      context_explanation:
        "Le texte fondateur de l'ASPA pose une condition de « résidence stable et régulière sur le territoire métropolitain ou dans une collectivité mentionnée à l'article L. 111-2 » et inscrit le seuil plancher de neuf mois de présence par année civile ; l'article L. 815-1 prévoit aussi l'abaissement de l'âge minimum en cas d'inaptitude au travail. Le texte à jour est servi par le service public de diffusion du droit (Légifrance) ; il est reproduit ici depuis le miroir justiweb.fr, vérifié mot à mot.",
      original_url:
        "https://www.justiweb.fr/articles/code-de-la-securite-sociale/L815-1",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "adc0a243-1cae-447e-a6f6-6230894d5b60",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Code de la sécurité sociale — article L. 815-12 (suppression du service en cas de résidence hors de France)",
      author_or_institution: "République française — code de la sécurité sociale",
      publication_date: "2026-01-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Le service de l'allocation de solidarité aux personnes âgées est supprimé aux personnes qui établissent leur résidence en dehors du territoire métropolitain et des collectivités mentionnées à l'article L. 111-2.",
      context_explanation:
        "Cet article dément directement la prémisse d'un droit « conservé » en cas de départ à l'étranger : l'ASPA n'est pas portable, son service est supprimé dès que la résidence est établie hors du territoire (la circulation dans l'Espace économique européen ne la maintient pas non plus, contrairement à d'autres prestations). Texte à jour servi par Légifrance, reproduit depuis le miroir justiweb.fr, vérifié mot à mot.",
      original_url:
        "https://www.justiweb.fr/articles/code-de-la-securite-sociale/L815-12",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "5c899db2-fe91-4d75-90e3-c9a17db61e87",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Code de la sécurité sociale — article L. 815-13 (récupération sur succession et seuil de 100 000 euros)",
      author_or_institution: "République française — code de la sécurité sociale",
      publication_date: "2026-01-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Toutefois, la récupération n'est opérée que sur la fraction de l'actif net qui excède un seuil dont le montant est fixé à 100 000 euros au 1er septembre 2023 et revalorisé dans les mêmes conditions que celles prévues au même article L. 816-2. Dans les collectivités mentionnées à l'article L. 751-1, ce seuil est de 150 000 euros jusqu'au 31 décembre 2029.",
      context_explanation:
        "La loi elle-même fixe le seuil de récupération « d'environ 100 000 € » évoqué dans la prémisse : 100 000 € au 1er septembre 2023 pour la métropole, porté à 108 586,14 € par la revalorisation annuelle pour un décès survenu en 2026, et 150 000 € dans les collectivités d'outre-mer visées. La récupération s'exerce « après le décès du bénéficiaire », sur la fraction de succession excédant le seuil, et les sommes recouvrables sont garanties par une hypothèque légale ; sont exclus notamment les capitaux d'exploitation agricole. Texte à jour servi par Légifrance, reproduit depuis le miroir justiweb.fr, vérifié mot à mot.",
      original_url:
        "https://www.justiweb.fr/articles/code-de-la-securite-sociale/L815-13",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "6b0775f6-1afb-4048-8b68-87862e9e026b",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Augmentation des effectifs de l'Aspa au régime général : le rôle prépondérant de la démographie",
      author_or_institution:
        "Robin Demé — Direction statistique, prospective et recherche, Caisse nationale d'assurance vieillesse (Assurance retraite)",
      publication_date: "2025-10-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Entre 2012 et 2022, le nombre d'allocataires du minimum vieillesse au régime général est passé de 415 000 à 570 000, soit une hausse de 155 000 allocataires.",
      context_explanation:
        "Les données de la CNAV montrent un dispositif en forte croissance démographique (+ 37 % d'allocataires en dix ans au régime général), alimenté par l'arrivée à l'âge d'éligibilité de générations nombreuses et non par un assouplissement des conditions : le nombre d'allocataires par tranche d'âge a lui aussi augmenté. L'étude de la CNAV documente donc un flux de bénéficiaires soumis aux conditions légales, pas un « chèque automatique » ouvert à n'importe quel arrivant.",
      original_url:
        "https://www.statistiques-recherche.lassuranceretraite.fr/aspa-effet-demographique/",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Caisse_nationale_d%27assurance_vieillesse",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "ae5d116f-7d1e-4c67-95be-ba0637e8b2c5",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Bilan de la campagne de lutte contre le non-recours à l'Aspa en 2024",
      author_or_institution:
        "François Baris, Marie Ménard — Direction statistique, prospective et recherche, Caisse nationale d'assurance vieillesse (Assurance retraite)",
      publication_date: "2025-06-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Au cours de l'année 2024, près de 11 500 assurés ont été contactés par les caisses régionales de l'Assurance retraite pour un potentiel non-recours à l'Allocation de solidarité aux personnes âgées (Aspa). En comptabilisant les relances, plus de 15 000 contacts ont été réalisés.",
      context_explanation:
        "Le problème réel du dispositif est inverse de celui dénoncé par la prémisse : la CNAV doit traquer les retraités éligibles qui ne demandent pas l'allocation (855 nouvelles pensions de minimum vieillesse servies au 28 février 2025 grâce à ces contacts ; près de 80 % des assurés joints par téléphone seraient effectivement éligibles). Les campagnes de courriers postaux ont permis d'attribuer l'ASPA à 10 % des assurés contactés, celles de mailing à 8 %.",
      original_url:
        "https://www.statistiques-recherche.lassuranceretraite.fr/non-recours-aspa-2024/",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Caisse_nationale_d%27assurance_vieillesse",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
    {
      id: "80de041c-6760-41da-9977-222d28d9e214",
      spectrum: "CENTRE",
      source_name:
        "Le minimum vieillesse et l'allocation de rentrée scolaire — contribution au rapport « Sécurité sociale 2021 »",
      author_or_institution: "Cour des comptes (France)",
      publication_date: "2021-10-05",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "L'Aspa est l'une des allocations sur lesquelles se concentrent les risques d'erreurs et de fraude les plus élevés.",
      context_explanation:
        "La juridiction financière décrit le dispositif : en 2020, 3,95 Md€ ont été consacrés au minimum vieillesse au bénéfice de près de 750 000 allocataires ; l'ASPA (créée en 2006-2007) est soumise à une condition de résidence en France, à une condition de régularité du séjour pour les étrangers et à la subsidiarité. Elle pointe des « taux d'erreurs et des risques de fraude élevés », « près des trois quarts des fraudes détectées dans la branche vieillesse » concernant le minimum vieillesse, « principalement pour non-respect des conditions de résidence ou de ressources » — un contrôle renforcé qui confirme que les conditions sont sérieusement vérifiées, tout en soulignant la difficulté de ce contrôle.",
      original_url:
        "https://www.ccomptes.fr/sites/default/files/2021-10/20211005-Ralfss-2021-10-Minimum-vieillesse-allocation-rentree-scolaire.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 7,
    },
    {
      id: "aba31769-96b0-43ff-b319-3aa3f9a7102e",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "Dossier législatif — proposition de loi visant à renforcer la solidarité envers les retraités pauvres (texte n° 734, 2025-2026)",
      author_or_institution: "Sénat (France)",
      publication_date: "2026-06-11",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Première lecture - Sénat 11 juin 2026",
      context_explanation:
        "Le dossier législatif du Sénat retrace le parcours du texte adopté par l'Assemblée nationale le 11 juin 2026 (texte n° 308) puis « Texte n° 734 (2025-2026) transmis au Sénat le 11 juin 2026 », en première lecture. Au 15 octobre 2026, la réforme du « forfait logement » — qui supprimerait la récupération sur succession pour les retraités propriétaires — est donc toujours en navette : les règles actuelles de récupération sur succession s'appliquent jusqu'à la promulgation éventuelle. Le Sénat, chambre à majorité de droite, doit encore se prononcer sur ce texte d'origine parlementaire.",
      original_url: "https://www.senat.fr/dossier-legislatif/ppl25-734.html",
      author_reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 8,
    },
    {
      id: "44f39f73-e8e0-4917-b8ec-549587448521",
      spectrum: "GAUCHE",
      source_name:
        "Retraités pauvres : les députés adoptent un texte pour favoriser le recours aux aides",
      author_or_institution: "LCP — Assemblée nationale (Maxence Kagni)",
      publication_date: "2026-06-11",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "L'Assemblée nationale a adopté, ce jeudi 11 juin, une proposition de loi du groupe Gauche démocrate et républicaine qui vise à améliorer le taux de recours à l'allocation de solidarité aux personnes âgées (Aspa). Aujourd'hui, cette aide est peu demandée, car elle peut entraîner le remboursement de sommes importantes au décès du bénéficiaire.",
      context_explanation:
        "La chaîne parlementaire détaille la proposition de loi « visant à renforcer la solidarité envers les retraités pauvres » de la députée Émeline K/Bidi (GDR) : un « forfait logement » d'environ 40 euros pour une personne seule, en échange de la suppression de la récupération sur succession pour les propriétaires, et un non-recours « dû à 70 % au mécanisme de récupération de l'Aspa sur les successions » selon les enquêtes citées. Le texte a été transmis au Sénat.",
      original_url:
        "https://lcp.fr/actualites/retraites-pauvres-les-deputes-adoptent-un-texte-pour-favoriser-le-recours-aux-aides",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 9,
    },
    {
      id: "dc6e2d8e-aebb-4995-8fb4-fdf904d931d6",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Actions de lutte contre le non-recours à l'Aspa : ciblage par datamining — revue Retraite et société n° 87",
      author_or_institution:
        "Macline Niyomwungere, Frédéric Broutin (CNAV), revue scientifique Retraite et société, n° 87, dossier « Le non-recours des personnes âgées aux droits et aux services »",
      publication_date: "2021-12-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "L'allocation de solidarité aux personnes âgées (Aspa), qui permet d'assurer un niveau minimum de ressources aux retraités, fait l'objet d'un taux de non-recours important.",
      context_explanation:
        "La littérature scientifique (revue à comité de lecture éditée par la CNAV, coordination Arnaud Campéon, Mélina Ramos-Gorand et Philippe Warin, cofondateur de l'Observatoire des non-recours) documente que le principal dysfonctionnement de l'ASPA est le non-recours, et non une attribution laxiste : les freins identifiés sont la méconnaissance du dispositif, la complexité des démarches et la crainte de la récupération sur succession. Les modèles statistiques de ciblage développés depuis 2018 en découlent directement.",
      original_url:
        "https://www.statistiques-recherche.lassuranceretraite.fr/actions-de-lutte-contre-le-non-recours-a-l-aspa-ciblage-par-datamining/",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Caisse_nationale_d%27assurance_vieillesse",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 10,
    },
    {
      id: "69e53375-4d9a-4e45-9ec1-0b18c20f818a",
      spectrum: "CENTRE",
      source_name:
        "Aspa, successions et « forfait logement » : l'Assemblée revoit l'Allocation de solidarité aux personnes âgées",
      author_or_institution: "Boursorama avec Media Services (dépêche AFP)",
      publication_date: "2026-06-11",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Les députés ont approuvé à l'unanimité en première lecture jeudi 11 juin une proposition de loi du groupe GDR (communistes et ultramarins) visant à diminuer le non-recours à l'Allocation de solidarité aux personnes âgées (Aspa).",
      context_explanation:
        "La dépêche rapporte les éléments chiffrés du débat : l'ASPA « bénéficie aujourd'hui à près de 750.000 personnes » selon le ministre du Travail Jean-Pierre Farandou, dans la limite de 1 043 euros pour une personne seule et 1 620 euros pour un couple ; l'État récupère « environ 120 millions d'euros par an sur les allocations versées » au titre des successions. Le « forfait logement » résulte d'un amendement du gouvernement qui a réécrit la proposition de loi, avec un coût jugé « neutre » pour les finances publiques.",
      original_url:
        "https://www.boursorama.com/actualite-economique/actualites/aspa-successions-et-forfait-logement-l-assemblee-revoit-l-allocation-de-solidarite-aux-personnes-agees-647fde1e1fc5dd9e50868d2ba8eedacf",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 11,
    },
    {
      id: "bb94d2f9-c119-4f08-82f5-a9479e308e1a",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Code de la sécurité sociale — article L. 816-1 (conditions applicables aux personnes de nationalité étrangère)",
      author_or_institution: "République française — code de la sécurité sociale",
      publication_date: "2026-01-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Le présent titre est applicable aux personnes de nationalité étrangère qui répondent à l'une des conditions suivantes : 1° Etre titulaire depuis au moins dix ans d'un titre de séjour autorisant à travailler. Le respect de cette condition peut être attesté par les périodes d'assurance mentionnées à l'article L. 351-2 ;",
      context_explanation:
        "L'article qui fonde le « verrou des dix ans » : les 2° et 3° exemptent de cette durée les réfugiés, les apatrides, les personnes ayant combattu pour la France et celles bénéficiant de la protection subsidiaire, ainsi que les ressortissants d'un État membre de l'Union européenne, de l'Espace économique européen ou de la Confédération suisse. La condition est cumulative avec la résidence stable de l'article L. 815-1 et avec l'âge de 65 ans fixé à l'article R. 815-1 ; la fiche service-public F16871 en reprend le détail, y compris les pays liés à la France par une convention bilatérale. Texte à jour servi par Légifrance, reproduit depuis le miroir justiweb.fr, vérifié mot à mot.",
      original_url:
        "https://www.justiweb.fr/articles/code-de-la-securite-sociale/L816-1",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 12,
    },
  ],
};

export const FRAUDE_SOCIALE_FISCALE_DOSSIER: Dossier = {
  id: "cf93d598-da1f-40b1-bf82-4eccbfa4cba1",
  slug: "fraude-sociale-vs-fraude-fiscale-cout-france",
  claim_title:
    "La fraude sociale coûte plus cher à la France que la fraude fiscale",
  verdict: "FAUX",
  verdict_summary:
    "L'ordre de grandeur est inverse : le HCFiPS évalue la fraude sociale (prestations et cotisations confondues) à 14 Md€ en 2025, quand la fraude fiscale est estimée entre 80 et 120 Md€ par an par les travaux disponibles — soit environ six à neuf fois plus. Le clivage « allocataires contre fraudeurs en col blanc » ne résiste pas aux chiffres : « l'essentiel de la fraude demeure concentré sur le recouvrement des cotisations (plus de 52 % de la fraude évaluée) », la fraude des assurés représentant 36 % et celle des professionnels de santé 12 %. Sur les 14 Md€ évalués, seuls 680 M€ ont été recouvrés en 2024. Il faut toutefois noter que la fraude fiscale n'a jamais fait l'objet d'une estimation publique officielle en France : la Cour des comptes la juge « mal cernée et non chiffrée », la DGFiP n'ayant engagé ses premiers travaux de chiffrage de l'écart fiscal qu'en 2022, sur la seule TVA.",
  category: "ECONOMIE",
  protagonists: [
    {
      name: "Fraude fiscale",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Fraude_fiscale",
      note: "Déclaration ou manœuvre intentionnelle visant à échapper à l'impôt ; la Cour des comptes souligne qu'elle reste « mal cernée et non chiffrée » en France.",
    },
    {
      name: "Haut Conseil du financement de la protection sociale",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url:
        "https://fr.wikipedia.org/wiki/Haut_Conseil_du_financement_de_la_protection_sociale",
      note: "Observatoire du travail dissimulé depuis 2017 ; produit chaque année l'évaluation officielle de la fraude sociale (14 Md€ en 2025, 13 Md€ en 2024).",
    },
    {
      name: "Urssaf",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url:
        "https://fr.wikipedia.org/wiki/Union_de_recouvrement_des_cotisations_de_s%C3%A9curit%C3%A9_sociale_et_d%27allocations_familiales",
      note: "Branche recouvrement du régime général : près de 1,6 Md€ de redressements au titre du travail dissimulé en 2024 (+ 34 % en un an).",
    },
    {
      name: "Cour des comptes",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)",
      note: "Rapport public thématique « La lutte contre la fraude fiscale » (16 décembre 2025) : 20 Md€ de droits rappelés et pénalités en 2024, absence d'estimation de l'écart fiscal.",
    },
    {
      name: "Sénat",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      note: "Rapport d'information n° 72 (2022-2023) de la commission des finances : fraude à la TVA estimée par l'Insee entre 20 et 25 Md€ par an, recommandation de produire une estimation de la fraude fiscale.",
    },
  ],
  consensus_score: 98,
  premises: [
    {
      claim_part:
        "« Les allocataires sociaux causent l'essentiel du déficit public »",
      status: "FAUX",
      detail:
        "La fraude sociale totale — prestations et cotisations confondues — est évaluée à 14 Md€ en 2025 par le HCFiPS (contre 13 Md€ en 2024), quand la fraude fiscale est estimée entre 80 et 120 Md€ par an ; la fraude des assurés (RSA, allocations, indemnités) ne représente que 36 % de l'ensemble, soit environ 5 Md€. Sur les 14 Md€ évalués, 2 Md€ ont été détectés et 680 M€ recouvrés en 2024. Les montants ne sont donc absolument pas de même échelle, et l'essentiel des sommes évaluées n'est pas imputable aux allocataires.",
    },
    {
      claim_part: "« La fraude sociale est surtout le fait des ménages »",
      status: "CONFUSION_CONCEPTUELLE",
      detail:
        "La fraude sociale ne se confond pas avec la fraude aux prestations : « l'essentiel de la fraude demeure concentré sur le recouvrement des cotisations (plus de 52 % de la fraude évaluée) », c'est-à-dire des employeurs et des travailleurs indépendants — la fraude des assurés arrive en seconde position (36 %) et celle des professionnels s'élève à 12 % (HCFiPS). Les redressements de l'Urssaf au titre du travail dissimulé atteignent 1,6 Md€ en 2024 (+ 34 %), dont 69 % de cotisations non déclarées : le principal gisement de fraude sociale est bien patronal, et non ménager.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "ed439aeb-1382-488a-855b-f4abc23101bc",
      spectrum: "DONNEES_BRUTES_OFFICIELLES",
      source_name:
        "Note annuelle de suivi et d'évaluation des fraudes sociales — 14 Md€ de fraudes évaluées",
      author_or_institution:
        "Haut Conseil du financement de la protection sociale (HCFiPS) — Secrétariat général, Direction de la sécurité sociale",
      publication_date: "2026-01-13",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "L'évaluation financière correspondante est de 14 Md€ (contre 13 Md€ dans le rapport du HCFiPS de 2024).",
      context_explanation:
        "L'évaluation officielle de la fraude sociale : 14 Md€ en 2025, dont « plus de 52 % » concentrés sur le recouvrement des cotisations, 36 % sur la fraude des assurés et 12 % sur les professionnels. La note précise que l'accroissement (de 13 à 14 Md€) s'explique « pour l'essentiel par des effets de base et de périmètre » et que « le taux de fraude est globalement stable ». Elle rappelle aussi le décalage entre évaluation et recouvrement : 2 Md€ détectés, 680 M€ recouvrés en 2024, et que la fraude n'est pas « la cagnotte » budgétaire imaginée dans le débat public.",
      original_url:
        "https://www.strategie-plan.gouv.fr/files/files/Publications/2026/2026-01-13%20-%20HCFiPS%20-%20note%20annuelle%20fraude%20sociale/Note%20annuelle%20de%20suivi%20et%20d%27%C3%A9valuation%20des%20fraudes%20sociales%20VF.pdf",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Haut_Conseil_du_financement_de_la_protection_sociale",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "b6d3b1ce-0c91-4a82-b402-f06ef0992c75",
      spectrum: "CENTRE",
      source_name:
        "La lutte contre la fraude aux prestations sociales à l'ère de son industrialisation — rapport 2026",
      author_or_institution: "Défenseur des droits",
      publication_date: "2026-04-10",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Le HCFiPS estime la fraude sociale (incluant la fraude aux prestations sociales et la fraude aux cotisations sociales) à 14 milliards d'euros en 2025. À titre de comparaison, la fraude fiscale est évaluée quant à elle entre 80 et 120 milliards d'euros.",
      context_explanation:
        "Le rapport de l'autorité constitutionnelle indépendante pose la comparaison et la ventilation : en 2024, la répartition par organisme était « Urssaf : 6,91 Mds €, Cnaf : 3,87 Mds €, Cnam : 1,71 Mds, France Travail : 0,11 Mds €, CCMSA : 0,34 Mds €, Cnav : 0,04 Mds € » — soit une majorité de fraude patronale (Urssaf, cotisations) et non ménagère. Il donne aussi les définitions officielles : la fraude aux cotisations est « une irrégularité commise intentionnellement par l'employeur », distincte de la fraude fiscale (manœuvre contre l'impôt).",
      original_url:
        "https://www.defenseurdesdroits.fr/sites/default/files/2026-04/ddd_rapport_fraude-prestations-sociales-2026_20260410.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/D%C3%A9fenseur_des_droits",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "731c8bf9-ed8b-4973-9bb9-f5c104b94ca1",
      spectrum: "CENTRE",
      source_name:
        "La lutte contre la fraude fiscale — rapport public thématique, décembre 2025 (synthèse)",
      author_or_institution: "Cour des comptes (France)",
      publication_date: "2025-12-16",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Très présente dans le débat public, la fraude fiscale demeure pourtant mal cernée et non chiffrée.",
      context_explanation:
        "La juridiction financière établit le cadre de la comparaison : les résultats du contrôle fiscal « en droits rappelés et pénalités, à hauteur de 20 Md€ en 2024, peinent à retrouver leur niveau du milieu des années 2010 », et la France est « l'un des pays les plus en retard » de l'OCDE en matière d'estimation de la fraude : « les premiers travaux de chiffrage de l'écart fiscal n'ont été engagés par la DGFiP qu'en 2022 sur la TVA ». Autrement dit, les fourchettes de 80 à 120 Md€ sont des estimations de chercheurs et d'organisations, pas un chiffrage public officiel — la Cour appelant à « achever le chiffrage de l'écart fiscal ».",
      original_url:
        "https://www.ccomptes.fr/sites/default/files/2025-12/20251216-synthese-Lutte-contre-la-fraude-fiscale.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/Cour_des_comptes_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "37aae187-bf76-4149-ada5-fec666a48636",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Bilan 2024 de la lutte contre le travail dissimulé — dossier de presse",
      author_or_institution: "Urssaf — réseau des Urssaf (branche recouvrement)",
      publication_date: "2025-03-06",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Le montant de ses redressements opérés au titre de la lutte contre le travail dissimulé a atteint près de 1,6 milliard d'euros (+ 34 % en un an). Ces résultats ont été multipliés par quatre en 10 ans.",
      context_explanation:
        "Le bilan des contrôles patronaux : 34 287 actions de lutte contre le travail dissimulé en 2024 (dont 4 121 ciblant des employeurs et 2 635 des travailleurs indépendants), un redressement moyen de 245 399 euros et 1 096 M€ de cotisations et contributions non déclarées, soit 69 % du montant global redressé. L'Urssaf vise 5,5 Md€ de redressements sur 2023-2027 : la fraude sociale « constatée » est d'abord le fait d'employeurs.",
      original_url:
        "https://www.urssaf.org/files/Espace+media/Dossier+de+presse/NAT-DP-Bilan+LCTI+2024_2025+03+06.pdf",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Union_de_recouvrement_des_cotisations_de_s%C3%A9curit%C3%A9_sociale_et_d%27allocations_familiales",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "d540fce1-fe96-49a2-8d02-57c25f948ea7",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "Fraude et évasion fiscales : faire les comptes et intensifier la lutte — rapport d'information n° 72 (2022-2023) de la commission des finances (synthèse)",
      author_or_institution: "Sénat (France) — commission des finances (Jean-François Husson, rapporteur)",
      publication_date: "2022-10-25",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "les estimations de la fraude à la TVA qui, selon l'Insee, serait comprise entre 20 et 25 milliards d'euros par an",
      context_explanation:
        "Le rapport de la commission des finances chiffre le premier poste connu de la fraude fiscale — la TVA, 20 à 25 Md€ par an selon l'Insee — et constate que les montants recouvrés (904 M€ pour le contrôle TVA en 2021) « peuvent sembler modestes » en regard. Sa première recommandation est de « produire et publier, d'ici le projet de loi de finances initiale pour 2024, des estimations de la fraude fiscale, en détaillant la méthodologie utilisée » : preuve que la fourchette de 80 à 120 Md€ n'était, encore en 2022, adossée à aucune estimation publique.",
      original_url: "https://www.senat.fr/rap/r22-072/r22-072-syn.pdf",
      author_reference_url: "https://fr.wikipedia.org/wiki/S%C3%A9nat_(France)",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "5be1ea3e-a0df-4c2f-8775-b5e51b569fc5",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Évasion fiscale des ultrariches : le rôle des filiales offshore",
      author_or_institution:
        "Carmela D'Avino, professeure de finance, IÉSEG School of Management (The Conversation)",
      publication_date: "2025-09-29",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "En France, on estime que 30 à 40 % des biens détenus par les 0,01 % les plus riches se trouvent à l'étranger, causant une perte fiscale de 80 milliards à 100 milliards d'euros.",
      context_explanation:
        "Travaux académiques sur l'évasion des ménages les plus fortunés : la perte fiscale liée aux avoirs détenus à l'étranger est estimée entre 80 et 100 Md€, un ordre de grandeur cohérent avec la fourchette de 80 à 120 Md€ reprise pour la fraude fiscale globale — à comparer aux 14 Md€ de la fraude sociale évaluée.",
      original_url:
        "https://theconversation.com/evasion-fiscale-des-ultrariches-le-role-des-filiales-offshore-258090",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "1ccdee37-4410-4203-a831-c15b16551d59",
      spectrum: "GAUCHE",
      source_name:
        "Fraude fiscale : ces dizaines de milliards (toujours) perdus…",
      author_or_institution:
        "Observatoire de la justice fiscale — Attac France",
      publication_date: "2025-11-12",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "tous confortent l'estimation selon laquelle la fraude fiscale représente un manque à gagner compris entre 80 et 100 milliards d'euros",
      context_explanation:
        "La synthèse militante de l'Observatoire de la justice fiscale recense les estimations disponibles : étude sur l'impôt sur les sociétés (27,3 Md€), fraude à la TVA « estimée entre 20 et 25 milliards d'euros par l'Insee », et conclut à un manque à gagner compris entre 80 et 100 Md€ pour la fraude fiscale — l'estimation la plus couramment reprise, à laquelle répondent les 14 Md€ de la fraude sociale évaluée par le HCFiPS.",
      original_url:
        "https://obs-justice-fiscale.attac.org/actualites/article/fraude-fiscale-ces-dizaines-de-milliards-toujours-perdus",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
  ],
};

export const RACES_BIOLOGIQUES_DOSSIER: Dossier = {
  id: "8ddf3e0f-fb27-4188-808f-eae19b64ed2a",
  slug: "genetique-races-biologiques-humaines",
  claim_title:
    "La génétique moderne prouve l'existence de races biologiques distinctes chez l'humain",
  verdict: "FAUX",
  verdict_summary:
    "La génétique des populations établit exactement l'inverse : tous les êtres humains partagent environ 99,9 % de leur ADN, et l'immense majorité de la diversité génétique restante se trouve à l'intérieur des populations, non entre elles. Dès 1972, l'analyse de Richard Lewontin puis les travaux de Guido Barbujani et Luca Cavalli-Sforza (PNAS, 1997) établissent que 85 % de la diversité génétique humaine est portée par les individus d'une même population et que les différences entre continents n'en représentent qu'environ 10 % ; entre un Papou et un Breton, seuls environ 5 % des 6 millions de lettres d'ADN qui diffèrent s'expliquent par l'origine géographique. La variation humaine est continue et clinale, sans frontières biologiques : l'espèce Homo sapiens ne se divise pas en sous-espèces. L'UNESCO l'a proclamé dès la Déclaration sur la race et les préjugés raciaux de 1978 — « tous les êtres humains appartiennent à une même espèce et descendent d'une même souche » — et la science a abandonné le concept de race biologique, qui reste en revanche un construit social dont le racisme se nourrit.",
  category: "SOCIETE",
  protagonists: [
    {
      name: "Homo sapiens",
      kind: "TEXTE",
      role: "SUJET",
      reference_url: "https://fr.wikipedia.org/wiki/Homo_sapiens",
      note: "Espèce humaine, dont l'homogénéité génétique est exceptionnellement forte pour un mammifère à répartition mondiale.",
    },
    {
      name: "UNESCO",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url:
        "https://fr.wikipedia.org/wiki/Organisation_des_Nations_unies_pour_l%27%C3%A9ducation,_la_science_et_la_culture",
      note: "A adopté le 27 novembre 1978 la Déclaration sur la race et les préjugés raciaux, qui proclame l'unité de l'espèce humaine.",
    },
    {
      name: "Évelyne Heyer",
      kind: "PERSONNE",
      role: "AUTEUR",
      reference_url: "https://fr.wikipedia.org/wiki/%C3%89velyne_Heyer",
      note: "Professeure de génétique des populations, Muséum national d'histoire naturelle ; commissaire scientifique du Musée de l'Homme.",
    },
    {
      name: "Centre national de la recherche scientifique",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url:
        "https://fr.wikipedia.org/wiki/Centre_national_de_la_recherche_scientifique",
      note: "Définit la race comme une catégorie sans aucune base scientifique, au fondement des racismes.",
    },
    {
      name: "National Human Genome Research Institute",
      kind: "ORGANISATION",
      role: "AUTEUR",
      reference_url:
        "https://fr.wikipedia.org/wiki/National_Human_Genome_Research_Institute",
      note: "Institut américain pionnier du Projet Génome Humain ; ses fiches documentent la variation génétique humaine (99,9 % d'identité).",
    },
  ],
  consensus_score: 100,
  premises: [
    {
      claim_part:
        "« Les groupes humains constituent des sous-espèces biologiques discontinues »",
      status: "FAUX",
      detail:
        "La variation génétique humaine est graduelle et clinale : les travaux fondateurs (Lewontin 1972, puis Barbujani et al., PNAS 1997) montrent que 85 % de la diversité génétique se trouve à l'intérieur des populations et que la partition en groupes raciaux ne recouvre aucune discontinuité du génome — « l'existence de ces grands groupes n'est pas soutenue par la présente analyse de l'ADN ». Sur les quelque 6 millions de lettres d'ADN qui différencient deux individus, seules environ 5 % s'expliquent par une origine géographique différente ; le reste distingue les individus d'une même origine. Il n'existe donc pas de sous-espèces discrètes chez Homo sapiens.",
    },
    {
      claim_part:
        "« Les traits morphologiques extérieurs définissent des lignées génétiques distinctes »",
      status: "CONFUSION_CONCEPTUELLE",
      detail:
        "Les traits visibles (pigmentation de la peau, forme des cheveux) dépendent d'une poignée de gènes d'adaptation au climat et n'indexent pas le reste du génome : deux individus d'apparence très différente peuvent être génétiquement plus proches que deux individus de même apparence, et la diversité génétique est plus grande entre certaines populations africaines qu'entre un Européen et un Asiatique (marqueur de l'origine africaine de l'espèce). L'apparence extérieure ne définit aucune lignée génétique distincte — c'est la confusion conceptuelle dénoncée par les généticiens des populations.",
    },
  ],
  is_published: true,
  published_at: "2026-10-15T00:00:00.000Z",
  sources: [
    {
      id: "9a54cecc-09b2-4063-b97a-65b82994cba4",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Déclaration sur la race et les préjugés raciaux — adoptée par la Conférence générale de l'UNESCO le 27 novembre 1978",
      author_or_institution: "UNESCO (Organisation des Nations unies pour l'éducation, la science et la culture)",
      publication_date: "1978-11-27",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "All human beings belong to a single species and are descended from a common stock. They are born equal in dignity and rights and all form an integral part of humanity.",
      context_explanation:
        "L'article premier de la déclaration adoptée à Paris le 27 novembre 1978 répond mot pour mot à la thèse des races biologiques : l'humanité forme une seule espèce issue d'une souche commune. Le préambule réaffirme « l'unité essentielle de la race humaine » et la déclaration condamne toute doctrine de supériorité fondée sur la différenciation raciale. Le texte intégral est publié par l'UNESCO (les déclarations d'experts de 1950 et 1964 en constituent les étapes préparatoires, celle de 1978 reste le texte de référence).",
      original_url:
        "https://www.unesco.org/en/legal-affairs/declaration-race-and-racial-prejudice",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Organisation_des_Nations_unies_pour_l%27%C3%A9ducation,_la_science_et_la_culture",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 0,
    },
    {
      id: "e879506b-0b3f-4ada-884e-18191a6c5c4b",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Human Genomic Variation — fiche du National Human Genome Research Institute",
      author_or_institution:
        "National Human Genome Research Institute (NHGRI), National Institutes of Health — « 15 Ways Genomics Influences Our World »",
      publication_date: "2019-03-13",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Did you know that at the base-pair level your genome is 99.9 percent the same as all of the humans around you - but in that 0.1 percent difference are many of the things that make you unique?",
      context_explanation:
        "L'institut qui a porté le Projet Génome Humain résume la donnée fondatrice : au niveau des paires de bases, le génome de tout être humain est identique à 99,9 % à celui de tous les autres ; le reliquat de 0,1 % porte aussi bien les traits physiques que les risques de maladies, ce qui prive l'idée de « races » de tout support génomique. La fiche complète : « les génomes humains diffèrent les uns des autres de toutes sortes de façons », sans regroupements discrets.",
      original_url:
        "https://www.genome.gov/dna-day/15-ways/human-genomic-variation",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/National_Human_Genome_Research_Institute",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 1,
    },
    {
      id: "fc844436-d3d1-4817-8303-9afe32041ae3",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "An apportionment of human DNA diversity (PNAS, 29 avril 1997) — Guido Barbujani, Arianna Magagni, Eric Minch et L. Luca Cavalli-Sforza",
      author_or_institution:
        "Guido Barbujani (université de Ferrare), Arianna Magagni (université de Bologne), Eric Minch et L. Luca Cavalli-Sforza (université Stanford), Proceedings of the National Academy of Sciences",
      publication_date: "1997-04-29",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "In 1972, Richard Lewontin analyzed allele frequencies at 15 protein loci and concluded that 85% of the overall human genetic diversity is represented by individual diversity within populations. Differences among seven racial groups accounted for less than 7% of the total.",
      context_explanation:
        "L'étude de référence sur la répartition de la diversité humaine : ses propres mesures sur 109 locus d'ADN confirment Lewontin, avec 84,4 % de la variance à l'intérieur des populations, 4,7 % entre populations d'un même continent et 10,8 % entre continents (Lewontin : 85,4 / 8,3 / 6,3). La conclusion : « l'existence de ces grands groupes — raciaux ou continentaux — n'est pas soutenue par la présente analyse de l'ADN ». Les auteurs y répondent aux objections de ceux pour qui l'espèce serait « profondément subdivisée en races ».",
      original_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC20754/",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Centre_national_de_la_recherche_scientifique",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 2,
    },
    {
      id: "f9b3d73a-bbda-49f9-85f1-09432c4fc211",
      spectrum: "CONSENSUS_ACADEMIQUE",
      source_name:
        "Race et génétique : comment la science a déconstruit le concept — Le Fil sciences",
      author_or_institution:
        "Évelyne Heyer (professeure de génétique des populations, Muséum national d'histoire naturelle), France Culture",
      publication_date: "2026-05-27",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Si l'idée de race a été forgée par les scientifiques entre les 17e et 19e siècle, les recherches génétiques prouvent que les humains sont semblables à 99,9 % et que les catégorisations raciales n'ont aucun fondement scientifique et ce depuis les années 1960-70.",
      context_explanation:
        "La généticienne des populations du Muséum national d'histoire naturelle, commissaire scientifique du Musée de l'Homme, résume le consensus : « les races biologiques n'existent pas », la diversité biologique humaine « ne justifie aucune hiérarchie entre les groupes ni les stéréotypes racistes », et les différences d'apparence « ne correspondent à aucun » fondement génétique. Elle rappelle que la diversité génétique est plus grande entre certaines populations africaines qu'entre un Européen et un Asiatique — indice de l'origine africaine d'Homo sapiens.",
      original_url:
        "https://www.radiofrance.fr/franceculture/podcasts/le-fil-sciences/races-et-genetique-ce-que-la-science-a-tranche-1655393",
      author_reference_url: "https://fr.wikipedia.org/wiki/%C3%89velyne_Heyer",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 3,
    },
    {
      id: "7a26563e-453f-40e7-8599-f2f9f24e09f9",
      spectrum: "ARCHIVE_PRIMAIRE",
      source_name:
        "Quand la biologie parlait de races humaines — CNRS Le journal n° 263",
      author_or_institution:
        "Charline Zeitoun, CNRS Le journal (Centre national de la recherche scientifique)",
      publication_date: "2011-12-01",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Catégorie de classement de l'espèce humaine selon des critères morphologiques ou culturels, sans aucune base scientifique et dont l'emploi est au fondement des divers racismes et de leurs pratiques.",
      context_explanation:
        "La définition officielle que le CNRS donne du mot « race » : une catégorie sans aucune base scientifique, au fondement des racismes. L'article retrace comment la biologie a fabriqué le concept aux XVIIIe et XIXe siècles (théories de la dégénération, polygénisme) avant que la génétique du XXe siècle ne le démente : la vision monogéniste « exclut tout concept racial biologique », et le racisme scientifique est aujourd'hui une impasse historique.",
      original_url:
        "https://lejournal.cnrs.fr/articles/quand-la-biologie-parlait-de-races-humaines",
      author_reference_url:
        "https://fr.wikipedia.org/wiki/Centre_national_de_la_recherche_scientifique",
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 4,
    },
    {
      id: "89b43961-c0f5-47c6-ad4d-84101f59f9f7",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "Pourquoi parler de « races humaines » est un non-sens biologique",
      author_or_institution: "Joseph Le Corre, Le Point",
      publication_date: "2025-03-26",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "D'un point de vue scientifique, l'idée de « races humaines » est une aberration, car l'humanité partage un code génétique d'une homogénéité saisissante.",
      context_explanation:
        "Même dans un hebdomadaire classé à droite, le constat est sans ambiguïté : « leur ADN est rigoureusement identique à 99,9 %, ce qui fait de Homo sapiens l'espèce de mammifère la plus homogène génétiquement à l'échelle du monde entier ». L'article cite le généticien Paul Verdu (Laboratoire d'éco-anthropologie, Muséum national d'histoire naturelle) : entre un Papou et un Breton, ~0,1 % des 6 milliards de lettres diffèrent, et « seules environ 5 % sont liées à leur origine géographique différente, tout le reste s'explique par des différences entre individus de la même origine géographique ».",
      original_url:
        "https://www.lepoint.fr/eureka/pourquoi-parler-de-races-humaines-est-un-non-sens-biologique-26-03-2025-2585739_4706.php",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 5,
    },
    {
      id: "08aee1cd-7acb-4357-8907-012afe61e0b3",
      spectrum: "DROITE_LIBERALE_CONSERVATRICE",
      source_name:
        "Pourquoi les actuels travaux en génétique ne marquent pas le retour des « races »",
      author_or_institution: "Thomas Mahler, L'Express",
      publication_date: "2023-04-12",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "Contrairement à ce qu'affirme l'extrême droite, les nouvelles études en génomique et sur les populations ne réhabilitent pas les catégories raciales, bien au contraire.",
      context_explanation:
        "Le décryptage répond à la crainte — nourrie aussi par les manifestes suprémacistes, comme celui de l'assaillant de Buffalo en 2022 qui citait des études génomiques — que la génomique rouvre la porte aux races : les travaux actuels la referment au contraire. La génétique des populations des années 2000-2020 confirme l'unité de l'espèce et la répartition majoritairement intrapopulationnelle de la diversité.",
      original_url:
        "https://www.lexpress.fr/sciences-sante/pourquoi-les-actuels-travaux-en-genetique-ne-marquent-pas-le-retour-des-races-HPB333WZCFHTFFZETAECYZYHQY/",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 6,
    },
    {
      id: "894c0bc8-0724-4cbd-b964-845380132eca",
      spectrum: "CENTRE",
      source_name:
        "Michel Agier, anthropologue : « La race biologique n'existe pas, mais la race produite par le racisme, elle, existe socialement »",
      author_or_institution: "Séverine Kodjo-Grandvaux (entretien), Le Monde",
      publication_date: "2025-02-10",
      quote_kind: "CITATION_EXACTE",
      exact_quote:
        "La race biologique n'existe pas, mais la race produite par le racisme, elle, existe socialement",
      context_explanation:
        "L'anthropologue Michel Agier (EHESS, IRD) rappelle la double vérité du dossier : la démonstration scientifique de l'inexistence des races biologiques n'empêche pas le racisme, qui produit socialement la « race » comme catégorie d'assignation — un héritage de l'histoire coloniale et impériale de l'Europe qu'il appelle l'« infrapensée » raciste. La distinction entre fait biologique et construit social est le point d'atterrissage du consensus scientifique.",
      original_url:
        "https://www.lemonde.fr/idees/article/2025/02/10/michel-agier-anthropologue-la-race-biologique-n-existe-pas-mais-la-race-produite-par-le-racisme-elle-existe-socialement_6539488_3232.html",
      author_reference_url: null,
      archive_storage_path: null,
      archive_sha256: null,
      archive_binary_sha256: null,
      display_order: 7,
    },
  ],
};

export const SEED_DOSSIERS: Dossier[] = [
  REFERENCE_DOSSIER,
  AME_DOSSIER,
  RSA_DOSSIER,
  VICHY_DOSSIER,
  IMMIGRATION_BUDGET_DOSSIER,
  CRIME_IMMIGRATION_DOSSIER,
  EXPULSION_JUGES_DOSSIER,
  ADA_DOSSIER,
  SANS_PAPIERS_AIDES_DOSSIER,
  AGRESSION_BORDEAUX_DOSSIER,
  SAINT_OMER_DOSSIER,
  RSA_SMIC_DOSSIER,
  DISCRIMINATIONS_EMBAUCHE_DOSSIER,
  HOMOPARENTALITE_DOSSIER,
  THEORIE_DU_GENRE_ECOLE_DOSSIER,
  POURVOI_CASSATION_DOSSIER,
  ASSISTANTS_RN_DOSSIER,
  LAXISME_PEINES_PRISON_DOSSIER,
  ASPA_MINIMUM_VIEILLESSE_DOSSIER,
  FRAUDE_SOCIALE_FISCALE_DOSSIER,
  RACES_BIOLOGIQUES_DOSSIER,
  AICHA_ANACHRONISME_DOSSIER,
  ISLAM_HOMOPHOBIE_TRANS_DOSSIER,
  DRAFT_CONTROL_DOSSIER,
];

export function publishedSeedDossiers(): Dossier[] {
  return SEED_DOSSIERS.filter((dossier) => dossier.is_published);
}
