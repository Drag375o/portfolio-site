import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { research } from '@/content/research';
import { SITE_URL } from '@/lib/site';

/**
 * Derived from content, never hand-listed. Add a project and it appears here
 * automatically, which is the only way a sitemap stays honest.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/research`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...projects
      .filter((p) => p.caseStudy)
      .map((p) => ({
        url: `${SITE_URL}/projects/${p.slug}`,
        lastModified: now,
        changeFrequency: 'yearly' as const,
        priority: 0.6,
      })),
    ...research.map((r) => ({
      url: `${SITE_URL}/research/${r.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
