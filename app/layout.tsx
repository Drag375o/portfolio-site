import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { profile } from '@/content/profile';
import Nav from '@/components/layout/Nav';
import MetaRail from '@/components/layout/MetaRail';
import Footer from '@/components/layout/Footer';
import { SITE_URL as SITE } from '@/lib/site';
import './globals.css';

/* The typeface swap point. Replace Geist here (e.g. with Inter) and the
   whole site follows, no component names a font directly. */
const sans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const mono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${profile.name} | AI/ML, Software & Research`,
    template: `%s | ${profile.name}`,
  },
  description:
    'CSE undergraduate at North South University and research assistant at the NSU Trimodal AI Lab. Machine-learning systems, Bengali language models and efficient video understanding.',
  keywords: [
    'Atahar Hossain Piash', 'AI', 'machine learning', 'North South University',
    'Bengali NLP', 'video captioning', 'LoRA', 'computer vision', 'Bangladesh',
  ],
  authors: [{ name: profile.name, url: SITE }],
  creator: profile.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: profile.name,
    title: `${profile.name} | AI/ML, Software & Research`,
    description:
      'Machine-learning systems, Bengali language models and efficient video understanding.',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: '#0a0e15' };

/** Structured data so search engines and LLMs read the identity correctly. */
function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: SITE,
    email: `mailto:${profile.email}`,
    jobTitle: 'Undergraduate Research Assistant',
    address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
    affiliation: { '@type': 'CollegeOrUniversity', name: 'North South University' },
    knowsAbout: [
      'Machine Learning', 'Natural Language Processing', 'Computer Vision',
      'Large Language Models', 'Vision-Language Models', 'Explainable AI',
    ],
    sameAs: [profile.links.github, profile.links.linkedin],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink-surface focus:px-4 focus:py-2 focus:text-fg"
        >
          Skip to content
        </a>
        <PersonJsonLd />
        <MetaRail />
        <Nav />
        <div className="lg:pl-rail">
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
