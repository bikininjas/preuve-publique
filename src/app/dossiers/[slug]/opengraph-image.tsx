import { ImageResponse } from "next/og";

import { getPublishedDossier } from "@/server/services/dossier.service";
import {
  CATEGORY_LABELS,
  SPECTRUM_CODES,
  SPECTRUM_ORDER,
  VERDICT_STAMPS,
  VERDICT_TONES,
  dossierCode,
} from "@/lib/labels";
import type { VerdictStatus } from "@/lib/types";

export const alt = "Carte de partage d'un dossier vérifié — Preuve publique";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

const CANVAS = "#f4f1ea";
const INK = "#0d0e11";
const MUTED = "#4a4843";
const GRID = "#1a1917";
const FAUX = "#c81e1e";
const TRUE = "#047857";
const AMBER = "#b45309";
const SEAL = "#1d4ed8";

/** Teinte du tampon : la même règle que sur le site, un « vrai » n'est pas rouge. */
function verdictColor(verdict: VerdictStatus | undefined): string {
  if (verdict === undefined) {
    return MUTED;
  }
  const tone = VERDICT_TONES[verdict];
  return tone === "true" ? TRUE : tone === "warn" ? AMBER : FAUX;
}

/**
 * Carte de partage « papier d'archive » : grille suisse, affirmation en grand,
 * tampon de verdict, barre des six piliers.
 *
 * Limitée au jeu de polices embarqué par `next/og` (satori) : la typographie
 * serif du site n'est pas reproduite ici — l'embarquer demanderait de versionner
 * un fichier de police pour l'image.
 */
export default async function ShareImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getPublishedDossier(slug);
  const dossier = result.ok ? result.value : null;

  const title = dossier?.claim_title ?? "Dossier introuvable";
  const stamp = dossier ? VERDICT_STAMPS[dossier.verdict] : "—";
  const score = dossier?.consensus_score ?? 0;
  const counts = SPECTRUM_ORDER.map((spectrum) => ({
    code: SPECTRUM_CODES[spectrum],
    count: dossier
      ? dossier.sources.filter((source) => source.spectrum === spectrum).length
      : 0,
  }));
  const pieceCount = dossier?.sources.length ?? 0;
  const withHash = dossier?.sources.filter((source) => source.archive_sha256 !== null).length ?? 0;
  const category = dossier ? CATEGORY_LABELS[dossier.category] : "SANS CATÉGORIE";
  const code = dossier ? dossierCode(dossier.id) : "PP-—";
  const filledPillars = counts.filter((column) => column.count > 0).length;
  const stampColor = verdictColor(dossier?.verdict);
  /* L'empreinte n'est annoncée que si elle existe : une carte de partage ne
     promet pas une archive que le dossier n'a pas. */
  const hashLabel =
    withHash === 0
      ? "EMPREINTES À VENIR"
      : withHash === pieceCount
        ? `SHA-256 SUR LES ${pieceCount} PIÈCES`
        : `${withHash}/${pieceCount} PIÈCES AVEC EMPREINTE`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: CANVAS,
          color: INK,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: `2px solid ${GRID}`,
            padding: "18px 40px",
            fontSize: 18,
            letterSpacing: 3,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>REGISTRE DES VÉRIFICATIONS</div>
          <div
              style={{
                display: "flex",
                border: `2px solid ${SEAL}`,
                color: SEAL,
                padding: "6px 16px",
                fontSize: 20,
                letterSpacing: 4,
              }}
            >
              {category.toUpperCase()}
            </div>
            <div style={{ display: "flex", fontSize: 16, letterSpacing: 2 }}>
              {`REGISTRE N° ${code}`}
            </div>
        </div>

        <div style={{ display: "flex", flex: 1, flexDirection: "column", padding: "36px 40px", gap: 24 }}>
          <div
            style={{
              display: "flex",
              border: `2px solid ${stampColor}`,
              boxShadow: `inset 0 0 0 2px ${CANVAS}, inset 0 0 0 4px ${stampColor}`,
              color: stampColor,
              padding: "8px 20px",
              fontSize: 30,
              letterSpacing: 4,
              alignSelf: "flex-start",
              transform: "rotate(-1.5deg)",
            }}
          >
            {stamp}
          </div>
          <div style={{ display: "flex", fontSize: 66, lineHeight: 1.08, color: INK }}>
            {title.length > 92 ? `${title.slice(0, 91)}…` : title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", fontSize: 22, color: MUTED }}>
              {`Consensus du dossier : ${score}% · ${pieceCount} pièces · ${filledPillars}/6 piliers`}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  height: 22,
                  border: `2px solid ${GRID}`,
                  backgroundColor: CANVAS,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: `${Math.max(0, Math.min(100, score))}%`,
                    height: "100%",
                    backgroundColor: INK,
                  }}
                />
              </div>
              <div style={{ display: "flex", fontSize: 20, color: INK, letterSpacing: 2 }}>
                {`${score}%`}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "0 40px 34px" }}>
          <div style={{ display: "flex", height: 2, backgroundColor: GRID }} />
          <div style={{ display: "flex", gap: 10 }}>
            {counts.map((column) => (
              <div
                key={column.code}
                style={{
                  display: "flex",
                  flex: 1,
                  height: 26,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: column.count > 0 ? TRUE : CANVAS,
                  border: `1px solid ${column.count > 0 ? TRUE : MUTED}`,
                  color: column.count > 0 ? CANVAS : MUTED,
                  fontSize: 14,
                  letterSpacing: 2,
                }}
              >
                {column.code}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                border: `2px solid ${withHash > 0 ? SEAL : MUTED}`,
                color: withHash > 0 ? SEAL : MUTED,
                padding: "6px 14px",
                fontSize: 16,
                letterSpacing: 3,
              }}
            >
              {hashLabel}
            </div>
            <div style={{ display: "flex", fontSize: 18, color: MUTED, letterSpacing: 1 }}>
              {`/dossiers/${slug}`}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
