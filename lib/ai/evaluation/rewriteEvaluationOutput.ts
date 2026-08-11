import "server-only";

import {
  generateText,
  jsonSchema,
  Output,
} from "ai";

import {
  getChatModel,
} from "@/lib/ai/model";

import type {
  EvaluationOutput,
} from "@/lib/ai/evaluation/getRoleEvaluation";

interface EvaluationRewrite {
  responseLanguage: string;
  summary: string;
  strengths: string[];
  limitations: string[];
}

const evaluationRewriteSchema =
  jsonSchema<EvaluationRewrite>({
    type: "object",

    properties: {
      responseLanguage: {
        type: "string",
      },

      summary: {
        type: "string",
      },

      strengths: {
        type: "array",
        items: {
          type: "string",
        },
      },

      limitations: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },

    required: [
      "responseLanguage",
      "summary",
      "strengths",
      "limitations",
    ],

    additionalProperties: false,
  });

interface RewriteEvaluationOutputOptions {
  userText: string;
  evaluation: EvaluationOutput;
}

export async function rewriteEvaluationOutput({
  userText,
  evaluation,
}: RewriteEvaluationOutputOptions): Promise<EvaluationOutput> {
  try {
    const { output } =
      await generateText({
        model: getChatModel(),

        output: Output.object({
          schema:
            evaluationRewriteSchema,
        }),

        prompt: `
You are the localization and writing layer for Jordan's portfolio assistant.

VISITOR MESSAGE:
${userText}

TRUSTED EVALUATION:
${JSON.stringify(
          evaluation,
          null,
          2
        )}

TASK:

1. Determine the natural language used by the VISITOR MESSAGE.
2. Set responseLanguage to the language you detected.
3. Rewrite ALL human-readable prose from TRUSTED EVALUATION into that language.
4. The source evaluation may be written in English. That does NOT mean
   the response should stay in English.
5. summary, every strengths item, and every limitations item MUST use
   the visitor's language.

FACTUAL SAFETY:

- Do not evaluate Jordan again.
- Do not change the assessment.
- Do not add new facts.
- Do not remove factual limitations.
- Do not infer skills, proficiency, seniority, achievements, or experience.
- Preserve the meaning of every source item.
- Keep the same number of strengths.
- Keep the same number of limitations.

ENTITY SAFETY:

- Preserve exact names and technical identifiers.
- Keep EMQNET exactly as EMQNET.
- Keep DermSight exactly as DermSight.
- Preserve company names, role names when appropriate, technologies,
  frameworks, metrics, and proper nouns.
- Do not create aliases such as EMQ, MEQ, or MQNET.

WRITING:

- Make the wording natural rather than performing a literal translation.
- The response should sound like a professional portfolio assistant.
- Do not mention this localization process.
- Do not mention the internal evaluation rubric.
- Return only the structured result.
`.trim(),
      });
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio evaluation rewrite:",
        {
          userText,
          detectedLanguage:
            output.responseLanguage,
          summary:
            output.summary,
          strengthCount:
            output.strengths.length,
          limitationCount:
            output.limitations.length,
        }
      );
    }
    if (
      output.strengths.length !==
      evaluation.strengths.length ||
      output.limitations.length !==
      evaluation.limitations.length ||
      output.summary.trim() === ""
    ) {
      console.warn(
        "Portfolio evaluation rewrite validation failed:",
        {
          userText,
          detectedLanguage:
            output.responseLanguage,
          expectedStrengths:
            evaluation.strengths.length,
          actualStrengths:
            output.strengths.length,
          expectedLimitations:
            evaluation.limitations.length,
          actualLimitations:
            output.limitations.length,
        }
      );

      return evaluation;
    }

    /*
     * Rewrite berhasil.
     * Assessment tetap berasal dari
     * deterministic evaluation.
     */
    return {
      assessment:
        evaluation.assessment,

      summary:
        output.summary,

      strengths:
        output.strengths,

      limitations:
        output.limitations,
    };

  } catch (error) {
    console.error(
      "Portfolio evaluation rewrite failed:",
      error
    );

    return evaluation;
  }
}
