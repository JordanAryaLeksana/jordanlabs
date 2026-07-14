import { cn } from "@/lib/cn";
import { HEX_CLIP_PATH } from "./constants";

interface HexGridProps {
  colorClassNames?: string[];
  count?: number;
  staggerMs?: number;
  className?: string;
}

const DEFAULT_COLORS = ["bg-pine", "bg-mustard", "bg-cream-shape", "bg-brick", "bg-red"];

export function HexGrid({ colorClassNames = DEFAULT_COLORS, count = 12, staggerMs = 50, className }: HexGridProps) {
  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-16 w-14 animate-hex-appear motion-reduce:animate-none",
            colorClassNames[index % colorClassNames.length]
          )}
          style={{ clipPath: HEX_CLIP_PATH, animationDelay: `${index * staggerMs}ms` }}
        />
      ))}
    </div>
  );
}
