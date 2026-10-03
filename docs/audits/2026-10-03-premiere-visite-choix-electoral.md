# Première visite : se faire une idée de « pour qui voter ? »

Analyse et première réalisation du 3 octobre 2026, avant fusion de la PR #31.

## Le manque principal

Le site permet de retrouver un vote, mais demande au nouveau lecteur de connaître déjà le sujet, la personne et la pièce à chercher. Le lecteur qui vient préparer son choix a d’abord besoin de formuler ses questions, de comprendre les décisions et de garder une trace de ce qui lui manque pour conclure.

La comparaison existante est une bonne base : elle place les mêmes scrutins face aux mêmes personnes. Le nouvel investissement utile est le chemin qui y conduit, puis des dossiers qui expliquent le dispositif exact. Les seuls pourcentages thématiques et sondages ne remplissent pas ce besoin.

Parcours de production contrôlé pendant cette analyse : sur le logement, la comparaison de Marine Le Pen, Jean-Luc Mélenchon et Gabriel Attal affiche cinq scrutins et aucune fiche de mesure validée pour ce sous-thème. Ce constat porte sur cette sélection, pas sur l’ensemble des sujets ni sur leurs positions politiques : [parcours de contrôle](https://preuve-publique.fr/presidentielle-2027/comparer?subject=logement&candidate=le-pen&candidate=melenchon&candidate=attal).

Ce diagnostic est une évaluation produit de l’agent, après lecture du dépôt et parcours public de la comparaison. Il ne s’agit pas d’une étude avec des utilisateurs ni d’un test quantifié de compréhension. Les chiffres et états du précédent audit du 2 octobre restent des instantanés ; cette analyse ne les reprend pas comme état actuel.

## Initiative réalisée dans cette PR

### Un atelier « Préparer mon vote »

`/preparer-mon-vote` propose une entrée à partir des questions du lecteur :

1. Choisir un à trois sujets parmi la taxonomie existante ; aucun sujet ni personne n’est présélectionné.
2. Choisir, si on le souhaite, jusqu’à trois personnes dans la liste réellement publiée des sondages, par ordre alphabétique. Cette liste ne constitue pas une liste de candidatures officielles.
3. Obtenir pour chaque sujet les liens vers les scrutins et la comparaison existante, avec les mêmes personnes et le même sujet. Les pièces s’ouvrent dans un nouvel onglet pour préserver le carnet.
4. Noter sa question, les pièces retenues et les inconnues, puis télécharger un carnet texte contenant les liens et les notes. Une version affichable et copiable reste disponible. Rien n’est enregistré côté serveur ni en stockage navigateur ; quitter ou recharger la page réinitialise le carnet. L’interface l’indique avant la saisie.

L’accueil rend cette entrée visible dans le bandeau principal et immédiatement après celui-ci. L’entrée présidentielle et la comparaison proposent aussi ce chemin. La page reste utilisable par sujet lorsque la liste des personnes est indisponible.

### Le test du contre-exemple

La page invite à conserver une pièce convaincante, une question ouverte et un document susceptible de changer sa première impression. C’est une aide à l’examen personnel des preuves, sans note de proximité, verdict, classement ou désignation d’une personne à choisir.

Trois réflexes accompagnent le parcours : lire le dispositif exact, vérifier la bonne période et reconnaître les données manquantes. La page renvoie vers les programmes et indicateurs disponibles plutôt que d’en inventer. Les notes privées sont exclues des URL ; les liens personnalisés ne sont pas préchargés. Le partage automatique du contexte de page n’est pas installé sur cet atelier afin de garder le carnet distinct des outils de partage documentaire. L’atelier reste exclu de la liste des pages autorisées pour Google Analytics, même lorsqu’un accord a été donné sur une autre page.

## Ce qui manque encore pour rendre le choix réellement éclairé

| Proposition | Ce que le lecteur gagnerait | Conditions de réalisation |
|---|---|---|
| **Un dossier de décision en cinq pièces** | Comprendre une mesure précise : proposition datée, dispositif exact, bulletin, devenir du texte, effet documenté lorsqu’il existe | Un premier lot réduit, sources primaires, article/amendement exact, résumé relu ; absence affichée pour chaque maillon non documenté |
| **Une table des inconnues** | Distinguer « information absente », « personne hors du corpus » et « proposition non encore documentée » avant de comparer | Statuts de couverture fiables et datés, mêmes critères pour tous ; jamais un manque présenté comme un défaut de la personne |
| **Une fenêtre de comparaison commune** | Examiner une période et un ensemble de scrutins identiques, avec les bulletins manquants visibles | Filtres de période et corpus, contrôle des mandats et affiliations ; éventuelles lectures SQL dans une migration distincte |
| **Le périmètre du choix électoral** | Distinguer l’élection préparée, les responsabilités exercées et les décisions qui en relèvent | Fiches institutionnelles sourcées avant publication ; ne pas confondre annuaire de sondages et candidatures officielles |
| **Le bureau des arguments** | Lire les justifications publiées d’un vote et une objection documentée au même endroit | Citations exactes, circonstances, provenance et revue humaine ; pas de justification inventée à partir d’un vote ou d’un groupe |
| **Une frise “avant / décision / après”** | Voir si une promesse précède le vote et ce qui est effectivement entré en vigueur | Dates et étapes législatives recoupées ; une chronologie ne démontre pas une causalité |
| **Une question à adresser aux personnes examinées** | Formuler un manque documentaire précis et confronter les réponses à la même question | Brouillon copiable, aucun envoi automatique ; réponses authentifiées, datées et publiées selon la même méthode |

Le premier dossier pourrait partir d’une question de vie quotidienne que le corpus permet de documenter correctement. Le sujet doit être choisi après examen des pièces disponibles, plutôt qu’en fonction de la personne qu’on souhaite mettre en avant. Il faut conserver le périmètre « sur cette mesure » : un scrutin ne résume ni un programme ni une personne.

## Priorité recommandée après cette PR

1. Livrer un premier dossier complet et relu, accessible depuis le carnet. Montrer le texte voté et ses limites est plus utile qu’ajouter une nouvelle synthèse de pourcentages.
2. Ajouter la table des inconnues et une période commune à la comparaison. Les différences de couverture doivent être lisibles avant toute interprétation.
3. Étendre ensuite les propositions, justifications et effets documentés, avec les mêmes exigences pour chaque acteur.

Le carnet livre dès maintenant un point de départ et une mémoire personnelle des questions. Il ne comble pas à lui seul les lacunes du corpus ni le besoin de relecture documentaire.

## Critères de contrôle

- Nouveau lecteur : accès depuis le premier écran de l’accueil, sélection de sujets, comparaison avec les mêmes paramètres, retour au carnet sans perdre les notes.
- Aucun nom, sujet ou jugement présélectionné ; pas de score ni de recommandation politique.
- Liste de personnes issue de la lecture publique existante ; panne et absence de liste distinctes.
- Export local contenant uniquement les sujets sélectionnés, les noms choisis, les notes correspondantes et les liens publics.
- Clair/sombre, 320/390/768/1280 px, labels et focus clavier, erreurs explicites, absence de débordement.
- Build, lint, tests de lecture et vérifications CI de la PR après publication du commit.

## Vérifications de réalisation

- `npm run build` et `npm run lint` réussis ; 35 tests de lecture réussis, dont les bornes du parcours, la conservation des filtres communs, l’exclusion des notes privées des URL et l’absence d’autorisation Google sur l’atelier.
- Dans le navigateur, 19 sujets et 26 personnes réelles proposés, aucun choix initial ; quatrième sujet et doublons de personnes empêchés. Les liens de chaque sujet conservent les mêmes personnes.
- Parcours clavier sur une case, saisie d’une question, ancre vers le carnet, ouverture de la comparaison dans un autre onglet et conservation des notes dans l’atelier. La comparaison issue du carnet a affiché les deux colonnes choisies et quatre scrutins de logement.
- Version texte affichée contrôlée : note saisie, personnes choisies, sujets et liens publics présents. La commande de téléchargement prépare le même texte ; l’événement natif de réception du fichier n’a pas été observé par l’outil de navigateur. La version copiable permet de conserver le carnet sans dépendre de ce téléchargement.
- Sans configuration de données sur un second serveur local, le choix des personnes affiche une indisponibilité explicite ; les sujets et liens restent utilisables.
- Contrôles à 320, 390, 768 et 1280 px, en clair et sombre : pas de débordement horizontal constaté. À 390 px, le lien du bandeau d’accueil se situe entre 562 et 584 px depuis le haut de la fenêtre, puis mène au guide ; le raccourci du guide rejoint le carnet sans quitter la page. Le rechargement remet effectivement sujets, personnes et notes à zéro.
