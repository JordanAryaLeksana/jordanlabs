import "server-only"

const RECUITER_AUDIENCE_PATTERN =
    /\b(?:recruiter|rekruter|hiring manager)\b/i;

const RECRUITER_BRIEF_PATTERN =
    /\b(?:30[-\s]?second|tour|tur|brief|summary|ringkasan|overview)\b/i;


export function isRecuiterBriefRequest(
    userText: string
): boolean {
    return (
        RECUITER_AUDIENCE_PATTERN.test(
            userText
        ) && 
        RECRUITER_BRIEF_PATTERN.test(
            userText
        )
    )
}