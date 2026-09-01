import { GITHUB_URL } from "@/lib/config/links";
import { PROJECT_IDS, type ProjectId, type ProjectSectionId } from "@/lib/tools/types";

export interface ProjectIllustration {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectResource {
  title: string;
  href: string;
  type: "paper" | "publication" | "report" | "poster" | "dataset" | "documentation" | "other";
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
  role: string;
  thumbnail: string;
  repositoryUrl?: string;
  demoUrl?: string;
  shortDescription: string;
  overview: { problem: string; approach: string; contribution: string };
  architecture: string;
  dataset: string;
  training: string;
  evaluation: string;
  chapterLabels?: Partial<Record<Exclude<ProjectSectionId, "projects-featured" | "projects-all" | "overview">, string>>;
  illustrations?: Partial<Record<ProjectSectionId, readonly ProjectIllustration[]>>;
  resources?: Partial<Record<ProjectSectionId, readonly ProjectResource[]>>;
}

export const PROJECTS: readonly Project[] = [
  {
    id: PROJECT_IDS.emqnet, slug: PROJECT_IDS.emqnet, title: "EMQNET", category: "Deep Learning", tags: ["AI", "Research", "Earthquake precursors"], featured: true, status: "Research project", role: "Deep learning pipeline developer", thumbnail: "/illustrations/samsan-tech.png", repositoryUrl: `${GITHUB_URL}/EMQNET`,
    shortDescription: "A multi-task deep learning pipeline using electromagnetic data to explore earthquake precursor signals.",
    overview: { problem: "Earthquake precursor analysis must distinguish complex ULF geomagnetic patterns while estimating useful event information across geographically distributed stations.", approach: "EMQNET transforms Pc3-band geomagnetic signals into scalograms and uses a multi-station, multi-task ResNet-18 pipeline for precursor detection and three-class magnitude estimation.", contribution: "Jordan designed and developed the thesis pipeline using BMKG geomagnetic observations and evaluated its predictions with task-level metrics and Grad-CAM interpretation." },
    architecture: "H, D, and Z geomagnetic components are filtered to the Pc3 band and transformed with Continuous Wavelet Transform. A shared ResNet-18 representation processes multi-station scalograms, an inter-station attention stage combines their evidence, and two task heads predict precursor presence and magnitude class.",
    dataset: "The thesis uses 1 Hz geomagnetic observations from BMKG stations across Indonesia from 2018–2025, paired with an earthquake catalogue. Data from 2018–2024 is used for training and validation, while 2025 observations support testing.",
    training: "The PyTorch workflow selects stations near each epicentre under quiet geomagnetic conditions, extracts pre-seismic windows, applies Pc3 filtering and CWT, then optimizes the shared residual backbone and both task heads in a multi-task setting.",
    evaluation: "The documented test result reports 88.38% precursor-detection accuracy with balanced precision and recall. Three-class magnitude estimation reaches 52.67% accuracy and remains limited by class imbalance and the weak direct relationship between anomaly amplitude and magnitude.",
    illustrations: { architecture: [{ src: "/projects/emqnet/emqnet-system-flow.svg", alt: "EMQNET system flow from BMKG geomagnetic signals through preprocessing, multi-station ResNet-18 and attention to precursor and magnitude outputs", caption: "Proposed thesis pipeline, simplified from acquisition to the two multi-task outputs." }] },
    resources: { overview: [
      { type: "paper", title: "Undergraduate thesis paper", href: "/projects/emqnet/thesis-paper-jordan-arya-leksana.pdf", description: "Concise paper covering the method, evaluation, and Grad-CAM interpretation." },
      { type: "documentation", title: "Thesis defence deck", href: "/projects/emqnet/thesis-defence-jordan-arya-leksana.pdf", description: "Presentation deck with the research flow, experiments, and findings." },
    ] },
  },
  {
    id: PROJECT_IDS.dermsight, slug: PROJECT_IDS.dermsight, title: "DermSight", category: "Computer Vision", tags: ["AI", "CNN", "Screening support"], featured: true, status: "Prototype", role: "Computer vision developer", thumbnail: "/illustrations/sandbox-swing.png", repositoryUrl: `${GITHUB_URL}/DermSight`,
    demoUrl: "https://dermsight.jordanlabs.my.id/",
    shortDescription: "An AI-assisted skin disease classification system designed to support early screening from dermatology images.",
    overview: { problem: "Early skin screening requires image classification that produces clear outputs while acknowledging the limits of an AI-assisted tool.", approach: "DermSight applies a CNN image-classification workflow with preprocessing and augmentation to improve robustness and generalization.", contribution: "Jordan developed and trained the computer-vision system and framed it as diagnostic support rather than a replacement for clinical judgment." },
    architecture: "The documented system is a Python computer-vision workflow built around CNN classification, image preprocessing, augmentation, and OpenCV utilities.",
    dataset: "The project uses dermatology image data. Publicly available sources do not document the dataset size, class split, or provenance in sufficient detail.",
    training: "Training includes preprocessing and augmentation intended to improve model robustness and generalization. Specific hyperparameters are not publicly documented yet.",
    evaluation: "Evaluation details are not publicly documented yet. The next useful step is a transparent class-level evaluation before any user-facing deployment.",
  },
  {
    id: PROJECT_IDS.ecsWebsite, slug: PROJECT_IDS.ecsWebsite, title: "ECS Website", aliases: ["ECS Laboratory Website"], category: "Web Development", tags: ["Next.js", "TypeScript", "Recruitment platform"], featured: true, status: "Web application", role: "Frontend developer", thumbnail: "/illustrations/samsan-tech.png", repositoryUrl: `${GITHUB_URL}/ECS_WEBSITE-oprec`,
    shortDescription: "A responsive recruitment and information website for the Electronics and Cybernetic Systems Laboratory.",
    overview: { problem: "Laboratory recruitment needs a clear public interface for presenting divisions, requirements, timelines, and applicant-facing information.", approach: "The project uses a responsive Next.js interface with structured recruitment content, interactive presentation, and Firebase-backed capabilities in the codebase.", contribution: "Jordan contributed to the frontend implementation and interaction design for the laboratory website." },
    architecture: "A TypeScript and Next.js application using the Pages Router, reusable React sections, form libraries, Firebase integration, and Framer Motion for selected interactions.",
    dataset: "Content is organized around the laboratory profile and recruitment journey. Firebase is included for application data and browser-side integration; exact production data contracts are not documented publicly.",
    training: "The interface combines responsive layouts, reusable content sections, form handling, and motion to turn the open-recruitment flow into a browsable web experience.",
    evaluation: "Formal usability metrics, a confirmed portfolio demo URL, and Jordan's exact contribution boundaries within the team are not documented in the repository.",
    chapterLabels: { dataset: "Content & integration", training: "Implementation", evaluation: "Delivery notes" },
  },
  {
    id: PROJECT_IDS.teta, slug: PROJECT_IDS.teta, title: "TETA — Teman Tanah", aliases: ["TETA", "Teman Tanah"], category: "IoT Mobile", tags: ["React Native", "Expo", "MQTT", "IoT"], featured: true, status: "Mobile application", role: "Frontend and IoT integration developer", thumbnail: "/illustrations/sandbox-swing.png", repositoryUrl: "https://github.com/ITDEVECS2025-2026/ABMAS_Frontend",
    shortDescription: "A mobile companion for monitoring soil conditions and bird activity from connected agricultural devices.",
    overview: { problem: "Field users need a practical way to read changing soil parameters and device events without working directly with raw IoT messages.", approach: "TETA turns MQTT telemetry into mobile dashboards for soil moisture, pH, temperature, device status, and bird-detection events.", contribution: "Jordan built the React Native frontend and documented the MQTT integration used to connect the interface with field devices." },
    architecture: "An Expo Router and React Native application organized into soil and bird experiences. MQTT.js communicates through WebSocket, Jotai owns lightweight state, and NativeWind with Gluestack UI provides the interface system.",
    dataset: "The application consumes live device payloads rather than a static dataset. MQTT topics provide soil and detection readings, which are parsed into typed UI state.",
    training: "Device screens, gauges, parameter cards, connection states, and bird-detection state are composed as reusable mobile UI. Android builds are prepared through Expo Application Services.",
    evaluation: "The repository documents the integration and Android build workflow. Field-test results, sensor calibration, and a public app distribution link are not documented yet.",
    chapterLabels: { dataset: "Telemetry", training: "Mobile implementation", evaluation: "Field readiness" },
    resources: { overview: [{ type: "publication", title: "Smart farming community-service paper", href: "/projects/teta/smart-farming-abmas-paper.pdf", description: "Integrated IoT soil monitoring and YOLOv5n bird-control system for Gapoktan Manunggal Rejeki." }] },
  },
  {
    id: PROJECT_IDS.jordanLabs, slug: PROJECT_IDS.jordanLabs, title: "Jordan Labs", category: "AI Product", tags: ["Next.js", "AI SDK", "RAG", "Tool calling"], featured: true, status: "Active product", role: "Product and full-stack AI engineer", thumbnail: "/illustrations/samsan-tech.png", repositoryUrl: `${GITHUB_URL}/jordanlabs`,
    shortDescription: "An AI-first interactive portfolio where Jordan AI can answer, navigate, evaluate role fit, and surface verified resources.",
    overview: { problem: "A conventional portfolio makes visitors translate static pages into their own understanding of a candidate's work and fit.", approach: "Jordan Labs makes a persistent AI guide the primary interaction while retaining accessible manual navigation and cinematic project chapters.", contribution: "Jordan designed and developed the product, including its portfolio knowledge, guarded AI flows, tool-driven navigation, generative UI, and presentation system." },
    architecture: "A Next.js application with a route-persistent React chat provider, Vercel AI SDK integrations, configurable model providers, grounded portfolio evidence, guarded entity resolution, and trusted client/server tool boundaries.",
    dataset: "Canonical profile, project, skill, experience, resource, and scene data remain application-owned. Retrieval uses documented portfolio knowledge rather than allowing the model to invent personal evidence.",
    training: "The product combines RAG, deterministic intent handling, schema-validated tools, role-fit evaluation, cross-route conversation state, and an accessible Framer Motion interface.",
    evaluation: "Lint and production builds are part of the repository workflow. Deterministic chat flows are covered through regression work; live model-dependent behavior still requires the configured provider to be available.",
    chapterLabels: { dataset: "Verified context", training: "AI implementation", evaluation: "Validation" },
  },
  {
    id: PROJECT_IDS.seaCatering, slug: PROJECT_IDS.seaCatering, title: "SEA Catering", category: "Full-stack Web", tags: ["Next.js", "Prisma", "NextAuth", "Subscriptions"], featured: true, status: "Live web application", role: "Full-stack developer", thumbnail: "/illustrations/sandbox-swing.png", repositoryUrl: `${GITHUB_URL}/sea-catering`, demoUrl: "https://sea-catering-beta.vercel.app",
    shortDescription: "A full-stack catering platform for browsing meal plans and managing recurring food subscriptions.",
    overview: { problem: "Recurring catering customers need more than a menu page: they need account access, configurable subscriptions, delivery schedules, and clear lifecycle controls.", approach: "SEA Catering combines a customer storefront with authenticated user and admin dashboards for subscription and delivery management.", contribution: "Jordan developed the full-stack application across the customer journey, server routes, authentication, persistence, and dashboard experiences." },
    architecture: "A Next.js App Router application with NextAuth, Prisma, relational persistence, validated API routes, role-aware user and admin areas, and reusable React interface primitives.",
    dataset: "Prisma models manage users, subscriptions, testimonials, contacts, and delivery-related records. API routes provide the application boundary for those persisted workflows.",
    training: "The implementation covers registration and Google sign-in, meal-plan discovery, subscription creation and lifecycle actions, delivery schedules, profiles, testimonials, contacts, and admin metrics.",
    evaluation: "A public Vercel deployment is available. Automated test coverage and production usage metrics are not documented in the repository.",
    chapterLabels: { dataset: "Data model", training: "Product flows", evaluation: "Delivery notes" },
  },
  {
    id: PROJECT_IDS.chatty, slug: PROJECT_IDS.chatty, title: "Chatty", aliases: ["ChatApp", "ChatApp Flutter Firebase"], category: "Mobile Development", tags: ["Flutter", "Firebase", "Firestore", "Real-time chat"], featured: true, status: "Mobile application", role: "Flutter developer", thumbnail: "/illustrations/samsan-tech.png", repositoryUrl: `${GITHUB_URL}/chatappFlutterFirebase`,
    shortDescription: "A cross-platform Flutter chat application with Google authentication and real-time conversations backed by Firebase.",
    overview: { problem: "A messaging experience needs authenticated identity, consistent conversation lists, and message updates that remain synchronized between users.", approach: "Chatty uses Firebase Authentication and Cloud Firestore streams to provide Google sign-in, conversation creation, and real-time messaging.", contribution: "Jordan implemented the Flutter application, its Firebase services, responsive screens, routing, and core conversation flows." },
    architecture: "A Flutter application with GoRouter navigation, Firebase service boundaries, Firestore stream queries, responsive sizing utilities, and presentation screens for login, chat lists, and chat detail.",
    dataset: "Cloud Firestore stores chat documents, participants, message subcollections, timestamps, and last-message summaries. Firebase Authentication supplies the active user identity.",
    training: "The app implements Google sign-in, deterministic chat IDs, live message streams, new-chat creation, conversation ordering, message sending, and message deletion.",
    evaluation: "The repository contains Android, iOS, web, desktop, and Firebase configuration targets. A public store build or hosted demo is intentionally not listed for this native application.",
    chapterLabels: { dataset: "Realtime data", training: "Conversation flows", evaluation: "Platform status" },
  },
] as const;
