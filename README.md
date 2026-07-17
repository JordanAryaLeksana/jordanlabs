# Docs — Spesifikasi Desain per Halaman

Folder ini berisi spesifikasi desain untuk tiap halaman situs. Sumber kebenaran arah produk, tema, dan arsitektur tetap `CLAUDE.md` di root; dokumen di sini adalah *turunannya per halaman* agar mudah dipakai saat membangun satu halaman tanpa harus membaca ulang seluruh `CLAUDE.md`.

Bila terjadi konflik, `CLAUDE.md` yang menang. Bila `CLAUDE.md` berubah, perbarui acuan di bawah lalu sesuaikan file per halaman yang terdampak.

## Cara membaca dokumen ini

Setiap file di `pages/` memakai kerangka yang sama:

1. Route & tujuan — apa fungsi halaman ini.
2. Peran dalam sistem chat-first — bagaimana halaman ini berelasi dengan chatbot.
3. Struktur layout — komponen penyusun.
4. Section & DOM id — tabel `id` stabil yang menjadi target tool navigasi.
5. Motif retro & token warna — kosakata visual §6/§6a yang dipakai.
6. Motion — perilaku animasi §11 di halaman ini.
7. Integrasi chatbot — tool yang menyasar halaman + tool-card yang dirender.
8. Sumber konten — file di `lib/config/` yang mengisi halaman.
9. Aksesibilitas — catatan `prefers-reduced-motion` dan SEO bila relevan.
10. Status & langkah berikutnya — wajib per §9 CLAUDE.md.

## Peta halaman

| Dokumen | Route | Interface |
| --- | --- | --- |
| `pages/landing.md` | `/` | Chat (AI) — full-screen |
| `pages/about.md` | `/about` | Konten (tradisional) |
| `pages/projects.md` | `/projects` | Konten (tradisional) |
| `pages/project-detail.md` | `/projects/[slug]` | Konten (tradisional) |
| `pages/research.md` | `/research` | Konten (tradisional) |
| `pages/contact.md` | `/contact` | Konten (tradisional) |

`ChatController` dipasang di root layout, jadi chatbot hidup di semua halaman: full-screen di `/`, menyusut jadi panel/dock di halaman konten (§1a).

---

## Acuan bersama

Bagian ini sengaja dipusatkan agar tidak diulang di tiap file per halaman. File halaman cukup merujuk ke sini.

### Batasan keras (ringkasan §3)

- Sudut siku (0px). Lengkung hanya `rounded-full` untuk elemen yang memang lingkaran.
- Tanpa gradient, drop shadow blur, atau glow. Kedalaman = offset blok solid (hard shadow tanpa blur).
- Background full-bleed hanya dari token `background` (lihat di bawah). Warna aset tidak boleh jadi background halaman.
- Jangan hardcode hex di komponen — pakai kelas token Tailwind (`bg-brick`, `text-coral`).
- URL aset (CV, LinkedIn) di-hardcode dari server (`lib/config/links.ts`), tidak pernah dikarang model.
- Selalu hormati `prefers-reduced-motion`. Easing pakai `--ease-retro-bounce`, hindari easing lembut/linear.

### Token warna (ringkasan §5, sumber: `app/globals.css`)

Background (hanya ini yang boleh full-bleed): `ink-base`, `ink-panel`, `ink-raised` (mode gelap); `cream-base`, `cream-raised` (mode terang); `backdrop-teal` (satu-satunya aksen yang boleh jadi latar adegan).

Warna aset (isi bentuk, sama di kedua mode): `brick`, `red`, `maroon`, `coral`, `terracotta`, `mustard`, `yellow`, `pine`, `teal-dark`, `green`, `sage`, `slate`, `navy`, `blue`, `plum`, `purple`, `cream-shape`, `offwhite`.

Aksen & teks: `frame-green` (state selected/active — bukan warna isi umum), `text-on-dark`, `text-on-light`.

Catatan mode: `yellow`/`mustard` kontrasnya tipis di atas cream — beri outline 0.5px atau geser lebih gelap. Untuk "bentuk terang" di mode terang pakai `--shape-contrast` (ink/navy/maroon).

### Motif retro (ringkasan §6a, di `components/retro/`)

`ColorBlockBar`, `SplitCard`, `HexGrid`, `SeatGrid`, `PerspectiveScene`, `DiagonalStripes`, `PreviewCard`, `NestedFrame`, `KineticHeading`. Semua stateless & presentational — warna/konten lewat props, tidak hardcode.

`highlightSection` selalu memakai `NestedFrame` dengan bingkai fokus `frame-green`.

### Motion (ringkasan §11, di `components/motion/motionConfig.ts`)

- Entrance default: fade + translate (opacity 0 + geser ~8-16px), ~200-400ms, `FUNCTIONAL_EASE`.
- Stagger untuk list (kartu/skill/proyek), gap ~40-80ms.
- Hover: scale ~1.02 / lift 2-4px / ganti warna border — tanpa glow.
- Signature "wow": color-block reveal (`components/motion/ColorBlockReveal.tsx`), ~400-600ms, satu momen per section, hanya di elemen berdampak tinggi (kartu proyek unggulan, tool-result card, kemunculan pertama SplitCard/HexGrid).
- `RETRO_BOUNCE_EASE` hanya untuk aksen main (mis. huruf `KineticHeading`), bukan UI umum.
- Transisi antar-interface: wipe sinematik color-block / clip-path; `ChatController` tidak ikut ter-unmount.
- Wajib ada varian `prefers-reduced-motion` (konten muncul langsung tanpa wipe).

### Inventaris tool (ringkasan §7)

Kelompok A — client-forwarded, TANPA `execute` (`lib/tools/navigation-tools.ts`, dijalankan di `components/chat/useToolActions.ts`):

- `navigateToPage` — pindah route.
- `scrollToSection` — smooth scroll ke section pada halaman konten aktif.
- `highlightSection` — sorot section sesaat (pakai `NestedFrame`/`frame-green`).
- `openProjectDetail` — buka halaman detail proyek.

Kelompok B — server-executed, DENGAN `execute` (`lib/tools/resource-tools.ts`, `content-tools.ts`; data dari `lib/tools/portfolio-data.ts`):

- `showDownloadCard` — nama file + URL CV → `CvCard`.
- `openGithub` / `openLinkedin` — URL sosial → client `window.open`.
- `openProjectDemo` — URL demo atau tanda "tidak ada demo publik".
- `showContactCard` — email + sosial + link penjadwalan → `ContactCard`.
- `filterProjects` — project cards, opsional per tag.
- `filterSkills` — skill grid, opsional per kategori.

Identifier bersama (`SECTION_IDS`, `PAGE_ROUTES`, `PROJECT_IDS`, `SKILL_CATEGORY_IDS`) tinggal di `lib/tools/types.ts` — satu-satunya sumber agar schema tool, route server, dan komponen tidak lepas sinkron.

---

## Status & langkah berikutnya

Selesai: kerangka indeks + acuan bersama + enam dokumen halaman.

Belum: dokumen belum divalidasi terhadap kode nyata (proyek masih Fase 0 — `app/api/chat/route.ts` masih stub, `content/knowledge/` kosong). Nilai `PROJECT_IDS`/`SKILL_CATEGORY_IDS` di dokumen mengikuti contoh di `CLAUDE.md` (emqnet, dermsight) dan perlu dikunci ke `lib/tools/types.ts` saat file itu diisi.

Langkah berikutnya: (1) isi `lib/tools/types.ts` sebagai sumber kebenaran id, lalu selaraskan tabel "Section & DOM id" di tiap dokumen. (2) Bangun landing shell (`StaticHeader` + `ChatWidget`) sesuai `pages/landing.md`. (3) Baru turun ke route konten.
