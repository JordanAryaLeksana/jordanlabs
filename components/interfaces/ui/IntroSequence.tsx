"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "@/components/pages/layout/LoadingScreen";
import { BrandReveal } from "@/components/pages/layout/BrandReveal";
import { useIntroSequence } from "@/lib/intro/useIntroSequence";
import { INTRO_GREETING_PHRASES } from "@/lib/config/brand";
import { ENTRANCE_DURATION_SECONDS, FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";

const EXIT_DURATION_SECONDS = 0.48;

interface IntroSequenceProps {
  /** Konten Home yang menunggu di bawah overlay intro. */
  children: ReactNode;
}

/**
 * Komponen ini digunakan sebagai controller intro dua fase di atas Home:
 * Fase 1 LoadingScreen (sapaan bergantian) lalu Fase 2 BrandReveal (wordmark
 * + tombol lanjut), ditutup wipe blok solid ke kanan. Urutan fasenya sendiri
 * dipegang hook useIntroSequence (satu tanggung jawab per unit, CLAUDE.md
 * §9); komponen ini hanya memetakan fase ke tampilan dan meneruskan sinyal
 * selesainya animasi tiap fase lewat advancePhase.
 */
export function IntroSequence({ children }: IntroSequenceProps) {
  const { phase, advancePhase, skipSequence } = useIntroSequence();
  const isOverlayVisible = phase !== "done";
  const isExiting = phase === "exiting";

  return (
    <>
      <AnimatePresence>
        {isOverlayVisible ? (
          <motion.div
            key="intro-overlay"
            className="fixed inset-0 z-[80] bg-ink-base"
            animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 1.015 : 1 }}
            transition={{ duration: EXIT_DURATION_SECONDS, ease: FUNCTIONAL_EASE }}
            onAnimationComplete={() => {
              if (isExiting) advancePhase();
            }}
          >
            <button type="button" onClick={skipSequence} className="absolute right-5 top-5 z-20 min-h-11 rounded-full border border-text-on-dark/25 bg-ink-base/45 px-4 font-mono text-[11px] tracking-[0.16em] text-text-on-dark backdrop-blur-md hover:border-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green sm:right-8 sm:top-7">
              {phase === "brand" ? "ENTER" : "SKIP INTRO"}
            </button>
            <AnimatePresence mode="wait">
              {phase === "loading" ? (
                <motion.div
                  key="loading"
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: ENTRANCE_DURATION_SECONDS, ease: FUNCTIONAL_EASE }}
                >
                  <LoadingScreen greetingPhrases={INTRO_GREETING_PHRASES} onComplete={advancePhase} />
                </motion.div>
              ) : (
                <motion.div
                  key="brand"
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: ENTRANCE_DURATION_SECONDS, ease: FUNCTIONAL_EASE }}
                >
                  <BrandReveal onComplete={advancePhase} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </>
  );
}
