# Archives officielles et sélection des scrutins

Le rejeu vérifie les fichiers originaux, toutes les empreintes, la pagination et
les pièces normalisées. Il prend en charge les scrutins AN/Sénat, les lois
promulguées AN et les votes/textes adoptés du Parlement européen. Les professions
de foi, déclarations, événements judiciaires et rapprochements restent dans le
circuit de revue humaine.

La connexion utilise `DB_PG_URL` du projet et sa configuration TLS normale.
Aucun secret ne doit être enregistré dans une commande, un manifeste ou Git.
Les PDF et archives brutes restent dans `.staging`, hors base et hors Git.

Les imports de scrutins conservent désormais le dernier vote d’ensemble disponible
par institution et dossier. Sans identifiant de dossier, le regroupement reste
limité au même intitulé dans la même législature. AN/Sénat : projets et propositions
de loi, y compris rejet et article constituant l’ensemble. PE : mention explicite
de vote final, unique ou ensemble du texte et référence documentaire. Un dernier
vote disponible n’est pas automatiquement une lecture définitive. La règle est
dans `ingestion/lib/vote-selection.mjs` ; les actes non législatifs nationaux,
amendements, motions et votes partiels restent dans les fichiers bruts.

```sh
# Récupérer le corpus européen disponible, avec tri documentaire stable.
node ingestion/cli.mjs fetch pe-texts --years=2017,2018,2019,2020,2021,2022,2023,2024,2025,2026
node ingestion/cli.mjs fetch pe-votes --years=2017,2018,2019,2020,2021,2022,2023,2024,2025,2026

# Remplacer STAGING par le dossier affiché par fetch.
# Chaque simulation annule intégralement sa transaction.
node ingestion/backfill/official-votes.mjs STAGING --import-drafts --dry-run
node ingestion/backfill/official-votes.mjs STAGING --import-drafts --yes
node ingestion/backfill/official-votes.mjs STAGING --dry-run
node ingestion/backfill/official-votes.mjs STAGING --yes
```

L'import groupé est limité à 50 000 pièces et 32 Mo de champs stockés, avec une
estimation conservatrice du volume final sous 450 Mo. La publication utilise des
lots de 500 dans une seule transaction ; une divergence annule tous les lots.
Les pièces déjà validées sont conservées. Une modification d’une pièce validée
bloque l'import ; les mises à jour de brouillons conservent leur identifiant.
Une archive plus récente peut changer d'empreinte sans changer ses faits : cette
provenance doit être recoupée et journalisée, jamais remplacée aveuglément.

Pour les décomptes de partis, `party-votes.mjs --staging=STAGING` simule et
`--write` ajoute uniquement la couverture manquante. Les décomptes existants
restent liés à leur instantané d'origine. Les listes nominatives qui divergent du
total officiel sont exclues, et les rattachements ambigus restent non attribués.
Les archives utilisées doivent couvrir chaque scrutin publié. Pour les bulletins
des candidats, `--current-snapshots-only` complète les instantanés courants sans
réécrire les bulletins historiques.

La tâche quotidienne comprend désormais le Parlement européen, sur la fenêtre
de 30 jours et avec le même plafond de 500 nouveaux scrutins. Son activation en
production dépend de la fusion de cette branche ; une modification du fichier
de workflow ne prouve pas son exécution. Les textes adoptés et les décomptes
nominatifs supplémentaires nécessitent une reprise explicite.

Une API vide ne prouve pas qu'aucun vote n'a eu lieu. Les trous historiques,
résultats non renseignés et limites de source figurent dans le bilan de couverture.

## Retrait physique et restauration

La réduction publique est réversible : les scrutins exclus redeviennent brouillons,
avec leurs métadonnées et traces de contrôle. Elle ne réduit pas le stockage.
Un nettoyage physique doit être validé séparément après sauvegarde complète des
scrutins, sources, couvertures, décomptes, bulletins personnels et rapprochements.
Le format et les garde-fous sont définis dans `retention.mjs`. La reprise conserve
les identifiants et refuse d’écraser les pièces présentes.

```sh
node ingestion/backfill/retention-cli.mjs plan ARCHIVE.json.gz SHA256
node ingestion/backfill/retention-cli.mjs prune ARCHIVE.json.gz SHA256 --dry-run
# Seulement après validation du plan et de la sauvegarde :
node ingestion/backfill/retention-cli.mjs prune ARCHIVE.json.gz SHA256 --yes
node ingestion/backfill/retention-cli.mjs restore ARCHIVE.json.gz SHA256 --dry-run
node ingestion/backfill/retention-cli.mjs restore ARCHIVE.json.gz SHA256 --yes
```

Le contrôle compare chaque pièce et ses dépendances à la sauvegarde sous verrous,
refuse une dépendance relue/publiée et annule toute divergence. Une suppression
permet la réutilisation du stockage ; la taille physique ne baisse pas forcément
immédiatement. Aucune commande `VACUUM FULL` n’est lancée automatiquement.
