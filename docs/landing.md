# Landing — `/`

Interface: Chat (AI), full-screen. Acuan bersama: lihat `../README.md`.

## 1. Route & tujuan

Titik masuk situs. Ini bukan halaman scroll, melainkan permukaan chat full-screen tempat pengunjung berdialog dengan chatbot yang mengendalikan seluruh situs. Tujuannya: (a) langsung mengundang pengunjung bertanya, dan (b) tetap menampilkan info inti tanpa mengetik demi recruiter yang buru-buru dan demi SEO.

## 2. Peran dalam sistem chat-first

Landing adalah wujud paling penuh dari chatbot. Dari sini chatbot bisa mengarahkan pengunjung ke halaman konten (`navigateToPage`), merender kartu (Kelompok B), atau menjawab teks. Karena `ChatController` persist di root layout, percakapan yang dimulai di sini tetap berlanjut saat pindah ke `/about`, `/projects`, dst.

Penting: karena landing bukan halaman scroll, `scrollToSection` TIDAK menyasar landing. Bila pengunjung minta "lihat skill", alur normalnya dua tool berurutan: `navigateToPage('/about')` lalu `scrollToSection('about-skills')`.

## 3. Struktur layout

Dua bagian dalam satu layar:

- `StaticHeader` — di-render server, selalu terlihat tanpa mengetik. Isi: nama (via `KineticHeading`), posisi/tagline, tombol CV, tautan GitHub & LinkedIn, toggle tema, dan tautan ke halaman konten. Ini yang memenuhi syarat "info inti ~20 detik" dan menjadi konten terindeks SEO.
- `ChatWidget` — permukaan chat utama. Isi: sapaan pembuka + beberapa suggested prompt agar pengunjung tahu chatbot bisa apa. Di sinilah gelembung pesan dan tool-card tampil.

## 4. Section & DOM id

Tidak ada section scroll di landing. Tidak ada `id` yang menjadi target `scrollToSection` di halaman ini (lihat catatan §2). `StaticHeader` dan `ChatWidget` adalah dua region tetap, bukan section yang bisa dituju scroll.

## 5. Motif retro & token warna

- Nama lewat `KineticHeading` (stagger huruf + underline SVG), siklus warna `coral/mustard/pine/slate/brick`.
- Aksen dekorasi tegas (bukan ramai): `ColorBlockBar` atau `DiagonalStripes` samar.
- Latar permukaan chat: motif retro tipis sebagai tekstur — `HexGrid` sebagai alas bawah atau `DiagonalStripes` samar — digerakkan sangat lambat (ambient) lewat pergeseran blok warna, BUKAN gradient.
- Suggested prompts sebagai `Pill`/`Badge` atau `SplitCard` kecil.
- Background full-bleed dari `ink-base` (gelap) / `cream-base` (terang) saja.

## 6. Motion

- Pesan masuk: fade + translate dengan stagger.
- Tool-card muncul dengan signature color-block reveal (dipakai terbatas agar tetap bermakna — bukan di setiap kartu).
- Tekstur latar (HexGrid/DiagonalStripes) bergerak ambient sangat lambat via pergeseran blok warna.
- Intro sequence (`IntroSequence` → `LoadingScreen` → `BrandReveal`) keluar via wipe color-block menuju landing ini.

## 7. Integrasi chatbot

Tool yang relevan di landing:

- Kelompok A: `navigateToPage` (aksi kontrol utama dari sini), `openProjectDetail`.
- Kelompok B: `showDownloadCard` → `CvCard`; `openGithub`/`openLinkedin`; `showContactCard` → `ContactCard`; `filterProjects` → Project Cards; `filterSkills` → Skill Grid.

Tool-card yang bisa dirender di permukaan chat: `CvCard`, `ContactCard`, Project Cards, Skill Grid (di `components/chat/tool-cards/`). Chatbot tidak "mengirim file" — ia memicu UI berisi tombol ke file statis di `public/`.

## 8. Sumber konten

- Nama, tagline: `lib/config/profile.ts` dan `brand.ts`.
- URL CV, GitHub, LinkedIn: `lib/config/links.ts` (dibaca server lewat `portfolio-data.ts`).
- Suggested prompts: didefinisikan di `ChatWidget` (atau konstanta terpisah), diarahkan ke kemampuan tool yang ada.

## 9. Aksesibilitas & SEO

- `StaticHeader` wajib di-render server (bukan hanya di dalam chat yang client-rendered) supaya info inti terindeks dan terlihat sebelum JS jalan.
- Varian `prefers-reduced-motion`: tekstur ambient berhenti, pesan & kartu muncul langsung tanpa wipe.
- Input chat: batasi panjang input & jumlah pesan per sesi; rate limiting per pengunjung (Upstash).

## 10. Status & langkah berikutnya

Selesai: spesifikasi landing chat-first.

Belum: `ChatWidget` belum tersambung ke `/api/chat` (Fase 0, route masih stub). `StaticHeader` belum dibuat sebagai komponen server.

Langkah berikutnya: bangun `StaticHeader` (server component) + shell `ChatWidget` (belum tersambung LLM, fokus struktur & tema retro), pasang `ChatController` di `app/layout.tsx`, lalu sambungkan ke `streamText` saat Fase 1 mulai.
