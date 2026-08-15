"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { PAGE_SCENES, type PageScene } from "@/lib/config/scenes";

interface SceneBackdropProps {
  scene: PageScene;
  priority?: boolean;
  subdued?: boolean;
  className?: string;
}

export function SceneBackdrop({ scene, priority = false, subdued = false, className }: SceneBackdropProps) {
  const config = PAGE_SCENES[scene];
  const [ownerSceneAvailable, setOwnerSceneAvailable] = useState(true);

  return (
    <div aria-hidden="true" data-scene-backdrop className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-ink-base", className)}>
      <Image
        src={config.backdropSrc}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className={cn("scene-backdrop-base object-cover object-center motion-safe:animate-[scene-drift_18s_ease-out_both]", subdued ? "opacity-20" : "opacity-65")}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-ink-base)_0%,color-mix(in_srgb,var(--color-ink-base)_88%,transparent)_42%,color-mix(in_srgb,var(--color-ink-base)_35%,transparent)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--color-ink-base)_0%,transparent_52%,color-mix(in_srgb,var(--color-ink-base)_35%,transparent)_100%)]" />

      {ownerSceneAvailable ? (
        <div
          data-owner-scene
          className={cn(
            "owner-scene-layer absolute inset-x-0 top-[28%] h-[54%] opacity-25 sm:inset-y-0 sm:left-auto sm:h-auto sm:w-[58%] sm:opacity-40",
            subdued && "opacity-15 sm:opacity-20"
          )}
        >
          <Image
            src={config.src}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 640px) 58vw, 100vw"
            className="object-contain object-center sm:object-right"
            onError={() => setOwnerSceneAvailable(false)}
          />
        </div>
      ) : null}
    </div>
  );
}
