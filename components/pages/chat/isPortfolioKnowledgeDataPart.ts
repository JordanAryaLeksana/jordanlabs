import type {
  UIMessage,
} from "ai";

type MessagePart =
  UIMessage["parts"][number];

const PORTFOLIO_KNOWLEDGE_DATA_TYPES =
  new Set([
    "data-unknownPortfolioEntity",
    "data-skillKnowledge",
    "data-employmentKnowledge",
    "data-experienceKnowledge",
  ]);

export type PortfolioKnowledgeDataPart =
  MessagePart & {
    type:
      | "data-unknownPortfolioEntity"
      | "data-skillKnowledge"
      | "data-employmentKnowledge"
      | "data-experienceKnowledge";

    id?: string;

    data: {
      message: string;
    };
  };

export function isPortfolioKnowledgeDataPart(
  part: MessagePart
): part is PortfolioKnowledgeDataPart {
  if (
    !PORTFOLIO_KNOWLEDGE_DATA_TYPES.has(
      part.type
    )
  ) {
    return false;
  }

  if (!("data" in part)) {
    return false;
  }

  return (
    typeof part.data === "object" &&
    part.data !== null &&
    "message" in part.data &&
    typeof part.data.message ===
      "string"
  );
}