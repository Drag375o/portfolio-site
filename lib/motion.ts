/**
 * Motion constants. Two durations and two easings for the whole site ,
 * if a component needs a third, that is a signal the animation is
 * decorative rather than communicative.
 */
export const DURATION = { fast: 0.18, ui: 0.32, reveal: 0.56 } as const;

type Bezier = [number, number, number, number];

export const EASE = {
  out: [0.16, 1, 0.3, 1] as Bezier,
  ui: [0.4, 0, 0.2, 1] as Bezier,
};

/** The single scroll-reveal preset. Deliberately a 6px lift, not 24px. */
export const reveal = {
  initial: { opacity: 0, y: 6 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -12% 0px' },
  transition: { duration: DURATION.reveal, ease: EASE.out },
};

/** Hero entrance delays, in seconds. Used by app CSS via inline style. */
export const heroDelay = (step: number) => `${0.09 + step * 0.07}s`;
