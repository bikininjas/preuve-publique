# Effets visuels et parallax

Travail du 3 octobre 2026 sur la branche `codex/visual-motion`.

## Repères mis en valeur

L’accueil conserve sa recherche et son dernier scrutin comme points d’entrée. Un quadrillage, des arcs, deux halos et un dessin de documents ajoutent de la profondeur au bandeau. Les couches décoratives se déplacent à deux vitesses au défilement sur ordinateur. La carte du scrutin, ses chiffres et sa source restent fixes dans le bandeau.

Les six sujets disposent de pictogrammes vectoriels, d’un accent de bordure et d’une flèche au survol ou au focus. Les trois sections d’exploration portent des repères numérotés décoratifs. Un lien natif permet de rejoindre les sujets par ancre. Le bandeau de méthode reprend un motif documentaire.

Sur les pages publiques, les introductions, titres de sections et cartes sélectionnées apparaissent brièvement lorsqu’ils entrent dans le champ de lecture. Les cartes documentaires et les profils disposent de bordures et d’ombres au survol, ainsi que d’un repère au focus clavier. Les titres introductifs ont un filet orange et turquoise. Le même traitement s’applique aux partis.

Une lumière turquoise suit le pointeur sous le contenu des cartes, sans modifier les graphiques. Une barre fine indique la position de lecture en haut de l’écran. Après défilement, un bouton circulaire permet de revenir en haut ; son anneau reprend cette progression. Le bouton remet le focus sur le contenu et conserve les paramètres et l’ancre de l’URL. Les bandeaux des groupes et des sondages reçoivent le décor documentaire ; les boutons ont un reflet bref au survol.

## Bandeau de cookies

Le bandeau est désormais rendu directement sous `body` avec un portail React. Son texte dispose de styles explicites, indépendants du pied de page, et d’un conteneur `consent-content`. Les boutons de consentement et la durée du choix restent identiques. Les contrôles flottants de lecture sont masqués pendant l’ouverture du bandeau ou du dialogue de partage vers une IA.

Le bandeau vide signalé par capture n’a pas été reproduit dans le navigateur de contrôle sur la production : le texte y était présent. La modification isole néanmoins son affichage des styles du pied de page et du sélecteur générique `cookie-copy`. La cause précise de l’affichage observé reste indéterminée.

## Lecture, accessibilité et coût

- Le contenu reste présent et visible dans le rendu serveur. Les apparitions utilisent une animation de 480 ms, sans délai ni état initial masqué en CSS.
- Les décorations sont ignorées des technologies d’assistance et ne capturent pas les clics. Les dates, sources et libellés des graphiques restent disponibles.
- La préférence `prefers-reduced-motion` désactive le parallax, les apparitions et les transitions. Sa modification pendant une visite annule aussi les animations en cours.
- Le parallax est réservé aux écrans de plus de 900 px avec un pointeur précis. Le décor reste statique sur mobile. Le défilement met à jour les couches au plus une fois par frame et s’arrête quand le bandeau sort du champ de lecture ou quand l’onglet est masqué.
- Les liens par ancre gardent un accès immédiat aux sections ; les apparitions sont évitées sur les pages ouvertes avec une ancre. Un focus clavier annule l’animation de la carte concernée.
- Les observateurs et écouteurs sont nettoyés à la navigation. Les remplacements de résultats et le contenu chargé progressivement sont pris en compte.
- Les thèmes clair et sombre utilisent la palette existante. Les pictogrammes prennent une ligne distincte sur petit écran pour préserver la largeur des titres ; les sujets passent sur une colonne à 320 px.
- La lumière des cartes est réservée au pointeur précis sans préférence de réduction des animations. La progression utilise des écouteurs passifs et un observateur de taille pour suivre les pages chargées progressivement ; le retour en haut devient immédiat avec la réduction des animations.
- Les illustrations sont produites en SVG et CSS, sans image externe ni nouvelle dépendance. Les pages d’administration et d’authentification sont exclues des effets.

## Vérifications

- `npm run build` : compilation de production et TypeScript réussis.
- `npm run lint` : réussi.
- `npm run test:reader` : 33 tests réussis.
- `git diff --check` et recherche ciblée de secrets dans les fichiers modifiés.
- Accueil parcouru en clair et sombre avec les données publiques réelles, puis avec le serveur `standalone` du build local.
- Parallax contrôlé au défilement : les couches décoratives changent de position ; la carte du dernier scrutin conserve `transform: none` et ses décomptes.
- Accueil contrôlé à 320, 390 et 1280 px ; catalogue des scrutins à 390 et 768 px ; partis, observatoire et entrée présidentielle à 390 px ; thèmes et méthode à 1280 px. Aucun débordement horizontal de page constaté.
- Parcours de l’ancre vers les sujets, puis d’un sujet vers le catalogue filtré. Administration à 768 px : conteneur d’effets absent.
- Progression contrôlée en haut, après défilement et en bas ; retour en haut avec restauration du focus sur `contenu`, puis navigation par ancre. Groupes et sondages contrôlés à 390 px avec les données publiques.
- Lumière des cartes contrôlée au pointeur : coordonnées du halo mises à jour, opacité active à 1, puis retrait de l’état actif en quittant la carte.
- Bandeau de cookies vérifié à 320, 390 et 1280 px, en clair et sombre, lors du premier choix et à sa réouverture. Titre, explication, lien de confidentialité et boutons visibles. Fermeture avec restauration du focus ; absence de script Google Analytics avant consentement et après refus. Le test local active uniquement un identifiant de mesure fictif et ne donne aucun accord.
- Le workflow `web-checks.yml` exécute lint, les tests de lecture et le build sur chaque PR vers `master`, sans secrets ni écriture en base.

La réduction des animations a été contrôlée dans le code et les règles CSS ; la préférence système du navigateur n’a pas été changée pendant cette vérification.

## Comparaison avec la production

Le 3 octobre 2026, le service Cloud Run `preuve-publique-git` sert à 100 % la révision `preuve-publique-git-00045-lg2`, marquée avec le commit `b263d0e5b64b1e30de5412ec0f3ae334fc6a2405`. Ce commit correspond à `origin/master` après actualisation et inclut la PR #30, arrivée pendant le travail. La branche visuelle a été rebasée sur cette version sans conflit ; les améliorations parallèles de lecture des indicateurs et des parcours documentaires sont conservées. Le domaine public contrôlé est `https://preuve-publique.fr/`.

Cette vérification décrit la production au moment du contrôle ; les effets et la correction du bandeau sont proposés dans la branche, sans déploiement effectué dans ce travail.

## Fichiers

`components/visual-effects.tsx` gère les animations et leur cycle de vie. `components/reading-progress.tsx` gère la progression et le retour en haut. `components/editorial-decoration.tsx` contient les SVG. `app/motion.css` regroupe les styles. Le composant est installé dans `app/layout.tsx` et les repères de l’accueil dans `app/page.tsx`. `components/cookie-consent.tsx` et `app/cookies.css` isolent l’affichage du consentement.
