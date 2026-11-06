"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";
import { introStore, markInteracted } from "@/lib/intro/introStore";
import { cameraState } from "@/components/interfaces/intro3d/cameraState";
import { glowColor } from "@/components/interfaces/intro3d/shapes";
import { FONT_MONO, PALETTE, STATION_POSITIONS, damp, seededRandom, stationPresence } from "@/components/interfaces/intro3d/world";

const STATION_INDEX = 3;
const THRESHOLD = 0.66;

/* ---------------- shared: live sensor waveform ---------------- */

const waveVertex = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }";

const waveFragment = /* glsl */ `
  uniform float uTime;
  uniform float uThreshold;
  uniform vec3 uLine;
  uniform vec3 uAlert;
  uniform vec3 uRule;
  varying vec2 vUv;

  float spikeCenter(float t) { return 1.15 - fract(t * 0.16) * 1.45; }

  float signal(float x, float t) {
    float base = 0.36 + 0.09 * sin(12.0 * x - 2.1 * t) + 0.045 * sin(31.0 * x - 5.3 * t) + 0.025 * sin(67.0 * x + 1.7 * t);
    float c = spikeCenter(t);
    return base + 0.5 * exp(-pow((x - c) * 26.0, 2.0));
  }

  void main() {
    float y = signal(vUv.x, uTime);
    float dy = abs(vUv.y - y);
    float line = smoothstep(0.022, 0.0, dy);
    float glow = smoothstep(0.12, 0.0, dy) * 0.25;
    vec3 color = y > uThreshold ? uAlert : uLine;

    float rule = step(abs(vUv.y - uThreshold), 0.004) * step(0.5, fract(vUv.x * 42.0));
    float grid = (step(fract(vUv.x * 12.0), 0.012) + step(fract(vUv.y * 4.0), 0.02)) * 0.06;
    float edgeFade = smoothstep(0.0, 0.06, vUv.x) * smoothstep(1.0, 0.94, vUv.x);

    vec3 rgb = color * (line + glow) + uRule * rule + vec3(grid);
    float alpha = clamp((line + glow + rule * 0.9 + grid) * edgeFade, 0.0, 1.0);
    gl_FragColor = vec4(rgb, alpha);
  }
`;

/** Same math as the shader, so the 3D pump can react to the spike. */
function spikeCenter(time: number) {
  return 1.15 - (((time * 0.16) % 1) + 1) % 1 * 1.45;
}

function SensorWave({ width, height, position }: { width: number; height: number; position: [number, number, number] }) {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uThreshold: { value: THRESHOLD },
      uLine: { value: glowColor(PALETTE.sage, 2) },
      uAlert: { value: glowColor(PALETTE.coral, 3) },
      uRule: { value: glowColor(PALETTE.mustard, 1.6) },
    }),
    []
  );

  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh position={position} raycast={() => null}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial ref={materialRef} uniforms={uniforms} vertexShader={waveVertex} fragmentShader={waveFragment} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

/* ---------------- Pertamina: solvent pump ---------------- */

function Pump() {
  const sealRef = useRef<THREE.MeshBasicMaterial>(null);
  const ok = useMemo(() => glowColor(PALETTE.sage, 2.2), []);
  const alert = useMemo(() => glowColor(PALETTE.coral, 3.4), []);
  const metal = { color: "#8a93a6", metalness: 0.35, roughness: 0.38 } as const;

  useFrame((state) => {
    const center = spikeCenter(state.clock.elapsedTime);
    const alerting = center > 0.1 && center < 0.98;
    if (sealRef.current) sealRef.current.color.copy(alerting ? alert : ok);
  });

  return (
    <group position={[0, -0.55, 0]}>
      <mesh position={[0, -0.62, 0]}>
        <boxGeometry args={[3.4, 0.16, 1.4]} />
        <meshStandardMaterial color={PALETTE.inkRaised} metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Motor with cooling fins */}
      <mesh position={[-0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.46, 0.46, 1.45, 32]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      {Array.from({ length: 7 }, (_, index) => (
        <mesh key={index} position={[-1.55 + index * 0.2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.47, 0.022, 8, 40]} />
          <meshStandardMaterial color="#a3abbb" metalness={0.35} roughness={0.35} />
        </mesh>
      ))}
      {/* Coupling and mechanical seal */}
      <mesh position={[-0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 0.4, 20]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <mesh position={[0.2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.24, 0.05, 12, 40]} />
        <meshBasicMaterial ref={sealRef} color={ok} toneMapped={false} />
      </mesh>
      {/* Volute casing, discharge and suction pipes */}
      <mesh position={[0.72, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.36, 0.2, 16, 40]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <mesh position={[0.72, 0.85, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 1.25, 20]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <mesh position={[0.72, 1.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.17, 0.04, 10, 30]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <mesh position={[1.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.13, 0.13, 1.0, 20]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <SensorWave width={4.6} height={1.25} position={[0, 2.35, 0.1]} />
      <Text font={FONT_MONO} fontSize={0.1} color={PALETTE.mustard} anchorX="left" position={[-2.25, 3.08, 0.1]}>
        LSTM AUTOENCODER · RECONSTRUCTION ERROR
      </Text>
    </group>
  );
}

/* ---------------- TETA: rice field with IoT nodes ---------------- */

const NODE_POSITIONS: readonly [number, number, number][] = [
  [-2.1, 0, 0.8],
  [-0.9, 0, -0.7],
  [0.4, 0, 0.9],
  [1.6, 0, -0.5],
  [2.4, 0, 0.7],
];
const GATEWAY: [number, number, number] = [0.2, 0, -1.6];

function Pulse({ position, delay }: { position: [number, number, number]; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const phase = ((state.clock.elapsedTime * 0.55 + delay) % 1 + 1) % 1;
    mesh.scale.setScalar(0.25 + phase * 1.6);
    (mesh.material as THREE.MeshBasicMaterial).opacity = (1 - phase) * 0.7;
    mesh.quaternion.copy(state.camera.quaternion);
  });

  return (
    <mesh ref={ref} position={position} raycast={() => null}>
      <ringGeometry args={[0.32, 0.36, 48]} />
      <meshBasicMaterial color={glowColor(PALETTE.sage, 2.2)} transparent toneMapped={false} depthWrite={false} />
    </mesh>
  );
}

function Field() {
  const scanRef = useRef<THREE.Group>(null);
  const tufts = useMemo(() => {
    const random = seededRandom(31);
    const matrices: THREE.Matrix4[] = [];
    const dummy = new THREE.Object3D();
    for (let row = 0; row < 14; row += 1) {
      for (let column = 0; column < 30; column += 1) {
        dummy.position.set(-3 + column * 0.205 + (random() - 0.5) * 0.05, -0.92, -1.75 + row * 0.26);
        dummy.rotation.set((random() - 0.5) * 0.3, random() * Math.PI, (random() - 0.5) * 0.3);
        dummy.scale.setScalar(0.7 + random() * 0.5);
        dummy.updateMatrix();
        matrices.push(dummy.matrix.clone());
      }
    }
    return matrices;
  }, []);
  const tuftRef = useRef<THREE.InstancedMesh>(null);
  const tuftsReady = useRef(false);

  useFrame((state) => {
    if (tuftRef.current && !tuftsReady.current) {
      tufts.forEach((matrix, index) => tuftRef.current?.setMatrixAt(index, matrix));
      tuftRef.current.instanceMatrix.needsUpdate = true;
      tuftsReady.current = true;
    }
    if (scanRef.current) scanRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.9;
  });

  return (
    <group position={[0, -0.2, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.02, 0]}>
        <planeGeometry args={[6.6, 4.1]} />
        <meshStandardMaterial color="#1f3a30" roughness={0.9} />
      </mesh>
      <instancedMesh ref={tuftRef} args={[undefined, undefined, tufts.length]} raycast={() => null}>
        <coneGeometry args={[0.035, 0.3, 5]} />
        <meshStandardMaterial color={PALETTE.pine} roughness={0.8} emissive={PALETTE.pine} emissiveIntensity={0.15} />
      </instancedMesh>
      {NODE_POSITIONS.map((position, index) => (
        <group key={index} position={position}>
          <mesh position={[0, -0.45, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.1, 8]} />
            <meshStandardMaterial color="#9aa0ad" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.2, 0.14, 0.12]} />
            <meshStandardMaterial color="#d9d2c0" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.25, 0]} raycast={() => null}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color={glowColor(PALETTE.sage, 3)} toneMapped={false} />
          </mesh>
          <Pulse position={[0, 0.25, 0]} delay={index * 0.21} />
          <Line points={[[0, 0.25, 0], [GATEWAY[0] - position[0], 0.75, GATEWAY[2] - position[2]]]} color={glowColor(PALETTE.mustard, 1.4)} lineWidth={1.2} dashed dashSize={0.08} gapSize={0.08} transparent opacity={0.7} toneMapped={false} />
        </group>
      ))}
      <group position={GATEWAY}>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.8, 8]} />
          <meshStandardMaterial color="#9aa0ad" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.78, 0]} raycast={() => null}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={glowColor(PALETTE.mustard, 3)} toneMapped={false} />
        </mesh>
      </group>
      {/* Edge camera running bird-pest detection */}
      <group position={[-2.7, 0.2, -1.3]}>
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 1.3, 8]} />
          <meshStandardMaterial color="#9aa0ad" metalness={0.6} roughness={0.4} />
        </mesh>
        <group ref={scanRef}>
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[0.22, 0.16, 0.3]} />
            <meshStandardMaterial color="#d9d2c0" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.15, 1.15]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => null}>
            <coneGeometry args={[0.85, 2.0, 32, 1, true]} />
            <meshBasicMaterial color={glowColor(PALETTE.mustard, 1.2)} transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
          </mesh>
        </group>
      </group>
      <Text font={FONT_MONO} fontSize={0.1} color={PALETTE.sage} anchorX="left" position={[-3.2, 1.35, -1.6]}>
        5 IOT NODES · LORA → MQTT · YOLOV5 EDGE CAMERA
      </Text>
    </group>
  );
}

export function ImpactStation() {
  const groupRef = useRef<THREE.Group>(null);
  const pumpRef = useRef<THREE.Group>(null);
  const fieldRef = useRef<THREE.Group>(null);
  const mix = useRef(0);
  const station = STATION_POSITIONS[STATION_INDEX];

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const presence = stationPresence(cameraState.progress, STATION_INDEX);
    group.visible = presence > 0.01;
    if (!group.visible) return;

    const target = introStore.getState().impactMode === "teta" ? 1 : 0;
    mix.current = damp(mix.current, target, 5, delta);
    const pumpScale = Math.max(0.001, 1 - THREE.MathUtils.smoothstep(mix.current, 0, 0.6));
    const fieldScale = Math.max(0.001, THREE.MathUtils.smoothstep(mix.current, 0.4, 1));

    if (pumpRef.current) {
      pumpRef.current.scale.setScalar(pumpScale);
      pumpRef.current.visible = pumpScale > 0.01;
      pumpRef.current.rotation.y = -0.5 + state.pointer.x * 0.15 + (1 - pumpScale) * 1.2;
    }
    if (fieldRef.current) {
      fieldRef.current.scale.setScalar(fieldScale);
      fieldRef.current.visible = fieldScale > 0.01;
      fieldRef.current.rotation.y = -0.35 + state.pointer.x * 0.15 - (1 - fieldScale) * 1.2;
    }
  });

  return (
    <group ref={groupRef} position={station}>
      <group
        ref={pumpRef}
        rotation={[0.18, -0.5, 0]}
        onClick={(event) => {
          event.stopPropagation();
          markInteracted();
          introStore.setState({ impactMode: "teta" });
        }}
      >
        <Pump />
      </group>
      <group
        ref={fieldRef}
        rotation={[0.42, -0.35, 0]}
        scale={0.001}
        onClick={(event) => {
          event.stopPropagation();
          markInteracted();
          introStore.setState({ impactMode: "pertamina" });
        }}
      >
        <Field />
      </group>
    </group>
  );
}
