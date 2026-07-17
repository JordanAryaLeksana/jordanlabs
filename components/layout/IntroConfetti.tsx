"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { RETRO_BOUNCE_EASE } from "@/components/motion/motionConfig";

/** Durasi pop-in tiap keping confetti. */
const CONFETTI_ENTRANCE_DURATION_SECONDS = 0.3;

/** Jarak stagger antar-keping, dirapatkan supaya seluruh "dinding" terisi cepat. */
const CONFETTI_STAGGER_GAP_SECONDS = 0.035;

/** Amplitudo drift ambient naik-turun (px) -- pergeseran blok warna solid, bukan gradient (CLAUDE.md §11). */
const CONFETTI_DRIFT_DISTANCE_PX = 6;

/** Jumlah keping yang dirender pada varian "sparse" (LoadingScreen memakai versi lebih hening). */
const SPARSE_PIECE_COUNT = 18;

/**
 * Satu keping "dinding poster": memo/sticky note kecil warna aset -- ukurannya
 * dibuat beragam (bujur sangkar besar-kecil + persegi panjang) dengan rotasi
 * statis ringan seperti memo tertempel miring. Posisi ditulis tetap -- bukan
 * acak -- supaya render server dan klien identik.
 */
interface ConfettiPieceSpec {
  positionClassName: string;
  sizeClassName: string;
  colorClassName: string;
  rotationClassName: string;
  driftDurationSeconds: number;
}

const CONFETTI_PIECES: ConfettiPieceSpec[] = [
  // -- keping-keping awal juga dipakai varian "sparse": disebar merata dulu --
  { positionClassName: "left-[8%] top-[8%]", sizeClassName: "h-4 w-4", colorClassName: "bg-coral", rotationClassName: "rotate-6", driftDurationSeconds: 7 },
  { positionClassName: "left-[22%] top-[14%]", sizeClassName: "h-2 w-3.5", colorClassName: "bg-mustard", rotationClassName: "-rotate-12", driftDurationSeconds: 9 },
  { positionClassName: "left-[38%] top-[7%]", sizeClassName: "h-3 w-3", colorClassName: "bg-pine", rotationClassName: "rotate-12", driftDurationSeconds: 8 },
  { positionClassName: "left-[55%] top-[12%]", sizeClassName: "h-2 w-2", colorClassName: "bg-purple", rotationClassName: "-rotate-6", driftDurationSeconds: 10 },
  { positionClassName: "left-[70%] top-[6%]", sizeClassName: "h-4 w-3", colorClassName: "bg-yellow", rotationClassName: "rotate-3", driftDurationSeconds: 7 },
  { positionClassName: "left-[86%] top-[13%]", sizeClassName: "h-2.5 w-2.5", colorClassName: "bg-sage", rotationClassName: "-rotate-12", driftDurationSeconds: 9 },
  { positionClassName: "left-[5%] top-[30%]", sizeClassName: "h-3 w-2", colorClassName: "bg-blue", rotationClassName: "rotate-12", driftDurationSeconds: 11 },
  { positionClassName: "left-[15%] top-[44%]", sizeClassName: "h-3.5 w-3.5", colorClassName: "bg-terracotta", rotationClassName: "rotate-6", driftDurationSeconds: 8 },
  { positionClassName: "left-[90%] top-[32%]", sizeClassName: "h-4 w-4", colorClassName: "bg-brick", rotationClassName: "-rotate-6", driftDurationSeconds: 7 },
  { positionClassName: "left-[82%] top-[46%]", sizeClassName: "h-2 w-4", colorClassName: "bg-green", rotationClassName: "rotate-12", driftDurationSeconds: 10 },
  { positionClassName: "left-[10%] top-[62%]", sizeClassName: "h-2.5 w-2.5", colorClassName: "bg-plum", rotationClassName: "-rotate-3", driftDurationSeconds: 9 },
  { positionClassName: "left-[26%] top-[78%]", sizeClassName: "h-4 w-4", colorClassName: "bg-slate", rotationClassName: "rotate-6", driftDurationSeconds: 8 },
  { positionClassName: "left-[44%] top-[86%]", sizeClassName: "h-2 w-2", colorClassName: "bg-red", rotationClassName: "-rotate-12", driftDurationSeconds: 7 },
  { positionClassName: "left-[62%] top-[80%]", sizeClassName: "h-3 w-4", colorClassName: "bg-teal-dark", rotationClassName: "rotate-12", driftDurationSeconds: 11 },
  { positionClassName: "left-[78%] top-[88%]", sizeClassName: "h-2.5 w-2.5", colorClassName: "bg-coral", rotationClassName: "rotate-3", driftDurationSeconds: 9 },
  { positionClassName: "left-[92%] top-[70%]", sizeClassName: "h-4 w-3", colorClassName: "bg-mustard", rotationClassName: "-rotate-6", driftDurationSeconds: 8 },
  { positionClassName: "left-[35%] top-[20%]", sizeClassName: "h-2 w-2", colorClassName: "bg-navy", rotationClassName: "rotate-6", driftDurationSeconds: 10 },
  { positionClassName: "left-[66%] top-[22%]", sizeClassName: "h-3 w-2.5", colorClassName: "bg-cream-shape", rotationClassName: "-rotate-12", driftDurationSeconds: 7 },
  { positionClassName: "left-[3%] top-[80%]", sizeClassName: "h-3.5 w-3.5", colorClassName: "bg-yellow", rotationClassName: "rotate-12", driftDurationSeconds: 9 },
  { positionClassName: "left-[18%] top-[90%]", sizeClassName: "h-2 w-3", colorClassName: "bg-pine", rotationClassName: "-rotate-6", driftDurationSeconds: 8 },
  { positionClassName: "left-[52%] top-[93%]", sizeClassName: "h-2.5 w-2.5", colorClassName: "bg-purple", rotationClassName: "rotate-6", driftDurationSeconds: 11 },
  // -- keping tambahan di bawah hanya tampil pada varian "full" (dinding BrandReveal yang lebih ramai) --
  { positionClassName: "left-[88%] top-[92%]", sizeClassName: "h-3 w-3", colorClassName: "bg-blue", rotationClassName: "-rotate-3", driftDurationSeconds: 7 },
  { positionClassName: "left-[96%] top-[52%]", sizeClassName: "h-2 w-2", colorClassName: "bg-terracotta", rotationClassName: "rotate-12", driftDurationSeconds: 10 },
  { positionClassName: "left-[2%] top-[48%]", sizeClassName: "h-2 w-3.5", colorClassName: "bg-sage", rotationClassName: "-rotate-12", driftDurationSeconds: 9 },
  { positionClassName: "left-[30%] top-[3%]", sizeClassName: "h-2.5 w-2.5", colorClassName: "bg-brick", rotationClassName: "rotate-3", driftDurationSeconds: 8 },
  { positionClassName: "left-[48%] top-[4%]", sizeClassName: "h-3 w-3", colorClassName: "bg-slate", rotationClassName: "-rotate-6", driftDurationSeconds: 9 },
  { positionClassName: "left-[76%] top-[3%]", sizeClassName: "h-2 w-2", colorClassName: "bg-plum", rotationClassName: "rotate-6", driftDurationSeconds: 10 },
  { positionClassName: "left-[94%] top-[22%]", sizeClassName: "h-3 w-2", colorClassName: "bg-red", rotationClassName: "-rotate-12", driftDurationSeconds: 8 },
  { positionClassName: "left-[6%] top-[18%]", sizeClassName: "h-2 w-2", colorClassName: "bg-green", rotationClassName: "rotate-12", driftDurationSeconds: 11 },
  { positionClassName: "left-[40%] top-[95%]", sizeClassName: "h-2.5 w-4", colorClassName: "bg-mustard", rotationClassName: "-rotate-6", driftDurationSeconds: 7 },
];

interface IntroConfettiProps {
  /** Kepadatan taburan: "full" untuk dinding BrandReveal yang ramai, "sparse" untuk LoadingScreen yang lebih hening. */
  density?: "full" | "sparse";
  className?: string;
}

/**
 * Komponen ini digunakan sebagai taburan memo/sticky note kecil warna aset di
 * latar intro (motif dinding poster referensi): tiap keping muncul berjenjang
 * (pop-in stagger) lalu bergeser ambient sangat lambat naik-turun --
 * pergeseran blok warna solid sesuai CLAUDE.md §11, bukan gradient/glow.
 * prefers-reduced-motion merender seluruh keping statis seketika.
 */
export function IntroConfetti({ density = "full", className }: IntroConfettiProps) {
  const prefersReducedMotion = useReducedMotion();
  const pieces = density === "sparse" ? CONFETTI_PIECES.slice(0, SPARSE_PIECE_COUNT) : CONFETTI_PIECES;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {pieces.map((piece, index) => (
        <motion.div
          key={index}
          className={cn("absolute", piece.positionClassName)}
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0 }}
          animate={{ opacity: 1, scale: 1 }}
          // Pop-in memakai retro-bounce sebagai aksen playful terbatas (CLAUDE.md §11) -- keping kecil, bukan seluruh UI.
          transition={{
            duration: prefersReducedMotion ? 0 : CONFETTI_ENTRANCE_DURATION_SECONDS,
            delay: prefersReducedMotion ? 0 : index * CONFETTI_STAGGER_GAP_SECONDS,
            ease: RETRO_BOUNCE_EASE,
          }}
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -CONFETTI_DRIFT_DISTANCE_PX, 0] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: piece.driftDurationSeconds, repeat: Infinity, ease: "easeInOut" }
            }
          >
            {/* Rotasi statis ditaruh di span terdalam (bukan motion.div) supaya tidak tertimpa transform milik animasi drift. */}
            <span className={cn("block", piece.sizeClassName, piece.colorClassName, piece.rotationClassName)} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
