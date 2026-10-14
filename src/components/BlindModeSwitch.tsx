"use client";

import { Eye, EyeOff, Sliders } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type BlindModeValue = {
  blind: boolean;
  toggle: () => void;
  sources: number;
};

const BlindModeContext = createContext<BlindModeValue>({
  blind: false,
  toggle: () => {},
  sources: 0,
});

/**
 * Mode « preuve à l'aveugle », version document déclassifié : les noms de
 * médias, d'auteurs et les étiquettes de pilier sont recouverts de bandes de
 * caviardage (<Caviard />), et le bouton les retire d'un mouvement mécanique.
 *
 * Le caviardage est visuel : les données restent dans la page. Il sert à juger
 * la preuve avant de savoir qui la porte, pas à cacher quoi que ce soit.
 */
export function BlindModeProvider({
  children,
  sources = 0,
}: {
  children: React.ReactNode;
  sources?: number;
}) {
  const [blind, setBlind] = useState(false);
  const toggle = useCallback(() => {
    setBlind((current) => !current);
  }, []);
  const value = useMemo(() => ({ blind, toggle, sources }), [blind, toggle, sources]);

  return (
    <BlindModeContext.Provider value={value}>
      <div data-blind={blind ? "true" : "false"} className="contents">
        {children}
      </div>
    </BlindModeContext.Provider>
  );
}

export function useBlindMode(): BlindModeValue {
  return useContext(BlindModeContext);
}

/** Valeur recouverte d'une bande de caviardage tant que le mode est actif. */
export function Caviard({
  children,
  label = "[SOURCE MASQUÉE — ÉVALUEZ LE FAIT BRUT]",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <span className="pp-caviard">
      <span className="pp-caviard__text">{children}</span>
      <span className="pp-caviard__bar" aria-hidden="true">
        <span className="pp-caviard__label">{label}</span>
      </span>
    </span>
  );
}

export function BlindModeSwitch() {
  const { blind, toggle, sources } = useBlindMode();
  const Icon = blind ? Eye : EyeOff;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border border-grid bg-surface px-4 py-3">
      <div className="flex items-center gap-3">
        <Sliders size={15} aria-hidden="true" className="text-muted" />
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
          Mode preuve à l&apos;aveugle
        </span>
        <span
          className="border border-grid px-2 py-0.5 font-mono text-[10px] tracking-[0.14em]"
          aria-hidden="true"
        >
          {blind ? "CAVIARDÉ" : "CLAIR"}
        </span>
      </div>

      {blind ? (
        <button
          type="button"
          onClick={toggle}
          className="pp-pulse inline-flex items-center gap-2 border-2 border-seal bg-surface px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-seal transition hover:bg-surface2"
        >
          <Icon size={14} aria-hidden="true" />
          Révéler la convergence politique des {sources} sources
        </button>
      ) : (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={blind}
          className="inline-flex items-center gap-2 border border-grid px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition hover:bg-surface2"
        >
          <Icon size={14} aria-hidden="true" />
          Caviarder l&apos;origine des sources
        </button>
      )}
    </div>
  );
}
