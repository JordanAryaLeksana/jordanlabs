import type { PortfolioIntent } from "./portofolioIntent";

const CV_TERM_PATTERN =
  /\b(cv|curriculum\s+vitae|resume|résumé)\b/i;

export function detectPortfolioIntent(
  userText: string
): PortfolioIntent {
  const normalizedText = userText.normalize("NFKC");

  if (CV_TERM_PATTERN.test(normalizedText)) {
    return "cv-download";
  }

  return "general";
}