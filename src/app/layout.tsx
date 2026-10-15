import type { Metadata } from "next";
import { JetBrains_Mono, Newsreader, Space_Grotesk } from "next/font/google";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://preuve-publique.fr"),
  title: {
    default: "Preuve publique — la preuve par le recoupement",
    template: "%s — Preuve publique",
  },
  description:
    "Chaque dossier croise archives primaires, consensus académique et sources de tout le spectre politique : la preuve ne dépend d'aucune autorité.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Preuve publique",
    url: "https://preuve-publique.fr",
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
      </head>
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        <SiteHeader />
        <main className="mx-auto w-full max-w-[1180px] px-4 pb-24 pt-8 sm:px-8 lg:w-[92%] lg:max-w-[1840px] xl:w-[90%]">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
