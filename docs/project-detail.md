# Project Detail — `/projects/[slug]`

Interface: Konten (tradisional). Slug saat ini: `emqnet`, `dermsight`. Acuan bersama: lihat `../README.md`.

## 1. Route & tujuan

Detail satu proyek, disusun untuk jalur "technical interviewer": dari gambaran umum sampai evaluasi. Tujuannya menjawab follow-up mendalam tentang satu proyek tertentu.

## 2. Peran dalam sistem chat-first

Ujung dari alur rekomendasi. Chatbot tiba di sini via `openProjectDetail('<slug>')` (route diturunkan dari id di client). Setelah tiba, follow-up seperti "bagaimana arsitekturnya" dilayani dengan `scrollToSection('architecture')` + `highlightSection`. Dari sini pengunjung bisa diminta balik ke `/projects` atau `/` lewat chat.

## 3. Struktur layout

Tumpukan section teknis berurutan, tiap section dibungkus `Section`. Panel chat tersedia sebagai dock agar tanya-jawab teknis berjalan sambil membaca.

## 4. Section & DOM id

| DOM id | Isi | Target tool |
| --- | --- | --- |
| `overview` | Ringkasan proyek & konteks | `scrollToSection`, `highlightSection` |
| `architecture` | Rancangan sistem/model | `scrollToSection`, `highlightSection` |
| `dataset` | Data & pra-pemrosesan | `scrollToSection`, `highlightSection` |
| `training` | Proses pelatihan | `scrollToSection`, `highlightSection` |
| `evaluation` | Metrik & hasil | `scrollToSection`, `highlightSection` |

`id` di atas dipakai bersama untuk semua slug dan harus konsisten dengan `SECTION_IDS`. Slug mengikuti `PROJECT_IDS`.

## 5. Motif retro & token warna

- Thumbnail/preview aset teknis via `PreviewCard`.
- Item/temuan terpilih dibingkai `NestedFrame`; section tersorot memakai `NestedFrame` fokus `frame-green`.
- Diagram arsitektur berat sebaiknya berupa aset SVG/Lottie di `public/`, dibungkus wrapper di `components/scenes/` — jangan dikode frame-by-frame (§6).
- Background `ink-base`/`cream-base`; surface `ink-panel`/`cream-raised`.

## 6. Motion

- Scroll reveal per section, ritme konsisten dengan halaman konten lain.
- Adegan ilustratif berat (arsitektur) datang dari file animasi, bukan animasi manual per elemen.
- `prefers-reduced-motion`: tampilkan diagram statis, reveal langsung.

## 7. Integrasi chatbot

- Kelompok A: `openProjectDetail`, `scrollToSection('<section detail>')`, `highlightSection`.
- Kelompok B: `openProjectDemo` → URL demo atau tanda "tidak ada demo publik".

## 8. Sumber konten

- `lib/config/projects.ts` — konten per slug (overview, arsitektur, dataset, training, evaluation) dan URL demo (dibaca server via `portfolio-data.ts`).
- Aset diagram: `public/illustrations/` atau `public/lottie/`.

## 9. Aksesibilitas

- Konten teknis harus terbaca berurutan tanpa bergantung pada animasi.
- Diagram wajib punya alternatif teks/keterangan.

## 10. Status & langkah berikutnya

Selesai: spesifikasi detail proyek dengan lima section teknis, dipakai bersama semua slug.

Belum: route `app/projects/[slug]/page.tsx` belum ada; konten per section untuk `emqnet` & `dermsight` belum diisi; aset diagram belum disiapkan.

Langkah berikutnya: buat route dinamis `[slug]`, isi `projects.ts` per slug dengan kelima section, kunci `SECTION_IDS` detail + `PROJECT_IDS`, siapkan aset diagram sebagai file di `public/`.
