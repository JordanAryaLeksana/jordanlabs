import { SKILL_CATEGORY_IDS } from "@/lib/tools/types";

/*
 * Mirrors the "Technical Skills" section of
 * "Jordan Arya Leksana - Software Engineer Resume.pdf".
 * Category ids stay stable because tools and filters depend on them.
 */
export const SKILLS_BY_CATEGORY = {
  [SKILL_CATEGORY_IDS.programming]: {
    label: "Languages",
    items: [
      "TypeScript",
      "JavaScript",
      "Python",
      "SQL",
      "Go (basic)",
    ],
  },

  [SKILL_CATEGORY_IDS.frontend]: {
    label: "Frontend & Mobile",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "React Native",
      "Three.js / React Three Fiber",
    ],
  },

  [SKILL_CATEGORY_IDS.backend]: {
    label: "Backend & APIs",
    items: [
      "Node.js",
      "Express",
      "NestJS",
      "FastAPI",
      "Flask",
      "REST APIs",
      "NextAuth",
      "Prisma",
      "SQLAlchemy",
    ],
  },

  [SKILL_CATEGORY_IDS.database]: {
    label: "Databases",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
    ],
  },

  [SKILL_CATEGORY_IDS.ai]: {
    label: "AI / ML",
    items: [
      "LLM integration (OpenAI, Anthropic, Ollama)",
      "Vercel AI SDK",
      "LangChain",
      "Retrieval-Augmented Generation (RAG)",
      "PyTorch",
      "TensorFlow (Keras)",
      "scikit-learn",
      "OpenCV",
      "LSTM Autoencoder",
      "ResNet CNNs",
      "EfficientNet",
      "YOLOv5",
    ],
  },

  [SKILL_CATEGORY_IDS.tooling]: {
    label: "DevOps, Cloud & Tools",
    items: [
      "Docker",
      "Docker Compose",
      "GitHub Actions (CI/CD)",
      "GHCR",
      "Nginx",
      "Linux (Ubuntu) VPS",
      "Vercel",
      "Cloudflare",
      "FFmpeg",
      "Git",
      "Postman",
    ],
  },

  [SKILL_CATEGORY_IDS.collaboration]: {
    label: "Leadership & Collaboration",
    items: [
      "Agile / Scrum",
      "Technical leadership",
      "Cross-functional coordination",
      "Technical writing",
    ],
  },
} as const;

export type SkillCategoryId =
  keyof typeof SKILLS_BY_CATEGORY;

export type SkillCategory =
  (typeof SKILLS_BY_CATEGORY)[SkillCategoryId];

export type SkillName =
  SkillCategory["items"][number];
