import type { ScrollToSectionInput } from "@/lib/tools/navigation/navigation-tool-inputs";
import { SECTION_IDS } from "@/lib/tools/types";

const SECTION_ID_VALUES = new Set<string>(
  Object.values(SECTION_IDS)
);

export function isScrollToSectionInput(
  value: unknown
): value is ScrollToSectionInput {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const candidate = value as {
    sectionId?: unknown;
  };

  return (
    typeof candidate.sectionId === "string" &&
    SECTION_ID_VALUES.has(candidate.sectionId)
  );
}