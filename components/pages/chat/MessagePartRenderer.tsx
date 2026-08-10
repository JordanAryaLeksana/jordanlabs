import type { UIMessage } from "ai";

import { ChatMessageBubble } from "@/components/pages/chat/ChatMessageBubble";
import { getMessageText } from "@/components/pages/chat/getMessageText";
import { isNavigationToolPart } from "@/components/pages/chat/navigation/isNavigationToolPart";
import { NavigationToolStatus } from "@/components/pages/chat/navigation/NavigationToolStatus";
import { isShowDownloadCardPart } from "@/components/pages/chat/resources/isShowDownloadCardPart";
import { ShowDownloadCardRenderer } from "@/components/pages/chat/resources/ShowDownloadCardRenderer";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { cn } from "@/lib/cn";
import { CvDownloadDataRenderer } from "@/components/pages/chat/resources/CvDownloadDataRenderer";
import { isCvDownloadDataPart } from "@/components/pages/chat/resources/isCvDownloadDataPart";
import { ExternalResourceDataRenderer } from "@/components/pages/chat/resources/ExternalResourceDataRenderer";
import { ExternalResourceToolRenderer } from "@/components/pages/chat/resources/ExternalResourceToolRenderer";
import { isExternalResourceDataPart } from "@/components/pages/chat/resources/isExternalResourceDataPart";
import { isExternalResourceToolPart } from "@/components/pages/chat/resources/isExternalResourceToolPart";
import { isContactCardPart } from "@/components/pages/chat/resources/isContactCardPart";
import { isContactCardToolPart } from "@/components/pages/chat/resources/isContactCardToolPart";
import { ContactCardResult } from "@/components/pages/chat/resources/ContactCardResult";
import { ContactCardToolRenderer } from "@/components/pages/chat/resources/ContactCardToolRenderer";
import { isProjectFilterDataPart } from "@/components/pages/chat/content/projects/isProjectFilterDataPart";
import { isProjectFilterErrorPart } from "@/components/pages/chat/content/projects/isProjectFilterErrorPart";
import { isProjectFilterToolPart } from "@/components/pages/chat/content/projects/isProjectFilterToolPart";
import { ProjectFilterDataRenderer } from "@/components/pages/chat/content/projects/ProjectFilterDataRenderer";
import { ProjectFilterErrorRenderer } from "@/components/pages/chat/content/projects/ProjectFilterErrorRenderer";
import { ProjectFilterToolRenderer } from "@/components/pages/chat/content/projects/ProjectFilterToolRenderer";
import { isSkillFilterDataPart } from "@/components/pages/chat/content/skills/isSkillFilterDataPart";
import { isSkillFilterErrorPart } from "@/components/pages/chat/content/skills/isSkillFilterErrorPart";
import { isSkillFilterToolPart } from "@/components/pages/chat/content/skills/isSkillFilterToolPart";
import { SkillFilterDataRenderer } from "@/components/pages/chat/content/skills/SkillFilterDataRenderer";
import { SkillFilterErrorRenderer } from "@/components/pages/chat/content/skills/SkillFilterErrorRenderer";
import { SkillFilterToolRenderer } from "@/components/pages/chat/content/skills/SkillFilterToolRenderer";
//local type guard
type MessagePart =
  UIMessage["parts"][number];

type NavigationActionDataPart =
  MessagePart & {
    type: "data-navigationAction";
    id?: string;

    data: {
      kind: "route" | "project";
      message: string;
      route?: string;
      projectId?: string;
    };
  };

function isNavigationActionDataPart(
  part: MessagePart
): part is NavigationActionDataPart {
  return (
    part.type ===
    "data-navigationAction" &&
    typeof part.data === "object" &&
    part.data !== null &&
    "message" in part.data &&
    typeof part.data.message === "string"
  );
}

//message part renderer component
interface MessagePartRendererProps {
  message: UIMessage;
}

export function MessagePartRenderer({
  message,
}: MessagePartRendererProps) {
  if (
    message.role !== "assistant" &&
    message.role !== "user"
  ) {
    return null;
  }

  const messageText =
    getMessageText(message).trim();

  const navigationToolParts =
    message.parts.filter(
      isNavigationToolPart
    );

  const downloadCardParts =
    message.parts.filter(
      isShowDownloadCardPart
    );
  const cvDownloadDataParts =
    message.parts.filter(
      isCvDownloadDataPart
    );
  const externalResourceDataParts =
    message.parts.filter(
      isExternalResourceDataPart
    );

  const externalResourceToolParts =
    message.parts.filter(
      isExternalResourceToolPart
    );
  const contactCardParts = message.parts.filter(isContactCardPart);
  const contactCardToolParts = message.parts.filter(isContactCardToolPart);
  const projectFilterDataParts =
    message.parts.filter(
      isProjectFilterDataPart
    );

  const projectFilterErrorParts =
    message.parts.filter(
      isProjectFilterErrorPart
    );

  const projectFilterToolParts =
    message.parts.filter(
      isProjectFilterToolPart
    );
  const navigationActionParts =
    message.parts.filter(
      isNavigationActionDataPart
    );
  const skillFilterDataParts =
    message.parts.filter(
      isSkillFilterDataPart
    );
  const skillFilterErrorParts =
    message.parts.filter(
      isSkillFilterErrorPart
    );
  const skillFilterToolParts =
    message.parts.filter(
      isSkillFilterToolPart
    );



  const hasText =
    messageText !== "";

  const hasNavigationTool =
    navigationToolParts.length > 0;

  const hasNavigationAction =
    navigationActionParts.length > 0;

  const hasDownloadCard =
    downloadCardParts.length > 0;

  const hasCvDownloadData =
    cvDownloadDataParts.length > 0;

  const hasExternalResource =
    externalResourceDataParts.length > 0 ||
    externalResourceToolParts.length > 0;
  const hasContactCard = contactCardParts.length > 0 || contactCardToolParts.length > 0;
  const hasProjectFilter =
    projectFilterDataParts.length > 0 ||
    projectFilterErrorParts.length > 0 ||
    projectFilterToolParts.length > 0;

  const hasSkillFilter =
    skillFilterDataParts.length > 0 ||
    skillFilterErrorParts.length > 0 ||
    skillFilterToolParts.length > 0;
  if (
    !hasText &&
    !hasNavigationTool &&
    !hasDownloadCard &&
    !hasCvDownloadData &&
    !hasExternalResource &&
    !hasContactCard &&
    !hasProjectFilter &&
    !hasNavigationAction &&
    !hasSkillFilter
  ) {
    return null;
  }
  /*
   * Untuk CV tool, structured server result
   * menjadi source of truth UI.
   * Jangan tampilkan prose tambahan model
   * bersamaan dengan card.
   */
  const shouldRenderText =
    hasText &&
    !(
      message.role === "assistant" &&
      (
        hasDownloadCard ||
        hasCvDownloadData ||
        hasExternalResource ||
        hasContactCard ||
        hasProjectFilter ||
        hasNavigationAction ||
        hasSkillFilter
      )
    );

  return (
    <article
      className={cn(
        "flex w-full flex-col gap-3",

        message.role === "user"
          ? "items-end"
          : "items-start"
      )}
    >
      {message.role === "assistant" ? (
        <Typography
          as="p"
          variant="text"
          size="xs"
          weight="bold"
          className="uppercase tracking-[0.14em] opacity-50"
        >
          Jordan AI
        </Typography>
      ) : null}

      {shouldRenderText ? (
        <ChatMessageBubble
          role={message.role}
        >
          {messageText}
        </ChatMessageBubble>
      ) : null}

      {message.role === "assistant"
        ? navigationActionParts.map(
          (part, index) => (
            <ChatMessageBubble
              key={
                part.id ??
                `navigation-action-${index}`
              }
              role="assistant"
            >
              {part.data.message}
            </ChatMessageBubble>
          )
        )
        : null}

      {message.role === "assistant"
        ? navigationToolParts.map(
          (part) => (
            <NavigationToolStatus
              key={part.toolCallId}
              part={part}
            />
          )
        )
        : null}

      {message.role === "assistant"
        ? downloadCardParts.map(
          (part) => (
            <ShowDownloadCardRenderer
              key={part.toolCallId}
              part={part}
            />
          )
        )
        : null}

      {message.role === "assistant"
        ? cvDownloadDataParts.map(
          (part, index) => (
            <CvDownloadDataRenderer
              key={
                part.id ??
                `cv-download-${index}`
              }
              part={part}
            />
          )
        )
        : null}
      {message.role === "assistant"
        ? externalResourceToolParts.map(
          (part) => (
            <ExternalResourceToolRenderer
              key={part.toolCallId}
              part={part}
            />
          )
        )
        : null}

      {message.role === "assistant"
        ? externalResourceDataParts.map(
          (part, index) => (
            <ExternalResourceDataRenderer
              key={
                part.id ??
                `external-resource-${index}`
              }
              part={part}
            />
          )
        )
        : null}
      {message.role === "assistant" ? contactCardToolParts.map((part) => <ContactCardToolRenderer key={part.toolCallId} part={part} />) : null}
      {message.role === "assistant" ? contactCardParts.map((part, index) => <ContactCardResult key={part.id ?? `contact-${index}`} value={part.data} />) : null}
      {message.role === "assistant"
        ? projectFilterToolParts.map(
          (part) => (
            <ProjectFilterToolRenderer
              key={part.toolCallId}
              part={part}
            />
          )
        )
        : null}

      {message.role === "assistant"
        ? projectFilterDataParts.map(
          (part, index) => (
            <ProjectFilterDataRenderer
              key={
                part.id ??
                `project-filter-${index}`
              }
              part={part}
            />
          )
        )
        : null}

      {message.role === "assistant"
        ? projectFilterErrorParts.map(
          (part, index) => (
            <ProjectFilterErrorRenderer
              key={
                part.id ??
                `project-filter-error-${index}`
              }
              part={part}
            />
          )
        )
        : null}
      {message.role === "assistant"
        ? skillFilterToolParts.map(
          (part) => (
            <SkillFilterToolRenderer
              key={part.toolCallId}
              part={part}
            />
          )
        )
        : null}

      {message.role === "assistant"
        ? skillFilterDataParts.map(
          (part, index) => (
            <SkillFilterDataRenderer
              key={
                part.id ??
                `skill-filter-${index}`
              }
              part={part}
            />
          )
        )
        : null}

      {message.role === "assistant"
        ? skillFilterErrorParts.map(
          (part, index) => (
            <SkillFilterErrorRenderer
              key={
                part.id ??
                `skill-filter-error-${index}`
              }
              part={part}
            />
          )
        )
        : null}
    </article>
  );
}
