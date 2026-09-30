import Link from 'next/link';
import { FlashNotice } from '@/components/flash-notice';
import { FilterForm, StatusSelect } from '@/components/filters';
import { ReviewActions } from '@/components/review-actions';
import { Queue, StatusBadge } from '@/components/ui';
import { listLinksForReview } from '@/lib/admin';
import { methodLabel, relationLabel } from '@/lib/labels';
import { enumParam, pageParam, type SearchParamsRecord } from '@/lib/params';
import type { RowStatus } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Rapprochements' };

const PAGE_SIZE = 50;
const STATUSES = ['draft', 'reviewed', 'published', 'all'] as const;

export default async function LinksQueuePage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const params = await searchParams;
  const status = enumParam<RowStatus | 'all'>(params.status, STATUSES) ?? 'draft';
  const page = pageParam(params.page);

  const hrefFor = (target: number) => {
    const search = new URLSearchParams({ status });
    if (target > 1) search.set('page', String(target));
    return `/admin/links?${search.toString()}`;
  };
  const back = hrefFor(page);

  let items: Awaited<ReturnType<typeof listLinksForReview>>['items'] | null = null;
  let total = 0;
  try {
    const result = await listLinksForReview({ status, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE });
    items = result.items;
    total = result.total;
  } catch {
    items = null;
  }

  return (
    <>
      <h2>Rapprochements documentaires</h2>
      <p className="hint">
        Un lien publié n’est visible publiquement que si <b>les deux</b> pièces qu’il relie sont publiées. Un lien
        signale une parenté documentaire (même référence de dossier, même proposition), jamais un soutien ni une
        contradiction.
      </p>
      <FlashNotice params={params} />
      <FilterForm action="/admin/links">
        <StatusSelect value={status} />
      </FilterForm>
      <Queue
        items={items}
        total={total}
        page={page}
        pageCount={Math.max(Math.ceil(total / PAGE_SIZE), 1)}
        noun="rapprochement"
        hrefFor={hrefFor}
        head={['Lien', 'Statut', 'Action']}
        failedText="La file des rapprochements est indisponible pour le moment."
        empty="Aucun rapprochement avec ces filtres."
        renderRow={(link) => (
          <tr key={link.id}>
            <td>
              <div>
                <StatusBadge status={link.from?.status ?? 'draft'} />{' '}
                {link.from ? <Link href={`/admin/pieces/${link.from.id}`}>{link.from.title}</Link> : '—'}
              </div>
              <div className="sub">↓ {relationLabel(link.relation)}</div>
              <div>
                <StatusBadge status={link.to?.status ?? 'draft'} />{' '}
                {link.to ? <Link href={`/admin/pieces/${link.to.id}`}>{link.to.title}</Link> : '—'}
              </div>
              <div className="sub">
                {methodLabel(link.method)} · confiance {Number(link.confidence).toLocaleString('fr-FR')}
              </div>
              {link.rationale ? <div className="sub">{link.rationale}</div> : null}
            </td>
            <td>
              <StatusBadge status={link.status} />
            </td>
            <td>
              <ReviewActions table="evidence_links" id={link.id} status={link.status} back={back} />
            </td>
          </tr>
        )}
      />
    </>
  );
}
