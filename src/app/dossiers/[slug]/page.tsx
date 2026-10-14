import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlindModeProvider, BlindModeSwitch } from "@/components/BlindModeSwitch";
import ConvergenceSpectrometer from "@/components/ConvergenceSpectrometer";
import DossierHero from "@/components/DossierHero";
import EvidenceCard from "@/components/EvidenceCard";
import FallacyAnatomy from "@/components/FallacyAnatomy";
import OriginNotice from "@/components/OriginNotice";
import { getPublishedDossier } from "@/server/services/dossier.service";
import { computeIntegrityRoot } from "@/server/services/crypto.service";
import { SPECTRUM_COLUMN_LABELS, SPECTRUM_ORDER, formatLongDate } from "@/lib/labels";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPublishedDossier(slug);
  if (!result.ok || result.value === null) {
    return { title: "Dossier introuvable" };
  }
  const dossier = result.value;
  return {
    title: dossier.claim_title,
    description: dossier.verdict_summary,
    openGraph: {
      type: "article",
      title: dossier.claim_title,
      description: dossier.verdict_summary,
      url: `https://preuve-publique.fr/dossiers/${dossier.slug}`,
      locale: "fr_FR",
      siteName: "Preuve publique",
    },
  };
}

export default async function DossierPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getPublishedDossier(slug);

  if (!result.ok) {
    return (
      <div className="space-y-4">
        <h1 className="font-serif text-3xl text-ink">Lecture impossible</h1>
        <p className="border-2 border-falsebd bg-falsebg px-4 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-falsebd">
          {result.message}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          Aucune donnée locale ne remplace une lecture échouée : le dossier
          s&apos;affiche complet ou pas du tout.
        </p>
      </div>
    );
  }

  const dossier = result.value;
  if (dossier === null) {
    notFound();
  }

  const hashes = dossier.sources
    .map((source) => source.archive_sha256)
    .filter((hash): hash is string => hash !== null);
  const integrityRoot = computeIntegrityRoot(hashes);
  const bySpectrum = new Map<string, typeof dossier.sources>();
  for (const spectrum of SPECTRUM_ORDER) {
    bySpectrum.set(spectrum, []);
  }
  for (const source of dossier.sources) {
    const bucket = bySpectrum.get(source.spectrum);
    if (bucket) {
      bucket.push(source);
    }
  }

  return (
    <article className="space-y-8">
      <DossierHero dossier={dossier} integrityRoot={integrityRoot} />

      <OriginNotice origin={result.origin} />

      <ConvergenceSpectrometer dossier={dossier} />

      <FallacyAnatomy premises={dossier.premises} />

      <BlindModeProvider sources={dossier.sources.length}>
        <div className="space-y-6">
          <BlindModeSwitch />

          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
            Pièces à conviction ({dossier.sources.length})
          </h2>

          {SPECTRUM_ORDER.map((spectrum) => {
            const sources = bySpectrum.get(spectrum) ?? [];
            return (
              <section key={spectrum} id={`pieces-${spectrum}`} className="scroll-mt-6 space-y-3">
                <h3 className="flex items-center gap-3 border-b border-grid pb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  <span className="pp-led pp-led--on" aria-hidden="true" />
                  {SPECTRUM_COLUMN_LABELS[spectrum]}
                  <span className="text-ink">{String(sources.length).padStart(2, "0")}</span>
                </h3>
                {sources.length === 0 ? (
                  <p className="border border-dashed border-gridsoft px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    Aucune pièce recoupée sur ce pilier.
                  </p>
                ) : (
                  sources.map((source) => (
                    <EvidenceCard key={source.id} source={source} order={source.display_order} />
                  ))
                )}
              </section>
            );
          })}
        </div>
      </BlindModeProvider>

      <footer className="border border-grid bg-surface px-4 py-4 font-mono text-[10px] leading-relaxed tracking-[0.06em] text-muted sm:px-6">
        <p>
          Racine d&apos;intégrité du dossier :{" "}
          <span className="text-ink">{integrityRoot}</span> — hachage de la liste
          triée des empreintes de ses pièces. Elle change à la moindre
          modification de citation.
        </p>
        <p className="mt-2">
          Provenance :{" "}
          {result.origin === "supabase"
            ? "lecture Supabase, RLS (dossiers publiés uniquement)"
            : "dossiers de référence locaux (Supabase non configuré)"}{" "}
          · publié le {formatLongDate(dossier.published_at)} ·{" "}
          <Link className="text-seal hover:underline" href="/methode">
            Méthode et limites
          </Link>
        </p>
      </footer>
    </article>
  );
}
