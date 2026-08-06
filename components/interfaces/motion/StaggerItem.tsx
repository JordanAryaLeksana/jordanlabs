"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ENTRANCE_DURATION_SECONDS, FUNCTIONAL_EASE } from "./motionConfig";

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  distancePx?: number;
}

/** Dipakai sebagai anak langsung StaggerContainer; variants "hidden"/"visible" mengikuti animate/whileInView milik parent. */
export function StaggerItem({ children, className, distancePx = 12 }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y: distancePx }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: ENTRANCE_DURATION_SECONDS, ease: FUNCTIONAL_EASE }}
    >
      {children}
    </motion.div>
  );
}
