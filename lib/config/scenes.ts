/*
 * Generated room backdrops for content pages. The Home intro no longer uses
 * photos: it is a 3D world built from Jordan's own projects (intro3d).
 */
export const PAGE_SCENES = {
  home: { pageSrc: "/scenes/home-studio.webp" },
  about: { pageSrc: "/scenes/about-rooftop.webp" },
  projects: { pageSrc: "/scenes/projects-build-room.webp" },
  project: { pageSrc: "/scenes/projects-build-room.webp" },
  experience: { pageSrc: "/scenes/experience-demo-day.webp" },
  contact: { pageSrc: "/scenes/contact-night.webp" },
} as const;

export type PageScene = keyof typeof PAGE_SCENES;
