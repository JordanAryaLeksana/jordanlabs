import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";

import { getLatestUserText } from "@/lib/ai/getLatestUserText";
import { getChatModel } from "@/lib/ai/model";
import { buildSystemPrompt } from "@/lib/rag/prompt";
import { createPortfolioTools } from "@/lib/tools";
import { getNavigationToolChoice } from "@/lib/tools/navigation/getNavigationToolChoice";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const {
    messages,
  }: {
    messages: UIMessage[];
  } = await request.json();

  const latestUserText =
    getLatestUserText(messages);

  const navigationToolChoice =
    getNavigationToolChoice(latestUserText);

  const portfolioTools =
    createPortfolioTools();

  console.log("Portfolio tool routing:", {
    latestUserText,
    navigationToolChoice,
  });

  const result = streamText({
    model: getChatModel(),
    instructions: buildSystemPrompt(),

    messages: await convertToModelMessages(
      messages,
      {
        tools: portfolioTools,

        /*
         * Safety net agar satu tool call rusak tidak
         * mengunci seluruh percakapan berikutnya.
         */
        ignoreIncompleteToolCalls: true,
      }
    ),

    tools: portfolioTools,

    activeTools: [
      "navigateToPage",
      "scrollToSection",
    ],

    toolChoice: navigationToolChoice,

    onStepFinish: ({
      text,
      toolCalls,
      finishReason,
    }) => {
      console.log(
        "Portfolio navigation step:",
        JSON.stringify(
          {
            text,
            toolCalls,
            finishReason,
          },
          null,
          2
        )
      );
    },

    onError: ({ error }) => {
      console.error(
        "streamText gagal:",
        error
      );
    },
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,

    onError: (error) => {
      console.error(
        "Stream error diteruskan ke client:",
        error
      );

      return "Asisten AI sedang tidak bisa dihubungi. Coba lagi sebentar lagi.";
    },
  });
}