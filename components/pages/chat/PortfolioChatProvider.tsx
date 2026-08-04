"use client";

import type { ReactNode } from "react";
import { useChat } from "@ai-sdk/react";
import { PortfolioChatContext } from "@/components/pages/chat/PortfolioChatContext";

interface PortfolioChatProviderProps {
  children: ReactNode;
}

export function PortfolioChatProvider({
  children,
}: PortfolioChatProviderProps) {
  const chat = useChat();

  return (
    <PortfolioChatContext.Provider value={chat}>
      {children}
    </PortfolioChatContext.Provider>
  );
}