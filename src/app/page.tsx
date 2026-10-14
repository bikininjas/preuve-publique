import Link from "next/link";

import OriginNotice from "@/components/OriginNotice";
import SearchForm from "@/components/SearchForm";
import { featuredDossier } from "@/server/services/dossier.service";
import {
  SPECTRUM_CODES,
  SPECTRUM_DESCRIPTIONS,
  SPECTRUM_LABELS,
  SPECTRUM_ORDER,
  VERDICT_STAMPS,
  VERDICT_TONES,
  formatLongDate,
} from "@/lib/labels";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await featuredDossier();
  const dossier = featured.ok ? featured.value : null;
  const tone = dossier ? VERDICT_TONES[dossier.verdict] : "warn";
  const toneClass =
    tone === "true" ? "text-true" : tone === "warn" ? "text-warn" : "text-false";
  const covered = dossier
    ? new Set(dossier.sources.map((source) => source.spectrum)).size
    : 0;

  return (
    <div className="space-y-10">
      <section className="border border-grid bg-surface">
        <p className="border-b border-gridsoft px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:px-6">
          Registre des vérifications · triangulation documentaire
        </p>
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
          <div className="border-gridsoft px-4 py-8 sm:px-6 lg:border-r">
            <h1 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
              La preuve ne doit pas dépendre de celui qui la porte.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Les vérifications classiques butent sur un réflexe légitime :
              pourquoi croire une rédaction plutôt qu&apos;une autre ? Ici, chaque
              dossier croise des archives d&apos;époque, des travaux évalués par
              les pairs et des sources de tout le spectre politique. Le lecteur
              juge le recoupement, pas l&apos;autorité — et peut recalculer
              lui-même l&apos;empreinte de chaque citation.
            </p>
            <div className="mt-8 max-w-2xl">
              <SearchForm />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 bg-surface2 px-4 py-8 sm:px-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Méthode imposée par le code
              </p>
              <ul className="mt-4 space-y-3 font-mono text-[11px] leading-relaxed text-ink">
                <li>01 · une preuve primaire obligatoire</li>
                <li>02 · une source académique obligatoire</li>
                <li>03 · deux bords politiques au minimum</li>
                <li>04 · une empreinte par pièce</li>
              </ul>
            </div>
            <p className="font-mono text-[10px] leading-relaxed tracking-[0.06em] text-muted">
              Un dossier qui ne réunit pas ces quatre conditions reste un
              brouillon : le pipeline de publication le refuse.
            </p>
          </div>
        </div>
      </section>

      {featured.ok ? <OriginNotice origin={featured.origin} /> : null}

      {!featured.ok ? (
        <p className="border-2 border-falsebd bg-falsebg px-4 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-falsebd">
          Lecture impossible : {featured.message}
        </p>
      ) : null}

      {dossier ? (
        <section className="border border-grid bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-grid px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            <span>Dossier publié le plus récent</span>
            <span>
              {covered}/6 piliers · {dossier.sources.length} pièces
            </span>
          </div>
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)]">
            <div className="border-gridsoft px-4 py-6 sm:px-6 lg:border-r">
              <h2 className="font-serif text-3xl leading-tight tracking-tight text-ink">
                <Link className="hover:text-false" href={`/dossiers/${dossier.slug}`}>
                  « {dossier.claim_title} »
                </Link>
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
                {dossier.verdict_summary}
              </p>
              <p className="mt-5 flex flex-wrap items-center gap-4">
                <span className={`pp-stamp ${toneClass}`}>
                  {VERDICT_STAMPS[dossier.verdict]}
                </span>
                <Link
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-seal hover:underline"
                  href={`/dossiers/${dossier.slug}`}
                >
                  Ouvrir le dossier →
                </Link>
              </p>
            </div>
            <div className="flex flex-col justify-between gap-4 bg-surface2 px-4 py-6 sm:px-6">
              <div className="space-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                {SPECTRUM_ORDER.map((spectrum) => {
                  const count = dossier.sources.filter(
                    (source) => source.spectrum === spectrum,
                  ).length;
                  return (
                    <p key={spectrum} className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2">
                        <span
                          className={count > 0 ? "pp-led pp-led--on" : "pp-led pp-led--off"}
                          aria-hidden="true"
                        />
                        {SPECTRUM_CODES[spectrum]}
                      </span>
                      <span className={count > 0 ? "text-ink" : "text-muted"}>
                        {String(count).padStart(2, "0")}
                      </span>
                    </p>
                  );
                })}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
                Consensus {dossier.consensus_score}%
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="border border-grid bg-surface">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-grid px-4 py-3">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
            Les six piliers du recoupement
          </h2>
          <Link
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-seal hover:underline"
            href="/methode"
          >
            Méthode et limites →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {SPECTRUM_ORDER.map((spectrum) => (
            <div
              key={spectrum}
              className="border-b border-r border-gridsoft px-4 py-5 last:border-b-0"
            >
              <p className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.14em] text-seal">
                  {SPECTRUM_CODES[spectrum]}
                </span>
                <span className="pp-led pp-led--off" aria-hidden="true" />
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink">
                {SPECTRUM_LABELS[spectrum]}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {SPECTRUM_DESCRIPTIONS[spectrum]}
              </p>
            </div>
          ))}
        </div>
        <p className="border-t border-grid px-4 py-3 font-mono text-[10px] leading-relaxed tracking-[0.06em] text-muted">
          Un pilier sans source n&apos;est pas comblé par une approximation : il
          reste éteint, et le dossier dit pourquoi.
        </p>
      </section>
    </div>
  );
}
