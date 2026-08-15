"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { SceneBackdrop } from "@/components/interfaces/scenes/SceneBackdrop";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { ENTRANCE_DURATION_SECONDS, FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";
import { BRAND_SUBTITLE, BRAND_WORDMARK, INTRO_CONTINUE_LABEL } from "@/lib/config/brand";

export function BrandReveal({ onComplete }: { onComplete: () => void }) {
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0 : ENTRANCE_DURATION_SECONDS;
  return (
    <div className="relative flex h-full items-center overflow-hidden bg-ink-base text-text-on-dark">
      <SceneBackdrop scene="home" priority />
      <motion.div className="relative z-10 w-full px-6 sm:px-10 lg:px-16" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration, ease: FUNCTIONAL_EASE }}>
        <p className="font-mono text-xs tracking-[0.26em] text-coral">{BRAND_WORDMARK.toUpperCase()}</p>
        <Typography as="h1" variant="header" size="5xl" className="mt-4 max-w-4xl text-balance leading-[0.95] sm:text-7xl lg:text-8xl">Build, understand, and explore with Jordan AI.</Typography>
        <Typography as="p" variant="text" size="sm" className="mt-6 max-w-xl leading-7 text-text-on-dark/70">{BRAND_SUBTITLE} portfolio, presented as a living workspace.</Typography>
        <button type="button" onClick={onComplete} className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-coral px-6 font-sans text-sm font-bold text-text-on-dark shadow-xl transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-frame-green motion-reduce:transition-none">
          {INTRO_CONTINUE_LABEL} <ArrowRightIcon size={19} />
        </button>
      </motion.div>
    </div>
  );
}
