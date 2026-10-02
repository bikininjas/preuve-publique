import Link from 'next/link';

export const metadata = { title: 'Méthode' };

export default function MethodePage() {
  return (
    <main className="method-page">
      <div className="eyebrow">Méthode et limites</div>
      <h1>Ce que le site montre, et ce qu’il ne dit pas.</h1>
      <p className="lead">
        Preuve Publique rapproche des documents officiels : programmes et professions de foi, déclarations sourcées,
        amendements, scrutins, textes adoptés et, lorsque c’est pertinent, indicateurs publics documentés. Le site
        présente les pièces et leur contexte ; il ne donne ni note de cohérence, ni gagnant d’une comparaison, ni
        verdict automatique.
      </p>

      <nav className="reading-nav" aria-label="Parcourir la méthode"><a href="#sources">Les sources ↓</a><a href="#rapprochements">Les rapprochements ↓</a><a href="#comparaisons">Parole et vote ↓</a><a href="#publication">La publication ↓</a></nav>

      <section className="panel" id="sources">
        <h2>Sources</h2>
        <ul>
          <li>
            <b>Assemblée nationale</b> — scrutins publics et dossiers législatifs (
            <a href="https://data.assemblee-nationale.fr/" target="_blank" rel="noopener noreferrer">
              data.assemblee-nationale.fr ↗
            </a>
            ), législatures 15 à 17.
          </li>
          <li>
            <b>Sénat</b> — scrutins publics et lois promulguées (
            <a href="https://data.senat.fr/" target="_blank" rel="noopener noreferrer">
              data.senat.fr ↗
            </a>
            ).
          </li>
          <li>
            <b>Parlement européen</b> — décisions et textes adoptés (
            <a href="https://data.europarl.europa.eu/" target="_blank" rel="noopener noreferrer">
              data.europarl.europa.eu ↗
            </a>
            ).
          </li>
          <li>
            Les références du Journal officiel proviennent des dossiers législatifs publiés par l’Assemblée nationale :
            l’API Légifrance (PISTE) est réservée en pratique au secteur public et n’est pas utilisée, et le texte du
            Journal officiel n’est pas recopié.
          </li>
          <li>
            Les déclarations médiatiques ne sont citées que si l’enregistrement ou la transcription exacte est
            accessible ; la source précise et ses circonstances sont alors indiquées.
          </li>
        </ul>
      </section>

      <section className="panel">
        <h2>Ce que chaque pièce porte</h2>
        <p>
          Chaque élément renvoie à son document original : institution ou éditeur, date, adresse, repère précis (page,
          article, numéro de scrutin, horodatage) et date de récupération. Les données structurées copiées de la source
          (comptes de voix, références de dossier) sont visibles sur la fiche de la pièce. La formulation d’origine est
          distinguée d’un résumé : un extrait affiché est une citation, avec sa provenance.
        </p>
        <p>
          Les scrutins non nominatifs ne révèlent pas la position individuelle des élus, et les positions individuelles
          de vote ne sont pas stockées dans cette base : seuls des décomptes agrégés par parti sont conservés pour les
          scrutins de l’Assemblée dont la liste nominative rejoint le total officiel. La position d’un élu n’est jamais
          déduite de son groupe. Sur chaque fiche, la part pour, contre, abstention et non-vote d’un parti est calculée
          parmi les positions nominatives rattachées à ce parti dans ce seul scrutin ; les affiliations absentes ou
          ambiguës restent hors du calcul. Pour le Sénat, le décompte par groupe vient de l’analyse officielle
          propre à chaque scrutin : pour, contre, abstention et non-participation sont recoupés avec le total publié.
          La part de chaque position est calculée sur l’effectif de ce groupe à cette date. Un groupe parlementaire
          n’est pas assimilé à un parti, et ces chiffres ne donnent pas le parti de chaque sénateur. Le Parlement
          européen n’a pas encore de décompte équivalent ici.
        </p>
      </section>

      <section className="panel">
        <h2 id="rapprochements">Rapprochements</h2>
        <p>
          Un rapprochement entre deux pièces a toujours une justification, une méthode, une confiance et un statut de
          relecture. Le lien <code>related</code> signifie seulement qu’il existe un lien documentaire : ce n’est ni
          « soutient », ni « contredit », ni « promesse trahie ». Le rapprochement par défaut est déterministe : deux
          pièces qui portent la même référence documentaire explicite (dossier, procédure, document). Un vote contre un
          texte entier ne prouve pas une opposition à chacune de ses mesures ; un scrutin ne démontre jamais à lui seul
          un effet observé.
        </p>
      </section>

      <section className="panel">
        <h2>Rubriques</h2>
        <p>
          Les rubriques de la page « Thèmes » viennent des sources, jamais d’une classification du site. Le Sénat publie une rubrique
          pour chaque loi promulguée de son jeu de données : elle est reprise telle quelle, et un scrutin rattaché au
          dossier de cette loi en hérite. La fiche d’un scrutin indique l’origine de ses rubriques et la référence de
          dossier qui les lui a transmises.
        </p>
        <p>
          Une rubrique range des documents ; elle ne dit rien de la position politique d’un acteur, et deux pièces d’une
          même rubrique ne sont pas comparables pour autant — un amendement, un article et un texte entier ne sont pas
          interchangeables. L’Assemblée nationale et le Parlement européen ne publient pas de rubrique équivalente dans
          les jeux de données utilisés ici : leurs pièces n’apparaissent donc pas encore dans les rubriques.
        </p>
        <p>
          Sur la page « Scrutins », les repères par sujet sont différents : ils cherchent des mots précis dans les
          intitulés officiels, y compris ceux de l’Assemblée nationale. Ils facilitent l’exploration sans prétendre
          classer exhaustivement les votes. Un texte peut apparaître sous plusieurs sujets ; un texte pertinent peut
          aussi manquer si son intitulé n’emploie aucun des mots recherchés. Le titre court d’une fiche reprend le sujet
          du texte quand celui-ci est identifiable ; le numéro, le périmètre du vote et l’intitulé officiel restent
          accessibles sur la fiche. Le sujet d’un texte ne décrit jamais à lui seul le contenu d’un amendement.
        </p>
      </section>

      <section className="panel">
        <h2 id="comparaisons">Comparaisons, KPI et effets</h2>
        <p>Pour comparer une parole et un vote, nous devons citer les deux formulations, identifier la mesure exacte, distinguer vote sur un article et vote sur un texte entier, puis faire relire le rapprochement. Une divergence éventuelle est présentée avec son contexte et les explications publiées par l’acteur ; elle ne devient jamais un verdict automatique.</p>
        <p>Pour un programme, nous indiquons son édition, sa date de publication et l’élection concernée. Nous retenons la version officielle la plus récente applicable à la période examinée. Un programme d’une élection précédente ne sera pas présenté comme le programme de 2027 : si celui-ci manque, nous le dirons. Une proposition publiée après un vote peut éclairer une position ultérieure, mais ne prouve pas qu’elle était défendue au moment du scrutin.</p>
        <p>Un taux de présence exige le nombre total de scrutins auxquels l’acteur pouvait participer et la période de son mandat. Une mesure de présence médiatique exige un corpus de médias défini, des dates et une méthode de comptage. Un indicateur d’inégalité exige unité, population, territoire, période, source et limites. Sans ces bases, aucun pourcentage n’est affiché.</p>
        <p>Pour analyser qui bénéficie ou pâtit d’une mesure, il faut une étude d’impact ou des données documentées, préciser le groupe de population et les hypothèses, puis distinguer l’effet estimé de l’effet observé. La proximité entre un vote et une statistique ne prouve pas une causalité.</p>
      </section>

      <section className="panel" id="profils-vote">
        <h2>Profils de vote : thèmes, sous-thèmes et sens des mesures</h2>
        <p>Les <Link href="/partis">cartes des partis</Link> et leurs profils présentent trois grandes catégories et dix-neuf sous-thèmes. Le classement cherche des fragments précis dans l’intitulé officiel du scrutin : il s’agit d’un repère documentaire, distinct des rubriques publiées par les institutions. Une fiche peut appartenir à plusieurs sous-thèmes ; leurs totaux ne s’additionnent pas. Un sujet sans bulletin attribuable reste indiqué sans pourcentage.</p>
        <p>Chaque barre représente les positions nominatives rattachables à un parti par une affiliation datée : pour, contre, abstention et non-votant enregistré. Le pourcentage « pour » est le nombre de bulletins pour divisé par la somme de ces quatre positions, au sein du parti et du corpus sélectionné. Ce n’est ni la proportion de projets soutenus, ni la part du parti parmi tous les députés, ni un taux de présence. Les positions sans affiliation unique et les décomptes non conformes sont exclus. Les périodes décrivent les scrutins trouvés pour tous les partis, pas l’âge du parti ; les anciennes affiliations restent distinctes.</p>
        <p>L’accueil sélectionne au maximum six partis par volume de positions dans le dernier scrutin publié de l’Assemblée. Leurs barres portent sur l’ensemble du corpus daté, pas sur ce seul scrutin. Le récapitulatif affiche tous les partis avec des bulletins attribuables, archives comprises, triés par volume. Chaque sous-thème permet d’ouvrir les votes exacts du parti, les plus récents en premier. Au Sénat, la même exploration présente les groupes parlementaires et leurs décomptes officiels ; aucun parti n’en est déduit.</p>
        <p>Une barre sur « Entreprises et règles du marché » n’est pas un taux de soutien au libéralisme. Un vote sur l’immigration peut faciliter un accueil ou le restreindre ; un amendement peut supprimer un renforcement des pouvoirs de police. Pour montrer le sens d’une mesure, il faut qualifier le dispositif exact, son périmètre et ses effets avec la source, puis faire valider cette analyse. Le site n’attribue donc pas automatiquement une orientation « sociale », « libérale » ou « sécuritaire » à un bulletin. Aucun rapprochement validé avec un programme officiel récent n’est actuellement publié dans ces profils.</p>
      </section>

      <section className="panel">
        <h2>Affaires judiciaires</h2>
        <p>Une fiche devra distinguer enquête, poursuite, jugement, appel et décision définitive, dater chaque étape et citer une source primaire ou un document judiciaire accessible. Elle distinguera toujours la personne concernée du parti, rappellera la présomption d’innocence et sera mise à jour en cas d’évolution. Aucune fiche de ce type n’est disponible dans le modèle actuel.</p>
      </section>

      <section className="panel">
        <h2 id="publication">Publication et relecture</h2>
        <p>
          Les importeurs versent chaque pièce en <b>brouillon</b>. Les scrutins officiels de l’Assemblée nationale
          peuvent être publiés après un contrôle automatique de l’archive, de son empreinte et des données en base.
          L’indice 0,990 mesure une conformité documentaire déterministe, pas la probabilité qu’une interprétation
          politique soit vraie. Les autres pièces et tous les rapprochements interprétatifs demandent une validation
          humaine. Un nouvel import n’écrase jamais une pièce relue ou publiée : si la source a changé, le passage le
          signale et un humain décide.
        </p>
        <p>
          <b>État vérifié au 1er octobre 2026.</b> Le site publie les <b>lois promulguées du Sénat</b> (666), les <b>scrutins
          publics du Sénat</b> (2 157) et les <b>scrutins de l’Assemblée nationale portant sur l’ensemble d’un texte</b>
          (801). Ces 3 624 pièces ont été publiées après un <b>contrôle technique de conformité à la source</b> : le
          fichier officiel conservé (empreinte SHA-256 enregistrée) a été réimporté et comparé pièce par pièce, sans
          écart. Ce n’est <b>pas</b> une relecture humaine pièce par pièce, et la trace enregistrée sur chaque ligne le
          dit exactement — « contrôle technique de conformité (passage de développement) ». Cinquante autres scrutins
          de l’Assemblée ont ensuite été publiés par le contrôle automatique (851 scrutins AN et 3 674 pièces publiées
          au total). Le reste de la base demeure en brouillon et invisible ; les acteurs ne sont lisibles que par les
          pièces publiées qui les portent. Aucun rapprochement interprétatif n’est publié et aucun verdict n’existe.
        </p>
      </section>

      <section className="panel" id="candidats-positions"><h2>Des sondages aux positions documentées</h2><p>Une personne testée dans un sondage n’est pas nécessairement candidate déclarée. La correspondance avec un acteur institutionnel demande un identifiant et un nom recoupés avec la source officielle ; une ressemblance ou une étiquette de parti fournie par un sondage ne suffit pas.</p><p>Le référentiel AN distingue le groupe parlementaire du rattachement pour le financement public. Ce dernier ne prouve ni une adhésion ni un soutien électoral. Chaque lien reste daté ; une date de fin non renseignée n’atteste pas une appartenance actuelle. <a href="https://www2.assemblee-nationale.fr/deputes/liste/partis-politiques?annee=2025" target="_blank" rel="noopener noreferrer">Lire la définition de ce rattachement à l’Assemblée ↗</a>.</p><p>Les bulletins personnels sont recopiés des décomptes nominatifs des archives vérifiées. Un bulletin manquant est « non disponible », jamais une abstention ou une absence déduite. La comparaison présente les mêmes scrutins pour chaque personne ; elle ne couvre que le corpus publié et contrôlé. Les votes des partis restent accessibles séparément, avec leurs propres rattachements datés.</p><p>Les fiches de mesures et leurs pièces reliées demandent une revue humaine distincte. Un programme conserve son édition, son élection et sa date de publication ; une position ultérieure à un scrutin n’est pas une promesse réputée en vigueur lors du vote. Un lien documentaire ne signifie ni soutien, ni contradiction. Aucun score idéologique ou de cohérence n’est produit.</p><Link href="/presidentielle-2027/comparer">Comparer les pièces par sous-thème →</Link></section>
      <p>
        <Link className="button" href="/pieces">
          Voir les pièces publiées
        </Link>
      </p>
    </main>
  );
}
