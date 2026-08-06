"use client";

import type { ReactNode } from "react";
import { useChat } from "@ai-sdk/react";
import { useRouter } from "next/navigation";

import { executeNavigateToPage } from "@/components/pages/chat/navigation/executeNavigateToPage";
import { PortfolioChatContext } from "@/components/pages/chat/PortfolioChatContext";

interface PortfolioChatProviderProps {
  children: ReactNode;
}

export function PortfolioChatProvider({
  children,
}: PortfolioChatProviderProps) {
  const router = useRouter();

  const {
    addToolOutput,
    ...chatState
  } = useChat({
    onToolCall: ({ toolCall }) => {
      if (
        toolCall.toolName !== "navigateToPage"
      ) {
        return;
      }

      const output = executeNavigateToPage({
        input: toolCall.input,
        navigate: (route) => {
          router.push(route);
        },
      });

      addToolOutput({
        tool: "navigateToPage",
        toolCallId: toolCall.toolCallId,
        output,
      });
    },
  });

  const chat = {
    ...chatState,
    addToolOutput,
  };

  return (
    <PortfolioChatContext.Provider value={chat}>
      {children}
    </PortfolioChatContext.Provider>
  );
}
