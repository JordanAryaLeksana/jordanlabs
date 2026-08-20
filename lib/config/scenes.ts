export const PAGE_SCENES = {
  home: {
    pageSrc: "/scenes/home-studio.webp",
    introSrc: "/scenes/owner/home.webp",
    introPosition: "54% center",
    introMobilePosition: "62% center",
  },
  about: {
    pageSrc: "/scenes/about-rooftop.webp",
    introSrc: "/scenes/owner/about.webp",
    introPosition: "58% center",
    introMobilePosition: "62% center",
  },
  projects: {
    pageSrc: "/scenes/projects-build-room.webp",
    introSrc: "/scenes/owner/projects.webp",
    introPosition: "60% center",
    introMobilePosition: "64% center",
  },
  project: {
    pageSrc: "/scenes/projects-build-room.webp",
    introSrc: "/scenes/owner/project-detail.webp",
    introPosition: "58% center",
    introMobilePosition: "66% center",
  },
  experience: {
    pageSrc: "/scenes/experience-demo-day.webp",
    introSrc: "/scenes/owner/experience.webp",
    introPosition: "56% center",
    introMobilePosition: "64% center",
  },
  contact: {
    pageSrc: "/scenes/contact-night.webp",
    introSrc: "/scenes/owner/contact.webp",
    introPosition: "58% center",
    introMobilePosition: "68% center",
  },
} as const;

export type PageScene = keyof typeof PAGE_SCENES;
