import "server-only";

import { jsonSchema, tool } from "ai";
import { getConfirmationText } from "@/lib/tools/confirmationText";
import { getCvDownloadCardData } from "@/lib/tools/getCvDownloadCardData";
import type { PortfolioToolContext } from "@/lib/tools/toolContext";

const EMPTY_INPUT_SCHEMA = jsonSchema<Record<string, never>>({
  type: "object",
  properties: {},
  additionalProperties: false,
});

export function createResourceTools(
  context: PortfolioToolContext
) {
  return {
    showDownloadCard: tool({
      description:
        "Display Jordan Arya Leksana's official CV download card when the visitor asks to view, get, open, or download his CV or resume.",

      inputSchema: EMPTY_INPUT_SCHEMA,

      execute: () => ({
        ...getCvDownloadCardData(),

        confirmationText: getConfirmationText(
          "cv-ready",
          context.responseLanguage
        ),
      }),
    }),
  };
}