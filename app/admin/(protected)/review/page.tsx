import Link from 'next/link';
import { FlashNotice } from '@/components/flash-notice';
import { FilterForm, InstitutionSelect, KindSelect, SearchField } from '@/components/filters';
import { Queue, StatusBadge } from '@/components/ui';
import { listEvidenceForReview } from '@/lib/admin';
import { formatDate, institutionLabel, kindLabel, truncate } from '@/lib/labels';
import { type SearchParamsRecord } from '@/lib/params';
import { adminPieceHref, reviewFilters, reviewQueueHref } from '@/lib/admin-review';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Pièces à relire' };

const PAGE_SIZE = 50;
const STATUS_TABS = [
  { status: 'draft', label: 'À relire' },
  { status: 'reviewed', label: 'Relues' },
  { status: 'published', label: 'Publiées' },
  { status: 'all', label: 'Toutes' },
] as const;

export default async function ReviewQueuePage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const params = await searchParams;
  const filters = reviewFilters(params);
  const { status, kind, institution, terms, page } = filters;
  const hrefFor = (target: number) => reviewQueueHref(filters, target);
  const returnTo = hrefFor(page);
  const hasFilters = Boolean(kind || institution || terms);

  let items: Awaited<ReturnType<typeof listEvidenceForReview>>['items'] | null = null;
  let total = 0;
  try {
    const result = await listEvidenceForReview({
      status,
      kind,
      institution,
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
      <div className="queue-intro"><div className="eyebrow">01 / Documents</div><h2>Pièces à relire</h2><p>Les pièces sont classées par date du document, de la plus récente à la plus ancienne. Ouvrez chaque fiche pour vérifier l’intitulé, la date, la source et les données structurées avant de changer son statut.</p></div>
      <FlashNotice params={params} />
      <nav className="review-status-tabs" aria-label="Statut des pièces">
        {STATUS_TABS.map((tab) => (
          <Link key={tab.status} href={reviewQueueHref({ ...filters, status: tab.status }, 1)} aria-current={status === tab.status ? 'page' : undefined} prefetch={false}>
            {tab.label}
          </Link>
        ))}
      </nav>
      <FilterForm key={returnTo} action="/admin/review">
        <input type="hidden" name="status" value={status} />
        <InstitutionSelect value={institution} />
        <KindSelect value={kind} />
        <SearchField value={terms} />
        {hasFilters ? <Link className="review-reset" href={reviewQueueHref({ status, terms: '', page: 1 })} prefetch={false}>Effacer les filtres</Link> : null}
      </FilterForm>
      <div className="admin-review-queue">
      <Queue
        items={items}
        total={total}
        page={page}
        pageCount={Math.max(Math.ceil(total / PAGE_SIZE), 1)}
        noun="pièce"
        hrefFor={hrefFor}
        head={['Pièce', 'Statut']}
        failedText="La file de relecture est indisponible pour le moment."
        empty={status === 'draft' && !hasFilters ? 'Aucune pièce en brouillon dans cette file.' : 'Aucune pièce avec ces filtres. Modifiez la recherche ou effacez les filtres.'}
        renderRow={(item) => (
          <tr key={item.id}>
            <td>
              <Link href={adminPieceHref(item.id, returnTo)} prefetch={false}>{item.title}</Link>
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
          </tr>
        )}
      />
      </div>
    </>
  );
}
