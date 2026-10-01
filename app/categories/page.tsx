import Link from 'next/link';
import { Empty } from '@/components/ui';
import { getTopicCounts } from '@/lib/data';
import { topicSlug } from '@/lib/labels';

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

  return (
    <main>
      <div className="page-intro"><div className="eyebrow">Explorer par sujet</div>
      <h1>Les thèmes<br /><em>des décisions.</em></h1>
      <p className="lead">
        Parcourez les rubriques fournies par les sources et les scrutins associés à leurs dossiers. Chaque fiche indique
        l’origine de son classement. La présence d’un scrutin dans un thème ne décrit pas à elle seule une position politique.
      </p></div>

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
