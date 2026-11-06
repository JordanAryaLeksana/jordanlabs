import {
  SKILLS_BY_CATEGORY,
} from "@/lib/config/skills";
import { LOOKING_FOR_SUMMARY, PROFILE } from "@/lib/config/profile";

export const ABOUT_PROFILE = {
  eyebrow: "Currently",
  title: PROFILE.headline,
  previousExperience: "Engineering Physics, ITS",
  description: [
    "I’m Jordan Arya Leksana, a software engineer focused on full-stack development and production deployment, with an Engineering Physics degree from Institut Teknologi Sepuluh Nopember (ITS).",
    "I build end-to-end web, AI-powered and IoT applications, and I ship them: Docker, CI/CD and Linux servers included. My latest build is IntentCut, an AI video editor I made solo for the Meta Global AI Developer Hackathon 2026.",
  ],
  experiencedAs:
    "An engineering-physics background taught me to treat software as a system: measured, tested and ready for real users. Today I build full-stack products and integrate LLMs, RAG and machine-learning models into them.",
  focusAreas: ["Full-stack development", "Backend & APIs", "LLM / RAG integration", "Production deployment"],
  lookingFor: LOOKING_FOR_SUMMARY,
  location: PROFILE.location,
  timezone: "Asia/Jakarta",
  githubPriority: ["intentcut", "jordanlabs", "DermSight"],
} as const;

export const ABOUT_TECH_STACK = [
  {
    id: "web",
    label: "Full-stack",
    items: [
      ...SKILLS_BY_CATEGORY.frontend.items,
      ...SKILLS_BY_CATEGORY.backend.items,
    ],
  },

  {
    id: "core",
    label: "Languages & Data",
    items: [
      ...SKILLS_BY_CATEGORY.programming.items,
      ...SKILLS_BY_CATEGORY.database.items,
    ],
  },

  {
    id: "tooling",
    label: "DevOps & Cloud",
    items: [
      ...SKILLS_BY_CATEGORY.tooling.items,
    ],
  },

  {
    id: "ai",
    label: "AI / ML",
    items: [
      ...SKILLS_BY_CATEGORY.ai.items,
    ],
  },
] as const;
