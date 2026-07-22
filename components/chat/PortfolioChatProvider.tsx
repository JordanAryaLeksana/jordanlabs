"use client";

import type { ReactNode } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { PortfolioChatContext } from "@/components/chat/PortfolioChatContext";

const OPENING_MESSAGE: UIMessage = {
  id: "opening",
  role: "assistant",
  parts: [{ type: "text", text: "Hi, I'm Jordan's AI assistant. Ask me about his experience, skills, or projects — I can pull up the details, or take you straight to the page you need." }],
};

interface PortfolioChatProviderProps { children: ReactNode }

export function PortfolioChatProvider({ children }: PortfolioChatProviderProps) {
  const chat = useChat({ messages: [OPENING_MESSAGE] });
  return <PortfolioChatContext.Provider value={chat}>{children}</PortfolioChatContext.Provider>;
}
