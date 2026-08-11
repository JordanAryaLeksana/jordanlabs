import "server-only";

import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";

import type {
  EmploymentKnowledgeResult,
} from "@/lib/ai/entity-guard/getEmploymentKnowledge";

interface CreateEmploymentKnowledgeResponseOptions {
  messages: UIMessage[];
  result: EmploymentKnowledgeResult;
}

export function createEmploymentKnowledgeResponse({
  messages,
  result,
}: CreateEmploymentKnowledgeResponseOptions) {
  const stream =
    createUIMessageStream({
      originalMessages:
        messages,

      execute: ({
        writer,
      }) => {
        writer.write({
          type:
            "data-employmentKnowledge",

          id:
            crypto.randomUUID(),

          data: {
            ...result,

            message:
              result.documented
                ? `${result.organizationName} is documented in Jordan's professional experience.`
                : `I couldn't find documented employment at ${result.organizationName} in Jordan's verified portfolio.`,
          },
        });
      },
    });

  return createUIMessageStreamResponse({
    stream,
  });
}
