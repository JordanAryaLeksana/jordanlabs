import { LottieScene } from "./LottieScene";
import { DiagonalStripes } from "@/components/retro/DiagonalStripes";

interface CityscapeProps {
  className?: string;
}

/**
 * Cityscape flat (CLAUDE.md §6): ilustrasi gedung penuh adalah aset kompleks,
 * jadi TIDAK dikode di sini (dilarang §6 "jangan dikode frame-by-frame").
 * Aset asli disiapkan pemilik sebagai public/lottie/cityscape.json. Sebelum
 * file itu ada, fallback di bawah (dari komponen reusable yang sudah ada,
 * bukan ilustrasi baru) yang tampil.
 */
export function Cityscape({ className }: CityscapeProps) {
  return (
    <LottieScene
      src="/lottie/cityscape.json"
      className={className}
      fallback={<DiagonalStripes stripeColorClassNames={["bg-pine", "bg-slate", "bg-brick"]} className="h-full w-full" />}
    />
  );
}
