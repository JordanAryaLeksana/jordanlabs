import type { UIMessage } from "ai";
import { isCvDownloadCardData } from "@/components/pages/chat/isCVDownloadCard";
import { isCvDownloadToolPart } from "@/components/pages/chat/isCvDownloadToolPart";
import type { CvDownloadCardData } from "@/lib/tools/tool-output-types";

export function findLatestCvDownloadOutput(
  messages: readonly UIMessage[]
): CvDownloadCardData | null {
  for (
    let messageIndex = messages.length - 1;
    messageIndex >= 0;
    messageIndex -= 1
  ) {
    const message = messages[messageIndex];

    for (
      let partIndex = message.parts.length - 1;
      partIndex >= 0;
      partIndex -= 1
    ) {
      const part = message.parts[partIndex];

      if (
        isCvDownloadToolPart(part) &&
        part.state === "output-available" &&
        isCvDownloadCardData(part.output)
      ) {
        return part.output;
      }
    }
  }

  return null;
}