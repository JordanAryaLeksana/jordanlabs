import type { CvDownloadCardData } from "@/lib/tools/tool-output-types";

export function isCvDownloadCardData(
  value: unknown
): value is CvDownloadCardData {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    candidate.kind === "cv-download" &&
    typeof candidate.ownerName === "string" &&
    typeof candidate.role === "string" &&
    typeof candidate.fileName === "string" &&
    typeof candidate.url === "string" &&
    typeof candidate.confirmationText === "string"
  );
}