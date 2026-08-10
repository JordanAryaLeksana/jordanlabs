import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import { CvDownloadCard } from "@/components/pages/chat/resources/CvDownloadCard";
import { isShowDownloadCardOutput } from "@/components/pages/chat/resources/isShowDownloadCardOutput";
import type { ShowDownloadCardPart } from "@/components/pages/chat/resources/isShowDownloadCardPart";

interface ShowDownloadCardRendererProps {
  part: ShowDownloadCardPart;
}

export function ShowDownloadCardRenderer({
  part,
}: ShowDownloadCardRendererProps) {
  if (
    part.state === "input-streaming" ||
    part.state === "input-available"
  ) {
    return (
      <div
        role="status"
        aria-live="polite"
      >
        <ChatMessageBubble role="assistant">
          Preparing Jordan&apos;s CV…
        </ChatMessageBubble>
      </div>
    );
  }

  if (part.state === "output-error") {
    return (
      <div
        role="alert"
        aria-live="assertive"
      >
        <ChatMessageBubble role="assistant">
          {part.errorText ??
            "Jordan's CV could not be prepared."}
        </ChatMessageBubble>
      </div>
    );
  }

  if (
    part.state === "output-available"
  ) {
    if (
      !isShowDownloadCardOutput(
        part.output
      )
    ) {
      return (
        <div
          role="alert"
          aria-live="assertive"
        >
          <ChatMessageBubble role="assistant">
            The CV data could not be validated.
          </ChatMessageBubble>
        </div>
      );
    }

    return (
      <CvDownloadCard
        data={part.output}
      />
    );
  }

  return null;
}
