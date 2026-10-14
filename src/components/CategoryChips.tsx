import Link from "next/link";

import { CATEGORY_LABELS, CATEGORY_ORDER, CATEGORY_SLUGS } from "@/lib/labels";
import type { DossierCategory } from "@/lib/types";

/**
 * Bandeau de catégories : le seul moyen de parcourir le registre sans savoir
 * quoi chercher. Défilement horizontal sur mobile (une catégorie vide reste
 * visible mais atténuée — jamais masquée : le lecteur voit ce qui manque).
 */
export default function CategoryChips({
  counts,
  active,
}: {
  counts?: Record<DossierCategory, number>;
  active?: DossierCategory;
}) {
  return (
    <nav aria-label="Catégories" className="pp-chips">
      <Link
        href="/dossiers"
        className="pp-chip"
        data-active={active === undefined ? "true" : "false"}
        data-empty="false"
      >
        Tous
      </Link>
      {CATEGORY_ORDER.map((category) => {
        const count = counts?.[category];
        return (
          <Link
            key={category}
            href={`/categories/${CATEGORY_SLUGS[category]}`}
            className="pp-chip"
            data-active={active === category ? "true" : "false"}
            data-empty={count === 0 ? "true" : "false"}
          >
            {CATEGORY_LABELS[category]}
            {count !== undefined ? (
              <span className="font-mono text-[12px] opacity-70">{count}</span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
