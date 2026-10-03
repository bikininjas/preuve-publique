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
import { HeroAtmosphere, SubjectIcon } from '@/components/editorial-decoration';

export const dynamic = 'force-dynamic';
const featuredSubjects = [...VOTE_SUBJECT_GROUPS[0].subjects, ...VOTE_SUBJECT_GROUPS[1].subjects, ...VOTE_SUBJECT_GROUPS[2].subjects]
  .filter((subject) => ['sante', 'logement', 'retraites', 'budget', 'environnement', 'immigration'].includes(subject.id));

export default async function Home() {
  let votes: Awaited<ReturnType<typeof getEvidencePage>> | null = null;
  let failed = false;
  try { votes = await getEvidencePage({ kind: 'vote', limit: 3 }); }
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
  const recentPartySelection = Boolean(recentParties?.rows.length);
  const featuredParties = [...(recentPartySelection ? recentParties!.rows : partyDashboard?.parties ?? [])].sort((a, b) => ballotTotal(b) - ballotTotal(a) || a.party_name.localeCompare(b.party_name, 'fr'))
    .slice(0, 6).map((row) => partyDashboard?.parties.find((party) => party.party_id === row.party_id)).filter((row) => row !== undefined);

  return (
    <main className="home"><SeoPage path="/" />
      <section className="hero evidence-hero">
        <HeroAtmosphere />
        <div className="hero-copy">
          <div className="eyebrow">Assemblée nationale · Sénat</div>
          <h1>Les votes publics,<br /><em>sujet par sujet.</em></h1>
          <p className="lead">Explorez les scrutins, les positions et les documents officiels depuis 2017.</p>
          <form className="hero-search" action="/scrutins" method="get"><label className="sr-only" htmlFor="home-search">Chercher un sujet ou un scrutin</label><input id="home-search" type="search" name="q" placeholder="Retraites, logement, budget…" maxLength={120} /><button type="submit" aria-label="Rechercher les scrutins">↗</button></form>
          <div className="hero-shortcuts"><Link href="/scrutins">Tous les scrutins →</Link><Link href="/categories">Les votes par thème →</Link></div>
          <p className="hero-note">{votes ? <><b>{votes.total.toLocaleString('fr-FR')} scrutins publiés</b> · couverture du site</> : 'Des documents officiels, accessibles et datés.'}<br />Assemblée nationale et Sénat. Couverture européenne à venir.</p>
          <a className="hero-explore-cue" href="#sujets"><span aria-hidden="true">↓</span> Explorer les sujets</a>
        </div>
        <aside className="latest-vote" aria-label="Le scrutin publié le plus récent">
          <div className="latest-vote-kicker"><span>Dernier scrutin publié</span><span className="latest-vote-seal">Source officielle</span></div>
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

      <section className="topic-feature section-pad" id="sujets">
        <div className="section-heading"><h2><span className="section-index" aria-hidden="true">01</span>Explorer par sujet</h2><Link className="text-link" href="/scrutins">Tous les sujets →</Link></div>
        <div className="topic-grid">{featuredSubjects.map((subject) => <Link className="topic-tile" href={`/scrutins?subject=${subject.id}`} key={subject.id}><SubjectIcon subject={subject.id} /><strong>{subject.label}</strong><small>Voir les scrutins <b aria-hidden="true">↗</b></small></Link>)}</div>
        <p className="section-foot">Repérage par mots dans les titres officiels, sans couverture exhaustive. <Link href="/categories">Graphiques par thème →</Link></p>
      </section>

      <section className="section-pad" id="derniers-scrutins">
        <div className="section-heading"><div><div className="eyebrow">Explorer les décisions</div><h2><span className="section-index" aria-hidden="true">02</span>Les derniers scrutins publiés</h2></div><Link className="text-link" href="/scrutins">Tous les scrutins →</Link></div>
        {failed ? <p className="empty">Les scrutins sont indisponibles pour le moment.</p> : votes?.items.length ? <><div className="cards">{votes.items.map((item) => <EvidenceCard item={item} key={item.id} />)}</div><p className="section-foot">{votes.total.toLocaleString('fr-FR')} scrutins publiés dans la base. Ce nombre décrit la couverture du site, pas l’activité totale des assemblées.</p></> : <p className="empty">Aucun scrutin publié sur ce déploiement. Les fiches apparaîtront après vérification des sources.</p>}
      </section>

      <section className="section-pad home-party-profiles" id="partis">
        <div className="section-heading"><h2><span className="section-index" aria-hidden="true">03</span>Profils des partis</h2><Link className="text-link" href="/partis">Tous les partis →</Link></div>
        <div className="profile-reading-key"><div className="party-chart-legend"><span className="pour">Pour</span><span className="contre">Contre</span><span className="abstention">Abstention</span><span className="non-votant">Non-votant</span></div><p>« Pour » signifie pour le texte soumis au vote. Un sujet ne dit pas si la mesure renforce ou réduit une protection. Les pourcentages portent sur les positions des députés attribuables au parti, non-votants inclus.</p></div>
        {partyDashboard && featuredParties.length ? <><p className="resultline">{recentPartySelection ? <>Six partis au maximum, par volume de positions dans le dernier scrutin AN publié{recentParties?.date ? ` (${formatDate(recentParties.date)})` : ''}.</> : <>Six partis au maximum, par volume de positions dans le corpus publié, archives comprises. {recentParties ? 'Le dernier scrutin AN ne fournit pas de bulletins attribuables à un parti dans la base.' : 'La sélection du dernier scrutin AN est indisponible.'}</>} Les graphiques couvrent tout le corpus daté ci-dessous.</p><div className="party-profile-grid">{featuredParties.map((party) => <PartyProfileCard key={party.party_id} party={party} themes={partyThemes} scope={partyDashboard.scope} />)}</div></> : <p className="empty">Les profils de vote sont temporairement indisponibles. <Link href="/partis">Ouvrir le récapitulatif des partis →</Link></p>}
        <p className="section-foot"><Link href="/categories?institution=senat">Au Sénat : explorer les votes des groupes →</Link> · <Link href="/methode#profils-vote">Comment lire ces chiffres ?</Link></p>
      </section>

      <section className="editorial-feature section-pad">
        <div><div className="method-decoration" aria-hidden="true"><span>↗</span><i /><span>≡</span><i /><span>✓</span></div><h2>Sources et méthode</h2></div>
        <div><p>Chaque fiche conserve sa source et le périmètre du vote. Les rapprochements interprétatifs nécessitent une validation humaine.</p><div className="cta"><Link className="button light" href="/methode">Lire la méthode →</Link><Link className="text-link light-link" href="/observatoire">Explorer l’observatoire →</Link></div></div>
      </section>
    </main>
  );
}

export const metadata = pageMetadata('/');
