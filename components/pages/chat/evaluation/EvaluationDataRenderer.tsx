import {
  ChatMessageBubble,
} from "@/components/pages/chat/ChatMessageBubble";

import type {
  EvaluationResultDataPart,
} from "@/components/pages/chat/evaluation/isEvaluationDataPart";

interface EvaluationDataRendererProps {
  part: EvaluationResultDataPart;
}

const ASSESSMENT_LABELS = {
  strong: "Strong evidence",
  moderate: "Moderate evidence",
  limited: "Limited evidence",
} as const;

export function EvaluationDataRenderer({
  part,
}: EvaluationDataRendererProps) {
  const {
    assessment,
    summary,
    strengths,
    limitations,
  } = part.data;

  return (
    <ChatMessageBubble role="assistant">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-[0.12em] opacity-60">
            {
              ASSESSMENT_LABELS[
                assessment
              ]
            }
          </span>

          <p>{summary}</p>
        </div>

        {strengths.length > 0 ? (
          <div className="flex flex-col gap-2">
            <p className="font-semibold">
              Documented evidence
            </p>

            <ul className="list-disc space-y-1 pl-5">
              {strengths.map(
                (
                  strength,
                  index
                ) => (
                  <li
                    key={`strength-${index}`}
                  >
                    {strength}
                  </li>
                )
              )}
            </ul>
          </div>
        ) : null}

        {limitations.length > 0 ? (
          <div className="flex flex-col gap-2">
            <p className="font-semibold">
              Limitations
            </p>

            <ul className="list-disc space-y-1 pl-5">
              {limitations.map(
                (
                  limitation,
                  index
                ) => (
                  <li
                    key={`limitation-${index}`}
                  >
                    {limitation}
                  </li>
                )
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </ChatMessageBubble>
  );
}
