import * as THREE from "three";

/*
 * One continuous world: six stations along a gentle S-curve. The camera
 * flies a Catmull-Rom path through them, so chapter changes read as one
 * continuous shot instead of six slides.
 */

export const STATION_POSITIONS: readonly THREE.Vector3[] = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(13, 0.6, -11),
  new THREE.Vector3(1, 0, -24),
  new THREE.Vector3(-13, -0.4, -36),
  new THREE.Vector3(0, 0, -49),
  new THREE.Vector3(13, 0.6, -61),
];

export const PALETTE = {
  ink: "#0f0f14",
  inkPanel: "#1e1e26",
  inkRaised: "#2a2a34",
  coral: "#e07856",
  mustard: "#dda83e",
  sage: "#93ae86",
  pine: "#4c7a6b",
  slate: "#7d8fb3",
  cream: "#ede6d6",
  brick: "#b0413e",
} as const;

export const FONT_DISPLAY = "/fonts/space-grotesk-bold.ttf";
export const FONT_MONO = "/fonts/space-mono-regular.ttf";

export interface Framing {
  /** Shift that pushes the station subject right (desktop) or up (portrait). */
  lookOffset: THREE.Vector3;
  distance: number;
  height: number;
}

/**
 * Desktop: copy sits on the left, so the subject is framed right of centre.
 * Portrait: copy sits in a bottom sheet, so the subject is framed high.
 */
export function getFraming(aspect: number): Framing {
  if (aspect < 0.85) {
    return { lookOffset: new THREE.Vector3(0, -2.35, 0), distance: 14.5, height: 0.2 };
  }

  if (aspect < 1.25) {
    return { lookOffset: new THREE.Vector3(-1.9, -0.5, 0), distance: 11.2, height: 0.5 };
  }

  return { lookOffset: new THREE.Vector3(-3.1, 0, 0), distance: 9.6, height: 0.55 };
}

/** How visible a station should be for a given camera progress (0..N-1). */
export function stationPresence(cameraIndex: number, stationIndex: number) {
  return THREE.MathUtils.clamp(1 - Math.abs(cameraIndex - stationIndex) * 1.15, 0, 1);
}

/** Small deterministic PRNG so layouts are identical on every load. */
export function seededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value = (value + 0x6d2b79f5) >>> 0;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Exponential smoothing that is frame-rate independent. */
export function damp(current: number, target: number, lambda: number, delta: number) {
  return THREE.MathUtils.damp(current, target, lambda, Math.min(delta, 0.1));
}
