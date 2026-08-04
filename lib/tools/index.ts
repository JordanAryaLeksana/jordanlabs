import "server-only";

import { createResourceTools } from "@/lib/tools/resource-tools";
import type { PortfolioToolContext } from "@/lib/tools/toolContext";

export function createPortfolioTools(
  context: PortfolioToolContext
) {
  return {
    ...createResourceTools(context),
  };
}