import { isScrollToSectionInput } from "@/lib/tools/navigation/isScrollToSectionInput";
import type { ScrollToSectionOutput } from "@/lib/tools/navigation/navigation-tool-outputs";
import type { SectionId } from "@/lib/tools/types";

interface ExecuteScrollToSectionOptions {
  input: unknown;
  findSection: (
    sectionId: SectionId
  ) => HTMLElement | null;
}

export function executeScrollToSection({
  input,
  findSection,
}: ExecuteScrollToSectionOptions): ScrollToSectionOutput {
  if (!isScrollToSectionInput(input)) {
    return {
      status: "error",
      message:
        "The requested portfolio section is invalid.",
    };
  }

  const section = findSection(input.sectionId);

  if (!section) {
    return {
      status: "error",
      sectionId: input.sectionId,
      message:
        "The requested section is not available on the current page.",
    };
  }

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  return {
    status: "success",
    sectionId: input.sectionId,
    message:
      "The requested portfolio section was opened.",
  };
}