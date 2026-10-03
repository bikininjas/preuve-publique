import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * robots.txt public. Les robots d'indexation (Googlebot compris) suivent le
 * groupe « * » : tout le site publié est explorable, sauf l'espace de
 * relecture, les routes d'authentification et l'API interne.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/auth', '/api'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
