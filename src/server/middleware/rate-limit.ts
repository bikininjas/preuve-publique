/**
 * Limitation de débit en mémoire, par adresse IP.
 *
 * Sur Cloud Run, chaque instance a son propre compteur : c'est un garde-fou
 * contre un script qui boucle sur `/api/search`, pas une protection DDoS (pour
 * cela, un Cloud Armor devant un équilibreur — donc un coût mensuel). Le
 * comportement est celui d'une fenêtre fixe : simple, prévisible, testable.
 */

export type RateLimitOptions = {
  limit?: number;
  windowMs?: number;
  now?: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
};

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5_000;

function prune(current: number): void {
  if (buckets.size <= MAX_BUCKETS) {
    return;
  }
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= current) {
      buckets.delete(key);
    }
  }
}

export function checkRateLimit(key: string, options: RateLimitOptions = {}): RateLimitResult {
  const limit = options.limit ?? 30;
  const windowMs = options.windowMs ?? 60_000;
  const now = options.now ?? Date.now();
  prune(now);

  const existing = buckets.get(key);
  const bucket: Bucket =
    existing && existing.resetAt > now ? existing : { count: 0, resetAt: now + windowMs };

  bucket.count += 1;
  buckets.set(key, bucket);

  const remaining = Math.max(0, limit - bucket.count);
  return {
    allowed: bucket.count <= limit,
    limit,
    remaining,
    resetAt: bucket.resetAt,
    retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
  };
}

export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
  };
  if (!result.allowed) {
    headers["Retry-After"] = String(result.retryAfterSeconds);
  }
  return headers;
}

/**
 * IP du client telle qu'injectée par la plateforme : premier maillon de
 * `x-forwarded-for`, sinon `x-real-ip`. Aucune valeur n'est inventée : sans
 * en-tête, la clé est `unknown`, et le quota reste global pour ces requêtes.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded !== null && forwarded.length > 0) {
    const first = forwarded.split(",")[0];
    if (first !== undefined && first.trim().length > 0) {
      return first.trim();
    }
  }
  const real = headers.get("x-real-ip");
  if (real !== null && real.trim().length > 0) {
    return real.trim();
  }
  return "unknown";
}

/** Réservé aux tests : vide les compteurs. */
export function resetRateLimits(): void {
  buckets.clear();
}
