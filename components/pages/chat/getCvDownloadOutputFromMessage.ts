import type { UIMessage } from "ai";
import { isCvDownloadCardData } from "./isCVDownloadCard";
import { isCvDownloadToolPart } from "@/components/pages/chat/isCvDownloadToolPart";
import type { CvDownloadCardData } from "@/lib/tools/tool-output-types";

export function getCvDownloadOutputFromMessage(
  message: UIMessage
): CvDownloadCardData | null {
  for (const part of message.parts) {
    if (
      isCvDownloadToolPart(part) &&
      part.state === "output-available" &&
      isCvDownloadCardData(part.output)
    ) {
      return part.output;
    }
  }

  return null;
}