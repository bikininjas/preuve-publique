import { SeoPage } from '@/components/seo-page';
import { pageMetadata, SEO_PAGES } from '@/lib/seo';
import { EvidenceCard } from '@/components/evidence-card';
import { FilterForm, InstitutionSelect, KindSelect, SearchField, TopicSelect } from '@/components/filters';
import { Empty, Pager } from '@/components/ui';
import { getEvidencePage, getTopicCounts, isConfigured } from '@/lib/data';
import { enumParam, first, pageParam, type SearchParamsRecord } from '@/lib/params';
import { EVIDENCE_KINDS, INSTITUTIONS } from '@/lib/types';
import type { EvidenceKind, EvidencePage, Institution } from '@/lib/types';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 24;

export default async function PiecesPage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const params = await searchParams;
  const terms = (first(params.q) ?? '').trim().slice(0, 120);
  const kind = enumParam<EvidenceKind>(params.kind, EVIDENCE_KINDS);
  const institution = enumParam<Institution>(params.institution, INSTITUTIONS);
  const page = pageParam(params.page);

  let topics: Awaited<ReturnType<typeof getTopicCounts>> = [];
  try {
    topics = await getTopicCounts();
  } catch {
    topics = [];
  }
  const requestedTopic = (first(params.topic) ?? '').trim();
  // Une rubrique absente du comptage public n'est jamais inventée : elle est ignorée.
  const topic = topics.some((row) => row.topic === requestedTopic) ? requestedTopic : undefined;

  let result: EvidencePage = { items: [], total: 0, offset: 0, limit: PAGE_SIZE, hasMore: false };
  let unavailable = false;
  try {
    result = await getEvidencePage({
      terms: terms || undefined,
      kind,
      institution,
      topic,
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    });
  } catch {
    unavailable = true;
  }

  const pageCount = Math.max(Math.ceil(result.total / PAGE_SIZE), 1);
  const filtered = Boolean(terms || kind || institution || topic);
  const hrefFor = (target: number) => {
    const search = new URLSearchParams();
    if (terms) search.set('q', terms);
    if (kind) search.set('kind', kind);
    if (institution) search.set('institution', institution);
    if (topic) search.set('topic', topic);
    if (target > 1) search.set('page', String(target));
    const query = search.toString();
    return `/pieces${query ? `?${query}` : ''}`;
  };

  return (
    <main><SeoPage path="/pieces" />
      <div className="page-intro reading-intro"><div className="eyebrow">Catalogue documentaire</div>
      <h1>Pièces publiées</h1>
      <p className="lead">
        Retrouvez les documents par mot clé, type ou institution, avec leur date et leur source.
      </p></div>

      <FilterForm action="/pieces">
        <SearchField value={terms} placeholder="budget, retraites, article 24…" />
        <KindSelect value={kind} />
        <InstitutionSelect value={institution} />
        <TopicSelect value={topic} topics={topics} />
      </FilterForm>

      {unavailable ? (
        <Empty>La base documentaire n’est pas accessible pour le moment.</Empty>
      ) : !isConfigured() ? (
        <Empty>
          Le catalogue est temporairement indisponible sur ce déploiement.
        </Empty>
      ) : result.items.length ? (
        <>
          <p className="resultline">
            {result.total.toLocaleString('fr-FR')} pièce{result.total > 1 ? 's' : ''}
            {terms ? <> pour « {terms} »</> : null} · page {page} sur {pageCount} · plus récentes d’abord
          </p>
          <div className="cards">
            {result.items.map((item) => (
              <EvidenceCard item={item} key={item.id} />
            ))}
          </div>
          <Pager page={page} pageCount={pageCount} hrefFor={hrefFor} />
        </>
      ) : (
        <Empty>
          {filtered
            ? 'Aucune pièce publiée ne correspond à cette recherche.'
            : 'Aucune pièce publiée pour l’instant. Les premières sources seront ajoutées après vérification documentaire.'}
        </Empty>
      )}
    </main>
  );
}

export async function generateMetadata({searchParams}:{searchParams:Promise<SearchParamsRecord>}) {
  return pageMetadata('/pieces',SEO_PAGES['/pieces'],await searchParams);
}
