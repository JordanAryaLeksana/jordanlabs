import type {
  UIMessage,
} from "ai";

type MessagePart =
  UIMessage["parts"][number];

export type EvaluationResultDataPart =
  MessagePart & {
    type: "data-evaluationResult";
    id?: string;
    data: {
      assessment:
        | "strong"
        | "moderate"
        | "limited";
      summary: string;
      strengths: string[];
      limitations: string[];
    };
  };

export type EvaluationErrorDataPart =
  MessagePart & {
    type: "data-evaluationError";
    id?: string;
    data: {
      message: string;
    };
  };

export function isEvaluationResultDataPart(
  part: MessagePart
): part is EvaluationResultDataPart {
  if (
    part.type !==
    "data-evaluationResult" ||
    typeof part.data !==
      "object" ||
    part.data === null
  ) {
    return false;
  }

  const data =
    part.data as Record<
      string,
      unknown
    >;

  return (
    (
      data.assessment ===
        "strong" ||
      data.assessment ===
        "moderate" ||
      data.assessment ===
        "limited"
    ) &&
    typeof data.summary ===
      "string" &&
    Array.isArray(
      data.strengths
    ) &&
    data.strengths.every(
      (item) =>
        typeof item === "string"
    ) &&
    Array.isArray(
      data.limitations
    ) &&
    data.limitations.every(
      (item) =>
        typeof item === "string"
    )
  );
}

export function isEvaluationErrorDataPart(
  part: MessagePart
): part is EvaluationErrorDataPart {
  return (
    part.type ===
      "data-evaluationError" &&
    typeof part.data ===
      "object" &&
    part.data !== null &&
    "message" in part.data &&
    typeof part.data.message ===
      "string"
  );
}
