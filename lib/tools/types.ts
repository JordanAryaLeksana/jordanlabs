
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

export const PORTOFOLIO_NAMES = [
   "navigateToPage",
  "scrollToSection",
  "highlightSection",
  "openProjectDetail",
  "showDownloadCard",
  "openGithub",
  "openLinkedin",
  "openProjectDemo",
  "showContactCard",
  "filterProjects",
  "filterSkills",
] as const;

export type portofolioName = (typeof PORTOFOLIO_NAMES)[number];