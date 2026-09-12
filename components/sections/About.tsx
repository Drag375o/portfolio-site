import { education, profile } from '@/content/profile';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';

export default function About() {
  return (
    <section id="about" className="wrap section-y scroll-mt-24">
      <SectionHead title="About" />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <div className="max-w-[58ch] space-y-5 text-[17px] leading-[1.68] text-fg-mid">
            <p>
              I build machine-learning systems end to end: the dataset, the model, and the
              interface someone actually uses. I care most about the part where you find
              out whether the thing works.
            </p>
            <p>
              That shows up in a habit rather than a claim.{' '}
              <span className="text-fg">
                Every project here reports the figure that makes it look worse, because
                that is usually the figure that means something.
              </span>{' '}
              A classifier that scores 0.99 on a random split and 0.87 on mail from a
              source it has never seen is really two results, and the second one is the
              honest one. A churn model that cannot beat its own baseline is a finding, not
              a failure to report.
            </p>
            <p>
              At the NSU Trimodal AI Lab I work on two problems: getting small language
              models to hold an empathetic conversation in Bengali on hardware that keeps
              the conversation local, and cutting the cost of captioning long video without
              losing the temporal reasoning that made it worth captioning.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.04}>
          <div className="border border-line bg-ink-raised">
            <p className="border-b border-line px-6 py-3.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-low">
              Education
            </p>
            {education.map((e) => (
              <div key={e.degree} className="px-6 py-5">
                <p className="text-[16px] font-medium leading-snug text-fg">{e.degree}</p>
                <p className="mt-1.5 text-[14px] text-fg-mid">{e.institution}</p>
                <p className="meta mt-1">
                  {e.location} · {e.period}
                </p>

                <dl className="mt-5 space-y-3 border-t border-line pt-5">
                  {e.major ? (
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-low">
                        Major
                      </dt>
                      <dd className="mt-1 text-[14px] text-fg-mid">{e.major}</dd>
                    </div>
                  ) : null}
                  {e.cgpa ? (
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-low">
                        CGPA
                      </dt>
                      <dd className="mt-1 text-[14px] text-fg">{e.cgpa}</dd>
                    </div>
                  ) : null}
                  {e.coursework ? (
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-low">
                        Coursework
                      </dt>
                      <dd className="mt-1.5 text-[13.5px] leading-relaxed text-fg-low">
                        {e.coursework.join(' · ')}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            ))}
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noreferrer"
              className="block border-t border-line px-6 py-3.5 font-mono text-[11.5px] tracking-[0.06em] text-fg-low transition-colors hover:bg-ink-surface hover:text-fg"
            >
              Full résumé (PDF) →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
