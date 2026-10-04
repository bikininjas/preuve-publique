export type PoliticalKind = 'party' | 'group';
export type PoliticalChamber = 'Assemblée nationale' | 'Sénat' | 'Parlement européen';

export interface PoliticalSource {
  publisher: string;
  url: string;
  locator: string;
  publishedAt: string;
  retrievedAt: string;
}

export interface PoliticalClassification {
  names: readonly string[];
  kind: PoliticalKind;
  chamber?: PoliticalChamber;
  externalIds?: readonly string[];
  label: string;
  context: string;
  basis: 'electoral' | 'self_description' | 'institutional_description';
  source: PoliticalSource;
  judicialReview?: PoliticalSource;
}

const retrievedAt = '2026-10-04';
const municipalSource: PoliticalSource = {
  publisher: 'Ministère de l’Intérieur',
  url: 'https://www.legifrance.gouv.fr/circulaire/id/45645',
  locator: 'INTP2602966C, annexes 1 à 3 ; dictionnaire des nuances sur data.gouv.fr',
  publishedAt: '2026-02-02', retrievedAt,
};
export const NUANCE_DICTIONARY_URL = 'https://static.data.gouv.fr/resources/donnees-des-elections-agregees/20260324-132009/nuances.csv';
const council2026: PoliticalSource = {
  publisher: 'Conseil d’État', url: 'https://www.conseil-etat.fr/fr/arianeweb/CE/decision/2026-02-27/512694',
  locator: 'Décision n° 512694, points 9 à 12 (LFI, UDR et RN)', publishedAt: '2026-02-27', retrievedAt,
};
const council2024: PoliticalSource = {
  publisher: 'Conseil d’État', url: 'https://www.conseil-etat.fr/fr/arianeweb/CE/decision/2024-03-11/488378',
  locator: 'Décision n° 488378, points 2 et 5', publishedAt: '2024-03-11', retrievedAt,
};
const anDeclaration: PoliticalSource = {
  publisher: 'Assemblée nationale · Journal officiel', url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050029170',
  locator: 'Déclarations politiques remises le 18 juillet 2024, JORF du 19 juillet 2024', publishedAt: '2024-07-19', retrievedAt,
};
const senateDeclaration: PoliticalSource = {
  publisher: 'Sénat', url: 'https://www.senat.fr/vos-senateurs/groupes-politiques/les-groupes-politiques-du-senat-declarations-politiques-1.html',
  locator: 'Déclarations politiques des groupes remises le 3 octobre 2023', publishedAt: '2023-10-03', retrievedAt,
};
const eprsSource: PoliticalSource = {
  publisher: 'Parlement européen · EPRS', url: 'https://www.europarl.europa.eu/RegData/etudes/BRIE/2024/762337/EPRS_BRI(2024)762337_EN.pdf',
  locator: 'Rules on political groups in the EP, introduction : centre-right EPP, centre-left S&D', publishedAt: '2024', retrievedAt,
};

function party(names: string[], label: string, nuance: string, judicialReview?: PoliticalSource): PoliticalClassification {
  return { names, kind: 'party', label, context: 'Municipales 2026', basis: 'electoral',
    source: { ...municipalSource, locator: `${municipalSource.locator} · ${nuance}` }, judicialReview };
}
function group(names: string[], label: string, chamber: PoliticalChamber, source: PoliticalSource, externalIds?: string[]): PoliticalClassification {
  return { names, kind: 'group', chamber, label, basis: 'self_description', context: `Déclaration ${source.publishedAt.slice(0, 4)}`, source, externalIds };
}

/** Exact identities only. A party's electoral block never classifies a parliamentary group. */
export const POLITICAL_CLASSIFICATIONS: readonly PoliticalClassification[] = [
  party(['La France insoumise'], 'Extrême gauche', 'FI / LFI', council2026),
  party(['Parti communiste français'], 'Gauche', 'COM / LCOM'),
  party(['Parti socialiste'], 'Gauche', 'SOC / LSOC'),
  party(['Génération.s'], 'Gauche', 'GEN'),
  party(['Place publique'], 'Gauche', 'PLP'),
  party(['Parti radical de gauche'], 'Gauche', 'RDG'),
  party(['Les Écologistes', 'Les Écologistes - EELV'], 'Gauche', 'VEC / LVEC'),
  party(['Renaissance'], 'Centre', 'REN / LREN'),
  party(['Mouvement démocrate', 'MoDem'], 'Centre', 'MDM / LMDM'),
  party(['Horizons'], 'Centre', 'HOR / LHOR'),
  party(['Parti radical'], 'Centre', 'PR / LDVC'),
  party(['Union des démocrates et indépendants', 'UDI'], 'Centre', 'UDI / LUDI'),
  party(['Alliance centriste'], 'Centre', 'LDVC, formation explicitement citée'),
  party(['Les Républicains'], 'Droite', 'LR / LLR'),
  party(['Debout la France'], 'Droite', 'DSV / LDSV, formation explicitement citée'),
  party(['Union des droites pour la République', 'UDR - Union des Droites pour la République'], 'Extrême droite', 'UDR / LUDR', council2026),
  party(['Rassemblement national'], 'Extrême droite', 'RN / LRN', council2026),
  party(['Reconquête', 'Reconquête !'], 'Extrême droite', 'REC / LREC'),
  party(['Lutte ouvrière', 'Nouveau Parti anticapitaliste', 'Parti ouvrier indépendant'], 'Extrême gauche', 'EXG / LEXG, formations explicitement citées'),
  { names: ['La France insoumise'], kind: 'party', label: 'Gauche', context: 'Sénatoriales 2023', basis: 'electoral',
    source: { ...council2024, locator: 'Point 5 : classement de LFI dans la grille des sénatoriales 2023' }, judicialReview: council2024 },
  group(['Socialistes et apparentés'], 'Gauche', 'Assemblée nationale', { ...anDeclaration, locator: 'Déclaration du groupe Socialistes et apparentés : rassemblement de la gauche et des écologistes' }, ['an-organe:PO845419']),
  group(['Droite Républicaine'], 'Droite et centre droit', 'Assemblée nationale', { ...anDeclaration, locator: 'Déclaration du groupe Droite Républicaine : orientation revendiquée' }, ['an-organe:PO845425']),
  group(['Écologiste et Social'], 'Gauche et écologie', 'Assemblée nationale', { ...anDeclaration, locator: 'Déclaration du groupe Écologiste et Social, premier paragraphe' }, ['an-organe:PO845439']),
  group(['Horizons & Indépendants'], 'Droite et centre', 'Assemblée nationale', { ...anDeclaration, locator: 'Déclaration du groupe Horizons & Indépendants, engagement 2' }, ['an-organe:PO845470']),
  group(['Gauche démocrate et républicaine'], 'Gauche', 'Assemblée nationale', { ...anDeclaration, locator: 'Déclaration du groupe GDR : place au sein de la gauche issue du NFP' }, ['an-organe:PO845514']),
  group(['À Droite'], 'Droite', 'Assemblée nationale', { ...anDeclaration, locator: 'Déclaration du groupe À Droite : rassemblement des droites' }, ['an-organe:PO845520']),
  group(['Socialiste, Écologiste et Républicain'], 'Gauche', 'Sénat', { ...senateDeclaration, locator: 'Déclaration SER : valeurs de gauche' }),
  group(['Les Républicains', 'Les Républicains — Sénat'], 'Droite et centre', 'Sénat', { ...senateDeclaration, locator: 'Déclaration LR, préambule : rassemblement de la droite et du centre' }),
  group(['Union Centriste'], 'Centre', 'Sénat', { ...senateDeclaration, locator: 'Déclaration UC, premier paragraphe : formations centristes' }),
  group(['Les Indépendants - République et Territoires'], 'Droite et centre', 'Sénat', { ...senateDeclaration, locator: 'Déclaration LIRT : sensibilités de droite et du centre revendiquées' }),
  group(['Écologiste - Solidarité et Territoires', 'Écologiste, Solidarité et Territoires'], 'Écologie, régionalisme et divers gauche', 'Sénat', { ...senateDeclaration, locator: 'Déclaration EST, premier paragraphe : sensibilités de ses parlementaires' }),
  { names: ['Parti populaire européen (PPE)', 'Groupe du Parti populaire européen (Démocrates-Chrétiens)'], kind: 'group', chamber: 'Parlement européen', label: 'Centre droit', basis: 'institutional_description', context: 'EPRS 2024', source: eprsSource },
  { names: ['Alliance progressiste des socialistes et démocrates (S&D)', 'Groupe de l’Alliance Progressiste des Socialistes et Démocrates au Parlement européen'], kind: 'group', chamber: 'Parlement européen', label: 'Centre gauche', basis: 'institutional_description', context: 'EPRS 2024', source: eprsSource },
  { names: ['Renew Europe'], kind: 'group', chamber: 'Parlement européen', label: 'Centre', basis: 'self_description', context: 'Déclaration 2024', source: { publisher: 'Groupe Renew Europe', url: 'https://www.reneweuropegroup.eu/news/2024-11-20/renew-europe-as-pro-european-deal-maker-unites-the-centre-to-defend-europe', locator: 'Communiqué du 20 novembre 2024 : principes centristes et démocratiques', publishedAt: '2024-11-20', retrievedAt } },
];

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr-FR').replace(/[’]/g, "'").replace(/\s+/g, ' ').trim();

export function politicalClassifications({ name, kind, chamber, externalId, asOf, officialNames = [] }: { name: string; kind: PoliticalKind; chamber?: string; externalId?: string | null; asOf?: string; officialNames?: readonly string[] }): PoliticalClassification[] {
  return POLITICAL_CLASSIFICATIONS.filter(entry => entry.kind === kind
    && (!asOf || entry.source.publishedAt <= asOf)
    && (kind === 'party' || (!!chamber && entry.chamber === chamber))
    && (externalId && entry.externalIds ? entry.externalIds.includes(externalId) : entry.names.some(alias => [name, ...officialNames].some(official => normalize(alias) === normalize(official)))));
}

export function politicalClassification(identity: Parameters<typeof politicalClassifications>[0]): PoliticalClassification | null {
  return politicalClassifications(identity)[0] ?? null;
}

export const CLASSIFICATION_BASIS_LABELS = {
  electoral: 'Nuance électorale', self_description: 'Orientation déclarée', institutional_description: 'Description institutionnelle',
};
