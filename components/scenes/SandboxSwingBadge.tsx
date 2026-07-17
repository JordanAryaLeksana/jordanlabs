import Image from "next/image";
import { cn } from "@/lib/cn";

/** Dimensi asli file PNG -- dipakai next/image untuk menghindari layout shift. */
const SANDBOX_SWING_IMAGE_WIDTH = 307;
const SANDBOX_SWING_IMAGE_HEIGHT = 328;

interface SandboxSwingBadgeProps {
  className?: string;
}

/**
 * Komponen ini digunakan sebagai wrapper aset ilustrasi "sandbox swing" yang
 * disiapkan pemilik di public/illustrations/ (CLAUDE.md §6a: ilustrasi bespoke
 * datang dari file, bukan dikode). Ditampilkan kecil sebagai tempelan dinding
 * poster pada intro; alt dikosongkan karena murni dekoratif.
 */
export function SandboxSwingBadge({ className }: SandboxSwingBadgeProps) {
  return (
    <Image
      src="/illustrations/sandbox-swing.png"
      alt=""
      width={SANDBOX_SWING_IMAGE_WIDTH}
      height={SANDBOX_SWING_IMAGE_HEIGHT}
      className={cn("h-auto w-full select-none", className)}
    />
  );
}
