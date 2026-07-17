import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  /**
   * Aksen satu sisi kiri berupa border tebal warna aset (mis. "border-l-brick");
   * border satu sisi dipilih karena tetap siku 0px (CLAUDE.md §6a). Kosongkan
   * untuk kartu polos.
   */
  accentBorderClassName?: string;
  className?: string;
}

/**
 * Kontainer konten siku per spek §6a: latar ink-panel (mode gelap), border
 * tipis, tanpa radius dan tanpa bayangan lembut. Penekanan datang dari aksen
 * border tebal satu sisi, bukan glow/shadow.
 */
export function Card({ children, accentBorderClassName, className }: CardProps) {
  return (
    <div
      className={cn(
        "border border-ink-raised bg-ink-panel p-6",
        accentBorderClassName && cn("border-l-4", accentBorderClassName),
        className
      )}
    >
      {children}
    </div>
  );
}
