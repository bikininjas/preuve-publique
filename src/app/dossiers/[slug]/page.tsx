import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlindModeProvider, BlindModeSwitch } from "@/components/BlindModeSwitch";
import ConvergenceSpectrometer from "@/components/ConvergenceSpectrometer";
import DossierHero from "@/components/DossierHero";
import EvidenceCard from "@/components/EvidenceCard";
import FallacyAnatomy from "@/components/FallacyAnatomy";
import OriginNotice from "@/components/OriginNotice";
import Reveal from "@/components/Reveal";
import { getPublishedDossier } from "@/server/services/dossier.service";
import { computeIntegrityRoot } from "@/server/services/crypto.service";
import {
  CATEGORY_LABELS,
  CATEGORY_SLUGS,
  SPECTRUM_COLUMN_LABELS,
  SPECTRUM_ORDER,
  formatLongDate,
} from "@/lib/labels";
import type { PoliticalSpectrum } from "@/lib/types";

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
        <h1 className="pp-h1 font-serif text-ink">Lecture impossible</h1>
        <p className="border-2 border-falsebd bg-falsebg px-4 py-3 text-falsebd">
          {result.message}
        </p>
        <p className="pp-meta text-muted">
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

  const bySpectrum = new Map<PoliticalSpectrum, typeof dossier.sources>();
  for (const spectrum of SPECTRUM_ORDER) {
    bySpectrum.set(spectrum, []);
  }
  for (const source of dossier.sources) {
    bySpectrum.get(source.spectrum)?.push(source);
  }

  const filled = SPECTRUM_ORDER.filter((spectrum) => (bySpectrum.get(spectrum) ?? []).length > 0);
  const firstFilled = filled[0];

  const contents = [
    { href: "#verdict", label: "Verdict" },
    { href: "#anatomie", label: "Anatomie" },
    { href: "#piliers", label: "Six piliers" },
    { href: "#pieces", label: "Pièces" },
    { href: "#integrite", label: "Intégrité" },
  ];

  return (
    <article className="pp-doc space-y-6">
      <div id="verdict" className="scroll-mt-16">
        <DossierHero dossier={dossier} integrityRoot={integrityRoot} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link className="pp-chip" href={`/categories/${CATEGORY_SLUGS[dossier.category]}`}>
          {CATEGORY_LABELS[dossier.category]}
        </Link>
        <Link className="pp-meta text-seal hover:underline" href="/dossiers">
          Registre →
        </Link>
      </div>

      {/* Sommaire collant : le dossier fait plusieurs écrans, le lecteur ne
          doit jamais chercher où il en est. */}
      <nav className="pp-toc" aria-label="Sommaire du dossier">
        {contents.map((entry) => (
          <a key={entry.href} href={entry.href}>
            {entry.label}
          </a>
        ))}
      </nav>

      <OriginNotice origin={result.origin} />

      <div id="piliers" className="scroll-mt-16">
        <Reveal>
          <ConvergenceSpectrometer dossier={dossier} />
        </Reveal>
      </div>

      <div id="anatomie" className="scroll-mt-16">
        <Reveal>
          <FallacyAnatomy premises={dossier.premises} />
        </Reveal>
      </div>

      <section id="pieces" className="scroll-mt-16 space-y-3">
        <BlindModeProvider sources={dossier.sources.length}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="pp-h3 font-serif text-ink">
              Pièces à conviction ({dossier.sources.length})
            </h2>
            <BlindModeSwitch />
          </div>

          {/* Un pilier = un dépliant : la preuve reste entière, mais le lecteur
              n'a plus trois écrans de texte à traverser pour en changer. */}
          {SPECTRUM_ORDER.map((spectrum) => {
            const sources = bySpectrum.get(spectrum) ?? [];
            return (
              <details
                key={spectrum}
                id={`pieces-${spectrum}`}
                className="pp-fold scroll-mt-16"
                open={spectrum === firstFilled}
              >
                <summary>
                  <span className="pp-led pp-led--on" aria-hidden="true" />
                  {SPECTRUM_COLUMN_LABELS[spectrum]}
                  <span className="ml-2 text-muted">
                    {String(sources.length).padStart(2, "0")}
                  </span>
                </summary>
                <div className="space-y-3 p-3">
                  {sources.length === 0 ? (
                    <p className="pp-meta border border-dashed border-gridsoft px-3 py-3 text-muted">
                      Aucune pièce recoupée sur ce pilier — il reste éteint plutôt que
                      d&apos;être comblé par une approximation.
                    </p>
                  ) : (
                    sources.map((source) => (
                      <EvidenceCard key={source.id} source={source} order={source.display_order} />
                    ))
                  )}
                </div>
              </details>
            );
          })}
        </BlindModeProvider>
      </section>

      <footer
        id="integrite"
        className="scroll-mt-16 space-y-2 border border-grid bg-surface px-4 py-4 sm:px-6"
      >
        <p className="pp-meta text-muted">Intégrité du dossier</p>
        <p className="pp-tight text-muted">
          Racine d&apos;intégrité :{" "}
          <span className="font-mono text-ink break-all">{integrityRoot}</span> — hachage
          de la liste triée des empreintes de ses pièces. Elle change à la moindre
          modification de citation.
        </p>
        <p className="pp-tight text-muted">
          Provenance :{" "}
          {result.origin === "supabase"
            ? "lecture Supabase sous RLS (dossiers publiés uniquement)"
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
