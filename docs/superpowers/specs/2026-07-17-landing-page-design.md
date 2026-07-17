# Landing Page (`/`) — Design Spec

Status: disetujui pengguna 2026-07-17, siap masuk tahap rencana implementasi.

Rujukan wajib: `CLAUDE.md` §1, §1a, §1b, §3, §5, §6, §6a, §11 (aturan keras & bahasa visual); `docs/landing.md` (spesifikasi halaman ini); `NEXT_STEPS.md` (status proyek saat ini).

## 1. Konteks & masalah

Proyek sedang migrasi dari Home lama (satu halaman scroll dengan section Hero/Skills/Experience/dst di `components/sections/`) ke arsitektur baru chat-first (§1a): landing `/` jadi permukaan chat AI full-screen, halaman konten lama dipindah jadi route terpisah (`/about`, `/projects`, dst — dikerjakan di sesi lain, bukan sesi ini).

`app/page.tsx` saat ini rusak (mengimpor `components/sections/*` yang sudah tidak ada). `lib/config/profile.ts`, `lib/tools/types.ts` belum ada padahal sudah dirujuk kode lain (`Footer.tsx`). Sesi ini HANYA membangun landing (`app/page.tsx` + dua komponen barunya), tidak menyentuh `/about` dkk, tidak menyambungkan LLM sungguhan (masih Fase 0 sesuai `NEXT_STEPS.md`).

## 2. Cakupan

**Dikerjakan:**
- `lib/tools/types.ts` (baru, minimal): `PAGE_ROUTES` saja.
- `lib/config/profile.ts` (baru, minimal): `PROFILE.fullName`, `PROFILE.role`.
- `components/ui/IconButton.tsx` (baru): primitif §6a yang belum ada.
- `components/ui/ThemeToggle.tsx` (baru): toggle `data-theme`, default gelap, persist localStorage.
- `components/layout/StaticHeader.tsx` (baru, server component).
- `components/chat/ChatWidget.tsx`, `components/chat/ChatMessageBubble.tsx`, `components/chat/SuggestedPrompts.tsx` (baru, client shell Fase 0 — belum ke `/api/chat`).
- `app/page.tsx` (rewrite total: StaticHeader + ChatWidget di dalam `IntroSequence`).
- `app/layout.tsx` (tambah script anti-flash tema di `<head>`).
- Pindahkan `maxresdefault.jpg`, `startup1.jpg` dari root proyek ke `docs/reference/` (gambar moodboard referensi visual START-UP, bukan aset yang dipakai kode).
- Tambah dependency `@phosphor-icons/react`.

**Tidak dikerjakan sesi ini (dicatat di NEXT_STEPS.md sebagai langkah berikutnya):**
- `NavBar.tsx`, `Footer.tsx` — dibiarkan apa adanya, masih berisi anchor arsitektur lama, dipakai lagi & direvisi saat `/about` dkk dibangun.
- `ChatController` site-wide (§1a) — landing ini berdiri sendiri; site-wide chat controller baru relevan saat halaman konten lain sudah ada.
- Koneksi LLM sungguhan (`app/api/chat/route.ts`, `lib/tools/{navigation,resource,content}-tools.ts`, `portfolio-data.ts`) — Fase 1, sesi terpisah.
- `SECTION_IDS`, `PROJECT_IDS`, `SKILL_CATEGORY_IDS` di `lib/tools/types.ts` — ditambah saat halaman yang membutuhkannya dibangun.

## 3. Arsitektur & komponen

### 3.1 `lib/tools/types.ts`

```ts
export const PAGE_ROUTES = {
  home: "/",
  about: "/about",
  projects: "/projects",
  research: "/research",
  contact: "/contact",
} as const;
```

Sumber kebenaran tunggal untuk rute (CLAUDE.md §8) — `StaticHeader` mengacu ke sini, bukan hardcode string literal. Field lain (section id, project id, skill category id) ditambahkan saat halaman terkait mulai dibangun, sesuai catatan status di `docs/README.md`.

### 3.2 `lib/config/profile.ts`

```ts
export const PROFILE = {
  fullName: "Jordan Arya Leksana",
  role: "Software Engineer",
} as const;
```

Memperbaiki `Footer.tsx` yang sudah mengimpor modul ini (saat ini gagal resolve). Field tambahan (bio, cerita latar untuk `about-background`) ditambahkan saat `/about` dibangun.

### 3.3 `components/ui/IconButton.tsx`

Primitif §6a yang belum ada: bujur sangkar siku berisi satu ikon Phosphor, hover = isi tipis warna aset. Props: `icon` (ReactNode), `label` (untuk `aria-label`, wajib — ikon tanpa teks butuh nama aksesibel), `href?` (varian `<a>`, sama pola dengan `Button`/`Pill`), `onClick?`, `className?`. Ukuran ikon 20px (dekoratif/aksi header) mengikuti panduan ikon §6a.

### 3.4 `components/ui/ThemeToggle.tsx`

Client component. State: baca `data-theme` dari `document.documentElement` saat mount (fallback `"dark"` bila kosong, sesuai CLAUDE.md §4 "Default gelap"). `onClick` membalik nilai, set `document.documentElement.dataset.theme` dan `localStorage.setItem("theme", value)`. Ikon: `Sun`/`Moon` dari Phosphor, ditukar sesuai state aktif. Dirender lewat `IconButton`.

Anti-flash: `app/layout.tsx` mendapat inline `<script>` (blocking, sebelum hydration) yang membaca `localStorage.theme` dan menset `document.documentElement.dataset.theme` sebelum paint — mencegah kedipan tema salah saat load. Ini satu-satunya inline script di proyek; scriptnya pendek (baca localStorage + set satu atribut), tidak menjalankan logika lain.

### 3.5 `components/layout/StaticHeader.tsx` (server component)

Struktur (dua baris, wrap di mobile):

**Baris 1** — identitas + aksi utama:
- `KineticHeading text={PROFILE.fullName}` + `Typography variant="text" size="sm"` untuk `PROFILE.role` di bawahnya.
- `DiagonalStripes` sebagai strip dekoratif sempit (bukan full-bleed) di antara identitas dan aksi — aksen tegas sesuai §5 landing.md poin "aksen dekorasi tegas, bukan ramai".
- Kanan: `Button variant="primary" href={CV_URL} download>Download CV</Button>`, `IconButton` GitHub (`href={GITHUB_URL}`, ikon `GithubLogo`), `IconButton` LinkedIn (`href={LINKEDIN_URL}`, ikon `LinkedinLogo`), `ThemeToggle`.

**Baris 2** — tautan ke halaman konten (§1a, §7 landing.md "tautan ke halaman konten"):
- `Pill href={PAGE_ROUTES.about}>About</Pill>`, begitu juga Projects/Research/Contact. Rute ini akan 404 sampai halaman masing-masing dibangun (disetujui pengguna — dianalogikan dengan keputusan `detailRoute` proyek di `NEXT_STEPS.md` lama, tapi di sini rute memang sengaja sudah aktif menunggu halaman menyusul).

Tanpa `"use client"` — seluruh konten statis, di-render server untuk SEO & keterlihatan info inti ~20 detik (§1, §9 landing.md).

### 3.6 `components/chat/ChatWidget.tsx` (client, Fase 0)

Props: `className?` (diteruskan `flex-1 min-h-0` dari `app/page.tsx`).

Struktur (flex column, penuh tinggi induk):
- `SceneContainer background="ink-base"` sebagai pembungkus (ikut token tema aktif lewat CSS var `--bg`, bukan hardcode — `SceneContainer` sudah mendukung ini per implementasi saat ini... dicek ulang: `SceneContainer` memetakan prop `background` ke kelas `bg-ink-base` tetap, TIDAK otomatis ikut tema. Untuk ChatWidget yang harus ikut tema (gelap/terang), dipakai kelas `bg-[var(--bg)] text-[var(--fg)]` langsung alih-alih `SceneContainer` (yang cocoknya untuk adegan dengan warna tetap, bukan yang ikut toggle tema). Dicatat sebagai deviasi sadar dari asumsi awal di sesi tanya-jawab.
- Tekstur latar: `HexGrid` diposisikan `absolute inset-x-0 bottom-0` dengan `className="opacity-[0.07]"`, digerakkan ambient lewat `motion.div` custom (translateX berulang pelan, `repeat: Infinity, repeatType: "mirror", duration: 20, ease: "linear"`), dibungkus cek `useReducedMotion` (statis diam bila aktif).
- Area pesan: `<div className="flex-1 min-h-0 overflow-y-auto">` berisi satu `ChatMessageBubble` sapaan pembuka (role `"assistant"`) + bubble tambahan hasil submit lokal (state `messages`).
- `SuggestedPrompts` di atas baris input — hanya tampil bila `messages.length === 1` (belum ada interaksi), supaya tidak mengganggu setelah pengunjung mulai mengetik (pola umum chat UI).
- Baris input (sticky bottom, `border-t`): `<input>` terkontrol (state `draftMessage`) bergaya sesuai §6a Input (border tegas 1.5px, fokus → `border-frame-green`) + `IconButton` submit (ikon `PaperPlaneRight`).

Fungsi:
- `handleSelectSuggestedPrompt(prompt: string)` — set `draftMessage` ke teks prompt, fokus input. TIDAK auto-submit (sesuai keputusan: klik prompt mengisi input, bukan mengirim).
- `handleSubmit` — bila `draftMessage` tidak kosong: tambahkan bubble baru role `"user"` ke `messages`, kosongkan `draftMessage`. TIDAK memanggil API apa pun, TIDAK mengarang balasan assistant (sesuai guardrail §3 CLAUDE.md "chatbot tidak boleh mengarang fakta" — diperluas prinsipnya: shell ini juga tidak boleh berpura-pura jadi AI yang menjawab).

Satu file per fungsi murni tugas terpisah TIDAK diwajibkan untuk handler kecil di dalam komponen client ini (bukan "fungsi untuk tugas baru dipakai fungsi lain" — ini closure state lokal komponen, bukan util lintas file); §9 "tanpa nested/helper function" ditujukan pada fungsi berdiri sendiri yang bisa/harus diekstrak ke modul, bukan event handler yang secara inheren terikat ke state komponen.

### 3.7 `components/chat/ChatMessageBubble.tsx`

Props: `role: "assistant" | "user"`, `children: ReactNode`. Assistant rata kiri warna `bg-ink-panel`/`bg-cream-raised` (ikut tema), user rata kanan `bg-pine` teks `text-on-dark`. Dibungkus `FadeIn` (`distancePx=12`) untuk entrance fade+translate (§11).

### 3.8 `components/chat/SuggestedPrompts.tsx`

Props: `prompts: string[]`, `onSelect: (prompt: string) => void`. Render `StaggerContainer` berisi `StaggerItem` per `Pill` (bukan tombol aktif/`active`, dipakai sebagai aksi bukan status). Isi 4 prompt tetap (konstanta modul, bukan prop wajib dari pemanggil — hanya `ChatWidget` yang memakainya):

```
"What projects have you built?"
"What are your skills?"
"Can I see your CV?"
"How do I get in touch?"
```

### 3.9 `app/page.tsx`

```tsx
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

Tidak ada `SceneContainer`/`Section`/scroll — landing bukan halaman scroll (§2, §4 landing.md).

## 4. Motion (ringkasan keputusan, §11)

- Header: `KineticHeading` bawaan (stagger huruf, `--ease-retro-bounce` internal ke komponen — tidak diubah).
- Bubble & suggested prompts: `FadeIn`/`StaggerContainer`+`StaggerItem` existing, `FUNCTIONAL_EASE`, entrance ~540ms, gap ~110ms — tidak ada primitif baru.
- Tekstur `HexGrid` ambient: opacity rendah, translate lambat infinite mirror, mati total di `prefers-reduced-motion`.
- `ColorBlockReveal` (signature wah) SENGAJA TIDAK dipakai di landing sesi ini — belum ada tool-card hasil Kelompok B yang layak menerimanya; dipasang nanti bareng Fase 1 chatbot.
- Wipe intro → landing: sudah ditangani `IntroSequence` yang ada, tidak diubah.

## 5. Aksesibilitas & SEO

- `StaticHeader` server-rendered penuh (tanpa `"use client"`), memenuhi §9 landing.md.
- Semua `IconButton` ikon-saja wajib `aria-label`.
- Toggle tema: `aria-label` dinamis ("Switch to light/dark theme").
- `prefers-reduced-motion`: tekstur ambient berhenti (statis), bubble/prompt muncul langsung tanpa animasi (`FadeIn`/`StaggerContainer` sudah menangani ini secara bawaan).
- Rate limiting & batas panjang input (§9 landing.md) TIDAK relevan sesi ini — belum ada endpoint untuk dibatasi (dicatat sebagai pekerjaan Fase 1 di NEXT_STEPS.md).

## 6. Verifikasi

Tidak ada logika bisnis untuk unit test (murni UI shell, tanpa fetch/tool call). Verifikasi: `npm run build` (type-check menyeluruh termasuk App Router), lalu `npm run dev` — cek visual manual di ~375px/768px/1440px, toggle tema, toggle OS-level `prefers-reduced-motion`, dan klik-alur suggested prompt → input → submit → bubble muncul.

## 7. Status & langkah berikutnya

Selesai: spec ini.

Belum: implementasi (menyusul lewat writing-plans), lalu build `/about` dkk (isi `SECTION_IDS` dst di `lib/tools/types.ts` saat itu), lalu Fase 1 chatbot sungguhan (`app/api/chat/route.ts`, tools, `ChatController` site-wide).

Langkah berikutnya: invoke `writing-plans` untuk rencana implementasi bertahap dari spec ini.
