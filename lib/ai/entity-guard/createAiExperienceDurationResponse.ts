import "server-only";

import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";

import {
  EXPERIENCE,
} from "@/lib/config/experience";

import { PROJECTS } from "@/lib/config/projects";

interface CreateAiExperienceDurationResponseOptions {
  messages: UIMessage[];
}

const AI_ROLE_PATTERN =
  /\b(?:ai|machine learning|deep learning|ml)\b/i;

export function createAiExperienceDurationResponse({
  messages,
}: CreateAiExperienceDurationResponseOptions) {
  const aiRoles =
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
    ).filter(
      (role) =>
        AI_ROLE_PATTERN.test(role.title)
    );

  const firstRole = aiRoles[0];

  const aiProjectTitles = PROJECTS
    .filter((project) => project.tags.includes("AI"))
    .slice(0, 3)
    .map((project) => project.title)
    .join(", ");

  const roleSummary = aiRoles
    .map((role) => `${role.title} at ${role.organization} (${role.period})`)
    .join("; ");

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
              firstRole?.title ??
              "AI Engineer",

            organization:
              firstRole
                ?.organization,

            period:
              firstRole?.period,

            message:
              aiRoles.length > 0
                ? `Jordan's verified portfolio documents these AI roles: ${roleSummary}. It also documents AI projects such as ${aiProjectTitles}. The portfolio does not state a consolidated total number of years of professional AI Engineer experience.`
                : "Jordan's verified portfolio does not provide enough information to determine a professional AI Engineer experience duration.",
          },
        });
      },
    });

  return createUIMessageStreamResponse({
    stream,
  });
}
