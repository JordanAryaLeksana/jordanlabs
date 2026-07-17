"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { BrandReveal } from "@/components/layout/BrandReveal";
import { useIntroSequence } from "@/lib/intro/useIntroSequence";
import { INTRO_GREETING_PHRASES } from "@/lib/config/brand";
import { ENTRANCE_DURATION_SECONDS, FUNCTIONAL_EASE } from "@/components/motion/motionConfig";

/** Durasi wipe keluar overlay intro ke kanan -- transisi "seperti film" menuju Home (CLAUDE.md §11). */
const EXIT_WIPE_DURATION_SECONDS = 0.6;

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
  const { phase, advancePhase } = useIntroSequence();
  const isOverlayVisible = phase !== "done";
  const isExiting = phase === "exiting";

  return (
    <>
      <AnimatePresence>
        {isOverlayVisible ? (
          <motion.div
            key="intro-overlay"
            className="fixed inset-0 z-50 bg-ink-base"
            animate={{ x: isExiting ? "100%" : "0%" }}
            transition={{ duration: EXIT_WIPE_DURATION_SECONDS, ease: FUNCTIONAL_EASE }}
            onAnimationComplete={() => {
              if (isExiting) advancePhase();
            }}
          >
            <AnimatePresence mode="wait">
              {phase === "loading" ? (
                <motion.div
                  key="loading"
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 16 }}
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
                  initial={{ opacity: 0, y: 16 }}
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

