import { ImageResponse } from "next/og";

import { getPublishedDossier } from "@/server/services/dossier.service";
import { CATEGORY_LABELS, VERDICT_STAMPS, VERDICT_TONES } from "@/lib/labels";
import type { VerdictStatus } from "@/lib/types";

export const alt = "Carte de partage d'un dossier vérifié — Preuve publique";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

/**
 * Carte de partage « brutalisme forensique » : papier ivoire, cadre intérieur
 * double, repères de coupe, en-tête technique, tampon encré et bandeau noir.
 *
 * Toutes les valeurs sont celles du dossier lu à la requête — jamais un
 * chiffre de décor : la bande ne dit « certifiées » que si chaque pièce porte
 * réellement une empreinte ; sinon elle affiche le compte exact.
 *
 * Typographie : limitée au jeu de polices embarqué par `next/og` (satori) —
 * la serif du site n'est pas reproduite ici, l'embarquer demanderait de
 * versionner un fichier de police.
 */

const CANVAS = "#f4f1ea";
const INK = "#1c1917";
const MUTED = "#4a4843";
const FALSE_BD = "#991b1b";
const WARN_BD = "#92400e";
const TRUE_BD = "#065f46";

/** Encre du tampon : la règle du site — un « vrai » n'est pas tamponné en
 * rouge, l'ambre brun appartient aux verdicts nuancés et aux anachronismes. */
function verdictInk(verdict: VerdictStatus | undefined): string {
  if (verdict === undefined) {
    return MUTED;
  }
  const tone = VERDICT_TONES[verdict];
  return tone === "true" ? TRUE_BD : tone === "warn" ? WARN_BD : FALSE_BD;
}

/** Trois lignes au plus, coupe au mot : 46 px sur ~1010 px utiles ≈ 38-42
 * caractères par ligne. Un titre coupé garde ses points de suspension. */
function clampThreeLines(title: string): string {
  const budget = 122;
  if (title.length <= budget) {
    return title;
  }
  const cut = title.slice(0, budget);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 70 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

export default async function ShareImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getPublishedDossier(slug);
  const dossier = result.ok ? result.value : null;

  const title = clampThreeLines(dossier?.claim_title ?? "Dossier introuvable");
  const stamp = dossier ? VERDICT_STAMPS[dossier.verdict] : "—";
  const score = dossier?.consensus_score ?? 0;
  const pieceCount = dossier?.sources.length ?? 0;
  const withHash = dossier?.sources.filter((source) => source.archive_sha256 !== null).length ?? 0;
  const category = dossier ? CATEGORY_LABELS[dossier.category] : "SANS CATÉGORIE";
  const ink = verdictInk(dossier?.verdict);
  /* « Certifiées » ne se dit que quand chaque pièce porte une empreinte. */
  const piecesLabel =
    pieceCount === 0
      ? "AUCUNE PIÈCE PUBLIÉE"
      : withHash === pieceCount
        ? `${pieceCount} PIÈCE${pieceCount > 1 ? "S" : ""} CERTIFIÉE${pieceCount > 1 ? "S" : ""}`
        : `${withHash}/${pieceCount} PIÈCES AVEC EMPREINTE`;

  const cropMark = {
    position: "absolute" as const,
    display: "flex",
    fontSize: 26,
    lineHeight: 1,
    fontFamily: "monospace",
    color: INK,
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: CANVAS,
          color: INK,
          fontFamily: "sans-serif",
          padding: 22,
        }}
      >
        {/* Le cadre intérieur double : 4 px d'encre, puis un filet à 6 px. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            border: `4px solid ${INK}`,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              border: `2px solid ${INK}`,
              margin: 6,
            }}
          >
            {/* En-tête technique : domaine // mention, badge de catégorie. */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `2px solid ${INK}`,
                padding: "14px 26px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontFamily: "monospace",
                  fontSize: 19,
                  letterSpacing: 2,
                  color: INK,
                }}
              >
                {"PREUVE-PUBLIQUE.FR // DOSSIER D\u2019INSTRUCTION SCELLÉ"}
              </div>
              <div
                style={{
                  display: "flex",
                  border: `2px solid ${INK}`,
                  padding: "5px 16px",
                  fontSize: 20,
                  letterSpacing: 4,
                  color: INK,
                }}
              >
                {category.toUpperCase()}
              </div>
            </div>

            {/* Corps : le mythe en grand, puis le tampon de verdict. */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "30px 34px",
                gap: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 46,
                  lineHeight: 1.16,
                  color: INK,
                }}
              >
                {title}
              </div>

              {/* Le coup de tampon : cadre épais coloré, incliné, encré. */}
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  transform: "rotate(-3deg)",
                  border: `6px solid ${ink}`,
                  boxShadow: `inset 0 0 0 3px ${CANVAS}, inset 0 0 0 5px ${ink}`,
                  color: ink,
                  padding: "12px 28px",
                  fontSize: 40,
                  letterSpacing: 5,
                }}
              >
                {stamp}
              </div>
            </div>

            {/* Bandeau inférieur : convergence et pièces, sur encre pleine. */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: INK,
                color: CANVAS,
                padding: "16px 26px",
                fontSize: 24,
                letterSpacing: 3,
              }}
            >
              <div style={{ display: "flex" }}>{`CONVERGENCE DES PREUVES : ${score}%`}</div>
              <div style={{ display: "flex" }}>{piecesLabel}</div>
            </div>
          </div>
        </div>

        {/* Repères de coupe, aux quatre coins du cadre. */}
        <div style={{ ...cropMark, top: 8, left: 8 }}>+</div>
        <div style={{ ...cropMark, top: 8, right: 8 }}>+</div>
        <div style={{ ...cropMark, bottom: 8, left: 8 }}>+</div>
        <div style={{ ...cropMark, bottom: 8, right: 8 }}>+</div>
      </div>
    ),
    size,
  );
}
