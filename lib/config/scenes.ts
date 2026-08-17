export const PAGE_SCENES = {
  home: {
    pageSrc: "/scenes/home-studio.webp",
    introSrc: "/scenes/owner/home.webp",
  },
  about: {
    pageSrc: "/scenes/about-rooftop.webp",
    introSrc: "/scenes/owner/about.webp",
  },
  projects: {
    pageSrc: "/scenes/projects-build-room.webp",
    introSrc: "/scenes/owner/projects.webp",
  },
  project: {
    pageSrc: "/scenes/projects-build-room.webp",
    introSrc: "/scenes/owner/project-detail.webp",
  },
  experience: {
    pageSrc: "/scenes/experience-demo-day.webp",
    introSrc: "/scenes/owner/experience.webp",
  },
  contact: {
    pageSrc: "/scenes/contact-night.webp",
    introSrc: "/scenes/owner/contact.webp",
  },
} as const;

export type PageScene = keyof typeof PAGE_SCENES;
