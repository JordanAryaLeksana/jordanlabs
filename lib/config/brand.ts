


import type { PageScene } from "@/lib/config/scenes";

export const BRAND_WORDMARK = "jordan-labs";

export const BRAND_SUBTITLE = "SOFTWARE ENGINEER";

export const INTRO_CONTINUE_LABEL = "ENTER THE STUDIO";

export type IntroTextTone = "cream" | "coral" | "pine" | "mustard" | "slate";
export type IntroMotionPreset =
  | "sandbox-entry"
  | "hackathon-build"
  | "technical-trace"
  | "demo-day"
  | "after-hours"
  | "product-reveal";

export type IntroAccent = "ticket" | "build-track" | "trace" | "stage" | "quiet-tags" | "capabilities";

interface IntroTextSegment {
  text: string;
  tone?: IntroTextTone;
}

export interface IntroScene {
  id: string;
  scene: PageScene;
  eyebrow: string;
  chapter: string;
  headline: readonly IntroTextSegment[];
  description: string;
  tags: readonly string[];
  motionPreset: IntroMotionPreset;
  accent: IntroAccent;
}

export const INTRO_SCENES: readonly IntroScene[] = [
  {
    id: "identity",
    scene: "home",
    eyebrow: "SANDBOX / ENTRY",
    chapter: "ENTRY",
    headline: [
      { text: "Software / ", tone: "cream" },
      { text: "AI Engineer", tone: "coral" },
    ],
    description: "Building useful systems where software, AI, and curiosity meet.",
    tags: ["TRACK / SOFTWARE + AI", "STATUS / BUILDING"],
    motionPreset: "sandbox-entry",
    accent: "ticket",
  },
  {
    id: "builder",
    scene: "projects",
    eyebrow: "BUILD STATUS",
    chapter: "BUILD",
    headline: [
      { text: "Build. ", tone: "mustard" },
      { text: "Ship. ", tone: "cream" },
      { text: "Iterate.", tone: "pine" },
    ],
    description: "Short loops. Honest feedback. Better versions.",
    tags: ["BUILD", "TEST", "ITERATE"],
    motionPreset: "hackathon-build",
    accent: "build-track",
  },
  {
    id: "curiosity",
    scene: "project",
    eyebrow: "THE TECHNICAL CHAPTER",
    chapter: "ENGINEER",
    headline: [
      { text: "AI. ", tone: "pine" },
      { text: "Software. ", tone: "slate" },
      { text: "Systems.", tone: "cream" },
    ],
    description: "Research, engineering decisions, experiments, and the evidence behind the work.",
    tags: ["RESEARCH", "EXPERIMENTS", "EVIDENCE"],
    motionPreset: "technical-trace",
    accent: "trace",
  },
  {
    id: "growth",
    scene: "experience",
    eyebrow: "DEMO DAY",
    chapter: "DEMO",
    headline: [
      { text: "Still learning. ", tone: "cream" },
      { text: "Still building. ", tone: "mustard" },
      { text: "Still moving forward.", tone: "coral" },
    ],
    description: "Every role is another opportunity to take ownership and improve.",
    tags: ["PRESENTING", "OWNERSHIP / IN PROGRESS"],
    motionPreset: "demo-day",
    accent: "stage",
  },
  {
    id: "personal",
    scene: "about",
    eyebrow: "AFTER HOURS",
    chapter: "LIFE",
    headline: [
      { text: "Technology is part of the story. ", tone: "cream" },
      { text: "Not all of it.", tone: "mustard" },
    ],
    description: "Music, films, K-dramas, reflection, and the human side behind every product.",
    tags: ["MUSIC", "FILMS", "K-DRAMA"],
    motionPreset: "after-hours",
    accent: "quiet-tags",
  },
  {
    id: "jordan-ai",
    scene: "home",
    eyebrow: "PRODUCT REVEAL",
    chapter: "AI",
    headline: [
      { text: "Now meet ", tone: "cream" },
      { text: "Jordan AI.", tone: "pine" },
    ],
    description: "Ask. Explore. Evaluate. Act.",
    tags: ["ASK", "EXPLORE", "EVALUATE", "ACT"],
    motionPreset: "product-reveal",
    accent: "capabilities",
  },
] as const;
