import { shareImage } from '@/lib/share-image';
import { SEO_PAGES } from '@/lib/seo';

export const alt = 'Preuve Publique — les documents, les votes, le contexte';
export const size = {width:1200,height:630};
export const contentType = 'image/png';

export default function Image() { return shareImage(SEO_PAGES['/']); }
