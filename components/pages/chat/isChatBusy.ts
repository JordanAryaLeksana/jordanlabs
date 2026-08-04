import type { useChat } from "@ai-sdk/react";

type ChatStatus = ReturnType<typeof useChat>["status"];
export function isChatBusy(status: ChatStatus): boolean {
  return status === "submitted" || status === "streaming";
}