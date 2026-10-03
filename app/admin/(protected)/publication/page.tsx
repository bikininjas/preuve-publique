import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Notice } from '@/components/ui';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Publication automatique' };

export default async function PublicationPage() {
  let count: number | null = null;
  try {
    const db = await createClient();
    const result = await db.from('evidence').select('id', { count: 'exact', head: true })
      .eq('status', 'published').eq('publication_method', 'official_archive_replay');
    if (!result.error) count = result.count ?? 0;
  } catch { /* L'administration affiche explicitement l'indisponibilité. */ }
  return <>
    <div className="queue-intro"><div className="eyebrow">04 / Contrôle documentaire</div><h2>Publication automatique</h2></div>
    <p className="lead">Une pièce factuelle peut être publiée quand le fichier officiel et la ligne en base concordent exactement. L’indice décrit la conformité du document à sa source, sans évaluer une position politique.</p>
    {count == null ? <Notice>Le compteur des publications automatiques est indisponible.</Notice> :
      <div className="stats"><div className="stat published"><b>{count.toLocaleString('fr-FR')}</b><span>scrutins publiés par contrôle automatique</span></div></div>}
    <section className="panel"><h3>Règle actuelle : scrutins AN et Sénat</h3>
      <div className="review-checklist"><div><b>1. Domaine officiel</b><span>Archive JSON de l’Assemblée nationale ou page officielle de session du Sénat.</span></div><div><b>2. Archive intacte</b><span>Empreinte SHA-256 et taille conformes au manifeste et à la source enregistrée.</span></div><div><b>3. Relecture machine</b><span>Chaque scrutin est reconstruit depuis la source conservée, puis comparé au staging.</span></div><div><b>4. Accord en base</b><span>Intitulé, date, chiffres, groupes et repère correspondent ; seul un brouillon peut passer à publié.</span></div></div>
      <p className="hint">Un contrôle échoué laisse la pièce en brouillon, mais tous les brouillons n’ont pas subi un contrôle : les archives peuvent attendre leur premier passage. Le score 99/100 est un indice de conformité documentaire déterministe, pas une probabilité statistique. Les pièces déjà publiées avant cette règle n’ont pas de score rétrospectif.</p>
    </section>
    <section className="panel"><h3>Ce qui demande une personne</h3><p>Programme, déclaration médiatique, rapprochement entre promesse et vote, effet sur une population et affaire judiciaire exigent une justification et une validation éditoriale avant publication. Un vote de groupe n’est jamais imputé automatiquement à chaque élu.</p><p><Link href="/admin/links">Examiner les rapprochements →</Link></p></section>
    <section className="panel"><h3>Exploitation</h3><p>La synchronisation quotidienne couvre les 30 derniers jours pour l’Assemblée et le Sénat. La reprise historique est un passage distinct, avec un lot limité. L’import et le contrôle s’exécutent depuis le pipeline d’ingestion ; le site web n’accède jamais à la connexion privilégiée de la base. Chaque nouveau passage est inscrit au <Link href="/admin/runs">journal d’ingestion</Link>.</p><code>node ingestion/cli.mjs run an-scrutins --auto-publish --publish-limit=50 --yes</code><p><Link href="/admin/review?status=draft&scope=historical-votes" prefetch={false}>Examiner les archives en attente →</Link></p></section>
  </>;
}
