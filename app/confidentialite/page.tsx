import Link from 'next/link';
import { analyticsMeasurementId } from '@/lib/consent';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Confidentialité et cookies', description: 'Vos choix concernant la mesure d’audience, les cookies et les données personnelles sur Preuve Publique.', alternates: { canonical: '/confidentialite' } };

export default function PrivacyPage() {
  const enabled = Boolean(analyticsMeasurementId(process.env.GA_MEASUREMENT_ID));
  return (
    <main className="narrow privacy-page">
      <div className="eyebrow">Vos données et vos choix</div>
      <h1>Confidentialité<br />et cookies</h1>
      <p className="lead">Le site reste accessible sans accepter la mesure d’audience.</p>
      <p>Dernière mise à jour : 3 octobre 2026.</p>
      <h2>Qui est responsable ?</h2>
      <p>La structure « preuve-publique » et ses responsables assurent la gestion du site preuve-publique.fr. Pour toute demande concernant vos données personnelles : <a href="mailto:contact@preuve-publique.fr">contact@preuve-publique.fr</a>.</p>
      <h2>La mesure d’audience avec votre accord</h2>
      <p>{enabled ? 'Google Analytics 4 est proposé pour mesurer la fréquentation du site, à condition que vous acceptiez les cookies de mesure d’audience.' : 'Google Analytics 4 est actuellement désactivé sur ce site. Aucun script de mesure d’audience Google Analytics n’est chargé.'} Quand cette mesure est activée, votre consentement est demandé avant le chargement du script ou tout envoi à Google.</p>
      <p>La mesure porte sur les écrans publics consultés, un identifiant de navigateur créé par Google, les horaires de visite et des informations techniques sur l’appareil et le navigateur. Google reçoit également les informations techniques d’une connexion réseau. Ces données permettent de comprendre la fréquentation et d’améliorer les parcours. La base juridique de cette mesure est votre consentement.</p>
      <p>Les paramètres de recherche, fragments d’URL, noms de personnes ou de partis sélectionnés et pages d’administration ou d’authentification sont exclus des pages vues envoyées par le site. Les fiches sont regroupées sous un intitulé général. L’intégration n’active ni Google Signals ni personnalisation publicitaire et n’envoie aucune adresse de compte administrateur.</p>
      <p>Le fournisseur est Google Ireland Limited. Des traitements peuvent avoir lieu hors de l’Union européenne, notamment aux États-Unis, selon les garanties décrites par Google. Consultez <a href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noopener noreferrer">sa politique de confidentialité</a> et <a href="https://business.safety.google/privacy/" target="_blank" rel="noopener noreferrer">les informations sur les garanties de traitement</a>.</p>
      <p>La conservation des données utilisateur et d’événement dans la propriété Analytics est réglée sur deux mois, sans renouvellement automatique à chaque activité. Ce délai ne s’applique pas aux rapports statistiques agrégés de Google.</p>
      <h2>Quels cookies et réglages ?</h2>
      <ul>
        <li><b>Votre choix de cookies :</b> enregistré dans ce navigateur pendant 180 jours, avec la date du choix et la version de l’information. Un refus est conservé aussi longtemps qu’un accord. Ce réglage sert uniquement à respecter votre choix.</li>
        <li><b>Mesure d’audience :</b> les cookies <code>_ga</code> et <code>_ga_…</code> sont autorisés uniquement après accord, avec une durée maximale configurée de 180 jours sans prolongation à chaque visite. Ils sont supprimés par le site lorsque vous retirez votre accord.</li>
        <li><b>Affichage :</b> le thème clair ou sombre choisi est enregistré localement dans le navigateur pour conserver votre préférence.</li>
        <li><b>Administration :</b> les cookies de session Supabase servent à l’authentification des relecteurs. La base conserve l’adresse du compte autorisé ainsi que la date et l’auteur des transitions de relecture pour assurer leur traçabilité. Ce parcours n’est pas mesuré par Analytics.</li>
      </ul>
      <h2>Changer d’avis et exercer vos droits</h2>
      <p>Le bouton « Gérer mes cookies », présent dans le pied de page, permet d’accepter, de refuser ou de retirer votre consentement à tout moment. Le retrait arrête la mesure pour les visites suivantes et recharge la page pour décharger le script déjà actif. Il ne supprime pas rétroactivement les données déjà transmises.</p>
      <p>Vous pouvez demander l’accès, la rectification ou l’effacement de vos données, la limitation de leur traitement ou exercer les autres droits applicables en écrivant à <a href="mailto:contact@preuve-publique.fr">contact@preuve-publique.fr</a>. Vous pouvez également adresser une réclamation à la <a href="https://www.cnil.fr/fr/adresser-une-plainte" target="_blank" rel="noopener noreferrer">CNIL</a>.</p>
      <p><Link href="/methode">Lire la méthode et les sources du site →</Link></p>
    </main>
  );
}
