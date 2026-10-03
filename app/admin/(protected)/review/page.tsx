import Link from 'next/link';
import { FlashNotice } from '@/components/flash-notice';
import { FilterForm, InstitutionSelect, KindSelect, SearchField } from '@/components/filters';
import { Queue, StatusBadge } from '@/components/ui';
import { listEvidenceForReview } from '@/lib/admin';
import { formatDate, institutionLabel, kindLabel, truncate } from '@/lib/labels';
import { type SearchParamsRecord } from '@/lib/params';
import { adminPieceHref, reviewFilters, reviewQueueHref, reviewWindow } from '@/lib/admin-review';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Pièces et publication' };

const PAGE_SIZE = 50;
const STATUS_TABS = [
  { status: 'draft', label: 'Brouillons' },
  { status: 'reviewed', label: 'Relues' },
  { status: 'published', label: 'Publiées' },
  { status: 'all', label: 'Toutes' },
] as const;

export default async function ReviewQueuePage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const params = await searchParams;
  const filters = reviewFilters(params);
  const { status, kind, institution, terms, page, scope } = filters;
  const window = reviewWindow();
  const hrefFor = (target: number) => reviewQueueHref(filters, target);
  const returnTo = hrefFor(page);
  const hasFilters = Boolean(kind || institution || terms || (scope && scope !== 'all'));

  let items: Awaited<ReturnType<typeof listEvidenceForReview>>['items'] | null = null;
  let total = 0;
  try {
    const result = await listEvidenceForReview({
      status,
      scope,
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
      <div className="queue-intro"><div className="eyebrow">01 / Documents</div><h2>Pièces et publication</h2><p>Un brouillon est une pièce non publiée, pas nécessairement une pièce incorrecte. Les archives importées peuvent attendre leur premier contrôle ; les liens éditoriaux ont leur propre file de revue.</p></div>
      <div className="admin-queue-guide"><div><b>Scrutins récents</b><p>La synchronisation AN/Sénat couvre du {formatDate(window.since)} au {formatDate(window.today)}, dates incluses. Un brouillon récent demande de consulter le journal.</p></div><div><b>Archives</b><p>Les scrutins antérieurs restent hors de cette reprise quotidienne. Leur publication passe par un lot contrôlé depuis les sources officielles.</p></div><div><b>Revue éditoriale</b><p>Programmes, déclarations et dossiers sensibles demandent leur contexte et une relecture. Un rapprochement se vérifie séparément.</p></div></div>
      <p className="hint"><Link href="/admin/runs">Consulter les passages d’ingestion →</Link> · <Link href="/admin/publication">Voir les contrôles de publication →</Link>. Le statut seul ne permet pas de distinguer « pas encore contrôlé » d’une anomalie détectée.</p>
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
        <label className="field">File de travail<select name="scope" defaultValue={scope ?? 'all'}><option value="all">Toutes les pièces</option><option value="recent-votes">Scrutins AN/Sénat récents</option><option value="historical-votes">Archives de scrutins AN/Sénat</option><option value="editorial">Programmes, déclarations, indicateurs et judiciaire</option></select></label>
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
        head={['Pièce', 'Publication']}
        failedText="La file de relecture est indisponible pour le moment."
        empty={status === 'draft' && scope === 'recent-votes' && !kind && !institution && !terms ? <>Aucun scrutin récent en brouillon dans cette file. Les anciennes pièces restent dans <Link href="/admin/review?status=draft&scope=historical-votes" prefetch={false}>les archives à contrôler</Link>.</> : status === 'draft' && !hasFilters ? 'Aucune pièce en brouillon dans cette file.' : 'Aucune pièce avec ces filtres. Modifiez la recherche ou effacez les filtres.'}
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
              {item.status === 'draft' && item.kind === 'vote' && ['assemblee','senat'].includes(item.institution ?? '') ? <div className="sub">{item.occurred_at < window.since ? 'Archive : hors reprise quotidienne' : item.occurred_at <= window.today ? 'Période récente : consulter le journal' : 'Date future : vérifier la source'}</div> : null}
              {item.reviewed_at ? <div className="sub">relue le {formatDate(item.reviewed_at)}</div> : null}
            </td>
          </tr>
        )}
      />
      </div>
    </>
  );
}
