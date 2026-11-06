"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { introStore, markInteracted } from "@/lib/intro/introStore";
import { cameraState } from "@/components/interfaces/intro3d/cameraState";
import { getIndonesiaDots, getStationMarkers } from "@/components/interfaces/intro3d/indonesiaMap";
import { glowColor } from "@/components/interfaces/intro3d/shapes";
import { FONT_MONO, PALETTE, STATION_POSITIONS, damp, stationPresence } from "@/components/interfaces/intro3d/world";

const STATION_INDEX = 4;

const dotVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  varying float vShade;
  void main() {
    vec3 p = position;
    float wave = sin(p.x * 1.6 - uTime * 1.2) * 0.5 + 0.5;
    p.y += wave * 0.035;
    vShade = wave;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize / -mv.z;
  }
`;

const dotFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vShade;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(mix(uColorA, uColorB, vShade), smoothstep(0.5, 0.15, d) * 0.85);
  }
`;

const traceFragment = /* glsl */ `
  uniform float uTime;
  uniform float uSeed;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    float x = vUv.x;
    float y = 0.5 + 0.18 * sin(x * 18.0 + uTime * (1.4 + uSeed) + uSeed * 4.0) + 0.09 * sin(x * 47.0 - uTime * 2.7 + uSeed * 9.0) + 0.05 * sin(x * 97.0 + uTime * 4.0);
    float d = abs(vUv.y - y);
    float line = smoothstep(0.05, 0.0, d);
    float fade = smoothstep(0.0, 0.08, x) * smoothstep(1.0, 0.92, x);
    gl_FragColor = vec4(uColor * line, line * fade);
  }
`;

function Trace({ label, seed, color, y }: { label: string; seed: number; color: string; y: number }) {
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uSeed: { value: seed }, uColor: { value: glowColor(color, 2.2) } }), [seed, color]);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group position={[0.4, y, -1.25]}>
      <mesh raycast={() => null}>
        <planeGeometry args={[6.2, 0.42]} />
        <shaderMaterial ref={materialRef} uniforms={uniforms} vertexShader="varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }" fragmentShader={traceFragment} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <Text font={FONT_MONO} fontSize={0.12} color={color} anchorX="right" position={[-3.25, 0, 0]}>
        {label}
      </Text>
    </group>
  );
}

function Beacon({ index, position }: { index: number; position: [number, number, number] }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.MeshBasicMaterial>(null);
  const idle = useMemo(() => glowColor(PALETTE.sage, 2.4), []);
  const active = useMemo(() => glowColor(PALETTE.coral, 3.4), []);

  useFrame((state) => {
    const ring = ringRef.current;
    if (!ring) return;
    const isActive = introStore.getState().activeBeacon === index;
    const phase = ((state.clock.elapsedTime * 0.45 + index * 0.137) % 1 + 1) % 1;
    ring.scale.setScalar((isActive ? 0.5 : 0.2) + phase * (isActive ? 2.4 : 1.4));
    const material = ring.material as THREE.MeshBasicMaterial;
    material.opacity = (1 - phase) * (isActive ? 0.95 : 0.55);
    material.color.copy(isActive ? active : idle);
    coreRef.current?.color.copy(isActive ? active : idle);
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.06, 0]} raycast={() => null}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial ref={coreRef} color={idle} toneMapped={false} />
      </mesh>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} raycast={() => null}>
        <ringGeometry args={[0.1, 0.125, 40]} />
        <meshBasicMaterial transparent depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        position={[0, 0.06, 0]}
        onPointerOver={(event) => {
          event.stopPropagation();
          document.body.style.cursor = "pointer";
          introStore.setState({ activeBeacon: index });
        }}
        onPointerOut={() => {
          document.body.style.cursor = "";
          if (introStore.getState().activeBeacon === index) introStore.setState({ activeBeacon: null });
        }}
      >
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function ResearchStation() {
  const groupRef = useRef<THREE.Group>(null);
  const mapRef = useRef<THREE.Group>(null);
  const station = STATION_POSITIONS[STATION_INDEX];
  const dots = useMemo(() => getIndonesiaDots(), []);
  const markers = useMemo(() => getStationMarkers(dots), [dots]);
  const yaw = useRef(0);
  const drag = useRef<{ x: number; yaw: number } | null>(null);
  const dotUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uSize: { value: 26 }, uColorA: { value: new THREE.Color(PALETTE.slate) }, uColorB: { value: new THREE.Color(PALETTE.cream) } }),
    []
  );
  const dotMaterialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const presence = stationPresence(cameraState.progress, STATION_INDEX);
    group.visible = presence > 0.01;
    if (!group.visible) return;
    if (dotMaterialRef.current) dotMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (mapRef.current) {
      const idleSway = drag.current ? 0 : Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
      mapRef.current.rotation.y = damp(mapRef.current.rotation.y, yaw.current + idleSway + state.pointer.x * 0.06, 5, delta);
    }
  });

  return (
    <group ref={groupRef} position={station}>
      <group ref={mapRef} rotation={[0, 0, 0]} position={[-0.2, -0.85, 0.4]}>
        <group rotation={[0.62, 0, 0]}>
          <points raycast={() => null} frustumCulled={false}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[dots, 3]} />
            </bufferGeometry>
            <shaderMaterial ref={dotMaterialRef} uniforms={dotUniforms} vertexShader={dotVertex} fragmentShader={dotFragment} transparent depthWrite={false} />
          </points>
          {markers.map((position, index) => (
            <Beacon key={index} index={index} position={position} />
          ))}
          {/* Drag surface for rotating the map */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.05, 0]}
            onPointerDown={(event) => {
              event.stopPropagation();
              (event.target as Element | null)?.setPointerCapture?.(event.pointerId);
              drag.current = { x: event.clientX, yaw: yaw.current };
              markInteracted();
              document.body.style.cursor = "grabbing";
            }}
            onPointerMove={(event) => {
              if (!drag.current) return;
              yaw.current = THREE.MathUtils.clamp(drag.current.yaw + (event.clientX - drag.current.x) * 0.006, -0.8, 0.8);
            }}
            onPointerUp={(event) => {
              (event.target as Element | null)?.releasePointerCapture?.(event.pointerId);
              drag.current = null;
              document.body.style.cursor = "";
            }}
          >
            <planeGeometry args={[8.6, 3.6]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
      <Trace label="H" seed={0.2} color={PALETTE.coral} y={1.95} />
      <Trace label="D" seed={1.3} color={PALETTE.mustard} y={1.45} />
      <Trace label="Z" seed={2.4} color={PALETTE.sage} y={0.95} />
      <Text font={FONT_MONO} fontSize={0.1} color={PALETTE.cream} fillOpacity={0.6} anchorX="left" position={[-2.85, 2.45, -1.25]}>
        GEOMAGNETIC COMPONENTS · PC3 BAND · ILLUSTRATIVE STATION MAP
      </Text>
    </group>
  );
}
