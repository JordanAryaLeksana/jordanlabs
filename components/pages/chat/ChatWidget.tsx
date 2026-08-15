"use client";

import { AgentComposer } from "./AgentComposer/AgentComposer";
import { AgentConversation } from "./AgentConversation/AgentConversation";
import { AgentWorkspace } from "@/components/pages/chat/AgentWorkspace";
import type { ChatWidgetVariant } from "@/components/pages/chat/chatTypes";
import { hasConversationStarted } from "./AgentConversation/hasConversationStarted";
import { usePortfolioChat } from "./usePortfolioChat";

interface ChatWidgetProps {
  className?: string;
  variant?: ChatWidgetVariant;
}

export function ChatWidget({
  className,
  variant = "workspace",
}: ChatWidgetProps) {
  const compact = variant === "dock";
  const { messages } = usePortfolioChat();
  const conversationStarted = hasConversationStarted(messages);

  return (
    <AgentWorkspace
      className={className}
      conversationStarted={conversationStarted}
      conversation={<AgentConversation compact={compact} />}
      composer={<AgentComposer compact={compact} />}
    />
  );
}
