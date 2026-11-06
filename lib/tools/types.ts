
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
  programming: "programming",
  frontend: "frontend",
  backend: "backend",
  database: "database",
  ai: "ai",
  tooling: "tooling",
  collaboration: "collaboration",
} as const;

export const PROJECT_IDS = {
  intentcut: "intentcut",
  jordanLabs: "jordan-labs",
  seaCatering: "sea-catering",
  dermsight: "dermsight",
  teta: "teta",
  ecsWebsite: "ecs-website",
  emqnet: "emqnet",
  pumpsentinel: "pumpsentinel",
  stationParfume: "station-parfume",
  chatty: "chatty",
} as const;

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
  "openUpwork",
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

  
export type ProjectDetailRoute =
  `/projects/${ProjectId}`;

export type ProjectDetailTarget =
  | ProjectDetailRoute
  | `${ProjectDetailRoute}#${ProjectSectionId}`;
