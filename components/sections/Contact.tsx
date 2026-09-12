import { profile } from '@/content/profile';
import Reveal from '@/components/ui/Reveal';

const OPEN_TO = [
  'Research collaboration',
  'AI/ML internships',
  'Software engineering internships',
  'Interesting problems with real data',
];

/**
 * Links rather than a form. A contact form that posts nowhere is worse than no
 * form at all, and no backend has been chosen, so this stays honest until one
 * is. The email is a real mailto and works everywhere.
 */
export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line">
      <div className="wrap section-y">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <div>
              <h2 className="display-serif">Let’s build something interesting</h2>
              <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.65] text-fg-mid">
                I am an undergraduate looking for research collaboration and internships. If
                something here overlaps with what you are working on, write to me. I answer
                every message.
              </p>

              <a
                href={`mailto:${profile.email}`}
                className="group mt-8 inline-flex items-baseline gap-3 border-b border-line-hi pb-2 text-[clamp(19px,2.6vw,28px)] font-medium tracking-[-0.02em] text-fg transition-colors hover:border-ice hover:text-ice"
              >
                {profile.email}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden
                  className="transition-transform duration-[180ms] group-hover:translate-x-1"
                >
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </a>

              <div className="mt-8 flex flex-wrap gap-6">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="meta hover:text-fg"
                >
                  GitHub
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="meta hover:text-fg"
                >
                  LinkedIn
                </a>
                <a
                  href={profile.links.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="meta hover:text-fg"
                >
                  Résumé
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="border border-line bg-ink-raised">
              <p className="border-b border-line px-6 py-3.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-low">
                Open to
              </p>
              <ul className="list-none p-0">
                {OPEN_TO.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b border-line px-6 py-4 text-[15px] text-fg-mid last:border-b-0"
                  >
                    <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-ice" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="border-t border-line px-6 py-4 font-mono text-[11px] leading-relaxed text-fg-low">
                Based in {profile.location} · open to remote
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
