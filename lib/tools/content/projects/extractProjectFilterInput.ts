import "server-only";

import {
  generateText,
  Output,
} from "ai";

import { getChatModel } from "@/lib/ai/model";
import { filterProjectsInputSchema } from "@/lib/tools/content/projects/project-filter-schemas";
import type { FilterProjectsInput } from "@/lib/tools/content/projects/project-filter-types";

export async function extractProjectFilterInput(
  userText: string
): Promise<FilterProjectsInput> {
  const { output } =
    await generateText({
      model: getChatModel(),

      output: Output.object({
        schema:
          filterProjectsInputSchema,
      }),

      prompt: `
Extract project filtering parameters from the visitor request.

Rules:
- Return only filters supported by the schema.
- Use exact enum values from the schema.
- Do not invent categories or tags.
- Omit filters that the visitor did not request.
- "AI" should map to the exact AI tag when appropriate.
- "computer vision" should map to the Computer Vision category.
- "deep learning" should map to the Deep Learning category.
- "featured" means featured = true.
- If the visitor simply asks to show all projects, return an empty object.
- Do not answer the visitor.
- Only extract filtering parameters.

Visitor request:
${userText}
      `.trim(),
    });

  return output;
}
