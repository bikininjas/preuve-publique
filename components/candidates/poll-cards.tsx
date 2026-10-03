import Link from 'next/link';
import { pollDate, pollScore } from '@/lib/polls/format';
import type { PublishedPoll } from '@/lib/polls/types';

export function CandidatePollCards({ polls, candidate }: { polls: PublishedPoll[]; candidate: string }) {
  if (!polls.length) return <p className="empty">Aucun sondage publié pour cette personne dans le corpus.</p>;
  return <div className="candidate-poll-grid">{polls.map((poll) => <article className="candidate-poll-card" key={poll.id}>
    <header><span className="eyebrow">{poll.institute}</span><h3>{pollDate(poll.fieldwork_end)}</h3><p className="hint">Terrain du {pollDate(poll.fieldwork_start)} au {pollDate(poll.fieldwork_end)}<br />Échantillon total : {poll.sample_size?.toLocaleString('fr-FR') ?? 'non renseigné'}</p></header>
    <div className="candidate-scenario-list">{poll.scenarios.map((scenario) => {
      const result = scenario.results.find((item) => item.candidate_external_id === candidate);
      if (!result) return null;
      return <details className="candidate-scenario" key={`${scenario.round}/${scenario.scenario_number}`}>
        <summary><span>Tour {scenario.round}<small>Configuration n° {scenario.scenario_number} · détails ↓</small></span><strong>{pollScore(result.score)}</strong></summary>
        <div><p>Hypothèse : {scenario.results.map((item) => item.candidate_name).join(' · ')}</p><p className="hint">Base de configuration : {scenario.scenario_sample_size?.toLocaleString('fr-FR') ?? 'non renseignée'}. Libellé de parti Sondax : {result.party ?? 'non renseigné'}.</p><Link href="/presidentielle-2027/sondages">Explorer les hypothèses →</Link></div>
      </details>;
    })}</div>
    <a className="candidate-poll-source" href={poll.source_url} target="_blank" rel="noopener noreferrer">Consulter la source originale ↗</a>
  </article>)}</div>;
}
