"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { useChat } from "@ai-sdk/react";

type ChatStatus = ReturnType<typeof useChat>["status"];

export function useConversationAutoScroll(
  messageCount: number,
  status: ChatStatus,
  contained = false
) {
  const endReference = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const endElement = endReference.current;

    if (!endElement) return;

    if (!contained) {
      endElement.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "end",
      });
      return;
    }

    const scrollContainer = endElement.parentElement?.parentElement;

    if (!scrollContainer) return;

    scrollContainer.scrollTo({
      top: scrollContainer.scrollHeight,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [contained, messageCount, status, prefersReducedMotion]);

  return endReference;
}
