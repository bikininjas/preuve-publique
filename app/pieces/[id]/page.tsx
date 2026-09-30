import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Citation, Empty, MetaList, RawJson, type MetaEntry } from '@/components/ui';
import { getEvidenceItem } from '@/lib/data';
import {
  RELATION_NOTES,
  formatDate,
  formatDateTime,
  institutionLabel,
  kindLabel,
  methodLabel,
  relationLabel,
} from '@/lib/labels';
import { isUuid } from '@/lib/params';

export const dynamic = 'force-dynamic';

export default async function EvidenceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id)) notFound();

  let item: Awaited<ReturnType<typeof getEvidenceItem>> = null;
  let unavailable = false;
  try {
    item = await getEvidenceItem(id);
  } catch {
    unavailable = true;
  }
  if (unavailable) {
    return (
      <main className="narrow">
        <h1>Pièce indisponible</h1>
        <Empty>La base documentaire n’est pas accessible pour le moment. Réessayez plus tard.</Empty>
      </main>
    );
  }
  if (!item) notFound();
  const { evidence, source, actor, links } = item;

  const refs = Array.isArray(evidence.detail?.refs) ? evidence.detail.refs : [];
  const scalars = Object.entries(evidence.detail ?? {}).filter(
    ([key, value]) =>
      key !== 'refs' && (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'),
  );
  const meta: MetaEntry[] = [
    {
      term: 'Source',
      children: (
        <a href={evidence.source_url} target="_blank" rel="noopener noreferrer">
          {source?.publisher ?? 'Document original'} ↗
        </a>
      ),
    },
    ...(source ? [{ term: 'Document', children: source.document_title }] : []),
    { term: 'Repère dans la source', children: evidence.source_locator ?? '—' },
    { term: 'Type', children: kindLabel(evidence.kind) },
    ...refs.map((ref) => ({
      term: 'Référence documentaire',
      children: (
        <>
          <code>{ref.type}</code> · {ref.value}
        </>
      ),
    })),
    ...scalars.map(([key, value]) => ({ term: key, children: String(value) })),
  ];

  return (
    <main>
      <p className="breadcrumb">
        <Link className="quiet" href="/pieces">
          ← Toutes les pièces
        </Link>
      </p>
      <div className="eyebrow">
        {kindLabel(evidence.kind)} · {institutionLabel(evidence.institution)}
      </div>
      <h1 className="title">{evidence.title}</h1>
      <p className="resultline">
        {formatDate(evidence.occurred_at)}
        {actor ? <> · {actor.name}</> : null}
        {evidence.external_id ? (
          <>
            {' '}
            · référence <code>{evidence.external_id}</code>
          </>
        ) : null}
        {evidence.reviewed_at ? <> · relue le {formatDate(evidence.reviewed_at)}</> : null}
      </p>

      {evidence.excerpt ? (
        <Citation footer="Formulation reprise de la source ; le lien ci-dessous mène au document original.">
          {evidence.excerpt}
        </Citation>
      ) : null}

      <section className="panel">
        <h2>Provenance</h2>
        <MetaList items={meta} />
        <p className="hint">
          {source
            ? `Récupéré le ${formatDateTime(source.retrieved_at)}${
                source.sha256 ? ` · empreinte SHA-256 ${source.sha256.slice(0, 12)}…` : ''
              }`
            : 'Source récupérée par l’importeur ; le document original reste chez son éditeur.'}
        </p>
        {evidence.detail ? <RawJson summary="Faits structurés bruts (JSON copié de la source)" value={evidence.detail} /> : null}
      </section>

      {links.length ? (
        <section>
          <h2>Rapprochements documentaires</h2>
          <p className="hint">
            Ces liens signalent une parenté documentaire (même référence, même dossier), jamais un soutien ni une
            contradiction.
          </p>
          <div className="cards">
            {links.map((link) => (
              <article className="card" key={link.id}>
                <span className="count">{relationLabel(link.relation)}</span>
                <h3>
                  <Link href={`/pieces/${link.related.id}`}>{link.related.title}</Link>
                </h3>
                {link.rationale ? <p>{link.rationale}</p> : null}
                <p className="source">
                  {methodLabel(link.method)} · confiance {Number(link.confidence).toLocaleString('fr-FR')}
                </p>
                <p className="hint">{RELATION_NOTES[link.relation]}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
