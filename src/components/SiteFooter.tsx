import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-grid bg-surface">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-4 py-8 font-mono text-[11px] uppercase tracking-[0.12em] text-muted sm:px-8">
        <p className="max-w-3xl normal-case tracking-normal">
          Preuve publique ne demande pas qu&apos;on croie une rédaction : chaque
          dossier montre ses documents, ses dates et ses recoupements, et laisse
          la conclusion au lecteur.
        </p>
        <p className="flex flex-wrap gap-x-6 gap-y-2">
          <Link className="hover:text-ink" href="/methode">
            Méthode et limites
          </Link>
          <Link className="hover:text-ink" href="/api/health">
            État du service
          </Link>
          <span>preuve-publique.fr</span>
        </p>
      </div>
    </footer>
  );
}
