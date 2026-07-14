import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ColorBlockBarProps {
  barColorClassName?: string;
  textColorClassName?: string;
  tileColorClassName?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function ColorBlockBar({
  barColorClassName = "bg-slate",
  textColorClassName = "text-text-on-dark",
  tileColorClassName = "bg-pine",
  icon,
  children,
  className,
}: ColorBlockBarProps) {
  return (
    <div className={cn("flex items-stretch animate-bar-slide motion-reduce:animate-none", className)}>
      <div className={cn("flex flex-1 items-center px-4 py-3", barColorClassName, textColorClassName)}>
        {children}
      </div>
      <div className={cn("flex w-14 shrink-0 items-center justify-center", tileColorClassName)}>{icon}</div>
    </div>
  );
}
