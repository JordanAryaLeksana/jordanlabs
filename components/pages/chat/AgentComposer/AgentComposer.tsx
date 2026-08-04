"use client";

import { PaperPlaneRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

import { IconButton } from "@/components/interfaces/ui/IconButton";
import { useAgentComposer } from "./useAgentComposer";

interface AgentComposerProps {
  compact?: boolean;
}

export function AgentComposer({
  compact = false,
}: AgentComposerProps) {
  const {
    draftMessage,
    disabled,
    setDraftMessage,
    submitMessage,
  } = useAgentComposer();

  return (
    <form
      onSubmit={submitMessage}
      className={cn(
        "flex items-center gap-2 border-t border-ink-raised bg-[var(--bg)]",
        compact ? "px-3 py-3" : "px-6 py-4"
      )}
    >
      <label htmlFor="portfolio-agent-input" className="sr-only">
        Ask Jordan AI
      </label>

      <input
        id="portfolio-agent-input"
        type="text"
        value={draftMessage}
        disabled={disabled}
        onChange={(event) => setDraftMessage(event.target.value)}
        placeholder="Ask about Jordan or tell me what you want to do..."
        className="h-12 min-w-0 flex-1 border border-current bg-transparent px-4 font-sans text-sm outline-none placeholder:opacity-45 focus:border-frame-green disabled:cursor-not-allowed disabled:opacity-50"
      />

      <IconButton
        type="submit"
        disabled={disabled || draftMessage.trim() === ""}
        icon={<PaperPlaneRightIcon size={20} />}
        label="Send message"
      />
    </form>
  );
}