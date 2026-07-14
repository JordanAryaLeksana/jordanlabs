import { cn } from "@/lib/cn";

interface DiagonalStripesProps {
  stripeColorClassNames?: string[];
  stripeCount?: number;
  className?: string;
}

export function DiagonalStripes({
  stripeColorClassNames = ["bg-red", "bg-brick"],
  stripeCount = 6,
  className,
}: DiagonalStripesProps) {
  return (
    <div className={cn("relative overflow-hidden bg-ink-base", className)}>
      <div className="absolute inset-0 flex -rotate-12 scale-125 gap-3">
        {Array.from({ length: stripeCount }).map((_, index) => (
          <div
            key={index}
            className={cn("h-[200%] w-6 shrink-0", stripeColorClassNames[index % stripeColorClassNames.length])}
          />
        ))}
      </div>
    </div>
  );
}
