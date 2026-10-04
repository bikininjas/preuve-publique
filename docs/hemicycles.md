# Hémicycles des trois assemblées

Les pages `/groupes` et `/partis` proposent la composition de l’Assemblée nationale, du Sénat et du Parlement européen. Les boutons d’assemblée et de périmètre européen conservent leur sélection dans l’URL ; le passage groupes ↔ partis garde aussi ce périmètre. Le Parlement entier et sa délégation française sont accessibles séparément.

Un point représente un siège. Les formations sont rangées par effectif décroissant ; les données manquantes restent à part, en gris. L’emplacement ne reproduit pas le plan de salle officiel et n’attribue pas de position politique. La légende donne les effectifs et leur dénominateur, reste utilisable au clavier et permet d’isoler une formation. Toutes les entrées sont accessibles, y compris les petites formations.

## Sources et distinctions

- **Assemblée nationale** : archive officielle AMO10 des députés en exercice, mandats actifs `ASSEMBLEE`, `GP` et `PARPOL`. Une personne ne compte qu’une fois ; les mandats multiples pour le même organe sont dédoublonnés. Plusieurs affiliations simultanées différentes restent ambiguës. Les mandats `PARPOL` documentent un rattachement de financement, pas une preuve d’adhésion au parti.
- **Sénat, groupes** : annuaire JSON officiel des sénateurs actifs, champ `groupe`. « Nouveaux Sénateurs / AUCUN » reste une donnée non renseignée, distincte de la réunion administrative des sénateurs sans groupe. Le renouvellement de 2026 peut laisser des rattachements en attente dans la source.
- **Sénat, partis** : annexe du Bureau du 18 décembre 2025, page imprimée 10 / 11e page PDF. Les 19 entrées totalisent 348 déclarations pour le financement public 2026, au 30 novembre 2025. Cet état historique précède le renouvellement de 2026 ; il ne décrit pas l’adhésion ni les nouveaux élus.
- **Parlement européen** : liste officielle `/meps/show-current` pour les pays et groupes ; profils `/meps/{id}`, affiliations datées `NATIONAL_POLITICAL_GROUP`, et noms officiels `/corporate-bodies/{id}` pour les formations nationales. Les groupes européens ne sont jamais utilisés comme substitut à un parti. Une formation nationale reste distinguée par pays.

La capacité de référence est [577 sièges à l’Assemblée nationale](https://www.assemblee-nationale.fr/dyn/les-groupes-politiques), [348 au Sénat](https://www.senat.fr/connaitre-le-senat/role-et-fonctionnement/la-representation-des-collectivites-territoriales.html), et [720 au Parlement européen, dont 81 pour la France](https://www.europarl.europa.eu/factsheets/fr/sheet/20/il-parlamento-europeo-organizzazione-e-funzionamento). Un siège absent de la liste est affiché comme non décrit dans la source, sans présumer sa vacance. Les compositions sont indépendantes des volumes de votes dans la base ; un historique de bulletins ne permet pas de compter les membres actuels.

## Actualisation

`node ingestion/composition/sync.mjs` récupère uniquement les listes et profils nécessaires, avec cache quotidien, débit limité et respect de `Retry-After`. Aucun appel vers ces institutions pendant une visite, aucune écriture Supabase, aucune migration, aucun brouillon ni rapprochement interprétatif.

Le script remplace `data/parliament-composition.json` seulement lorsque la collecte et les contrôles réussissent. Les sources, dates, repères et empreintes restent dans cet instantané versionné. Pour les profils européens, l’empreinte représente la collection des empreintes des documents, rangées par identifiant ; les données nominatives et biographies ne sont pas publiées dans cet instantané.

Le tableau sénatorial de financement est extrait dans `ingestion/composition/senate-funding-2026.json`. Son PDF est contrôlé par SHA-256 avant toute actualisation. Un document changé impose une nouvelle extraction et une vérification visuelle de l’annexe, plutôt qu’un remplacement silencieux des effectifs.

Les effectifs financiers anciens ne sont pas projetés sur les élus actuels. La date propre à chaque vue et la date de consultation sont affichées ensemble.

## Vérifications du 4 octobre 2026

- Build Next.js / TypeScript, ESLint et 69 tests de lecture réussis : allocation entière des sièges, absence de superposition, dates, affiliations ambiguës, distinction partis / groupes / indépendants, capacités et provenance.
- Dans le navigateur, les six vues nationales et européennes affichent exactement 577, 348 et 720 points. Les deux vues de la délégation française en affichent 81. Assemblée : 569 personnes décrites ; Sénat : 348, dont 179 nouveaux sénateurs sans groupe publié ; Parlement européen : 719 sur 720 sièges.
- Sélection et réinitialisation d’une formation, recherche dans la légende, noms complets, liens de sources et passage groupes ↔ partis contrôlés. La recherche de l’annuaire des partis conserve l’assemblée et le périmètre européen.
- Contrôles à 1 280, 390 et 320 px, thèmes clair et sombre, sans débordement horizontal. Les affiliations non renseignées restent visibles dans la légende ; elles ne deviennent ni des indépendants, ni des sièges déclarés vacants.
