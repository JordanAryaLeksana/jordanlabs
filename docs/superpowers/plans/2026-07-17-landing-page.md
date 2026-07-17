# Landing Page (`/`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ganti Home lama yang rusak (mengimpor `components/sections/*` yang sudah tidak ada) dengan landing chat-first sesuai `docs/landing.md`: `StaticHeader` (server, info inti + link) + `ChatWidget` (client shell Fase 0, belum tersambung LLM).

**Architecture:** Dua komponen baru dirakit di `app/page.tsx` di dalam `IntroSequence` yang sudah ada (`flex h-dvh flex-col`, header lalu chat surface `flex-1`). Beberapa file prasyarat yang belum ada (`lib/config/profile.ts`, `lib/tools/types.ts`, primitif `IconButton`/`ThemeToggle`) dibuat lebih dulu karena sudah dirujuk kode lain atau dibutuhkan header/chat.

**Tech Stack:** Next.js App Router (TypeScript, server & client component), Tailwind v4 (token di `app/globals.css`), Framer Motion (primitif di `components/motion/`), `@phosphor-icons/react` (baru ditambahkan).

## Global Constraints

- Sudut siku (0px) default; lengkung hanya `rounded-full` untuk elemen lingkaran (CLAUDE.md §3).
- Tanpa gradient, drop shadow blur, atau glow — kedalaman dari offset blok solid (CLAUDE.md §3).
- Warna hanya lewat kelas token Tailwind (`bg-brick`, `text-coral`, dst) — tidak ada hex literal di komponen (CLAUDE.md §3, §5).
- URL aset (CV, GitHub, LinkedIn) hanya dari `lib/config/links.ts`, tidak pernah di-hardcode ulang di komponen (CLAUDE.md §3).
- Semua motion menghormati `prefers-reduced-motion`; easing fungsional pakai `FUNCTIONAL_EASE` dari `components/motion/motionConfig.ts`, bukan easing lembut/linear (CLAUDE.md §3, §11).
- `StaticHeader` wajib server component (tanpa `"use client"`) supaya info inti terindeks SEO & terlihat tanpa JS (docs/landing.md §9).
- Chatbot (shell ini) tidak boleh mengarang balasan AI — submit hanya menambah bubble milik pengunjung sendiri, tanpa balasan palsu (CLAUDE.md §3, spec §3.6).
- Satu komponen per file, named export, PascalCase; identifier bahasa Inggris (CLAUDE.md §9).

Spec sumber: `docs/superpowers/specs/2026-07-17-landing-page-design.md`.

---

### Task 1: Restore a working build baseline

Proyek saat ini GAGAL build: `app/page.tsx` mengimpor 7 komponen `components/sections/*` yang sudah tidak ada, `components/layout/Footer.tsx` mengimpor `lib/config/profile.ts` yang belum ada, dan `app/api/chat/route.ts` kosong sehingga Next menganggapnya bukan modul valid. Task ini membereskan ketiganya SEBELUM task lain dimulai, supaya `npx tsc --noEmit` bisa dipakai sebagai sinyal pass/fail yang berarti di task-task berikutnya.

**Files:**
- Create: `lib/config/profile.ts`
- Modify: `app/api/chat/route.ts`
- Modify: `app/page.tsx` (rewrite sementara — akan ditulis ulang lagi di Task 11)

**Interfaces:**
- Produces: `PROFILE: { fullName: string; role: string }` dari `lib/config/profile.ts` — dipakai `components/layout/Footer.tsx` (sudah ada) dan `components/layout/StaticHeader.tsx` (Task 7).

- [ ] **Step 1: Konfirmasi error saat ini**

Run: `npx tsc --noEmit`
Expected output (semua baris ini harus muncul, mengonfirmasi diagnosis di atas):
```
app/page.tsx(5,29): error TS2307: Cannot find module '@/components/sections/HeroSection' or its corresponding type declarations.
components/layout/Footer.tsx(4,25): error TS2307: Cannot find module '@/lib/config/profile' or its corresponding type declarations.
.next/types/validator.ts(71,39): error TS2306: File '.../app/api/chat/route.ts' is not a module.
```

- [ ] **Step 2: Buat `lib/config/profile.ts`**

```ts
/**
 * Sumber kebenaran data profil pemilik (CLAUDE.md §8): dipakai StaticHeader &
 * Footer untuk nama/posisi. Field cerita/latar untuk section about-background
 * ditambahkan saat halaman /about dibangun.
 */
export const PROFILE = {
  fullName: "Jordan Arya Leksana",
  role: "Software Engineer",
} as const;
```

- [ ] **Step 3: Jadikan `app/api/chat/route.ts` modul valid (tanpa mengimplementasikan logika Fase 1)**

Isi filenya (saat ini kosong total) dengan:

```ts
export {};
```

- [ ] **Step 4: Tulis ulang `app/page.tsx` jadi placeholder sementara yang valid**

```tsx
import { IntroSequence } from "@/components/layout/IntroSequence";

/** Placeholder sementara — diganti StaticHeader + ChatWidget di Task 11 (docs/superpowers/plans/2026-07-17-landing-page.md). */
export default function Home() {
  return (
    <IntroSequence>
      <div />
    </IntroSequence>
  );
}
```

- [ ] **Step 5: Verifikasi build bersih**

Run: `npx tsc --noEmit`
Expected: tidak ada output sama sekali (exit code 0).

- [ ] **Step 6: Commit**

```bash
git add lib/config/profile.ts app/api/chat/route.ts app/page.tsx
git commit -m "fix: restore working build baseline for landing rewrite"
```

---

### Task 2: `lib/tools/types.ts` — PAGE_ROUTES

**Files:**
- Create: `lib/tools/types.ts`

**Interfaces:**
- Produces: `PAGE_ROUTES: { home: "/"; about: "/about"; projects: "/projects"; research: "/research"; contact: "/contact" }` — dipakai `StaticHeader` (Task 7).

- [ ] **Step 1: Buat file**

```ts
/**
 * Identifier bersama lintas tool/route/komponen (CLAUDE.md §8): satu-satunya
 * sumber kebenaran supaya schema tool chatbot, route Next.js, dan komponen
 * UI tidak lepas sinkron. Field lain (SECTION_IDS, PROJECT_IDS,
 * SKILL_CATEGORY_IDS) ditambahkan saat halaman yang membutuhkannya dibangun.
 */
export const PAGE_ROUTES = {
  home: "/",
  about: "/about",
  projects: "/projects",
  research: "/research",
  contact: "/contact",
} as const;
```

- [ ] **Step 2: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada output.

- [ ] **Step 3: Commit**

```bash
git add lib/tools/types.ts
git commit -m "feat: add PAGE_ROUTES as shared route source of truth"
```

---

### Task 3: Tambah dependency `@phosphor-icons/react`

**Files:**
- Modify: `package.json`, `package-lock.json` (otomatis oleh npm, jangan diedit manual)

- [ ] **Step 1: Install**

Run: `npm install @phosphor-icons/react`
Expected: perintah selesai tanpa error; `package.json` bertambah satu baris dependency `"@phosphor-icons/react": "^<versi>"`.

- [ ] **Step 2: Verifikasi import dasar bisa di-resolve**

Run: `npx tsc --noEmit`
Expected: tidak ada output (belum ada kode yang memakainya, jadi tidak ada perubahan error).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add @phosphor-icons/react for header and chat icons"
```

---

### Task 4: `components/ui/IconButton.tsx`

Primitif §6a yang belum ada di codebase: bujur sangkar siku berisi satu ikon, dipakai untuk aksi tunggal (GitHub/LinkedIn/tema/kirim pesan).

**Files:**
- Create: `components/ui/IconButton.tsx`

**Interfaces:**
- Consumes: `cn` dari `@/lib/cn` (sudah ada, signature `cn(...classNames: Array<string | false | null | undefined>): string`).
- Produces: `IconButton(props: { icon: ReactNode; label: string; className?: string } & (ButtonHTMLAttributes<HTMLButtonElement> | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })))` — dipakai `ThemeToggle` (Task 5), `StaticHeader` (Task 7), `ChatWidget` (Task 10).

- [ ] **Step 1: Buat file**

```tsx
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type IconButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type IconButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type IconButtonProps = (IconButtonAsButton | IconButtonAsAnchor) & {
  icon: ReactNode;
  /** Nama aksesibel wajib -- tombol ini hanya berisi ikon, tanpa teks. */
  label: string;
};

const BASE_CLASS_NAME =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center border border-current text-current transition-colors duration-150 hover:bg-current/10 motion-reduce:transition-none";

/** Bujur sangkar siku berisi satu ikon (CLAUDE.md §6a) -- merender <a> kalau `href` diisi, selain itu <button>. */
export function IconButton({ icon, label, className, ...props }: IconButtonProps) {
  const classes = cn(BASE_CLASS_NAME, className);

  if (props.href !== undefined) {
    const anchorProps = props as IconButtonAsAnchor;
    return (
      <a aria-label={label} className={classes} {...anchorProps}>
        {icon}
      </a>
    );
  }

  const buttonProps = props as IconButtonAsButton;
  return (
    <button type="button" aria-label={label} className={classes} {...buttonProps}>
      {icon}
    </button>
  );
}
```

- [ ] **Step 2: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada output.

- [ ] **Step 3: Commit**

```bash
git add components/ui/IconButton.tsx
git commit -m "feat: add IconButton primitive"
```

---

### Task 5: `components/ui/ThemeToggle.tsx`

**Files:**
- Create: `components/ui/ThemeToggle.tsx`

**Interfaces:**
- Consumes: `IconButton` dari Task 4 (`{ icon, label, onClick }`).
- Produces: `ThemeToggle()` — komponen client tanpa props, dipakai `StaticHeader` (Task 7).

- [ ] **Step 1: Buat file**

```tsx
"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { IconButton } from "@/components/ui/IconButton";

type Theme = "dark" | "light";

function readStoredTheme(): Theme {
  const stored = window.localStorage.getItem("theme");
  return stored === "light" ? "light" : "dark";
}

/**
 * Toggle data-theme di <html> + persist localStorage; default gelap sesuai
 * CLAUDE.md §4 "Default gelap". Nilai awal state selalu "dark" supaya markup
 * client cocok dengan script anti-flash di app/layout.tsx (Task 6) sebelum
 * useEffect membaca preferensi tersimpan sesungguhnya.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readStoredTheme());
  }, []);

  function handleToggle() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <IconButton
      icon={theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={handleToggle}
    />
  );
}
```

- [ ] **Step 2: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada output. Bila error `Module '"@phosphor-icons/react"' has no exported member 'Sun'` -- cek nama ekspor yang tersedia lewat `grep -r "export" node_modules/@phosphor-icons/react/dist/index.d.ts | grep -i sun` dan sesuaikan nama ikonnya.

- [ ] **Step 3: Commit**

```bash
git add components/ui/ThemeToggle.tsx
git commit -m "feat: add ThemeToggle with localStorage persistence"
```

---

### Task 6: Script anti-flash tema di `app/layout.tsx`

Tanpa ini, halaman akan sekilas tampil tema default (`:root` di globals.css = terang) sebelum `ThemeToggle` sempat membaca localStorage, padahal default produk seharusnya gelap (CLAUDE.md §4).

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Tambah elemen `<head>` dengan inline script sebelum `<body>`**

Ubah `app/layout.tsx` dari:

```tsx
    <html
      lang="en"
      className={`${bigHeaderFont.variable} ${headerFont.variable} ${paragraphFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
```

menjadi:

```tsx
    <html
      lang="en"
      className={`${bigHeaderFont.variable} ${headerFont.variable} ${paragraphFont.variable} h-full antialiased`}
    >
      <head>
        {/* Set data-theme sebelum paint supaya tidak ada kedipan tema salah (CLAUDE.md §4: default gelap). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=window.localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
```

- [ ] **Step 2: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada output.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: prevent theme flash on initial load"
```

---

### Task 7: `components/layout/StaticHeader.tsx`

**Files:**
- Create: `components/layout/StaticHeader.tsx`

**Interfaces:**
- Consumes: `PROFILE` (Task 1/2 — `lib/config/profile.ts`), `PAGE_ROUTES` (Task 2 — `lib/tools/types.ts`), `CV_URL`/`GITHUB_URL`/`LINKEDIN_URL` (existing `lib/config/links.ts`), `IconButton` (Task 4), `ThemeToggle` (Task 5), existing `KineticHeading`/`DiagonalStripes`/`Typography`/`Button`/`Pill`.
- Produces: `StaticHeader()` — server component tanpa props, dipakai `app/page.tsx` (Task 11).

- [ ] **Step 1: Buat file**

```tsx
import { DownloadSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { KineticHeading } from "@/components/retro/KineticHeading";
import { DiagonalStripes } from "@/components/retro/DiagonalStripes";
import { Typography } from "@/components/ui/Typography/Typography";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { IconButton } from "@/components/ui/IconButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PROFILE } from "@/lib/config/profile";
import { CV_URL, GITHUB_URL, LINKEDIN_URL } from "@/lib/config/links";
import { PAGE_ROUTES } from "@/lib/tools/types";

const CONTENT_PAGE_LINKS = [
  { label: "About", href: PAGE_ROUTES.about },
  { label: "Projects", href: PAGE_ROUTES.projects },
  { label: "Research", href: PAGE_ROUTES.research },
  { label: "Contact", href: PAGE_ROUTES.contact },
] as const;

/**
 * Header statis landing (CLAUDE.md §1a, docs/landing.md §3): server-rendered
 * penuh supaya info inti (nama, posisi, CV, sosial) terlihat & terindeks SEO
 * tanpa menunggu chat dimuat.
 */
export function StaticHeader() {
  return (
    <header className="flex flex-col gap-4 border-b border-ink-raised px-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <KineticHeading text={PROFILE.fullName} underline />
            <Typography as="p" variant="text" size="sm" className="opacity-70">
              {PROFILE.role}
            </Typography>
          </div>
          <DiagonalStripes className="h-12 w-3" stripeCount={4} />
        </div>

        <div className="flex items-center gap-2">
          <Button href={CV_URL} download variant="primary">
            <DownloadSimple size={18} className="mr-2 inline" />
            Download CV
          </Button>
          <IconButton
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            icon={<GithubLogo size={20} />}
            label="Open GitHub profile"
          />
          <IconButton
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            icon={<LinkedinLogo size={20} />}
            label="Open LinkedIn profile"
          />
          <ThemeToggle />
        </div>
      </div>

      <nav className="flex flex-wrap gap-2" aria-label="Content pages">
        {CONTENT_PAGE_LINKS.map((link) => (
          <Pill key={link.href} href={link.href}>
            {link.label}
          </Pill>
        ))}
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada output. Bila error pada import `@phosphor-icons/react/dist/ssr` (path tidak ditemukan) -- ganti import ikon di file ini ke `@phosphor-icons/react` biasa DAN tambahkan `"use client"` di baris pertama file sebagai fallback (StaticHeader kehilangan status server component, catat penyimpangan ini di `NEXT_STEPS.md` saat itu terjadi).

- [ ] **Step 3: Commit**

```bash
git add components/layout/StaticHeader.tsx
git commit -m "feat: add StaticHeader server component for landing"
```

---

### Task 8: `components/chat/ChatMessageBubble.tsx`

**Files:**
- Create: `components/chat/ChatMessageBubble.tsx`

**Interfaces:**
- Consumes: `FadeIn` dari `@/components/motion/FadeIn` (props `{ children, className?, distancePx? }`), `cn` dari `@/lib/cn`.
- Produces: `ChatMessageBubble(props: { role: "assistant" | "user"; children: ReactNode })` — dipakai `ChatWidget` (Task 10).

- [ ] **Step 1: Buat file**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { FadeIn } from "@/components/motion/FadeIn";

type MessageRole = "assistant" | "user";

interface ChatMessageBubbleProps {
  role: MessageRole;
  children: ReactNode;
}

const ALIGNMENT_CLASS_NAME: Record<MessageRole, string> = {
  assistant: "justify-start",
  user: "justify-end",
};

const BUBBLE_COLOR_CLASS_NAME: Record<MessageRole, string> = {
  assistant: "bg-ink-panel text-text-on-dark",
  user: "bg-pine text-text-on-dark",
};

/** Gelembung pesan chat (docs/landing.md §6): fade+translate masuk, warna beda per peran. */
export function ChatMessageBubble({ role, children }: ChatMessageBubbleProps) {
  return (
    <FadeIn className={cn("flex", ALIGNMENT_CLASS_NAME[role])} distancePx={12}>
      <div className={cn("max-w-[80%] px-4 py-3 font-sans text-sm", BUBBLE_COLOR_CLASS_NAME[role])}>{children}</div>
    </FadeIn>
  );
}
```

- [ ] **Step 2: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada output.

- [ ] **Step 3: Commit**

```bash
git add components/chat/ChatMessageBubble.tsx
git commit -m "feat: add ChatMessageBubble"
```

---

### Task 9: `components/chat/SuggestedPrompts.tsx`

**Files:**
- Create: `components/chat/SuggestedPrompts.tsx`

**Interfaces:**
- Consumes: `StaggerContainer`/`StaggerItem` dari `@/components/motion/` (masing-masing `{ children, className? }`), `Pill` dari `@/components/ui/Pill`.
- Produces: `SuggestedPrompts(props: { onSelect: (prompt: string) => void })` — dipakai `ChatWidget` (Task 10).

- [ ] **Step 1: Buat file**

```tsx
"use client";

import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Pill } from "@/components/ui/Pill";

const SUGGESTED_PROMPTS = [
  "What projects have you built?",
  "What are your skills?",
  "Can I see your CV?",
  "How do I get in touch?",
] as const;

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

/** Contoh pertanyaan (docs/landing.md §8): klik mengisi input, tidak auto-kirim. */
export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <StaggerContainer className="flex flex-wrap gap-2">
      {SUGGESTED_PROMPTS.map((prompt) => (
        <StaggerItem key={prompt}>
          <Pill onClick={() => onSelect(prompt)}>{prompt}</Pill>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
```

- [ ] **Step 2: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada output.

- [ ] **Step 3: Commit**

```bash
git add components/chat/SuggestedPrompts.tsx
git commit -m "feat: add SuggestedPrompts"
```

---

### Task 10: `components/chat/ChatWidget.tsx`

**Files:**
- Create: `components/chat/ChatWidget.tsx`

**Interfaces:**
- Consumes: `ChatMessageBubble` (Task 8, `{ role, children }`), `SuggestedPrompts` (Task 9, `{ onSelect }`), `IconButton` (Task 4), `HexGrid` dari `@/components/retro/HexGrid` (`{ count?, className? }`), `cn` dari `@/lib/cn`.
- Produces: `ChatWidget(props: { className?: string })` — dipakai `app/page.tsx` (Task 11).

- [ ] **Step 1: Buat file**

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { HexGrid } from "@/components/retro/HexGrid";
import { IconButton } from "@/components/ui/IconButton";
import { ChatMessageBubble } from "@/components/chat/ChatMessageBubble";
import { SuggestedPrompts } from "@/components/chat/SuggestedPrompts";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
}

const OPENING_MESSAGE: ChatMessage = {
  id: "opening",
  role: "assistant",
  text: "Hi, I'm Jordan's AI assistant. Ask me about his experience, skills, or projects — I can pull up the details, or take you straight to the page you need.",
};

interface ChatWidgetProps {
  className?: string;
}

/**
 * Permukaan chat landing (docs/landing.md §3, §7) -- shell Fase 0, belum
 * tersambung ke /api/chat (NEXT_STEPS.md). Submit hanya menambah bubble milik
 * pengunjung sendiri; TIDAK mengarang balasan AI (CLAUDE.md §3).
 */
export function ChatWidget({ className }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([OPENING_MESSAGE]);
  const [draftMessage, setDraftMessage] = useState("");
  const prefersReducedMotion = useReducedMotion();

  function handleSelectSuggestedPrompt(prompt: string) {
    setDraftMessage(prompt);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedMessage = draftMessage.trim();
    if (trimmedMessage === "") return;
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: crypto.randomUUID(), role: "user", text: trimmedMessage },
    ]);
    setDraftMessage("");
  }

  return (
    <div className={cn("relative flex flex-col bg-[var(--bg)] text-[var(--fg)]", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden opacity-[0.07]">
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: ["0%", "-8%", "0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <HexGrid count={24} />
        </motion.div>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-6 py-6">
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} role={message.role}>
            {message.text}
          </ChatMessageBubble>
        ))}
      </div>

      <div className="relative flex flex-col gap-3 border-t border-ink-raised px-6 py-4">
        {messages.length === 1 ? <SuggestedPrompts onSelect={handleSelectSuggestedPrompt} /> : null}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            value={draftMessage}
            onChange={(event) => setDraftMessage(event.target.value)}
            placeholder="Ask about Jordan's experience, skills, or projects..."
            className="h-11 flex-1 border border-current bg-transparent px-3 font-sans text-sm outline-none focus:border-frame-green"
          />
          <IconButton type="submit" icon={<PaperPlaneRight size={20} />} label="Send message" />
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada output.

- [ ] **Step 3: Commit**

```bash
git add components/chat/ChatWidget.tsx
git commit -m "feat: add ChatWidget shell (Phase 0, no LLM wiring)"
```

---

### Task 11: Rakit `app/page.tsx` final

**Files:**
- Modify: `app/page.tsx` (mengganti placeholder Task 1)

**Interfaces:**
- Consumes: `IntroSequence` (existing), `StaticHeader` (Task 7), `ChatWidget` (Task 10, prop `className`).

- [ ] **Step 1: Tulis ulang isi file**

```tsx
import { IntroSequence } from "@/components/layout/IntroSequence";
import { StaticHeader } from "@/components/layout/StaticHeader";
import { ChatWidget } from "@/components/chat/ChatWidget";

/**
 * Landing (CLAUDE.md §1a, docs/landing.md): permukaan chat full-screen, bukan
 * halaman scroll. StaticHeader menjaga info inti terlihat & terindeks SEO
 * tanpa mengetik; ChatWidget adalah permukaan chat utamanya (shell Fase 0,
 * lihat NEXT_STEPS.md).
 */
export default function Home() {
  return (
    <IntroSequence>
      <div className="flex h-dvh flex-col">
        <StaticHeader />
        <ChatWidget className="min-h-0 flex-1" />
      </div>
    </IntroSequence>
  );
}
```

- [ ] **Step 2: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada output.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble landing page from StaticHeader and ChatWidget"
```

---

### Task 12: Pindahkan gambar referensi ke `docs/reference/`

`maxresdefault.jpg` dan `startup1.jpg` di root proyek adalah moodboard visual START-UP (title card + poster), bukan aset yang dipakai kode manapun — dirapikan keluar dari root sesuai keputusan sesi brainstorming.

**Files:**
- Move: `maxresdefault.jpg` → `docs/reference/maxresdefault.jpg`
- Move: `startup1.jpg` → `docs/reference/startup1.jpg`

- [ ] **Step 1: Buat folder tujuan & pindahkan**

Run:
```bash
mkdir -p docs/reference
mv maxresdefault.jpg docs/reference/
mv startup1.jpg docs/reference/
```

Kedua file berstatus untracked di git (`git status` menunjukkan `??`), jadi dipindahkan dengan `mv` biasa, bukan `git mv`.

- [ ] **Step 2: Verifikasi**

Run: `ls docs/reference/ && ls *.jpg 2>/dev/null; echo "done"`
Expected: `docs/reference/` berisi kedua file; `ls *.jpg` di root tidak menemukan apa pun (baris `done` tetap muncul).

- [ ] **Step 3: Commit**

```bash
git add docs/reference/maxresdefault.jpg docs/reference/startup1.jpg
git commit -m "chore: move START-UP moodboard references into docs/reference"
```

---

### Task 13: Verifikasi akhir menyeluruh

**Files:** tidak ada file baru — task ini murni verifikasi end-to-end.

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: build selesai dengan `✓ Compiled successfully`, tanpa error TypeScript/ESLint yang menghentikan build.

- [ ] **Step 2: Jalankan dev server**

Run: `npm run dev` (biarkan berjalan di background/terminal terpisah)
Expected: server siap di `http://localhost:3000`.

- [ ] **Step 3: Cek visual manual di browser**

Buka `http://localhost:3000`, lalu periksa:
- Intro (LoadingScreen → BrandReveal) tetap berjalan lalu wipe menuju landing baru (gunakan `?skipIntro=1` untuk lompat langsung ke landing bila ingin fokus ke situ).
- `StaticHeader` menampilkan nama (kinetic, warna bersiklus), role, tombol Download CV, ikon GitHub/LinkedIn, toggle tema, dan 4 pill link (About/Projects/Research/Contact — klik salah satu boleh 404, itu diharapkan karena halamannya belum dibangun).
- `ChatWidget` menampilkan sapaan pembuka, 4 suggested prompt, tekstur HexGrid pudar di dasar. Klik satu suggested prompt → teksnya masuk ke input. Ketik pesan lalu kirim → bubble biru/pine milik pengunjung muncul di kanan, TANPA balasan AI apa pun muncul.
- Resize browser ke ~375px dan ~768px lebar — header & chat tetap terbaca, tidak ada elemen terpotong/tumpang tindih.
- Toggle tema (ikon sun/moon) — background & teks berganti ink-base/text-on-dark ↔ cream-base/text-on-light, tanpa kedipan tema salah saat reload halaman (refresh setelah toggle ke terang, pastikan tetap terang).
- Aktifkan `prefers-reduced-motion` (lewat devtools "Emulate CSS media feature") — tekstur HexGrid berhenti bergerak, bubble/prompt muncul langsung tanpa fade.

- [ ] **Step 4: Update `NEXT_STEPS.md`**

Ganti seluruh isi bagian "Yang sudah selesai" / "Yang belum" / "Langkah konkret berikutnya" supaya mencerminkan status baru (landing chat-first selesai sebagai shell Fase 0; `/about` dkk dan Fase 1 chatbot masih tugas berikutnya) — tulis versi barunya berdasarkan cakupan "Tidak dikerjakan sesi ini" di `docs/superpowers/specs/2026-07-17-landing-page-design.md` §2.

- [ ] **Step 5: Commit**

```bash
git add NEXT_STEPS.md
git commit -m "docs: update NEXT_STEPS after landing page rebuild"
```
