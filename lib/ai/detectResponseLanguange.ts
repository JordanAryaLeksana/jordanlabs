import type { ResponseLanguage } from "./reponseLanguage";

const INDONESIAN_WORD_PATTERN =
  /\b(saya|boleh|bolehkah|tolong|mau|ingin|bisa|lihat|melihat|tampilkan|unduh|hubungi|proyek|keahlian|pengalaman|apakah|yang|untuk|dengan)\b/i;

export function detectResponseLanguage(
  userText: string
): ResponseLanguage {
  const normalizedText = userText.normalize("NFKC");

  return INDONESIAN_WORD_PATTERN.test(normalizedText)
    ? "id"
    : "en";
}