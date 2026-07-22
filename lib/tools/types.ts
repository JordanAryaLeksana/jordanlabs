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
  research: "/research",
  contact: "/contact",
} as const;

export const SECTION_IDS = {
  aboutBackground: "about-background",
  aboutSkills: "about-skills",
  aboutExperience: "about-experience",
} as const;

export const SKILL_CATEGORY_IDS = {
  frontend: "frontend",
  backend: "backend",
  ai: "ai",
  tooling: "tooling",
  collaboration: "collaboration",
} as const;
