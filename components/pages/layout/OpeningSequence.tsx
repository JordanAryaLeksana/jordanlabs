"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { SceneBackdrop } from "@/components/interfaces/scenes/SceneBackdrop";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";
import {
  INTRO_CONTINUE_LABEL,
  INTRO_SCENES,
  type IntroTextTone,
} from "@/lib/config/brand";

const SCENE_HOLD_MS = 2800;

const TEXT_TONE_CLASS_NAME: Record<IntroTextTone, string> = {
  cream: "text-text-on-dark",
  coral: "text-coral",
  pine: "text-sage",
  mustard: "text-mustard",
  slate: "text-slate",
};

interface OpeningSequenceProps {
  onComplete: () => void;
}

export function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const reducedMotion = useReducedMotion();
  const [sceneIndex, setSceneIndex] = useState(
    0
  );
  const activeSceneIndex = reducedMotion ? INTRO_SCENES.length - 1 : sceneIndex;
  const scene = INTRO_SCENES[activeSceneIndex];
  const isLastScene = activeSceneIndex === INTRO_SCENES.length - 1;

  useEffect(() => {
    if (reducedMotion || isLastScene) return;

    const timeout = window.setTimeout(() => {
      setSceneIndex((current) => Math.min(current + 1, INTRO_SCENES.length - 1));
    }, SCENE_HOLD_MS);

    return () => window.clearTimeout(timeout);
  }, [isLastScene, reducedMotion, sceneIndex]);

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.65, ease: FUNCTIONAL_EASE };

  return (
    <div className="relative h-full overflow-hidden bg-ink-base text-text-on-dark">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={scene.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          <SceneBackdrop scene={scene.scene} variant="intro" priority={activeSceneIndex < 2} />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-10 sm:pb-10 lg:px-16 lg:pb-14">
        <div className="pr-32 leading-none sm:pr-36">
          <p className="font-display text-sm font-bold tracking-[-0.02em] sm:text-base">
            <span className="text-text-on-dark">JORDAN </span>
            <span className="text-coral">ARYA </span>
            <span className="text-mustard">LEKSANA</span>
          </p>
          <p className="mt-2 font-mono text-[9px] tracking-[0.18em] sm:text-[10px]">
            <span className="text-slate">SOFTWARE</span>
            <span className="text-text-on-dark/45"> / </span>
            <span className="text-sage">AI ENGINEER</span>
          </p>
        </div>

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={scene.id}
            className="mt-auto max-w-5xl"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
            transition={transition}
          >
            <Typography
              as="p"
              variant="text"
              size="xs"
              className="mb-4 tracking-[0.24em] text-text-on-dark/70"
            >
              {scene.eyebrow}
            </Typography>
            <Typography
              as="h1"
              variant="header"
              size="5xl"
              className="max-w-5xl text-balance leading-[0.92] sm:text-7xl lg:text-8xl"
            >
              {scene.headline.map((segment, index) => (
                <span
                  key={`${segment.text}-${index}`}
                  className={TEXT_TONE_CLASS_NAME[segment.tone ?? "cream"]}
                >
                  {segment.text}
                </span>
              ))}
            </Typography>
            <Typography
              as="p"
              variant="text"
              size="sm"
              className="mt-6 max-w-xl text-sm leading-6 text-text-on-dark/72 sm:text-base sm:leading-7"
            >
              {scene.description}
            </Typography>

            {isLastScene ? (
              <button
                type="button"
                onClick={onComplete}
                className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-coral px-6 font-sans text-sm font-bold text-text-on-dark shadow-xl transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-frame-green motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {INTRO_CONTINUE_LABEL}
                <ArrowRightIcon size={19} aria-hidden="true" />
              </button>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {!reducedMotion ? (
          <nav
            aria-label="Opening sequence chapters"
            className="mt-8 flex items-center gap-2"
          >
            {INTRO_SCENES.map((introScene, index) => (
              <button
                key={introScene.id}
                type="button"
                onClick={() => setSceneIndex(index)}
                aria-label={`Show intro chapter ${index + 1}: ${introScene.eyebrow}`}
                aria-current={index === activeSceneIndex ? "step" : undefined}
                className="group flex min-h-11 flex-1 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-frame-green"
              >
                <span
                  className={`h-1 w-full rounded-full transition-colors duration-300 ${
                    index === activeSceneIndex
                      ? "bg-coral"
                      : index < activeSceneIndex
                        ? "bg-text-on-dark/55"
                        : "bg-text-on-dark/20 group-hover:bg-text-on-dark/40"
                  }`}
                />
              </button>
            ))}
          </nav>
        ) : null}
      </div>
    </div>
  );
}
