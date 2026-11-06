"use client";

import { Suspense, useState, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import type { ROLE_CARDS } from "@/lib/config/intro";
import { CameraRig } from "@/components/interfaces/intro3d/CameraRig";
import { WorldBackdrop } from "@/components/interfaces/intro3d/WorldBackdrop";
import { IdentityStation } from "@/components/interfaces/intro3d/stations/IdentityStation";
import { StackStation } from "@/components/interfaces/intro3d/stations/StackStation";
import { FilmStripStation } from "@/components/interfaces/intro3d/stations/FilmStripStation";
import { ImpactStation } from "@/components/interfaces/intro3d/stations/ImpactStation";
import { ResearchStation } from "@/components/interfaces/intro3d/stations/ResearchStation";
import { RoleStation } from "@/components/interfaces/intro3d/stations/RoleStation";
import { PALETTE } from "@/components/interfaces/intro3d/world";

export type IntroQuality = "high" | "low";

interface IntroCanvasProps {
  /** Element that receives pointer events (the whole intro stage, including the DOM overlay). */
  eventSource: RefObject<HTMLElement | null>;
  initialQuality: IntroQuality;
  onRoleSelect: (role: (typeof ROLE_CARDS)[number]) => void;
  onReady?: () => void;
}

/**
 * The 3D world behind the intro. Loaded with next/dynamic (ssr: false), so
 * three.js stays out of the main bundle and the chapter copy renders first.
 */
export default function IntroCanvas({ eventSource, initialQuality, onRoleSelect, onReady }: IntroCanvasProps) {
  const [quality, setQuality] = useState<IntroQuality>(initialQuality);
  const high = quality === "high";

  return (
    <Canvas
      aria-hidden="true"
      className="!absolute inset-0"
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      dpr={high ? [1, 1.75] : [1, 1.25]}
      camera={{ fov: 42, near: 0.1, far: 140, position: [-3, 0.5, 10] }}
      gl={{ antialias: !high, alpha: false, powerPreference: "high-performance", stencil: false }}
      onCreated={({ gl }) => {
        gl.setClearColor(PALETTE.ink);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        onReady?.();
      }}
    >
      <PerformanceMonitor onDecline={() => setQuality("low")} flipflops={2} onFallback={() => setQuality("low")} />
      <AdaptiveDpr pixelated={false} />
      <CameraRig />
      <WorldBackdrop quality={quality} />
      <Suspense fallback={null}>
        <IdentityStation particleCount={high ? 9000 : 4200} />
        <StackStation />
        <FilmStripStation />
        <ImpactStation />
        <ResearchStation />
        <RoleStation onSelect={onRoleSelect} />
      </Suspense>
      {high ? (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.62} luminanceSmoothing={0.22} radius={0.72} />
          <Vignette offset={0.22} darkness={0.72} eskil={false} />
        </EffectComposer>
      ) : null}
    </Canvas>
  );
}
