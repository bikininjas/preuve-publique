import { SeoPage } from '@/components/seo-page';
import { pageMetadata, SEO_PAGES } from '@/lib/seo';
import Link from 'next/link';
import { PartyProfileCard, PROFILE_SUBJECTS } from '@/components/party-profile-card';
import { Empty, Pager } from '@/components/ui';
import { first, pageParam, type SearchParamsRecord } from '@/lib/params';
import { getAllPartyVotes, getPartyThemes } from '@/lib/vote-theme-data';
import { ballotTotal } from '@/lib/vote-profile';
import { VOTE_SUBJECT_GROUPS } from '@/lib/vote-subjects';

export const dynamic = 'force-dynamic';

export default async function PartiesPage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const params = await searchParams;
  const query = (first(params.q) ?? '').trim().slice(0, 80);
  const page = pageParam(params.page);
  const [dashboard, themes] = await Promise.all([
    getAllPartyVotes().catch(() => null),
    getPartyThemes([...VOTE_SUBJECT_GROUPS.map((category) => category.id), ...PROFILE_SUBJECTS]),
  ]);
  const parties = [...(dashboard?.parties ?? [])].sort((a, b) => ballotTotal(b) - ballotTotal(a) || a.party_name.localeCompare(b.party_name, 'fr'));
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr-FR');
  const filtered = parties.filter((party) => normalize(party.party_name).includes(normalize(query)) || normalize(party.party_name.split(/\s+/).map((word) => word[0]).join('')) === normalize(query));
  const shown = filtered.slice((page - 1) * 12, page * 12);
  return <main><SeoPage path="/partis" />
    <div className="page-intro reading-intro"><div className="eyebrow">Assemblée nationale · Affiliations datées</div><h1>Partis politiques</h1><p className="lead">Les bulletins des députés rattachés à chaque parti, par thème et par scrutin.</p></div>
    <div className="profile-reading-key"><div className="party-chart-legend"><span className="pour">Pour</span><span className="contre">Contre</span><span className="abstention">Abstention</span><span className="non-votant">Non-votant</span></div><p>Les pourcentages portent sur les textes et amendements trouvés dans le corpus, pas sur une orientation « libérale » ou « sociale ». Un vote pour un amendement de suppression peut s’opposer à la mesure du texte. Les partis et leurs anciens noms restent distincts selon les affiliations datées.</p><Link href="/methode#profils-vote">Comprendre les chiffres →</Link></div>
    <form className="searchbar" action="/partis" method="get"><label className="sr-only" htmlFor="party-search">Chercher un parti</label><input id="party-search" type="search" name="q" maxLength={80} defaultValue={query} placeholder="Nom ou initiales du parti…" /><button className="button" type="submit">Rechercher ↗</button></form>
    <p className="resultline">{filtered.length} parti{filtered.length > 1 ? 's' : ''}{query ? ` pour « ${query} »` : ''} avec des bulletins attribuables · tri par volume documenté, archives comprises</p>
    {dashboard && shown.length ? <div className="party-profile-grid">{shown.map((party) => <PartyProfileCard key={party.party_id} party={party} themes={themes} scope={dashboard.scope} />)}</div> : <Empty>{dashboard ? 'Aucun profil sur cette page. Essayez un autre nom ou revenez à la première page.' : 'Les profils de vote sont temporairement indisponibles.'}</Empty>}
    <Pager page={page} pageCount={Math.max(1, Math.ceil(filtered.length / 12))} hrefFor={(target) => `/partis?${new URLSearchParams({ ...(query ? { q: query } : {}), page: String(target) })}`} />
    <p className="section-foot">Au Sénat, les données disponibles portent sur les groupes parlementaires. <Link href="/categories?institution=senat">Explorer les groupes du Sénat par sujet →</Link></p>
  </main>;
}

export async function generateMetadata({searchParams}:{searchParams:Promise<SearchParamsRecord>}) {
  return pageMetadata('/partis',SEO_PAGES['/partis'],await searchParams);
}
