"use client";

import { useEffect, useState } from "react";

import type { PoliticalSpectrum } from "@/lib/types";

/**
 * Onglets des pièces à conviction : un pilier à la fois, au lieu de six blocs
 * empilés. Sur téléphone c'est la différence entre chercher et lire.
 *
 * Les sections sont rendues par le serveur et passées en propriété : ce
 * composant ne fait que les montrer ou les masquer. Les liens du spectromètre
 * (`#pieces-<PILIER>`) sont écoutés pour ouvrir le bon onglet.
 */
export default function PiecesTabs({
  tabs,
  sections,
  total,
}: {
  tabs: { spectrum: PoliticalSpectrum; label: string; count: number }[];
  sections: { spectrum: PoliticalSpectrum; node: React.ReactNode }[];
  total: number;
}) {
  const [active, setActive] = useState<PoliticalSpectrum | "TOUS">("TOUS");

  useEffect(() => {
    const readHash = () => {
      const match = window.location.hash.match(/^#pieces-(.+)$/);
      if (match === null) {
        return;
      }
      const wanted = tabs.find((tab) => tab.spectrum === match[1]);
      if (wanted !== undefined) {
        setActive(wanted.spectrum);
      }
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, [tabs]);

  return (
    <div className="space-y-3">
      <div
        className="pp-tabs"
        role="tablist"
        aria-label="Piliers documentaires"
      >
        <button
          type="button"
          role="tab"
          aria-selected={active === "TOUS"}
          className="pp-tab"
          data-active={active === "TOUS" ? "true" : "false"}
          onClick={() => setActive("TOUS")}
        >
          Tous <span className="opacity-70">{total}</span>
        </button>
        {tabs.map((tab) => (
          <button
            key={tab.spectrum}
            type="button"
            role="tab"
            aria-selected={active === tab.spectrum}
            className="pp-tab"
            data-active={active === tab.spectrum ? "true" : "false"}
            data-empty={tab.count === 0 ? "true" : "false"}
            onClick={() => setActive(tab.spectrum)}
          >
            {tab.label}
            <span className="opacity-70"> {String(tab.count).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      {sections.map((section) => (
        <div key={section.spectrum} hidden={active !== "TOUS" && active !== section.spectrum}>
          {section.node}
        </div>
      ))}
    </div>
  );
}
