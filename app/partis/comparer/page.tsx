import Link from 'next/link';
import { SeoPage } from '@/components/seo-page';
import { Empty, Pager } from '@/components/ui';
import { VoteReading } from '@/components/vote-reading';
import { VoteSample } from '@/components/vote-sample';
import { getEvidencePage, getPartyVotesForScrutin, type PartyVoteRow } from '@/lib/data';
import { getAllPartyVotes } from '@/lib/vote-theme-data';
import { first, pageParam, type SearchParamsRecord } from '@/lib/params';
import { findVoteSubject, voteSubjectFilter, VOTE_SUBJECT_GROUPS } from '@/lib/vote-subjects';
import { formatDate } from '@/lib/labels';
import { readerTitle } from '@/lib/reader';
import { pageMetadata, SEO_PAGES } from '@/lib/seo';
import { ballotTotal } from '@/lib/vote-profile';

export const dynamic = 'force-dynamic';
const PAGE_SIZE = 8;

function Positions({ party, rows }: { party: PartyVoteRow; rows: PartyVoteRow[] | null }) {
  const row = rows?.find((entry) => entry.party_id === party.party_id);
  return <section className="party-comparison-position" aria-label={party.party_name}>
    <h3><Link href={`/partis/${party.party_id}`}>{party.party_name}</Link></h3>
    {row ? <><p className="comparison-denominator">{ballotTotal(row).toLocaleString('fr-FR')} position{ballotTotal(row) > 1 ? 's' : ''} attribuable{ballotTotal(row) > 1 ? 's' : ''} dans ce scrutin, non-votants inclus.</p><dl>{([
      ['Pour', row.pour], ['Contre', row.contre], ['Abstentions', row.abstention], ['Non-votants enregistrés', row.non_votant],
    ] as const).map(([label, count]) => <div key={label}><dt>{label}</dt><dd>{count.toLocaleString('fr-FR')}</dd></div>)}</dl></>
      : <p className="hint">{rows === null ? 'Décompte temporairement indisponible.' : 'Aucun bulletin attribuable à ce parti dans ce scrutin. Cela ne signifie ni abstention, ni absence, ni opposition.'}</p>}
  </section>;
}

export default async function ComparePartiesPage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const params = await searchParams;
  const dashboard = await getAllPartyVotes().catch(() => null);
  const parties = [...(dashboard?.parties ?? [])].sort((a, b) => a.party_name.localeCompare(b.party_name, 'fr'));
  const left = parties.find((party) => party.party_id === first(params.left));
  const right = parties.find((party) => party.party_id === first(params.right));
  const subject = findVoteSubject(first(params.subject));
  const page = pageParam(params.page);
  const ready = left && right && left.party_id !== right.party_id;
  const result = ready ? await getEvidencePage({ kind: 'vote', institution: 'assemblee',
    titleFilter: subject ? voteSubjectFilter(subject) : undefined, offset: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE,
  }).catch(() => null) : null;
  // Eight votes per page; two batches bound concurrent public reads to four.
  const positions = new Map<string, PartyVoteRow[] | null>();
  for (let offset = 0; offset < (result?.items.length ?? 0); offset += 4) {
    await Promise.all(result!.items.slice(offset, offset + 4).map(async (vote) => {
      positions.set(vote.id, await getPartyVotesForScrutin(vote.id).catch(() => null));
    }));
  }
  const hrefFor = (target: number) => {
    const query = new URLSearchParams({ left: left?.party_id ?? '', right: right?.party_id ?? '', page: String(target) });
    if (subject) query.set('subject', subject.id);
    return `/partis/comparer?${query}#votes-communs`;
  };
  const notebook = new URLSearchParams();
  if (ready) { notebook.set('left', left.party_id); notebook.set('right', right.party_id); }
  if (subject) notebook.set('subject', subject.id);
  return <main className="party-comparison-page"><SeoPage path="/partis/comparer" />
    <p className="breadcrumb"><Link href="/partis">← Tous les partis</Link></p>
    <div className="page-intro"><div className="eyebrow">Assemblée nationale · Les mêmes textes</div><h1>Deux partis, vote par vote.</h1><p className="lead">Comparez leurs bulletins sur un même sujet, sans passer d’une fiche à l’autre.</p></div>
    <form action="/partis/comparer" className="party-comparison-filters" method="get">
      <label>Premier parti<select name="left" defaultValue={left?.party_id ?? ''} required><option value="">Choisir un parti</option>{parties.map((party) => <option value={party.party_id} key={party.party_id}>{party.party_name}</option>)}</select></label>
      <label>Second parti<select name="right" defaultValue={right?.party_id ?? ''} required><option value="">Choisir un autre parti</option>{parties.map((party) => <option value={party.party_id} key={party.party_id}>{party.party_name}</option>)}</select></label>
      <label>Sujet<select name="subject" defaultValue={subject?.id ?? ''}><option value="">Tous les sujets</option>{VOTE_SUBJECT_GROUPS.map((group) => <optgroup label={group.label} key={group.id}>{group.subjects.map((entry) => <option key={entry.id} value={entry.id}>{entry.label}</option>)}</optgroup>)}</select></label>
      <button type="submit" className="button" disabled={!dashboard}>Comparer</button>
    </form>
    <p className="hint">Partis par ordre alphabétique, noms historiques conservés. Un groupe parlementaire et un parti sont distincts. Les bulletins sont attribués uniquement à partir d’une affiliation datée et sourcée.</p>
    {!dashboard ? <Empty>La liste des partis est temporairement indisponible.</Empty>
      : left && right && !ready ? <Empty>Choisissez deux partis différents.</Empty>
      : !ready ? <Empty>Choisissez deux partis et, si vous le souhaitez, un sujet. Leurs décomptes apparaîtront côte à côte pour chaque texte.</Empty>
      : !result ? <Empty>Les scrutins sont temporairement indisponibles.</Empty>
      : <section id="votes-communs" aria-label="Comparaison sur les mêmes scrutins">
        <p className="resultline">{result.total.toLocaleString('fr-FR')} scrutin{result.total > 1 ? 's' : ''} publié{result.total > 1 ? 's' : ''} à l’Assemblée{subject ? ` · ${subject.label}` : ''} · plus récents d’abord.</p>
        <VoteSample scrutins={result.total} />
        <p className="hint">Le même ensemble de scrutins est présenté pour les deux partis, y compris ceux sans bulletins attribuables. Chaque ligne décrit un texte précis ; elle ne mesure pas l’adhésion à tout un thème. Les motifs d’un vote contre peuvent différer.</p>
        {result.items.length ? result.items.map((vote) => <article className="party-comparison-vote" key={vote.id}>
          <header><time dateTime={vote.occurred_at}>{formatDate(vote.occurred_at)}</time><h2><Link href={`/pieces/${vote.id}`}>{readerTitle(vote)}</Link></h2><VoteReading evidence={vote} compact /><a href={vote.source_url} target="_blank" rel="noopener noreferrer">Source officielle ↗</a></header>
          <div className="party-comparison-pair"><Positions party={left!} rows={positions.get(vote.id) ?? null} /><Positions party={right!} rows={positions.get(vote.id) ?? null} /></div>
        </article>) : <Empty>{result.total ? <>Cette page dépasse les résultats. <Link href={hrefFor(1)}>Revenir à la première page →</Link></> : 'Aucun scrutin publié ne correspond à ce sujet. Cette absence ne renseigne pas la position des partis.'}</Empty>}
        <Pager page={page} pageCount={Math.max(1, Math.ceil(result.total / PAGE_SIZE))} hrefFor={hrefFor} />
      </section>}
    <p className="section-foot"><Link href={`/preparer-mon-vote${notebook.size ? `?${notebook}` : ''}`} target="_blank" rel="noopener noreferrer">Garder cette comparaison dans mon carnet →</Link> · <Link href="/methode#profils-vote">Sources et limites des affiliations →</Link></p>
  </main>;
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  return pageMetadata('/partis/comparer', SEO_PAGES['/partis/comparer'], await searchParams);
}
