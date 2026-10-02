import Link from 'next/link';
import type { Evidence } from '@/lib/types';
import { formatDate, institutionLabel, kindLabel } from '@/lib/labels';
import { readerTitle, scrutinNumber, voteScope, voteTally } from '@/lib/reader';
import { VoteDistribution } from '@/components/vote-distribution';

/** One published piece, as shown in the browsing lists. */
export function EvidenceCard({ item }: { item: Evidence }) {
  const number = scrutinNumber(item);
  const scope = voteScope(item);
  const tally = item.kind === 'vote' ? voteTally(item) : null;
  return (
    <article className="card evidence-card">
      <div className="card-top"><span className="count">{kindLabel(item.kind)} · {institutionLabel(item.institution)}</span><span className="card-date">{formatDate(item.occurred_at)}</span></div>
      {scope ? <p className="card-vote-scope">Vote sur : <b>{scope}</b></p> : null}
      {item.kind === 'vote' ? <span className="card-topic-label">Sujet du texte concerné</span> : null}
      <h3>
        <Link href={`/pieces/${item.id}`}>{readerTitle(item)}</Link>
      </h3>
      {number ? <p className="card-ref">Scrutin officiel n° {number}</p> : null}
      {item.publication_confidence != null ? <p className="card-confidence" title="Conformité documentaire à la source ; cet indice ne mesure pas une interprétation politique.">Source recoupée · conformité {Math.round(Number(item.publication_confidence) * 100)}/100</p> : null}
      {item.topics?.length ? <div className="chip-row">{item.topics.slice(0, 2).map((topic) => <span className="chip" key={topic}>{topic}</span>)}</div> : null}
      {tally && (tally.pour !== null || tally.contre !== null) ? <VoteDistribution tally={tally} compact /> : null}
      {item.kind === 'vote' && item.institution === 'assemblee' ? <Link className="card-party-link" href={`/pieces/${item.id}#votes-par-parti`}>Voir les parts par parti →</Link> : null}
      {item.kind === 'vote' && item.institution === 'senat' ? <Link className="card-party-link" href={`/pieces/${item.id}#votes-par-groupe`}>Voir les parts par groupe →</Link> : null}
      <p className="source">
        <a href={item.source_url} target="_blank" rel="noopener noreferrer">
          Source officielle ↗
        </a>
        <Link href={`/pieces/${item.id}`}>Lire la fiche →</Link>
      </p>
    </article>
  );
}
