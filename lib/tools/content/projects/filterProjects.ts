import "server-only";

import { getProjects } from "@/lib/projects/getProjects";

import type {
  FilterProjectsInput,
  FilterProjectsOutput,
} from "@/lib/tools/content/projects/project-filter-types";

export function filterProjects(
  input: FilterProjectsInput
): FilterProjectsOutput {
  const projects =
    getProjects().filter(
      (project) => {
        if (
          input.category !== undefined &&
          project.category !==
          input.category
        ) {
          return false;
        }

        if (
          input.tag !== undefined
        ) {
          const projectTags:
            readonly string[] =
            project.tags;

          if (
            !projectTags.includes(
              input.tag
            )
          ) {
            return false;
          }
        }

        if (
          input.featured !== undefined &&
          project.featured !==
          input.featured
        ) {
          return false;
        }

        return true;
      }
    );

  const projectItems =
    projects.map(
      (project) => ({
        id: project.id,
        slug: project.slug,
        title: project.title,
        category:
          project.category,
        tags: [...project.tags],
        featured:
          project.featured,
        status: project.status,
        role: project.role,
        shortDescription:
          project.shortDescription,
      })
    );

  const filterNames = [
    input.category,
    input.tag,
    input.featured === true
      ? "featured"
      : input.featured === false
        ? "not featured"
        : undefined,
  ].filter(
    (value): value is string =>
      value !== undefined
  );

  const description =
    filterNames.length > 0
      ? filterNames.join(", ")
      : "all projects";

  return {
    kind:
      "project-filter-results",
    filters: {
      ...input,
    },
    projects: projectItems,
    count: projectItems.length,
    message:
      projectItems.length > 0
        ? `Found ${projectItems.length} project${projectItems.length === 1 ? "" : "s"} matching ${description}.`
        : `No projects match ${description}.`,
  };
}
