import "server-only";

import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";

import { extractProjectFilterInput } from "@/lib/tools/content/projects/extractProjectFilterInput";
import { filterProjects } from "@/lib/tools/content/projects/filterProjects";

interface CreateProjectFilterResponseOptions {
  messages: UIMessage[];
  userText: string;
}

export function createProjectFilterResponse({
  messages,
  userText,
}: CreateProjectFilterResponseOptions) {
  const stream =
    createUIMessageStream({
      originalMessages: messages,

      execute: async ({
        writer,
      }) => {
        try {
          const input =
            await extractProjectFilterInput(
              userText
            );

          const output =
            filterProjects(input);

          if (
            process.env.NODE_ENV ===
            "development"
          ) {
            console.log(
              "Portfolio project filter:",
              {
                userText,
                input,
                count:
                  output.count,
                projects:
                  output.projects.map(
                    (project) =>
                      project.id
                  ),
              }
            );
          }

          writer.write({
            type:
              "data-projectFilterResults",
            id: crypto.randomUUID(),
            data: output,
          });
        } catch (error) {
          console.error(
            "Project filter failed:",
            error
          );

          writer.write({
            type:
              "data-projectFilterError",
            id: crypto.randomUUID(),
            data: {
              message:
                "Jordan's projects could not be filtered.",
            },
          });
        }
      },
    });

  return createUIMessageStreamResponse({
    stream,
  });
}
