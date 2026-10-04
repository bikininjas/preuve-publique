import { SeoPage } from '@/components/seo-page';
import type { SearchParamsRecord } from '@/lib/params';
import { pageMetadata, SEO_PAGES } from '@/lib/seo';
import Link from 'next/link';
import { Empty } from '@/components/ui';
import { getActors, getGroupDirectory } from '@/lib/data';
import { GroupDirectory } from './directory';
import { HeroAtmosphere } from '@/components/editorial-decoration';
import { PoliticalGroupReferences } from '@/components/political-group-references';

export const dynamic = 'force-dynamic';

export default async function GroupesPage() {
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
  const mostDocumented = [...groups].sort((a, b) => b.vote_count - a.vote_count).slice(0, 4);
  const largest = mostDocumented[0]?.vote_count ?? 1;

  return <main className="group-explorer"><SeoPage path="/groupes" />
    <section className="group-editorial-hero">
      <HeroAtmosphere />
      <div className="group-hero-copy">
        <div className="group-hero-kicker"><span className="group-hero-dot" /> Assemblée nationale · scrutins publiés</div>
        <h1>Groupes parlementaires</h1>
        <p>Positions majoritaires officielles, intitulés et identifiants, dans les scrutins publiés de l’Assemblée nationale.</p>
        <a href="#annuaire" className="group-hero-link">Explorer les groupes <span aria-hidden="true">↗</span></a>
        <div className="group-hero-stats"><div><strong>{groups.length}</strong><span>entrées de navigation</span></div><div><strong>{identities}</strong><span>identifiants officiels</span></div><div><strong>{firstYear ?? '—'}–{lastYear ?? '—'}</strong><span>dates des votes publiés</span></div></div>
      </div>
      <div className="group-hero-visual" aria-label="Groupes avec le plus de scrutins publiés dans la base">
        <div className="group-visual-head"><span>01 / Couverture documentaire</span><span>Assemblée nationale</span></div>
        <p>Scrutins documentés</p>
        {mostDocumented.map((group, index) => <div className="group-visual-row" key={group.actor_id}>
          <span className="group-visual-index">0{index + 1}</span>
          <div><span className="group-visual-name">{group.display_name}</span><div className="group-visual-track"><i style={{ width: `${group.vote_count / largest * 100}%` }} /></div></div>
          <strong>{group.vote_count.toLocaleString('fr-FR')}</strong>
        </div>)}
        <div className="group-visual-foot">Nombre de scrutins publiés où un organe du regroupement apparaît. Ce volume n’est ni une note ni un taux de présence.</div>
      </div>
    </section>

    <section className="group-method-note"><span className="group-method-mark">≠</span><div><strong>Un groupe parlementaire n’est pas un parti.</strong><p>Les variantes explicites de nom sont réunies pour la navigation. Chaque fiche conserve les identifiants officiels ; la majorité du groupe ne donne pas le vote de chaque membre.</p></div><Link href="/methode">La méthode ↗</Link></section>

    {failed ? <Empty>La liste des groupes est indisponible pour le moment.</Empty> : groups.length ? <GroupDirectory groups={groups} /> : <Empty>Aucun groupe lié à un scrutin publié n’est visible pour le moment.</Empty>}

    <section className="group-party-note"><h2>Explorer aussi les partis</h2><p>{parties.length ? `${parties.length} partis identifiés dans les sources publiées. ` : ''}Leurs bulletins reposent sur des affiliations datées et sourcées.</p><Link className="text-link" href="/partis">Voir les profils des partis ↗</Link></section>
    <PoliticalGroupReferences />
  </main>;
}

export async function generateMetadata({searchParams}:{searchParams:Promise<SearchParamsRecord>}) {
  return pageMetadata('/groupes',SEO_PAGES['/groupes'],await searchParams);
}
