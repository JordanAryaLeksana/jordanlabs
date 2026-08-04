"use client";

import { Button } from "@/components/interfaces/ui/Button";
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
        <Button
          key={action}
          type="button"
          variant="ghost"
          disabled={disabled}
          onClick={() => sendMessage({ text: action })}
          className="min-h-14 w-full justify-start px-4 py-3 text-left text-xs leading-5 shadow-none disabled:cursor-not-allowed disabled:opacity-40"
        >
          {action}
        </Button>
      ))}
    </div>
  );
}