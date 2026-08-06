import type { UIMessage } from "ai";

import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import { getMessageText } from "@/components/pages/chat/getMessageText";
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

  const messageText = getMessageText(message);

  if (messageText.trim() === "") {
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

      <ChatMessageBubble role={message.role}>
        {messageText}
      </ChatMessageBubble>
    </article>
  );
}
