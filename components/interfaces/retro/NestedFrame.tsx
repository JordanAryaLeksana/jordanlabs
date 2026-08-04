import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface NestedFrameProps {
  frameCount?: number;
  focusIndex?: number;
  children?: ReactNode;
  className?: string;
}

export function NestedFrame({ frameCount = 3, focusIndex = 1, children, className }: NestedFrameProps) {
  return (
    <div className={
      cn("relative", className)}>
      {Array.from({ length: frameCount }).map((_, index) => (
        <div
          key={index}
          className={cn("absolute border-2", index === focusIndex ? "border-frame-green" : "border-text-on-dark")}
          style={{ inset: `${index * 12}px` }}
        />
      ))}
      <div
        className="relative flex h-full w-full items-center justify-center"
        style={{ padding: `${frameCount * 12}px` }}
      >
        {children}
      </div>
    </div>
  );
}
