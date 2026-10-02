import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EvidenceCard } from '@/components/evidence-card';
import { Empty, Pager } from '@/components/ui';
import { getEvidencePage, getTopicCounts } from '@/lib/data';
import { findTopicBySlug, topicSlug } from '@/lib/labels';
import { pageParam, type SearchParamsRecord } from '@/lib/params';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 24;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParamsRecord>;
}) {
  const { slug } = await params;
  const { page: rawPage } = await searchParams;
  const page = pageParam(rawPage);

  let counts: Awaited<ReturnType<typeof getTopicCounts>> = [];
  let unavailable = false;
  try {
    counts = await getTopicCounts();
  } catch {
    unavailable = true;
  }
  if (unavailable) {
    return (
      <main className="narrow">
        <h1>Rubrique indisponible</h1>
        <Empty>La base documentaire n’est pas accessible pour le moment. Réessayez plus tard.</Empty>
      </main>
    );
  }

  const topic = findTopicBySlug(counts.map((row) => row.topic), slug);
  if (!topic) notFound();

  let result: Awaited<ReturnType<typeof getEvidencePage>> = {
    items: [], total: 0, offset: 0, limit: PAGE_SIZE, hasMore: false,
  };
  try {
    result = await getEvidencePage({ topic, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE });
  } catch {
    return (
      <main className="narrow">
        <h1>Rubrique indisponible</h1>
        <Empty>La base documentaire n’est pas accessible pour le moment. Réessayez plus tard.</Empty>
      </main>
    );
  }

  const pageCount = Math.max(Math.ceil(result.total / PAGE_SIZE), 1);
  const hrefFor = (target: number) =>
    `/categories/${topicSlug(topic)}${target > 1 ? `?page=${target}` : ''}`;

  return (
    <main>
      <p className="breadcrumb">
        <Link className="quiet" href="/categories">
          ← Toutes les rubriques
        </Link>
      </p>
      <div className="page-intro reading-intro compact"><div className="eyebrow">Rubrique publiée par la source</div>
      <h1>{topic}</h1>
      <p className="lead">
        Les pièces ci-dessous portent cette rubrique telle que la source la publie. Les scrutins rattachés au dossier
        d’une loi en héritent : la référence du dossier figure sur chaque fiche, et la fiche du scrutin indique l’origine
        de ses rubriques.
      </p></div>

      <div className="info-band"><strong>Voir les votes</strong><span>Cette rubrique institutionnelle provient des dossiers du Sénat. Chaque fiche de scrutin affiche maintenant le décompte officiel par groupe parlementaire. Les graphiques par catégorie et sous-thème utilisent un autre classement, fondé sur les mots des titres. <Link href="/categories?institution=senat">Explorer les graphiques des groupes du Sénat →</Link></span></div>

      {result.items.length ? (
        <>
          <p className="resultline">
            {result.total.toLocaleString('fr-FR')} pièce{result.total > 1 ? 's' : ''} · page {page} sur {pageCount} · plus récentes d’abord
          </p>
          <div className="cards">
            {result.items.map((item) => (
              <EvidenceCard item={item} key={item.id} />
            ))}
          </div>
          <Pager page={page} pageCount={pageCount} hrefFor={hrefFor} />
        </>
      ) : (
        <Empty>Aucune pièce publiée ne porte cette rubrique pour l’instant.</Empty>
      )}
    </main>
  );
}
