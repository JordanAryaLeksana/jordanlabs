import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type IconButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type IconButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type IconButtonProps = (IconButtonAsButton | IconButtonAsAnchor) & {
  icon: ReactNode;
  /** Nama aksesibel wajib -- tombol ini hanya berisi ikon, tanpa teks. */
  label: string;
};

const BASE_CLASS_NAME =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center border border-current text-current transition-colors duration-150 hover:bg-current/10 motion-reduce:transition-none";

/** Bujur sangkar siku berisi satu ikon (CLAUDE.md §6a) -- merender <a> kalau `href` diisi, selain itu <button>. */
export function IconButton({ icon, label, className, ...props }: IconButtonProps) {
  const classes = cn(BASE_CLASS_NAME, className);

  if (props.href !== undefined) {
    const anchorProps = props as IconButtonAsAnchor;
    return (
      <a aria-label={label} className={classes} {...anchorProps}>
        {icon}
      </a>
    );
  }

  const buttonProps = props as IconButtonAsButton;
  return (
    <button type="button" aria-label={label} className={classes} {...buttonProps}>
      {icon}
    </button>
  );
}
