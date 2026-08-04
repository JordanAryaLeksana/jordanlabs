import {
  streamText,
  convertToModelMessages,
  toUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";
import { detectResponseLanguage } from "@/lib/ai/detectResponseLanguange";
import { getLatestUserText } from "@/lib/ai/getLatestUserText";
import { getChatModel } from "@/lib/ai/model";
import { buildSystemPrompt } from "@/lib/rag/prompt";
import { createPortfolioTools } from "@/lib/tools";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } =
    await request.json();

  const latestUserText = getLatestUserText(messages);
  const responseLanguage =
    detectResponseLanguage(latestUserText);

  const portfolioTools = createPortfolioTools({
    responseLanguage,
  });

  const result = streamText({
    model: getChatModel(),
    instructions: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
    tools: portfolioTools,

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