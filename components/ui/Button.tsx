import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = (ButtonAsButton | ButtonAsAnchor) & { variant?: ButtonVariant };

const VARIANT_CLASS_NAME: Record<ButtonVariant, string> = {
  primary: "bg-coral text-text-on-dark",
  secondary: "bg-slate text-text-on-dark",
  ghost: "bg-transparent text-current border border-current",
};

const BASE_CLASS_NAME =
  "inline-flex items-center justify-center px-4 py-2 font-sans font-bold shadow-[3px_3px_0_0_var(--color-ink-base)] transition-transform duration-150 ease-retro-bounce hover:-translate-y-0.5 active:translate-y-0 active:shadow-none motion-reduce:transition-none motion-reduce:hover:translate-y-0";

/** Merender <a> kalau `href` diisi, selain itu <button> — dipakai bareng, misalnya buat CTA di NavBar. */
export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const classes = cn(BASE_CLASS_NAME, VARIANT_CLASS_NAME[variant], className);

  if (props.href !== undefined) {
    const anchorProps = props as ButtonAsAnchor;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
