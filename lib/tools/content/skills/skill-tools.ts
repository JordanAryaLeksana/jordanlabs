import "server-only";

import { tool } from "ai";

import {
  filterSkills,
} from "@/lib/tools/content/skills/filterSkills";

import {
  filterSkillsInputSchema,
  filterSkillsOutputSchema,
} from "@/lib/tools/content/skills/skill-filter-schemas";

export function createSkillContentTools() {
  return {
    filterSkills: tool({
      description:
        "Filter Jordan Arya Leksana's documented skills by category when the visitor explicitly asks to see or filter skills.",

      inputSchema:
        filterSkillsInputSchema,

      outputSchema:
        filterSkillsOutputSchema,

      execute: async (input) => {
        return filterSkills(
          input
        );
      },
    }),
  };
}
