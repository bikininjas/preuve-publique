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
    <p className="hint">Les intentions de vote ne prédisent pas le résultat de l’élection. Les programmes officiels de 2027 seront documentés lorsqu’ils seront disponibles.</p>
  </main>;
}
