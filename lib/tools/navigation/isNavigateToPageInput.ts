import type { NavigateToPageInput } from "@/lib/tools/navigation/navigation-tool-inputs";
import { PAGE_ROUTES } from "@/lib/tools/types";

const PAGE_ROUTE_VALUES = new Set<string>(
  Object.values(PAGE_ROUTES)
);

export function isNavigateToPageInput(
  value: unknown
): value is NavigateToPageInput {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const candidate = value as {
    route?: unknown;
  };

  return (
    typeof candidate.route === "string" &&
    PAGE_ROUTE_VALUES.has(candidate.route)
  );
}
