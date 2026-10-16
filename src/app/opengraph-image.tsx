import { ImageResponse } from "next/og";

export const alt = "Preuve publique — la preuve par le recoupement";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CANVAS = "#f4f1ea";
const INK = "#1c1917";
const MUTED = "#4a4843";

/**
 * Carte de partage de la maison — même « brutalisme forensique » que les
 * cartes de dossier : papier ivoire, cadre double, repères de coupe,
 * en-tête technique et bandeau encre.
 *
 * Aucun chiffre n'y figure : la carte d'accueil ne porte que la promesse du
 * site et ses quatre conditions, jamais un compteur qui pourrait vieillir.
 */
export default function HomeShareImage() {
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
            {/* En-tête technique : domaine // mention, badge de méthode. */}
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
                {"PREUVE-PUBLIQUE.FR // REGISTRE DES VÉRIFICATIONS"}
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
                TRIANGULATION
              </div>
            </div>

            {/* Corps : la promesse du site, puis la règle en une ligne. */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "40px 34px",
                gap: 26,
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 52,
                  lineHeight: 1.18,
                  color: INK,
                }}
              >
                {"La preuve ne doit pas dépendre de celui qui la porte."}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 24,
                  lineHeight: 1.3,
                  color: MUTED,
                }}
              >
                {"Chaque dossier croise archives primaires, consensus académique et sources de tout le spectre politique."}
              </div>
            </div>

            {/* Bandeau inférieur : les quatre conditions du validateur. */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: INK,
                color: CANVAS,
                padding: "16px 26px",
                fontSize: 21,
                letterSpacing: 2,
              }}
            >
              <div style={{ display: "flex" }}>
                {"01 PREUVE PRIMAIRE · 02 CONSENSUS ACADÉMIQUE · 03 DEUX BORDS · 04 EMPREINTES SHA-256"}
              </div>
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
