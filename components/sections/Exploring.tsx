import { exploring } from '@/content/profile';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';

/**
 * Framed as reading and interest, never as expertise. The clarifier on each
 * line is what stops this becoming a keyword list, "reading, early stage" is
 * more credible than a badge.
 */
export default function Exploring() {
  return (
    <section className="border-t border-line bg-ink-void">
      <div className="wrap section-y">
        <SectionHead
          title="Currently exploring"
          intro="Directions I am reading into and experimenting with, not claims of expertise."
        />

        <Reveal>
          <ul className="list-none border-t border-line p-0">
            {exploring.map((item) => (
              <li
                key={item.area}
                className="group grid gap-1 border-b border-line py-5 sm:grid-cols-[minmax(0,260px)_minmax(0,1fr)] sm:gap-8"
              >
                <span className="flex items-center gap-3 text-[16px] font-medium text-fg">
                  <span
                    aria-hidden
                    className="h-px w-3 shrink-0 bg-ice-deep transition-all duration-[320ms] ease-out-expo group-hover:w-6 group-hover:bg-ice"
                  />
                  {item.area}
                </span>
                <span className="font-mono text-[12px] leading-relaxed text-fg-low sm:pt-1">
                  {item.note}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
