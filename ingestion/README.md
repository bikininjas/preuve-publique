# Ingestion et revue éditoriale

Ce dossier contient la logique serveur qui alimente la base à partir des sources
officielles, et l'outil de revue humaine qui contrôle ce qui devient public.

Principes :

1. **Deux temps, jamais confondus.** `fetch` télécharge et normalise dans
   `ingestion/.staging/` (aucune écriture en base, aucun identifiant requis).
   `push` écrit en base via la connexion directe `DB_PG_URL`, jamais via la clé
   publishable du site.
2. **Tout est d'abord brouillon.** Chaque pièce est insérée au statut `draft`.
   Les scrutins de l'Assemblée nationale peuvent être publiés par le contrôle
   automatique décrit ci-dessous. Les autres pièces exigent une transition
   explicite (`review set --status=reviewed|published`) avec un relecteur
   identifié (RLS : seules les lignes `published` sont lisibles). Les mêmes transitions sont
   disponibles depuis l'espace `/admin` du site (session Google + table
   `admin_users`) : la base applique les mêmes règles aux deux chemins, et
   seules les colonnes de statut et de trace de relecture y sont
   inscriptibles.
3. **Rien n'est écrasé silencieusement.** Une pièce déjà relue ou publiée n'est
   jamais mise à jour par un nouvel import : si la source a changé, le passage
   le signale (« verrouillée ») et un humain décide.
4. **Provenance systématique.** Chaque passage conserve les fichiers bruts
   (HTML, JSON, CSV, zip) avec leur SHA-256 dans le staging, et la base garde
   l'URL exacte, le repère dans la source et la date de récupération.
5. **Pas de données personnelles de vote.** Les archives AN et l'API du
   Parlement européen contiennent les positions individuelles ; elles ne sont
   **pas** stockées ici. Elles exigent leur propre table revue (pour / contre /
   abstention / non-participation), conformément à la méthode du projet.

## Commandes

```bash
npm run ingest -- list
npm run ingest -- fetch an-scrutins --legislatures=15 --limit=300
npm run ingest -- push --staging ingestion/.staging/an-scrutins/<horodatage> --dry-run
npm run ingest -- push --staging ingestion/.staging/an-scrutins/<horodatage> --yes
npm run ingest -- run senat-scrutins --sessions=2024,2025 --yes
npm run ingest -- link --dry-run
npm run ingest -- topics --dry-run                                    # rubriques héritées par dossier (Sénat)
npm run ingest -- review list --table=evidence --status=draft
npm run ingest -- review set --table=evidence --id=<uuid> --status=reviewed --reviewer="prénom nom"
npm run ingest -- runs
npm run ingest -- measure
npm run ingest -- publish auto --staging ingestion/.staging/an-scrutins/<horodatage> --limit=50 --dry-run
npm run ingest -- publish auto --staging ingestion/.staging/an-scrutins/<horodatage> --limit=50 --yes
npm run ingest -- run an-scrutins --auto-publish --publish-limit=50 --yes
node ingestion/senat-group-votes.mjs --limit=50                    # vérification/cache sans écriture
node ingestion/senat-group-votes.mjs --write                       # enrichissement des scrutins Sénat publiés
```

`--dry-run` exécute tout le chemin d'écriture puis annule la transaction :
le SQL est réellement vérifié, rien n'est conservé. `--yes` est requis pour
toute écriture réelle ; `publish auto` accepte un lot de 1 à 500 brouillons.

### Publication automatique : périmètre et indice

Le pipeline ne publie automatiquement que les **scrutins officiels de
l'Assemblée nationale**. Il recalcule le SHA-256 et la taille de chaque archive
JSON, valide le domaine officiel et la source enregistrée, reparcourt l'archive,
reconstruit les données de chaque scrutin, puis compare le staging et la ligne
en base (intitulé, date, source, repère, décompte et groupes). Une divergence
dans le staging annule le lot ; une ligne en base divergente reste en brouillon.
Les enrichissements documentaires (`refs`, rubrique) ne sont pas assimilés à
une altération du vote. Les pièces déjà publiées ne sont pas réécrites.

Une pièce conforme reçoit **0,990** : indice de conformité documentaire
déterministe, pas probabilité statistique ni score de cohérence politique. Les
contrôles sont inscrits dans `publication_checks`, le mode dans
`publication_method`, et la transition est datée dans `reviewed_at` avec une
signature de contrôle automatique. Le journal `ingestion_runs` conserve les
nouveaux passages. Les déclarations, programmes, rapprochements interprétatifs,
impacts et affaires judiciaires exigent toujours une relecture humaine. Aucune
inférence de modèle ne pilote la publication.

### Décomptes par groupe du Sénat

`senat-group-votes.mjs` lit les scrutins du Sénat déjà publiés, télécharge leur
page officielle individuelle dans le staging ignoré par Git, puis vérifie que
les quatre positions de chaque groupe rejoignent son effectif et que la somme
des groupes rejoint les quatre totaux du résultat officiel. Sans `--write`, la
commande n'écrit rien en base et sauvegarde seulement les pages pour permettre
la reprise. Avec `--write`, chaque scrutin conforme enrichit les tables
`vote_group_coverage` et `vote_group_tallies` dans sa propre transaction, avec
l'empreinte SHA-256 de la page. Un scrutin divergent est exclu et consigné dans
`ingestion/.staging/senat-group-votes/write-errors.json` ; aucune position
individuelle ni affiliation à un parti n'est inférée. Le passage est idempotent.

## Importeurs

| Importeur | Source officielle | Pièces produites | Volume observé |
|---|---|---|---|
| `an-scrutins` | data.assemblee-nationale.fr, archives JSON par législature | `vote` (scrutins) | lég. 15 : 9,2 Mo / 4 417 scrutins ; lég. 17 : 26,3 Mo |
| `an-dossiers` | data.assemblee-nationale.fr, dossiers législatifs par législature | `adopted_text` (lois promulguées) + rattachements de scrutins | lég. 15 : 15,2 Mo, 4 980 dossiers, 319 lois, 262 rattachements |
| `an-referentiel` | data.assemblee-nationale.fr, archive « tous acteurs, tous mandats, tous organes » (législature 17, historique) | `actors.jsonl` (groupes, partis, personnes) + `actor-relations.jsonl` (mandats datés) | 13,6 Mo, 13 997 fichiers ; 121 groupes ou partis, 2 120 personnes, 11 380 mandats de 2002 à 2026 |
| `senat-scrutins` | www.senat.fr/scrutin-public, pages de session | `vote` (scrutins) | ~200 scrutins par session depuis 2017 |
| `senat-texts` | data.senat.fr, `promulguees.csv` | `adopted_text` (lois promulguées) | 1,3 Mo (toutes années, filtré depuis 2017) |
| `pe-votes` | data.europarl.europa.eu API v2, décisions par séance | `vote` | 1 requête par séance plénière |
| `pe-texts` | data.europarl.europa.eu API v2, textes adoptés | `adopted_text` | 1 requête par page d'année |

Limites assumées, écrites noir sur blanc :

- **L'API Légifrance (PISTE) est écartée** : son compte est réservé en pratique
  au secteur public. Les références du Journal officiel (NOR, numéro du JO,
  URL Légifrance) proviennent des dossiers législatifs de l'Assemblée
  nationale, qui les publient ; le texte du JO lui-même n'est pas téléchargé.
  Les jeux de données bruts de la DILA (`echanges.dila.gouv.fr`) sont la
  source officielle correspondante, mais cet hôte refuse les connexions
  depuis certains réseaux (constaté ici) : la route reste documentée, pas
  utilisée.
- Les archives de scrutins de l'Assemblée nationale ne portent **aucune**
  référence de dossier (champ vide sur 4 417 + 4 106 scrutins vérifiés) :
  c'est le jeu `an-dossiers` qui apporte ce lien. Il écrit des
  **rattachements** (`refs.jsonl`) qui ajoutent la référence de dossier aux
  scrutins déjà importés — uniquement aux brouillons, les pièces relues ou
  publiées sont signalées. Les références sont **additives** : un nouvel
  import de la même pièce ne supprime jamais une référence apportée par un
  autre importeur (les autres champs du détail suivent la source).
- Les **amendements** (AN et `ameli.zip` du Sénat, 154 Mo) ne sont pas encore
  importés : c'est le prochain palier, avec mesure de volume avant import.
- Les positions individuelles de vote ne sont **pas** stockées (voir principe 5).
- Les **liens d'acteur** (une personne membre d'un groupe, affiliée à un parti)
  viennent du référentiel de l'Assemblée nationale : ce sont des mandats datés
  recopiés de la source, pas une interprétation, et ils n'ont donc pas de
  statut de relecture — leur visibilité suit celle des deux acteurs reliés
  (chacun n'est public qu'à travers une pièce publiée). Aucun lien groupe ↔
  parti n'est déduit de la composition : un groupe n'« est » pas un parti, et
  les **coalitions** (NFP, Ensemble…) n'existent pas dans le référentiel — elles
  demanderont leurs propres sources. L'état civil du référentiel est réduit au
  prénom et au nom : naissance, profession, adresses et identifiant HATVP ne
  sont pas recopiés.
- Le rapprochement vote ↔ texte est déterministe : il relie deux pièces qui
  portent la même référence documentaire explicite (dossier, procédure,
  document). Il ne relie jamais deux pièces sur la base d'un thème ou d'une
  ressemblance, et tout lien naît `draft`. Les paires issues d'une même
  référence sont plafonnées à 25 par référence (une référence partagée par
  200 pièces produirait sinon 20 000 liens) ; le plafonnement est signalé en
  note du passage `link`.
- Les **rubriques** (`topics`) ne sont jamais inventées : elles viennent d'une
  source (aujourd'hui la colonne « Thèmes » du Sénat, 30 rubriques reprises
  telles quelles) ou sont héritées par un scrutin du dossier de sa loi, la
  référence et l'origine étant écrites dans `detail.topics_source`. La
  commande `topics` fait cette propagation ; elle ne touche jamais une pièce
  relue ou publiée et se signale « verrouillée » le cas échéant.
- **Publication en bloc d'un jeu institutionnel.** Un import de référentiel ou
  de séries officielles ne passe pas par une relecture humaine pièce par pièce
  avant publication : il passe par un **contrôle technique de conformité** —
  le fichier officiel conservé (empreinte SHA-256 dans `sources`) est réimporté
  par les analyseurs du dépôt, puis comparé pièce par pièce avec la base
  (titre, date, extrait, rubriques). Seules les pièces sans écart sont
  publiées, et la trace enregistrée le dit : `reviewed_by` =
  « contrôle technique de conformité (passage de développement) ». Une
  relecture humaine pièce par pièce reste la règle pour tout contenu
  interprétatif (rapprochement, déclaration, programme) — elle n'est jamais
  remplacée par ce contrôle.

## Volumes mesurés (30/09/2026)

| Mesure | Valeur constatée |
|---|---|
| Scrutins AN lus (archive lég. 15) | 4 417 fichiers JSON, 9,2 Mo compressés |
| Dossiers AN lus (archive lég. 15) | 15 486 fichiers dont 4 980 dossiers (10 506 d'une autre nature ignorés), 15,2 Mo ; 319 lois promulguées, 262 rattachements de scrutins |
| Scrutins Sénat lus (sessions 2024, 2025) | 367 + 340 entrées, 2 pages HTML |
| Séances plénières PE (2025) | 53 séances, 1 requête `decisions` par séance |
| Textes adoptés PE (2026) | 319 textes, 7 pages |
| Base après import de contrôle (813 pièces réelles) | ≈ 19 Ko par pièce mesurés précédemment (détail jsonb inclus) |
| Liens générés (sous-ensemble 300 scrutins + 319 lois) | 164 `same_proposal`, dont 20 vote ↔ loi avec NOR vérifiable |
| Référentiel AN lu (archive lég. 17, 30/09/2026) | 13,6 Mo, 13 997 fichiers (10 817 organes, 3 121 acteurs) ; mandats de groupe depuis la législature 12 (2002) — une seule archive couvre l'historique |
| Référentiel poussé en base (30/09/2026) | 2 241 acteurs (63 groupes, 58 partis, 2 120 personnes), 11 380 liens d'acteur ; passage rejoué : 0 insertion, 11 380 inchangés |
| Rubriques Sénat (30/09/2026) | 30 rubriques publiées par la source, portées par 666 lois ; héritées par 1 612 scrutins du même dossier (545 sans dossier de loi) |
| Publication par contrôle de conformité (30/09/2026) | 3 624 pièces (666 lois et 2 157 scrutins du Sénat, 801 scrutins de l'AN sur l'ensemble d'un texte) : 3 624 conformes, 0 écart ; 16 783 pièces restent en brouillon |
| Publication automatique pilote (01/10/2026) | 50 scrutins AN supplémentaires, indice documentaire 0,990 ; 3 674 publiées et 16 733 brouillons vérifiés en base |
| Bulletins nominatifs par parti (01/10/2026) | 847 scrutins AN sur 851 publiés contrôlés contre le décompte officiel ; 9 808 lignes scrutin/parti, 179 000 bulletins enregistrés dont 157 210 rattachés par affiliation unique datée, 21 790 non attribués ; 4 scrutins exclus pour divergence du décompte ; base ≈ 75 Mo |
| Votes par groupe du Sénat (01/10/2026) | 2 157 scrutins publiés contrôlés sur leurs pages officielles, 18 854 lignes scrutin/groupe, 750 197 positions ; aucune divergence avec les quatre totaux officiels ; base ≈ 80 Mo |
| Base après import du référentiel | 71 Mo mesurés (53 Mo avant le référentiel) |
| Passage répété du même staging | 0 insertion, pièces inchangées (idempotent) |

Extrapolation prudente : la législature 15 complète (4 417 scrutins) avoisine
80 Mo de base, à remesurer avec `npm run ingest -- measure` avant tout import
massif — le quota gratuit Supabase est limité, et les extraits stockés sont
volontairement courts.

## Configuration

`.env.local` (ignoré par Git ; `.env.example` ne contient que des noms) :

- `DB_PG_URL` — connexion PostgreSQL directe (dashboard Supabase →
  paramètres de base → chaîne de connexion, en incluant `sslmode=require`).
  Réservée à l'ingestion et à la revue : jamais dans le conteneur web.

Aucune valeur secrète ne doit apparaître dans un staging, un manifeste ou un
log : les fichiers produits ne contiennent que des métadonnées de provenance.

Le staging lui-même est jetable : il est ignoré par Git, n'est jamais la base,
et chaque `fetch` est rejouable. Après vérification, supprimer
`ingestion/.staging/<importeur>/<horodatage>` est sans conséquence (≈ 41 Mo
après les passages de contrôle de septembre 2026, dont les archives brutes).

## Vérification

```bash
npm run test:ingestion   # normalisation, analyseurs, liens, migrations + RLS (PGlite)
```

Les tests d'intégration appliquent les migrations à un PostgreSQL réel
embarqué (PGlite), poussent un staging, vérifient l'idempotence, la protection
des pièces relues/publiées, et l'effet réel des politiques RLS pour le rôle
`anon`. Une vérification ponctuelle utile avant tout import massif :

```bash
npm run ingest -- fetch an-scrutins --legislatures=15 --limit=50
npm run ingest -- push --staging <dossier> --dry-run   # nécessite DB_PG_URL
```

### Décomptes par parti issus des scrutins AN

`node ingestion/party-votes.mjs` calcule les bulletins individuels par parti à
partir des archives officielles déjà conservées dans le staging. Il vérifie les
empreintes SHA-256 contre le manifeste et la source en base, le total nominatif
contre le décompte officiel et l'unicité de l'affiliation datée de chaque
député. Les affiliations ambiguës ou absentes restent hors des barres. Le
calcul est en lecture seule par défaut ; `--write` remplace les décomptes des
scrutins vérifiés dans une transaction. `--staging=<dossier>` choisit un autre
staging AN. Les tables et RPC nécessaires sont dans les deux dernières
migrations. Les graphiques regroupent des bulletins, jamais des promesses ni
une opinion unique attribuée au parti sur un thème entier. Sénat et Parlement
européen attendent des sources nominatives et affiliations équivalentes.

## Migrations

Les migrations vivent dans `supabase/migrations/` et s'appliquent séparément
du déploiement web. La seconde (`20260930000000_backend_pipeline.sql`) ajoute
`detail` (faits structurés copiés de la source), la trace de relecture, la
recherche plein texte française et le journal `ingestion_runs`. La quatrième
(`20261002000000_admin_review.sql`) ajoute la liste d'administration et les
politiques de revue du site. Avant tout `supabase db push` : lire le schéma
existant et l'historique des migrations.
