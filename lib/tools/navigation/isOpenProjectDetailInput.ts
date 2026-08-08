import type { OpenProjectDetailInput } from "@/lib/tools/navigation/navigation-tool-inputs";
import {
  PROJECT_IDS,
  PROJECT_SECTION_IDS,
} from "@/lib/tools/types";

const PROJECT_ID_VALUES = new Set<string>(
  Object.values(PROJECT_IDS)
);

const PROJECT_SECTION_ID_VALUES =
  new Set<string>(
    Object.values(PROJECT_SECTION_IDS)
  );

export function isOpenProjectDetailInput(
  value: unknown
): value is OpenProjectDetailInput {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const candidate = value as {
    projectId?: unknown;
    sectionId?: unknown;
  };

  const hasValidProjectId =
    typeof candidate.projectId === "string" &&
    PROJECT_ID_VALUES.has(
      candidate.projectId
    );

  const hasValidSectionId =
    candidate.sectionId === undefined ||
    (
      typeof candidate.sectionId ===
        "string" &&
      PROJECT_SECTION_ID_VALUES.has(
        candidate.sectionId
      )
    );

  return (
    hasValidProjectId &&
    hasValidSectionId
  );
}
