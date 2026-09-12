import { profile } from '@/content/profile';
import { heroDelay } from '@/lib/motion';
import Button from '@/components/ui/Button';
import PortraitPlate from './PortraitPlate';
import { HeroVisual } from './visuals';

/**
 * Hero owns the copy, the CTAs and the composition. It owns no animation:
 * the entrance is CSS (so this stays a server component and the headline is
 * in the first paint) and the ambient visual is a lazy client child.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[min(94svh,860px)] items-center overflow-hidden pb-21 pt-33">
      <HeroVisual />

      {/* The only gradient above the fold. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[30%] -right-[12%] h-[70vw] max-h-[900px] w-[70vw] max-w-[900px]"
        style={{
          background:
            'radial-gradient(circle at center, rgba(127,216,247,0.14), transparent 62%)',
        }}
      />

      <div className="wrap relative z-1 w-full">
        <div className="grid items-end gap-10 md:gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <p
              className="rise mb-7 inline-flex items-center gap-2.5"
              style={{ animationDelay: heroDelay(0) }}
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-ice shadow-[0_0_0_4px_rgba(127,216,247,0.12)]"
              />
              <span className="meta text-fg-mid">{profile.availability}</span>
            </p>

            <h1
              className="rise text-[clamp(40px,7.4vw,86px)] font-semibold leading-[0.96] tracking-[-0.035em] text-fg"
              style={{ animationDelay: heroDelay(1) }}
            >
              Atahar Hossain
              <br />
              Piash
            </h1>

            <p
              className="rise mt-5 font-mono text-[clamp(12.5px,1.5vw,15px)] tracking-[0.12em] text-ice"
              style={{ animationDelay: heroDelay(2) }}
            >
              {profile.roleLine}
            </p>

            <p
              className="rise mt-6 max-w-[46ch] text-[clamp(15.5px,1.5vw,18px)] leading-[1.62] text-fg-mid"
              style={{ animationDelay: heroDelay(3) }}
            >
              CSE undergraduate at North South University, majoring in AI and software
              engineering, and a research assistant at the{' '}
              <span className="font-normal text-fg">NSU Trimodal AI Lab</span>. I build
              machine-learning systems end to end, from dataset to model to interface, and
              study how small models handle Bengali language and long video.
            </p>

            <div
              className="rise mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: heroDelay(4) }}
            >
              <Button href="/#work">View the work</Button>
              <Button href="/#research" variant="ghost">
                Read the research
              </Button>
              <Button href={profile.links.resume} variant="quiet">
                Résumé / PDF
              </Button>
            </div>
          </div>

          <div className="rise" style={{ animationDelay: heroDelay(5) }}>
            <PortraitPlate />
          </div>
        </div>
      </div>
    </section>
  );
}
