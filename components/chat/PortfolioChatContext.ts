"use client";

import { createContext } from "react";
import type { useChat } from "@ai-sdk/react";

export type PortfolioChatState = ReturnType<typeof useChat>;
export const PortfolioChatContext = createContext<PortfolioChatState | null>(null);
