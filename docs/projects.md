# Projects — `/projects`

Interface: Konten (tradisional). Acuan bersama: lihat `../README.md`.

## 1. Route & tujuan

Daftar proyek: bagian unggulan (featured) dan bagian semua proyek dengan filter. Tujuannya memberi pengunjung gambaran cepat karya terbaik, lalu ruang untuk menjelajah semuanya.

## 2. Peran dalam sistem chat-first

Titik simpul rekomendasi. Alur khas yang Anda inginkan: pengunjung minta lihat proyek → chatbot `navigateToPage('/projects')` + `filterProjects` (mis. "proyek AI") → kartu rekomendasi muncul di panel chat → pengunjung minta detail satu proyek → chatbot `openProjectDetail('emqnet')` menuju halaman detail. Dari detail, chatbot bisa membawa balik ke sini atau ke landing.

## 3. Struktur layout

Dua section: unggulan lalu daftar penuh + kontrol filter. `ProjectCard` dipakai untuk tiap entri. Panel chat tersedia sebagai dock.

## 4. Section & DOM id

| DOM id | Isi | Target tool |
| --- | --- | --- |
| `projects-featured` | Proyek unggulan (EMQNET, DermSight) | `scrollToSection`, `highlightSection` |
| `projects-all` | Semua proyek + filter (mencerminkan `filterProjects`) | `scrollToSection`, `highlightSection`, target render `filterProjects` |

`id` harus sama dengan `SECTION_IDS` di `lib/tools/types.ts`; id proyek (`emqnet`, `dermsight`) mengikuti `PROJECT_IDS`.

## 5. Motif retro & token warna

- `ProjectCard` bersudut siku; aksen lewat satu sisi border tebal warna aset (border satu sisi ⇒ radius 0).
- Tag/kategori proyek memakai `SplitCard` (pasangan mis. `pine`+`coral`, `plum`+`teal-dark`).
- Proyek unggulan boleh dibingkai `NestedFrame`; thumbnail via `PreviewCard`.
- `highlightSection`: `NestedFrame` fokus `frame-green`.

## 6. Motion

- Scroll reveal per section; grid proyek stagger antar-kartu.
- Signature color-block reveal khusus untuk kartu proyek unggulan (elemen berdampak tinggi, satu momen per section).
- Hover kartu: lift 2-4px atau ganti warna border, tanpa glow.

## 7. Integrasi chatbot

- Kelompok A: `navigateToPage('/projects')`, `scrollToSection('projects-*')`, `highlightSection`, `openProjectDetail`.
- Kelompok B: `filterProjects` → Project Cards (opsional per tag), `openProjectDemo` (URL demo atau tanda tidak ada demo publik).

## 8. Sumber konten

- `lib/config/projects.ts` — katalog proyek (judul, tag, thumbnail, slug). Tag di sinilah yang menjadi basis `filterProjects`.

## 9. Aksesibilitas

- Filter harus tetap berfungsi via keyboard dan terbaca sebagai daftar bila animasi mati.
- Varian `prefers-reduced-motion`: kartu & reveal muncul langsung.

## 10. Status & langkah berikutnya

Selesai: spesifikasi `/projects` dengan dua section dan alur rekomendasi → detail.

Belum: route `app/projects/page.tsx` belum ada; komponen FeaturedProjects lama (§8) perlu direlokasi; daftar tag untuk filter belum final.

Langkah berikutnya: buat `app/projects/page.tsx`, definisikan `projects.ts` + daftar tag, kunci `projects-*` dan `PROJECT_IDS` di `lib/tools/types.ts`, pastikan bentuk data `filterProjects` cocok dengan Project Cards.
