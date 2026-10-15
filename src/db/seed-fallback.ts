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
 * communiqué de l'Académie nationale de médecine.
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
  ],
};

/**
 * Dossier RSA : la condition de nationalité et de séjour du revenu de
 * solidarité active — sources vérifiées : article L. 262-4 du code de
 * l'action sociale et des familles, évaluation de la Cour des comptes (2022),
 * réponse ministérielle avec données CNAF/CCMSA (2023), rapport du Sénat
 * (2025), article du Figaro (2023), recherche sur l'accès des étrangers aux
 * prestations (The Conversation, projet MiTSoPro, Université de Liège).
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
  ],
};

/**
 * Dossier Vichy : l'initiative du statut des Juifs et la prétendue protection
 * des Juifs français — sources vérifiées : loi du 3 octobre 1940 (Journal
 * officiel), discours de Jacques Chirac (1995), entretien avec Laurent Joly
 * (CNRS), page pédagogique du Mémorial de la Shoah, dossier de l'INA sur le
 * projet annoté par Pétain, article de L'Humanité sur la découverte de 2010.
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
  DRAFT_CONTROL_DOSSIER,
];

export function publishedSeedDossiers(): Dossier[] {
  return SEED_DOSSIERS.filter((dossier) => dossier.is_published);
}
