import Link from 'next/link';
import type { Evidence } from '@/lib/types';
import { formatDate, institutionLabel, kindLabel } from '@/lib/labels';
import { readerTitle, scrutinNumber, voteScope, voteTally } from '@/lib/reader';

/** One published piece, as shown in the browsing lists. */
export function EvidenceCard({ item }: { item: Evidence }) {
  const number = scrutinNumber(item);
  const scope = voteScope(item);
  const tally = item.kind === 'vote' ? voteTally(item) : null;
  return (
    <article className="card evidence-card">
      <div className="card-top"><span className="count">{kindLabel(item.kind)} · {institutionLabel(item.institution)}</span><span className="card-date">{formatDate(item.occurred_at)}</span></div>
      <h3>
        <Link href={`/pieces/${item.id}`}>{readerTitle(item)}</Link>
      </h3>
      {number ? <p className="card-ref">Scrutin officiel n° {number}</p> : null}
      {item.publication_confidence != null ? <p className="hint">Source recoupée · indice de conformité {Math.round(Number(item.publication_confidence) * 100)}/100</p> : null}
      {scope || item.topics?.length ? <div className="chip-row">{scope ? <span className="chip scope-chip">{scope}</span> : null}{item.topics?.slice(0, 2).map((topic) => <span className="chip" key={topic}>{topic}</span>)}</div> : null}
      {tally && (tally.pour !== null || tally.contre !== null) ? <div className="vote-mini"><span>Pour <b>{tally.pour ?? '—'}</b></span><span>Contre <b>{tally.contre ?? '—'}</b></span><span>Abst. <b>{tally.abstentions ?? '—'}</b></span></div> : null}
      <p className="source">
        <a href={item.source_url} target="_blank" rel="noopener noreferrer">
          Source officielle ↗
        </a>
        <Link href={`/pieces/${item.id}`}>Lire la fiche →</Link>
      </p>
    </article>
  );
}
