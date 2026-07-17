# Contact — `/contact`

Interface: Konten (tradisional). Acuan bersama: lihat `../README.md`.

## 1. Route & tujuan

Halaman kontak: formulir dan kartu kontak (email, sosial, penjadwalan). Tujuannya memberi jalur menghubungi pemilik, baik lewat form maupun tautan langsung.

## 2. Peran dalam sistem chat-first

Sering jadi akhir perjalanan. Ketika pengunjung ingin menghubungi, chatbot bisa langsung merender `showContactCard` (Kelompok B) di panel chat tanpa harus pindah halaman, atau `navigateToPage('/contact')` bila pengunjung ingin form penuh.

## 3. Struktur layout

Dua elemen: `contact-form` dan kartu kontak. Panel chat tersedia sebagai dock.

## 4. Section & DOM id

| DOM id | Isi | Target tool |
| --- | --- | --- |
| `contact-form` | Formulir kontak | `scrollToSection`, `highlightSection` |

Kartu kontak di halaman ini sejajar isinya dengan tool-card `ContactCard` yang bisa dirender chatbot di mana saja. `id` konsisten dengan `SECTION_IDS`.

## 5. Motif retro & token warna

- `Input`/`TextField` bersudut siku, border tegas 1.5px; fokus berganti ke `frame-green` atau `blue`.
- Tombol kirim: `Button` primary (isi `brick`/`pine`, teks `cream-shape`); state pressed = geser 2px + blok offset solid.
- Kartu kontak sebagai `Card` dengan aksen border satu sisi warna aset.
- `highlightSection`: `NestedFrame` fokus `frame-green`.

## 6. Motion

- Scroll reveal untuk form & kartu.
- Feedback interaksi tombol lewat offset blok solid, bukan glow.
- `prefers-reduced-motion`: form muncul langsung, feedback tetap ada tapi tanpa gerakan berlebih.

## 7. Integrasi chatbot

- Kelompok A: `navigateToPage('/contact')`, `scrollToSection('contact-form')`, `highlightSection`.
- Kelompok B: `showContactCard` → `ContactCard` (email + link sosial + link penjadwalan); `openGithub`/`openLinkedin`.

## 8. Sumber konten

- `lib/config/links.ts` — email, tautan sosial, link penjadwalan (dibaca server via `portfolio-data.ts`; tidak pernah dikarang model).

## 9. Aksesibilitas & keamanan

- Form harus punya label yang jelas dan bisa disubmit via keyboard.
- Terapkan rate limiting / proteksi spam pada submit; jangan ekspos kredensial apa pun ke client.
- Varian `prefers-reduced-motion`: reveal langsung.

## 10. Status & langkah berikutnya

Selesai: spesifikasi `/contact` dengan form + kartu kontak dan pemetaan `showContactCard`.

Belum: route `app/contact/page.tsx` belum ada; penanganan submit form (endpoint, proteksi spam) belum diputuskan; `ContactCard` di `components/chat/tool-cards/` perlu diselaraskan dengan kartu di halaman.

Langkah berikutnya: buat `app/contact/page.tsx`, tentukan mekanisme submit (mis. server action + rate limit), kunci `contact-form` di `lib/tools/types.ts`, satukan bentuk data kartu kontak antara halaman dan tool-card.
