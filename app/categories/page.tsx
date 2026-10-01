import Link from 'next/link';
import { PartyVoteChart } from '@/components/party-vote-chart';
import { Empty } from '@/components/ui';
import { getPartyVoteDashboard, getTopicCounts } from '@/lib/data';
import { topicSlug } from '@/lib/labels';
import { categoryKeywords, VOTE_SUBJECT_GROUPS } from '@/lib/vote-subjects';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Rubriques' };

export default async function CategoriesPage() {
  let items: Awaited<ReturnType<typeof getTopicCounts>> = [];
  let unavailable = false;
  try {
    items = await getTopicCounts();
  } catch {
    unavailable = true;
  }
  const total = items.reduce((sum, item) => sum + item.pieces, 0);
  const dashboards = await Promise.all(VOTE_SUBJECT_GROUPS.map(async (category) => {
    try { return await getPartyVoteDashboard(categoryKeywords(category)); }
    catch { return null; }
  }));

  return (
    <main>
      <div className="page-intro"><div className="eyebrow">Explorer par sujet</div>
      <h1>Voir les votes.<br /><em>Parti par parti.</em></h1>
      <p className="lead">
        Trois grandes catégories, puis des sujets précis. Les barres comptent les bulletins individuels de députés
        rattachés à un parti par le référentiel daté de l’Assemblée nationale. Ouvrez un sujet pour retrouver les scrutins
        exacts et leurs sources ; une couleur ne dit pas ce qu’un parti pense de tout un domaine.
      </p></div>

      <div className="category-vote-overview">
        {VOTE_SUBJECT_GROUPS.map((category, index) => <div key={category.id}>
          {dashboards[index] ? <PartyVoteChart title={category.label} dashboard={dashboards[index]!} href={`/scrutins?category=${category.id}`} partyHref={(partyId) => `/scrutins?category=${category.id}&party=${partyId}#party-details`} previewLimit={8} /> : <Empty>Les votes par parti pour « {category.label} » sont indisponibles.</Empty>}
          <nav className="category-subtopics" aria-label={`Sous-thèmes : ${category.label}`}>
            {category.subjects.map((subject) => <Link href={`/scrutins?subject=${subject.id}`} key={subject.id}>{subject.label} ↗</Link>)}
          </nav>
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
