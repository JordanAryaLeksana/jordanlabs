import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { FadeIn } from "@/components/interfaces/motion/FadeIn";

type MessageRole = "assistant" | "user";

interface ChatMessageBubbleProps {
  role: MessageRole;
  children: ReactNode;
}

const ALIGNMENT_CLASS_NAME: Record<MessageRole, string> = {
  assistant: "justify-start",
  user: "justify-end",
};

const BUBBLE_COLOR_CLASS_NAME: Record<MessageRole, string> = {
  assistant: "bg-ink-panel text-text-on-dark",
  user: "bg-pine text-text-on-dark",
};

export function ChatMessageBubble({ role, children }: ChatMessageBubbleProps) {
  return (
    <FadeIn className={cn("flex", ALIGNMENT_CLASS_NAME[role])} distancePx={12}>
      <div className={cn("max-w-[80%] px-4 py-3 font-sans text-sm", BUBBLE_COLOR_CLASS_NAME[role])}>{children}</div>
    </FadeIn>
  );
}
