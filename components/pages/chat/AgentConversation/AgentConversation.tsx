"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { AgentHomeState } from "@/components/pages/chat/AgentHomeState";
import { MessagePartRenderer } from "@/components/pages/chat/MessagePartRenderer";
import { hasConversationStarted } from "./hasConversationStarted";
import { useConversationAutoScroll } from "./useConversationAutoScroll";
import { usePortfolioChat } from "@/components/pages/chat/usePortfolioChat";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
interface AgentConversationProps {
  compact?: boolean;
}

export function AgentConversation({
  compact = false,
}: AgentConversationProps) {
  const { messages, status, error } = usePortfolioChat();
  const reducedMotion = useReducedMotion();
  const welcomeTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: "easeOut" as const };
  const conversationTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: "easeOut" as const };

  const conversationStarted = hasConversationStarted(messages);
  const conversationEndReference = useConversationAutoScroll(
    messages.length,
    status,
    compact
  );

  return (
    <section
      aria-label="Conversation with Jordan AI"
      className={cn(
        "flex min-h-0 flex-1 flex-col",
        compact ? "overflow-hidden" : "overflow-visible"
      )}
    >
      {compact ? <header className="flex shrink-0 items-center justify-between gap-4 border-b border-current/10 px-4 py-3">
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
      </header> : null}

      <div
        className={cn(
          "min-h-0 flex-1",
          compact
            ? "agent-conversation-scroll overscroll-contain overflow-y-auto px-3 py-3"
            : "overflow-visible px-5 py-3 sm:px-8"
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full flex-col gap-5",
            compact ? "max-w-none" : "max-w-5xl"
          )}
        >
          <AnimatePresence initial={false} mode="wait">
            {!conversationStarted ? (
              <motion.div
                key="welcome"
                className="flex min-h-0 flex-1 flex-col"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={welcomeTransition}
              >
                <AgentHomeState compact={compact} />
              </motion.div>
            ) : (
              <motion.div
                key="conversation"
                className="flex flex-col gap-5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={conversationTransition}
              >
                {messages.map((message) => (
                  <MessagePartRenderer
                    key={message.id}
                    message={message}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {status === "submitted" ? (
            <Typography
              variant="text"
              size="xs"
              italic
              className="flex items-center gap-2 opacity-65 before:size-1.5 before:animate-pulse before:rounded-full before:bg-coral motion-reduce:before:animate-none"
            >
              Jordan AI is preparing the requested information...
            </Typography>
          ) : null}

          {status === "streaming" ? (
            <Typography
              variant="text"
              size="xs"
              italic
              className="flex items-center gap-2 opacity-65 before:size-1.5 before:animate-pulse before:rounded-full before:bg-coral motion-reduce:before:animate-none"
            >
              Jordan AI is responding...
            </Typography>
          ) : null}
          {error ? (
            <div
              role="alert"
              aria-live="polite"
            >
              <ChatMessageBubble role="assistant">
                Jordan AI could not complete that request. You can try again or send another message.
              </ChatMessageBubble>
            </div>
          ) : null}
          <div ref={conversationEndReference} />
        </div>
      </div>
    </section>
  );
}
