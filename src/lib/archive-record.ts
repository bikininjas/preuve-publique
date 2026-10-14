import { canonicalProofText } from "./canonical.ts";
import type { Dossier, DossierSource } from "./types.ts";

/**
 * Fiche d'archive canonique d'une pièce.
 *
 * C'est le document qui est déposé dans le bucket `immutable-archives` : il
 * atteste, à une date donnée, ce que le site publiait pour cette source. Il est
 * déterministe (mêmes entrées → mêmes octets), normalisé en Unicode NFC, et son
 * empreinte SHA-256 est calculée sur les octets exacts du fichier — donc
 * vérifiable par quiconque le retélécharge.
 *
 * Ce qu'une fiche **ne** prouve pas : que le document d'origine dit bien cela.
 * Elle prouve que la citation publiée n'a pas bougé depuis la capture. C'est
 * écrit dans la fiche elle-même.
 */

export const ARCHIVE_RECORD_SCHEMA = "preuve-publique/archive-record/v1";

export type CaptureOutcome =
  | { kind: "METADATA_ONLY"; reason: string }
  | {
      kind: "URL_SNAPSHOT";
      url: string;
      status: number;
      contentType: string | null;
      bytes: number;
      sha256: string;
    }
  | { kind: "URL_UNAVAILABLE"; url: string; reason: string };

export type ArchiveRecordInput = {
  dossier: Pick<Dossier, "id" | "slug" | "claim_title" | "verdict">;
  source: DossierSource;
  capturedAt: string;
  outcome: CaptureOutcome;
};

function nfc(value: string): string {
  return value.normalize("NFC");
}

/** Chemin du dépôt : un dossier par dossier, un fichier par pièce. */
export function archiveRecordPath(
  dossier: Pick<Dossier, "slug">,
  source: Pick<DossierSource, "id">,
): string {
  const safeSlug = nfc(dossier.slug).replace(/[^a-z0-9-]/g, "-");
  const safeId = nfc(source.id).replace(/[^a-z0-9-]/g, "-");
  return `${safeSlug}/${safeId}.json`;
}

/**
 * Construit la fiche. L'ordre des clés est fixe : deux exécutions sur la même
 * pièce produisent exactement les mêmes octets, donc la même empreinte.
 */
export function buildArchiveRecord(input: ArchiveRecordInput): {
  path: string;
  content: string;
} {
  const { dossier, source, capturedAt, outcome } = input;
  const record = {
    schema: ARCHIVE_RECORD_SCHEMA,
    captured_at: nfc(capturedAt),
    dossier: {
      id: nfc(dossier.id),
      slug: nfc(dossier.slug),
      claim_title: nfc(dossier.claim_title),
      verdict: dossier.verdict,
    },
    source: {
      id: nfc(source.id),
      spectrum: source.spectrum,
      quote_kind: source.quote_kind,
      source_name: nfc(source.source_name),
      author_or_institution: nfc(source.author_or_institution),
      publication_date: source.publication_date === null ? null : nfc(source.publication_date),
      exact_quote: nfc(source.exact_quote),
      context_explanation: nfc(source.context_explanation),
      original_url: source.original_url === null ? null : nfc(source.original_url),
      display_order: source.display_order,
    },
    citation: {
      canonical_text: canonicalProofText(source),
      sha256: source.archive_sha256,
    },
    capture: outcome,
    limits: [
      "Cette fiche atteste ce que le site publiait à la date de capture.",
      "Elle ne prouve pas à elle seule que le document d'origine dit bien cela.",
      "L'empreinte de la citation (champ citation.sha256) se recalcule à partir des champs source.* de cette fiche.",
    ],
  };
  return {
    path: archiveRecordPath(dossier, source),
    content: `${JSON.stringify(record, null, 2)}\n`,
  };
}
