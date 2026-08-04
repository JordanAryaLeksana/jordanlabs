"use client";

import { useEffect, useState, type ReactNode } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "framer-motion";

interface LottieSceneProps {
  /** Path file Lottie (.json/.lottie) di public/lottie/, disiapkan pemilik (CLAUDE.md §6, §8). */
  src: string;
  /** Ditampilkan kalau prefers-reduced-motion aktif, atau selagi file di `src` belum ada. */
  fallback?: ReactNode;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

/**
 * Wrapper generik untuk adegan animasi berat. Komponen ini tidak menggambar
 * ilustrasinya sendiri (itu tugas file Lottie yang disiapkan pemilik) — ia
 * hanya memutar file di `src`, dan jatuh ke `fallback` kalau filenya belum
 * ada atau pengunjung minta gerak minimal.
 */
export function LottieScene({ src, fallback = null, loop = true, autoplay = true, className }: LottieSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isAssetAvailable, setIsAssetAvailable] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    fetch(src, { method: "HEAD" })
      .then((response) => {
        if (!isCancelled) setIsAssetAvailable(response.ok);
      })
      .catch(() => {
        if (!isCancelled) setIsAssetAvailable(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [src]);

  if (prefersReducedMotion || !isAssetAvailable) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div className={className}>
      <DotLottieReact src={src} loop={loop} autoplay={autoplay} />
    </div>
  );
}
