import "server-only";

import { createUIMessageStream, createUIMessageStreamResponse, type UIMessage } from "ai";
import { getShowContactCardOutput } from "@/lib/tools/resources/getShowContactCardOutput";

export function createContactCardResponse(messages: UIMessage[]) {
  const stream = createUIMessageStream({
    originalMessages: messages,
    execute: ({ writer }) => {
      writer.write({
        type: "data-contactCard",
        id: crypto.randomUUID(),
        data: getShowContactCardOutput(),
      });
    },
    onError: () => "Jordan's contact card could not be prepared.",
  });

  return createUIMessageStreamResponse({ stream });
}
