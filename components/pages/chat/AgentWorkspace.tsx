import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface AgentWorkspaceProps {
  conversation: ReactNode;
  composer: ReactNode;
  className?: string;
}

export function AgentWorkspace({
  conversation,
  composer,
  className,
}: AgentWorkspaceProps) {
  return (
    <section
      aria-label="Jordan AI portfolio assistant"
      className={cn(
        "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden",
        "bg-[var(--bg)] text-[var(--fg)]",
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