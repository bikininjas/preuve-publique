import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Empty, Pager } from '@/components/ui';
import { getActor, getEvidencePage, getGroupPositionCounts } from '@/lib/data';
import { formatDate, institutionLabel, positionLabel } from '@/lib/labels';
import { isUuid, pageParam, type SearchParamsRecord } from '@/lib/params';
import { readerTitle, scrutinNumber, voteScope } from '@/lib/reader';
import type { GroupPosition } from '@/components/group-positions';

export const dynamic = 'force-dynamic';
const PAGE_SIZE = 16;

export default async function GroupePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<SearchParamsRecord> }) {
  const { id } = await params;
  if (!isUuid(id)) notFound();
  const page = pageParam((await searchParams).page);
  let actor: Awaited<ReturnType<typeof getActor>> = null;
  let votes: Awaited<ReturnType<typeof getEvidencePage>> | null = null;
  let positions: Awaited<ReturnType<typeof getGroupPositionCounts>> | null = null;
  let failed = false;
  try {
    actor = await getActor(id);
    if (actor?.kind === 'group' && actor.external_id?.startsWith('an-organe:')) {
      const groupRef = actor.external_id.slice('an-organe:'.length);
      [votes, positions] = await Promise.all([
        getEvidencePage({ kind: 'vote', institution: 'assemblee', groupRef, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }),
        getGroupPositionCounts(groupRef),
      ]);
    }
  } catch { failed = true; }
  if (!failed && (!actor || actor.kind !== 'group')) notFound();
  return <main>
    <p className="breadcrumb"><Link className="quiet" href="/groupes">← Tous les groupes</Link></p>
    <div className="page-intro compact"><div className="eyebrow">Groupe parlementaire</div><h1>{actor?.name ?? 'Groupe indisponible'}</h1><p className="lead">Positions publiées dans les scrutins de l’Assemblée nationale. Les chiffres concernent ce groupe lors de chaque scrutin ; ils ne décrivent ni un parti entier, ni chaque député.</p></div>
    {failed ? <Empty>Les scrutins de ce groupe sont indisponibles pour le moment.</Empty> : votes ? <><div className="group-kpis"><div><span>Scrutins documentés</span><strong>{votes.total.toLocaleString('fr-FR')}</strong></div><div><span>Majorité pour</span><strong>{positions?.pour.toLocaleString('fr-FR') ?? '—'}</strong></div><div><span>Majorité contre</span><strong>{positions?.contre.toLocaleString('fr-FR') ?? '—'}</strong></div><div><span>Majorité abstention</span><strong>{positions?.abstention.toLocaleString('fr-FR') ?? '—'}</strong></div></div><p className="hint">Comptages des scrutins publiés dans cette base où le groupe figure. Ce n’est pas un taux de présence : le nombre total de scrutins éligibles pendant chaque période de mandat doit encore être établi.</p><div className="list-heading"><h2>Votes documentés</h2><span>Page {page} / {Math.max(1, Math.ceil(votes.total / PAGE_SIZE))}</span></div>{votes.items.length ? <div className="vote-list">{votes.items.map((vote) => {
      const groups = Array.isArray(vote.detail?.groupes) ? vote.detail.groupes as GroupPosition[] : [];
      const position = groups.find((row) => row.organe_ref === actor?.external_id?.slice('an-organe:'.length));
      const scope = voteScope(vote);
      return <article className="vote-row" key={vote.id}><div><span className="count">{institutionLabel(vote.institution)} · {formatDate(vote.occurred_at)}{scrutinNumber(vote) ? ` · n° ${scrutinNumber(vote)}` : ''}</span>{scope ? <p className="hint">Vote sur : {scope}</p> : null}<h3><Link href={`/pieces/${vote.id}`}>{readerTitle(vote)}</Link></h3><a href={vote.source_url} target="_blank" rel="noopener noreferrer">Scrutin officiel ↗</a></div><div className="position-cell"><span>Position majoritaire publiée</span><strong>{positionLabel(position?.position_majoritaire)}</strong><small>Pour {position?.pour ?? '—'} · Contre {position?.contre ?? '—'} · Abst. {position?.abstentions ?? '—'}</small></div></article>;
    })}</div> : <Empty>Aucun scrutin publié pour ce groupe dans cette période de la base.</Empty>}<Pager page={page} pageCount={Math.max(1, Math.ceil(votes.total / PAGE_SIZE))} hrefFor={(target) => `/groupes/${id}${target > 1 ? `?page=${target}` : ''}`} /></> : <Empty>Les positions publiées de ce groupe ne sont pas encore reliées aux scrutins visibles. Aucun vote ne lui est attribué par déduction.</Empty>}
  </main>;
}
