"use client";

import { BadgeCheck, Search, ShieldAlert, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import { pieceCode } from "@/lib/labels";
import {
  scrambleFrame,
  truncateHash,
  verificationTarget,
  verifyPiece,
} from "@/lib/archive-verification";
import type { DossierSource } from "@/lib/types";

/** Durée de l'effet de terminal, même quand le calcul est plus rapide. */
const MIN_DELAY = 400;
const FRAME_MS = 42;

type BadgeState = "idle" | "checking" | "verified" | "divergent" | "unavailable";

/**
 * Scellé d'archive d'une pièce : l'empreinte abrégée (a3f8b9…2e1c) et un bouton
 * « Vérifier l'intégrité » qui rejoue la vérification **dans le navigateur du
 * lecteur** — rehachage des octets de la capture au miroir `immutable-archives`
 * quand elle est déposée, sinon de la chaîne canonique de la citation.
 *
 * Pendant la vérification (≈ 400 ms), le terminal déroule l'empreinte en JetBrains
 * Mono : les caractères partent en désordre et se fixent de gauche à droite. La
 * dernière image est toujours l'empreinte réelle — pas d'hexadécimal de décor.
 *
 * Sans empreinte enregistrée, l'état est neutre et le dit : rien à vérifier.
 * Sans WebCrypto (contexte non sécurisé), la vérification s'arrête et l'écrit.
 */
export default function ArchiveHashBadge({
  source,
  order,
}: {
  source: DossierSource;
  order: number;
}) {
  const target = verificationTarget(source);
  const targetHash = target.kind === "none" ? "" : target.sha256;

  const [state, setState] = useState<BadgeState>("idle");
  const [display, setDisplay] = useState(targetHash);
  const [kind, setKind] = useState<"capture" | "citation" | null>(null);
  const [note, setNote] = useState<string | null>(null);

  /* Brouillage du terminal : aucune donnée inventée, seulement une transition
     vers l'empreinte réelle (désactivée si l'utilisateur réduit les animations). */
  useEffect(() => {
    if (state !== "checking" || targetHash === "") {
      return;
    }
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(targetHash);
      return;
    }
    const started = Date.now();
    const timer = window.setInterval(() => {
      const progress = Math.min(1, (Date.now() - started) / MIN_DELAY);
      setDisplay(scrambleFrame(targetHash, Math.floor(progress * targetHash.length)));
      if (progress >= 1) {
        window.clearInterval(timer);
      }
    }, FRAME_MS);
    return () => window.clearInterval(timer);
  }, [state, targetHash]);

  async function check() {
    setState("checking");
    setKind(null);
    setNote(null);
    const started = Date.now();
    const outcome = await verifyPiece(source);
    const elapsed = Date.now() - started;
    if (elapsed < MIN_DELAY) {
      await new Promise((resolve) => setTimeout(resolve, MIN_DELAY - elapsed));
    }
    setDisplay(targetHash);
    if (outcome.status === "verified") {
      setState("verified");
      setKind(outcome.kind);
      return;
    }
    if (outcome.status === "divergent") {
      setState("divergent");
      setKind(outcome.kind);
      setNote(`empreinte recalculée : ${outcome.computed.slice(0, 16)}…`);
      return;
    }
    if (outcome.status === "unavailable") {
      setState("unavailable");
      setNote(outcome.reason);
      return;
    }
    setState("unavailable");
    setNote("aucune empreinte enregistrée");
  }

  /* Rien à vérifier : état neutre discret, et il dit ce qu'il dit. */
  if (target.kind === "none") {
    return (
      <p className="flex flex-wrap items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
        <ShieldAlert size={13} aria-hidden="true" />
        [PIÈCE EN ATTENTE DE DÉPÔT STORAGE — AUCUNE EMPREINTE]
      </p>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
          <ShieldCheck size={13} aria-hidden="true" />
          {pieceCode(order)}
        </span>
        <span className="break-all font-mono text-[12px] text-ink" title={targetHash}>
          sha256:{state === "checking" ? display : truncateHash(targetHash)}
        </span>
        <button
          type="button"
          onClick={() => void check()}
          disabled={state === "checking"}
          className="inline-flex min-h-[44px] items-center gap-2 border border-grid px-3 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-ink transition hover:bg-surface disabled:opacity-60"
        >
          <Search size={13} aria-hidden="true" />
          Vérifier l&apos;intégrité
        </button>
      </div>

      <p
        role="status"
        /* `break-all` : pendant la vérification, le terminal déroule 64 caractères
           sans espace — sans lui, la ligne élargit la page sur téléphone. */
        className={`break-all font-mono text-[12px] leading-relaxed ${
          state === "verified"
            ? "text-truebd"
            : state === "divergent"
              ? "text-false"
              : "text-muted"
        }`}
      >
        {state === "idle" ? (
          <span>
            {target.kind === "capture"
              ? "Octets de la capture déposée au miroir immutable-archives."
              : "Chaîne canonique des quatre champs publiés (pas de capture déposée)."}
          </span>
        ) : state === "checking" ? (
          <span className="pp-caret">
            vérification… {display.slice(0, Math.max(0, display.length))}
          </span>
        ) : state === "verified" ? (
          <span>
            {`[✓ HASH SHA-256 VÉRIFIÉ — ${kind === "capture" ? "IMMUTABLE" : "CITATION CANONIQUE"}]`}
          </span>
        ) : state === "divergent" ? (
          <span>
            [DIVERGENCE — {kind === "capture" ? "la capture" : "la citation"} ne redonne pas
            l&apos;empreinte publiée{note === null ? "" : ` · ${note}`}] — signalez ce dossier.
          </span>
        ) : (
          <span>[VÉRIFICATION IMPOSSIBLE — {note ?? "raison inconnue"}]</span>
        )}
      </p>
    </div>
  );
}
