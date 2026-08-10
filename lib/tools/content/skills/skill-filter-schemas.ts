import { jsonSchema } from "ai";

import {
  SKILLS_BY_CATEGORY,
} from "@/lib/config/skills";

import type {
  FilterSkillsInput,
  FilterSkillsOutput,
} from "@/lib/tools/content/skills/skill-filter-types";

const SKILL_CATEGORY_VALUES =
  Object.keys(
    SKILLS_BY_CATEGORY
  ) as Array<
    keyof typeof SKILLS_BY_CATEGORY
  >;

export const filterSkillsInputSchema =
  jsonSchema<FilterSkillsInput>({
    type: "object",

    properties: {
      category: {
        type: "string",
        enum: SKILL_CATEGORY_VALUES,
      },
    },

    additionalProperties: false,
  });

export const filterSkillsOutputSchema =
  jsonSchema<FilterSkillsOutput>({
    type: "object",

    properties: {
      kind: {
        type: "string",
        enum: [
          "skill-filter-results",
        ],
      },

      filters: {
        type: "object",

        properties: {
          category: {
            type: "string",
            enum:
              SKILL_CATEGORY_VALUES,
          },
        },

        additionalProperties: false,
      },

      groups: {
        type: "array",

        items: {
          type: "object",

          properties: {
            category: {
              type: "string",
              enum:
                SKILL_CATEGORY_VALUES,
            },

            label: {
              type: "string",
            },

            skills: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },

          required: [
            "category",
            "label",
            "skills",
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
      "groups",
      "count",
      "message",
    ],

    additionalProperties: false,
  });
