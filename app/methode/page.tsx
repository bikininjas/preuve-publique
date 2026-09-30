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
        <h2>Publication et relecture</h2>
        <p>
          Les importeurs versent chaque pièce en <b>brouillon</b>. Une pièce devient <b>relue</b>, puis <b>publiée</b>,
          uniquement par une transition explicite signée par une personne identifiée — jamais par un import, jamais
          automatiquement. Un nouvel import n’écrase jamais une pièce relue ou publiée : si la source a changé, le
          passage le signale et un humain décide. Tant qu’un relecteur n’a pas validé une pièce, elle reste invisible
          ici.
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
