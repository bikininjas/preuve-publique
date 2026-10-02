import Link from 'next/link';

export const metadata = { title: 'Présidentielle 2027' };
export default function PresidentialPage() {
  return <main className="reading-page">
    <div className="eyebrow">France · Élection présidentielle</div><h1>Présidentielle 2027</h1>
    <p className="lead">Des repères datés pour suivre la campagne et retrouver les sources.</p>
    <section className="panel"><span className="eyebrow">Intentions de vote</span><h2>Sondages</h2>
      <p>Consulter les mesures des instituts, leurs dates de terrain et les hypothèses de candidatures. Chaque résultat renvoie à sa source originale.</p>
      <Link className="button" href="/presidentielle-2027/sondages">Explorer les sondages →</Link>
    </section>
    <section className="panel"><span className="eyebrow">Propositions et décisions</span><h2>Des candidats aux pièces</h2><p>Consulter les identités recoupées, les rattachements datés et les bulletins nominatifs. Explorer les mêmes sous-thèmes pour plusieurs personnes, avec les sources et les données manquantes.</p><Link className="button" href="/presidentielle-2027/candidats">Voir les fiches →</Link> <Link className="text-link" href="/presidentielle-2027/comparer">Comparer les pièces →</Link></section>
    <p className="hint">Les intentions de vote ne prédisent pas le résultat de l’élection. Les programmes officiels de 2027 seront documentés lorsqu’ils seront disponibles.</p>
  </main>;
}
