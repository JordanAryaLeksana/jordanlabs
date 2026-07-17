# Fase 1 Chatbot — Streaming Plumbing (Ollama + Vercel AI SDK) — Design Spec

Status: disetujui pengguna 2026-07-17, siap masuk tahap rencana implementasi.

Rujukan wajib: `CLAUDE.md` §2 (tech stack), §3 (batasan keras, terutama "chatbot tidak boleh mengarang fakta"), §7 & §7a (dokumentasi LLM/RAG, alur chatbot), §8 (struktur folder `lib/rag/`, `lib/tools/`); `NEXT_STEPS.md` langkah 1.

## 1. Konteks & masalah

`app/api/chat/route.ts` masih kosong (`export {}`). `components/chat/ChatWidget.tsx` masih shell Fase 0: state pesan lokal (`useState`), submit hanya menambah bubble milik pengunjung sendiri, tidak pernah memanggil API atau mengarang balasan AI — sesuai catatan di file itu sendiri.

Sambil menguji potongan Ollama secara terpisah (`lib/ai/model.ts`, dipanggil sementara dari `app/page.tsx`), ditemukan dan diperbaiki dua bug lewat proses debugging sistematis:

1. `console.log` di `app/page.tsx` tidak pernah muncul di console browser karena `Home` adalah React Server Component (tanpa `"use client"`) — kodenya jalan di proses server, bukan di browser. (Sudah diperbaiki: kode uji dibuang dari `page.tsx`.)
2. `ai-sdk-ollama/browser` dipaksa dipakai padahal kode berjalan di server — sudah diganti ke import default `ai-sdk-ollama` (resolve ke build node lewat conditional exports).
3. `generateText` dari paket `ai` menolak pesan `role: "system"` di dalam array `messages` (`allowSystemInMessages` default `false`) — harus lewat opsi `instructions`/`system` terpisah. Sudah diperbaiki di `lib/ai/model.ts`.

Setelah dua perbaikan itu, endpoint uji (`app/api/test-ollama/route.ts`, dibuat khusus untuk verifikasi ini) berhasil mencapai Ollama, hanya gagal karena `ECONNREFUSED 127.0.0.1:11434` (Ollama belum dijalankan pengguna saat itu) — bukti bahwa wiring SDK ke Ollama sudah benar secara prinsip.

Sesi ini merancang plumbing streaming sungguhan yang menggantikan endpoint uji tersebut, mengikuti alur Fase 1 di CLAUDE.md §7/§7a: seluruh knowledge base ditempel ke system prompt (tanpa vector DB), model dipanggil lewat `streamText`, dan `ChatWidget` disambungkan lewat `useChat`.

## 2. Cakupan

**Dikerjakan:**
- `lib/rag/prompt.ts` (isi stub yang sudah ada): `buildSystemPrompt()`.
- `lib/ai/model.ts`: disederhanakan jadi factory model (`getChatModel()`), `OllamaClient`/`AIClient`/`ChatMessage` yang lama dihapus karena tidak dipakai lagi.
- `app/api/chat/route.ts`: `POST` handler dengan `streamText` + `convertToModelMessages` + `toUIMessageStreamResponse`.
- `components/chat/ChatWidget.tsx`: ganti state lokal dengan `useChat` dari `@ai-sdk/react` (dependency baru, ditambahkan ke `package.json`).
- `content/knowledge/about.md`, `education.md`, `experience.md`, `skills.md`, `projects/{emqnet,dermsight,pumpsentinel,ecs-website,side-projects}.md` — diisi dari `content/Jordan Arya Leksana_CV2026.pdf` (saat ini semua 0 byte).
- Hapus `app/api/test-ollama/route.ts` setelah route asli terverifikasi jalan.

**Tidak dikerjakan sesi ini (menyusul sebagai putaran brainstorming terpisah):**
- Tool calling Kelompok A & B (`lib/tools/{navigation,resource,content}-tools.ts`, `portfolio-data.ts`, `lib/tools/index.ts`, `useToolActions.ts`, tool-cards generative UI).
- `ChatController` site-wide (§1a) — landing ini masih berdiri sendiri sampai halaman konten lain dibangun.
- Rate limiting (Upstash) dan pembatasan panjang input/jumlah pesan per sesi (§7 "Pengaman") — dicatat sebagai utang, bukan diabaikan permanen.
- Fase 2 RAG sungguhan (embedding, vector DB) — `lib/rag/embed.ts`, `retrieve.ts`, `chunk.ts` tetap stub.

## 3. Arsitektur & komponen

### 3.1 `lib/rag/prompt.ts`

```ts
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const KNOWLEDGE_DIR = path.join(process.cwd(), "content/knowledge");

const GUARDRAIL_INSTRUCTION = `Kamu adalah asisten AI di portofolio Jordan Arya Leksana. Jawab HANYA berdasarkan konteks pengetahuan di bawah ini. Jika informasi yang ditanyakan tidak ada di dalam konteks, katakan dengan jujur bahwa kamu tidak tahu -- jangan pernah mengarang jawaban.`;

function readKnowledgeMarkdown(dir: string): string {
  // membaca *.md secara rekursif (termasuk content/knowledge/projects/),
  // menggabungkan tiap file dengan header "## <path relatif>" di depannya
}

export function buildSystemPrompt(): string {
  const knowledge = readKnowledgeMarkdown(KNOWLEDGE_DIR);
  return `${GUARDRAIL_INSTRUCTION}\n\n---\n\n${knowledge}`;
}
```

Dibaca ulang dari disk di setiap pemanggilan (bukan di-cache di module scope). Data kecil (beberapa file markdown pendek), I/O-nya murah — caching di sini cuma menambah kompleksitas tanpa manfaat nyata untuk ukuran data Fase 1. Ini juga satu-satunya file yang berubah saat migrasi ke Fase 2 (RAG sungguhan): tanda tangan `buildSystemPrompt()` tetap, isinya nanti jadi query retrieval (sesuai catatan dependency inversion §7).

### 3.2 `lib/ai/model.ts`

```ts
import { ollama } from "ai-sdk-ollama";

export function getChatModel() {
  return ollama(process.env.OLLAMA_MODEL ?? "qwen3:8b");
}
```

`OllamaClient`, `AIClient`, dan `ChatMessage` yang ada sekarang dihapus — dulu dibuat untuk uji `generateText` manual, sudah tidak dipakai begitu route memanggil `streamText` langsung dengan tipe pesan bawaan SDK (`UIMessage`/`ModelMessage`). Ganti provider lain (Anthropic/OpenAI, sesuai §2) nantinya cukup ubah isi `getChatModel()` — tidak menyentuh route atau komponen lain.

### 3.3 `app/api/chat/route.ts`

```ts
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { getChatModel } from "@/lib/ai/model";
import { buildSystemPrompt } from "@/lib/rag/prompt";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: getChatModel(),
    instructions: buildSystemPrompt(),
    messages: convertToModelMessages(messages),
    onError: ({ error }) => {
      console.error("streamText gagal:", error);
    },
  });

  return result.toUIMessageStreamResponse({
    onError: (error) => {
      console.error("Stream error diteruskan ke client:", error);
      return "Asisten AI sedang tidak bisa dihubungi. Coba lagi sebentar lagi.";
    },
  });
}
```

Dua `onError` punya peran beda: yang di `streamText` untuk logging server saat pemanggilan model gagal (mis. Ollama tidak reachable); yang di `toUIMessageStreamResponse` mengubah error mentah jadi pesan aman yang diteruskan ke `useChat` di client, supaya stack trace/detail internal tidak pernah bocor ke browser.

### 3.4 `components/chat/ChatWidget.tsx`

Ganti `useState<ChatMessage[]>` + `handleSubmit` manual dengan `useChat` dari `@ai-sdk/react`:
- `messages`, `sendMessage`, `status` dari `useChat()` (transport default ke `/api/chat`).
- `draftMessage` tetap state lokal milik komponen (untuk input terkontrol + `SuggestedPrompts`), dikirim lewat `sendMessage({ text: draftMessage })` saat submit, alih-alih push manual ke array.
- Render `ChatMessageBubble` dari `message.parts` (ambil bagian bertipe teks) alih-alih `message.text` yang sekarang.
- `SuggestedPrompts` tetap tampil hanya saat `messages.length === 1` (baru sapaan pembuka).
- Tambah indikator kecil saat `status === "streaming"` (mis. label "mengetik..." di bawah bubble terakhir) — bukan animasi baru yang berat, cukup teks kecil sesuai §11 "motion memberi fokus, bukan jadi fokus".

Sapaan pembuka (`OPENING_MESSAGE`) tetap di-seed sebagai pesan awal lokal (bukan hasil panggilan model) — ini bagian UI, bukan jawaban AI, jadi tidak melanggar guardrail anti-halusinasi.

Catatan: `@ai-sdk/react` belum ter-install saat spec ini ditulis, jadi bentuk pasti pemanggilan `sendMessage`/nama field `status` di atas adalah perkiraan berdasarkan pola AI SDK v5+ secara umum — dikonfirmasi ulang terhadap tipe paket yang sebenarnya saat implementasi.

### 3.5 Isi `content/knowledge/*.md`

Dibaca dari `content/Jordan Arya Leksana_CV2026.pdf`, dipetakan ke file yang sudah ada (bukan bikin file baru): `about.md` (ringkasan profil & cerita latar), `education.md`, `experience.md` (timeline pengalaman kerja), `skills.md`, `projects/emqnet.md`, `projects/dermsight.md`, `projects/pumpsentinel.md`, `projects/ecs-website.md`, `projects/side-projects.md`. Format bebas markdown naratif per file (bukan JSON/struktur ketat) — cocok untuk ditempel apa adanya ke system prompt di Fase 1.

### 3.6 Bersih-bersih

`app/api/test-ollama/route.ts` dihapus setelah §6 (verifikasi) lolos — perannya sudah selesai begitu route asli terbukti jalan.

## 4. Alur data

Pengunjung mengetik di `ChatWidget` → `useChat` (`sendMessage`) POST riwayat `UIMessage[]` ke `/api/chat` → `route.ts` menjalankan `convertToModelMessages` + `buildSystemPrompt()` → `streamText` memanggil Ollama lewat `getChatModel()` → hasil di-stream balik lewat `toUIMessageStreamResponse()` → `useChat` menerima chunk dan meng-update `messages` secara inkremental → `ChatMessageBubble` re-render token demi token.

## 5. Error handling

- **Ollama tidak reachable / model belum di-pull** (persis `ECONNREFUSED` yang terjadi saat uji manual): ditangkap oleh `onError` di `streamText` (log detail ke terminal server) dan `onError` di `toUIMessageStreamResponse` (pesan aman diteruskan ke `useChat`, ditampilkan di `ChatWidget` alih-alih diam/crash).
- **`content/knowledge/*.md` sebagian masih kosong** (mis. proses ekstraksi CV belum menutup semua file): `buildSystemPrompt()` tetap jalan normal, konteksnya saja yang minim — guardrail anti-halusinasi tetap memaksa model bilang "tidak tahu" untuk topik yang datanya belum ada, sesuai §3.
- **Request body tidak berbentuk `{ messages }`** (mis. dipanggil manual lewat curl tanpa body benar): di luar cakupan sesi ini untuk divalidasi ketat (belum ada rate limiting/validasi input per §7 "Pengaman" yang memang dicatat sebagai utang di §2) — cukup biarkan error 400/500 bawaan Next.js, tidak perlu penanganan khusus dulu.

## 6. Verifikasi (manual — proyek ini belum punya test runner)

1. Pastikan `ollama serve` berjalan dan model yang dirujuk `OLLAMA_MODEL` (default `qwen3:8b`) sudah di-pull (`ollama list`).
2. `npm run dev`, buka `/`, ketik pertanyaan di `ChatWidget`, verifikasi teks muncul token demi token di bubble assistant (bukan menunggu lalu muncul sekaligus).
3. Matikan Ollama sengaja, ulangi pertanyaan, verifikasi `ChatWidget` menampilkan pesan error yang masuk akal ("Asisten AI sedang tidak bisa dihubungi...") dan terminal server menunjukkan log `ECONNREFUSED` yang jelas — bukan diam atau unhandled crash.
4. Tanyakan sesuatu yang jelas TIDAK ada di `content/knowledge/*.md` (mis. topik acak di luar CV), verifikasi model menjawab "tidak tahu" alih-alih mengarang (§3).
5. Setelah 2-4 lolos, hapus `app/api/test-ollama/route.ts`.

## 7. Status & langkah berikutnya

Selesai: spec ini.

Belum: implementasi (menyusul lewat `writing-plans`), lalu putaran brainstorming terpisah untuk tool calling Kelompok A & B begitu plumbing streaming ini terbukti jalan.
