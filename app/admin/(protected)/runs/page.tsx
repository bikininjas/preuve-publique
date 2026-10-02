import { DataTable, Empty, Notice, RawJson, RunStatusBadge } from '@/components/ui';
import { listRuns } from '@/lib/admin';
import { formatDateTime } from '@/lib/labels';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Passages d’ingestion' };

export default async function RunsPage() {
  let runs: Awaited<ReturnType<typeof listRuns>> | null = null;
  try {
    runs = await listRuns(50);
  } catch {
    runs = null;
  }

  return (
    <>
      <div className="queue-intro"><div className="eyebrow">03 / Traçabilité</div><h2>Passages d’ingestion</h2></div>
      <p className="hint">
        Chaque import lancé depuis la ligne de commande laisse une trace : importeur, options, volume et résultat. Ce
        journal est privé : il n’est lisible que par l’administration.
      </p>
      <p className="hint">Les synchronisations de sondages apparaissent sous <code>polls:sondax</code>, avec les ajouts, modifications, données conservées et empreintes. Un opérateur peut lancer <code>npm run polls:sync -- --yes --publish</code> depuis un environnement interne disposant de la connexion d’ingestion. La synchronisation ne s’exécute pas dans le service web.</p>

      {!runs ? (
        <Notice>Le journal est indisponible pour le moment.</Notice>
      ) : runs.length ? (
        <DataTable head={['Importeur', 'Démarré', 'Terminé', 'Statut', 'Détail']}>
          {runs.map((run) => (
            <tr key={run.id}>
              <td>{run.importer}</td>
              <td>{formatDateTime(run.started_at)}</td>
              <td>{run.finished_at ? formatDateTime(run.finished_at) : '—'}</td>
              <td>
                <RunStatusBadge status={run.status} />
              </td>
              <td>
                <RawJson
                  summary="Options et statistiques"
                  value={{ options: run.options, stats: run.stats, error: run.error }}
                />
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
    </>
  );
}
