import Link from 'next/link';
import type { Research } from '@/content/types';
import EvidenceTag from '@/components/ui/EvidenceTag';
import Chip from '@/components/ui/Chip';
import Image from 'next/image';
import Schematic from '@/components/schematics';
import { researchCover } from '@/lib/media';

/**
 * Research reads differently from a project, so it looks different: no metric
 * strip, because there are no numbers to show yet. In its place the Results
 * block states plainly that evaluation is done and the figures are held until
 * publication, which is a stronger signal to an academic reader than a number
 * would be, and it is the truth.
 */
export default function ResearchCard({
  item,
  compact = false,
}: {
  item: Research;
  compact?: boolean;
}) {
  const results = item.results;
  const cover = researchCover(item.slug);

  return (
    <article className="border border-line bg-ink-raised transition-colors duration-[320ms] hover:border-line-hi">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-4 flex flex-wrap items-center gap-2.5">
            {item.evidence.map((e, i) => (
              <EvidenceTag key={i} evidence={e} />
            ))}
            <span className="font-mono text-[11px] tracking-[0.1em] text-fg-low">
              {item.period}
            </span>
          </div>

          <h3 className="max-w-[26ch] text-[clamp(21px,2.5vw,29px)] font-medium leading-[1.16] tracking-[-0.02em] text-fg">
            <Link href={`/research/${item.slug}`} className="transition-colors hover:text-ice">
              {item.title}
            </Link>
          </h3>

          <p className="mt-4 max-w-[56ch] text-[15px] leading-[1.62] text-fg-mid">
            {item.summary}
          </p>

          {!compact ? (
            <dl className="mt-6 grid gap-4.5">
              <div>
                <dt className="mb-1.5 font-mono text-[10.5px] tracking-[0.12em] text-ice">
                  Problem
                </dt>
                <dd className="max-w-[56ch] text-[15px] leading-[1.62] text-fg-mid">
                  {item.problem}
                </dd>
              </div>
            </dl>
          ) : null}

          {/* The results block. Present, empty, and explicit about why. */}
          <div
            className={`mt-7 border p-4 ${
              results.published === false
                ? 'border-dashed border-line-hi bg-ink-void/60'
                : 'border-line'
            }`}
          >
            <p className="mb-1.5 font-mono text-[10.5px] tracking-[0.12em] text-fg-low">
              Results
            </p>
            {results.published === false ? (
              <p className="max-w-[56ch] text-[14px] leading-[1.6] text-fg-low">
                {results.note}
              </p>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {results.metrics.map((m) => (
                  <li key={m.label}>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-fg-low">
                      {m.label}
                    </span>
                    <span className="mt-1 block text-[15px] font-medium text-fg">{m.value}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {item.models ? (
            <p className="mt-5 font-mono text-[11px] leading-relaxed text-fg-low">
              {item.models.join(' · ')}
            </p>
          ) : null}

          <ul className="mt-4 flex list-none flex-wrap gap-1.5 p-0">
            {item.tech.slice(0, 6).map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-6 border-t border-line pt-5">
            <Link
              href={`/research/${item.slug}`}
              className="group inline-flex items-center gap-2 text-[14px] font-medium text-fg transition-colors hover:text-ice"
            >
              Read the method
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
            {item.advisor ? (
              <span className="meta">Advisor: {item.advisor.name}</span>
            ) : null}
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-line bg-ink-void p-7 lg:items-start lg:border-l lg:border-t-0 lg:p-8">
          <div className="w-full lg:sticky lg:top-24">
            {cover ? (
              <div className="relative aspect-4/3 w-full overflow-hidden border border-line bg-ink-void">
                <Image
                  src={cover}
                  alt={`${item.shortTitle} interface`}
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <Schematic id={item.media.schematic} />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
