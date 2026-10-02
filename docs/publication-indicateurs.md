# Publication directe des chiffres institutionnels

Le 02/10/2026, l’utilisateur a demandé : « Publie tous les chiffres de sources officielles sans contrôle ». Cette instruction remplace l’attente de relecture pour les indicateurs chiffrés du corpus institutionnel existant.

## État effectivement publié

Les **24 indicateurs** ont été publiés dans Supabase : Insee, Insee/Dares, Céreq, Drees, SIES, Défenseur des droits et publications originales de l’IPP. Leurs valeurs, comparaisons, séries, unités, périodes, populations, limites, repères et empreintes d’origine sont conservés. Aucune nouvelle relecture des chiffres n’a été réalisée pour cette publication.

La lecture publique de `/observatoire` affiche 24 indicateurs et neuf domaines ; l’ancien message d’absence est disparu. Les trois programmes et l’étape judiciaire restent en brouillon : ils ne sont pas des indicateurs chiffrés.

La migration **20261002175844_official_indicators_without_review.sql** a été testée localement puis appliquée séparément au projet `pntkhwdosrvsdybzsicp`, après lecture du schéma et de l’historique. La version du fichier correspond à celle effectivement enregistrée par Supabase.

## Trace de publication

`publication_method = official_source_unreviewed` distingue ce mode du contrôle technique des scrutins. `reviewed_by`, `reviewed_at` et `publication_confidence` restent nuls : aucune relecture humaine ou confiance artificielle n’est enregistrée. `publication_checks` indique la provenance institutionnelle, la demande utilisateur et l’absence de relecture ; `detail.publication` garde la date et l’autorisation.

La contrainte réserve ce mode aux indicateurs des domaines institutionnels explicitement admis et exige le repère de source, les données structurées et la trace. Les autres contenus éditoriaux gardent leur circuit existant. Aucune politique RLS ni aucun droit d’écriture anonyme n’est élargi. Les nouveaux imports restent en brouillon ; cette publication concerne les 24 fiches existantes.

Les cartes et fiches affichent « Chiffres de la source institutionnelle, publiés sans relecture par Preuve Publique ». La méthode publique décrit cette règle.

## Vérifications techniques

- `npm run build`, `npm run lint`, 19 tests lecteur et six tests observatoire réussis.
- Postgres local : publication directe d’un indicateur sans relecteur, refus de cette méthode pour un programme ou une étape judiciaire, refus d’une URL extérieure aux domaines admis ou d’une trace absente.
- Droits : lecture publique des lignes publiées ; refus d’écriture par `anon` et de modification de la méthode par `authenticated`.
- Base distante : 24 indicateurs publiés, zéro relecteur ajouté, zéro indice de confiance ajouté ; autres contenus éditoriaux inchangés.
- Page publique : compteur 24, neuf domaines et accès au catalogue constatés après publication. Le déploiement de la nouvelle mention est vérifié séparément de l’opération en base.
