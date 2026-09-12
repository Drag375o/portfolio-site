import Reveal from './Reveal';

/**
 * Every section opens the same way: an editorial serif heading, an optional
 * line of context, and an optional action on the right. Consistency here is
 * what lets the projects underneath be asymmetric without the page falling apart.
 */
export default function SectionHead({
  title,
  intro,
  aside,
}: {
  title: string;
  intro?: string;
  aside?: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="mb-11 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h2 className="display-serif">{title}</h2>
          {intro ? (
            <p className="mt-2 max-w-[52ch] text-[15px] text-fg-low">{intro}</p>
          ) : null}
        </div>
        {aside}
      </div>
    </Reveal>
  );
}
