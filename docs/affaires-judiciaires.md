# Affaires judiciaires : méthode et publication

La rubrique `/observatoire#justice` lit les seules fiches publiées, sous RLS. Elle compare des nombres d'affaires documentées, avec leurs dates et limites de couverture. Elle ne mesure pas un taux de corruption ou de malhonnêteté des partis.

Une synthèse distingue la personne et son organisation, le rôle pénal ou civil, les motifs précis, l'état de procédure, le recours connu et la portée d'une éventuelle condamnation définitive. La culpabilité définitive et une peine encore susceptible de recours restent distinctes. Une absence de suite recoupée est visible ; une ancienne étape n'est pas présentée comme une procédure actuelle.

Le compteur porte sur des affaires, sans additionner plusieurs protagonistes ou étapes d'un même dossier. Le document le plus récent détermine l'état retenu, même s'il est encore incomplet. Les filtres de formation, rôle et condamnation s'appliquent à une même personne : une partie civile ne reçoit jamais la condamnation de son adversaire. Les litiges civils sont séparés des affaires pénales. Les graphiques de motifs distinguent allégations, chefs retenus et classements.

Les affiliations individuelles demandent une source et une date. Les anciennes appartenances, exclusions ou suspensions documentées restent explicites. Une appartenance à un groupe parlementaire ou un rattachement pour financement ne vaut pas adhésion à un parti. Sans appartenance établie, aucune imputation à une formation n'est faite. Un fait individuel ne devient pas une responsabilité collective.

## Provenance et import

Le dépôt public contient le code, le schéma et des tests entièrement fictifs. Le corpus nominatif, les téléchargements et les captures sont fournis séparément à l'outil d'ingestion, hors Git. Aucun dossier réel n'est nécessaire pour compiler le site ou exécuter les tests. Le service web lit les fiches publiées en base et ne reçoit aucune connexion PostgreSQL privilégiée.

Chaque lot conserve les URL originales, éditeur, date, repère précis et empreinte du document récupéré. Pour un texte consulté dans le navigateur, l'empreinte de capture est distincte de celle de l'original non téléchargé. Les références indisponibles gardent une note explicite. Une citation est identifiée comme telle ; un résumé n'est pas une citation.

```powershell
npm run observatory:import -- --file ingestion/.staging/justice/lot.json --dry-run
npm run observatory:import -- --file ingestion/.staging/justice/lot.json --yes
node ingestion/observatory/publish-judicial.mjs --dry-run
```

Le mode à blanc prépare les sources puis annule la transaction. `--yes` écrit le journal d'import et applique automatiquement `judicial_source_verified` aux synthèses structurées dont le document judiciaire principal est vérifiable. Une condamnation définitive affirmée demande également une preuve judiciaire récupérée. Un dossier fondé uniquement sur la presse ou sans synthèse structurée reste en attente.

L'import est limité à vingt documents et vingt-cinq Mo par lot. Il est idempotent, sérialise les écritures et protège les sources et fiches déjà relues ou publiées. Une suite judiciaire est une nouvelle étape datée. Il ne fabrique ni relecteur, ni indice de conformité, ni verdict. Les liens interprétatifs gardent une validation humaine.

## Vérification

`npm run test:reader` contrôle le décompte, la définitivité, les rôles, les motifs et la pagination complète des graphiques. `npm run test:observatory` contrôle notamment rollback, publication effective, idempotence, RLS et refus d'une fausse validation humaine. Les tests utilisent uniquement des personnes et affaires fictives, sans accès réseau ni base distante.
