import "server-only";

import {
  SKILLS_BY_CATEGORY,
} from "@/lib/config/skills";

export interface SkillKnowledgeResult {
  skillName: string;
  documented: boolean;
}

const SKILL_QUERY_PATTERNS = [
  /\bdoes\s+jordan\s+(?:know|use|have\s+experience\s+with)\s+(.+?)(?:\?|$)/i,

  /\bis\s+jordan\s+(?:familiar\s+with|experienced\s+with)\s+(.+?)(?:\?|$)/i,

  /\bapakah\s+jordan\s+(?:bisa|tahu|menguasai|pernah\s+menggunakan)\s+(.+?)(?:\?|$)/i,

  /\bjordan\s+(?:bisa|tahu|menguasai|pernah\s+menggunakan)\s+(.+?)(?:\?|$)/i,
];

function normalizeSkillName(
  value: string
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

const DOCUMENTED_SKILLS =
  Object.values(
    SKILLS_BY_CATEGORY
  ).flatMap(
    (category) =>
      category.items
  );

export function getSkillKnowledge(
  userText: string
): SkillKnowledgeResult | null {
  for (
    const pattern of
    SKILL_QUERY_PATTERNS
  ) {
    const match =
      userText.match(pattern);

    const requestedSkill =
      match?.[1]?.trim();

    if (!requestedSkill) {
      continue;
    }

    const normalizedRequestedSkill =
      normalizeSkillName(
        requestedSkill
      );

    const documentedSkill =
      DOCUMENTED_SKILLS.find(
        (skill) =>
          normalizeSkillName(
            skill
          ) ===
          normalizedRequestedSkill
      );

    return {
      skillName:
        documentedSkill ??
        requestedSkill,

      documented:
        documentedSkill !==
        undefined,
    };
  }

  return null;
}
