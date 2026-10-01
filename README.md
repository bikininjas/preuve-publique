# Preuve Publique

**Voir ce que les acteurs politiques annoncent, votent et produisent — avec les documents originaux.**

Preuve Publique est un projet citoyen consacré à la France et à l'Union européenne. Son point d'entrée est le scrutin officiel : retrouver le sujet d'un vote, les positions publiées, les acteurs concernés et le texte exact. Le projet veut aussi rapprocher les programmes électoraux et déclarations médiatiques des décisions parlementaires, suivre les effets documentés des politiques publiques, montrer les inégalités et contextualiser les affaires judiciaires. Chaque élément renvoie à sa source. Le site présente les faits et leurs limites pour que le visiteur se fasse sa propre opinion ; il ne donne ni note de « cohérence », ni verdict automatique.

## Cap éditorial

- **Scrutins compréhensibles** : supprimer dans l'interface le préfixe technique ajouté par l'importeur, conserver l'intitulé officiel et le numéro sur la fiche, puis regrouper les pièces par rubriques traçables. Une rubrique désigne un sujet, jamais un sens de vote.
- **Partis et groupes** : analyser Assemblée nationale, Sénat et Parlement européen selon les données effectivement disponibles. Les votes de groupe ne sont attribués à un parti que si son lien avec ce groupe est daté et sourcé. Une position de groupe ne vaut pas vote individuel.
- **Parole et actes** : mettre les citations exactes d'un programme ou d'une déclaration face au scrutin portant sur la même mesure, avec le contexte du texte et les motifs publics du vote. Toute divergence proposée demande une justification et une relecture humaine avant publication.
- **Effets distributifs et inégalités** : documenter les populations susceptibles de bénéficier ou de pâtir d'une mesure avec des études d'impact ou indicateurs publics, unité, période, territoire, hypothèses et limites. Ne pas déduire un effet causal d'un seul vote.
- **Indicateurs comparables** : présence aux scrutins, répartition des votes et présence médiatique demandent une période, un dénominateur et un corpus précis ; aucun taux n'est affiché sans ces éléments.
- **Affaires judiciaires** : distinguer personne, parti et procédure ; dater enquête, poursuite, décision et recours, avec sources et présomption d'innocence. Aucun catalogue judiciaire n'est encore présent dans le modèle de données.

L'interface met ces objectifs en évidence sans remplir les manques par des chiffres ou accusations d'exemple. Les chantiers sans données vérifiées apparaissent explicitement comme tels sur `/observatoire`.

## Périmètre et méthode

La période de travail commence en 2017. La première couverture vise l'Assemblée nationale, le Sénat et le Parlement européen ; pour le droit français adopté, les dossiers législatifs de l'Assemblée nationale et les lois promulguées du Sénat, qui publient tous deux les références du Journal officiel (l'API Légifrance n'est pas utilisée : son compte est réservé en pratique au secteur public). Les programmes originaux et professions de foi complètent ces sources. Les déclarations médiatiques ne sont ajoutées que si l'enregistrement ou la transcription précise est accessible et vérifiable. Les collectivités locales ne font pas partie de la première version.

Une fiche documentaire doit indiquer la date, l'auteur ou l'institution quand ils sont connus, le document original, son URL et le repère utile (page, article, numéro de scrutin, horodatage). Un rapprochement entre une promesse et un vote est documenté et révisable : un vote contre un texte entier ne prouve pas une opposition à chacune de ses mesures. Un scrutin non nominatif ne révèle pas la position individuelle des élus. Le site distingue pour, contre, abstention, non-participation et position individuelle indisponible.

Les effets observés (statistiques publiques, application d'une loi) demandent leur propre source, leur période et leurs limites. La simple succession d'un vote et d'un indicateur ne démontre pas une causalité. Une comparaison de partis ou de personnalités est envisagée avec les mêmes règles documentaires pour tous.

## État du dépôt

Le dépôt contient une interface Next.js — site public et espace de relecture —, un modèle SQL (`sources`, `actors`, `actor_relations`, `evidence`, `evidence_links`, `admin_users`, colonne `topics`) avec politiques RLS et sept migrations (faits structurés `detail`, trace de relecture, recherche plein texte, journal `ingestion_runs`, listes d'administration et transitions de revue, liens datés entre acteurs — appartenances de groupe et affiliations déclarées à un parti —, puis rubriques par pièce avec comptage public), la logique serveur de lecture (`lib/`), les pipelines d'ingestion et l'outil de revue éditoriale (`ingestion/`), et une chaîne de construction pour Cloud Build et Cloud Run. Le site public affiche les pièces **publiées** : accueil, liste paginée (filtres type/institution/rubrique, recherche plein texte française), page des rubriques et liste par rubrique, fiche détaillée avec provenance, positions des groupes publiées par l'Assemblée nationale et rapprochements documentaires, page de méthode. L'espace `/admin` gère la relecture et la publication. Sans variables Supabase, chaque page affiche un état vide explicite.

**Les sept migrations ont été appliquées au projet Supabase** (`pntkhwdosrvsdybzsicp`) : schéma, colonnes du pipeline, correction des politiques de lecture, espace de relecture (liste `admin_users`, lectures d'administration, transitions de statut), liens datés entre acteurs (`actor_relations`), puis rubriques par pièce (`topics`, comptage public par rubrique et lecture des groupes nommés par un vote publié), et indice de conformité documentaire pour les publications automatiques ; les politiques RLS ont été vérifiées en rôle `anon`, et les droits vérifiés par requêtes ciblées (`has_function_privilege`, `has_column_privilege`, `pg_policies`) après application. **La base contient les données importées : 20 407 pièces**, **2 241 acteurs** (63 groupes parlementaires, 58 partis et 2 120 personnes du référentiel de l'Assemblée nationale), **11 380 liens d'acteur datés**, **3 797 liens documentaires candidats**, 20 sources, environ **71 Mo** mesurés, dont **30 rubriques** portées par 2 278 pièces.

**3 674 pièces sont publiées (01/10/2026)** : les **666 lois promulguées du Sénat**, les **2 157 scrutins publics du Sénat** et les **801 scrutins de l'Assemblée nationale portant sur l'ensemble d'un texte**. Elles l'ont été après un **contrôle technique de conformité à la source** — réimport du fichier officiel conservé (empreinte SHA-256 enregistrée) et comparaison pièce par pièce : 3 624 conformes, aucun écart ; 50 scrutins supplémentaires ont été publiés le 01/10/2026 par le pipeline automatique (archive officielle, SHA-256 et ligne en base recoupés, indice documentaire 0,990) — et **non** après une relecture humaine pièce par pièce : la trace enregistrée sur chaque ligne est « contrôle technique de conformité (passage de développement) ». **Les 16 733 autres pièces restent en brouillon et invisibles** ; les acteurs ne deviennent lisibles qu'à travers une pièce publiée qui les porte (42 groupes aujourd'hui) ; aucun rapprochement interprétatif n'est publié. Le contrôle automatique est limité aux scrutins officiels de l'Assemblée ; programmes, déclarations, interprétations et affaires judiciaires restent soumis à une revue humaine. Les importeurs ont été exercés sur les sources réelles et le chemin d'écriture vérifié sur un PostgreSQL local embarqué (PGlite) puis contre la base distante : insertion, idempotence, protection des pièces relues ou publiées, rattachements de références, propagation des rubriques, politiques RLS, recherche plein texte, et politiques de revue (adresse autorisée, adresse refusée, adresse désactivée). Aucun contenu politique d'exemple n'est présenté comme une donnée réelle.

**La connexion Google est configurée et exercée de bout en bout en local** (30/09/2026) : le client OAuth « Preuve Publique (site web) » existe dans le projet Google Cloud `preuve-publique` (origine JavaScript `http://localhost:3000`, redirection autorisée `https://pntkhwdosrvsdybzsicp.supabase.co/auth/v1/callback`), le fournisseur Google est activé dans le projet Supabase (`"google": true` vérifié sur `/auth/v1/settings`), et une connexion réelle a été déroulée : Google → Supabase → `/admin`, session ouverte sur `sebpicot@gmail.com`, compteurs et files de relecture lus à travers RLS, puis une transition `brouillon → relu → brouillon` exécutée et annulée pour vérifier le chemin d'écriture (base revenue à 20 407 brouillons, aucune trace de relecture). Restent à faire : déployer le site, puis ajouter l'adresse publique aux URL de redirection autorisées (Supabase et Google Cloud).

## Site public et espace de relecture

| Adresse | Contenu |
|---|---|
| `/` | accueil : méthode en trois temps, dernières pièces publiées |
| `/scrutins` | scrutins publiés, recherche et filtre par institution ; intitulé abrégé, numéro et source officielle |
| `/groupes` | groupes parlementaires visibles dans les pièces publiées ; distinction explicite avec les partis |
| `/groupes/<id>` | scrutins publiés où un groupe de l'Assemblée figure, avec sa position majoritaire et les voix publiées |
| `/observatoire` | état des chantiers parole/vote, inégalités, indicateurs et affaires judiciaires, sans données inventées |
| `/pieces` | liste paginée des pièces publiées, filtres type/institution, recherche plein texte |
| `/pieces/<id>` | fiche : extrait cité, provenance complète (source, repère, empreinte, date de récupération), faits structurés, rubriques, positions des groupes publiées par l'institution, rapprochements documentaires |
| `/categories` | rubriques publiées par les sources, avec le nombre de pièces |
| `/categories/<rubrique>` | pièces publiées portant cette rubrique, paginées |
| `/methode` | méthode, sources officielles et limites assumées |
| `/admin` | atelier de relecture : compteurs, accès aux files et journal d'ingestion |
| `/admin/review` | file des pièces : brouillon → relu → publié, retour d'un cran, relecteur enregistré |
| `/admin/links` | file des rapprochements, mêmes transitions |
| `/admin/runs` | passages d'ingestion (options, volumes, résultat) |
| `/admin/publication` | règle automatique, indice de conformité et compteur |

L'authentification passe par Google (Supabase Auth), restreinte par la table `admin_users` — deux adresses actives aujourd'hui : `sebpicot@gmail.com` et le compte technique de débogage local `debug-admin@preuve-publique.local` (voir plus bas). Aucune clé privilégiée n'est utilisée par le site : les écritures de revue passent par la clé publishable, en rôle `authenticated`, et la base refuse tout si l'adresse n'est pas dans la liste (politiques décrites dans `supabase/migrations/20261002000000_admin_review.sql`). La session est rafraîchie par `proxy.ts` (Next.js 16 : l'ancien `middleware.ts`), et seules les colonnes de statut et de trace de relecture sont inscriptibles par l'API : le contenu des pièces reste écrit par les importeurs.

Limite assumée : les revendications du jeton ne sont relues qu'à son renouvellement. Désactiver une adresse (`update public.admin_users set active = false ...`) ferme donc l'accès au plus tard à l'expiration du jeton d'accès (1 h par défaut) ; supprimer la ligne n'invalide pas un jeton déjà émis.

### Compte technique de débogage local (30/09/2026)

Pour déboguer l'espace de relecture sans repasser par la connexion Google (clé d'accès), un compte technique existe : `debug-admin@preuve-publique.local`. Il a été créé par insertion SQL directe dans `auth.users` (+ `auth.identities`, e-mail confirmé, mot de passe en bcrypt via `crypt()`/`gen_salt('bf')`), puis inscrit dans `public.admin_users` avec la note « compte technique de débogage local ». Sa connexion mot de passe a été vérifiée contre l'API réelle (`POST /auth/v1/token?grant_type=password` → 200, jeton `authenticated`).

- **Le mot de passe n'existe que dans `.env.local`** (ignoré par Git), sous `DEV_ADMIN_EMAIL` / `DEV_ADMIN_PASSWORD` ; il n'est pas dans ce dépôt, ni dans un journal, ni dans ce README.
- **Utilisation** : `npm run dev`, ouvrir `/admin/login`, bouton « Connexion locale (débogage) » → `POST /auth/dev` ouvre une session puis renvoie vers `/admin`.
- **Elle n'existe qu'hors production** : la route répond 404 quand `NODE_ENV=production` et le bouton n'est pas rendu — vérifié en lançant `next start` et en contrôlant les deux (404, bouton absent). Elle n'accepte que `POST`, refuse un envoi venu d'un autre site (`Sec-Fetch-Site`), n'utilise que la clé publishable et suit les mêmes politiques RLS et la même liste `admin_users` que Google.
- **Fermer l'accès** : `update public.admin_users set active = false where email = 'debug-admin@preuve-publique.local';` (effet au plus tard à l'expiration du jeton) ou supprimer la ligne correspondante dans `auth.users` pour retirer le compte.
- Limite : le compte vit dans le même projet Supabase que les autres données (il n'y a pas de base locale séparée) ; ce qui le cantonne au poste de travail, c'est le mot de passe resté dans `.env.local` et le garde-fou `NODE_ENV`.

### Mise en service de la connexion Google (faite en local — servir de référence)

Ces étapes ont été exécutées le 30/09/2026 pour `localhost:3000` ; elles restent la référence pour un nouvel environnement ou pour la production :

1. **Console Google Cloud** → *Google Auth Platform* → *Clients* → créer un client OAuth de type **Web application**. Origines JavaScript autorisées : l'adresse publique du site et `http://localhost:3000`. URI de redirection autorisée : `https://<project-ref>.supabase.co/auth/v1/callback` (l'adresse exacte est affichée sur la page du fournisseur Google du tableau de bord Supabase).
2. **Tableau de bord Supabase** → *Authentication* → *Providers* → **Google** : activer, coller l'identifiant client et le secret.
3. **Supabase** → *Authentication* → *URL Configuration* : *Site URL* = adresse publique du site ; *Redirect URLs* : `<adresse publique>/auth/callback` et `http://localhost:3000/auth/callback`.
4. Vérifier : ouvrir `/admin`, se connecter avec Google, valider une pièce, contrôler qu'elle apparaît sur `/pieces`.

Les variables d'exécution du service web restent `SUPABASE_URL` et `SUPABASE_PUBLISHABLE_KEY` (aucune clé supplémentaire n'est nécessaire : l'identifiant et le secret Google vivent dans la configuration du projet Supabase). Les valeurs `GGL_OAUTH_CLIENT_ID` / `GGL_OAUTH_CLIENT_SECRET` d'un `.env.local` ne sont **pas lues par l'application** — ce sont des valeurs de passage vers le tableau de bord ; elles ne doivent jamais être commitées, et peuvent être supprimées une fois le fournisseur activé.

## Ingestion et revue éditoriale

La logique d'import et de revue vit dans `ingestion/` ; voir `ingestion/README.md` pour le détail et les limites. Les transitions de statut se font aussi, sans ligne de commande, depuis l'espace `/admin` du site.

```bash
npm run ingest -- list
npm run ingest -- fetch an-scrutins --legislatures=15 --limit=300   # staging uniquement
npm run ingest -- fetch an-referentiel                              # groupes, partis, mandats (staging uniquement)
npm run ingest -- push --staging ingestion/.staging/… --dry-run    # vérifie le SQL sans écrire
npm run ingest -- push --staging ingestion/.staging/… --yes        # nécessite DB_PG_URL
npm run ingest -- link                                             # rapprochements documentaires brouillons
npm run ingest -- topics                                           # rubriques héritées par les scrutins d'un même dossier
npm run ingest -- review list --table=evidence --status=draft
npm run ingest -- measure                                          # volumes staging et base
npm run test:ingestion                                             # tests hors-ligne, PGlite inclus
```

Toute pièce importée naît au statut `draft` ; la publication exige une transition explicite avec un relecteur identifié. Un nouvel import n'écrase jamais une pièce relue ou publiée : un changement de source est signalé pour revue. Ces transitions se font depuis l'espace `/admin` (le relecteur enregistré est l'adresse Google connectée) ou depuis la CLI (`npm run ingest -- review set`) ; les deux chemins suivent le même graphe et les mêmes règles, vérifiés par les tests PGlite.

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
| `DEV_ADMIN_EMAIL` / `DEV_ADMIN_PASSWORD` | Connexion technique locale de l'espace de relecture ; ignorées en production (voir « Compte technique de débogage local ») |

Les variables peuvent rester vides pour travailler sur l'interface : la page présente alors l'état vide. Le fichier `.env.local` est ignoré par Git. Ne placez aucun identifiant réel dans `.env.example`, les fichiers Markdown ou les journaux CI. Avec de vraies valeurs `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` et le fournisseur Google activé pour `http://localhost:3000/auth/callback`, l'espace de relecture fonctionne aussi en local sur `/admin`, et la connexion technique locale évite d'avoir à repasser par Google.

```bash
npm run build        # build Next.js et vérification TypeScript
npm run lint         # ESLint (config à la racine)
npm run test:ingestion
```

Le build produit une application Next.js `standalone` ; le `Dockerfile` l'exécute sur le port attendu par Cloud Run.

## Base de données

La migration initiale est dans `supabase/migrations/20260929000000_initial.sql` ; `20260930000000_backend_pipeline.sql` ajoute les faits structurés copiés des sources (`detail`), la trace de relecture (`reviewed_by`, `reviewed_at`), la recherche plein texte française et le journal privé `ingestion_runs` ; `20261001000000_fix_reference_policies.sql` corrige les politiques de lecture de `sources` et `actors` (un `id` non qualifié y était résolu vers la table interne, ce qui rendait ces tables invisibles au public — le bug a été trouvé par une lecture réelle en rôle `anon` et couvert par un test) ; `20261002000000_admin_review.sql` ajoute la liste d'administration `admin_users`, les lectures d'administration (tous les statuts, journal d'ingestion) et les transitions de revue, limitées aux colonnes `status`, `reviewed_by` et `reviewed_at`, avec relecteur obligatoire hors brouillon ; `20261003000000_actor_relations.sql` ajoute `actor_relations` (liens datés entre acteurs : `member_of`, `affiliated_to`, `coalition_of`), lisibles publiquement seulement si **les deux** acteurs reliés le sont, et sans statut de relecture — ce sont des mandats recopiés d'un référentiel institutionnel, pas une interprétation ; `20261004000000_evidence_topics.sql` ajoute la colonne `topics` (rubriques publiées par la source, héritées par dossier le cas échéant), son comptage public (`published_topic_counts()`, fonction `security invoker`) et la lecture publique des **groupes nommés dans un vote publié** — un groupe n'existe publiquement que par la pièce qui publie sa position. La migration initiale crée des tables publiques accessibles **en lecture seule** aux rôles anonymes et authentifiés, avec RLS : seuls les éléments au statut `published` et leurs références admissibles sont visibles. Les écritures de l'ingestion doivent passer par une connexion de confiance distincte, jamais par la clé publiée au navigateur.

La migration `20261001052438_publication_confidence.sql` ajoute l'indice de conformité documentaire, la méthode et les contrôles de publication automatique. Elle a été enregistrée sur le projet Supabase sous la version `20261001052438` ; les colonnes ne sont pas modifiables par `authenticated` ou `anon`.

Note d'historique : la base distante enregistre la troisième migration sous le jeton `20260930063114` alors que le fichier local s'appelle `20261001000000_fix_reference_policies.sql` — divergence antérieure à l'espace de relecture, à garder en tête avant un `supabase db push`. L'état réel de la base a été relu par requêtes directes (`pg_policies`, `has_function_privilege`, `has_column_privilege`) avant et après chaque application, plutôt que de « réparer » l'historique à l'aveugle.

Avant de lancer cette migration sur un projet Supabase existant, inspecter le schéma et l'historique des migrations. Versionner chaque changement SQL, le relire et le tester localement avant `supabase db push`. Ne pas appliquer automatiquement la migration initiale depuis Cloud Build : le déploiement du site et l'évolution de la base sont deux opérations indépendantes.

## Déploiement Cloud Build → Cloud Run

Le fichier `cloudbuild.yaml` construit l'image avec le `Dockerfile`, la pousse dans Artifact Registry, puis déploie le service Cloud Run. Le projet Google Cloud et l'identifiant du build sont fournis par Cloud Build. Les substitutions par défaut sont :

| Substitution | Valeur par défaut | Signification |
|---|---|---|
| `_REGION` | `europe-west1` | Région du registre et du service |
| `_AR_REPOSITORY` | `preuvepublique` | Dépôt Docker Artifact Registry |
| `_SERVICE` | `preuve-publique` | Service Cloud Run |

Si le registre est dans une autre région, modifier `_REGION` dans le déclencheur. Ne pas définir de substitution vide : elle peut écraser la valeur par défaut et rendre l'adresse de l'image invalide.

État vérifié du projet Google Cloud `preuve-publique` (30/09/2026) : les API Cloud Run, Cloud Build, Artifact Registry et Container Registry sont activées ; le dépôt Artifact Registry `preuvepublique` existe en `europe-west1` ; un service Cloud Run nommé `preuve-publique-git` existe dans la même région, mais il sert encore le conteneur « placeholder » de Cloud Run — **l'application n'a encore jamais été déployée** ; aucun déclencheur Cloud Build n'existe.

Trois points à trancher avant le premier déploiement :

1. **Nom du service** : `preuve-publique` (valeur par défaut de `_SERVICE`, recommandée) ou le service existant `preuve-publique-git` (adapter alors `_SERVICE` ou déployer explicitement sur ce nom).
2. **Variables d'exécution** : le service doit recevoir `SUPABASE_URL` et `SUPABASE_PUBLISHABLE_KEY` (ligne `--set-env-vars` à ajouter à `cloudbuild.yaml` ou à la commande de déploiement) ; sans elles, le site affiche son état vide explicite.
3. **Déclencheur Cloud Build** : à créer (voir ci-dessous).

Créer un déclencheur Cloud Build relié à `bikininjas/preuve-publique`, sur les push vers `master`, avec `cloudbuild.yaml` et un compte de service autorisé à écrire dans Artifact Registry et à déployer Cloud Run. Le conteneur doit recevoir `SUPABASE_URL` et `SUPABASE_PUBLISHABLE_KEY` **dans la configuration d'exécution Cloud Run**. Aucune chaîne PostgreSQL ni clé privilégiée n'est nécessaire au service web. Le service est destiné à être public (`--allow-unauthenticated`).

La configuration initiale utilise zéro instance minimale et deux instances maximales. Cette limite ne garantit pas une facture nulle. Vérifier les quotas gratuits et configurer des alertes de budget ; nettoyer les anciennes images du registre. Supabase Free impose de limiter les données conservées : stocker les métadonnées et de courts extraits, garder les PDF originaux chez leurs éditeurs lorsque possible, mesurer avant tout import historique massif.

## Contribuer

Lire [AGENTS.md](AGENTS.md) avant de modifier les données, la méthode ou le déploiement. Les corrections factuelles doivent conserver un historique de la source et du motif du changement. Aucune accusation, conclusion politique ou correspondance incertaine ne doit être publiée automatiquement.
