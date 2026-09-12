/**
 * The finding is a shape, not a number: demand falls to a minimum near 19 °C
 * and rises on both sides, steeply above 30 °C. A V drawn in hairlines says
 * that faster than any sentence.
 */
export default function TemperatureResponse() {
  return (
    <svg
      viewBox="0 0 300 240"
      className="w-full max-w-[300px]"
      role="img"
      aria-label="Schematic: electricity demand plotted against temperature forms a V, reaching its minimum at 19 degrees Celsius. Heating sensitivity below is 78.7 megawatts per degree, cooling above is 104.6, steepening to 353.5 above 30 degrees."
    >
      {/* axes */}
      <g stroke="var(--color-line-hi)" strokeWidth="1" fill="none">
        <path d="M38 30 V186 H276" />
      </g>

      {/* the response curve */}
      <path
        d="M52 62 C86 104 112 140 146 152 C180 140 196 104 226 58 L246 34"
        fill="none"
        stroke="var(--color-ice)"
        strokeOpacity="0.75"
        strokeWidth="1.5"
      />

      {/* minimum marker at 19 °C */}
      <g stroke="var(--color-ice)" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 3">
        <path d="M146 152 V186" />
      </g>
      <circle cx="146" cy="152" r="2.6" fill="var(--color-ice)" />

      {/* the steepening band above 30 °C */}
      <g stroke="var(--color-line)" strokeWidth="1" fill="none">
        <path d="M226 30 V186" strokeDasharray="2 3" />
      </g>

      <g
        fontFamily="var(--font-mono)"
        fontSize="8.6"
        fill="var(--color-fg-low)"
        letterSpacing="0.06em"
      >
        <text x="44" y="26">demand</text>
        <text x="238" y="200">°C</text>
        <text x="120" y="200" fill="#a9c6d6">19.0</text>
        <text x="60" y="120">heating</text>
        <text x="60" y="132">78.7 MW/°C</text>
        <text x="178" y="96">cooling</text>
        <text x="178" y="108">104.6 MW/°C</text>
        <text x="214" y="222" fill="#a9c6d6">353.5 above 30°</text>
      </g>
    </svg>
  );
}
