import Link from "next/link";

import { CATEGORY_LABELS, CATEGORY_ORDER, CATEGORY_SLUGS } from "@/lib/labels";

/**
 * Pied de page : le site n'en avait aucun, donc aucune sortie de secours.
 * Trois colonnes courtes, puis la règle de provenance, écrite noir sur blanc.
 */
export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-grid bg-surface">
      <div className="mx-auto grid w-full max-w-[1180px] gap-6 px-4 py-8 sm:px-6 md:grid-cols-3">
        <nav aria-label="Catégories" className="grid content-start gap-1">
          <p className="pp-meta text-muted">Registre</p>
          <Link className="pp-tap text-ink hover:underline" href="/dossiers">
            Tous les dossiers
          </Link>
          {CATEGORY_ORDER.slice(0, 4).map((category) => (
            <Link
              key={category}
              className="pp-tap text-ink hover:underline"
              href={`/categories/${CATEGORY_SLUGS[category]}`}
            >
              {CATEGORY_LABELS[category]}
            </Link>
          ))}
        </nav>

        <nav aria-label="Vérifier soi-même" className="grid content-start gap-1">
          <p className="pp-meta text-muted">Vérifier soi-même</p>
          <Link className="pp-tap text-ink hover:underline" href="/methode">
            Méthode et limites
          </Link>
          <Link className="pp-tap text-ink hover:underline" href="/methode#empreintes">
            Empreintes SHA-256
          </Link>
          <a className="pp-tap text-ink hover:underline" href="/api/health">
            État du service (API)
          </a>
        </nav>

        <div className="grid content-start gap-2">
          <p className="pp-meta text-muted">Règle de provenance</p>
          <p className="pp-tight max-w-[38ch] text-muted">
            Le site n&apos;annonce jamais une donnée qu&apos;il n&apos;a pas : une pièce sans
            capture archivée le dit, un pilier sans source reste éteint, et aucune
            similarité n&apos;est simulée.
          </p>
          <p className="pp-meta text-muted">Preuve publique — preuve-publique.fr</p>
        </div>
      </div>
    </footer>
  );
}
