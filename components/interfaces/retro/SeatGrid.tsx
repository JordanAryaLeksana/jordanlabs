import { cn } from "@/lib/cn";

interface SeatGridProps {
  colorClassNames?: string[];
  count?: number;
  columns?: number;
  className?: string;
}

const DEFAULT_COLORS = ["bg-coral", "bg-purple", "bg-pine", "bg-mustard"];

export function SeatGrid({
  colorClassNames = DEFAULT_COLORS,
  count = 24,
  columns = 8,
  className,
}: SeatGridProps) {
  return (
    <div className={cn("grid gap-1", className)} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {Array.from({ length: count }).map((_, index) => {
        const colorClassName = colorClassNames[index % colorClassNames.length];
        return (
          <div key={index} className="flex flex-col gap-0.5">
            <div className={cn("h-3 w-full", colorClassName)} />
            <div className={cn("h-4 w-full", colorClassName)} />
          </div>
        );
      })}
    </div>
  );
}
