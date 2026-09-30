import type { Metadata } from 'next';
import Link from 'next/link';
import './style.css';

export const metadata: Metadata = {
  title: { default: 'Preuve Publique', template: '%s · Preuve Publique' },
  description: 'Des programmes aux votes : suivez les sources.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            Preuve Publique<span className="dot">.</span>
          </Link>
          <nav className="site-nav">
            <Link href="/pieces">Pièces</Link>
            <Link href="/methode">Méthode</Link>
          </nav>
          <span className="tag">France · Europe</span>
        </header>
        {children}
        <footer className="site-footer">
          <span>Des documents, des dates, des votes. À chacun de se faire son opinion.</span>
          <Link className="quiet" href="/admin">
            Espace de relecture
          </Link>
        </footer>
      </body>
    </html>
  );
}
