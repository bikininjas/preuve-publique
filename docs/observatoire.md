# Premier lot documentaire de l’observatoire

État contrôlé le 02/10/2026 : la migration `20261002121123_observatory_editorial_evidence.sql` est enregistrée dans Supabase et les six pièces ci-dessous sont importées **en brouillon**. Aucune de ces pièces, aucun rapprochement et aucune accusation ne sont publiés. L’interface de cette branche est vérifiée localement ; cela ne prouve pas son déploiement sur Cloud Run.

## Pièces à relire

| Pièce | Contenu et limite | Fiche de relecture |
|---|---|---|
| Emmanuel Macron, profession de foi officielle 2022 | Extrait sur l’âge de retraite, PDF page 3 ; contexte page 2. Édition du premier tour de 2022, date de publication inconnue. | [Ouvrir](https://preuve-publique.fr/admin/pieces/0d52e395-8952-448d-a56e-30c16d18d204) |
| Marine Le Pen, profession de foi officielle 2022 | Extrait partiel sur la retraite, PDF page 2 ; le contexte précise 40 à 42 annuités. Édition 2022, date de publication inconnue. | [Ouvrir](https://preuve-publique.fr/admin/pieces/b1dfeff3-ccbb-4156-8139-6500167122d3) |
| Jean-Luc Mélenchon, profession de foi officielle 2022 | Extrait sur la retraite, PDF page 2 ; âge et durée de cotisation conservés ensemble. Édition 2022, date de publication inconnue. | [Ouvrir](https://preuve-publique.fr/admin/pieces/bc99c7a8-32fb-4a8a-9c30-c087fbf08059) |
| Pauvreté monétaire, Insee Première 2063 | 15,4 % en 2023 ; valeurs 2021–2023 de la même publication du 07/07/2025, seuil à 60 % du niveau de vie médian. | [Ouvrir](https://preuve-publique.fr/admin/pieces/185f4b5a-8626-409d-a8ff-d5dca87dbb01) |
| Inégalités de niveau de vie, Insee Première 2063 | Indice de Gini 0,297 en 2023 ; unité de 0 à 1, valeurs 2021–2023, champ et méthode ERFS. | [Ouvrir](https://preuve-publique.fr/admin/pieces/bc6b6ffe-8c05-4aa5-ad68-1d91e4629db5) |
| Assistants parlementaires du Front National, saisine en appel | Communiqué de la cour d’appel de Paris du 01/04/2025. Étape historique : il ne démontre pas l’état actuel au 02/10/2026 et ne nomme pas les appelants. Aucune attribution individuelle, peine ou culpabilité ajoutée. | [Ouvrir](https://preuve-publique.fr/admin/pieces/cf8b62c7-a349-4c91-9aee-d57ed2ca3244) |

Les trois professions de foi sont un lot technique limité sur le même sujet, pas une sélection exhaustive ni une comparaison classée. Le même protocole doit être appliqué aux autres candidats. Ce sont des extraits de professions de foi, pas l’intégralité des programmes. Leur date affichée est celle de l’élection, explicitement distinguée d’une date de publication non connue. Aucun de ces documents ne représente un programme officiel de 2027. Aucun lien programme/scrutin n’est créé : l’extrait seul et une proximité de thème ne suffisent pas à établir une correspondance sur la même mesure.

Sources primaires : [professions de foi CNCCEP](https://www.cnccep.fr/candidats.html), [publication Insee](https://www.insee.fr/fr/statistiques/8600989), [communiqué judiciaire](https://www.cours-appel.justice.fr/sites/default/files/2025-04/CP-%20cour%20d%27appel%20de%20Paris%20dossier%20RN.pdf). Les URL directes, repères, dates de récupération et empreintes SHA-256 des cinq documents sont conservés en base. Les deux indicateurs partagent un document. Le téléchargement réel représente 10 800 182 octets ; les originaux sont conservés dans `ingestion/.staging/observatoire/raw/`, ignoré par Git. Seules métadonnées et courtes citations entrent dans Postgres.

## Import et reprise

```bash
npm run observatory:import -- --dry-run  # défaut ; transaction annulée
npm run observatory:import -- --yes      # six brouillons ; aucune option de publication
npm run test:observatory
```

L’import utilise uniquement `DB_PG_URL` hors du service web, plafonne le lot à 20 pièces et le téléchargement à 25 Mo, vérifie les hôtes et les signatures PDF et calcule les empreintes sur les octets reçus. L’édition Insee attendue doit être retrouvée. Les données sont authored dans `ingestion/observatory/pilot.json` après lecture des documents ; ce contrôle ne remplace pas la relecture humaine des valeurs ou des citations.

Une transaction et un verrou empêchent deux passages de cet import de dupliquer les pièces dont l’institution est nulle. Une reprise garde les pièces et sources relues ou publiées ; une modification est signalée `locked_changed`, sans écraser ni contenu ni empreinte. Le journal privé `ingestion_runs` conserve le résultat des passages avec écriture. L’import contrôlé a inséré six brouillons ; le second passage simulé a retourné six `unchanged`, zéro insertion et zéro modification.

## Modèle et publication

`judicial_event` désigne une étape judiciaire sourcée, pas un verdict politique ni un dossier actuel complet. Les données structurées exigent procédure, juridiction, étape, état à cette date et limite sur l’état actuel. Les politiques RLS et les droits existants restent actifs. Les nouveaux contenus éditoriaux exigent un relecteur et une date hors brouillon, et ne peuvent utiliser la méthode automatique réservée aux archives officielles de scrutins.

Avant de relire une pièce, ouvrir son document original et vérifier son extrait, sa page, ses unités, sa période et son champ. Passer ensuite de brouillon à relu, puis de relu à publié dans `/admin`. L’identité de l’agent ou du compte technique ne constitue pas une validation humaine. Le dossier judiciaire actuel reste à compléter avec la décision d’appel et les éventuels recours : cette étape historique doit toujours garder sa limite temporelle.

La migration a été générée par la CLI puis appliquée séparément du build via Supabase MCP ; son fichier porte la version effectivement enregistrée `20261002121123`. Le schéma, l’historique, les contraintes et l’absence de pièces pilotes visibles en rôle `anon` ont été relus. Aucun historique ancien n’a été réparé et aucune table n’a été remplacée.

## Interface et contrôles

`/observatoire` lit chaque rubrique indépendamment sous RLS, affiche les premières pièces publiées et renvoie au catalogue filtré. Les dates, auteurs, éditions, valeurs et limites apparaissent aussi dans les fiches et la relecture. Une erreur de lecture ne devient pas un zéro ; une rubrique indisponible n’efface pas les autres. Les anciennes tuiles de domaines sans série ont été remplacées par ces sections documentaires. L’absence de déclarations et de scrutins européens reste explicite.

Contrôles exécutés : build Next.js et TypeScript, lint, 14 tests lecteur/normalisation, 3 tests ciblés de lot, récupération et Postgres/RLS (rollback, idempotence, absence de publication sans relecteur, protection du contenu et de l’empreinte, refus d’écriture anonyme). La page publique déployée a été consultée : elle conserve son ancienne interface et ses compteurs nuls. Les brouillons importés sont accessibles dans les fiches de relecture actuelles ; le nouveau rendu reste dans cette branche tant qu’elle n’est pas livrée.
