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
  Project,
} from "@/lib/config/projects";

interface ProjectKnowledgeRewrite {
  responseLanguage: string;
  message: string;
}

const projectKnowledgeRewriteSchema =
  jsonSchema<ProjectKnowledgeRewrite>({
    type: "object",

    properties: {
      responseLanguage: {
        type: "string",
      },

      message: {
        type: "string",
      },
    },

    required: [
      "responseLanguage",
      "message",
    ],

    additionalProperties: false,
  });

interface RewriteProjectKnowledgeOutputOptions {
  userText: string;
  project: Project;
}

export async function rewriteProjectKnowledgeOutput({
  userText,
  project,
}: RewriteProjectKnowledgeOutputOptions): Promise<string> {
  const fallbackMessage =
    `${project.title} — ${project.shortDescription} ` +
    `Jordan's documented role is ${project.role}. ` +
    `${project.architecture}`;

  const evidence = {
    title:
      project.title,

    category:
      project.category,

    tags:
      project.tags,

    status:
      project.status,

    role:
      project.role,

    shortDescription:
      project.shortDescription,

    overview:
      project.overview,

    architecture:
      project.architecture,

    dataset:
      project.dataset,

    training:
      project.training,

    evaluation:
      project.evaluation,
  };

  try {
    const { output } =
      await generateText({
        model:
          getChatModel(),

        output:
          Output.object({
            schema:
              projectKnowledgeRewriteSchema,
          }),

        prompt: `
You are the grounded writing layer for Jordan's portfolio assistant.

VISITOR MESSAGE:
${userText}

TRUSTED PROJECT EVIDENCE:
${JSON.stringify(
          evidence,
          null,
          2
        )}

TASK:

1. Understand what the visitor is asking about the documented project.
2. Determine the natural language used by the visitor.
3. Set responseLanguage to that language.
4. Answer the visitor naturally using only TRUSTED PROJECT EVIDENCE.
5. Focus on the parts of the evidence that are relevant to the question.
6. Keep the response concise but informative.

FACTUAL SAFETY:

- TRUSTED PROJECT EVIDENCE is the only source of truth about this project.
- Do not invent technologies, metrics, results, datasets, deployment details,
  achievements, responsibilities, or project capabilities.
- Do not infer undocumented implementation details.
- If requested information is not present in the evidence, clearly say that
  it is not documented.
- Do not use general technical knowledge as evidence about this project.

ENTITY SAFETY:

- Preserve the exact project name "${project.title}".
- Never rename, expand, abbreviate, translate, or create an alias for it.
- Preserve exact technology names and proper nouns from the evidence.

WRITING:

- Answer the visitor's actual question rather than summarizing every field.
- Write naturally rather than copying the evidence verbatim.
- Do not mention evidence, prompts, internal data, routing, or implementation.
- Return only the structured result.
`.trim(),
      });

    if (
      output.message.trim() === "" ||
      !output.message.includes(
        project.title
      )
    ) {
      console.warn(
        "Portfolio project rewrite validation failed:",
        {
          userText,
          projectId:
            project.id,
          detectedLanguage:
            output.responseLanguage,
        }
      );

      return fallbackMessage;
    }

    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio project rewrite:",
        {
          userText,
          projectId:
            project.id,
          detectedLanguage:
            output.responseLanguage,
          message:
            output.message,
        }
      );
    }

    return output.message;
  } catch (error) {
    console.error(
      "Portfolio project rewrite failed:",
      error
    );

    return fallbackMessage;
  }
}
