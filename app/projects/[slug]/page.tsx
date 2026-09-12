import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, bySlug } from '@/content/projects';
import EvidenceTag from '@/components/ui/EvidenceTag';
import Chip from '@/components/ui/Chip';
import Schematic from '@/components/schematics';
import Image from 'next/image';
import { projectImages } from '@/lib/media';
import Reveal from '@/components/ui/Reveal';
import FactGrid from '@/components/ui/FactGrid';

/** Every project becomes a static page at build time. */
export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = bySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, type: 'article' },
  };
}

/** Numbered because the sections are a sequence: what, why, how, what happened. */
function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="grid gap-3 border-t border-line py-9 md:grid-cols-[140px_minmax(0,1fr)] md:gap-10">
        <div className="flex items-baseline gap-3 md:flex-col md:gap-1">
          <span className="meta">{index}</span>
          <h2 className="text-[14px] font-medium text-fg">{title}</h2>
        </div>
        <div className="max-w-[68ch] text-[16px] leading-[1.7] text-fg-mid">{children}</div>
      </section>
    </Reveal>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = bySlug(slug);
  if (!project || !project.caseStudy) notFound();

  const images = projectImages(project.slug);

  return (
    <article className="wrap pb-24 pt-33">
      <Reveal>
        <p className="meta mb-5">
          <Link href="/projects" className="hover:text-fg">
            ← All projects
          </Link>
        </p>

        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-[11px] tracking-[0.1em] text-fg-low">
            {project.category}
          </span>
          {project.evidence.map((e, i) => (
            <EvidenceTag key={i} evidence={e} />
          ))}
        </div>

        <h1 className="max-w-[20ch] text-[clamp(30px,5vw,52px)] font-semibold leading-[1.06] tracking-[-0.03em] text-fg">
          {project.title}
        </h1>

        <p className="mt-5 max-w-[60ch] text-[17px] leading-[1.6] text-fg-mid">
          {project.summary}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-6">
          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-fg transition-colors hover:text-ice"
            >
              Source on GitHub
            </a>
          ) : null}
          {project.links.demo ? (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="meta hover:text-fg"
            >
              Live demo
            </a>
          ) : null}
        </div>
      </Reveal>

      {/* The headline figures, before any prose. A reader who stops here still
          leaves with the result. */}
      {project.facts && project.facts.length > 0 ? (
        <Reveal>
          <div className="mt-11">
            <FactGrid facts={project.facts} />
          </div>
        </Reveal>
      ) : null}

      <div className="mt-14">
        <Section index="01" title="Problem">
          <p>{project.problem}</p>
        </Section>

        <Section index="02" title="Approach">
          <p>{project.approach}</p>
        </Section>

        {images.length > 0 ? (
          <Section index="03" title="Screens">
            <div className="grid gap-3">
              {images.map((src) => (
                <div
                  key={src}
                  className="relative aspect-16/10 w-full overflow-hidden border border-line bg-ink-void"
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(min-width: 768px) 68ch, 100vw"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </Section>
        ) : project.media.schematic ? (
          <Section index="03" title="How it fits together">
            <div className="flex justify-center border border-line bg-ink-void p-8">
              <Schematic id={project.media.schematic} />
            </div>
          </Section>
        ) : null}

        {project.outcome ? (
          <Section index={images.length > 0 || project.media.schematic ? '04' : '03'} title="What happened">
            <p>{project.outcome}</p>
          </Section>
        ) : null}

        <Section index="05" title="Stack">
          <ul className="flex list-none flex-wrap gap-1.5 p-0">
            {project.tech.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </ul>
        </Section>
      </div>

      <Reveal>
        <div className="mt-8 border-t border-line pt-8">
          <p className="meta max-w-[60ch] leading-relaxed">
            The full methodology, the tables this summarises, and the parts that did not
            work are in the repository README.
          </p>
          <Link
            href="/projects"
            className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-fg transition-colors hover:text-ice"
          >
            ← All projects
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
