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
        "flex items-center gap-2",
        compact ? "border-t border-current/10 bg-[var(--bg)] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3" : "mx-auto mb-[max(1rem,env(safe-area-inset-bottom))] w-[calc(100%-2rem)] max-w-5xl rounded-2xl border border-text-on-dark/20 bg-ink-panel/85 p-2 shadow-2xl backdrop-blur-xl sm:mb-6"
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
        className="h-12 min-w-0 flex-1 rounded-xl border-0 bg-transparent px-3 font-sans text-base outline-none placeholder:opacity-50 focus-visible:ring-2 focus-visible:ring-frame-green disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
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
