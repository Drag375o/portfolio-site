/**
 * The idea in one picture: most frames carry nothing new, so they are not all
 * worth the largest model. Selected frames route to the heavy VLM, the rest to
 * a light one, with temporal structure holding the thread between them.
 *
 * Label widths are checked against box widths by hand, Geist Mono at 8px runs
 * about 4.8px per character, so a 132px box holds ~26 characters.
 */
export default function FrameScheduling() {
  const frames = Array.from({ length: 12 }, (_, i) => i);
  const selected = new Set([1, 4, 5, 9]);

  return (
    <svg
      viewBox="0 0 300 240"
      className="w-full max-w-[300px]"
      role="img"
      aria-label="Schematic: a strip of video frames where a few are selected and routed to a heavy vision-language model while the rest go to a lighter one, with a temporal graph linking entities across frames before captions are produced."
    >
      <g>
        {frames.map((i) => {
          const x = 16 + i * 23;
          const on = selected.has(i);
          return (
            <rect
              key={i}
              x={x}
              y={26}
              width="18"
              height="26"
              rx="1.5"
              fill={on ? 'var(--color-ice)' : 'none'}
              fillOpacity={on ? 0.16 : 0}
              stroke={on ? 'var(--color-ice)' : 'var(--color-line-hi)'}
              strokeOpacity={on ? 0.75 : 1}
              strokeWidth="1"
            />
          );
        })}
      </g>

      {/* temporal links between selected frames */}
      <g fill="none" stroke="var(--color-ice)" strokeOpacity="0.4" strokeWidth="1">
        <path d="M48 66 C70 86 96 86 117 66" />
        <path d="M117 66 C132 82 140 82 140 66" />
        <path d="M140 66 C170 94 202 94 232 66" />
      </g>
      <g fill="var(--color-ice)" fillOpacity="0.7">
        {[1, 4, 5, 9].map((i) => (
          <circle key={i} cx={16 + i * 23 + 9} cy={60} r="2.2" />
        ))}
      </g>

      <g fill="none" stroke="var(--color-line-hi)" strokeWidth="1">
        <rect x="14" y="112" width="132" height="46" rx="2" stroke="var(--color-ice)" strokeOpacity="0.5" />
        <rect x="154" y="112" width="132" height="46" rx="2" strokeDasharray="3 3" />
        <rect x="46" y="192" width="208" height="36" rx="2" />
        <path d="M80 158 V192" />
        <path d="M220 158 C220 176 196 180 186 192" />
      </g>

      <g
        fontFamily="var(--font-mono)"
        fontSize="8"
        fill="var(--color-fg-low)"
        letterSpacing="0.04em"
      >
        <text x="16" y="18">frames</text>
        <text x="24" y="132" fill="#a9c6d6">selected</text>
        <text x="24" y="146">heavy VLM</text>
        <text x="164" y="132">the rest</text>
        <text x="164" y="146">light VLM, parallel</text>
        <text x="58" y="210">entity tracking → caption</text>
        <text x="58" y="222">Temporal-GNN holds it</text>
      </g>
    </svg>
  );
}
