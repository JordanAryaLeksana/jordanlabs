import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

/** State aktif memakai frame-green, satu-satunya peran yang boleh dipakai untuk warna itu (CLAUDE.md §5). */
export function Pill({ active = false, className, children, ...props }: PillProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1 border px-3 py-1 font-mono text-sm",
        active ? "border-frame-green text-frame-green" : "border-current text-current",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
