# Parcours longs : indicateurs, thèmes et fiches

Deuxième passe du 3 octobre 2026, après la simplification des 18 modèles publics décrite dans [le premier contrôle](interface-lecture-2026-10-03.md).

## Changements

- L’observatoire présente les indicateurs avant les rubriques encore sans publication. Trois entrées courtes indiquent les disponibilités réelles et ouvrent les sections. Les compteurs de scrutins restent consultables en fin de page.
- Les neuf domaines sont accessibles dans un index natif, avec le nombre de fiches actuellement affichées par domaine. Les 24 cartes restent visibles sans déplier cet index ; les liens « Domaines » permettent de revenir au choix.
- Dans les cartes d’indicateurs, le chiffre précède son résumé ; l’unité des comparaisons est écrite une fois au-dessus du tableau. Les valeurs, périodes, territoires, résumés, précautions, éditions et sources restent affichés. La mention « Sans relecture par Preuve Publique » conserve la distinction entre publication et validation humaine.
- Les pages de thèmes proposent un retour aux catégories et un accès à tous les scrutins du thème, avec l’institution conservée. Les 19 graphiques de sous-thèmes restent visibles à l’Assemblée comme au Sénat.
- Les fiches documentaires se terminent par trois chemins de lecture adaptés à leur type : autres scrutins de l’institution, thèmes et méthode ; ou indicateurs, catalogue et règles de comparaison.
- Le long encadré programme/vote répété sous les graphiques de partis est remplacé par une précaution courte et un lien vers la méthode complète. Les exclusions, affiliations datées, nombres de bulletins et périodes du graphique restent affichés.

## Repères mesurés

Lecture à 1280 × 720, corpus public réel identique, index de domaines fermé. Les positions sont mesurées depuis le haut du document, après initialisation de l’interface.

| Repère | Avant | Après |
| --- | ---: | ---: |
| Première carte d’indicateur dans l’observatoire | 1923 px | 791 px |
| Carte patrimoine Insee | 815 px | environ 716 px |
| Hauteur de l’observatoire | 12726 px | environ 11426 px |

Les chiffres mesurés décrivent ces écrans et ce corpus ; ils ne constituent pas une garantie pour toutes les tailles d’affichage.

## Contrôles

- Build Next.js de production, lint et 33 tests de lecture, partage et consentement.
- Contrôle des pages modifiées sur ordinateur et mobile, dans les thèmes clair et sombre : observatoire, catalogue des indicateurs, thèmes Assemblée/Sénat, catalogue des scrutins, fiche d’un scrutin AN et fiche patrimoine Insee.
- Les 24 identifiants, valeurs principales, valeurs de comparaison et URL de sources sont identiques avant/après dans le navigateur. Aucun nouvel indicateur ni rapprochement n’est produit.
- Les neuf domaines et leurs décomptes, les 19 graphiques de chaque institution, les ancres et les liens de continuation sont accessibles. Aucun débordement horizontal de page ni lien public vers l’administration.
- Les données ne sont ni migrées ni modifiées. Les fichiers OAuth, Analytics et consentement ne changent pas.

## Isolation et livraison

Les modifications visuelles en cours dans le dossier principal sont préservées. Cette passe utilise un dossier de travail isolé et la branche codex/documentary-exploration. La livraison doit recouper fusion GitHub, build, révision Cloud Run et pages du domaine public.
