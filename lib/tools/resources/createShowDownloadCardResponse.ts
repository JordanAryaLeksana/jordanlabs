import "server-only";

import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";

import { getShowDownloadCardOutput } from "@/lib/tools/resources/getShowDownloadCardOutput";

export function createShowDownloadCardResponse(
  messages: UIMessage[]
) {
  const output =
    getShowDownloadCardOutput();

  const stream = createUIMessageStream({
    originalMessages: messages,

    execute: ({ writer }) => {
      /*
       * Tidak ada LLM call pada jalur ini.
       * Kita membuat assistant UI message secara langsung.
       */
      writer.write({
        type: "start",
      });

      writer.write({
        type: "data-cvDownload",
        id: crypto.randomUUID(),
        data: output,
      });
    },

    onError: (error) => {
      console.error(
        "Deterministic CV response gagal:",
        error
      );

      return "Jordan's CV could not be prepared.";
    },
  });

  return createUIMessageStreamResponse({
    stream,
  });
}
