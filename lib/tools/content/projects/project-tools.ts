import "server-only";

import { tool } from "ai";

import { filterProjects } from "@/lib/tools/content/projects/filterProjects";
import {
  filterProjectsInputSchema,
  filterProjectsOutputSchema,
} from "@/lib/tools/content/projects/project-filter-schemas";

export function createProjectContentTools() {
  return {
    filterProjects: tool({
      description:
        "Filter Jordan Arya Leksana's documented portfolio projects by category, tag, or featured status when the visitor explicitly asks to see or filter projects.",

      inputSchema:
        filterProjectsInputSchema,

      outputSchema:
        filterProjectsOutputSchema,

      execute: async (input) => {
        return filterProjects(
          input
        );
      },
    }),
  };
}
