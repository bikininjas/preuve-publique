import { SeoPage } from '@/components/seo-page';
import { publicActor as getActor, documentMetadata } from '@/lib/seo-content';
import { VoteTopics } from '@/components/vote-topics';
import Link from 'next/link';
import { PoliticalBadge, PoliticalClassificationDetails } from '@/components/political-classification';
import { notFound } from 'next/navigation';
import { Empty, Pager } from '@/components/ui';
import { getGroupActorScope, getGroupActorVotes } from '@/lib/data';
import { formatDate, positionLabel } from '@/lib/labels';
import { isUuid, pageParam, type SearchParamsRecord } from '@/lib/params';
import { readerTitle, scrutinNumber, voteScope } from '@/lib/reader';

export const dynamic = 'force-dynamic';
const PAGE_SIZE = 16;

export default async function GroupePage({ params, searchParams }: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParamsRecord>;
}) {
  const { id } = await params;
  if (!isUuid(id)) notFound();
  const page = pageParam((await searchParams).page);
  let actor: Awaited<ReturnType<typeof getActor>> = null;
  let scope: Awaited<ReturnType<typeof getGroupActorScope>> | null = null;
  let votes: Awaited<ReturnType<typeof getGroupActorVotes>> | null = null;
  let failed = false;
  try {
    actor = await getActor(id);
    if (actor?.kind === 'group' && actor.external_id?.startsWith('an-organe:')) {
      [scope, votes] = await Promise.all([
        getGroupActorScope(id), getGroupActorVotes(id, page, PAGE_SIZE),
      ]);
    }
  } catch { failed = true; }
  if (!failed && (!actor || actor.kind !== 'group')) notFound();

  const total = scope?.reduce((sum, row) => sum + row.scrutins, 0) ?? 0;
  const majority = (position: 'pour' | 'contre' | 'abstention') =>
    scope?.reduce((sum, row) => sum + row[position], 0) ?? null;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const displayName = scope?.[0]?.display_name ?? actor?.name ?? 'Groupe indisponible';
  const officialNames = [...new Set(scope?.map((entry) => entry.group_name) ?? [])];
  const firstVote = scope?.reduce((first, entry) => !first || entry.first_vote < first ? entry.first_vote : first, '' as string) ?? '';
  const lastVote = scope?.reduce((last, entry) => entry.last_vote > last ? entry.last_vote : last, '' as string) ?? '';
  const positioned = (majority('pour') ?? 0) + (majority('contre') ?? 0) + (majority('abstention') ?? 0);

  return <main className="group-profile"><SeoPage path={`/groupes/${id}`} />
    <p className="breadcrumb"><Link className="quiet" href="/groupes">← Tous les groupes</Link></p>
    <section className="group-profile-hero"><div className="eyebrow">Assemblée nationale / fiche de navigation</div><h1>{displayName}</h1><PoliticalBadge name={displayName} officialNames={officialNames} kind="group" chamber="Assemblée nationale" /><p>Positions majoritaires du groupe dans les scrutins publiés, avec leurs sources.</p><div className="group-profile-hero-foot"><span>{scope?.length ?? 0} identifiant{scope?.length === 1 ? '' : 's'} distinct{scope?.length === 1 ? '' : 's'}</span><span>{firstVote && lastVote ? `Votes publiés ${firstVote.slice(0, 4)}–${lastVote.slice(0, 4)}` : 'Période indisponible'}</span></div></section>
    <PoliticalClassificationDetails name={displayName} officialNames={officialNames} kind="group" chamber="Assemblée nationale" />
    <nav className="reading-nav" aria-label="Parcourir la fiche du groupe"><a href="#votes-documentes">Votes documentés ↓</a><a href="#identifiants">Intitulés officiels ↓</a></nav>
    {failed ? <Empty>Les scrutins de ce groupe sont indisponibles pour le moment.</Empty>
      : scope && votes ? <>
        <div className="group-kpis"><div><span>Scrutins documentés</span><strong>{total.toLocaleString('fr-FR')}</strong></div><div><span>Majorité pour</span><strong>{majority('pour')?.toLocaleString('fr-FR') ?? '—'}</strong></div><div><span>Majorité contre</span><strong>{majority('contre')?.toLocaleString('fr-FR') ?? '—'}</strong></div><div><span>Majorité abstention</span><strong>{majority('abstention')?.toLocaleString('fr-FR') ?? '—'}</strong></div></div>
        <div className="group-profile-distribution"><div className="group-card-chart-track" role="img" aria-label={`Sur ${positioned} positions majoritaires : ${majority('pour') ?? 0} pour, ${majority('contre') ?? 0} contre, ${majority('abstention') ?? 0} abstentions`}>{positioned > 0 ? <><span className="group-chart-for" style={{ width: `${(majority('pour') ?? 0) / positioned * 100}%` }} /><span className="group-chart-against" style={{ width: `${(majority('contre') ?? 0) / positioned * 100}%` }} /><span className="group-chart-abstain" style={{ width: `${(majority('abstention') ?? 0) / positioned * 100}%` }} /></> : null}</div><p>Répartition des positions majoritaires publiées · pour / contre / abstention. Ce n’est ni un taux de présence ni le vote d’un parti.</p></div>
        {scope.length ? <section className="group-identity-panel" id="identifiants"><div className="group-identity-heading"><span className="eyebrow">Référentiel officiel</span><h2>{scope.length} identifiant{scope.length > 1 ? 's' : ''}, {officialNames.length} intitulé{officialNames.length > 1 ? 's' : ''}</h2><p>Les dates correspondent au premier et au dernier scrutin publié pour chaque identifiant.</p></div><div className="group-identity-list">{scope.map((entry, index) => <div className="group-identity-item" key={entry.group_ref}><span className="group-identity-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{entry.group_name}</strong><span>{formatDate(entry.first_vote)} → {formatDate(entry.last_vote)}</span></div><div className="group-identity-end"><b>{entry.scrutins.toLocaleString('fr-FR')}</b><span>scrutins</span><code>{entry.group_ref}</code></div></div>)}</div></section> : null}
        <div className="list-heading" id="votes-documentes"><h2>Votes documentés</h2><span>Plus récents d’abord · page {page} / {pageCount}</span></div>
        {votes.length ? <div className="vote-list">{votes.map((vote) => {
          const summary = { kind: 'vote' as const, title: vote.title };
          const voteNumber = scrutinNumber(summary);
          const span = voteScope(summary);
          return <article className="vote-row" key={vote.vote_id}><div><span className="count">Assemblée nationale · {formatDate(vote.occurred_at)}{voteNumber ? ` · n° ${voteNumber}` : ''} · groupe <code>{vote.group_ref}</code></span>{span ? <p className="hint">Vote sur : {span}</p> : null}<h3><Link href={`/pieces/${vote.vote_id}`}>{readerTitle(summary)}</Link></h3><VoteTopics title={vote.title} institution="assemblee" /><a href={vote.source_url} target="_blank" rel="noopener noreferrer">Scrutin officiel ↗</a></div><div className="position-cell"><span>Position majoritaire publiée</span><strong>{positionLabel(vote.position_majoritaire)}</strong><small>Pour {vote.pour} · Contre {vote.contre} · Abst. {vote.abstentions}</small></div></article>;
        })}</div> : <Empty>Aucun scrutin publié pour ce groupe dans cette période de la base.</Empty>}
        <Pager page={page} pageCount={pageCount} hrefFor={(target) => `/groupes/${id}${target > 1 ? `?page=${target}` : ''}`} />
      </> : <Empty>Les positions publiées de ce groupe ne sont pas encore reliées aux scrutins visibles. Aucun vote ne lui est attribué par déduction.</Empty>}
  </main>;
}

export async function generateMetadata({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<SearchParamsRecord>}) {
  const {id} = await params;
  return documentMetadata(`/groupes/${id}`,await searchParams);
}
