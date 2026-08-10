import { SkillFilterResult } from "@/components/pages/chat/content/skills/SkillFilterResult";
import type { SkillFilterDataPart } from "@/components/pages/chat/content/skills/isSkillFilterDataPart";

interface SkillFilterDataRendererProps {
  part: SkillFilterDataPart;
}

export function SkillFilterDataRenderer({
  part,
}: SkillFilterDataRendererProps) {
  return (
    <SkillFilterResult
      value={part.data}
    />
  );
}