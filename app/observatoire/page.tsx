import { SeoPage } from '@/components/seo-page';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { EvidenceCard } from '@/components/evidence-card';
import { InequalitySections } from '@/components/inequality-sections';
import { JudicialDashboard } from '@/components/judicial-dashboard';
import { getJudicialEvidence } from '@/lib/judicial-data';
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
  // Une rubrique indisponible ne masque pas les autres et ne vaut pas zéro pièce.
  const queries = [
    { kind: 'program' as const, limit: 3 }, { kind: 'statement' as const, limit: 3 },
    { kind: 'indicator' as const, limit: 24 }, { kind: 'judicial_event' as const, limit: 100 },
    { kind: 'vote' as const, institution: 'assemblee' as const, limit: 1 },
    { kind: 'vote' as const, institution: 'senat' as const, limit: 1 },
    { kind: 'vote' as const, institution: 'parlement_europeen' as const, limit: 1 },
  ];
  const results = isConfigured() ? await Promise.allSettled(queries.map((query) => query.kind === 'judicial_event' ? getJudicialEvidence() : getEvidencePage(query))) : [];
  const pages = queries.map((_, index) => {
    const result = results[index];
    return result?.status === 'fulfilled' ? result.value : null;
  });
  const [programs, statements, indicators, judicial, assemblee, senat, parlement] = pages;
  const count = (page: EvidencePage | null) => page ? page.total.toLocaleString('fr-FR') : '—';
  return <main className="observatory-page"><SeoPage path="/observatoire" />
    <div className="page-intro reading-intro"><div className="eyebrow">Au-delà du scrutin</div><h1>Observatoire</h1><p className="lead">Indicateurs, programmes, déclarations et étapes judiciaires, avec leurs sources.</p></div>
    <nav className="observatory-entries" aria-label="Rubriques de l’observatoire">
      <a href="#inegalites"><strong>Inégalités</strong><span>{indicators ? count(indicators) + ' indicateurs publiés' : 'Comptage indisponible'}</span><b aria-hidden="true">↓</b></a>
      <a href="#parole-vote"><strong>Parole et vote</strong><span>{programs && statements ? count(programs) + ' programmes · ' + count(statements) + ' déclarations' : 'Comptage indisponible'}</span><b aria-hidden="true">↓</b></a>
      <a href="#justice"><strong>Affaires judiciaires</strong><span>{judicial ? count(judicial) + ' étapes publiées' : 'Comptage indisponible'}</span><b aria-hidden="true">↓</b></a>
    </nav>
    <InequalitySections result={indicators} />
    <PublishedSection id="parole-vote" title="Programmes" intro="Édition électorale et extraits identifiés. Une archive d’une autre élection ne représente pas un programme de 2027 ; un document seul ne valide aucun rapprochement avec un vote." result={programs} href="/pieces?kind=program" empty="Aucun programme validé n’est encore publié. Les archives doivent être relues avec leur édition et leur contexte." />
    {statements === null || statements.total > 0 ? <PublishedSection id="declarations" title="Déclarations" intro="Formulation exacte, circonstances et repère dans l’enregistrement ou la transcription." result={statements} href="/pieces?kind=statement" empty="Aucune déclaration publiée." /> : <p className="hint">Aucune déclaration médiatique vérifiée n’est publiée pour l’instant.</p>}
    <JudicialDashboard result={judicial} />
    <section className="coverage"><div className="section-heading"><div><div className="eyebrow">Corpus publié dans Preuve Publique</div><h2>Scrutins disponibles</h2></div></div><div className="coverage-grid">{[
      { title: 'Assemblée nationale', page: assemblee, institution: 'assemblee' },
      { title: 'Sénat', page: senat, institution: 'senat' },
      { title: 'Parlement européen', page: parlement, institution: 'parlement_europeen' },
    ].map(({ title, page, institution }) => <div key={institution}><span>{title}</span><strong>{count(page)}</strong><small>{page ? 'scrutins publiés' : 'comptage indisponible'}</small>{page && page.total > 0 ? <Link className="text-link" href={'/scrutins?institution=' + institution}>Consulter les votes →</Link> : page ? <p className="hint">Corpus non publié à ce jour.</p> : null}</div>)}</div><p className="hint">Ces nombres décrivent les pièces publiées dans Preuve Publique, pas tous les votes tenus par chaque institution.</p></section>
    <div className="cta"><Link className="button" href="/scrutins">Explorer les scrutins →</Link><Link className="button secondary" href="/methode">Lire la méthode</Link></div>
  </main>;
}

export const metadata = pageMetadata('/observatoire');
