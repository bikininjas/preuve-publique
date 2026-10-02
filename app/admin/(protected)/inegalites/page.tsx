import { InequalitySections } from '@/components/inequality-sections';
import { listEvidenceForReview } from '@/lib/admin';
import type { EvidencePage } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Inégalités à relire' };

export default async function InequalityReviewPage() {
  let result: EvidencePage | null = null;
  try { result = await listEvidenceForReview({ kind: 'indicator', status: 'all', limit: 50 }); } catch { /* L’erreur reste explicite dans le composant. */ }
  return <>
    <div className="queue-intro"><div className="eyebrow">06 / Indicateurs</div><h2>Comparer les fiches avant publication.</h2><p>Cette vue protégée contient aussi les brouillons. Ouvrir chaque document original pour contrôler valeurs, groupes, dénominateurs et limites, puis utiliser la fiche de relecture. Le statut reste visible sous chaque rubrique.</p></div>
    <InequalitySections result={result} review />
  </>;
}
