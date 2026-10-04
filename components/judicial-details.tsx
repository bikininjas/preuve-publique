import { FINALITY_LABELS, OUTCOME_LABELS, ROLE_LABELS, type JudicialEntity, type JudicialSnapshot } from '@/lib/judicial';
import directory from '@/lib/judicial-entities.json';

const entities = directory.entities as JudicialEntity[];
const date = (value: string) => new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(value));
const findings = { alleged: 'Allégation / chef de poursuite', retained: 'Retenu par une juridiction', dismissed: 'Chef écarté / dossier classé', civil: 'Litige civil', prosecutor_assessment: 'Appréciation du parquet, sans condamnation' };

export function JudicialDetails({ snapshot: s }: { snapshot: JudicialSnapshot }) {
  return <div className="justice-case-body">
        <p>{s.facts}</p><p className="justice-limit">{s.limits}</p>
        <p className="hint">Recherche du {date(s.checked_at)} · Dernière étape recoupée : {date(s.latest_known_at)}. {s.current_status === 'not_verified' ? 'État actuel de la procédure non recoupé.' : 'État établi à la date de la source.'}</p>
        <h4>Motifs et faits concernés</h4><ul className="justice-offences">{s.offences.map(o => <li key={o.id}><strong>{o.label}</strong><small>{findings[o.finding]}</small><p>{o.explanation}</p></li>)}</ul>
        <h4>Personnes et organismes — rôle et décision</h4>
        {s.participants.map(p => <div className="justice-person" key={p.id}><h5>{p.name}</h5><p><strong>{ROLE_LABELS[p.role]}</strong> · {OUTCOME_LABELS[p.outcome]}</p><p>{p.decision_note}</p><p><strong>Condamnation définitive : {FINALITY_LABELS[p.finality]}</strong>{p.finality_scope === 'guilt_only' ? ' — culpabilité seulement ; peine à distinguer.' : ''}</p><p className="hint">{p.finality_note} {p.finality_source ? <a href={p.finality_source.url} target="_blank" rel="noreferrer">Source du caractère définitif ↗</a> : null}</p>
          {p.affiliations.length ? <ul>{p.affiliations.map((a, i) => <li key={i}><strong>{entities.find(e => e.id === a.entity_id)?.label ?? a.entity_id}</strong> · repère au {date(a.at)}. {a.note} <a href={a.source_url} target="_blank" rel="noreferrer">Source du rattachement ↗</a><small>{a.source_locator}</small></li>)}</ul> : <p className="hint">Rattachement politique non recoupé : cette personne n’entre pas dans les décomptes par formation.</p>}
        </div>)}
        <h4>Sources et repères</h4><ul className="justice-sources">{s.sources.map(r => <li key={r.url}><a href={r.url} target="_blank" rel="noreferrer">{r.title} ↗</a><small>{r.publisher} · {r.kind === 'press' ? 'Source de presse' : r.kind === 'party' ? 'Publication du parti' : 'Source institutionnelle'}{r.published_at ? ` · ${date(r.published_at)}` : ''} · {r.locator}{r.retrieved_at ? ` · ${r.capture_method === 'rendered_dom' ? 'Texte consulté' : 'Original récupéré'} le ${date(r.retrieved_at)}` : ''}</small>{r.retrieval_note ? <small>{r.retrieval_note}</small> : null}</li>)}</ul>
  </div>;
}
