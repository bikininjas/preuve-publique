'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { PublishedPoll } from '@/lib/polls/types';
import { pollDate, pollScore } from '@/lib/polls/format';
import { pollSeriesColor } from '@/lib/polls/presentation';
import { pollChartSeries, type PollChartCluster, type PollChartSeries } from '@/lib/polls/chart-model';

const sample = (size: number | null) => size === null ? 'non renseigné' : `${size.toLocaleString('fr-FR')} personnes`;
type Selection = { id: string; key: string };
type Layer = { series: PollChartSeries; color: string };

function description(series: PollChartSeries, cluster: PollChartCluster) {
  return `${series.name} : ${pollScore(cluster.score)} · ${pollDate(cluster.points[0].poll.fieldwork_end)} · ${cluster.points.length} mesure(s). Sélectionner pour consulter les instituts, hypothèses et sources.`;
}

function Plot({ layers, first, last, ceiling, active, focus, onSelect }: {
  layers: Layer[]; first: number; last: number; ceiling: number; active: Selection | null;
  focus?: string | null; onSelect: (selection: Selection) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(480);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(220, Math.round(entry.contentRect.width))));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const height = layers.length > 1 ? 320 : 150;
  const left = 48, right = 24, top = 22, bottom = 34;
  const x = (date: number) => first === last ? (left + width - right) / 2 : left + (date - first) / (last - first) * (width - left - right);
  const y = (score: number) => height - bottom - score / ceiling * (height - top - bottom);
  const ticks = layers.length > 1 ? Array.from({ length: 5 }, (_, i) => i * ceiling / 4) : [0, ceiling / 2, ceiling];
  const dateCount = first === last ? 1 : width < 480 ? 3 : 5;
  const dateTicks = Array.from({ length: dateCount }, (_, i) => first + i * (last - first) / Math.max(1, dateCount - 1));
  return <div className="poll-series-plot" ref={container}><svg viewBox={`0 0 ${width} ${height}`} role="group" aria-label={layers.length === 1 ? `Mesures de ${layers[0].series.name}, échelle de 0 à ${ceiling} %` : `Vue d’ensemble des mesures, échelle de 0 à ${ceiling} %`}>
    {ticks.map((tick) => <g key={tick}><line className="poll-grid-line" x1={left} x2={width - right} y1={y(tick)} y2={y(tick)} /><text className="poll-axis-label" x={left - 8} y={y(tick) + 4} textAnchor="end">{tick.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} %</text></g>)}
    {dateTicks.map((date) => <text className="poll-axis-label" key={date} x={x(date)} y={height - 8} textAnchor={date === first && first !== last ? 'start' : date === last && first !== last ? 'end' : 'middle'}>{new Date(date).toLocaleDateString('fr-FR', { timeZone: 'UTC', day: 'numeric', month: 'short' })}</text>)}
    {layers.map(({ series, color }) => <g key={series.id} opacity={focus && focus !== series.id ? .16 : 1}>{series.clusters.map((cluster) => {
      const chosen = active?.id === series.id && active.key === cluster.key;
      const select = () => onSelect({ id: series.id, key: cluster.key });
      return <g className="poll-measure-point" key={cluster.key} tabIndex={0} role="button" aria-label={description(series, cluster)} aria-pressed={chosen} onMouseEnter={select} onFocus={select} onClick={select} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(); } }}>
        <circle className="poll-point-target" cx={x(cluster.date)} cy={y(cluster.score)} r={12} fill="transparent" />
        <circle className="poll-point-mark" cx={x(cluster.date)} cy={y(cluster.score)} r={chosen ? 7 : 5} fill={color} stroke="var(--poll-point-outline)" strokeWidth={2} />
        {cluster.points.length > 1 ? <text className="poll-cluster-count" x={x(cluster.date) - 9} y={y(cluster.score) - 10} textAnchor="end">×{cluster.points.length}</text> : null}
        <title>{description(series, cluster)}</title>
      </g>;
    })}</g>)}
  </svg></div>;
}

function Measurement({ series, cluster }: { series?: PollChartSeries; cluster?: PollChartCluster }) {
  return <div className="poll-measure-inspector" aria-live="polite">{series && cluster ? <>
    <div className="poll-measure-caption"><strong>{pollScore(cluster.score)}</strong><span>{pollDate(cluster.points[0].poll.fieldwork_end)} · {cluster.points.map((point) => point.poll.institute).filter((name, index, all) => all.indexOf(name) === index).join(' / ')}</span><a href={cluster.points[0].poll.source_url} target="_blank" rel="noopener noreferrer">Source ↗</a></div>
    <details key={`${series.id}/${cluster.key}`}><summary>{cluster.points.length > 1 ? `${cluster.points.length} mesures superposées : consulter chaque hypothèse` : 'Terrain, échantillon et hypothèse'}</summary>{cluster.points.map((point) => <div className="poll-measure-document" key={`${point.poll.id}/${point.scenario.round}/${point.scenario.scenario_number}`}>
      <strong>{series.name} · {pollScore(point.result.score)} · {point.poll.institute}</strong>
      <p>Terrain du {pollDate(point.poll.fieldwork_start)} au {pollDate(point.poll.fieldwork_end)}. Échantillon total : {sample(point.poll.sample_size)} ; base de configuration : {sample(point.scenario.scenario_sample_size)}.</p>
      <p>Tour {point.scenario.round} · Configuration n° {point.scenario.scenario_number} : {point.scenario.results.map((result) => result.candidate_name).join(' · ')}.</p>
      <a href={point.poll.source_url} target="_blank" rel="noopener noreferrer">Publication originale ↗</a>
    </div>)}</details>
  </> : <p>Sélectionnez un point pour lire sa valeur, son institut et sa source.</p>}</div>;
}

/** Separate candidate series by default. No interpolation, smoothing or average. */
export function PollChart({ polls, selected, roster }: { polls: PublishedPoll[]; selected: string[]; roster: string[] }) {
  const [view, setView] = useState<'separate' | 'overview'>('separate');
  const [active, setActive] = useState<Selection | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const series = pollChartSeries(polls, selected).sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  if (!series.length) return <div className="empty">Aucune mesure à tracer. Sélectionnez au moins un candidat avec un résultat dans cette hypothèse et cette période.</div>;
  const dates = polls.map((poll) => Date.parse(poll.fieldwork_end));
  const first = Math.min(...dates), last = Math.max(...dates);
  const chosenSeries = series.find((item) => item.id === active?.id);
  const chosenCluster = chosenSeries?.clusters.find((cluster) => cluster.key === active?.key);
  const layers = series.map((item) => ({ series: item, color: pollSeriesColor(item.id, roster) }));
  const ceiling = Math.max(...series.map((item) => item.ceiling));
  return <div className="poll-chart readable-poll-chart">
    <div className="poll-chart-toolbar"><div className="poll-chart-view" role="group" aria-label="Présentation du graphique"><button type="button" aria-pressed={view === 'separate'} onClick={() => setView('separate')}>Par personne</button><button type="button" aria-pressed={view === 'overview'} onClick={() => setView('overview')}>Vue d’ensemble</button></div><span>{series.length} personne(s) · {series.reduce((total, item) => total + item.points.length, 0)} mesures</span></div>
    <p className="poll-chart-guide">{view === 'separate' ? 'Une série par personne, classée par nom. Les échelles verticales sont adaptées et indiquées sur chaque carte ; comparez les valeurs, pas les hauteurs.' : 'Une échelle commune à toutes les personnes. Cliquez sur un nom pour mettre sa série en évidence.'} Un point = une mesure publiée. ×2 signale deux mesures aux mêmes coordonnées.</p>
    <p className="poll-chart-period">Fin du terrain : {pollDate(polls.find((poll) => Date.parse(poll.fieldwork_end) === first)!.fieldwork_end)} → {pollDate(polls.find((poll) => Date.parse(poll.fieldwork_end) === last)!.fieldwork_end)}.</p>
    {view === 'separate' ? <div className="poll-series-grid">{layers.map(({ series: item, color }) => <section className="poll-series-card" key={item.id}>
      <header><h3><i style={{ background: color }} aria-hidden="true" /><Link href={`/presidentielle-2027/candidats/${item.id}`}>{item.name}</Link></h3><span>Échelle 0–{item.ceiling} % · {item.points.length} mesure(s)</span></header>
      <Plot layers={[{ series: item, color }]} first={first} last={last} ceiling={item.ceiling} active={active} onSelect={setActive} />
      <Measurement series={chosenSeries?.id === item.id ? chosenSeries : undefined} cluster={chosenSeries?.id === item.id ? chosenCluster : undefined} />
    </section>)}</div> : <>
      <div className="poll-overview-legend">{layers.map(({ series: item, color }) => <button key={item.id} type="button" aria-pressed={focus === item.id} onClick={() => setFocus(focus === item.id ? null : item.id)}><i aria-hidden="true" style={{ background: color }} />{item.name}</button>)}</div>
      <Plot layers={layers} first={first} last={last} ceiling={ceiling} active={active} focus={focus} onSelect={setActive} />
      <Measurement series={chosenSeries} cluster={chosenCluster} />
    </>}
  </div>;
}
