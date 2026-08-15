"use client";

import { usePortfolioChat } from "@/components/pages/chat/usePortfolioChat";
import { isChatBusy } from "./isChatBusy";

const SUGGESTED_ACTIONS = [
  "Evaluate Jordan for an AI Engineer role",
  "Show Jordan's strongest AI project",
  "Get Jordan's CV",
  "Help me contact Jordan",
] as const;

export function SuggestedActions() {
  const { sendMessage, status } = usePortfolioChat();
  const disabled = isChatBusy(status);

  return (
    <div
      aria-label="Suggested actions"
      className="grid gap-3 sm:grid-cols-2"
    >
      {SUGGESTED_ACTIONS.map((action) => (
        <button
          key={action}
          type="button"
          disabled={disabled}
          onClick={() => sendMessage({ text: action })}
          className="min-h-14 w-full rounded-xl border border-text-on-dark/20 bg-ink-panel/65 px-4 py-3 text-left font-mono text-xs leading-5 text-text-on-dark backdrop-blur-md transition-colors hover:border-coral hover:bg-ink-raised/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green disabled:cursor-not-allowed disabled:opacity-40"
        >
          {action}
        </button>
      ))}
    </div>
  );
}
