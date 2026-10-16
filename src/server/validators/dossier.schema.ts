import { z } from "zod";

import type { Dossier, DossierSource, PoliticalSpectrum } from "../../lib/types.ts";
import {
  SHA256_PATTERN,
  computeCanonicalProofHash,
} from "../services/crypto.service.ts";

/**
 * Validation stricte des dossiers — le « Triangulation Guard ».
 *
 * C'est ici que l'impartialité est forcée par le code et non promise : un
 * dossier ne peut pas être publié (`is_published: true`) s'il ne réunit pas la
 * règle de triangulation minimale. Le validateur est appelé par le pipeline de
 * publication ; un dossier refusé est refusé avec un motif explicite, jamais
 * publié « en attendant ».
 *
 * Les quatre conditions (toutes obligatoires) :
 *   1. preuve primaire : au moins une source ARCHIVE_PRIMAIRE ou
 *      DONNEES_BRUTES_OFFICIELLES ;
 *   2. validation académique : au moins une source CONSENSUS_ACADEMIQUE ;
 *   3. pluralisme politique : au moins deux spectres distincts parmi GAUCHE,
 *      CENTRE, DROITE_LIBERALE_CONSERVATRICE ;
 *   4. intégrité : chaque source porte une empreinte SHA-256 valide et une
 *      citation non vide.
 *
 * Limite assumée : la règle ne s'applique qu'au chemin de publication logiciel
 * (scripts, et demain l'espace de rédaction). Une écriture directe en base par
 * une connexion privilégiée la contournerait ; c'est précisément pourquoi la
 * lecture publique, elle, ne dépend que du RLS.
 */

export const VERDICT_VALUES = [
  "VRAI",
  "FAUX",
  "TROMPEUR",
  "INSTRUMENTALISATION_SEMANTIQUE",
  "HORS_CONTEXTE",
  "ANACHRONISME_HISTORIQUE",
  "GENERALISATION_ABUSIVE",
] as const;

export const SPECTRUM_VALUES = [
  "ARCHIVE_PRIMAIRE",
  "CONSENSUS_ACADEMIQUE",
  "GAUCHE",
  "CENTRE",
  "DROITE_LIBERALE_CONSERVATRICE",
  "DONNEES_BRUTES_OFFICIELLES",
] as const;

export const PREMISE_STATUS_VALUES = [
  "VRAI",
  "VRAI_DETOURNE",
  "CONFUSION_CONCEPTUELLE",
  "ANACHRONISME_CONCEPTUEL",
  "DOUBLE_STANDARD",
  "BIAIS_METHODOLOGIQUE",
  "BIAIS_DE_SELECTION",
  "FAUX",
] as const;

export const QUOTE_KIND_VALUES = ["CITATION_EXACTE", "FAIT_DOCUMENTE"] as const;

export const CATEGORY_VALUES = [
  "HISTOIRE",
  "POLITIQUE",
  "ECONOMIE",
  "SOCIETE",
  "FAITS_DIVERS",
  "SANTE",
  "ENVIRONNEMENT",
  "INTERNATIONAL",
  "RELIGION",
] as const;

const sha256Schema = z
  .string()
  .regex(SHA256_PATTERN, "empreinte SHA-256 attendue : 64 caractères hexadécimaux minuscules");

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "date attendue au format AAAA-MM-JJ");

const urlSchema = z.string().regex(/^https?:\/\//, "URL http(s) attendue");

export const premiseSchema = z.object({
  claim_part: z.string().trim().min(1, "brique d'affirmation vide"),
  status: z.enum(PREMISE_STATUS_VALUES),
  detail: z.string().trim().min(1, "explication vide"),
});

export const PROTAGONIST_KIND_VALUES = ["PERSONNE", "ORGANISATION", "LIEU", "TEXTE"] as const;
export const PROTAGONIST_ROLE_VALUES = ["SUJET", "AUTEUR"] as const;

export const protagonistSchema = z.object({
  name: z.string().trim().min(1, "nom de protagoniste vide"),
  kind: z.enum(PROTAGONIST_KIND_VALUES),
  role: z.enum(PROTAGONIST_ROLE_VALUES),
  reference_url: urlSchema.nullable(),
  note: z.string().trim().min(1).nullable(),
});

export const dossierSourceSchema = z.object({
  id: z.string().trim().min(1),
  spectrum: z.enum(SPECTRUM_VALUES),
  source_name: z.string().trim().min(1, "nom de source vide"),
  author_or_institution: z.string().trim().min(1, "auteur ou institution vide"),
  publication_date: dateSchema.nullable(),
  quote_kind: z.enum(QUOTE_KIND_VALUES),
  exact_quote: z.string().trim().min(1, "citation vide"),
  context_explanation: z.string().trim().min(1),
  original_url: urlSchema.nullable(),
  author_reference_url: urlSchema.nullable(),
  archive_storage_path: z.string().trim().min(1).nullable(),
  archive_sha256: sha256Schema.nullable(),
  archive_binary_sha256: sha256Schema.nullable(),
  display_order: z.number().int().min(0),
});

export const dossierSchema = z
  .object({
    id: z.string().trim().min(1),
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug en minuscules, chiffres et tirets"),
    claim_title: z.string().trim().min(1),
    verdict: z.enum(VERDICT_VALUES),
    verdict_summary: z.string().trim().min(1),
    category: z.enum(CATEGORY_VALUES),
    protagonists: z.array(protagonistSchema),
    consensus_score: z.number().int().min(0).max(100),
    premises: z.array(premiseSchema),
    is_published: z.boolean(),
    published_at: z.string().min(1).nullable(),
    sources: z.array(dossierSourceSchema),
  })
  .superRefine(validateTriangulationRules);

export type DossierInput = z.infer<typeof dossierSchema>;

export type TriangulationIssue = { code: string; message: string };

const PRIMARY_SPECTRA: PoliticalSpectrum[] = [
  "ARCHIVE_PRIMAIRE",
  "DONNEES_BRUTES_OFFICIELLES",
];

const POLITICAL_SPECTRA: PoliticalSpectrum[] = [
  "GAUCHE",
  "CENTRE",
  "DROITE_LIBERALE_CONSERVATRICE",
];

/**
 * Les quatre conditions, évaluées séparément de Zod pour être lisibles par un
 * humain (et testables une par une).
 */
export function triangulationIssues(dossier: DossierInput): TriangulationIssue[] {
  const issues: TriangulationIssue[] = [];

  if (!dossier.is_published) {
    return issues;
  }

  const spectra = dossier.sources.map((source) => source.spectrum);

  if (!spectra.some((spectrum) => PRIMARY_SPECTRA.includes(spectrum))) {
    issues.push({
      code: "TRIANGULATION_PRIMARY_REQUIRED",
      message:
        "aucune preuve primaire : il faut au moins une source ARCHIVE_PRIMAIRE ou DONNEES_BRUTES_OFFICIELLES.",
    });
  }

  if (!spectra.includes("CONSENSUS_ACADEMIQUE")) {
    issues.push({
      code: "TRIANGULATION_ACADEMIC_REQUIRED",
      message:
        "aucune validation académique : il faut au moins une source CONSENSUS_ACADEMIQUE.",
    });
  }

  const political = new Set(
    spectra.filter((spectrum) => POLITICAL_SPECTRA.includes(spectrum)),
  );
  if (political.size < 2) {
    issues.push({
      code: "TRIANGULATION_PLURALISM_REQUIRED",
      message:
        "pluralisme insuffisant : au moins deux spectres distincts parmi GAUCHE, CENTRE et DROITE_LIBERALE_CONSERVATRICE sont requis.",
    });
  }

  dossier.sources.forEach((source, index) => {
    if (source.archive_sha256 === null || !SHA256_PATTERN.test(source.archive_sha256)) {
      issues.push({
        code: "TRIANGULATION_PROOF_HASH_REQUIRED",
        message: `source ${index + 1} (${source.source_name}) sans empreinte SHA-256 valide.`,
      });
    }
    if (source.exact_quote.trim().length === 0) {
      issues.push({
        code: "TRIANGULATION_QUOTE_REQUIRED",
        message: `source ${index + 1} (${source.source_name}) sans citation.`,
      });
    }
  });

  if (dossier.published_at === null) {
    issues.push({
      code: "TRIANGULATION_PUBLISHED_AT_REQUIRED",
      message: "un dossier publié doit porter une date de publication.",
    });
  }

  return issues;
}

export function validateTriangulationRules(
  dossier: DossierInput,
  ctx: z.RefinementCtx,
): void {
  for (const issue of triangulationIssues(dossier)) {
    ctx.addIssue({ code: "custom", message: `${issue.code} — ${issue.message}` });
  }
}

/**
 * Remplit l'empreinte dérivée de chaque source avant validation ou écriture :
 * `archive_sha256` reste l'identité publique de la preuve (calculée sur les
 * champs publiés), l'empreinte d'une éventuelle capture binaire est combinée.
 */
export function withDerivedProofHashes(dossier: Dossier): Dossier {
  return {
    ...dossier,
    sources: dossier.sources.map((source) => ({
      ...source,
      archive_binary_sha256: source.archive_binary_sha256 ?? null,
      archive_sha256:
        source.archive_sha256 ??
        computeCanonicalProofHash(source, source.archive_binary_sha256 ?? null),
    })),
  };
}

/** Normalise puis valide un dossier destiné à la publication. */
export function assertPublishableDossier(value: unknown): DossierInput {
  const normalized = withDerivedProofHashes(value as Dossier);
  const parsed = dossierSchema.safeParse(normalized);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `- ${issue.path.join(".") || "(racine)"} : ${issue.message}`)
      .join("\n");
    throw new Error(`Dossier refusé par le validateur de triangulation :\n${details}`);
  }
  return parsed.data;
}

/** Contrôle rapide des empreintes d'une liste de sources (endpoint d'audit). */
export function sourceFingerprint(source: DossierSource): string {
  return computeCanonicalProofHash(source, source.archive_binary_sha256);
}
