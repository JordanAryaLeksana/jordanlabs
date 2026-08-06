import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { FadeIn } from "@/components/interfaces/motion/FadeIn";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";

type MessageRole = "assistant" | "user";

interface ChatMessageBubbleProps {
  role: MessageRole;
  children: ReactNode;
}

const ALIGNMENT_CLASS_NAME: Record<MessageRole, string> = {
  assistant: "justify-start",
  user: "justify-end",
};
const BUBBLE_WIDTH_CLASS_NAME: Record<MessageRole, string> = {
  assistant: "max-w-[min(100%,44rem)]",
  user: "max-w-[min(88%,36rem)]",
};
const BUBBLE_COLOR_CLASS_NAME: Record<MessageRole, string> = {
  assistant: "bg-ink-panel text-text-on-dark",
  user: "bg-pine text-text-on-dark",
};

export function ChatMessageBubble({
  role,
  children,
}: ChatMessageBubbleProps) {
  return (
    <FadeIn
      className={cn("flex", ALIGNMENT_CLASS_NAME[role])}
      distancePx={12}
    >
      <div
        className={cn(
          "w-fit min-w-0 px-4 py-3",
          BUBBLE_WIDTH_CLASS_NAME[role],
          BUBBLE_COLOR_CLASS_NAME[role]
        )}
      >
        <Typography
          as="div"
          variant="text"
          size="sm"
          className="whitespace-pre-wrap break-words leading-6"
        >
          {children}
        </Typography>
      </div>
    </FadeIn>
  );
}