import { PROJECTS } from "@/lib/config/projects";

export function getProject(slug: string) { return PROJECTS.find((project) => project.slug === slug); }
