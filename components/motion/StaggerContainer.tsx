"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { STAGGER_GAP_SECONDS } from "./motionConfig";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  /** "mount" animasi jalan begitu elemen dirender; "viewport" animasi jalan saat elemen masuk area pandang (scroll reveal). */
  trigger?: "mount" | "viewport";
}

/** Kontainer ini mengatur jeda antar-anak lewat variants Framer Motion; tiap anak wajib berupa StaggerItem. */
export function StaggerContainer({ children, className, trigger = "mount" }: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const triggerProps =
    trigger === "viewport"
      ? { whileInView: "visible", viewport: { once: true, amount: 0.2 } }
      : { animate: "visible" };

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={{ visible: { transition: { staggerChildren: STAGGER_GAP_SECONDS } } }}
      {...triggerProps}
    >
      {children}
    </motion.div>
  );
}
