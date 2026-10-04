# Intitulés lisibles des scrutins européens

Le libellé d'une décision peut seulement indiquer « B10-0385/2026 — Proposition
de résolution (ensemble du texte) ». Il décrit la référence et le périmètre du
vote, mais pas le sujet. Les cartes et les fiches affichent désormais d'abord le
sujet français documenté, puis la référence du texte et le périmètre du vote.
L'intitulé officiel complet reste consultable sur la fiche.

## Source et correspondance

`npm run pe:subjects` complète les **scrutins européens publiés**, sans changer
leur titre officiel, leurs décomptes, leur résultat, leur statut ou leur trace
de publication. Le champ additionnel `detail.text_subject` contient l'intitulé
français, la référence canonique du document, l'URL, le repère, la date de
récupération et l'empreinte de la source. La fiche affiche aussi cette provenance.

Le sujet vient d'un texte adopté déjà publié qui cite **exactement** le document
de la décision dans `detail.refs`. En l'absence d'une correspondance unique avec
une empreinte de source, la commande lit les métadonnées officielles
`/api/v2/plenary-documents/{document-id}` (ou `/documents/` pour les documents
reçus `C9`) et retient seulement le titre français.
Une réponse portant un autre identifiant ou des titres français contradictoires
est rejetée. Aucune ressemblance thématique ni traduction automatique n'est utilisée.

La notation `B10-0385/2026` désigne `B-10-2026-0385`. Une résolution commune
`RC-B10-0398/2026` désigne `RC-10-2026-0398`, selon les identifiants de l'API.
Les mentions de révision (`/REV1`) restent visibles dans la référence affichée.
Dans les anciennes décisions, la référence peut suivre un sujet multilingue ;
un libellé comportant plusieurs références reste à contrôler.

Exemples de sujets présents dans les sources publiées :

| Référence | Sujet |
|---|---|
| B10-0385/2026 | Renforcer la résilience sanitaire mondiale dans les pays partenaires |
| B10-0386/2026 | Évaluation de la politique commune de la pêche et suivi |
| A10-0220/2026 | Incidence des médias sociaux et de l'environnement en ligne sur les jeunes |

## Exécution et reprise

La connexion d'ingestion `DB_PG_URL` sert aux lectures et aux corrections ; elle
reste hors du conteneur web. Cette commande ne crée aucune table ni migration.

```bash
npm run pe:subjects                  # prépare et conserve le plan, sans écriture distante
npm run pe:subjects -- --dry-run     # exerce les corrections puis annule la transaction
npm run pe:subjects -- --yes         # applique les descriptions préparées et vérifiées
npm run pe:subjects -- --yes --offline  # utilise seulement les sources en base et le cache
```

Les réponses brutes, leurs empreintes et le plan sont conservés dans
`ingestion/.staging/pe-subjects/`, ignoré par Git. Le cache est vérifié avant
réutilisation. Les appels sont espacés d'au moins 1,5 seconde. Un document absent
ou sans titre français est consigné dans `plan.json` ; le libellé officiel reste
alors affiché. Un échec de récupération n'empêche pas de compléter les autres sujets.

La simulation et l'application réelle gardent leur résultat dans
`ingestion_runs`. La simulation annule les modifications des scrutins ; le
journal de passage demeure. Les descriptions existantes sont préservées. Une
modification concurrente du titre, du statut ou du détail est comptée comme
conflit et n'est pas écrasée. Une nouvelle exécution n'altère pas les lignes déjà
enrichies. Relancer la commande après l'import et la publication de nouvelles
séances européennes ; le rejeu de leurs archives reste indépendant de cet
enrichissement descriptif.

## Contrôles

Les tests vérifient les références de rapports et de résolutions communes,
les anciens libellés multilingues, la conservation des révisions, l'absence
de rapprochement ambigu, le choix explicite du français, l'annulation réelle
des simulations, l'idempotence et la protection des scrutins publiés et des
modifications concurrentes. L'interface refuse un sujet désignant un autre
document et conserve le badge distinguant texte entier et amendement.

```bash
node --test tests/reader.test.mjs ingestion/tests/pe-subjects.test.mjs
npm run test:ingestion
npm run test:reader
npm run lint
npm run build
```

Le build web ne lance pas l'enrichissement. Les sujets enregistrés n'apparaissent
dans l'interface publique qu'après livraison du code qui les affiche.

Vérification du 04/10/2026 : **820 sujets enregistrés sur 827 scrutins européens
publiés**, sans conflit lors des applications. Sept références restent sans
sujet exploitable : un titre français absent et six documents indisponibles
dans l'API officielle. Les libellés officiels et les décomptes restent conservés.
L'affichage des cartes et de la provenance a été contrôlé avec les lectures
publiques réelles ; aucun débordement horizontal à 1 280 et 390 px. Les tests
d'ingestion et de lecture (112 tests), le lint et le build passent. Cette
vérification locale ne prouve pas la livraison de l'interface en production.
