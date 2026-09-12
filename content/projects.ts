import type { Project } from './types';

/**
 * Solo work only. Anything where a teammate carried a significant share is out
 *, NutriAI and DG Healthcare were removed on that basis, not for lack of
 * quality. For future collaborative work, use `contribution` rather than
 * dropping the project.
 *
 * Every figure in `facts` and `outcome` below is quoted from the project's own
 * README and is reproducible from the public repo. Nothing is rounded up, and
 * where a project's honest number is worse than its flattering one, both are
 * shown, which is how the repos themselves report it.
 */

const REPO = {
  phishing: 'https://github.com/Drag375o/Spam-phishing-detector',
  ecommerce: 'https://github.com/Drag375o/Temporal_ML_for_E-Commerce_Purchase_Prediction',
  churn: 'https://github.com/Drag375o/Telecom-customer_churn-xai',
  electricity: 'https://github.com/Drag375o/CSE-445',
  evopath: 'https://github.com/Drag375o/EvoPath-Evolutionary_Agent_Navigation',
  pacman: 'https://github.com/Drag375o/Ai_PACMAN',
};

export const projects: Project[] = [
  {
    slug: 'phishing-email-detector',
    title: 'Spam & phishing email detector',
    category: 'NLP · Machine learning',
    tier: 'featured',
    summary:
      'A text classifier that reports both how well it learned its dataset and how far it falls on mail from a source it has never seen.',
    problem:
      'Phishing is hard in a way ordinary spam is not: it imitates legitimate mail. Promotional spam has its own vocabulary and separates easily, while a credential-harvesting email is written to read exactly like a real security notice. The question is how far a text classifier gets, and precisely where it stops.',
    approachShort:
      'TF-IDF over word and character n-grams into a linear classifier. The structural warning signs are deliberately not learned. The source corpus had been stripped of casing and punctuation, so they are read at predict time by separate rules that explain the risk without ever overriding the model.',
    approach:
      'TF-IDF over word 1–2 grams and character 3–5 grams into a linear classifier, 453k features at 0.13% density, which is also why tree models were ruled out by argument rather than tried. The structural warning signs are deliberately not learned: the source corpus had been stripped of casing and punctuation, so uppercase ratio, exclamation counts and IP-address links are read at predict time by separate rules that explain the risk level without ever changing the model’s verdict.',
    outcome:
      'Both scores are published because the gap between them is the finding. The random-split number says how well the model learned this dataset; the leave-one-corpus-out number is the honest estimate of what happens on unfamiliar mail.',
    facts: [
      { label: 'Test accuracy / F1', value: '0.9939 / 0.9942', note: 'stratified random split' },
      { label: 'Leave-one-corpus-out', value: '0.865 mean', note: 'range 0.56–0.99 across six corpora' },
      { label: 'Dataset', value: '82,072 emails', note: 'six merged corpora, 52.2% spam' },
    ],
    tech: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'SciPy sparse', 'Streamlit'],
    evidence: [{ kind: 'repo', url: REPO.phishing }],
    links: { github: REPO.phishing },
    media: { schematic: 'phishing-pipeline' },
    status: 'complete',
    caseStudy: true,
  },
  {
    slug: 'temperature-electricity-demand',
    title: 'Temperature-driven electricity demand and its climate impact',
    category: 'Applied machine learning · Climate',
    tier: 'featured',
    summary:
      'Four years of Spanish hourly demand, used to ask what +1 to +3 °C of warming does to seasonal load and emissions.',
    problemShort:
      'A model that forecasts demand accurately is not automatically a model of what drives demand. A random forest given demand lags reaches R² 0.984, and puts 90.7% of its importance on the previous hour, 0.27% on temperature.',
    problem:
      'A model that forecasts demand accurately is not automatically a model of what drives demand. A random forest given demand lags reaches R² 0.984, and puts 90.7% of its feature importance on the previous hour and 0.27% on temperature. It cannot answer a question about temperature, because the demand history it leans on was itself recorded under the temperatures the counterfactual proposes to change.',
    approachShort:
      'So a second model was built with no demand history at all, weather and calendar features only, reaching R² 0.635. That weaker model is the one used for every scenario, because it is the only one capable of being asked the question.',
    approach:
      'So a second model was built with no demand history at all: weather and calendar features with heating and cooling degree-days, reaching R² 0.635. That weaker model is the one used for every scenario, because it is the only one capable of being asked the question. Every scenario figure carries a bootstrap confidence interval.',
    outcome:
      'Warming redistributes demand between seasons rather than changing the annual total. At +3 °C the gross seasonal movement is 1,111 MW against a net annual change of 32 MW, roughly 35× larger. Reporting only the annual figure produces a null result and hides the finding, which matters because grids are sized against peak load, not annual energy.',
    facts: [
      { label: 'Seasonal shift at +3 °C', value: '+512 MW summer / −404 MW winter', note: 'both exclude zero' },
      { label: 'Net annual change', value: 'not distinguishable from zero', note: 'at every warming level' },
      { label: 'Demand minimum', value: '19.0 °C', note: 'cooling +104.6, heating +78.7 MW/°C' },
      { label: 'Marginal emission factor', value: '0.207 kg CO₂/kWh', note: '12% below the 0.236 fleet average' },
      { label: 'Data', value: '35,028 hourly records', note: 'Spain 2015–2018; trained to 2017, tested on 2018' },
    ],
    tech: ['Python', 'scikit-learn', 'pandas', 'Degree-day features', 'Bootstrap CIs'],
    evidence: [
      { kind: 'repo', url: REPO.electricity },
      { kind: 'coursework', course: 'CSE 445, Machine Learning' },
    ],
    links: { github: REPO.electricity },
    media: { schematic: 'temperature-response' },
    status: 'complete',
    caseStudy: true,
  },
  {
    slug: 'telecom-churn-xai',
    title: 'Explainable churn prediction for business customers',
    category: 'Machine learning · Explainable AI',
    tier: 'featured',
    summary:
      'A controlled test of whether financial or service-engagement data predicts business churn, answered with a negative result and a recommendation not to deploy.',
    problem:
      'This dataset already has published research attached to it, so applying machine learning to it is not a contribution. The open question is what kind of customer information actually carries signal: money, or engagement.',
    approachShort:
      'Financial and engagement feature families held constant across three models, compared by 225 fits with paired t-tests across 25 matched folds. Four independent explainability methods were then run against the same model.',
    approach:
      'Financial and engagement feature families held constant across logistic regression, random forest and XGBoost, compared by 5-fold cross-validation repeated five times, 225 fits in total, with paired t-tests across the 25 matched folds. Three arithmetic identities in the data were tested first and used to prove the imputation strategy; a leakage suspect was tested and cleared rather than dropped; SMOTE was rejected on the grounds that synthesising minority points under near-zero signal manufactures structure that is not there. Four independent explainability methods were then run against the same model.',
    outcome:
      'Churn is close to unpredictable from these attributes, and that is reported as the primary finding. The do-nothing baseline beats every model on accuracy; one configuration ranked worse than random and is shown in the table. The model should not be deployed: at threshold 0.50 it raises 367 false alarms to catch 34 of 110 churners. The one reliable finding is model-independent: churn rises monotonically with customer value, roughly 1.6× from Iron to Platinum.',
    facts: [
      { label: 'Best ROC-AUC', value: '0.5697', note: 'random baseline 0.500' },
      { label: 'Best PR-AUC', value: '0.0882', note: 'no-skill floor 0.0651' },
      { label: 'Dataset', value: '8,453 business customers', note: '6.49% churn, 14.4 : 1 imbalance' },
      { label: 'Evaluation', value: '225 fits, paired t-tests', note: '25 matched CV folds' },
    ],
    tech: ['Python', 'scikit-learn', 'XGBoost', 'SHAP', 'pandas', 'Paired significance testing'],
    evidence: [{ kind: 'repo', url: REPO.churn }],
    links: { github: REPO.churn },
    media: { schematic: 'churn-attribution' },
    status: 'complete',
    caseStudy: true,
  },
  {
    slug: 'ecommerce-purchase-prediction',
    title: 'Temporal ML for e-commerce purchase prediction',
    category: 'Machine learning · Explainability',
    tier: 'featured',
    summary:
      'Predicting whether a customer buys again within 90 days from 1.85M real Amazon purchases, and testing whether demographics add anything at all.',
    problem:
      'Retention teams need to know who is about to go quiet. Most attempts at this quietly leak the future into the features and report a score that cannot survive contact with a deployment.',
    approachShort:
      'Framed as a temporal problem rather than generic classification: features only from before a fixed cutoff, target only from after it, test period chronologically after all training. Leakage prevention is verified empirically rather than asserted.',
    approach:
      'Framed as a temporal problem rather than generic classification: features come only from before a fixed cutoff, the target only from after it, and the test period falls chronologically after every training period. Leakage prevention is verified empirically rather than asserted, and SHAP is used to check which behaviours the model actually leans on.',
    outcome:
      'Behavioural history predicts future purchasing well, and demographics add essentially nothing once you know how someone shops, a negative result worth more than another tenth of a point of AUC. The strongest single predictor is simply days since last purchase.',
    facts: [
      { label: 'ROC-AUC', value: '0.9046', note: 'behavioural features, random forest' },
      { label: 'PR-AUC, minority class', value: '0.5280', note: '4.20× the 0.1258 baseline' },
      { label: 'Dataset', value: '1.85M purchases', note: '5,027 U.S. consumers, Harvard Dataverse' },
      { label: 'Demographics gain', value: '+0.0003 to +0.0033 ROC-AUC', note: 'effectively none' },
    ],
    tech: ['Python', 'pandas', 'scikit-learn', 'Random Forest', 'SHAP'],
    evidence: [{ kind: 'repo', url: REPO.ecommerce }],
    links: { github: REPO.ecommerce },
    media: { schematic: 'purchase-prediction' },
    status: 'complete',
    caseStudy: true,
  },
  {
    slug: 'evopath',
    title: 'EvoPath, evolutionary agent navigation',
    category: 'Search · Optimisation',
    tier: 'supporting',
    summary:
      'A population of agents finds its way through an obstacle course by selection, crossover and mutation. No network, no dataset, nothing trained.',
    problem:
      'Each agent is a fixed sequence of 200 movement instructions, so the space is 4²⁰⁰ and cannot be enumerated. An individual agent never learns anything; what improves across generations is the population’s collection of sequences.',
    approachShort:
      'Elitism plus roulette-wheel selection, with parameters set by measurement rather than intuition. A plateau was blamed on premature convergence; tripling mutation raised diversity from 0.75 to 0.96 and changed nothing. The real constraint was genome length.',
    approach:
      'Elitism plus roulette-wheel selection on a distance-based fitness function, with parameters set by measurement rather than intuition. The first hypothesis was wrong and the README says so: a plateau was blamed on premature convergence, tripling mutation raised diversity from 0.75 to 0.96, and the outcome did not change at all: both configurations stalled at exactly fitness 0.062. The real constraint was genome length, since the shortest route is ~51 moves and an evolved route wanders.',
    outcome:
      'A mutation sweep at four settings shows both extremes failing for opposite reasons: at 0.000 the gene pool collapses, and at 0.120 variation destroys good inherited sequences faster than selection accumulates them. High diversity turns out to be a means, not the objective.',
    facts: [
      { label: 'Search space', value: '4²⁰⁰ sequences' },
      { label: 'Typical solve', value: 'generation 23', note: '17 of 100 agents arriving by gen 29' },
      { label: 'Population mean fitness', value: '0.018 → 2.03', note: 'the whole population improved, not one agent' },
    ],
    tech: ['Python', 'Pygame', 'Genetic algorithms'],
    evidence: [{ kind: 'repo', url: REPO.evopath }],
    links: { github: REPO.evopath },
    media: { schematic: 'ga-evolution' },
    status: 'complete',
    caseStudy: true,
  },
  {
    slug: 'ai-pacman',
    title: 'AI Pac-Man, danger-aware A*',
    category: 'Search · Game AI',
    tier: 'supporting',
    summary:
      'A* pathfinding where ghost proximity raises the cost of a cell, so avoidance emerges from the cost function instead of from hard-coded rules.',
    problem:
      'Getting from A to B in a maze is the solved part. The interesting problem is which B to pick when some destinations are dangerous, and when to reconsider as the situation changes.',
    approachShort:
      'A* with a Manhattan heuristic plus one BFS flood fill per ghost for wall-aware distance maps, so danger raises the cost of a cell rather than triggering a rule. Candidates are shortlisted before routing instead of running A* to all 132 pellets.',
    approach:
      'A* with a Manhattan heuristic, implemented as pure logic with no Pygame dependency so it can be tested from a terminal, plus one BFS flood fill per ghost for wall-aware distance maps. Candidate pellets are shortlisted before routing rather than running A* to all 132. The planned path, the chosen target and the danger field are all drawn on screen, and a headless test suite measures behaviour across ghost configurations without opening a window.',
    facts: [
      { label: 'Maze', value: '21 × 15', note: '135 walkable cells, 132 pellets' },
      { label: 'Cleared', value: '2 of 6 runs', note: 'typically reaching ~90% of pellets' },
      { label: 'Tests', value: 'pathfinding, danger, escape, staleness', note: 'headless, measured not estimated' },
    ],
    tech: ['Python', 'Pygame', 'A*', 'BFS'],
    evidence: [{ kind: 'repo', url: REPO.pacman }],
    links: { github: REPO.pacman },
    media: { schematic: 'pacman-search' },
    status: 'complete',
    caseStudy: true,
  },
  {
    slug: 'document-scanner',
    title: 'Document scanner',
    category: 'Computer vision',
    tier: 'archive',
    summary:
      'Perspective correction and cleanup for photographed documents. An unfinished experiment, kept for the vision work.',
    problem:
      'A phone photo of a page is skewed, unevenly lit and cropped wrong. Fixing that is the whole job before text extraction is worth attempting.',
    approach:
      'Edge detection to find the page boundary, perspective transform to flatten it, then thresholding for a readable scan-like output.',
    tech: ['Python', 'OpenCV'],
    evidence: [{ kind: 'in-progress' }],
    links: {},
    media: {},
    status: 'paused',
    caseStudy: false,
  },
];

export const featured = projects.filter((p) => p.tier === 'featured');
export const supporting = projects.filter((p) => p.tier === 'supporting');
export const archive = projects.filter((p) => p.tier === 'archive');
export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);

/** The homepage shows this many featured projects; the rest live in /projects. */
export const HOMEPAGE_FEATURED_COUNT = 3;
