import "server-only";

import {
  PROJECTS,
} from "@/lib/config/projects";

export interface UnknownProjectEntity {
  entityName: string;
}

const PROJECT_ENTITY_PATTERNS = [
  /\bjordan(?:'s|’s)\s+(.+?)\s+project\b/i,
  /\bproject\s+(?:named|called)\s+["']?(.+?)["']?(?:\?|$)/i,
];

export function getUnknownProjectEntity(
  userText: string
): UnknownProjectEntity | null {
  for (
    const pattern of
    PROJECT_ENTITY_PATTERNS
  ) {
    const match =
      userText.match(pattern);

    const rawEntityName =
      match?.[1]?.trim();

    if (!rawEntityName) {
      continue;
    }

    const normalizedEntityName =
      rawEntityName.toLowerCase();

    const isDocumentedProject =
      PROJECTS.some(
        (project) =>
          project.title.toLowerCase() ===
            normalizedEntityName ||
          project.id.toLowerCase() ===
            normalizedEntityName ||
          project.slug.toLowerCase() ===
            normalizedEntityName ||
          project.aliases?.some((alias) =>
            alias.toLowerCase() === normalizedEntityName
          )
      );

    if (isDocumentedProject) {
      return null;
    }

    return {
      entityName:
        rawEntityName,
    };
  }

  return null;
}
