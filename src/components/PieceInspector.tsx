"use client";

import { Search, ShieldCheck, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Caviard } from "@/components/BlindModeSwitch";
import {
  QUOTE_KIND_LABELS,
  SPECTRUM_CODES,
  SPECTRUM_LABELS,
  formatDate,
  pieceCode,
} from "@/lib/labels";
import { VERBATIM_MARKER, excerptClasses, excerptText, isVerbatim } from "@/lib/piece-excerpt";
import type { DossierSource } from "@/lib/types";

/**
 * Table lumineuse d'une pièce : l'extrait officiel agrandi, sa nature (citation
 * exacte ou fait documenté), son origine et les empreintes qui l'accompagnent.
 *
 * L'extrait suit exactement le traitement de la carte (`piece-excerpt.ts`) : le
 * papier d'archive pour toute pièce, le trait de surligneur pour le seul
 * verbatim. Ce qui n'existe pas est dit tel quel — une empreinte absente
 * s'affiche « non enregistrée », jamais masquée.
 *
 * La boîte se ferme par son bouton, la touche Échap ou un clic sur le fond :
 * le focus part dans la boîte à l'ouverture et revient au bouton à la
 * fermeture. Elle est montée dans `document.body` (portail) : dans `<main>`
 * (contexte d'empilement `z-index: 1`), l'en-tête collant la recouvrait et
 * captait les clics de sa bande.
 */
export default function PieceInspector({
  source,
  order,
}: {
  source: DossierSource;
  order: number;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const closer = useRef<HTMLButtonElement | null>(null);

  const verbatim = isVerbatim(source.quote_kind);
  const titleId = `table-lumineuse-titre-${source.id}`;

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closer.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      /* Le focus revient au bouton d'origine : jamais perdu après fermeture. */
      trigger.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 border border-grid px-3 py-2 font-mono text-[13px] uppercase tracking-[0.12em] text-ink transition hover:bg-surface"
      >
        <Search size={13} aria-hidden="true" />
        Inspecter la pièce
      </button>

      {open ? (
        createPortal(
        <div
          className="pp-lightbox"
          onClick={(event) => {
            /* Clic extérieur : le fond n'est cliquable que lui-même. */
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="pp-lightbox__panel">
            <div className="flex items-center justify-between gap-3 border-b border-grid px-4 py-3">
              <p
                id={titleId}
                className="font-mono text-[13px] uppercase tracking-[0.16em] text-ink"
              >
                Table lumineuse — {pieceCode(order)}
              </p>
              <button
                ref={closer}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer la table lumineuse"
                className="flex h-11 w-11 shrink-0 items-center justify-center border border-grid text-ink transition hover:bg-surface2"
              >
                <X size={15} aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-4 px-4 py-4">
              <div>
                <blockquote
                  className={`border-l-4 pl-3 font-serif text-xl leading-snug text-ink ${
                    verbatim ? "border-warn" : "border-gridsoft"
                  }`}
                >
                  <span className={excerptClasses(source.quote_kind)}>
                    <span className={verbatim ? VERBATIM_MARKER : undefined}>
                      {excerptText(source.quote_kind, source.exact_quote)}
                    </span>
                  </span>
                </blockquote>
                <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                  {QUOTE_KIND_LABELS[source.quote_kind]} · {SPECTRUM_CODES[source.spectrum]}{" "}
                  {SPECTRUM_LABELS[source.spectrum]} · {formatDate(source.publication_date)}
                </p>
              </div>

              <dl className="grid gap-3 border-t border-gridsoft pt-3 font-mono text-[12px] leading-relaxed sm:grid-cols-2">
                <div>
                  <dt className="uppercase tracking-[0.14em] text-muted">Pièce</dt>
                  <dd className="mt-1 text-ink">
                    <Caviard>{source.source_name}</Caviard>
                  </dd>
                </div>
                <div>
                  <dt className="uppercase tracking-[0.14em] text-muted">Auteur ou institution</dt>
                  <dd className="mt-1 text-ink">
                    <Caviard label="[INSTITUTION MASQUÉE]">{source.author_or_institution}</Caviard>
                  </dd>
                </div>
                <div>
                  <dt className="uppercase tracking-[0.14em] text-muted">Document d&apos;origine</dt>
                  <dd className="mt-1">
                    {source.original_url ? (
                      <a
                        className="break-all text-seal hover:underline"
                        href={source.original_url}
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        {source.original_url}
                      </a>
                    ) : (
                      <span className="text-muted">URL à documenter</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="uppercase tracking-[0.14em] text-muted">Référence de l&apos;auteur</dt>
                  <dd className="mt-1">
                    {source.author_reference_url ? (
                      <a
                        className="break-all text-seal hover:underline"
                        href={source.author_reference_url}
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        notice vérifiable →
                      </a>
                    ) : (
                      <span className="text-muted">aucune notice vérifiable</span>
                    )}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gridsoft pt-3">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                  Pourquoi cette pièce compte
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {source.context_explanation}
                </p>
              </div>

              <div className="space-y-2 border-t border-gridsoft pt-3">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                  Empreintes
                </p>
                {source.archive_sha256 ? (
                  <p className="break-all font-mono text-[12px] leading-relaxed text-ink">
                    citation — sha256:{source.archive_sha256}
                  </p>
                ) : (
                  <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
                    empreinte de citation non enregistrée
                  </p>
                )}
                {source.archive_binary_sha256 ? (
                  <p className="break-all font-mono text-[12px] leading-relaxed text-ink">
                    capture — sha256:{source.archive_binary_sha256}
                  </p>
                ) : (
                  <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
                    aucune capture déposée
                  </p>
                )}
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] uppercase tracking-[0.1em]">
                  {source.archive_storage_path ? (
                    <span className="inline-flex items-center gap-2 text-true">
                      <ShieldCheck size={12} aria-hidden="true" />
                      capture archivée
                    </span>
                  ) : null}
                  {source.archive_binary_sha256 ? (
                    <a
                      className="text-seal hover:underline"
                      href={`/api/archives/${source.archive_binary_sha256}`}
                    >
                      fiche d&apos;archive →
                    </a>
                  ) : null}
                  {source.archive_sha256 ? (
                    <a
                      className="text-seal hover:underline"
                      href={`/api/verify/${source.archive_sha256}`}
                    >
                      vérifier la citation →
                    </a>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
        </div>,
          document.body,
        )
      ) : null}
    </>
  );
}
