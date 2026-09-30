# Preuve Publique

**Suivre une position politique, de la parole aux actes, à partir des documents originaux.**

Preuve Publique est un projet citoyen consacré à la France et à l'Union européenne. Il rapproche les engagements des programmes, les déclarations sourcées, les propositions et amendements, les votes parlementaires et le devenir des textes. Chaque élément renvoie à sa source. Le site présente la chronologie et le contexte pour que le visiteur se fasse sa propre opinion ; il ne donne ni note de « cohérence », ni verdict automatique.

## Périmètre et méthode

La période de travail commence en 2017. La première couverture vise l'Assemblée nationale, le Sénat et le Parlement européen ; pour le droit français adopté, les dossiers législatifs de l'Assemblée nationale et les lois promulguées du Sénat, qui publient tous deux les références du Journal officiel (l'API Légifrance n'est pas utilisée : son compte est réservé en pratique au secteur public). Les programmes originaux et professions de foi complètent ces sources. Les déclarations médiatiques ne sont ajoutées que si l'enregistrement ou la transcription précise est accessible et vérifiable. Les collectivités locales ne font pas partie de la première version.

Une fiche documentaire doit indiquer la date, l'auteur ou l'institution quand ils sont connus, le document original, son URL et le repère utile (page, article, numéro de scrutin, horodatage). Un rapprochement entre une promesse et un vote est documenté et révisable : un vote contre un texte entier ne prouve pas une opposition à chacune de ses mesures. Un scrutin non nominatif ne révèle pas la position individuelle des élus. Le site distingue pour, contre, abstention, non-participation et position individuelle indisponible.

Les effets observés (statistiques publiques, application d'une loi) demandent leur propre source, leur période et leurs limites. La simple succession d'un vote et d'un indicateur ne démontre pas une causalité. Une comparaison de partis ou de personnalités est envisagée avec les mêmes règles documentaires pour tous.

## État du dépôt

Le dépôt contient une interface Next.js, un modèle SQL (`sources`, `actors`, `evidence`, `evidence_links`) avec politiques RLS et trois migrations (faits structurés `detail`, trace de relecture, recherche plein texte, journal `ingestion_runs`, correction des politiques de lecture), la logique serveur de lecture (`lib/`), les pipelines d'ingestion et l'outil de revue éditoriale (`ingestion/`), et une chaîne de construction pour Cloud Build et Cloud Run. La page d'accueil affiche jusqu'à 12 éléments **publiés** si la base est configurée. Elle affiche un état vide explicite sinon.

**Les trois migrations ont été appliquées au projet Supabase** (`pntkhwdosrvsdybzsicp`) : schéma, colonnes du pipeline et correction des politiques de lecture ; les politiques RLS ont été vérifiées en rôle `anon`. **La base ne contient encore aucune donnée importée.** Les importeurs ont été exercés sur les sources réelles (Assemblée nationale, Sénat, Parlement européen) et le chemin d'écriture complet vérifié sur un PostgreSQL local embarqué (PGlite) puis en `--dry-run` contre la base distante : insertion, idempotence, protection des pièces relues ou publiées, rattachements de références, politiques RLS, recherche plein texte. Aucun contenu politique d'exemple n'est présenté comme une donnée réelle.

## Ingestion et revue éditoriale

La logique d'import et de revue vit dans `ingestion/` ; voir `ingestion/README.md` pour le détail et les limites.

```bash
npm run ingest -- list
npm run ingest -- fetch an-scrutins --legislatures=15 --limit=300   # staging uniquement
npm run ingest -- push --staging ingestion/.staging/… --dry-run    # vérifie le SQL sans écrire
npm run ingest -- push --staging ingestion/.staging/… --yes        # nécessite DB_PG_URL
npm run ingest -- link                                             # rapprochements documentaires brouillons
npm run ingest -- review list --table=evidence --status=draft
npm run ingest -- measure                                          # volumes staging et base
npm run test:ingestion                                             # tests hors-ligne, PGlite inclus
```

Toute pièce importée naît au statut `draft` ; la publication exige une transition explicite avec un relecteur identifié. Un nouvel import n'écrase jamais une pièce relue ou publiée : un changement de source est signalé pour revue.

## Développement local

Prérequis : Node.js 22 et npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Variables utilisées par l'application :

| Variable | Usage |
|---|---|
| `SUPABASE_URL` | Adresse de l'API Supabase, côté serveur |
| `SUPABASE_PUBLISHABLE_KEY` | Clé publique Supabase, côté serveur dans cette application |
| `DB_PG_URL` | Réservée à d'éventuels outils de migration ou d'ingestion ; jamais nécessaire au frontend |

Les variables peuvent rester vides pour travailler sur l'interface : la page présente alors l'état vide. Le fichier `.env.local` est ignoré par Git. Ne placez aucun identifiant réel dans `.env.example`, les fichiers Markdown ou les journaux CI.

```bash
npm run build        # build Next.js et vérification TypeScript
npm run lint         # ESLint (config à la racine)
npm run test:ingestion
```

Le build produit une application Next.js `standalone` ; le `Dockerfile` l'exécute sur le port attendu par Cloud Run.

## Base de données

La migration initiale est dans `supabase/migrations/20260929000000_initial.sql` ; `20260930000000_backend_pipeline.sql` ajoute les faits structurés copiés des sources (`detail`), la trace de relecture (`reviewed_by`, `reviewed_at`), la recherche plein texte française et le journal privé `ingestion_runs` ; `20261001000000_fix_reference_policies.sql` corrige les politiques de lecture de `sources` et `actors` (un `id` non qualifié y était résolu vers la table interne, ce qui rendait ces tables invisibles au public — le bug a été trouvé par une lecture réelle en rôle `anon` et couvert par un test). La migration initiale crée des tables publiques accessibles **en lecture seule** aux rôles anonymes et authentifiés, avec RLS : seuls les éléments au statut `published` et leurs références admissibles sont visibles. Les écritures de l'ingestion doivent passer par une connexion de confiance distincte, jamais par la clé publiée au navigateur.

Avant de lancer cette migration sur un projet Supabase existant, inspecter le schéma et l'historique des migrations. Versionner chaque changement SQL, le relire et le tester localement avant `supabase db push`. Ne pas appliquer automatiquement la migration initiale depuis Cloud Build : le déploiement du site et l'évolution de la base sont deux opérations indépendantes.

## Déploiement Cloud Build → Cloud Run

Le fichier `cloudbuild.yaml` construit l'image avec le `Dockerfile`, la pousse dans Artifact Registry, puis déploie le service Cloud Run. Le projet Google Cloud et l'identifiant du build sont fournis par Cloud Build. Les substitutions par défaut sont :

| Substitution | Valeur par défaut | Signification |
|---|---|---|
| `_REGION` | `europe-west1` | Région du registre et du service |
| `_AR_REPOSITORY` | `preuvepublique` | Dépôt Docker Artifact Registry |
| `_SERVICE` | `preuve-publique` | Service Cloud Run |

Si le registre est dans une autre région, modifier `_REGION` dans le déclencheur. Ne pas définir de substitution vide : elle peut écraser la valeur par défaut et rendre l'adresse de l'image invalide.

Créer un déclencheur Cloud Build relié à `bikininjas/preuve-publique`, sur les push vers `master`, avec `cloudbuild.yaml` et un compte de service autorisé à écrire dans Artifact Registry et à déployer Cloud Run. Le conteneur doit recevoir `SUPABASE_URL` et `SUPABASE_PUBLISHABLE_KEY` **dans la configuration d'exécution Cloud Run**. Aucune chaîne PostgreSQL ni clé privilégiée n'est nécessaire au service web. Le service est destiné à être public (`--allow-unauthenticated`).

La configuration initiale utilise zéro instance minimale et deux instances maximales. Cette limite ne garantit pas une facture nulle. Vérifier les quotas gratuits et configurer des alertes de budget ; nettoyer les anciennes images du registre. Supabase Free impose de limiter les données conservées : stocker les métadonnées et de courts extraits, garder les PDF originaux chez leurs éditeurs lorsque possible, mesurer avant tout import historique massif.

## Contribuer

Lire [AGENTS.md](AGENTS.md) avant de modifier les données, la méthode ou le déploiement. Les corrections factuelles doivent conserver un historique de la source et du motif du changement. Aucune accusation, conclusion politique ou correspondance incertaine ne doit être publiée automatiquement.
