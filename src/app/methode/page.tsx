import Link from "next/link";

import {
  PREMISE_DISTORTION_LEVELS,
  PREMISE_STAMP_LABELS,
  SPECTRUM_CODES,
  SPECTRUM_DESCRIPTIONS,
  SPECTRUM_LABELS,
  SPECTRUM_ORDER,
} from "@/lib/labels";
import type { PremiseStatus } from "@/lib/types";

export const metadata = {
  title: "Méthode et limites",
};

const GUARD_RULES = [
  {
    title: "Preuve primaire obligatoire",
    detail:
      "au moins une source d'archive primaire (texte, procès-verbal, discours d'époque) ou de données brutes officielles.",
  },
  {
    title: "Validation académique obligatoire",
    detail: "au moins une source issue de travaux évalués par les pairs.",
  },
  {
    title: "Pluralisme politique obligatoire",
    detail:
      "au moins deux spectres distincts parmi les sources de gauche, du centre et de droite libérale ou conservatrice.",
  },
  {
    title: "Intégrité obligatoire",
    detail:
      "chaque source porte une empreinte SHA-256 de sa citation, et une citation non vide.",
  },
];

const DISTORTION_ORDER: PremiseStatus[] = [
  "VRAI",
  "VRAI_DETOURNE",
  "CONFUSION_CONCEPTUELLE",
  "FAUX",
];

export default function MethodPage() {
  return (
    <div className="space-y-8">
      <section className="border border-grid bg-surface px-4 py-8 sm:px-6">
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted">
          Méthode · ce qui est forcé par le code
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          Méthode et limites
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
          Le défaut des vérifications classiques n&apos;est pas le manque de
          travail : c&apos;est le recours à l&apos;autorité. Un lecteur qui
          n&apos;aime pas le messager rejette le message. Preuve publique
          remplace cette autorité par une contrainte : un fait n&apos;est retenu
          que si des documents de bords opposés le montrent.
        </p>
      </section>

      <section className="border border-grid bg-surface">
        <div className="border-b border-grid px-4 py-3 sm:px-6">
          <h2 className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink">
            01 · Règle de triangulation, forcée par le code
          </h2>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">
            La neutralité n&apos;est pas une promesse éditoriale : le pipeline de
            publication refuse un dossier qui ne réunit pas les quatre conditions
            ci-dessous. Un dossier incomplet reste un brouillon, jamais une
            publication « en attendant mieux ».
          </p>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2">
            {GUARD_RULES.map((rule, index) => (
              <li key={rule.title} className="border border-gridsoft px-4 py-4">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-seal">
                  Règle {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 font-mono text-[13px] uppercase tracking-[0.1em] text-ink">
                  {rule.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{rule.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border border-grid bg-surface">
        <div className="border-b border-grid px-4 py-3 sm:px-6">
          <h2 className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink">
            02 · Les six piliers du recoupement
          </h2>
        </div>
        <dl className="grid sm:grid-cols-2 lg:grid-cols-3">
          {SPECTRUM_ORDER.map((spectrum) => (
            <div
              key={spectrum}
              className="border-b border-r border-gridsoft px-4 py-5 sm:px-6"
            >
              <dt className="flex items-center gap-3">
                <span className="font-mono text-[12px] tracking-[0.14em] text-seal">
                  {SPECTRUM_CODES[spectrum]}
                </span>
                <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-ink">
                  {SPECTRUM_LABELS[spectrum]}
                </span>
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">
                {SPECTRUM_DESCRIPTIONS[spectrum]}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border border-grid bg-surface">
        <div className="border-b border-grid px-4 py-3 sm:px-6">
          <h2 className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink">
            03 · Vérifier les preuves soi-même
          </h2>
        </div>
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
          <div className="border-gridsoft px-4 py-5 sm:px-6 lg:border-r">
            <p className="text-sm leading-relaxed text-muted">
              Chaque pièce affiche l&apos;empreinte SHA-256 de sa citation. Elle se
              recalcule à partir des seuls champs publiés : nom de la source,
              auteur ou institution, date, citation — mis en forme Unicode NFC,
              espaces superflus retirés, joints par des barres verticales, puis
              hachés en SHA-256.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Deux boutons sur chaque pièce : <span className="text-ink">Auditer
              la preuve</span> recalcule l&apos;empreinte <em>dans votre
              navigateur</em> (<span className="font-mono text-[13px]">crypto.subtle.digest</span>),
              sans aucun appel réseau, et la compare à celle du site ; la route{" "}
              <span className="font-mono text-[13px]">/api/verify/&lt;empreinte&gt;</span>{" "}
              renvoie les métadonnées exactes qui ont servi au calcul.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Un dossier expose aussi sa racine d&apos;intégrité — hachage de la
              liste triée des empreintes de ses pièces — dans l&apos;en-tête{" "}
              <span className="font-mono text-[13px]">X-Proof-Integrity-Root</span>{" "}
              de son API publique.
            </p>
          </div>
          <div className="bg-surface2 px-4 py-5 sm:px-6">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
              Chaîne canonique soumise au hachage
            </p>
            <p className="mt-3 break-all border border-gridsoft bg-surface px-3 py-2 font-mono text-[12px] leading-relaxed text-ink">
              source_name|author_or_institution|publication_date|exact_quote
            </p>
            <p className="mt-3 font-mono text-[12px] leading-relaxed tracking-[0.06em] text-muted">
              Une date absente compte pour un champ vide : jamais une date
              inventée.
            </p>
          </div>
        </div>
      </section>

      <section className="border border-grid bg-surface">
        <div className="border-b border-grid px-4 py-3 sm:px-6">
          <h2 className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink">
            04 · L&apos;échelle de distorsion
          </h2>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">
            La radiographie du sophisme découpe une affirmation en segments.
            Chaque segment porte un statut éditorial et un niveau de distorsion
            qui en découle mécaniquement — ce n&apos;est pas une mesure, et le
            site l&apos;écrit sous la frise.
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {DISTORTION_ORDER.map((status) => (
              <li key={status} className="border border-gridsoft px-4 py-4">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink">
                  {PREMISE_STAMP_LABELS[status]}
                </p>
                <p className="mt-2 font-mono text-2xl text-ink">
                  {PREMISE_DISTORTION_LEVELS[status]}%
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border border-grid bg-surface">
        <div className="border-b border-grid px-4 py-3 sm:px-6">
          <h2 className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink">
            05 · Le mode « preuve à l&apos;aveugle »
          </h2>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">
            Sur un dossier, un interrupteur recouvre les noms de médias, les
            auteurs et les étiquettes de pilier de bandes de caviardage — comme
            une pièce déclassifiée. Il ne reste que la citation, la date et
            l&apos;état de l&apos;archive. Le lecteur se forme un avis sur la
            preuve, puis retire le caviardage et découvre qui la porte.
          </p>
          <p className="mt-4 max-w-3xl font-mono text-[12px] leading-relaxed tracking-[0.06em] text-muted">
            Le masquage est visuel : les données restent dans la page. Il sert à
            juger la preuve avant de savoir qui la porte, pas à cacher quoi que ce
            soit.
          </p>
        </div>
      </section>

      <section className="border border-grid bg-surface">
        <div className="border-b border-grid px-4 py-3 sm:px-6">
          <h2 className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink">
            06 · Ce qui est vérifiable, ce qui est éditorial
          </h2>
        </div>
        <ul className="divide-y divide-gridsoft px-4 sm:px-6">
          <li className="py-4 text-sm leading-relaxed text-muted">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-true">
              Calculé et vérifiable
            </span>
            <p className="mt-2">
              couverture documentaire (piliers portant au moins une pièce),
              nombre de pièces, dates, URL, empreinte SHA-256 de chaque citation,
              racine d&apos;intégrité du dossier.
            </p>
          </li>
          <li className="py-4 text-sm leading-relaxed text-muted">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-warn">
              Éditorial et assumé
            </span>
            <p className="mt-2">
              verdict, résumé, score de consensus et statut de chaque segment.
              Ils sont écrits et relus par la rédaction ; le site les affiche
              comme tels au lieu de les présenter comme un résultat automatique.
            </p>
          </li>
          <li className="py-4 text-sm leading-relaxed text-muted">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-falsebd">
              Jamais affiché
            </span>
            <p className="mt-2">
              une capture qui n&apos;existe pas, un résumé présenté comme une
              citation, un taux sans période ni dénominateur, une empreinte
              inventée.
            </p>
          </li>
        </ul>
      </section>

      <section className="border border-grid bg-surface">
        <div className="border-b border-grid px-4 py-3 sm:px-6">
          <h2 className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink">
            07 · Limites assumées
          </h2>
        </div>
        <ul className="space-y-3 px-4 py-5 text-sm leading-relaxed text-muted sm:px-6">
          <li>
            L&apos;empreinte publiée porte sur la <em>citation</em>, pas encore sur
            une capture du document : la chaîne d&apos;archivage (dépôt immuable du
            PDF ou du scan) reste à construire, et aucune pièce n&apos;annonce de
            capture tant qu&apos;il n&apos;y en a pas.
          </li>
          <li>
            La recherche combine plein texte française et fusion de rangs avec la
            similarité vectorielle (
            <span className="font-mono text-[13px]">/api/search</span>) ; aucun
            modèle d&apos;embeddings n&apos;étant branché, la branche vectorielle ne
            ramène rien pour l&apos;instant — aucune similarité n&apos;est simulée.
          </li>
          <li>
            La règle de triangulation est appliquée par le pipeline de
            publication. Une écriture directe en base par une connexion
            privilégiée la contournerait : la lecture publique, elle, ne dépend
            que du RLS.
          </li>
          <li>
            La couverture est volontairement étroite : mieux vaut un dossier
            entièrement sourcé que cent affirmations à moitié documentées.
          </li>
        </ul>
      </section>

      <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
        Voir le{" "}
        <Link
          className="text-seal hover:underline"
          href="/dossiers/hitler-et-les-nazis-etaient-de-gauche"
        >
          premier dossier publié
        </Link>{" "}
        pour l&apos;application concrète de cette méthode.
      </p>
    </div>
  );
}
