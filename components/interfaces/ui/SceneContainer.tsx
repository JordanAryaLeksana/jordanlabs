import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SceneBackground = "ink-base" | "ink-panel" | "cream-base" | "cream-raised" | "backdrop-teal";

interface SceneContainerProps {
  /** Hanya token background yang boleh full-bleed (CLAUDE.md §3, §5) — dibatasi lewat union type ini, bukan className bebas. */
  background?: SceneBackground;
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

const BACKGROUND_CLASS_NAME: Record<SceneBackground, string> = {
  "ink-base": "bg-ink-base text-text-on-dark",
  "ink-panel": "bg-ink-panel text-text-on-dark",
  "cream-base": "bg-cream-base text-text-on-light",
  "cream-raised": "bg-cream-raised text-text-on-light",
  "backdrop-teal": "bg-backdrop-teal text-text-on-dark",
};

/** Pembungkus full-bleed satu "adegan" halaman; pilih background lewat prop, bukan hardcode kelas warna langsung di tiap page. */
export function SceneContainer({ background = "ink-base", children, as, className }: SceneContainerProps) {
  const Tag = as ?? "div";
  return <Tag className={cn("w-full", BACKGROUND_CLASS_NAME[background], className)}>{children}</Tag>;
}
