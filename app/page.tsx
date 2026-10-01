import Link from 'next/link';
import { EvidenceCard } from '@/components/evidence-card';
import { getEvidencePage } from '@/lib/data';
import { VOTE_SUBJECT_GROUPS } from '@/lib/vote-subjects';

export const dynamic = 'force-dynamic';
const featuredSubjects = [...VOTE_SUBJECT_GROUPS[0].subjects, ...VOTE_SUBJECT_GROUPS[1].subjects, ...VOTE_SUBJECT_GROUPS[2].subjects]
  .filter((subject) => ['sante', 'logement', 'retraites', 'budget', 'environnement', 'immigration'].includes(subject.id));

export default async function Home() {
  let votes: Awaited<ReturnType<typeof getEvidencePage>> | null = null;
  let failed = false;
  try { votes = await getEvidencePage({ kind: 'vote', limit: 6 }); }
  catch { failed = true; }

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> L’observatoire des décisions publiques</div>
          <h1>Ce qu’ils disent.<br /><em>Ce qu’ils votent.</em></h1>
          <p className="lead">Explorez les scrutins officiels, les positions publiées et les pièces qui les éclairent. Chaque fait mène à sa source. Chaque comparaison doit pouvoir être vérifiée.</p>
          <div className="cta"><Link className="button" href="/scrutins">Explorer les scrutins <span aria-hidden>↗</span></Link><Link className="button secondary" href="/scrutins#subjects-heading">Choisir un sujet</Link></div>
          <p className="hero-note">Assemblée nationale · Sénat · Parlement européen<br />Couverture variable selon les sources effectivement publiées.</p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-grid" />
          <div className="art-card art-card-one"><span>01 / LA PAROLE</span><strong>Une position annoncée</strong><i>Programme · déclaration</i></div>
          <div className="art-connector" />
          <div className="art-card art-card-two"><span>02 / LE SCRUTIN</span><strong>Un vote documenté</strong><i>Date · texte · position</i></div>
          <div className="art-stamp">SOURCES<br />VÉRIFIABLES</div>
        </div>
      </section>

      <section className="home-strip" aria-label="Repères de lecture">
        <div><span className="strip-index">01</span><strong>Lire le scrutin</strong><small>Le texte exact et la date du vote.</small></div>
        <div><span className="strip-index">02</span><strong>Voir les positions</strong><small>Des groupes quand l’institution les publie.</small></div>
        <div><span className="strip-index">03</span><strong>Remonter aux sources</strong><small>Le document original, sans raccourci trompeur.</small></div>
      </section>

      <section className="section-pad">
        <div className="section-heading"><div><div className="eyebrow">Explorer les décisions</div><h2>Les derniers scrutins publiés</h2></div><Link className="text-link" href="/scrutins">Tous les scrutins →</Link></div>
        {failed ? <p className="empty">Les scrutins sont indisponibles pour le moment.</p> : votes?.items.length ? <><div className="cards">{votes.items.map((item) => <EvidenceCard item={item} key={item.id} />)}</div><p className="section-foot">{votes.total.toLocaleString('fr-FR')} scrutins publiés dans la base. Ce nombre décrit la couverture du site, pas l’activité totale des assemblées.</p></> : <p className="empty">Aucun scrutin publié sur ce déploiement. Les fiches apparaîtront après vérification des sources.</p>}
      </section>

      <section className="topic-feature section-pad">
        <div className="section-heading"><div><div className="eyebrow">Par sujet</div><h2>Partir d’une question concrète.</h2></div><Link className="text-link" href="/scrutins">Tous les sujets →</Link></div>
        <div className="topic-grid">{featuredSubjects.map((subject, index) => <Link className="topic-tile" href={`/scrutins?subject=${subject.id}`} key={subject.id}><span>{String(index + 1).padStart(2, '0')} / REPÈRE DANS LE TITRE</span><strong>{subject.label}</strong><small>Explorer les scrutins portant ces mots dans l’intitulé <b>↗</b></small></Link>)}</div>
        <p className="section-foot">Ces repères ne couvrent pas tous les votes. <Link href="/categories">Voir les rubriques publiées par les sources →</Link></p>
      </section>

      <section className="editorial-feature section-pad">
        <div><div className="eyebrow">Ce que nous construisons</div><h2>La preuve avant la conclusion.</h2></div>
        <div><p>Comparer un programme, une déclaration et un vote exige de vérifier qu’ils parlent de la même mesure. Un vote sur un texte entier n’exprime pas une position sur chaque article. Les dossiers thématiques, indicateurs d’inégalités et affaires judiciaires seront publiés avec leurs sources et leur contexte, après relecture.</p><div className="cta"><Link className="button light" href="/methode">Lire notre méthode →</Link><Link className="text-link light-link" href="/observatoire">Voir les chantiers documentaires →</Link></div></div>
      </section>
    </main>
  );
}
