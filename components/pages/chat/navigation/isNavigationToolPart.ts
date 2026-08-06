import type { UIMessage } from "ai";

type MessagePart =
  UIMessage["parts"][number];

export type NavigationToolPart =
  MessagePart & {
    type:
      | "tool-navigateToPage"
      | "tool-scrollToSection"
      | "tool-highlightSection";

    toolCallId: string;

    state:
      | "input-streaming"
      | "input-available"
      | "output-available"
      | "output-error";

    input?: unknown;
    output?: unknown;
    errorText?: string;
  };

export function isNavigationToolPart(
  part: MessagePart
): part is NavigationToolPart {
  return (
    part.type === "tool-navigateToPage" ||
    part.type === "tool-scrollToSection" ||
    part.type === "tool-highlightSection"
  );
}
