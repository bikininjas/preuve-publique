import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CategoryChips from "@/components/CategoryChips";
import DossierCard from "@/components/DossierCard";
import {
  CATEGORY_DESCRIPTIONS,
  CATEGORY_LABELS,
  CATEGORY_SLUGS,
  categoryFromSlug,
} from "@/lib/labels";
import { categoryCounts, listPublishedByCategory } from "@/server/services/dossier.service";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryFromSlug(slug);
  if (category === null) {
    return { title: "Catégorie inconnue" };
  }
  return {
    title: `${CATEGORY_LABELS[category]} — dossiers de vérification`,
    description: CATEGORY_DESCRIPTIONS[category],
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categoryFromSlug(slug);
  if (category === null) {
    notFound();
  }

  const [listed, counts] = await Promise.all([
    listPublishedByCategory(category),
    categoryCounts(),
  ]);
  const dossiers = listed.ok ? listed.value : [];

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="pp-meta text-muted">
          <Link className="hover:underline" href="/dossiers">
            Registre
          </Link>{" "}
          · catégorie
        </p>
        <h1 className="pp-h1 font-serif text-ink">{CATEGORY_LABELS[category]}</h1>
        <p className="pp-tight max-w-[60ch] text-muted">{CATEGORY_DESCRIPTIONS[category]}</p>
        <p className="pp-meta text-muted">
          {dossiers.length} dossier{dossiers.length > 1 ? "s" : ""} publié
          {dossiers.length > 1 ? "s" : ""} dans cette catégorie
        </p>
      </header>

      <CategoryChips counts={counts.ok ? counts.value : undefined} active={category} />

      {!listed.ok ? (
        <p className="border-2 border-falsebd bg-falsebg px-4 py-3 text-falsebd">
          {listed.message} Aucune donnée locale ne remplace une lecture échouée.
        </p>
      ) : dossiers.length === 0 ? (
        <div className="space-y-2 border border-dashed border-gridsoft px-4 py-6">
          <p className="text-ink">Aucun dossier publié dans cette catégorie.</p>
          <p className="pp-tight text-muted">
            La catégorie existe et reste vide tant qu&apos;aucune vérification ne
            l&apos;alimente : elle n&apos;est pas remplie avec un texte d&apos;attente.
          </p>
        </div>
      ) : (
        <div className="pp-lighttable grid gap-3 md:grid-cols-2">
          {dossiers.map((dossier) => (
            <DossierCard key={dossier.id} dossier={dossier} />
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {Object.entries(CATEGORY_SLUGS)
          .filter(([key]) => key !== category)
          .slice(0, 6)
          .map(([key, value]) => (
            <Link key={key} className="pp-chip" href={`/categories/${value}`}>
              {CATEGORY_LABELS[key as keyof typeof CATEGORY_SLUGS]}
            </Link>
          ))}
      </div>
    </div>
  );
}
