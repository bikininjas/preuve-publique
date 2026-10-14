# preuve-publique

Vérification factuelle par **triangulation documentaire** — cible : `preuve-publique.fr`.

Un dossier de ce site ne demande pas qu'on croie une rédaction. Il montre les documents :
archives primaires, travaux évalués par les pairs, sources de gauche, du centre et de
droite libérale ou conservatrice, données officielles. Le lecteur constate le recoupement
— et donc que des bords opposés disent la même chose — au lieu de faire confiance à une
autorité. Le mode « preuve à l'aveugle » va plus loin : les noms des médias et des auteurs
sont floutés, seuls la citation, la date et l'état de l'archive restent lisibles.

## État vérifié le 14/10/2026

- **Base** : trois migrations appliquées au projet Supabase `pntkhwdosrvsdybzsicp` —
  `0001_init_preuve_publique` (`20261014133149`), `0002_hybrid_search_rpc`
  (`20261014135315`), `0003_proof_integrity` (`20261014135316`). Deux dossiers en base :
  un **publié** (8 sources, 4 piliers) et un **brouillon de contrôle RLS**.
- **Intégrité** : les 8 sources portent leur empreinte de citation ; la RPC de recherche
  hybride est exécutable en rôle `anon` (vérifié par `has_function_privilege` **et** par un
  appel REST réel) ; l'empreinte stockée de la source *Liberty Magazine* est identique à
  celle recalculée localement (`8a3322902363d2d1a1e1c593b12496b8f6e78262fa3d747c5b5c15b13b642756`).
  Racine d'intégrité du dossier publié :
  `403002c79f79a52e3b540a4203f4fd57a6ab029f5bf7de22c654edb998f8737f`.
- **Application** : `npm run typecheck`, `npm test` (**27 tests**) et `npm run build`
  passent. Le serveur standalone du conteneur a été exercé sur les routes réelles :
  - `/api/health` → 200, `status: healthy`, latence base mesurée (99 ms en local) ;
  - `/api/dossiers/<slug>` → 200, `Cache-Control: public, max-age=60, s-maxage=3600,
    stale-while-revalidate=86400`, `ETag` et `X-Proof-Integrity-Root` égaux à la racine
    recalculée localement, 304 sur `If-None-Match`, 404 sur un slug inconnu ;
  - `/api/search?q=nazis` → 200, un résultat ; `q` trop court → 400 ;
  - `/api/verify/<empreinte>` → 200 avec la chaîne canonique ; empreinte inconnue → 404,
    empreinte malformée → 400 ;
  - 30 requêtes puis 429 avec `Retry-After` et `X-RateLimit-*` ;
  - en-têtes `nosniff`, `DENY`, `strict-origin-when-cross-origin` présents ;
  - sans variables Supabase, le repli local sert les mêmes empreintes dérivées et l'audit
    répond 200 (deux tests de non-régression couvrent ce point).
- **Déploiement** : aucun. Le service Cloud Run n'existe pas ; le mapping de domaine
  `preuve-publique.fr` subsiste dans le projet Google sans service derrière (404).
- **Chaîne d'archivage** : pas encore en service. Aucune source n'affiche de capture :
  le site écrit « capture à venir » et n'annonce jamais une archive qui n'existe pas.

## Pile technique

| Brique | Choix |
|---|---|
| Application | Next.js 15.5 (App Router, `output: standalone`), React 19, TypeScript strict |
| Styles | Tailwind CSS 4, Lucide |
| Base | Supabase (PostgreSQL + `pgvector` + recherche plein texte française) |
| Lecture publique | `@supabase/supabase-js` (PostgREST, clé publishable, RLS) |
| Écriture | connexion privilégiée `postgres` + Drizzle (scripts uniquement, jamais dans le conteneur web) |
| Validation | Zod — « Triangulation Guard » sur la publication |
| Conteneur | Docker multi-stage `node:22-alpine`, utilisateur non-root `nextjs`, `PORT=8080` |
| Cible | Google Cloud Run, `europe-west1` (voir « Déploiement ») |

## Commandes

```bash
npm ci
npm run dev            # développement local (repli sur les dossiers de référence)
npm run build          # build de production
npm start              # serveur Next (après build)
npm run typecheck      # tsc --noEmit
npm test               # 27 tests : données, garde de triangulation, crypto, quotas
npm run seed:sql       # régénère supabase/seed.sql depuis src/db/seed-fallback.ts
npm run seed:apply     # applique les dossiers de référence (DB_PG_URL requis)
npm run proofs         # imprime chaînes canoniques, empreintes et racine d'intégrité
```

`DB_PG_URL` (ou `DATABASE_POOLER_URL`) reste **hors du conteneur web** : le site ne lit
qu'avec la clé publishable, sous RLS. Voir `.env.example`.

## Backend

Architecture détaillée, règles et exemples de vérification :
[`docs/backend.md`](docs/backend.md).

| Route | Rôle |
|---|---|
| `/api/health` | sonde Cloud Run (runtime, latence base ; `?strict=1` pour un 503 si la base est configurée mais injoignable) |
| `/api/dossiers/<slug>` | dossier public + `X-Proof-Integrity-Root` et cache de bord |
| `/api/search?q=` | recherche hybride (`search_dossiers_hybrid` : plein texte + RRF), 429 au-delà du quota |
| `/api/verify/<sha256>` | audit public : métadonnées exactes ayant servi au calcul d'une empreinte |

Le **Triangulation Guard** refuse la publication d'un dossier qui n'a pas au moins une
preuve primaire, une source académique, deux spectres politiques distincts, et une
empreinte valide sur chaque source. Un brouillon incomplet reste un brouillon.

## Modèle de données

`supabase/migrations/` fait foi ; `src/db/schema.ts` le décrit pour les scripts privilégiés.

- `public.dossiers` — affirmation, verdict, résumé, score de consensus, briques
  (`premises` en JSONB), `search_tsv` généré en français, `embedding` (1536 dim, **non
  alimenté**), `is_published`.
- `public.dossier_sources` — une ligne par source : pilier (`political_spectrum`), citation
  ou fait documenté (`quote_kind`), URL d'origine, `archive_sha256` (empreinte de la
  citation, recalculable), `archive_binary_sha256` et `archive_storage_path` (capture
  archivée, quand elle existe).
- `public.search_dossiers_hybrid(text, vector, int)` — recherche publique, `security
  invoker` donc sous RLS.
- **RLS activé partout** : lecture publique limitée aux dossiers publiés et à leurs
  sources ; aucune écriture publique.

## Ce qui est calculé, ce qui est éditorial

- **Calculé** : couverture documentaire, nombre de sources, dates, URL, empreintes,
  racine d'intégrité.
- **Éditorial et affiché comme tel** : verdict, résumé, score de consensus.
- **Jamais affiché** : une capture qui n'existe pas, un résumé présenté comme citation,
  un taux sans période ni dénominateur, une empreinte inventée.

## Interface

| Route | Contenu |
|---|---|
| `/` | accueil : promesse de méthode, recherche, dossier publié mis en avant, les six piliers |
| `/dossiers/<slug>` | dossier complet : spectromètre, anatomie de l'affirmation, sources par pilier, mode preuve à l'aveugle, empreintes cliquables |
| `/dossiers/<slug>/opengraph-image` | carte de partage générée à la volée (`next/og`) |
| `/recherche?q=` | recherche plein texte ; un brouillon ne remonte jamais |
| `/methode` | méthode, règles forcées par le code, limites assumées |

## Direction artistique (brutalisme forensique)

L'interface ne ressemble pas à un média d'opinion : grille suisse exposée (bordures 1px),
papier d'archive ivoire (`#F4F1EA`) et encre carbone (`#0D0E11`) par défaut, thème
« chambre noire » optionnel (bouton dans l'en-tête, choix conservé par le navigateur).
Trois polices auto-hébergées via `next/font` : Newsreader (affirmations et titres),
Space Grotesk (interface), JetBrains Mono (cotes, dates, empreintes, scores).

- **Cartouche de dossier** : cote technique **réelle** (`PP-` + 8 caractères de
  l'identifiant du dossier), nombre de pièces, empreintes présentes, piliers documentés,
  racine d'intégrité. Aucun numéro de registre n'est inventé.
- **Spectromètre** : six colonnes reliées au verdict par un tracé SVG ; une colonne sans
  pièce reste éteinte et ne tire aucune ligne. Cliquer une colonne mène à ses pièces.
- **Radiographie du sophisme** : segments, tampons et jauge de distorsion — une **échelle
  de statut** (0, 40, 60, 100) annoncée comme telle, jamais une mesure.
- **Pièces à conviction** : cote `PIÈCE #01`, citation surlignée quand elle est exacte
  (jamais pour un fait documenté), pied cryptographique, et bouton **« Auditer la preuve
  (WebCrypto) »** qui recalcule l'empreinte **dans le navigateur du lecteur**
  (`crypto.subtle.digest`), sans appel réseau, puis la compare à celle publiée.
- **Mode preuve à l'aveugle** : noms, institutions et piliers recouverts de bandes de
  caviardage ; le bouton les retire d'un mouvement mécanique. Le masquage est visuel
  (les données restent dans la page) : il sert à juger la preuve avant de savoir qui la
  porte, pas à cacher quoi que ce soit.

## Déploiement : le moins cher possible

| Levier | Réglage | Effet sur la facture |
|---|---|---|
| Région | `europe-west1` (Belgique), **pas** Paris | Tier 1 : 0,000024 $/vCPU-s contre 0,0000336 $ en Tier 2 (`europe-west9`), soit 40 % de moins au-delà du quota gratuit. Le mapping de domaine `preuve-publique.fr` y existe déjà. |
| Instances | `--min-instances=0` | Zéro instance au repos : rien n'est facturé sans trafic. |
| CPU | `--cpu-throttling` (défaut explicité) | CPU alloué seulement pendant le traitement des requêtes. |
| Plafond | `--max-instances=2`, 1 vCPU, 512 Mi | Borne la dépense en cas de pic viral ; 512 Mi évite qu'une image de partage fasse tomber l'instance. |
| Registre d'images | politique de nettoyage (non étiquetées > 1 j, étiquetées > 14 j) | Reste dans le quota gratuit de 0,5 Go d'Artifact Registry. |
| CDN | **aucun** | Un Cloud CDN suppose un équilibreur HTTPS (~18 €/mois) : incompatible avec l'objectif. L'en-tête `s-maxage` profite aux caches intermédiaires, sans coût. |
| Secrets | 3 secrets, montés en variables d'exécution | Quota gratuit de Secret Manager : 6 versions actives, 10 000 accès/mois. |
| Garde-fou | budget d'alerte à 1 € sur le compte de facturation | Prévient avant toute dépense réelle. |

Quota gratuit Cloud Run, par compte de facturation et par mois : **180 000 vCPU-s,
360 000 GiB-s, 2 millions de requêtes**. Un dossier servi en ~250 ms consomme environ
0,25 vCPU-s : de l'ordre de 700 000 visites par mois restent dans le quota CPU.

```bash
# 1. Dépôt d'images (déjà créé ; commande conservée pour un nouveau projet)
gcloud artifacts repositories create preuvepublique \
  --repository-format=docker --location=europe-west1 --project preuve-publique

# 2. Construction + déploiement (utilise cloudbuild.yaml)
gcloud builds submit --config cloudbuild.yaml --project preuve-publique

# 3. Vérification après livraison
gcloud run services describe preuve-publique-git --region europe-west1 \
  --project preuve-publique --format='value(status.latestReadyRevisionName)'
curl -sI https://preuve-publique.fr/api/dossiers/hitler-et-les-nazis-etaient-de-gauche
```

Les variables d'exécution `SUPABASE_URL` et `SUPABASE_PUBLISHABLE_KEY` sont injectées
depuis les secrets existants (`NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) ; le conteneur ne reçoit aucune clé privilégiée.

## Limites assumées

- Pas de captures : le bucket `immutable-archives` n'existe pas encore, donc aucune
  empreinte binaire n'est publiée.
- Recherche : la branche vectorielle de la RPC ne ramène rien tant qu'aucun embedding
  n'est calculé — aucune similarité n'est simulée.
- Le guard est appliqué par le pipeline de publication, pas par un déclencheur en base.
- Pas d'ESLint ni de CI ; pas de tests PGlite du SQL ; le quota de recherche est par
  instance Cloud Run.
