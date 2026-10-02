'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  ['/scrutins', 'Scrutins'], ['/categories', 'Thèmes'], ['/partis', 'Partis'], ['/groupes', 'Groupes'],
  ['/observatoire', 'Observatoire'], ['/methode', 'Méthode'],
] as const;

export function SiteNav() {
  const pathname = usePathname();
  return <nav className="site-nav" aria-label="Navigation principale">
    {links.map(([href, label]) => <Link key={href} href={href}
      aria-current={pathname === href || pathname.startsWith(`${href}/`) ? 'page' : undefined}>
      {label}
    </Link>)}
  </nav>;
}
