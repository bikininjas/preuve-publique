import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FlashNotice } from '@/components/flash-notice';
import { ReviewActions } from '@/components/review-actions';
import { EditorialContext } from '@/components/editorial-context';
import { Citation, DataTable, MetaList, Notice, RawJson, StatusBadge, type MetaEntry } from '@/components/ui';
import { getEvidenceForAdmin } from '@/lib/admin';
import {
  formatDate,
  formatDateTime,
  institutionLabel,
  kindLabel,
  methodLabel,
  relationLabel,
  statusLabel,
} from '@/lib/labels';
import { isUuid, type SearchParamsRecord } from '@/lib/params';

export const dynamic = 'force-dynamic';

export default async function AdminPiecePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParamsRecord>;
}) {
  const { id } = await params;
  const query = await searchParams;
  if (!isUuid(id)) notFound();

  let item: Awaited<ReturnType<typeof getEvidenceForAdmin>> = null;
  let failed = false;
  try {
    item = await getEvidenceForAdmin(id);
  } catch {
    failed = true;
  }
  if (failed) {
    return (
      <>
        <h2>Pièce</h2>
        <Notice>Cette pièce n’a pas pu être chargée. Rechargez la page dans un instant.</Notice>
      </>
    );
  }
  if (!item) notFound();

  const { evidence, source, actor, links } = item;
  const back = `/admin/pieces/${evidence.id}`;
  const meta: MetaEntry[] = [
    {
      term: 'Adresse source',
      children: (
        <a href={evidence.source_url} target="_blank" rel="noopener noreferrer">
          {evidence.source_url} ↗
        </a>
      ),
    },
    { term: 'Repère dans la source', children: evidence.source_locator ?? '—' },
    { term: 'Référence externe', children: evidence.external_id ?? '—' },
    { term: 'Acteur', children: actor ? `${actor.name} (${actor.kind})` : '—' },
    ...(source
      ? [
          { term: 'Document', children: source.document_title },
          { term: 'Éditeur', children: source.publisher },
          { term: 'Récupéré le', children: formatDateTime(source.retrieved_at) },
          { term: 'Empreinte SHA-256', children: <code>{source.sha256 ?? '—'}</code> },
        ]
      : []),
    ...(evidence.reviewed_by || evidence.reviewed_at
      ? [
          {
            term: 'Relecture',
            children: `${evidence.reviewed_by ?? '—'}${
              evidence.reviewed_at ? ` · ${formatDateTime(evidence.reviewed_at)}` : ''
            }`,
          },
        ]
      : []),
  ];

  return (
    <>
      <p className="breadcrumb">
        <Link className="quiet" href="/admin/review?status=all">
          ← Toutes les pièces (revue)
        </Link>
      </p>
      <h2 className="title">{evidence.title}</h2>
      <p className="resultline">
        <StatusBadge status={evidence.status} /> {kindLabel(evidence.kind)} · {institutionLabel(evidence.institution)} ·{' '}
        {formatDate(evidence.occurred_at)}
      </p>
      <FlashNotice params={query} />
      <div className="info-band admin-review-gate"><strong>Avant la transition</strong><span>Vérifier le lien source, le repère, la date et le périmètre du scrutin. Pour un rapprochement, ouvrir aussi l’autre pièce. La validation doit correspondre à une relecture effective.</span></div>
      <ReviewActions table="evidence" id={evidence.id} status={evidence.status} back={back} />
      <EditorialContext evidence={evidence} />

      <section className="panel">
        <h2>Provenance</h2>
        <MetaList items={meta} />
        {evidence.excerpt ? (
          <Citation footer="Extrait tel que fourni par la source.">{evidence.excerpt}</Citation>
        ) : null}
        <RawJson summary="Faits structurés (JSON)" value={evidence.detail} />
      </section>

      <section>
        <h2>Rapprochements ({links.length})</h2>
        {links.length ? (
          <DataTable head={['Lien', 'Méthode', 'Statut', 'Action']}>
            {links.map((link) => {
              const related = link.from_id === evidence.id ? link.to : link.from;
              return (
                <tr key={link.id}>
                  <td>
                    <div className="sub">{relationLabel(link.relation)}</div>
                    {related ? <Link href={`/admin/pieces/${related.id}`}>{related.title}</Link> : '—'}
                    {link.rationale ? <div className="sub">{link.rationale}</div> : null}
                  </td>
                  <td>
                    {methodLabel(link.method)}
                    <div className="sub">confiance {Number(link.confidence).toLocaleString('fr-FR')}</div>
                  </td>
                  <td>
                    <StatusBadge status={link.status} />
                  </td>
                  <td>
                    <ReviewActions table="evidence_links" id={link.id} status={link.status} back={back} />
                  </td>
                </tr>
              );
            })}
          </DataTable>
        ) : (
          <p className="empty">Aucun rapprochement documentaire pour cette pièce.</p>
        )}
      </section>
    </>
  );
}
