import type { Evidence } from './types.ts';

export type JudicialRole = 'implicated' | 'complainant' | 'civil_claimant' | 'civil_defendant';
export type JudicialOutcome = 'investigation' | 'charged' | 'prosecuted' | 'convicted' | 'acquitted' | 'dismissed' | 'alternative' | 'civil' | 'unknown';
export type Finality = 'final' | 'not_final' | 'unknown' | 'not_applicable';
export interface JudicialSource { url: string; publisher: string; title: string; locator: string; published_at: string | null; kind: 'judiciary' | 'institution' | 'party' | 'press'; retrieved_at?: string; sha256?: string | null; retrieval_note?: string; capture_method?: 'rendered_dom'; capture_sha256?: string }
export interface JudicialAffiliation { entity_id: string; at: string; basis: 'membership' | 'leadership' | 'group_membership' | 'historical_membership'; note: string; source_url: string; source_locator: string }
export interface JudicialParticipant {
  id: string; name: string; type: 'person' | 'organization'; role: JudicialRole;
  outcome: JudicialOutcome; decision_note: string; finality: Finality;
  finality_scope: 'guilt_and_sentence' | 'guilt_only' | 'none'; finality_note: string;
  finality_source?: { url: string; locator: string }; affiliations: JudicialAffiliation[];
}
export interface JudicialOffence { id: string; label: string; category: 'probity' | 'tax' | 'violence' | 'expression' | 'civil' | 'other'; finding: 'alleged' | 'retained' | 'dismissed' | 'civil' | 'prosecutor_assessment'; explanation: string }
export interface JudicialSnapshot {
  version: 1; nature: 'criminal' | 'civil'; checked_at: string; latest_known_at: string;
  current_status: 'documented' | 'not_verified'; facts: string; limits: string;
  participants: JudicialParticipant[]; offences: JudicialOffence[]; sources: JudicialSource[];
}
export interface JudicialEntity { id: string; label: string; kind: 'party' | 'group'; chamber?: string; source_url: string; scope_note: string }
export interface JudicialCase { caseId: string; evidence: Evidence; snapshot: JudicialSnapshot | null; chronology: Evidence[] }
export const ROLE_LABELS: Record<JudicialRole, string> = { implicated: 'Mis en cause au pénal', complainant: 'Plaignant / partie civile au pénal', civil_claimant: 'Demandeur au civil', civil_defendant: 'Défendeur au civil' };
export const OUTCOME_LABELS: Record<JudicialOutcome, string> = { investigation: 'Enquête préliminaire', charged: 'Mise en examen', prosecuted: 'Poursuites', convicted: 'Condamnation prononcée', acquitted: 'Relaxe', dismissed: 'Classement sans suite', alternative: 'Alternative aux poursuites', civil: 'Décision civile', unknown: 'État non établi' };
export const FINALITY_LABELS: Record<Finality, string> = { final: 'Oui, établie par une source', not_final: 'Non, recours documenté à cette date', unknown: 'Non établie dans les sources', not_applicable: 'Sans condamnation pénale documentée' };

const text = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
const date = (value: unknown): value is string => text(value) && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const https = (value: unknown): value is string => { try { const u = new URL(String(value)); return u.protocol === 'https:' && !u.username && !u.password; } catch { return false; } };

/** Fail closed: unknown roles, unsourced affiliations and inconsistent finality never enter counts. */
export function validateJudicialSnapshot(value: unknown): value is JudicialSnapshot {
  if (!value || typeof value !== 'object') return false;
  const s = value as JudicialSnapshot;
  if (s.version !== 1 || !['criminal', 'civil'].includes(s.nature) || !date(s.checked_at) || !date(s.latest_known_at) || s.latest_known_at > s.checked_at
    || !['documented', 'not_verified'].includes(s.current_status) || !text(s.facts) || !text(s.limits)
    || !Array.isArray(s.sources) || !s.sources.length || s.sources.length > 12 || new Set(s.sources.map(r => r?.url)).size !== s.sources.length || !s.sources.every(r => r && https(r.url) && text(r.publisher) && text(r.title) && text(r.locator) && (r.published_at === null || date(r.published_at)) && ['judiciary', 'institution', 'party', 'press'].includes(r.kind))
    || !Array.isArray(s.offences) || !s.offences.length || !s.offences.every(o => o && text(o.id) && text(o.label) && text(o.explanation) && ['probity', 'tax', 'violence', 'expression', 'civil', 'other'].includes(o.category) && ['alleged', 'retained', 'dismissed', 'civil', 'prosecutor_assessment'].includes(o.finding))
    || !Array.isArray(s.participants) || !s.participants.length || s.participants.length > 40) return false;
  const hasSource = (url: string) => s.sources.some(r => r.url === url);
  return new Set(s.participants.map(p => p?.id)).size === s.participants.length && s.participants.every(p => p && text(p.id) && text(p.name)
    && ['person', 'organization'].includes(p.type) && Object.hasOwn(ROLE_LABELS, p.role) && Object.hasOwn(OUTCOME_LABELS, p.outcome)
    && Object.hasOwn(FINALITY_LABELS, p.finality) && text(p.decision_note) && text(p.finality_note)
    && ['guilt_and_sentence', 'guilt_only', 'none'].includes(p.finality_scope)
    && (s.nature !== 'civil' || (['civil_claimant', 'civil_defendant'].includes(p.role) && p.outcome === 'civil' && p.finality === 'not_applicable'))
    && (s.nature !== 'criminal' || ['implicated', 'complainant'].includes(p.role))
    && (p.finality !== 'final' || (p.role === 'implicated' && p.outcome === 'convicted' && p.finality_scope !== 'none' && https(p.finality_source?.url) && text(p.finality_source?.locator) && hasSource(p.finality_source!.url)))
    && (p.finality === 'final' || p.finality_scope === 'none')
    && (p.role === 'implicated' || p.finality === 'not_applicable')
    && (p.role !== 'complainant' || p.outcome === 'unknown')
    && (p.outcome !== 'convicted' || p.finality !== 'not_applicable')
    && Array.isArray(p.affiliations) && p.affiliations.every(a => a && text(a.entity_id) && date(a.at) && a.at <= s.checked_at && text(a.note) && text(a.source_locator) && https(a.source_url) && hasSource(a.source_url) && ['membership', 'leadership', 'group_membership', 'historical_membership'].includes(a.basis)));
}

/** The newest piece wins even when unstructured: never resurrect an older favourable/unfavourable state. */
export function judicialCases(items: Evidence[], { review = false }: { review?: boolean } = {}): JudicialCase[] {
  const cases = new Map<string, Evidence[]>();
  for (const evidence of items) {
    if (evidence.kind !== 'judicial_event' || (!review && evidence.status !== 'published')) continue;
    const context = evidence.detail?.judicial as { case_id?: unknown } | undefined;
    if (!text(context?.case_id)) continue;
    const chronology = cases.get(context.case_id) ?? [];
    chronology.push(evidence); cases.set(context.case_id, chronology);
  }
  return [...cases].map(([caseId, chronology]) => {
    chronology.sort((a, b) => b.occurred_at.localeCompare(a.occurred_at) || b.id.localeCompare(a.id));
    const evidence = chronology[0];
    const value = (evidence.detail?.judicial as { snapshot?: unknown })?.snapshot;
    return { caseId, evidence, chronology, snapshot: validateJudicialSnapshot(value) ? value : null };
  }).sort((a, b) => b.evidence.occurred_at.localeCompare(a.evidence.occurred_at) || a.caseId.localeCompare(b.caseId));
}

export interface JudicialFilters { entity?: string; entityIds?: string[]; role?: string; outcome?: string; category?: string; motif?: string; membersOnly?: boolean }
const selected = (value?: string) => !!value && value !== 'all';
const matchesParticipant = (p: JudicialParticipant, filters: JudicialFilters) =>
  (!filters.membersOnly || p.type === 'person')
  && (!selected(filters.entity) || p.affiliations.some(a => a.entity_id === filters.entity))
  && (!filters.entityIds || p.affiliations.some(a => filters.entityIds!.includes(a.entity_id)))
  && (!selected(filters.role) || p.role === filters.role)
  && (!selected(filters.outcome) || p.role === 'implicated' && (filters.outcome === 'final' ? p.finality === 'final' : p.outcome === filters.outcome));

/** A plaintiff never matches the conviction of somebody else in the same case. */
export function filterJudicialCases(cases: JudicialCase[], filters: JudicialFilters) {
  const participantFilter = selected(filters.entity) || !!filters.entityIds || selected(filters.role) || selected(filters.outcome);
  return cases.filter(c => (!selected(filters.category) || c.snapshot?.offences.some(o => o.category === filters.category))
    && (!selected(filters.motif) || c.snapshot?.offences.some(o => o.id === filters.motif))
    && (!participantFilter || c.snapshot?.participants.some(p => matchesParticipant(p, filters))));
}

export function entityCounts(cases: JudicialCase[], entityId: string, membersOnly = true, filters: Pick<JudicialFilters, 'role' | 'outcome'> = {}) {
  const matches = cases.map(c => ({ c, people: c.snapshot?.participants.filter(p => matchesParticipant(p, { ...filters, entity: entityId, membersOnly })) ?? [] })).filter(r => r.people.length);
  const count = (predicate: (p: JudicialParticipant) => boolean) => matches.filter(r => r.people.some(predicate)).length;
  return {
    cases: matches.length,
    implicated: count(p => p.role === 'implicated'),
    complainant: count(p => p.role === 'complainant'),
    civil: count(p => p.role === 'civil_claimant' || p.role === 'civil_defendant'),
    final: count(p => p.role === 'implicated' && p.finality === 'final'),
    guiltOnly: count(p => p.role === 'implicated' && p.finality === 'final' && p.finality_scope === 'guilt_only'),
    nonfinal: count(p => p.role === 'implicated' && p.outcome === 'convicted' && p.finality !== 'final'),
    proceedings: count(p => p.role === 'implicated' && ['investigation', 'charged', 'prosecuted'].includes(p.outcome)),
    cleared: count(p => p.role === 'implicated' && ['acquitted', 'dismissed'].includes(p.outcome)),
    alternative: count(p => p.role === 'implicated' && p.outcome === 'alternative'),
    stale: matches.filter(r => r.c.snapshot?.current_status === 'not_verified').length,
  };
}

export function judicialMotifs(cases: JudicialCase[]) {
  const motifs = new Map<string, { id: string; label: string; alleged: Set<string>; retained: Set<string>; dismissed: Set<string>; other: Set<string> }>();
  for (const c of cases) for (const o of c.snapshot?.offences ?? []) {
    if (o.category === 'civil') continue;
    const row = motifs.get(o.id) ?? { id: o.id, label: o.label, alleged: new Set<string>(), retained: new Set<string>(), dismissed: new Set<string>(), other: new Set<string>() };
    row[o.finding === 'alleged' ? 'alleged' : o.finding === 'retained' ? 'retained' : o.finding === 'dismissed' ? 'dismissed' : 'other'].add(c.caseId);
    motifs.set(o.id, row);
  }
  return [...motifs.values()].sort((a, b) => a.label.localeCompare(b.label, 'fr')).map(r => ({ id: r.id, label: r.label, alleged: r.alleged.size, retained: r.retained.size, dismissed: r.dismissed.size, other: r.other.size }));
}

/** Attribution is a dated documentary affiliation, never collective guilt. */
export function judicialIndividuals(cases: JudicialCase[], filters: JudicialFilters) {
  return cases.flatMap(item => (item.snapshot?.participants ?? [])
    .filter(p => p.type === 'person' && matchesParticipant(p, filters))
    .map(person => ({ item, person })))
    .sort((a, b) => a.person.name.localeCompare(b.person.name, 'fr') || b.item.evidence.occurred_at.localeCompare(a.item.evidence.occurred_at));
}
