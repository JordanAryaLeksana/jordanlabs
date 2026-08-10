import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import { ExternalResourceResult } from "@/components/pages/chat/resources/ExternalResourceResult";
import type { ExternalResourceToolPart } from "@/components/pages/chat/resources/isExternalResourceToolPart";

interface ExternalResourceToolRendererProps {
  part: ExternalResourceToolPart;
}

export function ExternalResourceToolRenderer({
  part,
}: ExternalResourceToolRendererProps) {
  if (
    part.state === "input-streaming" ||
    part.state === "input-available"
  ) {
    return (
      <div
        role="status"
        aria-live="polite"
      >
        <ChatMessageBubble role="assistant">
          Preparing the external resource…
        </ChatMessageBubble>
      </div>
    );
  }

  if (
    part.state === "output-error"
  ) {
    return (
      <div
        role="alert"
        aria-live="assertive"
      >
        <ChatMessageBubble role="assistant">
          {part.errorText ??
            "The external resource could not be prepared."}
        </ChatMessageBubble>
      </div>
    );
  }

  if (
    part.state === "output-available"
  ) {
    return (
      <ExternalResourceResult
        value={part.output}
      />
    );
  }

  return null;
}
