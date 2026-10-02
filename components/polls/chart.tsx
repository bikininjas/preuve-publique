'use client';

import { useState } from 'react';
import type { PollResult, PollScenario, PublishedPoll } from '@/lib/polls/types';

const COLORS = ['#205c75', '#ab5035', '#7554a1', '#307052', '#925c20', '#a83f72', '#4c6171', '#81721d', '#137f80', '#635736', '#694154', '#224685', '#467620', '#984829', '#474774', '#677171'];
export const pollDate = (date: string) => new Date(`${date}T12:00:00Z`).toLocaleDateString('fr-FR', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' });
export const pollScore = (score: number) => `${score.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} %`;
const sample = (size: number | null) => size === null ? 'non renseigné' : `${size.toLocaleString('fr-FR')} personnes`;

interface Point { poll: PublishedPoll; scenario: PollScenario; result: PollResult; color: string }

function pointDescription(point: Point): string {
  return `${point.result.candidate_name} : ${pollScore(point.result.score)} · ${point.poll.institute}\nTerrain : ${pollDate(point.poll.fieldwork_start)} – ${pollDate(point.poll.fieldwork_end)}\nÉchantillon total : ${sample(point.poll.sample_size)} ; base de configuration : ${sample(point.scenario.scenario_sample_size)}\nTour ${point.scenario.round}, configuration ${point.scenario.scenario_number} : ${point.scenario.results.map((r) => r.candidate_name).join(', ')}\nSource : ${point.poll.source_url}`;
}

/** Individual points only. No averaging, smoothing, interpolation or ranking. */
export function PollChart({ polls, selected }: { polls: PublishedPoll[]; selected: string[] }) {
  const [active, setActive] = useState<Point | null>(null);
  const points: Point[] = polls.flatMap((poll) => poll.scenarios.flatMap((scenario) => scenario.results
    .filter((result) => selected.includes(result.candidate_external_id))
    .map((result) => ({ poll, scenario, result, color: COLORS[selected.indexOf(result.candidate_external_id) % COLORS.length] }))));
  if (!points.length) return <div className="empty">Aucune mesure à tracer. Sélectionnez au moins un candidat avec un résultat dans cette hypothèse et cette période.</div>;
  const dates = points.map((p) => Date.parse(p.poll.fieldwork_end));
  const first = Math.min(...dates), last = Math.max(...dates);
  const width = 980, height = 420, left = 55, right = 25, top = 30, bottom = 55;
  const maxScore = Math.min(100, Math.max(20, Math.ceil(Math.max(...points.map((p) => p.result.score)) / 10) * 10));
  const x = (date: number) => first === last ? width / 2 : left + (date - first) / (last - first) * (width - left - right);
  const y = (score: number) => height - bottom - score / maxScore * (height - top - bottom);
  const ticks = Array.from({ length: 6 }, (_, index) => index * maxScore / 5);
  const dateTicks = first === last ? [first] : Array.from({ length: 5 }, (_, index) => first + index * (last - first) / 4);
  const chosen = active && points.find((p) => p.poll.id === active.poll.id && p.scenario.round === active.scenario.round && p.scenario.scenario_number === active.scenario.scenario_number && p.result.candidate_external_id === active.result.candidate_external_id);
  return <div className="poll-chart">
    <div className="poll-chart-scroll"><svg viewBox={`0 0 ${width} ${height}`} role="group" aria-label="Intentions de vote publiées en pourcentage, par date de fin du terrain. Chaque point peut recevoir le focus.">
      {ticks.map((tick) => <g key={tick}><line x1={left} x2={width - right} y1={y(tick)} y2={y(tick)} className="poll-grid-line" /><text x={left - 10} y={y(tick) + 5} textAnchor="end">{tick.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} %</text></g>)}
      {dateTicks.map((date) => <text key={date} x={x(date)} y={height - 22} textAnchor={date === first && first !== last ? 'start' : date === last && first !== last ? 'end' : 'middle'}>{new Date(date).toLocaleDateString('fr-FR', { timeZone: 'UTC', day: 'numeric', month: 'short' })}</text>)}
      {points.map((point) => <circle key={`${point.poll.id}/${point.scenario.round}/${point.scenario.scenario_number}/${point.result.candidate_external_id}`}
        cx={x(Date.parse(point.poll.fieldwork_end))} cy={y(point.result.score)} r={5.5} fill={point.color} stroke="white" strokeWidth={1.5}
        tabIndex={0} role="button" aria-label={pointDescription(point)} onMouseEnter={() => setActive(point)} onFocus={() => setActive(point)} onClick={() => setActive(point)}
        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setActive(point); } }}>
        <title>{pointDescription(point)}</title>
      </circle>)}
    </svg></div>
    <div className="poll-legend">{selected.map((id, index) => {
      const result = points.find((p) => p.result.candidate_external_id === id)?.result;
      return result ? <span key={id}><i style={{ background: COLORS[index % COLORS.length] }} />{result.candidate_name}</span> : null;
    })}</div>
    <div className="poll-point-detail" aria-live="polite">{chosen ? <>
      <strong>{chosen.result.candidate_name} · {pollScore(chosen.result.score)} · {chosen.poll.institute}</strong>
      <p>Terrain du {pollDate(chosen.poll.fieldwork_start)} au {pollDate(chosen.poll.fieldwork_end)}. Échantillon total : {sample(chosen.poll.sample_size)}. Base de configuration : {sample(chosen.scenario.scenario_sample_size)}.</p>
      <p>Tour {chosen.scenario.round}, configuration n° {chosen.scenario.scenario_number} : {chosen.scenario.results.map((r) => r.candidate_name).join(' · ')}.</p>
      <a href={chosen.poll.source_url} target="_blank" rel="noopener noreferrer">Voir la source ↗</a>
    </> : <p>Survolez, touchez ou sélectionnez au clavier un point pour consulter sa mesure, son terrain, son échantillon, sa configuration et sa source. Plusieurs configurations du même sondage peuvent partager la même liste de candidats et la même date.</p>}</div>
  </div>;
}
