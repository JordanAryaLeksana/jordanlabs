import { jsonSchema } from "ai";

import type {
  OpenGithubInput,
  ShowDownloadCardInput,
  OpenLinkedinInput,
  ShowContactCardInput,
} from "@/lib/tools/resources/resource-tool-inputs";

import type {
  ExternalResourceOutput,
  ShowDownloadCardOutput,
  ContactCardOutput,
} from "@/lib/tools/resources/resource-tool-outputs";
export const showDownloadCardInputSchema =
  jsonSchema<ShowDownloadCardInput>({
    type: "object",
    properties: {},
    additionalProperties: false,
  });

export const showDownloadCardOutputSchema =
  jsonSchema<ShowDownloadCardOutput>({
    type: "object",

    properties: {
      kind: {
        type: "string",
        enum: ["cv-download"],
      },

      ownerName: {
        type: "string",
      },

      role: {
        type: "string",
      },

      fileName: {
        type: "string",
      },

      url: {
        type: "string",
      },

      message: {
        type: "string",
      },
    },

    required: [
      "kind",
      "ownerName",
      "role",
      "fileName",
      "url",
      "message",
    ],

    additionalProperties: false,
  });
export const openGithubInputSchema =
  jsonSchema<OpenGithubInput>({
    type: "object",
    properties: {},
    additionalProperties: false,
  });

export const openLinkedinInputSchema =
  jsonSchema<OpenLinkedinInput>({
    type: "object",
    properties: {},
    additionalProperties: false,
  });

export const externalResourceOutputSchema =
  jsonSchema<ExternalResourceOutput>({
    type: "object",

    properties: {
      kind: {
        type: "string",
        enum: ["external-resource"],
      },

      platform: {
        type: "string",
        enum: [
          "github",
          "linkedin",
        ],
      },

      label: {
        type: "string",
      },

      url: {
        type: "string",
      },

      message: {
        type: "string",
      },
    },

    required: [
      "kind",
      "platform",
      "label",
      "url",
      "message",
    ],

    additionalProperties: false,
  });

export const showContactCardInputSchema =
  jsonSchema<ShowContactCardInput>({
    type: "object",
    properties: {},
    additionalProperties: false,
  });

export const contactCardOutputSchema =
  jsonSchema<ContactCardOutput>({
    type: "object",
    properties: {
      kind: { type: "string", enum: ["contact-card"] },
      ownerName: { type: "string" },
      role: { type: "string" },
      emailAddress: { type: "string" },
      mailtoUrl: { type: "string" },
      message: { type: "string" },
    },
    required: ["kind", "ownerName", "role", "emailAddress", "mailtoUrl", "message"],
    additionalProperties: false,
  });
