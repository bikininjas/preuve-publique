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

export const SEED_DOSSIERS: Dossier[] = [REFERENCE_DOSSIER, DRAFT_CONTROL_DOSSIER];

export function publishedSeedDossiers(): Dossier[] {
  return SEED_DOSSIERS.filter((dossier) => dossier.is_published);
}
