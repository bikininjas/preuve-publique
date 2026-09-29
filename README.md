# Preuve Publique

Application de traçabilité des positions politiques en France et dans l’Union européenne. Programmes, déclarations, textes, amendements, votes et résultats législatifs renvoient aux sources originales, sans verdict politique.

## Démarrer

1. `npm ci`
2. Copier `.env.example` vers `.env.local` et renseigner les variables publiques. `DB_PG_URL` est réservée aux scripts locaux ou CI ; elle n’est jamais utilisée par l’interface.
3. `npm run dev`

Sans configuration Supabase, l’interface affiche un état vide explicite. Avec Supabase, appliquer la migration `supabase/migrations/20260929000000_initial.sql` après revue du projet existant. Publier des éléments uniquement après vérification humaine.

## Hébergement gratuit

Le site est exporté en HTML/CSS/JS dans `out/` par `npm run build`. Sur Cloudflare Pages, connecter le dépôt GitHub, choisir **Next.js (Static HTML Export)**, commande `npm run build`, dossier de sortie `out`, branche de production `master`. Configurer uniquement `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` comme variables de build publiques. Les éléments sont lus directement par le navigateur sous les règles RLS. Chaque visite génère au plus une lecture limitée à 12 lignes sur la page d’accueil ; les données ne sont pas figées à la date du build.

Le projet Supabase est sur l’offre gratuite : concevoir les imports pour rester sous 500 Mo de base, 5 Go de transfert sortant et 1 Go de stockage de fichiers. Conserver dans Postgres seulement les métadonnées et de courts extraits vérifiés ; référencer les originaux institutionnels par URL et empreinte plutôt que stocker tous les PDF et débats. Ne pas importer l’ensemble des documents depuis 2017 avant d’avoir mesuré leur taille. Les projets gratuits peuvent être mis en pause après une semaine d’inactivité.

Les migrations restent versionnées dans `supabase/migrations`. Après revue, les appliquer avec la CLI Supabase ; ne jamais copier le mot de passe ou la connexion PostgreSQL dans Git. Automatiser `supabase db push` depuis GitHub Actions uniquement après avoir vérifié l’état existant de la base et rangé les identifiants dans les secrets du dépôt.

Le modèle initial contient `sources`, `actors`, `evidence` et `evidence_links`. Le type de lien `related` ne signifie pas « soutient » ou « contredit ». Les imports officiels, la comparaison et la modération sont les prochains lots ; ce schéma seul n’importe aucune donnée.

Le dépôt est public. Ne jamais ajouter la connexion PostgreSQL ni un `.env.local`. Vérifier `git diff --cached` avant chaque commit.
