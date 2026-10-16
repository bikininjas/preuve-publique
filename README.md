# preuve-publique

Vérification factuelle par **triangulation documentaire** — cible : `preuve-publique.fr`.

Un dossier de ce site ne demande pas qu'on croie une rédaction. Il montre les documents :
archives primaires, travaux évalués par les pairs, sources de gauche, du centre et de
droite libérale ou conservatrice, données officielles. Le lecteur constate le recoupement
— et donc que des bords opposés disent la même chose — au lieu de faire confiance à une
autorité. Le mode « preuve à l'aveugle » va plus loin : les noms des médias et des auteurs
sont floutés, seuls la citation, la date et l'état de l'archive restent lisibles.

## État vérifié le 15/10/2026

- **Base** : huit migrations appliquées au projet Supabase `pntkhwdosrvsdybzsicp` —
  `0001_init_preuve_publique` (`20261014133149`), `0002_hybrid_search_rpc`
  (`20261014135315`), `0003_proof_integrity` (`20261014135316`),
  `0004_categories_and_admin` (`20261014145312`), `0005_archive_records`
  (`20261015043026`), `0006_protagonists` (`20261015044427`),
  `0007_religion_and_verdicts` (`20261015155510` — catégorie « Religion », verdicts
  « anachronisme historique » et « généralisation abusive »), `0008_dossier_illustration`
  (`20261015163000` — `illustration_url` et `illustration_credit` sur les dossiers, bucket
  public `illustrations` : lecture publique, dépôt réservé aux administrateurs).
  Vingt-sept dossiers en base :
  vingt-six **publiés** — le dossier de référence (8 sources, 4 piliers), l'AME (7), les
  sans-papiers et le RSA (7), Pétain et Vichy (9), le coût de l'immigration (4, économie),
  l'insécurité attribuée à l'immigration (6, société), le pourvoi en cassation et
  l'inéligibilité des élus (10, politique), l'affaire des assistants RN (11, politique),
  l'expulsion des étrangers délinquants (6, politique), le « laxisme » des juges (8,
  société), l'allocation pour demandeur d'asile (7, société), les aides sociales des
  sans-papiers (7, société), le minimum vieillesse (ASPA) versé aux étrangers (13,
  société), l'agression de Bordeaux attribuée à un « clandestin sous OQTF » (6, faits
  divers), l'incendie de l'église de Saint-Omer attribué à un « attentat islamiste »
  (8, faits divers), le revenu disponible d'un couple au RSA comparé à un couple au
  SMIC (8, économie), la comparaison entre fraude sociale et fraude fiscale (7,
  économie), les discriminations à l'embauche liées à l'origine (7, société) et la thèse
  de races biologiques humaines (8, société), l'homoparentalité et le développement des
  enfants (7, société), la « théorie du genre » à l'école (10, société) et les deux
  dossiers Religion — l'union du prophète de l'islam avec Aïcha qualifiée de
  « pédophilie » (9, Religion, anachronisme historique) et « l'islam, seule religion
  scripturairement homophobe et transphobe » (12, Religion, généralisation abusive), le
  réchauffement climatique attribué à un « cycle solaire » (9, environnement), la voiture
  électrique comparée au thermique en analyse de cycle de vie (7, environnement) et
  l'OTAN accusée d'avoir « violé » un traité de 1990 promettant de ne pas s'élargir à
  l'Est (7, international) —
  et un **brouillon de contrôle RLS** ; RLS actif sur
  `dossiers`, `dossier_sources` et `admin_users`.
- **Intégrité** : les 208 sources portent leur empreinte de citation ; la RPC de recherche
  hybride est exécutable en rôle `anon` (vérifié par `has_function_privilege` **et** par un
  appel REST réel) ; l'audit public `/api/verify/<empreinte>` confirme `verified: true`
  pour la source *Liberty Magazine*
  (`9927a610cdc82b1265473a253c87125d2d93aa02a6bbbca5b32d04e221f1553a`). `ETag` et
  `X-Proof-Integrity-Root` du dossier publié, relevés en ligne, valent la racine
  d'intégrité recalculée :
  `1e20bc8fd7063c3a7359dfdff327fe8f8f970064bbe6ecadf26f0c5bc1a7cb9f`. Les cinq
  autres dossiers publiés le 15/10 (AME, RSA, Pétain-Vichy, coût de l'immigration,
  insécurité attribuée à l'immigration) ont été vérifiés de la même manière : `ETag` et
  `X-Proof-Integrity-Root` relevés en ligne égaux aux racines recalculées par
  `npm run proofs` (`bf9d6e92…` et `ca57fa27…`, recalculées après l'audit des sources ;
  `22d08551…`, `288fa722…`, `14d2686e…`).
  Le septième dossier publié (le pourvoi en cassation et l'inéligibilité des élus, 10
  sources) a été vérifié de la même manière (`2614c9ac…`) et ses dix fiches d'archive
  sont déposées et relues (six instantanés réseau, quatre URL indisponibles consignées).
  Le huitième (l'affaire des assistants RN, 11 sources) l'a été de même (`fa877e43…`) :
  onze fiches déposées et relues (huit instantanés réseau, trois URL indisponibles).
  Le neuvième (l'expulsion des étrangers délinquants, 6 sources) a été vérifié de la même
  manière (`a4ad5100…`) : six fiches déposées et relues (cinq instantanés réseau — CEDH,
  Cour des comptes, Sénat, Conseil d'État, RTDEur — et une URL indisponible, Légifrance
  répondant 403 aux robots).
  Le dixième (le « laxisme » des juges et les peines de prison, 8 sources, toutes citées
  d'après les textes téléchargés — statistique mensuelle de la DAP, chiffres clés,
  cahiers n° 65, CEDH, The Conversation, Cour des comptes, Sénat, Libération) a été
  vérifié de la même manière (`0492b4cc…`) : huit fiches déposées et relues (sept
  instantanés réseau et une URL indisponible consignée).
  Le onzième (l'allocation pour demandeur d'asile et la carte de paiement de l'OFII,
  7 sources) a été vérifié de la même manière (`d5e285d5…`) : sept fiches déposées et
  relues (six instantanés réseau — DREES, Assemblée nationale, Cour des comptes, Sénat,
  Défenseur des droits, enquête Ducourant — et une URL indisponible, Légifrance répondant
  403 aux robots).
  Le douzième (le RSA, la CAF et les APL des sans-papiers, 7 sources) a été vérifié de la
  même manière (`5b894fab…`) : sept fiches déposées et relues (quatre instantanés réseau —
  CNAF, service-public.fr, Sénat, Conseil constitutionnel — et trois URL indisponibles,
  Légifrance et Cairn répondant 403 aux robots).
  Le treizième (le minimum vieillesse et les conditions d'accès des étrangers, 13 sources —
  fiche officielle service-public.fr, articles L. 815-1, L. 815-12, L. 815-13 et L. 816-1 du
  code de la sécurité sociale cités d'après les textes téléchargés, deux études de la CNAV,
  Cour des comptes, dossier législatif du Sénat ppl25-734, LCP, revue *Retraite et société*,
  dépêche AFP) a été vérifié de la même manière (`a1de390a…`) : treize fiches déposées et
  relues (treize instantanés réseau — aucune URL indisponible).
  Le quatorzième (l'agression de Bordeaux attribuée à un « clandestin sous OQTF », 6
  sources) a été vérifié de la même manière (`26b1fe75…`) : six fiches déposées et relues
  (cinq instantanés réseau — France 3 Nouvelle-Aquitaine, franceinfo, Le Figaro, CGLPL,
  Revue Alyoda — et une URL indisponible, Légifrance répondant 403 aux robots).
  Le quinzième (l'incendie de l'église de Saint-Omer attribué à un « attentat islamiste »,
  8 sources) a été vérifié de la même manière (`3e8df5b1…`) : huit fiches déposées et
  relues (sept instantanés réseau — franceinfo, Le Figaro, Sénat, OPR, code pénal
  art. 421-1 et 322-6, JAAAPL — et une URL indisponible, CNEWS répondant 403 aux robots).
  Le seizième (le revenu disponible d'un couple au RSA comparé à un couple au SMIC,
  8 sources) a été vérifié de la même manière (`db4ada31…`) : huit fiches déposées et
  relues (CASF L. 262-2 et R. 262-9, barème CNAF, fiches service-public F19778 et A18815,
  Cour des comptes, rapport sénatorial r25-728, étude OFCE), toutes capturées en
  instantanés réseau.
  Le dix-septième (la comparaison entre fraude sociale et fraude fiscale, 7 sources — note
  annuelle du HCFiPS, rapport du Défenseur des droits, rapport public thématique de la Cour
  des comptes sur la fraude fiscale, bilan Urssaf du travail dissimulé 2024, rapport n° 72
  de la commission des finances du Sénat, article universitaire paru dans *The Conversation*
  et Observatoire de la justice fiscale) a été vérifié de la même manière (`d862948d…`) :
  sept fiches déposées et relues (six instantanés réseau et une URL indisponible — le
  dossier de presse Urssaf, dont l'adresse contient des « + » rejetés par la capture).
  Le dix-huitième (les discriminations à l'embauche liées à l'origine, 7 sources) a été
  vérifié de la même manière (`5bffdbc5…`) : sept fiches déposées et relues (l'article de
  la DARES dans la revue *Travail et Emploi* n° 180, reproduit par la CFDT — le portail
  OpenEdition bloque les robots —, le rapport annuel de la DGAFP, la note n° 76 de l'IPP,
  deux testings TEPP-CNRS de l'université Gustave Eiffel, le rapport annuel 2024 du
  Défenseur des droits et la page Institut Montaigne servie par l'instantané Wayback),
  toutes capturées en instantanés réseau.
  Le dix-neuvième (la thèse de races biologiques humaines, 8 sources — Déclaration de
  l'UNESCO sur la race et les préjugés raciaux de 1978 servie par le site officiel, fiche
  du NHGRI sur la variation génomique, étude fondatrice de Barbujani, Magagni, Minch et
  Cavalli-Sforza (PNAS 1997) reproduite par PubMed Central, chronique d'Évelyne Heyer
  (France Culture), article du CNRS Le journal, articles du Point (entretiens du
  généticien Paul Verdu), de L'Express et du Monde) a été vérifié de la même manière
  (`0fba6db3…`) : huit fiches déposées et relues (sept instantanés réseau et une URL
  indisponible — l'article du Point, dont l'accès direct répond 403 aux robots et qui a
  été capturé via l'instantané Wayback).
  Le vingtième (l'homoparentalité et le développement des enfants, 7 sources — méta-revue
  du What We Know Project de l'université Cornell, résolution de 2020 de l'American
  Psychological Association servie par l'instantané Wayback, prise de position de 2013 de
  l'Académie américaine de pédiatrie reproduite par Youth Today, fiche de l'INED sur
  l'enquête Erfi 2, décision du Conseil constitutionnel du 17 mai 2013, arrêt
  *X et autres c. Autriche* de la CEDH reproduit par Juricaf et rapport parlementaire
  n° 628 de la commission spéciale) a été vérifié de la même manière (`a13d0497…`) :
  sept fiches déposées et relues, toutes capturées en instantanés réseau.
  Le vingt et unième (la « théorie du genre » à l'école, 7 sources — page Éduscol servant
  de cadre à l'égalité filles-garçons, arrêté du 3 février 2025 fixant le programme EVARS
  (BO n° 6 du 6 février 2025), programme du cycle 4 (BO n° 31 du 30 juillet 2020, PDF de
  l'annexe 3), communiqué du Conseil d'État du 27 juin 2025, rapport IGÉSR n° 2021-149,
  avis du CESE du 10 septembre 2024 et rapport sénatorial n° 814 (2024-2025)) a été
  vérifié de la même manière (`aff5f367…`), puis enrichi le 15 octobre 2026 (dix
  sources : ajout de la décision n° 508643 du Conseil d'État du 8 octobre 2026 — les
  parents n'ont « ni à donner leur accord » ni un droit de regard sur les séances —,
  d'un article de Libération du 6 février 2025 servi par un instantané Wayback et d'un
  article du Figaro du 23 janvier 2025 décrivant le volet maternelle) : dix fiches
  déposées et relues — les sites de l'éducation nationale (éduscol, education.gouv.fr)
  répondant 403 aux robots, les pièces concernées sont servies par des instantanés
  Wayback, vérifiés à la source avant leur intégration. La nouvelle racine d'intégrité
  du dossier est `b0cc82fc…`.
- **Audit des sources (15/10/2026)** : les 62 sources des huit dossiers alors publiés ont été
  re-vérifiées une à une contre leur texte original, ou contre un miroir institutionnel
  documenté quand la source primaire bloque les robots (doctrine.fr et justiweb.fr pour
  Légifrance, Wikisource pour les lois de 1940, DOAJ pour l'article d'Érudit, Wayback
  pour le communiqué de la Cour de cassation, reproductions concordantes pour l'OCDE).
  Cinq citations ont été corrigées au mot exact — rapport d'information du Sénat
  (r24-841), rapport Évin-Stefanini, Insee, Bel (*Economic History Review*) et Liberty
  Magazine — et quatre sources documentaires du dossier sur le nazisme (discours de
  Düsseldorf, Ermächtigungsgesetz, journée du 2 mai 1933, interview de Liberty)
  reçoivent une URL de transcription institutionnelle. Les six sources du dossier sur
  l'expulsion des étrangers délinquants (CESEDA L. 631-1, CEDH art. 8, Cour des comptes
  2024, Sénat — avis Jourda/Bitz, Conseil d'État 2020, note RTDEur de V. Réveillère) ont
  été vérifiées au texte original de la même façon lors de leur intégration, le 15/10. Les
  sept sources du dossier sur l'allocation pour demandeur d'asile (CESEDA L. 553-1, DREES,
  réponse ministérielle n° 27196, Cour des comptes, Sénat, Défenseur des droits, enquête
  Ducourant) ont été vérifiées de la même façon avant leur intégration ; le site de l'OFII
  répond 403 aux robots et la réponse ministérielle documente le dispositif qu'il gère. Les
  sept sources du dossier sur les aides sociales des sans-papiers (CASF L. 262-4, CSS
  L. 512-2, CNAF IT-2024-232, service-public.fr, Sénat n° 426, Conseil constitutionnel
  2011-137 QPC, RFAS/Izambert) ont été vérifiées de la même façon avant leur intégration
  (Légifrance et Cairn répondent 403 : citations recoupées sur des reproductions
  institutionnelles). Les six sources du dossier sur l'agression de Bordeaux (communiqués
  du parquet de Bordeaux relayés par France 3 Nouvelle-Aquitaine, franceinfo, Le Figaro,
  CESEDA L. 611-1, rapport du CGLPL, note de la Revue Alyoda) ont été vérifiées de la même
  façon avant leur intégration. Les huit sources du dossier sur l'incendie de l'église de
  Saint-Omer (parquets via CNEWS, franceinfo, Le Figaro, Sénat ppl24-161, OPR, code pénal
  art. 421-1 et 322-6, JAAAPL) ont été vérifiées de la même façon avant leur intégration.
  Les huit sources du dossier sur le revenu disponible RSA/SMIC (CASF L. 262-2 et
  R. 262-9, barème CNAF, fiches service-public F19778 et A18815, Cour des comptes,
  rapport sénatorial r25-728, étude OFCE) ont été vérifiées de la même façon avant leur
  intégration. Les sept sources du dossier sur les discriminations à l'embauche liées à
  l'origine (article DARES de *Travail et Emploi* n° 180, rapport DGAFP, note IPP n° 76,
  testings DESPERADO V et TEPP-ESR de l'université Gustave Eiffel, rapport annuel 2024 du
  Défenseur des droits, page Institut Montaigne via l'instantané Wayback) ont été
  vérifiées de la même façon avant leur intégration — les citations ont été recoupées mot
  à mot contre les PDF sources, et les chiffres du brief corrigés au réel (écart mesuré
  de 26,7 % à 31,5 % selon les protocoles, plutôt que « 30 à 40 % »). Les sept sources du
  dossier sur l'homoparentalité (méta-revue du What We Know Project de l'université
  Cornell, résolution de l'American Psychological Association de 2020 servie par
  l'instantané Wayback, prise de position de l'Académie américaine de pédiatrie de 2013
  reproduite par Youth Today, fiche de l'INED sur l'enquête Erfi 2, décision n° 2013-669
  DC du Conseil constitutionnel, arrêt de la CEDH *X et autres c. Autriche* reproduit par
  Juricaf, rapport n° 628 de l'Assemblée nationale) ont été vérifiées de la même façon
  avant leur intégration — les citations anglaises y sont reproduites dans la langue
  d'origine, avec traduction française en contexte. Les sept sources du dossier sur la
  « théorie du genre » (page Éduscol, arrêté du 3 février 2025, programme du cycle 4,
  communiqué du Conseil d'État, rapport IGÉSR n° 2021-149, avis du CESE, rapport
  sénatorial n° 814) ont été vérifiées de la même façon avant leur intégration : les
  textes réglementaires ont été lus au Bulletin officiel, et les pages bloquées (403)
  recoupées via leurs instantanés Wayback — l'expression « théorie du genre » ne figure
  dans aucun des textes produits par l'éducation nationale.
- **Application** : `npm run typecheck`, `npm test` (**36 tests**) et `npm run build`
  passent. Le serveur standalone du conteneur a été exercé sur les routes réelles :
  - `/api/health` → 200, `status: healthy`, latence base mesurée (99 ms en local) ;
  - `/api/dossiers/<slug>` → 200, `Cache-Control: public, max-age=60, s-maxage=3600,
    stale-while-revalidate=86400`, `ETag` et `X-Proof-Integrity-Root` égaux à la racine
    recalculée localement, 304 sur `If-None-Match`, 404 sur un slug inconnu ;
  - `/api/search?q=nazis` → 200, deux résultats ; `q` trop court → 400 ;
  - `/api/verify/<empreinte>` → 200 avec la chaîne canonique ; empreinte inconnue → 404,
    empreinte malformée → 400 ;
  - 30 requêtes puis 429 avec `Retry-After` et `X-RateLimit-*` ;
  - en-têtes `nosniff`, `DENY`, `strict-origin-when-cross-origin` présents ;
  - sans variables Supabase, le repli local sert les mêmes empreintes dérivées et l'audit
    répond 200 (deux tests de non-régression couvrent ce point).
- **Déploiement** : le service Cloud Run `preuve-publique-git` (projet `preuve-publique`,
  `europe-west1`) sert `preuve-publique.fr` ; révision en ligne vérifiée le 15/10/2026 —
  `preuve-publique-git-00005-l49`, puis `preuve-publique-git-00006-pfj` après l'ajout des
  deux dossiers Religion (`/api/health` → `status: healthy`, `database.reachable: true` ;
  les deux dossiers répondent 200 et leur `X-Proof-Integrity-Root` égale la racine
  recalculée par `npm run proofs`). Déploiement manuel par
  `gcloud builds submit --config cloudbuild.yaml --project preuve-publique` (aucun
  déclencheur automatique).
- **Chaîne d'archivage** : en service depuis le 15/10/2026 — les **178 pièces publiées**
  ont leur fiche déposée dans `dossier_source_archives`, relue et rehachée au dépôt, et
  servie **octet pour octet** par `/api/archives/<empreinte de fiche>` (rehachage vérifié
  en ligne). Chaque dossier porte désormais l'ensemble de ses pièces : 146 fiches issues
  d'un instantané réseau (`URL_SNAPSHOT`, empreinte des octets capturés), 29 consignées
  `URL_UNAVAILABLE` (403/429 aux robots : Légifrance, préface de Stanford, OCDE,
  Érudit, Le Figaro, courdecassation.fr…) et 3 en `METADATA_ONLY` (les trois pièces
  sans URL du dossier de référence). Toute ré-application du seed (`seed:apply`)
  supprime les sources en cascade puis les réinsère : elle emporte les fiches d'archive
  du dossier, qu'il faut redéposer par `archive:capture` — fait le 15/10 à 12:41 UTC
  pour les dix dossiers réappliqués (68 fiches redéposées, racine des captures
  `e0a39749…`), puis à 13:02 UTC pour les douze dossiers réappliqués ; un second
  passage de capture lancé en parallèle ayant créé un doublon par pièce, la table a été
  dédupliquée : 83 fiches exactes conservées, une par pièce publiée. L'intégration du
  dossier « aides sociales des sans-papiers » (13:30 UTC), puis celles du « minimum
  vieillesse (ASPA) » (13:42 et 14:05 UTC), de l'« agression de Bordeaux » (14:13 UTC) et
  de l'« incendie de Saint-Omer » (14:22 UTC) et du « RSA contre SMIC » (14:36 UTC),
  ont entraîné de nouvelles réapplications du seed et recaptures : **125 fiches exactes**,
  une par pièce publiée (99 `URL_SNAPSHOT`, 23 `URL_UNAVAILABLE`, 3 `METADATA_ONLY`).
  L'intégration du dossier « fraude sociale contre fraude fiscale » (14:41 UTC) a entraîné
  une dernière réapplication et recapture : **132 fiches exactes**, une par pièce publiée
  (104 `URL_SNAPSHOT`, 25 `URL_UNAVAILABLE`, 3 `METADATA_ONLY`) — racine des captures
  `d97280a587c104d6…`. L'intégration du dossier « discriminations à l'embauche » (15:00
  UTC) a entraîné une ultime réapplication et recapture : **139 fiches exactes**, une par
  pièce publiée (111 `URL_SNAPSHOT`, 25 `URL_UNAVAILABLE`, 3 `METADATA_ONLY`) — racine des
  captures `76a9fe09a97bf82f…`. L'intégration du dossier « races biologiques humaines »
  (15:06 UTC) a entraîné une ultime réapplication et recapture : **147 fiches exactes**, une
  par pièce publiée (118 `URL_SNAPSHOT`, 26 `URL_UNAVAILABLE`, 3 `METADATA_ONLY`) — racine
  des captures `f2236f468699f983…`. L'intégration du dossier « homoparentalité » (15:22
  UTC) a entraîné une ultime réapplication et recapture : **154 fiches exactes**, une par
  pièce publiée (125 `URL_SNAPSHOT`, 26 `URL_UNAVAILABLE`, 3 `METADATA_ONLY`) — racine des
  captures `a0d1901ac6ffab29…`. L'intégration du dossier « théorie du genre » (15:43 UTC)
  a entraîné une ultime réapplication et recapture : **161 fiches exactes**, une par pièce
  publiée (132 `URL_SNAPSHOT`, 26 `URL_UNAVAILABLE`, 3 `METADATA_ONLY`) — racine des
  captures `681a47e0…`. L'enrichissement du dossier « théorie du genre » (16:04 UTC,
  dix sources) a entraîné une ultime réapplication et recapture : **164 fiches exactes**,
  une par pièce publiée (132 `URL_SNAPSHOT`, 29 `URL_UNAVAILABLE`, 3 `METADATA_ONLY`) —
  racine des captures `ceb48ce6e1a0f092…`. Les deux dossiers Religion (23 dossiers publiés,
  178 sources) puis l'enrichissement du dossier « union du prophète avec Aïcha »
  (neuf sources ; 16/10/2026, 07:45 UTC) portent le registre à 181 sources et **181 fiches
  d'archive** — 151 `URL_SNAPSHOT`, 27 `URL_UNAVAILABLE`, 3 `METADATA_ONLY` — racine des
  captures `f841ad6ce14a4a19…`. Puis, le 16/10/2026, l'ajout du dossier « cycle solaire »
  (neuf sources) et du dossier « voiture électrique » a entraîné une réapplication du seed
  et la recapture des dossiers publiés : **201 fiches** déposées et relues — 166
  `URL_SNAPSHOT`, 32 `URL_UNAVAILABLE`, 3 `METADATA_ONLY` — racine des captures
  `acd1a32ec934419d…` ; fiches dédupliquées, une par pièce. Puis, le 16/10/2026
  (11:10 UTC), l'ajout du dossier « OTAN-Russie » (sept sources : traité 2+4, Mémorandum
  de Budapest, entretien Gorbatchev de 2014, National Security Archive, M. E. Sarotte,
  vérifications de Libération et du Figaro) a été **appliqué de façon ciblée**, sans
  réapplication complète : ses sept fiches sont déposées et relues (six `URL_SNAPSHOT`,
  une `URL_UNAVAILABLE` — NPR répond 403 aux robots) — racine des captures du dossier
  `78da0277da73a4cf…`, racine d'intégrité `83112c910d50f193…` relevée en ligne égale à
  l'`ETag` et au `X-Proof-Integrity-Root`. Le registre compte **208 fiches** — 172
  `URL_SNAPSHOT`, 33 `URL_UNAVAILABLE`, 3 `METADATA_ONLY`.

## Pile technique

| Brique | Choix |
|---|---|
| Application | Next.js 15.5 (App Router, `output: standalone`), React 19, TypeScript strict |
| Styles | Tailwind CSS 4, Lucide |
| Base | Supabase (PostgreSQL + `pgvector` + recherche plein texte française) |
| Lecture publique | `@supabase/supabase-js` (PostgREST, clé publishable, RLS) |
| Écriture | connexion privilégiée `postgres` + Drizzle (scripts uniquement, jamais dans le conteneur web) |
| Validation | Zod — « Triangulation Guard » sur la publication |
| Conteneur | Docker multi-stage `node:22-alpine`, utilisateur non-root `nextjs`, `PORT=8080` |
| Cible | Google Cloud Run, `europe-west1` (voir « Déploiement ») |

## Commandes

```bash
npm ci
npm run dev            # développement local (repli sur les dossiers de référence)
npm run build          # build de production
npm start              # serveur Next (après build)
npm run typecheck      # tsc --noEmit
npm test               # 36 tests : données, garde de triangulation, crypto, quotas, archivage
npm run seed:sql       # régénère supabase/seed.sql depuis src/db/seed-fallback.ts
npm run seed:apply     # applique les dossiers de référence (DB_PG_URL requis)
npm run proofs         # imprime chaînes canoniques, empreintes et racine d'intégrité
npm run archive:capture  # fiches d'archive réelles (--yes pour déposer) : voir « Archivage »
```

`DB_PG_URL` (ou `DATABASE_POOLER_URL`) reste **hors du conteneur web** : le site ne lit
qu'avec la clé publishable, sous RLS. Voir `.env.example`.

## Backend

Architecture détaillée, règles et exemples de vérification :
[`docs/backend.md`](docs/backend.md).

| Route | Rôle |
|---|---|
| `/api/health` | sonde Cloud Run (runtime, latence base ; `?strict=1` pour un 503 si la base est configurée mais injoignable) |
| `/api/dossiers/<slug>` | dossier public + `X-Proof-Integrity-Root` et cache de bord |
| `/api/search?q=` | recherche hybride (`search_dossiers_hybrid` : plein texte + RRF), 429 au-delà du quota |
| `/api/verify/<sha256>` | audit public : métadonnées exactes ayant servi au calcul d'une empreinte |

Le **Triangulation Guard** refuse la publication d'un dossier qui n'a pas au moins une
preuve primaire, une source académique, deux spectres politiques distincts, et une
empreinte valide sur chaque source. Un brouillon incomplet reste un brouillon.

## Modèle de données

`supabase/migrations/` fait foi ; `src/db/schema.ts` le décrit pour les scripts privilégiés.

- `public.dossiers` — affirmation, verdict, résumé, score de consensus, briques
  (`premises` en JSONB), `search_tsv` généré en français, `embedding` (1536 dim, **non
  alimenté**), `is_published`.
- `public.dossier_sources` — une ligne par source : pilier (`political_spectrum`), citation
  ou fait documenté (`quote_kind`), URL d'origine, `archive_sha256` (empreinte de la
  citation, recalculable), `archive_binary_sha256` et `archive_storage_path` (capture
  archivée, quand elle existe).
- `public.search_dossiers_hybrid(text, vector, int)` — recherche publique, `security
  invoker` donc sous RLS.
- **RLS activé partout** : lecture publique limitée aux dossiers publiés et à leurs
  sources ; aucune écriture publique.

## Ce qui est calculé, ce qui est éditorial

- **Calculé** : couverture documentaire, nombre de sources, dates, URL, empreintes,
  racine d'intégrité.
- **Éditorial et affiché comme tel** : verdict, résumé, score de consensus.
- **Jamais affiché** : une capture qui n'existe pas, un résumé présenté comme citation,
  un taux sans période ni dénominateur, une empreinte inventée.

## Interface

| Route | Contenu |
|---|---|
| `/` | accueil : promesse de méthode, recherche, dossier publié mis en avant, les six piliers |
| `/dossiers/<slug>` | dossier complet : spectromètre, anatomie de l'affirmation, sources par pilier, mode preuve à l'aveugle, empreintes cliquables |
| `/dossiers/<slug>/opengraph-image` | carte de partage générée à la volée (`next/og`) |
| `/recherche?q=` | recherche plein texte ; un brouillon ne remonte jamais |
| `/methode` | méthode, règles forcées par le code, limites assumées |

## Parcourir et publier

Le registre se parcourt par **catégorie** (`/categories/<slug>`) ou en entier (`/dossiers`).
Les neuf catégories — Histoire, Politique, Économie, Société, Religion, Faits divers,
Santé, Environnement, International — sont une énumération en base, validée par le
Triangulation Guard : un dossier publié porte toujours une catégorie, et une catégorie
vide reste vide plutôt que d'être remplie d'un texte d'attente.

L'écriture passe par **`/admin`**, qui n'est ni un back-office hors du site ni une
connexion privilégiée :

- les comptes sont ceux de Supabase Auth ; les droits sont une **ligne en base** dans
  `admin_users`, vérifiée par la fonction `is_admin()` (security definer). Retirer la
  ligne retire l'accès, sans redéploiement ;
- toutes les écritures passent par **la session de l'utilisateur**, donc par la RLS : le
  conteneur ne reçoit jamais de clé de service ;
- la page de publication appelle le validateur de triangulation et **affiche ses refus**
  au lieu de publier malgré lui ; modifier une citation remet son empreinte à recalculer.

```bash
npm run dev          # puis http://localhost:3000/admin
```

## Interface

Échelle typographique fluide (corps à 16-18 px, plancher des métadonnées à 12 px), cibles
tactiles de 44 px, navigation complète sans JavaScript (menus `<details>`), fiches de
dossier réutilisables, sommaire collant et pièces repliées par pilier. Le mouvement est
sobre et respecte `prefers-reduced-motion` ; sans JavaScript, tout reste lisible.

Sur un dossier, deux densités de lecture : **dossier complet** (par défaut) et **vue
synthèse**, qui ramène la page d'environ dix écrans mobiles à quatre — verdict, briques
d'affirmation et une ligne par pièce. Les pièces se filtrent par pilier avec une barre
d'onglets, qui suit aussi les liens du spectromètre (`#pieces-<PILIER>`).

Sur desktop, la coquille occupe **90 % de la largeur** à partir de 1024 px (plafonnée à
1840 px) ; les colonnes de lecture restent bornées par leurs propres grilles et les
listes de fiches passent à trois colonnes en grand écran.

### Protagonistes et références

Chaque dossier peut lister ses **protagonistes** : ce que l'affirmation met en cause
(personnes, organisations, lieux, textes) et ceux qui portent les preuves (auteurs,
institutions). Chaque entrée porte une référence publique vérifiable — ou rien : une
entrée sans référence confirmée s'affiche **sans lien**, jamais avec une URL devinée. Les
références sont contrôlées contre l'API Wikipédia avant d'entrer dans le dossier de
référence, et le titre retenu est celui que l'API renvoie, redirections comprises.

### Relire une fiche d'archive

```bash
curl https://preuve-publique.fr/api/archives/<sha256>
```

La réponse est le contenu **octet pour octet** de la fiche déposée, avec son empreinte en
en-tête (`x-archive-sha256`) et une mise en cache immuable : il suffit de rehacher le
corps reçu pour retrouver l'empreinte annoncée.

## Direction artistique (brutalisme forensique)

L'interface ne ressemble pas à un média d'opinion : grille suisse exposée (bordures 1px),
papier d'archive ivoire (`#F4F1EA`) et encre carbone (`#0D0E11`) par défaut, thème
« chambre noire » optionnel (bouton dans l'en-tête, choix conservé par le navigateur).
Trois polices auto-hébergées via `next/font` : Newsreader (affirmations et titres),
Space Grotesk (interface), JetBrains Mono (cotes, dates, empreintes, scores).

**Matérialité.** Le papier a un grain (turbulence SVG fixe, `opacity: 0.03`), les blocs de
chiffres portent des repères de coupe (croix d'imprimerie aux quatre angles) et une règle
graduée millimétrée habite la marge gauche au-delà de 1024 px. Ce sont des ornements :
pseudo-éléments ou `aria-hidden`, jamais des données. Leur encre passe par `--pp-mark`,
seule variable qui bascule entre le papier et la chambre noire — un gris de grille
disparaîtrait sur le fond sombre.

- **Cartouche de dossier** : cote technique **réelle** (`PP-` + 8 caractères de
  l'identifiant du dossier), nombre de pièces, empreintes présentes, piliers documentés,
  racine d'intégrité. Aucun numéro de registre n'est inventé.
- **Tampon de verdict** : double cadre, rotation de -1,5°, manque d'encre (masque SVG
  d'éclats) et impact à l'ouverture. Il est **teinté par son ton** au même endroit que le
  verdict : un dossier « vrai » n'est pas tamponné en rouge (`VERDICT_TONES`).
- **Fiches du registre** : chemise à onglet biseauté portant la cote réelle, la catégorie
  et l'état des empreintes ; mini-spectromètre des six piliers (allumés seulement quand
  une pièce les documente) ; jauge de consensus. Au survol d'une fiche, le fond s'assombrit
  et la fiche s'allume (« table lumineuse ») — sur pointeur fin uniquement
  (`@media (hover: hover)`).
- **Spectromètre** : six colonnes reliées au verdict par un tracé SVG ; une colonne sans
  pièce reste éteinte et ne tire aucune ligne. Survoler ou atteindre une colonne au clavier
  allume son faisceau (dasharray animé) et déplie ses pièces — noms et institutions restant
  caviardés si le mode aveugle est actif. Cliquer la colonne ouvre le pilier dans la liste.
- **Anatomie du sophisme** : table de dissection à deux colonnes reliées par le diagnostic
  — à gauche la brique telle qu'elle circule (soulignée au pointillé rouge), au centre le
  tampon du statut, à droite ce que disent les pièces et le niveau de l'**échelle de
  statut** (0, 40, 60, 100) annoncée comme telle, jamais comme une mesure.
- **Pièces à conviction** : cote `PIÈCE #01`, citation surlignée quand elle est exacte
  (jamais pour un fait documenté), pied cryptographique, et bouton **« Auditer l'empreinte »**
  qui recalcule l'empreinte **dans le navigateur du lecteur** (`crypto.subtle.digest`), sans
  appel réseau. Pendant le calcul, le terminal déroule la **chaîne canonique réelle**,
  caractère par caractère — pas des octets hexadécimaux de décor.
- **Extraits officiels mis en valeur** : chaque extrait de pièce repose sur un papier
  d'archive (ambre discret, texture de papier ancien) ; le trait de surligneur reste réservé
  au verbatim — un fait documenté reçoit le papier mais jamais le trait
  (`src/lib/piece-excerpt.ts`, testé sur toutes les pièces du seed).
- **Table lumineuse d'une pièce** (« Inspecter la pièce ») : boîte de dialogue — fond
  assombri et légèrement flouté, apparition en fondu + très léger zoom, halo ambre de
  lumière rasante — qui agrandit l'extrait complet, dit sa nature (citation exacte ou fait
  documenté), son pilier et sa date, son origine, et affiche les empreintes publiées
  (citation et capture ; « non enregistrée » quand il n'y en a pas, jamais un chiffre
  inventé). Fermeture au bouton, à Échap ou par clic extérieur ; le focus entre dans la
  boîte à l'ouverture puis revient au bouton.
- **Scellés des pièces** (`ArchiveHashBadge`, bas de la section « Pièces à conviction ») :
  l'empreinte abrégée (`a3f8b9…2e1c`) et un bouton **« Vérifier l'intégrité »** qui rejoue
  la vérification **dans le navigateur du lecteur** : octets de la capture téléchargés du
  miroir `immutable-archives` et rehachés d'abord (`[✓ HASH SHA-256 VÉRIFIÉ — IMMUTABLE]`),
  chaîne canonique de la citation sinon (`— CITATION CANONIQUE`). Pendant les ~400 ms de la
  vérification, le terminal déroule l'empreinte en JetBrains Mono : les caractères partent
  en désordre et se fixent de gauche à droite — la dernière image est toujours l'empreinte
  réelle, jamais un hexadécimal de décor. Sans empreinte enregistrée, l'état est neutre et
  le dit ; sans WebCrypto, la vérification s'arrête et l'écrit ; une capture qui ne redonne
  pas son empreinte sort en divergence, avec l'empreinte recalculée.
- **Mode preuve à l'aveugle** : noms, institutions et piliers recouverts de bandes de
  caviardage tracées de gauche à droite (remplissage noir `scaleX(0)` → `scaleX(1)`, origine
  à gauche — le libellé, posé au-dessus, n'est jamais étiré) ; les **chiffres clés du corps
  du texte** (montants, pourcentages, dates) reçoivent la même bande, avec leur propre
  libellé. Au survol, une infobulle rappelle de juger l'argument avant l'auteur
  (`[SOURCE MASQUÉE — JUGEZ L'ARGUMENT AVANT L'AUTEUR]`, `[CHIFFRE MASQUÉ — JUGEZ L'ARGUMENT
  AVANT LA SOURCE]`). Le protocole teinte tout le dossier (bandeau noir et ambre
  « chambre d'isolement » en tête — ⚡ protocole actif, nombre de sources recouvertes,
  liseré sur la barre de commande). Le masquage est visuel (les données restent dans la
  page) : il sert à juger la preuve avant de savoir qui la porte, pas à cacher quoi que ce
  soit. La découpe des chiffres est pure et testée sur toute la prose publiée du seed :
  la concaténation des segments rend le texte d'origine, caractère pour caractère
  (`src/lib/figures-mask.ts`), et le switch expose son état aux lecteurs d'écran
  (`aria-pressed` sur les deux boutons).
- **Index de procédure** : plan numéroté du dossier, collant, qui suit le défilement et
  marque la section courante ; il remplace le sommaire horizontal à partir de 1280 px.
- **Bandeau de télémétrie** (page du registre) : dossiers, pièces, empreintes (n/n), piliers
  documentés et **moyenne des scores éditoriaux**. La moyenne est calculée, pas inventée, et
  l'intitulé comme l'infobulle disent qu'elle reste un indicateur éditorial. Tous les
  chiffres viennent de `registryFigures`, couvert par un test.
- **« Copier la réfutation (format débat) »** : assemble un résumé court et sourcé (verdict,
  pièces des piliers documentés, citation coupée quand elle est trop longue) prêt à coller
  dans un fil, avec le lien du dossier. Si le navigateur refuse le presse-papiers, le site
  le dit et affiche le texte ; il n'annonce jamais une copie qui n'a pas eu lieu.
- **« Copier l'argumentaire (réseaux sociaux) »** (`ShareDebateButton`) : copie en un clic
  un paragraphe prêt à poster — verdict en capitales, puis les institutions des deux pièces
  les plus institutionnelles (données d'administration, puis institutions, puis recherche
  évaluée par les pairs) et le lien canonique. Les archives primaires et les piliers
  d'opinion ne sont jamais présentés comme un « démenti » nommé : une archive signée du
  sujet de l'affirmation ne dément rien, et le paragraphe s'arrête alors au verdict. Le
  texte est assemblé par `src/lib/share-text.ts` (testé sur tous les dossiers du seed) ;
  refus du presse-papiers, absence d'API et copie en cours ont chacun leur état affiché, et
  la confirmation « Copié ! » retombe après deux secondes.
- **Carte de partage** (`opengraph-image.tsx`, `next/og`) : grille suisse, affirmation,
  tampon teinté par le verdict, bande des six piliers. Le bandeau d'empreinte annonce
  « SHA-256 sur les N pièces » seulement quand c'est vrai, sinon « empreintes à venir ».

## Archivage des preuves

`npm run archive:capture` est le seul chemin qui dépose des captures. Il s'exécute **hors
du conteneur web**, avec `DB_PG_URL` (écriture en base — aucune autre clé n'est requise) ;
`SUPABASE_SERVICE_ROLE_KEY` ou `SUPABASE_ADMIN_ACCESS_TOKEN` n'ouvrent que le miroir
Storage. Il est prudent par défaut : sans `--yes`, il calcule et affiche sans rien écrire.

1. Une **fiche d'archive canonique** est construite par pièce (JSON normalisé NFC, clés
   ordonnées, déterministe : mêmes entrées, mêmes octets) ; elle porte la citation, ses
   métadonnées, la date de capture, et rappelle elle-même ce qu'elle ne prouve pas.
2. Son empreinte SHA-256 est calculée sur les octets exacts (`node:crypto`).
3. Elle est déposée dans `public.dossier_source_archives`, la table content-addressed
   (la contrainte de la base revérifie l'empreinte du contenu) : une capture n'est jamais
   écrasée — deux contenus différents pour la même adresse arrêtent le script (code 2).
4. La pièce est mise à jour : `archive_storage_path` et `archive_binary_sha256`.
5. La fiche déposée est **relue et rehachée** : le dépôt n'est déclaré réussi que si
   l'empreinte relue est identique.
6. Un miroir du bucket public `immutable-archives` est tenté **si** un accès Storage
   privilégié existe (clé de service ou jeton administrateur) ; il est retéléchargé et
   rehaché. Sans cet accès, le script le dit — et n'affirme rien de plus.

Deux empreintes, deux rôles — à ne pas confondre :

| Colonne | Ce qu'elle atteste | Qui peut la vérifier |
|---|---|---|
| `archive_sha256` | la **citation publiée** n'a pas bougé | n'importe quel lecteur, depuis la page (WebCrypto) et via `/api/verify/<empreinte>` |
| `archive_binary_sha256` | la **fiche de capture** déposée en base (content-addressed) | quiconque retélécharge la fiche et la hache |

Une capture ne réécrit jamais `archive_sha256` : l'identité publique d'une preuve doit
rester celle que le lecteur recalcule lui-même à partir de ce qu'il lit.

```bash
npm run archive:capture              # contrôle : calcule les fiches, n'écrit rien
npm run archive:capture -- --fetch   # tente en plus un instantané des URL documentées
npm run archive:capture -- --yes     # dépose les fiches en base et met les pièces à jour
```

**État au 15/10/2026** : les 8 fiches du dossier publié sont déposées (`captured_at` du
15/10/2026 04:32 UTC, 15 792 octets au total), relues et rehachées ; `/api/archives/`
les sert octet pour octet. Toutes sont `METADATA_ONLY` : aucun instantané du contenu des
URL, qui restent à documenter. Le 15/10/2026 08:13 UTC, quatre fiches du dossier
`cout-immigration-budget-france` ont été déposées de la même façon, cette fois avec
`--fetch` : trois instantanés d'URL et une indisponibilité enregistrée telle quelle
(OCDE). Le pipeline de capture reconstruit le dossier depuis la base pour le repasser au
validateur : cette reconstruction omettait `protagonists` et `author_reference_url`
(colonnes ajoutées par la migration `0006`) et faisait échouer **toute** capture — réparé
dans `scripts/archive-capture.mts`. Puis, à 08:53 UTC, les 29 fiches des pièces des
dossiers AME (7), RSA (7), Pétain-Vichy (9) et insécurité attribuée à l'immigration (6)
ont été déposées avec `--fetch` : 25 `URL_SNAPSHOT` et 4 `URL_UNAVAILABLE` enregistrées
telles quelles (Légifrance répond 403, la préface de Stanford 429 aux clients non
navigateurs), toutes relues et rehachées (racines de capture `c8a4fb93…`, `47ef67c5…`,
`0962ede7…`, `8f4ffa63…`). Puis, à 12:40 UTC, l'application du seed (dix dossiers, dix
slug) a supprimé puis réinséré toutes les sources : les fiches d'archive ont été emportées
en cascade, comme documenté plus haut. Un `archive:capture --fetch --yes` (12:41 UTC) les
a toutes redéposées d'un coup : 68 pièces, 68 fiches déposées et relues — 50
`URL_SNAPSHOT`, 15 `URL_UNAVAILABLE`, 3 `METADATA_ONLY` — racine des captures
`e0a39749153a8ae3…`. Puis, à 13:01 UTC, l'application du seed (douze dossiers : les deux
derniers ajouts, « laxisme des juges » et ADA, entre-temps intégrés) a de nouveau supprimé
puis réinséré toutes les sources ; le `archive:capture --fetch --yes` de 13:02 UTC les a
toutes redéposées : 83 pièces, 83 fiches déposées et relues — 63 `URL_SNAPSHOT`, 17
`URL_UNAVAILABLE`, 3 `METADATA_ONLY` — racine des captures `b54243b2d204b932…`. Un
second passage de capture lancé en parallèle ayant créé un doublon par pièce, la table a
été **dédupliquée** (83 fiches exactes conservées, une par pièce publiée). Puis, à
13:30 UTC, l'intégration du dossier « aides sociales des sans-papiers » (douzième publié)
a entraîné une nouvelle réapplication complète du seed et une recapture : 90 pièces, 90
fiches déposées et relues — 66 `URL_SNAPSHOT`, 21 `URL_UNAVAILABLE`, 3 `METADATA_ONLY` —
racine des captures `37ffd2f0338a6a26…`. Puis, à 13:42 UTC, l'intégration du dossier
« minimum vieillesse (ASPA) versé aux étrangers » (treizième publié) a de nouveau
réappliqué le seed et une recapture : 102 pièces, 102 fiches déposées et relues — 74
`URL_SNAPSHOT`, 25 `URL_UNAVAILABLE`, 3 `METADATA_ONLY` — racine des captures
`3ecc80696b794f9f…` ; aucun doublon (une fiche exacte par pièce publiée, contrôle par
empreinte). Enfin, à 14:05 UTC, l'ajout de l'article L. 816-1 (le « verrou des dix ans »)
au dossier « minimum vieillesse » a entraîné une dernière réapplication du seed et une
recapture : 103 pièces, 103 fiches déposées et relues — 79 `URL_SNAPSHOT`, 21
`URL_UNAVAILABLE`, 3 `METADATA_ONLY` — racine des captures `6af5670a56cbff6d…` ; aucun
doublon. Puis, à 14:13 UTC, l'intégration du dossier « agression de Bordeaux »
(quatorzième publié) a entraîné une ultime réapplication du seed et une recapture :
109 pièces, 109 fiches déposées et relues — 84 `URL_SNAPSHOT`, 22 `URL_UNAVAILABLE`,
3 `METADATA_ONLY` — racine des captures `d6a51e8b4cf4e2c6…` ; fiches dédupliquées, une
par pièce. Puis, à 14:22 UTC, l'intégration du dossier « incendie de Saint-Omer »
(quinzième publié) a entraîné une ultime réapplication du seed et une recapture : 117
pièces, 117 fiches déposées et relues — 91 `URL_SNAPSHOT`, 23 `URL_UNAVAILABLE`,
3 `METADATA_ONLY` — racine des captures `34ac656206799454…` ; fiches dédupliquées, une
par pièce. Puis, à 14:36 UTC, l'intégration du dossier « RSA contre SMIC » (seizième
publié) a entraîné une ultime réapplication du seed et une recapture : 125 pièces, 125
fiches déposées et relues — 99 `URL_SNAPSHOT`, 23 `URL_UNAVAILABLE`, 3 `METADATA_ONLY` —
racine des captures `350fe197d8fad80b…` ; fiches dédupliquées, une par pièce. Puis, à
14:41 UTC, l'intégration du dossier « fraude sociale contre fraude fiscale » (dix-septième
publié) a entraîné une réapplication du seed et une recapture : 132 pièces, 132 fiches
déposées et relues — 104 `URL_SNAPSHOT`, 25 `URL_UNAVAILABLE`, 3 `METADATA_ONLY` — racine
des captures `d97280a587c104d6…`. Puis, à 15:00 UTC, l'intégration du dossier
« discriminations à l'embauche » (dix-huitième publié) a entraîné une dernière
réapplication et recapture : 139 pièces, 139 fiches déposées et relues — 111
`URL_SNAPSHOT`, 25 `URL_UNAVAILABLE`, 3 `METADATA_ONLY` — racine des captures
`76a9fe09a97bf82f…` ; fiches dédupliquées, une par pièce. Puis, à 15:06 UTC, l'intégration
du dossier « races biologiques humaines » (dix-neuvième publié) a entraîné une ultime
réapplication et recapture : 147 pièces, 147 fiches déposées et relues — 118
`URL_SNAPSHOT`, 26 `URL_UNAVAILABLE`, 3 `METADATA_ONLY` — racine des captures
`f2236f468699f983…` ; fiches dédupliquées, une par pièce. Puis, à 15:22 UTC, l'intégration
du dossier « homoparentalité » (vingtième publié) a entraîné une dernière réapplication
et recapture : 154 pièces, 154 fiches déposées et relues — 125 `URL_SNAPSHOT`, 26
`URL_UNAVAILABLE`, 3 `METADATA_ONLY` — racine des captures `a0d1901ac6ffab29…` ; fiches
dédupliquées, une par pièce. Puis, à 15:43 UTC, l'intégration du dossier « théorie du
genre » (vingt et unième publié) a entraîné une dernière réapplication et recapture : 161
pièces, 161 fiches déposées et relues — 132 `URL_SNAPSHOT`, 26 `URL_UNAVAILABLE`, 3
`METADATA_ONLY` — racine des captures `681a47e0212ac2cb…` ; fiches dédupliquées, une par
pièce. Puis, à 16:04 UTC, l'enrichissement du dossier « théorie du genre » (vingt et
unième publié, dix sources) a entraîné une dernière réapplication et recapture : 164
pièces, 164 fiches déposées et relues — 132 `URL_SNAPSHOT`, 29 `URL_UNAVAILABLE`, 3
`METADATA_ONLY` — racine des captures `ceb48ce6e1a0f092…` ; fiches dédupliquées, une par
pièce. Le 15/10/2026 (17:18 UTC), l'ajout des deux dossiers Religion a été **appliqué de
façon ciblée** — sans réapplication complète du seed, qui aurait emporté en cascade les
fiches d'archive des vingt-deux autres dossiers : les deux dossiers sont publiés et leurs
**14 fiches** déposées et relues, toutes `URL_SNAPSHOT` (six pour l'âge d'Aïcha, racine
des captures `4d88da3fee113838…` ; huit pour le droit comparé, racine
`417bf2285aef617f…`). Le registre compte désormais 24 dossiers (23 publiés) et
178 sources, avec leurs 178 fiches d'archive (146 `URL_SNAPSHOT`, 29 `URL_UNAVAILABLE`,
3 `METADATA_ONLY`). Puis, le 16/10/2026 (07:45 UTC), l'enrichissement du dossier « union du
prophète avec Aïcha » (neuf sources — trois prémisses et trois sources documentaires
ajoutées) a entraîné une réapplication complète du seed et la recapture des vingt-trois
dossiers publiés : **181 fiches** déposées et relues — 151 `URL_SNAPSHOT`, 27
`URL_UNAVAILABLE`, 3 `METADATA_ONLY` — racine des captures `f841ad6ce14a4a19…` ; fiches
dédupliquées, une par pièce. Puis, le 16/10/2026, l'ajout du dossier « cycle solaire »
(neuf sources) et du dossier « voiture électrique » (sept sources) a entraîné une
réapplication du seed et la recapture des dossiers publiés : **201 fiches** déposées et
relues — 166 `URL_SNAPSHOT`, 32 `URL_UNAVAILABLE`, 3 `METADATA_ONLY` — racine des captures
`acd1a32ec934419d…` ; fiches dédupliquées, une par pièce. Puis l'ajout du dossier
« OTAN-Russie » (sept sources, appliqué de façon ciblée) porte le registre à **208
fiches** — 172 `URL_SNAPSHOT`, 33 `URL_UNAVAILABLE`, 3 `METADATA_ONLY` — racine des
captures du dossier `78da0277da73a4cf…`. Le build déployé alors en ligne, antérieur à la migration `0007`, ne
connaissait ni la catégorie « Religion » ni les deux nouveaux verdicts : il refusait de
lire les deux lignes ajoutées (le registre affichait une erreur de lecture). Un
redéploiement (`gcloud builds submit --config cloudbuild.yaml`) a mis en ligne la
révision `preuve-publique-git-00006-pfj`, qui les sert normalement.

Puis, le 16/10/2026 (08:01 UTC), l'enrichissement du dossier « l'islam, seule religion
scripturairement homophobe et transphobe » (huit → douze sources : le rapport de Human
Rights Watch sur l'exportation coloniale de la « section 377 » — pièce de gauche —,
l'étude d'Elif Ceylan Özsoy sur la « dépénalisation » ottomane de 1858 (*Journal of
Homosexuality*, 2020), l'article de Farrah Jafari sur la fatwa de Khomeini (*JMEWS*,
2014) et « The Effeminates of Early Medina » d'Everett K. Rowson (*JAOS*, 1991) ; une
troisième prémisse — « La répression pénale actuelle découle uniquement du dogme » — et
le statut **biais de sélection** pour la première) a été **appliqué de façon ciblée** —
sans réapplication complète du seed : **12 fiches** déposées et relues — 11
`URL_SNAPSHOT`, 1 `URL_UNAVAILABLE` (l'éditeur Duke répond 403 aux robots ; le résumé
de la pièce est repris des métadonnées d'édition, OpenAlex et Crossref concordants) —
racine des captures `e197be7289786f61…` ; fiches dédupliquées, une par pièce, zéro
orpheline. Le dossier porte les **six piliers**. Le registre compte désormais
**208 sources et 208 fiches** ; l'énumération des statuts de brique accueille
`ANACHRONISME_CONCEPTUEL`, `DOUBLE_STANDARD`, `BIAIS_METHODOLOGIQUE` et
`BIAIS_DE_SELECTION`, et le lecteur de la base connaît ces valeurs — sans quoi les
prémisses concernées étaient écartées à la lecture. En ligne (révision
`preuve-publique-git-00007-p2n`) : les trois prémisses et les douze sources sont
servies, `ETag` = `X-Proof-Integrity-Root` = `99e7169f0cc0610748…` relevés en ligne
égaux à la racine recalculée par `npm run proofs`, une fiche rehachée octet pour
octet, `/api/verify` confirme la pièce Human Rights Watch.

Le chantier des **illustrations** a rouvert la chaîne une dernière fois : la migration
`0008` ajoute `illustration_url` et `illustration_credit` aux dossiers, le bucket public
`illustrations` reçoit les fichiers déposés depuis `/admin` (JPEG, PNG ou WebP, 4 Mo
maximum, nommés par l'empreinte de leurs octets) et chaque dossier publié s'ouvre
désormais sur une **image libre de droits** — Wikimedia Commons ou domaine public —
affichée en bandeau sous le titre, créditée en toutes lettres, et servie en vignette
sur les cartes de l'accueil et du sommaire. Le seed typé rejoue les vingt-six
illustrations à l'identique, un test vérifie pour chacune le fichier et le crédit, et
aucune image de presse protégée n'est employée. Le seed ayant été réappliqué, les
**185 fiches** d'archive des vingt-trois dossiers publiés ont été recapturées d'une
traite — 154 `URL_SNAPSHOT`, 28 `URL_UNAVAILABLE`, 3 `METADATA_ONLY` — racine des
captures `d1f72d02854525dc…` ; dédoublonnées, une par pièce, zéro orpheline.

Le
**miroir Storage** n'a pas eu lieu faute d'accès
privilégié — le bucket `immutable-archives` existe (public en lecture, RLS actif sans
politique d'écriture) mais reste sans objet.

## Déploiement : le moins cher possible

| Levier | Réglage | Effet sur la facture |
|---|---|---|
| Région | `europe-west1` (Belgique), **pas** Paris | Tier 1 : 0,000024 $/vCPU-s contre 0,0000336 $ en Tier 2 (`europe-west9`), soit 40 % de moins au-delà du quota gratuit. Le mapping de domaine `preuve-publique.fr` y existe déjà. |
| Instances | `--min-instances=0` | Zéro instance au repos : rien n'est facturé sans trafic. |
| CPU | `--cpu-throttling` (défaut explicité) | CPU alloué seulement pendant le traitement des requêtes. |
| Plafond | `--max-instances=2`, 1 vCPU, 512 Mi | Borne la dépense en cas de pic viral ; 512 Mi évite qu'une image de partage fasse tomber l'instance. |
| Registre d'images | politique de nettoyage (non étiquetées > 1 j, étiquetées > 14 j) | Reste dans le quota gratuit de 0,5 Go d'Artifact Registry. |
| CDN | **aucun** | Un Cloud CDN suppose un équilibreur HTTPS (~18 €/mois) : incompatible avec l'objectif. L'en-tête `s-maxage` profite aux caches intermédiaires, sans coût. |
| Secrets | 3 secrets, montés en variables d'exécution | Quota gratuit de Secret Manager : 6 versions actives, 10 000 accès/mois. |
| Garde-fou | budget d'alerte à 1 € sur le compte de facturation | Prévient avant toute dépense réelle. |

Quota gratuit Cloud Run, par compte de facturation et par mois : **180 000 vCPU-s,
360 000 GiB-s, 2 millions de requêtes**. Un dossier servi en ~250 ms consomme environ
0,25 vCPU-s : de l'ordre de 700 000 visites par mois restent dans le quota CPU.

```bash
# 1. Dépôt d'images (déjà créé ; commande conservée pour un nouveau projet)
gcloud artifacts repositories create preuvepublique \
  --repository-format=docker --location=europe-west1 --project preuve-publique

# 2. Construction + déploiement (utilise cloudbuild.yaml)
gcloud builds submit --config cloudbuild.yaml --project preuve-publique

# 3. Vérification après livraison
gcloud run services describe preuve-publique-git --region europe-west1 \
  --project preuve-publique --format='value(status.latestReadyRevisionName)'
curl -sI https://preuve-publique.fr/api/dossiers/hitler-et-les-nazis-etaient-de-gauche
```

Les variables d'exécution `SUPABASE_URL` et `SUPABASE_PUBLISHABLE_KEY` sont injectées
depuis les secrets existants (`NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) ; le conteneur ne reçoit aucune clé privilégiée.

## Limites assumées

- Captures : les 208 pièces publiées ont leur fiche déposée en base (une par pièce :
  172 `URL_SNAPSHOT`, 33 `URL_UNAVAILABLE` — Légifrance, OCDE, préface de Stanford,
  PNAS, NOAA et NPR répondant 403 ou 429 aux clients non navigateurs — et 3 `METADATA_ONLY`), relues et
  rehachées. Le miroir Storage du bucket `immutable-archives` n'a pas eu lieu, faute
  d'accès privilégié.
- Recherche : la branche vectorielle de la RPC ne ramène rien tant qu'aucun embedding
  n'est calculé — aucune similarité n'est simulée.
- Le guard est appliqué par le pipeline de publication, pas par un déclencheur en base.
- Pas d'ESLint ni de CI ; pas de tests PGlite du SQL ; le quota de recherche est par
  instance Cloud Run.
