import Link from "next/link";

export default function NotFound() {
  return (
    <div className="border border-grid bg-surface px-4 py-10 sm:px-8">
      <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted">
        Erreur 404 · registre
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink">
        Dossier introuvable
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        Ce dossier n&apos;existe pas dans le registre public. Seuls les dossiers
        publiés sont accessibles : un brouillon en cours d&apos;instruction
        n&apos;est jamais servi, même partiellement.
      </p>
      <p className="mt-6">
        <Link
          className="border border-grid px-4 py-2 font-mono text-[12px] uppercase tracking-[0.14em] text-ink transition hover:bg-surface2"
          href="/"
        >
          Revenir au registre
        </Link>
      </p>
    </div>
  );
}
