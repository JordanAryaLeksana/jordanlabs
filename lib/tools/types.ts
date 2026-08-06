
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

export const PORTFOLIO_TOOL_NAMES = [
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

export type PortfolioToolName = (typeof PORTFOLIO_TOOL_NAMES)[number];

export type PageRoute =
  (typeof PAGE_ROUTES)[keyof typeof PAGE_ROUTES];

export type SectionId =
  (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export type SkillCategoryId =
  (typeof SKILL_CATEGORY_IDS)[keyof typeof SKILL_CATEGORY_IDS];

export type ProjectId =
  (typeof PROJECT_IDS)[keyof typeof PROJECT_IDS];

export type ProjectSectionId =
  (typeof PROJECT_SECTION_IDS)[keyof typeof PROJECT_SECTION_IDS];

