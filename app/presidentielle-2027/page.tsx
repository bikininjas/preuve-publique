import { SeoPage } from '@/components/seo-page';
import { pageMetadata, SEO_PAGES } from '@/lib/seo';
import Link from 'next/link';

export default function PresidentialPage() {
  return <main className="reading-page presidential-overview"><SeoPage path="/presidentielle-2027" />
    <div className="eyebrow">France · Élection présidentielle</div><h1>Présidentielle 2027</h1>
    <p className="lead">Sondages, personnes testées et comparaison des pièces documentées.</p>
    <div className="presidential-entry-grid">
    <section className="panel"><span className="eyebrow">Intentions de vote</span><h2>Sondages</h2>
      <p>Intentions de vote, dates de terrain et hypothèses testées par les instituts.</p>
      <Link className="button" href="/presidentielle-2027/sondages">Explorer les sondages →</Link>
    </section>
    <section className="panel"><span className="eyebrow">Identités et décisions</span><h2>Personnes testées</h2><p>Rattachements datés et bulletins nominatifs, avec les sources et les données manquantes.</p><Link className="button" href="/presidentielle-2027/candidats">Voir les fiches →</Link></section>
    <section className="panel"><span className="eyebrow">Scrutins communs</span><h2>Comparer les pièces</h2><p>Jusqu’à trois personnes sur le même sous-thème, sans score ni classement.</p><Link className="button" href="/presidentielle-2027/comparer">Ouvrir la comparaison →</Link></section>
    </div>
    <p className="hint">Les intentions de vote ne prédisent pas le résultat de l’élection. Les programmes officiels de 2027 seront documentés lorsqu’ils seront disponibles.</p>
  </main>;
}

export const metadata = pageMetadata('/presidentielle-2027');
