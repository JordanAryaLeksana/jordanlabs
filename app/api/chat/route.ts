import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";

import { getChatModel } from "@/lib/ai/model";
import { buildSystemPrompt } from "@/lib/rag/prompt";
import { createPortfolioTools } from "@/lib/tools";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } =
    await request.json();

  const portfolioTools = createPortfolioTools();

  const result = streamText({
    model: getChatModel(),
    instructions: buildSystemPrompt(),

    messages: await convertToModelMessages(
      messages,
      {
        tools: portfolioTools,
      }
    ),

    tools: portfolioTools,

    /*
     * Hanya navigateToPage yang diaktifkan sampai alur
     * client-forwarded pertama selesai divalidasi.
     */
    activeTools: ["navigateToPage"],

    onStepFinish: ({
      text,
      toolCalls,
      finishReason,
    }) => {
      console.log("Portfolio navigation step:", {
        text,
        toolCalls,
        finishReason,
      });
    },

    onError: ({ error }) => {
      console.error("streamText gagal:", error);
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,

      onError: (error) => {
        console.error(
          "Stream error diteruskan ke client:",
          error
        );

        return "Asisten AI sedang tidak bisa dihubungi. Coba lagi sebentar lagi.";
      },
    }),
  });
}
