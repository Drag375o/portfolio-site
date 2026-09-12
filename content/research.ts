import type { Research } from './types';

const ADVISOR = {
  name: 'Dr. Md. Adnan Arefeen',
  title: 'Assistant Professor, Department of ECE, North South University',
};

/**
 * No evaluation numbers are stored in this file. Both items are unpublished,
 * and this repo may be public, so the figures stay out of the source, not
 * just out of the render. When a paper lands, replace `results` with
 * `{ published: true, metrics: [...] }` and the page fills itself in.
 */
export const research: Research[] = [
  {
    slug: 'bengali-mental-health-agent',
    title: 'Privacy-first Bengali empathetic mental-health conversational agent',
    shortTitle: 'Bengali empathetic conversational agent',
    role: 'Undergraduate Research Assistant',
    lab: 'NSU Trimodal AI Lab',
    advisor: ADVISOR,
    period: '2025 - Present',
    summary:
      'A Bengali conversational agent for mental-health support, built to run locally on modest hardware so that conversations never leave the device.',
    problem:
      'A mental-health conversation is the last thing that should be sent to a hosted API. Bengali support is also thin in the models small enough to run locally, and empathy is harder to transfer across languages than fluency.',
    approach:
      'Parameter-efficient LoRA fine-tuning of compact open models on Bengali empathetic dialogue, followed by automatic and human evaluation of the responses, the human study being the part that actually tells you whether the empathy survived.',
    methods: [
      'LoRA / parameter-efficient fine-tuning',
      'Bengali empathetic response generation',
      'Automatic evaluation',
      'Human evaluation study',
      'Local inference on consumer hardware',
    ],
    models: [
      'Qwen2.5 0.5B Instruct',
      'Qwen2.5 1.5B Instruct',
      'Gemma 3 1B',
      'TinyLlama 1.1B',
      'Llama 3.2 3B',
    ],
    tech: [
      'Python', 'PyTorch', 'Hugging Face Transformers', 'LoRA / PEFT',
      'Django', 'REST APIs', 'SQLite', 'Ollama',
    ],
    results: {
      published: false,
      note:
        'Automatic and human evaluation are complete. The work is unpublished, so the figures stay off this page until it is. Ask me directly and I will walk you through them.',
    },
    evidence: [{ kind: 'lab', lab: 'NSU Trimodal AI Lab' }, { kind: 'unpublished' }],
    links: {},
    media: { schematic: 'bengali-lora' },
  },
  {
    slug: 'frame-aware-scheduling',
    title: 'Frame-Aware Multi-Model Scheduling for Efficient Video Captioning',
    shortTitle: 'AdaVideoCap',
    role: 'Undergraduate Research Assistant',
    lab: 'NSU Trimodal AI Lab',
    advisor: ADVISOR,
    period: '2025 - Present',
    summary:
      'A video-understanding framework that routes frames across several vision-language models instead of pushing every frame through the largest one.',
    problem:
      'Captioning long video with a large VLM is expensive, and most of that cost is spent on frames that carry nothing new. Cutting frames naively is what destroys the temporal reasoning you needed the model for.',
    approach:
      'Frames are sampled and grouped temporally, then routed dynamically across multiple VLMs. Temporal-GNN strategies and entity-level tracking hold the thread between groups, with temporal mosaicing and parallel processing keeping long-video and driver-monitoring analysis tractable.',
    methods: [
      'Adaptive frame sampling',
      'Temporal grouping',
      'Temporal-GNN',
      'Temporal mosaicing',
      'Entity-level tracking',
      'Multi-model routing',
      'Parallel processing',
    ],
    tech: [
      'Python', 'Computer vision', 'VLMs', 'Temporal modeling',
      'GNNs', 'Parallel processing',
    ],
    results: {
      published: false,
      note:
        'In progress and unpublished. The efficiency and captioning comparisons are not on this page yet.',
    },
    evidence: [{ kind: 'lab', lab: 'NSU Trimodal AI Lab' }, { kind: 'in-progress' }],
    links: {},
    media: { schematic: 'frame-scheduling' },
  },
];

export const researchBySlug = (slug: string) => research.find((r) => r.slug === slug);
