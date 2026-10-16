"use client";

import { Eye, EyeOff, Sliders } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

import { splitFigures } from "@/lib/figures-mask";
import { clampTooltipLeft, tooltipMaxWidth } from "@/lib/tooltip-place";

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
 *
 * Le fournisseur enveloppe tout le dossier, pas seulement la liste des pièces :
 * le protocole teinte alors la page entière (bandeau, liseré) et pas un seul
 * bloc au milieu.
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
  label = "[SOURCE MASQUÉE]",
  tip = "[SOURCE MASQUÉE — JUGEZ L'ARGUMENT AVANT L'AUTEUR]",
}: {
  children: React.ReactNode;
  label?: string;
  tip?: string;
}) {
  const host = useRef<HTMLSpanElement | null>(null);
  const tipNode = useRef<HTMLSpanElement | null>(null);

  /* L'infobulle naît au bord gauche du caviardage ; près du bord droit de
     l'écran, elle sortirait de la page. Elle est recalée (position et largeur)
     quand elle apparaît : un survol ne doit jamais déclencher de défilement
     horizontal, et le texte doit rester lisible. */
  function placeTip() {
    const hostEl = host.current;
    const node = tipNode.current;
    if (!hostEl || !node || typeof window === "undefined") {
      return;
    }
    const maxWidth = tooltipMaxWidth(window.innerWidth);
    node.style.display = "block";
    node.style.maxWidth = `${maxWidth}px`;
    const width = Math.min(node.getBoundingClientRect().width || 0, maxWidth);
    const rect = hostEl.getBoundingClientRect();
    node.style.left = `${clampTooltipLeft(rect.left, width, window.innerWidth) - rect.left}px`;
    node.style.right = "auto";
  }

  function releaseTip() {
    const node = tipNode.current;
    if (!node) {
      return;
    }
    node.style.display = "";
    node.style.left = "";
    node.style.right = "";
    node.style.maxWidth = "";
  }

  return (
    <span
      ref={host}
      className="pp-caviard"
      onMouseEnter={placeTip}
      onMouseLeave={releaseTip}
      onFocus={placeTip}
      onBlur={releaseTip}
      onTouchStart={placeTip}
    >
      <span className="pp-caviard__text">{children}</span>
      {/* Le remplissage noir trace la bande (scaleX 0 → 1, origine à gauche) ;
          le libellé reste net, posé au-dessus, et n'est pas étiré par la
          transformation. Voir globals.css. */}
      <span className="pp-caviard__bar" aria-hidden="true">
        <span className="pp-caviard__fill" />
        <span className="pp-caviard__label">{label}</span>
      </span>
      <span ref={tipNode} className="pp-caviard__tip" aria-hidden="true">
        {tip}
      </span>
    </span>
  );
}

/**
 * Texte du corps où les **chiffres clés** portent leur propre bande de
 * caviardage : montants, pourcentages, dates. Les valeurs restent dans la page
 * (le protocole est visuel) ; elles sont recouvertes, jamais réécrites.
 */
export function CaviardFigures({ text }: { text: string }) {
  const segments = splitFigures(text);
  return (
    <>
      {segments.map((segment, index) =>
        segment.figure ? (
          <Caviard
            key={`figure-${index}`}
            label="[CHIFFRE MASQUÉ]"
            tip="[CHIFFRE MASQUÉ — JUGEZ L'ARGUMENT AVANT LA SOURCE]"
          >
            {segment.text}
          </Caviard>
        ) : (
          <span key={`texte-${index}`}>{segment.text}</span>
        ),
      )}
    </>
  );
}

/**
 * Bandeau de la chambre d'isolement : affiché tant que le protocole à l'aveugle
 * est actif. Il ne dit qu'une chose — l'origine des sources est recouverte — et
 * il le dit là où le lecteur regarde, en haut du dossier.
 */
export function BlindProtocolBanner() {
  const { blind, sources } = useBlindMode();
  if (!blind) {
    return null;
  }

  return (
    <p className="pp-blind-band" role="status">
      <span className="pp-blind-band__led" aria-hidden="true" />
      <span>
        ⚡ PROTOCOLE À L&apos;AVEUGLE ACTIF : LES AUTEURS SONT MASQUÉS POUR GARANTIR LA
        NEUTRALITÉ DE L&apos;EXAMEN
      </span>
      <span className="ml-auto text-[12px] opacity-80">
        origine de {sources} source{sources > 1 ? "s" : ""} recouverte · le caviardage est
        visuel : les données restent dans la page
      </span>
    </p>
  );
}

export function BlindModeSwitch() {
  const { blind, toggle, sources } = useBlindMode();
  const Icon = blind ? Eye : EyeOff;

  return (
    <div className="pp-blind-skin flex flex-wrap items-center justify-between gap-4 border border-grid bg-surface px-4 py-3">
      <div className="flex items-center gap-3">
        <Sliders size={15} aria-hidden="true" className="text-muted" />
        <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-ink">
          Mode preuve à l&apos;aveugle
        </span>
        <span
          className="border border-grid px-2 py-0.5 font-mono text-[12px] tracking-[0.14em]"
          aria-hidden="true"
        >
          {blind ? "CAVIARDÉ" : "CLAIR"}
        </span>
      </div>

      {blind ? (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={blind}
          className="pp-pulse inline-flex items-center gap-2 border-2 border-seal bg-surface px-4 py-2 font-mono text-[13px] uppercase tracking-[0.14em] text-seal transition hover:bg-surface2"
        >
          <Icon size={14} aria-hidden="true" />
          Révéler la convergence politique des {sources} sources
        </button>
      ) : (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={blind}
          className="inline-flex items-center gap-2 border border-grid px-4 py-2 font-mono text-[13px] uppercase tracking-[0.14em] text-ink transition hover:bg-surface2"
        >
          <Icon size={14} aria-hidden="true" />
          Caviarder l&apos;origine des sources
        </button>
      )}
    </div>
  );
}
