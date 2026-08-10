import type { UIMessage } from "ai";

type MessagePart =
  UIMessage["parts"][number];

export type SkillFilterToolPart =
  MessagePart & {
    type:
      "tool-filterSkills";

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

export function isSkillFilterToolPart(
  part: MessagePart
): part is SkillFilterToolPart {
  return (
    part.type ===
    "tool-filterSkills"
  );
}