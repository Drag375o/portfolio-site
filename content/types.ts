/**
 * Content schema for the portfolio.
 *
 * Design rule enforced by these types: nothing reaches the page without
 * declaring what backs it. `evidence` is required on every project and
 * research item, and quantities live in `facts`, which only accepts
 * things that are checkable (dataset size, model count, dates), never
 * self-reported performance.
 */

export type Evidence =
  | { kind: 'repo'; url: string }
  | { kind: 'lab'; lab: string }
  | { kind: 'coursework'; course?: string }
  | { kind: 'competition'; event: string }
  | { kind: 'in-progress' }
  | { kind: 'unpublished' };

/** A quantity that can be verified by a third party. */
export interface Fact {
  label: string;
  value: string;
  note?: string;
}

export type SchematicId =
  | 'phishing-pipeline'
  | 'bengali-lora'
  | 'frame-scheduling'
  | 'purchase-prediction'
  | 'churn-attribution'
  | 'temperature-response'
  | 'ga-evolution'
  | 'pacman-search';

export type Tier = 'featured' | 'supporting' | 'archive';

export interface Project {
  slug: string;
  title: string;
  /** Shown as the card kicker. Two domains max, joined with a middle dot. */
  category: string;
  year?: string;
  tier: Tier;
  /** One sentence. Used in the archive list and in meta descriptions. */
  summary: string;
  problem: string;
  approach: string;
  /**
   * Card-length versions. A card should land one idea and earn a click; the
   * full paragraphs above are for the case-study page. When these are absent
   * the card falls back to the long form.
   */
  problemShort?: string;
  approachShort?: string;
  /** Only set this when there is something real to report. */
  outcome?: string;
  facts?: Fact[];
  /**
   * Set this only on collaborative work, and name your own share precisely.
   * Rendered as a distinct line on the card so authorship is never implied
   * by omission.
   */
  contribution?: string;
  tech: string[];
  evidence: Evidence[];
  links: { github?: string; demo?: string; paper?: string };
  media: { cover?: string; gallery?: string[]; schematic?: SchematicId };
  status: 'complete' | 'active' | 'paused';
  /** When false, the card does not link anywhere deeper. */
  caseStudy: boolean;
}

export interface Research {
  slug: string;
  title: string;
  shortTitle: string;
  role: string;
  lab: string;
  advisor?: { name: string; title: string };
  period: string;
  /** Two or three sentences, plain language, no abstract-speak. */
  summary: string;
  problem: string;
  approach: string;
  /**
   * Card-length versions. A card should land one idea and earn a click; the
   * full paragraphs above are for the case-study page. When these are absent
   * the card falls back to the long form.
   */
  problemShort?: string;
  approachShort?: string;
  methods: string[];
  models?: string[];
  tech: string[];
  /**
   * Results are gated on publication. While `published` is false the page
   * renders the note and no numbers, and no numbers are stored in this
   * repo either, so nothing can leak through the public source.
   */
  results:
    | { published: false; note: string }
    | { published: true; metrics: Fact[]; note?: string };
  evidence: Evidence[];
  links: { github?: string; paper?: string };
  media: { schematic?: SchematicId; gallery?: string[] };
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  major?: string;
  cgpa?: string;
  coursework?: string[];
}

export interface Activity {
  org: string;
  role: string;
  period: string;
  /** Drives the label chip, so student work never reads as employment. */
  type: 'Research' | 'Academic' | 'Community' | 'Competition' | 'Creative';
  detail: string;
}

export interface SkillGroup {
  title: string;
  /** `learning: true` items render in a quieter style, clearly separated. */
  items: { name: string; learning?: boolean }[];
}
