import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { FadeIn } from "@/components/interfaces/motion/FadeIn";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";

type MessageRole = "assistant" | "user";

interface ChatMessageBubbleProps {
  role: MessageRole;
  children: ReactNode;
}

function renderInlineFormatting(
  text: string
) {
  const parts = text.split(
    /(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g
  );

  return parts.map(
    (part, index) => {
      if (
        part.startsWith("**") &&
        part.endsWith("**")
      ) {
        return (
          <strong key={index}>
            {part.slice(2, -2)}
          </strong>
        );
      }

      if (
        part.startsWith("*") &&
        part.endsWith("*")
      ) {
        return (
          <em key={index}>
            {part.slice(1, -1)}
          </em>
        );
      }

      return part;
    }
  );
}
const ALIGNMENT_CLASS_NAME: Record<MessageRole, string> = {
  assistant: "justify-start",
  user: "justify-end",
};
const BUBBLE_WIDTH_CLASS_NAME: Record<MessageRole, string> = {
  assistant: "max-w-[min(100%,48rem)]",
  user: "max-w-[min(88%,36rem)]",
};
const BUBBLE_COLOR_CLASS_NAME: Record<MessageRole, string> = {
  assistant: "border-l-2 border-coral/60 bg-transparent pl-5 text-current",
  user: "rounded-2xl rounded-br-md bg-pine text-text-on-dark shadow-sm",
};

export function ChatMessageBubble({
  role,
  children,
}: ChatMessageBubbleProps) {
  const content =
    role === "assistant" &&
      typeof children === "string"
      ? renderInlineFormatting(
        children
      )
      : children;
  return (
    <FadeIn
      className={cn("flex", ALIGNMENT_CLASS_NAME[role])}
      distancePx={12}
    >
      <div
        className={cn(
          "w-fit min-w-0",
          role === "assistant" ? "py-1 pr-2" : "px-4 py-3",
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
          {content}
        </Typography>
      </div>
    </FadeIn>
  );
}
