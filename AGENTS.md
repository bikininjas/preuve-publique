# preuve-publique — consignes de travail

État : branche `feat/factChecking`, remise à zéro du 14/10/2026 (voir `README.md`).
L'ancien projet — suivi documentaire des positions politiques — reste lisible sur
`master` : `git show master:AGENTS.md`, et de même pour n'importe quel fichier
supprimé.

## Règles qui ne changent pas

- **Ne jamais affirmer sans preuve.** Aucune mention « importé », « appliqué »,
  « déployé » ou « publié » sans une lecture réelle qui le montre ; un état vide
  explicite vaut mieux qu'une affirmation plausible. L'utilisateur vérifie.
- **Tout est en français** : interface, documentation, messages de commit, corps
  de pull request.
- **Fins de ligne CRLF dans le dépôt** (il n'y a pas de `.gitattributes`) :
  convertir tout fichier écrit en LF, sinon le diff présente le fichier entier
  comme modifié.
- **Une branche par changement cohérent**, fusion en `--rebase --delete-branch`
  (l'historique de `master` est linéaire). Ne rien affirmer sur l'état d'une
  livraison sans l'avoir lu : les garanties sont les commandes locales passées,
  pas un pipeline supposé.
- **Corps de PR en trois parties** : « Ce que fait cette branche », « Vérifié »,
  « Limites assumées ».

## Sécurité

- Le dépôt est public : aucun secret dans les fichiers, les commits, les messages
  ou les transcripts. `.env.local` n'est jamais commité ; `.env.example` ne
  contient que des noms de variables et des valeurs vides.
- Le conteneur web ne reçoit que des valeurs publiques d'exécution ; les
  connexions privilégiées (chaîne Postgres, clés de service) restent hors du
  conteneur.
