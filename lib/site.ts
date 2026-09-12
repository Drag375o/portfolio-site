/**
 * The canonical origin, resolved in one place.
 *
 * Order: an explicit NEXT_PUBLIC_SITE_URL wins (set this if you buy a domain),
 * then Vercel's own production URL at build time, then localhost for dev. No
 * component or route ever hardcodes a domain, so moving from a .vercel.app
 * subdomain to a real one is a single environment variable and a redeploy.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');
