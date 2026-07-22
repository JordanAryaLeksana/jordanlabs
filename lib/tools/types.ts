/**
 * Identifier bersama lintas tool/route/komponen (CLAUDE.md §8): satu-satunya
 * sumber kebenaran supaya schema tool chatbot, route Next.js, dan komponen
 * UI tidak lepas sinkron. Field lain (SECTION_IDS, PROJECT_IDS,
 * SKILL_CATEGORY_IDS) ditambahkan saat halaman yang membutuhkannya dibangun.
 */
export const PAGE_ROUTES = {
  home: "/",
  about: "/about",
  projects: "/projects",
  experience: "/experience",
  contact: "/contact",
} as const;

export const SECTION_IDS = {
  aboutBackground: "about-background",
  aboutSkills: "about-skills",
  aboutExperience: "about-experience",
  projectsFeatured: "projects-featured",
  projectsAll: "projects-all",
  overview: "overview",
  architecture: "architecture",
  dataset: "dataset",
  training: "training",
  evaluation: "evaluation",
  contactForm: "contact-form",
  experienceList: "experience-list",
} as const;

export const SKILL_CATEGORY_IDS = {
  frontend: "frontend",
  backend: "backend",
  ai: "ai",
  tooling: "tooling",
  collaboration: "collaboration",
} as const;

export const PROJECT_IDS = { emqnet: "emqnet", dermsight: "dermsight" } as const;

export const PROJECT_SECTION_IDS = {
  featured: "projects-featured",
  all: "projects-all",
  overview: "overview",
  architecture: "architecture",
  dataset: "dataset",
  training: "training",
  evaluation: "evaluation",
} as const;
