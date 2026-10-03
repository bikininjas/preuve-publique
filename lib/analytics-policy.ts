import { analyticsMeasurementId, analyticsPage } from './consent.ts';

/** Only configured public screens may load or contact the audience provider. */
export function contentSecurityPolicy(pathname: string, measurementId: unknown): string {
  const audience = Boolean(analyticsMeasurementId(measurementId) && analyticsPage(pathname));
  const script = audience ? ' https://www.googletagmanager.com' : '';
  // Google's documented endpoints for Analytics without Ads features.
  const connections = audience ? ' https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com' : '';
  return `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co${connections}; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'${script}`;
}
