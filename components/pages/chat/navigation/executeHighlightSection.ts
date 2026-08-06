import { isHighlightSectionInput } from "@/lib/tools/navigation/isHighlightSectionInput";
import type { HighlightSectionOutput } from "@/lib/tools/navigation/navigation-tool-outputs";
import type { SectionId } from "@/lib/tools/types";

const HIGHLIGHT_ATTRIBUTE =
  "data-ai-highlight";

const HIGHLIGHT_DURATION_MS = 2400;

const highlightTimers =
  new WeakMap<HTMLElement, number>();

interface ExecuteHighlightSectionOptions {
  input: unknown;
  findSection: (
    sectionId: SectionId
  ) => HTMLElement | null;
}

export function executeHighlightSection({
  input,
  findSection,
}: ExecuteHighlightSectionOptions): HighlightSectionOutput {
  if (!isHighlightSectionInput(input)) {
    return {
      status: "error",
      message:
        "The requested portfolio section is invalid.",
    };
  }

  const section =
    findSection(input.sectionId);

  if (!section) {
    return {
      status: "error",
      sectionId: input.sectionId,
      message:
        "The requested section is not available on the current page.",
    };
  }

  const currentTimer =
    highlightTimers.get(section);

  if (currentTimer !== undefined) {
    window.clearTimeout(currentTimer);
  }

  section.setAttribute(
    HIGHLIGHT_ATTRIBUTE,
    "true"
  );

  const timerId = window.setTimeout(() => {
    section.removeAttribute(
      HIGHLIGHT_ATTRIBUTE
    );

    highlightTimers.delete(section);
  }, HIGHLIGHT_DURATION_MS);

  highlightTimers.set(
    section,
    timerId
  );

  return {
    status: "success",
    sectionId: input.sectionId,
    message:
      "The requested portfolio section was highlighted.",
  };
}
