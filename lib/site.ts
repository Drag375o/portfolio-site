/**
 * The canonical origin, resolved in one place.
 *
 * Production is hardcoded on purpose: Vercel's own URL variables track the
 * project name, which changed once already and silently left canonical and OG
 * tags pointing at a dead alias. NEXT_PUBLIC_SITE_URL still wins if set, so a
 * custom domain later is one variable and no code change.
 */
const PRODUCTION = 'https://atahar-piash.vercel.app';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : PRODUCTION)
).replace(/\/$/, '');