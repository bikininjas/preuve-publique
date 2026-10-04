import Link from 'next/link';
import { DecisionGuide } from '@/components/decision-guide';
import { HeroAtmosphere } from '@/components/editorial-decoration';
import { PageStructuredData } from '@/components/structured-data';
import { pollOptions } from '@/lib/polls/data';
import { pageMetadata, SEO_PAGES } from '@/lib/seo';
import { first, isUuid, type SearchParamsRecord } from '@/lib/params';
import { getAllPartyVotes } from '@/lib/vote-theme-data';
import { decisionParties } from '@/lib/decision-guide';

export const dynamic = 'force-dynamic';

export default async function PrepareVotePage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const params = await searchParams;
  const ids = [first(params.left), first(params.right)];
  const [options, dashboard] = await Promise.all([
    pollOptions().catch(() => null),
    ids.every(isUuid) ? getAllPartyVotes().catch(() => null) : Promise.resolve(null),
  ]);
  const parties = decisionParties(ids, dashboard?.parties.map(party => ({ id: party.party_id, name: party.party_name })) ?? []);
  const subjects = Array.isArray(params.subject) ? params.subject : params.subject ? [params.subject] : [];
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

    <aside className="notebook-preview" aria-label="Exemple de carnet à compléter"><div><span className="eyebrow">Aperçu de votre mémo</span><h2>Un sujet, des pièces, vos questions.</h2><p>Choisissez jusqu’à trois thèmes. Retrouvez les votes, comparez deux partis ou des personnes, puis téléchargez vos notes.</p></div><blockquote><strong>Mon sujet : logement et loyers</strong><p>Quelle mesure précise a été adoptée ?<br />Ma pièce : un lien vers le scrutin.<br />Ma question ouverte : ce qui reste à vérifier.</p><small>Exemple de questions, à remplacer par les vôtres.</small></blockquote></aside>
    {ids.some(Boolean) && !parties.length ? <p className="empty">La sélection de partis n’a pas pu être retrouvée dans le corpus disponible. Votre parcours par sujet reste utilisable.</p> : null}
    <DecisionGuide people={people} initialSubjects={subjects} parties={parties} />

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

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  return pageMetadata('/preparer-mon-vote', SEO_PAGES['/preparer-mon-vote'], await searchParams);
}
