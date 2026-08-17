"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Badge } from "@/components/interfaces/ui/Badge";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";
import type { Project } from "@/lib/config/projects";
import { PROJECT_SECTION_IDS } from "@/lib/tools/types";

interface FeaturedProjectsProps {
  projects: readonly Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featuredProjects = projects.filter((project) => project.featured);
  const [activeId, setActiveId] = useState(featuredProjects[0]?.id);
  const reducedMotion = useReducedMotion();
  const activeProject = featuredProjects.find((project) => project.id === activeId) ?? featuredProjects[0];

  if (!activeProject) return null;

  const transition = { duration: reducedMotion ? 0 : 0.38, ease: FUNCTIONAL_EASE };

  return (
    <section
      id={PROJECT_SECTION_IDS.featured}
      className="mx-auto min-h-[calc(100svh-4.75rem)] w-full max-w-6xl scroll-mt-20 px-6 py-10 md:py-14"
    >
      <div className="flex flex-wrap items-end justify-between gap-5 border-t-4 border-coral pt-5">
        <div>
          <Typography as="p" variant="text" size="xs" className="font-mono tracking-[0.2em] text-text-on-dark/55">
            DEMO DAY / SELECTED WORK
          </Typography>
          <Typography as="h1" variant="header" size="5xl" className="mt-3 leading-[0.92] sm:text-7xl">
            Built to be <span className="text-coral">explained.</span>
          </Typography>
        </div>
        <Typography variant="text" size="sm" className="max-w-sm leading-6 text-text-on-dark/65">
          One project at a time—problem, approach, contribution, and the evidence still being developed.
        </Typography>
      </div>

      <AnimatePresence initial={false} mode="wait">
        <motion.article
          key={activeProject.id}
          className="mt-10 grid overflow-hidden rounded-3xl border border-text-on-dark/15 bg-ink-panel/86 text-text-on-dark shadow-2xl backdrop-blur-md lg:grid-cols-[1.08fr_0.92fr]"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
          transition={transition}
        >
          <div className="relative min-h-64 overflow-hidden bg-slate sm:min-h-80 lg:min-h-[26rem]">
            <Image
              src={activeProject.thumbnail}
              alt={`${activeProject.title} project visual`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-base/65 via-transparent to-transparent" />
            <Badge color="mustard" className="absolute left-5 top-5">
              {activeProject.category}
            </Badge>
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <Typography as="p" variant="text" size="xs" className="font-mono tracking-[0.18em] text-sage">
              {activeProject.status} · {activeProject.role}
            </Typography>
            <Typography as="h2" variant="header" size="5xl" className="mt-4 leading-none">
              {activeProject.title}
            </Typography>
            <Typography variant="text" size="sm" className="mt-5 max-w-xl leading-7 text-text-on-dark/72">
              {activeProject.shortDescription}
            </Typography>
            <div className="mt-6 flex flex-wrap gap-2">
              {activeProject.tags.map((tag) => (
                <Badge key={tag} color="pine">{tag}</Badge>
              ))}
            </div>
            <Link
              href={`/projects/${activeProject.slug}`}
              className="group mt-auto flex min-h-12 items-center justify-between border-t border-text-on-dark/12 pt-6 font-mono text-xs font-bold focus-visible:outline-2 focus-visible:outline-frame-green"
            >
              OPEN TECHNICAL CASE STUDY
              <ArrowUpRightIcon className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" size={19} />
            </Link>
          </div>
        </motion.article>
      </AnimatePresence>

      <div id={PROJECT_SECTION_IDS.all} className="scroll-mt-24 pt-5" role="tablist" aria-label="Select a featured project">
        {featuredProjects.map((project, index) => {
          const selected = project.id === activeProject.id;
          return (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(project.id)}
              className={`grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-text-on-dark/12 py-4 text-left text-text-on-dark transition-colors hover:text-coral focus-visible:outline-2 focus-visible:outline-frame-green ${selected ? "text-coral" : "text-text-on-dark/62"}`}
            >
              <span className="font-mono text-[10px]">0{index + 1}</span>
              <span className="font-display text-lg font-bold">{project.title}</span>
              <span className="hidden font-mono text-[10px] tracking-[0.12em] sm:block">{project.category.toUpperCase()}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
