"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IMPACT_DEPLOYMENTS, ROLE_CARDS, STACK_LAYERS, type IntroChapterId } from "@/lib/config/intro";
import { FUNCTIONAL_EASE } from "@/components/interfaces/motion/motionConfig";
import { cn } from "@/lib/cn";

/**
 * Static poster behind the intro copy. It is what reduced-motion and
 * no-WebGL visitors see, and what everyone sees while the 3D scene loads.
 */
function Visual({ id }: { id: IntroChapterId }) {
  switch (id) {
    case "hello":
      return (
        <div className="relative aspect-[5/6] w-[min(19rem,58vw)] overflow-hidden rounded-[1.4rem] border-2 border-coral shadow-[0_0_80px_-10px_var(--color-coral)]">
          <Image src="/foto_jordan.jpg" alt="Portrait of Jordan Arya Leksana" fill priority sizes="(max-width: 768px) 58vw, 19rem" className="object-cover" />
        </div>
      );
    case "build":
      return (
        <div className="flex w-[min(24rem,70vw)] flex-col gap-3 [transform:perspective(900px)_rotateX(28deg)_rotateY(-24deg)]" aria-hidden="true">
          {STACK_LAYERS.map((layer) => (
            <div key={layer.id} className="rounded-lg border bg-ink-panel/90 px-4 py-3 font-mono text-[11px] tracking-[0.14em]" style={{ borderColor: layer.color, color: layer.color }}>
              {layer.label.toUpperCase()}
            </div>
          ))}
        </div>
      );
    case "now":
      return (
        <div className="relative aspect-video w-[min(34rem,82vw)] overflow-hidden rounded-2xl border border-text-on-dark/15 shadow-2xl">
          <Image src="/projects/intentcut/cover.webp" alt="IntentCut studio turning footage into a storyboard" fill sizes="(max-width: 768px) 82vw, 34rem" className="object-cover" />
        </div>
      );
    case "impact":
      return (
        <div className="grid w-[min(26rem,78vw)] gap-3" aria-hidden="true">
          {IMPACT_DEPLOYMENTS.map((deployment, index) => (
            <div key={deployment.id} className={cn("rounded-2xl border bg-ink-panel/85 p-5", index === 0 ? "border-coral" : "border-sage")}>
              <p className={cn("font-mono text-[10px] tracking-[0.16em]", index === 0 ? "text-coral" : "text-sage")}>{deployment.tab.toUpperCase()}</p>
              <p className="mt-2 font-display text-lg font-bold">{deployment.facts[0]}</p>
            </div>
          ))}
        </div>
      );
    case "research":
      return (
        <div className="relative aspect-[16/10] w-[min(32rem,82vw)] overflow-hidden rounded-2xl border border-text-on-dark/15">
          <Image src="/projects/emqnet/emqnet-system-flow.svg" alt="EMQNET pipeline from geomagnetic signals to precursor detection" fill sizes="(max-width: 768px) 82vw, 32rem" className="object-cover" />
        </div>
      );
    case "looking-for":
      return (
        <div className="grid w-[min(24rem,78vw)] grid-cols-2 gap-3" aria-hidden="true">
          {ROLE_CARDS.map((role) => (
            <div key={role.id} className={cn("rounded-2xl border bg-ink-panel/85 p-4", role.priority === "primary" ? "col-span-2 border-coral" : "border-text-on-dark/18")}>
              <p className="font-mono text-[10px] tracking-[0.14em] text-mustard">{role.type.toUpperCase()}</p>
              <p className="mt-1 font-display text-base font-bold">{role.label}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export function IntroStaticStage({ chapterId, hidden, reducedMotion }: { chapterId: IntroChapterId; hidden: boolean; reducedMotion: boolean }) {
  return (
    <div
      aria-hidden={hidden ? "true" : undefined}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-ink-base transition-opacity duration-700", hidden && "opacity-0")}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,color-mix(in_srgb,var(--color-coral)_14%,transparent),transparent_55%),radial-gradient(ellipse_at_20%_90%,color-mix(in_srgb,var(--color-pine)_18%,transparent),transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-text-on-dark)_1px,transparent_1px),linear-gradient(90deg,var(--color-text-on-dark)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute inset-x-0 top-[12svh] flex justify-center md:inset-y-0 md:left-[46%] md:right-0 md:top-0 md:items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={chapterId}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 18, scale: reducedMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
            transition={{ duration: reducedMotion ? 0 : 0.5, ease: FUNCTIONAL_EASE }}
          >
            <Visual id={chapterId} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
