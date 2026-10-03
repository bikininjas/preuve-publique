import { publicSeoDocument } from '@/lib/seo-content';
import { shareImage } from '@/lib/share-image';

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = 3600;

/** Controlled published content only: no arbitrary title, remote image or private row. */
export async function GET(_request: Request, {params}:{params:Promise<{path:string[]}>}) {
  const {path} = await params;
  if (path.length > 3 || path.some(segment => segment.length > 100)) return new Response(null,{status:404});
  const pathname = path.length === 1 && path[0] === 'accueil' ? '/' : `/${path.join('/')}`;
  try {
    const document = await publicSeoDocument(pathname);
    if (!document) return new Response(null,{status:404,headers:{'Cache-Control':'no-store'}});
    return shareImage(document);
  } catch {
    return new Response('Aperçu temporairement indisponible',{status:503,headers:{'Cache-Control':'no-store'}});
  }
}
