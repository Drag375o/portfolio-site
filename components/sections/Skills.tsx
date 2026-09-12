import { skills } from '@/content/profile';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';

/**
 * Categorised, never rated. A progress bar claiming "Python 90%" is a number
 * with no measurement behind it, which is the opposite of what this site does
 * everywhere else. Items flagged `learning` render quieter and separately.
 */
export default function Skills() {
  return (
    <section className="wrap section-y">
      <SectionHead
        title="Skills"
        intro="Grouped by what they are for. No percentages, they would be invented, and nothing else on this site is."
      />

      <Reveal>
        <div className="grid border-l border-t border-line md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.title} className="border-b border-r border-line bg-ink-raised p-6">
              <h3 className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ice">
                {group.title}
              </h3>
              <ul className="mt-4 flex list-none flex-wrap gap-x-3 gap-y-2 p-0">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className={
                      item.learning
                        ? 'font-mono text-[12.5px] text-fg-low italic'
                        : 'text-[14px] text-fg-mid'
                    }
                  >
                    {item.name}
                    {item.learning ? ' (learning)' : ''}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
