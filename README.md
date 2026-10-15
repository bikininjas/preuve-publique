# preuve-publique

Vérification factuelle par **triangulation documentaire** — cible : `preuve-publique.fr`.

Un dossier de ce site ne demande pas qu'on croie une rédaction. Il montre les documents :
archives primaires, travaux évalués par les pairs, sources de gauche, du centre et de
droite libérale ou conservatrice, données officielles. Le lecteur constate le recoupement
— et donc que des bords opposés disent la même chose — au lieu de faire confiance à une
autorité. Le mode « preuve à l'aveugle » va plus loin : les noms des médias et des auteurs
sont floutés, seuls la citation, la date et l'état de l'archive restent lisibles.

## État vérifié le 15/10/2026

- **Base** : six migrations appliquées au projet Supabase `pntkhwdosrvsdybzsicp` —
  `0001_init_preuve_publique` (`20261014133149`), `0002_hybrid_search_rpc`
  (`20261014135315`), `0003_proof_integrity` (`20261014135316`),
  `0004_categories_and_admin` (`20261014145312`), `0005_archive_records`
  (`20261015043026`), `0006_protagonists` (`20261015044427`). Six dossiers en base :
  cinq **publiés** — le dossier de référence (8 sources, 4 piliers), l'AME (6), les
  sans-papiers et le RSA (6), Pétain et Vichy (7), le coût de l'immigration (4, économie)
  — et un **brouillon de contrôle RLS** ; RLS actif sur `dossiers`, `dossier_sources` et
  `admin_users`.
- **Intégrité** : les 31 sources portent leur empreinte de citation ; la RPC de recherche
  hybride est exécutable en rôle `anon` (vérifié par `has_function_privilege` **et** par un
  appel REST réel) ; l'audit public `/api/verify/<empreinte>` confirme `verified: true`
  pour la source *Liberty Magazine*
  (`8a3322902363d2d1a1e1c593b12496b8f6e78262fa3d747c5b5c15b13b642756`). `ETag` et
  `X-Proof-Integrity-Root` du dossier publié, relevés en ligne, valent la racine
  d'intégrité recalculée :
  `403002c79f79a52e3b540a4203f4fd57a6ab029f5bf7de22c654edb998f8737f`. Les trois
  dossiers ajoutés le 15/10 (AME, RSA, Pétain-Vichy) ont été vérifiés de la même manière :
  `ETag` et `X-Proof-Integrity-Root` relevés en ligne égaux aux racines recalculées par
  `npm run proofs`. Le dossier économie ajouté le 15/10 aussi
  (`d944106c53f125ffd39be7d2487db7dc9cc6a53a2fb066bee93842d9656e42ba`).
- **Application** : `npm run typecheck`, `npm test` (**36 tests**) et `npm run build`
  passent. Le serveur standalone du conteneur a été exercé sur les routes réelles :
  - `/api/health` → 200, `status: healthy`, latence base mesurée (99 ms en local) ;
  - `/api/dossiers/<slug>` → 200, `Cache-Control: public, max-age=60, s-maxage=3600,
    stale-while-revalidate=86400`, `ETag` et `X-Proof-Integrity-Root` égaux à la racine
    recalculée localement, 304 sur `If-None-Match`, 404 sur un slug inconnu ;
  - `/api/search?q=nazis` → 200, deux résultats ; `q` trop court → 400 ;
  - `/api/verify/<empreinte>` → 200 avec la chaîne canonique ; empreinte inconnue → 404,
    empreinte malformée → 400 ;
  - 30 requêtes puis 429 avec `Retry-After` et `X-RateLimit-*` ;
  - en-têtes `nosniff`, `DENY`, `strict-origin-when-cross-origin` présents ;
  - sans variables Supabase, le repli local sert les mêmes empreintes dérivées et l'audit
    répond 200 (deux tests de non-régression couvrent ce point).
- **Déploiement** : le service Cloud Run `preuve-publique-git` (projet `preuve-publique`,
  `europe-west1`) sert `preuve-publique.fr` ; révision en ligne vérifiée le 15/10/2026 —
  `preuve-publique-git-00005-l49`, `/api/health` → `status: healthy`,
  `database.reachable: true`. Déploiement manuel par
  `gcloud builds submit --config cloudbuild.yaml --project preuve-publique` (aucun
  déclencheur automatique).
- **Chaîne d'archivage** : en service depuis le 15/10/2026 — les 8 pièces du dossier
  publié ont leur fiche déposée dans `dossier_source_archives` (15 792 octets,
  `METADATA_ONLY` : instantané réseau non demandé, URL d'origine encore à documenter) ;
  les 4 pièces du dossier économie ont été capturées avec instantané réseau (`--fetch`) :
  trois `URL_SNAPSHOT` (Insee, CEPII, Terra Nova) et une `URL_UNAVAILABLE` enregistrée
  telle quelle (OCDE, protection anti-robots). Chaque fiche est relue et rehachée au
  dépôt, puis servie **octet pour octet** par `/api/archives/<empreinte de fiche>`
  (rehachage vérifié en ligne).

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
npm test               # 36 tests : données, garde de triangulation, crypto, quotas, archivage
npm run seed:sql       # régénère supabase/seed.sql depuis src/db/seed-fallback.ts
npm run seed:apply     # applique les dossiers de référence (DB_PG_URL requis)
npm run proofs         # imprime chaînes canoniques, empreintes et racine d'intégrité
npm run archive:capture  # fiches d'archive réelles (--yes pour déposer) : voir « Archivage »
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

## Parcourir et publier

Le registre se parcourt par **catégorie** (`/categories/<slug>`) ou en entier (`/dossiers`).
Les huit catégories — Histoire, Politique, Économie, Société, Faits divers, Santé,
Environnement, International — sont une énumération en base, validée par le Triangulation
Guard : un dossier publié porte toujours une catégorie, et une catégorie vide reste vide
plutôt que d'être remplie d'un texte d'attente.

L'écriture passe par **`/admin`**, qui n'est ni un back-office hors du site ni une
connexion privilégiée :

- les comptes sont ceux de Supabase Auth ; les droits sont une **ligne en base** dans
  `admin_users`, vérifiée par la fonction `is_admin()` (security definer). Retirer la
  ligne retire l'accès, sans redéploiement ;
- toutes les écritures passent par **la session de l'utilisateur**, donc par la RLS : le
  conteneur ne reçoit jamais de clé de service ;
- la page de publication appelle le validateur de triangulation et **affiche ses refus**
  au lieu de publier malgré lui ; modifier une citation remet son empreinte à recalculer.

```bash
npm run dev          # puis http://localhost:3000/admin
```

## Interface

Échelle typographique fluide (corps à 16-18 px, plancher des métadonnées à 12 px), cibles
tactiles de 44 px, navigation complète sans JavaScript (menus `<details>`), fiches de
dossier réutilisables, sommaire collant et pièces repliées par pilier. Le mouvement est
sobre et respecte `prefers-reduced-motion` ; sans JavaScript, tout reste lisible.

Sur un dossier, deux densités de lecture : **dossier complet** (par défaut) et **vue
synthèse**, qui ramène la page d'environ dix écrans mobiles à quatre — verdict, briques
d'affirmation et une ligne par pièce. Les pièces se filtrent par pilier avec une barre
d'onglets, qui suit aussi les liens du spectromètre (`#pieces-<PILIER>`).

Sur desktop, la coquille occupe **90 % de la largeur** à partir de 1024 px (plafonnée à
1840 px) ; les colonnes de lecture restent bornées par leurs propres grilles et les
listes de fiches passent à trois colonnes en grand écran.

### Protagonistes et références

Chaque dossier peut lister ses **protagonistes** : ce que l'affirmation met en cause
(personnes, organisations, lieux, textes) et ceux qui portent les preuves (auteurs,
institutions). Chaque entrée porte une référence publique vérifiable — ou rien : une
entrée sans référence confirmée s'affiche **sans lien**, jamais avec une URL devinée. Les
références sont contrôlées contre l'API Wikipédia avant d'entrer dans le dossier de
référence, et le titre retenu est celui que l'API renvoie, redirections comprises.

### Relire une fiche d'archive

```bash
curl https://preuve-publique.fr/api/archives/<sha256>
```

La réponse est le contenu **octet pour octet** de la fiche déposée, avec son empreinte en
en-tête (`x-archive-sha256`) et une mise en cache immuable : il suffit de rehacher le
corps reçu pour retrouver l'empreinte annoncée.

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

## Archivage des preuves

`npm run archive:capture` est le seul chemin qui dépose des captures. Il s'exécute **hors
du conteneur web**, avec `DB_PG_URL` (écriture en base — aucune autre clé n'est requise) ;
`SUPABASE_SERVICE_ROLE_KEY` ou `SUPABASE_ADMIN_ACCESS_TOKEN` n'ouvrent que le miroir
Storage. Il est prudent par défaut : sans `--yes`, il calcule et affiche sans rien écrire.

1. Une **fiche d'archive canonique** est construite par pièce (JSON normalisé NFC, clés
   ordonnées, déterministe : mêmes entrées, mêmes octets) ; elle porte la citation, ses
   métadonnées, la date de capture, et rappelle elle-même ce qu'elle ne prouve pas.
2. Son empreinte SHA-256 est calculée sur les octets exacts (`node:crypto`).
3. Elle est déposée dans `public.dossier_source_archives`, la table content-addressed
   (la contrainte de la base revérifie l'empreinte du contenu) : une capture n'est jamais
   écrasée — deux contenus différents pour la même adresse arrêtent le script (code 2).
4. La pièce est mise à jour : `archive_storage_path` et `archive_binary_sha256`.
5. La fiche déposée est **relue et rehachée** : le dépôt n'est déclaré réussi que si
   l'empreinte relue est identique.
6. Un miroir du bucket public `immutable-archives` est tenté **si** un accès Storage
   privilégié existe (clé de service ou jeton administrateur) ; il est retéléchargé et
   rehaché. Sans cet accès, le script le dit — et n'affirme rien de plus.

Deux empreintes, deux rôles — à ne pas confondre :

| Colonne | Ce qu'elle atteste | Qui peut la vérifier |
|---|---|---|
| `archive_sha256` | la **citation publiée** n'a pas bougé | n'importe quel lecteur, depuis la page (WebCrypto) et via `/api/verify/<empreinte>` |
| `archive_binary_sha256` | la **fiche de capture** déposée en base (content-addressed) | quiconque retélécharge la fiche et la hache |

Une capture ne réécrit jamais `archive_sha256` : l'identité publique d'une preuve doit
rester celle que le lecteur recalcule lui-même à partir de ce qu'il lit.

```bash
npm run archive:capture              # contrôle : calcule les fiches, n'écrit rien
npm run archive:capture -- --fetch   # tente en plus un instantané des URL documentées
npm run archive:capture -- --yes     # dépose les fiches en base et met les pièces à jour
```

**État au 15/10/2026** : les 8 fiches du dossier publié sont déposées (`captured_at` du
15/10/2026 04:32 UTC, 15 792 octets au total), relues et rehachées ; `/api/archives/`
les sert octet pour octet. Toutes sont `METADATA_ONLY` : aucun instantané du contenu des
URL, qui restent à documenter. Le 15/10/2026 08:13 UTC, quatre fiches du dossier
`cout-immigration-budget-france` ont été déposées de la même façon, cette fois avec
`--fetch` : trois instantanés d'URL et une indisponibilité enregistrée telle quelle
(OCDE). Le pipeline de capture reconstruit le dossier depuis la base pour le repasser au
validateur : cette reconstruction omettait `protagonists` et `author_reference_url`
(colonnes ajoutées par la migration `0006`) et faisait échouer **toute** capture — réparé
dans `scripts/archive-capture.mts`. Le **miroir Storage** n'a pas eu lieu faute d'accès
privilégié — le bucket `immutable-archives` existe (public en lecture, RLS actif sans
politique d'écriture) mais reste sans objet.

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

- Captures limitées : les 8 fiches déposées sont `METADATA_ONLY` (pas d'instantané du
  contenu des pages) et aucune n'a encore d'URL d'origine documentée ; le miroir Storage
  du bucket `immutable-archives` n'a pas eu lieu.
- Recherche : la branche vectorielle de la RPC ne ramène rien tant qu'aucun embedding
  n'est calculé — aucune similarité n'est simulée.
- Le guard est appliqué par le pipeline de publication, pas par un déclencheur en base.
- Pas d'ESLint ni de CI ; pas de tests PGlite du SQL ; le quota de recherche est par
  instance Cloud Run.
