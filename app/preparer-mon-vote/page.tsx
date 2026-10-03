import Link from 'next/link';
import { DecisionGuide } from '@/components/decision-guide';
import { HeroAtmosphere } from '@/components/editorial-decoration';
import { PageStructuredData } from '@/components/structured-data';
import { pollOptions } from '@/lib/polls/data';
import { pageMetadata, SEO_PAGES } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const metadata = pageMetadata('/preparer-mon-vote');

export default async function PrepareVotePage() {
  const options = await pollOptions().catch(() => null);
  const people = options ? [...options.candidates].sort((a, b) => a.name.localeCompare(b.name, 'fr')) : null;
  return <main className="decision-page">
    <PageStructuredData path="/preparer-mon-vote" document={SEO_PAGES['/preparer-mon-vote']} />
    <section className="decision-hero">
      <HeroAtmosphere />
      <div><div className="eyebrow">Un point de départ pour votre choix</div>
        <h1>Pour qui voter ?<br /><em>Commencez par vos questions.</em></h1>
        <p>Choisissez vos sujets, examinez les mêmes pièces et gardez une trace de ce qui vous convainc — ou reste à vérifier.</p>
      </div>
      <div className="decision-hero-principle"><span aria-hidden="true">↗</span><p>Votre choix vous appartient.<br />Preuve Publique vous aide à retrouver les faits et leurs sources.</p></div>
    </section>

    <DecisionGuide people={people} />

    <section className="decision-checks" aria-labelledby="decision-checks-title">
      <div className="section-heading"><div><div className="eyebrow">Avant de vous faire une idée</div><h2 id="decision-checks-title">Trois réflexes pour lire les pièces</h2></div></div>
      <div className="decision-check-grid">
        <article><span className="eyebrow">Le dispositif</span><h3>« Pour » quoi, exactement ?</h3><p>Un vote porte sur un texte entier, un article, un amendement ou une motion. Lisez le dispositif : « pour » ne signifie pas automatiquement « favorable au sujet ».</p><Link href="/methode#profils-vote">Comprendre les votes →</Link></article>
        <article><span className="eyebrow">La bonne période</span><h3>Une promesse, à quelle date ?</h3><p>Vérifiez l’élection, l’édition et la date du programme. Une proposition publiée après un scrutin reste une position ultérieure. Un programme ancien ne représente pas celui de 2027.</p><Link href="/observatoire#parole-vote">Consulter les programmes disponibles →</Link></article>
        <article><span className="eyebrow">Les inconnues</span><h3>Que manque-t-il pour conclure ?</h3><p>Un bulletin manquant n’est pas une abstention. Un sondage n’est pas une proposition. Un indicateur ne prouve pas, à lui seul, l’effet d’un vote.</p><Link href="/observatoire#inegalites">Explorer les indicateurs et leurs limites →</Link></article>
      </div>
    </section>

    <section className="decision-counterpoint"><div><span className="eyebrow">Le test du contre-exemple</span><h2>Quel document pourrait<br />vous faire changer d’avis ?</h2></div><p>Pour chaque sujet, notez une pièce qui vous convainc, une question encore ouverte et ce qui pourrait contredire votre première impression. Gardez la même exigence de preuve pour chaque personne.</p></section>
    <noscript><p className="empty">Le carnet interactif demande JavaScript. Vous pouvez aussi explorer <Link href="/categories">les thèmes</Link> ou <Link href="/presidentielle-2027/comparer">comparer les pièces</Link> directement.</p></noscript>
  </main>;
}
