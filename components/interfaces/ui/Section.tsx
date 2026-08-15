import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { FadeIn } from "@/components/interfaces/motion/FadeIn";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Nonaktifkan scroll-reveal — dipakai untuk section paling atas (hero) yang harus langsung tampil tanpa menunggu scroll. */
  disableReveal?: boolean;
}

/** Kolom konten konsisten dengan lebar maksimum, padding, dan scroll-reveal bawaan. */
export function Section({ children, id, className, disableReveal = false }: SectionProps) {
  const content = <div className={cn("mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16", className)}>{children}</div>;

  if (disableReveal) {
    return <section id={id}>{content}</section>;
  }

  return (
    <section id={id}>
      <FadeIn trigger="viewport" distancePx={16}>
        {content}
      </FadeIn>
    </section>
  );
}
