import { ChatMessageBubble } from "../ChatMessageBubble";
import { CvDownloadCard } from "./CvDownloadCard";
import { isShowDownloadCardOutput } from "./isShowDownloadCardOutput";
import type { ShowDownloadCardPart } from "./isShowDownloadCardPart";


interface ShowDownloadCardRendererProps {
    part: ShowDownloadCardPart;
}

export function ShowDownloadCardRenderer({
    part,
}: ShowDownloadCardRendererProps) {
    if (
        part.state === "input-streaming" ||
        part.state === "output-available"
    ) {
        <div
            role="status"
            aria-live="polite"
        >
            <ChatMessageBubble role="assistant">
                Preparing Jordan&apos;s CV…
            </ChatMessageBubble>
        </div>
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