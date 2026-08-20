"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SceneBackdrop } from "@/components/interfaces/scenes/SceneBackdrop";
import { FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";
import { INTRO_MOTION_PRESETS } from "@/lib/config/introMotion";
import type { IntroMotionPreset } from "@/lib/config/brand";
import type { PageScene } from "@/lib/config/scenes";
import { cn } from "@/lib/cn";

const PAGE_MOTION_PRESET: Record<PageScene, IntroMotionPreset> = {
  home: "sandbox-entry",
  about: "after-hours",
  projects: "hackathon-build",
  project: "technical-trace",
  experience: "demo-day",
  contact: "product-reveal",
};

interface CinematicPageChapterProps {
  scene: PageScene;
  children: ReactNode;
  className?: string;
  priority?: boolean;
}

/** Shared chapter entrance: intro motion vocabulary, restrained for route content. */
export function CinematicPageChapter({ scene, children, className, priority = false }: CinematicPageChapterProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const preset = INTRO_MOTION_PRESETS[PAGE_MOTION_PRESET[scene]];
  const duration = reducedMotion ? 0 : 0.72;

  return (
    <div data-page-chapter={scene} className={cn("relative overflow-hidden bg-ink-base text-text-on-dark", className)}>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={reducedMotion ? false : { ...preset.backdrop.enter, opacity: 0.7 }}
        animate={{ ...preset.backdrop.active, opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 1.05, ease: FUNCTIONAL_EASE }}
      >
        <SceneBackdrop scene={scene} priority={priority} />
      </motion.div>

      <motion.div
        className="relative"
        initial={reducedMotion ? false : { opacity: 0.82, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, delay: reducedMotion ? 0 : 0.12, ease: FUNCTIONAL_EASE }}
      >
        {children}
      </motion.div>

      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-0 z-10 h-px bg-coral"
        initial={{ width: reducedMotion ? "100%" : "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.28, ease: FUNCTIONAL_EASE }}
      />
    </div>
  );
}
