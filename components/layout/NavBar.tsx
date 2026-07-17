import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Typography } from "@/components/ui/Typography/Typography";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface NavBarProps {
  brand: ReactNode;
  links: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

/**
 * Nav sticky di atas: brand + link nav (Pill, state aktif pakai frame-green) + satu CTA (Button).
 * Info inti (posisi/kontak/CV) harus tetap terlihat tanpa mengetik (CLAUDE.md §1) — makanya CTA selalu tampil di sini.
 */
export function NavBar({ brand, links, ctaLabel, ctaHref, className }: NavBarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-ink-raised bg-ink-base px-6 py-4",
        className
      )}
    >
      <Typography as="div" variant="header" size="xl">
        {brand}
      </Typography>
      {/* Link nav disembunyikan di layar sempit -- brand + CTA CV yang dipertahankan (info inti §1); section tetap terjangkau lewat scroll & footer. */}
      <nav className="hidden flex-wrap items-center gap-2 md:flex">
        {links.map((link) => (
          <Pill key={link.href} href={link.href} active={link.active}>
            {link.label}
          </Pill>
        ))}
      </nav>
      {ctaHref ? (
        <Button href={ctaHref} variant="primary">
          {ctaLabel ?? "Kontak"}
        </Button>
      ) : null}
    </header>
  );
}
