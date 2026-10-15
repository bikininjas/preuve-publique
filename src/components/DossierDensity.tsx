"use client";

import { useState } from "react";

/**
 * Commutateur de densité. Le dossier complet reste la vue par défaut — un site
 * de preuves ne cache pas ses pièces — mais un lecteur pressé, souvent sur
 * téléphone, doit pouvoir lire l'essentiel en trente secondes.
 *
 * Les deux vues sont rendues par le serveur ; ce composant ne fait que choisir
 * laquelle afficher. Sans JavaScript, la vue complète s'affiche.
 */
export default function DossierDensity({
  synthesis,
  children,
  piecesTotal,
}: {
  synthesis: React.ReactNode;
  children: React.ReactNode;
  piecesTotal: number;
}) {
  const [density, setDensity] = useState<"complet" | "synthese">("complet");

  return (
    <div className="space-y-4">
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Densité du dossier"
      >
        <button
          type="button"
          className="pp-btn"
          data-active={density === "synthese" ? "true" : "false"}
          aria-pressed={density === "synthese"}
          onClick={() => setDensity("synthese")}
        >
          Vue synthèse (30 s)
        </button>
        <button
          type="button"
          className="pp-btn pp-btn--ink"
          data-active={density === "complet" ? "true" : "false"}
          aria-pressed={density === "complet"}
          onClick={() => setDensity("complet")}
        >
          Dossier complet ({piecesTotal} pièces)
        </button>
      </div>

      <div hidden={density !== "synthese"}>{synthesis}</div>
      <div hidden={density !== "complet"}>{children}</div>
    </div>
  );
}
