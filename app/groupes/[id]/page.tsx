import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Empty, Pager } from '@/components/ui';
import { getActor, getGroupActorScope, getGroupActorVotes } from '@/lib/data';
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

  return <main>
    <p className="breadcrumb"><Link className="quiet" href="/groupes">← Tous les groupes</Link></p>
    <div className="page-intro compact"><div className="eyebrow">Groupe parlementaire · Assemblée nationale</div><h1>{actor?.name ?? 'Groupe indisponible'}</h1><p className="lead">Les scrutins ci-dessous sont reliés à l’identifiant officiel du groupe au jour du vote. Lorsque le même nom a été réutilisé dans plusieurs législatures, leurs identifiants restent distincts dans les sources et leurs scrutins sont réunis ici pour la navigation.</p></div>
    {failed ? <Empty>Les scrutins de ce groupe sont indisponibles pour le moment.</Empty>
      : scope && votes ? <>
        <div className="group-kpis"><div><span>Scrutins documentés</span><strong>{total.toLocaleString('fr-FR')}</strong></div><div><span>Majorité pour</span><strong>{majority('pour')?.toLocaleString('fr-FR') ?? '—'}</strong></div><div><span>Majorité contre</span><strong>{majority('contre')?.toLocaleString('fr-FR') ?? '—'}</strong></div><div><span>Majorité abstention</span><strong>{majority('abstention')?.toLocaleString('fr-FR') ?? '—'}</strong></div></div>
        <p className="hint">Comptages des scrutins publiés où un organe portant exactement ce nom figure dans la source. Ce n’est pas un taux de présence ni le vote d’un parti.</p>
        {scope.length ? <section className="panel group-identity-panel"><h2>Identifiants conservés</h2><p>{scope.length > 1 ? `${scope.length} organes officiels distincts portent ce même nom.` : 'Un identifiant officiel est associé à ce nom dans les scrutins publiés.'} Chaque scrutin garde son identifiant, sa date et son lien vers l’Assemblée nationale.</p><ul>{scope.map((entry) => <li key={entry.group_ref}><code>{entry.group_ref}</code> · {formatDate(entry.first_vote)} au {formatDate(entry.last_vote)} · {entry.scrutins.toLocaleString('fr-FR')} scrutin{entry.scrutins > 1 ? 's' : ''}</li>)}</ul></section> : null}
        <div className="list-heading"><h2>Votes documentés</h2><span>Plus récents d’abord · page {page} / {pageCount}</span></div>
        {votes.length ? <div className="vote-list">{votes.map((vote) => {
          const summary = { kind: 'vote' as const, title: vote.title };
          const voteNumber = scrutinNumber(summary);
          const span = voteScope(summary);
          return <article className="vote-row" key={vote.vote_id}><div><span className="count">Assemblée nationale · {formatDate(vote.occurred_at)}{voteNumber ? ` · n° ${voteNumber}` : ''} · groupe <code>{vote.group_ref}</code></span>{span ? <p className="hint">Vote sur : {span}</p> : null}<h3><Link href={`/pieces/${vote.vote_id}`}>{readerTitle(summary)}</Link></h3><a href={vote.source_url} target="_blank" rel="noopener noreferrer">Scrutin officiel ↗</a></div><div className="position-cell"><span>Position majoritaire publiée</span><strong>{positionLabel(vote.position_majoritaire)}</strong><small>Pour {vote.pour} · Contre {vote.contre} · Abst. {vote.abstentions}</small></div></article>;
        })}</div> : <Empty>Aucun scrutin publié pour ce groupe dans cette période de la base.</Empty>}
        <Pager page={page} pageCount={pageCount} hrefFor={(target) => `/groupes/${id}${target > 1 ? `?page=${target}` : ''}`} />
      </> : <Empty>Les positions publiées de ce groupe ne sont pas encore reliées aux scrutins visibles. Aucun vote ne lui est attribué par déduction.</Empty>}
  </main>;
}
