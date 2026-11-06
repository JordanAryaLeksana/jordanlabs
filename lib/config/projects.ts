import { GITHUB_URL, PORTFOLIO_URL } from "@/lib/config/links";
import { PROJECT_IDS, type ProjectId, type ProjectSectionId } from "@/lib/tools/types";

export interface ProjectIllustration {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectResource {
  title: string;
  href: string;
  type: "paper" | "publication" | "report" | "poster" | "dataset" | "documentation" | "video" | "other";
  description?: string;
}

export interface Project {
  id: ProjectId;
  slug: ProjectId;
  title: string;
  aliases?: readonly string[];
  category: string;
  tags: readonly string[];
  featured: boolean;
  status: string;
  period?: string;
  role: string;
  /** Real project visual. Projects without one render a generated cover. */
  thumbnail?: string;
  repositoryUrl?: string;
  demoUrl?: string;
  /** Label for the demo button when the demo is not a live app (e.g. a video). */
  demoLabel?: string;
  shortDescription: string;
  /** Short, verifiable proof points (CV / repository facts) used by cards and the intro. */
  highlights?: readonly string[];
  overview: { problem: string; approach: string; contribution: string };
  architecture: string;
  dataset: string;
  training: string;
  evaluation: string;
  chapterLabels?: Partial<Record<Exclude<ProjectSectionId, "projects-featured" | "projects-all" | "overview">, string>>;
  illustrations?: Partial<Record<ProjectSectionId, readonly ProjectIllustration[]>>;
  resources?: Partial<Record<ProjectSectionId, readonly ProjectResource[]>>;
}

/*
 * Source of truth, in priority order:
 * 1. "Jordan Arya Leksana - Software Engineer Resume.pdf" (public/)
 * 2. Upwork portfolio submission (Jordan Labs, DermSight, ECS, TETA, Pertamina)
 * 3. Public GitHub repositories and their READMEs
 * Array order is display order (software engineering first).
 */
export const PROJECTS: readonly Project[] = [
  {
    id: PROJECT_IDS.intentcut, slug: PROJECT_IDS.intentcut, title: "IntentCut",
    aliases: ["Intent Cut", "intent-cut", "AI Storytelling Director", "AI video editor"],
    category: "Full-stack AI", tags: ["AI", "Backend", "FastAPI", "PostgreSQL", "FFmpeg", "Next.js"], featured: true,
    status: "Hackathon submission", period: "Oct – Nov 2026", role: "Solo full-stack engineer",
    thumbnail: "/projects/intentcut/cover.webp", repositoryUrl: `${GITHUB_URL}/intentcut`,
    demoUrl: "https://youtu.be/sISMP5Q1CoE", demoLabel: "WATCH DEMO",
    shortDescription: "An AI video editor built solo in 10 days for the Meta Global AI Developer Hackathon 2026. It turns raw footage into an explainable first cut or a short highlight reel that the creator can revise and export as MP4.",
    highlights: [
      "Built solo in 10 days for the Meta Global AI Developer Hackathon 2026 (Indie track)",
      "A 4-hour, 6.4 GB recording became a ~56-second highlight reel",
      "Lease-based background job worker with heartbeats and crash recovery",
      "Every AI-proposed edit is validated against real source timestamps before FFmpeg renders",
    ],
    overview: {
      problem: "For travel creators, solo filmmakers and educators, the hardest part of editing often comes before fine-grained cutting: deciding which moments matter and what order they belong in.",
      approach: "The creator describes the story they want. Meta's Muse Spark model describes short windows of the footage, a Story Director proposes which windows to use and in what order, and the backend validates that plan against the real source files before FFmpeg renders it. The creator can then revise the story and export again.",
      contribution: "Jordan designed and built the whole product solo between 26 October and 4 November 2026: the Next.js studio, the FastAPI backend, the PostgreSQL data model and migrations, the AI job worker and the FFmpeg rendering pipeline.",
    },
    architecture: "A Next.js and React studio talks to a FastAPI (Python 3.12) backend built with Pydantic v2 and SQLAlchemy 2.1 on PostgreSQL 17 with versioned SQL migrations. Paid AI calls never run inside HTTP requests: a separate background worker claims jobs with database leases and heartbeats and recovers from crashes. The backend, not the model, owns file identities, original timestamps, budgets and edit-plan validation, so invalid or invented references are rejected before FFmpeg renders and checks the H.264/AAC MP4.",
    dataset: "Inputs are the creator's own uploaded clips (AI First Cut) or one long video (AI Highlights). Uploads are idempotent, so a resent browser request is stored only once. For long videos, the highlights search samples up to 48 small frames across the full timeline and up to 24 more around promising matches, then picks non-overlapping candidate moments.",
    training: "Both workflows share one pipeline: cut short time windows, let Muse Spark describe each one, let the Story Director choose and order them, validate the plan, render with FFmpeg. On top of that the studio supports prompt-based revisions, editable captions with subtitled export (Muse voice transcription) and generated cover images (Muse Image). Per-job limits cap media files, windows and inference calls, and paid processing stays off unless explicitly enabled.",
    evaluation: "A developer-run audit on 3 November 2026 recorded 479 passing unit tests and 264 passing backend integration tests, a production Next.js build and real MP4 generation. In testing, a 4-hour, 6.4 GB walking video became a ~56-second highlight reel (8 candidate moments, 7 selected). Moving preview staging to same-filesystem hard links fixed a bug that had filled about 75 GB of temporary copies. IntentCut runs locally by design and is not publicly deployed because it has no user authentication.",
    chapterLabels: { dataset: "Footage & inputs", training: "AI pipeline", evaluation: "Verification" },
    illustrations: { overview: [{ src: "/projects/intentcut/cover.webp", alt: "IntentCut studio with a storyboard of clips in story order", caption: "Demo film cover: from footage to story. You direct, AI assists." }] },
    resources: { overview: [{ type: "video", title: "IntentCut demo film", href: "https://youtu.be/sISMP5Q1CoE", description: "174-second walkthrough of AI First Cut, AI Highlights, captions and real MP4 exports." }] },
  },
  {
    id: PROJECT_IDS.jordanLabs, slug: PROJECT_IDS.jordanLabs, title: "Jordan Labs",
    aliases: ["Jordan AI", "jordanlabs", "this portfolio", "AI portfolio agent"],
    category: "Full-stack AI", tags: ["AI", "Next.js", "RAG", "Tool calling", "Redis", "Docker"], featured: true,
    status: "Live web application", period: "2026", role: "Full-stack software engineer",
    repositoryUrl: `${GITHUB_URL}/jordanlabs`, demoUrl: PORTFOLIO_URL,
    shortDescription: "This portfolio. Jordan AI answers questions with hybrid RAG over verified portfolio data and uses schema-validated tool calls to navigate pages, filter projects, open resources and assess role fit.",
    highlights: [
      "Hybrid RAG (lexical + embeddings) over curated, application-owned knowledge",
      "Schema-validated tool calling for navigation, filtering, resources and role-fit evaluation",
      "Redis rate limits, daily request quotas and token-budget tracking",
      "Docker image built in GitHub Actions, pushed to GHCR, deployed to a Linux VPS behind Nginx",
    ],
    overview: {
      problem: "A conventional portfolio makes visitors translate static pages into their own understanding of a candidate's work and fit.",
      approach: "Jordan Labs makes a conversational guide the primary interface while keeping accessible manual navigation. Deterministic routing handles links, the CV, navigation and known projects before any free-form model call.",
      contribution: "Jordan designed, built and deployed the product: the portfolio knowledge, retrieval, guarded AI flows, tool-driven navigation, generative UI, the 3D intro and the deployment pipeline.",
    },
    architecture: "A Next.js 16 / React 19 application with a route-persistent chat provider on the Vercel AI SDK and an OpenAI-compatible model provider. Retrieval combines lexical scoring with embedding similarity over Markdown knowledge. Tools are schema-validated with trusted client/server boundaries and allowlisted external links. It ships as a Docker image behind Nginx and HTTPS on a Linux VPS, with Redis for rate limiting.",
    dataset: "Profile, projects, skills, experience and resources are application-owned configuration, and the retrieval layer reads matching Markdown knowledge. The model answers from that evidence instead of inventing personal facts.",
    training: "Deterministic intent routing, entity guards against invented projects, skills and employers, schema-validated tool calls, a rule-based role-fit evaluation that the model only rephrases, and conversation state that persists across pages.",
    evaluation: "Redis-backed per-minute and per-day rate limits plus a daily token budget control LLM cost. GitHub Actions typechecks, lints and builds the Docker image, pushes it to GHCR and deploys it to the VPS with a health check.",
    chapterLabels: { dataset: "Verified context", training: "AI implementation", evaluation: "Production safeguards" },
  },
  {
    id: PROJECT_IDS.seaCatering, slug: PROJECT_IDS.seaCatering, title: "SEA Catering",
    aliases: ["SEA Catering platform", "meal subscription platform"],
    category: "Full-stack Web", tags: ["Next.js", "TypeScript", "Prisma", "NextAuth", "Vercel"], featured: true,
    status: "Live web application", period: "2025", role: "Full-stack developer",
    thumbnail: "/projects/sea-catering/cover.webp", repositoryUrl: `${GITHUB_URL}/sea-catering`, demoUrl: "https://sea-catering-beta.vercel.app",
    shortDescription: "A full-stack meal subscription platform: meal plans, subscription create, pause and cancel flows, delivery schedules, and user and admin dashboards.",
    highlights: [
      "Email and Google sign-in with NextAuth",
      "Role-based user and admin dashboards with business metrics",
      "Validated API routes over a Prisma data model",
    ],
    overview: {
      problem: "Recurring catering customers need more than a menu page: they need accounts, configurable subscriptions, delivery schedules and clear controls to pause or cancel.",
      approach: "SEA Catering combines a customer storefront with authenticated user and admin dashboards for subscription and delivery management.",
      contribution: "Jordan built the full-stack application: the customer journey, server routes, authentication, persistence and dashboards.",
    },
    architecture: "A Next.js App Router application with NextAuth, Prisma, relational persistence, validated API routes, role-aware user and admin areas, and reusable React interface primitives, deployed on Vercel.",
    dataset: "Prisma models manage users, subscriptions, testimonials, contacts and delivery-related records. API routes are the application boundary for those workflows.",
    training: "The implementation covers registration and Google sign-in, meal-plan discovery, subscription creation, pause and cancellation, delivery schedules, profiles, testimonials, contacts and admin metrics.",
    evaluation: "A public Vercel deployment is live. Automated test coverage and production usage metrics are not documented in the repository.",
    chapterLabels: { dataset: "Data model", training: "Product flows", evaluation: "Delivery notes" },
  },
  {
    id: PROJECT_IDS.dermsight, slug: PROJECT_IDS.dermsight, title: "DermSight",
    aliases: ["Derm Sight", "skin screening app"],
    category: "Computer Vision", tags: ["AI", "Flask", "TensorFlow", "EfficientNet", "RAG", "Docker"], featured: true,
    status: "Live web application", period: "2026", role: "AI/ML and full-stack engineer",
    thumbnail: "/projects/dermsight/cover.webp", repositoryUrl: `${GITHUB_URL}/DermSight`, demoUrl: "https://dermsight.jordanlabs.my.id/",
    shortDescription: "A mobile-first web app that classifies 22 skin conditions from a photo with EfficientNet-B2 and explains the result with a local LLM grounded by RAG. It is an education tool, not a medical diagnosis.",
    highlights: [
      "EfficientNet-B2 classifier across 22 skin-condition categories",
      "Explanations from a local LLM grounded by a curated knowledge base (RAG)",
      "Photos processed in memory and never stored; CSRF protection, upload limits, security headers",
      "Deployed with Docker and GitHub Actions to a Linux VPS",
    ],
    overview: {
      problem: "People, including communities in Indonesia's remote (3T) regions, need simple early information about skin conditions from a photo, while the tool stays clear that it does not replace a doctor.",
      approach: "DermSight classifies an uploaded or captured skin photo with a transfer-learned EfficientNet-B2 model, then lets the user request an educational explanation generated by a local LLM from a curated skin-knowledge base.",
      contribution: "Jordan trained and evaluated the computer-vision model, built the Flask web application and the RAG explanation flow, and hardened and deployed the production app.",
    },
    architecture: "A Flask application served by Gunicorn behind Nginx runs TensorFlow inference with EfficientNet-B2 on CPU. Explanations come from an Ollama-hosted LLM grounded by a curated knowledge base. Images are validated before inference and processed in memory. An aspiration form forwards community feedback to the designated stakeholder by email.",
    dataset: "The model is trained on dermatology image data across 22 condition categories. Dataset size, class split and provenance are not publicly documented in detail.",
    training: "The workflow covers data preparation and augmentation, transfer learning, validation, hyperparameter tuning and model evaluation.",
    evaluation: "The production app is live with upload validation, CSRF protection, secure headers and health monitoring. Class-level evaluation metrics are not published yet.",
    chapterLabels: { dataset: "Dataset", training: "Model training", evaluation: "Production readiness" },
  },
  {
    id: PROJECT_IDS.teta, slug: PROJECT_IDS.teta, title: "TETA — Teman Tanah",
    aliases: ["TETA", "Teman Tanah", "smart farming"],
    category: "IoT Mobile", tags: ["React Native", "IoT", "MQTT", "LoRa", "YOLOv5"], featured: true,
    status: "Field deployment", period: "Jun – Nov 2025", role: "Software development and IoT integration lead",
    repositoryUrl: "https://github.com/ITDEVECS2025-2026/ABMAS_Frontend",
    shortDescription: "A smart-farming system for rice farmers in Tuban, East Java: real-time soil monitoring plus 24/7 computer-vision bird-pest deterrence, shipped to a 1-hectare field with 5 IoT nodes.",
    highlights: [
      "Shipped to a 1-hectare rice field in Tuban, East Java (5 IoT nodes)",
      "Real-time pH, NPK, EC, temperature and humidity monitoring",
      "24/7 YOLOv5 bird-pest deterrence",
      "User guide registered as copyright No. 001036674",
    ],
    overview: {
      problem: "Rice farmers need data-driven fertilizer decisions and protection from bird attacks, which can cause yield losses of up to 50%, without guarding the field manually.",
      approach: "TETA connects field sensors and an edge vision system to a mobile dashboard: soil data travels from IoT nodes over LoRa and MQTT to a React Native app, while a YOLOv5 model runs bird-pest deterrence around the clock.",
      contribution: "Jordan led the software and IoT integration: he designed the end-to-end architecture (mobile app, backend server, ESP32–LoRa–MQTT communication and Raspberry Pi edge devices) and wrote the user guide so non-technical farmers can run the system on their own.",
    },
    architecture: "ESP32 sensor nodes send readings over LoRa to a gateway that publishes to MQTT. Raspberry Pi edge devices run the YOLOv5 bird detection. The React Native (Expo) app subscribes to MQTT over WebSocket and renders soil and detection dashboards.",
    dataset: "The app consumes live device payloads rather than a static dataset: MQTT topics carry pH, NPK, EC, temperature, humidity and bird-detection events, parsed into typed UI state.",
    training: "The mobile monitoring workflow covers five field nodes, letting farmers check soil conditions and device connectivity. Android builds are produced with Expo Application Services.",
    evaluation: "The system was shipped to a 1-hectare rice field in Tuban with 5 IoT nodes, reducing fertilizer waste and manual field guarding. The user guide is registered intellectual property (Indonesian copyright No. 001036674, 2025).",
    chapterLabels: { dataset: "Telemetry", training: "Mobile implementation", evaluation: "Field results" },
    resources: { overview: [{ type: "publication", title: "Smart farming community-service paper", href: "/projects/teta/smart-farming-abmas-paper.pdf", description: "IoT-based soil quality and pest monitoring for Gapoktan Manunggal Rejeki (BIMA/ITS, 2025)." }] },
  },
  {
    id: PROJECT_IDS.ecsWebsite, slug: PROJECT_IDS.ecsWebsite, title: "ECS Website",
    aliases: ["ECS Laboratory Website", "ECS Lab Platform", "EPTA portal"],
    category: "Web Development", tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"], featured: true,
    status: "Web application", period: "2024 – 2025", role: "Frontend tech lead",
    thumbnail: "/projects/ecs-website/cover.webp", repositoryUrl: "https://github.com/ITDEVECS2025-2026/Frontend-", demoUrl: "https://ecs-website-remake.vercel.app/",
    shortDescription: "The platform of the Embedded System and Cyber-Physical Laboratory at ITS: the official lab profile, the EPTA event portal and the open-recruitment system.",
    highlights: [
      "Led frontend for the lab website and the EPTA event portal, serving 100+ participants",
      "Reusable UI components and REST integrations for auth, registration, uploads and submissions",
    ],
    overview: {
      problem: "The laboratory needed one public platform for its profile, its annual programming training (EPTA) and its open recruitment.",
      approach: "A Next.js and Tailwind CSS frontend with reusable components, integrated with a Django backend for EPTA and Firebase for recruitment.",
      contribution: "As Frontend Tech Lead, Jordan designed the component architecture, chose the frontend stack and coordinated with the backend developers. As IT Project Manager he later led delivery of ECS Website 2.0 and the EPTA dashboard.",
    },
    architecture: "A TypeScript and Next.js frontend with reusable React sections and form handling. It integrates REST endpoints for authentication, registration, module and certificate uploads, assignments and task submissions.",
    dataset: "Content is organized around the laboratory profile, the EPTA event journey and recruitment. Backend teams owned the Django (EPTA) and Firebase (recruitment) services.",
    training: "The interface turns registration, uploads, assignments and recruitment into a responsive web experience built from shared components.",
    evaluation: "The EPTA portal served 100+ event participants. Formal usability metrics are not documented.",
    chapterLabels: { dataset: "Content & integration", training: "Implementation", evaluation: "Delivery notes" },
  },
  {
    id: PROJECT_IDS.emqnet, slug: PROJECT_IDS.emqnet, title: "EMQNET",
    aliases: ["EMQ NET", "earthquake precursor", "undergraduate thesis"],
    category: "Deep Learning", tags: ["AI", "PyTorch", "ResNet", "Research"], featured: true,
    status: "Completed thesis", period: "Dec 2025 – Jul 2026", role: "Deep learning researcher (thesis author)",
    repositoryUrl: `${GITHUB_URL}/EMQNET`,
    shortDescription: "Jordan's undergraduate thesis: a ResNet-based PyTorch pipeline that detects earthquake precursors in geomagnetic data from stations across Indonesia, automating a manual analysis method.",
    highlights: [
      "25,000+ events from 24 geomagnetic stations in Indonesia",
      "88.25% accuracy and 88.4% F1 on precursor detection (CV)",
      "First-author manuscript in preparation (2026)",
    ],
    overview: {
      problem: "Earthquake precursor analysis must separate subtle ULF geomagnetic patterns from noise across geographically distributed stations, and it is traditionally done by hand.",
      approach: "EMQNET filters H, D and Z geomagnetic components to the Pc3 band, turns them into scalograms with a Continuous Wavelet Transform, and feeds multi-station scalograms to a shared ResNet-18 with inter-station attention and two task heads: precursor detection and magnitude class.",
      contribution: "Jordan designed and built the thesis pipeline on BMKG geomagnetic observations, trained and evaluated it, and interpreted predictions with Grad-CAM.",
    },
    architecture: "Multi-station scalograms pass through a shared ResNet-18 representation, an inter-station attention stage combines their evidence, and two heads predict precursor presence and a three-class magnitude.",
    dataset: "1 Hz geomagnetic observations from BMKG stations across Indonesia (2018–2025) paired with an earthquake catalogue. For each event the three nearest stations within 500 km under quiet geomagnetic conditions are selected. 2018–2024 data is used for training and validation, 2025 for testing.",
    training: "The PyTorch workflow extracts pre-seismic windows, applies Pc3 filtering and CWT, then optimizes the shared residual backbone and both task heads together in a multi-task setting.",
    evaluation: "Jordan's CV reports 88.25% accuracy and 88.4% F1 for precursor detection across 25,000+ events from 24 stations. The thesis paper reports 88.38% precursor-detection accuracy on its test split, while three-class magnitude estimation reaches 52.67% and remains limited by class imbalance.",
    illustrations: { architecture: [{ src: "/projects/emqnet/emqnet-system-flow.svg", alt: "EMQNET system flow from BMKG geomagnetic signals through preprocessing, multi-station ResNet-18 and attention to precursor and magnitude outputs", caption: "Thesis pipeline, simplified from acquisition to the two multi-task outputs." }] },
    resources: { overview: [
      { type: "paper", title: "Undergraduate thesis paper", href: "/projects/emqnet/thesis-paper-jordan-arya-leksana.pdf", description: "Method, evaluation and Grad-CAM interpretation." },
      { type: "documentation", title: "Thesis defence deck", href: "/projects/emqnet/thesis-defence-jordan-arya-leksana.pdf", description: "Research flow, experiments and findings." },
    ] },
  },
  {
    id: PROJECT_IDS.pumpsentinel, slug: PROJECT_IDS.pumpsentinel, title: "PumpSentinel",
    aliases: ["Pump Sentinel", "LEADS system", "SPE-224966-MS", "solvent pump anomaly detection", "Pertamina anomaly detection"],
    category: "Industrial AI", tags: ["AI", "TensorFlow", "LSTM Autoencoder", "Time series", "Rule-based"], featured: true,
    status: "Internship project", period: "Jan – May 2025", role: "AI engineer intern",
    shortDescription: "An anomaly-detection and early-warning system for industrial solvent pumps, built during Jordan's AI Engineer internship at PT Pertamina EP Cepu and connected to the plant's Distributed Control System.",
    highlights: [
      "5,000+ anomaly events processed and validated with field operators",
      "85% validation accuracy for anomaly classification",
      "Contributed to zero lost production hours on the monitored pump",
      "Estimated potential cost savings of up to USD 476K; presented as SPE-224966-MS (LEADS)",
    ],
    overview: {
      problem: "Frequent mechanical-seal leaks in the plant's solvent pumps (including pumps 9027 A/B) disrupted production.",
      approach: "Three subsystems connected to the plant's Distributed Control System (DCS): an LSTM Autoencoder that detects anomalies from multivariate sensor data, a supervised classifier that categorizes them, and a rule-based expert system that triggers early warnings and prescriptive maintenance.",
      contribution: "Jordan built the anomaly-detection pipeline in Python and TensorFlow, processed and validated anomaly events with field operators, trained the classifier, encoded pump specifications and operator knowledge as rules, and contributed to the methodology, experiments and manuscript.",
    },
    architecture: "Multivariate time series (pressure, flow rate, temperature) from the DCS feed an LSTM Autoencoder; reconstruction error (MAE) above a threshold flags an anomaly. A supervised model predicts the failure type, and a rule engine combines sensor conditions with engineering best practice to raise real-time alerts.",
    dataset: "About one year of sensor data from the DCS for three industrial solvent pumps, plus historical maintenance logs used to label failure types.",
    training: "The autoencoder learns normal pump behaviour; more than 5,000 detected anomaly events were reviewed with field operators to build labelled categories for the supervised classifier.",
    evaluation: "The classifier reached 85% validation accuracy. The work contributed to zero lost production hours on the monitored pump, with estimated potential cost savings of up to USD 476K, and was presented as SPE-224966-MS (LEADS: Leading Equipment Anomaly Detection System). Source code is not public because of corporate confidentiality.",
    chapterLabels: { dataset: "Sensor data", training: "Detection & classification", evaluation: "Impact" },
    resources: { overview: [{ type: "paper", title: "LEADS manuscript (SPE-224966-MS)", href: "/projects/pumpsentinel/leads-manuscript-11-feb-2025.pdf", description: "Leading Equipment Anomaly Detection System. Jordan contributed to research and technical writing." }] },
  },
  {
    id: PROJECT_IDS.stationParfume, slug: PROJECT_IDS.stationParfume, title: "Station Parfume",
    aliases: ["Station Perfume", "Station Parfum", "perfume e-commerce"],
    category: "Backend", tags: ["Go", "Gin", "PostgreSQL", "Redis", "Payments", "Backend"], featured: true,
    status: "In development, not in production yet", period: "2025 – now", role: "Backend engineer",
    repositoryUrl: `${GITHUB_URL}/Station-parfume-backend`,
    shortDescription: "A Go backend for a perfume-refill seller's web store that mirrors its Shopee catalog. It is being rebuilt for production: security audit, schema v2, a transactional checkout and a safer payment flow. Not live yet.",
    highlights: [
      "Security audit of ~3.7k lines of Go and an 11-milestone modernisation roadmap",
      "Schema v2: 18 PostgreSQL tables, verified against 36 scenarios",
      "Transactional checkout with price snapshots; amount taken from the order, not the client",
    ],
    overview: {
      problem: "The seller already sells on Shopee. The website should show the same titles, variants (aroma and size), prices and SKUs, and take orders and payments safely.",
      approach: "Incremental modernisation of the existing Go codebase, guided by an evidence-based audit and an 11-milestone roadmap instead of a rewrite from scratch.",
      contribution: "Jordan owns the backend: he audited the original code, designed schema v2, rewrote the modules on it, and is hardening startup, authentication and payments.",
    },
    architecture: "Go with Gin and GORM over PostgreSQL, Redis for caching and a JWT blacklist, JWT access and refresh tokens, Google OAuth2 and bcrypt. Checkout runs in a database transaction that snapshots prices and handles stock. A Midtrans to Xendit migration is designed behind a feature flag, where only verified webhooks can mark an order as paid. A Next.js storefront in a separate repository consumes the API.",
    dataset: "Schema v2 has 18 PostgreSQL tables modelled on Shopee listings (products with up to two variation tiers, and models with SKU and price), prices stored as integer rupiah, foreign keys, CHECK constraints and soft deletes. An idempotent CSV seeder with a dry-run mode loads the 50-aroma catalog.",
    training: "The audit found an authentication bypass (an error helper that never aborted the request), unauthenticated admin endpoints, SQL injection through path parameters, credentials in git history and an order route that was never registered. Fixes ship milestone by milestone, starting with build and startup safety.",
    evaluation: "Schema v2 passed 36 test scenarios on PostgreSQL 17. The store is not in production yet: the payment migration and the remaining milestones are still in progress.",
    chapterLabels: { dataset: "Data model", training: "Audit & hardening", evaluation: "Status" },
  },
  {
    id: PROJECT_IDS.chatty, slug: PROJECT_IDS.chatty, title: "Chatty", aliases: ["ChatApp", "ChatApp Flutter Firebase"],
    category: "Mobile Development", tags: ["Flutter", "Firebase", "Firestore", "Real-time chat"], featured: true,
    status: "Mobile application", period: "2025", role: "Flutter developer", repositoryUrl: `${GITHUB_URL}/chatappFlutterFirebase`,
    shortDescription: "A cross-platform Flutter chat application with Google authentication and real-time conversations backed by Firebase.",
    overview: { problem: "A messaging experience needs authenticated identity, consistent conversation lists, and message updates that remain synchronized between users.", approach: "Chatty uses Firebase Authentication and Cloud Firestore streams to provide Google sign-in, conversation creation, and real-time messaging.", contribution: "Jordan implemented the Flutter application, its Firebase services, responsive screens, routing, and core conversation flows." },
    architecture: "A Flutter application with GoRouter navigation, Firebase service boundaries, Firestore stream queries, responsive sizing utilities, and presentation screens for login, chat lists, and chat detail.",
    dataset: "Cloud Firestore stores chat documents, participants, message subcollections, timestamps, and last-message summaries. Firebase Authentication supplies the active user identity.",
    training: "The app implements Google sign-in, deterministic chat IDs, live message streams, new-chat creation, conversation ordering, message sending, and message deletion.",
    evaluation: "The repository contains Android, iOS, web, desktop, and Firebase configuration targets. A public store build or hosted demo is intentionally not listed for this native application.",
    chapterLabels: { dataset: "Realtime data", training: "Conversation flows", evaluation: "Platform status" },
  },
] as const;
