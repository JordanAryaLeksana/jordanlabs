import {
  convertToModelMessages,
  streamText,
  type UIMessage,
  createUIMessageStream,
  createUIMessageStreamResponse,
} from "ai";

import { getLatestUserText } from "@/lib/ai/getLatestUserText";
import { getChatModel } from "@/lib/ai/model";
import { buildSystemPrompt } from "@/lib/rag/prompt";
import { createPortfolioTools } from "@/lib/tools";
import { getNavigationToolChoice, getDeterministicNavigationAction } from "@/lib/tools/navigation/getNavigationToolChoice";
import { getResourceToolChoice } from "@/lib/tools/resources/getResourceToolChoice";
import { createShowDownloadCardResponse } from "@/lib/tools/resources/createShowDownloadCardResponse";
import { createExternalResourceResponse } from "@/lib/tools/resources/createExternalResourceResponse";
import { getOpenGithubOutput } from "@/lib/tools/resources/getOpenGithubOutput";
import { getOpenLinkedinOutput } from "@/lib/tools/resources/getOpenLinkedinOutput";
import { createContactCardResponse } from "@/lib/tools/resources/createContactCardResponse";
import { getContentToolChoice } from "@/lib/tools/content/getContentToolChoice";
import { createProjectFilterResponse } from "@/lib/tools/content/projects/createProjectFilterResponse";
import {
  createSkillFilterResponse,
} from "@/lib/tools/content/skills/createSkillFilterResponse";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const {
    messages,
  }: {
    messages: UIMessage[];
  } = await request.json();

  const latestUserText =
    getLatestUserText(messages);

  const resourceToolChoice =
    getResourceToolChoice(
      latestUserText
    );

  if (
    resourceToolChoice?.toolName ===
    "showDownloadCard"
  ) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio deterministic resource:",
        {
          latestUserText,
          resourceToolChoice,
        }
      );
    }

    return createShowDownloadCardResponse(
      messages
    );
  }
  if (resourceToolChoice?.toolName === "showContactCard") {
    return createContactCardResponse(messages);
  }
  if (
    resourceToolChoice?.toolName ===
    "openGithub"
  ) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio deterministic resource:",
        {
          latestUserText,
          resourceToolChoice,
        }
      );
    }

    return createExternalResourceResponse({
      messages,
      output:
        getOpenGithubOutput(),
    });
  }
  if (
    resourceToolChoice?.toolName ===
    "openLinkedin"
  ) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio deterministic resource:",
        {
          latestUserText,
          resourceToolChoice,
        }
      );
    }

    return createExternalResourceResponse({
      messages,
      output:
        getOpenLinkedinOutput(),
    });
  }
  const contentToolChoice =
    getContentToolChoice(
      latestUserText
    );

  if (
    contentToolChoice?.toolName ===
    "filterProjects"
  ) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio deterministic content:",
        {
          latestUserText,
          contentToolChoice,
        }
      );
    }

    return createProjectFilterResponse({
      messages,
      userText:
        latestUserText,
    });

  }
  if (
    contentToolChoice?.toolName ===
    "filterSkills"
  ) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio deterministic content:",
        {
          latestUserText,
          contentToolChoice,
        }
      );
    }

    return createSkillFilterResponse({
      messages,
      userText:
        latestUserText,
    });
  }
  const navigationAction =
    getDeterministicNavigationAction(
      latestUserText
    );

  if (navigationAction) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio deterministic navigation:",
        {
          latestUserText,
          navigationAction,
        }
      );
    }

    const stream =
      createUIMessageStream({
        originalMessages: messages,

        execute: ({ writer }) => {
          writer.write({
            type: "data-navigationAction",
            id: crypto.randomUUID(),
            data: navigationAction,
          });
        },
      });

    return createUIMessageStreamResponse({
      stream,
    });
  }
  const portfolioToolChoice =
    getNavigationToolChoice(
      latestUserText
    );

  const portfolioTools =
    createPortfolioTools();

  if (
    process.env.NODE_ENV ===
    "development"
  ) {
    console.log(
      "Portfolio tool routing:",
      {
        latestUserText,
        portfolioToolChoice,
      }
    );
  }
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
      "highlightSection",
      "openProjectDetail",

      "showDownloadCard",
      "openGithub",
      "openLinkedin",
      "showContactCard",

      "filterProjects",
    ],
    toolChoice: portfolioToolChoice,

    onStepFinish: ({
      text,
      toolCalls,
      toolResults,
      finishReason,
    }) => {
      if (
        process.env.NODE_ENV !==
        "development"
      ) {
        return;
      }

      console.log(
        "Portfolio AI step:",
        JSON.stringify(
          {
            text,
            toolCalls,
            toolResults,
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
