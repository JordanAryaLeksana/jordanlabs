import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import { CvDownloadCard } from "@/components/pages/chat/resources/CvDownloadCard";
import type { CvDownloadDataPart } from "@/components/pages/chat/resources/isCvDownloadDataPart";
import { isShowDownloadCardOutput } from "@/components/pages/chat/resources/isShowDownloadCardOutput";

interface CvDownloadDataRendererProps {
  part: CvDownloadDataPart;
}

export function CvDownloadDataRenderer({
  part,
}: CvDownloadDataRendererProps) {
  if (
    !isShowDownloadCardOutput(
      part.data
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
      data={part.data}
    />
  );
}
