import "server-only";

import {
  findMentionedProjects,
  isDocumentedProjectName,
  normalizeMatchText,
} from "@/lib/projects/matchProjects";

export interface UnknownProjectEntity {
  entityName: string;
}

const PROJECT_ENTITY_PATTERNS = [
  /\bjordan(?:'s|’s)\s+(.+?)\s+project\b/i,
  /\bproject\s+(?:named|called)\s+["']?(.+?)["']?(?:\?|$)/i,
];

/*
 * Words that describe a project instead of naming one:
 * "Jordan's latest project", "Jordan's best AI project", ...
 * Those questions go to retrieval instead of the unknown-project guard.
 */
const DESCRIPTOR_WORDS = new Set([
  "a", "an", "the", "most", "very", "own", "main", "top", "biggest", "big", "best",
  "strongest", "favorite", "favourite", "latest", "newest", "new", "recent", "current",
  "last", "first", "previous", "older", "old", "ongoing", "active", "flagship", "major",
  "side", "personal", "solo", "team", "group", "client", "freelance", "hackathon",
  "thesis", "research", "internship", "university", "school", "college", "lab",
  "ai", "ml", "llm", "rag", "backend", "frontend", "full-stack", "fullstack", "web",
  "mobile", "iot", "deep", "learning", "machine", "computer", "vision", "data",
  "software", "go", "golang", "python", "typescript", "next.js", "nextjs", "react",
  "e-commerce", "ecommerce", "video", "live", "deployed", "production", "open-source",
  "github", "portfolio", "important", "impressive", "successful", "complex",
]);

function isDescriptorPhrase(phrase: string) {
  const words = normalizeMatchText(phrase)
    .split(/[\s,/]+/)
    .filter(Boolean);

  return words.length > 0 && words.every((word) => DESCRIPTOR_WORDS.has(word));
}

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

    if (
      isDocumentedProjectName(rawEntityName) ||
      findMentionedProjects(rawEntityName).length > 0 ||
      isDescriptorPhrase(rawEntityName)
    ) {
      return null;
    }

    return {
      entityName:
        rawEntityName,
    };
  }

  return null;
}
