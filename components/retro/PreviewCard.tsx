import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { HARD_SHADOW_CLASS_NAME } from "./constants";

interface PreviewCardProps {
  cardColorClassName?: string;
  children?: ReactNode;
  className?: string;
}

export function PreviewCard({ cardColorClassName = "bg-offwhite", children, className }: PreviewCardProps) {
  return (
    <div
      className={cn(
        "flex aspect-video w-full items-end justify-center overflow-hidden p-3",
        cardColorClassName,
        HARD_SHADOW_CLASS_NAME,
        className
      )}
    >
      {children}
    </div>
  );
}
