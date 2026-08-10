import type { UIMessage } from "ai";

type MessagePart =
  UIMessage["parts"][number];

export type ShowDownloadCardPart =
  MessagePart & {
    type: "tool-showDownloadCard";

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

export function isShowDownloadCardPart(
  part: MessagePart
): part is ShowDownloadCardPart {
  return (
    part.type ===
    "tool-showDownloadCard"
  );
}
