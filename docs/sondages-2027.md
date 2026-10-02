# Sondages de la présidentielle 2027

## Décisions

Les sondages sont des mesures publiées d’intentions de vote, pas des scrutins officiels, des programmes ni des liens interprétatifs. Ils sont donc stockés dans un modèle dédié (`polls`, `poll_scenarios`, `poll_results`) plutôt que dans `evidence`. L’import réutilise `ingestion/lib/csv.mjs`, le téléchargement avec reprises, la connexion PostgreSQL, les transactions et le journal privé `ingestion_runs`. La lecture web utilise uniquement la clé publishable, des RPC **security invoker** et RLS. Aucun secret PostgreSQL n’entre dans Cloud Run.

La hiérarchie est **sondage → tour → configuration locale → résultats des candidats**. La clé unique du sondage est `(source_provider, external_id)`, celle de la configuration `(poll_id, round, scenario_number)`, celle du résultat `(scenario_id, candidate_external_id)`. Une ligne de CSV n’est jamais comptée comme un sondage.

Le fournisseur est `sondax`, y compris lorsqu’un téléchargement passe par le miroir data.gouv.fr. `dataset_url` conserve le point d’entrée réellement utilisé ; `final_url` du téléchargement est aussi enregistré dans le journal. `source_url` garde **exactement** `url_source` du CSV ; `source_origin` conserve `wikipedia` ou `manuel`, `wikipedia_revision` la révision signalée. `sample_size` peut être absent : le CSV réel contient des sondages sans échantillon total. Cette absence reste `null`, jamais zéro. La base de configuration est indépendante du total.

## Source et licence

- CSV : https://sondax.fr/donnees/sondages-presidentielle-2027.csv
- Documentation : https://sondax.fr/donnees.html
- Miroir : https://www.data.gouv.fr/api/1/datasets/r/6b97e100-6031-42e0-9c93-aeb9dd49ef0d
- Attribution : **Données : Sondax, d’après Wikipédia**, avec lien https://sondax.fr/
- Données et adaptations : **CC BY-SA 4.0**, https://creativecommons.org/licenses/by-sa/4.0/

Le 02/10/2026, le CSV téléchargé contient 33 sondages, 214 configurations et 1 702 résultats, du 26/02 au 29/09/2026. Ces volumes décrivent ce fichier, pas automatiquement l’état déployé. Le frontend ne contacte jamais Sondax. Le site précise que les valeurs sont rapportées par Sondax et que chaque notice n’a pas été revérifiée indépendamment.

## Migration

`supabase/migrations/20261002061929_presidential_polls.sql` a été généré avec `supabase migration new presidential_polls`, puis son nom a été aligné sur la version réellement enregistrée par Supabase lors de l’application explicite (`20261002061929`). Il ajoute les trois tables de mesure, `poll_revisions` et `poll_sync_state`, leurs contraintes et index, ainsi que `poll_list` et `poll_options`.

Toutes les tables ont RLS. Le public ne lit que les sondages `published` et leurs enfants ; `poll_sync_state` n’est visible que pour un fournisseur avec un sondage publié. Les révisions sont privées, lisibles par les administrateurs via `is_admin()`. `anon` et `authenticated` n’ont **aucun droit d’écriture** sur ces tables. Le journal existant reste privé.

Appliquer séparément du build, **après** inspection du schéma et de `supabase_migrations.schema_migrations`. L’historique contient déjà des versions jusqu’à `20261009000000` alors que cette migration est datée du jour courant. La divergence historique `fix_reference_policies` reste également présente. Ne pas lancer aveuglément `supabase db push` ; appliquer ce fichier explicitement par l’outil de migration et vérifier ensuite tables, RLS, privilèges et RPC. Les tests PGlite exécutent le SQL réel avant toute application distante.

## Synchronisation manuelle

Node.js **22.18+**, dépendances installées avec `npm ci`. `DB_PG_URL` reste dans `.env.local` ignoré par Git ou un gestionnaire de secrets d’un environnement d’ingestion.

```bash
npm run polls:sync -- --dry-run       # téléchargement + validation, sans connexion DB
npm run polls:sync -- --yes           # synchronise ; les nouveaux sondages restent draft
npm run polls:sync -- --yes --publish # rend publiques les mesures après les contrôles automatiques
```

`--publish` est une décision explicite de publication de mesures descriptives recopiées, pas une validation indépendante de la méthodologie de chaque institut. Les sondages déjà publiés sont actualisés si leurs valeurs changent et si la liste de candidats reste identique ; l’ancienne version normalisée demeure dans `poll_revisions`. La date de première importation et les identifiants restent stables.

Une relance inchangée n’écrit ni les mesures ni de nouvelles révisions. Elle met à jour l’état de synchronisation et crée une trace de passage. Le script indique `added`, `modified`, `unchanged`, `published`, `retained`, le nombre de configurations/résultats effectivement écrits et les avertissements. L’administration retrouve les passages `polls:sondax` dans `/admin/runs`.

## Automatisation

`.github/workflows/polls-sync.yml` prévoit un passage quotidien à **05:23 UTC** (07:23 en France métropolitaine en été, 06:23 en hiver) et un lancement manuel GitHub Actions. Le lancement manuel contrôle seulement le CSV par défaut (`dry_run: true`). Le passage planifié lance `--yes --publish` après les tests hors ligne.

Conditions d’activation : workflow présent sur la branche par défaut, GitHub Actions autorisé et secret de dépôt **`POLLS_DB_PG_URL`** configuré. L’existence du fichier sur une branche de travail ne signifie pas que la synchronisation est active. Le workflow n’applique **aucune migration** et ne déploie pas Cloud Run. Il échoue explicitement si le secret ou le schéma est absent. Aucun Cloud Scheduler ni service Google payant supplémentaire n’est créé. Vérifier le quota Actions si le dépôt change de visibilité ou de facturation.

Le groupe de concurrence GitHub et un verrou consultatif PostgreSQL empêchent les imports concurrents, y compris entre la commande locale et Actions. Le journal commence avant le téléchargement. Un échec réseau/CSV laisse les mesures et la dernière date de succès inchangées. Une erreur SQL annule tout le lot ; le journal conserve l’échec sans inclure d’erreur brute pouvant contenir un identifiant de connexion.

## Contrôles et conservation

Le parseur est strict : UTF-8, BOM, CSV avec virgules/guillemets/retours de ligne, colonnes attendues exactement (ordre libre), nombre de champs, dates réelles et ordonnées, institut et candidat non vides, tours 1/2, configurations positives, scores numériques entre 0 et 100, échantillons positifs ou absents, métadonnées cohérentes dans un sondage et une configuration, URL HTTP(S) sans identifiants, révision Wikipédia obligatoire pour une ligne `wikipedia`, absence de doublons.

Un changement de schéma du CSV produit une **erreur explicite**, sans masquer le changement par un miroir plus ancien. Le miroir sert en cas d’échec de transport ou réponse HTML/JSON/PDF ; un Content-Type absent ou générique n’empêche pas la validation du contenu. Limites : 8 Mio et 100 000 lignes. Un second tour exige exactement deux candidats. La somme de chaque configuration doit rester proche de 100 % (tolérance `max(2, nombre de candidats × 0,5)` points pour les arrondis). Cette vérification ne renormalise jamais les scores.

**Aucune suppression automatique.** Un sondage absent du prochain fichier reste stocké et public s’il l’était. Une configuration absente ou dont la liste de candidats change bloque l’actualisation de **ce sondage entier** : sa version complète et sa provenance précédente sont conservées, `retained` et l’avertissement le signalent. Une ligne manquante qui rend une configuration incohérente fait échouer tout le contrôle du CSV. Les autres données restent intactes. Le dernier succès indique un passage validé ; il ne signifie pas que chaque sondage conservé a été retrouvé dans le fichier.

Les révisions gardent les données normalisées complètes et les empreintes SHA-256 du fichier et du sondage. Les fichiers complets/PDF ne sont pas stockés dans PostgreSQL. Une relance d’un contenu déjà observé réutilise sa révision. Les anciens états restent accessibles aux opérateurs ; aucune durée de rétention automatique n’est imposée. Surveiller la croissance de `poll_revisions` et `ingestion_runs` avant une extension historique.

## API et interface

```text
GET /api/polls?institute=Ifop&candidate=le-pen&party=RN&round=1&startDate=2026-03-01&endDate=2026-09-30&page=1&limit=20
GET /api/polls?round=2&configuration=2%3Abardella%7Cphilippe
GET /api/polls/options
GET /api/polls/candidates/le-pen/history?round=1&page=1&limit=100
```

Les filtres sont exacts ; les bornes inclusives portent sur `fieldwork_end`. `configuration` est la clé `tour:identifiants_de_candidats_triés_et_séparés_par_|`, indépendante des numéros locaux. Le filtre candidat/parti sélectionne les configurations concernées mais **rend leur liste complète de candidats**. L’historique expose les mesures du candidat et le contexte complet de chaque hypothèse. La pagination de l’historique porte sur les sondages, pas le nombre de points. Limite 100 sondages par page. HTTP 400 pour filtre invalide ; 503 si la base/le schéma sont indisponibles. Les erreurs ne sont pas mises en cache comme des listes vides. Les réponses incluent la licence et l’attribution du fournisseur. Les lectures réussies peuvent rester en cache jusqu’à cinq minutes.

Navigation : `/presidentielle-2027` → `/presidentielle-2027/sondages`. Sélections : tour, institut, période, liste exacte de candidats, plusieurs candidats du graphique. Le graphique présente **uniquement des points individuels**, avec date de fin du terrain en X, score original en Y et axe partant de zéro. Survol, focus clavier ou toucher affichent candidat, score, institut, dates, échantillons, configuration et lien vers la source. Les tableaux restent complets lorsque des candidats sont masqués du graphique. Au-delà de 100 sondages, pagination explicite, avec indication de la portion tracée. L’absence de données ou une erreur est visible. Les couleurs ne constituent pas une attribution politique.

Une liste identique de candidats ne prouve pas des méthodes de collecte ou questions identiques. Les numéros locaux et bases de calcul restent donc visibles. Plusieurs configurations d’un même sondage peuvent partager une liste : tous leurs points sont conservés, sans les fusionner. Aucune moyenne, interpolation, pondération, probabilité de victoire ni comparaison programme/vote n’est calculée.

## Ajout futur d’une autre source

Ajouter un importeur qui produit `PollDocument`, une entrée de provenance/licence dans `lib/polls/providers.ts` et sa propre synchronisation. Aucun filtre sur le 26/02/2026 n’existe dans le modèle ou le parseur. Ne pas fusionner deux fournisseurs automatiquement : un candidat au rapprochement peut utiliser institut, dates de terrain, échantillon et URL originale, mais une validation humaine doit vérifier les configurations et la publication primaire. Une future table de correspondances pourra rattacher plusieurs références à une même enquête, sans supprimer leur provenance. Le modèle actuel préfère conserver deux références explicites à une fausse déduplication.

## Vérifications reproductibles

```bash
npm run test:polls
npm run test:ingestion
npm run test:reader
npm run lint
npm run typecheck
npm run build
git diff --check
```

Les fixtures ne nomment aucune personnalité réelle ; les tests ne contactent pas Sondax. Ils vérifient le CSV, la hiérarchie, la source originale inchangée, les doublons, le schéma, les données invalides, le fallback, l’idempotence, les corrections et révisions, les disparitions temporaires, le rollback, la date de succès, RLS et les résultats complets/paginés des RPC.

## État effectivement vérifié le 02/10/2026

- Migration `presidential_polls` appliquée sur le projet existant, version `20261002061929`. RLS activé sur les cinq nouvelles tables, aucun droit d’écriture `anon`/`authenticated`, aucune lecture anonyme des révisions ; les deux RPC sont `security invoker` avec chemin de recherche fixé.
- Premier import : **33 sondages publiés, 214 configurations, 1 702 résultats, 33 révisions**, sans erreur ni avertissement. Tables et index des sondages : environ **1 088 Kio**, mesurés en base. SHA-256 du CSV vérifié : `e88fe8765ad54e1aa83bfa13bf3ffd957bb9304fc4e9dc1e1c58e6f4446d527d`.
- Seconde synchronisation : **0 ajout, 0 modification, 33 inchangés**, aucune configuration/résultat écrit et toujours 33 révisions. Journal `ok` et dernière réussite persistés.
- API du build local contre les données réelles : 9 instituts, 26 candidats, 77 listes de candidats distinctes ; 33 sondages renvoyés au premier tour ; historique Marine Le Pen au second tour : 14 sondages et 49 mesures, chacune accompagnée de ses deux candidats. Filtre de tour invalide : HTTP 400.
- **72 tests hors ligne passent** (13 sondages + 59 existants). Lint, typage et build de production réussis. Les erreurs de lint provenant du dossier de cache local `.cache` sont exclues explicitement, comme les sorties `.next` déjà exclues.
- Contrôle navigateur : sélection de plusieurs candidats, détail d’un point et URL exacte, filtre Ifop, période de septembre, second tour limité au duel sélectionné. À 390 px, aucune extension horizontale de la page ; le graphique garde son défilement interne. Les bornes de période réagissent à l’événement `input`, y compris pour les champs date natifs. Les candidats de la liste choisie sont tous cochés au départ.
- Le contrôle Supabase ne signale aucune nouvelle alerte pour les objets de sondage. Il reste des avertissements concernant des fonctions et réglages Auth antérieurs à cette fonctionnalité ; leur correction n’a pas été incluse ici. Référence : https://supabase.com/docs/guides/database/database-linter.
- Le **site Cloud Run n’a pas été déployé** dans cette intervention. Les deux déclencheurs Cloud Build existants surveillent `master` ; la branche de travail n’est pas un déploiement.
- Le workflow quotidien est livré mais **pas encore actif** : il n’est pas sur la branche par défaut et le secret `POLLS_DB_PG_URL` est absent. La configuration de ce secret a été refusée par la revue automatique d’autorisation, car elle transmettrait une connexion PostgreSQL privilégiée à GitHub Actions. La valeur n’a pas été transmise. Un accord explicite est nécessaire pour cette étape ; ne pas contourner le refus. La commande interne reste utilisable.

## Fichiers livrés

Créés :

- `.github/workflows/polls-sync.yml`
- `app/api/polls/route.ts`
- `app/api/polls/options/route.ts`
- `app/api/polls/candidates/[candidate]/history/route.ts`
- `app/presidentielle-2027/page.tsx`
- `app/presidentielle-2027/sondages/page.tsx`
- `components/polls/explorer.tsx`
- `components/polls/chart.tsx`
- `lib/polls/types.ts`
- `lib/polls/query.ts`
- `lib/polls/data.ts`
- `lib/polls/providers.ts`
- `ingestion/polls/sondax.ts`
- `ingestion/polls/sync.ts`
- `ingestion/polls/cli.ts`
- `ingestion/polls/tests/parser.test.mjs`
- `ingestion/polls/tests/database.test.mjs`
- `ingestion/polls/tests/fixtures/sondax.csv`
- `supabase/migrations/20261002061929_presidential_polls.sql`
- `docs/sondages-2027.md`

Modifiés :

- `README.md` : entrée de la fonctionnalité et commandes.
- `app/admin/(protected)/runs/page.tsx` : explication du journal et déclenchement interne.
- `app/style.css` : présentation et adaptation mobile.
- `components/site-nav.tsx` : entrée Présidentielle 2027.
- `ingestion/lib/csv.mjs` : mode strict optionnel, existants préservés.
- `ingestion/lib/db.mjs` : type documentaire de l’erreur du journal.
- `package.json` : commandes de synchronisation, tests et typage.
- `tsconfig.json` : imports TypeScript explicites pour partager le code avec Node.
- `eslint.config.mjs` : exclusion des artefacts de cache locaux.

Ni fichier `.env`, ni CSV de production, ni capture, ni pièce jointe utilisateur dans cette livraison. Aucun paquet supplémentaire nécessaire ; lockfile inchangé.
