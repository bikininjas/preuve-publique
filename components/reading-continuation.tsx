import Link from 'next/link';

type ReadingLink = { href: string; title: string; note: string };

export function ReadingContinuation({ links }: { links: ReadingLink[] }) {
  return <section className="reading-continuation" aria-label="Poursuivre la lecture">
    <h2>Poursuivre la lecture</h2>
    <div className="reading-continuation-grid">{links.map((link) => <Link href={link.href} key={link.href}>
      <strong>{link.title}</strong><span>{link.note}</span><b aria-hidden="true">→</b>
    </Link>)}</div>
  </section>;
}
