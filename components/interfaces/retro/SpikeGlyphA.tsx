import { cn } from "@/lib/cn";

/**
 * Geometri kedua varian spike (unit viewBox, y=0 puncak huruf, y=100 baseline):
 * varian "long" kaki kirinya menjulur jauh melewati baseline (motif huruf A
 * pada title sequence referensi), varian "short" berhenti lebih awal supaya
 * dua huruf "a" dalam satu wordmark tetap berirama, tidak seragam.
 */
const SPIKE_LEFT_LEG_PATH_BY_VARIANT = {
  long: "M38 0 L14 150",
  short: "M38 0 L20 128",
} as const;

/** Kaki kanan sama untuk kedua varian: turun tegas dari puncak ke baseline. */
const SPIKE_RIGHT_LEG_PATH = "M38 0 L56 100";

/** Tebal stroke (unit viewBox) -- disetel tipis menyamai bobot thin Aliens & Cows di sekitarnya. */
const SPIKE_STROKE_WIDTH = 6;

export type SpikeGlyphVariant = keyof typeof SPIKE_LEFT_LEG_PATH_BY_VARIANT;

interface SpikeGlyphAProps {
  /** Varian panjang kaki kiri; "long" untuk aksen utama, "short" untuk pengulangan yang lebih tenang. */
  variant?: SpikeGlyphVariant;
  className?: string;
}

/**
 * Komponen ini digunakan sebagai pengganti SATU karakter "a" di dalam teks
 * wordmark: huruf A polygon tanpa crossbar yang kaki kirinya menembus
 * baseline, meniru bahasa visual title sequence referensi tanpa mereplikanya
 * (CLAUDE.md §3). Ukurannya berbasis em supaya ikut membesar-mengecil dengan
 * font di sekitarnya, dan warnanya mengikuti currentColor dari span huruf
 * KineticHeading yang membungkusnya.
 */
export function SpikeGlyphA({ variant = "long", className }: SpikeGlyphAProps) {
  return (
    <svg
      viewBox="0 0 58 100"
      className={cn("inline-block h-[0.72em] w-auto overflow-visible", className)}
      aria-hidden
    >
      <path
        d={SPIKE_LEFT_LEG_PATH_BY_VARIANT[variant]}
        fill="none"
        stroke="currentColor"
        strokeWidth={SPIKE_STROKE_WIDTH}
        strokeLinecap="butt"
      />
      <path
        d={SPIKE_RIGHT_LEG_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={SPIKE_STROKE_WIDTH}
        strokeLinecap="butt"
      />
    </svg>
  );
}
