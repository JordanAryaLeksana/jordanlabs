import type { UIMessage } from "ai";
import { isPortfolioToolOutput } from "./isPortofolioOuput";
import { isPortfolioToolPart } from "./isPortofolioToolPart";
import type { PortfolioToolOutput } from "@/lib/tools/tool-output-types";

export interface PortfolioToolResult {
  id: string;
  output: PortfolioToolOutput;
}

export function getPortfolioToolOutputs(
  message: UIMessage
): PortfolioToolResult[] {
  const results: PortfolioToolResult[] = [];

  for (
    let partIndex = 0;
    partIndex < message.parts.length;
    partIndex += 1
  ) {
    const part = message.parts[partIndex];

    if (
      !isPortfolioToolPart(part) ||
      part.state !== "output-available" ||
      !isPortfolioToolOutput(part.output)
    ) {
      continue;
    }

    results.push({
      id:
        part.toolCallId ??
        `${message.id}-tool-${partIndex}`,
      output: part.output,
    });
  }

  return results;
}