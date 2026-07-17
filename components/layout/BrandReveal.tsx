"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Typography } from "@/components/ui/Typography/Typography";
import { KineticHeading } from "@/components/retro/KineticHeading";
import { NestedFrame } from "@/components/retro/NestedFrame";
import { BrandRevealDecor } from "@/components/layout/BrandRevealDecor";
import { renderBrandWordmarkChar } from "@/components/layout/renderBrandWordmarkChar";
import { HoverLift } from "@/components/motion/HoverLift";
import { ENTRANCE_DURATION_SECONDS, FUNCTIONAL_EASE } from "@/components/motion/motionConfig";
import { BRAND_SUBTITLE, BRAND_WORDMARK, INTRO_CONTINUE_LABEL } from "@/lib/config/brand";

/** Kenaikan baseline per huruf (px) -- wordmark menanjak ke kanan seperti grafik pertumbuhan. */
const WORDMARK_RISE_PER_CHAR_PX = 3;

/** Jarak stagger antar-huruf wordmark (ms). */
const WORDMARK_STAGGER_MS = 90;

/** Durasi garis miring pengapit subtitle tergambar keluar dari tengah. */
const SUBTITLE_LINE_DRAW_DURATION_SECONDS = 0.45;

/**
 * Warna tiap karakter "jordan-labs", dipetakan sengaja per indeks (bukan
 * siklus default KineticHeading) supaya tanda "-" selalu merah seperti dash
 * pada title sequence referensi dan kedua "a" polygon mendapat warna hijau/biru
 * yang kontras dengan tetangganya.
 */
const WORDMARK_COLOR_CLASS_NAMES = [
  "text-sage",
  "text-yellow",
  "text-blue",
  "text-coral",
  "text-green",
  "text-mustard",
  "text-red",
  "text-terracotta",
  "text-blue",
  "text-purple",
  "text-coral",
];

/**
 * Tahapan reveal, maju satu arah dan digerakkan oleh SELESAINYA animasi tahap
 * sebelumnya (bukan perkiraan durasi): huruf wordmark muncul berjenjang ->
 * garis miring & subtitle tergambar -> tombol lanjut siap diklik.
 */
type RevealStage = "letters" | "subtitle" | "ready";

interface BrandRevealProps {
  /** Dipanggil saat tombol lanjut diklik -- pengunjung sendiri yang memutuskan masuk ke Home (Fase 2 selesai). */
  onComplete: () => void;
}

/**
 * Komponen ini digunakan untuk merender Fase 2 IntroSequence: wordmark
 * "jordan-labs" dalam huruf Aliens & Cows tipis warna-warni dengan baseline
 * menanjak -- hanya karakter "a" yang ditimpa polygon SpikeGlyphA (via
 * renderBrandWordmarkChar), sisanya tetap teks font. Di bawahnya garis miring
 * pengapit subtitle mengikuti arah tanjakan wordmark, meniru bahasa visual
 * title sequence referensi sebagai karya orisinal (CLAUDE.md §3).
 */
export function BrandReveal({ onComplete }: BrandRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState<RevealStage>("letters");

  // Pada prefers-reduced-motion seluruh tahapan dianggap langsung selesai --
  // diturunkan saat render (bukan setState di dalam efek) supaya tidak ada
  // render kaskade dan isi (termasuk tombol) tampil seketika.
  const effectiveStage: RevealStage = prefersReducedMotion ? "ready" : stage;

  const isSubtitleDrawn = effectiveStage === "subtitle" || effectiveStage === "ready";
  const isContinueVisible = effectiveStage === "ready";

  function handleLettersRevealed() {
    setStage((current) => (current === "letters" ? "subtitle" : current));
  }

  function handleSubtitleLinesDrawn() {
    setStage((current) => (current === "subtitle" ? "ready" : current));
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-ink-base">
      <BrandRevealDecor />
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 sm:gap-10">
        <Typography
          variant="big-header"
          size="5xl"
          weight="thin"
          className="uppercase tracking-[0.08em] sm:text-7xl md:text-8xl"
        >
          <span role="img" aria-label={BRAND_WORDMARK}>
            <KineticHeading
              text={BRAND_WORDMARK}
              colorClassNames={WORDMARK_COLOR_CLASS_NAMES}
              staggerMs={WORDMARK_STAGGER_MS}
              risePerCharPx={WORDMARK_RISE_PER_CHAR_PX}
              renderChar={renderBrandWordmarkChar}
              onRevealComplete={handleLettersRevealed}
            />
          </span>
        </Typography>

        {/* Garis miring di bawah wordmark: barisnya dimiringkan mengikuti baseline yang menanjak (motif garis diagonal referensi). */}
        <div className="flex w-full max-w-xs -rotate-2 items-center gap-3">
          <motion.span
            className="h-px flex-1 origin-right bg-text-on-dark/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isSubtitleDrawn ? 1 : 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : SUBTITLE_LINE_DRAW_DURATION_SECONDS,
              ease: FUNCTIONAL_EASE,
            }}
            onAnimationComplete={handleSubtitleLinesDrawn}
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isSubtitleDrawn ? 1 : 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : SUBTITLE_LINE_DRAW_DURATION_SECONDS,
              ease: FUNCTIONAL_EASE,
            }}
          >
            <Typography variant="header" size="sm" as="span" className="tracking-[0.3em] text-text-on-dark/70">
              {BRAND_SUBTITLE}
            </Typography>
          </motion.span>
          <motion.span
            className="h-px flex-1 origin-left bg-text-on-dark/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isSubtitleDrawn ? 1 : 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : SUBTITLE_LINE_DRAW_DURATION_SECONDS,
              ease: FUNCTIONAL_EASE,
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={{
            opacity: isContinueVisible ? 1 : 0,
            y: isContinueVisible || prefersReducedMotion ? 0 : 16,
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : ENTRANCE_DURATION_SECONDS,
            ease: FUNCTIONAL_EASE,
          }}
        >
          <HoverLift>
            <NestedFrame frameCount={2} focusIndex={1}>
              <button
                type="button"
                onClick={onComplete}
                disabled={!isContinueVisible}
                className="cursor-pointer px-6 py-2 focus-visible:outline-2 focus-visible:outline-frame-green disabled:cursor-default"
              >
                <Typography variant="header" size="sm" as="span" className="tracking-[0.3em] text-text-on-dark">
                  {INTRO_CONTINUE_LABEL}
                </Typography>
              </button>
            </NestedFrame>
          </HoverLift>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Langkah berikutnya (CLAUDE.md §9):
 * - Selesai: wordmark dikembalikan ke pendekatan font Aliens & Cows (thin,
 *   uppercase, warna per huruf, baseline menanjak) dengan HANYA huruf "a"
 *   sebagai polygon (SpikeGlyphA via renderBrandWordmarkChar); garis miring
 *   pengapit subtitle (-rotate-2) mengikuti tanjakan; tahap "arrow" dihapus.
 * - Belum: tinggi SpikeGlyphA (0.72em) terhadap cap height Aliens & Cows dan
 *   tabrakan spike panjang dengan garis subtitle di layar sempit belum
 *   divalidasi mata.
 * - Langkah berikutnya: buka /?freezeIntro=brand di ~375px & ~1440px, cek
 *   sejajar-tidaknya puncak SpikeGlyphA dengan huruf font, lalu uji klik
 *   tombol, keyboard focus, dan prefers-reduced-motion.
 */
