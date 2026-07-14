"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { RETRO_BOUNCE_EASE } from "@/components/motion/motionConfig";

interface KineticHeadingProps {
  text: string;
  colorClassNames?: string[];
  staggerMs?: number;
  underline?: boolean;
  underlineColorClassName?: string;
  className?: string;
}

const DEFAULT_COLORS = ["text-coral", "text-mustard", "text-pine", "text-slate", "text-brick"];

export function KineticHeading({
  text,
  colorClassNames = DEFAULT_COLORS,
  staggerMs = 60,
  underline = false,
  underlineColorClassName = "stroke-coral",
  className,
}: KineticHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const underlineDelaySeconds = prefersReducedMotion ? 0 : (text.length * staggerMs) / 1000;

  return (
    <span className={cn("inline-flex flex-col", className)}>
      <span className="inline-flex flex-wrap">
        {text.split("").map((character, index) => (
          <span
            key={index}
            className={cn(
              "animate-kinetic-reveal motion-reduce:animate-none",
              colorClassNames[index % colorClassNames.length]
            )}
            style={{
              animationDelay: `${index * staggerMs}ms`,
              whiteSpace: character === " " ? "pre" : undefined,
            }}
          >
            {character}
          </span>
        ))}
      </span>
      {underline ? (
        <svg viewBox="0 0 100 6" preserveAspectRatio="none" className="mt-1 h-1.5 w-full">
          <motion.line
            x1={0}
            y1={3}
            x2={100}
            y2={3}
            strokeWidth={4}
            className={underlineColorClassName}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: underlineDelaySeconds, ease: RETRO_BOUNCE_EASE }}
          />
        </svg>
      ) : null}
    </span>
  );
}
