
import type { PortfolioIntent } from "./portofolioIntent";
import type { PortfolioToolName } from "./portofolioToolName";

export const PORTFOLIO_TOOL_BY_INTENT: Partial<
  Record<PortfolioIntent, PortfolioToolName>
> = {
  "cv-download": "showDownloadCard",
};