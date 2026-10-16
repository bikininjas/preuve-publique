/**
 * Types partagés du modèle éditorial : un dossier de vérification et les
 * sources recoupées sur les six piliers de la triangulation.
 *
 * Aucune de ces valeurs n'est calculée par le site : le verdict, le résumé et
 * le score de consensus sont éditoriaux et stockés tels quels. Seule la
 * couverture documentaire (nombre de piliers documentés) est calculée, parce
 * qu'elle se lit directement dans les sources.
 */

export type VerdictStatus =
  | "VRAI"
  | "FAUX"
  | "TROMPEUR"
  | "INSTRUMENTALISATION_SEMANTIQUE"
  | "HORS_CONTEXTE"
  | "ANACHRONISME_HISTORIQUE"
  | "GENERALISATION_ABUSIVE"
  | "CONSPIRATIONNISTE"
  | "ABSURDE";

export type PoliticalSpectrum =
  | "ARCHIVE_PRIMAIRE"
  | "CONSENSUS_ACADEMIQUE"
  | "GAUCHE"
  | "CENTRE"
  | "DROITE_LIBERALE_CONSERVATRICE"
  | "DONNEES_BRUTES_OFFICIELLES";

/** Statut d'une brique de l'affirmation, dans l'« anatomie du sophisme ». */
export type PremiseStatus =
  | "VRAI"
  | "VRAI_DETOURNE"
  | "CONFUSION_CONCEPTUELLE"
  | "ANACHRONISME_CONCEPTUEL"
  | "DOUBLE_STANDARD"
  | "BIAIS_METHODOLOGIQUE"
  | "BIAIS_DE_SELECTION"
  | "COMPLOTISME"
  | "BIAIS_ESSENTIALISTE"
  | "FAUX";

/**
 * Catégorie éditoriale du dossier : c'est elle qui permet de parcourir le
 * registre (Histoire, Politique, Faits divers…) sans passer par la recherche.
 */
export type DossierCategory =
  | "HISTOIRE"
  | "POLITIQUE"
  | "ECONOMIE"
  | "SOCIETE"
  | "FAITS_DIVERS"
  | "SANTE"
  | "ENVIRONNEMENT"
  | "INTERNATIONAL"
  | "RELIGION";

/**
 * Nature du contenu d'une source. Une citation entre guillemets et un fait
 * documenté ne se présentent pas de la même façon : le site ne fait jamais
 * passer un résumé pour une citation.
 */
export type QuoteKind = "CITATION_EXACTE" | "FAIT_DOCUMENTE";

export type Premise = {
  /** La brique de l'affirmation, citée telle qu'elle circule. */
  claim_part: string;
  status: PremiseStatus;
  /** Pourquoi ce statut, en une phrase vérifiable. */
  detail: string;
};

/**
 * Étape de la chaîne de custode : un fait daté de l'instruction du dossier.
 * `evidence_ref` renvoie à une pièce publiée du dossier (« Pièce #04 ») quand
 * l'étape s'appuie dessus — jamais un renvoi inventé.
 */
export type DossierTimelineEvent = {
  date: string;
  title: string;
  description: string;
  evidence_ref: string | null;
};

/**
 * Protagoniste d'un dossier : une personne, une organisation, un lieu ou un
 * texte cité. Deux rôles seulement, parce que c'est ce que le lecteur cherche :
 * qui est mis en cause, et qui porte les preuves.
 */
export type ProtagonistKind = "PERSONNE" | "ORGANISATION" | "LIEU" | "TEXTE";
export type ProtagonistRole = "SUJET" | "AUTEUR";

export type Protagonist = {
  name: string;
  kind: ProtagonistKind;
  role: ProtagonistRole;
  /**
   * Référence vérifiable (Wikipédia, Wikidata, notice d'autorité). Nul quand on
   * n'en a pas : mieux vaut aucun lien qu'un lien inventé.
   */
  reference_url: string | null;
  note: string | null;
};

export type DossierSource = {
  id: string;
  spectrum: PoliticalSpectrum;
  source_name: string;
  author_or_institution: string;
  /** Date ISO (AAAA-MM-JJ) ou null si la source n'en porte pas. */
  publication_date: string | null;
  quote_kind: QuoteKind;
  /** Citation exacte ou fait documenté, selon `quote_kind`. */
  exact_quote: string;
  context_explanation: string;
  original_url: string | null;
  /** Référence de l'auteur ou de l'institution (notice vérifiable), si connue. */
  author_reference_url: string | null;
  /** Chemin de la capture dans le bucket `immutable-archives`, si capturée. */
  archive_storage_path: string | null;
  /**
   * Empreinte de la citation (dérivée des champs publiés, cf. crypto.service).
   * Toujours vérifiable par un tiers : c'est l'identité publique de la preuve.
   */
  archive_sha256: string | null;
  /** Empreinte du fichier de capture, quand une capture existe. */
  archive_binary_sha256: string | null;
  display_order: number;
};

export type Dossier = {
  id: string;
  slug: string;
  claim_title: string;
  verdict: VerdictStatus;
  verdict_summary: string;
  category: DossierCategory;
  /** Personnes, organisations et textes cités par le dossier. */
  protagonists: Protagonist[];
  consensus_score: number;
  premises: Premise[];
  /** Chronologie de l'instruction (chaîne de custode), si elle est documentée. */
  timeline?: DossierTimelineEvent[];
  is_published: boolean;
  published_at: string | null;
  /** Illustration du dossier : chemin local (/illustrations/…) ou URL http(s). */
  illustration_url?: string | null;
  /** Crédit affiché sous l'illustration (auteur, licence, source). */
  illustration_credit?: string | null;
  sources: DossierSource[];
};

/** Origine des données servies : la base, ou le dossier de référence local. */
export type DataOrigin = "supabase" | "seed";

export type DataResult<T> =
  | { ok: true; origin: DataOrigin; value: T }
  | { ok: false; message: string };

/** Nombre de piliers documentés par au moins une source (calculé, lui). */
export function documentedSpectra(sources: DossierSource[]): PoliticalSpectrum[] {
  const seen: PoliticalSpectrum[] = [];
  for (const source of sources) {
    if (!seen.includes(source.spectrum)) {
      seen.push(source.spectrum);
    }
  }
  return seen;
}
