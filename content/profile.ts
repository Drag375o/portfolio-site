import type { Activity, EducationItem, SkillGroup } from './types';

export const profile = {
  name: 'Atahar Hossain Piash',
  /** Used in <title> and the OG card. */
  headline: 'AI / ML, software and research',
  roleLine: 'AI / ML × Software × Research',
  location: 'Dhaka, Bangladesh',
  email: 'atahar375o@gmail.com',
  /** In the CV but deliberately not rendered on the site, see notes. */
  phone: { value: '+880 1631 348707', publish: false },
  availability: 'Open to research collaboration and internships',
  links: {
    github: 'https://github.com/Drag375o',
    linkedin: 'https://www.linkedin.com/in/atahar-hossain-623b902b4',
    resume: '/atahar-hossain-piash-cv.pdf', // drop the compiled PDF here
  },
  lede:
    'CSE undergraduate at North South University, majoring in AI and software ' +
    'engineering, and an undergraduate research assistant at the NSU Trimodal AI Lab. ' +
    'I build machine-learning systems end to end, from dataset to model to interface, ' +
    'and study how small models handle Bengali language and long video.',
} as const;

export const education: EducationItem[] = [
  {
    degree: 'B.Sc. in Computer Science and Engineering',
    institution: 'North South University',
    location: 'Dhaka, Bangladesh',
    period: '2022 - Present',
    major: 'Artificial Intelligence & Software Engineering',
    cgpa: '3.74 / 4.00',
    coursework: [
      'Machine Learning',
      'Data Structures & Algorithms',
      'Database Systems',
      'Software Engineering',
      'Operating Systems',
      'Web Programming',
      'Embedded Systems',
    ],
  },
  // HSC and SSC are in the CV but omitted here on purpose: they add nothing
  // for a recruiter or a professor reading a portfolio site.
];

/** Drives the credential strip under the hero. Six cells, one line each. */
export const identity = [
  { area: 'Machine learning', note: 'classification, purchase prediction, comparative evaluation' },
  { area: 'Computer vision', note: 'video captioning, temporal modeling, driver monitoring' },
  { area: 'NLP & LLMs', note: 'Bengali generation, LoRA fine-tuning, human evaluation' },
  { area: 'Multi-model systems', note: 'routing and orchestrating VLMs under a compute budget' },
  { area: 'Software engineering', note: 'Django, REST APIs and the interfaces around the models' },
  { area: 'Research', note: 'NSU Trimodal AI Lab, research assistant, since 2025' },
];

/** From the Research Interests block of the CV. Framed as exploration, not expertise. */
export const exploring = [
  { area: 'Agentic systems', note: 'tool use and multi-step reasoning' },
  { area: 'Resource-constrained AI', note: 'models that run on local hardware' },
  { area: 'Multimodal AI', note: 'video, language and temporal structure' },
  { area: 'Explainable AI', note: 'making a verdict inspectable' },
  { area: 'Quantum machine learning', note: 'reading, early stage' },
  { area: 'AI systems architecture', note: 'orchestrating models as components' },
];

export const skills: SkillGroup[] = [
  {
    title: 'AI & machine learning',
    items: [
      { name: 'Machine learning' }, { name: 'Deep learning' }, { name: 'NLP' },
      { name: 'Computer vision' }, { name: 'LLMs' }, { name: 'VLMs' },
      { name: 'Transformers' }, { name: 'Fine-tuning' }, { name: 'LoRA / PEFT' },
      { name: 'Generative AI' },
    ],
  },
  {
    title: 'Research methods',
    items: [
      { name: 'Multimodal AI' }, { name: 'Temporal modeling' }, { name: 'GNNs' },
      { name: 'LLM / VLM orchestration' }, { name: 'Explainable AI' },
      { name: 'Evaluation & human study design' },
      { name: 'Paired significance testing' }, { name: 'Leakage auditing' },
    ],
  },
  {
    title: 'Languages',
    items: [
      { name: 'Python' }, { name: 'Java' }, { name: 'C' }, { name: 'PHP' },
      { name: 'SQL' }, { name: 'Assembly' }, { name: 'HTML / CSS' },
      { name: 'JavaScript' },
    ],
  },
  {
    title: 'Engineering',
    items: [
      { name: 'OOP & design patterns' }, { name: 'SOLID' },
      { name: 'Data structures & algorithms' }, { name: 'REST APIs' },
      { name: 'Unit & integration testing' }, { name: 'System design' },
      { name: 'UML' },
    ],
  },
  {
    title: 'Backend & data',
    items: [
      { name: 'Django' }, { name: 'MySQL' }, { name: 'SQLite' },
      { name: 'Database design' }, { name: 'Pandas' }, { name: 'NumPy' },
      { name: 'scikit-learn' }, { name: 'PyTorch' }, { name: 'XGBoost' }, { name: 'SHAP' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git & GitHub' }, { name: 'Hugging Face Transformers' },
      { name: 'Ollama' }, { name: 'Streamlit' }, { name: 'Pygame' }, { name: 'VS Code' }, { name: 'LaTeX' },
      { name: 'Illustrator' }, { name: 'Canva' },
    ],
  },
];

export const activities: Activity[] = [
  {
    org: 'NSU Trimodal AI Lab',
    role: 'Undergraduate Research Assistant',
    period: '2025 - Present',
    type: 'Research',
    detail:
      'Bengali conversational AI and adaptive video captioning, under Dr. Md. Adnan Arefeen (ECE, NSU).',
  },
  {
    org: 'NASA Space Apps Challenge: Climate Odyssey',
    role: 'UI/UX Designer & Team Member',
    period: '2024',
    type: 'Competition',
    detail:
      'Designed and prototyped a collaborative 3D climate game in Unity; UI/UX, gameplay concepts and concept validation.',
  },
  {
    org: 'IEEE NSU Student Branch, PES chapter',
    role: 'General Member; Graphics Team',
    period: '2023 - Present',
    type: 'Community',
    detail:
      'Technical workshops and outreach; event visual design and promotional material.',
  },
  {
    org: 'NSU Art & Photography Club',
    role: 'General Member; Publication Team',
    period: '2023 - 2024',
    type: 'Creative',
    detail: 'Publication design and club activities.',
  },
];
