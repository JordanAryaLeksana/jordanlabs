"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon, CaretDownIcon } from "@phosphor-icons/react";
import { isChatBusy } from "@/components/pages/chat/isChatBusy";
import { usePortfolioChat } from "@/components/pages/chat/usePortfolioChat";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";

const TUTORIAL_STEPS = [
  {
    number: "01",
    title: "ASK NATURALLY",
    description: "Ask a normal question, such as what Jordan has built with computer vision.",
    color: "border-coral",
  },
  {
    number: "02",
    title: "VERIFIED CONTEXT",
    description: "Answers are grounded in documented portfolio knowledge and evidence.",
    color: "border-pine",
  },
  {
    number: "03",
    title: "SUPPORTED ACTIONS",
    description: "Jordan AI can navigate, show projects, evaluate role fit, and open resources.",
    color: "border-slate",
  },
  {
    number: "04",
    title: "YOU STAY IN CONTROL",
    description: "Manual browsing remains available, and actions stay visible in the conversation.",
    color: "border-mustard",
  },
  {
    number: "05",
    title: "ROUTE BY CHAT",
    description: "Ask Jordan AI to take you directly to a relevant page or portfolio section.",
    color: "border-coral",
    demo: "Take me to Jordan's projects",
  },
] as const;

export function HowJordanAiWorks() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const { sendMessage, status } = usePortfolioChat();
  const demoDisabled = isChatBusy(status);

  return (
    <div className="mt-5 border-t border-text-on-dark/12 pt-4">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="jordan-ai-tutorial"
        onClick={() => setOpen((current) => !current)}
        className="group inline-flex min-h-11 items-center gap-2 font-mono text-[11px] font-bold tracking-[0.08em] text-text-on-dark/65 transition-colors hover:text-text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green"
      >
        HOW JORDAN AI WORKS
        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.24, ease: FUNCTIONAL_EASE }}
        >
          <CaretDownIcon size={15} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="jordan-ai-tutorial"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.36, ease: FUNCTIONAL_EASE }}
            className="overflow-hidden"
          >
            <ol className="grid gap-x-5 gap-y-5 pb-2 pt-4 sm:grid-cols-2 lg:grid-cols-5">
              {TUTORIAL_STEPS.map((step) => (
                <li key={step.number} className={`border-l-2 pl-3 ${step.color}`}>
                  <Typography
                    as="p"
                    variant="text"
                    size="xs"
                    className="font-mono tracking-[0.12em] text-text-on-dark/45"
                  >
                    {step.number}
                  </Typography>
                  <Typography
                    as="h3"
                    variant="text"
                    size="xs"
                    weight="bold"
                    className="mt-1 text-text-on-dark"
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    as="p"
                    variant="text"
                    size="xs"
                    className="mt-2 leading-5 text-text-on-dark/62"
                  >
                    {step.description}
                  </Typography>
                  {"demo" in step ? (
                    <button
                      type="button"
                      disabled={demoDisabled}
                      onClick={() => sendMessage({ text: step.demo })}
                      className="mt-3 inline-flex min-h-11 items-center gap-2 font-mono text-[10px] font-bold tracking-[0.08em] text-coral transition-colors hover:text-text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      TRY DEMO
                      <ArrowRightIcon size={13} aria-hidden="true" />
                    </button>
                  ) : null}
                </li>
              ))}
            </ol>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
