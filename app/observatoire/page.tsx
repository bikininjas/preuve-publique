import Link from 'next/link';
import { getEvidencePage } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Observatoire' };

const DOMAINS = ['Revenus & patrimoine', 'Travail & emploi', 'Logement', 'Santé', 'Éducation', 'Territoires', 'Environnement', 'Services publics'];

export default async function ObservatoirePage() {
  let counts: { programs: number; statements: number; indicators: number } | null = null;
  let votesByInstitution: { assemblee: number; senat: number; parlement_europeen: number } | null = null;
  try {
    const [programs, statements, indicators, assemblee, senat, parlement] = await Promise.all([
      getEvidencePage({ kind: 'program', limit: 1 }), getEvidencePage({ kind: 'statement', limit: 1 }), getEvidencePage({ kind: 'indicator', limit: 1 }),
      getEvidencePage({ kind: 'vote', institution: 'assemblee', limit: 1 }), getEvidencePage({ kind: 'vote', institution: 'senat', limit: 1 }), getEvidencePage({ kind: 'vote', institution: 'parlement_europeen', limit: 1 }),
    ]);
    counts = { programs: programs.total, statements: statements.total, indicators: indicators.total };
    votesByInstitution = { assemblee: assemblee.total, senat: senat.total, parlement_europeen: parlement.total };
  } catch { /* explicit unavailable state */ }
  return <main>
    <div className="page-intro reading-intro"><div className="eyebrow">Au-delà du scrutin</div><h1>Relier les décisions<br /><em>à la vie réelle.</em></h1><p className="lead">Votes, discours, programmes, effets possibles et inégalités : ces questions méritent des dossiers suivis dans le temps. Voici les chantiers éditoriaux et leurs conditions de publication.</p></div>
    <section className="coverage"><div className="section-heading"><div><div className="eyebrow">Couverture réelle de la base</div><h2>Ce qui est visible aujourd’hui.</h2></div></div><div className="coverage-grid"><div><span>Assemblée nationale</span><strong>{votesByInstitution?.assemblee.toLocaleString('fr-FR') ?? '—'}</strong><small>scrutins publiés</small></div><div><span>Sénat</span><strong>{votesByInstitution?.senat.toLocaleString('fr-FR') ?? '—'}</strong><small>scrutins publiés</small></div><div><span>Parlement européen</span><strong>{votesByInstitution?.parlement_europeen.toLocaleString('fr-FR') ?? '—'}</strong><small>scrutins publiés</small></div></div><p className="hint">Ces nombres décrivent uniquement les pièces publiées dans Preuve Publique. Ils ne correspondent pas au nombre total de votes tenus par chaque institution.</p></section>
    <section className="observatory-grid"><article className="feature-card"><span className="feature-num">01 / COMPARER</span><h2>Parole & vote</h2><p>Mettre côte à côte la formulation exacte d’un programme ou d’une déclaration et le scrutin portant sur la même mesure. Le périmètre du texte et le motif du vote doivent être vérifiés par une personne.</p><span className="availability">{counts ? `${counts.programs} programmes · ${counts.statements} déclarations publiés` : 'Données indisponibles'}</span></article><article className="feature-card"><span className="feature-num">02 / MESURER</span><h2>Inégalités</h2><p>Suivre des indicateurs publics avec unité, période, couverture géographique, méthode et source. Une évolution ne sera jamais attribuée à un scrutin par simple proximité dans le temps.</p><span className="availability">{counts ? `${counts.indicators} indicateurs publiés` : 'Données indisponibles'}</span></article><article className="feature-card"><span className="feature-num">03 / CONTEXTUALISER</span><h2>Affaires judiciaires</h2><p>Présenter les faits allégués, la procédure, les décisions, les recours et l’état actuel, avec leurs dates et sources judiciaires. Présomption d’innocence et distinction entre personne et parti sont indispensables.</p><span className="availability">Aucune fiche judiciaire dans le modèle actuel</span></article></section>
    <section className="section-pad"><div className="section-heading"><div><div className="eyebrow">Indicateurs à documenter</div><h2>Les domaines à suivre</h2></div></div><div className="domain-grid">{DOMAINS.map((domain, index) => <div className="domain-tile" key={domain}><span>{String(index + 1).padStart(2, '0')}</span><strong>{domain}</strong><small>Sources et séries à documenter</small></div>)}</div></section>
    <section className="info-band big"><strong>Des KPI avec un dénominateur</strong><span>Présence aux scrutins, répartition des votes et présence médiatique n’ont de sens qu’avec une période, un périmètre, une source et une méthode stables. Aucun pourcentage ne sera affiché avant de réunir ces éléments.</span></section>
    <div className="cta"><Link className="button" href="/scrutins">Explorer les scrutins disponibles →</Link><Link className="button secondary" href="/methode">Lire la méthode</Link></div>
  </main>;
}
