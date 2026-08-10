import "server-only";

import { tool } from "ai";

import { getShowDownloadCardOutput } from "@/lib/tools/resources/getShowDownloadCardOutput";
import { getOpenGithubOutput } from "@/lib/tools/resources/getOpenGithubOutput";
import {
  externalResourceOutputSchema,
  openGithubInputSchema,
  openLinkedinInputSchema,
  showDownloadCardInputSchema,
  showDownloadCardOutputSchema,
} from "@/lib/tools/resources/resource-tool-schemas";
import { getOpenLinkedinOutput } from "@/lib/tools/resources/getOpenLinkedinOutput";
import { getShowContactCardOutput } from "@/lib/tools/resources/getShowContactCardOutput";
import { contactCardOutputSchema, showContactCardInputSchema } from "@/lib/tools/resources/resource-tool-schemas";
export function createResourceTools() {
  return {
    showDownloadCard: tool({
      description:
        "Prepare Jordan Arya Leksana's official CV when the visitor asks to view, open, get, or download Jordan's CV or resume.",

      inputSchema:
        showDownloadCardInputSchema,

      outputSchema:
        showDownloadCardOutputSchema,

      execute: async () => {
        return getShowDownloadCardOutput();
      },
    }),

    openGithub: tool({
      description:
        "Provide Jordan Arya Leksana's official GitHub profile when the visitor asks to open, view, or visit Jordan's GitHub.",

      inputSchema:
        openGithubInputSchema,

      outputSchema:
        externalResourceOutputSchema,

      execute: async () => {
        return getOpenGithubOutput();
      },
    }),
    openLinkedin: tool({
      description:
        "Provide Jordan Arya Leksana's official LinkedIn profile when the visitor asks to open, view, or visit Jordan's LinkedIn.",

      inputSchema:
        openLinkedinInputSchema,

      outputSchema:
        externalResourceOutputSchema,

      execute: async () => {
        return getOpenLinkedinOutput();
      },
    }),
    showContactCard: tool({
      description: "Show Jordan Arya Leksana's trusted email contact card when a visitor asks how to contact or email Jordan.",
      inputSchema: showContactCardInputSchema,
      outputSchema: contactCardOutputSchema,
      execute: async () => getShowContactCardOutput(),
    }),
  };
}
