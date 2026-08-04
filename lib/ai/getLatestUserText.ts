import type { UIMessage } from "ai";

export function getLatestUserText(
  messages: readonly UIMessage[]
): string {
  for (
    let messageIndex = messages.length - 1;
    messageIndex >= 0;
    messageIndex -= 1
  ) {
    const message = messages[messageIndex];

    if (message.role !== "user") {
      continue;
    }

    return message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(" ")
      .trim();
  }

  return "";
}