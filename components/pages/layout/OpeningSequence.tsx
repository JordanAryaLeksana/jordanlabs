"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { SceneBackdrop } from "@/components/interfaces/scenes/SceneBackdrop";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";
import { INTRO_CONTINUE_LABEL, INTRO_SCENES, type IntroScene, type IntroTextTone } from "@/lib/config/brand";
import { INTRO_MOTION_PRESETS } from "@/lib/config/introMotion";

const SCENE_HOLD_MS = 4200;
const TEXT_TONE_CLASS_NAME: Record<IntroTextTone, string> = { cream: "text-text-on-dark", coral: "text-coral", pine: "text-sage", mustard: "text-mustard", slate: "text-slate" };

function SceneAccent({ scene, reducedMotion }: { scene: IntroScene; reducedMotion: boolean }) {
  const preset = INTRO_MOTION_PRESETS[scene.motionPreset];
  const transition = { duration: reducedMotion ? 0 : 0.72, delay: reducedMotion ? 0 : preset.accentDelay, ease: FUNCTIONAL_EASE };
  const className = "mt-6 max-w-md font-mono text-[10px] tracking-[0.16em] text-text-on-dark/75 sm:text-[11px]";

  if (scene.accent === "ticket") return <motion.div className={`${className} border-l border-t border-text-on-dark/45 p-3`} initial={{ opacity: 0, scaleX: reducedMotion ? 1 : 0 }} animate={{ opacity: 1, scaleX: 1 }} style={{ transformOrigin: "left" }} transition={transition}><p className="mb-2 text-sage">◇ SANDBOX / ENTRY</p>{scene.tags.map((tag) => <p key={tag} className="mt-1">{tag}</p>)}</motion.div>;

  if (scene.accent === "build-track") return <motion.div className={className} initial={{ opacity: 0, x: reducedMotion ? 0 : -18 }} animate={{ opacity: 1, x: 0 }} transition={transition}><div className="mb-2 flex justify-between"><span>PROTOTYPE / 03</span><span className="text-mustard">23:48</span></div><div className="flex items-center gap-2"><span>IDEA</span><motion.span className="h-px flex-1 origin-left bg-mustard" initial={{ scaleX: reducedMotion ? 1 : 0 }} animate={{ scaleX: 1 }} transition={transition} /><span>BUILD</span><span>TEST</span><span>SHIP</span></div></motion.div>;

  if (scene.accent === "trace") return <motion.div className={`${className} max-w-lg`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition}><svg viewBox="0 0 520 34" className="h-9 w-full overflow-visible" aria-hidden="true"><motion.path d="M2 17 H518" fill="none" stroke="currentColor" strokeWidth="1" initial={{ pathLength: reducedMotion ? 1 : 0 }} animate={{ pathLength: 1 }} transition={transition} />{[50, 185, 325, 468].map((x) => <circle key={x} cx={x} cy="17" r="3" fill="var(--color-sage)" />)}</svg><div className="-mt-1 flex justify-between"><span>INPUT</span><span>REASON</span><span>BUILD</span><span>VERIFY</span></div></motion.div>;

  if (scene.accent === "stage") return <motion.div className={`${className} relative overflow-hidden border-t border-coral/65 pt-3`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition}>{!reducedMotion && <motion.span aria-hidden="true" className="absolute left-0 top-0 h-px w-20 bg-text-on-dark" initial={{ x: "-100%" }} animate={{ x: "520%" }} transition={{ ...transition, duration: 0.9 }} />}<span className="mr-3 inline-block size-2 bg-coral" /> PRESENTING <span className="ml-5 text-text-on-dark/50">DEMO DAY / 04</span></motion.div>;

  return <motion.div className={`${className} flex flex-wrap gap-x-4 gap-y-2`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition}>{scene.tags.map((tag, index) => <motion.span key={tag} className={scene.accent === "quiet-tags" && index > 1 ? "hidden sm:inline" : undefined} initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: reducedMotion ? 0 : preset.accentDelay + index * 0.1 }}>{tag}{index < scene.tags.length - 1 ? " ·" : ""}</motion.span>)}</motion.div>;
}

export function OpeningSequence({ onComplete }: { onComplete: () => void }) {
  const reducedMotion = Boolean(useReducedMotion());
  const [sceneIndex, setSceneIndex] = useState(0);
  const activeSceneIndex = reducedMotion ? INTRO_SCENES.length - 1 : sceneIndex;
  const scene = INTRO_SCENES[activeSceneIndex];
  const isLastScene = activeSceneIndex === INTRO_SCENES.length - 1;
  const preset = INTRO_MOTION_PRESETS[scene.motionPreset];
  const showScene = useCallback((index: number) => setSceneIndex(Math.max(0, Math.min(index, INTRO_SCENES.length - 1))), []);

  useEffect(() => {
    if (reducedMotion || isLastScene) return;
    const timeout = window.setTimeout(() => showScene(sceneIndex + 1), SCENE_HOLD_MS);
    return () => window.clearTimeout(timeout);
  }, [isLastScene, reducedMotion, sceneIndex, showScene]);

  useEffect(() => {
    if (reducedMotion) return;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "ArrowLeft") showScene(sceneIndex - 1); if (event.key === "ArrowRight") showScene(sceneIndex + 1); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [reducedMotion, sceneIndex, showScene]);

  const transition = { duration: reducedMotion ? 0 : 0.62, ease: FUNCTIONAL_EASE };

  return <div data-opening-sequence className="relative h-full overflow-hidden bg-ink-base text-text-on-dark">
    <AnimatePresence initial={false} mode="sync"><motion.div key={scene.id} className="absolute inset-0" variants={preset.backdrop} initial="enter" animate="active" exit={{ opacity: 0 }} transition={{ ...transition, duration: reducedMotion ? 0 : 1.2 }}><SceneBackdrop scene={scene.scene} variant="intro" priority={activeSceneIndex < 2} /></motion.div></AnimatePresence>

    <div data-opening-content className="relative z-10 flex h-full flex-col px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(4.5rem,env(safe-area-inset-top))] sm:px-10 sm:pb-8 lg:px-16 lg:pb-10">
      <div className="font-mono text-[10px] tracking-[0.18em] text-text-on-dark/55" aria-live="polite">{String(activeSceneIndex + 1).padStart(2, "0")} / {String(INTRO_SCENES.length).padStart(2, "0")}</div>
      <AnimatePresence initial={false} mode="wait"><motion.section key={scene.id} className="mt-auto max-w-5xl" variants={preset.content} initial="enter" animate="active" exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }} transition={transition} aria-labelledby={`intro-${scene.id}`}>
        <Typography as="p" variant="text" size="xs" className="mb-3 tracking-[0.24em] text-text-on-dark/70">{scene.eyebrow}</Typography>
        <Typography as="h1" variant="header" size="5xl" className="max-w-5xl text-balance leading-[0.9] sm:text-7xl lg:text-8xl"><span id={`intro-${scene.id}`}>{scene.headline.map((segment, index) => <motion.span key={`${segment.text}-${index}`} className={`inline-block ${TEXT_TONE_CLASS_NAME[segment.tone ?? "cream"]}`} initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: reducedMotion ? 0 : 0.12 + index * 0.12 }}>{segment.text}</motion.span>)}</span></Typography>
        <Typography as="p" variant="text" size="sm" className="mt-5 max-w-xl text-sm leading-6 text-text-on-dark/72 sm:text-base sm:leading-7">{scene.description}</Typography>
        <SceneAccent scene={scene} reducedMotion={reducedMotion} />
        {isLastScene && <button type="button" onClick={onComplete} className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-coral px-6 font-sans text-sm font-bold text-text-on-dark shadow-xl transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-frame-green motion-reduce:transition-none motion-reduce:hover:translate-y-0">{INTRO_CONTINUE_LABEL}<ArrowRightIcon size={19} aria-hidden="true" /></button>}
      </motion.section></AnimatePresence>

      {!reducedMotion && <div className="mt-6 flex items-end gap-3 sm:mt-8"><button type="button" onClick={() => showScene(sceneIndex - 1)} disabled={activeSceneIndex === 0} aria-label="Previous intro chapter" className="grid size-11 shrink-0 place-items-center border border-text-on-dark/25 text-text-on-dark disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green"><ArrowLeftIcon size={17} aria-hidden="true" /></button><nav aria-label="Opening sequence chapters" className="flex min-w-0 flex-1 items-end gap-1 sm:gap-2">{INTRO_SCENES.map((introScene, index) => <button key={introScene.id} type="button" onClick={() => showScene(index)} aria-label={`Show intro chapter ${index + 1}: ${introScene.eyebrow}`} aria-current={index === activeSceneIndex ? "step" : undefined} className="group flex min-h-11 min-w-0 flex-1 flex-col justify-end gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green"><span className={`hidden truncate font-mono text-[9px] tracking-[0.12em] sm:block ${index === activeSceneIndex ? "text-text-on-dark" : "text-text-on-dark/35"}`}>{String(index + 1).padStart(2, "0")} {introScene.chapter}</span><span className="relative h-px w-full bg-text-on-dark/20"><motion.span className="absolute inset-y-0 left-0 bg-coral" initial={false} animate={{ width: index <= activeSceneIndex ? "100%" : "0%" }} transition={transition} /></span></button>)}</nav><button type="button" onClick={() => showScene(sceneIndex + 1)} disabled={isLastScene} aria-label="Next intro chapter" className="grid size-11 shrink-0 place-items-center border border-text-on-dark/25 text-text-on-dark disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green"><ArrowRightIcon size={17} aria-hidden="true" /></button></div>}
    </div>
  </div>;
}
