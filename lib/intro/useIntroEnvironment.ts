"use client";

import { useSyncExternalStore } from "react";

/*
 * Hydration-safe environment reads for the intro. The server snapshot is
 * always the conservative value, and React re-renders with the client value
 * right after hydration, so server HTML and the first client render match.
 */

function subscribeToReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

let webglSupport: boolean | null = null;

function detectWebGL() {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    webglSupport = Boolean(context);
    (context as WebGLRenderingContext | null)?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

function subscribeToNothing() {
  return () => {};
}

export function useWebGLSupport() {
  return useSyncExternalStore(subscribeToNothing, detectWebGL, () => false);
}

/** Desktop-class device: fine pointer and a reasonably wide viewport. */
export function useIsCapableDevice() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => window.matchMedia("(pointer: fine)").matches && window.innerWidth >= 900 && (navigator.hardwareConcurrency ?? 4) >= 4,
    () => false
  );
}
