import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_CLASS_NAME: Record<ButtonVariant, string> = {
  primary: "bg-coral text-text-on-dark",
  secondary: "bg-slate text-text-on-dark",
  ghost: "bg-transparent text-current border border-current",
};

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 font-sans font-bold",
        "shadow-[3px_3px_0_0_var(--color-ink-base)] transition-transform duration-150 ease-retro-bounce",
        "hover:-translate-y-0.5 active:translate-y-0 active:shadow-none",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        VARIANT_CLASS_NAME[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
