"use client";

import { useSyncExternalStore } from "react";
import { INTRO_CHAPTERS, type ImpactMode, type StackLayer } from "@/lib/config/intro";

/*
 * Single source of truth for the intro timeline, shared by the DOM overlay
 * (React, via useIntroState) and the 3D scene (read imperatively inside
 * useFrame via introStore.getState(), so the canvas never re-renders).
 */

export const INTRO_CHAPTER_COUNT = INTRO_CHAPTERS.length;

export interface IntroState {
  chapter: number;
  /** Autoplay runs until the visitor interacts or presses pause. */
  autoplay: boolean;
  /** Set once the visitor drives the intro themselves. */
  interacted: boolean;
  activeLayer: StackLayer["id"] | null;
  impactMode: ImpactMode;
  /** Chapter 3: 0 = raw footage, 1 = story order. */
  storyProgress: number;
  storyDragging: boolean;
  activeBeacon: number | null;
  hoveredRole: string | null;
  /** Chapter 1: whether the particles currently spell the name. */
  nameFormed: boolean;
  /** Increments whenever chapter 1 should replay its name formation. */
  namePulse: number;
}

const INITIAL_STATE: IntroState = {
  chapter: 0,
  autoplay: true,
  interacted: false,
  activeLayer: null,
  impactMode: "pertamina",
  storyProgress: 0,
  storyDragging: false,
  activeBeacon: null,
  hoveredRole: null,
  nameFormed: false,
  namePulse: 0,
};

type Listener = () => void;

function createIntroStore() {
  let state = INITIAL_STATE;
  const listeners = new Set<Listener>();

  const emit = () => listeners.forEach((listener) => listener());

  return {
    getState: () => state,
    getInitialState: () => INITIAL_STATE,
    setState(partial: Partial<IntroState> | ((current: IntroState) => Partial<IntroState>)) {
      const next = typeof partial === "function" ? partial(state) : partial;
      const changed = (Object.keys(next) as (keyof IntroState)[]).some((key) => next[key] !== state[key]);

      if (!changed) return;

      state = { ...state, ...next };
      emit();
    },
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    reset() {
      state = { ...INITIAL_STATE, namePulse: state.namePulse + 1 };
      emit();
    },
  };
}

export const introStore = createIntroStore();

export function useIntroState<T>(selector: (state: IntroState) => T): T {
  return useSyncExternalStore(
    introStore.subscribe,
    () => selector(introStore.getState()),
    () => selector(introStore.getInitialState())
  );
}

/* ---------------- actions ---------------- */

function clampChapter(index: number) {
  return Math.max(0, Math.min(INTRO_CHAPTER_COUNT - 1, index));
}

export function goToChapter(index: number, options: { user?: boolean } = {}) {
  introStore.setState((current) => ({
    chapter: clampChapter(index),
    ...(options.user ? { interacted: true, autoplay: false } : {}),
    activeLayer: null,
    activeBeacon: null,
    hoveredRole: null,
    storyDragging: false,
    storyProgress: clampChapter(index) === current.chapter ? current.storyProgress : 0,
  }));
}

export function nextChapter(options: { user?: boolean } = {}) {
  goToChapter(introStore.getState().chapter + 1, options);
}

export function previousChapter(options: { user?: boolean } = {}) {
  goToChapter(introStore.getState().chapter - 1, options);
}

export function setAutoplay(autoplay: boolean) {
  introStore.setState({ autoplay, interacted: true });
}

/** Any hands-on interaction with a scene stops autoplay so the visitor stays in control. */
export function markInteracted() {
  introStore.setState({ interacted: true, autoplay: false });
}
