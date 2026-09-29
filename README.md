# Preuve Publique

Application de traçabilité des positions politiques en France et dans l’Union européenne. Programmes, déclarations, textes, amendements, votes et résultats législatifs renvoient aux sources originales, sans verdict politique.

## Démarrer

1. `npm ci`
2. Copier `.env.example` vers `.env.local` et renseigner les variables publiques. `DB_PG_URL` est réservée aux scripts locaux ou CI ; elle n’est jamais utilisée par l’interface.
3. `npm run dev`

Sans configuration Supabase, l’interface affiche un état vide explicite. Avec Supabase, appliquer la migration `supabase/migrations/20260929000000_initial.sql` après revue du projet existant. Publier des éléments uniquement après vérification humaine.

Le modèle initial contient `sources`, `actors`, `evidence` et `evidence_links`. Le type de lien `related` ne signifie pas « soutient » ou « contredit ». Les imports officiels, la comparaison et la modération sont les prochains lots ; ce schéma seul n’importe aucune donnée.

Le dépôt est public. Ne jamais ajouter la connexion PostgreSQL ni un `.env.local`. Vérifier `git diff --cached` avant chaque commit.
