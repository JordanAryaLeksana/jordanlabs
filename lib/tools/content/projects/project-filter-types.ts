import type { Project } from "@/lib/config/projects";

export type ProjectCategory =
  Project["category"];

export type ProjectTag =
  Project["tags"][number];

export interface FilterProjectsInput {
  category?: ProjectCategory;
  tag?: ProjectTag;
  featured?: boolean;
}

export interface ProjectFilterItem {
  id: Project["id"];
  slug: Project["slug"];
  title: Project["title"];
  category: Project["category"];
  tags: readonly string[];
  featured: boolean;
  status: Project["status"];
  role: Project["role"];
  shortDescription: string;
}

export interface FilterProjectsOutput {
  kind: "project-filter-results";

  filters: {
    category?: ProjectCategory;
    tag?: ProjectTag;
    featured?: boolean;
  };

  projects: ProjectFilterItem[];
  count: number;
  message: string;
}
