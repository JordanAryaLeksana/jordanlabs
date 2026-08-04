import type { UIMessage } from "ai";

export function hasConversationStarted(
  messages: readonly UIMessage[]
): boolean {
  return messages.some((message) => message.role === "user");
}