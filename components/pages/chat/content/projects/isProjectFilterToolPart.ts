import type { UIMessage } from "ai";

type MessagePart =
  UIMessage["parts"][number];

export type ProjectFilterToolPart =
  MessagePart & {
    type:
      "tool-filterProjects";

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

export function isProjectFilterToolPart(
  part: MessagePart
): part is ProjectFilterToolPart {
  return (
    part.type ===
    "tool-filterProjects"
  );
}
