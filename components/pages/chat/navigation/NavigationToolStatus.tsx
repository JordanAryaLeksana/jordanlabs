import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import type { NavigationToolPart } from "@/components/pages/chat/navigation/isNavigationToolPart";

interface NavigationToolStatusProps {
  part: NavigationToolPart;
}

export function NavigationToolStatus({
  part,
}: NavigationToolStatusProps) {
  const output =
    typeof part.output === "object" &&
      part.output !== null
      ? (
        part.output as {
          status?: unknown;
          message?: unknown;
        }
      )
      : null;

  const outputMessage =
    typeof output?.message === "string"
      ? output.message
      : null;

  let statusText: string | null = null;

  if (
    part.state === "input-streaming" ||
    part.state === "input-available"
  ) {
    if (
      part.type === "tool-navigateToPage"
    ) {
      statusText =
        "Opening the requested portfolio page…";
    } else if (
      part.type === "tool-scrollToSection"
    ) {
      statusText =
        "Moving to the requested portfolio section…";
    } else if (
      part.type === "tool-highlightSection"
    ) {
      statusText =
        "Moving to and highlighting the requested portfolio section…";
    } else {
      statusText =
        "Opening the requested project detail…";
    }
  }
  if (part.state === "output-available") {
    if (output?.status === "error") {
      statusText =
        outputMessage ??
        "The requested navigation could not be completed.";
    } else {
      statusText =
        outputMessage ??
        "Navigation completed successfully.";
    }
  }

  if (part.state === "output-error") {
    statusText =
      part.errorText ??
      "The navigation action failed.";
  }

  if (!statusText) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full"
    >
      <ChatMessageBubble role="assistant">
        {statusText}
      </ChatMessageBubble>
    </div>
  );
}
