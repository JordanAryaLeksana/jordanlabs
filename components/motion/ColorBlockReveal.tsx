"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SIGNATURE_DURATION_SECONDS, FUNCTIONAL_EASE } from "./motionConfig";

interface ColorBlockRevealProps {
  children: ReactNode;
  blockColorClassName?: string;
  className?: string;
  /** "mount" sapuan jalan begitu elemen dirender; "viewport" sapuan menunggu elemen masuk area pandang (untuk section di bawah lipatan). */
  trigger?: "mount" | "viewport";
}

/**
 * Animasi signature "wah" (§11): blok warna solid menyapu masuk menutupi elemen,
 * lalu menyapu keluar ke arah berlawanan, meninggalkan konten yang sudah tampil.
 * Pakai TERBATAS pada satu momen per section, bukan di semua kartu.
 */
export function ColorBlockReveal({
  children,
  blockColorClassName = "bg-brick",
  className,
  trigger = "mount",
}: ColorBlockRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const triggerProps =
    trigger === "viewport"
      ? { whileInView: "visible" as const, viewport: { once: true, amount: 0.4 } }
      : { animate: "visible" as const };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      <motion.div
        className={cn("absolute inset-0", blockColorClassName)}
        initial="hidden"
        variants={{ hidden: { x: "-100%" }, visible: { x: ["-100%", "0%", "100%"] } }}
        transition={{ duration: SIGNATURE_DURATION_SECONDS, times: [0, 0.45, 1], ease: FUNCTIONAL_EASE }}
        {...triggerProps}
      />
    </div>
  );
}
