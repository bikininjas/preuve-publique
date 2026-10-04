import type { Evidence } from '@/lib/types';
import { voteBalance, voteReading } from '@/lib/vote-reading';

export function VoteReading({ evidence, compact = false }: { evidence: Evidence; compact?: boolean }) {
  const reading = voteReading(evidence);
  if (!reading) return null;
  const balance = voteBalance(evidence);
  return <div className={`vote-reading${compact ? ' compact' : ''}`}>
    <p><strong>En résumé : </strong>{reading.summary}</p>
    <p className="vote-reading-result"><strong>{reading.result}</strong>{balance ? <span>{balance}</span> : null}</p>
    {compact ? null : <>
      <dl className="vote-meaning"><div><dt>Voter pour</dt><dd>{reading.pour}</dd></div><div><dt>Voter contre</dt><dd>{reading.contre}</dd></div></dl>
      <p className="hint">Le sujet du titre ne suffit pas à établir l’effet de chaque mesure. Le texte et les explications de vote permettent d’en comprendre le contenu et les motifs.</p>
    </>}
  </div>;
}
