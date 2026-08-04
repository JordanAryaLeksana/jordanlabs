import type { ResponseLanguage } from "../ai/reponseLanguage";
const CV_CONFIRMATION_BY_LANGUAGE: Record<
  ResponseLanguage,
  string
> = {
  id: "Tentu, CV Jordan sudah saya siapkan.",
  en: "Sure, I've prepared Jordan's CV below.",
};

export function getCvConfirmationText(
  language: ResponseLanguage
): string {
  return CV_CONFIRMATION_BY_LANGUAGE[language];
}