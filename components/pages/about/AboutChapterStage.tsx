"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { ABOUT_PROFILE, ABOUT_TECH_STACK } from "@/lib/config/about";
import { SECTION_IDS } from "@/lib/tools/types";
import { FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";

type StackId = (typeof ABOUT_TECH_STACK)[number]["id"];

export function AboutChapterStage() {
  const [activeStack, setActiveStack] = useState<StackId>("ai");
  const tabReferences = useRef<Array<HTMLButtonElement | null>>([]);
  const reducedMotion = useReducedMotion();
  const selectedStack = ABOUT_TECH_STACK.find((stack) => stack.id === activeStack) ?? ABOUT_TECH_STACK[0];

  function selectRelativeStack(offset: number) {
    const currentIndex = ABOUT_TECH_STACK.findIndex((stack) => stack.id === activeStack);
    const nextIndex = (currentIndex + offset + ABOUT_TECH_STACK.length) % ABOUT_TECH_STACK.length;
    setActiveStack(ABOUT_TECH_STACK[nextIndex].id);
    tabReferences.current[nextIndex]?.focus();
  }

  return (
    <section className="border-b border-current/10 bg-[var(--bg)]">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <Typography
              as="p"
              variant="text"
              size="xs"
              className="font-mono tracking-[0.22em] opacity-55"
            >
              THE THROUGH LINE
            </Typography>
            <Typography as="h2" variant="header" size="3xl" className="mt-2 max-w-xl">
              Software foundations. AI direction.
            </Typography>
          </div>
          <Typography variant="text" size="sm" className="max-w-sm leading-6 opacity-65">
            The roles, tools, and areas of focus that connect Jordan&apos;s engineering journey.
          </Typography>
        </div>

        <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-stretch">
          <article
            id={SECTION_IDS.aboutExperience}
            className="scroll-mt-24 rounded-3xl bg-ink-base p-6 text-text-on-dark shadow-xl sm:p-8"
          >
            <Typography as="p" variant="text" size="xs" className="font-mono tracking-[0.18em] text-coral">
              JOURNEY / 01
            </Typography>
            <div className="mt-8">
              <Typography as="p" variant="header" size="2xl">
                {ABOUT_PROFILE.previousExperience}
              </Typography>
              <ArrowRightIcon size={28} className="my-3 text-mustard" aria-hidden="true" />
              <Typography as="p" variant="header" size="3xl" className="text-sage">
                {ABOUT_PROFILE.title}
              </Typography>
            </div>
            <Typography variant="text" size="sm" className="mt-7 leading-7 text-text-on-dark/72">
              {ABOUT_PROFILE.experiencedAs}
            </Typography>
            <div className="mt-7 flex flex-wrap gap-2">
              {ABOUT_PROFILE.focusAreas.map((area) => (
                <Badge key={area} color="slate">
                  {area}
                </Badge>
              ))}
            </div>
          </article>

          <article
            id={SECTION_IDS.aboutSkills}
            className="scroll-mt-24 rounded-3xl border border-current/10 bg-[var(--bg-raised)] p-6 shadow-sm sm:p-8"
          >
            <Typography as="p" variant="text" size="xs" className="font-mono tracking-[0.18em] opacity-55">
              TOOLKIT / 02
            </Typography>
            <Typography as="h3" variant="header" size="2xl" className="mt-2">
              Tools I build with
            </Typography>

            <div
              role="tablist"
              aria-label="Technology categories"
              className="mt-7 flex flex-wrap gap-2"
            >
              {ABOUT_TECH_STACK.map((stack, index) => {
                const selected = stack.id === activeStack;

                return (
                  <button
                    key={stack.id}
                    ref={(element) => {
                      tabReferences.current[index] = element;
                    }}
                    id={`about-stack-tab-${stack.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`about-stack-panel-${stack.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveStack(stack.id)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowRight") {
                        event.preventDefault();
                        selectRelativeStack(1);
                      }

                      if (event.key === "ArrowLeft") {
                        event.preventDefault();
                        selectRelativeStack(-1);
                      }
                    }}
                    className={`min-h-10 rounded-full border px-4 font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green ${
                      selected
                        ? "border-pine bg-pine text-text-on-dark"
                        : "border-current/18 opacity-60 hover:border-coral hover:opacity-100"
                    }`}
                  >
                    {stack.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={selectedStack.id}
                id={`about-stack-panel-${selectedStack.id}`}
                role="tabpanel"
                aria-labelledby={`about-stack-tab-${selectedStack.id}`}
                className="mt-7 flex min-h-28 content-start flex-wrap gap-2"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : -5 }}
                transition={{ duration: reducedMotion ? 0 : 0.24, ease: FUNCTIONAL_EASE }}
              >
                {selectedStack.items.map((item) => (
                  <Badge key={item} color={selectedStack.id === "ai" ? "coral" : "pine"}>
                    {item}
                  </Badge>
                ))}
              </motion.div>
            </AnimatePresence>
          </article>
        </div>
      </div>
    </section>
  );
}
