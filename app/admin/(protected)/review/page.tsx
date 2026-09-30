import Link from 'next/link';
import { FlashNotice } from '@/components/flash-notice';
import { FilterForm, KindSelect, SearchField, StatusSelect } from '@/components/filters';
import { ReviewActions } from '@/components/review-actions';
import { Queue, StatusBadge } from '@/components/ui';
import { listEvidenceForReview } from '@/lib/admin';
import { formatDate, institutionLabel, kindLabel, truncate } from '@/lib/labels';
import { enumParam, first, pageParam, type SearchParamsRecord } from '@/lib/params';
import { EVIDENCE_KINDS } from '@/lib/types';
import type { EvidenceKind, RowStatus } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Pièces à relire' };

const PAGE_SIZE = 50;
const STATUSES = ['draft', 'reviewed', 'published', 'all'] as const;

export default async function ReviewQueuePage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const params = await searchParams;
  const status = enumParam<RowStatus | 'all'>(params.status, STATUSES) ?? 'draft';
  const kind = enumParam<EvidenceKind>(params.kind, EVIDENCE_KINDS);
  const terms = (first(params.q) ?? '').trim().slice(0, 120);
  const page = pageParam(params.page);

  const hrefFor = (target: number) => {
    const search = new URLSearchParams({ status });
    if (kind) search.set('kind', kind);
    if (terms) search.set('q', terms);
    if (target > 1) search.set('page', String(target));
    return `/admin/review?${search.toString()}`;
  };
  const back = hrefFor(page);

  let items: Awaited<ReturnType<typeof listEvidenceForReview>>['items'] | null = null;
  let total = 0;
  try {
    const result = await listEvidenceForReview({
      status,
      kind,
      terms: terms || undefined,
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    });
    items = result.items;
    total = result.total;
  } catch {
    items = null;
  }

  return (
    <>
      <h2>Pièces à relire</h2>
      <FlashNotice params={params} />
      <FilterForm action="/admin/review">
        <StatusSelect value={status} />
        <KindSelect value={kind} />
        <SearchField value={terms} />
      </FilterForm>
      <Queue
        items={items}
        total={total}
        page={page}
        pageCount={Math.max(Math.ceil(total / PAGE_SIZE), 1)}
        noun="pièce"
        hrefFor={hrefFor}
        head={['Pièce', 'Statut', 'Action']}
        failedText="La file de relecture est indisponible pour le moment."
        empty={status === 'draft' ? 'Aucune pièce en brouillon : tout a été relu.' : 'Aucune pièce avec ces filtres.'}
        renderRow={(item) => (
          <tr key={item.id}>
            <td>
              <Link href={`/admin/pieces/${item.id}`}>{item.title}</Link>
              <div className="sub">
                {kindLabel(item.kind)} · {institutionLabel(item.institution)} · {formatDate(item.occurred_at)}
                {item.external_id ? (
                  <>
                    {' '}
                    · <code>{item.external_id}</code>
                  </>
                ) : null}
              </div>
              {item.excerpt ? <div className="sub">{truncate(item.excerpt, 150)}</div> : null}
            </td>
            <td>
              <StatusBadge status={item.status} />
              {item.reviewed_at ? <div className="sub">relue le {formatDate(item.reviewed_at)}</div> : null}
            </td>
            <td>
              <ReviewActions table="evidence" id={item.id} status={item.status} back={back} />
            </td>
          </tr>
        )}
      />
    </>
  );
}
