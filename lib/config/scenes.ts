export const PAGE_SCENES = {
  home: { src: "/scenes/home-studio.webp" },
  about: { src: "/scenes/about-rooftop.webp" },
  projects: { src: "/scenes/projects-build-room.webp" },
  project: { src: "/scenes/projects-build-room.webp" },
  experience: { src: "/scenes/experience-demo-day.webp" },
  contact: { src: "/scenes/contact-night.webp" },
} as const;

export type PageScene = keyof typeof PAGE_SCENES;
