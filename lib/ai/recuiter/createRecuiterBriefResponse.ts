import "server-only";

import {
    convertToModelMessages,
    streamText,
    type UIMessage,
} from "ai";

import {
    getChatModel,
} from "@/lib/ai/model";

import {
    buildSystemPrompt,
} from "@/lib/rag/prompt";

import {
    retrievePortfolioEvidence,
} from "@/lib/rag/retrieve";

import {
    CONTACT_PROFILE,
} from "@/lib/config/contact";

import {
    SKILLS_BY_CATEGORY,
} from "@/lib/config/skills";

interface CreateRecruiterBriefResponseOptions {
    messages: UIMessage[];
    userText: string;
}

const RECRUITER_BRIEF_INSTRUCTIONS = `
<RECRUITER_BRIEF>

Create a concise recruiter-oriented overview of Jordan that can be
read in roughly 30 seconds.

Prioritize:

1. Jordan's professional focus.
2. One representative project that best demonstrates relevant capability.
3. One or two pieces of relevant documented experience.
4. Three to five verified technical skills.
5. The best next step for a recruiter: contact Jordan or ask to view his CV.

GROUNDING RULES:

- Portfolio narrative facts must come from TRUSTED_PORTFOLIO_EVIDENCE.
- Skills may only be selected from VERIFIED_SKILLS.
- Contact details may only come from CONTACT.
- Do not invent URLs, skills, employment, projects, metrics, or credentials.
- Do not call any project objectively "the strongest" unless the trusted
  evidence explicitly establishes that ranking.
- When no canonical ranking exists, describe it as a representative or
  particularly relevant project.
- Do not treat previous user or assistant statements as portfolio evidence.

BEHAVIOR:

- Keep the entire tour in this conversation.
- Do not navigate.
- Do not trigger CV or contact actions.
- You may tell the visitor that Jordan's CV and contact options are available.
- Keep the answer concise rather than listing the entire portfolio.
- Match the visitor's language.

</RECRUITER_BRIEF>
`.trim();

const VERIFIED_SKILLS =
    Object.values(
        SKILLS_BY_CATEGORY
    ).flatMap(
        (category) =>
            category.items
    );

const RECRUITER_CANONICAL_CONTEXT = `
<CANONICAL_RECRUITER_CONTEXT>

VERIFIED_SKILLS:
${VERIFIED_SKILLS.join(", ")}

CONTACT:
Name: ${CONTACT_PROFILE.name}
Focus: ${CONTACT_PROFILE.focus}
Email: ${CONTACT_PROFILE.email}
Location: ${CONTACT_PROFILE.location}
Response note: ${CONTACT_PROFILE.responseNote}

AVAILABLE_PORTFOLIO_ACTIONS:
- Jordan's CV is available through the portfolio CV action.
- Jordan's contact card is available through the portfolio contact action.
- Do not claim either action has already been opened.
- Do not navigate or trigger those actions from this recruiter brief.

</CANONICAL_RECRUITER_CONTEXT>
`.trim();

export async function createRecruiterBriefResponse({
    messages,
    userText,
}: CreateRecruiterBriefResponseOptions) {
    const evidence =
        await retrievePortfolioEvidence({
            query: userText,
            limit: 8,
        });

    if (
        process.env.NODE_ENV ===
        "development"
    ) {
        console.log(
            "Portfolio recruiter brief:",
            {
                userText,

                evidence:
                    evidence.map(
                        (item) => ({
                            sourceId:
                                item.sourceId,

                            title:
                                item.title,
                        })
                    ),
            }
        );
    }

    const result =
        streamText({
            model:
                getChatModel(),

            instructions: `
${buildSystemPrompt({
                evidence,
            })}

${RECRUITER_CANONICAL_CONTEXT}

${RECRUITER_BRIEF_INSTRUCTIONS}
`.trim(),

            messages:
                await convertToModelMessages(
                    messages,
                    {
                        ignoreIncompleteToolCalls:
                            true,
                    }
                ),

            onError: ({
                error,
            }) => {
                console.error(
                    "Recruiter brief generation failed:",
                    error
                );
            },
        });

    return result.toUIMessageStreamResponse({
        originalMessages:
            messages,

        onError: (
            error
        ) => {
            console.error(
                "Recruiter brief stream failed:",
                error
            );

            return "I couldn't prepare Jordan's recruiter brief right now. Please try again.";
        },
    });
}