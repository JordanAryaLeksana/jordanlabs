"use client";

import { useState } from "react";
import { DemoCard } from "./DemoCard";
import { Typography } from "@/components/interfaces/ui/Typography/Typography";
import { Button } from "@/components/interfaces/ui/Button";
import { ColorBlockBar } from "@/components/interfaces/retro/ColorBlockBar";
import { HexGrid } from "@/components/interfaces/retro/HexGrid";
import { PerspectiveScene } from "@/components/interfaces/retro/PerspectiveScene";
import { KineticHeading } from "@/components/interfaces/retro/KineticHeading";
import { PreviewCard } from "@/components/interfaces/retro/PreviewCard";
import { FadeIn } from "@/components/interfaces/motion/FadeIn";
import { StaggerContainer } from "@/components/interfaces/motion/StaggerContainer";
import { StaggerItem } from "@/components/interfaces/motion/StaggerItem";
import { HoverLift } from "@/components/interfaces/motion/HoverLift";
import { ParallaxShape } from "@/components/interfaces/motion/ParallaxShape";
import { ColorBlockReveal } from "@/components/interfaces/motion/ColorBlockReveal";
import { LoadingScreen } from "@/components/pages/layout/LoadingScreen";
import { INTRO_GREETING_PHRASES } from "@/lib/config/brand";

const STAGGER_ITEM_COLORS = ["bg-coral", "bg-pine", "bg-slate", "bg-mustard"];

export function AnimationShowcase() {
  const [loaderKey, setLoaderKey] = useState(0);

  return (
    <div className="flex flex-1 flex-col gap-10 bg-ink-base px-6 py-16 text-text-on-dark">
      <div className="flex flex-col gap-3">
        <Typography variant="big-header" size="6xl">
          Animasi
        </Typography>
        <Typography variant="text" size="lg">
          Bagian atas: animasi bawaan tiap komponen retro/ (CSS manual). Bagian bawah: sistem motion §11 &quot;Cinematic
          Startup Motion&quot; (Framer Motion) — fade+translate, stagger, hover, scroll reveal, parallax, signature
          color-block reveal, dan loading screen.
        </Typography>
      </div>

      <DemoCard title="ColorBlockBar — bar meluncur" description="Bar slide masuk dari kiri sambil fade-in.">
        {(replayKey) => (
          <ColorBlockBar key={replayKey} icon={<span>@</span>}>
            <Typography as="span" variant="text">
              Kirim pesan
            </Typography>
          </ColorBlockBar>
        )}
      </DemoCard>

      <DemoCard
        title="HexGrid — heksagon muncul beruntun"
        description="Tiap heksagon reveal berjenjang (staggered) mengikuti urutan index."
      >
        {(replayKey) => <HexGrid key={replayKey} />}
      </DemoCard>

      <DemoCard
        title="PerspectiveScene — perspektif menyempit"
        description="Adegan mengecil dari luar (scale + fade) ke posisi normal, memberi kesan kedalaman."
      >
        {(replayKey) => <PerspectiveScene key={replayKey} className="max-w-sm" />}
      </DemoCard>

      <DemoCard
        title="KineticHeading — reveal berjenjang + underline"
        description="Momen 'wah' KineticHeading (§11): stagger huruf, lalu garis underline SVG tergambar (pathLength 0->1)."
      >
        {(replayKey) => <KineticHeading key={replayKey} text="JORDAN" underline />}
      </DemoCard>

      <div className="h-px bg-ink-raised" />
      <Typography variant="header">§11 — Cinematic Startup Motion (Framer Motion)</Typography>

      <DemoCard
        title="FadeIn — fade + translate dasar"
        description="Animasi dasar hampir semua elemen: opacity 0 -> 1 + geser ~12px, ease-out tegas (bukan --ease-retro-bounce)."
      >
        {(replayKey) => (
          <FadeIn key={replayKey} className="w-fit">
            <PreviewCard className="max-w-xs" cardColorClassName="bg-offwhite">
              <div className="h-0 w-0 border-x-[24px] border-b-[32px] border-x-transparent border-b-pine" />
            </PreviewCard>
          </FadeIn>
        )}
      </DemoCard>

      <DemoCard
        title="StaggerContainer + StaggerItem — daftar kartu"
        description="Dipakai untuk daftar card/skill/project: tiap item muncul berjenjang ~60ms antar-item."
      >
        {(replayKey) => (
          <StaggerContainer key={replayKey} className="flex flex-wrap gap-3">
            {STAGGER_ITEM_COLORS.map((colorClassName) => (
              <StaggerItem key={colorClassName}>
                <div className={`h-16 w-16 ${colorClassName}`} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </DemoCard>

      <div className="flex flex-col gap-3 border border-ink-raised p-4">
        <Typography variant="header" size="xl">
          HoverLift — micro-interaction hover
        </Typography>
        <Typography variant="text" size="sm">
          Arahkan kursor ke kotak di bawah: scale ~1.02 + naik 2-4px, border ganti warna (bukan glow).
        </Typography>
        <HoverLift className="w-fit border-2 border-current p-4 transition-colors hover:border-frame-green">
          <Typography as="span" variant="text">
            hover aku
          </Typography>
        </HoverLift>
      </div>

      <div className="h-[70vh]" />

      <div className="flex flex-col gap-3 border border-ink-raised p-4">
        <Typography variant="header" size="xl">
          FadeIn (scroll reveal)
        </Typography>
        <Typography variant="text" size="sm">
          Baru main sekali saat elemen ini pertama masuk area pandang (scroll ke bawah barusan yang memicunya).
        </Typography>
        <FadeIn trigger="viewport" className="w-fit">
          <PreviewCard className="max-w-xs" cardColorClassName="bg-offwhite">
            <div className="h-0 w-0 border-x-[24px] border-b-[32px] border-x-transparent border-b-brick" />
          </PreviewCard>
        </FadeIn>
      </div>

      <div className="flex flex-col gap-3 border border-ink-raised p-4">
        <Typography variant="header" size="xl">
          ParallaxShape — parallax ringan
        </Typography>
        <Typography variant="text" size="sm">
          Khusus bentuk dekoratif, bukan teks konten. Scroll naik-turun di sekitar sini: kotak bergeser lebih lambat
          dari halaman.
        </Typography>
        <ParallaxShape className="h-20 w-20 bg-mustard" />
      </div>

      <div className="h-[40vh]" />

      <DemoCard
        title="ColorBlockReveal — signature color-block reveal"
        description="Blok warna solid menyapu masuk lalu keluar ke arah berlawanan, meninggalkan konten di baliknya. Dipakai TERBATAS (satu momen per section)."
      >
        {(replayKey) => (
          <ColorBlockReveal key={replayKey} blockColorClassName="bg-brick" className="w-fit">
            <PreviewCard className="max-w-xs" cardColorClassName="bg-offwhite">
              <div className="h-0 w-0 border-x-[24px] border-b-[32px] border-x-transparent border-b-slate" />
            </PreviewCard>
          </ColorBlockReveal>
        )}
      </DemoCard>

      <div className="flex flex-col gap-3 border border-ink-raised p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Typography variant="header" size="xl">
            LoadingScreen — intro loader
          </Typography>
          <Button variant="secondary" onClick={() => setLoaderKey((previous) => previous + 1)}>
            Play intro loader
          </Button>
        </div>
        <Typography variant="text" size="sm">
          Fase pembuka IntroSequence memakai scene startup yang sama dengan Home, tiga sapaan singkat, dan indikator
          chapter yang tenang. Komponen ini murni presentational—urutan fase dan akses skip dikendalikan oleh
          IntroSequence; di sini hanya isi pembukanya yang diputar ulang.
        </Typography>
        <div className="relative h-[360px] overflow-hidden">
          <LoadingScreen key={loaderKey} greetingPhrases={INTRO_GREETING_PHRASES} onComplete={() => {}} />
        </div>
      </div>
    </div>
  );
}
