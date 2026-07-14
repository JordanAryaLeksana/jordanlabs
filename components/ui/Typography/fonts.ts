

import localFont from "next/font/local";

/**
 * Font Big Header: Aliens & Cows (trial), dipetakan lengkap dari Thin sampai
 * Heavy supaya varian weight Tailwind (font-thin s/d font-black) match ke file
 * statis yang benar, bukan cuma di-fake browser lewat font-synthesis.
 */
export const bigHeaderFont = localFont({
  src: [
    { path: "./aliens-cows/Alienscows-Thin-Trial.ttf", weight: "100", style: "normal" },
    { path: "./aliens-cows/Alienscows-ExtraLight-Trial.ttf", weight: "200", style: "normal" },
    { path: "./aliens-cows/Alienscows-Light-Trial.ttf", weight: "300", style: "normal" },
    { path: "./aliens-cows/Alienscows-Trial.ttf", weight: "400", style: "normal" },
    { path: "./aliens-cows/Alienscows-Bold-Trial.ttf", weight: "700", style: "normal" },
    { path: "./aliens-cows/Alienscows-ExtraBold-Trial.ttf", weight: "800", style: "normal" },
    { path: "./aliens-cows/Alienscows-Heavy-Trial.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-aliens-cows",
  display: "swap",
});

/**
 * Font header biasa: Space Grotesk. Memakai file variable-nya saja karena satu
 * file itu sudah mencakup seluruh rentang weight 300-700.
 */
export const headerFont = localFont({
  src: "./Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});

/**
 * Font paragraf/body: Space Mono. Empat file dipetakan ke kombinasi
 * weight x style supaya `italic` dan `font-bold` di Typography jatuh ke file
 * asli, bukan italic/bold sintetis dari browser.
 */
export const paragraphFont = localFont({
  src: [
    { path: "./Space_Mono/SpaceMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "./Space_Mono/SpaceMono-Italic.ttf", weight: "400", style: "italic" },
    { path: "./Space_Mono/SpaceMono-Bold.ttf", weight: "700", style: "normal" },
    { path: "./Space_Mono/SpaceMono-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-space-mono",
  display: "swap",
});
