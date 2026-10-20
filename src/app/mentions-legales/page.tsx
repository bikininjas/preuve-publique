import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import ResetConsentButton from "@/components/ResetConsentButton";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Éditeur, direction de la publication, hébergement, données personnelles, cookies, propriété intellectuelle : les informations légales de preuve-publique.fr, en clair.",
  alternates: { canonical: "/mentions-legales" },
  openGraph: { url: "https://preuve-publique.fr/mentions-legales" },
};

/** Un bloc numéroté, façon registre administratif. */
function LegalSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3 border border-grid bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted">
          {index}
        </span>
        <h2 className="pp-h2 font-serif text-ink">{title}</h2>
      </div>
      <div className="max-w-[78ch] space-y-2 text-muted">{children}</div>
    </section>
  );
}

export default function MentionsLegalesPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="pp-meta text-muted">Informations légales · registre administratif</p>
        <h1 className="pp-h1 font-serif text-ink">Mentions légales</h1>
        <p className="pp-lead max-w-[64ch] text-muted">
          Qui édite ce site, qui l&apos;héberge, ce qu&apos;il fait — et ne fait pas — de vos
          données. En clair, et vérifiable ligne à ligne.
        </p>
        <p className="pp-meta text-muted">Dernière mise à jour : 16 octobre 2026</p>
      </header>

      <LegalSection index="01" title="Éditeur du site">
        <p>
          <span className="text-ink">Preuve publique</span> (preuve-publique.fr) est un site
          d&apos;information édité par une personne physique agissant à titre non
          professionnel. Conformément à l&apos;article 6-III de la loi n° 2004-575 du
          21 juin 2004 pour la confiance dans l&apos;économie numérique, l&apos;éditeur ne
          publie pas ses nom, prénoms et domicile : les coordonnées de l&apos;hébergeur
          figurent à la section « Hébergement », et un moyen de contact direct et personnel
          est fourni ci-dessous.
        </p>
        <p>
          Contact :{" "}
          <a className="text-ink underline" href="mailto:contact@preuve-publique.fr">
            contact@preuve-publique.fr
          </a>
          . Compte public :{" "}
          <a
            className="text-ink underline"
            href="https://x.com/vigiecitoyenn3"
            rel="me noreferrer"
            target="_blank"
          >
            @vigiecitoyenn3 (X)
          </a>
          .
        </p>
        <p>
          Le site ne comporte ni publicité, ni contenu sponsorisé, ni partenariat
          commercial. Rien n&apos;y est mis en avant contre paiement.
        </p>
      </LegalSection>

      <LegalSection index="02" title="Direction de la publication">
        <p>
          La direction de la publication est assurée par l&apos;éditeur du site, joignable à{" "}
          <a className="text-ink underline" href="mailto:contact@preuve-publique.fr">
            contact@preuve-publique.fr
          </a>
          . Les demandes relatives au contenu éditorial — signalement d&apos;erreur, droit de
          réponse — y sont traitées en priorité.
        </p>
      </LegalSection>

      <LegalSection index="03" title="Hébergement">
        <p>
          Le site est hébergé et servi par <span className="text-ink">Google Cloud</span>{" "}
          (service Cloud Run, région europe-west1, Belgique), via{" "}
          <span className="text-ink">Google Ireland Limited</span> — Gordon House, Barrow
          Street, Dublin 4, D04 E5W5, Irlande — société de droit irlandais immatriculée sous
          le numéro 368047, téléphone : +353 1 543 1000.
        </p>
        <p>
          La base de données du site est opérée par{" "}
          <span className="text-ink">Supabase</span> (supabase.com), sous-traitant technique,
          pour le compte de l&apos;éditeur.
        </p>
      </LegalSection>

      <LegalSection index="04" title="Données personnelles">
        <p>
          Le site ne demande aucune inscription, n&apos;emploie ni traceur publicitaire ni
          outil de mesure d&apos;audience, et ne revend aucune donnée. Les seuls traitements
          en jeu :
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            les journaux techniques de connexion (adresse IP, agent utilisateur,
            horodatage), exploités par l&apos;hébergeur et le site pour la sécurité du
            service et la limitation des abus ;
          </li>
          <li>
            pour l&apos;espace de rédaction — réservé à l&apos;éditeur —, l&apos;identité de
            connexion Google et une identité technique de session, traitées par le service
            d&apos;authentification (Supabase) ; les comptes sans droits d&apos;administration
            n&apos;accèdent à aucun contenu.
          </li>
        </ul>
        <p>
          Responsable du traitement : l&apos;éditeur,{" "}
          <a className="text-ink underline" href="mailto:contact@preuve-publique.fr">
            contact@preuve-publique.fr
          </a>
          . Base légale : l&apos;intérêt légitime (article 6.1.f du RGPD) pour la sécurité et
          le bon fonctionnement du service ; conservation limitée à ce qu&apos;exigent ces
          finalités. Vous disposez des droits d&apos;accès, de rectification,
          d&apos;effacement, de limitation et d&apos;opposition — exercez-les par un simple
          message. Une réclamation peut être introduite auprès de la CNIL (cnil.fr).
        </p>
      </LegalSection>

      <LegalSection index="05" title="Cookies et stockage local">
        <p>
          La navigation publique fonctionne <span className="text-ink">sans aucun cookie</span>{" "}
          tant que vous n&apos;avez pas accepté la mesure d&apos;audience : dans ce cas,
          aucun script Google n&apos;est chargé et aucune bannière ne s&apos;affiche. Si
          vous acceptez, Google Analytics 4 (identifiant public{" "}
          <span className="font-mono text-[13px]">G-51KCVCRGC4</span>) dépose des cookies de
          mesure — pages vues, type d&apos;appareil, provenance de la visite — pour savoir
          quels dossiers sont lus et améliorer le site. Ces données ne sont ni revendues ni
          utilisées à des fins publicitaires, et l&apos;adresse IP n&apos;est pas conservée
          par l&apos;éditeur. Le choix est mémorisé dans le stockage local de votre
          navigateur.
        </p>
        <p>
          Seules les sessions de l&apos;espace de rédaction (réservé à l&apos;éditeur)
          utilisent des cookies techniques, indépendants de ce choix.
        </p>
        <p>
          Le choix de thème (clair ou sombre) est conservé dans le stockage local de votre
          navigateur ; il n&apos;est jamais transmis au serveur.
        </p>
        <ResetConsentButton />
      </LegalSection>

      <LegalSection index="06" title="Propriété intellectuelle">
        <p>
          Les textes éditoriaux (dossiers, verdicts, synthèses), l&apos;identité visuelle et
          le code propres au site appartiennent à l&apos;éditeur, sauf mention contraire. Les
          citations des pièces reproduites restent la propriété de leurs auteurs et
          institutions : elles sont employées en courtes citations, aux fins
          d&apos;information et de vérification, avec attribution et lien vers la source. Les
          illustrations proviennent de Wikimedia Commons — domaine public ou licences libres
          — et sont créditées sous chaque dossier.
        </p>
        <p>
          La courte citation, accompagnée d&apos;un lien vers la page source, est bienvenue ;
          toute reproduction intégrale ou substantielle requiert l&apos;accord écrit de
          l&apos;éditeur.
        </p>
      </LegalSection>

      <LegalSection index="07" title="Exactitude et signalements">
        <p>
          Chaque pièce citée porte l&apos;empreinte SHA-256 de sa citation, destinée à
          l&apos;audit public — voir{" "}
          <Link className="text-ink underline" href="/methode">
            Méthode et limites
          </Link>
          . Si une citation, une date ou un chiffre vous paraît inexact, écrivez à{" "}
          <a className="text-ink underline" href="mailto:contact@preuve-publique.fr">
            contact@preuve-publique.fr
          </a>{" "}
          : toute correction justifiée est publiée, et le site n&apos;annonce jamais une
          donnée qu&apos;il n&apos;a pas. Les liens externes mènent à des sources tierces,
          dont le contenu ne saurait engager l&apos;éditeur.
        </p>
      </LegalSection>

      <LegalSection index="08" title="Accessibilité">
        <p>
          Le site vise le niveau AA des règles WCAG : contrastes mesurés, cibles tactiles de
          44 px, navigation complète au clavier, respect de <em>prefers-reduced-motion</em>.
          Toute difficulté d&apos;accès ou de lecture peut être signalée à l&apos;adresse de
          contact.
        </p>
      </LegalSection>

      <LegalSection index="09" title="Droit applicable">
        <p>
          Les présentes mentions légales sont soumises au droit français. Dernière mise à
          jour : 16 octobre 2026.
        </p>
      </LegalSection>
    </div>
  );
}
