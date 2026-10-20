import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  BlindModeProvider,
  BlindModeSwitch,
  BlindProtocolBanner,
  CaviardFigures,
} from "@/components/BlindModeSwitch";
import ArchiveHashBadge from "@/components/ArchiveHashBadge";
import ChainOfCustodyTimeline from "@/components/ChainOfCustodyTimeline";
import ConvergenceSpectrometer from "@/components/ConvergenceSpectrometer";
import CopyRefutation from "@/components/CopyRefutation";
import DossierDensity from "@/components/DossierDensity";
import DossierHero from "@/components/DossierHero";
import EvidenceCard from "@/components/EvidenceCard";
import FallacyAnatomy from "@/components/FallacyAnatomy";
import OriginNotice from "@/components/OriginNotice";
import PiecesTabs from "@/components/PiecesTabs";
import ProcedureRail from "@/components/ProcedureRail";
import Protagonists from "@/components/Protagonists";
import Reveal from "@/components/Reveal";
import ShareDebateButton from "@/components/ShareDebateButton";
import VerdictStamp from "@/components/VerdictStamp";
import { getPublishedDossier } from "@/server/services/dossier.service";
import { computeIntegrityRoot } from "@/server/services/crypto.service";
import { singleLineSummary, verdictParagraphs } from "@/lib/summary";
import {
  CATEGORY_LABELS,
  CATEGORY_SLUGS,
  PREMISE_STATUS_LABELS,
  SPECTRUM_COLUMN_LABELS,
  SPECTRUM_LABELS,
  SPECTRUM_ORDER,
  SPECTRUM_SHORT_LABELS,
  formatDate,
  formatLongDate,
  pieceCode,
} from "@/lib/labels";
import { dossierJsonLd } from "@/lib/structured-data";
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
    description: singleLineSummary(dossier.verdict_summary),
    openGraph: {
      type: "article",
      title: dossier.claim_title,
      description: singleLineSummary(dossier.verdict_summary),
      url: `https://preuve-publique.fr/dossiers/${dossier.slug}`,
      locale: "fr_FR",
      siteName: "Preuve publique",
    },
    alternates: { canonical: `/dossiers/${dossier.slug}` },
    /* La carte générée par `opengraph-image.tsx` sert les deux réseaux :
       Twitter retombe sur og:image, mais on pointe explicitement la route
       générée — même titre, même résumé. */
    twitter: {
      card: "summary_large_image",
      site: "@vigiecitoyenn3",
      title: dossier.claim_title,
      description: singleLineSummary(dossier.verdict_summary),
      images: [`/dossiers/${dossier.slug}/opengraph-image`],
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
  const captured = dossier.sources.filter((source) => source.archive_binary_sha256 !== null).length;
  const snapped = dossier.sources.filter((source) => source.original_url !== null).length;

  /* Index de procédure : les sections dans l'ordre du document — c'est un plan,
     pas une décoration. */
  const timelineEvents = dossier.timeline ?? [];
  const contents = [
    { href: "#verdict", label: "Synthèse" },
    { href: "#piliers", label: "Spectromètre" },
    { href: "#anatomie", label: "Anatomie du sophisme" },
    ...(timelineEvents.length > 0
      ? [{ href: "#chronologie", label: "Chaîne de custode" }]
      : []),
    { href: "#protagonistes", label: "Protagonistes" },
    { href: "#pieces", label: "Pièces & SHA-256" },
    { href: "#integrite", label: "Intégrité" },
  ];

  const sections = SPECTRUM_ORDER.map((spectrum) => {
    const sources = bySpectrum.get(spectrum) ?? [];
    return {
      spectrum,
      label: SPECTRUM_SHORT_LABELS[spectrum],
      count: sources.length,
      node: (
        <details id={`pieces-${spectrum}`} className="pp-fold scroll-mt-32" open={spectrum === firstFilled}>
          <summary>
            <span className="pp-led pp-led--on" aria-hidden="true" />
            {SPECTRUM_COLUMN_LABELS[spectrum]}
            <span className="ml-2 text-muted">{String(sources.length).padStart(2, "0")}</span>
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
      ),
    };
  });

  /** Vue « 30 secondes » : verdict, briques, pièces en une ligne chacune. */
  const synthesis = (
    <section className="space-y-4 border border-grid bg-surface p-4">
      <div className="flex flex-wrap items-center gap-2">
        <VerdictStamp verdict={dossier.verdict} animate={false} />
        <span className="pp-meta text-muted">
          {CATEGORY_LABELS[dossier.category]} · {dossier.sources.length} pièces · consensus{" "}
          {dossier.consensus_score}%
        </span>
      </div>

      <div className="space-y-4">
        {verdictParagraphs(dossier.verdict_summary).map((paragraph, index) => (
          <p key={index} className="pp-lead text-ink">
            <CaviardFigures text={paragraph} />
          </p>
        ))}
      </div>

      <div className="space-y-2">
        <p className="pp-meta text-muted">Ce que dit l&apos;affirmation, brique par brique</p>
        <ul className="space-y-1">
          {dossier.premises.map((premise) => (
            <li key={premise.claim_part} className="flex flex-wrap items-baseline gap-2 border-b border-gridsoft pb-1">
              <span className="pp-meta text-ink">{PREMISE_STATUS_LABELS[premise.status]}</span>
              <span className="pp-tight text-muted">
                <CaviardFigures text={premise.claim_part} />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <p className="pp-meta text-muted">
          Les {dossier.sources.length} pièces, en une ligne chacune
        </p>
        <ul className="space-y-1">
          {dossier.sources.map((source) => (
            <li key={source.id} className="flex flex-wrap items-baseline gap-x-2 border-b border-gridsoft pb-1">
              <span className="font-mono text-[12px] text-seal">{pieceCode(source.display_order)}</span>
              <span className="pp-meta text-muted">{SPECTRUM_LABELS[source.spectrum]}</span>
              <span className="pp-tight text-ink">{source.source_name}</span>
              <span className="pp-meta text-muted">
                {source.publication_date === null ? "sans date" : formatDate(source.publication_date)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="pp-tight text-muted">
        {captured} pièce{captured > 1 ? "s" : ""} sur {dossier.sources.length} ont une fiche
        d&apos;archive déposée ; {snapped} portent une URL d&apos;origine. Racine d&apos;intégrité :{" "}
        <span className="font-mono break-all text-ink">{integrityRoot}</span>
      </p>
      <p className="pp-tight text-muted">
        Pour les citations, leurs auteurs et l&apos;audit d&apos;empreinte pièce par pièce,
        passez en <strong className="text-ink">dossier complet</strong>.
      </p>
    </section>
  );

  return (
    <BlindModeProvider sources={dossier.sources.length}>
      {/* Données structurées du dossier : titre, résumé, dates et éditeur —
          tout vient du dossier publié, rien n'est ajouté. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dossierJsonLd(dossier)) }}
      />
      <article className="pp-doc space-y-6">
        <div id="verdict" className="pp-marks scroll-mt-16">
          <DossierHero dossier={dossier} integrityRoot={integrityRoot} />
        </div>

        {/* Le protocole à l'aveugle se voit depuis le haut du dossier. */}
        <BlindProtocolBanner />

        {/* Outils du dossier : un bandeau distinct entre le cartouche et le
            corps analytique. L'illustration vit dans la marge du cartouche
            (DossierHero) : aucune image ne sépare la synthèse des boutons. */}
        <section aria-label="Outils du dossier" className="pp-dossier-actions">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              className="pp-chip"
              data-category={dossier.category}
              href={`/categories/${CATEGORY_SLUGS[dossier.category]}`}
            >
              {CATEGORY_LABELS[dossier.category]}
            </Link>
            <Link className="pp-tap pp-meta text-seal hover:underline" href="/dossiers">
              Registre →
            </Link>
          </div>

          {/* Les deux partages du dossier, côte à côte : l'argumentaire social en
              un clic et la réfutation complète, format débat. `relative` : les
              panneaux « voir le texte » s'ancrent aux bords de ce rang sur écran
              large (voir .pp-drop--page), pas au bouton qui les ouvre. */}
          <div className="relative flex flex-wrap items-start gap-x-4 gap-y-3">
            <ShareDebateButton dossier={dossier} />
            <CopyRefutation dossier={dossier} />
          </div>
        </section>

        <DossierDensity synthesis={synthesis} piecesTotal={dossier.sources.length}>
          <div className="grid gap-6 xl:grid-cols-[210px_minmax(0,1fr)]">
            <ProcedureRail entries={contents} />

            {/* `min-w-0` : sans lui, la colonne prend la largeur de contenu
                minimale de ses enfants (le SVG du spectromètre, dont le rapport
                1000:120 à hauteur fixe impose 800 px) et déborde sur téléphone. */}
            <div className="min-w-0 space-y-6">
              {/* Sommaire collant : le dossier fait plusieurs écrans. Le rail
                  vertical prend le relais à partir de 1280 px — c'est la
                  feuille de style qui masque ce sommaire (voir .pp-toc dans le
                  bloc DA), pas une classe d'utilitaire. */}
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

              {timelineEvents.length > 0 ? (
                <div id="chronologie" className="scroll-mt-16">
                  <Reveal>
                    <ChainOfCustodyTimeline events={timelineEvents} />
                  </Reveal>
                </div>
              ) : null}

              <div id="protagonistes" className="scroll-mt-16">
                <Reveal>
                  <Protagonists protagonists={dossier.protagonists} />
                </Reveal>
              </div>

              <section id="pieces" className="scroll-mt-16 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="pp-h3 font-serif text-ink">
                    Pièces à conviction ({dossier.sources.length})
                  </h2>
                  <BlindModeSwitch />
                </div>

                <PiecesTabs
                  total={dossier.sources.length}
                  tabs={sections.map((section) => ({
                    spectrum: section.spectrum,
                    label: section.label,
                    count: section.count,
                  }))}
                  sections={sections.map((section) => ({
                    spectrum: section.spectrum,
                    node: section.node,
                  }))}
                />

                {/* Scellés des pièces : la vérification se rejoue dans le
                    navigateur du lecteur (octets de la capture d'abord, chaîne
                    canonique de la citation sinon). Un état neutre et muet
                    quand aucune empreinte n'est enregistrée. */}
                <div className="space-y-2 border border-grid bg-surface px-3 py-3 sm:px-4">
                  <p className="pp-meta text-muted">
                    Scellés des pièces — le hachage se refait dans votre navigateur (octets de la
                    capture, ou chaîne canonique de la citation)
                  </p>
                  <ul className="space-y-2">
                    {dossier.sources.map((source) => (
                      <li key={source.id}>
                        <ArchiveHashBadge source={source} order={source.display_order} />
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <footer
                id="integrite"
                className="scroll-mt-16 space-y-2 border border-grid bg-surface px-4 py-4 sm:px-6"
              >
                <p className="pp-meta text-muted">Intégrité du dossier</p>
                <p className="pp-tight text-muted">
                  Racine d&apos;intégrité :{" "}
                  <span className="font-mono break-all text-ink">{integrityRoot}</span> — hachage
                  de la liste triée des empreintes de ses pièces. Elle change à la moindre
                  modification de citation.
                </p>
                <p className="pp-tight text-muted">
                  Provenance :{" "}
                  {result.origin === "supabase"
                    ? "lecture Supabase sous RLS (dossiers publiés uniquement)"
                    : "dossiers de référence locaux (Supabase non configuré)"}{" "}
                  · publié le {formatLongDate(dossier.published_at)} ·{" "}
                  <Link className="pp-tap pp-meta text-seal hover:underline" href="/methode">
                    Méthode et limites
                  </Link>
                </p>
              </footer>
            </div>
          </div>
        </DossierDensity>
      </article>
    </BlindModeProvider>
  );
}
