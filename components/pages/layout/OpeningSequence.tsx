"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CursorClickIcon,
  FileArrowDownIcon,
  PauseIcon,
  PlayIcon,
  XIcon,
} from "@phosphor-icons/react";
import {
  ALSO_BUILDING,
  IMPACT_DEPLOYMENTS,
  INTRO_CHAPTERS,
  ROLE_CARDS,
  STACK_LAYERS,
  type IntroChapter,
  type IntroLink,
} from "@/lib/config/intro";
import { CV_URL, UPWORK_URL } from "@/lib/config/links";
import {
  INTRO_CHAPTER_COUNT,
  goToChapter,
  introStore,
  markInteracted,
  nextChapter,
  previousChapter,
  setAutoplay,
  useIntroState,
} from "@/lib/intro/introStore";
import { FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";
import { RecruiterBar } from "@/components/pages/layout/RecruiterBar";
import { cn } from "@/lib/cn";

type RoleCard = (typeof ROLE_CARDS)[number];

interface OpeningSequenceProps {
  reducedMotion: boolean;
  /** Whether the interactive 3D scene is running (vs. the static poster). */
  interactive3d: boolean;
  onExit: () => void;
  onRoleSelect: (role: RoleCard) => void;
  /** Called when the visitor follows a link out of the intro. */
  onLeave: () => void;
}

/* ---------------- motion ---------------- */

function useVariants(reducedMotion: boolean) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reducedMotion ? 0 : 0.07, delayChildren: reducedMotion ? 0 : 0.18 } },
    exit: { opacity: 0, y: reducedMotion ? 0 : -14, transition: { duration: reducedMotion ? 0 : 0.28, ease: FUNCTIONAL_EASE } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 18, filter: reducedMotion ? "none" : "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: reducedMotion ? 0 : 0.6, ease: FUNCTIONAL_EASE } },
  };
  const word: Variants = {
    hidden: { y: reducedMotion ? "0%" : "105%" },
    show: { y: "0%", transition: { duration: reducedMotion ? 0 : 0.7, ease: FUNCTIONAL_EASE } },
  };
  return { container, item, word };
}

function RevealHeading({ id, text, className, wordVariants }: { id: string; text: string; className?: string; wordVariants: Variants }) {
  const words = text.split(" ");
  return (
    <motion.h2 id={id} className={className} variants={{ show: { transition: { staggerChildren: 0.06 } } }} aria-label={text}>
      {words.map((value, index) => (
        <span key={`${value}-${index}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span className="inline-block" variants={wordVariants}>
            {value}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

/* ---------------- small building blocks ---------------- */

function Eyebrow({ index, children }: { index: number; children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-coral">
      <span className="text-text-on-dark/55">{String(index + 1).padStart(2, "0")}</span>
      <span aria-hidden="true" className="h-px w-8 bg-coral/70" />
      {children}
    </p>
  );
}

function ChapterLinks({ links, onLeave }: { links: readonly IntroLink[]; onLeave: () => void }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {links.filter((link) => link.href).map((link, index) =>
        link.external ? (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 font-mono text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green",
              index === 0 ? "border-coral bg-coral text-text-on-dark hover:bg-brick" : "border-text-on-dark/25 hover:border-coral hover:text-coral"
            )}
          >
            {link.label}
            <ArrowUpRightIcon size={15} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLeave}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-text-on-dark/25 px-4 font-mono text-xs font-bold transition-colors hover:border-coral hover:text-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green"
          >
            {link.label}
            <ArrowRightIcon size={15} aria-hidden="true" />
          </Link>
        )
      )}
    </div>
  );
}

function FactList({ facts, accent = "bg-coral" }: { facts: readonly string[]; accent?: string }) {
  if (!facts.length) return null;
  return (
    <ul className="mt-5 grid gap-2.5">
      {facts.map((fact) => (
        <li key={fact} className="flex gap-3 text-sm leading-6 text-text-on-dark/80">
          <span aria-hidden="true" className={cn("mt-2.5 size-1.5 shrink-0 rounded-full", accent)} />
          {fact}
        </li>
      ))}
    </ul>
  );
}

/* ---------------- chapter bodies ---------------- */

function HelloBody({ chapter, item }: { chapter: IntroChapter; item: Variants }) {
  return (
    <>
      <motion.p variants={item} className="mt-3 font-display text-xl font-bold text-coral sm:text-2xl">{chapter.lead}</motion.p>
      <motion.p variants={item} className="mt-4 max-w-lg text-sm leading-7 text-text-on-dark/80 sm:text-base">{chapter.body}</motion.p>
      <motion.ul variants={item} className="mt-6 flex flex-wrap gap-2">
        {chapter.facts.map((fact) => (
          <li key={fact} className="rounded-full border border-text-on-dark/18 bg-ink-base/45 px-3 py-1.5 font-mono text-[11px] text-text-on-dark/85 backdrop-blur-md">{fact}</li>
        ))}
      </motion.ul>
    </>
  );
}

function BuildBody({ chapter, item, onLeave }: { chapter: IntroChapter; item: Variants; onLeave: () => void }) {
  const activeLayer = useIntroState((state) => state.activeLayer);
  const active = STACK_LAYERS.find((layer) => layer.id === activeLayer) ?? null;

  return (
    <>
      <motion.p variants={item} className="mt-4 max-w-lg text-sm leading-7 text-text-on-dark/80 sm:text-base">{chapter.body}</motion.p>
      <motion.ul variants={item} className="mt-5 grid gap-1.5" aria-label="Layers of the stack">
        {STACK_LAYERS.map((layer) => {
          const selected = layer.id === activeLayer;
          return (
            <li key={layer.id}>
              <button
                type="button"
                aria-pressed={selected}
                onMouseEnter={() => introStore.setState({ activeLayer: layer.id })}
                onMouseLeave={() => introStore.setState({ activeLayer: null })}
                onFocus={() => introStore.setState({ activeLayer: layer.id })}
                onBlur={() => introStore.setState({ activeLayer: null })}
                onClick={() => {
                  markInteracted();
                  introStore.setState({ activeLayer: selected ? null : layer.id });
                }}
                className={cn(
                  "grid min-h-11 w-full grid-cols-[0.6rem_8.5rem_1fr] items-center gap-3 rounded-xl border px-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-frame-green",
                  selected ? "border-text-on-dark/30 bg-ink-panel/85" : "border-transparent hover:bg-ink-panel/50"
                )}
              >
                <span aria-hidden="true" className="size-2.5 rounded-sm" style={{ backgroundColor: layer.color }} />
                <span className="font-display text-sm font-bold">{layer.label}</span>
                <span className="truncate font-mono text-[11px] text-text-on-dark/60">{layer.items.join(" · ")}</span>
              </button>
            </li>
          );
        })}
      </motion.ul>
      <motion.div variants={item} className="mt-3 min-h-14" aria-live="polite">
        {active && active.projects.length > 0 ? (
          <p className="flex flex-wrap items-center gap-2 text-xs text-text-on-dark/70">
            <span className="font-mono tracking-[0.12em] text-text-on-dark/50">USED IN</span>
            {active.projects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} onClick={onLeave} className="inline-flex items-center gap-1.5 rounded-full border border-text-on-dark/18 px-2.5 py-1 hover:border-coral hover:text-coral">
                {project.title}
                {project.live ? <span className="rounded-full bg-green/25 px-1.5 font-mono text-[9px] text-green">LIVE</span> : null}
              </Link>
            ))}
          </p>
        ) : (
          <p className="font-mono text-[11px] text-text-on-dark/45">Hover a layer to see where I shipped it.</p>
        )}
      </motion.div>
    </>
  );
}

function StoryReadout() {
  const progress = useIntroState((state) => Math.round(state.storyProgress * 40) / 40);
  const rawSeconds = 4 * 3600 + 9 * 60;
  const cutSeconds = 56;
  const seconds = Math.round(rawSeconds + (cutSeconds - rawSeconds) * progress);
  const label = `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="mt-5 max-w-sm rounded-xl border border-text-on-dark/12 bg-ink-base/55 p-3 backdrop-blur-md">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.14em] text-text-on-dark/55">
        <span>{progress < 1 ? "RAW FOOTAGE" : "HIGHLIGHT REEL"}</span>
        <span className={progress < 1 ? "text-text-on-dark" : "text-coral"} aria-live="off">{label}</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-text-on-dark/12">
        <div className="h-full rounded-full bg-gradient-to-r from-coral to-mustard" style={{ width: `${Math.max(4, progress * 100)}%` }} />
      </div>
      <p className="mt-2 font-mono text-[10px] text-text-on-dark/45">Real test: a 4-hour, 6.4 GB recording → ~56 s highlight reel</p>
    </div>
  );
}

function NowBody({ chapter, item, onLeave }: { chapter: IntroChapter; item: Variants; onLeave: () => void }) {
  return (
    <>
      <motion.p variants={item} className="mt-3 font-mono text-[11px] tracking-[0.12em] text-mustard sm:text-xs">{chapter.lead}</motion.p>
      <motion.p variants={item} className="mt-4 max-w-lg text-sm leading-7 text-text-on-dark/80 sm:text-base">{chapter.body}</motion.p>
      <motion.div variants={item}><StoryReadout /></motion.div>
      <motion.div variants={item}><FactList facts={chapter.facts.slice(0, 1).concat(chapter.facts.slice(2))} /></motion.div>
      <motion.div variants={item}>{chapter.links ? <ChapterLinks links={chapter.links} onLeave={onLeave} /> : null}</motion.div>
      <motion.p variants={item} className="mt-5 text-xs leading-5 text-text-on-dark/60">
        <span className="font-mono tracking-[0.12em] text-sage">ALSO BUILDING · </span>
        <Link href={ALSO_BUILDING.href} onClick={onLeave} className="underline decoration-text-on-dark/30 underline-offset-4 hover:text-coral">{ALSO_BUILDING.title}</Link>
        {` — ${ALSO_BUILDING.summary} (${ALSO_BUILDING.status.toLowerCase()}).`}
      </motion.p>
    </>
  );
}

function ImpactBody({ chapter, item, onLeave }: { chapter: IntroChapter; item: Variants; onLeave: () => void }) {
  const mode = useIntroState((state) => state.impactMode);
  const deployment = IMPACT_DEPLOYMENTS.find((candidate) => candidate.id === mode) ?? IMPACT_DEPLOYMENTS[0];

  return (
    <>
      <motion.p variants={item} className="mt-4 max-w-lg text-sm leading-7 text-text-on-dark/80 sm:text-base">{chapter.body}</motion.p>
      <motion.div variants={item} role="tablist" aria-label="Deployments" className="mt-5 inline-flex rounded-full border border-text-on-dark/18 bg-ink-base/50 p-1 backdrop-blur-md">
        {IMPACT_DEPLOYMENTS.map((candidate) => {
          const selected = candidate.id === deployment.id;
          return (
            <button
              key={candidate.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="intro-impact-panel"
              onClick={() => {
                markInteracted();
                introStore.setState({ impactMode: candidate.id });
              }}
              className={cn(
                "min-h-10 rounded-full px-4 font-mono text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-frame-green",
                selected ? "bg-coral text-text-on-dark" : "text-text-on-dark/65 hover:text-text-on-dark"
              )}
            >
              {candidate.tab}
            </button>
          );
        })}
      </motion.div>
      <motion.div variants={item} id="intro-impact-panel" role="tabpanel" aria-live="polite" className="mt-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={deployment.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25, ease: FUNCTIONAL_EASE }}>
            <p className="font-display text-lg font-bold">{deployment.role}</p>
            <p className="mt-1 font-mono text-[11px] text-text-on-dark/55">{deployment.place} · {deployment.period}</p>
            <FactList facts={deployment.facts} accent={deployment.id === "pertamina" ? "bg-coral" : "bg-sage"} />
            <Link href={deployment.href} onClick={onLeave} className="mt-4 inline-flex min-h-11 items-center gap-2 font-mono text-xs font-bold underline decoration-text-on-dark/30 underline-offset-4 hover:text-coral">
              Read the case study <ArrowRightIcon size={14} aria-hidden="true" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </>
  );
}

function ResearchBody({ chapter, item, onLeave }: { chapter: IntroChapter; item: Variants; onLeave: () => void }) {
  const beacon = useIntroState((state) => state.activeBeacon);
  return (
    <>
      <motion.p variants={item} className="mt-4 max-w-lg text-sm leading-7 text-text-on-dark/80 sm:text-base">{chapter.body}</motion.p>
      <motion.div variants={item}><FactList facts={chapter.facts} accent="bg-sage" /></motion.div>
      <motion.p variants={item} className="mt-4 min-h-5 font-mono text-[11px] text-text-on-dark/55" aria-live="polite">
        {beacon === null ? "Hover a station on the map." : `Station ${String(beacon + 1).padStart(2, "0")} of 24 · H, D and Z components · Pc3 band (illustrative position)`}
      </motion.p>
      <motion.div variants={item}>{chapter.links ? <ChapterLinks links={chapter.links} onLeave={onLeave} /> : null}</motion.div>
    </>
  );
}

function LookingForBody({ chapter, item, onRoleSelect, onExit }: { chapter: IntroChapter; item: Variants; onRoleSelect: (role: RoleCard) => void; onExit: () => void }) {
  const hoveredRole = useIntroState((state) => state.hoveredRole);
  return (
    <>
      <motion.p variants={item} className="mt-4 max-w-lg text-sm leading-7 text-text-on-dark/80 sm:text-base">{chapter.body}</motion.p>
      <motion.ul variants={item} className="mt-5 grid grid-cols-2 gap-2" aria-label="Roles Jordan is looking for, in priority order">
        {ROLE_CARDS.map((role, index) => {
          const primary = role.priority === "primary";
          const active = hoveredRole === role.id;
          return (
            <li key={role.id} className={primary ? "col-span-2" : undefined}>
              <button
                type="button"
                onMouseEnter={() => introStore.setState({ hoveredRole: role.id })}
                onMouseLeave={() => introStore.setState({ hoveredRole: null })}
                onFocus={() => introStore.setState({ hoveredRole: role.id })}
                onBlur={() => introStore.setState({ hoveredRole: null })}
                onClick={() => onRoleSelect(role)}
                className={cn(
                  "group flex h-full min-h-16 w-full flex-col justify-between gap-1 rounded-2xl border p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-frame-green",
                  primary ? "border-coral bg-coral/12" : "border-text-on-dark/18 bg-ink-base/45",
                  active && "border-coral bg-ink-panel/90"
                )}
              >
                <span className={cn("font-mono text-[10px] tracking-[0.14em]", primary ? "text-coral" : "text-mustard")}>
                  {primary ? "PRIORITY · " : `0${index + 1} · `}
                  {role.type.toUpperCase()}
                </span>
                <span className={cn("font-display font-bold leading-tight", primary ? "text-lg" : "text-sm")}>{role.label}</span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-text-on-dark/55 group-hover:text-coral">
                  {role.action.kind === "link" ? "Open Upwork" : "Ask Jordan AI"}
                  {role.action.kind === "link" ? <ArrowUpRightIcon size={12} aria-hidden="true" /> : <ArrowRightIcon size={12} aria-hidden="true" />}
                </span>
              </button>
            </li>
          );
        })}
      </motion.ul>
      <motion.div variants={item} className="mt-5 flex flex-wrap gap-2">
        <a href={CV_URL} download="" target="_blank" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-coral px-5 font-sans text-sm font-bold text-text-on-dark shadow-xl transition-colors hover:bg-brick focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green">
          <FileArrowDownIcon size={18} aria-hidden="true" /> Download CV
        </a>
        <button type="button" onClick={onExit} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-text-on-dark/30 px-5 font-sans text-sm font-bold transition-colors hover:border-coral hover:text-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green">
          Ask Jordan AI <ArrowRightIcon size={18} aria-hidden="true" />
        </button>
        <a href={UPWORK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full px-3 font-mono text-xs font-bold text-text-on-dark/70 underline decoration-text-on-dark/30 underline-offset-4 hover:text-coral focus-visible:outline-2 focus-visible:outline-frame-green">
          Hire on Upwork <ArrowUpRightIcon size={14} aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </motion.div>
    </>
  );
}

/* ---------------- navigation inputs ---------------- */

function canScrollWithin(target: EventTarget | null, direction: number) {
  const scrollable = (target as HTMLElement | null)?.closest?.("[data-intro-scrollable]") as HTMLElement | null;
  if (!scrollable || scrollable.scrollHeight <= scrollable.clientHeight + 1) return false;
  return direction > 0 ? scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 1 : scrollable.scrollTop > 0;
}

function useNavigationInputs({ onExit, enabled }: { onExit: () => void; enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;

    let wheelTotal = 0;
    let wheelResetTimer = 0;
    let lockedUntil = 0;
    let touchStart: { x: number; y: number; target: EventTarget | null } | null = null;

    const navigate = (direction: number) => {
      const now = performance.now();
      if (now < lockedUntil) return;
      lockedUntil = now + 850;
      if (direction > 0) nextChapter({ user: true });
      else previousChapter({ user: true });
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable='true']")) return;
      const onTab = target?.getAttribute("role") === "tab";

      switch (event.key) {
        case "Escape":
          event.preventDefault();
          onExit();
          break;
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
          if (onTab && event.key === "ArrowRight") return;
          event.preventDefault();
          nextChapter({ user: true });
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          if (onTab && event.key === "ArrowLeft") return;
          event.preventDefault();
          previousChapter({ user: true });
          break;
        case "Home":
          event.preventDefault();
          goToChapter(0, { user: true });
          break;
        case "End":
          event.preventDefault();
          goToChapter(INTRO_CHAPTER_COUNT - 1, { user: true });
          break;
      }
    };

    const onWheel = (event: WheelEvent) => {
      const direction = Math.sign(event.deltaY || event.deltaX);
      if (!direction || canScrollWithin(event.target, direction)) return;
      wheelTotal += event.deltaY || event.deltaX;
      window.clearTimeout(wheelResetTimer);
      wheelResetTimer = window.setTimeout(() => {
        wheelTotal = 0;
      }, 220);
      if (Math.abs(wheelTotal) > 55) {
        navigate(Math.sign(wheelTotal));
        wheelTotal = 0;
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      touchStart = { x: event.clientX, y: event.clientY, target: event.target };
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "touch" || !touchStart) return;
      const dx = event.clientX - touchStart.x;
      const dy = event.clientY - touchStart.y;
      const direction = dy < 0 ? 1 : -1;
      if (Math.abs(dy) > 56 && Math.abs(dy) > Math.abs(dx) * 1.4 && !canScrollWithin(touchStart.target, direction)) {
        navigate(direction);
      }
      touchStart = null;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.clearTimeout(wheelResetTimer);
    };
  }, [enabled, onExit]);
}

function useAutoplay(reducedMotion: boolean) {
  const chapter = useIntroState((state) => state.chapter);
  const autoplay = useIntroState((state) => state.autoplay);
  const [documentVisible, setDocumentVisible] = useState(true);

  useEffect(() => {
    const onVisibility = () => setDocumentVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const holdMs = INTRO_CHAPTERS[chapter]?.holdMs ?? 0;
  const running = autoplay && !reducedMotion && documentVisible && holdMs > 0 && chapter < INTRO_CHAPTER_COUNT - 1;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => nextChapter(), holdMs);
    return () => window.clearTimeout(timer);
  }, [running, holdMs, chapter]);

  return { chapter, autoplay: autoplay && !reducedMotion, running, holdMs };
}

/* ---------------- overlay ---------------- */

export function OpeningSequence({ reducedMotion, interactive3d, onExit, onRoleSelect, onLeave }: OpeningSequenceProps) {
  const { chapter: chapterIndex, autoplay, running, holdMs } = useAutoplay(reducedMotion);
  const chapter = INTRO_CHAPTERS[chapterIndex];
  const { container, item, word } = useVariants(reducedMotion);
  const isFirst = chapterIndex === 0;
  const isLast = chapterIndex === INTRO_CHAPTER_COUNT - 1;
  const scrollRef = useRef<HTMLDivElement>(null);

  useNavigationInputs({ onExit, enabled: true });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [chapterIndex]);

  const bodyProps = { chapter, item, onLeave };

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col text-text-on-dark" data-opening-sequence>
      {/* Readability scrims: left column on wide screens, bottom sheet on portrait screens. */}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,var(--color-ink-base)_0%,color-mix(in_srgb,var(--color-ink-base)_92%,transparent)_38%,transparent_62%)] md:bg-[linear-gradient(90deg,var(--color-ink-base)_0%,color-mix(in_srgb,var(--color-ink-base)_86%,transparent)_34%,transparent_58%)]" />

      <header className="pointer-events-auto relative z-10 flex items-center justify-between gap-3 px-4 pt-[max(0.9rem,env(safe-area-inset-top))] sm:px-8 sm:pt-6">
        <p className="whitespace-nowrap font-mono text-[10px] tracking-[0.2em] text-text-on-dark/60">
          <span className="hidden text-text-on-dark sm:inline">JORDAN ARYA LEKSANA · </span>
          <span aria-hidden="true">{String(chapterIndex + 1).padStart(2, "0")} / {String(INTRO_CHAPTER_COUNT).padStart(2, "0")}</span>
        </p>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <RecruiterBar />
          <button
            type="button"
            onClick={onExit}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-text-on-dark/25 bg-ink-base/45 px-3 font-mono text-[11px] tracking-[0.12em] backdrop-blur-md hover:border-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green"
          >
            <span className="hidden sm:inline">SKIP INTRO</span>
            <span className="sm:hidden">SKIP</span>
            <XIcon size={13} aria-hidden="true" />
          </button>
        </div>
      </header>

      <p className="sr-only" aria-live="polite">{`Chapter ${chapterIndex + 1} of ${INTRO_CHAPTER_COUNT}: ${chapter.label.toLowerCase()}`}</p>

      <div className="relative z-10 flex min-h-0 flex-1 items-end px-4 pb-2 sm:px-8 md:items-center md:pb-0">
        <div ref={scrollRef} data-intro-scrollable className="pointer-events-auto max-h-[52svh] w-full max-w-xl overflow-y-auto overscroll-contain pr-1 md:max-h-[calc(100svh-12rem)] [scrollbar-width:none]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.section key={chapter.id} aria-labelledby={`intro-chapter-${chapter.id}`} variants={container} initial="hidden" animate="show" exit="exit">
              <motion.div variants={item}><Eyebrow index={chapterIndex}>{chapter.eyebrow}</Eyebrow></motion.div>
              <RevealHeading
                id={`intro-chapter-${chapter.id}`}
                text={chapter.title}
                wordVariants={word}
                className={cn("mt-4 font-display font-bold leading-[0.95] text-balance", isFirst ? "text-5xl sm:text-6xl lg:text-7xl" : "text-4xl sm:text-5xl lg:text-6xl")}
              />
              {chapter.id === "hello" ? <HelloBody chapter={chapter} item={item} /> : null}
              {chapter.id === "build" ? <BuildBody {...bodyProps} /> : null}
              {chapter.id === "now" ? <NowBody {...bodyProps} /> : null}
              {chapter.id === "impact" ? <ImpactBody {...bodyProps} /> : null}
              {chapter.id === "research" ? <ResearchBody {...bodyProps} /> : null}
              {chapter.id === "looking-for" ? <LookingForBody chapter={chapter} item={item} onRoleSelect={onRoleSelect} onExit={onExit} /> : null}
            </motion.section>
          </AnimatePresence>
        </div>
      </div>

      <footer className="pointer-events-auto relative z-10 px-4 pb-[max(0.9rem,env(safe-area-inset-bottom))] pt-2 sm:px-8 sm:pb-6">
        <p className="mb-3 hidden items-center gap-2 font-mono text-[11px] text-text-on-dark/55 md:flex">
          <CursorClickIcon size={14} aria-hidden="true" className="text-mustard" />
          {interactive3d ? chapter.hint : "Use ← → or the chapter rail"}
          <span className="text-text-on-dark/30">· {interactive3d ? "scroll, swipe or use ← → · " : ""}Esc to skip</span>
        </p>
        <div className="flex items-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => previousChapter({ user: true })}
            disabled={isFirst}
            aria-label="Previous chapter"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-text-on-dark/25 bg-ink-base/40 backdrop-blur-md disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green"
          >
            <ArrowLeftIcon size={17} aria-hidden="true" />
          </button>
          <nav aria-label="Intro chapters" className="flex min-w-0 flex-1 items-end gap-1 sm:gap-2">
            {INTRO_CHAPTERS.map((entry, index) => {
              const done = index < chapterIndex;
              const current = index === chapterIndex;
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => goToChapter(index, { user: true })}
                  aria-label={`Chapter ${index + 1}: ${entry.label.toLowerCase()}`}
                  aria-current={current ? "step" : undefined}
                  className="group flex min-h-11 min-w-0 flex-1 flex-col justify-end gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green"
                >
                  <span className={cn("hidden truncate text-left font-mono text-[9px] tracking-[0.14em] sm:block", current ? "text-text-on-dark" : "text-text-on-dark/40 group-hover:text-text-on-dark/70")}>
                    {String(index + 1).padStart(2, "0")} {entry.label}
                  </span>
                  <span className="relative h-[3px] w-full overflow-hidden rounded-full bg-text-on-dark/18">
                    {done ? <span className="absolute inset-0 bg-coral" /> : null}
                    {current ? (
                      <span
                        key={`${chapterIndex}-${running}`}
                        className={cn("absolute inset-y-0 left-0 bg-coral", running ? "animate-[intro-rail-fill_linear_forwards]" : "w-full")}
                        style={running ? { animationDuration: `${holdMs}ms` } : undefined}
                      />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => (isLast ? onExit() : nextChapter({ user: true }))}
            aria-label={isLast ? "Enter the portfolio" : "Next chapter"}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-coral text-text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green"
          >
            <ArrowRightIcon size={17} aria-hidden="true" />
          </button>
          {!reducedMotion ? (
            <button
              type="button"
              onClick={() => setAutoplay(!autoplay)}
              aria-pressed={!autoplay}
              aria-label={autoplay ? "Pause autoplay" : "Resume autoplay"}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-text-on-dark/25 bg-ink-base/40 backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green"
            >
              {autoplay ? <PauseIcon size={16} aria-hidden="true" /> : <PlayIcon size={16} aria-hidden="true" />}
            </button>
          ) : null}
        </div>
      </footer>
    </div>
  );
}
