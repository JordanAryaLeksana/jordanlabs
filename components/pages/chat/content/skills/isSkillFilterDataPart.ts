import type { UIMessage } from "ai";

type MessagePart =
  UIMessage["parts"][number];

export type SkillFilterDataPart =
  MessagePart & {
    type:
      "data-skillFilterResults";

    id?: string;
    data: unknown;
  };

export function isSkillFilterDataPart(
  part: MessagePart
): part is SkillFilterDataPart {
  return (
    part.type ===
    "data-skillFilterResults"
  );
}