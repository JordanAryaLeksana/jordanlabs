

/** Wordmark brand yang ditampilkan besar pada BrandReveal (Fase 2 intro). */
export const BRAND_WORDMARK = "jordan-labs";

/** Subtitle kecil di bawah wordmark, ditampilkan dengan letter-spacing lewat kelas Tailwind (bukan spasi manual di teks). */
export const BRAND_SUBTITLE = "SOFTWARE ENGINEER";

/** Label tombol lanjut pada BrandReveal; tombol ini yang memicu keluar dari intro menuju Home. */
export const INTRO_CONTINUE_LABEL = "ENTER";

/**
 * Rangkaian sapaan pembuka pada LoadingScreen (Fase 1), ditampilkan bergantian
 * satu per satu (bukan digabung), sesuai urutan array ini.
 */
export const INTRO_GREETING_PHRASES = [
  "Hello.",
  "Every great product starts with an idea.",
  "Let's Build Together.",
] as const;
  