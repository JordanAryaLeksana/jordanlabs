import { SuggestedActions } from "@/components/pages/chat/SuggestedActions";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";

interface AgentHomeStateProps {
  compact?: boolean;
}

export function AgentHomeState({
  compact = false,
}: AgentHomeStateProps) {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Typography
        as="h1"
        variant="header"
        size={compact ? "2xl" : "3xl"}
        className="mb-3"
      >
        Jordan AI
      </Typography>

      <Typography
        variant="text"
        size="sm"
        className="mb-6 max-w-lg leading-7 opacity-75"
      >
        Explore Jordan&apos;s work, inspect the evidence behind his skills,
        get his CV, or prepare a message to contact him.
      </Typography>

      {!compact ? <SuggestedActions /> : null}
    </div>
  );
}