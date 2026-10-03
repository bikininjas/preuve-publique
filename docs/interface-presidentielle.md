# Refonte des sondages et des fiches candidates

Vérification locale le 02/10/2026, sur la branche `codex/presidentielle-design-responsive`.

## Présentation

- Conteneurs publics, en-tête et pied de page à 90 % de la largeur disponible sur desktop, sans plafond sur grand écran. Les pages de lecture utilisant `narrow` conservent leur largeur de texte.
- Sondages : en-tête éditorial, navigation présidentielle, méthode dépliable, filtres latéraux sur desktop et repliés sur mobile, graphique de mesures individuelles, aperçu d'une configuration du terrain le plus récent, détails des configurations et provenance accessibles.
- Fiches : monogramme, identité documentée ou absence explicite, compteurs contextualisés, accès aux sections, trois sondages récents avec chaque résultat rattaché à sa configuration, colonne de référentiel et rattachements, sélection thématique et votes personnels.
- Couleurs du graphique, des filtres et des barres cohérentes au sein de la même liste testée, même quand une série est masquée. Les couleurs ne qualifient aucune orientation politique.
- Thèmes clair et sombre conservés. Les modifications déjà présentes dans le dépôt avant ce travail ont été conservées.

## Données et méthode

Les lectures publiques existantes alimentent les pages. Aucun import, migration, programme, score de cohérence ou moyenne de sondages n'a été ajouté. Les configurations, dates de terrain, échantillons, sources, empreintes et avertissements restent accessibles. Une identité non recoupée ne reçoit pas de votes par ressemblance de nom. Un registre indisponible n'est pas présenté comme un résultat nul dans les compteurs.

## Contrôles

- `npm run build` et `npm run lint` réussis ; typage inclus dans le build.
- `git diff --check` réussi.
- `npm run test:reader` : 8 tests réussis.
- `npm run test:polls` : 12 réussites et 1 échec existant dans le parseur CSV. Le test attend « Schéma CSV » alors que le cas produit « nombre de colonnes incohérent ». Les fichiers `ingestion/polls/sondax.ts` et `ingestion/polls/tests/parser.test.mjs` sont identiques au HEAD de départ ; cet échec n'est pas corrigé par la refonte.
- Navigation et mesures DOM sur les sondages et la fiche de Gabriel Attal à 320, 390, 768, 1024, 1280 et 1920 px : aucun débordement horizontal de la page. Les graphiques et tableaux peuvent défiler dans leur propre conteneur.
- Grand écran à 1920 px : conteneur de sondages de 1714,5 px pour une largeur disponible de 1905 px (barre de défilement exclue), soit 90 %.
- Lectures publiques réelles : filtres par institut et tour, masquage d'une série, remise à zéro, ouverture des filtres mobile, consultation d'un point et de sa source, changement de sous-thème sur une fiche.
- Thèmes clair et sombre contrôlés dans le navigateur. Dix couleurs distinctes dans la configuration initiale à dix personnes.

## Livraison

Cette vérification porte sur la prévisualisation locale du build de production. Aucun déploiement Cloud Run ni changement de la base distante n'a été effectué dans ce travail.
