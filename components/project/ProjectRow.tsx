import Link from 'next/link';
import type { Project } from '@/content/types';
import EvidenceTag from '@/components/ui/EvidenceTag';

/**
 * The compact treatment for supporting and archive work. A row, not a card ,
 * a grid of identical boxes would flatten the hierarchy the featured cards
 * just established.
 *
 * No thumbnail here on purpose. A screenshot shrunk to 180px on a dark
 * background reads as texture rather than information, and it competes with
 * the title for the same glance. The images belong on the case-study page at
 * a size where they can actually be read.
 */
export default function ProjectRow({ project }: { project: Project }) {
  const inner = (
    <>
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-[11px] tracking-[0.1em] text-fg-low">
            {project.category}
          </span>
          {project.evidence.map((e, i) => (
            <EvidenceTag key={i} evidence={e} />
          ))}
        </div>
        <h3 className="text-[19px] font-medium tracking-[-0.015em] text-fg">
          {project.title}
        </h3>
        <p className="mt-2 max-w-[62ch] text-[14.5px] leading-[1.6] text-fg-mid">
          {project.summary}
        </p>
        <ul className="mt-3 flex list-none flex-wrap gap-x-3 gap-y-1 p-0">
          {project.tech.slice(0, 5).map((t) => (
            <li key={t} className="font-mono text-[11px] text-fg-low">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <span
        aria-hidden
        className="hidden shrink-0 self-center text-fg-low transition-transform duration-[180ms] group-hover:translate-x-1 group-hover:text-ice sm:block"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M5 12h13M13 6l6 6-6 6" />
        </svg>
      </span>
    </>
  );

  const classes =
    'group flex items-start justify-between gap-8 border-b border-line py-7 pr-5 transition-colors first:border-t';

  if (project.caseStudy) {
    return (
      <Link href={`/projects/${project.slug}`} className={`${classes} hover:bg-ink-raised`}>
        {inner}
      </Link>
    );
  }

  return <div className={classes}>{inner}</div>;
}
