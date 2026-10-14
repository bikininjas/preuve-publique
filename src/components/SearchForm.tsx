export default function SearchForm({
  defaultValue = "",
  autoFocus = false,
}: {
  defaultValue?: string;
  autoFocus?: boolean;
}) {
  return (
    <form action="/recherche" method="get" role="search" className="w-full">
      <label
        className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted"
        htmlFor="q"
      >
        Rechercher une affirmation
      </label>
      <div className="mt-2 flex flex-col border border-grid sm:flex-row">
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          placeholder="les nazis étaient de gauche…"
          className="w-full bg-surface px-4 py-3 font-sans text-base text-ink outline-none placeholder:text-muted focus:bg-surface2"
        />
        <button
          type="submit"
          className="border-t border-grid bg-ink px-6 py-3 font-mono text-[13px] uppercase tracking-[0.16em] text-canvas transition hover:opacity-90 sm:border-l sm:border-t-0"
        >
          Consulter
        </button>
      </div>
      <p className="mt-2 font-mono text-[12px] leading-relaxed tracking-[0.04em] text-muted">
        Plein texte française sur les dossiers et leurs pièces. La recherche
        vectorielle est prévue dans le schéma, pas encore alimentée : aucune
        similarité n&apos;est simulée.
      </p>
    </form>
  );
}
