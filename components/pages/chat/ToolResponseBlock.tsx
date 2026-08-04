import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import type { PortfolioToolResult } from "@/components/pages/chat/getPortfolioToolOutputs";
import { ToolResultRenderer } from "@/components/pages/chat/ToolResultRenderer";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";

interface ToolResponseBlockProps {
  result: PortfolioToolResult;
}

export function ToolResponseBlock({
  result,
}: ToolResponseBlockProps) {
  return (
    <article className="flex w-full flex-col items-start gap-2">
      <Typography
        as="p"
        variant="text"
        size="xs"
        weight="bold"
        className="uppercase tracking-[0.14em] opacity-50"
      >
        Jordan AI
      </Typography>

      <ChatMessageBubble role="assistant">
        {result.output.confirmationText}
      </ChatMessageBubble>

      <div className="w-full max-w-2xl">
        <ToolResultRenderer output={result.output} />
      </div>
    </article>
  );
}