import { SeoPage } from '@/components/seo-page';
import type { SearchParamsRecord } from '@/lib/params';
import { pageMetadata, SEO_PAGES } from '@/lib/seo';
import Link from 'next/link';
import { Empty } from '@/components/ui';
import { getActors, getGroupDirectory } from '@/lib/data';
import { GroupDirectory } from './directory';
import { HeroAtmosphere } from '@/components/editorial-decoration';
import { PoliticalGroupReferences } from '@/components/political-group-references';
import { ParliamentComposition } from '@/components/parliament-composition';

export const dynamic = 'force-dynamic';

export default async function GroupesPage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const params = await searchParams;
  let groups: Awaited<ReturnType<typeof getGroupDirectory>> = [];
  let parties: Awaited<ReturnType<typeof getActors>> = [];
  let failed = false;
  const [groupResult, partyResult] = await Promise.allSettled([getGroupDirectory(), getActors('party')]);
  if (groupResult.status === 'fulfilled') groups = groupResult.value;
  else failed = true;
  if (partyResult.status === 'fulfilled') parties = partyResult.value;
  const identities = groups.reduce((sum, group) => sum + group.identity_count, 0);
  const firstYear = groups.length ? Math.min(...groups.map((group) => Number(group.first_vote.slice(0, 4)))) : null;
  const lastYear = groups.length ? Math.max(...groups.map((group) => Number(group.last_vote.slice(0, 4)))) : null;

  return <main className="group-explorer"><SeoPage path="/groupes" />
    <section className="group-editorial-hero">
      <HeroAtmosphere />
      <div className="group-hero-copy">
        <div className="group-hero-kicker"><span className="group-hero-dot" /> Assemblée nationale · Sénat · Parlement européen</div>
        <h1>Groupes parlementaires</h1>
        <p>Découvrez la composition des trois assemblées, puis les positions majoritaires dans les scrutins publiés de l’Assemblée nationale.</p>
        <a href="#composition" className="group-hero-link">Voir les hémicycles <span aria-hidden="true">↗</span></a>
      </div>
    </section>

    <ParliamentComposition mode="groups" params={params} />
    <h2>Annuaire des votes publiés · Assemblée nationale</h2>
    <p className="resultline">{groups.length} entrées de navigation · {identities} identifiants officiels · votes publiés de {firstYear ?? '—'} à {lastYear ?? '—'}. Cet historique documentaire est distinct des effectifs de l’hémicycle.</p>
    <section className="group-method-note"><span className="group-method-mark">≠</span><div><strong>Un groupe parlementaire n’est pas un parti.</strong><p>Les variantes explicites de nom sont réunies pour la navigation. Chaque fiche conserve les identifiants officiels ; la majorité du groupe ne donne pas le vote de chaque membre.</p></div><Link href="/methode">La méthode ↗</Link></section>

    {failed ? <Empty>La liste des groupes est indisponible pour le moment.</Empty> : groups.length ? <GroupDirectory groups={groups} /> : <Empty>Aucun groupe lié à un scrutin publié n’est visible pour le moment.</Empty>}

    <section className="group-party-note"><h2>Explorer aussi les partis</h2><p>{parties.length ? `${parties.length} partis identifiés dans les sources publiées. ` : ''}Leurs bulletins reposent sur des affiliations datées et sourcées.</p><Link className="text-link" href="/partis">Voir les profils des partis ↗</Link></section>
    <PoliticalGroupReferences />
  </main>;
}

export async function generateMetadata({searchParams}:{searchParams:Promise<SearchParamsRecord>}) {
  return pageMetadata('/groupes',SEO_PAGES['/groupes'],await searchParams);
}
