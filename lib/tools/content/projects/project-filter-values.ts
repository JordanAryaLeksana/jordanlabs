import { PROJECTS } from "@/lib/config/projects";

export const PROJECT_CATEGORIES = [
  ...new Set(
    PROJECTS.map(
      (project) => project.category
    )
  ),
];

export const PROJECT_TAGS = [
  ...new Set(
    PROJECTS.flatMap(
      (project) => project.tags
    )
  ),
];
