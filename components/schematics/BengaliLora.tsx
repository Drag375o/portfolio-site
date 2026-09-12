/**
 * The structural point: five base models, each getting a small trained adapter
 * rather than a full fine-tune, evaluated two ways, and the results block is
 * drawn but empty, because the work is unpublished.
 */
export default function BengaliLora() {
  return (
    <svg
      viewBox="0 0 300 240"
      className="w-full max-w-[300px]"
      role="img"
      aria-label="Schematic: five compact open models each receive a LoRA adapter, are evaluated automatically and by human raters, and the results block is shown empty because the work is unpublished."
    >
      <g
        fontFamily="var(--font-mono)"
        fontSize="8.4"
        fill="var(--color-fg-low)"
        letterSpacing="0.05em"
      >
        <text x="16" y="26">Qwen2.5 0.5B</text>
        <text x="16" y="46">Qwen2.5 1.5B</text>
        <text x="16" y="66">Gemma 3 1B</text>
        <text x="16" y="86">TinyLlama 1.1B</text>
        <text x="16" y="106">Llama 3.2 3B</text>
        <text x="152" y="70" fill="#a9c6d6">LoRA</text>
        <text x="152" y="84">adapters</text>
        <text x="152" y="150">automatic eval</text>
        <text x="152" y="168">human eval</text>
        <text x="152" y="216">held until</text>
        <text x="152" y="228">publication</text>
        <text x="16" y="150">runs local</text>
        <text x="16" y="164">no API call</text>
      </g>

      <g fill="none" stroke="var(--color-ice)" strokeOpacity="0.34" strokeWidth="1">
        <path d="M108 22 C130 22 128 60 144 64" />
        <path d="M108 42 C130 42 130 62 144 66" />
        <path d="M108 62 H144" />
        <path d="M108 82 C130 82 130 70 144 68" />
        <path d="M108 102 C130 102 128 74 144 70" />
        <path d="M166 94 V132" />
      </g>

      <g fill="none" stroke="var(--color-line-hi)" strokeWidth="1">
        <rect x="144" y="52" width="94" height="42" rx="2" stroke="var(--color-ice)" strokeOpacity="0.5" />
        <rect x="144" y="132" width="94" height="50" rx="2" />
        <rect x="144" y="196" width="94" height="40" rx="2" strokeDasharray="3 3" />
        <path d="M166 182 V196" strokeDasharray="2 3" />
        <path d="M16 128 H108" />
      </g>
    </svg>
  );
}
