// Entirely fictional data for isolated tests. Never imported into the website.
export function judicialRecord({ id = 'alpha', entity = 'rn', outcome = 'investigation', role = 'implicated', type = 'person', nature = 'criminal', finality = 'unknown', scope = 'none', motif = 'corruption', category = 'probity', finding = 'alleged', group, plaintiff = false } = {}) {
  const url = `https://www.courdecassation.fr/fixture-test/${id}.pdf`;
  const affiliationUrl = 'https://www.assemblee-nationale.fr/fixture-test/affiliations';
  const source = { url, publisher: 'Institution fictive de test', title: 'Document fictif de test', locator: 'Paragraphe de test', published_at: '2026-09-01', kind: 'judiciary' };
  const affiliation = entityId => ({ entity_id: entityId, at: '2026-01-01', basis: entityId.startsWith('senat-') ? 'group_membership' : 'membership', note: 'Appartenance fictive de test', source_url: affiliationUrl, source_locator: 'Repère fictif de test' });
  const person = { id: `test-${id}`, name: `Personne fictive de test ${id}`, type, role, outcome, decision_note: 'État fictif de test', finality, finality_scope: scope, finality_note: 'Portée fictive de test', affiliations: [affiliation(entity), ...(group ? [affiliation(group)] : [])] };
  if (finality === 'final') person.finality_source = { url, locator: 'Repère fictif de définitivité' };
  const participants = [person];
  if (plaintiff) participants.push({ id: `plaintiff-${id}`, name: 'Plaignante fictive de test', type: 'person', role: 'complainant', outcome: 'unknown', decision_note: 'Rôle fictif de test', finality: 'not_applicable', finality_scope: 'none', finality_note: 'Sans condamnation', affiliations: [affiliation('modem')] });
  return {
    external_id: `judicial-fixture-${id}`, kind: 'judicial_event', status: 'draft', institution: null,
    title: `Affaire fictive de test ${id}`, occurred_at: '2026-09-01', source_url: url,
    source_locator: 'Repère fictif de test', excerpt: null,
    source: { publisher: source.publisher, document_title: source.title, published_at: source.published_at },
    detail: { judicial: { case_id: `fixture-${id}`, court: 'Juridiction fictive de test', stage: 'Étape fictive de test', status_at_event: 'État fictif de test', current_status_note: 'Données entièrement fictives', presumption_note: 'Aucune personne réelle', snapshot: {
      version: 1, nature, checked_at: '2026-10-04', latest_known_at: '2026-09-01', current_status: 'documented',
      facts: 'Scénario entièrement fictif destiné aux tests.', limits: 'Aucun fait réel ni document téléchargé.',
      participants, offences: [{ id: motif, label: motif, category, finding, explanation: 'Motif fictif de test' }],
      sources: [source, { url: affiliationUrl, publisher: 'Institution fictive de test', title: 'Appartenances fictives', locator: 'Repère fictif', published_at: null, kind: 'institution' }],
    } } },
  };
}

export function judicialCorpus() {
  return { edition: 'fictional-tests-only', records: [
    judicialRecord({ group: 'senat-lirt', plaintiff: true }),
    judicialRecord({ id: 'beta', entity: 'ump', outcome: 'convicted', finality: 'final', scope: 'guilt_and_sentence', finding: 'retained', group: 'senat-lr' }),
    judicialRecord({ id: 'gamma', entity: 'ump', outcome: 'convicted', finality: 'final', scope: 'guilt_and_sentence', motif: 'fraude', category: 'tax', finding: 'retained' }),
    judicialRecord({ id: 'delta', entity: 'lr', outcome: 'convicted', finality: 'final', scope: 'guilt_only', motif: 'detournement', finding: 'retained' }),
    judicialRecord({ id: 'epsilon', entity: 'renaissance', role: 'civil_claimant', type: 'organization', nature: 'civil', outcome: 'civil', finality: 'not_applicable', motif: 'marque-slogan', category: 'civil', finding: 'civil' }),
    judicialRecord({ id: 'zeta', entity: 'eelv', outcome: 'dismissed', finality: 'not_applicable', motif: 'diffamation', category: 'expression', finding: 'dismissed' }),
    judicialRecord({ id: 'eta', entity: 'lr', group: 'senat-rdse' }),
    judicialRecord({ id: 'theta', entity: 'ps', outcome: 'prosecuted' }),
  ] };
}
