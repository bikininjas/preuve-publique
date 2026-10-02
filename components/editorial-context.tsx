import type { Evidence } from '@/lib/types';
import { formatDate } from '@/lib/labels';

type Program = { author: string; election: string; edition: string; election_date: string; publication_date: string | null; date_note: string; scope_note: string };
type Indicator = { value: number; unit: string; period: string; geography: string; population: string; method: string; limits: string; series: Array<{ period: string; value: number }> };
type Judicial = { court: string; stage: string; status_at_event: string; current_status_note: string; presumption_note: string };

/** Editorial summaries are labelled; they never appear as verbatim quotations. */
export function EditorialContext({ evidence, compact = false }: { evidence: Evidence; compact?: boolean }) {
  const detail = evidence.detail;
  if (!detail) return null;
  const program = detail.program as Program | undefined;
  const indicator = detail.indicator as Indicator | undefined;
  const judicial = detail.judicial as Judicial | undefined;
  const summary = typeof detail.summary === 'string' ? detail.summary : null;
  return <div className="editorial-context">
    {summary ? <p><strong>Résumé documentaire : </strong>{summary}</p> : null}
    {evidence.kind === 'program' && program ? <>
      <p><strong>{program.author}</strong> · {program.election}</p>
      <p className="hint">{program.scope_note}</p>
      {!compact ? <><p>{program.edition}</p><p className="hint">{program.date_note} Date de publication : {program.publication_date ? formatDate(program.publication_date) : 'non précisée dans la source'}.</p></> : null}
    </> : null}
    {evidence.kind === 'indicator' && indicator ? <>
      <p className="indicator-value"><strong>{indicator.value.toLocaleString('fr-FR', { maximumFractionDigits: 3 })}</strong> <span>{indicator.unit} · {indicator.period}</span></p>
      <p><strong>Territoire : </strong>{indicator.geography}</p>
      {!compact ? <>
        <p><strong>Population : </strong>{indicator.population}</p>
        <p><strong>Méthode : </strong>{indicator.method}</p>
        <table className="table"><caption>Valeurs de la même édition de la source</caption><thead><tr><th scope="col">Année</th><th scope="col">Valeur ({indicator.unit})</th></tr></thead><tbody>{indicator.series.map((point) => <tr key={point.period}><th scope="row">{point.period}</th><td>{point.value.toLocaleString('fr-FR', { maximumFractionDigits: 3 })}</td></tr>)}</tbody></table>
      </> : null}
      <p className="hint">{indicator.limits}</p>
    </> : null}
    {evidence.kind === 'judicial_event' && judicial ? <>
      <p><strong>{judicial.court}</strong> · {judicial.stage}</p>
      <p><strong>Au {formatDate(evidence.occurred_at)} : </strong>{judicial.status_at_event}</p>
      <p className="hint">{judicial.current_status_note}</p>
      {!compact ? <p className="hint">{judicial.presumption_note}</p> : null}
    </> : null}
  </div>;
}
