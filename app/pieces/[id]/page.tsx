import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GroupPositions, type GroupPosition } from '@/components/group-positions';
import { PartyVoteBreakdown } from '@/components/party-vote-chart';
import { Citation, Empty, MetaList, RawJson, type MetaEntry } from '@/components/ui';
import { getActorNames, getEvidenceItem, getPartyVoteCoverageForScrutin, getPartyVotesForScrutin, type PartyVoteCoverage } from '@/lib/data';
import {
  RELATION_NOTES,
  formatDate,
  formatDateTime,
  institutionLabel,
  kindLabel,
  methodLabel,
  relationLabel,
  topicSlug,
} from '@/lib/labels';
import { isUuid } from '@/lib/params';
import { readerTitle, scrutinNumber, voteScope, voteTally } from '@/lib/reader';

export const dynamic = 'force-dynamic';

export default async function EvidenceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id)) notFound();

  let item: Awaited<ReturnType<typeof getEvidenceItem>> = null;
  let unavailable = false;
  try {
    item = await getEvidenceItem(id);
  } catch {
    unavailable = true;
  }
  if (unavailable) {
    return (
      <main className="narrow">
        <h1>Pièce indisponible</h1>
        <Empty>La base documentaire n’est pas accessible pour le moment. Réessayez plus tard.</Empty>
      </main>
    );
  }
  if (!item) notFound();
  const { evidence, source, actor, links } = item;
  const displayTitle = readerTitle(evidence);
  const scope = voteScope(evidence);
  const tally = evidence.kind === 'vote' ? voteTally(evidence) : null;

  const refs = Array.isArray(evidence.detail?.refs) ? evidence.detail.refs : [];
  const detail = (evidence.detail ?? {}) as { groupes?: GroupPosition[]; topics_source?: { values?: string[]; note?: string } };
  const groups = Array.isArray(detail.groupes) ? detail.groupes : [];
  let partyVotes: Awaited<ReturnType<typeof getPartyVotesForScrutin>> = [];
  let partyCoverage: PartyVoteCoverage | null = null;
  let partyVotesUnavailable = false;
  if (evidence.kind === 'vote' && evidence.institution === 'assemblee') {
    try {
      [partyVotes, partyCoverage] = await Promise.all([
        getPartyVotesForScrutin(evidence.id),
        getPartyVoteCoverageForScrutin(evidence.id),
      ]);
    } catch { partyVotesUnavailable = true; }
  }
  const topicsSource = detail.topics_source;
  let groupNames = new Map<string, string>();
  if (groups.length) {
    try {
      groupNames = await getActorNames(groups.map((group) => `an-organe:${group.organe_ref ?? ''}`));
    } catch {
      groupNames = new Map();
    }
  }
  const scalars = Object.entries(evidence.detail ?? {}).filter(
    ([key, value]) =>
      key !== 'refs'
      && key !== 'groupes'
      && key !== 'topics_source'
      && (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'),
  );
  const meta: MetaEntry[] = [
    {
      term: 'Source',
      children: (
        <a href={evidence.source_url} target="_blank" rel="noopener noreferrer">
          {source?.publisher ?? 'Document original'} ↗
        </a>
      ),
    },
    ...(source ? [{ term: 'Document', children: source.document_title }] : []),
    { term: 'Repère dans la source', children: evidence.source_locator ?? '—' },
    { term: 'Type', children: kindLabel(evidence.kind) },
    ...evidence.topics.map((topic) => ({
      term: 'Rubrique',
      children: <Link href={`/categories/${topicSlug(topic)}`}>{topic}</Link>,
    })),
    ...refs.map((ref) => ({
      term: 'Référence documentaire',
      children: (
        <>
          <code>{ref.type}</code> · {ref.value}
        </>
      ),
    })),
    ...scalars.map(([key, value]) => ({ term: key, children: String(value) })),
  ];

  return (
    <main>
      <p className="breadcrumb">
        <Link className="quiet" href="/pieces">
          ← Toutes les pièces
        </Link>
      </p>
      <div className="eyebrow">
        {kindLabel(evidence.kind)} · {institutionLabel(evidence.institution)}
      </div>
      <h1 className="title">{displayTitle}</h1>
      {evidence.kind === 'vote' ? <p className="hint">Sujet du texte concerné · {scope ? `vote sur : ${scope.toLocaleLowerCase('fr-FR')}` : 'périmètre du vote à vérifier dans l’intitulé officiel'}. Un amendement ou une motion ne vaut pas vote sur l’ensemble du texte.</p> : null}
      <p className="resultline">
        {formatDate(evidence.occurred_at)}
        {actor ? <> · {actor.name}</> : null}
        {evidence.external_id ? (
          <>
            {' '}
            · référence <code>{evidence.external_id}</code>
          </>
        ) : null}
        {evidence.reviewed_at ? <> · {evidence.publication_method ? 'contrôlée' : 'relue'} le {formatDate(evidence.reviewed_at)}</> : null}
      </p>
      {evidence.publication_confidence != null ? (
        <p className="hint"><strong>Conformité à la source : {Math.round(Number(evidence.publication_confidence) * 100)} %.</strong> Archive officielle, empreinte SHA-256 et données du scrutin recoupées avant publication. Cet indice ne mesure ni la cohérence d’un parti ni l’effet d’une loi.</p>
      ) : null}
      {displayTitle !== evidence.title ? <p className="official-title"><strong>Intitulé officiel :</strong> {evidence.title}</p> : null}

      {tally && (tally.pour !== null || tally.contre !== null) ? <div className="vote-metrics" aria-label="Décompte officiel du scrutin"><div><span>Pour</span><strong>{tally.pour?.toLocaleString('fr-FR') ?? '—'}</strong></div><div><span>Contre</span><strong>{tally.contre?.toLocaleString('fr-FR') ?? '—'}</strong></div><div><span>Abstentions</span><strong>{tally.abstentions?.toLocaleString('fr-FR') ?? '—'}</strong></div><div><span>Votants</span><strong>{tally.votants?.toLocaleString('fr-FR') ?? '—'}</strong></div></div> : null}
      {evidence.kind === 'vote' ? <p className="hint">{scrutinNumber(evidence) ? `Scrutin n° ${scrutinNumber(evidence)} · ` : ''}Ces chiffres décrivent ce scrutin, pas la position de chaque élu. <a href={evidence.source_url} target="_blank" rel="noopener noreferrer">Vérifier le vote officiel ↗</a></p> : null}

      {evidence.excerpt ? (
        <Citation footer="Formulation reprise de la source ; le lien ci-dessous mène au document original.">
          {evidence.excerpt}
        </Citation>
      ) : null}

      <section className="panel">
        <h2>Provenance</h2>
        <MetaList items={meta} />
        <p className="hint">
          {source
            ? `Récupéré le ${formatDateTime(source.retrieved_at)}${
                source.sha256 ? ` · empreinte SHA-256 ${source.sha256.slice(0, 12)}…` : ''
              }`
            : 'Source récupérée par l’importeur ; le document original reste chez son éditeur.'}
        </p>
        {topicsSource?.note ? (
          <p className="hint">
            {topicsSource.note}
            {topicsSource.values?.length ? (
              <>
                {' '}Dossier : <code>{topicsSource.values.join(', ')}</code>.
              </>
            ) : null}
          </p>
        ) : null}
        {evidence.detail ? <RawJson summary="Faits structurés bruts (JSON copié de la source)" value={evidence.detail} /> : null}
      </section>

      {groups.length ? (
        <section>
          <h2>Comment les groupes ont voté</h2>
          <GroupPositions groups={groups} names={groupNames} />
        </section>
      ) : null}

      {evidence.kind === 'vote' ? partyVotes.length ? (
        <PartyVoteBreakdown rows={partyVotes} coverage={partyCoverage} sourceUrl={evidence.source_url} />
      ) : <section className="panel party-vote-unavailable" id="votes-par-parti"><h2>Part des votes par parti</h2><p>{evidence.institution === 'assemblee'
        ? partyVotesUnavailable ? 'Le décompte par parti est temporairement indisponible.'
          : partyCoverage ? 'La liste nominative officielle est vérifiée, mais aucune affiliation unique à un parti ne permet d’attribuer ces positions.'
            : 'Aucun décompte par parti vérifié n’est disponible pour ce scrutin : la liste nominative et le total officiel doivent concorder avant affichage.'
        : 'Les positions individuelles reliées à un parti ne sont pas encore disponibles pour cette institution dans la base.'}</p><p className="hint">Le scrutin officiel et son résultat restent consultables ci-dessus.</p></section> : null}

      {links.length ? (
        <section>
          <h2>Rapprochements documentaires</h2>
          <p className="hint">
            Ces liens signalent une parenté documentaire (même référence, même dossier), jamais un soutien ni une
            contradiction.
          </p>
          <div className="cards">
            {links.map((link) => (
              <article className="card" key={link.id}>
                <span className="count">{relationLabel(link.relation)}</span>
                <h3>
                  <Link href={`/pieces/${link.related.id}`}>{link.related.title}</Link>
                </h3>
                {link.rationale ? <p>{link.rationale}</p> : null}
                <p className="source">
                  {methodLabel(link.method)} · confiance {Number(link.confidence).toLocaleString('fr-FR')}
                </p>
                <p className="hint">{RELATION_NOTES[link.relation]}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
