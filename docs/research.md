# Research — `/research`

Interface: Konten (tradisional). Acuan bersama: lihat `../README.md`.

## 1. Route & tujuan

Publikasi dan riset pemilik. Halaman ringkas berisi daftar karya ilmiah/riset untuk pengunjung yang tertarik sisi akademik/teknis.

## 2. Peran dalam sistem chat-first

Tujuan navigasi sekunder. Chatbot mengarahkan ke sini via `navigateToPage('/research')` ketika pengunjung bertanya soal publikasi/riset, lalu bisa `scrollToSection('research-list')` bila diperlukan.

## 3. Struktur layout

Satu section utama berisi daftar. Panel chat tersedia sebagai dock.

## 4. Section & DOM id

| DOM id | Isi | Target tool |
| --- | --- | --- |
| `research-list` | Daftar publikasi/riset | `scrollToSection`, `highlightSection` |

`id` konsisten dengan `SECTION_IDS` di `lib/tools/types.ts`.

## 5. Motif retro & token warna

- Tiap entri riset boleh sebagai `Card` bersudut siku dengan aksen border satu sisi warna aset.
- `PreviewCard` untuk thumbnail/figur bila ada.
- `highlightSection`: `NestedFrame` fokus `frame-green`.
- Background `ink-base`/`cream-base`.

## 6. Motion

- Scroll reveal; daftar entri stagger.
- Hover entri: ganti warna border atau lift ringan, tanpa glow.
- `prefers-reduced-motion`: daftar muncul langsung.

## 7. Integrasi chatbot

- Kelompok A: `navigateToPage('/research')`, `scrollToSection('research-list')`, `highlightSection`.
- Kelompok B: tautan eksternal ke publikasi (bila ada) sebaiknya lewat pola URL server-side yang sama seperti Kelompok B; jangan biarkan model mengarang URL.

## 8. Sumber konten

- `lib/config/research.ts` — daftar publikasi/riset (judul, venue, tahun, tautan).

## 9. Aksesibilitas

- Tautan publikasi harus jelas dan bisa dibuka via keyboard.
- Varian `prefers-reduced-motion`: reveal langsung.

## 10. Status & langkah berikutnya

Selesai: spesifikasi `/research` satu section.

Belum: route `app/research/page.tsx` belum ada; `research.ts` belum final; pola URL publikasi belum diputuskan.

Langkah berikutnya: buat `app/research/page.tsx`, isi `research.ts`, kunci `research-list` di `lib/tools/types.ts`, tentukan apakah tautan publikasi perlu jadi resource server-side.
