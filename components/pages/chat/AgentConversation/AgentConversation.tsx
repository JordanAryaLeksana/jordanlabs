"use client";

import { cn } from "@/lib/cn";
import { AgentHomeState } from "@/components/pages/chat/AgentHomeState";
import { MessagePartRenderer } from "@/components/pages/chat/MessagePartRenderer";
import { hasConversationStarted } from "./hasConversationStarted";
import { useConversationAutoScroll } from "./useConversationAutoScroll";
import { usePortfolioChat } from "@/components/pages/chat/usePortfolioChat";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";

interface AgentConversationProps {
  compact?: boolean;
}

export function AgentConversation({
  compact = false,
}: AgentConversationProps) {
  const { messages, status } = usePortfolioChat();

  const conversationStarted = hasConversationStarted(messages);
  const conversationEndReference = useConversationAutoScroll(
    messages.length,
    status
  );

  return (
    <section
      aria-label="Conversation with Jordan AI"
      className={cn(
        "flex min-h-0 flex-col",
        compact
          ? ""
          : "border-b border-ink-raised lg:border-r lg:border-b-0"
      )}
    >
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-ink-raised px-6 py-4">
        <Typography
          as="p"
          variant="text"
          size="xs"
          weight="bold"
          className="uppercase tracking-[0.2em] opacity-60"
        >
          Conversation
        </Typography>

        <Badge color="pine">Online</Badge>
      </header>

      <div
        className={cn(
          "min-h-0 flex-1 overflow-y-auto",
          compact ? "px-3 py-3" : "px-4 py-5 sm:px-6 sm:py-6"
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full flex-col gap-5",
            compact ? "max-w-none" : "max-w-5xl"
          )}
        >
          {!conversationStarted ? (
            <AgentHomeState compact={compact} />
          ) : (
            messages.map((message) => (
              <MessagePartRenderer
                key={message.id}
                message={message}
              />
            ))
          )}

          {status === "submitted" ? (
            <Typography
              variant="text"
              size="xs"
              italic
              className="opacity-60"
            >
              Jordan AI is preparing the requested information...
            </Typography>
          ) : null}

          {status === "streaming" ? (
            <Typography
              variant="text"
              size="xs"
              italic
              className="opacity-60"
            >
              Jordan AI is responding...
            </Typography>
          ) : null}

          <div ref={conversationEndReference} />
        </div>
      </div>
    </section>
  );
}