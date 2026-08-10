import {
  SKILLS_BY_CATEGORY,
  type SkillCategoryId,
} from "@/lib/config/skills";

import type {
  FilterSkillsOutput,
  SkillFilterGroup,
} from "@/lib/tools/content/skills/skill-filter-types";

function isNonEmptyString(
  value: unknown
): value is string {
  return (
    typeof value === "string" &&
    value.trim() !== ""
  );
}

function isSkillCategoryId(
  value: unknown
): value is SkillCategoryId {
  return (
    typeof value === "string" &&
    value in SKILLS_BY_CATEGORY
  );
}

function isSkillFilterGroup(
  value: unknown
): value is SkillFilterGroup {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const candidate = value as {
    category?: unknown;
    label?: unknown;
    skills?: unknown;
  };

  if (
    !isSkillCategoryId(
      candidate.category
    ) ||
    !isNonEmptyString(
      candidate.label
    ) ||
    !Array.isArray(
      candidate.skills
    ) ||
    !candidate.skills.every(
      isNonEmptyString
    )
  ) {
    return false;
  }

  const trustedCategory =
    SKILLS_BY_CATEGORY[
      candidate.category
    ];

  if (
    candidate.label !==
      trustedCategory.label
  ) {
    return false;
  }

  const allowedSkills =
    new Set<string>(
      trustedCategory.items
    );

  return candidate.skills.every(
    (skill) =>
      allowedSkills.has(skill)
  );
}

export function isSkillFilterOutput(
  value: unknown
): value is FilterSkillsOutput {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const candidate = value as {
    kind?: unknown;
    filters?: unknown;
    groups?: unknown;
    count?: unknown;
    message?: unknown;
  };

  if (
    candidate.kind !==
      "skill-filter-results" ||
    typeof candidate.filters !==
      "object" ||
    candidate.filters === null ||
    !Array.isArray(
      candidate.groups
    ) ||
    !candidate.groups.every(
      isSkillFilterGroup
    ) ||
    typeof candidate.count !==
      "number" ||
    !Number.isInteger(
      candidate.count
    ) ||
    candidate.count < 0 ||
    !isNonEmptyString(
      candidate.message
    )
  ) {
    return false;
  }

  const filters =
    candidate.filters as {
      category?: unknown;
    };

  if (
    filters.category !==
      undefined &&
    !isSkillCategoryId(
      filters.category
    )
  ) {
    return false;
  }

  const totalSkills =
    candidate.groups.reduce(
      (total, group) =>
        total +
        group.skills.length,
      0
    );

  return (
    candidate.count ===
    totalSkills
  );
}