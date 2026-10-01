/**
 * Repères de navigation par mots présents dans l'intitulé institutionnel.
 * Ce ne sont ni les rubriques officielles ni une qualification du sens du vote.
 * Garder des fragments précis : la recherche plein texte française assimile
 * par exemple « loyer » à « loi », ce qui rendrait le filtre trompeur.
 */
export const VOTE_SUBJECT_GROUPS = [
  {
    id: 'vie-quotidienne',
    label: 'Vie quotidienne',
    subjects: [
      { id: 'sante', label: 'Santé et hôpitaux', keywords: ['santé', 'hôpital', 'hôpitaux', 'soins', 'médical', 'sage-femme'] },
      { id: 'ecole', label: 'École et études', keywords: ['école', 'scolaire', 'enseignement', 'université'] },
      { id: 'logement', label: 'Logement et loyers', keywords: ['logement', 'loyer', 'locataire'] },
      { id: 'retraites', label: 'Retraites', keywords: ['retraite'] },
      { id: 'securite-sociale', label: 'Sécurité sociale', keywords: ['sécurité sociale', 'assurance maladie'] },
    ],
  },
  {
    id: 'economie-territoire',
    label: 'Économie et territoire',
    subjects: [
      { id: 'budget', label: 'Budget de l’État', keywords: ['loi de finances', 'budget', 'crédits de la mission'] },
      { id: 'fiscalite', label: 'Impôts et taxes', keywords: ['impôt', 'taxe', 'fiscal'] },
      { id: 'travail', label: 'Travail et emploi', keywords: ['travail', 'emploi', 'chômage', 'salarié'] },
      { id: 'environnement', label: 'Climat et environnement', keywords: ['climat', 'environnement', 'biodiversité', 'artificialisation'] },
      { id: 'energie', label: 'Énergie', keywords: ['énergie', 'nucléaire', 'électricité'] },
      { id: 'transports', label: 'Transports', keywords: ['transport', 'ferroviaire', 'train'] },
      { id: 'agriculture', label: 'Agriculture et pêche', keywords: ['agricult', 'pêche'] },
    ],
  },
  {
    id: 'droits-institutions',
    label: 'Droits et institutions',
    subjects: [
      { id: 'immigration', label: 'Immigration et nationalité', keywords: ['immigration', 'nationalité', 'asile'] },
      { id: 'justice', label: 'Justice', keywords: ['justice', 'judiciaire', 'pénal'] },
      { id: 'elections', label: 'Élections', keywords: ['élection', 'électoral', 'référendum'] },
    ],
  },
] as const;

export type VoteSubject = (typeof VOTE_SUBJECT_GROUPS)[number]['subjects'][number];
export type VoteCategory = (typeof VOTE_SUBJECT_GROUPS)[number];

export function findVoteCategory(id: string | undefined): VoteCategory | null {
  return VOTE_SUBJECT_GROUPS.find((category) => category.id === id) ?? null;
}

export function categoryKeywords(category: VoteCategory): string[] {
  return [...new Set(category.subjects.flatMap((subject) => [...subject.keywords]))];
}

export function findVoteSubject(id: string | undefined): VoteSubject | null {
  if (!id) return null;
  for (const group of VOTE_SUBJECT_GROUPS) {
    const found = group.subjects.find((subject) => subject.id === id);
    if (found) return found;
  }
  return null;
}

/** PostgREST OR expression, only ever built from the controlled list above. */
export function voteSubjectFilter(subject: VoteSubject): string {
  return subject.keywords.map((keyword) => `title.ilike.%${keyword}%`).join(',');
}

export function voteCategoryFilter(category: VoteCategory): string {
  return categoryKeywords(category).map((keyword) => `title.ilike.%${keyword}%`).join(',');
}
