import Link from 'next/link';
import type { PartyVoteDashboard, PartyVoteRow } from '@/lib/data';
import { formatDate } from '@/lib/labels';

const number = (value: number) => value.toLocaleString('fr-FR');
const ballotCount = (row: PartyVoteRow) => row.pour + row.contre + row.abstention + row.non_votant;

function PartyBar({ row }: { row: PartyVoteRow }) {
  const total = ballotCount(row);
  const segments = [
    { key: 'pour', count: row.pour, label: 'pour' },
    { key: 'contre', count: row.contre, label: 'contre' },
    { key: 'abstention', count: row.abstention, label: 'abstentions' },
    { key: 'non-votant', count: row.non_votant, label: 'non-votants' },
  ];
  return <div className="party-bar" role="img" aria-label={`${row.party_name} : ${number(row.pour)} pour, ${number(row.contre)} contre, ${number(row.abstention)} abstentions, ${number(row.non_votant)} non-votants`}>
    {segments.map((segment) => segment.count ? <span key={segment.key} className={`party-segment ${segment.key}`} style={{ width: `${segment.count / total * 100}%` }} title={`${number(segment.count)} ${segment.label}`} /> : null)}
  </div>;
}

export function PartyVoteChart({ title, dashboard, href, previewLimit, partyHref }: {
  title: string;
  dashboard: PartyVoteDashboard;
  href?: string;
  previewLimit?: number;
  partyHref?: (partyId: string) => string;
}) {
  const parties = [...dashboard.parties].sort((a, b) =>
    ballotCount(b) - ballotCount(a) || a.party_name.localeCompare(b.party_name, 'fr'));
  const visibleLimit = previewLimit ?? 12;
  const shown = parties.slice(0, visibleLimit);
  const hidden = parties.slice(visibleLimit);
  const { scope } = dashboard;
  const attributed = scope.recorded_individuals - scope.unattributed_individuals;
  const renderRow = (row: PartyVoteRow) => <div className="party-chart-row" key={row.party_id}>
    <div className="party-chart-name"><strong>{partyHref ? <Link href={partyHref(row.party_id)}>{row.party_name} ↗</Link> : row.party_name}</strong><small>{number(row.scrutins)} scrutin{row.scrutins > 1 ? 's' : ''} documenté{row.scrutins > 1 ? 's' : ''}</small></div>
    <PartyBar row={row} />
    <div className="party-chart-total">{number(ballotCount(row))}<span>bulletins</span></div>
    <div className="party-chart-values">{number(row.pour)} pour · {number(row.contre)} contre · {number(row.abstention)} abst. · {number(row.non_votant)} non-votants</div>
  </div>;
  return <section className="party-chart" aria-label={`Votes des partis : ${title}`}>
    <div className="party-chart-head">
      <div><span className="eyebrow">Bulletins nominatifs · Assemblée nationale</span><h2>{title}</h2></div>
      {href ? <Link className="text-link" href={href}>Explorer ce sujet →</Link> : null}
    </div>
    <div className="party-chart-figures">
      <div><strong>{number(scope.documented_scrutins)}</strong><span>scrutins vérifiés sur {number(scope.total_scrutins)} trouvés</span></div>
      <div><strong>{number(attributed)}</strong><span>bulletins rattachés à un parti sur {number(scope.recorded_individuals)} nominatifs</span></div>
      <div><strong>{number(parties.length)}</strong><span>partis avec au moins un bulletin attribuable</span></div>
    </div>
    {scope.first_date && scope.last_date ? <p className="party-chart-period">Période des scrutins trouvés : {formatDate(scope.first_date)} au {formatDate(scope.last_date)}.</p> : null}
    {shown.length ? <>
      <div className="party-chart-legend" aria-hidden="true"><span className="pour">Pour</span><span className="contre">Contre</span><span className="abstention">Abstention</span><span className="non-votant">Non-votant</span></div>
      <div className="party-chart-rows">
        {shown.map(renderRow)}
      </div>
      {previewLimit && hidden.length ? <p className="party-chart-more">{hidden.length} autres partis dans le graphique complet. {href ? <Link href={href}>Tout voir →</Link> : null}</p> : null}
      {!previewLimit && hidden.length ? <details className="party-chart-rest"><summary>Afficher les {hidden.length} autres partis</summary><div className="party-chart-rows">{hidden.map(renderRow)}</div></details> : null}
    </> : <p className="empty">Aucun bulletin de parti attribuable sur les scrutins de ce sujet. Les votes du Sénat n’ont pas encore de rattachement individuel aux partis dans cette base.</p>}
    <p className="party-chart-method">Un segment représente des <strong>bulletins individuels</strong> sur les scrutins trouvés, pas l’opinion d’un parti sur tout le thème. Un député n’est compté que si l’archive officielle indique son vote et qu’une seule affiliation datée à un parti est connue ce jour-là. Les {number(scope.unattributed_individuals)} bulletins sans rattachement certain sont exclus des barres. Les scrutins dont le décompte nominatif diverge du total officiel sont exclus. Tri par nombre de bulletins documentés.</p>
    <div className="party-program-slot"><span>Parole ↔ vote</span><p>Les rapprochements avec un programme demandent la citation exacte, sa date et un scrutin portant sur la <strong>même mesure</strong>. Aucune conclusion sur une promesse n’est déduite de ce graphique.</p></div>
  </section>;
}

export function PartyVoteBreakdown({ rows, sourceUrl }: { rows: PartyVoteRow[]; sourceUrl: string }) {
  const sorted = [...rows].sort((a, b) => ballotCount(b) - ballotCount(a) || a.party_name.localeCompare(b.party_name, 'fr'));
  return <section className="party-chart party-chart-detail">
    <div className="party-chart-head"><div><span className="eyebrow">À partir des bulletins individuels</span><h2>Comment les partis sont représentés dans ce scrutin</h2></div></div>
    <p>Chaque ligne rassemble les bulletins de députés dont une seule affiliation officielle à ce parti était active le jour du scrutin. Le vote d’un groupe ou d’un élu non affilié n’est jamais imputé à un parti.</p>
    <div className="party-chart-legend" aria-hidden="true"><span className="pour">Pour</span><span className="contre">Contre</span><span className="abstention">Abstention</span><span className="non-votant">Non-votant</span></div>
    <div className="party-chart-rows">{sorted.map((row) => <div className="party-chart-row" key={row.party_id}>
      <div className="party-chart-name"><strong><Link href={`/scrutins?party=${row.party_id}#party-details`}>{row.party_name} ↗</Link></strong></div><PartyBar row={row} />
      <div className="party-chart-total">{number(ballotCount(row))}<span>bulletins</span></div>
      <div className="party-chart-values">{number(row.pour)} pour · {number(row.contre)} contre · {number(row.abstention)} abst. · {number(row.non_votant)} non-votants</div>
    </div>)}</div>
    <p className="party-chart-method">Source : <a href={sourceUrl} target="_blank" rel="noopener noreferrer">scrutin officiel de l’Assemblée nationale ↗</a>. Les affiliations viennent du référentiel daté de l’Assemblée. Les élus sans affiliation unique connue ne figurent pas dans ces barres ; le décompte officiel complet reste affiché plus haut.</p>
  </section>;
}
