"use client";

import {
  useCallback,
  useState,
  useSyncExternalStore,
} from "react";
import { INTRO_SEEN_STORAGE_KEY } from "@/lib/intro/introSession";

export { INTRO_REPLAY_EVENT } from "@/lib/intro/introSession";

export type IntroPhase = "intro" | "exiting" | "done";

const PHASE_ORDER: readonly IntroPhase[] = ["intro", "exiting", "done"];

function subscribeToNothing() {
  return () => {};
}

function getStaticSkipSnapshot(): boolean {
  return new URLSearchParams(window.location.search).get("skipIntro") === "1";
}

/** Snapshot server selalu false, supaya HTML awal konsisten dengan render klien pertama. */
function getStaticSkipServerSnapshot(): boolean {
  return false;
}

function getSeenSnapshot(): boolean {
  return document.documentElement.dataset.introSeen === "1";
}

const FREEZABLE_PHASES: readonly IntroPhase[] = ["intro"];

/**
 * Dibaca di klien: fase tempat urutan intro dibekukan bila URL memuat
 * ?freezeIntro=intro -- dipakai HANYA untuk kebutuhan development saat
 * mengedit intro, supaya fase itu tidak keburu berpindah ke Home.
 */
function getFreezePhaseSnapshot(): IntroPhase | null {
  const requestedPhase = new URLSearchParams(window.location.search).get("freezeIntro");
  return FREEZABLE_PHASES.find((phase) => phase === requestedPhase) ?? null;
}

function getFreezePhaseServerSnapshot(): IntroPhase | null {
  return null;
}

export function markIntroSeen() {
  // Also flag the document, so client-side navigation back to Home skips it.
  document.documentElement.dataset.introSeen = "1";
  try {
    window.sessionStorage.setItem(INTRO_SEEN_STORAGE_KEY, "1");
  } catch {
    // Storage can be unavailable (private mode); the intro then replays on reload.
  }
}

interface UseIntroSequenceResult {
  phase: IntroPhase;
  /** intro -> exiting -> done, called when each animation finishes. */
  advancePhase: () => void;
  skipSequence: () => void;
  replay: () => void;
}

/**
 * Owns the Home intro lifecycle (intro -> exiting -> done).
 *
 * - Plays once per session: a returning visit in the same session starts at
 *   "done" (the bootstrap script hides the overlay before first paint).
 * - ?skipIntro=1 jumps straight to "done" (development).
 * - ?freezeIntro=intro keeps the intro open while editing it (development).
 * - replay() plays it again on demand.
 */
export function useIntroSequence(): UseIntroSequenceResult {
  const shouldSkipStatically = useSyncExternalStore(
    subscribeToNothing,
    getStaticSkipSnapshot,
    getStaticSkipServerSnapshot
  );
  const seenThisSession = useSyncExternalStore(
    subscribeToNothing,
    getSeenSnapshot,
    getStaticSkipServerSnapshot
  );
  const freezePhase = useSyncExternalStore(
    subscribeToNothing,
    getFreezePhaseSnapshot,
    getFreezePhaseServerSnapshot
  );
  const [replayRequested, setReplayRequested] = useState(false);
  const shouldSkip = freezePhase === null && (shouldSkipStatically || (seenThisSession && !replayRequested));

  const [timerPhase, setTimerPhase] = useState<IntroPhase>("intro");

  const advancePhase = useCallback(() => {
    setTimerPhase((current) => {
      if (current === freezePhase) return current;

      const nextPhase = PHASE_ORDER[PHASE_ORDER.indexOf(current) + 1];
      if (nextPhase === "done") markIntroSeen();
      return nextPhase ?? current;
    });
  }, [freezePhase]);

  const skipSequence = useCallback(() => {
    if (freezePhase === null) setTimerPhase((current) => (current === "intro" ? "exiting" : current));
  }, [freezePhase]);

  const replay = useCallback(() => {
    delete document.documentElement.dataset.introSeen;
    setReplayRequested(true);
    setTimerPhase("intro");
  }, []);

  return { phase: shouldSkip ? "done" : timerPhase, advancePhase, skipSequence, replay };
}
