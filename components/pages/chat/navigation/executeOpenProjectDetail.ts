import { getProjectDetailTarget } from "@/lib/tools/navigation/getProjectDetailTarget";
import { isOpenProjectDetailInput } from "@/lib/tools/navigation/isOpenProjectDetailInput";
import type { OpenProjectDetailOutput } from "@/lib/tools/navigation/navigation-tool-outputs";
import type { ProjectDetailTarget } from "@/lib/tools/types";

interface ExecuteOpenProjectDetailOptions {
  input: unknown;
  navigate: (
    target: ProjectDetailTarget
  ) => void;
}

export function executeOpenProjectDetail({
  input,
  navigate,
}: ExecuteOpenProjectDetailOptions): OpenProjectDetailOutput {
  if (!isOpenProjectDetailInput(input)) {
    return {
      status: "error",
      message:
        "The requested portfolio project is invalid.",
    };
  }

  const target =
    getProjectDetailTarget(input);

  navigate(target);

  return {
    status: "success",
    projectId: input.projectId,
    sectionId: input.sectionId,
    target,
    message: input.sectionId
      ? "The requested project section was opened."
      : "The requested project detail was opened.",
  };
}
