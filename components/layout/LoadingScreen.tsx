"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { KineticHeading } from "@/components/retro/KineticHeading";
import { FUNCTIONAL_EASE } from "@/components/motion/motionConfig";

interface LoadingScreenProps {
  children: ReactNode;
  label?: string;
  durationMs?: number;
}

/**
 * Intro loader "opening title sequence" (§11): tampil singkat (~1.2-2 detik),
 * progress lewat blok solid yang bertumbuh (bukan spinner), lalu keluar lewat
 * fade+translate seperti transisi film. Kalau prefers-reduced-motion aktif,
 * loader dilewati sepenuhnya.
 */
export function LoadingScreen({ children, label = "JORDAN", durationMs = 1500 }: LoadingScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsLoading(false);
      return;
    }

    const timeoutId = setTimeout(() => setIsLoading(false), durationMs);
    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion, durationMs]);

  return (
    <>
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loading-screen"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-ink-base"
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: FUNCTIONAL_EASE }}
          >
            <KineticHeading text={label} />
            <div className="h-1.5 w-40 overflow-hidden bg-ink-raised">
              <motion.div
                className="h-full w-full origin-left bg-coral"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: durationMs / 1000, ease: FUNCTIONAL_EASE }}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </>
  );
}
