import { SeoPage } from '@/components/seo-page';
import { pageMetadata, SEO_PAGES } from '@/lib/seo';
import Link from 'next/link';
import { EvidenceCard } from '@/components/evidence-card';
import { VoteDistribution } from '@/components/vote-distribution';
import { PartyProfileCard, PROFILE_SUBJECTS } from '@/components/party-profile-card';
import { VoteTopics } from '@/components/vote-topics';
import { getEvidencePage, getPartyVotesForScrutin } from '@/lib/data';
import { getAllPartyVotes, getPartyThemes } from '@/lib/vote-theme-data';
import { ballotTotal } from '@/lib/vote-profile';
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
  const [partyDashboard, partyThemes, recentParties] = await Promise.all([
    getAllPartyVotes().catch(() => null),
    getPartyThemes([...VOTE_SUBJECT_GROUPS.map((category) => category.id), ...PROFILE_SUBJECTS]),
    getEvidencePage({ kind: 'vote', institution: 'assemblee', limit: 1 }).then(async (result) => ({
      date: result.items[0]?.occurred_at,
      rows: result.items[0] ? await getPartyVotesForScrutin(result.items[0].id) : [],
    })).catch(() => null),
  ]);
  const featuredParties = [...(recentParties?.rows ?? [])].sort((a, b) => ballotTotal(b) - ballotTotal(a) || a.party_name.localeCompare(b.party_name, 'fr'))
    .slice(0, 6).map((row) => partyDashboard?.parties.find((party) => party.party_id === row.party_id)).filter((row) => row !== undefined);

  return (
    <main className="home"><SeoPage path="/" />
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
            <VoteTopics title={latest.title} institution={latest.institution} />
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

      <section className="section-pad home-party-profiles" id="partis">
        <div className="section-heading"><div><div className="eyebrow">Les choix dans les urnes parlementaires</div><h2>Un parti. Plusieurs sujets.</h2></div><Link className="text-link" href="/partis">Tous les profils de vote →</Link></div>
        <p className="lead">Entreprises, solidarité, immigration, police : voyez les répartitions des votes, puis retrouvez la mesure exacte derrière chaque chiffre.</p>
        <div className="profile-reading-key"><div className="party-chart-legend"><span className="pour">Pour</span><span className="contre">Contre</span><span className="abstention">Abstention</span><span className="non-votant">Non-votant</span></div><p>« Pour » signifie pour le texte soumis au vote. Un sujet ne dit pas si la mesure renforce ou réduit une protection. Les pourcentages portent sur les positions des députés attribuables au parti, non-votants inclus.</p></div>
        {partyDashboard && featuredParties.length ? <><p className="resultline">Six partis affichés au maximum, par volume de positions dans le dernier scrutin AN publié{recentParties?.date ? ` (${formatDate(recentParties.date)})` : ''}. Les graphiques couvrent tout le corpus daté ci-dessous.</p><div className="party-profile-grid">{featuredParties.map((party) => <PartyProfileCard key={party.party_id} party={party} themes={partyThemes} scope={partyDashboard.scope} />)}</div></> : <p className="empty">Les profils de vote sont temporairement indisponibles. <Link href="/partis">Ouvrir le récapitulatif des partis →</Link></p>}
        <p className="section-foot"><Link href="/categories?institution=senat">Au Sénat : explorer les votes des groupes →</Link> · <Link href="/methode#profils-vote">Comment lire ces chiffres ?</Link></p>
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

export const metadata = pageMetadata('/');
