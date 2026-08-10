import { jsonSchema } from "ai";

import {
  PROJECT_CATEGORIES,
  PROJECT_TAGS,
} from "@/lib/tools/content/projects/project-filter-values";

import type {
  FilterProjectsInput,
  FilterProjectsOutput,
} from "@/lib/tools/content/projects/project-filter-types";

export const filterProjectsInputSchema =
  jsonSchema<FilterProjectsInput>({
    type: "object",

    properties: {
      category: {
        type: "string",
        enum: PROJECT_CATEGORIES,
      },

      tag: {
        type: "string",
        enum: PROJECT_TAGS,
      },

      featured: {
        type: "boolean",
      },
    },

    additionalProperties: false,
  });

export const filterProjectsOutputSchema =
  jsonSchema<FilterProjectsOutput>({
    type: "object",

    properties: {
      kind: {
        type: "string",
        enum: [
          "project-filter-results",
        ],
      },

      filters: {
        type: "object",

        properties: {
          category: {
            type: "string",
            enum: PROJECT_CATEGORIES,
          },

          tag: {
            type: "string",
            enum: PROJECT_TAGS,
          },

          featured: {
            type: "boolean",
          },
        },

        additionalProperties: false,
      },

      projects: {
        type: "array",

        items: {
          type: "object",

          properties: {
            id: {
              type: "string",
            },

            slug: {
              type: "string",
            },

            title: {
              type: "string",
            },

            category: {
              type: "string",
              enum: PROJECT_CATEGORIES,
            },

            tags: {
              type: "array",
              items: {
                type: "string",
              },
            },

            featured: {
              type: "boolean",
            },

            status: {
              type: "string",
            },

            role: {
              type: "string",
            },

            shortDescription: {
              type: "string",
            },
          },

          required: [
            "id",
            "slug",
            "title",
            "category",
            "tags",
            "featured",
            "status",
            "role",
            "shortDescription",
          ],

          additionalProperties: false,
        },
      },

      count: {
        type: "number",
      },

      message: {
        type: "string",
      },
    },

    required: [
      "kind",
      "filters",
      "projects",
      "count",
      "message",
    ],

    additionalProperties: false,
  });
