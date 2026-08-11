import "server-only";

import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";

import {
  EXPERIENCE,
} from "@/lib/config/experience";

interface CreateAiExperienceDurationResponseOptions {
  messages: UIMessage[];
}

export function createAiExperienceDurationResponse({
  messages,
}: CreateAiExperienceDurationResponseOptions) {
  const aiExperience =
    EXPERIENCE.flatMap(
      (experience) =>
        experience.roles.map(
          (role) => ({
            organization:
              experience.organization,
            title:
              role.title,
            period:
              role.period,
          })
        )
    ).find(
      (role) =>
        role.title ===
        "AI Engineer Intern"
    );

  const stream =
    createUIMessageStream({
      originalMessages:
        messages,

      execute: ({
        writer,
      }) => {
        writer.write({
          type:
            "data-experienceKnowledge",

          id:
            crypto.randomUUID(),

          data: {
            role:
              aiExperience?.title ??
              "AI Engineer",

            organization:
              aiExperience
                ?.organization,

            period:
              aiExperience?.period,

            message:
              aiExperience
                ? `Jordan's verified portfolio documents an ${aiExperience.title} role at ${aiExperience.organization} from ${aiExperience.period}. The portfolio does not provide a consolidated total number of years of professional AI Engineer experience.`
                : "Jordan's verified portfolio does not provide enough information to determine a professional AI Engineer experience duration.",
          },
        });
      },
    });

  return createUIMessageStreamResponse({
    stream,
  });
}
