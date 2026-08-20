"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { OpeningSequence } from "@/components/pages/layout/OpeningSequence";
import { useIntroSequence } from "@/lib/intro/useIntroSequence";
import { FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";

const EXIT_DURATION_SECONDS = 0.48;

interface IntroSequenceProps {
  /** Konten Home yang menunggu di bawah overlay intro. */
  children: ReactNode;
}

/**
 * Controller overlay intro Home. OpeningSequence memiliki enam chapter
 * presentational, sedangkan hook ini tetap menjadi pemilik lifecycle
 * intro -> exiting -> done untuk setiap load Home.
 */
export function IntroSequence({ children }: IntroSequenceProps) {
  const { phase, advancePhase, skipSequence } = useIntroSequence();
  const reducedMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isOverlayVisible = phase !== "done";
  const isExiting = phase === "exiting";

  useEffect(() => {
    if (!isOverlayVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const overlay = overlayRef.current;
    overlay?.querySelector<HTMLElement>(focusableSelector)?.focus();

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusable = overlay?.querySelectorAll<HTMLElement>(focusableSelector);
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", trapFocus);
    return () => {
      window.removeEventListener("keydown", trapFocus);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOverlayVisible]);

  return (
    <>
      <AnimatePresence>
        {isOverlayVisible ? (
          <motion.div
            key="intro-overlay"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Introduction to Jordan Arya Leksana"
            className="fixed inset-0 z-[80] bg-ink-base"
            animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 1.015 : 1 }}
            transition={{ duration: reducedMotion ? 0 : EXIT_DURATION_SECONDS, ease: FUNCTIONAL_EASE }}
            onAnimationComplete={() => {
              if (isExiting) advancePhase();
            }}
          >
            <button type="button" onClick={skipSequence} className="absolute right-5 top-[max(1.25rem,env(safe-area-inset-top))] z-20 min-h-11 rounded-full border border-text-on-dark/25 bg-ink-base/45 px-4 font-mono text-[11px] tracking-[0.16em] text-text-on-dark backdrop-blur-md hover:border-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green sm:right-8">
              SKIP INTRO
            </button>
            <OpeningSequence onComplete={advancePhase} />
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </>
  );
}
