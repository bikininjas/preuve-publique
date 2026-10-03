# Relecture, Google Analytics et consentement

État vérifié le 3 octobre 2026 : la propriété Google Analytics a été créée ; les changements web sont validés localement sur `codex/admin-review-workflow`. Ils ne sont pas encore livrés sur `preuve-publique.fr`.

## Propriété dédiée

La propriété a été créée dans le compte Analytics existant, conformément à la demande de créer une propriété spécifique.

| Élément | Valeur |
|---|---|
| Nom de la propriété | `preuve-publique` |
| ID de la propriété | `557166840` |
| Compte existant | `134175114` |
| Nom du flux web | `preuve-publique.fr` |
| URL du flux | `https://preuve-publique.fr` |
| ID du flux | `15990123691` |
| ID de mesure public | `G-PZD15S5KZ2` |
| Fuseau de reporting | France |
| Devise | EUR |

[Ouvrir la propriété](https://analytics.google.com/analytics/web/#/a134175114p557166840/reports/intelligenthome).

Réglages enregistrés et relus dans Analytics :

- Mesures améliorées désactivées. Le site envoie les pages vues explicitement.
- Google Signals et collecte des données fournies par les utilisateurs désactivés.
- Collecte précise sur l’appareil et la zone géographique désactivée.
- Personnalisation publicitaire autorisée dans **0 des 307 régions**.
- Conservation des données utilisateur et des événements : **deux mois**, sans réinitialisation à chaque nouvelle activité. Les rapports agrégés ne sont pas soumis à cette durée.

La réception d’événements a été confirmée dans le rapport temps réel : un utilisateur actif et une page vue « Méthode · Preuve Publique », correspondant au test local après acceptation. Les événements `first_visit`, `session_start` et `page_view` apparaissent. Ce contrôle local ne prouve pas une collecte sur le site public, qui ne contient pas encore cette intégration.

## Activation du site

L’application lit `GA_MEASUREMENT_ID` **à l’exécution**, via `/api/analytics/config` (réponse sans cache). Aucun `NEXT_PUBLIC_…` ni identifiant injecté au build n’est nécessaire. Cette route ne renvoie que l’identifiant de mesure public, jamais les variables Supabase.

```dotenv
GA_MEASUREMENT_ID=G-PZD15S5KZ2
```

Cette valeur est configurée dans le `.env.local` ignoré par Git. `.env.example` contient uniquement le nom de la variable et une valeur vide.

Pour livrer :

1. Relire et livrer les changements web. Le checkout contient aussi un travail frontend antérieur à cette intervention ; déterminer le périmètre de livraison avant de fusionner.
2. Vérifier le service Cloud Run effectif, puis ajouter `GA_MEASUREMENT_ID` à ses variables d’exécution en préservant les variables et secrets existants. Le service documenté est `preuve-publique-git`, projet `preuve-publique`, région `europe-west1`. Cette configuration distante n’a pas été effectuée ici.
3. Contrôler la révision prête et son trafic, puis `/api/analytics/config` et `/confidentialite` sur `https://preuve-publique.fr`.
4. Dans un navigateur neuf, vérifier l’absence de requête Google Analytics avant tout choix et après refus ; accepter pour vérifier une page vue dans les rapports temps réel, puis retirer l’accord et vérifier l’arrêt de la collecte. Contrôler également une navigation publique vers `/admin`.

Si la variable est absente ou invalide, ou si la lecture de configuration échoue, Analytics reste bloqué. Le bouton du pied de page présente alors l’état désactivé. Aucune migration SQL n’est nécessaire.

## Choix de cookies

Le bandeau propose « Tout refuser » et « Tout accepter » avec la même présentation. Il ne bloque pas l’accès au site. « Gérer mes cookies » reste disponible dans le pied de page ; `/confidentialite` présente le responsable indiqué par le porteur du projet : la structure « preuve-publique » et ses responsables, contact `contact@preuve-publique.fr`.

Le choix versionné est conservé localement pendant **180 jours**, aussi bien pour un refus que pour un accord. Un choix absent, expiré ou invalide n’autorise aucune collecte. Une modification dans un autre onglet est prise en compte.

L’ancien choix du bandeau consacré au thème n’est pas un accord pour Analytics : un nouveau choix explicite est demandé. Lors de ce choix, l’ancienne préférence et son cookie sont supprimés. Le thème reste une préférence d’affichage demandée directement par le visiteur, indépendante de la mesure d’audience.

Le chargement de `gtag.js` et les commandes de mesure commencent uniquement après un accord valide : fonctionnement de type [Consent Mode de base](https://developers.google.com/tag-platform/security/concepts/consent-mode). Aucun ping de refus n’est envoyé à Google. Le retrait désactive la balise, supprime les cookies `_ga` / `_ga_…`, puis recharge la page pour décharger ses écouteurs. Les cookies de session Supabase restent distincts.

Les pages vues sont limitées aux écrans publics connus. Les recherches, fragments, identifiants de pièces, personnes, partis et thèmes sont retirés des URL et titres transmis ; les fiches sont regroupées par type d’écran. Les routes d’administration, d’authentification, d’API et les routes inconnues sont exclues. Les paramètres publicitaires restent refusés ; les cookies d’audience sont configurés à 180 jours sans prolongation automatique. Le mode de débogage Analytics est limité aux hôtes locaux.

Les principes de refus aussi simple que l’acceptation, de conservation du choix et de retrait accessible suivent les [recommandations de la CNIL sur les traceurs](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ). Cette intégration et sa politique décrivent le traitement configuré ; elles ne constituent pas une certification juridique générale du site.

## Parcours de relecture

- Navigation d’administration avec repère de la rubrique active.
- Onglets À relire / Relues / Publiées / Toutes et filtres par institution, type et recherche.
- Conservation des filtres et de la pagination lors de l’ouverture d’une fiche, de la lecture de ses pièces liées et du retour à la file.
- URL de retour limitée aux files internes de pièces ou rapprochements, avec reconstruction des paramètres autorisés.
- État vide adapté à la recherche ; une page dépassant le nombre de résultats offre un retour à la première page avec les mêmes filtres.
- Styles pour titres longs, contraste selon le thème, focus clavier et filtres sur petits écrans.

Les contrôles d’accès `admin_users`, RLS et transitions de revue existants sont conservés. Aucune pièce n’a été publiée ou modifiée pour vérifier ces parcours.

## Vérifications effectuées

- `npm run build` : réussi, TypeScript inclus.
- `npm run lint` : réussi.
- `npm run test:reader` : **20 tests réussis**, dont navigation de retour, validation et expiration du consentement, déclenchement du tag et retrait sans toucher à la session.
- `node --test ingestion/tests/admin.test.mjs` : **5 tests réussis**, couvrant la liste d’administration, RLS et les écritures autorisées dans PGlite.
- Navigateur local : aucun tag GA avant accord ou après refus conservé ; tag présent après accord ; retrait suivi du rechargement et absence du tag.
- Analytics temps réel : réception de la page vue « Méthode · Preuve Publique » issue du test local après acceptation.
- Parcours réel de relecture en lecture seule : 2 157 scrutins publiés du Sénat, page 2/44, ouverture et lien de retour préservant les filtres ; filtre vide et page 999 récupérables ; rubrique active correcte.

Le navigateur disponible n’a pas appliqué la taille mobile demandée. Les styles adaptatifs ont été relus, mais le rendu mobile n’est pas déclaré vérifié. Les contrôles du tag dans le navigateur local portent sur sa présence dans le DOM ; ils ne remplacent pas une inspection des requêtes réseau. Une confirmation de réception Analytics sur le domaine public reste nécessaire après livraison.
