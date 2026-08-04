"use client";

import { AgentComposer } from "./AgentComposer/AgentComposer";
import { AgentConversation } from "./AgentConversation/AgentConversation";
import { AgentWorkspace } from "@/components/pages/chat/AgentWorkspace";
import type { ChatWidgetVariant } from "@/components/pages/chat/chatTypes";

interface ChatWidgetProps {
  className?: string;
  variant?: ChatWidgetVariant;
}

export function ChatWidget({
  className,
  variant = "workspace",
}: ChatWidgetProps) {
  const compact = variant === "dock";

  return (
    <AgentWorkspace
      className={className}
      conversation={<AgentConversation compact={compact} />}
      composer={<AgentComposer compact={compact} />}
    />
  );
}