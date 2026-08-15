import type { ReactNode } from "react";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";

interface ToolResultSurfaceProps {
  label: string;
  meta?: string;
  color?: "brick" | "pine" | "slate" | "mustard" | "coral";
  ariaLabel: string;
  children: ReactNode;
}

export function ToolResultSurface({ label, meta, color = "pine", ariaLabel, children }: ToolResultSurfaceProps) {
  return <section aria-label={ariaLabel} className="w-full max-w-3xl overflow-hidden rounded-2xl border border-current/10 bg-[var(--surface)] shadow-lg backdrop-blur-xl">
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-current/10 px-5 py-4 sm:px-6"><Badge color={color}>{label}</Badge>{meta ? <Typography as="p" variant="text" size="xs" className="font-mono tracking-[0.08em] opacity-55">{meta}</Typography> : null}</header>
    <div className="p-5 sm:p-6">{children}</div>
  </section>;
}
