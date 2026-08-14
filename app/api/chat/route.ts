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
import { getEvaluationRole } from "@/lib/ai/evaluation/getEvaluationIntent";
import {
  getUnknownProjectEntity,
} from "@/lib/ai/entity-guard/getUnknownProjectEntity";

import {
  createUnknownProjectResponse,
} from "@/lib/ai/entity-guard/createUnknownProjectResponse";
import {
  createEvaluationResponse,
} from "@/lib/ai/evaluation/createEvaluationResponse";
import { createSkillKnowledgeResponse } from "@/lib/ai/entity-guard/createSkillKnowledgeResponse";
import { getSkillKnowledge } from "@/lib/ai/entity-guard/getSkillKnowledge";
import {
  getEmploymentKnowledge,
} from "@/lib/ai/entity-guard/getEmploymentKnowledge";

import {
  createEmploymentKnowledgeResponse,
} from "@/lib/ai/entity-guard/createEmploymentKnowledgeResponse";

import {
  getUnknownCertificationEntity,
} from "@/lib/ai/entity-guard/getUnknownCertificationEntity";

import {
  createUnknownCertificationResponse,
} from "@/lib/ai/entity-guard/createUnknownCertificationResponse";
import {
  isAiExperienceDurationQuery,
} from "@/lib/ai/entity-guard/getAiExperienceDurationQuery";

import {
  createAiExperienceDurationResponse,
} from "@/lib/ai/entity-guard/createAiExperienceDurationResponse";

import {
  getKnownProjectEntity,
} from "@/lib/ai/entity-guard/getKnownProjectEntity";

import {
  createKnownProjectResponse,
} from "@/lib/ai/entity-guard/createKnownProjectResponse";

import {
  getContextualProjectEntity,
} from "@/lib/ai/entity-guard/getContextualProjectEntity";

import {
  retrievePortfolioEvidence,
} from "@/lib/rag/retrieve";

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
  const evaluationRole =
    getEvaluationRole(
      latestUserText
    );

  if (evaluationRole) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio grounded evaluation request:",
        {
          latestUserText,
          evaluationRole,
        }
      );
    }

    return createEvaluationResponse({
      messages,
      userText:
        latestUserText,
      role:
        evaluationRole,
    });
  }
  const knownProjectEntity =
    getKnownProjectEntity(
      latestUserText
    );

  if (knownProjectEntity) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio known project request:",
        {
          latestUserText,
          projectId:
            knownProjectEntity.id,
        }
      );
    }

    return createKnownProjectResponse({
      messages,
      userText:
        latestUserText,
      project:
        knownProjectEntity,
    });
  }
  const unknownProjectEntity =
    getUnknownProjectEntity(
      latestUserText
    );

  if (unknownProjectEntity) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio unknown project entity:",
        {
          latestUserText,
          unknownProjectEntity,
        }
      );
    }

    return createUnknownProjectResponse({
      messages,
      entityName:
        unknownProjectEntity.entityName,
    });
  }
  const contextualProjectEntity =
    await getContextualProjectEntity({
      messages,
      userText:
        latestUserText,
    });

  if (contextualProjectEntity) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio contextual project request:",
        {
          latestUserText,
          projectId:
            contextualProjectEntity.id,
        }
      );
    }

    return createKnownProjectResponse({
      messages,
      userText:
        latestUserText,
      project:
        contextualProjectEntity,
    });
  }
  const skillKnowledge =
    await getSkillKnowledge({
      userText:
        latestUserText,

      messages,
    });

  if (skillKnowledge) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio skill knowledge:",
        {
          latestUserText,
          skillKnowledge,
        }
      );
    }

    return createSkillKnowledgeResponse({
      messages,
      result:
        skillKnowledge,
    });
  }
  const employmentKnowledge =
    getEmploymentKnowledge(
      latestUserText
    );

  if (employmentKnowledge) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio employment knowledge:",
        {
          latestUserText,
          employmentKnowledge,
        }
      );
    }

    return createEmploymentKnowledgeResponse({
      messages,
      result:
        employmentKnowledge,
    });
  }

  const unknownCertificationEntity =
    getUnknownCertificationEntity(
      latestUserText
    );

  if (unknownCertificationEntity) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio unknown certification:",
        {
          latestUserText,
          unknownCertificationEntity,
        }
      );
    }

    return createUnknownCertificationResponse({
      messages,
      certificationName:
        unknownCertificationEntity
          .certificationName,
    });
  }
  if (
    isAiExperienceDurationQuery(
      latestUserText
    )
  ) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio AI experience duration:",
        {
          latestUserText,
        }
      );
    }

    return createAiExperienceDurationResponse({
      messages,
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
  const retrievedEvidence =
    await retrievePortfolioEvidence({
      query:
        latestUserText,

      limit:
        5,
    });

  if (
    process.env.NODE_ENV ===
    "development"
  ) {
    console.log(
      "Portfolio RAG retrieval:",
      {
        query:
          latestUserText,

        evidence:
          retrievedEvidence.map(
            (item) => ({
              sourceId:
                item.sourceId,

              title:
                item.title,
            })
          ),
      }
    );
  }

  const result = streamText({
    model: getChatModel(),

    instructions:
      buildSystemPrompt({
        evidence:
          retrievedEvidence,
      }),

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
      "filterSkills",
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
