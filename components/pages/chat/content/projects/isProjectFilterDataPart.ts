import type { UIMessage } from "ai";

type MessagePart =
  UIMessage["parts"][number];

export type ProjectFilterDataPart =
  MessagePart & {
    type:
      "data-projectFilterResults";

    id?: string;
    data: unknown;
  };

export function isProjectFilterDataPart(
  part: MessagePart
): part is ProjectFilterDataPart {
  return (
    part.type ===
    "data-projectFilterResults"
  );
}
