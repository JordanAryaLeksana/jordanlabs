import "server-only";

import {
  generateText,
  Output,
} from "ai";

import {
  getChatModel,
} from "@/lib/ai/model";

import {
  filterSkillsInputSchema,
} from "@/lib/tools/content/skills/skill-filter-schemas";

import type {
  FilterSkillsInput,
} from "@/lib/tools/content/skills/skill-filter-types";

function normalizeSkillQuery(
  text: string
) {
  return text
    .toLowerCase()
    .trim()

    /*
     * Informal Indonesian.
     */
    .replace(
      /\btampilin\b/g,
      "tampilkan"
    )
    .replace(
      /\btunjukin\b/g,
      "tunjukkan"
    )
    .replace(
      /\bapa aja\b/g,
      "apa saja"
    )

    /*
     * Conservative common typos.
     */
    .replace(
      /\bskil\b/g,
      "skill"
    )
    .replace(
      /\bskiil\b/g,
      "skill"
    );
}

function getExplicitSkillFilter(
  text: string
): FilterSkillsInput | null {
  /*
   * Strong category signals.
   *
   * Kalau category sudah jelas,
   * tidak perlu membayar LLM call.
   */

  if (
    /\b(?:ai|ml|machine learning|deep learning|computer vision|cnn|artificial intelligence|kecerdasan buatan)\b/i.test(
      text
    )
  ) {
    return {
      category: "ai",
    };
  }

  if (
    /\b(?:frontend|front end|ui development|web frontend)\b/i.test(
      text
    )
  ) {
    return {
      category: "frontend",
    };
  }

  if (
    /\b(?:backend|back end|api|server-side|server side)\b/i.test(
      text
    )
  ) {
    return {
      category: "backend",
    };
  }

  if (
    /\b(?:database|databases|basis data|db)\b/i.test(
      text
    )
  ) {
    return {
      category: "database",
    };
  }

  if (
    /\b(?:programming|programming language|bahasa pemrograman)\b/i.test(
      text
    )
  ) {
    return {
      category: "programming",
    };
  }

  if (
    /\b(?:tooling|developer tools|development tools|tools|alat development)\b/i.test(
      text
    )
  ) {
    return {
      category: "tooling",
    };
  }

  if (
    /\b(?:collaboration|teamwork|leadership|mentoring|kolaborasi|kerja tim|kepemimpinan)\b/i.test(
      text
    )
  ) {
    return {
      category:
        "collaboration",
    };
  }

  return null;
}

export async function extractSkillFilterInput(
  userText: string
): Promise<FilterSkillsInput> {
  const normalizedText =
    normalizeSkillQuery(
      userText
    );

  /*
   * Fast path:
   * category eksplisit tidak perlu LLM.
   */
  const explicitFilter =
    getExplicitSkillFilter(
      normalizedText
    );

  if (explicitFilter) {
    return explicitFilter;
  }

  /*
   * Tidak ada category yang jelas.
   *
   * Untuk "show Jordan's skills"
   * kita sebenarnya bisa langsung {}.
   */
  if (
    /\bskills?\b/i.test(
      normalizedText
    ) ||
    /\b(?:kemampuan|keahlian|keterampilan)\b/i.test(
      normalizedText
    )
  ) {
    return {};
  }

  /*
   * Semantic fallback untuk wording
   * yang tidak tertangkap fast path.
   */
  const { output } =
    await generateText({
      model:
        getChatModel(),

      output:
        Output.object({
          schema:
            filterSkillsInputSchema,
        }),

      prompt: `
Extract a filter for Jordan's documented skills.

The visitor may use:
- English
- Indonesian
- informal Indonesian
- mixed Indonesian and English
- minor spelling mistakes

Available categories:

programming
frontend
backend
database
ai
tooling
collaboration

Semantic mappings:

AI, ML, machine learning, deep learning,
computer vision, CNN, kecerdasan buatan
→ ai

frontend, front end, UI development
→ frontend

backend, API, server-side
→ backend

database, basis data
→ database

programming language, bahasa pemrograman
→ programming

tools, tooling, developer tools
→ tooling

leadership, mentoring, teamwork,
collaboration, kerja tim, kolaborasi
→ collaboration

Rules:
- Never invent a category.
- Never invent skills.
- Use only an enum allowed by the schema.
- If no particular category is requested, return {}.
- Do not answer the visitor.
- Only return filtering parameters.

Normalized visitor request:
${normalizedText}
      `.trim(),
    });

  return output;
}