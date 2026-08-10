import { ProjectFilterResult } from "@/components/pages/chat/content/projects/ProjectFilterResult";
import type { ProjectFilterDataPart } from "@/components/pages/chat/content/projects/isProjectFilterDataPart";

interface ProjectFilterDataRendererProps {
  part: ProjectFilterDataPart;
}

export function ProjectFilterDataRenderer({
  part,
}: ProjectFilterDataRendererProps) {
  return (
    <ProjectFilterResult
      value={part.data}
    />
  );
}
