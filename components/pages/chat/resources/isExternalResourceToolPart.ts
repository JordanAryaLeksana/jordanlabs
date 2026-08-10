import type { UIMessage } from "ai";

type MessagePart =
  UIMessage["parts"][number];

export type ExternalResourceToolPart =
  MessagePart & {
    type:
    | "tool-openGithub"
    | "tool-openLinkedin";

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

export function isExternalResourceToolPart(
  part: MessagePart
): part is ExternalResourceToolPart {
  return (
    part.type === "tool-openGithub" ||
    part.type === "tool-openLinkedin"
  );
}
