"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OpeningSequence } from "@/components/pages/layout/OpeningSequence";
import { IntroStaticStage } from "@/components/pages/layout/IntroStaticStage";
import { cameraState } from "@/components/interfaces/intro3d/cameraState";
import { FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";
import { usePortfolioChat } from "@/components/pages/chat/usePortfolioChat";
import { INTRO_CHAPTERS, type ROLE_CARDS } from "@/lib/config/intro";
import { introStore, useIntroState } from "@/lib/intro/introStore";
import { INTRO_REPLAY_EVENT, markIntroSeen, useIntroSequence } from "@/lib/intro/useIntroSequence";
import { useIsCapableDevice, usePrefersReducedMotion, useWebGLSupport } from "@/lib/intro/useIntroEnvironment";

/* three.js and the 3D world load in their own chunk, after the copy is on screen. */
const IntroCanvas = dynamic(() => import("@/components/interfaces/intro3d/IntroCanvas"), { ssr: false, loading: () => null });

const EXIT_DURATION_SECONDS = 0.7;

type RoleCard = (typeof ROLE_CARDS)[number];

interface IntroSequenceProps {
  /** Home content waiting underneath the intro overlay. */
  children: ReactNode;
}

/**
 * Controller for the Home intro: a 6-chapter, interactive 3D introduction
 * to Jordan (who he is, what he builds, what he is doing now, impact,
 * research, and what he is looking for). Reduced-motion and no-WebGL
 * visitors get the same chapters over a static poster.
 */
export function IntroSequence({ children }: IntroSequenceProps) {
  const { phase, advancePhase, skipSequence, replay } = useIntroSequence();
  const reducedMotion = usePrefersReducedMotion();
  const webgl = useWebGLSupport();
  const capableDevice = useIsCapableDevice();
  const { sendMessage } = usePortfolioChat();
  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const chapterIndex = useIntroState((state) => state.chapter);
  const isOverlayVisible = phase !== "done";
  const isExiting = phase === "exiting";
  const use3d = isOverlayVisible && webgl && !reducedMotion;

  // Every time the intro (re)starts, begin at chapter 1 with autoplay on.
  useEffect(() => {
    if (phase !== "intro") return;
    introStore.reset();
  }, [phase]);

  useEffect(() => {
    cameraState.exiting = isExiting;
  }, [isExiting]);

  useEffect(() => {
    const handleReplay = () => {
      // A replay mounts a fresh canvas: fade it in again once it is ready.
      setCanvasReady(false);
      replay();
    };
    window.addEventListener(INTRO_REPLAY_EVENT, handleReplay);
    return () => window.removeEventListener(INTRO_REPLAY_EVENT, handleReplay);
  }, [replay]);

  // Modal behaviour: lock scroll, move focus in, trap Tab, restore focus on close.
  useEffect(() => {
    if (!isOverlayVisible) return;

    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    overlay?.focus({ preventScroll: true });

    const focusableSelector =
      'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = overlay?.querySelectorAll<HTMLElement>(focusableSelector);
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && (document.activeElement === first || document.activeElement === overlay)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", trapFocus);
    return () => {
      window.removeEventListener("keydown", trapFocus);
      document.body.style.overflow = previousOverflow;
      document.body.style.cursor = "";
      const previous = restoreFocusRef.current;
      if (previous && previous !== document.body && document.contains(previous)) previous.focus({ preventScroll: true });
    };
  }, [isOverlayVisible]);

  const handleRoleSelect = useCallback(
    (role: RoleCard) => {
      if (role.action.kind === "link") {
        window.open(role.action.href, "_blank", "noopener,noreferrer");
        return;
      }
      sendMessage({ text: role.action.prompt });
      skipSequence();
    },
    [sendMessage, skipSequence]
  );

  return (
    <>
      <AnimatePresence>
        {isOverlayVisible ? (
          <motion.div
            key="intro-overlay"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Introduction to Jordan Arya Leksana"
            tabIndex={-1}
            data-intro-overlay
            className="fixed inset-0 z-[80] overflow-hidden bg-ink-base outline-none"
            initial={false}
            animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 1.02 : 1 }}
            transition={{ duration: reducedMotion ? 0 : EXIT_DURATION_SECONDS, ease: FUNCTIONAL_EASE }}
            onAnimationComplete={() => {
              if (isExiting) advancePhase();
            }}
          >
            <div ref={stageRef} className="absolute inset-0">
              <IntroStaticStage chapterId={INTRO_CHAPTERS[chapterIndex]?.id ?? "hello"} hidden={use3d && canvasReady} reducedMotion={reducedMotion} />
              {use3d ? (
                <div className={`absolute inset-0 transition-opacity duration-1000 ${canvasReady ? "opacity-100" : "opacity-0"}`}>
                  <IntroCanvas
                    eventSource={stageRef}
                    initialQuality={capableDevice ? "high" : "low"}
                    onRoleSelect={handleRoleSelect}
                    onReady={() => setCanvasReady(true)}
                  />
                </div>
              ) : null}
              <OpeningSequence reducedMotion={reducedMotion} interactive3d={use3d} onExit={skipSequence} onRoleSelect={handleRoleSelect} onLeave={markIntroSeen} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </>
  );
}
