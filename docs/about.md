# About — `/about`

Interface: Konten (tradisional). Acuan bersama: lihat `../README.md`.

## 1. Route & tujuan

Profil lengkap pemilik: latar & cerita, kumpulan skill, dan timeline pengalaman. Tujuan halaman ini adalah menjawab pertanyaan "siapa orang ini" secara mendalam bagi pengunjung yang mengklik dari navbar maupun yang diarahkan chatbot.

## 2. Peran dalam sistem chat-first

Tujuan navigasi paling umum dari chatbot. Alur khas: pengunjung bertanya soal pengalaman/skill di landing → chatbot memanggil `navigateToPage('/about')` lalu `scrollToSection('about-skills')` → menutup dengan teks singkat. Chatbot juga bisa menyorot section tertentu via `highlightSection`.

Di halaman ini `ChatWidget` menyusut jadi panel/dock yang tetap bisa dibuka, sehingga follow-up ("ceritakan pengalamannya lebih detail") tetap dilayani.

## 3. Struktur layout

Tumpukan section vertikal, tiap section dibungkus komponen `Section` dengan scroll reveal konsisten. Panel chat (dock) tersedia di sisi/bawah.

## 4. Section & DOM id

| DOM id | Isi | Target tool |
| --- | --- | --- |
| `about-background` | Latar & cerita personal | `scrollToSection`, `highlightSection` |
| `about-skills` | Skill grid | `scrollToSection`, `highlightSection`, target render `filterSkills` |
| `about-experience` | Timeline pengalaman | `scrollToSection`, `highlightSection` |

`id` di atas harus sama persis dengan `SECTION_IDS` di `lib/tools/types.ts`.

## 5. Motif retro & token warna

- Bungkus tiap section dengan `Section`.
- `about-skills`: skill grid; kategori/tag skill boleh memakai `SplitCard` (pasangan warna mis. `slate`+`pine`).
- `highlightSection`: bingkai section tersorot dengan `NestedFrame` fokus `frame-green`.
- Item terpilih boleh dibingkai `NestedFrame`; thumbnail memakai `PreviewCard`.
- Background dari `ink-base`/`cream-base`; surface panel `ink-panel`/`cream-raised`.

## 6. Motion

- Scroll reveal per section (fade + translate).
- Skill grid & timeline: stagger antar-item, gap ~40-80ms.
- Signature color-block reveal maksimal satu momen per section (mis. kemunculan pertama blok skill).

## 7. Integrasi chatbot

- Kelompok A: `navigateToPage('/about')`, `scrollToSection('about-*')`, `highlightSection`.
- Kelompok B: `filterSkills` → Skill Grid (dirender di panel chat, opsional difilter per kategori).

## 8. Sumber konten

- `lib/config/profile.ts` — latar & cerita (`about-background`).
- `lib/config/skills.ts` — data skill (`about-skills`); kategori mengikuti `SKILL_CATEGORY_IDS`.
- `lib/config/experience.ts` — timeline (`about-experience`).

## 9. Aksesibilitas

- Timeline harus terbaca sebagai urutan yang jelas tanpa animasi.
- Varian `prefers-reduced-motion`: semua reveal & highlight muncul langsung.

## 10. Status & langkah berikutnya

Selesai: spesifikasi `/about` dengan tiga section dan pemetaan tool.

Belum: route `app/about/page.tsx` belum ada; section (Skills, Experience) masih berupa komponen home lama di `components/sections/` (§8) dan perlu direlokasi ke sini.

Langkah berikutnya: buat `app/about/page.tsx`, pindahkan komponen Skills & Experience ke section ber-`id` yang benar, kunci `about-*` di `lib/tools/types.ts`.
