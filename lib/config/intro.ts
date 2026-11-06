/*
 * Copy for the 6-chapter 3D intro on Home.
 *
 * Every fact is derived from canonical config (profile, projects,
 * experience, skills, links), which mirrors
 * "Jordan Arya Leksana - Software Engineer Resume.pdf". Do not hardcode
 * metrics or claims here; add them to the canonical config first.
 */
import { EXPERIENCE } from "@/lib/config/experience";
import { CV_URL, EMAIL_MAILTO_URL, GITHUB_URL, LINKEDIN_URL, UPWORK_URL } from "@/lib/config/links";
import { LOOKING_FOR, PROFILE } from "@/lib/config/profile";
import { PROJECTS, type Project } from "@/lib/config/projects";
import { SKILLS_BY_CATEGORY } from "@/lib/config/skills";
import type { ProjectId } from "@/lib/tools/types";

function requireProject(id: ProjectId): Project {
  const project = PROJECTS.find((candidate) => candidate.id === id);

  if (!project) {
    throw new Error(`Intro config references unknown project "${id}".`);
  }

  return project;
}

function requireExperience(shortName: string) {
  const experience = EXPERIENCE.find((candidate) => candidate.shortName === shortName);

  if (!experience) {
    throw new Error(`Intro config references unknown experience "${shortName}".`);
  }

  return experience;
}

const intentcut = requireProject("intentcut");
const stationParfume = requireProject("station-parfume");
const teta = requireProject("teta");
const emqnet = requireProject("emqnet");
const dermsight = requireProject("dermsight");
const pertamina = requireExperience("Pertamina");
const pertaminaRole = pertamina.roles[0];
const tetaRole = requireExperience("ECS").roles.find((role) => role.title === "Software Development Lead");

const liveProjects = PROJECTS.filter((project) => /\blive\b/i.test(project.status));

export type IntroChapterId = "hello" | "build" | "now" | "impact" | "research" | "looking-for";

export interface IntroLink {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
}

export interface IntroChapter {
  id: IntroChapterId;
  /** Short label for the chapter rail. */
  label: string;
  eyebrow: string;
  title: string;
  lead?: string;
  body: string;
  facts: readonly string[];
  links?: readonly IntroLink[];
  /** How to interact with this chapter's 3D scene. */
  hint: string;
  /** Autoplay hold time before moving on (ms). */
  holdMs: number;
}

export const INTRO_CHAPTERS: readonly IntroChapter[] = [
  {
    id: "hello",
    label: "HELLO",
    eyebrow: "Hello, I'm",
    title: PROFILE.fullName,
    lead: PROFILE.headline,
    body: "I build and ship full-stack products, from Next.js frontends to Python and Node.js backends, and I bring in LLMs and machine learning where they add real value.",
    facts: [PROFILE.education.graduationLabel, `${PROFILE.location} · ${PROFILE.timezoneLabel}`, ...PROFILE.languages],
    hint: "Move your cursor through the particles · tap to re-form",
    holdMs: 7600,
  },
  {
    id: "build",
    label: "FULL-STACK",
    eyebrow: "What I do",
    title: "I build full-stack products and ship them.",
    body: `Frontend, APIs, data, deployment and AI integration, end to end. ${liveProjects.length} of my products are live in production: ${liveProjects.map((project) => project.title).join(", ")}.`,
    facts: [],
    hint: "Hover or tap a layer of the stack",
    holdMs: 7200,
  },
  {
    id: "now",
    label: "NOW",
    eyebrow: "What I'm doing now",
    title: `Now: ${intentcut.title}`,
    lead: "AI video editor · Meta Global AI Developer Hackathon 2026",
    body: "Raw footage in, an explainable first cut or highlight reel out. The model proposes the story, the backend validates every edit against real source timestamps, and FFmpeg renders the MP4.",
    facts: intentcut.highlights ?? [],
    links: [
      { label: "Watch demo", href: intentcut.demoUrl ?? "", external: true },
      { label: "GitHub", href: intentcut.repositoryUrl ?? GITHUB_URL, external: true },
      { label: "Case study", href: `/projects/${intentcut.slug}` },
    ],
    hint: "Drag the film strip to cut raw footage into a story",
    holdMs: 8200,
  },
  {
    id: "impact",
    label: "IMPACT",
    eyebrow: "Real-world impact",
    title: "Systems that left the lab.",
    body: "Industrial AI at an oil and gas field, and a smart-farming system running on a real rice field.",
    facts: [],
    hint: "Switch between the two deployments",
    holdMs: 7600,
  },
  {
    id: "research",
    label: "RESEARCH",
    eyebrow: "Research mindset",
    title: "I measure before I claim.",
    body: `My thesis, ${emqnet.title}, detects earthquake precursors in geomagnetic data from stations across Indonesia. ${dermsight.title} brings the same rigor to a live product.`,
    facts: [...(emqnet.highlights ?? []).slice(0, 2), `${dermsight.title}: ${(dermsight.highlights ?? [])[0] ?? dermsight.shortDescription}`],
    links: [
      { label: `${emqnet.title} case study`, href: `/projects/${emqnet.slug}` },
      { label: `${dermsight.title} live`, href: dermsight.demoUrl ?? `/projects/${dermsight.slug}`, external: Boolean(dermsight.demoUrl) },
    ],
    hint: "Drag to rotate the map · hover a station",
    holdMs: 7600,
  },
  {
    id: "looking-for",
    label: "LOOKING FOR",
    eyebrow: "What I'm looking for",
    title: "Let's build something real together.",
    body: "Software engineering comes first. Pick a role to see how my experience fits it, or grab my CV.",
    facts: [],
    hint: "Pick a role card",
    holdMs: 0,
  },
] as const;

/* ---------------- Chapter 2: the full-stack layers ---------------- */

export interface StackLayer {
  id: "frontend" | "api" | "data" | "devops" | "ai";
  label: string;
  color: string;
  items: readonly string[];
  /** Three short names printed on the 3D slab face (all from the CV skill list). */
  face: readonly string[];
  projects: readonly { title: string; live: boolean; slug: string }[];
}

const LAYER_TAGS: Record<StackLayer["id"], readonly string[]> = {
  frontend: ["Next.js", "React", "React Native", "TypeScript", "Tailwind CSS", "Flutter"],
  api: ["Backend", "FastAPI", "Flask", "NextAuth", "Prisma", "Go", "Gin", "REST API", "Tool calling"],
  data: ["PostgreSQL", "Redis", "Prisma", "Firestore"],
  devops: ["Docker", "Vercel", "FFmpeg"],
  ai: ["AI", "RAG", "EfficientNet", "TensorFlow", "LSTM Autoencoder"],
};

function projectsForLayer(id: StackLayer["id"]) {
  const tags = LAYER_TAGS[id];

  return PROJECTS
    .filter((project) => !/not in production/i.test(project.status) && project.tags.some((tag) => tags.includes(tag)))
    .slice(0, 3)
    .map((project) => ({ title: project.title, live: /\blive\b/i.test(project.status), slug: project.slug }));
}

export const STACK_LAYERS: readonly StackLayer[] = [
  { id: "frontend", label: "Frontend", color: "#e07856", items: SKILLS_BY_CATEGORY.frontend.items.slice(0, 4), face: ["React", "Next.js", "Tailwind"], projects: projectsForLayer("frontend") },
  { id: "api", label: "APIs & backend", color: "#dda83e", items: SKILLS_BY_CATEGORY.backend.items.filter((item) => ["Node.js", "FastAPI", "Flask", "NestJS", "REST APIs", "Prisma"].includes(item)), face: ["Node.js", "FastAPI", "Flask"], projects: projectsForLayer("api") },
  { id: "data", label: "Data", color: "#93ae86", items: SKILLS_BY_CATEGORY.database.items, face: ["PostgreSQL", "Redis", "MongoDB"], projects: projectsForLayer("data") },
  { id: "devops", label: "DevOps", color: "#7d8fb3", items: SKILLS_BY_CATEGORY.tooling.items.filter((item) => /docker|github actions|nginx|vps|vercel|cloudflare/i.test(item)), face: ["Docker", "CI/CD", "Nginx"], projects: projectsForLayer("devops") },
  { id: "ai", label: "AI integration", color: "#ede6d6", items: SKILLS_BY_CATEGORY.ai.items.filter((item) => /llm|ai sdk|rag|pytorch|tensorflow/i.test(item)), face: ["LLM", "RAG", "PyTorch"], projects: projectsForLayer("ai") },
] as const;

/* ---------------- Chapter 3: Station Parfume side note ---------------- */

export const ALSO_BUILDING = {
  title: stationParfume.title,
  summary: "Go e-commerce backend: security audit, schema v2, transactional checkout",
  status: stationParfume.status,
  href: `/projects/${stationParfume.slug}`,
} as const;

/** Real frames from IntentCut's rendered First Cut, in story order. */
export const INTENTCUT_CLIPS = [1, 2, 3, 4, 5, 6, 7].map((index) => `/projects/intentcut/clips/clip-0${index}.webp`);

/* ---------------- Chapter 4: deployments ---------------- */

export type ImpactMode = "pertamina" | "teta";

export interface ImpactDeployment {
  id: ImpactMode;
  tab: string;
  role: string;
  place: string;
  period: string;
  facts: readonly string[];
  href: string;
}

export const IMPACT_DEPLOYMENTS: readonly ImpactDeployment[] = [
  {
    id: "pertamina",
    tab: "Pertamina",
    role: pertaminaRole.title,
    place: pertamina.organization,
    period: pertaminaRole.period,
    facts: requireProject("pumpsentinel").highlights ?? [],
    href: "/projects/pumpsentinel",
  },
  {
    id: "teta",
    tab: "TETA",
    role: tetaRole?.title ?? teta.role,
    place: "TETA smart farming · Tuban, East Java",
    period: tetaRole?.period ?? teta.period ?? "",
    facts: teta.highlights ?? [],
    href: `/projects/${teta.slug}`,
  },
] as const;

/* ---------------- Chapter 6: roles ---------------- */

export type RoleAction =
  | { kind: "ask"; prompt: string }
  | { kind: "link"; href: string };

export const ROLE_CARDS = LOOKING_FOR.map((role) => ({
  ...role,
  action: (role.id === "software-engineer"
    ? { kind: "ask", prompt: "Evaluate Jordan for a Software Engineer role" }
    : role.id === "ai-engineer"
      ? { kind: "ask", prompt: "Evaluate Jordan for an AI Engineer role" }
      : role.id === "freelance"
        ? { kind: "link", href: UPWORK_URL }
        : { kind: "ask", prompt: "Is Jordan open to remote or international roles?" }) as RoleAction,
}));

/* ---------------- Recruiter bar ---------------- */

export const RECRUITER_LINKS = [
  { id: "cv", label: "Download CV", shortLabel: "CV", href: CV_URL, download: true },
  { id: "linkedin", label: "LinkedIn", shortLabel: "in", href: LINKEDIN_URL, external: true },
  { id: "upwork", label: "Upwork", shortLabel: "Up", href: UPWORK_URL, external: true },
  { id: "github", label: "GitHub", shortLabel: "GH", href: GITHUB_URL, external: true },
  { id: "email", label: "Email", shortLabel: "@", href: EMAIL_MAILTO_URL },
] as const;
