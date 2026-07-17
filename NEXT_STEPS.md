# NEXT_STEPS — Catatan lanjutan proyek (CLAUDE.md §9)

Diperbarui: 17 Juli 2026.

## Yang sudah selesai

- Intro dua fase (LoadingScreen sapaan + BrandReveal wordmark) bernuansa title
  sequence: wordmark Aliens & Cows dengan huruf "a" polygon (SpikeGlyphA),
  garis miring subtitle, dinding dekor tertata, watermark SandboxSwingBadge,
  tempelan SamsanTechBadge. Alat bantu dev: `?skipIntro=1`, `?freezeIntro=loading|brand`.
- Home lengkap sesuai §1a: hero, ai-assistant (cangkang ChatWidget),
  featured-projects, skills, experience, research, contact (adegan cream),
  footer + watermark. Data nyata dari CV di `lib/config/*` + identifier
  bersama di `lib/tools/types.ts`.
- Metadata SEO dasar di `app/layout.tsx`.
- **Fase 1 chatbot — plumbing streaming (spec:
  `docs/superpowers/specs/2026-07-17-ollama-chat-streaming-design.md`)**:
  `content/knowledge/{about,education,experience,skills}.md` +
  `projects/{emqnet,pumpsentinel,ecs-website}.md` diisi dari CV (`dermsight.md`
  sudah diisi manual sebelumnya, `side-projects.md` sengaja tidak dibuat ulang);
  `lib/rag/prompt.ts` (`buildSystemPrompt`) membaca seluruh knowledge secara
  rekursif + guardrail anti-halusinasi; `lib/ai/model.ts` jadi factory
  `getChatModel()` (Ollama, model default `qwen3:8b`); `app/api/chat/route.ts`
  jalan dengan `streamText` + `convertToModelMessages` (async di versi `ai`
  yang ter-install) + `toUIMessageStream`/`createUIMessageStreamResponse`
  (pengganti `toUIMessageStreamResponse` yang sudah deprecated di `ai@7.0.30`);
  `ChatWidget` tersambung lewat `useChat` dari `@ai-sdk/react`. Sudah
  diverifikasi end-to-end: jawaban ter-stream token demi token, grounded ke
  knowledge base, dan menjawab "tidak tahu" untuk pertanyaan di luar konteks.

## Yang belum

- Tool calling Kelompok A & B (§7): `lib/tools/{navigation,resource,content}-tools.ts`,
  `portfolio-data.ts`, `lib/tools/index.ts`, `useToolActions.ts`, tool-cards
  generative UI — belum dikerjakan, menyusul lewat putaran brainstorming
  terpisah.
- `ChatController` site-wide (§1a) — landing masih berdiri sendiri.
- Rate limiting (Upstash) dan pembatasan panjang input/jumlah pesan per sesi
  (§7 "Pengaman") — dicatat sebagai utang, belum diimplementasikan.
- Halaman terpisah §1a belum dibuat: `/about`, `/projects`, `/projects/emqnet`,
  `/projects/dermsight`, `/research`, `/contact` — kartu proyek sengaja belum
  menautkan `detailRoute` supaya tidak 404.
- Validasi mata komposisi intro & Home di ~375px / ~768px / ~1440px belum
  dilakukan menyeluruh.

## Langkah konkret berikutnya

1. Putaran brainstorming baru untuk tool calling Kelompok A & B (§7, sambil
   belajar): `navigateToPage`/`scrollToSection`/`highlightSection`/
   `openProjectDetail` (client-forwarded) dan `showDownloadCard`/`openGithub`/
   `openLinkedin`/`openProjectDemo`/`showContactCard`/`filterProjects`/
   `filterSkills` (server-executed), plus tool-cards generative UI-nya.
2. Buat halaman detail proyek `/projects/emqnet` & `/projects/dermsight` dari
   data `lib/config/projects.ts`, lalu aktifkan tautan detail di ProjectCard.
3. Jalankan `npm run dev`, cek intro + Home di tiga lebar viewport, rapikan
   posisi dekor yang bertabrakan.
