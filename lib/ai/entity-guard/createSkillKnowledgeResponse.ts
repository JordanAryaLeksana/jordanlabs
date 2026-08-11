import "server-only";

import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";

import type {
  SkillKnowledgeResult,
} from "@/lib/ai/entity-guard/getSkillKnowledge";

interface CreateSkillKnowledgeResponseOptions {
  messages: UIMessage[];
  result: SkillKnowledgeResult;
}

export function createSkillKnowledgeResponse({
  messages,
  result,
}: CreateSkillKnowledgeResponseOptions) {
  const stream =
    createUIMessageStream({
      originalMessages:
        messages,

      execute: ({
        writer,
      }) => {
        writer.write({
          type:
            "data-skillKnowledge",

          id:
            crypto.randomUUID(),

          data: {
            ...result,

            message:
              result.documented
                ? `${result.skillName} is documented in Jordan's portfolio skills.`
                : `${result.skillName} is not documented in Jordan's verified portfolio skills.`,
          },
        });
      },
    });

  return createUIMessageStreamResponse({
    stream,
  });
}
