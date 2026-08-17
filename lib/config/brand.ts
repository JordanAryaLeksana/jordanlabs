


import type { PageScene } from "@/lib/config/scenes";

export const BRAND_WORDMARK = "jordan-labs";

export const BRAND_SUBTITLE = "SOFTWARE ENGINEER";

export const INTRO_CONTINUE_LABEL = "ENTER THE STUDIO";

export type IntroTextTone = "cream" | "coral" | "pine" | "mustard" | "slate";

interface IntroTextSegment {
  text: string;
  tone?: IntroTextTone;
}

export interface IntroScene {
  id: string;
  scene: PageScene;
  eyebrow: string;
  headline: readonly IntroTextSegment[];
  description: string;
}

export const INTRO_SCENES: readonly IntroScene[] = [
  {
    id: "identity",
    scene: "home",
    eyebrow: "JORDAN ARYA LEKSANA",
    headline: [
      { text: "Software / ", tone: "cream" },
      { text: "AI Engineer", tone: "coral" },
    ],
    description: "A young engineer building useful systems at the intersection of software and artificial intelligence.",
  },
  {
    id: "builder",
    scene: "projects",
    eyebrow: "FROM IDEA TO WORKING SYSTEM",
    headline: [
      { text: "Build. ", tone: "mustard" },
      { text: "Ship. ", tone: "cream" },
      { text: "Iterate.", tone: "pine" },
    ],
    description: "Projects become meaningful when curiosity is translated into deliberate execution.",
  },
  {
    id: "curiosity",
    scene: "project",
    eyebrow: "THE TECHNICAL CHAPTER",
    headline: [
      { text: "AI. ", tone: "pine" },
      { text: "Software. ", tone: "slate" },
      { text: "Systems.", tone: "cream" },
    ],
    description: "Research, engineering decisions, experiments, and the evidence behind the work.",
  },
  {
    id: "growth",
    scene: "experience",
    eyebrow: "OWNERSHIP IN PROGRESS",
    headline: [
      { text: "Still learning. ", tone: "cream" },
      { text: "Still moving forward.", tone: "coral" },
    ],
    description: "Every role is another opportunity to communicate clearly, take responsibility, and improve.",
  },
  {
    id: "personal",
    scene: "about",
    eyebrow: "BEYOND THE RÉSUMÉ",
    headline: [
      { text: "Technology is part of the story. ", tone: "cream" },
      { text: "Not all of it.", tone: "mustard" },
    ],
    description: "A personal chapter shaped by curiosity, stories, reflection, and the people behind every product.",
  },
  {
    id: "jordan-ai",
    scene: "home",
    eyebrow: "YOU'VE MET JORDAN",
    headline: [
      { text: "Now meet ", tone: "cream" },
      { text: "Jordan AI.", tone: "pine" },
    ],
    description: "Ask, explore, evaluate, or navigate the portfolio through one intelligent workspace.",
  },
] as const;
