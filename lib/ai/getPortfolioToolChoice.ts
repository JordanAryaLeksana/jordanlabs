
import type { PortfolioIntent } from "./portofolioIntent";

import { PORTFOLIO_TOOL_BY_INTENT } from "./portofolioToolByIntent";
import type { PortfolioToolName } from "./portofolioToolName";

export type PortfolioToolChoice =
  | "auto"
  | {
      type: "tool";
      toolName: PortfolioToolName;
    };

export function getPortfolioToolChoice(
  intent: PortfolioIntent
): PortfolioToolChoice {
  const toolName = PORTFOLIO_TOOL_BY_INTENT[intent];

  if (!toolName) {
    return "auto";
  }

  return {
    type: "tool",
    toolName,
  };
}