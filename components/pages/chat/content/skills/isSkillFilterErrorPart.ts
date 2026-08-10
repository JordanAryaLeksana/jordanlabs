import type { UIMessage } from "ai";

type MessagePart =
  UIMessage["parts"][number];

export type SkillFilterErrorPart =
  MessagePart & {
    type:
      "data-skillFilterError";

    id?: string;

    data: {
      message?: unknown;
    };
  };

export function isSkillFilterErrorPart(
  part: MessagePart
): part is SkillFilterErrorPart {
  return (
    part.type ===
    "data-skillFilterError"
  );
}