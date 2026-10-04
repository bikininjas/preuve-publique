'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ADMIN_LINKS = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/scrutins', label: 'Votes d’adoption définitive' },
  { href: '/admin/justice', label: 'Affaires et personnes' },
  { href: '/admin/runs', label: 'Imports et erreurs' },
  { href: '/', label: 'Voir le site ↗' },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="admin-nav" aria-label="Administration">
      {ADMIN_LINKS.map(({ href, label }) => {
        const active = pathname === href;
        return <Link href={href} key={href} aria-current={active ? 'page' : undefined} prefetch={false}>{label}</Link>;
      })}
    </nav>
  );
}
