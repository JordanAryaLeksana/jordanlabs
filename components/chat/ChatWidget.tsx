"use client";

import { useState, type SubmitEvent } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { motion, useReducedMotion } from "framer-motion";
import { PaperPlaneRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { HexGrid } from "@/components/retro/HexGrid";
import { IconButton } from "@/components/ui/IconButton";
import { ChatMessageBubble } from "@/components/chat/ChatMessageBubble";
import { SuggestedPrompts } from "@/components/chat/SuggestedPrompts";

const OPENING_MESSAGE: UIMessage = {
  id: "opening",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Hi, I'm Jordan's AI assistant. Ask me about his experience, skills, or projects — I can pull up the details, or take you straight to the page you need.",
    },
  ],
};

interface ChatWidgetProps {
  className?: string;
}

/** Mengambil seluruh bagian bertipe teks dari sebuah UIMessage dan menggabungkannya jadi satu string untuk ditampilkan di bubble. */
function extractMessageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function ChatWidget({ className }: ChatWidgetProps) {
  const { messages, sendMessage, status } = useChat({
    messages: [OPENING_MESSAGE],
  });
  const [draftMessage, setDraftMessage] = useState("");
  const prefersReducedMotion = useReducedMotion();

  function handleSelectSuggestedPrompt(prompt: string) {
    setDraftMessage(prompt);
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedMessage = draftMessage.trim();
    if (trimmedMessage === "") return;
    sendMessage({ text: trimmedMessage });
    setDraftMessage("");
  }

  return (
    <div className={cn("relative flex flex-col bg-[var(--bg)] text-[var(--fg)]", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden opacity-[0.07]">
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: ["0%", "-8%", "0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <HexGrid count={24} />
        </motion.div>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-6 py-6">
        {messages
          .filter(
            (message): message is UIMessage & { role: "assistant" | "user" } =>
              message.role !== "system"
          )
          .map((message) => (
            <ChatMessageBubble key={message.id} role={message.role}>
              {extractMessageText(message)}
            </ChatMessageBubble>
          ))}
        {status === "streaming" ? (
          <p className="px-4 text-xs italic opacity-60">Typing...</p>
        ) : null}
      </div>

      <div className="relative flex flex-col gap-3 border-t border-ink-raised px-6 py-4">
        {messages.length === 1 ? <SuggestedPrompts onSelect={handleSelectSuggestedPrompt} /> : null}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            value={draftMessage}
            onChange={(event) => setDraftMessage(event.target.value)}
            placeholder="Ask about Jordan's experience, skills, or projects..."
            className="h-11 flex-1 border border-current bg-transparent px-3 font-sans text-sm outline-none focus:border-frame-green"
          />
          <IconButton type="submit" icon={<PaperPlaneRightIcon size={20} />} label="Send message" />
        </form>
      </div>
    </div>
  );
}
