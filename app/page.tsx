import Link from 'next/link';
import { EvidenceCard } from '@/components/evidence-card';
import { getEvidencePage } from '@/lib/data';

// Rendered on request, with the runtime environment of the host (Cloud Run).
export const dynamic = 'force-dynamic';

export default async function Home() {
  let items: Awaited<ReturnType<typeof getEvidencePage>>['items'] = [];
  let total = 0;
  let unavailable = false;
  try {
    const page = await getEvidencePage({ limit: 12 });
    items = page.items;
    total = page.total;
  } catch {
    unavailable = true;
  }
  return (
    <main>
      <div className="eyebrow">La traçabilité politique, source par source</div>
      <h1>Des paroles aux actes, remontez aux preuves.</h1>
      <p className="lead">
        Programmes, déclarations, amendements, votes et textes adoptés : parcourez leur chronologie en France et dans
        l’Union européenne. Chaque pièce renvoie au document original, avec sa date et sa provenance. Pas de note, pas
        de verdict automatique.
      </p>
      <div className="cta">
        <Link className="button" href="/pieces">
          Explorer les pièces
        </Link>
        <Link className="quiet" href="/methode">
          Comprendre la méthode
        </Link>
      </div>
      <section className="panel">
        <h2>Comment lire une trajectoire ?</h2>
        <div className="steps">
          <p>
            <b>01 · La proposition</b>
            <br />
            Le texte original, son auteur et sa date.
          </p>
          <p>
            <b>02 · Le travail parlementaire</b>
            <br />
            Les amendements et scrutins publics reliés au sujet.
          </p>
          <p>
            <b>03 · Le résultat</b>
            <br />
            Le sort du texte et la source institutionnelle.
          </p>
        </div>
      </section>
      <section>
        <h2>Dernières pièces publiées</h2>
        {unavailable ? (
          <p className="empty">Les éléments ne sont pas disponibles pour le moment.</p>
        ) : items.length ? (
          <>
            <div className="cards">
              {items.map((item) => (
                <EvidenceCard item={item} key={item.id} />
              ))}
            </div>
            <p className="more">
              <Link className="quiet" href="/pieces">
                Voir les {total} pièces publiées →
              </Link>
            </p>
          </>
        ) : (
          <p className="empty">
            Aucune pièce publiée pour l’instant : rien n’est publié automatiquement, chaque document est relu avant de
            rejoindre cette page. Les premières pièces vérifiées apparaîtront ici.
          </p>
        )}
      </section>
    </main>
  );
}
