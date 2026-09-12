import Image from 'next/image';
import type { Project } from '@/content/types';
import { projectCover } from '@/lib/media';
import Schematic from '@/components/schematics';

/**
 * Resolution order: a real screenshot if one exists on disk, otherwise the
 * project's schematic, otherwise a quiet note. A photograph of the thing
 * running always beats a diagram of it, the schematic is scaffolding until
 * the screenshot arrives.
 */
export default function ProjectVisual({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const cover = projectCover(project.slug);

  if (cover) {
    return (
      <div
        className={`relative aspect-4/3 w-full overflow-hidden border border-line bg-ink-void ${className ?? ''}`}
      >
        <Image
          src={cover}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`flex w-full justify-center ${className ?? ''}`}>
      <Schematic id={project.media.schematic} />
    </div>
  );
}
