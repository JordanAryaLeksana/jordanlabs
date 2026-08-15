"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SceneBackdrop } from "@/components/interfaces/scenes/SceneBackdrop";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";
import { computePhraseHoldMs } from "@/lib/intro/computePhraseHoldMs";

interface LoadingScreenProps {
  greetingPhrases: readonly string[];
  onComplete: () => void;
}

export function LoadingScreen({ greetingPhrases, onComplete }: LoadingScreenProps) {
  const reducedMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const isLast = phraseIndex === greetingPhrases.length - 1;

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }
    const timeout = window.setTimeout(() => {
      if (isLast) onComplete();
      else setPhraseIndex((index) => index + 1);
    }, Math.min(computePhraseHoldMs(greetingPhrases[phraseIndex]), 1450));
    return () => window.clearTimeout(timeout);
  }, [greetingPhrases, isLast, onComplete, phraseIndex, reducedMotion]);

  return (
    <div className="relative flex h-full overflow-hidden bg-ink-base text-text-on-dark">
      <SceneBackdrop scene="home" priority />
      <div className="relative z-10 flex w-full flex-col justify-end px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16">
        <span className="mb-auto mt-8 font-mono text-[10px] tracking-[0.24em] text-text-on-dark/65">JORDAN ARYA LEKSANA · PORTFOLIO</span>
        <AnimatePresence mode="wait">
          <motion.div key={phraseIndex} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: FUNCTIONAL_EASE }}>
            <Typography as="p" variant="header" size="5xl" className="max-w-3xl text-balance leading-[1.02] sm:text-7xl">{greetingPhrases[phraseIndex]}</Typography>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex gap-2" aria-label={`Intro chapter ${phraseIndex + 1} of ${greetingPhrases.length}`}>
          {greetingPhrases.map((phrase, index) => <span key={phrase} className={`h-1 rounded-full transition-[width,background-color] duration-300 ${index === phraseIndex ? "w-12 bg-coral" : "w-5 bg-text-on-dark/25"}`} />)}
        </div>
      </div>
    </div>
  );
}
