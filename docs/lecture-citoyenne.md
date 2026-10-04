# Lecture citoyenne — 4 octobre 2026

Le retour lecteur relevait trois risques principaux : confondre le sujet d’un texte avec la direction d’un vote, prendre quelques bulletins pour une opinion générale sur un thème, et croire le compteur représentatif de toute l’activité parlementaire.

## Changements

| Besoin | Réponse dans l’interface |
|---|---|
| Comprendre « pour / contre » | Résumé de l’étape parlementaire, résultat explicite et explication des deux bulletins sur la fiche. Aucun motif politique déduit. |
| Comprendre la sélection | Compteur des votes d’adoption définitive, couverture partielle depuis 2017 et critères accessibles dès l’accueil. La méthode publique abandonne l’ancienne règle du dernier vote disponible. |
| Éviter un « 100 % » trompeur | Moins de cinq scrutins : cartes de partis en nombres de positions, barres atténuées et avertissement. Le seuil est éditorial, sans garantie statistique au-delà. |
| Alléger les références | Numéros et conformité documentaire des cartes dans un volet ; lien officiel, date, objet et résultat restent accessibles. Sources des repères politiques repliables sur les profils. |
| Expliquer un repère manquant | « Repère absent de notre référentiel sourcé » distingue l’absence de source recoupée de l’absence supposée de classification officielle. Aucune assimilation parti/groupe/coalition. |
| Comparer directement | `/partis/comparer` : deux partis, sujet facultatif, mêmes scrutins AN pour les deux colonnes, huit textes par page. Nombres pour/contre/abstentions/non-votants ; données absentes et erreurs distinctes. |
| Préparer son vote | Trois étapes visibles sur l’accueil, aperçu du carnet, liens de comparaison des partis par sujet dans le carnet et son export texte. Notes conservées uniquement dans la page jusqu’au téléchargement. |

## Limites maintenues

Le résumé est procédural. Décrire « autoriser / interdire / financer » une mesure exige le dispositif exact et ses sources ; ces effets ne sont pas inventés à partir d’un titre. Le décompte des suffrages exprimés utilise pour + contre, hors abstentions. « Aucun vote contre » ne signifie pas accord de tous les groupes ni ratification technique.

La comparaison présente les mêmes textes sans moyenne générale sur des corpus inégaux. Un lien d’affiliation daté permet d’attribuer un bulletin, sans imputer au parti un vote individuel inconnu. Le Sénat reste présenté par groupe dans son parcours existant. Les anciens noms restent distincts des noms actuels.

Les lectures réutilisent les fonctions publiques existantes et RLS. Huit scrutins par page, quatre lectures de décomptes simultanées au maximum. Aucune migration ni modification du corpus.

## Validation

- Build Next.js 16.3.7 et TypeScript réussis dans un répertoire de prévisualisation isolé ; configuration restaurée après compilation.
- ESLint et 59 tests de lecture réussis : adoption réellement définitive, amendement de suppression, dénominateur, petit corpus, carnet privé et conservation des filtres.
- Vérifications navigateur avec les données publiques : critères de sélection, cartes à un scrutin, détail de vote, comparaison paginée, partis identiques refusés, affiliation manquante distincte d’une abstention et carnet limité à trois sujets. Contrôles à 1 280, 390 et 320 px, thèmes clair et sombre, sans débordement horizontal.

Ce document décrit les modifications et leurs contrôles locaux. Il ne constitue pas une preuve de déploiement.
