import type { ShowDownloadCardOutput } from "@/lib/tools/resources/resource-tool-outputs";

export function isShowDownloadCardOutput(
  value: unknown
): value is ShowDownloadCardOutput {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const candidate = value as {
    kind?: unknown;
    ownerName?: unknown;
    role?: unknown;
    fileName?: unknown;
    url?: unknown;
    message?: unknown;
  };

  const hasSafeLocalUrl =
    typeof candidate.url === "string" &&
    candidate.url.startsWith("/") &&
    !candidate.url.startsWith("//");

  return (
    candidate.kind === "cv-download" &&
    typeof candidate.ownerName === "string" &&
    candidate.ownerName.trim() !== "" &&
    typeof candidate.role === "string" &&
    candidate.role.trim() !== "" &&
    typeof candidate.fileName === "string" &&
    candidate.fileName.trim() !== "" &&
    hasSafeLocalUrl &&
    typeof candidate.message === "string" &&
    candidate.message.trim() !== ""
  );
}
