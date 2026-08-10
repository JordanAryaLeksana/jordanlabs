import type { UIMessage } from "ai";

type MessagePart =
  UIMessage["parts"][number];

export type ProjectFilterErrorPart =
  MessagePart & {
    type:
      "data-projectFilterError";

    id?: string;

    data: {
      message?: unknown;
    };
  };

export function isProjectFilterErrorPart(
  part: MessagePart
): part is ProjectFilterErrorPart {
  return (
    part.type ===
    "data-projectFilterError"
  );
}
