"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Image as ImagePlane, Text } from "@react-three/drei";
import * as THREE from "three";
import { INTENTCUT_CLIPS } from "@/lib/config/intro";
import { introStore, markInteracted } from "@/lib/intro/introStore";
import { cameraState } from "@/components/interfaces/intro3d/cameraState";
import { glowColor } from "@/components/interfaces/intro3d/shapes";
import { FONT_MONO, PALETTE, STATION_POSITIONS, damp, seededRandom, stationPresence } from "@/components/interfaces/intro3d/world";

const STATION_INDEX = 2;
const RADIUS = 6.6;
const SPAN = 1.04;
const CARD_W = 0.8;
const CARD_H = 1.08;

function slotTransform(index: number, count: number) {
  const angle = -SPAN / 2 + ((index + 0.5) / count) * SPAN;
  return {
    position: new THREE.Vector3(Math.sin(angle) * RADIUS, 0.05, RADIUS - Math.cos(angle) * RADIUS),
    rotation: new THREE.Euler(0, -angle, 0),
  };
}

/** Film base with sprocket holes, drawn once into a canvas texture. */
function useFilmTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 256;
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.fillStyle = "#121218";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#2a2a34";
    for (let x = 12; x < canvas.width; x += 44) {
      context.beginPath();
      context.roundRect(x, 14, 24, 26, 5);
      context.roundRect(x, canvas.height - 40, 24, 26, 5);
      context.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, []);
}

/** A curved ribbon that follows the same arc as the clip slots. */
function useRibbonGeometry() {
  return useMemo(() => {
    const geometry = new THREE.PlaneGeometry(1, 1.95, 96, 1);
    const position = geometry.attributes.position as THREE.BufferAttribute;
    const span = SPAN * 1.18;
    for (let index = 0; index < position.count; index += 1) {
      const u = position.getX(index) + 0.5;
      const angle = -span / 2 + u * span;
      position.setXYZ(index, Math.sin(angle) * (RADIUS + 0.06), position.getY(index) + 0.05, RADIUS - Math.cos(angle) * (RADIUS + 0.06));
    }
    geometry.computeVertexNormals();
    return geometry;
  }, []);
}

function Clip({ index, raw }: { index: number; raw: { position: THREE.Vector3; rotation: THREE.Euler } }) {
  const ref = useRef<THREE.Group>(null);
  const labelRef = useRef<THREE.Group>(null);
  const slot = useMemo(() => slotTransform(index, INTENTCUT_CLIPS.length), [index]);
  const rawQuaternion = useMemo(() => new THREE.Quaternion().setFromEuler(raw.rotation), [raw.rotation]);
  const slotQuaternion = useMemo(() => new THREE.Quaternion().setFromEuler(slot.rotation), [slot.rotation]);
  const hovered = useRef(false);
  const lift = useRef(0);

  useFrame((state, delta) => {
    const group = ref.current;
    if (!group) return;
    const progress = introStore.getState().storyProgress;
    const local = THREE.MathUtils.clamp(progress * 1.55 - index * 0.08, 0, 1);
    const eased = local * local * (3 - 2 * local);
    group.position.lerpVectors(raw.position, slot.position, eased);
    group.quaternion.slerpQuaternions(rawQuaternion, slotQuaternion, eased);
    lift.current = damp(lift.current, hovered.current ? 1 : 0, 9, delta);
    group.position.y += Math.sin(state.clock.elapsedTime * 1.1 + index) * 0.05 * (1 - eased) + lift.current * 0.22;
    group.scale.setScalar(1 + lift.current * 0.12);
    if (labelRef.current) labelRef.current.scale.setScalar(Math.max(0.001, eased));
  });

  return (
    <group ref={ref}>
      <ImagePlane
        url={INTENTCUT_CLIPS[index]}
        scale={[CARD_W, CARD_H]}
        radius={0.06}
        toneMapped={false}
        onPointerOver={(event) => {
          event.stopPropagation();
          hovered.current = true;
          document.body.style.cursor = "grab";
        }}
        onPointerOut={() => {
          hovered.current = false;
          document.body.style.cursor = "";
        }}
      />
      <group ref={labelRef} position={[0, -CARD_H / 2 - 0.16, 0]}>
        <Text font={FONT_MONO} fontSize={0.09} color={PALETTE.sage} anchorX="center">
          {String(index + 1).padStart(2, "0")}
        </Text>
      </group>
    </group>
  );
}

function Playhead() {
  const ref = useRef<THREE.Mesh>(null);
  const color = useMemo(() => glowColor(PALETTE.coral, 3), []);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const progress = introStore.getState().storyProgress;
    const visible = THREE.MathUtils.smoothstep(progress, 0.85, 1);
    const sweep = (state.clock.elapsedTime * 0.28) % 1;
    const angle = -SPAN / 2 + sweep * SPAN;
    mesh.position.set(Math.sin(angle) * (RADIUS - 0.12), 0.05, RADIUS - Math.cos(angle) * (RADIUS - 0.12));
    mesh.rotation.y = -angle;
    mesh.scale.set(1, Math.max(0.001, visible), 1);
  });

  return (
    <mesh ref={ref} raycast={() => null}>
      <planeGeometry args={[0.035, 1.95]} />
      <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.9} />
    </mesh>
  );
}

export function FilmStripStation() {
  const groupRef = useRef<THREE.Group>(null);
  const ribbonRef = useRef<THREE.Mesh>(null);
  const station = STATION_POSITIONS[STATION_INDEX];
  const texture = useFilmTexture();
  const ribbon = useRibbonGeometry();
  const drag = useRef<{ x: number; progress: number } | null>(null);
  const wasActive = useRef(false);
  const enteredAt = useRef(0);
  const userScrubbed = useRef(false);

  const rawLayout = useMemo(() => {
    const random = seededRandom(21);
    return INTENTCUT_CLIPS.map(() => ({
      position: new THREE.Vector3((random() - 0.5) * 7.2, (random() - 0.5) * 3.2 + 0.2, (random() - 0.5) * 3 - 0.6),
      rotation: new THREE.Euler((random() - 0.5) * 0.9, (random() - 0.5) * 1.1, (random() - 0.5) * 0.7),
    }));
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const presence = stationPresence(cameraState.progress, STATION_INDEX);
    group.visible = presence > 0.01;
    const { chapter, storyDragging, storyProgress } = introStore.getState();
    const isActive = chapter === STATION_INDEX;
    const time = state.clock.elapsedTime;

    if (isActive && !wasActive.current) {
      enteredAt.current = time;
      userScrubbed.current = false;
    }
    wasActive.current = isActive;

    // On arrival, cut the raw footage into story order by itself,
    // until the visitor takes over the scrubber.
    if (isActive && !userScrubbed.current && !storyDragging && time - enteredAt.current > 0.7 && storyProgress < 1) {
      introStore.setState({ storyProgress: Math.min(1, damp(storyProgress, 1.03, 1.5, delta)) });
    }

    if (!group.visible) return;
    group.rotation.y = damp(group.rotation.y, state.pointer.x * 0.08, 3, delta);
    if (ribbonRef.current) {
      const material = ribbonRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.25 + THREE.MathUtils.smoothstep(storyProgress, 0.4, 1) * 0.6;
    }
  });

  return (
    <group ref={groupRef} position={[station.x - 0.85, station.y, station.z]}>
      <mesh ref={ribbonRef} geometry={ribbon} position={[0, 0, -0.02]} raycast={() => null}>
        <meshBasicMaterial map={texture ?? undefined} side={THREE.DoubleSide} transparent opacity={0.3} color="#9a9aa8" />
      </mesh>
      {INTENTCUT_CLIPS.map((_, index) => (
        <Clip key={index} index={index} raw={rawLayout[index]} />
      ))}
      <Playhead />
      {/* Drag surface: scrub between raw footage and the finished story. */}
      <mesh
        position={[0, 0.1, 1.6]}
        onPointerDown={(event) => {
          event.stopPropagation();
          (event.target as Element | null)?.setPointerCapture?.(event.pointerId);
          drag.current = { x: event.point.x, progress: introStore.getState().storyProgress };
          userScrubbed.current = true;
          markInteracted();
          introStore.setState({ storyDragging: true });
          document.body.style.cursor = "grabbing";
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const progress = THREE.MathUtils.clamp(drag.current.progress + (event.point.x - drag.current.x) / 5.5, 0, 1);
          introStore.setState({ storyProgress: progress });
        }}
        onPointerUp={(event) => {
          (event.target as Element | null)?.releasePointerCapture?.(event.pointerId);
          drag.current = null;
          introStore.setState({ storyDragging: false });
          document.body.style.cursor = "";
        }}
        onPointerOver={() => { document.body.style.cursor = "grab"; }}
        onPointerOut={() => { if (!drag.current) document.body.style.cursor = ""; }}
      >
        <planeGeometry args={[11, 4.6]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}
