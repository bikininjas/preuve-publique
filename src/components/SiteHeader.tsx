import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="border-b border-grid bg-surface">
      <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-stretch justify-between">
        <Link
          href="/"
          className="flex flex-1 items-center gap-3 border-r border-gridsoft px-4 py-3 no-underline sm:px-8"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            PP
          </span>
          <span className="font-serif text-xl leading-none tracking-tight text-ink">
            Preuve publique
          </span>
        </Link>
        <div className="flex items-stretch">
          <Link
            className="flex items-center border-r border-gridsoft px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition hover:bg-surface2 hover:text-ink"
            href="/methode"
          >
            Méthode
          </Link>
          <div className="flex items-center px-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
