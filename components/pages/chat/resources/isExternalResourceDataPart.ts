import type { UIMessage } from "ai";

type MessagePart =
  UIMessage["parts"][number];

export type ExternalResourceDataPart =
  MessagePart & {
    type: "data-externalResource";
    id?: string;
    data: unknown;
  };

export function isExternalResourceDataPart(
  part: MessagePart
): part is ExternalResourceDataPart {
  return (
    part.type ===
    "data-externalResource"
  );
}
