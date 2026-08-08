import type { OpenProjectDetailInput } from "@/lib/tools/navigation/navigation-tool-inputs";
import type {
  ProjectDetailRoute,
  ProjectDetailTarget,
} from "@/lib/tools/types";

export function getProjectDetailTarget(
  input: OpenProjectDetailInput
): ProjectDetailTarget {
  const route =
    `/projects/${input.projectId}` as ProjectDetailRoute;

  if (!input.sectionId) {
    return route;
  }

  return (
    `${route}#${input.sectionId}` as
      ProjectDetailTarget
  );
}
