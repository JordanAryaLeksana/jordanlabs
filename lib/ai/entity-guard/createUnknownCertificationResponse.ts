import "server-only";

import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";

interface CreateUnknownCertificationResponseOptions {
  messages: UIMessage[];
  certificationName: string;
}

export function createUnknownCertificationResponse({
  messages,
  certificationName,
}: CreateUnknownCertificationResponseOptions) {
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
              "certification",

            entityName:
              certificationName,

            message:
              `${certificationName} certification is not documented in Jordan's verified portfolio.`,
          },
        });
      },
    });

  return createUIMessageStreamResponse({
    stream,
  });
}
