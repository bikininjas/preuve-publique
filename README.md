# Preuve Publique

**Voir ce que les acteurs politiques annoncent, votent et produisent — avec les documents originaux.**

**Site de production : [preuve-publique.fr](https://preuve-publique.fr/).** Utiliser ce domaine pour les liens publics et les vérifications des parcours. Référencement, indexation et aperçus de partage : [guide SEO et réseaux sociaux](docs/seo-et-partage.md).

Preuve Publique est un projet citoyen consacré à la France et à l'Union européenne. Son point d'entrée est le scrutin officiel : retrouver le sujet d'un vote, les positions publiées, les acteurs concernés et le texte exact. Le projet veut aussi rapprocher les programmes électoraux et déclarations médiatiques des décisions parlementaires, suivre les effets documentés des politiques publiques, montrer les inégalités et contextualiser les affaires judiciaires. Chaque élément renvoie à sa source. Le site présente les faits et leurs limites pour que le visiteur se fasse sa propre opinion ; il ne donne ni note de « cohérence », ni verdict automatique.

## Cap éditorial

- **Scrutins compréhensibles** : afficher d'abord le sujet du texte et le périmètre précis du vote (texte entier, article, amendement ou motion), puis conserver l'intitulé officiel et le numéro sur la fiche. Toutes les listes de scrutins sont triées par date du vote décroissante, y compris les filtres, les pages de groupe, l'accueil et la file de relecture. La page des scrutins propose des sous-thèmes exploratoires fondés sur des mots de l'intitulé officiel ; la page « Thèmes » présente les graphiques des catégories et sous-thèmes et garde séparément les rubriques publiées par les sources. Ces repères désignent un sujet, jamais un sens de vote.
- **Partis et groupes** : analyser Assemblée nationale, Sénat et Parlement européen selon les données effectivement disponibles. Les votes de groupe ne sont attribués à un parti que si son lien avec ce groupe est daté et sourcé. Une position de groupe ne vaut pas vote individuel.
- **Parole et actes** : mettre les citations exactes d'un programme ou d'une déclaration face au scrutin portant sur la même mesure, avec le contexte du texte et les motifs publics du vote. Indiquer l'édition, la date de publication et l'élection du programme ; utiliser la version officielle la plus récente applicable à la période. Ne pas présenter un programme ancien comme celui de 2027, ni une proposition publiée après le scrutin comme une promesse déjà en vigueur. Toute divergence proposée demande une justification et une relecture humaine avant publication.
- **Effets distributifs et inégalités** : documenter les populations susceptibles de bénéficier ou de pâtir d'une mesure avec des études d'impact ou indicateurs publics, unité, période, territoire, hypothèses et limites. Ne pas déduire un effet causal d'un seul vote.
- **Indicateurs comparables** : présence aux scrutins, répartition des votes et présence médiatique demandent une période, un dénominateur et un corpus précis ; aucun taux n'est affiché sans ces éléments.
- **Affaires judiciaires** : distinguer personne, parti et procédure ; dater enquête, poursuite, décision et recours, avec sources et présomption d'innocence. Aucun catalogue judiciaire n'est encore présent dans le modèle de données.

L'interface met ces objectifs en évidence sans remplir les manques par des chiffres ou accusations d'exemple. Les chantiers sans données vérifiées apparaissent explicitement comme tels sur `/observatoire`.

Depuis le 02/10/2026, les **24 indicateurs chiffrés de sources institutionnelles sont publiés**, sur demande explicite de l’utilisateur, sans nouvelle relecture. Les fiches conservent leurs sources et leurs limites, avec une mention qui distingue publication et validation humaine. La [trace et la règle de publication](docs/publication-indicateurs.md) remplacent l’attente de relecture pour ce lot.

### Profils de vote par thème et sous-thème

- L'accueil affiche jusqu'à six cartes de partis sélectionnés par volume de positions dans le **dernier scrutin AN publié**. Si cette sélection est vide ou indisponible, les six partis les plus documentés du corpus sont proposés, archives comprises ; la page indique ce périmètre. Chaque carte présente les trois catégories et quatre zooms : entreprises et règles du marché, solidarité et prestations sociales, immigration et nationalité, police et sécurité publique. Les graphiques couvrent **tout le corpus daté**, pas seulement le scrutin de sélection.
- `/partis` affiche les partis avec des bulletins attribuables, archives comprises, triés par volume documenté : recherche par nom ou initiales, douze cartes par page. `/partis/[id]` présente les trois catégories, les **19 sous-thèmes** et les derniers scrutins individuels rattachables au parti, paginés et triés par date décroissante. Les affiliations anciennes restent distinctes : aucun parti actuel n'hérite automatiquement des votes d'un ancien nom.
- `/categories` présente les graphiques de tous les sous-thèmes **visibles dès le chargement**, avec un index d'accès direct. Le Sénat conserve ses décomptes par **groupe**, sans les attribuer à un parti. Les cartes, fiches de scrutin et listes de votes affichent les catégories et sous-thèmes repérés dans le titre, avec des liens vers les mêmes filtres.
- La taxonomie et ses mots contrôlés sont dans `lib/vote-subjects.ts`. `voteTopicsForTitle` applique le même rapprochement par sous-chaîne que les filtres publics SQL `ILIKE`. Le titre officiel entier est utilisé ; un titre simplifié ne remplace jamais la source. Les sujets peuvent se recouper : ne pas additionner leurs agrégats ni la somme des sous-thèmes pour reconstituer une catégorie.
- **Dénominateur** : pour / (pour + contre + abstention + non-votant enregistré), au sein du parti et du corpus filtré. Les cartes précisent volume, nombre de scrutins et période du corpus. Les bulletins sans affiliation unique et les scrutins non conformes restent exclus. Une absence de données n'est jamais affichée comme 0 % de soutien.
- **Sujet et direction sont distincts** : un texte contenant « immigration » peut ouvrir ou restreindre un droit ; un amendement peut supprimer une mesure. Les barres ne sont donc pas des scores « libéral », « social » ou « sécuritaire ». Qualifier une orientation exige une analyse du dispositif exact, des références et une validation humaine ; aucun programme récent ni rapprochement interprétatif n'est inventé. La méthode publique explique ces limites dans `/methode#profils-vote`.
- `lib/vote-theme-data.ts` réutilise les RPC publiques existantes, avec RLS, un cache serveur de cinq minutes par taxonomie/base et des lots de quatre sujets maximum (deux RPC par sujet). Aucune migration ni écriture distante n'est nécessaire. Une requête échouée n'est pas mise en cache comme résultat vide ; les vues distinguent indisponibilité et absence de bulletins. Le premier chargement d'un corpus complet effectue 44 RPC (3 catégories + 19 sous-thèmes) ; les cartes de l'accueil n'en demandent que 14, plus la synthèse générale et la sélection du dernier scrutin.

### Vérification de cette interface (02/10/2026)

- `npm run build`, `npm run lint` et `npm run test:reader` : compilation, typage, lint et sept tests ciblés (périmètre du scrutin, chevauchement des sujets, absence de direction inférée, dénominateur avec non-votants et absence de données).
- Vérification dans le navigateur avec les lectures publiques réelles : six partis sur l'accueil, 40 partis accessibles dans l'annuaire paginé, 19 graphiques de sous-thèmes visibles à l'Assemblée et au Sénat, profil RN et navigation vers les trois scrutins de solidarité attribuables au parti (64 pour, 19 abstentions, soit 77,1 % pour parmi 83 positions). Tri décroissant des derniers scrutins contrôlé.
- Contrôle mobile à 390 px : accueil, annuaire, profil, thèmes et fiche de scrutin ; aucun débordement horizontal constaté. Aucun fichier de capture créé. La connexion Google et les règles d'accès administrateur ne sont pas modifiées.

### Densité des cartes et graphiques (02/10/2026)

Les cartes documentaires, profils de partis, sous-thèmes, groupes, indicateurs et graphiques partagent des espacements plus courts. Les valeurs, les intitulés complets, les périodes, les dénominateurs, les sources et les limites restent visibles ; aucun contenu n'est supprimé pour réduire la hauteur. Les grilles de sous-thèmes et de groupes affichent trois colonnes à partir de 1 200 px, deux sur les formats intermédiaires et une sur mobile. Les gros compteurs adaptent leur taille aux petits écrans.

Mesures DOM avant/après à largeur identique de 1 280 px, avec les données publiques réelles :

| Élément mesuré | Avant | Après | Hauteur gagnée |
|---|---:|---:|---:|
| Graphique immigration de `/scrutins` | 1 594 px | 1 281 px | 20 % |
| Première ligne du graphique | 84 px | 66 px | 21 % |
| Carte de scrutin immigration | 498 px | 417 px | 16 % |
| Carte de parti à l'accueil | 711 px | 608 px | 14 % |
| Carte de sous-thème | 528 px | 442 px | 16 % |
| Carte de groupe | 296 px | 230 px | 22 % |

Vérifications sans captures : accueil, scrutins, thèmes Assemblée/Sénat, groupes, profil de parti et détail de scrutin ; contrôles à 320, 390, 768 et 1 280 px. Aucun débordement horizontal ni compteur tronqué constaté après ajustement. Ces styles sont intégrés aux parcours de sondages et de candidats ; le build de production utilise le compilateur normal du projet.

## Périmètre et méthode

### Lire les sondages et les fiches de la présidentielle

Les sondages proposent une série par personne, avec échelle explicite, et une vue d'ensemble avec échelle commune. Les points superposés gardent chaque configuration et chaque notice originale. Les fiches regroupent identité, rattachements datés, sondages et bulletins personnels. Les conteneurs publics occupent 90 % de la largeur desktop, et les filtres se replient sur mobile. Les thèmes clair et sombre sont disponibles. Voir [les choix et contrôles de l'interface présidentielle](docs/interface-presidentielle.md).

La période de travail commence en 2017. La première couverture vise l'Assemblée nationale, le Sénat et le Parlement européen ; pour le droit français adopté, les dossiers législatifs de l'Assemblée nationale et les lois promulguées du Sénat, qui publient tous deux les références du Journal officiel (l'API Légifrance n'est pas utilisée : son compte est réservé en pratique au secteur public). Les programmes originaux et professions de foi complètent ces sources. Les déclarations médiatiques ne sont ajoutées que si l'enregistrement ou la transcription précise est accessible et vérifiable. Les collectivités locales ne font pas partie de la première version.

Une fiche documentaire doit indiquer la date, l'auteur ou l'institution quand ils sont connus, le document original, son URL et le repère utile (page, article, numéro de scrutin, horodatage). Un rapprochement entre une promesse et un vote est documenté et révisable : un vote contre un texte entier ne prouve pas une opposition à chacune de ses mesures. Un scrutin non nominatif ne révèle pas la position individuelle des élus. Le site distingue pour, contre, abstention, non-participation et position individuelle indisponible.

Les effets observés (statistiques publiques, application d'une loi) demandent leur propre source, leur période et leurs limites. La simple succession d'un vote et d'un indicateur ne démontre pas une causalité. Une comparaison de partis ou de personnalités est envisagée avec les mêmes règles documentaires pour tous.

## État du dépôt

Le dépôt contient une interface Next.js — site public et espace de relecture —, un modèle SQL (`sources`, `actors`, `actor_relations`, `evidence`, `evidence_links`, `admin_users`, colonne `topics`, `vote_party_coverage`, `vote_party_tallies`, `vote_group_coverage`, `vote_group_tallies`) avec politiques RLS et quatorze migrations, la logique serveur de lecture (`lib/`), les pipelines d'ingestion et l'outil de revue éditoriale (`ingestion/`), et une chaîne de construction pour Cloud Build et Cloud Run. Le site public affiche les pièces **publiées** : accueil, scrutins regroupés par sujets, graphiques de bulletins individuels rattachés aux partis à l'Assemblée nationale et décomptes officiels par groupe au Sénat, liste paginée, rubriques officielles, fiches avec provenance et page de méthode. L'espace `/admin` gère la relecture et la publication. Sans variables Supabase, chaque page affiche un état vide explicite.

**Les quatorze migrations ont été appliquées au projet Supabase** (`pntkhwdosrvsdybzsicp`) après inspection de l'historique et du schéma. Les politiques RLS et les droits de lecture ont été vérifiés en rôle `anon`. La base contient **20 407 pièces**, **2 241 acteurs**, **11 380 liens d'acteur datés**, **3 797 liens documentaires candidats**, 20 sources et environ **80 Mo** mesurés le 01/10/2026. Les migrations récentes ajoutent les décomptes nominatifs rattachables aux partis, les lectures publiques paginées et les décomptes officiels par groupe du Sénat : **2 157 scrutins**, **18 854 lignes scrutin/groupe**, **750 197 positions** ; aucune divergence avec les totaux officiels sur les pages importées.

**État relu le 02/10/2026 : 3 674 pièces publiées**, soit **666 lois promulguées du Sénat**, **2 157 scrutins publics du Sénat** et **851 scrutins de l'Assemblée nationale**. La publication repose sur un contrôle technique de conformité aux archives officielles, avec empreinte SHA-256 et comparaison des faits ; elle ne vaut pas relecture humaine pièce par pièce. Le premier lot comptait 3 624 pièces conformes, puis 50 scrutins AN ont été publiés par le pipeline automatique le 01/10/2026 (indice documentaire 0,990). **Les 16 733 autres pièces restent en brouillon et invisibles**. Les références publiques restent bornées par les pièces et décomptes publiés ; les instantanés de candidats ont leurs propres politiques de lecture. Aucun rapprochement interprétatif n'est publié. Programmes, déclarations, interprétations et affaires judiciaires restent soumis à une revue humaine. Les tests PGlite et les imports distants ont vérifié insertion, idempotence, protection des pièces relues, provenance, recherche et droits de revue.

Le corpus présidentiel contient **33 sondages publiés, 214 configurations et 1 702 résultats**, ainsi que **14 identités recoupées, 119 rattachements institutionnels datés et 1 549 bulletins personnels**. L'annuaire conserve les 26 personnes testées dans les sondages, dont douze sans correspondance institutionnelle documentée. Les trois questions pilotes et leurs trois liens de scrutin restent en brouillon. Méthodes et commandes : [sondages](docs/sondages-2027.md) et [candidats et mesures](docs/candidats-positions.md).

La connexion Google de `/admin` passe par Supabase Auth et la liste `admin_users`. Elle a été exercée de bout en bout ; le site est déployé sur Cloud Run. Les accès OAuth et les variables d'exécution sont configurés hors du dépôt.

## Site public et espace de relecture

Le site utilise le thème sombre par défaut. Le switch soleil/lune dans l'en-tête permet de passer au thème clair ; le choix est conservé dans le navigateur (`preuve-publique-theme`) et partagé entre ses onglets. Le thème mémorisé est appliqué avant l'affichage du contenu, sans rendre les pages statiques dynamiques. Si le stockage local est bloqué, le switch reste utilisable pendant la visite.

| Adresse | Contenu |
|---|---|
| `/` | accueil : profils de partis par thème et sous-thème, derniers scrutins publiés et accès direct aux sujets recherchés |
| `/partis` | récapitulatif des partis, catégories et zooms sur quatre sous-thèmes |
| `/partis/[id]` | profil individuel : trois catégories, dix-neuf sous-thèmes, parts et derniers votes sourcés |
| `/scrutins` | scrutins publiés, catégories et sous-thèmes lexicaux, graphiques par parti pour l'Assemblée et par groupe pour le Sénat, détail scrutin par scrutin et recherche |
| `/groupes` | annuaire visuel des groupes de l'Assemblée : 21 regroupements de navigation pour 42 identifiants officiels visibles, recherche par ancien nom, filtre temporel et répartition des positions majoritaires publiées |
| `/groupes/<id>` | scrutins publiés de l'Assemblée pour les variantes explicites du nom, du plus récent au plus ancien ; intitulé, identifiant, période et voix de chaque organe restent distincts |
| `/observatoire` | état des chantiers parole/vote, inégalités, indicateurs et affaires judiciaires, sans données inventées |
| `/pieces` | liste paginée des pièces publiées, filtres type/institution, recherche plein texte |
| `/pieces/<id>` | fiche : source et faits structurés, résultat officiel, parts pour/contre/abstention/non-vote par parti à l'Assemblée ou par groupe au Sénat lorsque les décomptes sont vérifiés |
| `/categories` | page récapitulative : graphiques par parti (Assemblée) ou par groupe (Sénat) pour trois catégories et dix-neuf sous-thèmes, puis rubriques publiées par les sources |
| `/categories/<rubrique>` | pièces publiées portant cette rubrique, paginées |
| `/methode` | méthode, sources officielles et limites assumées |
| `/presidentielle-2027` | accès aux sondages, aux personnes testées et à la comparaison documentaire |
| `/presidentielle-2027/sondages` | mesures Sondax, configurations exactes, filtres, graphique de points et sources originales |
| `/presidentielle-2027/candidats` | annuaire des personnes testées, sans confirmation implicite de candidature officielle |
| `/presidentielle-2027/candidats/[candidate]` | identité, rattachements datés, sondages, bulletins personnels et documents disponibles |
| `/presidentielle-2027/comparer` | jusqu'à trois personnes, mêmes scrutins et sous-thème, avec données manquantes explicites |
| `/admin` | atelier de relecture : compteurs, accès aux files et journal d'ingestion |
| `/admin/review` | file des pièces : brouillon → relu → publié, retour d'un cran, relecteur enregistré |
| `/admin/links` | file des rapprochements, mêmes transitions |
| `/admin/runs` | passages d'ingestion (options, volumes, résultat) |
| `/admin/publication` | règle automatique, indice de conformité et compteur |
| `/admin/measures` | revue humaine des mesures, de leurs pièces et des adhésions, soutiens ou coalitions proposés |

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

1. **Console Google Cloud** → *Google Auth Platform* → *Clients* → créer un client OAuth de type **Web application**. Origines JavaScript autorisées : `https://preuve-publique.fr` et `http://localhost:3000`. URI de redirection autorisée : `https://<project-ref>.supabase.co/auth/v1/callback` (l'adresse exacte est affichée sur la page du fournisseur Google du tableau de bord Supabase).
2. **Tableau de bord Supabase** → *Authentication* → *Providers* → **Google** : activer, coller l'identifiant client et le secret.
3. **Supabase** → *Authentication* → *URL Configuration* : *Site URL* = `https://preuve-publique.fr` ; *Redirect URLs* : `https://preuve-publique.fr/auth/callback` et `http://localhost:3000/auth/callback`.
4. Vérifier : ouvrir `/admin`, se connecter avec Google, valider une pièce, contrôler qu'elle apparaît sur `/pieces`.

Les variables d'exécution du service web restent `SUPABASE_URL` et `SUPABASE_PUBLISHABLE_KEY` (aucune clé supplémentaire n'est nécessaire : l'identifiant et le secret Google vivent dans la configuration du projet Supabase). Les valeurs `GGL_OAUTH_CLIENT_ID` / `GGL_OAUTH_CLIENT_SECRET` d'un `.env.local` ne sont **pas lues par l'application** — ce sont des valeurs de passage vers le tableau de bord ; elles ne doivent jamais être commitées, et peuvent être supprimées une fois le fournisseur activé.

Ces adresses indiquent la configuration attendue pour le nouveau domaine de production. Leur présence dans la documentation ne confirme pas une modification des réglages OAuth ou Supabase : contrôler la connexion sur ce domaine après toute mise à jour de ces réglages.

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

### Sondages de la présidentielle 2027

Les noms des sondages ouvrent désormais `/presidentielle-2027/candidats/[candidate]` : identité recoupée, rattachements datés, bulletins personnels et liens séparés vers les votes des partis. `/presidentielle-2027/comparer` présente les mêmes scrutins pour jusqu’à trois personnes, par sous-thème. Migration et import vérifiés le 02/10/2026 : 14 identités, 119 rattachements et 1 549 bulletins ; trois questions pilotes restent en brouillon. Le rattachement AN pour le financement public n’est pas une adhésion, et aucun programme 2027 ou score idéologique n’est inféré. La revue des mesures se trouve dans `/admin/measures`. Méthode, commandes et limites : [docs/candidats-positions.md](docs/candidats-positions.md).

La section `/presidentielle-2027/sondages` présente les mesures Sondax par liste exacte de candidats, tour, période et institut, avec graphique de points et sources originales. Aucune moyenne n’est calculée. L’API interne, la migration dédiée, l’import transactionnel et le workflow quotidien sont décrits dans [docs/sondages-2027.md](docs/sondages-2027.md). Le workflow est sur `master`, le secret d’ingestion est configuré et un lancement manuel sans écriture a réussi le 02/10/2026. Ce contrôle ne prouve pas encore une exécution planifiée avec écriture.

```bash
npm run polls:sync -- --dry-run
npm run polls:sync -- --yes --publish  # connexion d’ingestion uniquement ; jamais dans Cloud Run
npm run test:polls
```

Les données sont attribuées à « Sondax, d’après Wikipédia », sous CC BY-SA 4.0. Les anciens mois absents de ce fournisseur ne sont pas inventés. Les révisions et indisponibilités sont tracées dans les tables dédiées et le journal d’ingestion existant.

## Développement local

Prérequis : Node.js **22.18+** et npm.

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
| `GA_MEASUREMENT_ID` | Identifiant public de la propriété GA4, lu à l’exécution ; la collecte reste bloquée avant consentement |
| `DEV_ADMIN_EMAIL` / `DEV_ADMIN_PASSWORD` | Connexion technique locale de l'espace de relecture ; ignorées en production (voir « Compte technique de débogage local ») |

Les variables peuvent rester vides pour travailler sur l'interface : la page présente alors l'état vide. Le fichier `.env.local` est ignoré par Git. Ne placez aucun identifiant réel dans `.env.example`, les fichiers Markdown ou les journaux CI. Avec de vraies valeurs `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` et le fournisseur Google activé pour `http://localhost:3000/auth/callback`, l'espace de relecture fonctionne aussi en local sur `/admin`, et la connexion technique locale évite d'avoir à repasser par Google.

```bash
npm run build        # build Next.js et vérification TypeScript
npm run lint         # ESLint (config à la racine)
npm run typecheck
npm run test:ingestion
npm run test:polls
npm run test:candidates
npm run test:reader
```

Le build produit une application Next.js `standalone` ; le `Dockerfile` l'exécute sur le port attendu par Cloud Run.

Le parcours de relecture, la propriété Analytics dédiée et le bandeau de consentement sont décrits dans [docs/admin-analytics-consent.md](docs/admin-analytics-consent.md), avec les réglages vérifiés et les étapes d’activation en production.

## Base de données

La migration initiale est dans `supabase/migrations/20260929000000_initial.sql` ; `20260930000000_backend_pipeline.sql` ajoute les faits structurés copiés des sources (`detail`), la trace de relecture (`reviewed_by`, `reviewed_at`), la recherche plein texte française et le journal privé `ingestion_runs` ; `20261001000000_fix_reference_policies.sql` corrige les politiques de lecture de `sources` et `actors` (un `id` non qualifié y était résolu vers la table interne, ce qui rendait ces tables invisibles au public — le bug a été trouvé par une lecture réelle en rôle `anon` et couvert par un test) ; `20261002000000_admin_review.sql` ajoute la liste d'administration `admin_users`, les lectures d'administration (tous les statuts, journal d'ingestion) et les transitions de revue, limitées aux colonnes `status`, `reviewed_by` et `reviewed_at`, avec relecteur obligatoire hors brouillon ; `20261003000000_actor_relations.sql` ajoute `actor_relations` (liens datés entre acteurs : `member_of`, `affiliated_to`, `coalition_of`), lisibles publiquement seulement si **les deux** acteurs reliés le sont, et sans statut de relecture — ce sont des mandats recopiés d'un référentiel institutionnel, pas une interprétation ; `20261004000000_evidence_topics.sql` ajoute la colonne `topics` (rubriques publiées par la source, héritées par dossier le cas échéant), son comptage public (`published_topic_counts()`, fonction `security invoker`) et la lecture publique des **groupes nommés dans un vote publié** — un groupe n'existe publiquement que par la pièce qui publie sa position. La migration initiale crée des tables publiques accessibles **en lecture seule** aux rôles anonymes et authentifiés, avec RLS : seuls les éléments au statut `published` et leurs références admissibles sont visibles. Les écritures de l'ingestion doivent passer par une connexion de confiance distincte, jamais par la clé publiée au navigateur.

La migration `20261001052438_publication_confidence.sql` ajoute l'indice de conformité documentaire, la méthode et les contrôles de publication automatique. Elle a été enregistrée sur le projet Supabase sous la version `20261001052438` ; les colonnes ne sont pas modifiables par `authenticated` ou `anon`.

Les migrations `20261002061929_presidential_polls.sql` et `20261002092834_candidate_evidence_path.sql` sont également enregistrées en base. Elles ajoutent respectivement le modèle des sondages et les instantanés de candidats, bulletins, mesures et liens éditoriaux. Les cinq nouvelles tables de chaque parcours ont RLS ; leurs RPC publiques sont `security invoker`. Les commandes et contrôles d'import figurent dans les deux guides dédiés. Aucun programme ni rapprochement interprétatif n'est publié par ces imports factuels.

Note d'historique : la base distante enregistre la troisième migration sous le jeton `20260930063114` alors que le fichier local s'appelle `20261001000000_fix_reference_policies.sql` — divergence antérieure à l'espace de relecture, à garder en tête avant un `supabase db push`. L'état réel de la base a été relu par requêtes directes (`pg_policies`, `has_function_privilege`, `has_column_privilege`) avant et après chaque application, plutôt que de « réparer » l'historique à l'aveugle.

Avant de lancer cette migration sur un projet Supabase existant, inspecter le schéma et l'historique des migrations. Versionner chaque changement SQL, le relire et le tester localement avant `supabase db push`. Ne pas appliquer automatiquement la migration initiale depuis Cloud Build : le déploiement du site et l'évolution de la base sont deux opérations indépendantes.

## Déploiement Cloud Build → Cloud Run

L'adresse publique de production est [https://preuve-publique.fr/](https://preuve-publique.fr/). Le service Cloud Run reste `preuve-publique-git`, dans `europe-west1` ; son adresse technique `https://preuve-publique-git-919818604436.europe-west1.run.app` reste une référence d'infrastructure. Les liens partagés et les contrôles de parcours après livraison utilisent le domaine public, notamment [les scrutins](https://preuve-publique.fr/scrutins), [les sondages](https://preuve-publique.fr/presidentielle-2027/sondages) et [l'espace de relecture](https://preuve-publique.fr/admin).

Le fichier `cloudbuild.yaml` construit l'image avec le `Dockerfile`, la pousse dans Artifact Registry, puis déploie le service Cloud Run. Le projet Google Cloud et l'identifiant du build sont fournis par Cloud Build. Les substitutions par défaut sont :

| Substitution | Valeur par défaut | Signification |
|---|---|---|
| `_REGION` | `europe-west1` | Région du registre et du service |
| `_AR_REPOSITORY` | `preuvepublique` | Dépôt Docker Artifact Registry |
| `_SERVICE` | `preuve-publique-git` | Service Cloud Run existant |

Si le registre est dans une autre région, modifier `_REGION` dans le déclencheur. Ne pas définir de substitution vide : elle peut écraser la valeur par défaut et rendre l'adresse de l'image invalide.

État vérifié le 02/10/2026 : la PR #17 est fusionnée et les sondages sont déployés dans le service Cloud Run `preuve-publique-git`, projet `preuve-publique`, région `europe-west1`. Le build `dd6cfcb4-f03e-4b3a-b8ef-873237b9b614` a livré le commit `abd059e` dans la révision `preuve-publique-git-00030-24x`. Cette référence est un instantané de livraison, pas une indication perpétuellement à jour de la révision active.

Deux déclencheurs surveillent actuellement `master`. Celui géré par Cloud Run (`5ed4b917-d0cf-497c-a133-a2b6fe8bf682`) construit et livre avec sa configuration intégrée, dans `cloud-run-source-deploy`. Le déclencheur `preuve-publique` (`41dbd616-e222-4c40-b56d-30d2c357e0e3`) utilise `cloudbuild.yaml` et `preuvepublique` ; son dernier build `76ad52f4-5a94-4bc5-ae2b-a84b69a373c7` a construit et poussé l'image, puis échoué sur `iam.serviceaccounts.actAs`. Ne pas annoncer ce second chemin comme opérationnel ni élargir IAM à l'aveugle. Les substitutions ci-dessus décrivent le fichier du dépôt, pas celles du déclencheur intégré.

Les deux valeurs d'exécution `SUPABASE_URL` et `SUPABASE_PUBLISHABLE_KEY` viennent de Secret Manager. Aucune chaîne PostgreSQL ni clé privilégiée n'est nécessaire au conteneur web. Après chaque fusion, vérifier le build correspondant au SHA, la révision prête et son trafic, puis les pages et API publiques réelles ; le build web n'applique pas de migration SQL. Les fichiers locaux, caches, archives d'ingestion et téléchargements OAuth sont exclus du contexte Docker.

La configuration initiale utilise zéro instance minimale et deux instances maximales. Cette limite ne garantit pas une facture nulle. Vérifier les quotas gratuits et configurer des alertes de budget ; nettoyer les anciennes images du registre. Supabase Free impose de limiter les données conservées : stocker les métadonnées et de courts extraits, garder les PDF originaux chez leurs éditeurs lorsque possible, mesurer avant tout import historique massif.

## Contribuer

Lire [AGENTS.md](AGENTS.md) avant de modifier les données, la méthode ou le déploiement. Les corrections factuelles doivent conserver un historique de la source et du motif du changement. Aucune accusation, conclusion politique ou correspondance incertaine ne doit être publiée automatiquement.
