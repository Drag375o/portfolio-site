import Link from 'next/link';
import type { Project } from '@/content/types';
import EvidenceTag from '@/components/ui/EvidenceTag';
import Chip from '@/components/ui/Chip';
import FactGrid from '@/components/ui/FactGrid';
import ProjectVisual from './ProjectVisual';

/** Cards alternate which side the visual sits on, so a stack of them never
 *  reads as a template. Everything else stays identical. */
export default function ProjectCardFeatured({
  project,
  flip = false,
}: {
  project: Project;
  flip?: boolean;
}) {
  // Three figures maximum on a card. A card with five reads as a spec sheet
  // and nobody finishes it, the rest live on the case-study page.
  const facts = project.facts?.slice(0, 3) ?? [];

  return (
    <article className="border border-line bg-ink-raised transition-colors duration-[320ms] hover:border-line-hi">
      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className={`p-6 sm:p-8 lg:p-10 ${flip ? 'lg:order-2' : ''}`}>
          <div className="mb-4 flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-[11px] tracking-[0.1em] text-fg-low">
              {project.category}
            </span>
            {project.evidence.map((e, i) => (
              <EvidenceTag key={i} evidence={e} />
            ))}
          </div>

          <h3 className="text-[clamp(23px,2.9vw,34px)] font-medium leading-[1.14] tracking-[-0.022em] text-fg">
            {project.caseStudy ? (
              <Link
                href={`/projects/${project.slug}`}
                className="transition-colors hover:text-ice"
              >
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h3>

          <dl className="mt-6 grid gap-4.5">
            <div>
              <dt className="mb-1.5 font-mono text-[10.5px] tracking-[0.12em] text-ice">
                Problem
              </dt>
              <dd className="max-w-[54ch] text-[15px] leading-[1.62] text-fg-mid">
                {project.problemShort ?? project.problem}
              </dd>
            </div>
            <div>
              <dt className="mb-1.5 font-mono text-[10.5px] tracking-[0.12em] text-ice">
                Approach
              </dt>
              <dd className="max-w-[54ch] text-[15px] leading-[1.62] text-fg-mid">
                {project.approachShort ?? project.approach}
              </dd>
            </div>
          </dl>

          {facts.length > 0 ? (
            <div className="mt-7">
              <FactGrid facts={facts} size="sm" />
            </div>
          ) : null}

          <ul className="mt-6 flex list-none flex-wrap gap-1.5 p-0">
            {project.tech.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </ul>

          <div className="mt-7 flex items-center gap-6 border-t border-line pt-5">
            {project.caseStudy ? (
              <Link
                href={`/projects/${project.slug}`}
                className="group inline-flex items-center gap-2 text-[14px] font-medium text-fg transition-colors hover:text-ice"
              >
                Read the case study
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden
                  className="transition-transform duration-[180ms] group-hover:translate-x-1"
                >
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </Link>
            ) : null}
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="meta hover:text-fg"
              >
                GitHub
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
        </div>

        <div
          className={`flex min-h-70 items-center justify-center border-t border-line bg-ink-void p-7 lg:items-start lg:border-t-0 lg:p-10 ${
            flip ? 'lg:order-1 lg:border-r' : 'lg:border-l'
          }`}
        >
          <div className="w-full lg:sticky lg:top-24">
            <ProjectVisual project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}
