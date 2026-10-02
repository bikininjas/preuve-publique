import Link from 'next/link';
import { EvidenceCard } from '@/components/evidence-card';
import { VoteDistribution } from '@/components/vote-distribution';
import { getEvidencePage } from '@/lib/data';
import { formatDate, institutionLabel } from '@/lib/labels';
import { readerTitle, scrutinNumber, voteScope, voteTally } from '@/lib/reader';
import { VOTE_SUBJECT_GROUPS } from '@/lib/vote-subjects';

export const dynamic = 'force-dynamic';
const featuredSubjects = [...VOTE_SUBJECT_GROUPS[0].subjects, ...VOTE_SUBJECT_GROUPS[1].subjects, ...VOTE_SUBJECT_GROUPS[2].subjects]
  .filter((subject) => ['sante', 'logement', 'retraites', 'budget', 'environnement', 'immigration'].includes(subject.id));

export default async function Home() {
  let votes: Awaited<ReturnType<typeof getEvidencePage>> | null = null;
  let failed = false;
  try { votes = await getEvidencePage({ kind: 'vote', limit: 6 }); }
  catch { failed = true; }
  const latest = votes?.items[0];
  const latestTally = latest ? voteTally(latest) : null;

  return (
    <main className="home">
      <section className="hero evidence-hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> L’observatoire des décisions publiques</div>
          <h1>Le débat passe.<br /><em>Les votes restent.</em></h1>
          <p className="lead">Qui a voté pour ? Qui a voté contre ? Retrouvez les décisions officielles, thème par thème, avec les chiffres et les sources pour comprendre.</p>
          <form className="hero-search" action="/scrutins" method="get"><label className="sr-only" htmlFor="home-search">Chercher un sujet ou un scrutin</label><input id="home-search" type="search" name="q" placeholder="Retraites, logement, budget…" maxLength={120} /><button type="submit" aria-label="Rechercher les scrutins">↗</button></form>
          <div className="hero-shortcuts"><Link href="/scrutins">Tous les scrutins →</Link><Link href="/categories">Les votes par thème →</Link></div>
          <p className="hero-note">{votes ? <><b>{votes.total.toLocaleString('fr-FR')} scrutins publiés</b> · couverture du site</> : 'Des documents officiels, accessibles et datés.'}<br />Assemblée nationale et Sénat. Couverture européenne à venir.</p>
        </div>
        <aside className="latest-vote" aria-label="Le scrutin publié le plus récent">
          <div className="latest-vote-kicker"><span>À la une de la base</span><span className="latest-vote-seal">Source officielle ↗</span></div>
          {latest ? <><div className="latest-vote-meta"><span>{institutionLabel(latest.institution)}</span><time dateTime={latest.occurred_at}>{formatDate(latest.occurred_at)}</time></div>
            <h2><Link href={`/pieces/${latest.id}`}>{readerTitle(latest)}</Link></h2>
            <p className="latest-vote-scope">{scrutinNumber(latest) ? `Scrutin n° ${scrutinNumber(latest)} · ` : ''}{voteScope(latest) ?? 'Périmètre dans la source'}</p>
            {latestTally ? <VoteDistribution tally={latestTally} /> : <p className="hint">Décompte à consulter dans la source officielle.</p>}
            <Link className="latest-vote-link" href={`/pieces/${latest.id}`}>Qui a voté quoi ? <span aria-hidden="true">→</span></Link>
            <a className="latest-vote-source" href={latest.source_url} target="_blank" rel="noopener noreferrer">Consulter le scrutin original ↗</a>
          </> : <p>{failed ? 'Le dernier scrutin est temporairement indisponible.' : 'Les scrutins apparaîtront après vérification des sources.'}</p>}
        </aside>
      </section>

      <section className="home-strip" aria-label="Repères de lecture">
        <div><span className="strip-index">01</span><strong>Lire le scrutin</strong><small>Le texte exact et la date du vote.</small></div>
        <div><span className="strip-index">02</span><strong>Voir les positions</strong><small>Des groupes quand l’institution les publie.</small></div>
        <div><span className="strip-index">03</span><strong>Remonter aux sources</strong><small>Le document original, sans raccourci trompeur.</small></div>
      </section>

      <section className="section-pad" id="derniers-scrutins">
        <div className="section-heading"><div><div className="eyebrow">Explorer les décisions</div><h2>Les derniers scrutins publiés</h2></div><Link className="text-link" href="/scrutins">Tous les scrutins →</Link></div>
        {failed ? <p className="empty">Les scrutins sont indisponibles pour le moment.</p> : votes?.items.length ? <><div className="cards">{votes.items.map((item) => <EvidenceCard item={item} key={item.id} />)}</div><p className="section-foot">{votes.total.toLocaleString('fr-FR')} scrutins publiés dans la base. Ce nombre décrit la couverture du site, pas l’activité totale des assemblées.</p></> : <p className="empty">Aucun scrutin publié sur ce déploiement. Les fiches apparaîtront après vérification des sources.</p>}
      </section>

      <section className="topic-feature section-pad">
        <div className="section-heading"><div><div className="eyebrow">Par sujet</div><h2>Partir d’une question concrète.</h2></div><Link className="text-link" href="/scrutins">Tous les sujets →</Link></div>
        <div className="topic-grid">{featuredSubjects.map((subject, index) => <Link className="topic-tile" href={`/scrutins?subject=${subject.id}`} key={subject.id}><span>{String(index + 1).padStart(2, '0')} / REPÈRE DANS LE TITRE</span><strong>{subject.label}</strong><small>Explorer les scrutins portant ces mots dans l’intitulé <b>↗</b></small></Link>)}</div>
        <p className="section-foot">Ces repères cherchent des mots dans les intitulés officiels et ne couvrent pas tous les votes. <Link href="/categories">Voir les graphiques par thème →</Link></p>
      </section>

      <section className="editorial-feature section-pad">
        <div><div className="eyebrow">Ce que nous construisons</div><h2>La preuve avant la conclusion.</h2></div>
        <div><p>Comparer un programme, une déclaration et un vote exige de vérifier qu’ils parlent de la même mesure. Un vote sur un texte entier n’exprime pas une position sur chaque article. Les dossiers thématiques, indicateurs d’inégalités et affaires judiciaires seront publiés avec leurs sources et leur contexte, après relecture.</p><div className="cta"><Link className="button light" href="/methode">Lire notre méthode →</Link><Link className="text-link light-link" href="/observatoire">Voir les chantiers documentaires →</Link></div></div>
      </section>
    </main>
  );
}
