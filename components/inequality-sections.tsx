import Link from 'next/link';
import domains from '@/lib/inequality-domains.json';
import type { Evidence, EvidencePage } from '@/lib/types';
import { EvidenceCard } from '@/components/evidence-card';
import { Empty, StatusBadge } from '@/components/ui';

function domainOf(item: Evidence) {
  const indicator = item.detail?.indicator as { domain?: string } | undefined;
  if (indicator?.domain) return domains.some(({ id }) => id === indicator.domain) ? indicator.domain : 'autres';
  return item.external_id?.startsWith('observatoire:insee:ip2063:') ? 'revenus-patrimoine' : 'autres';
}

export function InequalitySections({ result, review = false }: { result: EvidencePage | null; review?: boolean }) {
  const groups = [...domains, { id: 'autres', label: 'Autres indicateurs documentés' }]
    .map((domain) => ({ ...domain, items: result?.items.filter((item) => domainOf(item) === domain.id) ?? [] }))
    .filter((group) => group.items.length);
  return <section className="observatory-section" id="inegalites">
    <div className="section-heading"><div><div className="eyebrow">Conditions de vie et accès aux ressources</div><h2>Les inégalités documentées.</h2><p className="hint">Revenus et patrimoine, prix, impôts, femmes et hommes, origine, études, carrières, logement et aides. Chaque mesure garde sa période et sa population.</p></div>{result && result.total > 0 ? <Link className="text-link" href={review ? '/admin/review?kind=indicator&status=all' : '/pieces?kind=indicator'}>{review ? 'Toutes les fiches' : 'Tout consulter'} ({result.total.toLocaleString('fr-FR')}) →</Link> : null}</div>
    <p className="hint">Un écart brut, une simulation et un testing répondent à des questions différentes. Les catégories migratoires ne décrivent pas une couleur de peau ; les testings documentent une origine perçue. Les contributions des impôts et des aides sont présentées avec leurs limites, sans attribuer automatiquement un résultat à un vote.</p>
    {result === null ? <Empty>Les indicateurs sont temporairement indisponibles.</Empty> : groups.length ? <>
      <nav className="inequality-nav" aria-label="Domaines d’inégalités">{groups.map((group) => <a key={group.id} href={`#inegalites-${group.id}`}>{group.label}</a>)}</nav>
      {result.hasMore ? <p className="hint">Cette page présente les {result.items.length} fiches les plus récentes. Le catalogue contient les autres périodes et domaines.</p> : null}
      {groups.map((group) => <section className="inequality-domain" id={`inegalites-${group.id}`} key={group.id}><h3>{group.label}</h3><div className="cards">{group.items.map((item) => <div key={item.id}>{review ? <StatusBadge status={item.status} /> : null}<EvidenceCard item={item} review={review} /></div>)}</div></section>)}
    </> : <Empty>{review ? 'Aucun indicateur disponible pour la relecture.' : 'Aucun indicateur validé n’est encore publié. Les valeurs et comparaisons doivent être relues avec les documents originaux avant publication.'}</Empty>}
  </section>;
}
