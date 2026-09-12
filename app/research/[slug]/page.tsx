import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { research, researchBySlug } from '@/content/research';
import EvidenceTag from '@/components/ui/EvidenceTag';
import Chip from '@/components/ui/Chip';
import Image from 'next/image';
import Schematic from '@/components/schematics';
import { researchImages } from '@/lib/media';
import Reveal from '@/components/ui/Reveal';

export function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = researchBySlug(slug);
  if (!item) return {};

  return {
    title: item.shortTitle,
    description: item.summary,
    alternates: { canonical: `/research/${item.slug}` },
    openGraph: { title: item.title, description: item.summary, type: 'article' },
  };
}

function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="grid gap-3 border-t border-line py-9 md:grid-cols-[140px_minmax(0,1fr)] md:gap-10">
        <div className="flex items-baseline gap-3 md:flex-col md:gap-1">
          <span className="meta">{index}</span>
          <h2 className="text-[14px] font-medium text-fg">{title}</h2>
        </div>
        <div className="max-w-[68ch] text-[16px] leading-[1.7] text-fg-mid">{children}</div>
      </section>
    </Reveal>
  );
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = researchBySlug(slug);
  if (!item) notFound();

  // Narrowing must happen at the point of use, so keep the union in one const
  // and test its discriminant inline rather than via a boolean variable.
  const results = item.results;
  const shots = researchImages(item.slug);

  return (
    <article className="wrap pb-24 pt-33">
      <Reveal>
        <p className="meta mb-5">
          <Link href="/research" className="hover:text-fg">
            ← All research
          </Link>
        </p>

        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          {item.evidence.map((e, i) => (
            <EvidenceTag key={i} evidence={e} />
          ))}
        </div>

        <h1 className="max-w-[22ch] text-[clamp(27px,4.4vw,46px)] font-semibold leading-[1.08] tracking-[-0.03em] text-fg">
          {item.title}
        </h1>

        <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.6] text-fg-mid">{item.summary}</p>

        {/* Authorship and affiliation, stated plainly. An academic reader looks
            for this before anything else. */}
        <dl className="mt-8 grid border-l border-t border-line sm:grid-cols-3">
          <div className="border-b border-r border-line bg-ink-raised p-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-low">Role</dt>
            <dd className="mt-1.5 text-[14px] text-fg">{item.role}</dd>
          </div>
          <div className="border-b border-r border-line bg-ink-raised p-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-low">Lab</dt>
            <dd className="mt-1.5 text-[14px] text-fg">{item.lab}</dd>
          </div>
          <div className="border-b border-r border-line bg-ink-raised p-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-low">
              Advisor
            </dt>
            <dd className="mt-1.5 text-[14px] text-fg">{item.advisor?.name ?? 'Not listed'}</dd>
            {item.advisor ? (
              <dd className="mt-1 font-mono text-[10.5px] leading-snug text-fg-low">
                {item.advisor.title}
              </dd>
            ) : null}
          </div>
        </dl>
      </Reveal>

      <div className="mt-12">
        <Section index="01" title="Problem">
          <p>{item.problem}</p>
        </Section>

        <Section index="02" title="Approach">
          <p>{item.approach}</p>
        </Section>

        <Section index="03" title="Methods">
          <ul className="grid list-none gap-2 p-0 sm:grid-cols-2">
            {item.methods.map((m) => (
              <li key={m} className="flex items-baseline gap-2.5 text-[15px]">
                <span aria-hidden className="h-px w-3 shrink-0 translate-y-[-4px] bg-ice-deep" />
                {m}
              </li>
            ))}
          </ul>
        </Section>

        {item.models ? (
          <Section index="04" title="Models">
            <ul className="flex list-none flex-wrap gap-1.5 p-0">
              {item.models.map((m) => (
                <Chip key={m}>{m}</Chip>
              ))}
            </ul>
          </Section>
        ) : null}

        {item.media.schematic ? (
          <Section index={item.models ? '05' : '04'} title="How it fits together">
            <div className="flex justify-center border border-line bg-ink-void p-8">
              <Schematic id={item.media.schematic} />
            </div>
          </Section>
        ) : null}

        {shots.length > 0 ? (
          <Section index={item.models ? '06' : '05'} title="Interface">
            <div className="grid gap-3">
              {shots.map((src) => (
                <div
                  key={src}
                  className="relative aspect-16/10 w-full overflow-hidden border border-line bg-ink-void"
                >
                  <Image
                    src={src}
                    alt={`${item.shortTitle} interface`}
                    fill
                    sizes="(min-width: 768px) 68ch, 100vw"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        <Section index="07" title="Results">
          {results.published === false ? (
            <div className="border border-dashed border-line-hi bg-ink-void/60 p-5">
              <p className="max-w-[60ch] text-[15px] leading-[1.6] text-fg-low">
                {results.note}
              </p>
            </div>
          ) : (
            <ul className="grid list-none border-l border-t border-line p-0 sm:grid-cols-2">
              {results.metrics.map((m) => (
                <li key={m.label} className="border-b border-r border-line bg-ink-raised p-4">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-fg-low">
                    {m.label}
                  </span>
                  <span className="mt-1.5 block text-[17px] font-medium text-fg">{m.value}</span>
                  {m.note ? (
                    <span className="mt-1 block font-mono text-[10.5px] text-fg-low">{m.note}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section index="08" title="Stack">
          <ul className="flex list-none flex-wrap gap-1.5 p-0">
            {item.tech.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </ul>
        </Section>
      </div>

      <Reveal>
        <div className="mt-8 border-t border-line pt-8">
          <p className="meta max-w-[62ch] leading-relaxed">
            Happy to discuss the evaluation in detail. The figures are complete, they are
            simply not published yet.
          </p>
          <Link
            href="/research"
            className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-fg transition-colors hover:text-ice"
          >
            ← All research
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
