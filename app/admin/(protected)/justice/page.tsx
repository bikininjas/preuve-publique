import { JudicialDashboard } from '@/components/judicial-dashboard';
import { listEvidenceForReview } from '@/lib/admin';
import { collectJudicialPages } from '@/lib/judicial-data';
import type { EvidencePage } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Affaires et personnes' };

export default async function JudicialReviewPage() {
  let result: EvidencePage | null = null;
  try { result = await collectJudicialPages(offset => listEvidenceForReview({ kind: 'judicial_event', status: 'all', offset, limit: 100 })); } catch { /* Afficher l'indisponibilité sans inventer zéro. */ }
  return <>
    <div className="queue-intro"><div className="eyebrow">Justice</div><h2>Affaires, personnes et décisions.</h2><p>Publication automatique des faits appuyés sur une source judiciaire vérifiable, avec rôle, motifs et appartenance datée. Les dossiers sans source suffisante restent en attente ; la consultation ne demande aucune validation systématique.</p></div>
    <JudicialDashboard result={result} review />
  </>;
}
