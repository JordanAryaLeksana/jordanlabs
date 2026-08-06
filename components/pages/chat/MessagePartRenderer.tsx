import type { UIMessage } from "ai";

import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import { getMessageText } from "@/components/pages/chat/getMessageText";
import { isNavigationToolPart } from "@/components/pages/chat/navigation/isNavigationToolPart";
import { NavigationToolStatus } from "@/components/pages/chat/navigation/NavigationToolStatus";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { cn } from "@/lib/cn";

interface MessagePartRendererProps {
  message: UIMessage;
}

export function MessagePartRenderer({
  message,
}: MessagePartRendererProps) {
  if (
    message.role !== "assistant" &&
    message.role !== "user"
  ) {
    return null;
  }

  const messageText =
    getMessageText(message).trim();

  const navigationToolParts =
    message.parts.filter(
      isNavigationToolPart
    );

  const hasText =
    messageText !== "";

  const hasNavigationTool =
    navigationToolParts.length > 0;

  /*
   * Tool-only assistant messages tidak mempunyai text.
   * Jangan membuang message selama masih ada tool part.
   */
  if (!hasText && !hasNavigationTool) {
    return null;
  }

  return (
    <article
      className={cn(
        "flex w-full flex-col gap-2",

        message.role === "user"
          ? "items-end"
          : "items-start"
      )}
    >
      {message.role === "assistant" ? (
        <Typography
          as="p"
          variant="text"
          size="xs"
          weight="bold"
          className="uppercase tracking-[0.14em] opacity-50"
        >
          Jordan AI
        </Typography>
      ) : null}

      {hasText ? (
        <ChatMessageBubble
          role={message.role}
        >
          {messageText}
        </ChatMessageBubble>
      ) : null}

      {message.role === "assistant"
        ? navigationToolParts.map(
            (part) => {
              return (
                <NavigationToolStatus
                  key={part.toolCallId}
                  part={part}
                />
              );
            }
          )
        : null}
    </article>
  );
}