# Preuve Publique — instructions de travail

Documenter les positions politiques en France et dans l’Union européenne depuis 2017 : programme → déclaration → amendement/texte → scrutin nominatif → texte adopté. Le visiteur consulte les pièces et se fait sa propre opinion. Aucun score de cohérence ni verdict politique automatique.

- Chaque élément publié possède date, URL de la source originale et localisation précise (page, article ou numéro de scrutin) quand disponible.
- Distinguer pour, contre, abstention, non participation et position individuelle inconnue. Ne jamais déduire un vote individuel du groupe.
- Les liens entre promesse et vote exigent une justification, une confiance et une revue humaine pour les rapprochements sensibles. Un vote contre un texte global ne prouve pas une opposition à chaque disposition.
- Prioriser Assemblée nationale, Sénat, Parlement européen, Légifrance et programmes originaux. Toute déclaration médiatique exige une citation vérifiable et un lien direct.
- Aucun secret, mot de passe, URL PostgreSQL avec identifiants, token ou `.env` dans Git, les issues, les PR ou les journaux CI. Les variables `NEXT_PUBLIC_*` sont publiques ; aucune clé privilégiée n’y entre.
- RLS sur toutes les tables exposées. Lecture publique limitée aux pièces publiées ; aucune écriture depuis le client public.
- Préférer ingestion incrémentale, cache et IA locale hors requête visiteur. Ne pas fabriquer de données de démonstration attribuées à des personnalités réelles.
