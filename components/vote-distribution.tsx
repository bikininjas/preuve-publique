import type { VoteTally } from '@/lib/reader';

/** Official counts only. Missing counts never become a zero in the chart. */
export function VoteDistribution({ tally, compact = false }: { tally: VoteTally; compact?: boolean }) {
  const positions = [
    { key: 'pour', label: 'Pour', value: tally.pour },
    { key: 'contre', label: 'Contre', value: tally.contre },
    { key: 'abstention', label: 'Abstentions', value: tally.abstentions },
  ];
  const complete = positions.every(({ value }) => value !== null && value >= 0);
  const total = positions.reduce((sum, { value }) => sum + (value ?? 0), 0);
  return <div className={`vote-distribution${compact ? ' compact' : ''}`}>
    {complete && total > 0 ? <div className="distribution-track" role="img"
      aria-label={positions.map(({ label, value }) => `${label} : ${value!.toLocaleString('fr-FR')} (${(value! / total * 100).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} %)`).join(', ')}>
      {positions.filter(({ value }) => value! > 0).map(({ key, label, value }) => <span key={key}
        className={key} style={{ width: `${value! / total * 100}%` }}
        title={`${label} : ${value!.toLocaleString('fr-FR')}`} />)}
    </div> : null}
    <div className="distribution-values">{positions.map(({ key, label, value }) => <span key={key} className={key}>
      <i aria-hidden="true" /><span>{label}<b>{value?.toLocaleString('fr-FR') ?? '—'}</b></span>
    </span>)}</div>
    {!compact ? <p className="distribution-note">Répartition des pour, contre et abstentions enregistrés. Les non-participants ne sont pas inclus dans cette barre.</p> : null}
  </div>;
}
