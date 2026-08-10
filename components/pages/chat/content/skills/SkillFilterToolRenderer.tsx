import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import { SkillFilterResult } from "@/components/pages/chat/content/skills/SkillFilterResult";
import type { SkillFilterToolPart } from "@/components/pages/chat/content/skills/isSkillFilterToolPart";

interface SkillFilterToolRendererProps {
  part: SkillFilterToolPart;
}

export function SkillFilterToolRenderer({
  part,
}: SkillFilterToolRendererProps) {
  if (
    part.state ===
      "input-streaming" ||
    part.state ===
      "input-available"
  ) {
    return (
      <div
        role="status"
        aria-live="polite"
      >
        <ChatMessageBubble role="assistant">
          Filtering Jordan&apos;s skills…
        </ChatMessageBubble>
      </div>
    );
  }

  if (
    part.state ===
      "output-error"
  ) {
    return (
      <div
        role="alert"
        aria-live="assertive"
      >
        <ChatMessageBubble role="assistant">
          {part.errorText ??
            "Jordan's skills could not be filtered."}
        </ChatMessageBubble>
      </div>
    );
  }

  if (
    part.state ===
      "output-available"
  ) {
    return (
      <SkillFilterResult
        value={part.output}
      />
    );
  }

  return null;
}