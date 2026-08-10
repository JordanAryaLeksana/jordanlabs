import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import type { ProjectFilterErrorPart } from "@/components/pages/chat/content/projects/isProjectFilterErrorPart";

interface ProjectFilterErrorRendererProps {
  part: ProjectFilterErrorPart;
}

export function ProjectFilterErrorRenderer({
  part,
}: ProjectFilterErrorRendererProps) {
  const message =
    typeof part.data.message ===
      "string" &&
    part.data.message.trim() !== ""
      ? part.data.message
      : "Jordan's projects could not be filtered.";

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
