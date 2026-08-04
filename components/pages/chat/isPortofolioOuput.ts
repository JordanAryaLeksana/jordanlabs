import { isCvDownloadCardData } from "./isCVDownloadCard";
import type { PortfolioToolOutput } from "@/lib/tools/tool-output-types";

export function isPortfolioToolOutput(
  value: unknown
): value is PortfolioToolOutput {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  switch (candidate.kind) {
    case "cv-download":
      return isCvDownloadCardData(value);

    default:
      return false;
  }
}