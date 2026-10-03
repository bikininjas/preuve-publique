import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/site-nav';
import { SiteStructuredData } from '@/components/structured-data';
import { pageMetadata, SEO_PAGES } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import './style.css';
import './share.css';
import './theme.css';
import './presidential.css';
import './cookies.css';
import { ThemeToggle } from '@/components/theme-toggle';
import { THEME_INIT_SCRIPT } from '@/lib/theme';
import { CookieConsent } from '@/components/cookie-consent';

export const metadata: Metadata = {
  ...pageMetadata('/'),
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: { default: `${SEO_PAGES['/'].title} · ${SITE_NAME}`, template: `%s · ${SITE_NAME}` },
  referrer: 'strict-origin-when-cross-origin',
  icons: { icon: '/icon.svg', apple: '/apple-icon' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" data-theme="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} /></head>
      <body>
        <SiteStructuredData />
        <a className="skip-link" href="#contenu">Aller au contenu</a>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Preuve Publique, accueil"><span className="brand-symbol">P<span>·</span></span><span>PREUVE<br />PUBLIQUE</span></Link>
          <SiteNav />
          <div className="header-actions"><ThemeToggle /></div>
        </header>
        <div id="contenu">{children}</div>
        <footer className="site-footer"><div><Link className="footer-brand" href="/">PREUVE PUBLIQUE<span>.</span></Link><p>Des sources pour comprendre les décisions publiques.<br />France et Union européenne, depuis 2017.</p></div><div className="footer-links"><Link href="/pieces">Toutes les pièces</Link><Link href="/methode">Méthode et limites</Link><Link href="/confidentialite">Confidentialité et cookies</Link><CookieConsent /></div></footer>
      </body>
    </html>
  );
}
