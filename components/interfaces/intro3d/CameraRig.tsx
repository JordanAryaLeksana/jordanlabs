"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { introStore, INTRO_CHAPTER_COUNT } from "@/lib/intro/introStore";
import { cameraState } from "@/components/interfaces/intro3d/cameraState";
import { STATION_POSITIONS, damp, getFraming } from "@/components/interfaces/intro3d/world";

/**
 * Flies one continuous camera path through every station. Chapter changes
 * move a damped progress value along Catmull-Rom curves for the camera
 * position and its look target, so jumping from chapter 1 to 4 sweeps past
 * 2 and 3 like a single camera move.
 */
export function CameraRig() {
  const size = useThree((state) => state.size);
  const aspect = size.width / Math.max(size.height, 1);
  const framing = useMemo(() => getFraming(aspect), [aspect]);
  const progress = useRef(introStore.getState().chapter);
  const parallax = useRef(new THREE.Vector2());
  const exitPush = useRef(0);
  const position = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());

  const curves = useMemo(() => {
    const cameraPoints = STATION_POSITIONS.map((station) =>
      station.clone().add(framing.lookOffset).add(new THREE.Vector3(0, framing.height, framing.distance))
    );
    const lookPoints = STATION_POSITIONS.map((station) => station.clone().add(framing.lookOffset));
    return {
      camera: new THREE.CatmullRomCurve3(cameraPoints, false, "centripetal"),
      look: new THREE.CatmullRomCurve3(lookPoints, false, "centripetal"),
    };
  }, [framing]);

  useFrame((state, delta) => {
    const target = introStore.getState().chapter;
    progress.current = damp(progress.current, target, 2.3, delta);
    if (Math.abs(progress.current - target) < 0.0005) progress.current = target;
    cameraState.progress = progress.current;

    const t = THREE.MathUtils.clamp(progress.current / (INTRO_CHAPTER_COUNT - 1), 0, 1);
    const cameraPosition = curves.camera.getPoint(t, position.current);
    const lookTarget = curves.look.getPoint(t, look.current);

    // Gentle hand-held breathing plus pointer parallax.
    parallax.current.x = damp(parallax.current.x, state.pointer.x, 2.5, delta);
    parallax.current.y = damp(parallax.current.y, state.pointer.y, 2.5, delta);
    const time = state.clock.elapsedTime;
    cameraPosition.x += parallax.current.x * 0.42 + Math.sin(time * 0.31) * 0.06;
    cameraPosition.y += parallax.current.y * 0.26 + Math.sin(time * 0.43) * 0.05;

    // Mid-flight the camera pulls back slightly for a sense of travel.
    const travel = Math.min(1, Math.abs(progress.current - target));
    cameraPosition.z += travel * 1.4;

    exitPush.current = damp(exitPush.current, cameraState.exiting ? 1 : 0, 3, delta);
    if (exitPush.current > 0.001) cameraPosition.lerp(lookTarget, exitPush.current * 0.55);

    const camera = state.camera as THREE.PerspectiveCamera;
    camera.position.copy(cameraPosition);
    camera.lookAt(lookTarget);

    const fov = state.size.width / Math.max(state.size.height, 1) < 0.85 ? 52 : 42;
    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
