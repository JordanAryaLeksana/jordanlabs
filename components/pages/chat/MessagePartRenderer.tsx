import type { UIMessage } from "ai";
import { cn } from "@/lib/cn";
import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import { getMessageText } from "@/components/pages/chat/getMessageText";
import { getPortfolioToolOutputs } from "@/components/pages/chat/getPortfolioToolOutputs";
import { ToolResponseBlock } from "@/components/pages/chat/ToolResponseBlock";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";

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

  const role = message.role;
  const toolResults =
    getPortfolioToolOutputs(message);

  /*
   * Output tool mengambil prioritas atas teks model agar prose
   * tambahan dari model tidak menghasilkan konfirmasi ganda.
   */
  if (
    role === "assistant" &&
    toolResults.length > 0
  ) {
    return (
      <div className="flex w-full flex-col gap-5">
        {toolResults.map((result) => (
          <ToolResponseBlock
            key={result.id}
            result={result}
          />
        ))}
      </div>
    );
  }

  const messageText = getMessageText(message);

  if (messageText.trim() === "") {
    return null;
  }

  return (
    <article
      className={cn(
        "flex w-full flex-col gap-2",
        role === "user"
          ? "items-end"
          : "items-start"
      )}
    >
      {role === "assistant" ? (
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

      <ChatMessageBubble role={role}>
        {messageText}
      </ChatMessageBubble>
    </article>
  );
}