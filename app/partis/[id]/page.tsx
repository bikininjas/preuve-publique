import { SeoPage } from '@/components/seo-page';
import { documentMetadata } from '@/lib/seo-content';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PartyBar } from '@/components/party-vote-chart';
import { VoteTopics } from '@/components/vote-topics';
import { Empty, Pager } from '@/components/ui';
import { getPartyVoteDetails } from '@/lib/data';
import { getAllPartyVotes, getPartyThemes } from '@/lib/vote-theme-data';
import { formatDate } from '@/lib/labels';
import { isUuid, pageParam, type SearchParamsRecord } from '@/lib/params';
import { readerTitle } from '@/lib/reader';
import { ballotTotal, formatBallotShare } from '@/lib/vote-profile';
import { VOTE_SUBJECT_GROUPS } from '@/lib/vote-subjects';

export const dynamic = 'force-dynamic';

export default async function PartyPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<SearchParamsRecord> }) {
  const { id } = await params;
  if (!isUuid(id)) notFound();
  const page = pageParam((await searchParams).page);
  const [dashboard, themes, votes] = await Promise.all([
    getAllPartyVotes().catch(() => null), getPartyThemes(), getPartyVoteDetails(id, [], page).catch(() => null),
  ]);
  if (!dashboard) return <main><SeoPage path={`/partis/${id}`} /><Empty>Le profil de vote est temporairement indisponible.</Empty></main>;
  const party = dashboard.parties.find((row) => row.party_id === id);
  if (!party) notFound();
  return <main className="party-profile-page"><SeoPage path={`/partis/${id}`} />
    <Link className="text-link" href="/partis">← Tous les partis</Link>
    <div className="page-intro reading-intro"><div className="eyebrow">Affiliations datées · Assemblée nationale</div><h1>{party.party_name}</h1><p className="lead">Répartition des bulletins attribuables à ce parti dans le corpus publié.</p></div>
    <div className="profile-reading-key"><div className="party-chart-legend"><span className="pour">Pour</span><span className="contre">Contre</span><span className="abstention">Abstention</span><span className="non-votant">Non-votant</span></div><p>{party.scrutins.toLocaleString('fr-FR')} scrutins attribuables · {ballotTotal(party).toLocaleString('fr-FR')} positions. Corpus publié : {formatDate(dashboard.scope.first_date)} – {formatDate(dashboard.scope.last_date)}. Les périodes ci-dessous décrivent les scrutins trouvés pour tous les partis, pas la durée d’existence de ce parti.</p><p>Une barre décrit les bulletins sur des textes identifiés par leurs titres. Elle ne mesure ni un soutien global à un thème, ni une orientation idéologique. Les sous-thèmes se recoupent : leurs chiffres ne s’additionnent pas.</p><Link href="/methode#profils-vote">Lire la méthode →</Link></div>
    <nav className="pills" aria-label="Aller à un thème du profil">{VOTE_SUBJECT_GROUPS.map((category) => <a href={`#profil-${category.id}`} key={category.id}>{category.label} ↓</a>)}<a href="#derniers-votes">Derniers votes ↓</a></nav>
    {VOTE_SUBJECT_GROUPS.map((category) => <section className="profile-category" id={`profil-${category.id}`} key={category.id}>
      <div className="section-heading"><div><div className="eyebrow">Thème et sous-thèmes</div><h2>{category.label}</h2></div><Link className="text-link" href={`/scrutins?institution=assemblee&category=${category.id}&party=${id}#party-details`}>Les scrutins de ce thème →</Link></div>
      <div className="profile-subtheme-grid">{[{ id: category.id, label: `Ensemble · ${category.label}` }, ...category.subjects].map((subject) => {
        const entry = themes.get(subject.id);
        const row = entry?.parties.find((item) => item.party_id === id);
        const href = `/scrutins?institution=assemblee&${subject.id === category.id ? 'category' : 'subject'}=${subject.id}&party=${id}#party-details`;
        return <article className={subject.id === category.id ? 'profile-subtheme category-total' : 'profile-subtheme'} key={subject.id}>
          <h3><Link href={href}>{subject.label} ↗</Link></h3>
          {row && ballotTotal(row) ? <><strong className="profile-share">{formatBallotShare(row)}</strong><PartyBar row={row} /><p className="profile-vote-counts">{row.pour.toLocaleString('fr-FR')} pour · {row.contre.toLocaleString('fr-FR')} contre · {row.abstention.toLocaleString('fr-FR')} abst. · {row.non_votant.toLocaleString('fr-FR')} non-votants</p><small>{row.scrutins.toLocaleString('fr-FR')} scrutins · {ballotTotal(row).toLocaleString('fr-FR')} positions</small></> : <p>{entry ? 'Aucun bulletin attribuable dans les scrutins trouvés.' : 'Données temporairement indisponibles.'}</p>}
          {entry?.scope.first_date && entry.scope.last_date ? <small>Corpus du sujet : {formatDate(entry.scope.first_date)} – {formatDate(entry.scope.last_date)} · {entry.scope.documented_scrutins} / {entry.scope.total_scrutins} scrutins vérifiés</small> : null}
          <details className="profile-keywords"><summary>Mots recherchés dans le titre</summary><p>{subject.id === category.id ? [...new Set(category.subjects.flatMap((item) => [...item.keywords]))].join(' · ') : category.subjects.find((item) => item.id === subject.id)?.keywords.join(' · ')}</p></details>
          <Link className="text-link" href={href}>Ouvrir les votes exacts →</Link>
        </article>;
      })}</div>
    </section>)}
    <section id="derniers-votes"><div className="section-heading"><div><div className="eyebrow">Derrière les chiffres</div><h2>Les derniers votes documentés</h2></div></div>
      {votes?.length ? <><div className="vote-list">{votes.map((vote) => <article className="vote-row" key={vote.vote_id}><div><span className="count">Assemblée nationale · {formatDate(vote.occurred_at)}</span><h3><Link href={`/pieces/${vote.vote_id}`}>{readerTitle({ kind: 'vote', title: vote.title })}</Link></h3><VoteTopics title={vote.title} institution="assemblee" /><a href={vote.source_url} target="_blank" rel="noopener noreferrer">Scrutin officiel ↗</a></div><div className="position-cell"><strong>{vote.pour} pour · {vote.contre} contre</strong><small>{vote.abstention} abstentions · {vote.non_votant} non-votants</small></div></article>)}</div><Pager page={page} pageCount={Math.max(1, Math.ceil(votes[0].total_count / 15))} hrefFor={(target) => `/partis/${id}?page=${target}#derniers-votes`} /></> : <Empty>{votes ? 'Aucun scrutin sur cette page.' : 'La liste des scrutins est temporairement indisponible.'}</Empty>}
    </section>
    <section className="panel"><h2>Programme ↔ vote</h2><p>Aucun rapprochement validé avec un programme officiel récent n’est publié dans ces profils. Qualifier une mesure de « libérale », « sociale », restrictive sur l’immigration ou renforçant les pouvoirs de police demande de lire le texte exact et de faire valider cette qualification. Un mot dans un titre ne suffit pas.</p></section>
  </main>;
}

export async function generateMetadata({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<SearchParamsRecord>}) {
  const {id} = await params;
  return documentMetadata(`/partis/${id}`,await searchParams);
}
