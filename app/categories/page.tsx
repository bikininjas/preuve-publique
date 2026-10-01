import Link from 'next/link';
import { PartySubjectChart, PartyVoteChart } from '@/components/party-vote-chart';
import { Empty } from '@/components/ui';
import { getPartyVoteDashboard, getTopicCounts } from '@/lib/data';
import { topicSlug } from '@/lib/labels';
import { categoryKeywords, VOTE_SUBJECT_GROUPS } from '@/lib/vote-subjects';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Votes par thème et par parti' };

export default async function CategoriesPage() {
  const allSubjects: Array<{ id: string; keywords: string[] }> = VOTE_SUBJECT_GROUPS.flatMap(
    (category) => category.subjects.map((subject) => ({ id: subject.id, keywords: [...subject.keywords] })),
  );
  const [topics, dashboards] = await Promise.all([
    getTopicCounts().catch(() => null),
    Promise.all([
      ...VOTE_SUBJECT_GROUPS.map((category) => ({ id: category.id, keywords: categoryKeywords(category) })),
      ...allSubjects,
    ].map(async ({ id, keywords }) => {
      try { return [id, await getPartyVoteDashboard(keywords)] as const; }
      catch { return [id, null] as const; }
    })),
  ]);
  const items = topics ?? [];
  const unavailable = topics === null;
  const dashboardById = new Map(dashboards);
  const total = items.reduce((sum, item) => sum + item.pieces, 0);

  return (
    <main>
      <div className="page-intro"><div className="eyebrow">Explorer par sujet</div>
      <h1>Voir les votes.<br /><em>Parti par parti.</em></h1>
      <p className="lead">
        Trois grandes catégories et un graphique pour chacun des quinze sous-thèmes. Les barres comptent les bulletins individuels de députés
        rattachés à un parti par le référentiel daté de l’Assemblée nationale. Ouvrez un sujet pour retrouver les scrutins
        exacts et leurs sources. Un scrutin peut apparaître dans plusieurs sous-thèmes : n’additionnez pas leurs totaux.
        Une couleur ne dit pas ce qu’un parti pense de tout un domaine.
      </p></div>

      <div className="category-vote-overview">
        {VOTE_SUBJECT_GROUPS.map((category) => <div key={category.id}>
          {dashboardById.get(category.id) ? <PartyVoteChart title={category.label} dashboard={dashboardById.get(category.id)!} href={`/scrutins?category=${category.id}`} partyHref={(partyId) => `/scrutins?category=${category.id}&party=${partyId}#party-details`} previewLimit={8} /> : <Empty>Les votes par parti pour « {category.label} » sont indisponibles.</Empty>}
          <div className="category-subtheme-heading"><div className="eyebrow">Sous-thèmes de {category.label}</div><h3>Un sujet, des votes précis.</h3></div>
          <div className="party-subject-grid">{category.subjects.map((subject) => {
            const dashboard = dashboardById.get(subject.id);
            return dashboard ? <PartySubjectChart key={subject.id} title={subject.label} subjectId={subject.id} dashboard={dashboard} />
              : <div key={subject.id} className="party-subject-chart"><h3><Link href={`/scrutins?subject=${subject.id}`}>{subject.label} ↗</Link></h3><p>Graphique indisponible pour le moment.</p></div>;
          })}</div>
        </div>)}
      </div>

      <div className="section-heading category-source-heading"><div><div className="eyebrow">Classement des institutions</div><h2>Rubriques publiées par les sources</h2></div></div>
      <p className="hint">Ces rubriques proviennent aujourd’hui des dossiers du Sénat. Elles sont distinctes de nos catégories de navigation ; la base ne contient pas encore de votes individuels de sénateurs reliés à leur parti.</p>

      {unavailable ? (
        <Empty>La base documentaire n’est pas accessible pour le moment.</Empty>
      ) : items.length ? (
        <>
          <p className="resultline">
            {items.length} rubrique{items.length > 1 ? 's' : ''} · {total.toLocaleString('fr-FR')} pièces publiées
          </p>
          <div className="topic-grid">
            {items.map((item, index) => (
              <Link className="topic-tile" href={`/categories/${topicSlug(item.topic)}`} key={item.topic}>
                <span>{String(index + 1).padStart(2, '0')} / RUBRIQUE SOURCE</span>
                <strong>{item.topic}</strong>
                <small>{item.pieces.toLocaleString('fr-FR')} pièce{item.pieces > 1 ? 's' : ''} publiée{item.pieces > 1 ? 's' : ''}<b>↗</b></small>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Empty>
          Aucune rubrique publiée pour l’instant : les rubriques viennent des sources et n’apparaissent ici qu’avec la
          première pièce publiée qui les porte.
        </Empty>
      )}
    </main>
  );
}
