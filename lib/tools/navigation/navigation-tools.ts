import "server-only";

import { tool } from "ai";

import {
  highlightSectionInputSchema,
  navigateToPageInputSchema,
  navigateToPageOutputSchema,
  openProjectDetailInputSchema,
  scrollToSectionInputSchema,
} from "@/lib/tools/navigation/navigation-tool-schemas";

export function createNavigationTools() {
  return {
    navigateToPage: tool({
      description:
        "Open one of the available portfolio pages when the visitor explicitly asks to navigate, visit, open, or go to that page.",
      inputSchema: navigateToPageInputSchema,
      outputSchema: navigateToPageOutputSchema,
    }),

    scrollToSection: tool({
      description:
        "Scroll to a specific section on the portfolio page that is currently open.",
      inputSchema: scrollToSectionInputSchema,
    }),

    highlightSection: tool({
      description:
        "Scroll to and temporarily highlight a specific portfolio section when the visitor asks to highlight, mark, or spotlight it.",
      inputSchema:
        highlightSectionInputSchema,
    }),
    openProjectDetail: tool({
      description:
        "Open the detail page of a documented portfolio project. An optional section may target overview, architecture, dataset, training, or evaluation.",
      inputSchema:
        openProjectDetailInputSchema,
    }),

  };
}
