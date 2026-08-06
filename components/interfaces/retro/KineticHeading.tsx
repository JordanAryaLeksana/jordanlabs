"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { RETRO_BOUNCE_EASE } from "@/components/interfaces/motion/motionConfig";

const UNDERLINE_DRAW_DURATION_SECONDS = 0.5;

/** Cerminan durasi @keyframes kinetic-reveal di globals.css (0.6s) -- dipakai timer fallback di bawah. */
const KINETIC_REVEAL_DURATION_MS = 600;

interface KineticHeadingProps {
  text: string;
  colorClassNames?: string[];
  staggerMs?: number;
  /** Bila diisi (>0), tiap huruf digeser naik bertahap sebesar nilai ini per indeks -- baseline menanjak ke kanan sebagai motif pertumbuhan (BrandReveal). */
  risePerCharPx?: number;
  underline?: boolean;
  underlineColorClassName?: string;
  /** Kelas tambahan untuk elemen svg garis bawah -- dipakai mis. memiringkan garis (-rotate-*) supaya mengikuti baseline wordmark yang menanjak. */
  underlineClassName?: string;
  className?: string;
  /** Dipakai untuk menimpa render karakter tertentu (mis. mengubah satu glyph jadi motif ikon), sisanya tetap memakai render default. */
  renderChar?: (character: string, index: number, colorClassName: string) => ReactNode;
  /** Dipanggil saat animasi reveal huruf TERAKHIR benar-benar selesai (onAnimationEnd), bukan lewat perkiraan durasi -- dipakai pemanggil untuk merangkai animasi berikutnya (CLAUDE.md §11). */
  onRevealComplete?: () => void;
  /** Dipanggil saat animasi tarikan garis bawah (pathLength 0->1) selesai; hanya relevan bila underline=true. */
  onUnderlineComplete?: () => void;
}

const DEFAULT_COLORS = ["text-coral", "text-mustard", "text-pine", "text-slate", "text-brick"];

export function KineticHeading({
  text,
  colorClassNames = DEFAULT_COLORS,
  staggerMs = 60,
  risePerCharPx = 0,
  underline = false,
  underlineColorClassName = "stroke-coral",
  underlineClassName,
  className,
  renderChar,
  onRevealComplete,
  onUnderlineComplete,
}: KineticHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isRevealComplete, setIsRevealComplete] = useState(false);
  const lastCharIndex = text.length - 1;

  // Ref dipakai supaya penyelesaian reveal hanya dilaporkan SEKALI, dari jalur
  // mana pun yang lebih dulu tiba (animationend, timer fallback, atau
  // prefers-reduced-motion).
  const hasNotifiedRevealRef = useRef(false);

  function notifyRevealComplete() {
    if (hasNotifiedRevealRef.current) return;
    hasNotifiedRevealRef.current = true;
    setIsRevealComplete(true);
    onRevealComplete?.();
  }

  // Timer fallback penyelesaian reveal. Diperlukan karena animasi CSS huruf
  // sudah berjalan sejak halaman ter-paint (komponen ini ikut di-render
  // server), sedangkan listener onAnimationEnd baru terpasang setelah
  // hydration -- pada frasa pendek, animationend bisa terlanjur lewat sebelum
  // listener ada dan urutan intro macet. Timer dimulai saat effect mount
  // (>= mulainya animasi), jadi tidak pernah menembak terlalu dini; bila
  // animationend sempat tertangkap lebih dulu, ref di atas mencegah dobel.
  // Pada prefers-reduced-motion animasi dimatikan (motion-reduce:animate-none)
  // dan reveal dianggap langsung selesai.
  useEffect(() => {
    if (prefersReducedMotion) {
      notifyRevealComplete();
      return;
    }

    const revealTotalMs = text.length * staggerMs + KINETIC_REVEAL_DURATION_MS;
    const fallbackTimeoutId = setTimeout(notifyRevealComplete, revealTotalMs);
    return () => clearTimeout(fallbackTimeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- notifyRevealComplete stabil secara efektif (ref-guarded); deps cukup pemicu ulang yang relevan.
  }, [prefersReducedMotion, text, staggerMs]);

  function handleCharAnimationEnd(index: number) {
    if (index !== lastCharIndex) return;
    notifyRevealComplete();
  }

  return (
    <span className={cn("inline-flex flex-col", className)}>
      <span className="inline-flex flex-wrap">
        {text.split("").map((character, index) => {
          const colorClassName = colorClassNames[index % colorClassNames.length];

          return (
            <span
              key={index}
              className={cn("relative animate-kinetic-reveal motion-reduce:animate-none", colorClassName)}
              style={{
                animationDelay: `${index * staggerMs}ms`,
                whiteSpace: character === " " ? "pre" : undefined,
                // Offset menanjak dipasang lewat `top` (bukan transform) supaya tidak
                // bertabrakan dengan transform milik animasi kinetic-reveal.
                top: risePerCharPx > 0 ? `${-index * risePerCharPx}px` : undefined,
              }}
              onAnimationEnd={() => handleCharAnimationEnd(index)}
            >
              {renderChar ? renderChar(character, index, colorClassName) : character}
            </span>
          );
        })}
      </span>
      {underline ? (
        <svg viewBox="0 0 100 6" preserveAspectRatio="none" className={cn("mt-1 h-1.5 w-full", underlineClassName)}>
          <motion.line
            x1={0}
            y1={3}
            x2={100}
            y2={3}
            strokeWidth={4}
            className={underlineColorClassName}
            initial={{ pathLength: 0 }}
            // Tarikan garis baru dimulai setelah reveal huruf terakhir selesai
            // (perbaikan bug: delay perkiraan lama tidak menghitung durasi animasi per huruf).
            animate={{ pathLength: isRevealComplete ? 1 : 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : UNDERLINE_DRAW_DURATION_SECONDS,
              ease: RETRO_BOUNCE_EASE,
            }}
            onAnimationComplete={() => {
              if (isRevealComplete) onUnderlineComplete?.();
            }}
          />
        </svg>
      ) : null}
    </span>
  );
}
