import Link from 'next/link';
import type { Evidence } from '@/lib/types';
import { formatDate, institutionLabel, kindLabel } from '@/lib/labels';
import { readerTitle, scrutinNumber, voteScope, voteTally } from '@/lib/reader';
import { VoteDistribution } from '@/components/vote-distribution';
import { VoteTopics } from '@/components/vote-topics';
import { EditorialContext } from '@/components/editorial-context';

/** One documentary piece; the protected review view links to its admin fiche. */
export function EvidenceCard({ item, review = false }: { item: Evidence; review?: boolean }) {
  const number = scrutinNumber(item);
  const scope = voteScope(item);
  const tally = item.kind === 'vote' ? voteTally(item) : null;
  const href = `${review ? '/admin' : ''}/pieces/${item.id}`;
  return (
    <article className="card evidence-card">
      <div className="card-top"><span className="count">{kindLabel(item.kind)}{item.institution ? ` · ${institutionLabel(item.institution)}` : ''}</span><span className="card-date">{item.kind === 'indicator' ? 'Source du ' : ''}{formatDate(item.occurred_at)}</span></div>
      {scope ? <p className="card-vote-scope">Vote sur : <b>{scope}</b></p> : null}
      {item.kind === 'vote' ? <span className="card-topic-label">Sujet du texte concerné</span> : null}
      <h3>
        <Link href={href}>{readerTitle(item)}</Link>
      </h3>
      {number ? <p className="card-ref">Scrutin officiel n° {number}</p> : null}
      {item.kind === 'vote' ? <VoteTopics title={item.title} institution={item.institution} /> : null}
      {item.publication_confidence != null ? <p className="card-confidence" title="Conformité documentaire à la source ; cet indice ne mesure pas une interprétation politique.">Source recoupée · conformité {Math.round(Number(item.publication_confidence) * 100)}/100</p> : null}
      {item.topics?.length ? <div className="chip-row">{item.topics.slice(0, 2).map((topic) => <span className="chip" key={topic}>{topic}</span>)}</div> : null}
      {tally && (tally.pour !== null || tally.contre !== null) ? <VoteDistribution tally={tally} compact /> : null}
      {item.kind === 'vote' && item.institution === 'assemblee' ? <Link className="card-party-link" href={`/pieces/${item.id}#votes-par-parti`}>Voir les parts par parti →</Link> : null}
      {item.kind === 'vote' && item.institution === 'senat' ? <Link className="card-party-link" href={`/pieces/${item.id}#votes-par-groupe`}>Voir les parts par groupe →</Link> : null}
      <EditorialContext evidence={item} compact />
      <p className="source">
        <a href={item.source_url} target="_blank" rel="noopener noreferrer">
          Source officielle ↗
        </a>
        <Link href={href}>{review ? 'Relire la fiche' : 'Lire la fiche'} →</Link>
      </p>
    </article>
  );
}
