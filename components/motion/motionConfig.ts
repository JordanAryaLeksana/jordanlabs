/**
 * Konfigurasi timing & easing terpusat untuk seluruh animasi Framer Motion,
 * mengikuti CLAUDE.md §11 "Cinematic Startup Motion". Nilai di sini adalah
 * satu-satunya sumber kebenaran supaya durasi/easing konsisten di semua
 * primitif motion, bukan diduplikasi tiap file.
 */

/** Kurva ease-out tegas untuk gerakan fungsional (fade/translate/scroll reveal/hover). BUKAN --ease-retro-bounce — itu dilarang dipakai di seluruh UI (§11). */
export const FUNCTIONAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Sama persis dengan cubic-bezier --ease-retro-bounce di globals.css. Dipakai TERBATAS untuk aksen playful (mis. underline KineticHeading), bukan untuk seluruh UI. */
export const RETRO_BOUNCE_EASE: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

/** Durasi masuk elemen (fade+translate dasar): 200-400ms. */
export const ENTRANCE_DURATION_SECONDS = 0.3;

/** Durasi micro-interaction hover: 120-200ms. */
export const HOVER_DURATION_SECONDS = 0.16;

/** Jarak antar-item saat stagger: 40-80ms. */
export const STAGGER_GAP_SECONDS = 0.06;

/** Durasi animasi signature "wah" (color-block reveal, split-open, dll): 400-600ms. */
export const SIGNATURE_DURATION_SECONDS = 0.5;
