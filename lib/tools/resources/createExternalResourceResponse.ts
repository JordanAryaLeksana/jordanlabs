import "server-only";

import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";

import type { ExternalResourceOutput } from "@/lib/tools/resources/resource-tool-outputs";

interface CreateExternalResourceResponseOptions {
  messages: UIMessage[];
  output: ExternalResourceOutput;
}

export function createExternalResourceResponse({
  messages,
  output,
}: CreateExternalResourceResponseOptions) {
  const stream =
    createUIMessageStream({
      originalMessages: messages,

      execute: ({ writer }) => {
        writer.write({
          type: "data-externalResource",
          id: crypto.randomUUID(),
          data: output,
        });
      },

      onError: (error) => {
        console.error(
          "External resource response failed:",
          error
        );

        return "The requested resource could not be prepared.";
      },
    });

  return createUIMessageStreamResponse({
    stream,
  });
}
