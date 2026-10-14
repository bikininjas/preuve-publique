# preuve-publique — consignes de travail

Ce fichier s'applique à tout le dépôt. Lire le `README.md` et `docs/backend.md` avant de
modifier le projet. Respecter les instructions de l'utilisateur en priorité.

## Règle de provenance (non négociable)

- **Ne jamais affirmer sans preuve.** Aucune mention « ingéré », « appliqué », « déployé »
  ou « publié » sans une lecture réelle qui le montre. Un état vide explicite vaut mieux
  qu'une affirmation plausible : l'utilisateur vérifie, et c'est la crédibilité du site
  qui est en jeu.
- **Jamais d'empreinte inventée.** `archive_sha256` est dérivé des champs publiés ; il
  n'est jamais écrit à la main. `archive_binary_sha256` et `archive_storage_path` restent
  nuls tant qu'aucune capture n'existe — l'interface écrit alors « capture à venir ».
- **Jamais un résumé présenté comme une citation.** `quote_kind` vaut `CITATION_EXACTE` ou
  `FAIT_DOCUMENTE`, et l'interface les distingue.
- **Verdict, résumé et score de consensus sont éditoriaux** : seuls la couverture
  documentaire, les empreintes et la racine d'intégrité se calculent. Ne jamais laisser
  croire l'inverse dans l'interface.
- Une erreur de lecture de la base s'affiche telle quelle ; elle n'est jamais remplacée par
  des données locales. Le repli sur les dossiers de référence ne sert que quand Supabase
  n'est pas configuré, et il est annoncé à l'écran — **avec les mêmes empreintes dérivées**
  qu'en base (un test de non-régression couvre cet écart, qui a existé).

## Triangulation Guard

- La publication (`is_published: true`) exige : une preuve primaire, une source
  académique, deux spectres politiques distincts, et une empreinte valide sur chaque
  source (`src/server/validators/dossier.schema.ts`). Ne jamais contourner ce validateur :
  `npm run seed:sql` et `npm run seed:apply` passent par lui, un dossier refusé doit le
  rester.
- Un brouillon incomplet reste un brouillon. `brouillon-de-controle-rls` n'est pas un
  contenu : c'est le témoin qui prouve que la lecture publique filtre sur `is_published`.
  Ne jamais le publier.

## Direction artistique et interface

- Style voulu : **grille suisse exposée, papier d'archive, encre carbone** — pas de
  « SaaS générique » (pas d'ombres floues, pas de dégradés bleu/violet, pas d'Inter seul).
  La palette vit dans `src/app/globals.css` (variables `--pp-*`, thème clair par défaut,
  chambre noire en `[data-theme="dark"]`).
- Trois polices via `next/font` : `--font-serif` (Newsreader, affirmations), `--font-sans`
  (Space Grotesk, interface), `--font-mono` (JetBrains Mono, cotes, dates, empreintes).
  Ne pas coder de famille en dur : utiliser les utilitaires `font-serif` / `font-mono`.
- **N'inventer aucun identifiant de registre** : la cote d'un dossier dérive de son
  identifiant réel (`dossierCode`), une pièce est numérotée par son `display_order`.
- La jauge de distorsion est une **échelle de statut éditorial** (0/40/60/100) : ne jamais
  la présenter comme une mesure, et garder la mention qui le dit sous la frise.
- Le caviardage du mode « preuve à l'aveugle » est **visuel** : les données restent dans la
  page. Ne pas le décrire comme une protection.
- L'audit d'empreinte doit rester **côté navigateur** (`crypto.subtle.digest`, aucun appel
  réseau) et dire la vérité quand WebCrypto n'est pas disponible. Le badge d'intégrité ne
  s'affiche que si le calcul local correspond à l'empreinte publiée.
- Le surlignage de citation est réservé aux `CITATION_EXACTE` : un fait documenté ne prend
  jamais l'apparence d'une citation.

## Code et données

- `supabase/migrations/` est la source de vérité du schéma ; `src/db/schema.ts` (Drizzle)
  doit rester aligné.
- `supabase/seed.sql` est **généré** (`npm run seed:sql`) depuis `src/db/seed-fallback.ts` :
  modifier la source typée, jamais le SQL à la main.
- Le conteneur web ne reçoit que des valeurs publiques (`SUPABASE_URL`,
  `SUPABASE_PUBLISHABLE_KEY`). `DB_PG_URL`, `SUPABASE_SERVICE_ROLE_KEY` et les mots de
  passe restent hors du conteneur, hors des commits et hors des transcripts.
- Le serveur journalise en JSON avec `severity` via `src/server/middleware/logger.ts` :
  **aucun `console.log` brut** dans le code serveur, et jamais de secret dans une ligne de
  journal (le rédacteur remplace les chaînes de connexion et jetons par `[redacted]`).
- La fonction de recherche doit rester `security invoker` : elle s'exécute alors sous RLS.
  La passer en `security definer` ouvrirait une lecture hors RLS.
- Toute nouvelle table exposée doit avoir RLS et une politique explicite ; aucune écriture
  publique. Toute nouvelle fonction exposée doit être vérifiée avec
  `has_function_privilege` **et** par un appel REST réel en clé publishable.
- Les versions de `package.json` restent figées (pas de `^`).

## Archivage

- Une capture est **immuable** : `upsert: false`, jamais d'écrasement. Si une copie
  différente existe déjà pour le même chemin, s'arrêter et le dire, ne pas « réparer ».
- Un dépôt n'est annoncé réussi qu'après **retéléchargement et rehachage** de la copie.
- `archive_sha256` (empreinte de la citation) n'est **jamais** réécrit par une capture :
  c'est l'identité publique que le lecteur recalcule depuis la page.
  L'empreinte du fichier déposé va dans `archive_binary_sha256`.
- `SUPABASE_SERVICE_ROLE_KEY` reste hors du conteneur web, hors des commits et hors des
  journaux. Sans elle, le script refuse d'écrire (code 2) plutôt que de simuler.
- Ne jamais déposer de PDF volumineux dans Postgres, ni de capture sans fiche.

## Vérifications attendues avant de dire « c'est fait »

- `npm run typecheck`, `npm test`, `npm run build`.
- Toute page ou route qui lit la base exporte `dynamic = "force-dynamic"` : le build Docker
  tourne sans variables Supabase, un rendu prérendu figerait un contenu vide.
- Exercer le serveur standalone (`node .next/standalone/server.js`, après copie de
  `public/` et `.next/static` à côté, comme le Dockerfile) : pages, API, en-têtes, 404 et
  429 compris. Tester **aussi** sans variables Supabase.
- SQL : rejouer la migration dans un environnement de test avant application distante,
  puis vérifier après coup (compteurs, `pg_policies`, `has_function_privilege`, appel REST
  en `anon`).
- Il n'y a **pas de CI** dans ce dépôt : ne jamais suggérer un pipeline vert qui n'existe
  pas. Pas d'ESLint non plus.

## Git

- Une branche par changement cohérent ; messages de commit en français, à l'impératif.
- Corps de PR en trois parties : « Ce que fait cette branche », « Vérifié », « Limites
  assumées » ; fusion en `--rebase --delete-branch` (historique linéaire).
- Fins de ligne **CRLF** dans le dépôt (pas de `.gitattributes`) : un fichier écrit en LF
  apparaît entièrement modifié dans le diff.
- Le dépôt est public : `.env.local` n'est jamais commité, `.env.example` ne contient que
  des noms de variables et des valeurs vides. Vérifier les fuites avant chaque push.
