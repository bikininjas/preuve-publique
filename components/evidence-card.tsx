import Link from 'next/link';
import type { Evidence } from '@/lib/types';
import { formatEvidenceDate, kindLabel } from '@/lib/labels';
import { InstitutionBadge } from '@/components/institution-badge';
import { readerTitle, scrutinNumber, voteScope, voteTally } from '@/lib/reader';
import { peDocumentReference } from '@/lib/pe-document';
import { VoteDistribution } from '@/components/vote-distribution';
import { VoteTopics } from '@/components/vote-topics';
import { EditorialContext } from '@/components/editorial-context';
import { VoteReading } from '@/components/vote-reading';
import { voteReading } from '@/lib/vote-reading';

/** One documentary piece; the protected review view links to its admin fiche. */
export function EvidenceCard({ item, review = false }: { item: Evidence; review?: boolean }) {
  const number = scrutinNumber(item);
  const document = item.kind === 'vote' && item.institution === 'parlement_europeen' ? peDocumentReference(item.title) : null;
  const scope = voteScope(item);
  const tally = item.kind === 'vote' ? voteTally(item) : null;
  const href = `${review ? '/admin' : ''}/pieces/${item.id}`;
  return (
    <article data-institution={item.institution ?? undefined} className={`card evidence-card${item.kind === 'indicator' && !review ? ' indicator-card' : ''}`}>
      <div className="card-top"><span className="count">{kindLabel(item.kind)}</span><span className="card-date">{item.kind === 'indicator' ? 'Source : ' : ''}{formatEvidenceDate(item)}</span></div>
      <InstitutionBadge institution={item.institution} />
      {scope ? <p className="card-vote-scope">{voteReading(item)?.final ? <b>Adoption définitive de la loi</b> : <>Vote sur : <b>{scope}</b></>}</p> : null}
      {item.kind === 'vote' ? <span className="card-topic-label">Sujet du texte concerné</span> : null}
      <h3>
        <Link href={href}>{readerTitle(item)}</Link>
      </h3>
      {item.kind === 'vote' ? <VoteReading evidence={item} compact /> : null}
      {number || document || item.publication_confidence != null ? <details className="card-trace"><summary>Références et contrôles</summary>
        {number ? <p className="card-ref">Scrutin officiel n° {number}</p> : null}
        {document ? <p className="card-ref">Texte {document.label}</p> : null}
        {item.publication_confidence != null ? <p className="card-confidence">Conformité documentaire à la source : {Math.round(Number(item.publication_confidence) * 100)}/100. Cet indice ne mesure pas une interprétation politique.</p> : null}
      </details> : null}
      {item.kind === 'vote' ? <VoteTopics title={item.title} institution={item.institution} /> : null}
      {item.topics?.length ? <div className="chip-row">{item.topics.slice(0, 2).map((topic) => <span className="chip" key={topic}>{topic}</span>)}</div> : null}
      {tally && (tally.pour !== null || tally.contre !== null) ? <VoteDistribution tally={tally} compact /> : null}
      {item.kind === 'vote' && item.institution === 'assemblee' ? <Link className="card-party-link" href={`/pieces/${item.id}#votes-par-parti`}>Voir les parts par parti →</Link> : null}
      {item.kind === 'vote' && item.institution === 'senat' ? <Link className="card-party-link" href={`/pieces/${item.id}#votes-par-groupe`}>Voir les parts par groupe →</Link> : null}
      <EditorialContext evidence={item} compact />
      <p className="source">
        <a href={item.source_url} target="_blank" rel="noopener noreferrer">
          {item.kind === 'indicator' ? 'Source primaire' : 'Source officielle'} ↗
        </a>
        <Link href={href}>{review ? 'Relire la fiche' : 'Lire la fiche'} →</Link>
      </p>
    </article>
  );
}
