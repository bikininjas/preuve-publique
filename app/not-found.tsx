import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="narrow">
      <div className="eyebrow">Page introuvable</div>
      <h1>Cette page n’existe pas.</h1>
      <p className="lead">
        Le lien est peut-être ancien, ou la pièce demandée n’est pas publiée : une pièce n’apparaît publiquement
        qu’après relecture.
      </p>
      <p>
        <Link className="button" href="/pieces">
          Voir les pièces publiées
        </Link>
      </p>
    </main>
  );
}
