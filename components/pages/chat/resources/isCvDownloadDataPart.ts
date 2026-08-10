import type { UIMessage } from "ai";

type MessagePart =
  UIMessage["parts"][number];

export type CvDownloadDataPart =
  MessagePart & {
    type: "data-cvDownload";
    id?: string;
    data: unknown;
  };

export function isCvDownloadDataPart(
  part: MessagePart
): part is CvDownloadDataPart {
  return (
    part.type ===
    "data-cvDownload"
  );
}
