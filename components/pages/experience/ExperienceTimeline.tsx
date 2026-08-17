"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircleIcon } from "@phosphor-icons/react";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { EXPERIENCE } from "@/lib/config/experience";
import { SECTION_IDS } from "@/lib/tools/types";
import { FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";

export function ExperienceTimeline() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id={SECTION_IDS.experienceList}
      className="mx-auto min-h-screen w-full max-w-6xl scroll-mt-20 px-6 py-14 sm:py-20"
    >
      <div className="max-w-3xl">
        <Typography as="p" variant="text" size="xs" className="font-mono tracking-[0.22em] text-coral">
          THE JOURNEY / VERIFIED FROM CV
        </Typography>
        <Typography as="h1" variant="header" size="5xl" className="mt-3 leading-[0.9] sm:text-7xl">
          Growth through <span className="text-coral">ownership.</span>
        </Typography>
        <Typography variant="text" size="sm" className="mt-5 max-w-xl leading-7 text-text-on-dark/70">
          A connected path through AI engineering, delivery, frontend leadership, and responsibility.
        </Typography>
      </div>

      <div className="relative mt-16">
        <div aria-hidden="true" className="absolute bottom-0 left-[0.45rem] top-0 w-px bg-text-on-dark/20 md:hidden" />
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-y-0 left-1/2 hidden h-full w-28 -translate-x-1/2 overflow-visible md:block"
        >
          <path d="M50 0 C18 22 82 34 50 50 C18 66 82 78 50 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-on-dark/14" />
          <motion.path
            d="M50 0 C18 22 82 34 50 50 C18 66 82 78 50 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="text-mustard"
            initial={{ pathLength: reducedMotion ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: reducedMotion ? 0 : 1.15, ease: FUNCTIONAL_EASE }}
          />
        </svg>

        <div className="space-y-10 md:space-y-16">
          {EXPERIENCE.map((experience, index) => {
            const alignRight = index % 2 === 1;

            return (
              <motion.article
                key={experience.organization}
                className={`relative ml-8 md:ml-0 md:grid md:grid-cols-2 md:gap-20 ${alignRight ? "" : ""}`}
                initial={{ opacity: 0, x: reducedMotion ? 0 : alignRight ? 18 : -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: reducedMotion ? 0 : 0.52, ease: FUNCTIONAL_EASE }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.05rem] top-8 z-10 size-4 rounded-full border-4 border-ink-base bg-mustard md:left-1/2 md:-translate-x-1/2"
                />
                <div className={alignRight ? "md:col-start-2" : "md:col-start-1"}>
                  <div className="rounded-3xl border border-text-on-dark/15 bg-ink-panel/84 p-6 text-text-on-dark shadow-xl backdrop-blur-md sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <Typography as="p" variant="text" size="xs" className="font-mono tracking-[0.18em] text-coral">
                          CHAPTER 0{index + 1}
                        </Typography>
                        <Typography as="h2" variant="header" size="2xl" className="mt-2">
                          {experience.organization}
                        </Typography>
                      </div>
                      <Typography as="span" variant="text" size="xs" className="font-mono text-text-on-dark/48">
                        {experience.location}
                      </Typography>
                    </div>

                    <div className="mt-7 space-y-8">
                      {experience.roles.map((role) => (
                        <section key={role.title} className="border-t border-text-on-dark/10 pt-6">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <Typography as="h3" variant="header" size="lg">{role.title}</Typography>
                              <CheckCircleIcon size={16} className="text-frame-green" aria-label="Verified from CV" />
                            </div>
                            <Typography as="span" variant="text" size="xs" className="rounded-full bg-text-on-dark/10 px-3 py-1 font-mono">
                              {role.period}
                            </Typography>
                          </div>
                          <ul className="mt-4 space-y-3">
                            {role.contributions.map((contribution) => (
                              <li key={contribution} className="flex gap-3 font-sans text-sm leading-6 text-text-on-dark/74">
                                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-mustard" />
                                {contribution}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {role.technologies.map((technology) => (
                              <Badge key={technology} color="slate">{technology}</Badge>
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
