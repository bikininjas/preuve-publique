import { SPECTRUM_ORDER, SPECTRUM_SHORT_LABELS } from "@/lib/labels";
import type { PoliticalSpectrum } from "@/lib/types";

/**
 * Mini-spectromètre d'une fiche : les six piliers en pastilles, allumées
 * seulement quand une pièce les documente. Le lecteur voit la diversité des
 * sources avant d'ouvrir le dossier — et une pastille éteinte dit qu'un pilier
 * manque, elle ne l'estime pas.
 */
export default function PillarStrip({
  spectra,
  className = "",
}: {
  /** Piliers documentés, déjà comptés dans les sources du dossier. */
  spectra: PoliticalSpectrum[];
  className?: string;
}) {
  const documented = SPECTRUM_ORDER.filter((spectrum) => spectra.includes(spectrum));
  const label =
    documented.length === 0
      ? "Aucun pilier documenté sur 6"
      : `${documented.length} piliers documentés sur 6 : ${documented
          .map((spectrum) => SPECTRUM_SHORT_LABELS[spectrum])
          .join(", ")}`;

  return (
    <span className={`pp-pillars ${className}`} role="img" aria-label={label}>
      {SPECTRUM_ORDER.map((spectrum) => (
        <span
          key={spectrum}
          data-spectrum={spectrum}
          title={`${SPECTRUM_SHORT_LABELS[spectrum]} — ${
            spectra.includes(spectrum) ? "documenté" : "aucune pièce"
          }`}
          className={spectra.includes(spectrum) ? "pp-led pp-led--on" : "pp-led pp-led--off"}
        />
      ))}
    </span>
  );
}
