import { SeoPage } from '@/components/seo-page';
import type { SearchParamsRecord } from '@/lib/params';
import { pageMetadata, SEO_PAGES } from '@/lib/seo';
import Link from 'next/link';
import { PollExplorer } from '@/components/polls/explorer';


export default function PollsPage() {
  return <main className="polls-page"><SeoPage path="/presidentielle-2027/sondages" />
    <p className="breadcrumb"><Link href="/presidentielle-2027">Présidentielle 2027</Link> / Sondages</p>
    <header className="presidential-hero polls-hero">
      <div><div className="eyebrow">Présidentielle 2027</div>
        <h1>Sondages</h1>
        <p className="lead">Intentions de vote par institut, date de terrain et hypothèse de candidatures.</p>
      </div>
      <div className="presidential-hero-note"><span className="hero-edition" aria-hidden="true">2027</span></div>
    </header>
    <nav className="presidential-tabs" aria-label="Présidentielle 2027"><Link href="/presidentielle-2027/sondages" aria-current="page">Sondages</Link><Link href="/presidentielle-2027/candidats">Personnes testées</Link><Link href="/presidentielle-2027/comparer">Comparer les pièces</Link><a href="#sources-sondages">Méthode & sources ↗</a></nav>
    <details className="presidential-reading"><summary>Bien lire un sondage <span>Un point = une mesure, jamais une prévision</span></summary>
      <p>Un point représente le résultat d’un candidat dans une configuration testée par un institut. La date est la fin du terrain. Les listes de candidats, les instituts et les méthodes peuvent changer : ces mesures ne constituent ni une moyenne ni une prévision.</p>
      <p>Les numéros de configuration sont locaux à chaque sondage. Le filtre rapproche uniquement les listes exactes de candidats ; il ne garantit pas des méthodes ou des formulations identiques. L’échantillon total et la base de la configuration sont distingués lorsqu’ils sont disponibles.</p>
    </details>
    <PollExplorer />
    <section id="sources-sondages" className="panel poll-method"><h2>Provenance et limites</h2>
      <p>Données : <a href="https://sondax.fr/" target="_blank" rel="noopener noreferrer">Sondax, d’après Wikipédia ↗</a>. Les valeurs sont reprises du <a href="https://sondax.fr/donnees.html" target="_blank" rel="noopener noreferrer">CSV documenté par Sondax</a>, avec la notice de la Commission des sondages ou la publication de l’institut. Ce sont des mesures rapportées par Sondax ; Preuve Publique n’effectue aucune moyenne et n’a pas revérifié chaque notice.</p>
      <p>Les données Sondax commencent au 26 février 2026. Les mois antérieurs ne sont pas couverts par ce fournisseur. Les résultats ne documentent ni les votes effectifs, ni les positions ou les programmes des candidats.</p>
      <p>Licence des données et de leur adaptation : <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>. Les réutilisations doivent conserver l’attribution et la même licence. L’API expose les URLs originales, les révisions Wikipédia et les empreintes du fichier importé.</p>
    </section>
  </main>;
}

export async function generateMetadata({searchParams}:{searchParams:Promise<SearchParamsRecord>}) {
  return pageMetadata('/presidentielle-2027/sondages',SEO_PAGES['/presidentielle-2027/sondages'],await searchParams);
}
