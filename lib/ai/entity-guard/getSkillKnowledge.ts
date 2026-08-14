import "server-only";

import {
  generateText,
  jsonSchema,
  Output,
  type UIMessage,
} from "ai";

import {
  getChatModel,
} from "@/lib/ai/model";

import {
  SKILLS_BY_CATEGORY,
} from "@/lib/config/skills";

export interface SkillKnowledgeResult {
  skillName: string;
  documented: boolean;
  resolved: boolean;
}

interface ContextualSkillResolution {
  skillName: string;
}

const contextualSkillResolutionSchema =
  jsonSchema<ContextualSkillResolution>({
    type: "object",

    properties: {
      skillName: {
        type: "string",
      },
    },

    required: [
      "skillName",
    ],

    additionalProperties: false,
  });

const SKILL_QUERY_PATTERNS = [
  /\bdoes\s+jordan\s+(?:know|use|have\s+experience\s+with)\s+(.+?)(?:\?|$)/i,

  /\bis\s+jordan\s+(?:familiar\s+with|experienced\s+with)\s+(.+?)(?:\?|$)/i,

  /\bapakah\s+jordan\s+(?:bisa|tahu|menguasai|menggunakan|pernah\s+menggunakan)\s+(.+?)(?:\?|$)/i,

  /\bjordan\s+(?:bisa|tahu|menguasai|menggunakan|pernah\s+menggunakan)\s+(.+?)(?:\?|$)/i,
];

const CONTEXTUAL_SKILL_REFERENCES =
  new Set([
    "it",
    "this",
    "that",
    "this technology",
    "that technology",
    "this tool",
    "that tool",
    "ini",
    "itu",
    "teknologi ini",
    "teknologi itu",
    "tool ini",
    "tool itu",
  ]);

function normalizeSkillName(
  value: string
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

const DOCUMENTED_SKILLS =
  Object.values(
    SKILLS_BY_CATEGORY
  ).flatMap(
    (category) =>
      category.items
  );

interface GetSkillKnowledgeOptions {
  userText: string;
  messages: UIMessage[];
}

export async function getSkillKnowledge({
  userText,
  messages,
}: GetSkillKnowledgeOptions):
  Promise<SkillKnowledgeResult | null> {
  for (
    const pattern of
    SKILL_QUERY_PATTERNS
  ) {
    const match =
      userText.match(pattern);

    const requestedSkill =
      match?.[1]?.trim();

    if (!requestedSkill) {
      continue;
    }

    const normalizedRequestedSkill =
      normalizeSkillName(
        requestedSkill
      );

    /*
     * Explicit technology name:
     * deterministic canonical validation.
     *
     * Tidak perlu memanggil LLM.
     */
    if (
      !CONTEXTUAL_SKILL_REFERENCES.has(
        normalizedRequestedSkill
      )
    ) {
      const documentedSkill =
        DOCUMENTED_SKILLS.find(
          (skill) =>
            normalizeSkillName(
              skill
            ) ===
            normalizedRequestedSkill
        );

      return {
        skillName:
          documentedSkill ??
          requestedSkill,

        documented:
          documentedSkill !==
          undefined,

        resolved:
          true,
      };
    }

    /*
     * Contextual reference seperti "it"
     * hanya boleh di-resolve dari pesan
     * visitor sebelumnya.
     *
     * Previous assistant prose bukan
     * source of truth maupun candidate.
     */
    const recentUserMessages =
      messages
        .slice(0, -1)
        .filter(
          (message) =>
            message.role ===
            "user"
        )
        .slice(-6)
        .map((message) => {
          return message.parts
            .filter(
              (part) =>
                part.type ===
                "text"
            )
            .map(
              (part) =>
                part.text
            )
            .join(" ")
            .trim();
        })
        .filter(
          (text) =>
            text !== ""
        );

    if (
      recentUserMessages.length ===
      0
    ) {
      return {
        skillName:
          requestedSkill,

        documented:
          false,

        resolved:
          false,
      };
    }

    try {
      const { output } =
        await generateText({
          model:
            getChatModel(),

          output:
            Output.object({
              schema:
                contextualSkillResolutionSchema,
            }),

          prompt: `
You resolve a contextual technology reference for Jordan's portfolio assistant.

CURRENT VISITOR MESSAGE:
${userText}

RECENT VISITOR MESSAGES:
${JSON.stringify(
            recentUserMessages,
            null,
            2
          )}

TASK:

Resolve the technology, framework, library, tool, programming language,
or engineering concept referred to by expressions such as:
- it
- this
- that
- this technology
- that technology
- ini
- itu
- teknologi itu

Use only an explicit technical concept that appeared in RECENT VISITOR
MESSAGES.

Do not use previous assistant statements as evidence.
Do not infer a technology that the visitor did not explicitly mention.
Do not decide whether Jordan knows or uses the technology.
Do not invent or rename the technology.

Return the exact referenced technical concept in skillName.

If the reference cannot be resolved clearly, return an empty string.
`.trim(),
        });

      const resolvedSkill =
        output.skillName.trim();

      if (
        resolvedSkill === ""
      ) {
        return {
          skillName:
            requestedSkill,

          documented:
            false,

          resolved:
            false,
        };
      }

      const normalizedResolvedSkill =
        normalizeSkillName(
          resolvedSkill
        );

      /*
       * LLM hanya mengusulkan referent.
       * Application memvalidasi bahwa
       * entity tersebut benar-benar pernah
       * disebut visitor sebelumnya.
       */
      const appearedInUserHistory =
        recentUserMessages.some(
          (message) =>
            normalizeSkillName(
              message
            ).includes(
              normalizedResolvedSkill
            )
        );

      if (
        !appearedInUserHistory
      ) {
        console.warn(
          "Portfolio contextual skill resolution rejected:",
          {
            userText,
            resolvedSkill,
          }
        );

        return {
          skillName:
            requestedSkill,

          documented:
            false,

          resolved:
            false,
        };
      }

      const documentedSkill =
        DOCUMENTED_SKILLS.find(
          (skill) =>
            normalizeSkillName(
              skill
            ) ===
            normalizedResolvedSkill
        );

      if (
        process.env.NODE_ENV ===
        "development"
      ) {
        console.log(
          "Portfolio contextual skill:",
          {
            userText,
            requestedSkill,
            resolvedSkill:
              documentedSkill ??
              resolvedSkill,
            documented:
              documentedSkill !==
              undefined,
          }
        );
      }

      return {
        skillName:
          documentedSkill ??
          resolvedSkill,

        documented:
          documentedSkill !==
          undefined,

        resolved:
          true,
      };
    } catch (error) {
      console.error(
        "Portfolio contextual skill resolution failed:",
        error
      );

      return {
        skillName:
          requestedSkill,

        documented:
          false,

        resolved:
          false,
      };
    }
  }

  return null;
}