import Link from 'next/link';
import { EvidenceCard } from '@/components/evidence-card';
import { Empty, Pager } from '@/components/ui';
import { getEvidencePage } from '@/lib/data';
import { enumParam, first, pageParam, type SearchParamsRecord } from '@/lib/params';
import { INSTITUTIONS, type Institution } from '@/lib/types';
import { institutionLabel } from '@/lib/labels';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Scrutins officiels' };
const PAGE_SIZE = 18;

export default async function ScrutinsPage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const params = await searchParams;
  const institution = enumParam<Institution>(params.institution, INSTITUTIONS);
  const terms = (first(params.q) ?? '').trim().slice(0, 120);
  const page = pageParam(params.page);
  let result: Awaited<ReturnType<typeof getEvidencePage>> | null = null;
  try { result = await getEvidencePage({ kind: 'vote', institution, terms: terms || undefined, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }); } catch { /* explicit empty state below */ }
  const hrefFor = (target: number) => {
    const query = new URLSearchParams();
    if (institution) query.set('institution', institution);
    if (terms) query.set('q', terms);
    if (target > 1) query.set('page', String(target));
    return `/scrutins${query.size ? `?${query}` : ''}`;
  };
  return <main>
    <div className="page-intro"><div className="eyebrow">La base des votes</div><h1>Les scrutins,<br /><em>sans jargon inutile.</em></h1><p className="lead">Un intitulé lisible pour repérer le sujet ; l’intitulé officiel, les chiffres et la source restent sur chaque fiche. Un scrutin peut porter sur un article, un amendement ou un texte entier.</p></div>
    <nav className="pills" aria-label="Filtrer par institution"><Link className={!institution ? 'active' : ''} href="/scrutins">Toutes les institutions</Link>{INSTITUTIONS.filter((value) => value !== 'legifrance').map((value) => <Link className={institution === value ? 'active' : ''} href={`/scrutins?institution=${value}`} key={value}>{institutionLabel(value)}</Link>)}</nav>
    <form className="searchbar" method="get" action="/scrutins"><input type="hidden" name="institution" value={institution ?? ''} /><label className="sr-only" htmlFor="vote-search">Rechercher un scrutin</label><input id="vote-search" type="search" name="q" defaultValue={terms} placeholder="Rechercher un sujet, un texte, un numéro de scrutin…" /><button className="button" type="submit">Rechercher ↗</button></form>
    {result ? <><div className="list-heading"><h2>{terms ? `Résultats pour « ${terms} »` : 'Scrutins publiés'}</h2><span>{result.total.toLocaleString('fr-FR')} fiche{result.total > 1 ? 's' : ''}</span></div>{result.items.length ? <div className="cards">{result.items.map((item) => <EvidenceCard item={item} key={item.id} />)}</div> : <Empty>Aucun scrutin publié ne correspond à cette recherche. La couverture des institutions est encore partielle.</Empty>}<Pager page={page} pageCount={Math.max(1, Math.ceil(result.total / PAGE_SIZE))} hrefFor={hrefFor} /></> : <Empty>La base des scrutins est indisponible pour le moment.</Empty>}
    <p className="section-foot">Les positions de groupe ne sont affichées que lorsqu’elles figurent dans la source. <Link href="/methode">Comprendre la méthode →</Link></p>
  </main>;
}
