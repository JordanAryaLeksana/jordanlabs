"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { HOVER_DURATION_SECONDS, FUNCTIONAL_EASE } from "./motionConfig";

interface HoverLiftProps {
  children: ReactNode;
  className?: string;
}

/** Micro-interaction hover: scale ~1.02 + lift 2-4px (§11). Warna/border tetap diatur lewat className token, bukan di sini. */
export function HoverLift({ children, className }: HoverLiftProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ duration: HOVER_DURATION_SECONDS, ease: FUNCTIONAL_EASE }}
    >
      {children}
    </motion.div>
  );
}
