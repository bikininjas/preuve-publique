# Référencement et aperçus sociaux

Le domaine public est **https://preuve-publique.fr/**. Le nom du service Cloud Run reste technique. Cette passe rend les pages publiques identifiables par les moteurs et les services de partage, sans promettre une position dans les résultats ni présenter des brouillons comme des données publiées.

## Ce qui change

- Titres et descriptions propres aux douze pages d’entrée et aux fiches de documents, partis, groupes, rubriques et personnes testées. Les titres des scrutins gardent leur numéro ; les fiches de personnes ne confirment aucune candidature.
- Canonical et `og:url` absolus sur le domaine public, indépendants de l’hôte Cloud Run. Les paramètres de campagne sont retirés ; les pages de pagination conservent leur adresse. Les filtres institutionnels distinguent les corpus.
- Sous-thèmes lexicaux et catégories contrôlés indexables ; recherches et combinaisons de filtres en `noindex, follow`. L’espace de relecture est en `noindex, nofollow`, y compris la connexion. Des en-têtes `X-Robots-Tag` couvrent aussi l’authentification et les API.
- `robots.txt` annonce le sitemap. Ce dernier énumère les pièces publiées, rubriques, groupes, partis et personnes testées réellement disponibles, ainsi que les thèmes contrôlés. Aucun brouillon, espace privé ou aperçu d’image n’y entre.
- JSON-LD `WebSite`, `WebPage`, `BreadcrumbList` et image principale ; citation du document source pour les fiches. Le JSON échappe les caractères capables de terminer une balise script. Aucune note, statistique ou identité d’organisation n’est inventée.
- OpenGraph français et cartes X/Twitter `summary_large_image`, avec dimensions et texte alternatif. Chaque page ou fiche a une vignette PNG de 1 200 × 630 px, reprenant la marque, son sujet et son contexte. Favicon SVG et icône Apple PNG complètent les aperçus.
- Redirection permanente 308 des pages HTML servies sur `run.app` et sur `www` vers le domaine canonique, chemin et filtres conservés. Le certificat `www` doit fonctionner avant que cette redirection puisse être reçue par un navigateur.
- Barre de partage sur les pages publiques : Twitter/X, Facebook, Bluesky et Reddit, puis copie du lien. Les filtres et l’ancre de lecture sont conservés, les paramètres publicitaires retirés ; aucun partage par e-mail.
- « Envoyer à une IA » ouvre une fenêtre avec ChatGPT, Claude, Gemini, Le Chat ou Perplexity. Choisir une IA copie un prompt modifiable, puis un lien permet de l’ouvrir pour coller ce prompt. Le contexte contient l’adresse publique, les filtres visibles, les sources et un extrait borné du contenu affiché ; un passage sélectionné peut y être ajouté. Le site ne lance aucune requête d’inférence et n’envoie pas automatiquement le prompt au fournisseur.

## Coûts et règles de publication

`lib/seo-content.ts` partage les lectures entre métadonnées, données structurées et page avec `React.cache`. Les lecteurs restent publics et soumis aux politiques RLS ; les pièces demandent explicitement `published`.

Le sitemap ne lit que les identifiants des pièces, par lots de 1 000 au maximum et pagination par curseur. Une limite de réponse plus basse ne tronque pas la liste. Le résultat est mis en cache une heure ; un échec de lecture n’est pas transformé en faux corpus vide. Au-delà de 49 000 pièces, il faut découper le sitemap plutôt que dépasser silencieusement la limite du format. Aucun `lastmod` n’est inventé à partir de la date historique d’un vote.

Les vignettes utilisent `next/og` et des styles locaux, sans image, police ou service payant externe. Elles sont générées à la demande et mises en cache une heure. Une fiche absente ou non publiée répond 404 ; une indisponibilité de la base répond 503 sans cache. Une vignette déjà publique peut rester en cache jusqu’à une heure après un retrait de publication ; les réseaux sociaux ont également leurs propres caches.

## Vérifications

Baseline contrôlée le 2 octobre 2026 : le domaine principal fonctionne, mais `robots.txt` et `sitemap.xml` répondent 404 en production avant cette livraison. Le dernier commit déployé avant cette passe est `eefbd34`.

La validation locale utilise un build de production et les lectures publiques de la base réelle : douze pages d’entrée, cinq familles de fiches et quatre variantes de pagination, thème, recherche ou suivi publicitaire. Les robots de partage reçoivent canonical, description, OpenGraph et Twitter dans le `<head>`. Les images sont vérifiées en PNG avec leurs dimensions et inspectées visuellement.

Premier contrôle : **3 869 adresses** dans le sitemap, dont **3 674 fiches publiées**, sans doublon. Ce volume est un constat daté, pas une constante à afficher dans l’interface.

Commandes de validation : `npm run build`, `npm run lint` et `node --experimental-strip-types --test tests/*.test.mjs` : **16 tests réussis**, dont quatre tests SEO et quatre tests de partage. Ils couvrent canonical/pagination, filtres indexables, aperçu d’une fiche, échappement du JSON-LD, encodage des réseaux, adresse publique et prompt contextuel borné ; les tests documentaires existants sont conservés.

Contrôle de la barre dans le navigateur : quatre réseaux uniquement, lien copié, fenêtre native et choix de ChatGPT avec confirmation de copie. Le prompt conserve `institution=senat&subject=logement` sur la page testée. Les liens externes sont vérifiés sans publier de message. À 390 px, barre et sélecteur ne débordent pas horizontalement. La copie manuelle du lien ou du prompt reste disponible si le navigateur refuse le presse-papiers ; une attente du navigateur est bornée pour ne pas bloquer le sélecteur.

## Suivi après livraison

Contrôler sur le domaine public les métadonnées d’une fiche, `robots.txt`, `sitemap.xml` et une vignette ; recouper le commit de la révision Cloud Run et sa réponse HTTP. Soumettre ensuite `https://preuve-publique.fr/sitemap.xml` dans la propriété vérifiée de Google Search Console et Bing Webmaster Tools. Aucun accès à ces comptes ni aucune soumission n’est affirmé par le code.

Les caches Facebook/LinkedIn peuvent nécessiter un nouveau passage de leurs inspecteurs de partage sur une URL déjà partagée. La prise en compte par un moteur et le classement ne sont pas immédiats.

Références : [métadonnées Next.js](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [sitemaps Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [canonical Google](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [fils d’Ariane](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).
