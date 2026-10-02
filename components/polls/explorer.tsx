'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PollChart } from './chart';
import { pollDate,pollScore } from '@/lib/polls/format';
import { pollSeriesColor } from '@/lib/polls/presentation';
import type { PollOptions, PollPage, PublishedPoll } from '@/lib/polls/types';

async function api<T>(path: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(path, { signal });
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(body?.error ?? 'Impossible de charger cette sélection.');
  }
  return response.json() as Promise<T>;
}

function PollDetails({ poll, roster }: { poll: PublishedPoll; roster: string[] }) {
  return <article className="poll-card">
    <header><div><span className="eyebrow">{poll.institute}</span><h3>Terrain du {pollDate(poll.fieldwork_start)} au {pollDate(poll.fieldwork_end)}</h3></div>
      <a className="button secondary" href={poll.source_url} target="_blank" rel="noopener noreferrer">Voir la source ↗</a></header>
    <p className="hint">Échantillon total : {poll.sample_size?.toLocaleString('fr-FR') ?? 'non renseigné'}. Fournisseur : {poll.source_provider} · Référence : {poll.external_id}.</p>
    {poll.scenarios.map((scenario) => <details key={`${scenario.round}/${scenario.scenario_number}`} className="poll-scenario">
      <summary>Tour {scenario.round} · Configuration n° {scenario.scenario_number}<span>{scenario.results.length} personnes · Voir les résultats ↓</span></summary>
      <p className="hint">Base de la configuration : {scenario.scenario_sample_size?.toLocaleString('fr-FR') ?? 'non renseignée'}.
        {scenario.is_primary === null ? '' : scenario.is_primary ? ' Configuration principale indiquée par Sondax.' : ' Configuration alternative indiquée par Sondax.'}</p>
      <p className="poll-roster">Hypothèse : {scenario.results.map((r) => r.candidate_name).join(' · ')}.</p>
      <div className="poll-table-scroll"><table><caption className="sr-only">Résultats publiés pour cette configuration</caption>
        <thead><tr><th scope="col">Candidat</th><th scope="col">Parti indiqué par Sondax</th><th scope="col">Intention de vote</th></tr></thead>
        <tbody>{scenario.results.map((result) => <tr key={result.candidate_external_id}><th scope="row"><Link href={`/presidentielle-2027/candidats/${result.candidate_external_id}`}>{result.candidate_name} →</Link></th><td>{result.party ?? 'Non renseigné'}</td><td><span className="poll-table-score"><span aria-hidden="true" className="poll-score-track"><i style={{ width: `${result.score}%`, background: pollSeriesColor(result.candidate_external_id, roster) }} /></span><strong>{pollScore(result.score)}</strong></span></td></tr>)}</tbody>
      </table></div>
    </details>)}
    <details className="poll-provenance"><summary>Trace de l’import et licence</summary>
      <p>Données : <a href="https://sondax.fr/" target="_blank" rel="noopener noreferrer">Sondax, d’après Wikipédia</a> · CC BY-SA 4.0. Mode source : {poll.source_origin}.</p>
      {poll.wikipedia_revision ? <p><a href={`https://fr.wikipedia.org/w/index.php?oldid=${poll.wikipedia_revision}`} target="_blank" rel="noopener noreferrer">Révision Wikipédia {poll.wikipedia_revision} ↗</a></p> : <p>Aucune révision Wikipédia : saisie manuelle signalée par Sondax.</p>}
      <p>Fichier : <a href={poll.dataset_url} target="_blank" rel="noopener noreferrer">CSV utilisé ↗</a> · récupéré le {new Date(poll.retrieved_at).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}.</p>
      <p>Empreinte SHA-256 du fichier : <code>{poll.dataset_sha256}</code></p>
      <p>Empreinte SHA-256 des données normalisées de ce sondage : <code>{poll.content_sha256}</code></p>
    </details>
  </article>;
}

export function PollExplorer() {
  const [options, setOptions] = useState<PollOptions | null>(null);
  const [round, setRound] = useState<1 | 2>(1), [configuration, setConfiguration] = useState('');
  const [institute, setInstitute] = useState(''), [startDate, setStartDate] = useState(''), [endDate, setEndDate] = useState('');
  const [selected, setSelected] = useState<string[]>([]), [page, setPage] = useState(1);
  const [data, setData] = useState<PollPage | null>(null), [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null), [retry, setRetry] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    const update = () => setFiltersOpen(!media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    api<PollOptions>('/api/polls/options', controller.signal).then((value) => {
      setOptions(value);
      const initial = value.configurations.find((c) => c.round === 1);
      setRound(1);
      setConfiguration(initial?.key ?? '');
      setSelected(initial?.key.split(':')[1].split('|') ?? []);
      if (!initial) setLoading(false);
      setError(null);
    }).catch(() => { if (!controller.signal.aborted) { setError('Impossible de charger les sondages pour le moment.'); setLoading(false); } });
    return () => controller.abort();
  }, [retry]);
  useEffect(() => {
    if (!options || !configuration) return;
    const controller = new AbortController();
    const params = new URLSearchParams({ round: String(round), configuration, page: String(page), limit: '100' });
    if (institute) params.set('institute', institute);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    api<PollPage>(`/api/polls?${params}`, controller.signal).then((value) => {
      setData(value); setError(null); setLoading(false);
    }).catch((failure: unknown) => { if (!controller.signal.aborted) { setData(null); setError(failure instanceof Error ? failure.message : 'Données indisponibles.'); setLoading(false); } });
    return () => controller.abort();
  }, [options, configuration, round, institute, startDate, endDate, page, retry]);

  const change = (action: () => void) => { setLoading(true); setData(null); setPage(1); action(); };
  const configurations = options?.configurations.filter((c) => c.round === round) ?? [];
  const roster = configuration.split(':')[1]?.split('|') ?? [];
  const candidates = options?.candidates.filter((c) => roster.includes(c.id)) ?? [];
  const currentConfiguration = configurations.find((c) => c.key === configuration);
  const latestPoll = data?.polls[0];
  const latestScenario = latestPoll?.scenarios[0];
  return <section id="explorer-sondages" className="poll-explorer" aria-label="Explorer les intentions de vote">
    {options ? <div className="poll-corpus-strip"><span><strong>{options.institutes.length}</strong> instituts dans le corpus</span><span><strong>{options.candidates.length}</strong> personnes testées</span><span>Terrains couverts <strong>{options.firstDate ? pollDate(options.firstDate) : 'non renseignés'}{options.lastDate ? ` → ${pollDate(options.lastDate)}` : ''}</strong></span></div> : null}
    <div className="poll-workspace">
    <aside className="poll-filter-panel" aria-label="Filtres des sondages">
      <details className="poll-filter-disclosure" open={filtersOpen} onToggle={(event) => setFiltersOpen(event.currentTarget.open)}>
      <summary>Affiner la sélection <span>{round === 1 ? 'Premier tour' : 'Second tour'} · {institute || 'Tous les instituts'}</span></summary>
      <div className="poll-filter-heading"><span className="eyebrow">Votre sélection</span><h2>Une hypothèse,<br />des mesures.</h2><p>Ajustez le tour, l’institut et la période.</p></div>
    {options ? <>
      <div className="poll-controls">
        <label>Tour<select value={round} onChange={(event) => change(() => {
          const next = Number(event.target.value) as 1 | 2;
          const cfg = options.configurations.find((c) => c.round === next);
          setRound(next); setConfiguration(cfg?.key ?? ''); setSelected(cfg?.key.split(':')[1].split('|') ?? []);
          if (!cfg) setLoading(false);
        })}><option value={1}>Premier tour</option><option value={2}>Second tour</option></select></label>
        <label>Institut<select value={institute} onChange={(event) => change(() => setInstitute(event.target.value))}><option value="">Tous les instituts</option>{options.institutes.map((name) => <option key={name}>{name}</option>)}</select></label>
        <label>Depuis<input type="date" value={startDate} onInput={(event) => {
          const value = event.currentTarget.value;
          if (value !== startDate) change(() => setStartDate(value));
        }} /></label>
        <label>Jusqu’au<input type="date" value={endDate} min={startDate || undefined} onInput={(event) => {
          const value = event.currentTarget.value;
          if (value !== endDate) change(() => setEndDate(value));
        }} /></label>
      </div>
      <label className="poll-configuration">Hypothèse de candidatures<select value={configuration} onChange={(event) => change(() => {
        setConfiguration(event.target.value); setSelected(event.target.value.split(':')[1]?.split('|') ?? []);
      })}>{configurations.map((cfg) => <option key={cfg.key} value={cfg.key}>{cfg.candidates.join(' · ')} ({cfg.measurements} configuration{cfg.measurements > 1 ? 's' : ''} publiée{cfg.measurements > 1 ? 's' : ''})</option>)}</select></label>
      <details className="poll-selected-roster"><summary>Liste exacte testée · {candidates.length} personnes</summary><p>{currentConfiguration?.candidates.join(' · ') ?? 'Aucune configuration disponible pour ce tour.'}</p><p className="hint">Même liste de personnes ne signifie pas mêmes méthodes ou formulations.</p></details>
      <fieldset className="poll-candidates"><legend>Candidats affichés sur le graphique</legend>{candidates.map((candidate) => <label key={candidate.id}>
        <input type="checkbox" checked={selected.includes(candidate.id)} onChange={() => setSelected((current) => current.includes(candidate.id) ? current.filter((id) => id !== candidate.id) : [...current, candidate.id])} /><i aria-hidden="true" style={{ background: pollSeriesColor(candidate.id, roster) }} />{candidate.name}</label>)}</fieldset>
      <button type="button" className="poll-reset" onClick={() => {
        setSelected(roster);
        if (institute || startDate || endDate || page !== 1) change(() => { setInstitute(''); setStartDate(''); setEndDate(''); });
      }}>Réinitialiser les filtres de période et d’institut ↺</button>
    </> : null}
    <p className="hint">Chaque configuration garde sa liste exacte de personnes. Aucune moyenne ni projection.</p>
      </details>
    </aside>
    <div className="poll-results" aria-busy={loading}>
    {loading ? <p role="status" className="empty">Chargement des mesures publiées…</p> : null}
    {error ? <div role="alert" className="empty"><p>{error}</p><button type="button" className="button secondary" onClick={() => { setLoading(true); setError(null); setRetry((value) => value + 1); }}>Réessayer</button></div> : null}
    {options && !options.configurations.length ? <p className="empty">Aucun sondage publié dans la base pour le moment. Les données ne sont pas encore disponibles.</p> : null}
    {options && options.configurations.length > 0 && !configuration && !loading ? <p className="empty">Aucune configuration publiée pour ce tour.</p> : null}
    {!loading && data ? <>
      <div className="poll-results-head"><div><span className="eyebrow">Évolution · Mesures individuelles</span><h2>Intentions de vote (%)</h2></div>
        <p>{data.total} sondage{data.total > 1 ? 's' : ''} dans cette sélection<br /><span className="hint">{data.lastSuccess ? `Dernière synchronisation réussie : ${new Date(data.lastSuccess).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}` : 'Aucune synchronisation renseignée.'}</span></p></div>
      {data.polls.length ? <>
        <PollChart key={`${configuration}/${institute}/${startDate}/${endDate}/${page}`} polls={data.polls} selected={selected} roster={roster} />
        {data.total > data.limit ? <p className="hint">Le graphique montre uniquement les {data.polls.length} sondages de la page {page}, dans l’ordre des fins de terrain décroissantes. Changez de page pour les mesures antérieures.</p> : null}
        {latestPoll && latestScenario ? <section className="poll-latest"><div className="presidential-section-head"><div><span className="eyebrow">Zoom sur une mesure</span><h2>Le terrain le plus récent</h2></div><a className="text-link" href={latestPoll.source_url} target="_blank" rel="noopener noreferrer">Publication originale ↗</a></div><p className="hint">{latestPoll.institute} · {pollDate(latestPoll.fieldwork_start)} – {pollDate(latestPoll.fieldwork_end)} · Tour {latestScenario.round} · Configuration n° {latestScenario.scenario_number}. Échantillon total : {latestPoll.sample_size?.toLocaleString('fr-FR') ?? 'non renseigné'} ; base de configuration : {latestScenario.scenario_sample_size?.toLocaleString('fr-FR') ?? 'non renseignée'}. Un seul résultat par personne, dans cette configuration.</p>
          <div className="poll-snapshot-grid">{latestScenario.results.map((result) => <Link className="poll-snapshot-card" key={result.candidate_external_id} href={`/presidentielle-2027/candidats/${result.candidate_external_id}`}><span>{result.candidate_name}<span aria-hidden="true">↗</span></span><strong>{pollScore(result.score)}</strong><span className="poll-score-track" aria-hidden="true"><i style={{ width: `${result.score}%`, background: pollSeriesColor(result.candidate_external_id, roster) }} /></span></Link>)}</div>
          <p className="hint">Hypothèse : {latestScenario.results.map((result) => result.candidate_name).join(' · ')}. Les autres configurations de ce sondage figurent dans le détail ci-dessous.</p>
        </section> : null}
        <div className="presidential-section-head"><div><span className="eyebrow">Les pièces derrière les points</span><h2>Le détail des sondages</h2></div><span className="presidential-count">{data.total} dans la sélection</span></div><p className="hint">Dépliez une configuration pour retrouver toutes ses valeurs, même si une personne est masquée sur le graphique. Tri par fin de terrain décroissante.</p>
        <div className="poll-details">{data.polls.map((poll) => <PollDetails key={poll.id} poll={poll} roster={roster} />)}</div>
      </> : <p className="empty">Aucun sondage pour cette hypothèse, cet institut et cette période.</p>}
      {data.total > data.limit ? <nav className="poll-pagination" aria-label="Pages des sondages"><button className="button secondary" disabled={page === 1} onClick={() => { setLoading(true); setData(null); setPage(page - 1); }}>← Plus récents</button><span>Page {page} / {Math.ceil(data.total / data.limit)}</span><button className="button secondary" disabled={page * data.limit >= data.total} onClick={() => { setLoading(true); setData(null); setPage(page + 1); }}>Plus anciens →</button></nav> : null}
    </> : null}
    </div></div>
    <p className="hint">Données : <a href="https://sondax.fr/" target="_blank" rel="noopener noreferrer">Sondax, d’après Wikipédia</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> · <a href="#sources-sondages">Méthode et limites ↓</a></p>
  </section>;
}
