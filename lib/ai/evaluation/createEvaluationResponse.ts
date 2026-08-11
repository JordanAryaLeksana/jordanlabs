import "server-only";

import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";

import {
  rewriteEvaluationOutput,
} from "@/lib/ai/evaluation/rewriteEvaluationOutput";

import {
  getRoleEvaluation,
  type EvaluationRole,
} from "@/lib/ai/evaluation/getRoleEvaluation";

interface CreateEvaluationResponseOptions {
  messages: UIMessage[];
  userText: string;
  role: EvaluationRole;
}

export function createEvaluationResponse({
  messages,
  userText,
  role,
}: CreateEvaluationResponseOptions) {
  const stream =
    createUIMessageStream({
      originalMessages: messages,

      execute: async ({
        writer,
      }) => {
        try {
          const canonicalOutput =
            getRoleEvaluation(role);

          const rewrittenOutput =
            await rewriteEvaluationOutput({
              userText,
              evaluation:
                canonicalOutput,
            });
          const output = {
            assessment:
              canonicalOutput.assessment,

            summary:
              rewrittenOutput.summary,

            strengths:
              rewrittenOutput.strengths,

            limitations:
              rewrittenOutput.limitations,
          };
          if (
            process.env.NODE_ENV ===
            "development"
          ) {
            console.log(
              "Portfolio grounded evaluation:",
              {
                userText,
                role,

                canonicalAssessment:
                  canonicalOutput.assessment,

                assessment:
                  output.assessment,

                summary:
                  output.summary,

                strengths:
                  output.strengths,

                limitations:
                  output.limitations,
              }
            );
          }
          writer.write({
            type:
              "data-evaluationResult",

            id:
              crypto.randomUUID(),

            data: output,
          });
        } catch (error) {
          console.error(
            "Portfolio evaluation failed:",
            error
          );

          writer.write({
            type:
              "data-evaluationError",

            id:
              crypto.randomUUID(),

            data: {
              message:
                "Jordan's profile could not be evaluated right now.",
            },
          });
        }
      },
    });

  return createUIMessageStreamResponse({
    stream,
  });
}