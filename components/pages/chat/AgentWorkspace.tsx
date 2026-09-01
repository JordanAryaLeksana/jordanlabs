import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface AgentWorkspaceProps {
  conversation: ReactNode;
  composer: ReactNode;
  conversationStarted?: boolean;
  className?: string;
  contained?: boolean;
}

export function AgentWorkspace({
  conversation,
  composer,
  conversationStarted = false,
  className,
  contained = false,
}: AgentWorkspaceProps) {
  return (
    <section
      aria-label="Jordan AI portfolio assistant"
      data-conversation-active={conversationStarted}
      className={cn(
        "flex min-h-0 min-w-0 flex-1 flex-col",
        contained ? "overflow-hidden" : "overflow-visible",
        "text-current",
        className
      )}
    >
      <div className={cn("flex min-h-0 min-w-0 flex-1 flex-col", contained ? "overflow-hidden" : "overflow-visible")}>
        {conversation}
      </div>

      {composer}
    </section>
  );
}
