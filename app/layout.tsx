import type { Metadata } from 'next';
import Link from 'next/link';
import './style.css';

export const metadata: Metadata = { title: 'Preuve Publique', description: 'Des programmes aux votes : suivez les sources.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body><header><Link className="brand" href="/">Preuve Publique<span className="dot">.</span></Link><span className="tag">France · Europe</span></header>{children}<footer>Des documents, des dates, des votes. À chacun de se faire son opinion.</footer></body></html>;
}
