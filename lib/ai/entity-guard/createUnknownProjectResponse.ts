import "server-only";

import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";

interface CreateUnknownProjectResponseOptions {
  messages: UIMessage[];
  entityName: string;
}

export function createUnknownProjectResponse({
  messages,
  entityName,
}: CreateUnknownProjectResponseOptions) {
  const stream =
    createUIMessageStream({
      originalMessages:
        messages,

      execute: ({
        writer,
      }) => {
        writer.write({
          type:
            "data-unknownPortfolioEntity",

          id:
            crypto.randomUUID(),

          data: {
            entityType:
              "project",

            entityName,

            message:
              `I couldn't find a project named ${entityName} in Jordan's verified portfolio.`,
          },
        });
      },
    });

  return createUIMessageStreamResponse({
    stream,
  });
}
