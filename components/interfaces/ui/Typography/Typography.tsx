import type { ElementType, ReactNode } from "react";

export type TypographyVariant = "big-header" | "header" | "text";

export type TypographySize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

export type TypographyWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

interface TypographyProps {
  /** Menentukan keluarga font: big-header -> Aliens & Cows, header -> Space Grotesk, text -> Space Mono. */
  variant: TypographyVariant;
  size?: TypographySize;
  weight?: TypographyWeight;
  italic?: boolean;
  underline?: boolean;
  /** Elemen HTML yang dirender; jika kosong dipilih otomatis dari variant. */
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

const FONT_CLASS_BY_VARIANT: Record<TypographyVariant, string> = {
  "big-header": "font-big-header",
  header: "font-display",
  text: "font-sans",
};

const TAG_BY_VARIANT: Record<TypographyVariant, ElementType> = {
  "big-header": "h1",
  header: "h2",
  text: "p",
};

const DEFAULT_SIZE_BY_VARIANT: Record<TypographyVariant, TypographySize> = {
  "big-header": "7xl",
  header: "3xl",
  text: "base",
};

const DEFAULT_WEIGHT_BY_VARIANT: Record<TypographyVariant, TypographyWeight> = {
  "big-header": "black",
  header: "bold",
  text: "normal",
};

const SIZE_CLASS: Record<TypographySize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
};

const WEIGHT_CLASS: Record<TypographyWeight, string> = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

/** Komponen typography tunggal: pilih variant (keluarga font), size (xs-9xl), weight, italic, dan underline lewat props. */
export function Typography({
  variant,
  size,
  weight,
  italic = false,
  underline = false,
  as,
  className,
  children,
}: TypographyProps) {
  const Tag = as ?? TAG_BY_VARIANT[variant];

  const classes = [
    FONT_CLASS_BY_VARIANT[variant],
    SIZE_CLASS[size ?? DEFAULT_SIZE_BY_VARIANT[variant]],
    WEIGHT_CLASS[weight ?? DEFAULT_WEIGHT_BY_VARIANT[variant]],
    italic ? "italic" : null,
    underline ? "underline" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
