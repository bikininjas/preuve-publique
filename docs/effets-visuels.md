# Effets visuels et parallax

Travail du 3 octobre 2026 sur la branche `codex/visual-motion`.

## Repères mis en valeur

L’accueil conserve sa recherche et son dernier scrutin comme points d’entrée. Un quadrillage, des arcs, deux halos et un dessin de documents ajoutent de la profondeur au bandeau. Les couches décoratives se déplacent à deux vitesses au défilement sur ordinateur. La carte du scrutin, ses chiffres et sa source restent fixes dans le bandeau.

Les six sujets disposent de pictogrammes vectoriels, d’un accent de bordure et d’une flèche au survol ou au focus. Les trois sections d’exploration portent des repères numérotés décoratifs. Un lien natif permet de rejoindre les sujets par ancre. Le bandeau de méthode reprend un motif documentaire.

Sur les pages publiques, les introductions, titres de sections et cartes sélectionnées apparaissent brièvement lorsqu’ils entrent dans le champ de lecture. Les cartes documentaires et les profils disposent de bordures et d’ombres au survol, ainsi que d’un repère au focus clavier. Les titres introductifs ont un filet orange et turquoise. Le même traitement s’applique aux partis.

## Lecture, accessibilité et coût

- Le contenu reste présent et visible dans le rendu serveur. Les apparitions utilisent une animation de 480 ms, sans délai ni état initial masqué en CSS.
- Les décorations sont ignorées des technologies d’assistance et ne capturent pas les clics. Les dates, sources et libellés des graphiques restent disponibles.
- La préférence `prefers-reduced-motion` désactive le parallax, les apparitions et les transitions. Sa modification pendant une visite annule aussi les animations en cours.
- Le parallax est réservé aux écrans de plus de 900 px avec un pointeur précis. Le décor reste statique sur mobile. Le défilement met à jour les couches au plus une fois par frame et s’arrête quand le bandeau sort du champ de lecture ou quand l’onglet est masqué.
- Les liens par ancre gardent un accès immédiat aux sections ; les apparitions sont évitées sur les pages ouvertes avec une ancre. Un focus clavier annule l’animation de la carte concernée.
- Les observateurs et écouteurs sont nettoyés à la navigation. Les remplacements de résultats et le contenu chargé progressivement sont pris en compte.
- Les thèmes clair et sombre utilisent la palette existante. Les pictogrammes prennent une ligne distincte sur petit écran pour préserver la largeur des titres ; les sujets passent sur une colonne à 320 px.
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

La réduction des animations a été contrôlée dans le code et les règles CSS ; la préférence système du navigateur n’a pas été changée pendant cette vérification.

## Fichiers

`components/visual-effects.tsx` gère les animations et leur cycle de vie. `components/editorial-decoration.tsx` contient les SVG. `app/motion.css` regroupe les styles. Le composant est installé dans `app/layout.tsx` et les repères de l’accueil dans `app/page.tsx`.
