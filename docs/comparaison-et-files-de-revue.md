# Comparer sur une période commune et comprendre les files de revue

Complément de la PR #31, réalisé le 3 octobre 2026.

## Parcours public

La comparaison permet de choisir deux dates incluses, à partir de 2017. Les mêmes bornes, personnes et mots du sous-thème s’appliquent à toutes les colonnes ; la pagination et le retour à la première page les conservent. Les dates filtrent les scrutins, pas les programmes. Une date inexistante ou une période inversée affiche une erreur et aucun bulletin : elle ne devient pas silencieusement une comparaison sans limite.

Sans dates, la RPC publique existante est conservée. Avec des dates, la lecture publique porte sur `evidence` et ses `candidate_ballots` avec jointure interne, les filtres de publication et les mêmes mots contrôlés. RLS reste appliquée aux deux tables, y compris le recoupement de l’archive nominative avec `vote_party_coverage`. Le site n’utilise que la clé publishable, lit quinze scrutins par page et demande leur nombre exact ; aucune migration, écriture distante ni import n’est nécessaire.

La table « Ce que l’on sait. Ce qui manque. » présente :

- l’identité recoupée avec le référentiel AN, son absence dans le corpus ou une lecture indisponible ;
- les bulletins disponibles et manquants **sur la page affichée**, avec son nombre de scrutins et sa période réelle ;
- les pièces de programmes de 2027 et déclarations reliées aux mesures publiées de ce sous-thème, dédupliquées par document.

Le tableau ne mesure ni présence, ni qualité de la personne, ni proximité politique. Un non-votant enregistré compte parmi les bulletins documentés. Une panne reste une indisponibilité, jamais zéro. L’absence d’un lien validé ne signifie pas absence de programme ou de déclaration. La lecture éditoriale conserve les limites existantes de trente mesures et deux cents liens.

Un brouillon de question commune est proposé après les pièces : proposition précise, source originale, justification publique éventuelle d’un vote et objections. Le lecteur peut le modifier et le copier. Le champ n’appartient à aucun formulaire, n’a pas de paramètre d’URL et n’est ni enregistré ni envoyé. Quitter ou recharger la page perd les modifications.

## Administration

Le tableau de bord explique l’arriéré et propose des entrées vers les scrutins récents, les archives et les rapprochements. La file des pièces ajoute trois filtres :

- **Scrutins AN/Sénat récents** : entre le jour français moins trente jours et ce jour, inclus ;
- **Archives de scrutins AN/Sénat** : avant cette borne ;
- **Programmes, déclarations, indicateurs et judiciaire** : pièces à examiner dans leur contexte éditorial.

La vue « Toutes les pièces » garde les lois, les pièces européennes et tous les autres contenus accessibles à l’administrateur. Institution, type, recherche et statut restent combinables avec la file de travail. Pagination et retour depuis une fiche conservent le filtre, même après un dépassement de pagination.

« Brouillon » désigne une pièce non publiée, sans prétendre identifier une anomalie. Le schéma ne conserve pas de diagnostic d’échec par brouillon permettant de séparer automatiquement « non contrôlé » et « contrôle rejeté ». La file et les liens vers le journal l’indiquent. Les propositions de rapprochement restent distinctes de leurs parents publics. La page de publication est actualisée pour le contrôle AN **et** Sénat effectivement pris en charge par le pipeline.

Cette réalisation ne publie aucune archive et ne change aucune règle de revue ni autorisation.

## Contrôles

- Sur les données publiques réelles : cinq scrutins de logement avec Le Pen/Mélenchon/Attal ; mêmes lignes et positions avec une période couvrant le corpus. Le filtre 2023 retourne un scrutin ; une période limitée au 4 avril 2023 conserve ce scrutin, ce qui vérifie les deux bornes incluses.
- Sur le budget, Ruffin/Faure/Le Pen : vingt et un scrutins, quinze sur la première page et six sur la seconde ; mêmes personnes, sujet et dates dans la pagination. Une identité non recoupée reste explicitement distincte d’un bulletin manquant.
- Administration avec la session locale existante et les données réelles : zéro brouillon récent, 16 106 archives de scrutins en brouillon, pagination de 323 pages, retour de fiche conservant la deuxième page et la file ; la page 999 conserve le décompte et propose le retour.
- Dates impossibles/inversées, panne versus zéro, non-votant documenté, programmes anciens, document relié plusieurs fois et conservation des filtres couverts par les tests ciblés.
- Build final, lint et quarante tests de lecture réussis. Le build final propose le retour à la première page d’une comparaison hors pagination en conservant les deux dates, le sujet et les personnes.
- Comparaison et files de revue contrôlées à 320, 390, 768 et 1280 px, en clair et sombre : pas de débordement horizontal de la page. Les tableaux comparatifs défilent dans leur propre conteneur sur mobile. La question modifiée reste hors de tout formulaire et de l’URL.

Les volumes sont un constat de contrôle daté, pas des constantes utilisées dans l’interface. Le déploiement web et une éventuelle reprise historique restent des opérations distinctes.
