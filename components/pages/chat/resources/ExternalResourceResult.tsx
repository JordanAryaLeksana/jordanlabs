import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import { ExternalResourceCard } from "@/components/pages/chat/resources/ExternalResourceCard";
import { isExternalResourceOutput } from "@/components/pages/chat/resources/isExternalResourceOutput";

interface ExternalResourceResultProps {
  value: unknown;
}

export function ExternalResourceResult({
  value,
}: ExternalResourceResultProps) {
  if (
    !isExternalResourceOutput(
      value
    )
  ) {
    return (
      <div
        role="alert"
        aria-live="assertive"
      >
        <ChatMessageBubble role="assistant">
          The external resource could not be validated.
        </ChatMessageBubble>
      </div>
    );
  }

  return (
    <ExternalResourceCard
      data={value}
    />
  );
}
