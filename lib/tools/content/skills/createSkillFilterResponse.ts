import "server-only";

import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";

import {
  extractSkillFilterInput,
} from "@/lib/tools/content/skills/extractSkillFilterInput";

import {
  filterSkills,
} from "@/lib/tools/content/skills/filterSkills";

interface CreateSkillFilterResponseOptions {
  messages: UIMessage[];
  userText: string;
}

export function createSkillFilterResponse({
  messages,
  userText,
}: CreateSkillFilterResponseOptions) {
  const stream =
    createUIMessageStream({
      originalMessages: messages,

      execute: async ({
        writer,
      }) => {
        try {
          const input =
            await extractSkillFilterInput(
              userText
            );

          const output =
            filterSkills(input);

          if (
            process.env.NODE_ENV ===
            "development"
          ) {
            console.log(
              "Portfolio skill filter:",
              {
                userText,
                input,
                count:
                  output.count,
              }
            );
          }

          writer.write({
            type:
              "data-skillFilterResults",

            id:
              crypto.randomUUID(),

            data: output,
          });
        } catch (error) {
          console.error(
            "Skill filter failed:",
            error
          );

          writer.write({
            type:
              "data-skillFilterError",

            id:
              crypto.randomUUID(),

            data: {
              message:
                "Jordan's skills could not be filtered.",
            },
          });
        }
      },
    });

  return createUIMessageStreamResponse({
    stream,
  });
}
