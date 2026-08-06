"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { KineticHeading } from "@/components/interfaces/retro/KineticHeading";
import { ColorBlockBar } from "@/components/interfaces/retro/ColorBlockBar";
import { DiagonalStripes } from "@/components/interfaces/retro/DiagonalStripes";
import { HexGrid } from "@/components/interfaces/retro/HexGrid";
import { SeatGrid } from "@/components/interfaces/retro/SeatGrid";
import { SandboxSwingBadge } from "@/components/interfaces/scenes/SandboxSwingBadge";
import { IntroConfetti } from "@/components/interfaces/ui/IntroConfetti";
import { FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";
import { computePhraseHoldMs } from "@/lib/intro/computePhraseHoldMs";

const PHRASE_TRANSITION_DURATION_SECONDS = 0.35;
const SHORT_PHRASE_MAX_WORD_COUNT = 4;
const SHORT_PHRASE_STAGGER_MS = 60;
const LONG_PHRASE_STAGGER_MS = 25;

interface LoadingScreenProps {
  /** Rangkaian sapaan yang ditampilkan bergantian, satu per satu, sesuai urutan array. */
  greetingPhrases: readonly string[];
  /** Dipanggil setelah frasa TERAKHIR selesai animasi keluarnya -- menandakan Fase 1 selesai (CLAUDE.md §11). */
  onComplete: () => void;
}

/**
 * Komponen ini digunakan untuk merender isi Fase 1 IntroSequence: sapaan yang
 * ditampilkan satu per satu lewat KineticHeading, dengan aksen DiagonalStripes
 * tipis, taburan IntroConfetti (sticky note kotak warna ala dinding poster),
 * kluster HexGrid/SeatGrid kecil di sudut, tempelan SandboxSwingBadge
 * (ilustrasi bespoke via wrapper scenes/, CLAUDE.md §6a) di kanan-bawah, dan
 * ColorBlockBar sebagai penanda progres blok solid (bukan spinner, CLAUDE.md
 * §11).
 *
 * Jeda tahan sebuah frasa BARU dimulai setelah animasi reveal seluruh hurufnya
 * selesai (sinyal onRevealComplete dari KineticHeading) -- perbaikan bug frasa
 * terpotong sebelum reveal-nya rampung. Perpindahan ke Fase 2 menunggu animasi
 * KELUAR frasa terakhir benar-benar selesai (AnimatePresence.onExitComplete),
 * bukan durasi total tetap (CLAUDE.md §9, §11). Fase enter/exit
 * level-fase-nya sendiri dikendalikan oleh IntroSequence.tsx.
 */
export function LoadingScreen({ greetingPhrases, onComplete }: LoadingScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [hasRevealCompleted, setHasRevealCompleted] = useState(false);
  const [isLastPhraseVisible, setIsLastPhraseVisible] = useState(true);
  const isExitingLastPhraseRef = useRef(false);

  const isLastPhrase = phraseIndex === greetingPhrases.length - 1;
  const activePhrase = greetingPhrases[phraseIndex];
  const isShortPhrase = activePhrase.split(" ").length <= SHORT_PHRASE_MAX_WORD_COUNT;
  const shouldRenderPhrase = !isLastPhrase || isLastPhraseVisible;

  useEffect(() => {
    if (prefersReducedMotion) onComplete();
  }, [prefersReducedMotion, onComplete]);

  // Timer tahan hanya dipasang SETELAH reveal frasa aktif selesai, sehingga
  // frasa sepanjang apa pun dibiarkan menuntaskan animasinya dulu.
  useEffect(() => {
    if (prefersReducedMotion || !hasRevealCompleted) return;

    const holdTimeoutId = setTimeout(() => {
      if (isLastPhrase) {
        isExitingLastPhraseRef.current = true;
        setIsLastPhraseVisible(false);
      } else {
        setHasRevealCompleted(false);
        setPhraseIndex((index) => index + 1);
      }
    }, computePhraseHoldMs(activePhrase));

    return () => clearTimeout(holdTimeoutId);
  }, [hasRevealCompleted, activePhrase, isLastPhrase, prefersReducedMotion]);

  function handleExitComplete() {
    if (isExitingLastPhraseRef.current) {
      isExitingLastPhraseRef.current = false;
      onComplete();
    }
  }

  function handleRevealComplete() {
    setHasRevealCompleted(true);
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-10 overflow-hidden bg-ink-base px-6">
      <DiagonalStripes className="absolute inset-0" stripeColorClassNames={["bg-slate"]} stripeCount={5} />
      <IntroConfetti density="sparse" />
      <div aria-hidden className="pointer-events-none absolute bottom-4 left-4 origin-bottom-left scale-[0.35]">
        <HexGrid count={4} className="w-64" />
      </div>
      <div aria-hidden className="pointer-events-none absolute right-6 top-8 hidden w-24 md:block">
        <SeatGrid columns={5} count={10} />
      </div>
      <div aria-hidden className="pointer-events-none absolute bottom-[10%] right-[5%] hidden w-14 rotate-2 md:block">
        <SandboxSwingBadge />
      </div>
      <div className="relative flex max-w-3xl items-center justify-center text-center">
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
          {shouldRenderPhrase ? (
            <motion.div
              key={phraseIndex}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
              transition={{
                duration: prefersReducedMotion ? 0 : PHRASE_TRANSITION_DURATION_SECONDS,
                ease: FUNCTIONAL_EASE,
              }}
            >
              {isShortPhrase ? (
                <Typography variant="big-header" size="7xl" weight="thin" className="md:text-8xl">
                  <KineticHeading
                    text={activePhrase}
                    staggerMs={SHORT_PHRASE_STAGGER_MS}
                    onRevealComplete={handleRevealComplete}
                  />
                </Typography>
              ) : (
                <Typography variant="header" size="2xl" weight="light" className="md:text-3xl">
                  <KineticHeading
                    text={activePhrase}
                    staggerMs={LONG_PHRASE_STAGGER_MS}
                    onRevealComplete={handleRevealComplete}
                  />
                </Typography>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <ColorBlockBar
        className="relative w-64"
        progressFraction={(phraseIndex + 1) / greetingPhrases.length}
        progressDurationSeconds={computePhraseHoldMs(activePhrase) / 1000}
        barColorClassName="bg-coral"
        tileColorClassName="bg-pine"
      />
    </div>
  );
}
