import { activities } from '@/content/profile';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';

/**
 * Each entry carries a type label, Research, Competition, Community, Creative
 *, so student involvement is never mistaken for employment. That distinction
 * is the whole reason this section is labelled the way it is.
 */
export default function Activities() {
  return (
    <section className="border-t border-line bg-ink-void">
      <div className="wrap section-y">
        <SectionHead
          title="Research & activities"
          intro="Lab work, a competition entry, and student organisations, labelled as what they are."
        />

        <Reveal>
          <ol className="list-none border-t border-line p-0">
            {activities.map((a) => (
              <li
                key={`${a.org}-${a.period}`}
                className="grid gap-3 border-b border-line py-6 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8"
              >
                <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
                  <span className="meta">{a.period}</span>
                  <span className="inline-block rounded-sm border border-line px-1.5 py-[3px] font-mono text-[10px] tracking-[0.08em] text-fg-low">
                    {a.type}
                  </span>
                </div>
                <div>
                  <h3 className="text-[16.5px] font-medium leading-snug text-fg">{a.org}</h3>
                  <p className="mt-1 text-[14px] text-ice">{a.role}</p>
                  <p className="mt-2 max-w-[64ch] text-[14.5px] leading-[1.6] text-fg-mid">
                    {a.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
