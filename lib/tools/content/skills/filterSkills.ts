import "server-only";

import {
  SKILLS_BY_CATEGORY,
  type SkillCategoryId,
} from "@/lib/config/skills";

import type {
  FilterSkillsInput,
  FilterSkillsOutput,
} from "@/lib/tools/content/skills/skill-filter-types";

export function filterSkills(
  input: FilterSkillsInput
): FilterSkillsOutput {
  const categories: SkillCategoryId[] =
    input.category !== undefined
      ? [input.category]
      : (
          Object.keys(
            SKILLS_BY_CATEGORY
          ) as SkillCategoryId[]
        );

  const groups =
    categories.map(
      (category) => {
        const group =
          SKILLS_BY_CATEGORY[
            category
          ];

        return {
          category,
          label: group.label,
          skills: [
            ...group.items,
          ],
        };
      }
    );

  const count =
    groups.reduce(
      (total, group) =>
        total +
        group.skills.length,
      0
    );

  return {
    kind:
      "skill-filter-results",

    filters: {
      ...input,
    },

    groups,

    count,

    message:
      input.category !==
      undefined
        ? `Found ${count} documented skills in ${SKILLS_BY_CATEGORY[input.category].label}.`
        : `Found ${count} documented skills across ${groups.length} categories.`,
  };
}
