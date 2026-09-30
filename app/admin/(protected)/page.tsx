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
      {counts ? (
        <>
          <StatusNumbers title="Pièces" base="/admin/review" counts={counts.evidence} />
          <StatusNumbers title="Rapprochements documentaires" base="/admin/links" counts={counts.links} />
        </>
      ) : (
        <Notice>Les compteurs sont indisponibles pour le moment. Rechargez la page dans un instant.</Notice>
      )}

      <section className="panel">
        <h2>La règle de publication</h2>
        <p>
          Rien n’est publié automatiquement : une pièce passe de <b>brouillon</b> à <b>relue</b>, puis de <b>relue</b> à{' '}
          <b>publiée</b>, par une transition explicite qui enregistre la personne qui l’a validée. Un retour en arrière
          se fait d’un cran. La base applique la même règle que cette interface : même connectée, une adresse absente de
          la liste d’administration ne peut rien lire ni écrire.
        </p>
        <p className="hint">
          Le contenu des pièces vient des importeurs (connexion directe à la base) ; cette interface gère la relecture et
          la publication.
        </p>
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
