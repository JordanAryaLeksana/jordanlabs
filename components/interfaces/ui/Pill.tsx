import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type PillAsButton = ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type PillAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type PillProps = (PillAsButton | PillAsAnchor) & { active?: boolean };

/**
 * State aktif memakai frame-green, satu-satunya peran yang boleh dipakai untuk warna itu (CLAUDE.md §5).
 * Merender <a> jika `href` tersedia; selain itu menjadi button untuk filter/tab interaktif.
 */
export function Pill({ active = false, className, children, ...props }: PillProps) {
  const classes = cn(
    "inline-flex min-h-10 items-center gap-1 rounded-full border px-4 py-1 font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green",
    active ? "border-frame-green text-frame-green" : "border-current text-current",
    className
  );

  if (props.href !== undefined) {
    const anchorProps = props as PillAsAnchor;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as PillAsButton;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
