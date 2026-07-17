"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { FUNCTIONAL_EASE } from "@/components/motion/motionConfig";

interface ColorBlockBarProps {
  barColorClassName?: string;
  textColorClassName?: string;
  tileColorClassName?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Bila diisi (0-1), bar dirender sebagai blok progres yang tumbuh dari 0 menuju nilai ini, menggantikan bar statis. */
  progressFraction?: number;
  /** Durasi animasi pertumbuhan blok progres, dipakai hanya bila progressFraction diisi. */
  progressDurationSeconds?: number;
}

export function ColorBlockBar({
  barColorClassName = "bg-slate",
  textColorClassName = "text-text-on-dark",
  tileColorClassName = "bg-pine",
  icon,
  children,
  className,
  progressFraction,
  progressDurationSeconds = 1,
}: ColorBlockBarProps) {
  const isProgressMode = progressFraction !== undefined;

  return (
    <div className={cn("flex items-stretch animate-bar-slide motion-reduce:animate-none", className)}>
      {isProgressMode ? (
        <div className="relative flex flex-1 items-center bg-ink-raised px-4 py-3">
          <motion.div
            className={cn("absolute inset-y-0 left-0 w-full origin-left", barColorClassName)}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progressFraction }}
            transition={{ duration: progressDurationSeconds, ease: FUNCTIONAL_EASE }}
          />
          <span className={cn("relative", textColorClassName)}>{children}</span>
        </div>
      ) : (
        <div className={cn("flex flex-1 items-center px-4 py-3", barColorClassName, textColorClassName)}>
          {children}
        </div>
      )}
      <div className={cn("flex w-14 shrink-0 items-center justify-center", tileColorClassName)}>{icon}</div>
    </div>
  );
}
