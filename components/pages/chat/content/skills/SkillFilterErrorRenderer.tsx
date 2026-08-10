import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import type { SkillFilterErrorPart } from "@/components/pages/chat/content/skills/isSkillFilterErrorPart";

interface SkillFilterErrorRendererProps {
  part: SkillFilterErrorPart;
}

export function SkillFilterErrorRenderer({
  part,
}: SkillFilterErrorRendererProps) {
  const message =
    typeof part.data.message ===
      "string" &&
    part.data.message.trim() !== ""
      ? part.data.message
      : "Jordan's skills could not be filtered.";

  return (
    <div
      role="alert"
      aria-live="assertive"
    >
      <ChatMessageBubble role="assistant">
        {message}
      </ChatMessageBubble>
    </div>
  );
}