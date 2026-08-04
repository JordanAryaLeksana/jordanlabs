import type { ReactNode } from "react";
import { SpikeGlyphA } from "@/components/interfaces/retro/SpikeGlyphA";
import { BRAND_WORDMARK } from "@/lib/config/brand";

/** Indeks kemunculan "a" pertama pada wordmark -- hanya kemunculan ini yang memakai spike panjang. */
const FIRST_SPIKE_GLYPH_INDEX = BRAND_WORDMARK.indexOf("a");

/**
 * Fungsi ini digunakan sebagai renderChar KineticHeading pada BrandReveal:
 * hanya karakter "a" yang ditimpa menjadi polygon SpikeGlyphA ("a" pertama
 * spike panjang, "a" berikutnya spike pendek), sedangkan karakter lain tetap
 * dirender sebagai teks Aliens & Cows biasa. Dipisahkan ke modul sendiri
 * sesuai standar kode pemilik (CLAUDE.md §9: tanpa helper function di dalam
 * file pemanggil).
 */
export function renderBrandWordmarkChar(character: string, index: number): ReactNode {
  if (character !== "a") return character;
  return <SpikeGlyphA variant={index === FIRST_SPIKE_GLYPH_INDEX ? "long" : "short"} />;
}
