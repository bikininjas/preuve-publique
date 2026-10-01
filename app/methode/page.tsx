import Link from 'next/link';

export const metadata = { title: 'Méthode' };

export default function MethodePage() {
  return (
    <main>
      <div className="eyebrow">Méthode et limites</div>
      <h1>Ce que le site montre, et ce qu’il ne dit pas.</h1>
      <p className="lead">
        Preuve Publique rapproche des documents officiels : programmes et professions de foi, déclarations sourcées,
        amendements, scrutins, textes adoptés et, lorsque c’est pertinent, indicateurs publics documentés. Le site
        présente les pièces et leur contexte ; il ne donne ni note de cohérence, ni gagnant d’une comparaison, ni
        verdict automatique.
      </p>

      <section className="panel">
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
          de vote ne sont pas stockées dans cette base. La position d’un élu n’est jamais déduite de son groupe.
        </p>
      </section>

      <section className="panel">
        <h2>Rapprochements</h2>
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
          Les rubriques affichées viennent des sources, jamais d’une classification du site. Le Sénat publie une rubrique
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
      </section>

      <section className="panel">
        <h2>Comparaisons, KPI et effets</h2>
        <p>Pour comparer une parole et un vote, nous devons citer les deux formulations, identifier la mesure exacte, distinguer vote sur un article et vote sur un texte entier, puis faire relire le rapprochement. Une divergence éventuelle est présentée avec son contexte et les explications publiées par l’acteur ; elle ne devient jamais un verdict automatique.</p>
        <p>Un taux de présence exige le nombre total de scrutins auxquels l’acteur pouvait participer et la période de son mandat. Une mesure de présence médiatique exige un corpus de médias défini, des dates et une méthode de comptage. Un indicateur d’inégalité exige unité, population, territoire, période, source et limites. Sans ces bases, aucun pourcentage n’est affiché.</p>
        <p>Pour analyser qui bénéficie ou pâtit d’une mesure, il faut une étude d’impact ou des données documentées, préciser le groupe de population et les hypothèses, puis distinguer l’effet estimé de l’effet observé. La proximité entre un vote et une statistique ne prouve pas une causalité.</p>
      </section>

      <section className="panel">
        <h2>Affaires judiciaires</h2>
        <p>Une fiche devra distinguer enquête, poursuite, jugement, appel et décision définitive, dater chaque étape et citer une source primaire ou un document judiciaire accessible. Elle distinguera toujours la personne concernée du parti, rappellera la présomption d’innocence et sera mise à jour en cas d’évolution. Aucune fiche de ce type n’est disponible dans le modèle actuel.</p>
      </section>

      <section className="panel">
        <h2>Publication et relecture</h2>
        <p>
          Les importeurs versent chaque pièce en <b>brouillon</b>. Une pièce devient <b>relue</b>, puis <b>publiée</b>,
          uniquement par une transition explicite signée par une personne identifiée — jamais par un import, jamais
          automatiquement. Un nouvel import n’écrase jamais une pièce relue ou publiée : si la source a changé, le
          passage le signale et un humain décide. Tant qu’un relecteur n’a pas validé une pièce, elle reste invisible
          ici.
        </p>
        <p>
          <b>État au 30 septembre 2026.</b> Le site publie les <b>lois promulguées du Sénat</b> (666), les <b>scrutins
          publics du Sénat</b> (2 157) et les <b>scrutins de l’Assemblée nationale portant sur l’ensemble d’un texte</b>
          (801). Ces 3 624 pièces ont été publiées après un <b>contrôle technique de conformité à la source</b> : le
          fichier officiel conservé (empreinte SHA-256 enregistrée) a été réimporté et comparé pièce par pièce, sans
          écart. Ce n’est <b>pas</b> une relecture humaine pièce par pièce, et la trace enregistrée sur chaque ligne le
          dit exactement — « contrôle technique de conformité (passage de développement) ». Le reste de la base
          (amendements, autres scrutins, textes de l’Assemblée et du Parlement européen) demeure en brouillon et
          invisible ; les acteurs ne sont lisibles que par les pièces publiées qui les portent. Aucun rapprochement
          interprétatif n’est publié, et aucun score ni verdict n’existe.
        </p>
      </section>

      <p>
        <Link className="button" href="/pieces">
          Voir les pièces publiées
        </Link>
      </p>
    </main>
  );
}
