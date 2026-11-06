"use client";

import { PlayCircleIcon } from "@phosphor-icons/react";
import { CapabilityOnboarding } from "@/components/pages/chat/CapabilityOnboarding";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { INTRO_REPLAY_EVENT } from "@/lib/intro/introSession";
import { PROFILE } from "@/lib/config/profile";

interface AgentHomeStateProps {
  compact?: boolean;
}

export function AgentHomeState({
  compact = false,
}: AgentHomeStateProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-8 sm:py-12">
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Typography as="p" variant="text" size="xs" className="font-mono tracking-[0.22em] text-coral">YOUR GUIDE TO JORDAN</Typography>
        {!compact ? (
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(INTRO_REPLAY_EVENT))}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-current/20 px-3 font-mono text-[10px] tracking-[0.14em] opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green"
          >
            <PlayCircleIcon size={14} aria-hidden="true" />
            REPLAY INTRO
          </button>
        ) : null}
      </div>
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
        Ask me about {PROFILE.fullName.split(" ")[0]}: {PROFILE.headline.toLowerCase()}, what he is building now and the roles he is looking for. I can answer, navigate, evaluate role fit, and help with supported actions.
      </Typography>

      {!compact ? <CapabilityOnboarding /> : null}
    </div>
  );
}
