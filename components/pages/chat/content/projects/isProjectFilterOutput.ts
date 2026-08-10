import { PROJECT_IDS } from "@/lib/tools/types";
import type {
  FilterProjectsOutput,
  ProjectFilterItem,
} from "@/lib/tools/content/projects/project-filter-types";

const PROJECT_ID_VALUES =
  new Set<string>(
    Object.values(PROJECT_IDS)
  );

function isNonEmptyString(
  value: unknown
): value is string {
  return (
    typeof value === "string" &&
    value.trim() !== ""
  );
}

function isProjectFilterItem(
  value: unknown
): value is ProjectFilterItem {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const candidate = value as {
    id?: unknown;
    slug?: unknown;
    title?: unknown;
    category?: unknown;
    tags?: unknown;
    featured?: unknown;
    status?: unknown;
    role?: unknown;
    shortDescription?: unknown;
  };

  if (
    !isNonEmptyString(candidate.id) ||
    !PROJECT_ID_VALUES.has(
      candidate.id
    ) ||
    !isNonEmptyString(
      candidate.slug
    ) ||
    candidate.slug !==
      candidate.id ||
    !isNonEmptyString(
      candidate.title
    ) ||
    !isNonEmptyString(
      candidate.category
    ) ||
    !Array.isArray(
      candidate.tags
    ) ||
    !candidate.tags.every(
      isNonEmptyString
    ) ||
    typeof candidate.featured !==
      "boolean" ||
    !isNonEmptyString(
      candidate.status
    ) ||
    !isNonEmptyString(
      candidate.role
    ) ||
    !isNonEmptyString(
      candidate.shortDescription
    )
  ) {
    return false;
  }

  return true;
}

export function isProjectFilterOutput(
  value: unknown
): value is FilterProjectsOutput {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const candidate = value as {
    kind?: unknown;
    filters?: unknown;
    projects?: unknown;
    count?: unknown;
    message?: unknown;
  };

  if (
    candidate.kind !==
      "project-filter-results" ||
    typeof candidate.filters !==
      "object" ||
    candidate.filters === null ||
    !Array.isArray(
      candidate.projects
    ) ||
    !candidate.projects.every(
      isProjectFilterItem
    ) ||
    typeof candidate.count !==
      "number" ||
    !Number.isInteger(
      candidate.count
    ) ||
    candidate.count < 0 ||
    candidate.count !==
      candidate.projects.length ||
    !isNonEmptyString(
      candidate.message
    )
  ) {
    return false;
  }

  const filters =
    candidate.filters as {
      category?: unknown;
      tag?: unknown;
      featured?: unknown;
    };

  if (
    filters.category !==
      undefined &&
    !isNonEmptyString(
      filters.category
    )
  ) {
    return false;
  }

  if (
    filters.tag !== undefined &&
    !isNonEmptyString(
      filters.tag
    )
  ) {
    return false;
  }

  if (
    filters.featured !==
      undefined &&
    typeof filters.featured !==
      "boolean"
  ) {
    return false;
  }

  return true;
}
