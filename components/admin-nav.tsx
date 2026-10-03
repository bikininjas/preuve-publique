'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ADMIN_LINKS = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/review', label: '01 · Pièces' },
  { href: '/admin/links', label: '02 · Rapprochements' },
  { href: '/admin/runs', label: '03 · Imports' },
  { href: '/admin/publication', label: '04 · Publication' },
  { href: '/admin/measures', label: '05 · Mesures et positions' },
  { href: '/admin/inegalites', label: '06 · Inégalités' },
  { href: '/', label: 'Voir le site ↗' },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="admin-nav" aria-label="Administration">
      {ADMIN_LINKS.map(({ href, label }) => {
        const active = pathname === href || (href === '/admin/review' && pathname.startsWith('/admin/pieces/'));
        return <Link href={href} key={href} aria-current={active ? 'page' : undefined} prefetch={false}>{label}</Link>;
      })}
    </nav>
  );
}
