import { ResponseLanguage } from "../ai/reponseLanguage";

export type ConfirmationKey =
  | "cv-ready";

const CONFIRMATION_TEXT_BY_KEY: Record<
  ConfirmationKey,
  Record<ResponseLanguage, string>
> = {
  "cv-ready": {
    id: "Tentu, CV Jordan sudah saya siapkan.",
    en: "Sure, I've prepared Jordan's CV below.",
  },
};

export function getConfirmationText(
  key: ConfirmationKey,
  language: ResponseLanguage
): string {
  return CONFIRMATION_TEXT_BY_KEY[key][language];
}