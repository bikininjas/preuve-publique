import Link from 'next/link';
import { Empty } from '@/components/ui';
import { getActors } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Groupes et partis' };

export default async function GroupesPage() {
  let groups: Awaited<ReturnType<typeof getActors>> = [];
  let parties: Awaited<ReturnType<typeof getActors>> = [];
  let failed = false;
  const [groupResult, partyResult] = await Promise.allSettled([getActors('group'), getActors('party')]);
  if (groupResult.status === 'fulfilled') groups = groupResult.value;
  else failed = true;
  if (partyResult.status === 'fulfilled') parties = partyResult.value;
  return <main>
    <div className="page-intro"><div className="eyebrow">Qui vote ?</div><h1>Groupes politiques<br /><em>et partis.</em></h1><p className="lead">Les assemblées publient des votes de groupes parlementaires. Un groupe peut réunir plusieurs partis ; son vote ne devient pas automatiquement celui de chacun d’eux. Parcourez les groupes identifiés dans les scrutins publiés.</p></div>
    <div className="info-band"><strong>À distinguer</strong><span>Groupe parlementaire ≠ parti politique ≠ vote individuel. Les rattachements évoluent dans le temps et demandent une source datée.</span></div>
    {failed ? <Empty>La liste des groupes est indisponible pour le moment.</Empty> : groups.length ? <><div className="list-heading"><h2>Groupes documentés</h2><span>{groups.length} groupes visibles</span></div><div className="group-grid">{groups.map((group) => <Link className="group-tile" href={`/groupes/${group.id}`} key={group.id}><span className="group-monogram">{group.name.slice(0, 2).toLocaleUpperCase('fr-FR')}</span><strong>{group.name}</strong><span className="tile-arrow">Voir les scrutins →</span></Link>)}</div></> : <Empty>Aucun groupe lié à un scrutin publié n’est visible pour le moment.</Empty>}
    <section className="panel"><div className="eyebrow">Partis</div><h2>Des fiches de parti en préparation</h2><p>{parties.length ? `${parties.length} parti${parties.length > 1 ? 's' : ''} déjà identifié${parties.length > 1 ? 's' : ''} dans les sources publiées. ` : ''}Une fiche de parti fiable demande de relier ses programmes, ses déclarations et ses groupes à une date précise. Nous n’attribuons pas les votes d’un groupe à un parti sans ce rattachement documenté.</p><Link className="text-link" href="/observatoire">Voir les données à réunir →</Link></section>
  </main>;
}
