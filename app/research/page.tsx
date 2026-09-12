import type { Metadata } from 'next';
import Link from 'next/link';
import { research } from '@/content/research';
import ResearchCard from '@/components/research/ResearchCard';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Bengali conversational AI and efficient video captioning at the NSU Trimodal AI Lab. Methods published, evaluation figures held until publication.',
};

export default function ResearchIndex() {
  return (
    <div className="wrap pb-24 pt-33">
      <Reveal>
        <p className="meta mb-4">
          <Link href="/" className="hover:text-fg">
            ← Back
          </Link>
        </p>
        <h1 className="display-serif">Research</h1>
        <p className="mt-3 max-w-[58ch] text-[16px] leading-[1.62] text-fg-mid">
          Undergraduate research assistant at the NSU Trimodal AI Lab since 2025, under
          Dr. Md. Adnan Arefeen. Both projects below are unpublished, so the methods are
          described in full and no evaluation figures appear.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5">
        {research.map((item) => (
          <Reveal key={item.slug}>
            <ResearchCard item={item} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
