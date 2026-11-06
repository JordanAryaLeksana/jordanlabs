"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import * as THREE from "three";
import { glowColor } from "@/components/interfaces/intro3d/shapes";
import { PALETTE, STATION_POSITIONS, seededRandom } from "@/components/interfaces/intro3d/world";

const streamVertex = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }";

const streamFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;
  void main() {
    float dash = smoothstep(0.35, 0.5, fract(vUv.x * 140.0 - uTime * 0.9)) * (1.0 - smoothstep(0.5, 0.65, fract(vUv.x * 140.0 - uTime * 0.9)));
    vec3 color = mix(uColorA, uColorB, vUv.x);
    gl_FragColor = vec4(color, 0.25 + dash * 0.75);
  }
`;

/** A glowing data stream linking the stations, with packets travelling along it. */
function DataStream({ packets }: { packets: number }) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(STATION_POSITIONS.map((station) => station.clone().add(new THREE.Vector3(0, -2.15, -0.6))), false, "centripetal"),
    []
  );
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 400, 0.018, 6, false), [curve]);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uColorA: { value: glowColor(PALETTE.coral, 2.2) }, uColorB: { value: glowColor(PALETTE.mustard, 2.2) } }), []);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const packetRef = useRef<THREE.InstancedMesh>(null);
  const offsets = useMemo(() => {
    const random = seededRandom(5);
    return Array.from({ length: packets }, () => ({ offset: random(), speed: 0.012 + random() * 0.02 }));
  }, [packets]);
  const dummy = useRef(new THREE.Object3D());

  useFrame((state) => {
    if (materialRef.current) materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    const mesh = packetRef.current;
    if (!mesh) return;
    const object = dummy.current;
    offsets.forEach(({ offset, speed }, index) => {
      const u = (offset + state.clock.elapsedTime * speed) % 1;
      curve.getPointAt(u, object.position);
      object.updateMatrix();
      mesh.setMatrixAt(index, object.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <mesh geometry={tube} raycast={() => null}>
        <shaderMaterial ref={materialRef} uniforms={uniforms} vertexShader={streamVertex} fragmentShader={streamFragment} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <instancedMesh ref={packetRef} args={[undefined, undefined, packets]} raycast={() => null} frustumCulled={false}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshBasicMaterial color={glowColor(PALETTE.cream, 3)} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

/** Slow-drifting dust that gives the camera flight a sense of depth. */
function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const random = seededRandom(9);
    const array = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      array[index * 3] = -26 + random() * 56;
      array[index * 3 + 1] = -7 + random() * 18;
      array[index * 3 + 2] = -78 + random() * 92;
    }
    return array;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.004;
  });

  return (
    <points ref={ref} raycast={() => null} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} sizeAttenuation color={PALETTE.cream} transparent opacity={0.45} depthWrite={false} />
    </points>
  );
}

export function WorldBackdrop({ quality }: { quality: "high" | "low" }) {
  return (
    <>
      <color attach="background" args={[PALETTE.ink]} />
      <fog attach="fog" args={[PALETTE.ink, 10, 31]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[-6, 10, 8]} intensity={1.6} color="#fff4e2" />
      <directionalLight position={[8, -2, -6]} intensity={0.5} color={PALETTE.coral} />
      <Grid
        position={[0, -3.1, -30]}
        args={[10, 10]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#23232d"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#34343f"
        fadeDistance={34}
        fadeStrength={1.6}
        infiniteGrid
        followCamera
      />
      <DataStream packets={quality === "high" ? 36 : 16} />
      <Dust count={quality === "high" ? 2200 : 900} />
    </>
  );
}
