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
        "Contrairement au marxisme, le socialisme [national-socialiste] ne répudie pas la propriété privée. Contrairement au marxisme, il n'implique aucune négation de la personnalité.",
      context_explanation:
        "L'article paraît sous le titre « When I Take Charge of Germany — Hitler Shows His Hand » (Liberty, vol. 9 n° 28, 9 juillet 1932). Hitler y revendique explicitement une redéfinition du mot « socialisme » contre la gauche marxiste, en garantissant la propriété privée ; la citation française traduit l'anglais publié.",
      author_reference_url: "https://fr.wikipedia.org/wiki/George_Sylvester_Viereck",
      original_url: null,
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
      original_url: null,
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
      original_url: null,
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
      original_url: null,
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
        "Entre 1934 et 1937, le gouvernement nazi transfère massivement des entreprises publiques au secteur privé (acier, mines, banque, transports maritimes, chemins de fer), à rebours des nationalisations menées ailleurs après 1929.",
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
        "Pour l'année 2024, le coût total réel de l'AME, toutes AME incluses, est de 1 386,8 millions d'euros, soit une hausse de 15,5 % par rapport à 2023, et de 67,6 % en 10 ans.",
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
        "Il se dégage le constat d'un dispositif sanitaire utile, maîtrisé pour l'essentiel mais exposé à l'augmentation récente du nombre de ses bénéficiaires.",
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
        "En 2025, parmi les personnes de 15 à 64 ans, 80 % des hommes immigrés sont actifs, une proportion proche des 78 % des hommes non-immigrés ; les immigrés occupent plus fréquemment que l'ensemble de la population des postes d'ouvriers (26 % contre 18 %).",
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
        "Introduit par la loi n° 2017-1339 du 15 septembre 2017 (Sapin II) : pour les atteintes à la probité — dont le détournement de fonds publics — l'inéligibilité n'est plus une simple faculté mais la règle, la juridiction ne pouvant l'écarter que par une décision spécialement motivée (III du même article).",
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

export const SEED_DOSSIERS: Dossier[] = [
  REFERENCE_DOSSIER,
  AME_DOSSIER,
  RSA_DOSSIER,
  VICHY_DOSSIER,
  IMMIGRATION_BUDGET_DOSSIER,
  CRIME_IMMIGRATION_DOSSIER,
  POURVOI_CASSATION_DOSSIER,
  DRAFT_CONTROL_DOSSIER,
];

export function publishedSeedDossiers(): Dossier[] {
  return SEED_DOSSIERS.filter((dossier) => dossier.is_published);
}
