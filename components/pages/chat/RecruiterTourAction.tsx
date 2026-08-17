"use client";

import { PlayIcon } from "@phosphor-icons/react";
import { usePortfolioChat } from "@/components/pages/chat/usePortfolioChat";
import { isChatBusy } from "@/components/pages/chat/isChatBusy";

const RECRUITER_TOUR_PROMPT =
  "Give me a concise 30-second recruiter tour of Jordan: his strongest project, relevant experience, verified skill evidence, and the best way to contact him or view his CV. Keep the tour in this conversation and do not navigate unless I ask.";

export function RecruiterTourAction() {
  const { sendMessage, status } = usePortfolioChat();
  const disabled = isChatBusy(status);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => sendMessage({ text: RECRUITER_TOUR_PROMPT })}
      className="group mb-5 inline-flex min-h-11 items-center gap-3 rounded-full border border-text-on-dark/18 bg-ink-base/30 px-4 font-mono text-[11px] font-bold tracking-[0.06em] text-text-on-dark transition-[border-color,background-color,transform] hover:-translate-y-0.5 hover:border-mustard hover:bg-ink-panel/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <span className="grid size-6 place-items-center rounded-full bg-mustard text-text-on-light transition-transform group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        <PlayIcon size={11} weight="fill" aria-hidden="true" />
      </span>
      TAKE THE 30-SECOND TOUR
    </button>
  );
}
