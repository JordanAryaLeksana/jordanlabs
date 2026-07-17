const PHRASE_HOLD_BASE_MS = 500;
const PHRASE_HOLD_MS_PER_CHARACTER = 25;

/**
 * Fungsi ini digunakan untuk menghitung jeda tahan sebuah frasa intro SETELAH
 * animasi reveal-nya selesai, sebelum frasa itu keluar. Jeda dibuat
 * proporsional dengan panjang frasa supaya kalimat lebih panjang tetap sempat
 * terbaca. Durasi reveal huruf tidak dihitung di sini -- pemanggil menunggu
 * sinyal onRevealComplete dari KineticHeading dulu, baru memulai jeda ini
 * (perbaikan bug frasa terpotong; CLAUDE.md §11: perpindahan digerakkan
 * selesainya animasi, bukan perkiraan durasi).
 */
export function computePhraseHoldMs(phrase: string): number {
  return PHRASE_HOLD_BASE_MS + phrase.length * PHRASE_HOLD_MS_PER_CHARACTER;
}
