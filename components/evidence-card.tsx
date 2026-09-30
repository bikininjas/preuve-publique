import Link from 'next/link';
import type { Evidence } from '@/lib/types';
import { formatDate, institutionLabel, kindLabel } from '@/lib/labels';

/** One published piece, as shown in the browsing lists. */
export function EvidenceCard({ item }: { item: Evidence }) {
  return (
    <article className="card">
      <span className="count">
        {kindLabel(item.kind)} · {institutionLabel(item.institution)}
      </span>
      <h3>
        <Link href={`/pieces/${item.id}`}>{item.title}</Link>
      </h3>
      {item.excerpt ? <p>{item.excerpt}</p> : null}
      <p className="source">
        {formatDate(item.occurred_at)} ·{' '}
        <a href={item.source_url} target="_blank" rel="noopener noreferrer">
          Consulter la source ↗
        </a>
      </p>
    </article>
  );
}
