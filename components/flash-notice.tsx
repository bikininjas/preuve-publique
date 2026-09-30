import { Notice } from '@/components/ui';
import { first, type SearchParamsRecord } from '@/lib/params';

/**
 * Feedback banner for a review action, read from the query parameters the
 * server action redirected with. Codes only — never raw error text.
 */
export function FlashNotice({ params }: { params: SearchParamsRecord }) {
  const ok = first(params.ok);
  const error = first(params.error);
  if (!ok && !error) return null;

  if (ok) {
    const messages: Record<string, string> = {
      deconnexion: 'Vous êtes déconnecté.',
      inchange: 'Statut inchangé : la ligne portait déjà ce statut.',
      reviewed: 'Ligne marquée relue. Pour la publier, filtrez sur le statut « Relu ».',
      published: 'Ligne publiée : elle est désormais visible publiquement.',
      draft: 'Ligne ramenée en brouillon : elle n’est plus visible publiquement.',
    };
    return <Notice kind="ok">{messages[ok] ?? 'Modification enregistrée.'}</Notice>;
  }

  const messages: Record<string, string> = {
    demande: 'Demande invalide : rien n’a été modifié.',
    introuvable: 'Ligne introuvable pour cette session : rien n’a été modifié.',
    transition: `Transition refusée (${first(params.from) ?? '?'} → ${
      first(params.to) ?? '?'
    }) : le chemin autorisé est brouillon → relu → publié, avec retour d’un cran.`,
    maj: 'La base a refusé la mise à jour (politiques de sécurité ou session expirée). Rien n’a été écrit.',
    table: 'Table inconnue pour la revue.',
    session: 'Session expirée avant l’action : reconnectez-vous.',
  };
  return <Notice>{messages[error!] ?? 'L’action n’a pas abouti.'}</Notice>;
}
