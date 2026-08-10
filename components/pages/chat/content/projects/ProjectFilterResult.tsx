import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import { isProjectFilterOutput } from "@/components/pages/chat/content/projects/isProjectFilterOutput";
import { ProjectFilterResults } from "@/components/pages/chat/content/projects/ProjectFilterResults";

interface ProjectFilterResultProps {
  value: unknown;
}

export function ProjectFilterResult({
  value,
}: ProjectFilterResultProps) {
  if (
    !isProjectFilterOutput(
      value
    )
  ) {
    return (
      <div
        role="alert"
        aria-live="assertive"
      >
        <ChatMessageBubble role="assistant">
          The project results could not be validated.
        </ChatMessageBubble>
      </div>
    );
  }

  return (
    <ProjectFilterResults
      data={value}
    />
  );
}
