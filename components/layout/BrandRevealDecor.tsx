"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SplitCard } from "@/components/retro/SplitCard";
import { NestedFrame } from "@/components/retro/NestedFrame";
import { ColorBlockBar } from "@/components/retro/ColorBlockBar";
import { HexGrid } from "@/components/retro/HexGrid";
import { SeatGrid } from "@/components/retro/SeatGrid";
import { DiagonalStripes } from "@/components/retro/DiagonalStripes";
import { SamsanTechBadge } from "@/components/scenes/SamsanTechBadge";
import { SandboxSwingBadge } from "@/components/scenes/SandboxSwingBadge";
import { IntroConfetti } from "@/components/layout/IntroConfetti";
import { FUNCTIONAL_EASE, STAGGER_GAP_SECONDS } from "@/components/motion/motionConfig";

/** Durasi masuk tiap kepingan dekor (fade + naik + membesar sedikit). */
const DECOR_ENTRANCE_DURATION_SECONDS = 0.35;

/** Jarak stagger antar-kepingan, setengah gap standar supaya seluruh dinding terisi cepat. */
const DECOR_STAGGER_GAP_SECONDS = STAGGER_GAP_SECONDS / 2;

/** Amplitudo gerak ambient naik-turun tiap kepingan (px) -- pergeseran blok warna aset, bukan gradient (CLAUDE.md §11). */
const DRIFT_DISTANCE_PX = 8;

/** Amplitudo goyangan rotasi ambient (derajat) di sekitar kemiringan dasar tiap kepingan. */
const DRIFT_ROTATION_DEGREES = 2;

/** Delay dasar masuknya kluster retro besar (hex/seat/stripes/badge), setelah seluruh kepingan kecil tampil. */
const CLUSTER_BASE_DELAY_SECONDS = 0.5;

/**
 * Satu kepingan dekor "dinding poster": kotak dua-warna (SplitCard) atau
 * bingkai outline kosong (NestedFrame). Posisi ditulis tetap -- bukan acak --
 * supaya render server dan klien identik, dan disusun mengelompok di sudut/
 * tepi supaya tidak menabrak wordmark di tengah maupun taburan confetti.
 */
interface DecorPieceSpec {
  kind: "split" | "frame";
  positionClassName: string;
  sizeClassName: string;
  primaryColorClassName?: string;
  secondaryColorClassName?: string;
  /** Kemiringan dasar kepingan (derajat); goyangan ambient berayun di sekitar nilai ini. */
  baseRotationDegrees: number;
  driftDurationSeconds: number;
}

const DECOR_PIECES: DecorPieceSpec[] = [
  // -- kluster kiri-atas --
  { kind: "split", positionClassName: "left-[6%] top-[10%]", sizeClassName: "w-5", primaryColorClassName: "bg-coral", secondaryColorClassName: "bg-mustard", baseRotationDegrees: 4, driftDurationSeconds: 7 },
  { kind: "split", positionClassName: "left-[14%] top-[22%]", sizeClassName: "w-3", primaryColorClassName: "bg-pine", secondaryColorClassName: "bg-sage", baseRotationDegrees: -6, driftDurationSeconds: 9 },
  { kind: "frame", positionClassName: "left-[22%] top-[12%]", sizeClassName: "h-8 w-8", baseRotationDegrees: 3, driftDurationSeconds: 10 },
  // -- kluster kanan-atas --
  { kind: "split", positionClassName: "right-[8%] top-[12%]", sizeClassName: "w-4", primaryColorClassName: "bg-mustard", secondaryColorClassName: "bg-brick", baseRotationDegrees: -4, driftDurationSeconds: 8 },
  { kind: "frame", positionClassName: "right-[18%] top-[20%]", sizeClassName: "h-9 w-9", baseRotationDegrees: 5, driftDurationSeconds: 11 },
  { kind: "split", positionClassName: "right-[4%] top-[30%]", sizeClassName: "w-6", primaryColorClassName: "bg-slate", secondaryColorClassName: "bg-teal-dark", baseRotationDegrees: 2, driftDurationSeconds: 10 },
  // -- tepi kiri & kanan tengah --
  { kind: "split", positionClassName: "left-[4%] top-[48%]", sizeClassName: "w-3", primaryColorClassName: "bg-blue", secondaryColorClassName: "bg-navy", baseRotationDegrees: -5, driftDurationSeconds: 11 },
  { kind: "split", positionClassName: "right-[5%] top-[56%]", sizeClassName: "w-4", primaryColorClassName: "bg-coral", secondaryColorClassName: "bg-plum", baseRotationDegrees: 6, driftDurationSeconds: 7 },
  // -- kluster bawah --
  { kind: "split", positionClassName: "bottom-[26%] left-[11%]", sizeClassName: "w-5", primaryColorClassName: "bg-plum", secondaryColorClassName: "bg-coral", baseRotationDegrees: -3, driftDurationSeconds: 9 },
  { kind: "split", positionClassName: "bottom-[18%] right-[16%]", sizeClassName: "w-5", primaryColorClassName: "bg-brick", secondaryColorClassName: "bg-navy", baseRotationDegrees: 4, driftDurationSeconds: 8 },
  { kind: "split", positionClassName: "bottom-[32%] right-[8%]", sizeClassName: "w-3", primaryColorClassName: "bg-sage", secondaryColorClassName: "bg-blue", baseRotationDegrees: -6, driftDurationSeconds: 6 },
  { kind: "frame", positionClassName: "bottom-[10%] left-[36%]", sizeClassName: "h-8 w-8", baseRotationDegrees: 2, driftDurationSeconds: 12 },
];

/**
 * Komponen ini digunakan sebagai lapisan dekor BrandReveal bernuansa "dinding
 * poster" drama startup yang ramai tapi tertata: taburan IntroConfetti versi
 * sparse (dikurangi supaya tidak menabrak aset lain), kepingan SplitCard/
 * NestedFrame yang mengelompok di sudut & tepi, dua ColorBlockBar, tempelan
 * SamsanTechBadge (logo tiga segitiga, ilustrasi bespoke via wrapper scenes/
 * sesuai CLAUDE.md §6a), kluster HexGrid/SeatGrid/DiagonalStripes, dan
 * SandboxSwingBadge kecil di ujung kanan-bawah sebagai watermark. Kluster
 * besar hanya tampil >= md supaya layar sempit tetap bersih.
 *
 * Gerakan: masuk berjenjang (fade + naik + pop), lalu tiap kepingan bergeser
 * ambient sangat lambat (naik-turun + goyangan rotasi halus di sekitar
 * kemiringan dasarnya) -- pergeseran blok warna solid sesuai §11, bukan
 * gradient/glow. prefers-reduced-motion merender semuanya statis.
 */
export function BrandRevealDecor() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <IntroConfetti density="sparse" />
      {DECOR_PIECES.map((piece, index) => (
        <motion.div
          key={index}
          className={`absolute ${piece.positionClassName}`}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12, scale: prefersReducedMotion ? 1 : 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : DECOR_ENTRANCE_DURATION_SECONDS,
            delay: prefersReducedMotion ? 0 : index * DECOR_STAGGER_GAP_SECONDS,
            ease: FUNCTIONAL_EASE,
          }}
        >
          <motion.div
            initial={{ rotate: piece.baseRotationDegrees }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, -DRIFT_DISTANCE_PX, 0],
                    rotate: [
                      piece.baseRotationDegrees - DRIFT_ROTATION_DEGREES,
                      piece.baseRotationDegrees + DRIFT_ROTATION_DEGREES,
                      piece.baseRotationDegrees - DRIFT_ROTATION_DEGREES,
                    ],
                  }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: piece.driftDurationSeconds, repeat: Infinity, ease: "easeInOut" }
            }
          >
            {piece.kind === "split" ? (
              <SplitCard
                className={piece.sizeClassName}
                primaryColorClassName={piece.primaryColorClassName}
                secondaryColorClassName={piece.secondaryColorClassName}
              />
            ) : (
              <NestedFrame className={piece.sizeClassName} frameCount={2} focusIndex={-1} />
            )}
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        className="absolute left-6 top-8 w-32 md:left-12"
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : DECOR_ENTRANCE_DURATION_SECONDS,
          delay: prefersReducedMotion ? 0 : DECOR_PIECES.length * DECOR_STAGGER_GAP_SECONDS,
          ease: FUNCTIONAL_EASE,
        }}
      >
        <ColorBlockBar barColorClassName="bg-slate" tileColorClassName="bg-cream-shape" />
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-[14%] hidden w-40 sm:block"
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : DECOR_ENTRANCE_DURATION_SECONDS,
          delay: prefersReducedMotion ? 0 : (DECOR_PIECES.length + 1) * DECOR_STAGGER_GAP_SECONDS,
          ease: FUNCTIONAL_EASE,
        }}
      >
        <ColorBlockBar barColorClassName="bg-brick" tileColorClassName="bg-pine" />
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-6 origin-bottom-left scale-[0.45]"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : DECOR_ENTRANCE_DURATION_SECONDS,
          delay: prefersReducedMotion ? 0 : CLUSTER_BASE_DELAY_SECONDS,
          ease: FUNCTIONAL_EASE,
        }}
      >
        <HexGrid count={5} className="w-72" />
      </motion.div>

      <motion.div
        className="absolute right-[7%] top-[44%] hidden w-28 md:block"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : DECOR_ENTRANCE_DURATION_SECONDS,
          delay: prefersReducedMotion ? 0 : CLUSTER_BASE_DELAY_SECONDS + STAGGER_GAP_SECONDS,
          ease: FUNCTIONAL_EASE,
        }}
      >
        <SeatGrid columns={6} count={12} />
      </motion.div>

      <motion.div
        className="absolute bottom-[40%] left-[3%] hidden md:block"
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : DECOR_ENTRANCE_DURATION_SECONDS,
          delay: prefersReducedMotion ? 0 : CLUSTER_BASE_DELAY_SECONDS + STAGGER_GAP_SECONDS * 2,
          ease: FUNCTIONAL_EASE,
        }}
      >
        <DiagonalStripes className="h-16 w-24" stripeColorClassNames={["bg-red", "bg-mustard"]} stripeCount={4} />
      </motion.div>

      <motion.div
        className="absolute left-[9%] top-[32%] hidden w-20 md:block lg:w-24"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: prefersReducedMotion ? 1 : 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : DECOR_ENTRANCE_DURATION_SECONDS,
          delay: prefersReducedMotion ? 0 : CLUSTER_BASE_DELAY_SECONDS + STAGGER_GAP_SECONDS * 3,
          ease: FUNCTIONAL_EASE,
        }}
      >
        <motion.div
          initial={{ rotate: -2 }}
          animate={prefersReducedMotion ? undefined : { y: [0, -DRIFT_DISTANCE_PX / 2, 0] }}
          transition={prefersReducedMotion ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <SamsanTechBadge />
        </motion.div>
      </motion.div>

      {/* Watermark: sengaja tanpa gerak ambient dan paling terakhir masuk -- penanda sudut yang tenang, bukan kepingan dinding. */}
      <motion.div
        className="absolute bottom-3 right-3 w-10 opacity-90 md:bottom-4 md:right-4 md:w-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{
          duration: prefersReducedMotion ? 0 : DECOR_ENTRANCE_DURATION_SECONDS,
          delay: prefersReducedMotion ? 0 : CLUSTER_BASE_DELAY_SECONDS + STAGGER_GAP_SECONDS * 4,
          ease: FUNCTIONAL_EASE,
        }}
      >
        <SandboxSwingBadge />
      </motion.div>
    </div>
  );
}

/**
 * Langkah berikutnya (CLAUDE.md §9):
 * - Selesai: dinding dirapikan -- seluruh PaperNote & PreviewCard/TrianglePeaks
 *   dihapus, kepingan dikurangi jadi 12 dan dikelompokkan di sudut/tepi,
 *   confetti diturunkan ke varian sparse, SamsanTechBadge (logo tiga segitiga
 *   dari file ilustrasi) dipasang kiri-tengah, SandboxSwingBadge jadi
 *   watermark statis di ujung kanan-bawah, dan gerak ambient ditambah goyangan
 *   rotasi halus supaya dinding terasa hidup.
 * - Belum: komposisi baru belum dicek mata di ~375px, ~768px, dan ~1440px;
 *   jarak watermark dengan ColorBlockBar brick di layar sempit belum
 *   divalidasi.
 * - Langkah berikutnya: amati /?freezeIntro=brand di beberapa ukuran viewport,
 *   geser positionClassName yang masih terasa bertabrakan.
 */
