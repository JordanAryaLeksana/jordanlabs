import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeColor = "brick" | "pine" | "slate" | "mustard" | "coral";

interface BadgeProps {
  color?: BadgeColor;
  children: ReactNode;
  className?: string;
}

const COLOR_CLASS_NAME: Record<BadgeColor, string> = {
  brick: "bg-brick text-text-on-dark",
  pine: "bg-pine text-text-on-dark",
  slate: "bg-slate text-text-on-dark",
  coral: "bg-coral text-text-on-dark",
  /* mustard tipis kontrasnya di atas cream (CLAUDE.md §5), diberi outline 0.5px */
  mustard: "bg-mustard text-text-on-light outline outline-[0.5px] outline-text-on-light",
};

export function Badge({ color = "pine", children, className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[11px] font-bold", COLOR_CLASS_NAME[color], className)}>
      {children}
    </span>
  );
}
