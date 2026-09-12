import { profile } from '@/content/profile';

/**
 * The fixed left rail. Desktop only, and it carries information rather than
 * decoration: the mark, the two links that matter, and the location as
 * coordinates, a quiet nod to the technical register without a sci-fi HUD.
 */
export default function MetaRail() {
  return (
    <aside
      aria-label="Profile links"
      className="fixed inset-y-0 left-0 z-40 hidden w-rail flex-col items-center justify-between border-r border-line bg-ink-void/40 py-5 backdrop-blur-sm lg:flex"
    >
      <span aria-hidden className="font-mono text-[12px] tracking-[0.1em] text-fg">
        ahp
      </span>

      <div className="flex flex-col items-center gap-4">
        <a
          href={profile.links.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
          className="text-fg-low transition-colors duration-[180ms] hover:text-ice"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.3 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.48 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12A11.5 11.5 0 0 0 12 .5z" />
          </svg>
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
          className="text-fg-low transition-colors duration-[180ms] hover:text-ice"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM2.4 9.5h5.16V23H2.4zM10.6 9.5h4.94v1.84h.07c.69-1.24 2.37-2.14 4.28-2.14 3.35 0 4.11 2.1 4.11 5.36V23h-5.16v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V23H10.6z" />
          </svg>
        </a>
        <a
          href={`mailto:${profile.email}`}
          aria-label={`Email ${profile.name}`}
          className="text-fg-low transition-colors duration-[180ms] hover:text-ice"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
            <path d="m3 6 9 7 9-7" />
          </svg>
        </a>
      </div>

      <span
        aria-hidden
        className="font-mono text-[10.5px] tracking-[0.18em] text-fg-low [writing-mode:vertical-rl]"
      >
        23.8103°N 90.4125°E
      </span>
    </aside>
  );
}
