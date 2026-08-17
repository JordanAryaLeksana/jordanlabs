import { CapabilityOnboarding } from "@/components/pages/chat/CapabilityOnboarding";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";

interface AgentHomeStateProps {
  compact?: boolean;
}

export function AgentHomeState({
  compact = false,
}: AgentHomeStateProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-8 sm:py-12">
      <Typography as="p" variant="text" size="xs" className="mb-4 font-mono tracking-[0.22em] text-coral">YOUR GUIDE TO JORDAN</Typography>
      <Typography
        as="h1"
        variant="header"
        size={compact ? "2xl" : "3xl"}
        className="mb-4 max-w-2xl text-4xl leading-[0.95] sm:text-6xl"
      >
        Jordan AI
      </Typography>

      <Typography
        variant="text"
        size="sm"
        className="mb-8 max-w-xl text-base leading-7 opacity-80"
      >
        Ask me about Jordan, or let me show you around. I can answer, navigate, evaluate role fit, and help with supported actions.
      </Typography>

      {!compact ? <CapabilityOnboarding /> : null}
    </div>
  );
}
