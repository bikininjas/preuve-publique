"use client";

import { Fingerprint, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

import { Caviard } from "@/components/BlindModeSwitch";
import {
  QUOTE_KIND_LABELS,
  SPECTRUM_CODES,
  SPECTRUM_LABELS,
  formatDate,
  pieceCode,
} from "@/lib/labels";
import { browserSha256, canonicalProofText } from "@/lib/canonical";
import type { DossierSource } from "@/lib/types";

type AuditState = "idle" | "running" | "match" | "mismatch" | "unavailable";

/**
 * Pièce à conviction : la fiche d'archive d'une source.
 *
 * Le pied de carte propose un audit que le lecteur exécute lui-même : le
 * navigateur recalcule l'empreinte SHA-256 de la citation affichée et la compare
 * à celle publiée. C'est le seul badge d'intégrité qui vaut — celui qu'on a
 * calculé soi-même.
 */
export default function EvidenceCard({
  source,
  order,
}: {
  source: DossierSource;
  order: number;
}) {
  const [audit, setAudit] = useState<AuditState>("idle");
  const [localHash, setLocalHash] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const canonical = canonicalProofText(source);

  async function runAudit() {
    setAudit("running");
    setLocalHash(null);
    setOpen(true);
    const started = Date.now();
    const computed = await browserSha256(canonical);
    const elapsed = Date.now() - started;
    if (elapsed < 400) {
      await new Promise((resolve) => setTimeout(resolve, 400 - elapsed));
    }
    if (computed === null) {
      setAudit("unavailable");
      return;
    }
    setLocalHash(computed);
    setAudit(
      source.archive_sha256 !== null && computed === source.archive_sha256
        ? "match"
        : "mismatch",
    );
  }

  const isQuote = source.quote_kind === "CITATION_EXACTE";

  return (
    <article className="border border-grid bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gridsoft px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        <span className="flex items-center gap-3">
          <span className="border border-grid px-2 py-0.5 text-ink">
            {pieceCode(order)}
          </span>
          <span className="text-seal">{SPECTRUM_CODES[source.spectrum]}</span>
        </span>
        <span className="flex items-center gap-3">
          <span>{QUOTE_KIND_LABELS[source.quote_kind]}</span>
          <span className="text-ink">{formatDate(source.publication_date)}</span>
        </span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(220px,280px)]">
        <div className="border-gridsoft px-4 py-5 sm:px-6 lg:border-r">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            <Caviard label="[PILIER MASQUÉ]">{SPECTRUM_LABELS[source.spectrum]}</Caviard>
          </p>

          <blockquote
            className={`mt-3 border-l-4 pl-4 font-serif text-lg leading-relaxed text-ink ${
              isQuote ? "border-warn" : "border-gridsoft"
            }`}
          >
            <span className={isQuote ? "pp-surlignage" : undefined}>
              {isQuote ? `« ${source.exact_quote} »` : source.exact_quote}
            </span>
          </blockquote>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            {source.context_explanation}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-4 bg-surface2 px-4 py-5 sm:px-6">
          <div className="space-y-1 font-mono text-[11px] leading-relaxed text-muted">
            <p className="text-ink">
              <Caviard>{source.source_name}</Caviard>
            </p>
            <p>
              <Caviard label="[INSTITUTION MASQUÉE]">
                {source.author_or_institution}
              </Caviard>
            </p>
          </div>

          <div className="space-y-2">
            {source.archive_sha256 ? (
              <>
                <p
                  className="break-all font-mono text-[10px] leading-relaxed text-ink"
                  title={source.archive_sha256}
                >
                  sha256:{source.archive_sha256.slice(0, 24)}…
                </p>
                <button
                  type="button"
                  onClick={runAudit}
                  className="inline-flex w-full items-center justify-center gap-2 border border-grid px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink transition hover:bg-surface"
                >
                  <Fingerprint size={12} aria-hidden="true" />
                  Auditer la preuve (WebCrypto)
                </button>
              </>
            ) : (
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                empreinte non enregistrée
              </p>
            )}

            {source.archive_storage_path ? (
              <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-true">
                <ShieldCheck size={12} aria-hidden="true" />
                capture archivée
              </p>
            ) : (
              <p
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
                title="Aucune capture n'a été déposée : le site n'annonce pas d'archive qui n'existe pas."
              >
                capture à venir
              </p>
            )}

            {source.original_url ? (
              <a
                className="block font-mono text-[10px] uppercase tracking-[0.12em] text-seal hover:underline"
                href={source.original_url}
                rel="noreferrer noopener"
                target="_blank"
              >
                document d&apos;origine →
              </a>
            ) : (
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                URL d&apos;origine à documenter
              </p>
            )}
          </div>
        </div>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Audit de l'empreinte"
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center"
        >
          <div className="w-full max-w-2xl border-2 border-grid bg-surface">
            <div className="flex items-center justify-between border-b border-grid px-4 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
                Audit cryptographique — {pieceCode(order)}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="border border-grid px-2 py-1 text-ink transition hover:bg-surface2"
              >
                <X size={13} aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-4 px-4 py-4">
              <div
                className={`relative overflow-hidden border px-3 py-2 font-mono text-[10px] leading-relaxed ${
                  audit === "running" ? "pp-scan border-gridsoft" : "border-gridsoft"
                }`}
              >
                <p className="text-muted">chaîne canonique soumise au hachage</p>
                <p className="mt-1 break-all text-ink">{canonical}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="border border-gridsoft px-3 py-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    Empreinte publiée (serveur)
                  </p>
                  <p className="mt-1 break-all font-mono text-[10px] text-ink">
                    {source.archive_sha256 ?? "—"}
                  </p>
                </div>
                <div className="border border-gridsoft px-3 py-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    Empreinte recalculée (votre navigateur)
                  </p>
                  <p className="mt-1 break-all font-mono text-[10px] text-ink">
                    {audit === "running" ? "calcul en cours…" : (localHash ?? "—")}
                  </p>
                </div>
              </div>

              {audit === "match" ? (
                <p className="border-2 border-truebd bg-truebg px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-truebd">
                  Intégrité confirmée localement par votre navigateur
                </p>
              ) : null}
              {audit === "mismatch" ? (
                <p className="border-2 border-falsebd bg-falsebg px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-falsebd">
                  Divergence : la citation affichée ne redonne pas l&apos;empreinte
                  publiée. Signalez ce dossier.
                </p>
              ) : null}
              {audit === "unavailable" ? (
                <p className="border border-gridsoft px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  Ce navigateur n&apos;expose pas WebCrypto : aucune vérification
                  locale n&apos;a été faite.
                </p>
              ) : null}

              <p className="font-mono text-[10px] leading-relaxed text-muted">
                Le calcul est fait par votre navigateur (
                <span className="text-ink">crypto.subtle.digest</span>), sur la
                citation affichée — aucun appel réseau. Vous pouvez comparer :
                l&apos;API publique{" "}
                <span className="text-ink">
                  /api/verify/{source.archive_sha256?.slice(0, 8) ?? "…"}
                </span>{" "}
                renvoie les mêmes métadonnées.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
