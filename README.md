# Preuve Publique

Application de traçabilité des positions politiques en France et dans l’Union européenne. Programmes, déclarations, textes, amendements, votes et résultats législatifs renvoient aux sources originales, sans verdict politique.

## Démarrer

1. `npm ci`
2. Copier `.env.example` vers `.env.local` et renseigner les variables publiques. `DB_PG_URL` est réservée aux scripts locaux ou CI ; elle n’est jamais utilisée par l’interface.
3. `npm run dev`

Sans configuration Supabase, l’interface affiche un état vide explicite. Avec Supabase, appliquer la migration `supabase/migrations/20260929000000_initial.sql` après revue du projet existant. Publier des éléments uniquement après vérification humaine.

## Hébergement : Cloud Build et Cloud Run

`Dockerfile` construit une image Next.js `standalone`, exécutée par un utilisateur non privilégié sur le port `8080`. `cloudbuild.yaml` construit l’image, la pousse dans Artifact Registry et déploie Cloud Run. Aucun identifiant ou nom de projet Google Cloud n’est présent dans ces fichiers ; Cloud Build fournit `$PROJECT_ID` et `$BUILD_ID`.

À configurer une fois dans ton projet Google Cloud : activer Cloud Build, Artifact Registry et Cloud Run ; créer un dépôt Docker Artifact Registry ; connecter GitHub à Cloud Build ; créer un déclencheur sur `master` pointant vers `cloudbuild.yaml`, avec les substitutions `_REGION` (région commune au registre et au service), `_AR_REPOSITORY` (nom du dépôt Docker) et `_SERVICE` (nom du service Cloud Run). Le compte de service du build doit pouvoir écrire dans Artifact Registry, déployer Cloud Run et agir comme le compte de service d’exécution. Ne pas déposer de clé de compte de service dans le dépôt.

Configurer `SUPABASE_URL` et `SUPABASE_PUBLISHABLE_KEY` comme variables **d’exécution** du service Cloud Run, pas comme arguments de construction de l’image. La page est rendue sur le serveur à la requête et lit au maximum 12 lignes publiées. `DB_PG_URL` n’est jamais requise par le frontend. Pour rendre le site public, le déploiement utilise `--allow-unauthenticated` ; certaines organisations interdisent cette autorisation par une politique IAM.

Paramètres de coût initiaux : 0 instance minimale, 2 maximales, facturation Cloud Run à la requête (valeur par défaut). Surveiller aussi le stockage des anciennes images dans Artifact Registry, les journaux et le transfert réseau. Un plafond d’instances ne fixe pas un plafond de facturation ; configurer un budget et des alertes Google Cloud avant le premier déploiement.

Le projet Supabase est sur l’offre gratuite : concevoir les imports pour rester sous 500 Mo de base, 5 Go de transfert sortant et 1 Go de stockage de fichiers. Conserver dans Postgres seulement les métadonnées et de courts extraits vérifiés ; référencer les originaux institutionnels par URL et empreinte plutôt que stocker tous les PDF et débats. Ne pas importer l’ensemble des documents depuis 2017 avant d’avoir mesuré leur taille. Les projets gratuits peuvent être mis en pause après une semaine d’inactivité.

Les migrations restent versionnées dans `supabase/migrations`. Après revue, les appliquer avec la CLI Supabase ; ne jamais copier le mot de passe ou la connexion PostgreSQL dans Git. Automatiser `supabase db push` depuis GitHub Actions uniquement après avoir vérifié l’état existant de la base et rangé les identifiants dans les secrets du dépôt.

Le modèle initial contient `sources`, `actors`, `evidence` et `evidence_links`. Le type de lien `related` ne signifie pas « soutient » ou « contredit ». Les imports officiels, la comparaison et la modération sont les prochains lots ; ce schéma seul n’importe aucune donnée.

Le dépôt est public. Ne jamais ajouter la connexion PostgreSQL ni un `.env.local`. Vérifier `git diff --cached` avant chaque commit.
