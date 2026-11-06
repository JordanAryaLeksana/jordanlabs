"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Image as ImagePlane, Line } from "@react-three/drei";
import * as THREE from "three";
import { introStore, markInteracted } from "@/lib/intro/introStore";
import { cameraState } from "@/components/interfaces/intro3d/cameraState";
import { glowColor, roundedRectOutline } from "@/components/interfaces/intro3d/shapes";
import { PALETTE, STATION_POSITIONS, damp, seededRandom, stationPresence } from "@/components/interfaces/intro3d/world";

const NAME = "JORDAN";
const NAME_WIDTH = 4.7;
const NAME_OFFSET_X = -0.45;
const NAME_PLANE_Z = 0.9;
const CARD_WIDTH = 2.05;
const CARD_HEIGHT = 2.45;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uTilt;
  uniform vec3 uMouse;
  uniform float uMouseStrength;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute vec3 aGalaxy;   // radius, angle, height
  attribute vec3 aText;
  attribute float aRandom;
  varying float vRandom;
  varying float vAlpha;

  void main() {
    float radius = aGalaxy.x;
    float angle = aGalaxy.y + uTime * (0.32 / (0.45 + radius * 0.35));
    vec3 galaxy = vec3(cos(angle) * radius, aGalaxy.z + sin(uTime * 0.7 + aRandom * 6.2831) * 0.04, sin(angle) * radius);
    float c = cos(uTilt);
    float s = sin(uTilt);
    galaxy = vec3(galaxy.x, galaxy.y * c - galaxy.z * s, galaxy.y * s + galaxy.z * c);

    float delay = aRandom * 0.42;
    float m = smoothstep(delay, delay + 0.58, uMorph);
    vec3 wobble = vec3(sin(uTime * 1.3 + aRandom * 40.0), cos(uTime * 1.1 + aRandom * 31.0), 0.0) * 0.012;
    vec3 pos = mix(galaxy, aText + wobble, m);

    vec2 toPoint = pos.xy - uMouse.xy;
    float dist = length(toPoint);
    float force = uMouseStrength * smoothstep(1.35, 0.0, dist);
    pos.xy += normalize(toPoint + 0.0001) * force * 0.75;
    pos.z += force * 0.4;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * uPixelRatio * (0.55 + aRandom * 0.9) * (1.0 + m * 0.25) / -mvPosition.z;
    vRandom = aRandom;
    vAlpha = mix(0.55, 1.0, m);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uOpacity;
  varying float vRandom;
  varying float vAlpha;

  void main() {
    vec2 centered = gl_PointCoord - 0.5;
    float d = length(centered);
    if (d > 0.5) discard;
    float strength = pow(1.0 - d * 2.0, 2.4);
    vec3 color = vRandom < 0.55 ? mix(uColorA, uColorB, vRandom / 0.55) : mix(uColorB, uColorC, (vRandom - 0.55) / 0.45);
    gl_FragColor = vec4(color * 1.7, strength * vAlpha * uOpacity);
  }
`;

const haloVertex = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }";
const haloFragment = "uniform vec3 uColor; uniform float uStrength; varying vec2 vUv; void main(){ float d = distance(vUv, vec2(0.5)); float a = smoothstep(0.5, 0.0, d) * uStrength; gl_FragColor = vec4(uColor * a, a); }";

/** Rasterise the name on a 2D canvas and sample its filled pixels as particle targets. */
async function sampleNamePoints(count: number) {
  const width = 1400;
  const height = 380;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const target = new Float32Array(count * 3);

  if (!context) return target;

  const family = getComputedStyle(document.documentElement).getPropertyValue("--font-space-grotesk").trim() || "sans-serif";

  try {
    await document.fonts.load(`700 120px ${family}`);
  } catch {
    // The fallback font still produces a readable name.
  }

  let fontSize = 320;
  context.font = `700 ${fontSize}px ${family}`;
  const measured = context.measureText(NAME).width;
  if (measured > width * 0.94) {
    fontSize *= (width * 0.94) / measured;
    context.font = `700 ${fontSize}px ${family}`;
  }

  context.fillStyle = "#ffffff";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(NAME, width / 2, height / 2 + fontSize * 0.04);

  const pixels = context.getImageData(0, 0, width, height).data;
  const step = 3;
  const candidates: number[] = [];

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (pixels[(y * width + x) * 4 + 3] > 140) candidates.push(x, y);
    }
  }

  const random = seededRandom(11);
  const total = candidates.length / 2;
  const scale = NAME_WIDTH / width;

  for (let index = 0; index < count; index += 1) {
    const pick = total > 0 ? Math.floor(random() * total) : 0;
    const px = (candidates[pick * 2] ?? width / 2) + (random() - 0.5) * step;
    const py = (candidates[pick * 2 + 1] ?? height / 2) + (random() - 0.5) * step;
    target[index * 3] = (px - width / 2) * scale + NAME_OFFSET_X;
    target[index * 3 + 1] = -(py - height / 2) * scale + 0.1;
    target[index * 3 + 2] = NAME_PLANE_Z + (random() - 0.5) * 0.14;
  }

  return target;
}

interface Timeline {
  morph: number;
  presence: number;
  mouse: THREE.Vector3;
  mouseStrength: number;
}

function NameGalaxy({ count, timeline }: { count: number; timeline: React.RefObject<Timeline> }) {
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const { gl } = useThree();

  const attributes = useMemo(() => {
    const random = seededRandom(3);
    const galaxy = new Float32Array(count * 3);
    const text = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 1.85 + Math.pow(random(), 0.75) * 2.75;
      galaxy[index * 3] = radius;
      galaxy[index * 3 + 1] = random() * Math.PI * 2;
      galaxy[index * 3 + 2] = (random() - 0.5) * 0.32 * (1.2 - (radius - 1.85) / 2.75);
      randoms[index] = random();
    }

    return { galaxy, text, randoms, positions };
  }, [count]);

  useEffect(() => {
    let cancelled = false;

    sampleNamePoints(count).then((points) => {
      const geometry = geometryRef.current;
      if (cancelled || !geometry) return;
      const attribute = geometry.getAttribute("aText") as THREE.BufferAttribute;
      (attribute.array as Float32Array).set(points);
      attribute.needsUpdate = true;
    });

    return () => {
      cancelled = true;
    };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uTilt: { value: 1.12 },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uMouseStrength: { value: 0 },
      uSize: { value: 52 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uOpacity: { value: 1 },
      uColorA: { value: new THREE.Color(PALETTE.coral) },
      uColorB: { value: new THREE.Color(PALETTE.mustard) },
      uColorC: { value: new THREE.Color(PALETTE.cream) },
    }),
    [gl]
  );

  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    const current = timeline.current;
    const material = materialRef.current;
    if (!current || !material) return;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uMorph.value = current.morph;
    material.uniforms.uMouse.value.copy(current.mouse);
    material.uniforms.uMouseStrength.value = current.mouseStrength * current.presence;
  });

  return (
    <points frustumCulled={false} raycast={() => null}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[attributes.positions, 3]} />
        <bufferAttribute attach="attributes-aGalaxy" args={[attributes.galaxy, 3]} />
        <bufferAttribute attach="attributes-aText" args={[attributes.text, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[attributes.randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

export function IdentityStation({ particleCount }: { particleCount: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const cardRef = useRef<THREE.Group>(null);
  const imageRef = useRef<THREE.Mesh>(null);
  const timelineStart = useRef<number | null>(null);
  const firstRunDone = useRef(false);
  const lastPulse = useRef(-1);
  const wasActive = useRef(false);
  const lastPointer = useRef(new THREE.Vector2(9, 9));
  const timeline = useRef<Timeline>({ morph: 0, presence: 0, mouse: new THREE.Vector3(99, 99, NAME_PLANE_Z), mouseStrength: 0 });
  const helpers = useRef({ raycaster: new THREE.Raycaster(), plane: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), hit: new THREE.Vector3() });
  const haloRef = useRef<THREE.ShaderMaterial>(null);
  const station = STATION_POSITIONS[0];
  const rim = useMemo(() => roundedRectOutline(CARD_WIDTH + 0.12, CARD_HEIGHT + 0.12, 0.16), []);
  const rimColor = useMemo(() => glowColor(PALETTE.coral, 2.2), []);
  const haloUniforms = useMemo(() => ({ uColor: { value: new THREE.Color(PALETTE.coral) }, uStrength: { value: 0.3 } }), []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const presence = stationPresence(cameraState.progress, 0);
    group.visible = presence > 0.01;
    timeline.current.presence = presence;
    if (!group.visible) {
      wasActive.current = false;
      return;
    }

    const { chapter, namePulse } = introStore.getState();
    const isActive = chapter === 0;
    const time = state.clock.elapsedTime;

    if ((isActive && !wasActive.current) || namePulse !== lastPulse.current) {
      timelineStart.current = time;
      lastPulse.current = namePulse;
    }
    wasActive.current = isActive;

    const local = timelineStart.current === null ? 99 : time - timelineStart.current;
    const morph = THREE.MathUtils.smoothstep(local, 0.35, 1.9) * (1 - THREE.MathUtils.smoothstep(local, 3.5, 4.9));
    if (local > 4.9) firstRunDone.current = true;
    timeline.current.morph = morph;

    // Pointer projected on the name plane, in station-local space.
    const pointerMoved = state.pointer.distanceToSquared(lastPointer.current) > 0.000004;
    lastPointer.current.copy(state.pointer);
    timeline.current.mouseStrength = damp(timeline.current.mouseStrength, pointerMoved ? 1 : 0.3, pointerMoved ? 9 : 0.9, delta);
    const { raycaster, plane, hit } = helpers.current;
    raycaster.setFromCamera(state.pointer, state.camera);
    plane.constant = -(station.z + NAME_PLANE_Z);
    if (raycaster.ray.intersectPlane(plane, hit)) {
      timeline.current.mouse.set(hit.x - station.x, hit.y - station.y, NAME_PLANE_Z);
    }

    // Portrait card arrives after the first name formation, then follows the pointer.
    const card = cardRef.current;
    if (card) {
      const arrival = firstRunDone.current ? 1 : THREE.MathUtils.smoothstep(local, 3.6, 4.7);
      card.scale.setScalar(THREE.MathUtils.lerp(0.001, 1, arrival));
      card.rotation.y = damp(card.rotation.y, state.pointer.x * 0.32, 4, delta);
      card.rotation.x = damp(card.rotation.x, -state.pointer.y * 0.22, 4, delta);
      card.position.y = Math.sin(time * 0.8) * 0.06;
      const material = imageRef.current?.material as THREE.Material | undefined;
      if (material) material.opacity = 1 - morph * 0.85;
      if (haloRef.current) haloRef.current.uniforms.uStrength.value = 0.3 + Math.sin(time * 1.4) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={station}>
      <NameGalaxy count={particleCount} timeline={timeline} />
      <group ref={cardRef} scale={0.001}>
        <mesh position={[0, 0, -0.06]} raycast={() => null}>
          <planeGeometry args={[CARD_WIDTH * 1.9, CARD_HEIGHT * 1.6]} />
          <shaderMaterial ref={haloRef} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} uniforms={haloUniforms} vertexShader={haloVertex} fragmentShader={haloFragment} />
        </mesh>
        <ImagePlane ref={imageRef} url="/foto_jordan.jpg" scale={[CARD_WIDTH, CARD_HEIGHT]} radius={0.14} transparent toneMapped={false} />
        <Line points={rim} color={rimColor} lineWidth={2} toneMapped={false} />
      </group>
      {/* Click target: tapping the galaxy re-forms the name. */}
      <mesh
        position={[0, 0, 0.2]}
        onClick={(event) => {
          event.stopPropagation();
          markInteracted();
          introStore.setState((state) => ({ namePulse: state.namePulse + 1 }));
        }}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = ""; }}
      >
        <circleGeometry args={[4.4, 48]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}
