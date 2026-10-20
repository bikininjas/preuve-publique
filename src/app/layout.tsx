import type { Metadata } from "next";
import { JetBrains_Mono, Newsreader, Space_Grotesk } from "next/font/google";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import { ANALYTICS_CONSENT_KEY, GA_MEASUREMENT_ID } from "@/lib/analytics";

import "./globals.css";

const serif = Newsreader({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-newsreader",
  style: ["normal", "italic"],
});

const sans = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const SITE_DESCRIPTION =
  "Chaque dossier croise archives primaires, consensus académique et sources de tout le spectre politique : la preuve ne dépend d'aucune autorité.";

export const metadata: Metadata = {
  metadataBase: new URL("https://preuve-publique.fr"),
  title: {
    default: "Preuve publique — la preuve par le recoupement",
    template: "%s — Preuve publique",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Preuve publique",
    url: "https://preuve-publique.fr",
  },
  /* Les cartes sont générées par `opengraph-image.tsx` (racine et dossiers) :
     Twitter pointe la même route, en grand format. */
  twitter: {
    card: "summary_large_image",
    site: "@vigiecitoyenn3",
    title: "Preuve publique — la preuve par le recoupement",
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

/**
 * Le thème est appliqué avant le premier rendu pour éviter tout flash : le
 * lecteur choisit une fois, le choix vit dans son navigateur.
 */
const THEME_SCRIPT = `
try {
  var stored = localStorage.getItem("preuve-publique-theme");
  var theme = stored === "dark" || stored === "light" ? stored : "light";
  document.documentElement.setAttribute("data-theme", theme);
} catch (error) {
  document.documentElement.setAttribute("data-theme", "light");
}
`;

/**
 * Balise Google unique du site, portée par le layout racine : une seule par
 * page, dans le <head>, comme le demande Google. Le consentement de mesure est
 * refusé par défaut (Consent Mode) ; un choix déjà accordé est relu dans le
 * stockage local avant le `config`, et `AnalyticsConsent` met le consentement à
 * jour quand la personne accepte. Le tag est ainsi détectable sans déposer de
 * cookie d'analyse avant l'accord.
 */
const GA_TAG_SCRIPT = `
var ppAnalyticsConsent = 'denied';
try {
  if (localStorage.getItem('${ANALYTICS_CONSENT_KEY}') === 'granted') {
    ppAnalyticsConsent = 'granted';
  }
} catch (error) {}
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: ppAnalyticsConsent
});
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      data-theme="light"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {/* Balise Google du site : une seule par page, dans le <head>. Le
            consentement est refusé par défaut ; voir GA_TAG_SCRIPT. */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script dangerouslySetInnerHTML={{ __html: GA_TAG_SCRIPT }} />
        {/* Découverte du flux : posée ici plutôt qu'en métadonnées de page,
            pour survivre aux fusions de `alternates` des pages enfants. */}
        <link
          href="/feed.xml"
          rel="alternate"
          title="Preuve publique — dossiers publiés (RSS)"
          type="application/rss+xml"
        />
      </head>
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        {/* Règle graduée de la marge gauche : un repère de lecture, pas une donnée. */}
        <div className="pp-ruler" aria-hidden="true" />
        {/* Grain de papier : une surimpression fixe, presque invisible — la
            matière de la page, jamais une donnée. */}
        <div className="pp-grain" aria-hidden="true" />
        <SiteHeader />
        <main className="mx-auto w-full max-w-[1180px] px-4 pb-24 pt-8 sm:px-8 lg:w-[92%] lg:max-w-[1840px] xl:w-[90%]">
          {children}
        </main>
        <SiteFooter />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
