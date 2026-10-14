import Link from "next/link";

import OriginNotice from "@/components/OriginNotice";
import SearchForm from "@/components/SearchForm";
import { searchPublishedDossiers } from "@/server/services/dossier.service";
import { VERDICT_STAMPS, VERDICT_TONES } from "@/lib/labels";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Recherche",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = await searchPublishedDossiers(query);

  return (
    <div className="space-y-8">
      <section className="border border-grid bg-surface px-4 py-6 sm:px-6">
        <h1 className="font-serif text-3xl tracking-tight text-ink">Recherche</h1>
        <div className="mt-6 max-w-2xl">
          <SearchForm defaultValue={query} />
        </div>
      </section>

      {results.ok ? <OriginNotice origin={results.origin} /> : null}

      {!results.ok ? (
        <p className="border-2 border-falsebd bg-falsebg px-4 py-3 font-mono text-[13px] uppercase tracking-[0.1em] text-falsebd">
          Recherche impossible : {results.message}
        </p>
      ) : results.value.length === 0 ? (
        <div className="border border-grid bg-surface px-4 py-6 sm:px-6">
          <p className="font-serif text-xl text-ink">
            Aucun dossier publié ne correspond à « {query} ».
          </p>
          <p className="mt-2 font-mono text-[12px] leading-relaxed tracking-[0.06em] text-muted">
            La base ne contient que les dossiers publiés : une affirmation non
            traitée donne une absence de résultat, jamais une réponse
            approximative.
          </p>
        </div>
      ) : (
        <ul className="border border-grid bg-surface">
          {results.value.map((dossier) => {
            const tone = VERDICT_TONES[dossier.verdict];
            const toneClass =
              tone === "true" ? "text-true" : tone === "warn" ? "text-warn" : "text-false";
            return (
              <li key={dossier.slug} className="border-b border-gridsoft last:border-b-0">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gridsoft px-4 py-2 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                  <span>
                    {dossier.sources.length} pièces ·{" "}
                    {new Set(dossier.sources.map((source) => source.spectrum)).size}/6 piliers
                  </span>
                  <span>consensus {dossier.consensus_score}%</span>
                </div>
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="font-serif text-2xl leading-tight tracking-tight text-ink">
                    <Link className="hover:text-false" href={`/dossiers/${dossier.slug}`}>
                      « {dossier.claim_title} »
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                    {dossier.verdict_summary}
                  </p>
                  <p className="mt-4">
                    <span className={`pp-stamp ${toneClass}`}>
                      {VERDICT_STAMPS[dossier.verdict]}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
