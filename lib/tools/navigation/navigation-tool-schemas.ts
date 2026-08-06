import { jsonSchema } from "ai";

import type {
  HighlightSectionInput,
  NavigateToPageInput,
  OpenProjectDetailInput,
  ScrollToSectionInput,
} from "@/lib/tools/navigation/navigation-tool-inputs";
import type { NavigateToPageOutput } from "@/lib/tools/navigation/navigation-tool-outputs";
import {
  PAGE_ROUTES,
  PROJECT_IDS,
  PROJECT_SECTION_IDS,
  SECTION_IDS,
} from "@/lib/tools/types";

export const navigateToPageInputSchema =
  jsonSchema<NavigateToPageInput>({
    type: "object",
    properties: {
      route: {
        type: "string",
        enum: Object.values(PAGE_ROUTES),
        description:
          "The exact portfolio page route that should be opened.",
      },
    },
    required: ["route"],
    additionalProperties: false,
  });

export const navigateToPageOutputSchema =
  jsonSchema<NavigateToPageOutput>({
    type: "object",
    properties: {
      status: {
        type: "string",
        enum: ["success", "error"],
      },
      route: {
        type: "string",
        enum: Object.values(PAGE_ROUTES),
      },
      message: {
        type: "string",
      },
    },
    required: ["status", "message"],
    additionalProperties: false,
  });

export const scrollToSectionInputSchema =
  jsonSchema<ScrollToSectionInput>({
    type: "object",
    properties: {
      sectionId: {
        type: "string",
        enum: Object.values(SECTION_IDS),
        description:
          "The exact section identifier that should be scrolled into view.",
      },
    },
    required: ["sectionId"],
    additionalProperties: false,
  });

export const highlightSectionInputSchema =
  jsonSchema<HighlightSectionInput>({
    type: "object",
    properties: {
      sectionId: {
        type: "string",
        enum: Object.values(SECTION_IDS),
        description:
          "The exact section identifier that should receive a temporary visual highlight.",
      },
    },
    required: ["sectionId"],
    additionalProperties: false,
  });

export const openProjectDetailInputSchema =
  jsonSchema<OpenProjectDetailInput>({
    type: "object",
    properties: {
      projectId: {
        type: "string",
        enum: Object.values(PROJECT_IDS),
        description:
          "The exact identifier of the portfolio project that should be opened.",
      },
      sectionId: {
        type: "string",
        enum: Object.values(PROJECT_SECTION_IDS),
        description:
          "An optional section within the project detail page.",
      },
    },
    required: ["projectId"],
    additionalProperties: false,
  });
