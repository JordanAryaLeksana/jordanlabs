import { cn } from "@/lib/cn";
import { HARD_SHADOW_CLASS_NAME } from "./constants";

interface SplitCardProps {
  primaryColorClassName?: string;
  secondaryColorClassName?: string;
  className?: string;
}

export function SplitCard({
  primaryColorClassName = "bg-slate",
  secondaryColorClassName = "bg-pine",
  className,
}: SplitCardProps) {
  return (
    <div className={cn("relative aspect-square w-full overflow-hidden", HARD_SHADOW_CLASS_NAME, className)}>
      <div className={cn("absolute inset-0", primaryColorClassName)} />
      <div
        className={cn("absolute inset-0", secondaryColorClassName)}
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
      />
    </div>
  );
}
