import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";
import { CATEGORY_LABELS, CATEGORY_ORDER, CATEGORY_SLUGS } from "@/lib/labels";

/**
 * En-tête unique du site : la navigation vit ici et nulle part ailleurs.
 *
 * Elle tient sans JavaScript : les menus sont des `<details>`, ouverts par le
 * navigateur lui-même, et chaque entrée est une cible tactile de 44 px.
 */
export default function SiteHeader() {
  return (
    <header className="pp-header">
      <div className="mx-auto flex w-full max-w-[1180px] items-center gap-2 px-3 sm:px-6">
        <Link
          href="/"
          className="pp-tap shrink-0 gap-2 pr-2"
          aria-label="Preuve publique — accueil"
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center border border-grid bg-ink font-mono text-[13px] font-bold tracking-tight text-canvas"
          >
            PP
          </span>
          <span className="hidden font-serif text-[19px] leading-none tracking-tight text-ink sm:block">
            Preuve publique
          </span>
        </Link>

        {/* Navigation large écran */}
        <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          <details className="pp-drop">
            <summary className="pp-nav-link">
              Catégories <span aria-hidden="true">▾</span>
            </summary>
            <div className="pp-drop-panel">
              {CATEGORY_ORDER.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${CATEGORY_SLUGS[category]}`}
                  className="pp-drop-item"
                >
                  <span>{CATEGORY_LABELS[category]}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </details>
          <Link className="pp-nav-link" href="/dossiers">
            Dossiers
          </Link>
          <Link className="pp-nav-link" href="/recherche">
            Rechercher
          </Link>
          <Link className="pp-nav-link" href="/methode">
            Méthode
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <Link className="pp-nav-link md:hidden" href="/recherche" aria-label="Rechercher">
            <span aria-hidden="true">⌕</span>
          </Link>
          <ThemeToggle />
          {/* Menu mobile : même contenu, empilé */}
          <details className="pp-drop md:hidden">
            <summary className="pp-nav-link" aria-label="Ouvrir le menu">
              Menu <span aria-hidden="true">≡</span>
            </summary>
            <div className="pp-drop-panel right-0 left-auto max-h-[70vh] w-[16rem] overflow-y-auto">
              <Link className="pp-drop-item" href="/dossiers">
                <span>Tous les dossiers</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link className="pp-drop-item" href="/methode">
                <span>Méthode et limites</span>
                <span aria-hidden="true">→</span>
              </Link>
              {CATEGORY_ORDER.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${CATEGORY_SLUGS[category]}`}
                  className="pp-drop-item"
                >
                  <span>{CATEGORY_LABELS[category]}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
