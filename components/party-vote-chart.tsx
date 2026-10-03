import Link from 'next/link';
import type { PartyVoteCoverage, PartyVoteDashboard, PartyVoteRow } from '@/lib/data';
import { formatDate } from '@/lib/labels';

const number = (value: number) => value.toLocaleString('fr-FR');
const ballotCount = (row: PartyVoteRow) => row.pour + row.contre + row.abstention + row.non_votant;
const share = (value: number, total: number) => `${(total ? value * 100 / total : 0).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} %`;

function PartyShareLine({ row }: { row: PartyVoteRow }) {
  const total = ballotCount(row);
  return <div className="party-chart-shares" aria-label={`Parts des positions enregistrées pour ${row.party_name}`}>
    <span className="pour">{share(row.pour, total)} pour</span>
    <span className="contre">{share(row.contre, total)} contre</span>
    <span className="abstention">{share(row.abstention, total)} abst.</span>
    <span className="non-votant">{share(row.non_votant, total)} non-votants</span>
  </div>;
}

export function PartyBar({ row }: { row: PartyVoteRow }) {
  const total = ballotCount(row);
  const segments = [
    { key: 'pour', count: row.pour, label: 'pour' },
    { key: 'contre', count: row.contre, label: 'contre' },
    { key: 'abstention', count: row.abstention, label: 'abstentions' },
    { key: 'non-votant', count: row.non_votant, label: 'non-votants' },
  ];
  return <div className="party-bar" role="img" aria-label={`${row.party_name} : ${share(row.pour, total)} pour, ${share(row.contre, total)} contre, ${share(row.abstention, total)} abstentions, ${share(row.non_votant, total)} non-votants parmi ${number(total)} positions nominatives enregistrées`}>
    {segments.map((segment) => segment.count ? <span key={segment.key} className={`party-segment ${segment.key}`} style={{ width: `${segment.count / total * 100}%` }} title={`${number(segment.count)} ${segment.label}`}>
      {segment.count / total >= .25 ? <span aria-hidden="true">{share(segment.count, total)}</span> : null}
    </span> : null)}
  </div>;
}

export function PartySubjectChart({ title, subjectId, dashboard }: { title: string; subjectId: string; dashboard: PartyVoteDashboard }) {
  const parties = [...dashboard.parties].sort((a, b) => ballotCount(b) - ballotCount(a) || a.party_name.localeCompare(b.party_name, 'fr'));
  const featured = parties.slice(0, 4);
  const href = `/scrutins?subject=${subjectId}`;
  return <article className="party-subject-chart">
    <div className="party-subject-head"><h3><Link href={href}>{title} ↗</Link></h3><span>{number(dashboard.scope.documented_scrutins)} / {number(dashboard.scope.total_scrutins)} scrutins vérifiés</span></div>
    {dashboard.scope.first_date && dashboard.scope.last_date ? <p className="hint">{formatDate(dashboard.scope.first_date)} – {formatDate(dashboard.scope.last_date)}</p> : null}
    {featured.length ? <>
      <div className="party-chart-legend" aria-hidden="true"><span className="pour">Pour</span><span className="contre">Contre</span><span className="abstention">Abst.</span><span className="non-votant">Non-votant</span></div>
      {featured.map((row) => <div className="party-subject-row" key={row.party_id}>
        <div><Link href={`${href}&party=${row.party_id}#party-details`}>{row.party_name} ↗</Link><small>{number(ballotCount(row))} positions</small></div>
        <PartyBar row={row} />
        <PartyShareLine row={row} />
      </div>)}
      <p className="party-subject-foot">Quatre partis affichés par volume de bulletins. <Link href={href}>Voir tous les partis et les scrutins →</Link></p>
    </> : <p className="party-subject-foot">Aucune position individuelle attribuable à un parti dans les scrutins vérifiés de ce sujet. <Link href={href}>Voir les scrutins →</Link></p>}
  </article>;
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
    <p className="party-chart-more">Comparer ces votes à un programme demande une source de l’élection concernée et la même mesure. <Link href="/methode#comparaisons">Lire les précautions →</Link></p>
  </section>;
}

export function PartyVoteBreakdown({ rows, coverage, sourceUrl }: { rows: PartyVoteRow[]; coverage: PartyVoteCoverage | null; sourceUrl: string }) {
  const sorted = [...rows].sort((a, b) => ballotCount(b) - ballotCount(a) || a.party_name.localeCompare(b.party_name, 'fr'));
  const attributed = sorted.reduce((sum, row) => sum + ballotCount(row), 0);
  return <section className="party-chart party-chart-detail" id="votes-par-parti">
    <div className="party-chart-head"><div><span className="eyebrow">À partir des bulletins individuels</span><h2>Part des votes par parti dans ce scrutin</h2></div></div>
    <p>Chaque pourcentage est calculé parmi les {coverage ? 'positions nominatives' : 'bulletins nominatifs'} <strong>de ce parti dans ce scrutin</strong>, y compris les non-votants enregistrés. Ce n’est pas la part de ce parti parmi tous les députés. {coverage ? `${number(attributed)} positions rattachées à un parti sur ${number(coverage.recorded_individuals)} nominatives ; ${number(coverage.unattributed_individuals)} sans affiliation unique sont exclues des barres.` : 'Le total nominatif détaillé est indisponible.'}</p>
    <div className="party-chart-legend" aria-hidden="true"><span className="pour">Pour</span><span className="contre">Contre</span><span className="abstention">Abstention</span><span className="non-votant">Non-votant</span></div>
    <div className="party-chart-rows">{sorted.map((row) => <div className="party-chart-row" key={row.party_id}>
      <div className="party-chart-name"><strong><Link href={`/scrutins?party=${row.party_id}#party-details`}>{row.party_name} ↗</Link></strong></div><PartyBar row={row} />
      <div className="party-chart-total">{number(ballotCount(row))}<span>bulletins</span></div>
      <PartyShareLine row={row} />
      <div className="party-chart-values">{number(row.pour)} pour · {number(row.contre)} contre · {number(row.abstention)} abst. · {number(row.non_votant)} non-votants</div>
    </div>)}</div>
    <p className="party-chart-method">Source : <a href={sourceUrl} target="_blank" rel="noopener noreferrer">scrutin officiel de l’Assemblée nationale ↗</a>. Les affiliations viennent du référentiel daté de l’Assemblée. Les élus sans affiliation unique connue ne figurent pas dans ces barres ; le décompte officiel complet reste affiché plus haut.</p>
  </section>;
}
