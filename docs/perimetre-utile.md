# Votes utiles et publication des faits judiciaires

Décision éditoriale de l'utilisateur, 4 octobre 2026 : précision sans exhaustivité, publication factuelle automatique.

Les votes publics actent l'adoption définitive d'une loi avant sa promulgation : lecture définitive adoptée, adoption conforme, ou dernier vote CMP après adoption par les deux chambres. Un vote sur l'ensemble du texte en première lecture, un rejet et une résolution européenne sont exclus. Les lois constitutionnelles ne relèvent pas de ce circuit. La promulgation et le contrôle constitutionnel éventuel restent des étapes distinctes. Méthode institutionnelle : [procédure législative de l'Assemblée nationale](https://questions.assemblee-nationale.fr/synthese/fonctionnement-assemblee-nationale/travail-legislatif/la-procedure-legislative).

Le sélecteur conserve une preuve de procédure tirée des dossiers officiels AN : dossier, acte, date, méthode, URL, empreinte de l'archive et récupération. Pour une CMP, un seul vote ne suffit pas. Pour une adoption conforme, l'adoption par l'autre chambre doit figurer dans le dossier. Les votes des deux chambres à la même date, sans horodatage permettant de déterminer le dernier, sont exclus. Sans preuve, le scrutin reste hors de la sélection. Les dossiers sont rejoués avant utilisation ; seules les lignes utiles sont insérées en base par la synchronisation quotidienne. Le rejeu quotidien de la législature courante conserve les preuves historiques provenant des archives qui ne sont pas rejouées ; une preuve disparue de l'archive effectivement rejouée est retirée.

L'admin montre les votes d'adoption définitive, les affaires/personnes et les imports/erreurs. L'ancienne file `/admin/review` redirige vers les votes sélectionnés. Les archives et les liens entre documents ne sont plus des tâches obligatoires. Un retrait de la liste publique conserve les documents et leurs dépendances ; aucune purge physique n'a été autorisée.

La publication judiciaire passe par `judicial_source_verified`, avec sources primaires vérifiables, motifs, rôles, appartenances datées et preuve de définitivité lorsque celle-ci est affirmée. Le pipeline ne simule aucune validation humaine et ne remplit aucun score. Les dossiers de presse sans document judiciaire primaire restent en attente selon une règle identique pour toutes les formations. Les éléments individuels sont comptés dans les graphiques de leur formation documentée, sans transférer leur responsabilité au parti. Une appartenance inconnue n'est pas imputée ; une ancienne appartenance est visible.

`node ingestion/observatory/publish-judicial.mjs --dry-run` contrôle le lot existant sans écrire ; `--yes` applique la publication. Les prochains imports judiciaires structurés appellent ce même contrôle dans leur transaction. Une source nouvelle après une publication protégée requiert une nouvelle étape datée plutôt qu'un écrasement silencieux. L'état d'une procédure reste celui de la dernière source retenue, et les suites non recoupées sont signalées.

La migration `judicial_source_verified` ajoute les contraintes de publication ; les politiques RLS et les droits sur les colonnes de publication restent inchangés. Les programmes, déclarations et liens interprétatifs gardent leur circuit de validation distinct.

## Application vérifiée le 4 octobre 2026

La migration 20261004075119 est enregistrée dans Supabase. Le recentrage conserve 128 votes publics (119 AN, 9 Sénat) et retire de façon réversible 1 644 votes hors périmètre. Les trois archives de dossiers, récupérées le 30 septembre, ont été rejouées avec leur empreinte : 358 procédures finales reconnues, dont une partie seulement a un scrutin public documenté. Aucun document ni décompte associé n'a été physiquement supprimé.

19 affaires primaires sont publiées automatiquement ; cinq dossiers attendent une source judiciaire vérifiable ou une synthèse structurée. Les appartenances individuelles documentées, leurs dates et leur caractère ancien figurent dans les fiches. Les preuves de définitivité distinguent la culpabilité seule de la peine. Ces états ne prétendent pas reconstituer toutes les suites récentes.

Le build Cloud Build 36aa770e-9bb9-4e31-9baa-f013e6bc7271 a réussi. La révision Cloud Run preuve-publique-git-00049-clq a servi 100 % du trafic. Le domaine public a été contrôlé : 128 votes d'adoption définitive, 19 affaires, trois graphiques et un tableau des personnes avec appartenances datées. Le contrôle à 390 px ne montre pas de débordement horizontal. L'admin local compilé affiche les parcours utiles ; son accès reste protégé.

La livraison web privée contient le code sans secrets, dossiers locaux ni corpus judiciaire JSON. `.gcloudignore` conserve ce périmètre. La branche publique technique part directement de `origin/master`, sans les commits ni les fichiers nominatifs locaux. Ses tests utilisent des cas fictifs et le corpus est importé séparément dans la base du site.
