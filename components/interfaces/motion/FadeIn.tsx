"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ENTRANCE_DURATION_SECONDS, FUNCTIONAL_EASE } from "./motionConfig";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delaySeconds?: number;
  distancePx?: number;
  /** "mount" animasi jalan begitu elemen dirender; "viewport" animasi jalan saat elemen masuk area pandang (scroll reveal). */
  trigger?: "mount" | "viewport";
}

export function FadeIn({ children, className, delaySeconds = 0, distancePx = 12, trigger = "mount" }: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const triggerProps =
    trigger === "viewport"
      ? { whileInView: "visible", viewport: { once: true, amount: 0.3 } }
      : { animate: "visible" };

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={{ hidden: { opacity: 0, y: distancePx }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: ENTRANCE_DURATION_SECONDS, delay: delaySeconds, ease: FUNCTIONAL_EASE }}
      {...triggerProps}
    >
      {children}
    </motion.div>
  );
}
