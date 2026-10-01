import Link from 'next/link';
import { getStatusCounts, listRuns, type StatusCounts } from '@/lib/admin';
import { DataTable, Empty, Notice, RunStatusBadge } from '@/components/ui';
import { formatDateTime } from '@/lib/labels';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Vue d’ensemble' };

const STATUS_ROWS: Array<[keyof StatusCounts, string]> = [
  ['draft', 'Brouillons'],
  ['reviewed', 'Relues'],
  ['published', 'Publiées'],
];

function StatusNumbers({ title, base, counts }: { title: string; base: string; counts: StatusCounts }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <div className="stats">
        {STATUS_ROWS.map(([status, label]) => (
          <Link className={`stat ${status}`} href={`${base}?status=${status}`} key={status}>
            <b>{counts[status].toLocaleString('fr-FR')}</b>
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function AdminDashboardPage() {
  let counts: { evidence: StatusCounts; links: StatusCounts } | null = null;
  let runs: Awaited<ReturnType<typeof listRuns>> = [];
  try {
    [counts, runs] = await Promise.all([getStatusCounts(), listRuns(5)]);
  } catch {
    counts = null;
  }

  return (
    <>
      <section className="admin-welcome"><div><div className="eyebrow">Vue d’ensemble</div><h2>Avant de publier,<br />remonter à la source.</h2><p>Les files ci-dessous séparent les documents importés des rapprochements éditoriaux. Chaque transition est signée et doit correspondre à une vérification réelle.</p></div><div className="admin-shortcuts"><Link href="/admin/review?status=draft">Relire les pièces <span>→</span></Link><Link href="/admin/links?status=draft">Examiner les liens <span>→</span></Link><Link href="/admin/runs">Contrôler les imports <span>→</span></Link></div></section>
      {counts ? (
        <>
          <div className="admin-stats-grid"><StatusNumbers title="Pièces" base="/admin/review" counts={counts.evidence} /><StatusNumbers title="Rapprochements documentaires" base="/admin/links" counts={counts.links} /></div>
        </>
      ) : (
        <Notice>Les compteurs sont indisponibles pour le moment. Rechargez la page dans un instant.</Notice>
      )}

      <section className="panel">
        <h2>La règle de publication</h2>
        <p>
          Les scrutins officiels de l’Assemblée peuvent être publiés après une vérification automatique de l’archive, de
          son empreinte et des données en base. Les autres pièces passent par la relecture humaine : <b>brouillon</b>,{' '}
          <b>relue</b>, puis <b>publiée</b>. Les rapprochements interprétatifs restent soumis à une validation humaine.
        </p>
        <p className="hint">La vérification automatique porte sur la fidélité du document, jamais sur un jugement politique. <Link href="/admin/publication">Voir la règle et les contrôles →</Link></p>
        <div className="review-checklist"><div><b>1. Identifier</b><span>Le document, sa date et son éditeur.</span></div><div><b>2. Contrôler</b><span>L’extrait, le repère et les chiffres dans la source.</span></div><div><b>3. Relier</b><span>Le périmètre exact avant tout rapprochement.</span></div><div><b>4. Publier</b><span>Une trace de relecture explicite et révisable.</span></div></div>
      </section>

      <section className="panel">
        <h2>Derniers passages d’ingestion</h2>
        {runs.length ? (
          <DataTable head={['Importeur', 'Démarré', 'Statut']}>
            {runs.map((run) => (
              <tr key={run.id}>
                <td>{run.importer}</td>
                <td>{formatDateTime(run.started_at)}</td>
                <td>
                  <RunStatusBadge status={run.status} />
                </td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <Empty>
            Aucun passage enregistré pour l’instant — l’historique se remplit à chaque import lancé depuis la ligne de
            commande.
          </Empty>
        )}
        <p>
          <Link className="quiet" href="/admin/runs">
            Voir tous les passages →
          </Link>
        </p>
      </section>
    </>
  );
}
