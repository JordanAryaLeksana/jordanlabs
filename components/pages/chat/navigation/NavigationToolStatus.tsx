import { ArrowRightIcon, CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";
import type { NavigationToolPart } from "@/components/pages/chat/navigation/isNavigationToolPart";

interface NavigationToolStatusProps {
  part: NavigationToolPart;
}

export function NavigationToolStatus({
  part,
}: NavigationToolStatusProps) {
  const output =
    typeof part.output === "object" &&
      part.output !== null
      ? (
        part.output as {
          status?: unknown;
          message?: unknown;
        }
      )
      : null;

  const outputMessage =
    typeof output?.message === "string"
      ? output.message
      : null;

  let statusText: string | null = null;

  if (
    part.state === "input-streaming" ||
    part.state === "input-available"
  ) {
    if (
      part.type === "tool-navigateToPage"
    ) {
      statusText =
        "Opening the requested portfolio page…";
    } else if (
      part.type === "tool-scrollToSection"
    ) {
      statusText =
        "Moving to the requested portfolio section…";
    } else if (
      part.type === "tool-highlightSection"
    ) {
      statusText =
        "Moving to and highlighting the requested portfolio section…";
    } else {
      statusText =
        "Opening the requested project detail…";
    }
  }
  if (part.state === "output-available") {
    if (output?.status === "error") {
      statusText =
        outputMessage ??
        "The requested navigation could not be completed.";
    } else {
      statusText =
        outputMessage ??
        "Navigation completed successfully.";
    }
  }

  if (part.state === "output-error") {
    statusText =
      part.errorText ??
      "The navigation action failed.";
  }

  if (!statusText) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex max-w-full items-center gap-2 rounded-full border border-current/10 bg-[var(--surface)] px-3 py-2 font-mono text-[11px] shadow-sm backdrop-blur-md"
    >
      {part.state === "output-error" || output?.status === "error" ? <WarningCircleIcon size={15} className="shrink-0 text-coral" /> : part.state === "output-available" ? <CheckCircleIcon size={15} className="shrink-0 text-frame-green" /> : <ArrowRightIcon size={15} className="shrink-0 animate-pulse text-coral motion-reduce:animate-none" />}
      <span className="truncate opacity-70">{statusText}</span>
    </div>
  );
}
