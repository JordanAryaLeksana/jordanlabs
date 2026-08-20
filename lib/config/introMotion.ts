import type { Variants } from "framer-motion";
import type { IntroMotionPreset } from "@/lib/config/brand";

interface IntroMotionDefinition {
  backdrop: Variants;
  content: Variants;
  accentDelay: number;
}

export const INTRO_MOTION_PRESETS: Record<IntroMotionPreset, IntroMotionDefinition> = {
  "sandbox-entry": { backdrop: { enter: { scale: 1 }, active: { scale: 1.035 } }, content: { enter: { opacity: 0, y: 16 }, active: { opacity: 1, y: 0 } }, accentDelay: 0.48 },
  "hackathon-build": { backdrop: { enter: { scale: 1.02, x: "-1%" }, active: { scale: 1.035, x: "1%" } }, content: { enter: { opacity: 0, y: 14 }, active: { opacity: 1, y: 0 } }, accentDelay: 0.4 },
  "technical-trace": { backdrop: { enter: { scale: 1.025 }, active: { scale: 1.045 } }, content: { enter: { opacity: 0, y: 12 }, active: { opacity: 1, y: 0 } }, accentDelay: 0.34 },
  "demo-day": { backdrop: { enter: { scale: 1.02, filter: "brightness(.72)" }, active: { scale: 1.04, filter: "brightness(1)" } }, content: { enter: { opacity: 0, y: 18 }, active: { opacity: 1, y: 0 } }, accentDelay: 0.42 },
  "after-hours": { backdrop: { enter: { scale: 1.025, x: ".5%" }, active: { scale: 1.04, x: "-.5%" } }, content: { enter: { opacity: 0, y: 10 }, active: { opacity: 1, y: 0 } }, accentDelay: 0.58 },
  "product-reveal": { backdrop: { enter: { scale: 1.045 }, active: { scale: 1.02 } }, content: { enter: { opacity: 0, y: 16, clipPath: "inset(0 100% 0 0)" }, active: { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" } }, accentDelay: 0.62 },
};
