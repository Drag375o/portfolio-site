import type { Fact } from '@/content/types';

/**
 * Verified figures in a hairline grid.
 *
 * Borders live on the cells, not on the container behind them. The obvious
 * alternative (a container with `gap-px` and a line-coloured background) paints
 * a visible slab wherever the last row is incomplete, which is exactly what
 * happens with four or five facts in a three-column grid.
 */
export default function FactGrid({
  facts,
  size = 'md',
}: {
  facts: Fact[];
  size?: 'sm' | 'md';
}) {
  if (facts.length === 0) return null;

  // Two columns for four facts keeps the block square instead of orphaning one.
  const cols = facts.length === 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';
  const pad = size === 'sm' ? 'p-3.5' : 'p-5';
  const value = size === 'sm' ? 'text-[15px]' : 'text-[19px]';

  return (
    <ul
      className={`grid list-none border-l border-t border-line p-0 ${cols}`}
    >
      {facts.map((f) => (
        <li key={f.label} className={`border-b border-r border-line bg-ink-raised ${pad}`}>
          <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-fg-low">
            {f.label}
          </span>
          <span className={`mt-1.5 block font-medium leading-tight text-fg ${value}`}>
            {f.value}
          </span>
          {f.note ? (
            <span className="mt-1.5 block font-mono text-[10.5px] leading-snug text-fg-low">
              {f.note}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
