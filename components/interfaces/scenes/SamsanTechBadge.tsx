import Image from "next/image";
import { cn } from "@/lib/cn";

/** Dimensi asli file PNG -- dipakai next/image untuk menghindari layout shift. */
const SAMSAN_TECH_IMAGE_WIDTH = 1200;
const SAMSAN_TECH_IMAGE_HEIGHT = 1200;

interface SamsanTechBadgeProps {
  className?: string;
}


export function SamsanTechBadge({ className }: SamsanTechBadgeProps) {
  return (
    <Image
      src="/illustrations/samsan-tech.png"
      alt=""
      width={SAMSAN_TECH_IMAGE_WIDTH}
      height={SAMSAN_TECH_IMAGE_HEIGHT}
      className={cn("h-auto w-full select-none", className)}
    />
  );
}
