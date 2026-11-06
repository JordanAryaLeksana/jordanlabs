"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Trail } from "@react-three/drei";
import * as THREE from "three";
import { STACK_LAYERS } from "@/lib/config/intro";
import { introStore, markInteracted } from "@/lib/intro/introStore";
import { cameraState } from "@/components/interfaces/intro3d/cameraState";
import { glowColor } from "@/components/interfaces/intro3d/shapes";
import { FONT_DISPLAY, FONT_MONO, PALETTE, STATION_POSITIONS, damp, stationPresence } from "@/components/interfaces/intro3d/world";

const STATION_INDEX = 1;
const SLAB = { width: 3.5, height: 0.3, depth: 2.1, gap: 0.82 };

function slabY(index: number) {
  return ((STACK_LAYERS.length - 1) / 2 - index) * SLAB.gap;
}

function Slab({ index }: { index: number }) {
  const layer = STACK_LAYERS[index];
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const edgeMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(SLAB.width, SLAB.height, SLAB.depth)), []);
  const baseEdge = useMemo(() => new THREE.Color(layer.color), [layer.color]);
  const brightEdge = useMemo(() => glowColor(layer.color, 2.6), [layer.color]);
  const emissive = useMemo(() => new THREE.Color(layer.color), [layer.color]);
  const glow = useRef(0);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const { activeLayer } = introStore.getState();
    const isActive = activeLayer === layer.id;
    // The packet lights each layer as it passes through.
    const packetY = Math.cos(state.clock.elapsedTime * 1.9) * slabY(0) * 1.05;
    const passing = Math.max(0, 1 - Math.abs(packetY - slabY(index)) / 0.45);
    const target = isActive ? 1 : activeLayer ? 0.05 : 0.18 + passing * 0.55;

    glow.current = damp(glow.current, target, 7, delta);
    group.position.z = damp(group.position.z, isActive ? 0.55 : 0, 7, delta);
    group.position.x = damp(group.position.x, isActive ? -0.25 : 0, 7, delta);

    if (materialRef.current) materialRef.current.emissiveIntensity = 0.04 + glow.current * 0.5;
    if (edgeMaterialRef.current) edgeMaterialRef.current.color.copy(baseEdge).lerp(brightEdge, glow.current);
  });

  const select = () => {
    markInteracted();
    introStore.setState({ activeLayer: layer.id });
  };

  return (
    <group ref={groupRef} position={[0, slabY(index), 0]}>
      <mesh
        onPointerOver={(event) => {
          event.stopPropagation();
          document.body.style.cursor = "pointer";
          introStore.setState({ activeLayer: layer.id });
        }}
        onPointerOut={() => {
          document.body.style.cursor = "";
          if (introStore.getState().activeLayer === layer.id) introStore.setState({ activeLayer: null });
        }}
        onClick={(event) => {
          event.stopPropagation();
          select();
        }}
      >
        <boxGeometry args={[SLAB.width, SLAB.height, SLAB.depth]} />
        <meshStandardMaterial ref={materialRef} color={PALETTE.inkPanel} metalness={0.35} roughness={0.42} emissive={emissive} emissiveIntensity={0.05} transparent opacity={0.92} />
      </mesh>
      <lineSegments geometry={edges} raycast={() => null}>
        <lineBasicMaterial ref={edgeMaterialRef} color={layer.color} toneMapped={false} />
      </lineSegments>
      <Text font={FONT_DISPLAY} fontSize={0.17} letterSpacing={0.06} anchorX="left" anchorY="middle" position={[-SLAB.width / 2 + 0.16, 0, SLAB.depth / 2 + 0.006]} color={PALETTE.cream}>
        {layer.label.toUpperCase()}
      </Text>
      <Text font={FONT_MONO} fontSize={0.085} maxWidth={1.7} anchorX="right" anchorY="middle" position={[SLAB.width / 2 - 0.16, 0, SLAB.depth / 2 + 0.006]} color={layer.color} fillOpacity={0.9}>
        {layer.face.join(" · ")}
      </Text>
    </group>
  );
}

function DataPacket() {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = useMemo(() => glowColor(PALETTE.mustard, 4), []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = state.clock.elapsedTime * 1.9;
    // Request goes down the stack, response comes back up on the other side.
    mesh.position.set(Math.sin(time) * 1.15, Math.cos(time) * slabY(0) * 1.05, SLAB.depth / 2 - 0.4);
  });

  return (
    <Trail width={0.9} length={5} color={glowColor(PALETTE.mustard, 2)} attenuation={(width) => width * width}>
      <mesh ref={meshRef} raycast={() => null}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </Trail>
  );
}

export function StackStation() {
  const groupRef = useRef<THREE.Group>(null);
  const station = STATION_POSITIONS[STATION_INDEX];

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const presence = stationPresence(cameraState.progress, STATION_INDEX);
    group.visible = presence > 0.01;
    if (!group.visible) return;

    group.rotation.y = damp(group.rotation.y, -0.62 + state.pointer.x * 0.12, 3, delta);
    group.rotation.x = damp(group.rotation.x, 0.4 - state.pointer.y * 0.06, 3, delta);
    const spread = THREE.MathUtils.smoothstep(presence, 0.35, 1);
    group.scale.setScalar(0.82 + spread * 0.18);
    group.position.y = station.y + Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
  });

  return (
    <group ref={groupRef} position={station} rotation={[0.4, -0.62, 0]}>
      {STACK_LAYERS.map((layer, index) => (
        <Slab key={layer.id} index={index} />
      ))}
      <DataPacket />
      <mesh position={[0, 0, 0]} raycast={() => null}>
        <cylinderGeometry args={[0.012, 0.012, slabY(0) * 2 + 0.6, 6]} />
        <meshBasicMaterial color={glowColor(PALETTE.cream, 0.6)} toneMapped={false} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}
