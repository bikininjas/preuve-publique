# Corpus recentré : état vérifié le 3 octobre 2026

La base publique expose 1 772 scrutins retenus : 570 Assemblée, 375 Sénat et 827 Parlement européen. Ces nombres ont été vérifiés par une lecture anonyme soumise à RLS, sans filtre de statut ajouté par le vérificateur. Les autres scrutins sont en brouillon, récupérables ; la suppression physique est préparée et attend validation.

| Institution | Scrutins analysés | Votes d’ensemble repérés | Derniers votes retenus |
|---|---:|---:|---:|
| Assemblée nationale | 17032 | 801 | 570 |
| Sénat | 2157 | 410 | 375 |
| Parlement européen | 32619 | 827 | 827 |

La règle retient le dernier vote disponible dans chaque chambre sur un projet ou une proposition de loi entière, adopté ou rejeté. Un article qui constitue explicitement l’ensemble est admissible. Les amendements, parties, motions et résolutions nationales sont exclus. Pour le PE, une référence de document et une mention finale explicite sont requises ; les résolutions non législatives restent distinctes des lois. Le PE ne décide pas seul de l’adoption définitive de tous les actes européens.

Le dossier officiel sert au regroupement ; sans identifiant, le même intitulé dans la même législature sert seulement de repli. 187 fiches AN et cinq du Sénat sont dans ce second cas. Parmi les scrutins AN retenus, 47 mentionnent une lecture définitive. Les autres ne sont pas présentés comme définitifs. Cette sélection ne garantit pas la couverture de toutes les lois : certains votes publics manquent, certains textes sont adoptés sans scrutin public final et les intitulés ambigus sont exclus. [La navette expliquée par le Sénat](https://www.senat.fr/connaitre-le-senat/role-et-fonctionnement/la-navette-parlementaire.html).

## Documents et limites

- Assemblée nationale : 603 textes adoptés publiés.
- Sénat : 666 textes adoptés publiés.
- Parlement européen : 4393 textes adoptés publiés.
- Inégalités : 24 indicateurs publiés.

Le rejeu AN porte sur 17 032 scrutins et 603 lois promulguées. Le jeu courant XVII a été rafraîchi et recoupé avant mise à jour de provenance. Les 4 393 textes adoptés européens ont été relus depuis dix éditions annuelles avec pagination stable par identifiant de document. La première pagination par pertinence produisait des doublons : elle a été remplacée et la totalité a été recoupée avant publication.

L’API européenne a fourni 32 619 votes, dont 965 en 2019 et aucun pour 2017–2018 dans cet import ; cela ne prouve pas qu’aucun vote n’a eu lieu pendant ces années. 18 034 résultats étaient absents de la source dans le corpus intégral, et aucun n’a été déduit des comptes de voix. Seuls 827 votes explicitement finaux ont finalement été publiés. Les fichiers originaux restent hors Postgres et hors Git.

Les décomptes AN ont été complétés pour 16 996 scrutins, sans réécrire les 847 couvertures historiques. 36 listes nominatives ne rejoignent pas le décompte officiel et sont exclues. Les rattachements absents ou ambigus ne deviennent pas des affiliations supposées. Les bulletins personnels passent de 1 549 à 13 350 avant nettoyage ; la lecture publique suit les 1 772 scrutins retenus.

L’Observatoire possède un premier lot documenté de 40 brouillons : les douze professions de foi du premier tour 2022, vingt déclarations sélectionnées et huit étapes historiques de six dossiers judiciaires. [La revue détaillée](corpus-a-relire-2026-10-03.md) conserve sources, dates, repères et limites. Ces documents ne constituent ni tous les programmes détaillés, ni des programmes 2027, ni une histoire judiciaire complète ou actuelle. Les rubriques publiques restent vides jusqu’à leur validation.

Les 3797 rapprochements ont une référence commune et une justification vérifiées. 452 relient actuellement deux pièces publiques ; aucun n’a été publié à la place d’un relecteur. Le nettoyage proposé archive 3 345 liens associés à des scrutins exclus et conserve 452 liens.

## Livraison et validation

Le code prévoit bleu pour l’Assemblée, violet pour le Sénat et turquoise pour le PE, avec noms visibles sur filtres, cartes et fiches. Les couleurs ont été vérifiées en thèmes clair/sombre et à 390 px sans débordement horizontal. Les titres européens conservent leurs références pour éviter les cartes homonymes.

Les imports quotidiens et les reprises filtrent avant insertion. L’import quotidien contrôle les archives, reste borné à 500 nouveaux scrutins, retire la lecture précédente de l’affichage dans la même transaction et garde une trace d’exécution. Son activation, celle du PE quotidien et les couleurs dépendent encore de la livraison de cette branche ; le workflow courant peut réintroduire des votes hors sélection avant cette livraison. Aucune migration ni modification des droits n’est nécessaire.

Compilation Next.js et contrôles TypeScript réussis ; lint et vérification des espaces réussis. 73 tests ingestion/Observatoire, 40 tests de lecture et quatre tests candidats passent. Les contrôles couvrent les droits publics, les pièces relues, les divergences, la pagination, le dernier vote d’ensemble, l’idempotence quotidienne, l’archivage et la restauration des identifiants et dépendances. Les pages de production contrôlées répondent 200 ; les codes de l’interface en préparation n’y sont pas encore déployés.

La base mesurait 218.6 Mio avant nettoyage. [Le plan et l’archive récupérable](../ingestion/backfill/README.md) précisent les suppressions physiques proposées. Une suppression libère des pages réutilisables ; elle ne garantit pas une baisse immédiate de la taille physique.
