import Link from "next/link";

import CategoryChips from "@/components/CategoryChips";
import DossierCard from "@/components/DossierCard";
import Reveal from "@/components/Reveal";
import SearchForm from "@/components/SearchForm";
import StatBand from "@/components/StatBand";
import { categoryCounts, listPublishedDossiers } from "@/server/services/dossier.service";
import { documentedSpectra } from "@/lib/types";

export const dynamic = "force-dynamic";

/** Les quatre conditions du validateur, dites en une ligne chacune. */
const RULES: { code: string; text: string }[] = [
  { code: "01", text: "Une preuve primaire : archive d'époque ou donnée officielle." },
  { code: "02", text: "Une validation académique : travaux à comité de lecture." },
  { code: "03", text: "Deux bords politiques distincts, au minimum." },
  { code: "04", text: "Une empreinte SHA-256 sur chaque pièce citée." },
];

export default async function HomePage() {
  const [listed, counts] = await Promise.all([listPublishedDossiers(), categoryCounts()]);
  const dossiers = listed.ok ? listed.value : [];
  const pieces = dossiers.reduce((total, dossier) => total + dossier.sources.length, 0);
  const fingerprints = dossiers.reduce(
    (total, dossier) =>
      total + dossier.sources.filter((source) => source.archive_sha256 !== null).length,
    0,
  );
  const pillars = dossiers.reduce(
    (total, dossier) => total + documentedSpectra(dossier.sources).length,
    0,
  );
  const [latest, ...others] = dossiers;

  return (
    <div className="space-y-12">
      <section className="space-y-5">
        <p className="pp-meta text-muted">Registre des vérifications · triangulation documentaire</p>
        <h1 className="pp-h1 max-w-[20ch] font-serif text-ink">
          La preuve ne doit pas dépendre de celui qui la porte.
        </h1>
        <p className="pp-lead max-w-[56ch] text-muted">
          Chaque dossier croise archives d&apos;époque, travaux évalués par les pairs et
          sources de tout le bord politique. Le lecteur juge le recoupement, pas
          l&apos;autorité.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {latest !== undefined ? (
            <Link className="pp-btn pp-btn--ink" href={`/dossiers/${latest.slug}`}>
              Lire le dernier dossier
            </Link>
          ) : null}
          <Link className="pp-btn" href="/methode">
            Comment on vérifie
          </Link>
        </div>
        <StatBand
          stats={[
            { label: "Dossiers publiés", value: dossiers.length },
            { label: "Pièces recoupées", value: pieces },
            { label: "Empreintes vérifiables", value: fingerprints },
            { label: "Piliers documentés", value: pillars, suffix: "/6" },
          ]}
        />
      </section>

      {!listed.ok ? (
        <p className="border-2 border-falsebd bg-falsebg px-4 py-3 text-falsebd">
          {listed.message} Aucune donnée locale ne remplace une lecture échouée.
        </p>
      ) : null}

      <Reveal as="section" className="space-y-3">
        <h2 className="pp-meta text-muted">Parcourir par catégorie</h2>
        <CategoryChips counts={counts.ok ? counts.value : undefined} />
      </Reveal>

      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="pp-h2 font-serif text-ink">Le registre</h2>
          <Link className="pp-tap pp-meta text-seal hover:underline" href="/dossiers">
            Tous les dossiers →
          </Link>
        </div>
        {latest === undefined ? (
          <p className="border border-dashed border-gridsoft px-4 py-6 text-muted">
            Aucun dossier publié pour le moment.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            <Reveal className="md:col-span-2">
              <DossierCard dossier={latest} />
            </Reveal>
            {others.slice(0, 4).map((dossier, index) => (
              <Reveal key={dossier.id} delay={60 * (index + 1)}>
                <DossierCard dossier={dossier} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <Reveal as="section" className="space-y-3 border border-grid bg-surface p-4 sm:p-6">
        <h2 className="pp-h2 font-serif text-ink">Quatre conditions, vérifiées par le code</h2>
        <ol className="grid gap-2 sm:grid-cols-2">
          {RULES.map((rule) => (
            <li key={rule.code} className="flex items-baseline gap-3 border-b border-gridsoft pb-2">
              <span className="pp-meta text-muted">{rule.code}</span>
              <span className="pp-tight text-ink">{rule.text}</span>
            </li>
          ))}
        </ol>
        <p className="pp-tight text-muted">
          Un dossier qui ne réunit pas ces conditions reste un brouillon : le pipeline
          de publication le refuse.{" "}
          <Link className="text-seal hover:underline" href="/methode">
            Méthode et limites →
          </Link>
        </p>
      </Reveal>

      <Reveal as="section" className="space-y-3">
        <h2 className="pp-meta text-muted">Rechercher une affirmation</h2>
        <SearchForm />
      </Reveal>
    </div>
  );
}
