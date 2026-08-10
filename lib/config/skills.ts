
import { SKILL_CATEGORY_IDS } from "@/lib/tools/types";

export const SKILLS_BY_CATEGORY = {
  [SKILL_CATEGORY_IDS.programming]: {
    label: "Programming",
    items: [
      "Python",
      "TypeScript",
      "JavaScript",
      "SQL",
      "Go",
    ],
  },

  [SKILL_CATEGORY_IDS.frontend]: {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },

  [SKILL_CATEGORY_IDS.backend]: {
    label: "Backend",
    items: [
      "Node.js",
      "Express",
      "NestJS",
      "FastAPI",
      "Django",
    ],
  },

  [SKILL_CATEGORY_IDS.database]: {
    label: "Database",
    items: [
      "MySQL",
      "MongoDB",
    ],
  },

  [SKILL_CATEGORY_IDS.ai]: {
    label: "AI / ML",
    items: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "OpenCV",
      "LangChain",
      "Pandas",
      "NumPy",
      "Retrieval-Augmented Generation (RAG)",
      "ResNet-style CNNs",
      "Autoencoder + LSTM",
      "EfficientNet",
      "Random Forest",
      "Neural Networks",
      "Rule-based expert systems",
    ],
  },

  [SKILL_CATEGORY_IDS.tooling]: {
    label: "Tooling",
    items: [
      "Git",
      "Docker",
      "Prisma",
      "Supabase",
      "Postman",
      "Ollama",
      "TensorBoard",
    ],
  },

  [SKILL_CATEGORY_IDS.collaboration]: {
    label: "Leadership & Collaboration",
    items: [
      "Agile project management",
      "Technical mentoring",
      "Cross-team coordination",
    ],
  },
} as const;

export type SkillCategoryId =
  keyof typeof SKILLS_BY_CATEGORY;

export type SkillCategory =
  (typeof SKILLS_BY_CATEGORY)[SkillCategoryId];

export type SkillName =
  SkillCategory["items"][number];