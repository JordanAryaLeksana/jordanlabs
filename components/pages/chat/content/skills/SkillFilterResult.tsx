import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import { isSkillFilterOutput } from "@/components/pages/chat/content/skills/isSkillFilterOutput";
import { SkillFilterResults } from "@/components/pages/chat/content/skills/SkillFilterResults";

interface SkillFilterResultProps {
  value: unknown;
}

export function SkillFilterResult({
  value,
}: SkillFilterResultProps) {
  if (
    !isSkillFilterOutput(
      value
    )
  ) {
    return (
      <div
        role="alert"
        aria-live="assertive"
      >
        <ChatMessageBubble role="assistant">
          The skill results could not be validated.
        </ChatMessageBubble>
      </div>
    );
  }

  return (
    <SkillFilterResults
      data={value}
    />
  );
}