import { cn } from "@/lib/cn";

interface PerspectiveSceneProps {
  wallColorClassName?: string;
  lineColorClassNames?: string[];
  className?: string;
}

const DEFAULT_LINE_COLORS = ["stroke-mustard", "stroke-red", "stroke-slate"];

const CONVERGENCE_POINTS: Array<[number, number]> = [
  [0, 0],
  [100, 0],
  [0, 100],
  [100, 100],
  [50, 0],
  [50, 100],
  [0, 50],
  [100, 50],
];

export function PerspectiveScene({
  wallColorClassName = "bg-pine",
  lineColorClassNames = DEFAULT_LINE_COLORS,
  className,
}: PerspectiveSceneProps) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden animate-perspective-narrow motion-reduce:animate-none",
        wallColorClassName,
        className
      )}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {CONVERGENCE_POINTS.map(([x, y], index) => (
          <line
            key={index}
            x1={x}
            y1={y}
            x2={50}
            y2={50}
            strokeWidth={1}
            className={lineColorClassNames[index % lineColorClassNames.length]}
          />
        ))}
      </svg>
    </div>
  );
}
