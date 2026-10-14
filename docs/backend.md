# Backend — architecture et règles de confiance

Ce document décrit la partie serveur : ce qui est forcé par le code, ce qui est
seulement éditorial, et comment le vérifier soi-même.

## Arborescence

```text
src/
├── db/
│   ├── index.ts              # connexions : client HTTP Supabase + Drizzle privilégié
│   ├── schema.ts             # schéma Drizzle, aligné sur supabase/migrations/
│   └── seed-fallback.ts      # dossiers de référence (repli local, source du seed)
├── server/
│   ├── validators/
│   │   └── dossier.schema.ts # Zod + « Triangulation Guard » (publication)
│   ├── services/
│   │   ├── dossier.service.ts  # lecture mise en cache, recherche hybride, par slug
│   │   ├── crypto.service.ts   # empreinte canonique, empreinte de capture, racine
│   │   └── archive.service.ts  # captures immuables (bucket immutable-archives)
│   └── middleware/
│       ├── rate-limit.ts     # limitation par IP (fenêtre fixe, en mémoire)
│       └── logger.ts         # journal JSON avec `severity` (Cloud Logging)
└── app/api/
    ├── health/route.ts            # sonde Cloud Run
    ├── dossiers/[slug]/route.ts   # lecture publique + en-têtes de cache
    ├── search/route.ts            # recherche hybride
    └── verify/[sha256]/route.ts   # audit public d'une preuve par son empreinte
```

## Deux connexions, jamais mélangées

| Client | Usage | Secret |
|---|---|---|
| `supabaseServer()` (`@supabase/supabase-js`) | lecture publique du site, sous RLS | clé **publishable** |
| `privilegedDb()` (`postgres` + Drizzle) | scripts : migrations, seed, contrôles | `DB_PG_URL` (Supavisor, port 6543, `prepare: false`, 5 connexions max, `idle_timeout: 20`) |

`DB_PG_URL` n'entre jamais dans le conteneur web : `privilegedDb()` lève une
erreur explicite si elle manque, et aucun chemin de rendu ne l'appelle. Les
écritures de captures passent par `supabaseAdmin()`, qui exige
`SUPABASE_SERVICE_ROLE_KEY` — même règle.

## Triangulation Guard : l'impartialité forcée par le code

`validateTriangulationRules` (Zod, `superRefine`) refuse la publication
(`is_published: true`) d'un dossier qui ne réunit pas les quatre conditions :

1. **preuve primaire** : au moins une source `ARCHIVE_PRIMAIRE` ou
   `DONNEES_BRUTES_OFFICIELLES` ;
2. **validation académique** : au moins une source `CONSENSUS_ACADEMIQUE` ;
3. **pluralisme politique** : au moins deux spectres distincts parmi `GAUCHE`,
   `CENTRE`, `DROITE_LIBERALE_CONSERVATRICE` ;
4. **intégrité** : chaque source porte une empreinte SHA-256 valide et une
   citation non vide.

Un brouillon reste libre (`is_published: false`) : la règle ne vise que la
publication. Le pipeline l'applique (`npm run seed:apply`, `npm run seed:sql`) :
un dossier incomplet fait échouer la commande avec le motif, il n'est pas publié
« en attendant ». Huit tests couvrent chaque règle prise séparément.

**Limite assumée.** La règle vit dans le code applicatif : une écriture directe
en base par une connexion privilégiée la contournerait. Ce n'est pas un trou
silencieux — c'est écrit ici, sur `/methode`, et c'est pourquoi la lecture
publique ne dépend, elle, que du RLS.

## Chaîne d'intégrité

Chaîne canonique, **dérivable par un tiers** à partir de ce que le site affiche :

```text
sha256( source_name | author_or_institution | publication_date | exact_quote )
```

chaque champ en Unicode NFC et débarrassé des espaces de bord, puis joints par
des barres verticales. `publication_date` absent compte pour une chaîne vide —
jamais une date inventée.

Si une capture binaire existe, son empreinte est combinée :
`sha256(canonique | binary:<sha256 du fichier>)`. Les deux empreintes sont
stockées séparément (`archive_sha256` pour la citation, `archive_binary_sha256`
pour le fichier) : l'identité publique d'une preuve ne change pas parce qu'on a
archivé une copie.

La **racine d'intégrité** d'un dossier est le hachage de la liste *triée* des
empreintes de ses sources : l'ordre d'affichage n'y change rien, la moindre
modification de citation la change. Elle est servie dans l'en-tête
`X-Proof-Integrity-Root` et comme `ETag`.

`npm run proofs` imprime, pour chaque dossier publié, la chaîne canonique, son
empreinte et la racine — de quoi refaire le calcul à la main.

## Points d'entrée

| Route | Ce qu'elle rend |
|---|---|
| `GET /api/health` | état du runtime et latence vers Supabase ; `?strict=1` pour un 503 si la base est configurée mais injoignable |
| `GET /api/dossiers/<slug>` | dossier public, `Cache-Control: public, max-age=60, s-maxage=3600, stale-while-revalidate=86400`, `ETag` et `X-Proof-Integrity-Root` ; 304 sur `If-None-Match`, 404 sinon |
| `GET /api/search?q=` | recherche hybride ; 400 si `q` fait moins de 2 caractères, 429 au-delà du quota |
| `GET /api/verify/<sha256>` | métadonnées exactes d'une preuve à partir de son empreinte : chaîne canonique, source, dossier, URL de capture — 404 si aucune preuve publiée ne la porte |

Vérifier une empreinte à la main :

```bash
curl -s https://preuve-publique.fr/api/dossiers/hitler-et-les-nazis-etaient-de-gauche \
  -D - -o /dev/null | grep -i x-proof-integrity-root
curl -s https://preuve-publique.fr/api/verify/<empreinte-affichée>
```

## Observabilité et sécurité

- **Journalisation** : `src/server/middleware/logger.ts` écrit une ligne JSON par
  événement avec `severity` (`INFO`, `WARNING`, `ERROR`, `CRITICAL`), sur stdout,
  et remplace au passage toute chaîne de connexion ou jeton par `[redacted]`.
  Aucun `console.log` brut dans le serveur.
- **Santé** : `K_SERVICE` distingue Cloud Run du poste local ; la sonde répond
  200 tant que le runtime vit (une sonde qui redémarre des instances saines
  parce que la base hoquette serait un défaut), et le diagnostic complet reste
  dans le corps.
- **Limitation de débit** : fenêtre fixe en mémoire, 30 requêtes par minute et
  par IP (premier maillon de `x-forwarded-for`), en-têtes `X-RateLimit-*` et
  `Retry-After`. Chaque instance Cloud Run a son compteur : c'est un garde-fou
  contre un script, pas un bouclier DDoS (cela demanderait Cloud Armor derrière
  un équilibreur, donc un coût mensuel).
- **En-têtes** : `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `Referrer-Policy: strict-origin-when-cross-origin`, plus HSTS et une
  politique de permissions restrictive (`next.config.ts`).

## Archivage (bucket `immutable-archives`)

`scripts/archive-capture.mts` construit, par pièce publiée, une fiche canonique
(`src/lib/archive-record.ts`) : schéma versionné, dossier, source, citation canonique,
date de capture, résultat de capture (`METADATA_ONLY`, `URL_SNAPSHOT` avec statut/type/
octets/empreinte, ou `URL_UNAVAILABLE` avec la raison), et la liste de ses propres
limites. La fiche est normalisée en NFC et déterministe.

Le script est **idempotent et prudent** : `--yes` est requis pour écrire ; une copie
existante n'est jamais écrasée (une capture est immuable) ; après dépôt, la copie est
retéléchargée et hachée, et le succès n'est annoncé que si les empreintes coïncident.
Il valide le dossier par le Triangulation Guard avant d'agir, et journalise en JSON.

Le bucket est créé au premier passage (`public: true`, donc lecture par URL publique) ;
`storage.objects` garde son RLS **sans aucune politique** : autrement dit, personne ne
peut écrire sans la clé de service, et le conteneur web ne la reçoit jamais.

Limite connue : sans `SUPABASE_SERVICE_ROLE_KEY`, le script s'arrête avec un code 2 et un
message explicite — il ne fabrique jamais de capture locale en la présentant comme
déposée.

## Ce qui n'existe pas encore

- **Captures** : le bucket `immutable-archives` existe (lecture publique, écriture
  par clé de service) mais aucun dépôt n'a encore eu lieu — la clé de service n'est
  pas encore dans `.env.local`. Le site affiche « capture à venir » et n'annonce
  jamais une archive qu'il n'a pas.
- **Embeddings** : aucune colonne `embedding` n'est remplie. La branche
  vectorielle de la recherche ne ramène donc rien : le classement est purement
  lexical, sans similarité simulée.
- **Publication depuis l'interface** : le seul chemin de publication est le
  script (`npm run seed:apply`), qui applique le guard.
