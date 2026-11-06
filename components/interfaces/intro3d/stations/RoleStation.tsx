"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Line, Text } from "@react-three/drei";
import * as THREE from "three";
import { ROLE_CARDS } from "@/lib/config/intro";
import { introStore } from "@/lib/intro/introStore";
import { cameraState } from "@/components/interfaces/intro3d/cameraState";
import { glowColor, roundedRectOutline, roundedRectShape } from "@/components/interfaces/intro3d/shapes";
import { FONT_DISPLAY, FONT_MONO, PALETTE, STATION_POSITIONS, damp, stationPresence } from "@/components/interfaces/intro3d/world";

const STATION_INDEX = 5;
const ORBIT_RADIUS = 2.35;
const ORBIT_TILT = 0.32;
const CARD_COLORS = [PALETTE.coral, PALETTE.mustard, PALETTE.sage, PALETTE.slate] as const;

type RoleCard = (typeof ROLE_CARDS)[number];

const coreVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 world = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-world.xyz);
    gl_Position = projectionMatrix * world;
  }
`;

const coreFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uInner;
  uniform vec3 uRim;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float fresnel = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
    float pulse = 0.85 + 0.15 * sin(uTime * 2.0);
    vec3 color = mix(uInner * 0.55, uRim, fresnel) * pulse;
    gl_FragColor = vec4(color, 0.95);
  }
`;

function Card({ role, index, onSelect }: { role: RoleCard; index: number; onSelect: (role: RoleCard) => void }) {
  const ref = useRef<THREE.Group>(null);
  const hovered = useRef(false);
  const scale = useRef(1);
  const primary = role.priority === "primary";
  const width = primary ? 2.5 : 1.95;
  const height = primary ? 1.3 : 1.02;
  const color = CARD_COLORS[index % CARD_COLORS.length];
  const shape = useMemo(() => roundedRectShape(width, height, 0.12), [width, height]);
  const outline = useMemo(() => roundedRectOutline(width, height, 0.12), [width, height]);
  const outlineColor = useMemo(() => glowColor(color, primary ? 2.6 : 1.6), [color, primary]);

  useFrame((state, delta) => {
    const group = ref.current;
    if (!group) return;
    const { hoveredRole } = introStore.getState();
    const isHovered = hoveredRole === role.id;
    const speed = hoveredRole ? 0.04 : 0.17;
    const angle = (index / ROLE_CARDS.length) * Math.PI * 2 + state.clock.elapsedTime * speed - 0.55;
    const x = Math.cos(angle) * ORBIT_RADIUS * 1.08;
    const z = Math.sin(angle) * ORBIT_RADIUS;
    group.position.set(x, -z * Math.sin(ORBIT_TILT) + (primary ? 0.1 : 0), z * Math.cos(ORBIT_TILT));
    scale.current = damp(scale.current, isHovered ? 1.14 : 1, 9, delta);
    // Cards behind the core recede so the front of the orbit reads first.
    const depth = THREE.MathUtils.mapLinear(z, -ORBIT_RADIUS, ORBIT_RADIUS, 0.78, 1);
    group.scale.setScalar(scale.current * depth);
  });

  return (
    <group ref={ref}>
      <Billboard>
        <mesh
          onPointerOver={(event) => {
            event.stopPropagation();
            hovered.current = true;
            document.body.style.cursor = "pointer";
            introStore.setState({ hoveredRole: role.id });
          }}
          onPointerOut={() => {
            hovered.current = false;
            document.body.style.cursor = "";
            if (introStore.getState().hoveredRole === role.id) introStore.setState({ hoveredRole: null });
          }}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(role);
          }}
        >
          <shapeGeometry args={[shape]} />
          <meshBasicMaterial color={PALETTE.inkPanel} transparent opacity={0.9} />
        </mesh>
        <Line points={outline} color={outlineColor} lineWidth={primary ? 2.2 : 1.4} toneMapped={false} />
        {primary ? (
          <Text font={FONT_MONO} fontSize={0.085} letterSpacing={0.12} color={color} anchorX="left" anchorY="top" position={[-width / 2 + 0.16, height / 2 - 0.14, 0.01]}>
            {"PRIORITY · " + role.type.toUpperCase()}
          </Text>
        ) : (
          <Text font={FONT_MONO} fontSize={0.075} letterSpacing={0.1} color={color} anchorX="left" anchorY="top" position={[-width / 2 + 0.14, height / 2 - 0.12, 0.01]}>
            {role.type.toUpperCase()}
          </Text>
        )}
        <Text font={FONT_DISPLAY} fontSize={primary ? 0.23 : 0.17} maxWidth={width - 0.3} lineHeight={1.05} color={PALETTE.cream} anchorX="left" anchorY="bottom" position={[-width / 2 + (primary ? 0.16 : 0.14), -height / 2 + 0.14, 0.01]}>
          {role.label}
        </Text>
      </Billboard>
    </group>
  );
}

export function RoleStation({ onSelect }: { onSelect: (role: RoleCard) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.LineSegments>(null);
  const station = STATION_POSITIONS[STATION_INDEX];
  const shellGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.05, 1)), []);
  const orbit = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let step = 0; step <= 96; step += 1) {
      const angle = (step / 96) * Math.PI * 2;
      const z = Math.sin(angle) * ORBIT_RADIUS;
      points.push(new THREE.Vector3(Math.cos(angle) * ORBIT_RADIUS * 1.08, -z * Math.sin(ORBIT_TILT), z * Math.cos(ORBIT_TILT)));
    }
    return points;
  }, []);
  const coreUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uInner: { value: glowColor(PALETTE.coral, 1.2) }, uRim: { value: glowColor(PALETTE.mustard, 2.6) } }),
    []
  );
  const coreMaterialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const presence = stationPresence(cameraState.progress, STATION_INDEX);
    group.visible = presence > 0.01;
    if (!group.visible) return;
    if (coreMaterialRef.current) coreMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (shellRef.current) {
      shellRef.current.rotation.y += delta * 0.25;
      shellRef.current.rotation.x += delta * 0.1;
    }
    group.rotation.x = damp(group.rotation.x, -state.pointer.y * 0.08, 3, delta);
    group.rotation.y = damp(group.rotation.y, state.pointer.x * 0.12, 3, delta);
  });

  return (
    <group ref={groupRef} position={[station.x - 0.9, station.y, station.z]}>
      <mesh raycast={() => null}>
        <sphereGeometry args={[0.62, 48, 48]} />
        <shaderMaterial ref={coreMaterialRef} uniforms={coreUniforms} vertexShader={coreVertex} fragmentShader={coreFragment} transparent toneMapped={false} />
      </mesh>
      <lineSegments ref={shellRef} geometry={shellGeometry} raycast={() => null}>
        <lineBasicMaterial color={glowColor(PALETTE.sage, 1.8)} toneMapped={false} transparent opacity={0.8} />
      </lineSegments>
      <Line points={orbit} color={glowColor(PALETTE.cream, 0.5)} lineWidth={1} transparent opacity={0.35} toneMapped={false} />
      {ROLE_CARDS.map((role, index) => (
        <Card key={role.id} role={role} index={index} onSelect={onSelect} />
      ))}
    </group>
  );
}
