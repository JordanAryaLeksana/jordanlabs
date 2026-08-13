import "server-only";

import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";

import type {
  Project,
} from "@/lib/config/projects";

import {
  rewriteProjectKnowledgeOutput,
} from "@/lib/ai/entity-guard/rewriteProjectKnowledgeOutput";

interface CreateKnownProjectResponseOptions {
  messages: UIMessage[];
  userText: string;
  project: Project;
}

export function createKnownProjectResponse({
  messages,
  userText,
  project,
}: CreateKnownProjectResponseOptions) {
  const stream =
    createUIMessageStream({
      originalMessages:
        messages,

      execute: async ({
        writer,
      }) => {
        try {
          const message =
            await rewriteProjectKnowledgeOutput({
              userText,
              project,
            });

          if (
            process.env.NODE_ENV ===
            "development"
          ) {
            console.log(
              "Portfolio grounded project:",
              {
                userText,
                projectId:
                  project.id,
                entityName:
                  project.title,
              }
            );
          }

          writer.write({
            type:
              "data-projectKnowledge",

            id:
              crypto.randomUUID(),

            data: {
              entityType:
                "project",

              entityName:
                project.title,

              message,
            },
          });
        } catch (error) {
          console.error(
            "Portfolio project response failed:",
            error
          );

          writer.write({
            type:
              "data-projectKnowledge",

            id:
              crypto.randomUUID(),

            data: {
              entityType:
                "project",

              entityName:
                project.title,

              message:
                "Jordan's documented project information could not be prepared right now.",
            },
          });
        }
      },
    });

  return createUIMessageStreamResponse({
    stream,
  });
}
