/**
 * Mutable camera progress shared inside the canvas (read in useFrame).
 * `progress` is in chapter units: 0 = first station, 5 = last station.
 */
export const cameraState = {
  progress: 0,
  exiting: false,
};
