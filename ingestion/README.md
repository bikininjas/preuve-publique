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
| `senat-scrutins` | www.senat.fr/scrutin-public, pages de session | `vote` (scrutins) | ~200 scrutins par session depuis 2017 |
| `senat-texts` | data.senat.fr, `promulguees.csv` | `adopted_text` (lois promulguées) | 1,3 Mo (toutes années, filtré depuis 2017) |
| `pe-votes` | data.europarl.europa.eu API v2, décisions par séance | `vote` | 1 requête par séance plénière |
| `pe-texts` | data.europarl.europa.eu API v2, textes adoptés | `adopted_text` | 1 requête par page d'année |
| `legifrance` | api.piste.gouv.fr (OAuth PISTE) | `adopted_text` | **jamais exécuté faute d'identifiants** |

Limites assumées, écrites noir sur blanc :

- **`legifrance` n'a pas été exercé** : il faut un compte PISTE
  (`LEGIFRANCE_CLIENT_ID`, `LEGIFRANCE_CLIENT_SECRET`). Le mapping des champs
  de la réponse `consult/jorf` est à confirmer au premier passage réel ; la
  réponse brute est conservée pour permettre cette vérification.
- Les archives de scrutins de l'Assemblée nationale (législatures 15 et 16
  vérifiées) ne renseignent **pas** de référence de dossier
  (`objet.referenceLegislative` vide sur 4 417 + 4 106 scrutins) : relier un
  vote AN à son texte exigera d'importer aussi le jeu de données des dossiers
  législatifs de l'AN. Le chemin de référence `an:dossier` existe déjà et
  s'activerait si la source le renseignait.
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

## Volumes mesurés (29/09/2026)

| Mesure | Valeur constatée |
|---|---|
| Scrutins AN lus (archive lég. 15) | 4 417 fichiers JSON, 9,2 Mo compressés |
| Scrutins Sénat lus (sessions 2024, 2025) | 367 + 340 entrées, 2 pages HTML |
| Séances plénières PE (2025) | 53 séances, 1 requête `decisions` par séance |
| Textes adoptés PE (2026) | 319 textes, 7 pages |
| Base après import de contrôle (494 pièces réelles) | ≈ 9,3 Mo, soit ≈ 19 Ko par pièce (détail jsonb inclus) |
| Passage répété du même staging | 0 insertion, 494 pièces inchangées (idempotent) |

Extrapolation prudente : la législature 15 complète (4 417 scrutins) avoisine
80 Mo de base, à remesurer avec `npm run ingest -- measure` avant tout import
massif — le quota gratuit Supabase est limité, et les extraits stockés sont
volontairement courts.

## Configuration

`.env.local` (ignoré par Git ; `.env.example` ne contient que des noms) :

- `DB_PG_URL` — connexion PostgreSQL directe (dashboard Supabase →
  paramètres de base → chaîne de connexion, en incluant `sslmode=require`).
  Réservée à l'ingestion et à la revue : jamais dans le conteneur web.
- `LEGIFRANCE_CLIENT_ID` / `LEGIFRANCE_CLIENT_SECRET` — compte PISTE.

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
