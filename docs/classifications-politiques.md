# Repères politiques sourcés

Référentiel vérifié le 4 octobre 2026, dans `lib/political-classifications.ts`.

Les badges affichent le libellé et son contexte à côté des noms dans les cartes de partis, les profils, les graphiques de votes, les fiches de scrutins et le tableau judiciaire. Les références du Sénat et du Parlement européen sont également accessibles sur `/groupes#reperes-groupes`. Les sources, dates, repères et limites sont publics sur `/methode#classifications-politiques` ; les profils disposent de liens directs vers leurs sources.

## Partis

La [circulaire INTP2602966C du 2 février 2026](https://www.legifrance.gouv.fr/circulaire/id/45645), annexes 1 à 3, définit les nuances des candidatures aux municipales de mars 2026 et leur regroupement par blocs. Le [dictionnaire publié sur data.gouv.fr](https://static.data.gouv.fr/resources/donnees-des-elections-agregees/20260324-132009/nuances.csv), lu intégralement, fournit les correspondances. Seules les formations explicitement citées et leurs variantes attestées de nom sont retenues. Les catégories génériques ne sont pas appliquées à des formations par proximité supposée.

La [décision n° 512694 du 27 février 2026](https://www.conseil-etat.fr/fr/arianeweb/CE/decision/2026-02-27/512694) contrôle la légalité de cette grille à l'occasion des recours de LFI et de l'UDR. Elle mentionne aussi RN. La [décision n° 488378 du 11 mars 2024](https://www.conseil-etat.fr/fr/arianeweb/CE/decision/2024-03-11/488378) porte sur la grille des sénatoriales de 2023 ; le classement de LFI dans ce contexte reste visible comme ancien repère. Aucun contrôle particulier n'est inventé pour les autres partis.

Il existe une [circulaire distincte du 23 août 2026 pour les sénatoriales](https://www.legifrance.gouv.fr/circulaire/id/45684). Le référentiel présenté ici revendique le contexte municipal examiné par le Conseil d'État, sans annoncer une classification universelle ou la dernière grille de toute élection.

## Groupes

Les [déclarations du 18 juillet 2024 publiées au Journal officiel](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050029170) fournissent des orientations explicitement revendiquées par six groupes de l'Assemblée. Les [déclarations du 3 octobre 2023 publiées par le Sénat](https://www.senat.fr/vos-senateurs/groupes-politiques/les-groupes-politiques-du-senat-declarations-politiques-1.html) en fournissent pour cinq groupes du Sénat. Ce sont des orientations déclarées par les groupes, même lorsque leur publication est institutionnelle.

La note [EPRS « Rules on political groups in the EP » de 2024](https://www.europarl.europa.eu/RegData/etudes/BRIE/2024/762337/EPRS_BRI(2024)762337_EN.pdf) décrit le PPE au centre droit et S&D au centre gauche. Le [communiqué de Renew Europe du 20 novembre 2024](https://www.reneweuropegroup.eu/news/2024-11-20/renew-europe-as-pro-european-deal-maker-unites-the-centre-to-defend-europe) revendique des principes centristes. Les autres groupes européens restent explicitement sans orientation recoupée dans ce lot. Une qualification figurant dans un discours d'un adversaire, un article de presse ou le classement d'un parti membre n'est pas reprise comme classification institutionnelle du groupe.

## Identité, période et vérification

Correspondance exacte après normalisation des accents, de la casse et des espaces. Les identifiants AN sont utilisés quand une fiche de scrutin les fournit ; une déclaration de 2024 ne classe pas un identifiant historique portant le même nom. La date de publication limite les repères disponibles sur une fiche de scrutin antérieur. Les vues agrégées présentent un repère de source datée, indépendamment de la période de leurs statistiques. Aucun score, affiliation personnelle ou qualification judiciaire ne découle du badge.

Ce lot ne change ni le schéma, ni les politiques RLS, ni les données distantes. Aucun téléchargement ou appel de classification n'est effectué pendant une visite. Pour compléter le référentiel, ajouter une source primaire vérifiée, son repère exact, son type, sa date, son contexte et les identités couvertes ; ne jamais ajouter une correspondance par sous-chaîne.

Validation locale : build de production Next.js réussi dans un dossier isolé (la prévisualisation existante verrouillait `.next`), TypeScript et lint des fichiers concernés réussis, 52 tests de lecture réussis dont trois scénarios de classification. Contrôles dans le navigateur avec les données publiques réelles : annuaire des 40 partis, profils RN et LFI, groupes et leurs 18 références Sénat/PE ; sources et historique vérifiés, aucun lien imbriqué ni débordement à 1 280 et 390 px, thèmes clair et sombre. Les fichiers de configuration temporairement adaptés pour ce build ont été restaurés. Ce contrôle ne constitue pas un déploiement.
