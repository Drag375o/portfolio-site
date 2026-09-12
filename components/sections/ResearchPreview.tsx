import { research } from '@/content/research';
import ResearchCard from '@/components/research/ResearchCard';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';

export default function ResearchPreview() {
  return (
    <section id="research" className="scroll-mt-24 border-t border-line bg-ink-void">
      <div className="wrap section-y">
        <SectionHead
          title="Research"
          intro="Two projects at the NSU Trimodal AI Lab, both unpublished. The methods are here; the evaluation figures are not, and will not be until the work is published."
        />

        <div className="grid gap-5">
          {research.map((item) => (
            <Reveal key={item.slug}>
              <ResearchCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
