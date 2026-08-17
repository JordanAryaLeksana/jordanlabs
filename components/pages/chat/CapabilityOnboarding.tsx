"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SuggestedActions } from "@/components/pages/chat/SuggestedActions";
import { HowJordanAiWorks } from "@/components/pages/chat/HowJordanAiWorks";
import { RecruiterTourAction } from "@/components/pages/chat/RecruiterTourAction";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";

const CAPABILITIES = [
  {
    id: "ask",
    label: "ASK",
    accent: "pine",
    description: "Ask naturally about Jordan's work, skills, experience, or documented portfolio evidence.",
    prompts: [
      "What does Jordan work on?",
      "What AI skills does Jordan have?",
    ],
  },
  {
    id: "explore",
    label: "EXPLORE",
    accent: "mustard",
    description: "Let Jordan AI guide you to a relevant page, project, or section of the portfolio.",
    prompts: [
      "Show me Jordan's projects",
      "Take me to Jordan's experience",
    ],
  },
  {
    id: "evaluate",
    label: "EVALUATE",
    accent: "slate",
    description: "Compare a role with verified experience, strengths, evidence, and honest limitations.",
    prompts: [
      "Evaluate Jordan for an AI Engineer role",
      "What are Jordan's limitations for this role?",
    ],
  },
  {
    id: "act",
    label: "ACT",
    accent: "coral",
    description: "Open a trusted resource or prepare the next step without leaving the conversation behind.",
    prompts: [
      "Get Jordan's CV",
      "Help me contact Jordan",
    ],
  },
] as const;

type Capability = (typeof CAPABILITIES)[number];

const ACTIVE_TAB_BACKGROUND_CLASS_NAME: Record<Capability["accent"], string> = {
  pine: "bg-pine",
  mustard: "bg-mustard",
  slate: "bg-slate",
  coral: "bg-coral",
};

const ACTIVE_TAB_TEXT_CLASS_NAME: Record<Capability["accent"], string> = {
  pine: "text-text-on-dark",
  mustard: "text-text-on-light",
  slate: "text-text-on-dark",
  coral: "text-text-on-dark",
};

export function CapabilityOnboarding() {
  const [activeId, setActiveId] = useState<Capability["id"]>("ask");
  const tabReferences = useRef<Array<HTMLButtonElement | null>>([]);
  const reducedMotion = useReducedMotion();
  const activeCapability = CAPABILITIES.find((capability) => capability.id === activeId) ?? CAPABILITIES[0];

  function selectRelativeCapability(offset: number) {
    const currentIndex = CAPABILITIES.findIndex((capability) => capability.id === activeId);
    const nextIndex = (currentIndex + offset + CAPABILITIES.length) % CAPABILITIES.length;
    setActiveId(CAPABILITIES[nextIndex].id);
    tabReferences.current[nextIndex]?.focus();
  }

  return (
    <div className="w-full max-w-3xl">
      <RecruiterTourAction />

      <div
        role="tablist"
        aria-label="Jordan AI capabilities"
        className="grid grid-cols-4 gap-1 rounded-xl border border-text-on-dark/15 bg-ink-base/35 p-1 backdrop-blur-md sm:gap-2"
      >
        {CAPABILITIES.map((capability, index) => {
          const selected = capability.id === activeId;

          return (
            <button
              key={capability.id}
              ref={(element) => {
                tabReferences.current[index] = element;
              }}
              id={`capability-tab-${capability.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`capability-panel-${capability.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(capability.id)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  selectRelativeCapability(1);
                }

                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  selectRelativeCapability(-1);
                }
              }}
              className={`relative min-h-11 overflow-hidden rounded-lg border px-2 font-mono text-[10px] font-bold tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green sm:px-4 sm:text-xs ${
                selected
                  ? `border-transparent ${ACTIVE_TAB_TEXT_CLASS_NAME[capability.accent]}`
                  : "border-transparent text-text-on-dark/58 hover:border-text-on-dark/20 hover:text-text-on-dark"
              }`}
            >
              {selected ? (
                <motion.span
                  layoutId="active-capability-tab"
                  className={`absolute inset-0 ${ACTIVE_TAB_BACKGROUND_CLASS_NAME[capability.accent]}`}
                  transition={{ duration: reducedMotion ? 0 : 0.28, ease: FUNCTIONAL_EASE }}
                />
              ) : null}
              <span className="relative z-10">{capability.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={activeCapability.id}
          id={`capability-panel-${activeCapability.id}`}
          role="tabpanel"
          aria-labelledby={`capability-tab-${activeCapability.id}`}
          className="pt-5"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
          transition={{ duration: reducedMotion ? 0 : 0.22, ease: FUNCTIONAL_EASE }}
        >
          <Typography
            as="p"
            variant="text"
            size="sm"
            className="mb-4 max-w-2xl leading-6 text-text-on-dark/72"
          >
            {activeCapability.description}
          </Typography>
          <SuggestedActions
            actions={activeCapability.prompts}
            accent={activeCapability.accent}
          />
        </motion.div>
      </AnimatePresence>
      <HowJordanAiWorks />
    </div>
  );
}
