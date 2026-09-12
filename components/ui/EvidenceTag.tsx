import type { Evidence } from '@/content/types';

/**
 * The site's argument, compressed into one component. Every project and
 * research item declares what backs it, so a reader never has to guess whether
 * "built a system" means a shipped product or a weekend notebook.
 *
 * Repo and lab tags are accented because they are the strongest evidence;
 * everything else stays quiet.
 */

const STRONG = 'text-[#a9c6d6] border-[rgba(127,216,247,0.22)]';
const QUIET = 'text-fg-low border-line';

function label(e: Evidence): string {
  switch (e.kind) {
    case 'repo':
      return 'repo';
    case 'lab':
      return e.lab;
    case 'coursework':
      return e.course ?? 'coursework';
    case 'competition':
      return e.event;
    case 'in-progress':
      return 'in progress';
    case 'unpublished':
      return 'unpublished';
  }
}

export default function EvidenceTag({ evidence }: { evidence: Evidence }) {
  const strong = evidence.kind === 'repo' || evidence.kind === 'lab';
  const hollow = evidence.kind === 'unpublished';

  const body = (
    <>
      <span
        aria-hidden
        className={
          hollow
            ? 'h-1 w-1 shrink-0 rounded-full border border-fg-low'
            : `h-1 w-1 shrink-0 rounded-full ${strong ? 'bg-ice' : 'bg-fg-low'}`
        }
      />
      {label(evidence)}
    </>
  );

  const classes = `inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm border bg-ink-surface/50 px-1.5 py-[3px] font-mono text-[10.5px] tracking-[0.08em] ${
    strong ? STRONG : QUIET
  }`;

  if (evidence.kind === 'repo') {
    return (
      <a
        href={evidence.url}
        target="_blank"
        rel="noreferrer"
        className={`${classes} transition-colors duration-[180ms] hover:border-ice hover:text-ice`}
      >
        {body}
      </a>
    );
  }

  return <span className={classes}>{body}</span>;
}
