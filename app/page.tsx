import Hero from '@/components/hero/Hero';
import IdentityRail from '@/components/sections/IdentityRail';
import FeaturedWork from '@/components/sections/FeaturedWork';
import ResearchPreview from '@/components/sections/ResearchPreview';
import About from '@/components/sections/About';
import Exploring from '@/components/sections/Exploring';
import Skills from '@/components/sections/Skills';
import Activities from '@/components/sections/Activities';
import Contact from '@/components/sections/Contact';

/**
 * The homepage is an assembly of sections and holds no content of its own.
 * Order answers the questions a visitor arrives with: who, what have you
 * built, what do you research, who are you, what can you do, how do I reach you.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <IdentityRail />
      <FeaturedWork />
      <ResearchPreview />
      <About />
      <Exploring />
      <Skills />
      <Activities />
      <Contact />
    </>
  );
}
