"use client";

import { useContext } from "react";
import { PortfolioChatContext } from "@/components/pages/chat/PortfolioChatContext";

export function usePortfolioChat() {
  const chat = useContext(PortfolioChatContext);
  if (!chat) throw new Error("usePortfolioChat must be used within PortfolioChatProvider.");
  return chat;
}
