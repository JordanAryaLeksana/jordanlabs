import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import { ProjectFilterResult } from "@/components/pages/chat/content/projects/ProjectFilterResult";
import type { ProjectFilterToolPart } from "@/components/pages/chat/content/projects/isProjectFilterToolPart";

interface ProjectFilterToolRendererProps {
  part: ProjectFilterToolPart;
}

export function ProjectFilterToolRenderer({
  part,
}: ProjectFilterToolRendererProps) {
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
          Filtering Jordan&apos;s projects…
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
            "Jordan's projects could not be filtered."}
        </ChatMessageBubble>
      </div>
    );
  }

  if (
    part.state ===
      "output-available"
  ) {
    return (
      <ProjectFilterResult
        value={part.output}
      />
    );
  }

  return null;
}
