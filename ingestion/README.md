# Ingestion et revue éditoriale

Ce dossier contient la logique serveur qui alimente la base à partir des sources
officielles, et l'outil de revue humaine qui contrôle ce qui devient public.

Principes :

1. **Deux temps, jamais confondus.** `fetch` télécharge et normalise dans
   `ingestion/.staging/` (aucune écriture en base, aucun identifiant requis).
   `push` écrit en base via la connexion directe `DB_PG_URL`, jamais via la clé
   publishable du site.
2. **Tout devient brouillon.** Chaque pièce est insérée au statut `draft`.
   Seule une transition explicite (`review set --status=reviewed|published`)
   avec un relecteur identifié rend une pièce visible du public (RLS : seules
   les lignes `published` sont lisibles).
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
npm run ingest -- review list --table=evidence --status=draft
npm run ingest -- review set --table=evidence --id=<uuid> --status=reviewed --reviewer="prénom nom"
npm run ingest -- runs
npm run ingest -- measure
```

`--dry-run` exécute tout le chemin d'écriture puis annule la transaction :
le SQL est réellement vérifié, rien n'est conservé. `--yes` est requis pour
toute écriture réelle, et seul `push`/`link`/`review set` touchent la base.

## Importeurs

| Importeur | Source officielle | Pièces produites | Volume observé |
|---|---|---|---|
| `an-scrutins` | data.assemblee-nationale.fr, archives JSON par législature | `vote` (scrutins) | lég. 15 : 9,2 Mo / 4 417 scrutins ; lég. 17 : 26,3 Mo |
| `an-dossiers` | data.assemblee-nationale.fr, dossiers législatifs par législature | `adopted_text` (lois promulguées) + rattachements de scrutins | lég. 15 : 15,2 Mo, 4 980 dossiers, 319 lois, 262 rattachements |
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
- Le rapprochement vote ↔ texte est déterministe : il relie deux pièces qui
  portent la même référence documentaire explicite (dossier, procédure,
  document). Il ne relie jamais deux pièces sur la base d'un thème ou d'une
  ressemblance, et tout lien naît `draft`. Les paires issues d'une même
  référence sont plafonnées à 25 par référence (une référence partagée par
  200 pièces produirait sinon 20 000 liens) ; le plafonnement est signalé en
  note du passage `link`.

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

## Vérification

```bash
npm run test:ingestion   # normalisation, analyseurs, liens, migrations + RLS (PGlite)
```

Les tests d'intégration appliquent les deux migrations à un PostgreSQL réel
embarqué (PGlite), poussent un staging, vérifient l'idempotence, la protection
des pièces relues/publiées, et l'effet réel des politiques RLS pour le rôle
`anon`. Une vérification ponctuelle utile avant tout import massif :

```bash
npm run ingest -- fetch an-scrutins --legislatures=15 --limit=50
npm run ingest -- push --staging <dossier> --dry-run   # nécessite DB_PG_URL
```

## Migrations

Les migrations vivent dans `supabase/migrations/` et s'appliquent séparément
du déploiement web. La seconde (`20260930000000_backend_pipeline.sql`) ajoute
`detail` (faits structurés copiés de la source), la trace de relecture, la
recherche plein texte française et le journal `ingestion_runs`. Avant tout
`supabase db push` : lire le schéma existant et l'historique des migrations.
