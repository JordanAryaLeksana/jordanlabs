/*
 * Shared (server + client) constants for the Home intro session behaviour.
 * Kept out of "use client" modules so server components can import them.
 */

/** Session flag: the full intro plays once per browser session. */
export const INTRO_SEEN_STORAGE_KEY = "jordanlabs:intro-seen";

/** Window event that asks the Home intro to play again. */
export const INTRO_REPLAY_EVENT = "jordanlabs:replay-intro";

/**
 * Inline, pre-hydration script for Home: marks <html data-intro-seen="1">
 * when this session already watched the intro, so CSS hides the overlay
 * before first paint (no flash of the intro for returning visitors).
 */
export const INTRO_SEEN_BOOTSTRAP_SCRIPT = `(function(){try{if(sessionStorage.getItem(${JSON.stringify(INTRO_SEEN_STORAGE_KEY)})==="1"&&!/[?&]freezeIntro=/.test(location.search)){document.documentElement.dataset.introSeen="1";}}catch(e){}})();`;
