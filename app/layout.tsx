import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/site-nav';
import './style.css';

export const metadata: Metadata = {
  title: { default: 'Preuve Publique — ce qu’ils disent, ce qu’ils votent', template: '%s · Preuve Publique' },
  description: 'Explorer les scrutins officiels et remonter aux sources des positions politiques en France et en Europe.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#contenu">Aller au contenu</a>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Preuve Publique, accueil"><span className="brand-symbol">P<span>·</span></span><span>PREUVE<br />PUBLIQUE</span></Link>
          <SiteNav />
          <Link className="header-action" href="/admin" aria-label="Espace de relecture">Espace de relecture <span aria-hidden>↗</span></Link>
        </header>
        <div id="contenu">{children}</div>
        <footer className="site-footer"><div><Link className="footer-brand" href="/">PREUVE PUBLIQUE<span>.</span></Link><p>Des sources pour comprendre les décisions publiques.<br />France et Union européenne, depuis 2017.</p></div><div className="footer-links"><Link href="/pieces">Toutes les pièces</Link><Link href="/methode">Méthode et limites</Link><Link href="/admin">Administration</Link></div></footer>
      </body>
    </html>
  );
}
