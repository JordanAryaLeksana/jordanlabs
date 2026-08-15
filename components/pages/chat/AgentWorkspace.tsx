import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface AgentWorkspaceProps {
  conversation: ReactNode;
  composer: ReactNode;
  conversationStarted?: boolean;
  className?: string;
}

export function AgentWorkspace({
  conversation,
  composer,
  conversationStarted = false,
  className,
}: AgentWorkspaceProps) {
  return (
    <section
      aria-label="Jordan AI portfolio assistant"
      data-conversation-active={conversationStarted}
      className={cn(
        "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden",
        "text-current",
        className
      )}
    >
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {conversation}
      </div>

      {composer}
    </section>
  );
}
