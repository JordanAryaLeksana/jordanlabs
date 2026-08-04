interface CvDownloadToolPart {
  type: "tool-showDownloadCard";
  toolCallId?: string;
  state: string;
  output?: unknown;
  errorText?: string;
}

export function isCvDownloadToolPart(
  value: unknown
): value is CvDownloadToolPart {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    candidate.type === "tool-showDownloadCard" &&
    typeof candidate.state === "string"
  );
}