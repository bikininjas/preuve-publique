'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PoliticalBadge } from '@/components/political-classification';
import { politicalClassification } from '@/lib/political-classifications';
import { entityCounts, filterJudicialCases, judicialCases, judicialMotifs, judicialIndividuals, OUTCOME_LABELS, ROLE_LABELS, FINALITY_LABELS, type JudicialEntity, type JudicialCase } from '@/lib/judicial';
import directory from '@/lib/judicial-entities.json';
import type { EvidencePage } from '@/lib/types';
import { JudicialDetails } from './judicial-details';

const entities = directory.entities as JudicialEntity[];
const politicalOption = (entity: JudicialEntity) => { const entry = politicalClassification({ name: entity.label, kind: entity.kind, chamber: entity.chamber }); return entry ? `${entity.label} · ${entry.label} · ${entry.context}` : entity.label; };
const date = (value: string) => new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(value));

function Bar({ value, max, label, color }: { value: number; max: number; label: string; color: string }) {
  return <div className="justice-bar"><span>{label}</span><div className="justice-track" aria-hidden="true"><i style={{ width: `${100 * value / Math.max(max, 1)}%`, background: color }} /></div><strong>{value}</strong></div>;
}

function CaseDetails({ item, review }: { item: JudicialCase; review: boolean }) {
  const s = item.snapshot;
  return <details className="justice-case" id={'affaire-' + item.caseId}>
    <summary><span><small>{s?.nature === 'civil' ? 'Litige civil' : s ? 'Procédure pénale' : 'Étape à compléter'} · {date(item.evidence.occurred_at)}{review ? ` · ${item.evidence.status === 'draft' ? 'Brouillon' : item.evidence.status === 'reviewed' ? 'Relue' : 'Publiée'}` : ''}</small><strong>{item.evidence.title}</strong></span><span aria-hidden="true">+</span></summary>
    <div className="justice-case-body">
      {s ? <JudicialDetails snapshot={s} /> : <p className="hint">Le rôle des personnes, les motifs et leurs rattachements restent à compléter. Cette affaire n’entre pas dans les graphiques.</p>}
      <details><summary>Chronologie documentaire ({item.chronology.length} étape{item.chronology.length > 1 ? 's' : ''})</summary><ul>{item.chronology.map(e => <li key={e.id}>{date(e.occurred_at)} · <Link href={review ? '/admin/pieces/' + e.id : '/pieces/' + e.id}>{e.title}</Link></li>)}</ul></details>
      <Link className="text-link" href={review ? '/admin/pieces/' + item.evidence.id : '/pieces/' + item.evidence.id}>Lire la fiche →</Link>
    </div>
  </details>;
}

export function JudicialDashboard({ result, review = false }: { result: EvidencePage | null; review?: boolean }) {
  const [kind, setKind] = useState('party');
  const [chamber, setChamber] = useState('all');
  const [entity, setEntity] = useState('all');
  const [motif, setMotif] = useState('all');
  const [role, setRole] = useState('all');
  const [category, setCategory] = useState('all');
  const [outcome, setOutcome] = useState('all');
  const [membersOnly, setMembersOnly] = useState(true);
  const cases = useMemo(() => judicialCases(result?.items ?? [], { review }), [result, review]);
  const available = entities.filter(e => e.kind === kind && (kind !== 'group' || chamber === 'all' || e.chamber === chamber)).sort((a, b) => a.label.localeCompare(b.label, 'fr'));
  const filters = { entity, role, outcome, category, motif, membersOnly, ...(kind === 'group' ? { entityIds: available.map(e => e.id) } : {}) };
  const filtered = filterJudicialCases(cases, filters);
  const rows = available.filter(e => entity === 'all' || e.id === entity).map(e => ({ e, count: entityCounts(filtered, e.id, membersOnly, filters) }));
  const documented = rows.filter(r => r.count.cases > 0);
  const max = Math.max(1, ...documented.flatMap(r => [r.count.implicated, r.count.complainant, r.count.final, r.count.nonfinal, r.count.proceedings, r.count.cleared, r.count.alternative]));
  const motifs = judicialMotifs(filtered.map(c => c.snapshot ? { ...c, snapshot: { ...c.snapshot, offences: c.snapshot.offences.filter(o => (category === 'all' || o.category === category) && (motif === 'all' || o.id === motif)) } } : c));
  const maxMotif = Math.max(1, ...motifs.flatMap(m => [m.retained, m.alleged, m.dismissed, m.other]));
  return <section className="observatory-section justice-dashboard" id="justice">
    <div className="section-heading"><div><div className="eyebrow">Affaires judiciaires · France et outre-mer</div><h2>Les faits, les motifs, les décisions.</h2><p className="hint">Distinguer une mise en cause, une plainte et une condamnation définitive, pour chaque parti et groupe documenté.</p></div></div>
    <div className="justice-method"><strong>{review ? 'Affaires publiées automatiquement et dossiers attendant une source vérifiable.' : 'Faits judiciaires sourcés · publication automatique sans relecture humaine.'}</strong><p>Les graphiques comptent les affaires impliquant des personnes rattachées aux formations à une date documentée. Ils ne mesurent ni un taux de corruption ni la malhonnêteté d’un parti. Les motifs financiers, les violences et les litiges civils sont distingués.</p><p>Une affaire compte une fois par formation et par catégorie ; les catégories peuvent se recouper. Une ancienne appartenance reste indiquée comme telle. Les faits individuels ne constituent pas une condamnation du parti. L’état d’une procédure est celui de la source datée ; une suite non recoupée reste signalée.</p></div>
    {result === null ? <p className="empty">Les données judiciaires sont temporairement indisponibles. Aucun comptage ne peut être établi.</p> : !cases.length ? <p className="empty">Aucune affaire disposant des sources nécessaires n’est encore publiée.</p> : <>
      <div className="justice-controls">
        <label>Comparer<select value={kind} onChange={e => { setKind(e.target.value); setEntity('all'); }}><option value="party">Partis / formations</option><option value="group">Groupes parlementaires</option></select></label>
        {kind === 'group' ? <label>Institution<select value={chamber} onChange={e => { setChamber(e.target.value); setEntity('all'); }}><option value="all">Toutes</option><option value="Assemblée nationale">Assemblée nationale</option><option value="Sénat">Sénat</option><option value="Parlement européen">Parlement européen</option></select></label> : null}
        <label>Formation<select value={entity} onChange={e => setEntity(e.target.value)}><option value="all">Toutes les formations du répertoire</option>{available.map(e => <option key={e.id} value={e.id}>{politicalOption(e)}</option>)}</select></label>
        <label>Motif<select value={motif} onChange={e => setMotif(e.target.value)}><option value="all">Tous les motifs</option>{judicialMotifs(cases).map(o => <option value={o.id} key={o.id}>{o.label}</option>)}</select></label>
        <label>Rôle<select value={role} onChange={e => setRole(e.target.value)}><option value="all">Tous les rôles</option>{Object.entries(ROLE_LABELS).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
        <label>Nature des motifs<select value={category} onChange={e => { setCategory(e.target.value); setMotif('all'); }}><option value="all">Tous, avec motifs distincts</option><option value="probity">Probité et financement politique</option><option value="tax">Infractions fiscales</option><option value="violence">Violences et harcèlement</option><option value="expression">Délits d’expression</option><option value="civil">Litiges civils</option><option value="other">Autres motifs pénaux</option></select></label>
        <label>Décision / étape<select value={outcome} onChange={e => setOutcome(e.target.value)}><option value="all">Toutes les étapes</option><option value="final">Condamnation définitive établie</option>{Object.entries(OUTCOME_LABELS).filter(([key]) => !['unknown', 'civil'].includes(key)).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
        <label>Personnes comptées<select value={membersOnly ? 'people' : 'all'} onChange={e => setMembersOnly(e.target.value === 'people')}><option value="people">Membres / anciens membres</option><option value="all">Membres et organismes eux-mêmes</option></select></label>
      </div>
      <p className="justice-result" role="status">{filtered.length} affaire{filtered.length > 1 ? 's' : ''} dans la sélection · {filtered.filter(c => c.snapshot).length} exploitable{filtered.filter(c => c.snapshot).length > 1 ? 's' : ''} dans les graphiques · {filtered.filter(c => c.snapshot?.current_status === 'not_verified').length} avec état actuel non recoupé.</p>
      <details className="justice-coverage"><summary>Personnes concernées et rattachements politiques</summary><div className="justice-table-scroll"><table><caption>Une ligne par personne et affaire · appartenances datées</caption><thead><tr><th>Personne</th><th>Parti / groupe et date</th><th>Rôle et décision</th><th>Condamnation définitive ?</th><th>Motifs et affaire</th></tr></thead><tbody>{judicialIndividuals(filtered, filters).map(({ item, person }) => <tr key={item.caseId + person.id}><th>{person.name}</th><td>{person.affiliations.length ? person.affiliations.map(a => <div key={a.entity_id + a.at}><a href={a.source_url} target="_blank" rel="noreferrer">{entities.find(e => e.id === a.entity_id)?.label ?? a.entity_id} ↗</a><small>{date(a.at)} · {a.basis === 'historical_membership' ? 'ancienne appartenance' : a.basis === 'group_membership' ? 'groupe parlementaire' : 'appartenance documentée'}</small></div>) : 'Parti non recoupé · aucune imputation'}</td><td>{ROLE_LABELS[person.role]}<small>{OUTCOME_LABELS[person.outcome]}</small></td><td>{FINALITY_LABELS[person.finality]}{person.finality_scope === 'guilt_only' ? <small>Culpabilité seulement ; peine à distinguer</small> : null}</td><td><a href={'#affaire-' + item.caseId}>{item.evidence.title}</a><small>{item.snapshot?.offences.map(o => o.label).join(' ; ')}</small></td></tr>)}</tbody></table></div></details>
      <div className="justice-charts">
        <div className="justice-chart"><h3>Mis en cause et plaignants au pénal</h3><p className="hint">Rôles documentés dans l’affaire, même après une relaxe ou un classement.</p>{documented.length ? documented.map(({ e, count }) => <div className="justice-chart-row" key={e.id}><h4>{e.label}</h4><PoliticalBadge name={e.label} kind={e.kind} chamber={e.chamber} /><Bar value={count.implicated} max={max} label="Mis en cause" color="var(--justice-proceedings)" /><Bar value={count.complainant} max={max} label="Plaignants / parties civiles" color="var(--justice-claimant)" /></div>) : <p>Aucun rattachement recoupé dans cette sélection.</p>}</div>
        <div className="justice-chart"><h3>Décisions et étapes pénales documentées</h3><p className="hint">« Définitive » inclut la culpabilité définitive avec peine restant à distinguer. L’état affiché est celui de la source, à sa date.</p>{documented.map(({ e, count }) => <div className="justice-chart-row" key={e.id}><h4>{e.label}</h4><PoliticalBadge name={e.label} kind={e.kind} chamber={e.chamber} /><Bar value={count.final} max={max} label="Condamnation définitive" color="var(--justice-final)" />{count.guiltOnly ? <small>Dont {count.guiltOnly} : culpabilité seulement.</small> : null}<Bar value={count.nonfinal} max={max} label="Condamnation : définitivité non établie" color="var(--justice-pending)" /><Bar value={count.proceedings} max={max} label="Enquête / mise en examen / poursuites" color="var(--justice-proceedings)" /><Bar value={count.cleared} max={max} label="Relaxe / classement documenté" color="var(--justice-cleared)" />{count.alternative ? <Bar value={count.alternative} max={max} label="Alternative aux poursuites" color="var(--justice-claimant)" /> : null}</div>)}</div>
        <div className="justice-chart justice-chart-wide"><h3>Motifs précis des affaires pénales</h3><p className="hint">Un chef retenu par une juridiction peut encore faire l’objet d’un recours. Le caractère définitif est détaillé par personne dans les fiches.</p>{motifs.map(m => <div className="justice-chart-row" key={m.id}><h4>{m.label}</h4><Bar value={m.retained} max={maxMotif} label="Retenu par une juridiction" color="var(--justice-final)" /><Bar value={m.alleged} max={maxMotif} label="Allégation / poursuite" color="var(--justice-proceedings)" />{m.dismissed ? <Bar value={m.dismissed} max={maxMotif} label="Chef écarté / dossier classé" color="var(--justice-cleared)" /> : null}{m.other ? <Bar value={m.other} max={maxMotif} label="Autre étape, sans condamnation" color="var(--justice-claimant)" /> : null}</div>)}</div>
      </div>
      <details className="justice-coverage"><summary>Tableau des nombres et couverture de toutes les formations du répertoire</summary><p>Une absence dans cette sélection ne signifie pas l’absence d’affaires dans la réalité. Les groupes actuels ne reçoivent pas automatiquement les affaires d’un ancien groupe ou d’un parti. Les non-inscrits figurent au répertoire sans constituer un groupe.</p><div className="justice-table-scroll"><table><caption>Nombres d’affaires dans la sélection — {membersOnly ? 'personnes physiques uniquement' : 'personnes et organismes'}</caption><thead><tr><th>Formation</th><th>Affaires</th><th>Mis en cause</th><th>Plaignants</th><th>Définitives</th><th>Litiges civils</th></tr></thead><tbody>{rows.map(({ e, count }) => <tr key={e.id}><th><a href={e.source_url} target="_blank" rel="noreferrer">{e.label} ↗</a><PoliticalBadge name={e.label} kind={e.kind} chamber={e.chamber} /><small>{e.chamber} {e.scope_note}</small></th>{count.cases ? <><td>{count.cases}</td><td>{count.implicated}</td><td>{count.complainant}</td><td>{count.final}</td><td>{count.civil}</td></> : <td colSpan={5}>Aucune affaire recoupée dans cette sélection · couverture à compléter</td>}</tr>)}</tbody></table></div></details>
      <div className="section-heading"><h3>Le détail de chaque affaire</h3><span>{filtered.length} dossier{filtered.length > 1 ? 's' : ''}</span></div>
      <div className="justice-cases">{filtered.map(item => <CaseDetails key={item.caseId} item={item} review={review} />)}</div>
    </>}
    <p className="hint">Répertoire vérifié le {date(directory.checked_at)}. {directory.scope} Les groupes européens sont recensés ; leurs membres français nécessitent un rattachement propre. <Link href="/methode">Lire la méthode →</Link></p>
  </section>;
}
