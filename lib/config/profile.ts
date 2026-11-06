/**
 * Canonical identity. Every surface (header, intro, metadata, chat cards,
 * contact) reads the role line from here so the positioning never drifts.
 * Source of truth: "Jordan Arya Leksana - Software Engineer Resume.pdf".
 */
export const PROFILE = {
  fullName: "Jordan Arya Leksana",
  role: "Software Engineer",
  specialization: "Full-Stack & AI",
  headline: "Software Engineer · Full-Stack & AI",
  education: {
    degree: "Bachelor of Engineering in Engineering Physics",
    institution: "Institut Teknologi Sepuluh Nopember (ITS)",
    shortInstitution: "ITS",
    period: "2022 – Oct 2026",
    graduationLabel: "Engineering Physics, ITS '26",
    gpa: "3.28 / 4.00",
  },
  location: "Surabaya, Indonesia",
  timezoneLabel: "GMT+7",
  languages: ["English (Fluent)", "Indonesian (Native)"],
} as const;

/**
 * What Jordan is looking for, in priority order. Software engineering first.
 */
export const LOOKING_FOR = [
  {
    id: "software-engineer",
    label: "Software / Backend Engineer",
    type: "Full-time",
    priority: "primary",
    detail: "Full-stack and backend product engineering: APIs, data, deployment and CI/CD.",
  },
  {
    id: "ai-engineer",
    label: "AI Engineer",
    type: "Full-time",
    priority: "secondary",
    detail: "LLM, RAG and machine-learning systems integrated into real products.",
  },
  {
    id: "freelance",
    label: "Freelance projects",
    type: "Upwork",
    priority: "secondary",
    detail: "Client web apps, backends and AI integrations through Upwork.",
  },
  {
    id: "remote",
    label: "Remote / international",
    type: "Work setup",
    priority: "secondary",
    detail: "Open to remote teams and international opportunities from Surabaya (GMT+7).",
  },
] as const;

export const LOOKING_FOR_SUMMARY =
  "Open to full-time Software / Backend Engineer roles first, AI Engineer roles, freelance projects through Upwork, and remote or international teams.";
