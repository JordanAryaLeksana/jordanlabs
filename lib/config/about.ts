import {
  SKILLS_BY_CATEGORY,
} from "@/lib/config/skills";
export const ABOUT_PROFILE = {
  eyebrow: "Currently focused on",
  title: "AI Engineer",
  previousExperience: "Software Engineer",
  description: [
    "I’m Jordan Arya Leksana, a software engineer currently focused on AI engineering.",
    "My software engineering experience shapes how I approach deep learning: not only as a model or experiment, but as a system that needs to be useful, maintainable, and ready to integrate into real applications.",
  ],
  experiencedAs:
    "My background is in building software systems and digital products. Today, I apply that engineering foundation to deep learning and applied AI.",
  focusAreas: ["Applied AI", "Deep Learning", "Computer Vision"],
  location: "Surabaya, Indonesia",
  timezone: "Asia/Jakarta",
  githubPriority: ["EMQNET", "DermSight"],
} as const;

export const ABOUT_TECH_STACK = [
  {
    id: "core",
    label: "Core",
    items: [
      ...SKILLS_BY_CATEGORY.programming.items,
    ],
  },

  {
    id: "ai",
    label: "AI / ML",
    items: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "OpenCV",
      "LangChain",
    ],
  },

  {
    id: "web",
    label: "Web",
    items: [
      ...SKILLS_BY_CATEGORY.frontend.items,
      ...SKILLS_BY_CATEGORY.backend.items.filter(
        (item) =>
          item !== "Django"
      ),
    ],
  },

  {
    id: "tooling",
    label: "Tooling",
    items: [
      ...SKILLS_BY_CATEGORY.tooling.items,
    ],
  },
] as const;