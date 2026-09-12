import type { Metadata } from 'next';
import Link from 'next/link';
import { featured, supporting, archive, projects } from '@/content/projects';
import ProjectCardFeatured from '@/components/project/ProjectCardFeatured';
import ProjectRow from '@/components/project/ProjectRow';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Machine learning, NLP, computer vision and search projects, each with its evaluation, its limitations and its source.',
};

function Group({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <div className="mb-6 flex items-baseline gap-4 border-b border-line pb-3">
        <h2 className="text-[15px] font-medium text-fg">{label}</h2>
        {note ? <span className="meta">{note}</span> : null}
      </div>
      {children}
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <div className="wrap pb-24 pt-33">
      <Reveal>
        <p className="meta mb-4">
          <Link href="/" className="hover:text-fg">
            ← Back
          </Link>
        </p>
        <h1 className="display-serif">Projects</h1>
        <p className="mt-3 max-w-[58ch] text-[16px] leading-[1.62] text-fg-mid">
          {projects.length} projects. Each one reports the figure that makes it look worse
          alongside the one that makes it look good, and every number is reproducible from
          the linked repository.
        </p>
      </Reveal>

      <Group label="Featured" note={`${featured.length} projects`}>
        <div className="grid gap-5">
          {featured.map((project, i) => (
            <Reveal key={project.slug}>
              <ProjectCardFeatured project={project} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </Group>

      {supporting.length > 0 ? (
        <Group label="Supporting work" note="search and game AI">
          <Reveal>
            <div>
              {supporting.map((project) => (
                <ProjectRow key={project.slug} project={project} />
              ))}
            </div>
          </Reveal>
        </Group>
      ) : null}

      {archive.length > 0 ? (
        <Group label="Archive" note="earlier or unfinished">
          <Reveal>
            <div>
              {archive.map((project) => (
                <ProjectRow key={project.slug} project={project} />
              ))}
            </div>
          </Reveal>
        </Group>
      ) : null}
    </div>
  );
}
