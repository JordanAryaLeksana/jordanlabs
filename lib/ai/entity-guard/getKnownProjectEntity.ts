import "server-only";

import type { Project } from "@/lib/config/projects";
import { findMentionedProjects } from "@/lib/projects/matchProjects";

const PROJECT_KNOWLEDGE_PATTERNS = [
  /\btell me about\b/i,
  /\bdescribe\b/i,
  /\bexplain\b/i,
  /\bwhat is\b/i,
  /\bwhat's\b/i,

  /\bceritakan\b/i,
  /\bjelaskan\b/i,
  /\bapa itu\b/i,
];

export function getKnownProjectEntity(
  userText: string
): Project | null {
  const isKnowledgeRequest =
    PROJECT_KNOWLEDGE_PATTERNS.some(
      (pattern) =>
        pattern.test(userText)
    );

  if (!isKnowledgeRequest) {
    return null;
  }

  const matchingProjects =
    findMentionedProjects(userText);

  /*
   * Satu entity harus dapat di-resolve
   * tanpa ambiguitas. Comparison request
   * tidak ditangani oleh resolver ini.
   */
  if (
    matchingProjects.length !== 1
  ) {
    return null;
  }

  return matchingProjects[0];
}
