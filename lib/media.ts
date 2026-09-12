import fs from 'node:fs';
import path from 'node:path';

/**
 * Reads public/<kind>/<slug>/ from disk at build time.
 *
 * This is why adding a screenshot needs no code change: drop a file in the
 * folder and it appears. Files are returned in filename order, so numeric
 * prefixes (01-, 02-) control the sequence and the first one becomes the card
 * image. A missing folder is normal, not an error.
 */
const IMAGE = /\.(png|jpe?g|webp|avif)$/i;

type Kind = 'projects' | 'research';

function images(kind: Kind, slug: string): string[] {
  const dir = path.join(process.cwd(), 'public', kind, slug);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE.test(f))
      .sort()
      .map((f) => `/${kind}/${slug}/${f}`);
  } catch {
    return [];
  }
}

export const projectImages = (slug: string) => images('projects', slug);
export const projectCover = (slug: string) => images('projects', slug)[0];
export const researchImages = (slug: string) => images('research', slug);
export const researchCover = (slug: string) => images('research', slug)[0];
