import type {
  DossierCategory,
  PoliticalSpectrum,
  PremiseStatus,
  QuoteKind,
  VerdictStatus,
} from "./types";

/** Libellés français et ordre d'affichage des six piliers. */
export const SPECTRUM_ORDER: PoliticalSpectrum[] = [
  "ARCHIVE_PRIMAIRE",
  "CONSENSUS_ACADEMIQUE",
  "GAUCHE",
  "CENTRE",
  "DROITE_LIBERALE_CONSERVATRICE",
  "DONNEES_BRUTES_OFFICIELLES",
];

export const SPECTRUM_LABELS: Record<PoliticalSpectrum, string> = {
  ARCHIVE_PRIMAIRE: "Archives primaires",
  CONSENSUS_ACADEMIQUE: "Consensus académique",
  GAUCHE: "Sources de gauche",
  CENTRE: "Sources du centre",
  DROITE_LIBERALE_CONSERVATRICE: "Sources de droite libérale et conservatrice",
  DONNEES_BRUTES_OFFICIELLES: "Données brutes officielles",
};

export const SPECTRUM_SHORT_LABELS: Record<PoliticalSpectrum, string> = {
  ARCHIVE_PRIMAIRE: "Archives",
  CONSENSUS_ACADEMIQUE: "Académique",
  GAUCHE: "Gauche",
  CENTRE: "Centre",
  DROITE_LIBERALE_CONSERVATRICE: "Droite libérale",
  DONNEES_BRUTES_OFFICIELLES: "Données brutes",
};

/** Étiquette de colonne du spectromètre, en capitales comme sur un registre. */
export const SPECTRUM_COLUMN_LABELS: Record<PoliticalSpectrum, string> = {
  ARCHIVE_PRIMAIRE: "ARCHIVE PRIMAIRE",
  CONSENSUS_ACADEMIQUE: "CONSENSUS ACADÉMIQUE",
  GAUCHE: "GAUCHE",
  CENTRE: "CENTRE",
  DROITE_LIBERALE_CONSERVATRICE: "DROITE LIBÉRALE & CONSERVATRICE",
  DONNEES_BRUTES_OFFICIELLES: "DONNÉES BRUTES",
};

/** Cote de classement, façon registre d'archives. */
export const SPECTRUM_CODES: Record<PoliticalSpectrum, string> = {
  ARCHIVE_PRIMAIRE: "P1",
  CONSENSUS_ACADEMIQUE: "P2",
  GAUCHE: "P3",
  CENTRE: "P4",
  DROITE_LIBERALE_CONSERVATRICE: "P5",
  DONNEES_BRUTES_OFFICIELLES: "P6",
};

export const SPECTRUM_DESCRIPTIONS: Record<PoliticalSpectrum, string> = {
  ARCHIVE_PRIMAIRE:
    "Textes de loi, procès-verbaux, discours et documents d'époque, dans leur formulation d'origine.",
  CONSENSUS_ACADEMIQUE:
    "Travaux de recherche évalués par les pairs, à comité de lecture.",
  GAUCHE: "Analyses et documents produits par des institutions ou auteurs de gauche.",
  CENTRE: "Analyses d'institutions et d'auteurs centristes ou institutionnels.",
  DROITE_LIBERALE_CONSERVATRICE:
    "Analyses d'économistes libéraux, d'historiens et de médias conservateurs.",
  DONNEES_BRUTES_OFFICIELLES:
    "Statistiques, registres et séries publiés par des administrations.",
};

/** Ordre de présentation des catégories dans la navigation. */
export const CATEGORY_ORDER: DossierCategory[] = [
  "POLITIQUE",
  "HISTOIRE",
  "ECONOMIE",
  "SOCIETE",
  "RELIGION",
  "FAITS_DIVERS",
  "SANTE",
  "ENVIRONNEMENT",
  "INTERNATIONAL",
];

export const CATEGORY_LABELS: Record<DossierCategory, string> = {
  HISTOIRE: "Histoire",
  POLITIQUE: "Politique",
  ECONOMIE: "Économie",
  SOCIETE: "Société",
  RELIGION: "Religion",
  FAITS_DIVERS: "Faits divers",
  SANTE: "Santé",
  ENVIRONNEMENT: "Environnement",
  INTERNATIONAL: "International",
};

/** Ce qu'on trouve dans la catégorie, en une ligne (page de catégorie). */
export const CATEGORY_DESCRIPTIONS: Record<DossierCategory, string> = {
  HISTOIRE: "Affirmations sur le passé, confrontées aux archives et aux historiens.",
  POLITIQUE: "Propos, votes et programmes politiques passés au crible des textes.",
  ECONOMIE: "Chiffres, budgets et promesses économiques vérifiés à la source.",
  SOCIETE: "Faits de société, statistiques publiques et débats de fond.",
  RELIGION:
    "Croyances, institutions et textes religieux, confrontés aux sources et à l'histoire.",
  FAITS_DIVERS: "Rumeurs et récits d'affaires, jugés sur pièces et non sur l'émotion.",
  SANTE: "Santé, médicaments et allégations thérapeutiques face aux données.",
  ENVIRONNEMENT: "Climat, énergie et pollutions : ce que disent les séries officielles.",
  INTERNATIONAL: "Conflits et politique étrangère, recoupés par des sources de tous bords.",
};

/** Identifiant d'URL d'une catégorie (`/categories/faits-divers`). */
export const CATEGORY_SLUGS: Record<DossierCategory, string> = {
  HISTOIRE: "histoire",
  POLITIQUE: "politique",
  ECONOMIE: "economie",
  SOCIETE: "societe",
  RELIGION: "religion",
  FAITS_DIVERS: "faits-divers",
  SANTE: "sante",
  ENVIRONNEMENT: "environnement",
  INTERNATIONAL: "international",
};

export function categoryFromSlug(slug: string): DossierCategory | null {
  const normalized = slug.trim().toLowerCase();
  for (const category of CATEGORY_ORDER) {
    if (CATEGORY_SLUGS[category] === normalized) {
      return category;
    }
  }
  return null;
}

export const PROTAGONIST_LABELS: Record<"PERSONNE" | "ORGANISATION" | "LIEU" | "TEXTE", string> =
  {
    PERSONNE: "personne",
    ORGANISATION: "organisation",
    LIEU: "lieu",
    TEXTE: "texte ou événement",
  };

export const VERDICT_LABELS: Record<VerdictStatus, string> = {
  VRAI: "Vrai",
  FAUX: "Faux",
  TROMPEUR: "Trompeur",
  INSTRUMENTALISATION_SEMANTIQUE: "Instrumentalisation sémantique",
  HORS_CONTEXTE: "Hors contexte",
  ANACHRONISME_HISTORIQUE: "Anachronisme historique",
  GENERALISATION_ABUSIVE: "Généralisation abusive",
};

export const VERDICT_STAMPS: Record<VerdictStatus, string> = {
  VRAI: "VRAI",
  FAUX: "FAUX",
  TROMPEUR: "TROMPEUR",
  INSTRUMENTALISATION_SEMANTIQUE: "INSTRUMENTALISATION SÉMANTIQUE",
  HORS_CONTEXTE: "HORS CONTEXTE",
  ANACHRONISME_HISTORIQUE: "ANACHRONISME HISTORIQUE",
  GENERALISATION_ABUSIVE: "GÉNÉRALISATION ABUSIVE",
};

export const PREMISE_STATUS_LABELS: Record<PremiseStatus, string> = {
  VRAI: "Vrai",
  VRAI_DETOURNE: "Vrai, détourné",
  CONFUSION_CONCEPTUELLE: "Confusion conceptuelle",
  FAUX: "Faux",
};

/** Badges de la radiographie du sophisme, en capitales de tampon. */
export const PREMISE_STAMP_LABELS: Record<PremiseStatus, string> = {
  VRAI: "VRAI SUR LE FOND",
  VRAI_DETOURNE: "VRAI SUR LE MOT / DÉTOURNÉ SUR LE FOND",
  CONFUSION_CONCEPTUELLE: "CONFUSION CONCEPTUELLE",
  FAUX: "FAUX MATÉRIEL",
};

/**
 * Niveau de distorsion affiché sous chaque brique d'affirmation.
 *
 * C'est une **échelle de statut**, pas une mesure : le statut est éditorial, et
 * le niveau en découle mécaniquement. Le site l'annonce comme tel sous la frise
 * — jamais un pourcentage qui aurait l'air calculé.
 */
export const PREMISE_DISTORTION_LEVELS: Record<PremiseStatus, number> = {
  VRAI: 0,
  VRAI_DETOURNE: 40,
  CONFUSION_CONCEPTUELLE: 60,
  FAUX: 100,
};

export const PREMISE_STATUS_TONES: Record<PremiseStatus, "true" | "warn" | "false"> = {
  VRAI: "true",
  VRAI_DETOURNE: "warn",
  CONFUSION_CONCEPTUELLE: "warn",
  FAUX: "false",
};

export const QUOTE_KIND_LABELS: Record<QuoteKind, string> = {
  CITATION_EXACTE: "Citation exacte",
  FAIT_DOCUMENTE: "Fait documenté",
};

export const VERDICT_TONES: Record<VerdictStatus, "true" | "warn" | "false"> = {
  VRAI: "true",
  FAUX: "false",
  TROMPEUR: "warn",
  INSTRUMENTALISATION_SEMANTIQUE: "warn",
  HORS_CONTEXTE: "warn",
  ANACHRONISME_HISTORIQUE: "warn",
  GENERALISATION_ABUSIVE: "warn",
};

/** Cote technique du dossier : les 8 premiers caractères de son identifiant. */
export function dossierCode(id: string): string {
  return `PP-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

/** Cote d'une pièce à conviction : PIÈCE #01, #02… */
export function pieceCode(order: number): string {
  return `PIÈCE #${String(order).padStart(2, "0")}`;
}

export function formatDate(value: string | null): string {
  if (!value) {
    return "date non documentée";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

/** Date en clair, pour les phrases (« publié le 14 octobre 2026 »). */
export function formatLongDate(value: string | null): string {
  if (!value) {
    return "date non documentée";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}
