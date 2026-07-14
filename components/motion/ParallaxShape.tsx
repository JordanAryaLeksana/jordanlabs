"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxShapeProps {
  children?: ReactNode;
  className?: string;
  strengthPx?: number;
}

/** Parallax ringan, khusus bentuk dekoratif (retro/blok) — jangan dipakai untuk teks konten (§11). */
export function ParallaxShape({ children, className, strengthPx = 24 }: ParallaxShapeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strengthPx, strengthPx]);

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={containerRef} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
