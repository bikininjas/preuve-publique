# Instructions pour les agents — Preuve Publique

Ce fichier s'applique à tout le dépôt. Lisez le `README.md`, puis les fichiers concernés, avant de modifier le projet. Respectez les instructions de l'utilisateur en priorité.

## But du produit

Construire une base de traçabilité des positions politiques en France et dans l'Union européenne, à partir de 2017 : **programme → déclaration → texte/amendement → scrutin → résultat législatif → indicateur documenté** lorsque pertinent. Le public voit les pièces et leur contexte, sans score de cohérence, gagnant d'une comparaison ou verdict automatique. Même méthode pour tous les acteurs politiques.

## État réel et limites

- L'application est une base Next.js 16 déployable sur Cloud Run, avec Supabase gratuit. Le schéma SQL est préparé, mais son application à la base distante n'est pas acquise. Les imports et la comparaison ne sont pas encore implémentés.
- Ne jamais annoncer une source comme ingérée, un service comme déployé, une migration comme exécutée ou des données comme disponibles sans vérification effective.
- Privilégier une progression verticale : un petit ensemble de documents officiels correctement reliés et contrôlés avant d'étendre l'historique. Évaluer le volume et le coût avant un import massif.

## Exigences documentaires

1. Prioriser les sources primaires : Assemblée nationale, Sénat, Parlement européen, Légifrance, programmes originaux et professions de foi. Les données issues de médias doivent pointer vers la déclaration exacte et ses circonstances.
2. Pour chaque élément, conserver URL originale, institution ou éditeur, date, acteur si identifiable, repère précis dans la source (page, article, scrutin, horodatage), date de récupération et, si possible, empreinte du document. Conserver la formulation originale et distinguer citation et résumé.
3. Ne jamais inférer la position d'un élu à partir de son groupe. Distinguer pour, contre, abstention, non-participation et vote individuel non disponible. Un texte global, un amendement et une mesure particulière ne sont pas interchangeables.
4. Les rapprochements entre pièces ont une justification, une méthode, une confiance et un statut de revue. `related` signifie seulement qu'il existe un lien documentaire ; ce n'est pas « soutient », « contredit » ou « promesse trahie ». Les liens interprétatifs et les cas sensibles demandent une validation humaine avant publication.
5. Un résultat observé n'est pas automatiquement causé par un vote. Indiquer unité, période, couverture géographique, méthode et source de l'indicateur. Signaler les données absentes ou non comparables.
6. Les modèles locaux peuvent proposer des candidats au rapprochement hors ligne. Ne pas faire dépendre une visite du site d'une inférence payante ; ne jamais publier un verdict ou une accusation générés par modèle.

## Code et données

- Respecter la structure existante : `app/` pour l'interface, `lib/` pour l'accès aux données, `supabase/migrations/` pour le schéma, `Dockerfile` et `cloudbuild.yaml` pour la livraison.
- Garder les lectures publiques sous RLS et limitées aux lignes `published`. Toute table exposée par Supabase doit avoir une politique explicite ; aucune écriture anonyme ou via la clé publishable. Les migrations sont versionnées, testées puis appliquées séparément du build web.
- Avant toute migration distante, lire l'état actuel du schéma et de `supabase_migrations`. Ne pas écraser des tables existantes ou « réparer » l'historique à l'aveugle. Vérifier après exécution avec une requête ciblée.
- Prévoir pagination, index adaptés, imports incrémentaux, idempotence, provenance et reprise après erreur. Ne pas stocker tous les PDF ou transcriptions dans Postgres ; mesurer taille de base et transfert sortant sur Supabase Free.
- Pour l'interface publique, afficher la source accessible, la date et le niveau de certitude du rapprochement. Un état vide ou une erreur explicite vaut mieux qu'une fausse donnée d'exemple attribuée à une personne réelle.
- Exécuter au minimum `npm run build` pour les changements Next.js et une vérification ciblée pour les changements SQL ou d'ingestion. Ne pas ajouter de tests qui ne font que répéter l'implémentation.

## Sécurité et coûts

- Le dépôt est public. Aucun mot de passe, chaîne PostgreSQL avec identifiants, token, clé privilégiée, `.env.local`, clé de compte de service ou contenu d'un secret dans Git, une PR, une issue ou un log. `.env.example` ne contient que des noms de variables et des valeurs vides. Rechercher les fuites avant chaque push.
- `SUPABASE_URL` et `SUPABASE_PUBLISHABLE_KEY` sont configurées à l'exécution dans Cloud Run. `DB_PG_URL` ne doit jamais entrer dans le conteneur web. Utiliser des secrets de CI ou un gestionnaire de secrets pour les opérations privilégiées, sans les afficher.
- `cloudbuild.yaml` utilise les substitutions `_REGION`, `_AR_REPOSITORY` et `_SERVICE`. Vérifier leur valeur effective et la région du dépôt avant de déployer ; une substitution vide rend l'adresse de l'image invalide. Ne pas désactiver RLS ni attribuer des rôles IAM larges pour contourner une erreur sans comprendre sa cause.
- Objectif de coût : rester dans les quotas gratuits de Supabase, Cloud Build et Cloud Run. Zéro instance minimale, dimensionnement prudent, nettoyage des images, suivi des dépenses. Demander validation avant d'activer un service payant ou de lancer un traitement susceptible de dépasser ce budget.

## Travail dans Git

Créer une branche pour chaque changement cohérent, expliquer ce qui a changé et ce qui a été vérifié dans la PR. Garder la migration SQL distincte du déploiement web. Ne pas fusionner un changement qui prétend résoudre une erreur de production sans contrôler le symptôme ou expliquer la limite d'accès aux journaux.
