export const PAGE_SCENES = {
  home: { src: "/scenes/owner/home.webp", backdropSrc: "/scenes/home-studio.webp" },
  about: { src: "/scenes/owner/about.webp", backdropSrc: "/scenes/about-rooftop.webp" },
  projects: { src: "/scenes/owner/projects.webp", backdropSrc: "/scenes/projects-build-room.webp" },
  project: { src: "/scenes/owner/project-detail.webp", backdropSrc: "/scenes/projects-build-room.webp" },
  experience: { src: "/scenes/owner/experience.webp", backdropSrc: "/scenes/experience-demo-day.webp" },
  contact: { src: "/scenes/owner/contact.webp", backdropSrc: "/scenes/contact-night.webp" },
} as const;

export type PageScene = keyof typeof PAGE_SCENES;
