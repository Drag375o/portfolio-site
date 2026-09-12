/**
 * The one structural idea in this project: what is learned and what is not are
 * kept apart, and the rules explain the risk without overriding the model.
 *
 * Label widths are checked against box widths by hand. Geist Mono at 8px runs
 * about 4.8px per character, so a 118px box holds ~24 characters with padding.
 */
export default function PhishingPipeline() {
  return (
    <svg
      viewBox="0 0 300 240"
      className="w-full max-w-[300px]"
      role="img"
      aria-label="Schematic: a pasted email splits into two paths. One is normalised, vectorised with TF-IDF and scored by a classifier. The other runs rule-based indicators that are never learned. The two combine into a verdict with confidence, risk level and warning signs."
    >
      <g fill="none" stroke="var(--color-line-hi)" strokeWidth="1">
        <rect x="14" y="14" width="118" height="24" rx="2" />
        <rect x="14" y="56" width="118" height="42" rx="2" stroke="var(--color-ice)" strokeOpacity="0.45" />
        <rect x="14" y="118" width="118" height="42" rx="2" strokeDasharray="3 3" />
        <rect x="164" y="70" width="122" height="76" rx="2" />
      </g>

      <g stroke="var(--color-ice)" strokeOpacity="0.36" strokeWidth="1" fill="none">
        <path d="M73 38 V56" />
        <path d="M73 98 V118" />
        <path d="M132 77 H164" />
        <path d="M132 139 C150 139 152 120 164 114" />
      </g>

      <g
        fontFamily="var(--font-mono)"
        fontSize="8"
        fill="var(--color-fg-low)"
        letterSpacing="0.04em"
      >
        <text x="22" y="30">pasted email</text>
        <text x="22" y="72" fill="#a9c6d6">normalize, TF-IDF</text>
        <text x="22" y="86">word 1-2, char 3-5</text>
        <text x="22" y="134">indicators()</text>
        <text x="22" y="148">not learned</text>
        <text x="172" y="88" fill="#a9c6d6">verdict</text>
        <text x="172" y="104">confidence</text>
        <text x="172" y="120">risk level</text>
        <text x="172" y="136">warning signs</text>
        <text x="14" y="196">0.9939 split</text>
        <text x="14" y="210" fill="#a9c6d6">0.865 cross-corpus</text>
      </g>

      <path d="M14 180 H132" stroke="var(--color-line-hi)" strokeWidth="1" fill="none" />
    </svg>
  );
}
