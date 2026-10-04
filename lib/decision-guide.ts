import { findVoteSubject } from './vote-subjects.ts';
import { comparisonCandidates } from './candidates/method.ts';
import { SITE_URL } from './site.ts';

export type DecisionPerson = { id: string; name: string };
export type DecisionRoute = { id: string; label: string; votes: string; comparison: string; parties: string };

/** A reading itinerary, with the same corpus for every selected person. */
export function decisionRoutes(subjects: string[], people: string[], available: string[]): DecisionRoute[] {
  const candidates = comparisonCandidates(people, available);
  return [...new Set(subjects)].flatMap((id) => {
    const subject = findVoteSubject(id);
    if (!subject) return [];
    const params = new URLSearchParams({ subject: id });
    candidates.forEach((candidate) => params.append('candidate', candidate));
    return [{ id, label: subject.label, votes: `/scrutins?subject=${id}`, comparison: `/presidentielle-2027/comparer?${params}`, parties: `/partis/comparer?subject=${id}` }];
  }).slice(0, 3);
}

/** Private notes only enter this plain-text export, never an exploration URL. */
export function decisionNotebook(routes: DecisionRoute[], people: DecisionPerson[], notes: Record<string, string>): string {
  return [
    'MON CARNET DE CHOIX — PREUVE PUBLIQUE',
    'Un parcours de lecture personnel. Aucun score ni recommandation de vote.',
    `Guide : ${SITE_URL}/preparer-mon-vote`,
    ...(people.length ? [`Personnes à examiner : ${people.map((person) => person.name).join(', ')}`, 'Cette sélection ne confirme aucune candidature officielle.'] : []),
    ...routes.flatMap((route) => [
      '', route.label.toLocaleUpperCase('fr-FR'),
      `Scrutins et textes : ${SITE_URL}${route.votes}`,
      `Même question, mêmes scrutins : ${SITE_URL}${route.comparison}`,
      `Deux partis, mêmes textes : ${SITE_URL}${route.parties}`,
      'Ma question, les pièces retenues et ce qui reste à vérifier :',
      notes[route.id]?.trim() || '(à compléter)',
    ]),
    '', 'AVANT DE CONCLURE',
    'Quel dispositif exact a été voté : texte entier, article, amendement ou motion ?',
    'La proposition appartient-elle à la bonne élection, et existait-elle au moment du vote ?',
    'Le bulletin est-il individuel et documenté ? Une donnée manquante n’est pas une absence.',
    'Quel document pourrait me faire changer d’avis ?',
    'Qu’est-ce qui reste inconnu, et quelle source permettrait de le vérifier ?',
    '', `Programmes : ${SITE_URL}/observatoire#parole-vote`,
    `Indicateurs et limites : ${SITE_URL}/observatoire#inegalites`,
    `Méthode : ${SITE_URL}/methode`,
    '',
  ].join('\n');
}
