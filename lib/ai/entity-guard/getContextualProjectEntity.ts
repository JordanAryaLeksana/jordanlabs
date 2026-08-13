import "server-only";

import {
  generateText,
  jsonSchema,
  Output,
  type UIMessage,
} from "ai";

import {
  PROJECTS,
  type Project,
} from "@/lib/config/projects";

import {
  getChatModel,
} from "@/lib/ai/model";

interface ContextualProjectResolution {
  projectId: string;
}

const contextualProjectResolutionSchema =
  jsonSchema<ContextualProjectResolution>({
    type: "object",

    properties: {
      projectId: {
        type: "string",
      },
    },

    required: [
      "projectId",
    ],

    additionalProperties: false,
  });

const CONTEXTUAL_PROJECT_REFERENCE_PATTERNS = [
  /\b(?:it|its)\b/i,

  /\b(?:this|that|the)\s+project\b/i,

  /\bthe\s+other\s+project\b/i,

  /\b(?:project|proyek|projek)\s+(?:itu|tersebut)\b/i,
];

const PERSONAL_TECHNOLOGY_REFERENCE_PATTERNS = [
  /\bjordan\b.*\b(?:use|uses|know|knows|experience|experienced)\b/i,

  /\bjordan\b.*\b(?:pakai|memakai|menggunakan|tahu|bisa|berpengalaman)\b/i,
];

interface GetContextualProjectEntityOptions {
  messages: UIMessage[];
  userText: string;
}

export async function getContextualProjectEntity({
  messages,
  userText,
}: GetContextualProjectEntityOptions): Promise<Project | null> {
  const normalizedUserText =
    userText.toLowerCase();

  /*
   * Explicit project sudah ditangani
   * oleh known-project resolver.
   */
  const hasExplicitProject =
    PROJECTS.some(
      (project) =>
        normalizedUserText.includes(
          project.title.toLowerCase()
        ) ||
        normalizedUserText.includes(
          project.id.toLowerCase()
        ) ||
        normalizedUserText.includes(
          project.slug.toLowerCase()
        )
    );

  if (hasExplicitProject) {
    return null;
  }

  /*
   * Resolver contextual hanya aktif
   * bila current message memang
   * mengandung reference ke subject
   * sebelumnya.
   */
  const hasContextualReference =
    CONTEXTUAL_PROJECT_REFERENCE_PATTERNS.some(
      (pattern) =>
        pattern.test(userText)
    );

  if (!hasContextualReference) {
    return null;
  }

  /*
   * Personal technology question seperti
   * "Does Jordan use it?" bukan project
   * reference dan akan ditangani oleh
   * grounding layer lain.
   */
  const isPersonalTechnologyReference =
    PERSONAL_TECHNOLOGY_REFERENCE_PATTERNS.some(
      (pattern) =>
        pattern.test(userText)
    );

  if (isPersonalTechnologyReference) {
    return null;
  }

  /*
   * Current visitor message dikeluarkan
   * karena antecedent harus berasal dari
   * conversation sebelumnya.
   */
  const recentConversation =
    messages
      .slice(0, -1)
      .slice(-6)
      .map((message) => {
        const text =
          message.parts
            .filter(
              (part) =>
                part.type === "text"
            )
            .map(
              (part) =>
                part.text
            )
            .join(" ")
            .trim();

        return {
          role:
            message.role,
          text,
        };
      })
      .filter(
        (message) =>
          message.text !== ""
      );

  /*
   * Project candidate harus pernah
   * muncul secara eksplisit pada recent
   * conversation. Model tidak diberi hak
   * memilih project yang tidak punya
   * conversational evidence.
   */
  const candidateProjects =
    PROJECTS.filter(
      (project) =>
        recentConversation.some(
          (message) => {
            const normalizedMessage =
              message.text.toLowerCase();

            return (
              normalizedMessage.includes(
                project.title.toLowerCase()
              ) ||
              normalizedMessage.includes(
                project.id.toLowerCase()
              ) ||
              normalizedMessage.includes(
                project.slug.toLowerCase()
              )
            );
          }
        )
    );

  if (
    candidateProjects.length === 0
  ) {
    return null;
  }

  try {
    const { output } =
      await generateText({
        model:
          getChatModel(),

        output:
          Output.object({
            schema:
              contextualProjectResolutionSchema,
          }),

        prompt: `
You resolve conversational references for Jordan's portfolio assistant.

CURRENT VISITOR MESSAGE:
${userText}

RECENT CONVERSATION:
${JSON.stringify(
          recentConversation,
          null,
          2
        )}

VALID CONTEXTUAL PROJECT CANDIDATES:
${JSON.stringify(
          candidateProjects.map(
            (project) => ({
              id:
                project.id,
              title:
                project.title,
            })
          ),
          null,
          2
        )}

TASK:

Determine whether the CURRENT VISITOR MESSAGE refers to one of the
VALID CONTEXTUAL PROJECT CANDIDATES.

Return the exact project id only when the conversational reference
is clear.

If the reference is not clear, return an empty string for projectId.

Do not invent a project.
Do not choose a project outside the candidate list.
Do not rename a project.
Return only the structured result.
`.trim(),
      });

    if (
      output.projectId === ""
    ) {
      return null;
    }

    /*
     * Model output divalidasi kembali
     * terhadap candidate yang sudah
     * dibuktikan oleh application.
     */
    const project =
      candidateProjects.find(
        (candidate) =>
          candidate.id ===
          output.projectId
      );

    if (!project) {
      console.warn(
        "Portfolio contextual project resolution rejected:",
        {
          userText,
          projectId:
            output.projectId,
        }
      );

      return null;
    }

    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Portfolio contextual project:",
        {
          userText,
          projectId:
            project.id,
        }
      );
    }

    return project;
  } catch (error) {
    console.error(
      "Portfolio contextual project resolution failed:",
      error
    );

    return null;
  }
}