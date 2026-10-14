# preuve-publique

Nouveau départ : branche `feat/factChecking`, remise à zéro du 14/10/2026.

Ce dépôt a porté un premier projet — un suivi documentaire des positions
politiques (scrutins, acteurs, rubriques officielles) servi par Next.js et
Supabase. Sur cette branche, tout ce qui lui appartenait a été supprimé : code de
l'application, modèle SQL et migrations, pipelines d'ingestion, tests, données de
référence et documentation.

Rien n'est perdu : l'historique est intact sur `master`.

    git show master:README.md    # le texte de l'ancien projet
    git show master:<chemin>     # n'importe quel fichier supprimé

Ce qui reste ici : la chaîne de déploiement (`Dockerfile`, `cloudbuild.yaml`), le
contrôle de branche GitHub, les fichiers d'hygiène Git et les consignes de travail
(`AGENTS.md`).

## État de l'infrastructure (relevé du 14/10/2026)

- Supabase — projet `preuve-publique` conservé (mêmes URL et clés), vidé : plus
  aucune table, vue, séquence ni fonction applicative, historique de migrations
  remis à zéro. L'authentification du projet (comptes Supabase Auth, connexion
  Google) reste en place.
- Google Cloud — service Cloud Run `preuve-publique-git` supprimé, dépôts
  d'images `preuvepublique` et `cloud-run-source-deploy` supprimés. Le mapping du
  domaine `preuve-publique.fr` subsiste dans le projet ; aucun service n'est
  derrière, le domaine répond 404. Les secrets (`DB_PG_URL`,
  `NEXT_PUBLIC_SUPABASE_*`) et le bucket `preuve-publique_cloudbuild` sont
  conservés.
- `cloudbuild.yaml` pointe encore vers `_AR_REPOSITORY=preuvepublique` et
  `_SERVICE=preuve-publique-git` : à ajuster au premier déploiement du nouveau
  site, puisque ces ressources n'existent plus.
- Les deux synchronisations planifiées de l'ancien projet (workflows GitHub
  « scrutins » et « sondages ») sont désactivées et leur secret de dépôt
  `POLLS_DB_PG_URL` supprimé.

Le nouveau site sera écrit sur cette branche.
