import Link from 'next/link';
import { listRuns } from '@/lib/admin';
import { getEvidencePage } from '@/lib/data';
import { formatDateTime } from '@/lib/labels';
import { DataTable, Empty, RunStatusBadge } from '@/components/ui';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Administration' };
export default async function AdminDashboardPage() {
  const [votes, cases, runs] = await Promise.allSettled([getEvidencePage({kind:'vote',limit:1}),getEvidencePage({kind:'judicial_event',limit:1}),listRuns(5)]);
  return <><section className="admin-welcome"><div><div className="eyebrow">Administration</div><h2>Des décisions utiles,<br/>des sources lisibles.</h2><p>Les votes qui actent l’adoption définitive d’une loi et les faits judiciaires vérifiés sont publiés automatiquement. L’administration sert à consulter les sources et à corriger les erreurs d’import.</p></div><div className="admin-shortcuts"><Link href="/admin/scrutins">Votes d’adoption définitive →</Link><Link href="/admin/justice">Affaires et personnes →</Link><Link href="/admin/runs">Imports et erreurs →</Link></div></section>
  <div className="stats"><div className="stat"><b>{votes.status==='fulfilled' ? votes.value.total.toLocaleString('fr-FR') : '—'}</b><span>votes d’adoption définitive publiés</span></div><div className="stat"><b>{cases.status==='fulfilled' ? cases.value.total.toLocaleString('fr-FR') : '—'}</b><span>fiches judiciaires publiées</span></div></div>
  <section className="panel"><h2>Publication et périmètre</h2><p>Amendements, motions, résolutions et lectures intermédiaires sont écartés de la sélection. Un vote sur l’ensemble du texte est retenu seulement si l’adoption définitive est établie. La promulgation est une étape distincte.</p><p>Une affaire individuelle est comptée pour un parti uniquement avec une appartenance datée et sourcée. Les poursuites, les plaintes, les relaxes et les condamnations définitives sont distinguées.</p><p className="hint">Les anciennes archives et les liens entre documents ne constituent plus une file de tâches à traiter. « Pièce » désignait un document importé ; « rapprochement », un lien proposé entre deux documents.</p><Link href="/admin/publication">Consulter les règles de publication →</Link></section>
  <section className="panel"><h2>Derniers imports</h2>{runs.status==='fulfilled'&&runs.value.length ? <DataTable head={['Import','Démarré','Résultat']}>{runs.value.map(run=><tr key={run.id}><td>{run.importer}</td><td>{formatDateTime(run.started_at)}</td><td><RunStatusBadge status={run.status}/></td></tr>)}</DataTable> : <Empty>Le journal d’import est indisponible ou vide.</Empty>}<p><Link href="/admin/runs">Consulter le journal →</Link></p></section></>;
}
