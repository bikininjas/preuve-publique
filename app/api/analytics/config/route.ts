import { analyticsMeasurementId } from '@/lib/consent';

export const dynamic = 'force-dynamic';

/** Public identifier, read at runtime so Cloud Run builds need no GA variable. */
export function GET() {
  return Response.json({ measurementId: analyticsMeasurementId(process.env.GA_MEASUREMENT_ID) }, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
