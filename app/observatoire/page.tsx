import { SeoPage } from '@/components/seo-page';
import { pageMetadata, SEO_PAGES } from '@/lib/seo';
import Link from 'next/link';
import { EvidenceCard } from '@/components/evidence-card';
import { InequalitySections } from '@/components/inequality-sections';
import { Empty } from '@/components/ui';
import { getEvidencePage, isConfigured } from '@/lib/data';
import type { EvidencePage } from '@/lib/types';

export const dynamic = 'force-dynamic';

function PublishedSection({ id, title, intro, result, href, empty }: {
  id: string; title: string; intro: string; result: EvidencePage | null;
  href: string; empty: string;
}) {
  return <section className="observatory-section" id={id}>
    <div className="section-heading"><div><h2>{title}</h2><p className="hint">{intro}</p></div>{result && result.total > 0 ? <Link className="text-link" href={href}>Tout consulter ({result.total.toLocaleString('fr-FR')}) →</Link> : null}</div>
    {result === null ? <Empty>Les données de cette rubrique sont temporairement indisponibles.</Empty>
      : result.items.length ? <div className="cards">{result.items.map((item) => <EvidenceCard key={item.id} item={item} />)}</div>
      : <Empty>{empty}</Empty>}
  </section>;
}

export default async function ObservatoirePage() {
  // Une panne d’une rubrique n’efface pas les autres. Une base non configurée
  // reste indisponible, sans transformer l’absence de connexion en zéro pièce.
  const queries = [
    { kind: 'program' as const, limit: 3 }, { kind: 'statement' as const, limit: 3 },
    { kind: 'indicator' as const, limit: 24 }, { kind: 'judicial_event' as const, limit: 3 },
    { kind: 'vote' as const, institution: 'assemblee' as const, limit: 1 },
    { kind: 'vote' as const, institution: 'senat' as const, limit: 1 },
    { kind: 'vote' as const, institution: 'parlement_europeen' as const, limit: 1 },
  ];
  const results = isConfigured() ? await Promise.allSettled(queries.map((query) => getEvidencePage(query))) : [];
  const pages = queries.map((_, index) => {
    const result = results[index];
    return result?.status === 'fulfilled' ? result.value : null;
  });
  const [programs, statements, indicators, judicial, assemblee, senat, parlement] = pages;
  const count = (page: EvidencePage | null) => page ? page.total.toLocaleString('fr-FR') : '—';
  return <main><SeoPage path="/observatoire" />
    <div className="page-intro reading-intro"><div className="eyebrow">Au-delà du scrutin</div><h1>Observatoire</h1><p className="lead">Programmes, déclarations, indicateurs et étapes judiciaires : les pièces disponibles et les données encore manquantes.</p></div>
    <nav className="reading-nav" aria-label="Rubriques de l’observatoire"><a href="#parole-vote">Parole & vote ↓</a><a href="#inegalites">Inégalités ↓</a><a href="#justice">Affaires judiciaires ↓</a></nav>
    <section className="coverage"><div className="section-heading"><div><div className="eyebrow">Couverture réelle de la base</div><h2>Les scrutins consultables.</h2></div></div><div className="coverage-grid">{[
      { title: 'Assemblée nationale', page: assemblee, institution: 'assemblee' },
      { title: 'Sénat', page: senat, institution: 'senat' },
      { title: 'Parlement européen', page: parlement, institution: 'parlement_europeen' },
    ].map(({ title, page, institution }) => <div key={institution}><span>{title}</span><strong>{count(page)}</strong><small>{page ? 'scrutins publiés' : 'comptage indisponible'}</small>{page && page.total > 0 ? <Link className="text-link" href={`/scrutins?institution=${institution}`}>Consulter les votes →</Link> : page ? <p className="hint">Corpus non publié à ce jour.</p> : null}</div>)}</div><p className="hint">Ces nombres décrivent les pièces publiées dans Preuve Publique, pas tous les votes tenus par chaque institution.</p></section>
    <section className="observatory-grid" aria-label="Contenus publiés"><article className="feature-card"><span className="feature-num">01 / COMPARER</span><h2>Parole & vote</h2><p>Lire la proposition dans son édition électorale, puis vérifier le texte et le périmètre du scrutin. Une archive de 2022 ne représente pas un programme de 2027.</p><a className="availability" href="#parole-vote">{count(programs)} programmes · {count(statements)} déclarations publiés ↓</a></article><article className="feature-card"><span className="feature-num">02 / MESURER</span><h2>Inégalités</h2><p>Consulter les valeurs avec leur unité, leur période, leur territoire et leur méthode. Une évolution observée ne prouve pas l’effet d’un vote.</p><a className="availability" href="#inegalites">{count(indicators)} indicateurs publiés ↓</a></article><article className="feature-card"><span className="feature-num">03 / CONTEXTUALISER</span><h2>Affaires judiciaires</h2><p>Distinguer les faits allégués, les décisions et les recours. Une étape datée ne décrit pas nécessairement l’état actuel de la procédure.</p><a className="availability" href="#justice">{count(judicial)} étapes judiciaires publiées ↓</a></article></section>
    <PublishedSection id="parole-vote" title="Les propositions à la source." intro="Documents originaux et extraits identifiés. Un document seul ne valide aucun rapprochement parole/vote. Les programmes officiels de 2027 sont présentés uniquement lorsqu’une source de cette édition est publiée." result={programs} href="/pieces?kind=program" empty="Aucun programme validé n’est encore publié. Les archives électorales doivent être relues avec leur édition et leur contexte avant publication." />
    {statements === null || statements.total > 0 ? <PublishedSection id="declarations" title="Les déclarations documentées." intro="Formulation exacte et circonstances, avec un repère dans l’enregistrement ou la transcription." result={statements} href="/pieces?kind=statement" empty="Aucune déclaration publiée." /> : <p className="hint">Aucune déclaration médiatique vérifiée n’est publiée pour l’instant.</p>}
    <InequalitySections result={indicators} />
    <PublishedSection id="justice" title="Les étapes judiciaires sourcées." intro="Pièces judiciaires datées, distinctes d’un dossier complet sur une personne ou un parti. Les informations manquantes et les recours sont explicités ; la présomption d’innocence s’applique aux faits non définitivement jugés." result={judicial} href="/pieces?kind=judicial_event" empty="Aucune étape judiciaire validée n’est encore publiée. Les documents et l’état de la procédure demandent une relecture humaine." />
    <div className="cta"><Link className="button" href="/scrutins">Explorer les scrutins →</Link><Link className="button secondary" href="/methode">Lire la méthode</Link></div>
  </main>;
}

export const metadata = pageMetadata('/observatoire');
