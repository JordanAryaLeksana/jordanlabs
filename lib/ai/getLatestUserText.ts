import type { UIMessage } from "ai";

export function getLatestUserText(
  messages: UIMessage[]
) {
  const latestUserMessage = messages
    .toReversed()
    .find((message) => {
      return message.role === "user";
    });

  if (!latestUserMessage) {
    return "";
  }

  return latestUserMessage.parts
    .map((part) => {
      if (part.type !== "text") {
        return "";
      }

      return part.text;
    })
    .join("\n")
    .trim();
}
