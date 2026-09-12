import Link from 'next/link';
import { featured, projects, HOMEPAGE_FEATURED_COUNT } from '@/content/projects';
import ProjectCardFeatured from '@/components/project/ProjectCardFeatured';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';

export default function FeaturedWork() {
  const shown = featured.slice(0, HOMEPAGE_FEATURED_COUNT);
  const remaining = projects.length - shown.length;

  return (
    <section id="work" className="wrap section-y scroll-mt-24">
      <SectionHead
        title="Selected work"
        intro="Each project reports the figure that makes it look worse, because that is usually the figure that means something. Every number below is reproducible from the linked repository."
        aside={
          <Link
            href="/projects"
            className="meta border-b border-transparent pb-0.5 hover:border-line-hi hover:text-fg"
          >
            All projects
          </Link>
        }
      />

      <div className="grid gap-5">
        {shown.map((project, i) => (
          <Reveal key={project.slug} delay={i === 0 ? 0 : 0.04}>
            <ProjectCardFeatured project={project} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </div>

      {remaining > 0 ? (
        <Reveal>
          <Link
            href="/projects"
            className="mt-5 flex items-center justify-between border border-line bg-ink-raised px-6 py-5 transition-colors hover:border-line-hi sm:px-8"
          >
            <span className="text-[15px] text-fg-mid">
              {remaining} more: search, game AI, computer vision
            </span>
            <span className="meta">View all →</span>
          </Link>
        </Reveal>
      ) : null}
    </section>
  );
}
