# Interface publique : lecture et exploration

Passe du 3 octobre 2026, sur les 18 modèles de pages publiques. Les fiches dynamiques ont été contrôlées avec des documents réellement publiés ; il ne s’agit pas d’une relecture de chaque pièce du corpus.

## Constats et changements

Les grands titres en forme de slogan, les introductions répétées et la barre de partage occupaient le début de presque chaque page. Sur l’accueil, les sujets arrivaient après les scrutins et les profils des partis. Dans le catalogue des scrutins, le répertoire complet des sujets repoussait la recherche.

- Titres explicites : « Scrutins », « Votes par thème », « Partis politiques », « Groupes parlementaires », « Pièces publiées », « Observatoire » et « Sondages ».
- Introductions raccourcies, suppression du bandeau de trois explications sur l’accueil, des slogans de sections et de la répétition « Personne testée dans les sondages » sur chaque carte de l’annuaire.
- Sujets placés juste après l’entrée de l’accueil ; aperçu de trois scrutins récents, avec accès au catalogue complet.
- Recherche et institutions placées avant le répertoire des 19 sujets, disponible dans un panneau natif. Les trois catégories et les 19 graphiques de sous-thèmes restent affichés dans la page des thèmes.
- Partage rassemblé dans un bouton : les quatre réseaux, la copie du lien et le prompt IA modifiable restent disponibles. Le panneau est superposé au contenu quand il est ouvert ; le dialogue IA reste indépendant.
- Cartes, titres, espacements et coins harmonisés ; liens entre les trois pages présidentielles ; accès direct aux votes et aux intitulés officiels depuis une fiche de groupe.
- Accueil : si le dernier scrutin AN ne fournit aucun bulletin attribuable ou si sa sélection est indisponible, les profils utilisent les six partis les plus documentés du corpus, archives comprises. La page explique ce périmètre ; aucune affiliation ni position n’est déduite.

Les dates, sources, périmètres des amendements, états indisponibles, dénominateurs, différences entre partis et groupes, limites des sondages et absence de candidature officielle restent visibles. Les textes de confidentialité et les règles de consentement ne sont pas réécrits. Les accès publics à l’administration restent absents.

## Pages parcourues

Chaque modèle a été ouvert en clair et en sombre, sur ordinateur (1280 × 720) et sur mobile (390 × 844). Aucun débordement horizontal de page n’a été constaté. Les grands tableaux conservent leur défilement interne.

| Page | Vérification et amélioration |
| --- | --- |
| `/` | Sujets remontés, trois scrutins, six profils réels, sélection historique explicitée |
| `/scrutins` | Recherche, institutions, panneau de sujets, liste et synthèse |
| `/categories` | Trois catégories et 19 sous-thèmes, index repliable, parcours Assemblée et Sénat |
| `/categories/[slug]` | Rubrique « Société », provenance institutionnelle et catalogue |
| `/partis` | Recherche, cartes, archives et légende conservées |
| `/partis/[id]` | La République en Marche : corpus daté et tous les sous-thèmes |
| `/groupes` | Couverture réelle, annuaire et recherche des anciens noms |
| `/groupes/[id]` | Démocrates / MoDem : identifiants distincts et votes sourcés |
| `/pieces` | Filtres et pièces publiées, sans modification de la pagination |
| `/pieces/[id]` | Scrutin AN et indicateur de patrimoine Insee : sources, résultat, unités et provenance |
| `/observatoire` | Rubriques, compteurs, indicateurs et états sans publication |
| `/methode` | Entrée raccourcie, sections et précautions documentaires conservées |
| `/presidentielle-2027` | Trois entrées côte à côte sur ordinateur, empilées sur mobile |
| `/presidentielle-2027/sondages` | Titre direct, filtres, graphique chargé et configurations dépliables |
| `/presidentielle-2027/candidats` | Cartes compactes et navigation présidentielle commune |
| `/presidentielle-2027/candidats/[candidate]` | Bruno Le Maire : statut de correspondance, rattachements, sondages et pièces |
| `/presidentielle-2027/comparer` | Sélecteurs et mêmes scrutins pour les personnes choisies |
| `/confidentialite` | Typographie ajustée ; responsable, contact et information sur le consentement conservés |

## Repères avant et après

Mesures de position verticale sur ordinateur à 1280 × 720, avant modification sur le domaine public et après modification dans l’aperçu local. Elles décrivent un instantané du corpus, pas un indicateur de fréquentation ou une garantie sur tous les appareils.

| Repère | Avant | Après |
| --- | ---: | ---: |
| Recherche du catalogue des scrutins | après le titre de filtres à 1184 px | formulaire à 469 px |
| Titre des résultats du catalogue | 1388 px | 635 px |
| Accès aux sujets de l’accueil | titre à 2753 px | section à environ 757 px |

## Validation

- `npm run build`, `npm run lint` et les 33 tests de `npm run test:reader` réussis.
- Contrôle des 18 modèles dans les deux thèmes et aux deux dimensions ; vérification de l’absence de liens publics vers `/admin`.
- Parcours réel : sélectionner « Retraites », changer l’institution pour le Sénat et conserver le sujet ; ouvrir le résultat et les sous-thèmes par ancre.
- Partage sur mobile : panneau dans la largeur de l’écran, dialogue IA ouvert, prompt modifiable et origine publique conservée. Aucun message publié sur un réseau ni envoyé à une IA.
- Graphique des sondages chargé avec ses points ; fiche Insee conservant « % du patrimoine brut total » et « Début 2024 ».
- L’aperçu de développement signale que la CSP interdit `eval` pour la reconstruction des piles React. Cette restriction n’a pas été assouplie ; le message concerne le mode développement.

La vérification de livraison doit recouper le commit fusionné, le build Cloud Run, la révision recevant le trafic et les pages du domaine public.
