"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { useChat } from "@ai-sdk/react";

type ChatStatus = ReturnType<typeof useChat>["status"];

export function useConversationAutoScroll(
  messageCount: number,
  status: ChatStatus
) {
  const endReference = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    endReference.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [messageCount, status, prefersReducedMotion]);

  return endReference;
}