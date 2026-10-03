# Parcours sondages → candidat → pièces → sous-thèmes

Parcours en production : [annuaire des personnes](https://preuve-publique.fr/presidentielle-2027/candidats), [comparaison documentaire](https://preuve-publique.fr/presidentielle-2027/comparer) et [revue des mesures](https://preuve-publique.fr/admin/measures), qui exige une session administrateur. Le domaine public de référence est `https://preuve-publique.fr` ; utiliser ces adresses pour les vérifications après livraison.

## Livré et vérifié le 02/10/2026

Le lecteur ouvre une fiche depuis le nom dans un tableau de sondage, ou l’annuaire `/presidentielle-2027/candidats`. La fiche conserve les mesures individuelles, leurs configurations, dates de terrain, source originale et attribution Sondax. Elle distingue l’identité recoupée, les rattachements institutionnels datés, les propositions reliées aux mesures, les bulletins personnels et l’exploration séparée des partis.

`/presidentielle-2027/comparer` accepte jusqu’à trois personnes et les 19 sous-thèmes existants. Les mêmes scrutins apparaissent dans chaque colonne, avec pagination commune, date, titre exact, périmètre et source. Seuls les scrutins où au moins une personne dispose d’un bulletin documenté sont sélectionnés. Une cellule vide devient « vote individuel non disponible dans ce corpus », jamais une absence ou une abstention.

Les sous-thèmes restent des repères lexicaux dans les titres institutionnels. Ils peuvent manquer un texte pertinent ou trouver un texte indirectement lié. Ils ne qualifient aucune orientation. Le tableau couvre l’Assemblée, le corpus publié depuis 2017 et les archives contrôlées, pas tous les votes de chaque personne ni son activité complète.

## Identités et rattachements

Les 14 correspondances explicites dans `ingestion/candidates/identities.mjs` sont recoupées à chaque import : identifiant AN, nom de la fiche dans le ZIP officiel, nom de l’acteur en base et nom Sondax doivent tous correspondre. Aucun rapprochement flou et aucune fusion par abréviation de parti. Les douze autres personnes testées restent présentes avec une correspondance non documentée. Un contrôle d’archive ne constitue pas une confirmation de candidature officielle.

Les anciens liens `affiliated_to` issus de mandats `PARPOL` sont présentés ici comme **rattachements pour le financement public**. Ils ne prouvent pas une adhésion ; les liens `member_of` deviennent **groupes parlementaires**. La distinction est documentée par l’[Assemblée nationale](https://www2.assemblee-nationale.fr/deputes/liste/partis-politiques?annee=2025). La source importée, le fichier acteur, le mandat, l’empreinte, la récupération et les dates sont conservés. Les années d’un ancien parti ne sont pas attribuées automatiquement à un nouveau nom. Les liens vers les votes d’un parti ouvrent son corpus complet, explicitement distinct de la personne et de sa période de rattachement.

Le schéma réserve `party_member`, `electoral_support` et `coalition` à des entrées sourcées avec revue. Aucune entrée de ce type ni déclaration officielle de candidature n’a été importée. Une fin non renseignée dans l’archive n’atteste pas une appartenance actuelle.

## Mesures et revue

`policy_measures` porte une question précise, un dispositif, un sous-thème et un statut. `policy_measure_evidence` relie des pièces existantes avec auteur, rôle, justification, confiance documentaire et trace de revue. Un programme exige édition, élection et date de publication. La base contrôle le rôle, l’auteur d’un programme/d’une déclaration et le repère précis avant revue. Un scrutin n’est jamais enregistré comme une position personnelle via son auteur.

Les trois questions de `ingestion/candidates/pilot.json` ont été importées **en brouillon**, sans attribution politique : âge légal de retraite, encadrement des loyers, imposition des patrimoines. Trois références de scrutins déjà publiés sont proposées en brouillon : AN 17 n° 217 (31/10/2024), n° 2262 (05/06/2025, outre-mer) et n° 881 (20/02/2025). Les justifications précisent le périmètre global et les vérifications à faire ; la confiance reste non renseignée, ce qui interdit une transition de revue avant enrichissement. Ce sont des questions de travail et des candidats au rapprochement, pas trois analyses validées. Aucune fiche de mesure, programme ou déclaration n’est publiée par cette intervention. L’interface publique le dit explicitement.

L’import éditorial utilise une connexion privilégiée distincte du web, des requêtes paramétrées et une transaction. Il refuse de remplacer une mesure ou un rapprochement déjà relu. Le fichier JSON peut être enrichi avec une liste `links` contenant `evidence_id` ou une référence institutionnelle unique `evidence_external_id`, `actor_id`, `role`, `rationale`, `confidence` et, pour un programme, `program_edition`, `program_election`, `program_published_at`. Pour un scrutin, `actor_id` reste nul. Le contenu doit être relu dans `/admin/measures`, en ouvrant aussi la pièce originale ; le statut de la mesure et celui de chacun de ses liens sont indépendants. Les propositions de liens du lot pilote ne deviennent des rapprochements humains validés qu’après cette revue.

Le même fichier peut porter `connections` pour proposer une adhésion (`party_member`), un soutien électoral (`electoral_support`) ou une coalition (`coalition`). Chaque entrée exige `candidate_slug`, `actor_id` du parti, `relation`, `started_at`, `source_url`, `source_locator`, `retrieved_at`, et éventuellement `ended_at` et `source_sha256`. Elle naît en brouillon, son nom de parti est relu en base et un rattachement déjà relu ne peut pas être remplacé. Ces liens se relisent également dans `/admin/measures` ; l’import ne transforme jamais une étiquette Sondax en soutien.

Les transitions sont `draft → reviewed → published`, avec retour `published → reviewed` et `reviewed → draft`. La base interdit la publication directe d’un brouillon. Seul un administrateur autorisé peut modifier les colonnes de statut et sa trace de revue. Le contenu ne se modifie pas avec la clé publishable. La lecture publique d’un lien exige sa publication, celle de sa mesure et celle de sa pièce.

Avant d’ajouter un programme : vérifier la dernière édition officielle applicable à la période et son élection. Conserver les archives sous leur propre élection, signaler l’absence de programme 2027, comparer la date de publication au scrutin, distinguer citation et résumé, lire article/amendement/texte entier et ses exceptions. La méthode est commune à tous ; aucune causalité, orientation, contradiction ou note n’est calculée.

## Migration et commandes

La migration `supabase/migrations/20261002092834_candidate_evidence_path.sql` a été testée sur PGlite, appliquée séparément du build après inspection des treize migrations existantes, puis renommée pour correspondre à la version effectivement enregistrée par Supabase. Elle ajoute cinq tables et une RPC `security invoker` bornée. Les anciennes politiques sur `actors` et `sources` ne sont pas élargies : les instantanés publiés portent leur propre provenance. RLS est activé sur les cinq tables, aucune insertion n’est accordée à `anon` ou `authenticated`.

```powershell
npm run candidates:sync -- --dry-run --publish-facts
npm run candidates:sync -- --yes --publish-facts
npm run measures:import -- --file=ingestion/candidates/pilot.json
npm run measures:import -- --file=ingestion/candidates/pilot.json --yes
npm run test:candidates
```

Les chemins de staging peuvent être fournis avec `--referential=...` et `--votes=...`. Chaque archive doit correspondre à l’empreinte du manifeste ; chaque scrutin retenu doit correspondre à sa couverture déjà vérifiée en base, sans conflit nominatif ni différence avec le total officiel. Tous les scrutins éligibles doivent être retrouvés avant toute écriture. Aucun fichier absent n’est interprété comme une suppression ; un bulletin déjà enregistré différent bloque la transaction. Un import de faits n’écrase pas une correspondance existante différente. Les passages sont enregistrés dans `ingestion_runs`, avec erreurs assainies.

`--publish-facts` publie les nouveaux instantanés factuels recoupés ; il ne publie aucune mesure ni interprétation. Sans cette option, les nouveaux profils restent en brouillon et demandent une gestion éditoriale privilégiée avant publication. Aucun import nominatif quotidien n’est ajouté : de nouvelles archives doivent être contrôlées avant extension du corpus.

## Vérifications réelles

- Simulation : 14 identités, 119 rattachements, 1 549 bulletins ; 847/847 scrutins vérifiés retrouvés. Après rollback : aucun profil persistant.
- Premier import : mêmes volumes persistés ; dix personnes ont des bulletins dans ce corpus, quatre identités recoupées n’en ont aucun. Trois questions pilotes et trois rapprochements proposés restent en brouillon.
- Second import : **0 identité, 0 rattachement et 0 bulletin ajoutés**.
- Cinq tables et leurs index : **950 272 octets** (928 Kio) mesurés après import des faits et des trois liens en brouillon. Aucune archive ZIP supplémentaire téléchargée ; les archives déjà conservées ont été utilisées.
- Privilèges distants : RLS sur chaque nouvelle table, aucune insertion publique, RPC sans `security definer`, chemin de recherche fixé. Les conseillers de sécurité ne signalent aucun objet nouveau ; les avertissements hérités restent hors de ce changement ([guide de remédiation](https://supabase.com/docs/guides/database/database-linter)).
- Quatre tests d’intégration/méthode : simulation, idempotence, empreinte et conflit, RLS et publication des parents, comparaison commune, cellule manquante, auteur, transitions et droits de revue. Suites existantes sondages, ingestion et lecture également vérifiées.
- Build Next.js, typage et lint vérifiés. Le site local lit les données réelles via la clé publishable.
- Contrôle navigateur : annuaire des 26 personnes, fiche avec rattachements datés distincts du libellé Sondax, navigation vers la comparaison, sélection de trois personnes sur la fiscalité. Trois scrutins communs affichent les mêmes lignes, les bulletins réellement disponibles et les cellules non disponibles ; aucune extrapolation depuis le parti. Une fiche sans correspondance reste accessible et dit l’absence de documentation. Identifiant inconnu : 404 ; `/admin/measures` sans session redirige vers la connexion. Pas de débordement de page aux largeurs desktop contrôlées (1 280 et 1 682 px) ; les colonnes du tableau gardent leur défilement interne.

La fonctionnalité de sondages de la PR #17 est fusionnée et déployée. Les volumes candidats ci-dessus ont été relus en base le 02/10/2026 : 14 profils publiés, 119 rattachements publiés, 1 549 bulletins, trois mesures et trois liens en brouillon. La PR #18 apporte le parcours web et sa revue. Pour vérifier sa livraison, contrôler le SHA du build Cloud Run, la révision prête, l'annuaire, une fiche, la comparaison et la redirection de `/admin/measures` sans session. Les mesures interprétatives restent un travail éditorial humain ; aucune orientation idéologique n'est calculée.
