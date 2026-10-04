import Link from 'next/link';
import { PoliticalBadge } from '@/components/political-classification';
import { VoteSample } from '@/components/vote-sample';
import type { GroupVoteCoverage, GroupVoteDashboard, GroupVoteRow } from '@/lib/data';
import { formatDate } from '@/lib/labels';

const number = (value: number) => value.toLocaleString('fr-FR');
const total = (row: GroupVoteRow) => row.pour + row.contre + row.abstention + row.non_votant;
const share = (value: number, denominator: number) => `${(denominator ? value * 100 / denominator : 0).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} %`;

function GroupBar({ row }: { row: GroupVoteRow }) {
  const denominator = total(row);
  return <div className="party-bar" role="img" aria-label={`${row.group_name} : ${share(row.pour, denominator)} pour, ${share(row.contre, denominator)} contre, ${share(row.abstention, denominator)} abstentions, ${share(row.non_votant, denominator)} non-participations parmi ${number(denominator)} positions`}>
    {([
      ['pour', row.pour], ['contre', row.contre], ['abstention', row.abstention], ['non-votant', row.non_votant],
    ] as const).map(([key, count]) => count ? <span className={`party-segment ${key}`} key={key} style={{ width: `${count / denominator * 100}%` }} title={`${number(count)} ${key}`}>
      {count / denominator >= .25 ? <span aria-hidden="true">{share(count, denominator)}</span> : null}
    </span> : null)}
  </div>;
}

function ShareLine({ row }: { row: GroupVoteRow }) {
  const denominator = total(row);
  return <div className="party-chart-shares" aria-label={`Répartition des ${number(denominator)} positions du ${row.group_name}`}>
    <span className="pour">{share(row.pour, denominator)} pour</span>
    <span className="contre">{share(row.contre, denominator)} contre</span>
    <span className="abstention">{share(row.abstention, denominator)} abst.</span>
    <span className="non-votant">{share(row.non_votant, denominator)} non-part.</span>
  </div>;
}

export function GroupVoteChart({ title, dashboard, href, previewLimit, groupHref }: {
  title: string;
  dashboard: GroupVoteDashboard;
  href?: string;
  previewLimit?: number;
  groupHref?: (ref: string) => string;
}) {
  const groups = [...dashboard.groups].sort((a, b) => total(b) - total(a) || a.group_name.localeCompare(b.group_name, 'fr'));
  const shown = groups.slice(0, previewLimit ?? 12);
  const hidden = groups.slice(previewLimit ?? 12);
  const { scope } = dashboard;
  const renderRow = (row: GroupVoteRow) => <div className="party-chart-row" key={`${row.group_ref}:${row.group_name}`}>
    <div className="party-chart-name"><strong>{groupHref ? <Link href={groupHref(row.group_ref)}>{row.group_name} ↗</Link> : row.group_name}</strong><PoliticalBadge name={row.group_name} kind="group" chamber="Sénat" /><small>{number(row.scrutins)} scrutin{row.scrutins > 1 ? 's' : ''} · groupe parlementaire</small></div>
    <GroupBar row={row} />
    <div className="party-chart-total">{number(total(row))}<span>positions</span></div>
    <ShareLine row={row} />
    <div className="party-chart-values">{number(row.pour)} pour · {number(row.contre)} contre · {number(row.abstention)} abst. · {number(row.non_votant)} non-part.<VoteSample scrutins={row.scrutins} /></div>
  </div>;
  return <section className="party-chart" aria-label={`Votes des groupes du Sénat : ${title}`}>
    <div className="party-chart-head"><div><span className="eyebrow">Analyse officielle par groupe · Sénat</span><h2>{title}</h2></div>{href ? <Link className="text-link" href={href}>Explorer ce sujet →</Link> : null}</div>
    <div className="party-chart-figures">
      <div><strong>{number(scope.documented_scrutins)}</strong><span>scrutins vérifiés sur {number(scope.total_scrutins)} trouvés</span></div>
      <div><strong>{number(scope.recorded_positions)}</strong><span>positions publiées par le Sénat</span></div>
      <div><strong>{number(groups.length)}</strong><span>noms de groupes documentés sur la période</span></div>
    </div>
    {scope.first_date && scope.last_date ? <p className="party-chart-period">Période des scrutins trouvés : {formatDate(scope.first_date)} au {formatDate(scope.last_date)}.</p> : null}
    {shown.length ? <><div className="party-chart-legend" aria-hidden="true"><span className="pour">Pour</span><span className="contre">Contre</span><span className="abstention">Abstention</span><span className="non-votant">Non-participation</span></div><div className="party-chart-rows">{shown.map(renderRow)}</div>{hidden.length ? <details className="party-chart-rest"><summary>Afficher les {hidden.length} autres noms de groupes</summary><div className="party-chart-rows">{hidden.map(renderRow)}</div></details> : null}</> : <p className="empty">Aucun décompte de groupe vérifié pour ce sujet.</p>}
    <p className="party-chart-method">Chaque barre additionne les positions publiées dans l’analyse <strong>par groupe</strong> des scrutins trouvés. Son dénominateur comprend pour, contre, abstention et non-participation. Un groupe parlementaire n’est pas un parti ; les noms historiques sont conservés tels que publiés. Un vote sur un texte entier ne décrit pas chaque mesure du texte. Lorsque vous sélectionnez un sujet, le filtre cherche des mots dans l’intitulé officiel ; plusieurs sujets peuvent se recouper.</p>
  </section>;
}

export function GroupSubjectChart({ title, subjectId, dashboard }: { title: string; subjectId: string; dashboard: GroupVoteDashboard }) {
  const groups = [...dashboard.groups].sort((a, b) => total(b) - total(a)).slice(0, 4);
  const href = `/scrutins?institution=senat&subject=${subjectId}`;
  return <article className="party-subject-chart">
    <div className="party-subject-head"><h3><Link href={href}>{title} ↗</Link></h3><span>{number(dashboard.scope.documented_scrutins)} / {number(dashboard.scope.total_scrutins)} scrutins vérifiés</span></div>
    {dashboard.scope.first_date && dashboard.scope.last_date ? <p className="hint">{formatDate(dashboard.scope.first_date)} – {formatDate(dashboard.scope.last_date)}</p> : null}
    {groups.length ? <><div className="party-chart-legend" aria-hidden="true"><span className="pour">Pour</span><span className="contre">Contre</span><span className="abstention">Abst.</span><span className="non-votant">Non-part.</span></div>{groups.map((row) => <div className="party-subject-row" key={`${row.group_ref}:${row.group_name}`}><div><Link href={`${href}&group=${row.group_ref}#group-details`}>{row.group_name} ↗</Link><PoliticalBadge name={row.group_name} kind="group" chamber="Sénat" /><small>{number(total(row))} positions</small></div><GroupBar row={row} /><ShareLine row={row} /></div>)}<p className="party-subject-foot">Quatre noms de groupes affichés par volume de positions. <Link href={href}>Voir tous les groupes et scrutins →</Link></p></> : <p className="party-subject-foot">Aucune analyse par groupe vérifiée. <Link href={href}>Voir les scrutins →</Link></p>}
  </article>;
}

export function GroupVoteBreakdown({ rows, coverage, sourceUrl, occurredAt }: { rows: GroupVoteRow[]; coverage: GroupVoteCoverage | null; sourceUrl: string; occurredAt: string }) {
  const sorted = [...rows].sort((a, b) => total(b) - total(a) || a.group_name.localeCompare(b.group_name, 'fr'));
  return <section className="party-chart party-chart-detail" id="votes-par-groupe">
    <div className="party-chart-head"><div><span className="eyebrow">Analyse officielle · Sénat</span><h2>Part des votes par groupe dans ce scrutin</h2></div></div>
    <p>Chaque pourcentage est calculé parmi les membres de ce groupe enregistrés pour ce scrutin, y compris les abstentions et les non-participations. Les données viennent directement de la page officielle du Sénat.</p>
    <div className="party-chart-legend" aria-hidden="true"><span className="pour">Pour</span><span className="contre">Contre</span><span className="abstention">Abstention</span><span className="non-votant">Non-participation</span></div>
    <div className="party-chart-rows">{sorted.map((row) => <div className="party-chart-row" key={row.group_ref}><div className="party-chart-name"><strong>{row.group_name}</strong><PoliticalBadge name={row.group_name} kind="group" chamber="Sénat" asOf={occurredAt} /></div><GroupBar row={row} /><div className="party-chart-total">{number(total(row))}<span>membres</span></div><ShareLine row={row} /><div className="party-chart-values">{number(row.pour)} pour · {number(row.contre)} contre · {number(row.abstention)} abst. · {number(row.non_votant)} non-part.</div></div>)}</div>
    <p className="party-chart-method">Source : <a href={sourceUrl} target="_blank" rel="noopener noreferrer">analyse par groupes politiques du scrutin officiel ↗</a>. Page récupérée et vérifiée {coverage ? `le ${formatDate(coverage.processed_at)} · SHA-256 ${coverage.page_sha256.slice(0, 12)}…` : 'à une date indisponible'}. Les quatre totaux de tous les groupes ont été recoupés avec le résultat officiel. Ce décompte décrit le groupe à la date du vote, sans attribution à un parti.</p>
  </section>;
}
